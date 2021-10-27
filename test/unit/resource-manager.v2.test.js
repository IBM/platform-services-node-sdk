/**
 * (C) Copyright IBM Corp. 2021.
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

const ResourceManagerV2 = require('../../dist/resource-manager/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const resourceManagerServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://resource-controller.cloud.ibm.com',
};

const resourceManagerService = new ResourceManagerV2(resourceManagerServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(resourceManagerService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('ResourceManagerV2', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = ResourceManagerV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ResourceManagerV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ResourceManagerV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ResourceManagerV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ResourceManagerV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ResourceManagerV2);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ResourceManagerV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ResourceManagerV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ResourceManagerV2.DEFAULT_SERVICE_URL);
    });
  });
  describe('listResourceGroups', () => {
    describe('positive tests', () => {
      function __listResourceGroupsTest() {
        // Construct the params object for operation listResourceGroups
        const accountId = 'testString';
        const date = 'testString';
        const name = 'testString';
        const _default = true;
        const includeDeleted = true;
        const params = {
          accountId: accountId,
          date: date,
          name: name,
          _default: _default,
          includeDeleted: includeDeleted,
        };

        const listResourceGroupsResult = resourceManagerService.listResourceGroups(params);

        // all methods should return a Promise
        expectToBePromise(listResourceGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.date).toEqual(date);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.default).toEqual(_default);
        expect(mockRequestOptions.qs.include_deleted).toEqual(includeDeleted);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.enableRetries();
        __listResourceGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.disableRetries();
        __listResourceGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManagerService.listResourceGroups(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceManagerService.listResourceGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createResourceGroup', () => {
    describe('positive tests', () => {
      function __createResourceGroupTest() {
        // Construct the params object for operation createResourceGroup
        const name = 'test1';
        const accountId = '25eba2a9-beef-450b-82cf-f5ad5e36c6dd';
        const params = {
          name: name,
          accountId: accountId,
        };

        const createResourceGroupResult = resourceManagerService.createResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(createResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createResourceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.enableRetries();
        __createResourceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.disableRetries();
        __createResourceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManagerService.createResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceManagerService.createResourceGroup({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getResourceGroup', () => {
    describe('positive tests', () => {
      function __getResourceGroupTest() {
        // Construct the params object for operation getResourceGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const getResourceGroupResult = resourceManagerService.getResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(getResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_groups/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.enableRetries();
        __getResourceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.disableRetries();
        __getResourceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManagerService.getResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceManagerService.getResourceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceManagerService.getResourceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateResourceGroup', () => {
    describe('positive tests', () => {
      function __updateResourceGroupTest() {
        // Construct the params object for operation updateResourceGroup
        const id = 'testString';
        const name = 'testString';
        const state = 'testString';
        const params = {
          id: id,
          name: name,
          state: state,
        };

        const updateResourceGroupResult = resourceManagerService.updateResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(updateResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_groups/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateResourceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.enableRetries();
        __updateResourceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.disableRetries();
        __updateResourceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManagerService.updateResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceManagerService.updateResourceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceManagerService.updateResourceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteResourceGroup', () => {
    describe('positive tests', () => {
      function __deleteResourceGroupTest() {
        // Construct the params object for operation deleteResourceGroup
        const id = 'testString';
        const params = {
          id: id,
        };

        const deleteResourceGroupResult = resourceManagerService.deleteResourceGroup(params);

        // all methods should return a Promise
        expectToBePromise(deleteResourceGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_groups/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteResourceGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.enableRetries();
        __deleteResourceGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.disableRetries();
        __deleteResourceGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManagerService.deleteResourceGroup(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceManagerService.deleteResourceGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceManagerService.deleteResourceGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listQuotaDefinitions', () => {
    describe('positive tests', () => {
      function __listQuotaDefinitionsTest() {
        // Construct the params object for operation listQuotaDefinitions
        const params = {};

        const listQuotaDefinitionsResult = resourceManagerService.listQuotaDefinitions(params);

        // all methods should return a Promise
        expectToBePromise(listQuotaDefinitionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/quota_definitions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listQuotaDefinitionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.enableRetries();
        __listQuotaDefinitionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.disableRetries();
        __listQuotaDefinitionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManagerService.listQuotaDefinitions(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceManagerService.listQuotaDefinitions({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getQuotaDefinition', () => {
    describe('positive tests', () => {
      function __getQuotaDefinitionTest() {
        // Construct the params object for operation getQuotaDefinition
        const id = 'testString';
        const params = {
          id: id,
        };

        const getQuotaDefinitionResult = resourceManagerService.getQuotaDefinition(params);

        // all methods should return a Promise
        expectToBePromise(getQuotaDefinitionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/quota_definitions/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getQuotaDefinitionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.enableRetries();
        __getQuotaDefinitionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceManagerService.disableRetries();
        __getQuotaDefinitionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceManagerService.getQuotaDefinition(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceManagerService.getQuotaDefinition({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceManagerService.getQuotaDefinition();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
