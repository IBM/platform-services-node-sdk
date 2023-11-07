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
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
const ContextBasedRestrictionsV1 = require('../../dist/context-based-restrictions/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const contextBasedRestrictionsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://cbr.cloud.ibm.com',
};

const contextBasedRestrictionsService = new ContextBasedRestrictionsV1(contextBasedRestrictionsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(contextBasedRestrictionsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('ContextBasedRestrictionsV1', () => {
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
      const testInstance = ContextBasedRestrictionsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(ContextBasedRestrictionsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(ContextBasedRestrictionsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = ContextBasedRestrictionsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(ContextBasedRestrictionsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new ContextBasedRestrictionsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new ContextBasedRestrictionsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(ContextBasedRestrictionsV1.DEFAULT_SERVICE_URL);
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

      function __createZoneTest() {
        // Construct the params object for operation createZone
        const name = 'an example of zone';
        const accountId = '12ab34cd56ef78ab90cd12ef34ab56cd';
        const addresses = [addressModel];
        const description = 'this is an example of zone';
        const excluded = [addressModel];
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const createZoneParams = {
          name,
          accountId,
          addresses,
          description,
          excluded,
          xCorrelationId,
          transactionId,
        };

        const createZoneResult = contextBasedRestrictionsService.createZone(createZoneParams);

        // all methods should return a Promise
        expectToBePromise(createZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/zones', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.addresses).toEqual(addresses);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.excluded).toEqual(excluded);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __createZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __createZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createZoneParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.createZone(createZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        contextBasedRestrictionsService.createZone({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listZones', () => {
    describe('positive tests', () => {
      function __listZonesTest() {
        // Construct the params object for operation listZones
        const accountId = 'testString';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const name = 'testString';
        const sort = 'testString';
        const listZonesParams = {
          accountId,
          xCorrelationId,
          transactionId,
          name,
          sort,
        };

        const listZonesResult = contextBasedRestrictionsService.listZones(listZonesParams);

        // all methods should return a Promise
        expectToBePromise(listZonesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/zones', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listZonesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __listZonesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __listZonesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listZonesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.listZones(listZonesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.listZones({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.listZones();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getZone', () => {
    describe('positive tests', () => {
      function __getZoneTest() {
        // Construct the params object for operation getZone
        const zoneId = 'testString';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const getZoneParams = {
          zoneId,
          xCorrelationId,
          transactionId,
        };

        const getZoneResult = contextBasedRestrictionsService.getZone(getZoneParams);

        // all methods should return a Promise
        expectToBePromise(getZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/zones/{zone_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __getZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __getZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getZoneParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.getZone(getZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.getZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.getZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceZone', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AddressIPAddress
      const addressModel = {
        type: 'ipAddress',
        value: '169.23.56.234',
      };

      function __replaceZoneTest() {
        // Construct the params object for operation replaceZone
        const zoneId = 'testString';
        const ifMatch = 'testString';
        const name = 'an example of zone';
        const accountId = '12ab34cd56ef78ab90cd12ef34ab56cd';
        const addresses = [addressModel];
        const description = 'this is an example of zone';
        const excluded = [addressModel];
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const replaceZoneParams = {
          zoneId,
          ifMatch,
          name,
          accountId,
          addresses,
          description,
          excluded,
          xCorrelationId,
          transactionId,
        };

        const replaceZoneResult = contextBasedRestrictionsService.replaceZone(replaceZoneParams);

        // all methods should return a Promise
        expectToBePromise(replaceZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/zones/{zone_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.addresses).toEqual(addresses);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.excluded).toEqual(excluded);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __replaceZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __replaceZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceZoneParams = {
          zoneId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.replaceZone(replaceZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.replaceZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.replaceZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteZone', () => {
    describe('positive tests', () => {
      function __deleteZoneTest() {
        // Construct the params object for operation deleteZone
        const zoneId = 'testString';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const deleteZoneParams = {
          zoneId,
          xCorrelationId,
          transactionId,
        };

        const deleteZoneResult = contextBasedRestrictionsService.deleteZone(deleteZoneParams);

        // all methods should return a Promise
        expectToBePromise(deleteZoneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/zones/{zone_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.zone_id).toEqual(zoneId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteZoneTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __deleteZoneTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __deleteZoneTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const zoneId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteZoneParams = {
          zoneId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.deleteZone(deleteZoneParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.deleteZone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.deleteZone();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAvailableServicerefTargets', () => {
    describe('positive tests', () => {
      function __listAvailableServicerefTargetsTest() {
        // Construct the params object for operation listAvailableServicerefTargets
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const type = 'all';
        const listAvailableServicerefTargetsParams = {
          xCorrelationId,
          transactionId,
          type,
        };

        const listAvailableServicerefTargetsResult = contextBasedRestrictionsService.listAvailableServicerefTargets(listAvailableServicerefTargetsParams);

        // all methods should return a Promise
        expectToBePromise(listAvailableServicerefTargetsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/zones/serviceref_targets', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.type).toEqual(type);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAvailableServicerefTargetsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __listAvailableServicerefTargetsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __listAvailableServicerefTargetsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAvailableServicerefTargetsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.listAvailableServicerefTargets(listAvailableServicerefTargetsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        contextBasedRestrictionsService.listAvailableServicerefTargets({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuleContextAttribute
      const ruleContextAttributeModel = {
        name: 'networkZoneId',
        value: '65810ac762004f22ac19f8f8edf70a34',
      };

      // RuleContext
      const ruleContextModel = {
        attributes: [ruleContextAttributeModel],
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

      // NewRuleOperationsApiTypesItem
      const newRuleOperationsApiTypesItemModel = {
        api_type_id: 'testString',
      };

      // NewRuleOperations
      const newRuleOperationsModel = {
        api_types: [newRuleOperationsApiTypesItemModel],
      };

      function __createRuleTest() {
        // Construct the params object for operation createRule
        const contexts = [ruleContextModel];
        const resources = [resourceModel];
        const description = 'this is an example of rule';
        const operations = newRuleOperationsModel;
        const enforcementMode = 'enabled';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const createRuleParams = {
          contexts,
          resources,
          description,
          operations,
          enforcementMode,
          xCorrelationId,
          transactionId,
        };

        const createRuleResult = contextBasedRestrictionsService.createRule(createRuleParams);

        // all methods should return a Promise
        expectToBePromise(createRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.contexts).toEqual(contexts);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.operations).toEqual(operations);
        expect(mockRequestOptions.body.enforcement_mode).toEqual(enforcementMode);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __createRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __createRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRuleParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.createRule(createRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        contextBasedRestrictionsService.createRule({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listRules', () => {
    describe('positive tests', () => {
      function __listRulesTest() {
        // Construct the params object for operation listRules
        const accountId = 'testString';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const region = 'testString';
        const resource = 'testString';
        const resourceType = 'testString';
        const serviceInstance = 'testString';
        const serviceName = 'testString';
        const serviceType = 'testString';
        const serviceGroupId = 'testString';
        const zoneId = 'testString';
        const sort = 'testString';
        const enforcementMode = 'enabled';
        const listRulesParams = {
          accountId,
          xCorrelationId,
          transactionId,
          region,
          resource,
          resourceType,
          serviceInstance,
          serviceName,
          serviceType,
          serviceGroupId,
          zoneId,
          sort,
          enforcementMode,
        };

        const listRulesResult = contextBasedRestrictionsService.listRules(listRulesParams);

        // all methods should return a Promise
        expectToBePromise(listRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.qs.resource).toEqual(resource);
        expect(mockRequestOptions.qs.resource_type).toEqual(resourceType);
        expect(mockRequestOptions.qs.service_instance).toEqual(serviceInstance);
        expect(mockRequestOptions.qs.service_name).toEqual(serviceName);
        expect(mockRequestOptions.qs.service_type).toEqual(serviceType);
        expect(mockRequestOptions.qs.service_group_id).toEqual(serviceGroupId);
        expect(mockRequestOptions.qs.zone_id).toEqual(zoneId);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.enforcement_mode).toEqual(enforcementMode);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __listRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __listRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRulesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.listRules(listRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.listRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.listRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRule', () => {
    describe('positive tests', () => {
      function __getRuleTest() {
        // Construct the params object for operation getRule
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const getRuleParams = {
          ruleId,
          xCorrelationId,
          transactionId,
        };

        const getRuleResult = contextBasedRestrictionsService.getRule(getRuleParams);

        // all methods should return a Promise
        expectToBePromise(getRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/rules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __getRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __getRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRuleParams = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.getRule(getRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.getRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.getRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuleContextAttribute
      const ruleContextAttributeModel = {
        name: 'networkZoneId',
        value: '76921bd873115033bd2a0909fe081b45',
      };

      // RuleContext
      const ruleContextModel = {
        attributes: [ruleContextAttributeModel],
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

      // NewRuleOperationsApiTypesItem
      const newRuleOperationsApiTypesItemModel = {
        api_type_id: 'testString',
      };

      // NewRuleOperations
      const newRuleOperationsModel = {
        api_types: [newRuleOperationsApiTypesItemModel],
      };

      function __replaceRuleTest() {
        // Construct the params object for operation replaceRule
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const contexts = [ruleContextModel];
        const resources = [resourceModel];
        const description = 'this is an example of rule';
        const operations = newRuleOperationsModel;
        const enforcementMode = 'disabled';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const replaceRuleParams = {
          ruleId,
          ifMatch,
          contexts,
          resources,
          description,
          operations,
          enforcementMode,
          xCorrelationId,
          transactionId,
        };

        const replaceRuleResult = contextBasedRestrictionsService.replaceRule(replaceRuleParams);

        // all methods should return a Promise
        expectToBePromise(replaceRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/rules/{rule_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.contexts).toEqual(contexts);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.operations).toEqual(operations);
        expect(mockRequestOptions.body.enforcement_mode).toEqual(enforcementMode);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __replaceRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __replaceRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceRuleParams = {
          ruleId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.replaceRule(replaceRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.replaceRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.replaceRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteRule', () => {
    describe('positive tests', () => {
      function __deleteRuleTest() {
        // Construct the params object for operation deleteRule
        const ruleId = 'testString';
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const deleteRuleParams = {
          ruleId,
          xCorrelationId,
          transactionId,
        };

        const deleteRuleResult = contextBasedRestrictionsService.deleteRule(deleteRuleParams);

        // all methods should return a Promise
        expectToBePromise(deleteRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/rules/{rule_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __deleteRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __deleteRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteRuleParams = {
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.deleteRule(deleteRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.deleteRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.deleteRule();
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
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const getAccountSettingsParams = {
          accountId,
          xCorrelationId,
          transactionId,
        };

        const getAccountSettingsResult = contextBasedRestrictionsService.getAccountSettings(getAccountSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getAccountSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/account_settings/{account_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __getAccountSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
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

        contextBasedRestrictionsService.getAccountSettings(getAccountSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.getAccountSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await contextBasedRestrictionsService.getAccountSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAvailableServiceOperations', () => {
    describe('positive tests', () => {
      function __listAvailableServiceOperationsTest() {
        // Construct the params object for operation listAvailableServiceOperations
        const xCorrelationId = 'testString';
        const transactionId = 'testString';
        const serviceName = 'testString';
        const serviceGroupId = 'testString';
        const resourceType = 'testString';
        const listAvailableServiceOperationsParams = {
          xCorrelationId,
          transactionId,
          serviceName,
          serviceGroupId,
          resourceType,
        };

        const listAvailableServiceOperationsResult = contextBasedRestrictionsService.listAvailableServiceOperations(listAvailableServiceOperationsParams);

        // all methods should return a Promise
        expectToBePromise(listAvailableServiceOperationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/operations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Correlation-Id', xCorrelationId);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.service_name).toEqual(serviceName);
        expect(mockRequestOptions.qs.service_group_id).toEqual(serviceGroupId);
        expect(mockRequestOptions.qs.resource_type).toEqual(resourceType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAvailableServiceOperationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.enableRetries();
        __listAvailableServiceOperationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        contextBasedRestrictionsService.disableRetries();
        __listAvailableServiceOperationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAvailableServiceOperationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        contextBasedRestrictionsService.listAvailableServiceOperations(listAvailableServiceOperationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        contextBasedRestrictionsService.listAvailableServiceOperations({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
