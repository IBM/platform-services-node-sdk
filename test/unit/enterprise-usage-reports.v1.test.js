/**
 * (C) Copyright IBM Corp. 2022.
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

const { NoAuthAuthenticator } = core;

const EnterpriseUsageReportsV1 = require('../../dist/enterprise-usage-reports/v1');
const nock = require('nock');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const enterpriseUsageReportsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://enterprise.cloud.ibm.com',
};

const enterpriseUsageReportsService = new EnterpriseUsageReportsV1(enterpriseUsageReportsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(enterpriseUsageReportsService, 'createRequest');
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

describe('EnterpriseUsageReportsV1', () => {

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
      const testInstance = EnterpriseUsageReportsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(EnterpriseUsageReportsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(EnterpriseUsageReportsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(EnterpriseUsageReportsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = EnterpriseUsageReportsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(EnterpriseUsageReportsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new EnterpriseUsageReportsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new EnterpriseUsageReportsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(EnterpriseUsageReportsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getResourceUsageReport', () => {
    describe('positive tests', () => {
      function __getResourceUsageReportTest() {
        // Construct the params object for operation getResourceUsageReport
        const enterpriseId = 'abc12340d4bf4e36b0423d209b286f24';
        const accountGroupId = 'def456a237b94b9a9238ef024e204c9f';
        const accountId = '987abcba31834216b8c726a7dd9eb8d6';
        const children = true;
        const month = '2019-06';
        const billingUnitId = 'testString';
        const limit = 10;
        const offset = 'testString';
        const getResourceUsageReportParams = {
          enterpriseId,
          accountGroupId,
          accountId,
          children,
          month,
          billingUnitId,
          limit,
          offset,
        };

        const getResourceUsageReportResult = enterpriseUsageReportsService.getResourceUsageReport(getResourceUsageReportParams);

        // all methods should return a Promise
        expectToBePromise(getResourceUsageReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/resource-usage-reports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.enterprise_id).toEqual(enterpriseId);
        expect(mockRequestOptions.qs.account_group_id).toEqual(accountGroupId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.children).toEqual(children);
        expect(mockRequestOptions.qs.month).toEqual(month);
        expect(mockRequestOptions.qs.billing_unit_id).toEqual(billingUnitId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceUsageReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseUsageReportsService.enableRetries();
        __getResourceUsageReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseUsageReportsService.disableRetries();
        __getResourceUsageReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceUsageReportParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseUsageReportsService.getResourceUsageReport(getResourceUsageReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        enterpriseUsageReportsService.getResourceUsageReport({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('GetResourceUsageReportPager tests', () => {
      const serviceUrl = enterpriseUsageReportsServiceOptions.url;
      const path = '/v1/resource-usage-reports';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"reports":[{"entity_id":"de129b787b86403db7d3a14be2ae5f76","entity_type":"enterprise","entity_crn":"crn:v1:bluemix:public:enterprise::a/e9a57260546c4b4aa9ebfa316a82e56e::enterprise:de129b787b86403db7d3a14be2ae5f76","entity_name":"Platform-Services","billing_unit_id":"65719a07280a4022a9efa2f6ff4c3369","billing_unit_crn":"crn:v1:bluemix:public:billing::a/3f99f8accbc848ea96f3c61a0ae22c44::billing-unit:65719a07280a4022a9efa2f6ff4c3369","billing_unit_name":"Operations","country_code":"USA","currency_code":"USD","month":"2017-08","billable_cost":13,"non_billable_cost":17,"billable_rated_cost":19,"non_billable_rated_cost":23,"resources":[{"resource_id":"resource_id","billable_cost":13,"billable_rated_cost":19,"non_billable_cost":17,"non_billable_rated_cost":23,"plans":[{"plan_id":"plan_id","pricing_region":"pricing_region","pricing_plan_id":"pricing_plan_id","billable":true,"cost":4,"rated_cost":10,"usage":[{"metric":"UP-TIME","unit":"HOURS","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130,"price":[{"anyKey":"anyValue"}]}]}]}]}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"reports":[{"entity_id":"de129b787b86403db7d3a14be2ae5f76","entity_type":"enterprise","entity_crn":"crn:v1:bluemix:public:enterprise::a/e9a57260546c4b4aa9ebfa316a82e56e::enterprise:de129b787b86403db7d3a14be2ae5f76","entity_name":"Platform-Services","billing_unit_id":"65719a07280a4022a9efa2f6ff4c3369","billing_unit_crn":"crn:v1:bluemix:public:billing::a/3f99f8accbc848ea96f3c61a0ae22c44::billing-unit:65719a07280a4022a9efa2f6ff4c3369","billing_unit_name":"Operations","country_code":"USA","currency_code":"USD","month":"2017-08","billable_cost":13,"non_billable_cost":17,"billable_rated_cost":19,"non_billable_rated_cost":23,"resources":[{"resource_id":"resource_id","billable_cost":13,"billable_rated_cost":19,"non_billable_cost":17,"non_billable_rated_cost":23,"plans":[{"plan_id":"plan_id","pricing_region":"pricing_region","pricing_plan_id":"pricing_plan_id","billable":true,"cost":4,"rated_cost":10,"usage":[{"metric":"UP-TIME","unit":"HOURS","quantity":711.11,"rateable_quantity":700,"cost":123.45,"rated_cost":130,"price":[{"anyKey":"anyValue"}]}]}]}]}],"total_count":2,"limit":1}';

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
          enterpriseId: 'abc12340d4bf4e36b0423d209b286f24',
          accountGroupId: 'def456a237b94b9a9238ef024e204c9f',
          accountId: '987abcba31834216b8c726a7dd9eb8d6',
          children: true,
          month: '2019-06',
          billingUnitId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new EnterpriseUsageReportsV1.GetResourceUsageReportPager(enterpriseUsageReportsService, params);
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
          enterpriseId: 'abc12340d4bf4e36b0423d209b286f24',
          accountGroupId: 'def456a237b94b9a9238ef024e204c9f',
          accountId: '987abcba31834216b8c726a7dd9eb8d6',
          children: true,
          month: '2019-06',
          billingUnitId: 'testString',
          limit: 10,
        };
        const pager = new EnterpriseUsageReportsV1.GetResourceUsageReportPager(enterpriseUsageReportsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });
});
