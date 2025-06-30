/**
 * (C) Copyright IBM Corp. 2025.
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
const IamIdentityV1 = require('../../dist/iam-identity/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const iamIdentityServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://iam.cloud.ibm.com',
};

const iamIdentityService = new IamIdentityV1(iamIdentityServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(iamIdentityService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('IamIdentityV1', () => {
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

  describe('listServiceIds', () => {
    describe('positive tests', () => {
      function __listServiceIdsTest() {
        // Construct the params object for operation listServiceIds
        const accountId = 'testString';
        const groupId = 'testString';
        const name = 'testString';
        const pagesize = 38;
        const pagetoken = 'testString';
        const sort = 'testString';
        const order = 'asc';
        const includeHistory = false;
        const filter = 'testString';
        const showGroupId = 'testString';
        const listServiceIdsParams = {
          accountId,
          groupId,
          name,
          pagesize,
          pagetoken,
          sort,
          order,
          includeHistory,
          filter,
          showGroupId,
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
        expect(mockRequestOptions.qs.group_id).toEqual(groupId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.pagesize).toEqual(pagesize);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.show_group_id).toEqual(showGroupId);
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
        const groupId = 'testString';
        const description = 'testString';
        const uniqueInstanceCrns = ['testString'];
        const apikey = apiKeyInsideCreateServiceIdRequestModel;
        const showGroupId = 'testString';
        const entityLock = 'false';
        const createServiceIdParams = {
          accountId,
          name,
          groupId,
          description,
          uniqueInstanceCrns,
          apikey,
          showGroupId,
          entityLock,
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
        expect(mockRequestOptions.body.group_id).toEqual(groupId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.unique_instance_crns).toEqual(uniqueInstanceCrns);
        expect(mockRequestOptions.body.apikey).toEqual(apikey);
        expect(mockRequestOptions.qs.show_group_id).toEqual(showGroupId);
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
        const showGroupId = 'testString';
        const getServiceIdParams = {
          id,
          includeHistory,
          includeActivity,
          showGroupId,
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
        expect(mockRequestOptions.qs.show_group_id).toEqual(showGroupId);
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
        const showGroupId = 'testString';
        const updateServiceIdParams = {
          id,
          ifMatch,
          name,
          description,
          uniqueInstanceCrns,
          showGroupId,
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
        expect(mockRequestOptions.qs.show_group_id).toEqual(showGroupId);
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
          id,
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
          id,
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
          id,
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

  describe('listServiceIdGroup', () => {
    describe('positive tests', () => {
      function __listServiceIdGroupTest() {
        // Construct the params object for operation listServiceIdGroup
        const accountId = 'testString';
        const listServiceIdGroupParams = {
          accountId,
        };

        const listServiceIdGroupResult = iamIdentityService.listServiceIdGroup(listServiceIdGroupParams);

        // all methods should return a Promise
        expectToBePromise(listServiceIdGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceid_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listServiceIdGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listServiceIdGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listServiceIdGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listServiceIdGroupParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listServiceIdGroup(listServiceIdGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.listServiceIdGroup({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createServiceIdGroup', () => {
    describe('positive tests', () => {
      function __createServiceIdGroupTest() {
        // Construct the params object for operation createServiceIdGroup
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const createServiceIdGroupParams = {
          accountId,
          name,
          description,
        };

        const createServiceIdGroupResult = iamIdentityService.createServiceIdGroup(createServiceIdGroupParams);

        // all methods should return a Promise
        expectToBePromise(createServiceIdGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceid_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createServiceIdGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createServiceIdGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createServiceIdGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createServiceIdGroupParams = {
          accountId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createServiceIdGroup(createServiceIdGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createServiceIdGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createServiceIdGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getServiceIdGroup', () => {
    describe('positive tests', () => {
      function __getServiceIdGroupTest() {
        // Construct the params object for operation getServiceIdGroup
        const id = 'testString';
        const getServiceIdGroupParams = {
          id,
        };

        const getServiceIdGroupResult = iamIdentityService.getServiceIdGroup(getServiceIdGroupParams);

        // all methods should return a Promise
        expectToBePromise(getServiceIdGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceid_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getServiceIdGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getServiceIdGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getServiceIdGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getServiceIdGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getServiceIdGroup(getServiceIdGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getServiceIdGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getServiceIdGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateServiceIdGroup', () => {
    describe('positive tests', () => {
      function __updateServiceIdGroupTest() {
        // Construct the params object for operation updateServiceIdGroup
        const id = 'testString';
        const ifMatch = 'testString';
        const name = 'testString';
        const description = 'testString';
        const updateServiceIdGroupParams = {
          id,
          ifMatch,
          name,
          description,
        };

        const updateServiceIdGroupResult = iamIdentityService.updateServiceIdGroup(updateServiceIdGroupParams);

        // all methods should return a Promise
        expectToBePromise(updateServiceIdGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceid_groups/{id}', 'PUT');
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
        __updateServiceIdGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateServiceIdGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateServiceIdGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const ifMatch = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateServiceIdGroupParams = {
          id,
          ifMatch,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateServiceIdGroup(updateServiceIdGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateServiceIdGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateServiceIdGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteServiceIdGroup', () => {
    describe('positive tests', () => {
      function __deleteServiceIdGroupTest() {
        // Construct the params object for operation deleteServiceIdGroup
        const id = 'testString';
        const deleteServiceIdGroupParams = {
          id,
        };

        const deleteServiceIdGroupResult = iamIdentityService.deleteServiceIdGroup(deleteServiceIdGroupParams);

        // all methods should return a Promise
        expectToBePromise(deleteServiceIdGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/serviceid_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteServiceIdGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteServiceIdGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteServiceIdGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteServiceIdGroupParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteServiceIdGroup(deleteServiceIdGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteServiceIdGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteServiceIdGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
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
        const filter = 'testString';
        const groupId = 'testString';
        const listApiKeysParams = {
          accountId,
          iamId,
          pagesize,
          pagetoken,
          scope,
          type,
          sort,
          order,
          includeHistory,
          filter,
          groupId,
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
        expect(mockRequestOptions.qs.filter).toEqual(filter);
        expect(mockRequestOptions.qs.group_id).toEqual(groupId);
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
        const supportSessions = true;
        const actionWhenLeaked = 'testString';
        const entityLock = 'false';
        const entityDisable = 'false';
        const createApiKeyParams = {
          name,
          iamId,
          description,
          accountId,
          apikey,
          storeValue,
          supportSessions,
          actionWhenLeaked,
          entityLock,
          entityDisable,
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
        checkUserHeader(createRequestMock, 'Entity-Disable', entityDisable);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.iam_id).toEqual(iamId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.apikey).toEqual(apikey);
        expect(mockRequestOptions.body.store_value).toEqual(storeValue);
        expect(mockRequestOptions.body.support_sessions).toEqual(supportSessions);
        expect(mockRequestOptions.body.action_when_leaked).toEqual(actionWhenLeaked);
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
          iamApiKey,
          includeHistory,
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
          id,
          includeHistory,
          includeActivity,
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
        const supportSessions = true;
        const actionWhenLeaked = 'testString';
        const updateApiKeyParams = {
          id,
          ifMatch,
          name,
          description,
          supportSessions,
          actionWhenLeaked,
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
        expect(mockRequestOptions.body.support_sessions).toEqual(supportSessions);
        expect(mockRequestOptions.body.action_when_leaked).toEqual(actionWhenLeaked);
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
          id,
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
          id,
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
          id,
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

  describe('disableApiKey', () => {
    describe('positive tests', () => {
      function __disableApiKeyTest() {
        // Construct the params object for operation disableApiKey
        const id = 'testString';
        const disableApiKeyParams = {
          id,
        };

        const disableApiKeyResult = iamIdentityService.disableApiKey(disableApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(disableApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/{id}/disable', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __disableApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __disableApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __disableApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const disableApiKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.disableApiKey(disableApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.disableApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.disableApiKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('enableApiKey', () => {
    describe('positive tests', () => {
      function __enableApiKeyTest() {
        // Construct the params object for operation enableApiKey
        const id = 'testString';
        const enableApiKeyParams = {
          id,
        };

        const enableApiKeyResult = iamIdentityService.enableApiKey(enableApiKeyParams);

        // all methods should return a Promise
        expectToBePromise(enableApiKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/apikeys/{id}/disable', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __enableApiKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __enableApiKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __enableApiKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const enableApiKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.enableApiKey(enableApiKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.enableApiKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.enableApiKey();
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
        const email = 'testString';
        const createProfileParams = {
          name,
          accountId,
          description,
          email,
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
        expect(mockRequestOptions.body.email).toEqual(email);
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
        const filter = 'testString';
        const listProfilesParams = {
          accountId,
          name,
          pagesize,
          sort,
          order,
          includeHistory,
          pagetoken,
          filter,
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
        expect(mockRequestOptions.qs.filter).toEqual(filter);
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
          profileId,
          includeActivity,
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
        const email = 'testString';
        const updateProfileParams = {
          profileId,
          ifMatch,
          name,
          description,
          email,
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
        expect(mockRequestOptions.body.email).toEqual(email);
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
          profileId,
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
          profileId,
          type,
          conditions,
          context,
          name,
          realmName,
          crType,
          expiration,
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
          profileId,
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
          profileId,
          ruleId,
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
          profileId,
          ruleId,
          ifMatch,
          type,
          conditions,
          context,
          name,
          realmName,
          crType,
          expiration,
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
          profileId,
          ruleId,
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
          profileId,
          crType,
          link,
          name,
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
          profileId,
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
          profileId,
          linkId,
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
          profileId,
          linkId,
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

  describe('getProfileIdentities', () => {
    describe('positive tests', () => {
      function __getProfileIdentitiesTest() {
        // Construct the params object for operation getProfileIdentities
        const profileId = 'testString';
        const getProfileIdentitiesParams = {
          profileId,
        };

        const getProfileIdentitiesResult = iamIdentityService.getProfileIdentities(getProfileIdentitiesParams);

        // all methods should return a Promise
        expectToBePromise(getProfileIdentitiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/identities', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileIdentitiesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getProfileIdentitiesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getProfileIdentitiesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileIdentitiesParams = {
          profileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getProfileIdentities(getProfileIdentitiesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getProfileIdentities({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getProfileIdentities();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('setProfileIdentities', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileIdentityRequest
      const profileIdentityRequestModel = {
        identifier: 'testString',
        type: 'user',
        accounts: ['testString'],
        description: 'testString',
      };

      function __setProfileIdentitiesTest() {
        // Construct the params object for operation setProfileIdentities
        const profileId = 'testString';
        const ifMatch = 'testString';
        const identities = [profileIdentityRequestModel];
        const setProfileIdentitiesParams = {
          profileId,
          ifMatch,
          identities,
        };

        const setProfileIdentitiesResult = iamIdentityService.setProfileIdentities(setProfileIdentitiesParams);

        // all methods should return a Promise
        expectToBePromise(setProfileIdentitiesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/identities', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.identities).toEqual(identities);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setProfileIdentitiesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __setProfileIdentitiesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __setProfileIdentitiesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setProfileIdentitiesParams = {
          profileId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.setProfileIdentities(setProfileIdentitiesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.setProfileIdentities({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.setProfileIdentities();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('setProfileIdentity', () => {
    describe('positive tests', () => {
      function __setProfileIdentityTest() {
        // Construct the params object for operation setProfileIdentity
        const profileId = 'testString';
        const identityType = 'user';
        const identifier = 'testString';
        const type = 'user';
        const accounts = ['testString'];
        const description = 'testString';
        const setProfileIdentityParams = {
          profileId,
          identityType,
          identifier,
          type,
          accounts,
          description,
        };

        const setProfileIdentityResult = iamIdentityService.setProfileIdentity(setProfileIdentityParams);

        // all methods should return a Promise
        expectToBePromise(setProfileIdentityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/identities/{identity-type}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.identifier).toEqual(identifier);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.accounts).toEqual(accounts);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['identity-type']).toEqual(identityType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setProfileIdentityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __setProfileIdentityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __setProfileIdentityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const identityType = 'user';
        const identifier = 'testString';
        const type = 'user';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setProfileIdentityParams = {
          profileId,
          identityType,
          identifier,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.setProfileIdentity(setProfileIdentityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.setProfileIdentity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.setProfileIdentity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProfileIdentity', () => {
    describe('positive tests', () => {
      function __getProfileIdentityTest() {
        // Construct the params object for operation getProfileIdentity
        const profileId = 'testString';
        const identityType = 'user';
        const identifierId = 'testString';
        const getProfileIdentityParams = {
          profileId,
          identityType,
          identifierId,
        };

        const getProfileIdentityResult = iamIdentityService.getProfileIdentity(getProfileIdentityParams);

        // all methods should return a Promise
        expectToBePromise(getProfileIdentityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/identities/{identity-type}/{identifier-id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['identity-type']).toEqual(identityType);
        expect(mockRequestOptions.path['identifier-id']).toEqual(identifierId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileIdentityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getProfileIdentityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getProfileIdentityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const identityType = 'user';
        const identifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileIdentityParams = {
          profileId,
          identityType,
          identifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getProfileIdentity(getProfileIdentityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getProfileIdentity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getProfileIdentity();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProfileIdentity', () => {
    describe('positive tests', () => {
      function __deleteProfileIdentityTest() {
        // Construct the params object for operation deleteProfileIdentity
        const profileId = 'testString';
        const identityType = 'user';
        const identifierId = 'testString';
        const deleteProfileIdentityParams = {
          profileId,
          identityType,
          identifierId,
        };

        const deleteProfileIdentityResult = iamIdentityService.deleteProfileIdentity(deleteProfileIdentityParams);

        // all methods should return a Promise
        expectToBePromise(deleteProfileIdentityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profiles/{profile-id}/identities/{identity-type}/{identifier-id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path['profile-id']).toEqual(profileId);
        expect(mockRequestOptions.path['identity-type']).toEqual(identityType);
        expect(mockRequestOptions.path['identifier-id']).toEqual(identifierId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProfileIdentityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteProfileIdentityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteProfileIdentityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const profileId = 'testString';
        const identityType = 'user';
        const identifierId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProfileIdentityParams = {
          profileId,
          identityType,
          identifierId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteProfileIdentity(deleteProfileIdentityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteProfileIdentity({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteProfileIdentity();
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
          accountId,
          type,
          duration,
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
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
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
          accountId,
          reference,
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
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
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

  describe('getAccountSettings', () => {
    describe('positive tests', () => {
      function __getAccountSettingsTest() {
        // Construct the params object for operation getAccountSettings
        const accountId = 'testString';
        const includeHistory = false;
        const getAccountSettingsParams = {
          accountId,
          includeHistory,
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
      // Request models needed by this operation.

      // AccountSettingsUserMFA
      const accountSettingsUserMfaModel = {
        iam_id: 'testString',
        mfa: 'NONE',
      };

      function __updateAccountSettingsTest() {
        // Construct the params object for operation updateAccountSettings
        const ifMatch = 'testString';
        const accountId = 'testString';
        const restrictCreateServiceId = 'RESTRICTED';
        const restrictCreatePlatformApikey = 'RESTRICTED';
        const allowedIpAddresses = 'testString';
        const mfa = 'NONE';
        const userMfa = [accountSettingsUserMfaModel];
        const sessionExpirationInSeconds = '86400';
        const sessionInvalidationInSeconds = '7200';
        const maxSessionsPerIdentity = 'testString';
        const systemAccessTokenExpirationInSeconds = '3600';
        const systemRefreshTokenExpirationInSeconds = '259200';
        const updateAccountSettingsParams = {
          ifMatch,
          accountId,
          restrictCreateServiceId,
          restrictCreatePlatformApikey,
          allowedIpAddresses,
          mfa,
          userMfa,
          sessionExpirationInSeconds,
          sessionInvalidationInSeconds,
          maxSessionsPerIdentity,
          systemAccessTokenExpirationInSeconds,
          systemRefreshTokenExpirationInSeconds,
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
        expect(mockRequestOptions.body.user_mfa).toEqual(userMfa);
        expect(mockRequestOptions.body.session_expiration_in_seconds).toEqual(sessionExpirationInSeconds);
        expect(mockRequestOptions.body.session_invalidation_in_seconds).toEqual(sessionInvalidationInSeconds);
        expect(mockRequestOptions.body.max_sessions_per_identity).toEqual(maxSessionsPerIdentity);
        expect(mockRequestOptions.body.system_access_token_expiration_in_seconds).toEqual(systemAccessTokenExpirationInSeconds);
        expect(mockRequestOptions.body.system_refresh_token_expiration_in_seconds).toEqual(systemRefreshTokenExpirationInSeconds);
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

  describe('getEffectiveAccountSettings', () => {
    describe('positive tests', () => {
      function __getEffectiveAccountSettingsTest() {
        // Construct the params object for operation getEffectiveAccountSettings
        const accountId = 'testString';
        const includeHistory = false;
        const resolveUserMfa = false;
        const getEffectiveAccountSettingsParams = {
          accountId,
          includeHistory,
          resolveUserMfa,
        };

        const getEffectiveAccountSettingsResult = iamIdentityService.getEffectiveAccountSettings(getEffectiveAccountSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getEffectiveAccountSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/accounts/{account_id}/effective_settings/identity', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.qs.resolve_user_mfa).toEqual(resolveUserMfa);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEffectiveAccountSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getEffectiveAccountSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getEffectiveAccountSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEffectiveAccountSettingsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getEffectiveAccountSettings(getEffectiveAccountSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getEffectiveAccountSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getEffectiveAccountSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getMfaStatus', () => {
    describe('positive tests', () => {
      function __getMfaStatusTest() {
        // Construct the params object for operation getMfaStatus
        const accountId = 'testString';
        const iamId = 'testString';
        const getMfaStatusParams = {
          accountId,
          iamId,
        };

        const getMfaStatusResult = iamIdentityService.getMfaStatus(getMfaStatusParams);

        // all methods should return a Promise
        expectToBePromise(getMfaStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/mfa/accounts/{account_id}/status', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.iam_id).toEqual(iamId);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMfaStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getMfaStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getMfaStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMfaStatusParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getMfaStatus(getMfaStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getMfaStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getMfaStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createMfaReport', () => {
    describe('positive tests', () => {
      function __createMfaReportTest() {
        // Construct the params object for operation createMfaReport
        const accountId = 'testString';
        const type = 'testString';
        const createMfaReportParams = {
          accountId,
          type,
        };

        const createMfaReportResult = iamIdentityService.createMfaReport(createMfaReportParams);

        // all methods should return a Promise
        expectToBePromise(createMfaReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/mfa/accounts/{account_id}/report', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createMfaReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createMfaReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createMfaReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createMfaReportParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createMfaReport(createMfaReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createMfaReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createMfaReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getMfaReport', () => {
    describe('positive tests', () => {
      function __getMfaReportTest() {
        // Construct the params object for operation getMfaReport
        const accountId = 'testString';
        const reference = 'testString';
        const getMfaReportParams = {
          accountId,
          reference,
        };

        const getMfaReportResult = iamIdentityService.getMfaReport(getMfaReportParams);

        // all methods should return a Promise
        expectToBePromise(getMfaReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/mfa/accounts/{account_id}/report/{reference}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.reference).toEqual(reference);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMfaReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getMfaReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getMfaReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const reference = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMfaReportParams = {
          accountId,
          reference,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getMfaReport(getMfaReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getMfaReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getMfaReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updatePreferenceOnScopeAccount', () => {
    describe('positive tests', () => {
      function __updatePreferenceOnScopeAccountTest() {
        // Construct the params object for operation updatePreferenceOnScopeAccount
        const accountId = 'testString';
        const iamId = 'testString';
        const service = 'testString';
        const preferenceId = 'testString';
        const valueString = 'testString';
        const valueListOfStrings = ['testString'];
        const updatePreferenceOnScopeAccountParams = {
          accountId,
          iamId,
          service,
          preferenceId,
          valueString,
          valueListOfStrings,
        };

        const updatePreferenceOnScopeAccountResult = iamIdentityService.updatePreferenceOnScopeAccount(updatePreferenceOnScopeAccountParams);

        // all methods should return a Promise
        expectToBePromise(updatePreferenceOnScopeAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/preferences/accounts/{account_id}/identities/{iam_id}/{service}/{preference_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.value_string).toEqual(valueString);
        expect(mockRequestOptions.body.value_list_of_strings).toEqual(valueListOfStrings);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
        expect(mockRequestOptions.path.service).toEqual(service);
        expect(mockRequestOptions.path.preference_id).toEqual(preferenceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePreferenceOnScopeAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updatePreferenceOnScopeAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updatePreferenceOnScopeAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const service = 'testString';
        const preferenceId = 'testString';
        const valueString = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePreferenceOnScopeAccountParams = {
          accountId,
          iamId,
          service,
          preferenceId,
          valueString,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updatePreferenceOnScopeAccount(updatePreferenceOnScopeAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updatePreferenceOnScopeAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updatePreferenceOnScopeAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePreferencesOnScopeAccount', () => {
    describe('positive tests', () => {
      function __deletePreferencesOnScopeAccountTest() {
        // Construct the params object for operation deletePreferencesOnScopeAccount
        const accountId = 'testString';
        const iamId = 'testString';
        const service = 'testString';
        const preferenceId = 'testString';
        const deletePreferencesOnScopeAccountParams = {
          accountId,
          iamId,
          service,
          preferenceId,
        };

        const deletePreferencesOnScopeAccountResult = iamIdentityService.deletePreferencesOnScopeAccount(deletePreferencesOnScopeAccountParams);

        // all methods should return a Promise
        expectToBePromise(deletePreferencesOnScopeAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/preferences/accounts/{account_id}/identities/{iam_id}/{service}/{preference_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
        expect(mockRequestOptions.path.service).toEqual(service);
        expect(mockRequestOptions.path.preference_id).toEqual(preferenceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePreferencesOnScopeAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deletePreferencesOnScopeAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deletePreferencesOnScopeAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const service = 'testString';
        const preferenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePreferencesOnScopeAccountParams = {
          accountId,
          iamId,
          service,
          preferenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deletePreferencesOnScopeAccount(deletePreferencesOnScopeAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deletePreferencesOnScopeAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deletePreferencesOnScopeAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPreferencesOnScopeAccount', () => {
    describe('positive tests', () => {
      function __getPreferencesOnScopeAccountTest() {
        // Construct the params object for operation getPreferencesOnScopeAccount
        const accountId = 'testString';
        const iamId = 'testString';
        const service = 'testString';
        const preferenceId = 'testString';
        const getPreferencesOnScopeAccountParams = {
          accountId,
          iamId,
          service,
          preferenceId,
        };

        const getPreferencesOnScopeAccountResult = iamIdentityService.getPreferencesOnScopeAccount(getPreferencesOnScopeAccountParams);

        // all methods should return a Promise
        expectToBePromise(getPreferencesOnScopeAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/preferences/accounts/{account_id}/identities/{iam_id}/{service}/{preference_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
        expect(mockRequestOptions.path.service).toEqual(service);
        expect(mockRequestOptions.path.preference_id).toEqual(preferenceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPreferencesOnScopeAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getPreferencesOnScopeAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getPreferencesOnScopeAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const service = 'testString';
        const preferenceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPreferencesOnScopeAccountParams = {
          accountId,
          iamId,
          service,
          preferenceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getPreferencesOnScopeAccount(getPreferencesOnScopeAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getPreferencesOnScopeAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getPreferencesOnScopeAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAllPreferencesOnScopeAccount', () => {
    describe('positive tests', () => {
      function __getAllPreferencesOnScopeAccountTest() {
        // Construct the params object for operation getAllPreferencesOnScopeAccount
        const accountId = 'testString';
        const iamId = 'testString';
        const getAllPreferencesOnScopeAccountParams = {
          accountId,
          iamId,
        };

        const getAllPreferencesOnScopeAccountResult = iamIdentityService.getAllPreferencesOnScopeAccount(getAllPreferencesOnScopeAccountParams);

        // all methods should return a Promise
        expectToBePromise(getAllPreferencesOnScopeAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/preferences/accounts/{account_id}/identities/{iam_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAllPreferencesOnScopeAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getAllPreferencesOnScopeAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getAllPreferencesOnScopeAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAllPreferencesOnScopeAccountParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getAllPreferencesOnScopeAccount(getAllPreferencesOnScopeAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getAllPreferencesOnScopeAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getAllPreferencesOnScopeAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listProfileTemplates', () => {
    describe('positive tests', () => {
      function __listProfileTemplatesTest() {
        // Construct the params object for operation listProfileTemplates
        const accountId = 'testString';
        const limit = '20';
        const pagetoken = 'testString';
        const sort = 'created_at';
        const order = 'asc';
        const includeHistory = 'false';
        const listProfileTemplatesParams = {
          accountId,
          limit,
          pagetoken,
          sort,
          order,
          includeHistory,
        };

        const listProfileTemplatesResult = iamIdentityService.listProfileTemplates(listProfileTemplatesParams);

        // all methods should return a Promise
        expectToBePromise(listProfileTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listProfileTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listProfileTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listProfileTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listProfileTemplatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listProfileTemplates(listProfileTemplatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.listProfileTemplates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createProfileTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileClaimRuleConditions
      const profileClaimRuleConditionsModel = {
        claim: 'testString',
        operator: 'testString',
        value: 'testString',
      };

      // TrustedProfileTemplateClaimRule
      const trustedProfileTemplateClaimRuleModel = {
        name: 'testString',
        type: 'Profile-SAML',
        realm_name: 'testString',
        expiration: 38,
        conditions: [profileClaimRuleConditionsModel],
      };

      // ProfileIdentityRequest
      const profileIdentityRequestModel = {
        identifier: 'testString',
        type: 'user',
        accounts: ['testString'],
        description: 'testString',
      };

      // TemplateProfileComponentRequest
      const templateProfileComponentRequestModel = {
        name: 'testString',
        description: 'testString',
        email: 'testString',
        rules: [trustedProfileTemplateClaimRuleModel],
        identities: [profileIdentityRequestModel],
      };

      // PolicyTemplateReference
      const policyTemplateReferenceModel = {
        id: 'testString',
        version: 'testString',
      };

      // ActionControlsIdentities
      const actionControlsIdentitiesModel = {
        add: true,
        remove: true,
      };

      // ActionControlsRules
      const actionControlsRulesModel = {
        add: true,
        remove: true,
      };

      // ActionControlsPolicies
      const actionControlsPoliciesModel = {
        add: true,
        remove: true,
      };

      // ActionControls
      const actionControlsModel = {
        identities: actionControlsIdentitiesModel,
        rules: actionControlsRulesModel,
        policies: actionControlsPoliciesModel,
      };

      function __createProfileTemplateTest() {
        // Construct the params object for operation createProfileTemplate
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const profile = templateProfileComponentRequestModel;
        const policyTemplateReferences = [policyTemplateReferenceModel];
        const actionControls = actionControlsModel;
        const createProfileTemplateParams = {
          accountId,
          name,
          description,
          profile,
          policyTemplateReferences,
          actionControls,
        };

        const createProfileTemplateResult = iamIdentityService.createProfileTemplate(createProfileTemplateParams);

        // all methods should return a Promise
        expectToBePromise(createProfileTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.profile).toEqual(profile);
        expect(mockRequestOptions.body.policy_template_references).toEqual(policyTemplateReferences);
        expect(mockRequestOptions.body.action_controls).toEqual(actionControls);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProfileTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createProfileTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createProfileTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProfileTemplateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createProfileTemplate(createProfileTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.createProfileTemplate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getLatestProfileTemplateVersion', () => {
    describe('positive tests', () => {
      function __getLatestProfileTemplateVersionTest() {
        // Construct the params object for operation getLatestProfileTemplateVersion
        const templateId = 'testString';
        const includeHistory = false;
        const getLatestProfileTemplateVersionParams = {
          templateId,
          includeHistory,
        };

        const getLatestProfileTemplateVersionResult = iamIdentityService.getLatestProfileTemplateVersion(getLatestProfileTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getLatestProfileTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLatestProfileTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getLatestProfileTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getLatestProfileTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLatestProfileTemplateVersionParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getLatestProfileTemplateVersion(getLatestProfileTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getLatestProfileTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getLatestProfileTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAllVersionsOfProfileTemplate', () => {
    describe('positive tests', () => {
      function __deleteAllVersionsOfProfileTemplateTest() {
        // Construct the params object for operation deleteAllVersionsOfProfileTemplate
        const templateId = 'testString';
        const deleteAllVersionsOfProfileTemplateParams = {
          templateId,
        };

        const deleteAllVersionsOfProfileTemplateResult = iamIdentityService.deleteAllVersionsOfProfileTemplate(deleteAllVersionsOfProfileTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deleteAllVersionsOfProfileTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAllVersionsOfProfileTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteAllVersionsOfProfileTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteAllVersionsOfProfileTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAllVersionsOfProfileTemplateParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteAllVersionsOfProfileTemplate(deleteAllVersionsOfProfileTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteAllVersionsOfProfileTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteAllVersionsOfProfileTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listVersionsOfProfileTemplate', () => {
    describe('positive tests', () => {
      function __listVersionsOfProfileTemplateTest() {
        // Construct the params object for operation listVersionsOfProfileTemplate
        const templateId = 'testString';
        const limit = '20';
        const pagetoken = 'testString';
        const sort = 'created_at';
        const order = 'asc';
        const includeHistory = 'false';
        const listVersionsOfProfileTemplateParams = {
          templateId,
          limit,
          pagetoken,
          sort,
          order,
          includeHistory,
        };

        const listVersionsOfProfileTemplateResult = iamIdentityService.listVersionsOfProfileTemplate(listVersionsOfProfileTemplateParams);

        // all methods should return a Promise
        expectToBePromise(listVersionsOfProfileTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVersionsOfProfileTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listVersionsOfProfileTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listVersionsOfProfileTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVersionsOfProfileTemplateParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listVersionsOfProfileTemplate(listVersionsOfProfileTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.listVersionsOfProfileTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.listVersionsOfProfileTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createProfileTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileClaimRuleConditions
      const profileClaimRuleConditionsModel = {
        claim: 'testString',
        operator: 'testString',
        value: 'testString',
      };

      // TrustedProfileTemplateClaimRule
      const trustedProfileTemplateClaimRuleModel = {
        name: 'testString',
        type: 'Profile-SAML',
        realm_name: 'testString',
        expiration: 38,
        conditions: [profileClaimRuleConditionsModel],
      };

      // ProfileIdentityRequest
      const profileIdentityRequestModel = {
        identifier: 'testString',
        type: 'user',
        accounts: ['testString'],
        description: 'testString',
      };

      // TemplateProfileComponentRequest
      const templateProfileComponentRequestModel = {
        name: 'testString',
        description: 'testString',
        email: 'testString',
        rules: [trustedProfileTemplateClaimRuleModel],
        identities: [profileIdentityRequestModel],
      };

      // PolicyTemplateReference
      const policyTemplateReferenceModel = {
        id: 'testString',
        version: 'testString',
      };

      // ActionControlsIdentities
      const actionControlsIdentitiesModel = {
        add: true,
        remove: true,
      };

      // ActionControlsRules
      const actionControlsRulesModel = {
        add: true,
        remove: true,
      };

      // ActionControlsPolicies
      const actionControlsPoliciesModel = {
        add: true,
        remove: true,
      };

      // ActionControls
      const actionControlsModel = {
        identities: actionControlsIdentitiesModel,
        rules: actionControlsRulesModel,
        policies: actionControlsPoliciesModel,
      };

      function __createProfileTemplateVersionTest() {
        // Construct the params object for operation createProfileTemplateVersion
        const templateId = 'testString';
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const profile = templateProfileComponentRequestModel;
        const policyTemplateReferences = [policyTemplateReferenceModel];
        const actionControls = actionControlsModel;
        const createProfileTemplateVersionParams = {
          templateId,
          accountId,
          name,
          description,
          profile,
          policyTemplateReferences,
          actionControls,
        };

        const createProfileTemplateVersionResult = iamIdentityService.createProfileTemplateVersion(createProfileTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(createProfileTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}/versions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.profile).toEqual(profile);
        expect(mockRequestOptions.body.policy_template_references).toEqual(policyTemplateReferences);
        expect(mockRequestOptions.body.action_controls).toEqual(actionControls);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createProfileTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createProfileTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createProfileTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createProfileTemplateVersionParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createProfileTemplateVersion(createProfileTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createProfileTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createProfileTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getProfileTemplateVersion', () => {
    describe('positive tests', () => {
      function __getProfileTemplateVersionTest() {
        // Construct the params object for operation getProfileTemplateVersion
        const templateId = 'testString';
        const version = 'testString';
        const includeHistory = false;
        const getProfileTemplateVersionParams = {
          templateId,
          version,
          includeHistory,
        };

        const getProfileTemplateVersionResult = iamIdentityService.getProfileTemplateVersion(getProfileTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getProfileTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}/versions/{version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getProfileTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getProfileTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getProfileTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getProfileTemplateVersionParams = {
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getProfileTemplateVersion(getProfileTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getProfileTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getProfileTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateProfileTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ProfileClaimRuleConditions
      const profileClaimRuleConditionsModel = {
        claim: 'testString',
        operator: 'testString',
        value: 'testString',
      };

      // TrustedProfileTemplateClaimRule
      const trustedProfileTemplateClaimRuleModel = {
        name: 'testString',
        type: 'Profile-SAML',
        realm_name: 'testString',
        expiration: 38,
        conditions: [profileClaimRuleConditionsModel],
      };

      // ProfileIdentityRequest
      const profileIdentityRequestModel = {
        identifier: 'testString',
        type: 'user',
        accounts: ['testString'],
        description: 'testString',
      };

      // TemplateProfileComponentRequest
      const templateProfileComponentRequestModel = {
        name: 'testString',
        description: 'testString',
        email: 'testString',
        rules: [trustedProfileTemplateClaimRuleModel],
        identities: [profileIdentityRequestModel],
      };

      // PolicyTemplateReference
      const policyTemplateReferenceModel = {
        id: 'testString',
        version: 'testString',
      };

      // ActionControlsIdentities
      const actionControlsIdentitiesModel = {
        add: true,
        remove: true,
      };

      // ActionControlsRules
      const actionControlsRulesModel = {
        add: true,
        remove: true,
      };

      // ActionControlsPolicies
      const actionControlsPoliciesModel = {
        add: true,
        remove: true,
      };

      // ActionControls
      const actionControlsModel = {
        identities: actionControlsIdentitiesModel,
        rules: actionControlsRulesModel,
        policies: actionControlsPoliciesModel,
      };

      function __updateProfileTemplateVersionTest() {
        // Construct the params object for operation updateProfileTemplateVersion
        const ifMatch = 'testString';
        const templateId = 'testString';
        const version = 'testString';
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const profile = templateProfileComponentRequestModel;
        const policyTemplateReferences = [policyTemplateReferenceModel];
        const actionControls = actionControlsModel;
        const updateProfileTemplateVersionParams = {
          ifMatch,
          templateId,
          version,
          accountId,
          name,
          description,
          profile,
          policyTemplateReferences,
          actionControls,
        };

        const updateProfileTemplateVersionResult = iamIdentityService.updateProfileTemplateVersion(updateProfileTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(updateProfileTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}/versions/{version}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.profile).toEqual(profile);
        expect(mockRequestOptions.body.policy_template_references).toEqual(policyTemplateReferences);
        expect(mockRequestOptions.body.action_controls).toEqual(actionControls);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateProfileTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateProfileTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateProfileTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ifMatch = 'testString';
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateProfileTemplateVersionParams = {
          ifMatch,
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateProfileTemplateVersion(updateProfileTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateProfileTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateProfileTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteProfileTemplateVersion', () => {
    describe('positive tests', () => {
      function __deleteProfileTemplateVersionTest() {
        // Construct the params object for operation deleteProfileTemplateVersion
        const templateId = 'testString';
        const version = 'testString';
        const deleteProfileTemplateVersionParams = {
          templateId,
          version,
        };

        const deleteProfileTemplateVersionResult = iamIdentityService.deleteProfileTemplateVersion(deleteProfileTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteProfileTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}/versions/{version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteProfileTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteProfileTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteProfileTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteProfileTemplateVersionParams = {
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteProfileTemplateVersion(deleteProfileTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteProfileTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteProfileTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('commitProfileTemplate', () => {
    describe('positive tests', () => {
      function __commitProfileTemplateTest() {
        // Construct the params object for operation commitProfileTemplate
        const templateId = 'testString';
        const version = 'testString';
        const commitProfileTemplateParams = {
          templateId,
          version,
        };

        const commitProfileTemplateResult = iamIdentityService.commitProfileTemplate(commitProfileTemplateParams);

        // all methods should return a Promise
        expectToBePromise(commitProfileTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_templates/{template_id}/versions/{version}/commit', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __commitProfileTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __commitProfileTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __commitProfileTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const commitProfileTemplateParams = {
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.commitProfileTemplate(commitProfileTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.commitProfileTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.commitProfileTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTrustedProfileAssignments', () => {
    describe('positive tests', () => {
      function __listTrustedProfileAssignmentsTest() {
        // Construct the params object for operation listTrustedProfileAssignments
        const accountId = 'testString';
        const templateId = 'testString';
        const templateVersion = 'testString';
        const target = 'testString';
        const targetType = 'Account';
        const limit = 20;
        const pagetoken = 'testString';
        const sort = 'created_at';
        const order = 'asc';
        const includeHistory = false;
        const listTrustedProfileAssignmentsParams = {
          accountId,
          templateId,
          templateVersion,
          target,
          targetType,
          limit,
          pagetoken,
          sort,
          order,
          includeHistory,
        };

        const listTrustedProfileAssignmentsResult = iamIdentityService.listTrustedProfileAssignments(listTrustedProfileAssignmentsParams);

        // all methods should return a Promise
        expectToBePromise(listTrustedProfileAssignmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_assignments/', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.template_id).toEqual(templateId);
        expect(mockRequestOptions.qs.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.qs.target).toEqual(target);
        expect(mockRequestOptions.qs.target_type).toEqual(targetType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTrustedProfileAssignmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listTrustedProfileAssignmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listTrustedProfileAssignmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTrustedProfileAssignmentsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listTrustedProfileAssignments(listTrustedProfileAssignmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.listTrustedProfileAssignments({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createTrustedProfileAssignment', () => {
    describe('positive tests', () => {
      function __createTrustedProfileAssignmentTest() {
        // Construct the params object for operation createTrustedProfileAssignment
        const templateId = 'testString';
        const templateVersion = 1;
        const targetType = 'Account';
        const target = 'testString';
        const createTrustedProfileAssignmentParams = {
          templateId,
          templateVersion,
          targetType,
          target,
        };

        const createTrustedProfileAssignmentResult = iamIdentityService.createTrustedProfileAssignment(createTrustedProfileAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(createTrustedProfileAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_assignments/', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.template_id).toEqual(templateId);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.body.target_type).toEqual(targetType);
        expect(mockRequestOptions.body.target).toEqual(target);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTrustedProfileAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createTrustedProfileAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createTrustedProfileAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const templateVersion = 1;
        const targetType = 'Account';
        const target = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTrustedProfileAssignmentParams = {
          templateId,
          templateVersion,
          targetType,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createTrustedProfileAssignment(createTrustedProfileAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createTrustedProfileAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createTrustedProfileAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getTrustedProfileAssignment', () => {
    describe('positive tests', () => {
      function __getTrustedProfileAssignmentTest() {
        // Construct the params object for operation getTrustedProfileAssignment
        const assignmentId = 'testString';
        const includeHistory = false;
        const getTrustedProfileAssignmentParams = {
          assignmentId,
          includeHistory,
        };

        const getTrustedProfileAssignmentResult = iamIdentityService.getTrustedProfileAssignment(getTrustedProfileAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(getTrustedProfileAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_assignments/{assignment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTrustedProfileAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getTrustedProfileAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getTrustedProfileAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTrustedProfileAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getTrustedProfileAssignment(getTrustedProfileAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getTrustedProfileAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getTrustedProfileAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTrustedProfileAssignment', () => {
    describe('positive tests', () => {
      function __deleteTrustedProfileAssignmentTest() {
        // Construct the params object for operation deleteTrustedProfileAssignment
        const assignmentId = 'testString';
        const deleteTrustedProfileAssignmentParams = {
          assignmentId,
        };

        const deleteTrustedProfileAssignmentResult = iamIdentityService.deleteTrustedProfileAssignment(deleteTrustedProfileAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteTrustedProfileAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_assignments/{assignment_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTrustedProfileAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteTrustedProfileAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteTrustedProfileAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTrustedProfileAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteTrustedProfileAssignment(deleteTrustedProfileAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteTrustedProfileAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteTrustedProfileAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTrustedProfileAssignment', () => {
    describe('positive tests', () => {
      function __updateTrustedProfileAssignmentTest() {
        // Construct the params object for operation updateTrustedProfileAssignment
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 1;
        const updateTrustedProfileAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
        };

        const updateTrustedProfileAssignmentResult = iamIdentityService.updateTrustedProfileAssignment(updateTrustedProfileAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(updateTrustedProfileAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/profile_assignments/{assignment_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTrustedProfileAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateTrustedProfileAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateTrustedProfileAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 1;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTrustedProfileAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateTrustedProfileAssignment(updateTrustedProfileAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateTrustedProfileAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateTrustedProfileAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccountSettingsTemplates', () => {
    describe('positive tests', () => {
      function __listAccountSettingsTemplatesTest() {
        // Construct the params object for operation listAccountSettingsTemplates
        const accountId = 'testString';
        const limit = '20';
        const pagetoken = 'testString';
        const sort = 'created_at';
        const order = 'asc';
        const includeHistory = 'false';
        const listAccountSettingsTemplatesParams = {
          accountId,
          limit,
          pagetoken,
          sort,
          order,
          includeHistory,
        };

        const listAccountSettingsTemplatesResult = iamIdentityService.listAccountSettingsTemplates(listAccountSettingsTemplatesParams);

        // all methods should return a Promise
        expectToBePromise(listAccountSettingsTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccountSettingsTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listAccountSettingsTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listAccountSettingsTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccountSettingsTemplatesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listAccountSettingsTemplates(listAccountSettingsTemplatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.listAccountSettingsTemplates({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createAccountSettingsTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AccountSettingsUserMFA
      const accountSettingsUserMfaModel = {
        iam_id: 'testString',
        mfa: 'NONE',
      };

      // AccountSettingsComponent
      const accountSettingsComponentModel = {
        restrict_create_service_id: 'NOT_SET',
        restrict_create_platform_apikey: 'NOT_SET',
        allowed_ip_addresses: 'testString',
        mfa: 'NONE',
        user_mfa: [accountSettingsUserMfaModel],
        session_expiration_in_seconds: '86400',
        session_invalidation_in_seconds: '7200',
        max_sessions_per_identity: 'testString',
        system_access_token_expiration_in_seconds: '3600',
        system_refresh_token_expiration_in_seconds: '259200',
      };

      function __createAccountSettingsTemplateTest() {
        // Construct the params object for operation createAccountSettingsTemplate
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const accountSettings = accountSettingsComponentModel;
        const createAccountSettingsTemplateParams = {
          accountId,
          name,
          description,
          accountSettings,
        };

        const createAccountSettingsTemplateResult = iamIdentityService.createAccountSettingsTemplate(createAccountSettingsTemplateParams);

        // all methods should return a Promise
        expectToBePromise(createAccountSettingsTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.account_settings).toEqual(accountSettings);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccountSettingsTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createAccountSettingsTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createAccountSettingsTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccountSettingsTemplateParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createAccountSettingsTemplate(createAccountSettingsTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.createAccountSettingsTemplate({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getLatestAccountSettingsTemplateVersion', () => {
    describe('positive tests', () => {
      function __getLatestAccountSettingsTemplateVersionTest() {
        // Construct the params object for operation getLatestAccountSettingsTemplateVersion
        const templateId = 'testString';
        const includeHistory = false;
        const getLatestAccountSettingsTemplateVersionParams = {
          templateId,
          includeHistory,
        };

        const getLatestAccountSettingsTemplateVersionResult = iamIdentityService.getLatestAccountSettingsTemplateVersion(getLatestAccountSettingsTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getLatestAccountSettingsTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLatestAccountSettingsTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getLatestAccountSettingsTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getLatestAccountSettingsTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLatestAccountSettingsTemplateVersionParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getLatestAccountSettingsTemplateVersion(getLatestAccountSettingsTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getLatestAccountSettingsTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getLatestAccountSettingsTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAllVersionsOfAccountSettingsTemplate', () => {
    describe('positive tests', () => {
      function __deleteAllVersionsOfAccountSettingsTemplateTest() {
        // Construct the params object for operation deleteAllVersionsOfAccountSettingsTemplate
        const templateId = 'testString';
        const deleteAllVersionsOfAccountSettingsTemplateParams = {
          templateId,
        };

        const deleteAllVersionsOfAccountSettingsTemplateResult = iamIdentityService.deleteAllVersionsOfAccountSettingsTemplate(deleteAllVersionsOfAccountSettingsTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deleteAllVersionsOfAccountSettingsTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAllVersionsOfAccountSettingsTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteAllVersionsOfAccountSettingsTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteAllVersionsOfAccountSettingsTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAllVersionsOfAccountSettingsTemplateParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteAllVersionsOfAccountSettingsTemplate(deleteAllVersionsOfAccountSettingsTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteAllVersionsOfAccountSettingsTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteAllVersionsOfAccountSettingsTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listVersionsOfAccountSettingsTemplate', () => {
    describe('positive tests', () => {
      function __listVersionsOfAccountSettingsTemplateTest() {
        // Construct the params object for operation listVersionsOfAccountSettingsTemplate
        const templateId = 'testString';
        const limit = '20';
        const pagetoken = 'testString';
        const sort = 'created_at';
        const order = 'asc';
        const includeHistory = 'false';
        const listVersionsOfAccountSettingsTemplateParams = {
          templateId,
          limit,
          pagetoken,
          sort,
          order,
          includeHistory,
        };

        const listVersionsOfAccountSettingsTemplateResult = iamIdentityService.listVersionsOfAccountSettingsTemplate(listVersionsOfAccountSettingsTemplateParams);

        // all methods should return a Promise
        expectToBePromise(listVersionsOfAccountSettingsTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listVersionsOfAccountSettingsTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listVersionsOfAccountSettingsTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listVersionsOfAccountSettingsTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listVersionsOfAccountSettingsTemplateParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listVersionsOfAccountSettingsTemplate(listVersionsOfAccountSettingsTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.listVersionsOfAccountSettingsTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.listVersionsOfAccountSettingsTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAccountSettingsTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AccountSettingsUserMFA
      const accountSettingsUserMfaModel = {
        iam_id: 'testString',
        mfa: 'NONE',
      };

      // AccountSettingsComponent
      const accountSettingsComponentModel = {
        restrict_create_service_id: 'NOT_SET',
        restrict_create_platform_apikey: 'NOT_SET',
        allowed_ip_addresses: 'testString',
        mfa: 'NONE',
        user_mfa: [accountSettingsUserMfaModel],
        session_expiration_in_seconds: '86400',
        session_invalidation_in_seconds: '7200',
        max_sessions_per_identity: 'testString',
        system_access_token_expiration_in_seconds: '3600',
        system_refresh_token_expiration_in_seconds: '259200',
      };

      function __createAccountSettingsTemplateVersionTest() {
        // Construct the params object for operation createAccountSettingsTemplateVersion
        const templateId = 'testString';
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const accountSettings = accountSettingsComponentModel;
        const createAccountSettingsTemplateVersionParams = {
          templateId,
          accountId,
          name,
          description,
          accountSettings,
        };

        const createAccountSettingsTemplateVersionResult = iamIdentityService.createAccountSettingsTemplateVersion(createAccountSettingsTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(createAccountSettingsTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}/versions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.account_settings).toEqual(accountSettings);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccountSettingsTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createAccountSettingsTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createAccountSettingsTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccountSettingsTemplateVersionParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createAccountSettingsTemplateVersion(createAccountSettingsTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createAccountSettingsTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createAccountSettingsTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccountSettingsTemplateVersion', () => {
    describe('positive tests', () => {
      function __getAccountSettingsTemplateVersionTest() {
        // Construct the params object for operation getAccountSettingsTemplateVersion
        const templateId = 'testString';
        const version = 'testString';
        const includeHistory = false;
        const getAccountSettingsTemplateVersionParams = {
          templateId,
          version,
          includeHistory,
        };

        const getAccountSettingsTemplateVersionResult = iamIdentityService.getAccountSettingsTemplateVersion(getAccountSettingsTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getAccountSettingsTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}/versions/{version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountSettingsTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getAccountSettingsTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getAccountSettingsTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountSettingsTemplateVersionParams = {
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getAccountSettingsTemplateVersion(getAccountSettingsTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getAccountSettingsTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getAccountSettingsTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccountSettingsTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AccountSettingsUserMFA
      const accountSettingsUserMfaModel = {
        iam_id: 'testString',
        mfa: 'NONE',
      };

      // AccountSettingsComponent
      const accountSettingsComponentModel = {
        restrict_create_service_id: 'NOT_SET',
        restrict_create_platform_apikey: 'NOT_SET',
        allowed_ip_addresses: 'testString',
        mfa: 'NONE',
        user_mfa: [accountSettingsUserMfaModel],
        session_expiration_in_seconds: '86400',
        session_invalidation_in_seconds: '7200',
        max_sessions_per_identity: 'testString',
        system_access_token_expiration_in_seconds: '3600',
        system_refresh_token_expiration_in_seconds: '259200',
      };

      function __updateAccountSettingsTemplateVersionTest() {
        // Construct the params object for operation updateAccountSettingsTemplateVersion
        const ifMatch = 'testString';
        const templateId = 'testString';
        const version = 'testString';
        const accountId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const accountSettings = accountSettingsComponentModel;
        const updateAccountSettingsTemplateVersionParams = {
          ifMatch,
          templateId,
          version,
          accountId,
          name,
          description,
          accountSettings,
        };

        const updateAccountSettingsTemplateVersionResult = iamIdentityService.updateAccountSettingsTemplateVersion(updateAccountSettingsTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(updateAccountSettingsTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}/versions/{version}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.account_settings).toEqual(accountSettings);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccountSettingsTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateAccountSettingsTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateAccountSettingsTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ifMatch = 'testString';
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccountSettingsTemplateVersionParams = {
          ifMatch,
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateAccountSettingsTemplateVersion(updateAccountSettingsTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateAccountSettingsTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateAccountSettingsTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccountSettingsTemplateVersion', () => {
    describe('positive tests', () => {
      function __deleteAccountSettingsTemplateVersionTest() {
        // Construct the params object for operation deleteAccountSettingsTemplateVersion
        const templateId = 'testString';
        const version = 'testString';
        const deleteAccountSettingsTemplateVersionParams = {
          templateId,
          version,
        };

        const deleteAccountSettingsTemplateVersionResult = iamIdentityService.deleteAccountSettingsTemplateVersion(deleteAccountSettingsTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteAccountSettingsTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}/versions/{version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccountSettingsTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteAccountSettingsTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteAccountSettingsTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccountSettingsTemplateVersionParams = {
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteAccountSettingsTemplateVersion(deleteAccountSettingsTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteAccountSettingsTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteAccountSettingsTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('commitAccountSettingsTemplate', () => {
    describe('positive tests', () => {
      function __commitAccountSettingsTemplateTest() {
        // Construct the params object for operation commitAccountSettingsTemplate
        const templateId = 'testString';
        const version = 'testString';
        const commitAccountSettingsTemplateParams = {
          templateId,
          version,
        };

        const commitAccountSettingsTemplateResult = iamIdentityService.commitAccountSettingsTemplate(commitAccountSettingsTemplateParams);

        // all methods should return a Promise
        expectToBePromise(commitAccountSettingsTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_templates/{template_id}/versions/{version}/commit', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __commitAccountSettingsTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __commitAccountSettingsTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __commitAccountSettingsTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const commitAccountSettingsTemplateParams = {
          templateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.commitAccountSettingsTemplate(commitAccountSettingsTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.commitAccountSettingsTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.commitAccountSettingsTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccountSettingsAssignments', () => {
    describe('positive tests', () => {
      function __listAccountSettingsAssignmentsTest() {
        // Construct the params object for operation listAccountSettingsAssignments
        const accountId = 'testString';
        const templateId = 'testString';
        const templateVersion = 'testString';
        const target = 'testString';
        const targetType = 'Account';
        const limit = 20;
        const pagetoken = 'testString';
        const sort = 'created_at';
        const order = 'asc';
        const includeHistory = false;
        const listAccountSettingsAssignmentsParams = {
          accountId,
          templateId,
          templateVersion,
          target,
          targetType,
          limit,
          pagetoken,
          sort,
          order,
          includeHistory,
        };

        const listAccountSettingsAssignmentsResult = iamIdentityService.listAccountSettingsAssignments(listAccountSettingsAssignmentsParams);

        // all methods should return a Promise
        expectToBePromise(listAccountSettingsAssignmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_assignments/', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.template_id).toEqual(templateId);
        expect(mockRequestOptions.qs.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.qs.target).toEqual(target);
        expect(mockRequestOptions.qs.target_type).toEqual(targetType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.pagetoken).toEqual(pagetoken);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.order).toEqual(order);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccountSettingsAssignmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __listAccountSettingsAssignmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __listAccountSettingsAssignmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccountSettingsAssignmentsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.listAccountSettingsAssignments(listAccountSettingsAssignmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamIdentityService.listAccountSettingsAssignments({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createAccountSettingsAssignment', () => {
    describe('positive tests', () => {
      function __createAccountSettingsAssignmentTest() {
        // Construct the params object for operation createAccountSettingsAssignment
        const templateId = 'testString';
        const templateVersion = 1;
        const targetType = 'Account';
        const target = 'testString';
        const createAccountSettingsAssignmentParams = {
          templateId,
          templateVersion,
          targetType,
          target,
        };

        const createAccountSettingsAssignmentResult = iamIdentityService.createAccountSettingsAssignment(createAccountSettingsAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(createAccountSettingsAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_assignments/', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.template_id).toEqual(templateId);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.body.target_type).toEqual(targetType);
        expect(mockRequestOptions.body.target).toEqual(target);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccountSettingsAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __createAccountSettingsAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __createAccountSettingsAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const templateVersion = 1;
        const targetType = 'Account';
        const target = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccountSettingsAssignmentParams = {
          templateId,
          templateVersion,
          targetType,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.createAccountSettingsAssignment(createAccountSettingsAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.createAccountSettingsAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.createAccountSettingsAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccountSettingsAssignment', () => {
    describe('positive tests', () => {
      function __getAccountSettingsAssignmentTest() {
        // Construct the params object for operation getAccountSettingsAssignment
        const assignmentId = 'testString';
        const includeHistory = false;
        const getAccountSettingsAssignmentParams = {
          assignmentId,
          includeHistory,
        };

        const getAccountSettingsAssignmentResult = iamIdentityService.getAccountSettingsAssignment(getAccountSettingsAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(getAccountSettingsAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_assignments/{assignment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_history).toEqual(includeHistory);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountSettingsAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __getAccountSettingsAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __getAccountSettingsAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountSettingsAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.getAccountSettingsAssignment(getAccountSettingsAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.getAccountSettingsAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.getAccountSettingsAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccountSettingsAssignment', () => {
    describe('positive tests', () => {
      function __deleteAccountSettingsAssignmentTest() {
        // Construct the params object for operation deleteAccountSettingsAssignment
        const assignmentId = 'testString';
        const deleteAccountSettingsAssignmentParams = {
          assignmentId,
        };

        const deleteAccountSettingsAssignmentResult = iamIdentityService.deleteAccountSettingsAssignment(deleteAccountSettingsAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteAccountSettingsAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_assignments/{assignment_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccountSettingsAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __deleteAccountSettingsAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __deleteAccountSettingsAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccountSettingsAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.deleteAccountSettingsAssignment(deleteAccountSettingsAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.deleteAccountSettingsAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.deleteAccountSettingsAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccountSettingsAssignment', () => {
    describe('positive tests', () => {
      function __updateAccountSettingsAssignmentTest() {
        // Construct the params object for operation updateAccountSettingsAssignment
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 1;
        const updateAccountSettingsAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
        };

        const updateAccountSettingsAssignmentResult = iamIdentityService.updateAccountSettingsAssignment(updateAccountSettingsAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(updateAccountSettingsAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings_assignments/{assignment_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccountSettingsAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.enableRetries();
        __updateAccountSettingsAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamIdentityService.disableRetries();
        __updateAccountSettingsAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 1;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccountSettingsAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamIdentityService.updateAccountSettingsAssignment(updateAccountSettingsAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamIdentityService.updateAccountSettingsAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamIdentityService.updateAccountSettingsAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
