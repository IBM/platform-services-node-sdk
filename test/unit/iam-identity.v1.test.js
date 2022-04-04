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

const { NoAuthAuthenticator, unitTestUtils } = core;

const IamIdentityV1 = require('../../dist/iam-identity/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const iamIdentityServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://iam.cloud.ibm.com',
};

const iamIdentityService = new IamIdentityV1(iamIdentityServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(iamIdentityService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('IamIdentityV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = IamIdentityV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(IamIdentityV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(IamIdentityV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(IamIdentityV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = IamIdentityV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(IamIdentityV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new IamIdentityV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new IamIdentityV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(IamIdentityV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('listApiKeys', () => {
    describe('positive tests', () => {
      function __listApiKeysTest() {
        // Construct the params object for operation listApiKeys
        const accountId = 'testString';
        const iamId = 'testString';
        const pagesize = 38;
        const pagetoken = 'testString';
        const scope = 'entity';
        const type = 'user';
        const sort = 'testString';
        const order = 'asc';
        const includeHistory = false;
        const listApiKeysParams = {
          accountId: accountId,
          iamId: iamId,
          pagesize: pagesize,
          pagetoken: pagetoken,
          scope: scope,
          type: type,
          sort: sort,
          order: order,
          includeHistory: includeHistory,
        };

        const listApiKeysResult = iamIdentityService.listApiKeys(listApiKeysParams);

        // all methods should return a Promise
        expectToBePromise(listApiKeysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.iam_id).toEqual(iamId);
        expect(mockRequestOptions.qs.pagesize).toEqual(pagesize);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.scope).toEqual(scope);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listApiKeysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listApiKeysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listApiKeysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listApiKeysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listApiKeys(listApiKeysParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.listApiKeys({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createApiKey', () => {
    describe('positive tests', () => {
      function __createApiKeyTest() {
        // Construct the params object for operation createApiKey
        const name = 'testString';
        const iamId = 'testString';
        const description = 'testString';
        const accountId = 'testString';
        const apikey = 'testString';
        const storeValue = true;
        const entityLock = 'false';
        const createApiKeyParams = {
          name: name,
          iamId: iamId,
          description: description,
          accountId: accountId,
          apikey: apikey,
          storeValue: storeValue,
          entityLock: entityLock,
        };

        const createApiKeyResult = iamIdentityService.createApiKey(createApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(createApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Entity-Lock', entityLock);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.iam_id).toEqual(iamId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.apikey).toEqual(apikey);
        expect(mockRequestOptions.body.store_value).toEqual(storeValue);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createApiKeyParams = {
          name,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createApiKey(createApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createApiKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getApiKeysDetails', () => {
    describe('positive tests', () => {
      function __getApiKeysDetailsTest() {
        // Construct the params object for operation getApiKeysDetails
        const iamApiKey = 'testString';
        const includeHistory = false;
        const getApiKeysDetailsParams = {
          iamApiKey: iamApiKey,
          includeHistory: includeHistory,
        };

        const getApiKeysDetailsResult = iamIdentityService.getApiKeysDetails(getApiKeysDetailsParams);

        // all methods should return a Promise
        expectToBePromise(getApiKeysDetailsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/details', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'IAM-ApiKey', iamApiKey);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getApiKeysDetailsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getApiKeysDetailsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getApiKeysDetailsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getApiKeysDetailsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getApiKeysDetails(getApiKeysDetailsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.getApiKeysDetails({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getApiKey', () => {
    describe('positive tests', () => {
      function __getApiKeyTest() {
        // Construct the params object for operation getApiKey
        const id = 'testString';
        const includeHistory = false;
        const includeActivity = false;
        const getApiKeyParams = {
          id: id,
          includeHistory: includeHistory,
          includeActivity: includeActivity,
        };

        const getApiKeyResult = iamIdentityService.getApiKey(getApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(getApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.qs.include_activity).toEqual(includeActivity);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getApiKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getApiKey(getApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getApiKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateApiKey', () => {
    describe('positive tests', () => {
      function __updateApiKeyTest() {
        // Construct the params object for operation updateApiKey
        const id = 'testString';
        const ifMatch = 'testString';
        const name = 'testString';
        const description = 'testString';
        const updateApiKeyParams = {
          id: id,
          ifMatch: ifMatch,
          name: name,
          description: description,
        };

        const updateApiKeyResult = iamIdentityService.updateApiKey(updateApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(updateApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateApiKeyParams = {
          id,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateApiKey(updateApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateApiKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteApiKey', () => {
    describe('positive tests', () => {
      function __deleteApiKeyTest() {
        // Construct the params object for operation deleteApiKey
        const id = 'testString';
        const deleteApiKeyParams = {
          id: id,
        };

        const deleteApiKeyResult = iamIdentityService.deleteApiKey(deleteApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(deleteApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteApiKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteApiKey(deleteApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteApiKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('lockApiKey', () => {
    describe('positive tests', () => {
      function __lockApiKeyTest() {
        // Construct the params object for operation lockApiKey
        const id = 'testString';
        const lockApiKeyParams = {
          id: id,
        };

        const lockApiKeyResult = iamIdentityService.lockApiKey(lockApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(lockApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/{id}/lock', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __lockApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __lockApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __lockApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const lockApiKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.lockApiKey(lockApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.lockApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.lockApiKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('unlockApiKey', () => {
    describe('positive tests', () => {
      function __unlockApiKeyTest() {
        // Construct the params object for operation unlockApiKey
        const id = 'testString';
        const unlockApiKeyParams = {
          id: id,
        };

        const unlockApiKeyResult = iamIdentityService.unlockApiKey(unlockApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(unlockApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/{id}/lock', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unlockApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __unlockApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __unlockApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unlockApiKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.unlockApiKey(unlockApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.unlockApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.unlockApiKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listServiceIds', () => {
    describe('positive tests', () => {
      function __listServiceIdsTest() {
        // Construct the params object for operation listServiceIds
        const accountId = 'testString';
        const name = 'testString';
        const pagesize = 38;
        const pagetoken = 'testString';
        const sort = 'testString';
        const order = 'asc';
        const includeHistory = false;
        const listServiceIdsParams = {
          accountId: accountId,
          name: name,
          pagesize: pagesize,
          pagetoken: pagetoken,
          sort: sort,
          order: order,
          includeHistory: includeHistory,
        };

        const listServiceIdsResult = iamIdentityService.listServiceIds(listServiceIdsParams);

        // all methods should return a Promise
        expectToBePromise(listServiceIdsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceids/', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.pagesize).toEqual(pagesize);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listServiceIdsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listServiceIdsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listServiceIdsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listServiceIdsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listServiceIds(listServiceIdsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.listServiceIds({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createServiceId', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ApiKeyInsideCreateServiceIdRequest
      const apiKeyInsideCreateServiceIdRequestModel = {
        name: 'testString',
        description: 'testString',
        apikey: 'testString',
        store_value: true,
      };

      function __createServiceIdTest() {
        // Construct the params object for operation createServiceId
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const uniqueInstanceCrns = ['testString'];
        const apikey = apiKeyInsideCreateServiceIdRequestModel;
        const entityLock = 'false';
        const createServiceIdParams = {
          accountId: accountId,
          name: name,
          description: description,
          uniqueInstanceCrns: uniqueInstanceCrns,
          apikey: apikey,
          entityLock: entityLock,
        };

        const createServiceIdResult = iamIdentityService.createServiceId(createServiceIdParams);

        // all methods should return a Promise
        expectToBePromise(createServiceIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceids/', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Entity-Lock', entityLock);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.unique_instance_crns).toEqual(uniqueInstanceCrns);
        expect(mockRequestOptions.body.apikey).toEqual(apikey);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createServiceIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createServiceIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createServiceIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createServiceIdParams = {
          accountId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createServiceId(createServiceIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createServiceId({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createServiceId();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getServiceId', () => {
    describe('positive tests', () => {
      function __getServiceIdTest() {
        // Construct the params object for operation getServiceId
        const id = 'testString';
        const includeHistory = false;
        const includeActivity = false;
        const getServiceIdParams = {
          id: id,
          includeHistory: includeHistory,
          includeActivity: includeActivity,
        };

        const getServiceIdResult = iamIdentityService.getServiceId(getServiceIdParams);

        // all methods should return a Promise
        expectToBePromise(getServiceIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceids/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.qs.include_activity).toEqual(includeActivity);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getServiceIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getServiceIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getServiceIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getServiceIdParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getServiceId(getServiceIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getServiceId({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getServiceId();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateServiceId', () => {
    describe('positive tests', () => {
      function __updateServiceIdTest() {
        // Construct the params object for operation updateServiceId
        const id = 'testString';
        const ifMatch = 'testString';
        const name = 'testString';
        const description = 'testString';
        const uniqueInstanceCrns = ['testString'];
        const updateServiceIdParams = {
          id: id,
          ifMatch: ifMatch,
          name: name,
          description: description,
          uniqueInstanceCrns: uniqueInstanceCrns,
        };

        const updateServiceIdResult = iamIdentityService.updateServiceId(updateServiceIdParams);

        // all methods should return a Promise
        expectToBePromise(updateServiceIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceids/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.unique_instance_crns).toEqual(uniqueInstanceCrns);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateServiceIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateServiceIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateServiceIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateServiceIdParams = {
          id,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateServiceId(updateServiceIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateServiceId({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateServiceId();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteServiceId', () => {
    describe('positive tests', () => {
      function __deleteServiceIdTest() {
        // Construct the params object for operation deleteServiceId
        const id = 'testString';
        const deleteServiceIdParams = {
          id: id,
        };

        const deleteServiceIdResult = iamIdentityService.deleteServiceId(deleteServiceIdParams);

        // all methods should return a Promise
        expectToBePromise(deleteServiceIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceids/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteServiceIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteServiceIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteServiceIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteServiceIdParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteServiceId(deleteServiceIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteServiceId({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteServiceId();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('lockServiceId', () => {
    describe('positive tests', () => {
      function __lockServiceIdTest() {
        // Construct the params object for operation lockServiceId
        const id = 'testString';
        const lockServiceIdParams = {
          id: id,
        };

        const lockServiceIdResult = iamIdentityService.lockServiceId(lockServiceIdParams);

        // all methods should return a Promise
        expectToBePromise(lockServiceIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceids/{id}/lock', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __lockServiceIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __lockServiceIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __lockServiceIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const lockServiceIdParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.lockServiceId(lockServiceIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.lockServiceId({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.lockServiceId();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('unlockServiceId', () => {
    describe('positive tests', () => {
      function __unlockServiceIdTest() {
        // Construct the params object for operation unlockServiceId
        const id = 'testString';
        const unlockServiceIdParams = {
          id: id,
        };

        const unlockServiceIdResult = iamIdentityService.unlockServiceId(unlockServiceIdParams);

        // all methods should return a Promise
        expectToBePromise(unlockServiceIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceids/{id}/lock', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unlockServiceIdTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __unlockServiceIdTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __unlockServiceIdTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unlockServiceIdParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.unlockServiceId(unlockServiceIdParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.unlockServiceId({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.unlockServiceId();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createProfile', () => {
    describe('positive tests', () => {
      function __createProfileTest() {
        // Construct the params object for operation createProfile
        const name = 'testString';
        const accountId = 'testString';
        const description = 'testString';
        const createProfileParams = {
          name: name,
          accountId: accountId,
          description: description,
        };

        const createProfileResult = iamIdentityService.createProfile(createProfileParams);

        // all methods should return a Promise
        expectToBePromise(createProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.description).toEqual(description);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProfileParams = {
          name,
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createProfile(createProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listProfiles', () => {
    describe('positive tests', () => {
      function __listProfilesTest() {
        // Construct the params object for operation listProfiles
        const accountId = 'testString';
        const name = 'testString';
        const pagesize = 38;
        const sort = 'testString';
        const order = 'asc';
        const includeHistory = false;
        const pagetoken = 'testString';
        const listProfilesParams = {
          accountId: accountId,
          name: name,
          pagesize: pagesize,
          sort: sort,
          order: order,
          includeHistory: includeHistory,
          pagetoken: pagetoken,
        };

        const listProfilesResult = iamIdentityService.listProfiles(listProfilesParams);

        // all methods should return a Promise
        expectToBePromise(listProfilesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.pagesize).toEqual(pagesize);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProfilesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listProfilesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listProfilesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProfilesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listProfiles(listProfilesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.listProfiles({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.listProfiles();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getProfile', () => {
    describe('positive tests', () => {
      function __getProfileTest() {
        // Construct the params object for operation getProfile
        const profileId = 'testString';
        const includeActivity = false;
        const getProfileParams = {
          profileId: profileId,
          includeActivity: includeActivity,
        };

        const getProfileResult = iamIdentityService.getProfile(getProfileParams);

        // all methods should return a Promise
        expectToBePromise(getProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_activity).toEqual(includeActivity);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileParams = {
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getProfile(getProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateProfile', () => {
    describe('positive tests', () => {
      function __updateProfileTest() {
        // Construct the params object for operation updateProfile
        const profileId = 'testString';
        const ifMatch = 'testString';
        const name = 'testString';
        const description = 'testString';
        const updateProfileParams = {
          profileId: profileId,
          ifMatch: ifMatch,
          name: name,
          description: description,
        };

        const updateProfileResult = iamIdentityService.updateProfile(updateProfileParams);

        // all methods should return a Promise
        expectToBePromise(updateProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProfileParams = {
          profileId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateProfile(updateProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteProfile', () => {
    describe('positive tests', () => {
      function __deleteProfileTest() {
        // Construct the params object for operation deleteProfile
        const profileId = 'testString';
        const deleteProfileParams = {
          profileId: profileId,
        };

        const deleteProfileResult = iamIdentityService.deleteProfile(deleteProfileParams);

        // all methods should return a Promise
        expectToBePromise(deleteProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProfileParams = {
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteProfile(deleteProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createClaimRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileClaimRuleConditions
      const profileClaimRuleConditionsModel = {
        claim: 'testString',
        operator: 'testString',
        value: 'testString',
      };

      // ResponseContext
      const responseContextModel = {
        transaction_id: 'testString',
        operation: 'testString',
        user_agent: 'testString',
        url: 'testString',
        instance_id: 'testString',
        thread_id: 'testString',
        host: 'testString',
        start_time: 'testString',
        end_time: 'testString',
        elapsed_time: 'testString',
        cluster_name: 'testString',
      };

      function __createClaimRuleTest() {
        // Construct the params object for operation createClaimRule
        const profileId = 'testString';
        const type = 'testString';
        const conditions = [profileClaimRuleConditionsModel];
        const context = responseContextModel;
        const name = 'testString';
        const realmName = 'testString';
        const crType = 'testString';
        const expiration = 38;
        const createClaimRuleParams = {
          profileId: profileId,
          type: type,
          conditions: conditions,
          context: context,
          name: name,
          realmName: realmName,
          crType: crType,
          expiration: expiration,
        };

        const createClaimRuleResult = iamIdentityService.createClaimRule(createClaimRuleParams);

        // all methods should return a Promise
        expectToBePromise(createClaimRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.conditions).toEqual(conditions);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.realm_name).toEqual(realmName);
        expect(mockRequestOptions.body.cr_type).toEqual(crType);
        expect(mockRequestOptions.body.expiration).toEqual(expiration);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createClaimRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createClaimRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createClaimRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const type = 'testString';
        const conditions = [profileClaimRuleConditionsModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createClaimRuleParams = {
          profileId,
          type,
          conditions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createClaimRule(createClaimRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createClaimRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createClaimRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listClaimRules', () => {
    describe('positive tests', () => {
      function __listClaimRulesTest() {
        // Construct the params object for operation listClaimRules
        const profileId = 'testString';
        const listClaimRulesParams = {
          profileId: profileId,
        };

        const listClaimRulesResult = iamIdentityService.listClaimRules(listClaimRulesParams);

        // all methods should return a Promise
        expectToBePromise(listClaimRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listClaimRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listClaimRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listClaimRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listClaimRulesParams = {
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listClaimRules(listClaimRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.listClaimRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.listClaimRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getClaimRule', () => {
    describe('positive tests', () => {
      function __getClaimRuleTest() {
        // Construct the params object for operation getClaimRule
        const profileId = 'testString';
        const ruleId = 'testString';
        const getClaimRuleParams = {
          profileId: profileId,
          ruleId: ruleId,
        };

        const getClaimRuleResult = iamIdentityService.getClaimRule(getClaimRuleParams);

        // all methods should return a Promise
        expectToBePromise(getClaimRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/rules/{rule-id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['rule-id']).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getClaimRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getClaimRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getClaimRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getClaimRuleParams = {
          profileId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getClaimRule(getClaimRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getClaimRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getClaimRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateClaimRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileClaimRuleConditions
      const profileClaimRuleConditionsModel = {
        claim: 'testString',
        operator: 'testString',
        value: 'testString',
      };

      // ResponseContext
      const responseContextModel = {
        transaction_id: 'testString',
        operation: 'testString',
        user_agent: 'testString',
        url: 'testString',
        instance_id: 'testString',
        thread_id: 'testString',
        host: 'testString',
        start_time: 'testString',
        end_time: 'testString',
        elapsed_time: 'testString',
        cluster_name: 'testString',
      };

      function __updateClaimRuleTest() {
        // Construct the params object for operation updateClaimRule
        const profileId = 'testString';
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const type = 'testString';
        const conditions = [profileClaimRuleConditionsModel];
        const context = responseContextModel;
        const name = 'testString';
        const realmName = 'testString';
        const crType = 'testString';
        const expiration = 38;
        const updateClaimRuleParams = {
          profileId: profileId,
          ruleId: ruleId,
          ifMatch: ifMatch,
          type: type,
          conditions: conditions,
          context: context,
          name: name,
          realmName: realmName,
          crType: crType,
          expiration: expiration,
        };

        const updateClaimRuleResult = iamIdentityService.updateClaimRule(updateClaimRuleParams);

        // all methods should return a Promise
        expectToBePromise(updateClaimRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/rules/{rule-id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.conditions).toEqual(conditions);
        expect(mockRequestOptions.body.context).toEqual(context);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.realm_name).toEqual(realmName);
        expect(mockRequestOptions.body.cr_type).toEqual(crType);
        expect(mockRequestOptions.body.expiration).toEqual(expiration);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['rule-id']).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateClaimRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateClaimRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateClaimRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const type = 'testString';
        const conditions = [profileClaimRuleConditionsModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateClaimRuleParams = {
          profileId,
          ruleId,
          ifMatch,
          type,
          conditions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateClaimRule(updateClaimRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateClaimRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateClaimRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteClaimRule', () => {
    describe('positive tests', () => {
      function __deleteClaimRuleTest() {
        // Construct the params object for operation deleteClaimRule
        const profileId = 'testString';
        const ruleId = 'testString';
        const deleteClaimRuleParams = {
          profileId: profileId,
          ruleId: ruleId,
        };

        const deleteClaimRuleResult = iamIdentityService.deleteClaimRule(deleteClaimRuleParams);

        // all methods should return a Promise
        expectToBePromise(deleteClaimRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/rules/{rule-id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['rule-id']).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteClaimRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteClaimRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteClaimRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteClaimRuleParams = {
          profileId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteClaimRule(deleteClaimRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteClaimRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteClaimRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createLink', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateProfileLinkRequestLink
      const createProfileLinkRequestLinkModel = {
        crn: 'testString',
        namespace: 'testString',
        name: 'testString',
      };

      function __createLinkTest() {
        // Construct the params object for operation createLink
        const profileId = 'testString';
        const crType = 'testString';
        const link = createProfileLinkRequestLinkModel;
        const name = 'testString';
        const createLinkParams = {
          profileId: profileId,
          crType: crType,
          link: link,
          name: name,
        };

        const createLinkResult = iamIdentityService.createLink(createLinkParams);

        // all methods should return a Promise
        expectToBePromise(createLinkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/links', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.cr_type).toEqual(crType);
        expect(mockRequestOptions.body.link).toEqual(link);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createLinkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createLinkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createLinkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const crType = 'testString';
        const link = createProfileLinkRequestLinkModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createLinkParams = {
          profileId,
          crType,
          link,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createLink(createLinkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createLink({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createLink();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listLinks', () => {
    describe('positive tests', () => {
      function __listLinksTest() {
        // Construct the params object for operation listLinks
        const profileId = 'testString';
        const listLinksParams = {
          profileId: profileId,
        };

        const listLinksResult = iamIdentityService.listLinks(listLinksParams);

        // all methods should return a Promise
        expectToBePromise(listLinksResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/links', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listLinksTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listLinksTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listLinksTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listLinksParams = {
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listLinks(listLinksParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.listLinks({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.listLinks();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getLink', () => {
    describe('positive tests', () => {
      function __getLinkTest() {
        // Construct the params object for operation getLink
        const profileId = 'testString';
        const linkId = 'testString';
        const getLinkParams = {
          profileId: profileId,
          linkId: linkId,
        };

        const getLinkResult = iamIdentityService.getLink(getLinkParams);

        // all methods should return a Promise
        expectToBePromise(getLinkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/links/{link-id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['link-id']).toEqual(linkId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLinkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getLinkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getLinkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const linkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLinkParams = {
          profileId,
          linkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getLink(getLinkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getLink({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getLink();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteLink', () => {
    describe('positive tests', () => {
      function __deleteLinkTest() {
        // Construct the params object for operation deleteLink
        const profileId = 'testString';
        const linkId = 'testString';
        const deleteLinkParams = {
          profileId: profileId,
          linkId: linkId,
        };

        const deleteLinkResult = iamIdentityService.deleteLink(deleteLinkParams);

        // all methods should return a Promise
        expectToBePromise(deleteLinkResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/links/{link-id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['link-id']).toEqual(linkId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteLinkTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteLinkTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteLinkTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const linkId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteLinkParams = {
          profileId,
          linkId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteLink(deleteLinkParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteLink({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteLink();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getAccountSettings', () => {
    describe('positive tests', () => {
      function __getAccountSettingsTest() {
        // Construct the params object for operation getAccountSettings
        const accountId = 'testString';
        const includeHistory = false;
        const getAccountSettingsParams = {
          accountId: accountId,
          includeHistory: includeHistory,
        };

        const getAccountSettingsResult = iamIdentityService.getAccountSettings(getAccountSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getAccountSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/accounts/{account_id}/settings/identity', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getAccountSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getAccountSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountSettingsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getAccountSettings(getAccountSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getAccountSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getAccountSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateAccountSettings', () => {
    describe('positive tests', () => {
      function __updateAccountSettingsTest() {
        // Construct the params object for operation updateAccountSettings
        const ifMatch = 'testString';
        const accountId = 'testString';
        const restrictCreateServiceId = 'RESTRICTED';
        const restrictCreatePlatformApikey = 'RESTRICTED';
        const allowedIpAddresses = 'testString';
        const mfa = 'NONE';
        const sessionExpirationInSeconds = '86400';
        const sessionInvalidationInSeconds = '7200';
        const maxSessionsPerIdentity = 'testString';
        const updateAccountSettingsParams = {
          ifMatch: ifMatch,
          accountId: accountId,
          restrictCreateServiceId: restrictCreateServiceId,
          restrictCreatePlatformApikey: restrictCreatePlatformApikey,
          allowedIpAddresses: allowedIpAddresses,
          mfa: mfa,
          sessionExpirationInSeconds: sessionExpirationInSeconds,
          sessionInvalidationInSeconds: sessionInvalidationInSeconds,
          maxSessionsPerIdentity: maxSessionsPerIdentity,
        };

        const updateAccountSettingsResult = iamIdentityService.updateAccountSettings(updateAccountSettingsParams);

        // all methods should return a Promise
        expectToBePromise(updateAccountSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/accounts/{account_id}/settings/identity', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.restrict_create_service_id).toEqual(restrictCreateServiceId);
        expect(mockRequestOptions.body.restrict_create_platform_apikey).toEqual(restrictCreatePlatformApikey);
        expect(mockRequestOptions.body.allowed_ip_addresses).toEqual(allowedIpAddresses);
        expect(mockRequestOptions.body.mfa).toEqual(mfa);
        expect(mockRequestOptions.body.session_expiration_in_seconds).toEqual(sessionExpirationInSeconds);
        expect(mockRequestOptions.body.session_invalidation_in_seconds).toEqual(sessionInvalidationInSeconds);
        expect(mockRequestOptions.body.max_sessions_per_identity).toEqual(maxSessionsPerIdentity);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccountSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateAccountSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateAccountSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ifMatch = 'testString';
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccountSettingsParams = {
          ifMatch,
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateAccountSettings(updateAccountSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateAccountSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateAccountSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createReport', () => {
    describe('positive tests', () => {
      function __createReportTest() {
        // Construct the params object for operation createReport
        const accountId = 'testString';
        const type = 'inactive';
        const duration = '720';
        const createReportParams = {
          accountId: accountId,
          type: type,
          duration: duration,
        };

        const createReportResult = iamIdentityService.createReport(createReportParams);

        // all methods should return a Promise
        expectToBePromise(createReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/activity/accounts/{account_id}/report', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.duration).toEqual(duration);
        expect(mockRequestOptions.path['account_id']).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createReportParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createReport(createReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getReport', () => {
    describe('positive tests', () => {
      function __getReportTest() {
        // Construct the params object for operation getReport
        const accountId = 'testString';
        const reference = 'testString';
        const getReportParams = {
          accountId: accountId,
          reference: reference,
        };

        const getReportResult = iamIdentityService.getReport(getReportParams);

        // all methods should return a Promise
        expectToBePromise(getReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/activity/accounts/{account_id}/report/{reference}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['account_id']).toEqual(accountId);
        expect(mockRequestOptions.path.reference).toEqual(reference);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const reference = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getReportParams = {
          accountId,
          reference,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getReport(getReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
