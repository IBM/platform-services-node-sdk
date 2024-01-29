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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;

const PartnerBillingUnitsV1 = require('../../dist/partner-billing-units/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
} = unitTestUtils;

const partnerBillingUnitsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://partner.cloud.ibm.com',
};

const partnerBillingUnitsService = new PartnerBillingUnitsV1(partnerBillingUnitsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(partnerBillingUnitsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('PartnerBillingUnitsV1', () => {

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
      const testInstance = PartnerBillingUnitsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(PartnerBillingUnitsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(PartnerBillingUnitsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(PartnerBillingUnitsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = PartnerBillingUnitsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(PartnerBillingUnitsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new PartnerBillingUnitsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new PartnerBillingUnitsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(PartnerBillingUnitsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getBillingOptions', () => {
    describe('positive tests', () => {
      function __getBillingOptionsTest() {
        // Construct the params object for operation getBillingOptions
        const partnerId = 'testString';
        const customerId = 'testString';
        const resellerId = 'testString';
        const date = '2024-01';
        const limit = 30;
        const getBillingOptionsParams = {
          partnerId,
          customerId,
          resellerId,
          date,
          limit,
        };

        const getBillingOptionsResult = partnerBillingUnitsService.getBillingOptions(getBillingOptionsParams);

        // all methods should return a Promise
        expectToBePromise(getBillingOptionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/billing-options', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.partner_id).toEqual(partnerId);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
        expect(mockRequestOptions.qs.reseller_id).toEqual(resellerId);
        expect(mockRequestOptions.qs.date).toEqual(date);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getBillingOptionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        partnerBillingUnitsService.enableRetries();
        __getBillingOptionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        partnerBillingUnitsService.disableRetries();
        __getBillingOptionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const partnerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getBillingOptionsParams = {
          partnerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        partnerBillingUnitsService.getBillingOptions(getBillingOptionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await partnerBillingUnitsService.getBillingOptions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await partnerBillingUnitsService.getBillingOptions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCreditPoolsReport', () => {
    describe('positive tests', () => {
      function __getCreditPoolsReportTest() {
        // Construct the params object for operation getCreditPoolsReport
        const partnerId = 'testString';
        const customerId = 'testString';
        const resellerId = 'testString';
        const date = '2024-01';
        const limit = 30;
        const getCreditPoolsReportParams = {
          partnerId,
          customerId,
          resellerId,
          date,
          limit,
        };

        const getCreditPoolsReportResult = partnerBillingUnitsService.getCreditPoolsReport(getCreditPoolsReportParams);

        // all methods should return a Promise
        expectToBePromise(getCreditPoolsReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/credit-pools', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.partner_id).toEqual(partnerId);
        expect(mockRequestOptions.qs.customer_id).toEqual(customerId);
        expect(mockRequestOptions.qs.reseller_id).toEqual(resellerId);
        expect(mockRequestOptions.qs.date).toEqual(date);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCreditPoolsReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        partnerBillingUnitsService.enableRetries();
        __getCreditPoolsReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        partnerBillingUnitsService.disableRetries();
        __getCreditPoolsReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const partnerId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCreditPoolsReportParams = {
          partnerId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        partnerBillingUnitsService.getCreditPoolsReport(getCreditPoolsReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await partnerBillingUnitsService.getCreditPoolsReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await partnerBillingUnitsService.getCreditPoolsReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
