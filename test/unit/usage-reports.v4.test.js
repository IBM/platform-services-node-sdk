/**
 * (C) Copyright IBM Corp. 2024.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const UsageReportsV4 = require('../../dist/usage-reports/v4');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
} = require('@ibm-cloud/sdk-test-utilities');

const usageReportsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://billing.cloud.ibm.com',
};

const usageReportsService = new UsageReportsV4(usageReportsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(usageReportsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('UsageReportsV4', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = UsageReportsV4.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(UsageReportsV4.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(UsageReportsV4.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(UsageReportsV4);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = UsageReportsV4.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(UsageReportsV4);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new UsageReportsV4(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new UsageReportsV4(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(UsageReportsV4.DEFAULT_SERVICE_URL);
    });
  });

  describe('getAccountSummary', () => {
    describe('positive tests', () => {
      function __getAccountSummaryTest() {
        // Construct the params object for operation getAccountSummary
        const accountId = 'testString';
        const billingmonth = 'testString';
        const getAccountSummaryParams = {
          accountId,
          billingmonth,
        };

        const getAccountSummaryResult = usageReportsService.getAccountSummary(getAccountSummaryParams);

        // all methods should return a Promise
        expectToBePromise(getAccountSummaryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}/summary/{billingmonth}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.billingmonth).toEqual(billingmonth);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountSummaryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getAccountSummaryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getAccountSummaryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const billingmonth = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountSummaryParams = {
          accountId,
          billingmonth,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getAccountSummary(getAccountSummaryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getAccountSummary({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getAccountSummary();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccountUsage', () => {
    describe('positive tests', () => {
      function __getAccountUsageTest() {
        // Construct the params object for operation getAccountUsage
        const accountId = 'testString';
        const billingmonth = 'testString';
        const names = true;
        const acceptLanguage = 'testString';
        const getAccountUsageParams = {
          accountId,
          billingmonth,
          names,
          acceptLanguage,
        };

        const getAccountUsageResult = usageReportsService.getAccountUsage(getAccountUsageParams);

        // all methods should return a Promise
        expectToBePromise(getAccountUsageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}/usage/{billingmonth}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs._names).toEqual(names);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.billingmonth).toEqual(billingmonth);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountUsageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getAccountUsageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getAccountUsageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const billingmonth = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountUsageParams = {
          accountId,
          billingmonth,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getAccountUsage(getAccountUsageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getAccountUsage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getAccountUsage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getResourceGroupUsage', () => {
    describe('positive tests', () => {
      function __getResourceGroupUsageTest() {
        // Construct the params object for operation getResourceGroupUsage
        const accountId = 'testString';
        const resourceGroupId = 'testString';
        const billingmonth = 'testString';
        const names = true;
        const acceptLanguage = 'testString';
        const getResourceGroupUsageParams = {
          accountId,
          resourceGroupId,
          billingmonth,
          names,
          acceptLanguage,
        };

        const getResourceGroupUsageResult = usageReportsService.getResourceGroupUsage(getResourceGroupUsageParams);

        // all methods should return a Promise
        expectToBePromise(getResourceGroupUsageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}/resource_groups/{resource_group_id}/usage/{billingmonth}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs._names).toEqual(names);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.path.billingmonth).toEqual(billingmonth);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceGroupUsageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getResourceGroupUsageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getResourceGroupUsageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const resourceGroupId = 'testString';
        const billingmonth = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceGroupUsageParams = {
          accountId,
          resourceGroupId,
          billingmonth,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getResourceGroupUsage(getResourceGroupUsageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getResourceGroupUsage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getResourceGroupUsage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getResourceUsageAccount', () => {
    describe('positive tests', () => {
      function __getResourceUsageAccountTest() {
        // Construct the params object for operation getResourceUsageAccount
        const accountId = 'testString';
        const billingmonth = 'testString';
        const names = true;
        const tags = true;
        const acceptLanguage = 'testString';
        const limit = 30;
        const start = 'testString';
        const resourceGroupId = 'testString';
        const organizationId = 'testString';
        const resourceInstanceId = 'testString';
        const resourceId = 'testString';
        const planId = 'testString';
        const region = 'testString';
        const getResourceUsageAccountParams = {
          accountId,
          billingmonth,
          names,
          tags,
          acceptLanguage,
          limit,
          start,
          resourceGroupId,
          organizationId,
          resourceInstanceId,
          resourceId,
          planId,
          region,
        };

        const getResourceUsageAccountResult = usageReportsService.getResourceUsageAccount(getResourceUsageAccountParams);

        // all methods should return a Promise
        expectToBePromise(getResourceUsageAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}/resource_instances/usage/{billingmonth}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs._names).toEqual(names);
        expect(mockRequestOptions.qs._tags).toEqual(tags);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
        expect(mockRequestOptions.qs._start).toEqual(start);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.organization_id).toEqual(organizationId);
        expect(mockRequestOptions.qs.resource_instance_id).toEqual(resourceInstanceId);
        expect(mockRequestOptions.qs.resource_id).toEqual(resourceId);
        expect(mockRequestOptions.qs.plan_id).toEqual(planId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.billingmonth).toEqual(billingmonth);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceUsageAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getResourceUsageAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getResourceUsageAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const billingmonth = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceUsageAccountParams = {
          accountId,
          billingmonth,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getResourceUsageAccount(getResourceUsageAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getResourceUsageAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getResourceUsageAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetResourceUsageAccountPager tests', () => {
      const serviceUrl = usageReportsServiceOptions.url;
      const path = '/v4/accounts/testString/resource_instances/usage/testString';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?_start=1"},"total_count":2,"limit":1,"resources":[{"account_id":"account_id","resource_instance_id":"resource_instance_id","resource_instance_name":"resource_instance_name","resource_id":"resource_id","catalog_id":"catalog_id","resource_name":"resource_name","resource_group_id":"resource_group_id","resource_group_name":"resource_group_name","organization_id":"organization_id","organization_name":"organization_name","space_id":"space_id","space_name":"space_name","consumer_id":"consumer_id","region":"region","pricing_region":"pricing_region","pricing_country":"USA","currency_code":"USD","billable":true,"parent_resource_instance_id":"parent_resource_instance_id","plan_id":"plan_id","plan_name":"plan_name","pricing_plan_id":"pricing_plan_id","month":"2017-08","usage":[{"metric":"UP-TIME","metric_name":"UP-TIME","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130.0,"price":["anyValue"],"unit":"HOURS","unit_name":"HOURS","non_chargeable":true,"discounts":[{"ref":"Discount-d27beddb-111b-4bbf-8cb1-b770f531c1a9","name":"platform-discount","display_name":"Platform Service Discount","discount":5}],"volume_discount":15,"volume_cost":11}],"pending":true,"currency_rate":10.8716,"tags":["anyValue"],"service_tags":["anyValue"]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"account_id":"account_id","resource_instance_id":"resource_instance_id","resource_instance_name":"resource_instance_name","resource_id":"resource_id","catalog_id":"catalog_id","resource_name":"resource_name","resource_group_id":"resource_group_id","resource_group_name":"resource_group_name","organization_id":"organization_id","organization_name":"organization_name","space_id":"space_id","space_name":"space_name","consumer_id":"consumer_id","region":"region","pricing_region":"pricing_region","pricing_country":"USA","currency_code":"USD","billable":true,"parent_resource_instance_id":"parent_resource_instance_id","plan_id":"plan_id","plan_name":"plan_name","pricing_plan_id":"pricing_plan_id","month":"2017-08","usage":[{"metric":"UP-TIME","metric_name":"UP-TIME","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130.0,"price":["anyValue"],"unit":"HOURS","unit_name":"HOURS","non_chargeable":true,"discounts":[{"ref":"Discount-d27beddb-111b-4bbf-8cb1-b770f531c1a9","name":"platform-discount","display_name":"Platform Service Discount","discount":5}],"volume_discount":15,"volume_cost":11}],"pending":true,"currency_rate":10.8716,"tags":["anyValue"],"service_tags":["anyValue"]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'testString',
          billingmonth: 'testString',
          names: true,
          tags: true,
          acceptLanguage: 'testString',
          limit: 30,
          resourceGroupId: 'testString',
          organizationId: 'testString',
          resourceInstanceId: 'testString',
          resourceId: 'testString',
          planId: 'testString',
          region: 'testString',
        };
        const allResults = [];
        const pager = new UsageReportsV4.GetResourceUsageAccountPager(usageReportsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          accountId: 'testString',
          billingmonth: 'testString',
          names: true,
          tags: true,
          acceptLanguage: 'testString',
          limit: 30,
          resourceGroupId: 'testString',
          organizationId: 'testString',
          resourceInstanceId: 'testString',
          resourceId: 'testString',
          planId: 'testString',
          region: 'testString',
        };
        const pager = new UsageReportsV4.GetResourceUsageAccountPager(usageReportsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getResourceUsageResourceGroup', () => {
    describe('positive tests', () => {
      function __getResourceUsageResourceGroupTest() {
        // Construct the params object for operation getResourceUsageResourceGroup
        const accountId = 'testString';
        const resourceGroupId = 'testString';
        const billingmonth = 'testString';
        const names = true;
        const tags = true;
        const acceptLanguage = 'testString';
        const limit = 30;
        const start = 'testString';
        const resourceInstanceId = 'testString';
        const resourceId = 'testString';
        const planId = 'testString';
        const region = 'testString';
        const getResourceUsageResourceGroupParams = {
          accountId,
          resourceGroupId,
          billingmonth,
          names,
          tags,
          acceptLanguage,
          limit,
          start,
          resourceInstanceId,
          resourceId,
          planId,
          region,
        };

        const getResourceUsageResourceGroupResult = usageReportsService.getResourceUsageResourceGroup(getResourceUsageResourceGroupParams);

        // all methods should return a Promise
        expectToBePromise(getResourceUsageResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}/resource_groups/{resource_group_id}/resource_instances/usage/{billingmonth}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs._names).toEqual(names);
        expect(mockRequestOptions.qs._tags).toEqual(tags);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
        expect(mockRequestOptions.qs._start).toEqual(start);
        expect(mockRequestOptions.qs.resource_instance_id).toEqual(resourceInstanceId);
        expect(mockRequestOptions.qs.resource_id).toEqual(resourceId);
        expect(mockRequestOptions.qs.plan_id).toEqual(planId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.path.billingmonth).toEqual(billingmonth);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceUsageResourceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getResourceUsageResourceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getResourceUsageResourceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const resourceGroupId = 'testString';
        const billingmonth = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceUsageResourceGroupParams = {
          accountId,
          resourceGroupId,
          billingmonth,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getResourceUsageResourceGroup(getResourceUsageResourceGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getResourceUsageResourceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getResourceUsageResourceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetResourceUsageResourceGroupPager tests', () => {
      const serviceUrl = usageReportsServiceOptions.url;
      const path = '/v4/accounts/testString/resource_groups/testString/resource_instances/usage/testString';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?_start=1"},"total_count":2,"limit":1,"resources":[{"account_id":"account_id","resource_instance_id":"resource_instance_id","resource_instance_name":"resource_instance_name","resource_id":"resource_id","catalog_id":"catalog_id","resource_name":"resource_name","resource_group_id":"resource_group_id","resource_group_name":"resource_group_name","organization_id":"organization_id","organization_name":"organization_name","space_id":"space_id","space_name":"space_name","consumer_id":"consumer_id","region":"region","pricing_region":"pricing_region","pricing_country":"USA","currency_code":"USD","billable":true,"parent_resource_instance_id":"parent_resource_instance_id","plan_id":"plan_id","plan_name":"plan_name","pricing_plan_id":"pricing_plan_id","month":"2017-08","usage":[{"metric":"UP-TIME","metric_name":"UP-TIME","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130.0,"price":["anyValue"],"unit":"HOURS","unit_name":"HOURS","non_chargeable":true,"discounts":[{"ref":"Discount-d27beddb-111b-4bbf-8cb1-b770f531c1a9","name":"platform-discount","display_name":"Platform Service Discount","discount":5}],"volume_discount":15,"volume_cost":11}],"pending":true,"currency_rate":10.8716,"tags":["anyValue"],"service_tags":["anyValue"]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"account_id":"account_id","resource_instance_id":"resource_instance_id","resource_instance_name":"resource_instance_name","resource_id":"resource_id","catalog_id":"catalog_id","resource_name":"resource_name","resource_group_id":"resource_group_id","resource_group_name":"resource_group_name","organization_id":"organization_id","organization_name":"organization_name","space_id":"space_id","space_name":"space_name","consumer_id":"consumer_id","region":"region","pricing_region":"pricing_region","pricing_country":"USA","currency_code":"USD","billable":true,"parent_resource_instance_id":"parent_resource_instance_id","plan_id":"plan_id","plan_name":"plan_name","pricing_plan_id":"pricing_plan_id","month":"2017-08","usage":[{"metric":"UP-TIME","metric_name":"UP-TIME","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130.0,"price":["anyValue"],"unit":"HOURS","unit_name":"HOURS","non_chargeable":true,"discounts":[{"ref":"Discount-d27beddb-111b-4bbf-8cb1-b770f531c1a9","name":"platform-discount","display_name":"Platform Service Discount","discount":5}],"volume_discount":15,"volume_cost":11}],"pending":true,"currency_rate":10.8716,"tags":["anyValue"],"service_tags":["anyValue"]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'testString',
          resourceGroupId: 'testString',
          billingmonth: 'testString',
          names: true,
          tags: true,
          acceptLanguage: 'testString',
          limit: 30,
          resourceInstanceId: 'testString',
          resourceId: 'testString',
          planId: 'testString',
          region: 'testString',
        };
        const allResults = [];
        const pager = new UsageReportsV4.GetResourceUsageResourceGroupPager(usageReportsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          accountId: 'testString',
          resourceGroupId: 'testString',
          billingmonth: 'testString',
          names: true,
          tags: true,
          acceptLanguage: 'testString',
          limit: 30,
          resourceInstanceId: 'testString',
          resourceId: 'testString',
          planId: 'testString',
          region: 'testString',
        };
        const pager = new UsageReportsV4.GetResourceUsageResourceGroupPager(usageReportsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getResourceUsageOrg', () => {
    describe('positive tests', () => {
      function __getResourceUsageOrgTest() {
        // Construct the params object for operation getResourceUsageOrg
        const accountId = 'testString';
        const organizationId = 'testString';
        const billingmonth = 'testString';
        const names = true;
        const tags = true;
        const acceptLanguage = 'testString';
        const limit = 30;
        const start = 'testString';
        const resourceInstanceId = 'testString';
        const resourceId = 'testString';
        const planId = 'testString';
        const region = 'testString';
        const getResourceUsageOrgParams = {
          accountId,
          organizationId,
          billingmonth,
          names,
          tags,
          acceptLanguage,
          limit,
          start,
          resourceInstanceId,
          resourceId,
          planId,
          region,
        };

        const getResourceUsageOrgResult = usageReportsService.getResourceUsageOrg(getResourceUsageOrgParams);

        // all methods should return a Promise
        expectToBePromise(getResourceUsageOrgResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}/organizations/{organization_id}/resource_instances/usage/{billingmonth}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs._names).toEqual(names);
        expect(mockRequestOptions.qs._tags).toEqual(tags);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
        expect(mockRequestOptions.qs._start).toEqual(start);
        expect(mockRequestOptions.qs.resource_instance_id).toEqual(resourceInstanceId);
        expect(mockRequestOptions.qs.resource_id).toEqual(resourceId);
        expect(mockRequestOptions.qs.plan_id).toEqual(planId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.organization_id).toEqual(organizationId);
        expect(mockRequestOptions.path.billingmonth).toEqual(billingmonth);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceUsageOrgTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getResourceUsageOrgTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getResourceUsageOrgTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const organizationId = 'testString';
        const billingmonth = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceUsageOrgParams = {
          accountId,
          organizationId,
          billingmonth,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getResourceUsageOrg(getResourceUsageOrgParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getResourceUsageOrg({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getResourceUsageOrg();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetResourceUsageOrgPager tests', () => {
      const serviceUrl = usageReportsServiceOptions.url;
      const path = '/v4/accounts/testString/organizations/testString/resource_instances/usage/testString';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?_start=1"},"total_count":2,"limit":1,"resources":[{"account_id":"account_id","resource_instance_id":"resource_instance_id","resource_instance_name":"resource_instance_name","resource_id":"resource_id","catalog_id":"catalog_id","resource_name":"resource_name","resource_group_id":"resource_group_id","resource_group_name":"resource_group_name","organization_id":"organization_id","organization_name":"organization_name","space_id":"space_id","space_name":"space_name","consumer_id":"consumer_id","region":"region","pricing_region":"pricing_region","pricing_country":"USA","currency_code":"USD","billable":true,"parent_resource_instance_id":"parent_resource_instance_id","plan_id":"plan_id","plan_name":"plan_name","pricing_plan_id":"pricing_plan_id","month":"2017-08","usage":[{"metric":"UP-TIME","metric_name":"UP-TIME","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130.0,"price":["anyValue"],"unit":"HOURS","unit_name":"HOURS","non_chargeable":true,"discounts":[{"ref":"Discount-d27beddb-111b-4bbf-8cb1-b770f531c1a9","name":"platform-discount","display_name":"Platform Service Discount","discount":5}],"volume_discount":15,"volume_cost":11}],"pending":true,"currency_rate":10.8716,"tags":["anyValue"],"service_tags":["anyValue"]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"account_id":"account_id","resource_instance_id":"resource_instance_id","resource_instance_name":"resource_instance_name","resource_id":"resource_id","catalog_id":"catalog_id","resource_name":"resource_name","resource_group_id":"resource_group_id","resource_group_name":"resource_group_name","organization_id":"organization_id","organization_name":"organization_name","space_id":"space_id","space_name":"space_name","consumer_id":"consumer_id","region":"region","pricing_region":"pricing_region","pricing_country":"USA","currency_code":"USD","billable":true,"parent_resource_instance_id":"parent_resource_instance_id","plan_id":"plan_id","plan_name":"plan_name","pricing_plan_id":"pricing_plan_id","month":"2017-08","usage":[{"metric":"UP-TIME","metric_name":"UP-TIME","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130.0,"price":["anyValue"],"unit":"HOURS","unit_name":"HOURS","non_chargeable":true,"discounts":[{"ref":"Discount-d27beddb-111b-4bbf-8cb1-b770f531c1a9","name":"platform-discount","display_name":"Platform Service Discount","discount":5}],"volume_discount":15,"volume_cost":11}],"pending":true,"currency_rate":10.8716,"tags":["anyValue"],"service_tags":["anyValue"]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'testString',
          organizationId: 'testString',
          billingmonth: 'testString',
          names: true,
          tags: true,
          acceptLanguage: 'testString',
          limit: 30,
          resourceInstanceId: 'testString',
          resourceId: 'testString',
          planId: 'testString',
          region: 'testString',
        };
        const allResults = [];
        const pager = new UsageReportsV4.GetResourceUsageOrgPager(usageReportsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          accountId: 'testString',
          organizationId: 'testString',
          billingmonth: 'testString',
          names: true,
          tags: true,
          acceptLanguage: 'testString',
          limit: 30,
          resourceInstanceId: 'testString',
          resourceId: 'testString',
          planId: 'testString',
          region: 'testString',
        };
        const pager = new UsageReportsV4.GetResourceUsageOrgPager(usageReportsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getOrgUsage', () => {
    describe('positive tests', () => {
      function __getOrgUsageTest() {
        // Construct the params object for operation getOrgUsage
        const accountId = 'testString';
        const organizationId = 'testString';
        const billingmonth = 'testString';
        const names = true;
        const acceptLanguage = 'testString';
        const getOrgUsageParams = {
          accountId,
          organizationId,
          billingmonth,
          names,
          acceptLanguage,
        };

        const getOrgUsageResult = usageReportsService.getOrgUsage(getOrgUsageParams);

        // all methods should return a Promise
        expectToBePromise(getOrgUsageResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}/organizations/{organization_id}/usage/{billingmonth}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs._names).toEqual(names);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.organization_id).toEqual(organizationId);
        expect(mockRequestOptions.path.billingmonth).toEqual(billingmonth);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOrgUsageTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getOrgUsageTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getOrgUsageTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const organizationId = 'testString';
        const billingmonth = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOrgUsageParams = {
          accountId,
          organizationId,
          billingmonth,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getOrgUsage(getOrgUsageParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getOrgUsage({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getOrgUsage();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createReportsSnapshotConfig', () => {
    describe('positive tests', () => {
      function __createReportsSnapshotConfigTest() {
        // Construct the params object for operation createReportsSnapshotConfig
        const accountId = 'abc';
        const interval = 'daily';
        const cosBucket = 'bucket_name';
        const cosLocation = 'us-south';
        const cosReportsFolder = 'IBMCloud-Billing-Reports';
        const reportTypes = ['account_summary', 'enterprise_summary', 'account_resource_instance_usage'];
        const versioning = 'new';
        const createReportsSnapshotConfigParams = {
          accountId,
          interval,
          cosBucket,
          cosLocation,
          cosReportsFolder,
          reportTypes,
          versioning,
        };

        const createReportsSnapshotConfigResult = usageReportsService.createReportsSnapshotConfig(createReportsSnapshotConfigParams);

        // all methods should return a Promise
        expectToBePromise(createReportsSnapshotConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-reports-snapshot-config', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.interval).toEqual(interval);
        expect(mockRequestOptions.body.cos_bucket).toEqual(cosBucket);
        expect(mockRequestOptions.body.cos_location).toEqual(cosLocation);
        expect(mockRequestOptions.body.cos_reports_folder).toEqual(cosReportsFolder);
        expect(mockRequestOptions.body.report_types).toEqual(reportTypes);
        expect(mockRequestOptions.body.versioning).toEqual(versioning);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createReportsSnapshotConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __createReportsSnapshotConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __createReportsSnapshotConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'abc';
        const interval = 'daily';
        const cosBucket = 'bucket_name';
        const cosLocation = 'us-south';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createReportsSnapshotConfigParams = {
          accountId,
          interval,
          cosBucket,
          cosLocation,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.createReportsSnapshotConfig(createReportsSnapshotConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.createReportsSnapshotConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.createReportsSnapshotConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReportsSnapshotConfig', () => {
    describe('positive tests', () => {
      function __getReportsSnapshotConfigTest() {
        // Construct the params object for operation getReportsSnapshotConfig
        const accountId = 'abc';
        const getReportsSnapshotConfigParams = {
          accountId,
        };

        const getReportsSnapshotConfigResult = usageReportsService.getReportsSnapshotConfig(getReportsSnapshotConfigParams);

        // all methods should return a Promise
        expectToBePromise(getReportsSnapshotConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-reports-snapshot-config', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportsSnapshotConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getReportsSnapshotConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getReportsSnapshotConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'abc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportsSnapshotConfigParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getReportsSnapshotConfig(getReportsSnapshotConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getReportsSnapshotConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getReportsSnapshotConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateReportsSnapshotConfig', () => {
    describe('positive tests', () => {
      function __updateReportsSnapshotConfigTest() {
        // Construct the params object for operation updateReportsSnapshotConfig
        const accountId = 'abc';
        const interval = 'daily';
        const cosBucket = 'bucket_name';
        const cosLocation = 'us-south';
        const cosReportsFolder = 'IBMCloud-Billing-Reports';
        const reportTypes = ['account_summary', 'enterprise_summary', 'account_resource_instance_usage'];
        const versioning = 'new';
        const updateReportsSnapshotConfigParams = {
          accountId,
          interval,
          cosBucket,
          cosLocation,
          cosReportsFolder,
          reportTypes,
          versioning,
        };

        const updateReportsSnapshotConfigResult = usageReportsService.updateReportsSnapshotConfig(updateReportsSnapshotConfigParams);

        // all methods should return a Promise
        expectToBePromise(updateReportsSnapshotConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-reports-snapshot-config', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.interval).toEqual(interval);
        expect(mockRequestOptions.body.cos_bucket).toEqual(cosBucket);
        expect(mockRequestOptions.body.cos_location).toEqual(cosLocation);
        expect(mockRequestOptions.body.cos_reports_folder).toEqual(cosReportsFolder);
        expect(mockRequestOptions.body.report_types).toEqual(reportTypes);
        expect(mockRequestOptions.body.versioning).toEqual(versioning);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateReportsSnapshotConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __updateReportsSnapshotConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __updateReportsSnapshotConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'abc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateReportsSnapshotConfigParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.updateReportsSnapshotConfig(updateReportsSnapshotConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.updateReportsSnapshotConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.updateReportsSnapshotConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteReportsSnapshotConfig', () => {
    describe('positive tests', () => {
      function __deleteReportsSnapshotConfigTest() {
        // Construct the params object for operation deleteReportsSnapshotConfig
        const accountId = 'abc';
        const deleteReportsSnapshotConfigParams = {
          accountId,
        };

        const deleteReportsSnapshotConfigResult = usageReportsService.deleteReportsSnapshotConfig(deleteReportsSnapshotConfigParams);

        // all methods should return a Promise
        expectToBePromise(deleteReportsSnapshotConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-reports-snapshot-config', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteReportsSnapshotConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __deleteReportsSnapshotConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __deleteReportsSnapshotConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'abc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteReportsSnapshotConfigParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.deleteReportsSnapshotConfig(deleteReportsSnapshotConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.deleteReportsSnapshotConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.deleteReportsSnapshotConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('validateReportsSnapshotConfig', () => {
    describe('positive tests', () => {
      function __validateReportsSnapshotConfigTest() {
        // Construct the params object for operation validateReportsSnapshotConfig
        const accountId = 'abc';
        const interval = 'daily';
        const cosBucket = 'bucket_name';
        const cosLocation = 'us-south';
        const cosReportsFolder = 'IBMCloud-Billing-Reports';
        const reportTypes = ['account_summary', 'enterprise_summary', 'account_resource_instance_usage'];
        const versioning = 'new';
        const validateReportsSnapshotConfigParams = {
          accountId,
          interval,
          cosBucket,
          cosLocation,
          cosReportsFolder,
          reportTypes,
          versioning,
        };

        const validateReportsSnapshotConfigResult = usageReportsService.validateReportsSnapshotConfig(validateReportsSnapshotConfigParams);

        // all methods should return a Promise
        expectToBePromise(validateReportsSnapshotConfigResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-reports-snapshot-config/validate', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.interval).toEqual(interval);
        expect(mockRequestOptions.body.cos_bucket).toEqual(cosBucket);
        expect(mockRequestOptions.body.cos_location).toEqual(cosLocation);
        expect(mockRequestOptions.body.cos_reports_folder).toEqual(cosReportsFolder);
        expect(mockRequestOptions.body.report_types).toEqual(reportTypes);
        expect(mockRequestOptions.body.versioning).toEqual(versioning);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __validateReportsSnapshotConfigTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __validateReportsSnapshotConfigTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __validateReportsSnapshotConfigTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'abc';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const validateReportsSnapshotConfigParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.validateReportsSnapshotConfig(validateReportsSnapshotConfigParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.validateReportsSnapshotConfig({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.validateReportsSnapshotConfig();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getReportsSnapshot', () => {
    describe('positive tests', () => {
      function __getReportsSnapshotTest() {
        // Construct the params object for operation getReportsSnapshot
        const accountId = 'abc';
        const month = '2023-02';
        const dateFrom = 1675209600000;
        const dateTo = 1675987200000;
        const limit = 30;
        const start = 'testString';
        const getReportsSnapshotParams = {
          accountId,
          month,
          dateFrom,
          dateTo,
          limit,
          start,
        };

        const getReportsSnapshotResult = usageReportsService.getReportsSnapshot(getReportsSnapshotParams);

        // all methods should return a Promise
        expectToBePromise(getReportsSnapshotResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-reports-snapshots', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.month).toEqual(month);
        expect(mockRequestOptions.qs.date_from).toEqual(dateFrom);
        expect(mockRequestOptions.qs.date_to).toEqual(dateTo);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
        expect(mockRequestOptions.qs._start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportsSnapshotTest();

        // enable retries and test again
        createRequestMock.mockClear();
        usageReportsService.enableRetries();
        __getReportsSnapshotTest();

        // disable retries and test again
        createRequestMock.mockClear();
        usageReportsService.disableRetries();
        __getReportsSnapshotTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'abc';
        const month = '2023-02';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportsSnapshotParams = {
          accountId,
          month,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        usageReportsService.getReportsSnapshot(getReportsSnapshotParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await usageReportsService.getReportsSnapshot({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await usageReportsService.getReportsSnapshot();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetReportsSnapshotPager tests', () => {
      const serviceUrl = usageReportsServiceOptions.url;
      const path = '/v1/billing-reports-snapshots';
      const mockPagerResponse1 =
        '{"snapshots":[{"account_id":"abc","month":"2023-06","account_type":"account","expected_processed_at":1687470383610,"state":"enabled","billing_period":{"start":"2023-06-01T00:00:00.000Z","end":"2023-06-30T23:59:59.999Z"},"snapshot_id":"1685577600000","charset":"UTF-8","compression":"GZIP","content_type":"text/csv","bucket":"bucket_name","version":"1.0","created_on":"2023-06-22T21:47:28.297Z","report_types":[{"type":"account_summary","version":"1.0"}],"files":[{"report_types":"account_summary","location":"june/2023-06/1685577600000/2023-06-account-summary-272b9a4f73e11030d0ba037daee47a35.csv.gz","account_id":"abc"}],"processed_at":1687470448297}],"next":{"href":"https://myhost.com/somePath?_start=1"},"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"snapshots":[{"account_id":"abc","month":"2023-06","account_type":"account","expected_processed_at":1687470383610,"state":"enabled","billing_period":{"start":"2023-06-01T00:00:00.000Z","end":"2023-06-30T23:59:59.999Z"},"snapshot_id":"1685577600000","charset":"UTF-8","compression":"GZIP","content_type":"text/csv","bucket":"bucket_name","version":"1.0","created_on":"2023-06-22T21:47:28.297Z","report_types":[{"type":"account_summary","version":"1.0"}],"files":[{"report_types":"account_summary","location":"june/2023-06/1685577600000/2023-06-account-summary-272b9a4f73e11030d0ba037daee47a35.csv.gz","account_id":"abc"}],"processed_at":1687470448297}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'abc',
          month: '2023-02',
          dateFrom: 1675209600000,
          dateTo: 1675987200000,
          limit: 30,
        };
        const allResults = [];
        const pager = new UsageReportsV4.GetReportsSnapshotPager(usageReportsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          accountId: 'abc',
          month: '2023-02',
          dateFrom: 1675209600000,
          dateTo: 1675987200000,
          limit: 30,
        };
        const pager = new UsageReportsV4.GetReportsSnapshotPager(usageReportsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });
});
