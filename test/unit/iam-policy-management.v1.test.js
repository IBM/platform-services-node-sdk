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

// dont actually create a request
const createRequestMock = jest.spyOn(iamPolicyManagementService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('IamPolicyManagementV1', () => {
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
        const params = {
          accountId: accountId,
          acceptLanguage: acceptLanguage,
          iamId: iamId,
          accessGroupId: accessGroupId,
          type: type,
          serviceType: serviceType,
          tagName: tagName,
          tagValue: tagValue,
          sort: sort,
          format: format,
          state: state,
        };

        const listPoliciesResult = iamPolicyManagementService.listPolicies(params);

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
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listPolicies(params);
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
        const params = {
          type: type,
          subjects: subjects,
          roles: roles,
          resources: resources,
          description: description,
          acceptLanguage: acceptLanguage,
        };

        const createPolicyResult = iamPolicyManagementService.createPolicy(params);

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
        const params = {
          type,
          subjects,
          roles,
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createPolicy(params);
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
  describe('updatePolicy', () => {
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

      function __updatePolicyTest() {
        // Construct the params object for operation updatePolicy
        const policyId = 'testString';
        const ifMatch = 'testString';
        const type = 'testString';
        const subjects = [policySubjectModel];
        const roles = [policyRoleModel];
        const resources = [policyResourceModel];
        const description = 'testString';
        const params = {
          policyId: policyId,
          ifMatch: ifMatch,
          type: type,
          subjects: subjects,
          roles: roles,
          resources: resources,
          description: description,
        };

        const updatePolicyResult = iamPolicyManagementService.updatePolicy(params);

        // all methods should return a Promise
        expectToBePromise(updatePolicyResult);

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
        __updatePolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __updatePolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __updatePolicyTest();
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
        const params = {
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

        iamPolicyManagementService.updatePolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.updatePolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.updatePolicy();
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
        const params = {
          policyId: policyId,
        };

        const getPolicyResult = iamPolicyManagementService.getPolicy(params);

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
        const params = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getPolicy(params);
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
        const params = {
          policyId: policyId,
        };

        const deletePolicyResult = iamPolicyManagementService.deletePolicy(params);

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
        const params = {
          policyId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deletePolicy(params);
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
  describe('patchPolicy', () => {
    describe('positive tests', () => {
      function __patchPolicyTest() {
        // Construct the params object for operation patchPolicy
        const policyId = 'testString';
        const ifMatch = 'testString';
        const state = 'active';
        const params = {
          policyId: policyId,
          ifMatch: ifMatch,
          state: state,
        };

        const patchPolicyResult = iamPolicyManagementService.patchPolicy(params);

        // all methods should return a Promise
        expectToBePromise(patchPolicyResult);

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
        __patchPolicyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __patchPolicyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __patchPolicyTest();
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

        iamPolicyManagementService.patchPolicy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.patchPolicy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.patchPolicy();
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
        const params = {
          acceptLanguage: acceptLanguage,
          accountId: accountId,
          serviceName: serviceName,
          sourceServiceName: sourceServiceName,
          policyType: policyType,
        };

        const listRolesResult = iamPolicyManagementService.listRoles(params);

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
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listRoles(params);
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
        const params = {
          displayName: displayName,
          actions: actions,
          name: name,
          accountId: accountId,
          serviceName: serviceName,
          description: description,
          acceptLanguage: acceptLanguage,
        };

        const createRoleResult = iamPolicyManagementService.createRole(params);

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
        const params = {
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

        iamPolicyManagementService.createRole(params);
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
  describe('updateRole', () => {
    describe('positive tests', () => {
      function __updateRoleTest() {
        // Construct the params object for operation updateRole
        const roleId = 'testString';
        const ifMatch = 'testString';
        const displayName = 'testString';
        const description = 'testString';
        const actions = ['testString'];
        const params = {
          roleId: roleId,
          ifMatch: ifMatch,
          displayName: displayName,
          description: description,
          actions: actions,
        };

        const updateRoleResult = iamPolicyManagementService.updateRole(params);

        // all methods should return a Promise
        expectToBePromise(updateRoleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/roles/{role_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.display_name).toEqual(displayName);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.actions).toEqual(actions);
        expect(mockRequestOptions.path.role_id).toEqual(roleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateRoleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __updateRoleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __updateRoleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          roleId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.updateRole(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateRole({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateRole();
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
        const params = {
          roleId: roleId,
        };

        const getRoleResult = iamPolicyManagementService.getRole(params);

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
        const params = {
          roleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getRole(params);
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
        const params = {
          roleId: roleId,
        };

        const deleteRoleResult = iamPolicyManagementService.deleteRole(params);

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
        const params = {
          roleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteRole(params);
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
});
