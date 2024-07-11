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

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const ResourceControllerV2 = require('../../dist/resource-controller/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
}  = require('@ibm-cloud/sdk-test-utilities');

const resourceControllerServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://resource-controller.cloud.ibm.com',
};

const resourceControllerService = new ResourceControllerV2(resourceControllerServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(resourceControllerService, 'createRequest');
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

describe('ResourceControllerV2', () => {
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
      const testInstance = ResourceControllerV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ResourceControllerV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ResourceControllerV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ResourceControllerV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ResourceControllerV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ResourceControllerV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ResourceControllerV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ResourceControllerV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ResourceControllerV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('listResourceInstances', () => {
    describe('positive tests', () => {
      function __listResourceInstancesTest() {
        // Construct the params object for operation listResourceInstances
        const guid = 'testString';
        const name = 'testString';
        const resourceGroupId = 'testString';
        const resourceId = 'testString';
        const resourcePlanId = 'testString';
        const type = 'testString';
        const subType = 'testString';
        const limit = 100;
        const start = 'testString';
        const state = 'active';
        const updatedFrom = '2021-01-01';
        const updatedTo = '2021-01-01';
        const listResourceInstancesParams = {
          guid,
          name,
          resourceGroupId,
          resourceId,
          resourcePlanId,
          type,
          subType,
          limit,
          start,
          state,
          updatedFrom,
          updatedTo,
        };

        const listResourceInstancesResult = resourceControllerService.listResourceInstances(listResourceInstancesParams);

        // all methods should return a Promise
        expectToBePromise(listResourceInstancesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.guid).toEqual(guid);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.resource_id).toEqual(resourceId);
        expect(mockRequestOptions.qs.resource_plan_id).toEqual(resourcePlanId);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.sub_type).toEqual(subType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.updated_from).toEqual(updatedFrom);
        expect(mockRequestOptions.qs.updated_to).toEqual(updatedTo);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceInstancesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listResourceInstancesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listResourceInstancesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceInstancesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listResourceInstances(listResourceInstancesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceControllerService.listResourceInstances({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ResourceInstancesPager tests', () => {
      const serviceUrl = resourceControllerServiceOptions.url;
      const path = '/v2/resource_instances';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","scheduled_reclaim_at":"2019-01-01T12:00:00.000Z","restored_at":"2019-01-01T12:00:00.000Z","restored_by":"restored_by","scheduled_reclaim_by":"scheduled_reclaim_by","name":"name","region_id":"region_id","account_id":"account_id","reseller_channel_id":"reseller_channel_id","resource_plan_id":"resource_plan_id","resource_group_id":"resource_group_id","resource_group_crn":"resource_group_crn","target_crn":"target_crn","onetime_credentials":false,"parameters":{"anyKey":"anyValue"},"allow_cleanup":false,"crn":"crn","state":"active","type":"type","sub_type":"sub_type","resource_id":"resource_id","dashboard_url":"dashboard_url","last_operation":{"type":"type","state":"in progress","sub_type":"sub_type","async":false,"description":"description","reason_code":"reason_code","poll_after":10,"cancelable":true,"poll":true},"resource_aliases_url":"resource_aliases_url","resource_bindings_url":"resource_bindings_url","resource_keys_url":"resource_keys_url","plan_history":[{"resource_plan_id":"resource_plan_id","start_date":"2019-01-01T12:00:00.000Z","requestor_id":"requestor_id"}],"migrated":true,"extensions":{"anyKey":"anyValue"},"controlled_by":"controlled_by","locked":true}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","scheduled_reclaim_at":"2019-01-01T12:00:00.000Z","restored_at":"2019-01-01T12:00:00.000Z","restored_by":"restored_by","scheduled_reclaim_by":"scheduled_reclaim_by","name":"name","region_id":"region_id","account_id":"account_id","reseller_channel_id":"reseller_channel_id","resource_plan_id":"resource_plan_id","resource_group_id":"resource_group_id","resource_group_crn":"resource_group_crn","target_crn":"target_crn","onetime_credentials":false,"parameters":{"anyKey":"anyValue"},"allow_cleanup":false,"crn":"crn","state":"active","type":"type","sub_type":"sub_type","resource_id":"resource_id","dashboard_url":"dashboard_url","last_operation":{"type":"type","state":"in progress","sub_type":"sub_type","async":false,"description":"description","reason_code":"reason_code","poll_after":10,"cancelable":true,"poll":true},"resource_aliases_url":"resource_aliases_url","resource_bindings_url":"resource_bindings_url","resource_keys_url":"resource_keys_url","plan_history":[{"resource_plan_id":"resource_plan_id","start_date":"2019-01-01T12:00:00.000Z","requestor_id":"requestor_id"}],"migrated":true,"extensions":{"anyKey":"anyValue"},"controlled_by":"controlled_by","locked":true}]}';

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
          guid: 'testString',
          name: 'testString',
          resourceGroupId: 'testString',
          resourceId: 'testString',
          resourcePlanId: 'testString',
          type: 'testString',
          subType: 'testString',
          limit: 10,
          state: 'active',
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const allResults = [];
        const pager = new ResourceControllerV2.ResourceInstancesPager(resourceControllerService, params);
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
          guid: 'testString',
          name: 'testString',
          resourceGroupId: 'testString',
          resourceId: 'testString',
          resourcePlanId: 'testString',
          type: 'testString',
          subType: 'testString',
          limit: 10,
          state: 'active',
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const pager = new ResourceControllerV2.ResourceInstancesPager(resourceControllerService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createResourceInstance', () => {
    describe('positive tests', () => {
      function __createResourceInstanceTest() {
        // Construct the params object for operation createResourceInstance
        const name = 'ExampleResourceInstance';
        const target = 'global';
        const resourceGroup = '13aa3ee48c3b44ddb64c05c79f7ab8ef';
        const resourcePlanId = 'a10e4960-3685-11e9-b210-d663bd873d93';
        const tags = ['testString'];
        const allowCleanup = false;
        const parameters = { anyKey: 'anyValue' };
        const entityLock = false;
        const createResourceInstanceParams = {
          name,
          target,
          resourceGroup,
          resourcePlanId,
          tags,
          allowCleanup,
          parameters,
          entityLock,
        };

        const createResourceInstanceResult = resourceControllerService.createResourceInstance(createResourceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(createResourceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Entity-Lock', entityLock);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.resource_group).toEqual(resourceGroup);
        expect(mockRequestOptions.body.resource_plan_id).toEqual(resourcePlanId);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.allow_cleanup).toEqual(allowCleanup);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createResourceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __createResourceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __createResourceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'ExampleResourceInstance';
        const target = 'global';
        const resourceGroup = '13aa3ee48c3b44ddb64c05c79f7ab8ef';
        const resourcePlanId = 'a10e4960-3685-11e9-b210-d663bd873d93';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createResourceInstanceParams = {
          name,
          target,
          resourceGroup,
          resourcePlanId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.createResourceInstance(createResourceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.createResourceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.createResourceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getResourceInstance', () => {
    describe('positive tests', () => {
      function __getResourceInstanceTest() {
        // Construct the params object for operation getResourceInstance
        const id = 'testString';
        const getResourceInstanceParams = {
          id,
        };

        const getResourceInstanceResult = resourceControllerService.getResourceInstance(getResourceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(getResourceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __getResourceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __getResourceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.getResourceInstance(getResourceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.getResourceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.getResourceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteResourceInstance', () => {
    describe('positive tests', () => {
      function __deleteResourceInstanceTest() {
        // Construct the params object for operation deleteResourceInstance
        const id = 'testString';
        const recursive = false;
        const deleteResourceInstanceParams = {
          id,
          recursive,
        };

        const deleteResourceInstanceResult = resourceControllerService.deleteResourceInstance(deleteResourceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(deleteResourceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.recursive).toEqual(recursive);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteResourceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __deleteResourceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __deleteResourceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteResourceInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.deleteResourceInstance(deleteResourceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateResourceInstance', () => {
    describe('positive tests', () => {
      function __updateResourceInstanceTest() {
        // Construct the params object for operation updateResourceInstance
        const id = 'testString';
        const name = 'UpdatedExampleResourceInstance';
        const parameters = { exampleProperty: 'exampleValue' };
        const resourcePlanId = 'testString';
        const allowCleanup = true;
        const updateResourceInstanceParams = {
          id,
          name,
          parameters,
          resourcePlanId,
          allowCleanup,
        };

        const updateResourceInstanceResult = resourceControllerService.updateResourceInstance(updateResourceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(updateResourceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
        expect(mockRequestOptions.body.resource_plan_id).toEqual(resourcePlanId);
        expect(mockRequestOptions.body.allow_cleanup).toEqual(allowCleanup);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateResourceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __updateResourceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __updateResourceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateResourceInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.updateResourceInstance(updateResourceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listResourceAliasesForInstance', () => {
    describe('positive tests', () => {
      function __listResourceAliasesForInstanceTest() {
        // Construct the params object for operation listResourceAliasesForInstance
        const id = 'testString';
        const limit = 100;
        const start = 'testString';
        const listResourceAliasesForInstanceParams = {
          id,
          limit,
          start,
        };

        const listResourceAliasesForInstanceResult = resourceControllerService.listResourceAliasesForInstance(listResourceAliasesForInstanceParams);

        // all methods should return a Promise
        expectToBePromise(listResourceAliasesForInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}/resource_aliases', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceAliasesForInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listResourceAliasesForInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listResourceAliasesForInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceAliasesForInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listResourceAliasesForInstance(listResourceAliasesForInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.listResourceAliasesForInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.listResourceAliasesForInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ResourceAliasesForInstancePager tests', () => {
      const serviceUrl = resourceControllerServiceOptions.url;
      const path = '/v2/resource_instances/testString/resource_aliases';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","name":"name","resource_instance_id":"resource_instance_id","target_crn":"target_crn","account_id":"account_id","resource_id":"resource_id","resource_group_id":"resource_group_id","crn":"crn","region_instance_id":"region_instance_id","region_instance_crn":"region_instance_crn","state":"state","migrated":true,"resource_instance_url":"resource_instance_url","resource_bindings_url":"resource_bindings_url","resource_keys_url":"resource_keys_url"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","name":"name","resource_instance_id":"resource_instance_id","target_crn":"target_crn","account_id":"account_id","resource_id":"resource_id","resource_group_id":"resource_group_id","crn":"crn","region_instance_id":"region_instance_id","region_instance_crn":"region_instance_crn","state":"state","migrated":true,"resource_instance_url":"resource_instance_url","resource_bindings_url":"resource_bindings_url","resource_keys_url":"resource_keys_url"}]}';

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
          id: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new ResourceControllerV2.ResourceAliasesForInstancePager(resourceControllerService, params);
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
          id: 'testString',
          limit: 10,
        };
        const pager = new ResourceControllerV2.ResourceAliasesForInstancePager(resourceControllerService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listResourceKeysForInstance', () => {
    describe('positive tests', () => {
      function __listResourceKeysForInstanceTest() {
        // Construct the params object for operation listResourceKeysForInstance
        const id = 'testString';
        const limit = 100;
        const start = 'testString';
        const listResourceKeysForInstanceParams = {
          id,
          limit,
          start,
        };

        const listResourceKeysForInstanceResult = resourceControllerService.listResourceKeysForInstance(listResourceKeysForInstanceParams);

        // all methods should return a Promise
        expectToBePromise(listResourceKeysForInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}/resource_keys', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceKeysForInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listResourceKeysForInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listResourceKeysForInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceKeysForInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listResourceKeysForInstance(listResourceKeysForInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.listResourceKeysForInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.listResourceKeysForInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ResourceKeysForInstancePager tests', () => {
      const serviceUrl = resourceControllerServiceOptions.url;
      const path = '/v2/resource_instances/testString/resource_keys';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","name":"name","crn":"crn","state":"state","account_id":"account_id","resource_group_id":"resource_group_id","resource_id":"resource_id","onetime_credentials":false,"credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"migrated":true,"resource_instance_url":"resource_instance_url","resource_alias_url":"resource_alias_url"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","name":"name","crn":"crn","state":"state","account_id":"account_id","resource_group_id":"resource_group_id","resource_id":"resource_id","onetime_credentials":false,"credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"migrated":true,"resource_instance_url":"resource_instance_url","resource_alias_url":"resource_alias_url"}]}';

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
          id: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new ResourceControllerV2.ResourceKeysForInstancePager(resourceControllerService, params);
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
          id: 'testString',
          limit: 10,
        };
        const pager = new ResourceControllerV2.ResourceKeysForInstancePager(resourceControllerService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('lockResourceInstance', () => {
    describe('positive tests', () => {
      function __lockResourceInstanceTest() {
        // Construct the params object for operation lockResourceInstance
        const id = 'testString';
        const lockResourceInstanceParams = {
          id,
        };

        const lockResourceInstanceResult = resourceControllerService.lockResourceInstance(lockResourceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(lockResourceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}/lock', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __lockResourceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __lockResourceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __lockResourceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const lockResourceInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.lockResourceInstance(lockResourceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.lockResourceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.lockResourceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('unlockResourceInstance', () => {
    describe('positive tests', () => {
      function __unlockResourceInstanceTest() {
        // Construct the params object for operation unlockResourceInstance
        const id = 'testString';
        const unlockResourceInstanceParams = {
          id,
        };

        const unlockResourceInstanceResult = resourceControllerService.unlockResourceInstance(unlockResourceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(unlockResourceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}/lock', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __unlockResourceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __unlockResourceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __unlockResourceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const unlockResourceInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.unlockResourceInstance(unlockResourceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.unlockResourceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.unlockResourceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('cancelLastopResourceInstance', () => {
    describe('positive tests', () => {
      function __cancelLastopResourceInstanceTest() {
        // Construct the params object for operation cancelLastopResourceInstance
        const id = 'testString';
        const cancelLastopResourceInstanceParams = {
          id,
        };

        const cancelLastopResourceInstanceResult = resourceControllerService.cancelLastopResourceInstance(cancelLastopResourceInstanceParams);

        // all methods should return a Promise
        expectToBePromise(cancelLastopResourceInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_instances/{id}/last_operation', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __cancelLastopResourceInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __cancelLastopResourceInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __cancelLastopResourceInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const cancelLastopResourceInstanceParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.cancelLastopResourceInstance(cancelLastopResourceInstanceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.cancelLastopResourceInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.cancelLastopResourceInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listResourceKeys', () => {
    describe('positive tests', () => {
      function __listResourceKeysTest() {
        // Construct the params object for operation listResourceKeys
        const guid = 'testString';
        const name = 'testString';
        const resourceGroupId = 'testString';
        const resourceId = 'testString';
        const limit = 100;
        const start = 'testString';
        const updatedFrom = '2021-01-01';
        const updatedTo = '2021-01-01';
        const listResourceKeysParams = {
          guid,
          name,
          resourceGroupId,
          resourceId,
          limit,
          start,
          updatedFrom,
          updatedTo,
        };

        const listResourceKeysResult = resourceControllerService.listResourceKeys(listResourceKeysParams);

        // all methods should return a Promise
        expectToBePromise(listResourceKeysResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_keys', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.guid).toEqual(guid);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.resource_id).toEqual(resourceId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.updated_from).toEqual(updatedFrom);
        expect(mockRequestOptions.qs.updated_to).toEqual(updatedTo);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceKeysTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listResourceKeysTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listResourceKeysTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceKeysParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listResourceKeys(listResourceKeysParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceControllerService.listResourceKeys({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ResourceKeysPager tests', () => {
      const serviceUrl = resourceControllerServiceOptions.url;
      const path = '/v2/resource_keys';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","name":"name","crn":"crn","state":"state","account_id":"account_id","resource_group_id":"resource_group_id","resource_id":"resource_id","onetime_credentials":false,"credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"migrated":true,"resource_instance_url":"resource_instance_url","resource_alias_url":"resource_alias_url"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","name":"name","crn":"crn","state":"state","account_id":"account_id","resource_group_id":"resource_group_id","resource_id":"resource_id","onetime_credentials":false,"credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"migrated":true,"resource_instance_url":"resource_instance_url","resource_alias_url":"resource_alias_url"}]}';

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
          guid: 'testString',
          name: 'testString',
          resourceGroupId: 'testString',
          resourceId: 'testString',
          limit: 10,
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const allResults = [];
        const pager = new ResourceControllerV2.ResourceKeysPager(resourceControllerService, params);
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
          guid: 'testString',
          name: 'testString',
          resourceGroupId: 'testString',
          resourceId: 'testString',
          limit: 10,
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const pager = new ResourceControllerV2.ResourceKeysPager(resourceControllerService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createResourceKey', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceKeyPostParameters
      const resourceKeyPostParametersModel = {
        serviceid_crn: 'crn:v1:bluemix:public:iam-identity::a/9fceaa56d1ab84893af6b9eec5ab81bb::serviceid:ServiceId-fe4c29b5-db13-410a-bacc-b5779a03d393',
        exampleParameter: 'exampleValue',
      };

      function __createResourceKeyTest() {
        // Construct the params object for operation createResourceKey
        const name = 'ExampleResourceKey';
        const source = '381fd51a-f251-4f95-aff4-2b03fa8caa63';
        const parameters = resourceKeyPostParametersModel;
        const role = 'Writer';
        const createResourceKeyParams = {
          name,
          source,
          parameters,
          role,
        };

        const createResourceKeyResult = resourceControllerService.createResourceKey(createResourceKeyParams);

        // all methods should return a Promise
        expectToBePromise(createResourceKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_keys', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
        expect(mockRequestOptions.body.role).toEqual(role);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createResourceKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __createResourceKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __createResourceKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'ExampleResourceKey';
        const source = '381fd51a-f251-4f95-aff4-2b03fa8caa63';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createResourceKeyParams = {
          name,
          source,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.createResourceKey(createResourceKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.createResourceKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.createResourceKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getResourceKey', () => {
    describe('positive tests', () => {
      function __getResourceKeyTest() {
        // Construct the params object for operation getResourceKey
        const id = 'testString';
        const getResourceKeyParams = {
          id,
        };

        const getResourceKeyResult = resourceControllerService.getResourceKey(getResourceKeyParams);

        // all methods should return a Promise
        expectToBePromise(getResourceKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_keys/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __getResourceKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __getResourceKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.getResourceKey(getResourceKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.getResourceKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.getResourceKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteResourceKey', () => {
    describe('positive tests', () => {
      function __deleteResourceKeyTest() {
        // Construct the params object for operation deleteResourceKey
        const id = 'testString';
        const deleteResourceKeyParams = {
          id,
        };

        const deleteResourceKeyResult = resourceControllerService.deleteResourceKey(deleteResourceKeyParams);

        // all methods should return a Promise
        expectToBePromise(deleteResourceKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_keys/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteResourceKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __deleteResourceKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __deleteResourceKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteResourceKeyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.deleteResourceKey(deleteResourceKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateResourceKey', () => {
    describe('positive tests', () => {
      function __updateResourceKeyTest() {
        // Construct the params object for operation updateResourceKey
        const id = 'testString';
        const name = 'UpdatedExampleResourceKey';
        const updateResourceKeyParams = {
          id,
          name,
        };

        const updateResourceKeyResult = resourceControllerService.updateResourceKey(updateResourceKeyParams);

        // all methods should return a Promise
        expectToBePromise(updateResourceKeyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_keys/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateResourceKeyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __updateResourceKeyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __updateResourceKeyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const name = 'UpdatedExampleResourceKey';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateResourceKeyParams = {
          id,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.updateResourceKey(updateResourceKeyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceKey({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceKey();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listResourceBindings', () => {
    describe('positive tests', () => {
      function __listResourceBindingsTest() {
        // Construct the params object for operation listResourceBindings
        const guid = 'testString';
        const name = 'testString';
        const resourceGroupId = 'testString';
        const resourceId = 'testString';
        const regionBindingId = 'testString';
        const limit = 100;
        const start = 'testString';
        const updatedFrom = '2021-01-01';
        const updatedTo = '2021-01-01';
        const listResourceBindingsParams = {
          guid,
          name,
          resourceGroupId,
          resourceId,
          regionBindingId,
          limit,
          start,
          updatedFrom,
          updatedTo,
        };

        const listResourceBindingsResult = resourceControllerService.listResourceBindings(listResourceBindingsParams);

        // all methods should return a Promise
        expectToBePromise(listResourceBindingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_bindings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.guid).toEqual(guid);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.resource_id).toEqual(resourceId);
        expect(mockRequestOptions.qs.region_binding_id).toEqual(regionBindingId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.updated_from).toEqual(updatedFrom);
        expect(mockRequestOptions.qs.updated_to).toEqual(updatedTo);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceBindingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listResourceBindingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listResourceBindingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceBindingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listResourceBindings(listResourceBindingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceControllerService.listResourceBindings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ResourceBindingsPager tests', () => {
      const serviceUrl = resourceControllerServiceOptions.url;
      const path = '/v2/resource_bindings';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","target_crn":"target_crn","crn":"crn","region_binding_id":"region_binding_id","region_binding_crn":"region_binding_crn","name":"name","account_id":"account_id","resource_group_id":"resource_group_id","state":"state","credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"resource_id":"resource_id","migrated":true,"resource_alias_url":"resource_alias_url"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","target_crn":"target_crn","crn":"crn","region_binding_id":"region_binding_id","region_binding_crn":"region_binding_crn","name":"name","account_id":"account_id","resource_group_id":"resource_group_id","state":"state","credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"resource_id":"resource_id","migrated":true,"resource_alias_url":"resource_alias_url"}]}';

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
          guid: 'testString',
          name: 'testString',
          resourceGroupId: 'testString',
          resourceId: 'testString',
          regionBindingId: 'testString',
          limit: 10,
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const allResults = [];
        const pager = new ResourceControllerV2.ResourceBindingsPager(resourceControllerService, params);
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
          guid: 'testString',
          name: 'testString',
          resourceGroupId: 'testString',
          resourceId: 'testString',
          regionBindingId: 'testString',
          limit: 10,
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const pager = new ResourceControllerV2.ResourceBindingsPager(resourceControllerService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createResourceBinding', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResourceBindingPostParameters
      const resourceBindingPostParametersModel = {
        serviceid_crn: 'crn:v1:bluemix:public:iam-identity::a/9fceaa56d1ab84893af6b9eec5ab81bb::serviceid:ServiceId-fe4c29b5-db13-410a-bacc-b5779a03d393',
        exampleParameter: 'exampleValue',
      };

      function __createResourceBindingTest() {
        // Construct the params object for operation createResourceBinding
        const source = 'faaec9d8-ec64-44d8-ab83-868632fac6a2';
        const target = 'crn:v1:staging:public:bluemix:us-south:s/e1773b6e-17b4-40c8-b5ed-d2a1c4b620d7::cf-application:8d9457e0-1303-4f32-b4b3-5525575f6205';
        const name = 'ExampleResourceBinding';
        const parameters = resourceBindingPostParametersModel;
        const role = 'Writer';
        const createResourceBindingParams = {
          source,
          target,
          name,
          parameters,
          role,
        };

        const createResourceBindingResult = resourceControllerService.createResourceBinding(createResourceBindingParams);

        // all methods should return a Promise
        expectToBePromise(createResourceBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_bindings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.parameters).toEqual(parameters);
        expect(mockRequestOptions.body.role).toEqual(role);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createResourceBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __createResourceBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __createResourceBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const source = 'faaec9d8-ec64-44d8-ab83-868632fac6a2';
        const target = 'crn:v1:staging:public:bluemix:us-south:s/e1773b6e-17b4-40c8-b5ed-d2a1c4b620d7::cf-application:8d9457e0-1303-4f32-b4b3-5525575f6205';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createResourceBindingParams = {
          source,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.createResourceBinding(createResourceBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.createResourceBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.createResourceBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getResourceBinding', () => {
    describe('positive tests', () => {
      function __getResourceBindingTest() {
        // Construct the params object for operation getResourceBinding
        const id = 'testString';
        const getResourceBindingParams = {
          id,
        };

        const getResourceBindingResult = resourceControllerService.getResourceBinding(getResourceBindingParams);

        // all methods should return a Promise
        expectToBePromise(getResourceBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_bindings/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __getResourceBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __getResourceBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceBindingParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.getResourceBinding(getResourceBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.getResourceBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.getResourceBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteResourceBinding', () => {
    describe('positive tests', () => {
      function __deleteResourceBindingTest() {
        // Construct the params object for operation deleteResourceBinding
        const id = 'testString';
        const deleteResourceBindingParams = {
          id,
        };

        const deleteResourceBindingResult = resourceControllerService.deleteResourceBinding(deleteResourceBindingParams);

        // all methods should return a Promise
        expectToBePromise(deleteResourceBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_bindings/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteResourceBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __deleteResourceBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __deleteResourceBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteResourceBindingParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.deleteResourceBinding(deleteResourceBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateResourceBinding', () => {
    describe('positive tests', () => {
      function __updateResourceBindingTest() {
        // Construct the params object for operation updateResourceBinding
        const id = 'testString';
        const name = 'UpdatedExampleResourceBinding';
        const updateResourceBindingParams = {
          id,
          name,
        };

        const updateResourceBindingResult = resourceControllerService.updateResourceBinding(updateResourceBindingParams);

        // all methods should return a Promise
        expectToBePromise(updateResourceBindingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_bindings/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateResourceBindingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __updateResourceBindingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __updateResourceBindingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const name = 'UpdatedExampleResourceBinding';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateResourceBindingParams = {
          id,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.updateResourceBinding(updateResourceBindingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceBinding({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceBinding();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listResourceAliases', () => {
    describe('positive tests', () => {
      function __listResourceAliasesTest() {
        // Construct the params object for operation listResourceAliases
        const guid = 'testString';
        const name = 'testString';
        const resourceInstanceId = 'testString';
        const regionInstanceId = 'testString';
        const resourceId = 'testString';
        const resourceGroupId = 'testString';
        const limit = 100;
        const start = 'testString';
        const updatedFrom = '2021-01-01';
        const updatedTo = '2021-01-01';
        const listResourceAliasesParams = {
          guid,
          name,
          resourceInstanceId,
          regionInstanceId,
          resourceId,
          resourceGroupId,
          limit,
          start,
          updatedFrom,
          updatedTo,
        };

        const listResourceAliasesResult = resourceControllerService.listResourceAliases(listResourceAliasesParams);

        // all methods should return a Promise
        expectToBePromise(listResourceAliasesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_aliases', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.guid).toEqual(guid);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.resource_instance_id).toEqual(resourceInstanceId);
        expect(mockRequestOptions.qs.region_instance_id).toEqual(regionInstanceId);
        expect(mockRequestOptions.qs.resource_id).toEqual(resourceId);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.updated_from).toEqual(updatedFrom);
        expect(mockRequestOptions.qs.updated_to).toEqual(updatedTo);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceAliasesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listResourceAliasesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listResourceAliasesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceAliasesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listResourceAliases(listResourceAliasesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceControllerService.listResourceAliases({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('ResourceAliasesPager tests', () => {
      const serviceUrl = resourceControllerServiceOptions.url;
      const path = '/v2/resource_aliases';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","name":"name","resource_instance_id":"resource_instance_id","target_crn":"target_crn","account_id":"account_id","resource_id":"resource_id","resource_group_id":"resource_group_id","crn":"crn","region_instance_id":"region_instance_id","region_instance_crn":"region_instance_crn","state":"state","migrated":true,"resource_instance_url":"resource_instance_url","resource_bindings_url":"resource_bindings_url","resource_keys_url":"resource_keys_url"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","name":"name","resource_instance_id":"resource_instance_id","target_crn":"target_crn","account_id":"account_id","resource_id":"resource_id","resource_group_id":"resource_group_id","crn":"crn","region_instance_id":"region_instance_id","region_instance_crn":"region_instance_crn","state":"state","migrated":true,"resource_instance_url":"resource_instance_url","resource_bindings_url":"resource_bindings_url","resource_keys_url":"resource_keys_url"}]}';

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
          guid: 'testString',
          name: 'testString',
          resourceInstanceId: 'testString',
          regionInstanceId: 'testString',
          resourceId: 'testString',
          resourceGroupId: 'testString',
          limit: 10,
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const allResults = [];
        const pager = new ResourceControllerV2.ResourceAliasesPager(resourceControllerService, params);
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
          guid: 'testString',
          name: 'testString',
          resourceInstanceId: 'testString',
          regionInstanceId: 'testString',
          resourceId: 'testString',
          resourceGroupId: 'testString',
          limit: 10,
          updatedFrom: '2021-01-01',
          updatedTo: '2021-01-01',
        };
        const pager = new ResourceControllerV2.ResourceAliasesPager(resourceControllerService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createResourceAlias', () => {
    describe('positive tests', () => {
      function __createResourceAliasTest() {
        // Construct the params object for operation createResourceAlias
        const name = 'ExampleResourceAlias';
        const source = '381fd51a-f251-4f95-aff4-2b03fa8caa63';
        const target = 'crn:v1:bluemix:public:bluemix:us-south:o/d35d4f0e-5076-4c89-9361-2522894b6548::cf-space:e1773b6e-17b4-40c8-b5ed-d2a1c4b620d7';
        const createResourceAliasParams = {
          name,
          source,
          target,
        };

        const createResourceAliasResult = resourceControllerService.createResourceAlias(createResourceAliasParams);

        // all methods should return a Promise
        expectToBePromise(createResourceAliasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_aliases', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.source).toEqual(source);
        expect(mockRequestOptions.body.target).toEqual(target);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createResourceAliasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __createResourceAliasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __createResourceAliasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'ExampleResourceAlias';
        const source = '381fd51a-f251-4f95-aff4-2b03fa8caa63';
        const target = 'crn:v1:bluemix:public:bluemix:us-south:o/d35d4f0e-5076-4c89-9361-2522894b6548::cf-space:e1773b6e-17b4-40c8-b5ed-d2a1c4b620d7';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createResourceAliasParams = {
          name,
          source,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.createResourceAlias(createResourceAliasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.createResourceAlias({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.createResourceAlias();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getResourceAlias', () => {
    describe('positive tests', () => {
      function __getResourceAliasTest() {
        // Construct the params object for operation getResourceAlias
        const id = 'testString';
        const getResourceAliasParams = {
          id,
        };

        const getResourceAliasResult = resourceControllerService.getResourceAlias(getResourceAliasParams);

        // all methods should return a Promise
        expectToBePromise(getResourceAliasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_aliases/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getResourceAliasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __getResourceAliasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __getResourceAliasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getResourceAliasParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.getResourceAlias(getResourceAliasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.getResourceAlias({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.getResourceAlias();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteResourceAlias', () => {
    describe('positive tests', () => {
      function __deleteResourceAliasTest() {
        // Construct the params object for operation deleteResourceAlias
        const id = 'testString';
        const recursive = false;
        const deleteResourceAliasParams = {
          id,
          recursive,
        };

        const deleteResourceAliasResult = resourceControllerService.deleteResourceAlias(deleteResourceAliasParams);

        // all methods should return a Promise
        expectToBePromise(deleteResourceAliasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_aliases/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.recursive).toEqual(recursive);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteResourceAliasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __deleteResourceAliasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __deleteResourceAliasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteResourceAliasParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.deleteResourceAlias(deleteResourceAliasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceAlias({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.deleteResourceAlias();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateResourceAlias', () => {
    describe('positive tests', () => {
      function __updateResourceAliasTest() {
        // Construct the params object for operation updateResourceAlias
        const id = 'testString';
        const name = 'UpdatedExampleResourceAlias';
        const updateResourceAliasParams = {
          id,
          name,
        };

        const updateResourceAliasResult = resourceControllerService.updateResourceAlias(updateResourceAliasParams);

        // all methods should return a Promise
        expectToBePromise(updateResourceAliasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_aliases/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateResourceAliasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __updateResourceAliasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __updateResourceAliasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const name = 'UpdatedExampleResourceAlias';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateResourceAliasParams = {
          id,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.updateResourceAlias(updateResourceAliasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceAlias({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.updateResourceAlias();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listResourceBindingsForAlias', () => {
    describe('positive tests', () => {
      function __listResourceBindingsForAliasTest() {
        // Construct the params object for operation listResourceBindingsForAlias
        const id = 'testString';
        const limit = 100;
        const start = 'testString';
        const listResourceBindingsForAliasParams = {
          id,
          limit,
          start,
        };

        const listResourceBindingsForAliasResult = resourceControllerService.listResourceBindingsForAlias(listResourceBindingsForAliasParams);

        // all methods should return a Promise
        expectToBePromise(listResourceBindingsForAliasResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/resource_aliases/{id}/resource_bindings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listResourceBindingsForAliasTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listResourceBindingsForAliasTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listResourceBindingsForAliasTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listResourceBindingsForAliasParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listResourceBindingsForAlias(listResourceBindingsForAliasParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.listResourceBindingsForAlias({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.listResourceBindingsForAlias();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ResourceBindingsForAliasPager tests', () => {
      const serviceUrl = resourceControllerServiceOptions.url;
      const path = '/v2/resource_aliases/testString/resource_bindings';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?start=1","resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","target_crn":"target_crn","crn":"crn","region_binding_id":"region_binding_id","region_binding_crn":"region_binding_crn","name":"name","account_id":"account_id","resource_group_id":"resource_group_id","state":"state","credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"resource_id":"resource_id","migrated":true,"resource_alias_url":"resource_alias_url"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","guid":"guid","url":"url","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z","deleted_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_by":"updated_by","deleted_by":"deleted_by","source_crn":"source_crn","target_crn":"target_crn","crn":"crn","region_binding_id":"region_binding_id","region_binding_crn":"region_binding_crn","name":"name","account_id":"account_id","resource_group_id":"resource_group_id","state":"state","credentials":{"REDACTED":"REDACTED","apikey":"apikey","iam_apikey_description":"iam_apikey_description","iam_apikey_name":"iam_apikey_name","iam_role_crn":"iam_role_crn","iam_serviceid_crn":"iam_serviceid_crn"},"iam_compatible":true,"resource_id":"resource_id","migrated":true,"resource_alias_url":"resource_alias_url"}]}';

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
          id: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new ResourceControllerV2.ResourceBindingsForAliasPager(resourceControllerService, params);
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
          id: 'testString',
          limit: 10,
        };
        const pager = new ResourceControllerV2.ResourceBindingsForAliasPager(resourceControllerService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listReclamations', () => {
    describe('positive tests', () => {
      function __listReclamationsTest() {
        // Construct the params object for operation listReclamations
        const accountId = 'testString';
        const resourceInstanceId = 'testString';
        const resourceGroupId = 'testString';
        const listReclamationsParams = {
          accountId,
          resourceInstanceId,
          resourceGroupId,
        };

        const listReclamationsResult = resourceControllerService.listReclamations(listReclamationsParams);

        // all methods should return a Promise
        expectToBePromise(listReclamationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/reclamations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.resource_instance_id).toEqual(resourceInstanceId);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listReclamationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __listReclamationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __listReclamationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listReclamationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.listReclamations(listReclamationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        resourceControllerService.listReclamations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('runReclamationAction', () => {
    describe('positive tests', () => {
      function __runReclamationActionTest() {
        // Construct the params object for operation runReclamationAction
        const id = 'testString';
        const actionName = 'testString';
        const requestBy = 'testString';
        const comment = 'testString';
        const runReclamationActionParams = {
          id,
          actionName,
          requestBy,
          comment,
        };

        const runReclamationActionResult = resourceControllerService.runReclamationAction(runReclamationActionParams);

        // all methods should return a Promise
        expectToBePromise(runReclamationActionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/reclamations/{id}/actions/{action_name}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.request_by).toEqual(requestBy);
        expect(mockRequestOptions.body.comment).toEqual(comment);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.action_name).toEqual(actionName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __runReclamationActionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.enableRetries();
        __runReclamationActionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        resourceControllerService.disableRetries();
        __runReclamationActionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const actionName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const runReclamationActionParams = {
          id,
          actionName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        resourceControllerService.runReclamationAction(runReclamationActionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await resourceControllerService.runReclamationAction({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await resourceControllerService.runReclamationAction();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
