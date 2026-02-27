/**
 * (C) Copyright IBM Corp. 2026.
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

const { NoAuthAuthenticator } = sdkCorePackage;
const AccountManagementV4 = require('../../dist/account-management/v4');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
} = require('@ibm-cloud/sdk-test-utilities');

const accountManagementServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://accounts.test.cloud.ibm.com',
};

const accountManagementService = new AccountManagementV4(accountManagementServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(accountManagementService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('AccountManagementV4', () => {
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
      const testInstance = AccountManagementV4.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(AccountManagementV4.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(AccountManagementV4.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(AccountManagementV4);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = AccountManagementV4.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(AccountManagementV4);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new AccountManagementV4(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new AccountManagementV4(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(AccountManagementV4.DEFAULT_SERVICE_URL);
    });
  });

  describe('getAccount', () => {
    describe('positive tests', () => {
      function __getAccountTest() {
        // Construct the params object for operation getAccount
        const accountId = 'testString';
        const getAccountParams = {
          accountId,
        };

        const getAccountResult = accountManagementService.getAccount(getAccountParams);

        // all methods should return a Promise
        expectToBePromise(getAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v4/accounts/{account_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        accountManagementService.enableRetries();
        __getAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        accountManagementService.disableRetries();
        __getAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        accountManagementService.getAccount(getAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await accountManagementService.getAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await accountManagementService.getAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
