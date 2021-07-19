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
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const NetworkBasedAccessControlAdminApiV1 = require('../../dist/network-based-access-control-admin-api/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const networkBasedAccessControlAdminApiServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://network-based-access-control-admin-api.cloud.ibm.com',
};

const networkBasedAccessControlAdminApiService = new NetworkBasedAccessControlAdminApiV1(networkBasedAccessControlAdminApiServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(networkBasedAccessControlAdminApiService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('NetworkBasedAccessControlAdminApiV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = NetworkBasedAccessControlAdminApiV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(NetworkBasedAccessControlAdminApiV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = NetworkBasedAccessControlAdminApiV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(NetworkBasedAccessControlAdminApiV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new NetworkBasedAccessControlAdminApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new NetworkBasedAccessControlAdminApiV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('createZone', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AddressIPAddress
      const addressModel = {
        type: 'ipAddress',
        value: '169.23.56.234',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createZone
        const name = 'an example of zone';
        const accountId = '12ab34cd56ef78ab90cd12ef34ab56cd';
        const addresses = [addressModel];
        const description = 'this is an example of zone';
        const excluded = [addressModel];
        const transactionId = 'testString';
        const params = {
          name: name,
          accountId: accountId,
          addresses: addresses,
          description: description,
          excluded: excluded,
          transactionId: transactionId,
        };

        const createZoneResult = networkBasedAccessControlAdminApiService.createZone(params);

        // all methods should return a Promise
        expectToBePromise(createZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/zones', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['name']).toEqual(name);
        expect(options.body['account_id']).toEqual(accountId);
        expect(options.body['addresses']).toEqual(addresses);
        expect(options.body['description']).toEqual(description);
        expect(options.body['excluded']).toEqual(excluded);
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

        networkBasedAccessControlAdminApiService.createZone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        networkBasedAccessControlAdminApiService.createZone({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listZones', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listZones
        const accountId = 'testString';
        const transactionId = 'testString';
        const name = 'testString';
        const sort = 'testString';
        const params = {
          accountId: accountId,
          transactionId: transactionId,
          name: name,
          sort: sort,
        };

        const listZonesResult = networkBasedAccessControlAdminApiService.listZones(params);

        // all methods should return a Promise
        expectToBePromise(listZonesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/zones', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['name']).toEqual(name);
        expect(options.qs['sort']).toEqual(sort);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.listZones(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.listZones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listZonesPromise = networkBasedAccessControlAdminApiService.listZones();
        expectToBePromise(listZonesPromise);

        listZonesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getZone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getZone
        const zoneId = 'testString';
        const transactionId = 'testString';
        const params = {
          zoneId: zoneId,
          transactionId: transactionId,
        };

        const getZoneResult = networkBasedAccessControlAdminApiService.getZone(params);

        // all methods should return a Promise
        expectToBePromise(getZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/zones/{zone_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['zone_id']).toEqual(zoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.getZone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.getZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getZonePromise = networkBasedAccessControlAdminApiService.getZone();
        expectToBePromise(getZonePromise);

        getZonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateZone', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AddressIPAddress
      const addressModel = {
        type: 'ipAddress',
        value: '169.23.56.234',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateZone
        const zoneId = 'testString';
        const ifMatch = 'testString';
        const name = 'an example of zone';
        const accountId = '12ab34cd56ef78ab90cd12ef34ab56cd';
        const addresses = [addressModel];
        const description = 'this is an example of zone';
        const excluded = [addressModel];
        const transactionId = 'testString';
        const params = {
          zoneId: zoneId,
          ifMatch: ifMatch,
          name: name,
          accountId: accountId,
          addresses: addresses,
          description: description,
          excluded: excluded,
          transactionId: transactionId,
        };

        const updateZoneResult = networkBasedAccessControlAdminApiService.updateZone(params);

        // all methods should return a Promise
        expectToBePromise(updateZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/zones/{zone_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['name']).toEqual(name);
        expect(options.body['account_id']).toEqual(accountId);
        expect(options.body['addresses']).toEqual(addresses);
        expect(options.body['description']).toEqual(description);
        expect(options.body['excluded']).toEqual(excluded);
        expect(options.path['zone_id']).toEqual(zoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          zoneId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.updateZone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.updateZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateZonePromise = networkBasedAccessControlAdminApiService.updateZone();
        expectToBePromise(updateZonePromise);

        updateZonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteZone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteZone
        const zoneId = 'testString';
        const transactionId = 'testString';
        const params = {
          zoneId: zoneId,
          transactionId: transactionId,
        };

        const deleteZoneResult = networkBasedAccessControlAdminApiService.deleteZone(params);

        // all methods should return a Promise
        expectToBePromise(deleteZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/zones/{zone_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['zone_id']).toEqual(zoneId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.deleteZone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.deleteZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteZonePromise = networkBasedAccessControlAdminApiService.deleteZone();
        expectToBePromise(deleteZonePromise);

        deleteZonePromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EnvironmentAttribute
      const environmentAttributeModel = {
        name: 'networkZoneId',
        value: '65810ac7-6200-4f22-ac19-f8f8edf70a34',
      };

      // Environment
      const environmentModel = {
        attributes: [environmentAttributeModel],
      };

      // ResourceAttribute
      const resourceAttributeModel = {
        name: 'accountId',
        value: '12ab34cd56ef78ab90cd12ef34ab56cd',
        operator: 'testString',
      };

      // ResourceTagAttribute
      const resourceTagAttributeModel = {
        name: 'testString',
        value: 'testString',
        operator: 'testString',
      };

      // Resource
      const resourceModel = {
        attributes: [resourceAttributeModel],
        tags: [resourceTagAttributeModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createPolicy
        const environments = [environmentModel];
        const resources = [resourceModel];
        const description = 'this is an example of policy';
        const transactionId = 'testString';
        const params = {
          environments: environments,
          resources: resources,
          description: description,
          transactionId: transactionId,
        };

        const createPolicyResult = networkBasedAccessControlAdminApiService.createPolicy(params);

        // all methods should return a Promise
        expectToBePromise(createPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['environments']).toEqual(environments);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['description']).toEqual(description);
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

        networkBasedAccessControlAdminApiService.createPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        networkBasedAccessControlAdminApiService.createPolicy({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listPolicies', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listPolicies
        const accountId = 'testString';
        const transactionId = 'testString';
        const region = 'testString';
        const resource = 'testString';
        const resourceType = 'testString';
        const serviceInstance = 'testString';
        const serviceName = 'testString';
        const serviceType = 'testString';
        const zoneId = 'testString';
        const sort = 'testString';
        const params = {
          accountId: accountId,
          transactionId: transactionId,
          region: region,
          resource: resource,
          resourceType: resourceType,
          serviceInstance: serviceInstance,
          serviceName: serviceName,
          serviceType: serviceType,
          zoneId: zoneId,
          sort: sort,
        };

        const listPoliciesResult = networkBasedAccessControlAdminApiService.listPolicies(params);

        // all methods should return a Promise
        expectToBePromise(listPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['region']).toEqual(region);
        expect(options.qs['resource']).toEqual(resource);
        expect(options.qs['resource_type']).toEqual(resourceType);
        expect(options.qs['service_instance']).toEqual(serviceInstance);
        expect(options.qs['service_name']).toEqual(serviceName);
        expect(options.qs['service_type']).toEqual(serviceType);
        expect(options.qs['zone_id']).toEqual(zoneId);
        expect(options.qs['sort']).toEqual(sort);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.listPolicies(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.listPolicies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const listPoliciesPromise = networkBasedAccessControlAdminApiService.listPolicies();
        expectToBePromise(listPoliciesPromise);

        listPoliciesPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getPolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getPolicy
        const policyId = 'testString';
        const transactionId = 'testString';
        const params = {
          policyId: policyId,
          transactionId: transactionId,
        };

        const getPolicyResult = networkBasedAccessControlAdminApiService.getPolicy(params);

        // all methods should return a Promise
        expectToBePromise(getPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/policies/{policy_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['policy_id']).toEqual(policyId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.getPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.getPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getPolicyPromise = networkBasedAccessControlAdminApiService.getPolicy();
        expectToBePromise(getPolicyPromise);

        getPolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updatePolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EnvironmentAttribute
      const environmentAttributeModel = {
        name: 'networkZoneId',
        value: '65810ac7-6200-4f22-ac19-f8f8edf70a34',
      };

      // Environment
      const environmentModel = {
        attributes: [environmentAttributeModel],
      };

      // ResourceAttribute
      const resourceAttributeModel = {
        name: 'accountId',
        value: '12ab34cd56ef78ab90cd12ef34ab56cd',
        operator: 'testString',
      };

      // ResourceTagAttribute
      const resourceTagAttributeModel = {
        name: 'testString',
        value: 'testString',
        operator: 'testString',
      };

      // Resource
      const resourceModel = {
        attributes: [resourceAttributeModel],
        tags: [resourceTagAttributeModel],
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updatePolicy
        const policyId = 'testString';
        const ifMatch = 'testString';
        const environments = [environmentModel];
        const resources = [resourceModel];
        const description = 'this is an example of policy';
        const transactionId = 'testString';
        const params = {
          policyId: policyId,
          ifMatch: ifMatch,
          environments: environments,
          resources: resources,
          description: description,
          transactionId: transactionId,
        };

        const updatePolicyResult = networkBasedAccessControlAdminApiService.updatePolicy(params);

        // all methods should return a Promise
        expectToBePromise(updatePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/policies/{policy_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.body['environments']).toEqual(environments);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['description']).toEqual(description);
        expect(options.path['policy_id']).toEqual(policyId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          policyId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.updatePolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.updatePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updatePolicyPromise = networkBasedAccessControlAdminApiService.updatePolicy();
        expectToBePromise(updatePolicyPromise);

        updatePolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deletePolicy', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deletePolicy
        const policyId = 'testString';
        const transactionId = 'testString';
        const params = {
          policyId: policyId,
          transactionId: transactionId,
        };

        const deletePolicyResult = networkBasedAccessControlAdminApiService.deletePolicy(params);

        // all methods should return a Promise
        expectToBePromise(deletePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/policies/{policy_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['policy_id']).toEqual(policyId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.deletePolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.deletePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deletePolicyPromise = networkBasedAccessControlAdminApiService.deletePolicy();
        expectToBePromise(deletePolicyPromise);

        deletePolicyPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getAccountSettings', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAccountSettings
        const accountId = 'testString';
        const transactionId = 'testString';
        const params = {
          accountId: accountId,
          transactionId: transactionId,
        };

        const getAccountSettingsResult = networkBasedAccessControlAdminApiService.getAccountSettings(params);

        // all methods should return a Promise
        expectToBePromise(getAccountSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v1/account_settings/{account_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(options.path['account_id']).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        networkBasedAccessControlAdminApiService.getAccountSettings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await networkBasedAccessControlAdminApiService.getAccountSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getAccountSettingsPromise = networkBasedAccessControlAdminApiService.getAccountSettings();
        expectToBePromise(getAccountSettingsPromise);

        getAccountSettingsPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
