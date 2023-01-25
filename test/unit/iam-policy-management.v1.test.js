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
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const IamPolicyManagementV1 = require('../../dist/iam-policy-management/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const iamPolicyManagementServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://iam.cloud.ibm.com',
};

const iamPolicyManagementService = new IamPolicyManagementV1(iamPolicyManagementServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(iamPolicyManagementService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('IamPolicyManagementV1', () => {

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
      const testInstance = IamPolicyManagementV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(IamPolicyManagementV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(IamPolicyManagementV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(IamPolicyManagementV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = IamPolicyManagementV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(IamPolicyManagementV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new IamPolicyManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new IamPolicyManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(IamPolicyManagementV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('listPolicies', () => {
    describe('positive tests', () => {
      function __listPoliciesTest() {
        // Construct the params object for operation listPolicies
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const iamId = 'testString';
        const accessGroupId = 'testString';
        const type = 'access';
        const serviceType = 'service';
        const tagName = 'testString';
        const tagValue = 'testString';
        const sort = 'id';
        const format = 'include_last_permit';
        const state = 'active';
        const listPoliciesParams = {
          accountId,
          acceptLanguage,
          iamId,
          accessGroupId,
          type,
          serviceType,
          tagName,
          tagValue,
          sort,
          format,
          state,
        };

        const listPoliciesResult = iamPolicyManagementService.listPolicies(listPoliciesParams);

        // all methods should return a Promise
        expectToBePromise(listPoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.iam_id).toEqual(iamId);
        expect(mockRequestOptions.qs.access_group_id).toEqual(accessGroupId);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.service_type).toEqual(serviceType);
        expect(mockRequestOptions.qs.tag_name).toEqual(tagName);
        expect(mockRequestOptions.qs.tag_value).toEqual(tagValue);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.format).toEqual(format);
        expect(mockRequestOptions.qs.state).toEqual(state);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listPoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listPoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPoliciesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listPolicies(listPoliciesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicies();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createPolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SubjectAttribute
      const subjectAttributeModel = {
        name: 'testString',
        value: 'testString',
      };

      // PolicySubject
      const policySubjectModel = {
        attributes: [subjectAttributeModel],
      };

      // PolicyRole
      const policyRoleModel = {
        role_id: 'testString',
      };

      // ResourceAttribute
      const resourceAttributeModel = {
        name: 'testString',
        value: 'testString',
        operator: 'testString',
      };

      // ResourceTag
      const resourceTagModel = {
        name: 'testString',
        value: 'testString',
        operator: 'testString',
      };

      // PolicyResource
      const policyResourceModel = {
        attributes: [resourceAttributeModel],
        tags: [resourceTagModel],
      };

      function __createPolicyTest() {
        // Construct the params object for operation createPolicy
        const type = 'testString';
        const subjects = [policySubjectModel];
        const roles = [policyRoleModel];
        const resources = [policyResourceModel];
        const description = 'testString';
        const acceptLanguage = 'default';
        const createPolicyParams = {
          type,
          subjects,
          roles,
          resources,
          description,
          acceptLanguage,
        };

        const createPolicyResult = iamPolicyManagementService.createPolicy(createPolicyParams);

        // all methods should return a Promise
        expectToBePromise(createPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.subjects).toEqual(subjects);
        expect(mockRequestOptions.body.roles).toEqual(roles);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.body.description).toEqual(description);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const type = 'testString';
        const subjects = [policySubjectModel];
        const roles = [policyRoleModel];
        const resources = [policyResourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPolicyParams = {
          type,
          subjects,
          roles,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createPolicy(createPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replacePolicy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SubjectAttribute
      const subjectAttributeModel = {
        name: 'testString',
        value: 'testString',
      };

      // PolicySubject
      const policySubjectModel = {
        attributes: [subjectAttributeModel],
      };

      // PolicyRole
      const policyRoleModel = {
        role_id: 'testString',
      };

      // ResourceAttribute
      const resourceAttributeModel = {
        name: 'testString',
        value: 'testString',
        operator: 'testString',
      };

      // ResourceTag
      const resourceTagModel = {
        name: 'testString',
        value: 'testString',
        operator: 'testString',
      };

      // PolicyResource
      const policyResourceModel = {
        attributes: [resourceAttributeModel],
        tags: [resourceTagModel],
      };

      function __replacePolicyTest() {
        // Construct the params object for operation replacePolicy
        const policyId = 'testString';
        const ifMatch = 'testString';
        const type = 'testString';
        const subjects = [policySubjectModel];
        const roles = [policyRoleModel];
        const resources = [policyResourceModel];
        const description = 'testString';
        const replacePolicyParams = {
          policyId,
          ifMatch,
          type,
          subjects,
          roles,
          resources,
          description,
        };

        const replacePolicyResult = iamPolicyManagementService.replacePolicy(replacePolicyParams);

        // all methods should return a Promise
        expectToBePromise(replacePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policies/{policy_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.subjects).toEqual(subjects);
        expect(mockRequestOptions.body.roles).toEqual(roles);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replacePolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __replacePolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __replacePolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const ifMatch = 'testString';
        const type = 'testString';
        const subjects = [policySubjectModel];
        const roles = [policyRoleModel];
        const resources = [policyResourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replacePolicyParams = {
          policyId,
          ifMatch,
          type,
          subjects,
          roles,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.replacePolicy(replacePolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.replacePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.replacePolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPolicy', () => {
    describe('positive tests', () => {
      function __getPolicyTest() {
        // Construct the params object for operation getPolicy
        const policyId = 'testString';
        const getPolicyParams = {
          policyId,
        };

        const getPolicyResult = iamPolicyManagementService.getPolicy(getPolicyParams);

        // all methods should return a Promise
        expectToBePromise(getPolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policies/{policy_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getPolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPolicyParams = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getPolicy(getPolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePolicy', () => {
    describe('positive tests', () => {
      function __deletePolicyTest() {
        // Construct the params object for operation deletePolicy
        const policyId = 'testString';
        const deletePolicyParams = {
          policyId,
        };

        const deletePolicyResult = iamPolicyManagementService.deletePolicy(deletePolicyParams);

        // all methods should return a Promise
        expectToBePromise(deletePolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policies/{policy_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deletePolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deletePolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePolicyParams = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deletePolicy(deletePolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updatePolicyState', () => {
    describe('positive tests', () => {
      function __updatePolicyStateTest() {
        // Construct the params object for operation updatePolicyState
        const policyId = 'testString';
        const ifMatch = 'testString';
        const state = 'active';
        const updatePolicyStateParams = {
          policyId,
          ifMatch,
          state,
        };

        const updatePolicyStateResult = iamPolicyManagementService.updatePolicyState(updatePolicyStateParams);

        // all methods should return a Promise
        expectToBePromise(updatePolicyStateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policies/{policy_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.path.policy_id).toEqual(policyId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePolicyStateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __updatePolicyStateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __updatePolicyStateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePolicyStateParams = {
          policyId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.updatePolicyState(updatePolicyStateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.updatePolicyState({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.updatePolicyState();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listRoles', () => {
    describe('positive tests', () => {
      function __listRolesTest() {
        // Construct the params object for operation listRoles
        const acceptLanguage = 'default';
        const accountId = 'testString';
        const serviceName = 'iam-groups';
        const sourceServiceName = 'iam-groups';
        const policyType = 'authorization';
        const listRolesParams = {
          acceptLanguage,
          accountId,
          serviceName,
          sourceServiceName,
          policyType,
        };

        const listRolesResult = iamPolicyManagementService.listRoles(listRolesParams);

        // all methods should return a Promise
        expectToBePromise(listRolesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/roles', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.service_name).toEqual(serviceName);
        expect(mockRequestOptions.qs.source_service_name).toEqual(sourceServiceName);
        expect(mockRequestOptions.qs.policy_type).toEqual(policyType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRolesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listRolesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listRolesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRolesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listRoles(listRolesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamPolicyManagementService.listRoles({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createRole', () => {
    describe('positive tests', () => {
      function __createRoleTest() {
        // Construct the params object for operation createRole
        const displayName = 'testString';
        const actions = ['testString'];
        const name = 'Developer';
        const accountId = 'testString';
        const serviceName = 'iam-groups';
        const description = 'testString';
        const acceptLanguage = 'default';
        const createRoleParams = {
          displayName,
          actions,
          name,
          accountId,
          serviceName,
          description,
          acceptLanguage,
        };

        const createRoleResult = iamPolicyManagementService.createRole(createRoleParams);

        // all methods should return a Promise
        expectToBePromise(createRoleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/roles', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.display_name).toEqual(displayName);
        expect(mockRequestOptions.body.actions).toEqual(actions);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.service_name).toEqual(serviceName);
        expect(mockRequestOptions.body.description).toEqual(description);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createRoleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createRoleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createRoleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const displayName = 'testString';
        const actions = ['testString'];
        const name = 'Developer';
        const accountId = 'testString';
        const serviceName = 'iam-groups';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRoleParams = {
          displayName,
          actions,
          name,
          accountId,
          serviceName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createRole(createRoleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRole({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRole();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceRole', () => {
    describe('positive tests', () => {
      function __replaceRoleTest() {
        // Construct the params object for operation replaceRole
        const roleId = 'testString';
        const ifMatch = 'testString';
        const displayName = 'testString';
        const actions = ['testString'];
        const description = 'testString';
        const replaceRoleParams = {
          roleId,
          ifMatch,
          displayName,
          actions,
          description,
        };

        const replaceRoleResult = iamPolicyManagementService.replaceRole(replaceRoleParams);

        // all methods should return a Promise
        expectToBePromise(replaceRoleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/roles/{role_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.display_name).toEqual(displayName);
        expect(mockRequestOptions.body.actions).toEqual(actions);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.role_id).toEqual(roleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceRoleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __replaceRoleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __replaceRoleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleId = 'testString';
        const ifMatch = 'testString';
        const displayName = 'testString';
        const actions = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceRoleParams = {
          roleId,
          ifMatch,
          displayName,
          actions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.replaceRole(replaceRoleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceRole({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceRole();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRole', () => {
    describe('positive tests', () => {
      function __getRoleTest() {
        // Construct the params object for operation getRole
        const roleId = 'testString';
        const getRoleParams = {
          roleId,
        };

        const getRoleResult = iamPolicyManagementService.getRole(getRoleParams);

        // all methods should return a Promise
        expectToBePromise(getRoleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/roles/{role_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.role_id).toEqual(roleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRoleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getRoleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getRoleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRoleParams = {
          roleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getRole(getRoleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRole({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRole();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteRole', () => {
    describe('positive tests', () => {
      function __deleteRoleTest() {
        // Construct the params object for operation deleteRole
        const roleId = 'testString';
        const deleteRoleParams = {
          roleId,
        };

        const deleteRoleResult = iamPolicyManagementService.deleteRole(deleteRoleParams);

        // all methods should return a Promise
        expectToBePromise(deleteRoleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/roles/{role_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.role_id).toEqual(roleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteRoleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteRoleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteRoleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteRoleParams = {
          roleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteRole(deleteRoleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRole({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRole();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listV2Policies', () => {
    describe('positive tests', () => {
      function __listV2PoliciesTest() {
        // Construct the params object for operation listV2Policies
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const iamId = 'testString';
        const accessGroupId = 'testString';
        const type = 'access';
        const serviceType = 'service';
        const serviceName = 'testString';
        const serviceGroupId = 'testString';
        const format = 'include_last_permit';
        const state = 'active';
        const listV2PoliciesParams = {
          accountId,
          acceptLanguage,
          iamId,
          accessGroupId,
          type,
          serviceType,
          serviceName,
          serviceGroupId,
          format,
          state,
        };

        const listV2PoliciesResult = iamPolicyManagementService.listV2Policies(listV2PoliciesParams);

        // all methods should return a Promise
        expectToBePromise(listV2PoliciesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/policies', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.iam_id).toEqual(iamId);
        expect(mockRequestOptions.qs.access_group_id).toEqual(accessGroupId);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.service_type).toEqual(serviceType);
        expect(mockRequestOptions.qs.service_name).toEqual(serviceName);
        expect(mockRequestOptions.qs.service_group_id).toEqual(serviceGroupId);
        expect(mockRequestOptions.qs.format).toEqual(format);
        expect(mockRequestOptions.qs.state).toEqual(state);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listV2PoliciesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listV2PoliciesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listV2PoliciesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listV2PoliciesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listV2Policies(listV2PoliciesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listV2Policies({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listV2Policies();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createV2Policy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PolicyRole
      const policyRoleModel = {
        role_id: 'testString',
      };

      // V2PolicyGrant
      const v2PolicyGrantModel = {
        roles: [policyRoleModel],
      };

      // Control
      const controlModel = {
        grant: v2PolicyGrantModel,
      };

      // V2PolicySubjectAttribute
      const v2PolicySubjectAttributeModel = {
        key: 'testString',
        operator: 'stringEquals',
        value: 'testString',
      };

      // V2PolicySubject
      const v2PolicySubjectModel = {
        attributes: [v2PolicySubjectAttributeModel],
      };

      // V2PolicyResourceAttribute
      const v2PolicyResourceAttributeModel = {
        key: 'testString',
        operator: 'stringEquals',
        value: 'testString',
      };

      // V2PolicyResourceTag
      const v2PolicyResourceTagModel = {
        key: 'testString',
        value: 'testString',
        operator: 'stringEquals',
      };

      // V2PolicyResource
      const v2PolicyResourceModel = {
        attributes: [v2PolicyResourceAttributeModel],
        tags: [v2PolicyResourceTagModel],
      };

      // V2PolicyRuleRuleAttribute
      const v2PolicyRuleModel = {
        key: 'testString',
        operator: 'timeLessThan',
        value: 'testString',
      };

      function __createV2PolicyTest() {
        // Construct the params object for operation createV2Policy
        const control = controlModel;
        const type = 'access';
        const description = 'testString';
        const subject = v2PolicySubjectModel;
        const resource = v2PolicyResourceModel;
        const pattern = 'testString';
        const rule = v2PolicyRuleModel;
        const acceptLanguage = 'default';
        const createV2PolicyParams = {
          control,
          type,
          description,
          subject,
          resource,
          pattern,
          rule,
          acceptLanguage,
        };

        const createV2PolicyResult = iamPolicyManagementService.createV2Policy(createV2PolicyParams);

        // all methods should return a Promise
        expectToBePromise(createV2PolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/policies', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.control).toEqual(control);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.subject).toEqual(subject);
        expect(mockRequestOptions.body.resource).toEqual(resource);
        expect(mockRequestOptions.body.pattern).toEqual(pattern);
        expect(mockRequestOptions.body.rule).toEqual(rule);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createV2PolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createV2PolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createV2PolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const control = controlModel;
        const type = 'access';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createV2PolicyParams = {
          control,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createV2Policy(createV2PolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createV2Policy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createV2Policy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceV2Policy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PolicyRole
      const policyRoleModel = {
        role_id: 'testString',
      };

      // V2PolicyGrant
      const v2PolicyGrantModel = {
        roles: [policyRoleModel],
      };

      // Control
      const controlModel = {
        grant: v2PolicyGrantModel,
      };

      // V2PolicySubjectAttribute
      const v2PolicySubjectAttributeModel = {
        key: 'testString',
        operator: 'stringEquals',
        value: 'testString',
      };

      // V2PolicySubject
      const v2PolicySubjectModel = {
        attributes: [v2PolicySubjectAttributeModel],
      };

      // V2PolicyResourceAttribute
      const v2PolicyResourceAttributeModel = {
        key: 'testString',
        operator: 'stringEquals',
        value: 'testString',
      };

      // V2PolicyResourceTag
      const v2PolicyResourceTagModel = {
        key: 'testString',
        value: 'testString',
        operator: 'stringEquals',
      };

      // V2PolicyResource
      const v2PolicyResourceModel = {
        attributes: [v2PolicyResourceAttributeModel],
        tags: [v2PolicyResourceTagModel],
      };

      // V2PolicyRuleRuleAttribute
      const v2PolicyRuleModel = {
        key: 'testString',
        operator: 'timeLessThan',
        value: 'testString',
      };

      function __replaceV2PolicyTest() {
        // Construct the params object for operation replaceV2Policy
        const id = 'testString';
        const ifMatch = 'testString';
        const control = controlModel;
        const type = 'access';
        const description = 'testString';
        const subject = v2PolicySubjectModel;
        const resource = v2PolicyResourceModel;
        const pattern = 'testString';
        const rule = v2PolicyRuleModel;
        const replaceV2PolicyParams = {
          id,
          ifMatch,
          control,
          type,
          description,
          subject,
          resource,
          pattern,
          rule,
        };

        const replaceV2PolicyResult = iamPolicyManagementService.replaceV2Policy(replaceV2PolicyParams);

        // all methods should return a Promise
        expectToBePromise(replaceV2PolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/policies/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.control).toEqual(control);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.subject).toEqual(subject);
        expect(mockRequestOptions.body.resource).toEqual(resource);
        expect(mockRequestOptions.body.pattern).toEqual(pattern);
        expect(mockRequestOptions.body.rule).toEqual(rule);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceV2PolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __replaceV2PolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __replaceV2PolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const ifMatch = 'testString';
        const control = controlModel;
        const type = 'access';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceV2PolicyParams = {
          id,
          ifMatch,
          control,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.replaceV2Policy(replaceV2PolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceV2Policy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceV2Policy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getV2Policy', () => {
    describe('positive tests', () => {
      function __getV2PolicyTest() {
        // Construct the params object for operation getV2Policy
        const id = 'testString';
        const getV2PolicyParams = {
          id,
        };

        const getV2PolicyResult = iamPolicyManagementService.getV2Policy(getV2PolicyParams);

        // all methods should return a Promise
        expectToBePromise(getV2PolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/policies/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getV2PolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getV2PolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getV2PolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getV2PolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getV2Policy(getV2PolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getV2Policy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getV2Policy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteV2Policy', () => {
    describe('positive tests', () => {
      function __deleteV2PolicyTest() {
        // Construct the params object for operation deleteV2Policy
        const id = 'testString';
        const deleteV2PolicyParams = {
          id,
        };

        const deleteV2PolicyResult = iamPolicyManagementService.deleteV2Policy(deleteV2PolicyParams);

        // all methods should return a Promise
        expectToBePromise(deleteV2PolicyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/policies/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteV2PolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteV2PolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteV2PolicyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteV2PolicyParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteV2Policy(deleteV2PolicyParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteV2Policy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteV2Policy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
