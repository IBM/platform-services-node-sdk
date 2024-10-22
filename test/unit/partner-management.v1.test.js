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
const PartnerUsageReportsV1 = require('../../dist/partner-usage-reports/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
} = require('@ibm-cloud/sdk-test-utilities');

const partnerUsageReportsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://partner.cloud.ibm.com',
};

const partnerUsageReportsService = new PartnerUsageReportsV1(partnerUsageReportsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(partnerUsageReportsService, 'createRequest');
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

describe('PartnerUsageReportsV1', () => {
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
      const testInstance = PartnerUsageReportsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(PartnerUsageReportsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(PartnerUsageReportsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(PartnerUsageReportsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = PartnerUsageReportsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(PartnerUsageReportsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new PartnerUsageReportsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new PartnerUsageReportsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(PartnerUsageReportsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getResourceUsageReport', () => {
    describe('positive tests', () => {
      function __getResourceUsageReportTest() {
        // Construct the params object for operation getResourceUsageReport
        const partnerId = 'testString';
        const resellerId = 'testString';
        const customerId = 'testString';
        const children = false;
        const month = '2024-01';
        const viewpoint = 'DISTRIBUTOR';
        const recurse = false;
        const limit = 30;
        const offset = 'testString';
        const getResourceUsageReportParams = {
          partnerId,
          resellerId,
          customerId,
          children,
          month,
          viewpoint,
          recurse,
          limit,
          offset,
        };

        const getResourceUsageReportResult = partnerUsageReportsService.getResourceUsageReport(getResourceUsageReportParams);

        // all methods should return a Promise
        expectToBePromise(getResourceUsageReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/resource-usage-reports', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.partner_id).toEqual(partnerId);
        expect(mockRequestOptions.qs.reseller_id).toEqual(resellerId);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
        expect(mockRequestOptions.qs.children).toEqual(children);
        expect(mockRequestOptions.qs.month).toEqual(month);
        expect(mockRequestOptions.qs.viewpoint).toEqual(viewpoint);
        expect(mockRequestOptions.qs.recurse).toEqual(recurse);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceUsageReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        partnerUsageReportsService.enableRetries();
        __getResourceUsageReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        partnerUsageReportsService.disableRetries();
        __getResourceUsageReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const partnerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceUsageReportParams = {
          partnerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        partnerUsageReportsService.getResourceUsageReport(getResourceUsageReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await partnerUsageReportsService.getResourceUsageReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await partnerUsageReportsService.getResourceUsageReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetResourceUsageReportPager tests', () => {
      const serviceUrl = partnerUsageReportsServiceOptions.url;
      const path = '/v1/resource-usage-reports';
      const mockPagerResponse1 =
        '{"next":{"offset":"1"},"reports":[{"entity_id":"<distributor_enterprise_id>","entity_type":"enterprise","entity_crn":"crn:v1:bluemix:public:enterprise::a/fa359b76ff2c41eda727aad47b7e4063::enterprise:33a7eb04e7d547cd9489e90c99d476a5","entity_name":"Arrow","entity_partner_type":"DISTRIBUTOR","viewpoint":"DISTRIBUTOR","month":"2024-01","currency_code":"EUR","country_code":"FRA","billable_cost":2331828.33275813,"billable_rated_cost":3817593.35186263,"non_billable_cost":0,"non_billable_rated_cost":0,"resources":[{"resource_id":"cloudant","resource_name":"Cloudant","billable_cost":75,"billable_rated_cost":75,"non_billable_cost":0,"non_billable_rated_cost":0,"plans":[{"plan_id":"cloudant-standard","pricing_region":"Standard","pricing_plan_id":"billable:v4:cloudant-standard::1552694400000:","billable":true,"cost":75,"rated_cost":75,"usage":[{"metric":"GB_STORAGE_ACCRUED_PER_MONTH","unit":"GIGABYTE_MONTHS","quantity":10,"rateable_quantity":10,"cost":10,"rated_cost":10,"price":[{"anyKey":"anyValue"}]}]}]}]}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"reports":[{"entity_id":"<distributor_enterprise_id>","entity_type":"enterprise","entity_crn":"crn:v1:bluemix:public:enterprise::a/fa359b76ff2c41eda727aad47b7e4063::enterprise:33a7eb04e7d547cd9489e90c99d476a5","entity_name":"Arrow","entity_partner_type":"DISTRIBUTOR","viewpoint":"DISTRIBUTOR","month":"2024-01","currency_code":"EUR","country_code":"FRA","billable_cost":2331828.33275813,"billable_rated_cost":3817593.35186263,"non_billable_cost":0,"non_billable_rated_cost":0,"resources":[{"resource_id":"cloudant","resource_name":"Cloudant","billable_cost":75,"billable_rated_cost":75,"non_billable_cost":0,"non_billable_rated_cost":0,"plans":[{"plan_id":"cloudant-standard","pricing_region":"Standard","pricing_plan_id":"billable:v4:cloudant-standard::1552694400000:","billable":true,"cost":75,"rated_cost":75,"usage":[{"metric":"GB_STORAGE_ACCRUED_PER_MONTH","unit":"GIGABYTE_MONTHS","quantity":10,"rateable_quantity":10,"cost":10,"rated_cost":10,"price":[{"anyKey":"anyValue"}]}]}]}]}],"total_count":2,"limit":1}';

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
          partnerId: 'testString',
          resellerId: 'testString',
          customerId: 'testString',
          children: false,
          month: '2024-01',
          viewpoint: 'DISTRIBUTOR',
          recurse: false,
          limit: 10,
        };
        const allResults = [];
        const pager = new PartnerUsageReportsV1.GetResourceUsageReportPager(partnerUsageReportsService, params);
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
          partnerId: 'testString',
          resellerId: 'testString',
          customerId: 'testString',
          children: false,
          month: '2024-01',
          viewpoint: 'DISTRIBUTOR',
          recurse: false,
          limit: 10,
        };
        const pager = new PartnerUsageReportsV1.GetResourceUsageReportPager(partnerUsageReportsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });
});