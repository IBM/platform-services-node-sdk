/**
 * (C) Copyright IBM Corp. 2023.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const EnterpriseBillingUnitsV1 = require('../../dist/enterprise-billing-units/v1');
const nock = require('nock');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const enterpriseBillingUnitsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://billing.cloud.ibm.com',
};

const enterpriseBillingUnitsService = new EnterpriseBillingUnitsV1(enterpriseBillingUnitsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(enterpriseBillingUnitsService, 'createRequest');
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
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('EnterpriseBillingUnitsV1', () => {

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
      const testInstance = EnterpriseBillingUnitsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(EnterpriseBillingUnitsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(EnterpriseBillingUnitsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(EnterpriseBillingUnitsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = EnterpriseBillingUnitsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(EnterpriseBillingUnitsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new EnterpriseBillingUnitsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new EnterpriseBillingUnitsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(EnterpriseBillingUnitsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getBillingUnit', () => {
    describe('positive tests', () => {
      function __getBillingUnitTest() {
        // Construct the params object for operation getBillingUnit
        const billingUnitId = 'testString';
        const getBillingUnitParams = {
          billingUnitId,
        };

        const getBillingUnitResult = enterpriseBillingUnitsService.getBillingUnit(getBillingUnitParams);

        // all methods should return a Promise
        expectToBePromise(getBillingUnitResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-units/{billing_unit_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.billing_unit_id).toEqual(billingUnitId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBillingUnitTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.enableRetries();
        __getBillingUnitTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.disableRetries();
        __getBillingUnitTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const billingUnitId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBillingUnitParams = {
          billingUnitId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseBillingUnitsService.getBillingUnit(getBillingUnitParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseBillingUnitsService.getBillingUnit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseBillingUnitsService.getBillingUnit();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listBillingUnits', () => {
    describe('positive tests', () => {
      function __listBillingUnitsTest() {
        // Construct the params object for operation listBillingUnits
        const accountId = 'testString';
        const enterpriseId = 'testString';
        const accountGroupId = 'testString';
        const limit = 1;
        const start = 38;
        const listBillingUnitsParams = {
          accountId,
          enterpriseId,
          accountGroupId,
          limit,
          start,
        };

        const listBillingUnitsResult = enterpriseBillingUnitsService.listBillingUnits(listBillingUnitsParams);

        // all methods should return a Promise
        expectToBePromise(listBillingUnitsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-units', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.enterprise_id).toEqual(enterpriseId);
        expect(mockRequestOptions.qs.account_group_id).toEqual(accountGroupId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBillingUnitsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.enableRetries();
        __listBillingUnitsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.disableRetries();
        __listBillingUnitsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBillingUnitsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseBillingUnitsService.listBillingUnits(listBillingUnitsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        enterpriseBillingUnitsService.listBillingUnits({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('BillingUnitsPager tests', () => {
      const serviceUrl = enterpriseBillingUnitsServiceOptions.url;
      const path = '/v1/billing-units';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","crn":"crn:v1:bluemix:public:billing::a/<<enterprise_account_id>>::billing-unit:<<billing_unit_id>>","name":"name","enterprise_id":"enterprise_id","currency_code":"USD","country_code":"USA","master":true,"created_at":"2019-05-01T00:00:00.000Z"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","crn":"crn:v1:bluemix:public:billing::a/<<enterprise_account_id>>::billing-unit:<<billing_unit_id>>","name":"name","enterprise_id":"enterprise_id","currency_code":"USD","country_code":"USA","master":true,"created_at":"2019-05-01T00:00:00.000Z"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'testString',
          enterpriseId: 'testString',
          accountGroupId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new EnterpriseBillingUnitsV1.BillingUnitsPager(enterpriseBillingUnitsService, params);
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
          enterpriseId: 'testString',
          accountGroupId: 'testString',
          limit: 10,
        };
        const pager = new EnterpriseBillingUnitsV1.BillingUnitsPager(enterpriseBillingUnitsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listBillingOptions', () => {
    describe('positive tests', () => {
      function __listBillingOptionsTest() {
        // Construct the params object for operation listBillingOptions
        const billingUnitId = 'testString';
        const limit = 1;
        const start = 38;
        const listBillingOptionsParams = {
          billingUnitId,
          limit,
          start,
        };

        const listBillingOptionsResult = enterpriseBillingUnitsService.listBillingOptions(listBillingOptionsParams);

        // all methods should return a Promise
        expectToBePromise(listBillingOptionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-options', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.billing_unit_id).toEqual(billingUnitId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listBillingOptionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.enableRetries();
        __listBillingOptionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.disableRetries();
        __listBillingOptionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const billingUnitId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listBillingOptionsParams = {
          billingUnitId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseBillingUnitsService.listBillingOptions(listBillingOptionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseBillingUnitsService.listBillingOptions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseBillingUnitsService.listBillingOptions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('BillingOptionsPager tests', () => {
      const serviceUrl = enterpriseBillingUnitsServiceOptions.url;
      const path = '/v1/billing-options';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","billing_unit_id":"billing_unit_id","start_date":"2019-05-01T00:00:00.000Z","end_date":"2020-05-01T00:00:00.000Z","state":"ACTIVE","type":"SUBSCRIPTION","category":"PLATFORM","payment_instrument":{"anyKey":"anyValue"},"duration_in_months":11,"line_item_id":10,"billing_system":{"anyKey":"anyValue"},"renewal_mode_code":"renewal_mode_code","updated_at":"2019-06-01T00:00:00.000Z"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","billing_unit_id":"billing_unit_id","start_date":"2019-05-01T00:00:00.000Z","end_date":"2020-05-01T00:00:00.000Z","state":"ACTIVE","type":"SUBSCRIPTION","category":"PLATFORM","payment_instrument":{"anyKey":"anyValue"},"duration_in_months":11,"line_item_id":10,"billing_system":{"anyKey":"anyValue"},"renewal_mode_code":"renewal_mode_code","updated_at":"2019-06-01T00:00:00.000Z"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          billingUnitId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new EnterpriseBillingUnitsV1.BillingOptionsPager(enterpriseBillingUnitsService, params);
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
          billingUnitId: 'testString',
          limit: 10,
        };
        const pager = new EnterpriseBillingUnitsV1.BillingOptionsPager(enterpriseBillingUnitsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getCreditPools', () => {
    describe('positive tests', () => {
      function __getCreditPoolsTest() {
        // Construct the params object for operation getCreditPools
        const billingUnitId = 'testString';
        const date = 'testString';
        const type = 'testString';
        const limit = 1;
        const start = 38;
        const getCreditPoolsParams = {
          billingUnitId,
          date,
          type,
          limit,
          start,
        };

        const getCreditPoolsResult = enterpriseBillingUnitsService.getCreditPools(getCreditPoolsParams);

        // all methods should return a Promise
        expectToBePromise(getCreditPoolsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/credit-pools', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.billing_unit_id).toEqual(billingUnitId);
        expect(mockRequestOptions.qs.date).toEqual(date);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCreditPoolsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.enableRetries();
        __getCreditPoolsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseBillingUnitsService.disableRetries();
        __getCreditPoolsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const billingUnitId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCreditPoolsParams = {
          billingUnitId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseBillingUnitsService.getCreditPools(getCreditPoolsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseBillingUnitsService.getCreditPools({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseBillingUnitsService.getCreditPools();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetCreditPoolsPager tests', () => {
      const serviceUrl = enterpriseBillingUnitsServiceOptions.url;
      const path = '/v1/credit-pools';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"type":"PLATFORM","currency_code":"USD","billing_unit_id":"billing_unit_id","term_credits":[{"billing_option_id":"JWX986YRGFSHACQUEFOI","category":"PLATFORM","start_date":"2019-05-01T00:00:00.000Z","end_date":"2020-04-30T23:59:29.999Z","total_credits":10000,"starting_balance":9000,"used_credits":9500,"current_balance":0,"resources":[{"anyKey":"anyValue"}]}],"overage":{"cost":500,"resources":[{"anyKey":"anyValue"}]}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"type":"PLATFORM","currency_code":"USD","billing_unit_id":"billing_unit_id","term_credits":[{"billing_option_id":"JWX986YRGFSHACQUEFOI","category":"PLATFORM","start_date":"2019-05-01T00:00:00.000Z","end_date":"2020-04-30T23:59:29.999Z","total_credits":10000,"starting_balance":9000,"used_credits":9500,"current_balance":0,"resources":[{"anyKey":"anyValue"}]}],"overage":{"cost":500,"resources":[{"anyKey":"anyValue"}]}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          billingUnitId: 'testString',
          date: 'testString',
          type: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new EnterpriseBillingUnitsV1.GetCreditPoolsPager(enterpriseBillingUnitsService, params);
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
          billingUnitId: 'testString',
          date: 'testString',
          type: 'testString',
          limit: 10,
        };
        const pager = new EnterpriseBillingUnitsV1.GetCreditPoolsPager(enterpriseBillingUnitsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });
});
