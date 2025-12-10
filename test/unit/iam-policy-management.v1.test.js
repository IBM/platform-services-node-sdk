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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const IamPolicyManagementV1 = require('../../dist/iam-policy-management/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

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
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
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
        const limit = 50;
        const start = 'testString';
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
          limit,
          start,
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
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
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

    describe('PoliciesPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/policies';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"policies":[{"id":"id","type":"type","description":"description","subjects":[{"attributes":[{"name":"name","value":"value"}]}],"roles":[{"role_id":"role_id","display_name":"display_name","description":"description"}],"resources":[{"attributes":[{"name":"name","value":"value","operator":"operator"}],"tags":[{"name":"name","value":"value","operator":"operator"}]}],"href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","state":"active","template":{"id":"id","version":"version","assignment_id":"assignment_id","root_id":"root_id","root_version":"root_version"}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"policies":[{"id":"id","type":"type","description":"description","subjects":[{"attributes":[{"name":"name","value":"value"}]}],"roles":[{"role_id":"role_id","display_name":"display_name","description":"description"}],"resources":[{"attributes":[{"name":"name","value":"value","operator":"operator"}],"tags":[{"name":"name","value":"value","operator":"operator"}]}],"href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","state":"active","template":{"id":"id","version":"version","assignment_id":"assignment_id","root_id":"root_id","root_version":"root_version"}}]}';

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
          accountId: 'testString',
          acceptLanguage: 'default',
          iamId: 'testString',
          accessGroupId: 'testString',
          type: 'access',
          serviceType: 'service',
          tagName: 'testString',
          tagValue: 'testString',
          sort: 'id',
          format: 'include_last_permit',
          state: 'active',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.PoliciesPager(iamPolicyManagementService, params);
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
          accountId: 'testString',
          acceptLanguage: 'default',
          iamId: 'testString',
          accessGroupId: 'testString',
          type: 'access',
          serviceType: 'service',
          tagName: 'testString',
          tagValue: 'testString',
          sort: 'id',
          format: 'include_last_permit',
          state: 'active',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.PoliciesPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
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
        const serviceGroupId = 'IAM';
        const listRolesParams = {
          acceptLanguage,
          accountId,
          serviceName,
          sourceServiceName,
          policyType,
          serviceGroupId,
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
        expect(mockRequestOptions.qs.service_group_id).toEqual(serviceGroupId);
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
        const sort = 'testString';
        const format = 'include_last_permit';
        const state = 'active';
        const limit = 50;
        const start = 'testString';
        const listV2PoliciesParams = {
          accountId,
          acceptLanguage,
          iamId,
          accessGroupId,
          type,
          serviceType,
          serviceName,
          serviceGroupId,
          sort,
          format,
          state,
          limit,
          start,
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
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.format).toEqual(format);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
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

    describe('V2PoliciesPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v2/policies';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"policies":[{"type":"access","description":"description","subject":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}]},"resource":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}],"tags":[{"key":"key","value":"value","operator":"stringEquals"}]},"pattern":"pattern","rule":{"key":"key","operator":"stringEquals","value":"anyValue"},"id":"id","href":"href","control":{"grant":{"roles":[{"role_id":"role_id"}]}},"created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","state":"active","last_permit_at":"last_permit_at","last_permit_frequency":21,"template":{"id":"id","version":"version","assignment_id":"assignment_id","root_id":"root_id","root_version":"root_version"}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"policies":[{"type":"access","description":"description","subject":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}]},"resource":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}],"tags":[{"key":"key","value":"value","operator":"stringEquals"}]},"pattern":"pattern","rule":{"key":"key","operator":"stringEquals","value":"anyValue"},"id":"id","href":"href","control":{"grant":{"roles":[{"role_id":"role_id"}]}},"created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","state":"active","last_permit_at":"last_permit_at","last_permit_frequency":21,"template":{"id":"id","version":"version","assignment_id":"assignment_id","root_id":"root_id","root_version":"root_version"}}]}';

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
          accountId: 'testString',
          acceptLanguage: 'default',
          iamId: 'testString',
          accessGroupId: 'testString',
          type: 'access',
          serviceType: 'service',
          serviceName: 'testString',
          serviceGroupId: 'testString',
          sort: 'testString',
          format: 'include_last_permit',
          state: 'active',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.V2PoliciesPager(iamPolicyManagementService, params);
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
          accountId: 'testString',
          acceptLanguage: 'default',
          iamId: 'testString',
          accessGroupId: 'testString',
          type: 'access',
          serviceType: 'service',
          serviceName: 'testString',
          serviceGroupId: 'testString',
          sort: 'testString',
          format: 'include_last_permit',
          state: 'active',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.V2PoliciesPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createV2Policy', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Roles
      const rolesModel = {
        role_id: 'testString',
      };

      // Grant
      const grantModel = {
        roles: [rolesModel],
      };

      // Control
      const controlModel = {
        grant: grantModel,
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
        operator: 'stringEquals',
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

      // Roles
      const rolesModel = {
        role_id: 'testString',
      };

      // Grant
      const grantModel = {
        roles: [rolesModel],
      };

      // Control
      const controlModel = {
        grant: grantModel,
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
        operator: 'stringEquals',
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
        const format = 'include_last_permit';
        const getV2PolicyParams = {
          id,
          format,
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
        expect(mockRequestOptions.qs.format).toEqual(format);
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

  describe('listPolicyTemplates', () => {
    describe('positive tests', () => {
      function __listPolicyTemplatesTest() {
        // Construct the params object for operation listPolicyTemplates
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const state = 'active';
        const name = 'testString';
        const policyServiceType = 'service';
        const policyServiceName = 'testString';
        const policyServiceGroupId = 'testString';
        const policyType = 'access';
        const limit = 50;
        const start = 'testString';
        const listPolicyTemplatesParams = {
          accountId,
          acceptLanguage,
          state,
          name,
          policyServiceType,
          policyServiceName,
          policyServiceGroupId,
          policyType,
          limit,
          start,
        };

        const listPolicyTemplatesResult = iamPolicyManagementService.listPolicyTemplates(listPolicyTemplatesParams);

        // all methods should return a Promise
        expectToBePromise(listPolicyTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.policy_service_type).toEqual(policyServiceType);
        expect(mockRequestOptions.qs.policy_service_name).toEqual(policyServiceName);
        expect(mockRequestOptions.qs.policy_service_group_id).toEqual(policyServiceGroupId);
        expect(mockRequestOptions.qs.policy_type).toEqual(policyType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPolicyTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listPolicyTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listPolicyTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPolicyTemplatesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listPolicyTemplates(listPolicyTemplatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicyTemplates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicyTemplates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('PolicyTemplatesPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/policy_templates';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"policy_templates":[{"name":"name","description":"description","account_id":"account_id","version":"version","committed":false,"policy":{"type":"access","description":"description","resource":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}],"tags":[{"key":"key","value":"value","operator":"stringEquals"}]},"subject":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}]},"pattern":"pattern","rule":{"key":"key","operator":"stringEquals","value":"anyValue"},"control":{"grant":{"roles":[{"role_id":"role_id"}]}}},"state":"active","id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"policy_templates":[{"name":"name","description":"description","account_id":"account_id","version":"version","committed":false,"policy":{"type":"access","description":"description","resource":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}],"tags":[{"key":"key","value":"value","operator":"stringEquals"}]},"subject":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}]},"pattern":"pattern","rule":{"key":"key","operator":"stringEquals","value":"anyValue"},"control":{"grant":{"roles":[{"role_id":"role_id"}]}}},"state":"active","id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id"}],"total_count":2,"limit":1}';

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
          accountId: 'testString',
          acceptLanguage: 'default',
          state: 'active',
          name: 'testString',
          policyServiceType: 'service',
          policyServiceName: 'testString',
          policyServiceGroupId: 'testString',
          policyType: 'access',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.PolicyTemplatesPager(iamPolicyManagementService, params);
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
          accountId: 'testString',
          acceptLanguage: 'default',
          state: 'active',
          name: 'testString',
          policyServiceType: 'service',
          policyServiceName: 'testString',
          policyServiceGroupId: 'testString',
          policyType: 'access',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.PolicyTemplatesPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createPolicyTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

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

      // V2PolicyRuleRuleAttribute
      const v2PolicyRuleModel = {
        key: 'testString',
        operator: 'stringEquals',
        value: 'testString',
      };

      // Roles
      const rolesModel = {
        role_id: 'testString',
      };

      // TemplateGrantRoles
      const templateGrantModel = {
        roles: [rolesModel],
      };

      // TemplateControl
      const templateControlModel = {
        grant: templateGrantModel,
      };

      // TemplatePolicy
      const templatePolicyModel = {
        type: 'access',
        description: 'testString',
        resource: v2PolicyResourceModel,
        subject: v2PolicySubjectModel,
        pattern: 'testString',
        rule: v2PolicyRuleModel,
        control: templateControlModel,
      };

      function __createPolicyTemplateTest() {
        // Construct the params object for operation createPolicyTemplate
        const name = 'testString';
        const accountId = 'testString';
        const policy = templatePolicyModel;
        const description = 'testString';
        const committed = true;
        const acceptLanguage = 'default';
        const createPolicyTemplateParams = {
          name,
          accountId,
          policy,
          description,
          committed,
          acceptLanguage,
        };

        const createPolicyTemplateResult = iamPolicyManagementService.createPolicyTemplate(createPolicyTemplateParams);

        // all methods should return a Promise
        expectToBePromise(createPolicyTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.policy).toEqual(policy);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.committed).toEqual(committed);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPolicyTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createPolicyTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createPolicyTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const accountId = 'testString';
        const policy = templatePolicyModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPolicyTemplateParams = {
          name,
          accountId,
          policy,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createPolicyTemplate(createPolicyTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicyTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicyTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPolicyTemplate', () => {
    describe('positive tests', () => {
      function __getPolicyTemplateTest() {
        // Construct the params object for operation getPolicyTemplate
        const policyTemplateId = 'testString';
        const state = 'active';
        const getPolicyTemplateParams = {
          policyTemplateId,
          state,
        };

        const getPolicyTemplateResult = iamPolicyManagementService.getPolicyTemplate(getPolicyTemplateParams);

        // all methods should return a Promise
        expectToBePromise(getPolicyTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPolicyTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getPolicyTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getPolicyTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPolicyTemplateParams = {
          policyTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getPolicyTemplate(getPolicyTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicyTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicyTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePolicyTemplate', () => {
    describe('positive tests', () => {
      function __deletePolicyTemplateTest() {
        // Construct the params object for operation deletePolicyTemplate
        const policyTemplateId = 'testString';
        const deletePolicyTemplateParams = {
          policyTemplateId,
        };

        const deletePolicyTemplateResult = iamPolicyManagementService.deletePolicyTemplate(deletePolicyTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deletePolicyTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePolicyTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deletePolicyTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deletePolicyTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePolicyTemplateParams = {
          policyTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deletePolicyTemplate(deletePolicyTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicyTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicyTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createPolicyTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

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

      // V2PolicyRuleRuleAttribute
      const v2PolicyRuleModel = {
        key: 'testString',
        operator: 'stringEquals',
        value: 'testString',
      };

      // Roles
      const rolesModel = {
        role_id: 'testString',
      };

      // TemplateGrantRoles
      const templateGrantModel = {
        roles: [rolesModel],
      };

      // TemplateControl
      const templateControlModel = {
        grant: templateGrantModel,
      };

      // TemplatePolicy
      const templatePolicyModel = {
        type: 'access',
        description: 'testString',
        resource: v2PolicyResourceModel,
        subject: v2PolicySubjectModel,
        pattern: 'testString',
        rule: v2PolicyRuleModel,
        control: templateControlModel,
      };

      function __createPolicyTemplateVersionTest() {
        // Construct the params object for operation createPolicyTemplateVersion
        const policyTemplateId = 'testString';
        const policy = templatePolicyModel;
        const name = 'testString';
        const description = 'testString';
        const committed = true;
        const createPolicyTemplateVersionParams = {
          policyTemplateId,
          policy,
          name,
          description,
          committed,
        };

        const createPolicyTemplateVersionResult = iamPolicyManagementService.createPolicyTemplateVersion(createPolicyTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(createPolicyTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}/versions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.policy).toEqual(policy);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPolicyTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createPolicyTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createPolicyTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const policy = templatePolicyModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPolicyTemplateVersionParams = {
          policyTemplateId,
          policy,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createPolicyTemplateVersion(createPolicyTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicyTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicyTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPolicyTemplateVersions', () => {
    describe('positive tests', () => {
      function __listPolicyTemplateVersionsTest() {
        // Construct the params object for operation listPolicyTemplateVersions
        const policyTemplateId = 'testString';
        const state = 'active';
        const limit = 50;
        const start = 'testString';
        const listPolicyTemplateVersionsParams = {
          policyTemplateId,
          state,
          limit,
          start,
        };

        const listPolicyTemplateVersionsResult = iamPolicyManagementService.listPolicyTemplateVersions(listPolicyTemplateVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listPolicyTemplateVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPolicyTemplateVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listPolicyTemplateVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listPolicyTemplateVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPolicyTemplateVersionsParams = {
          policyTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listPolicyTemplateVersions(listPolicyTemplateVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicyTemplateVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicyTemplateVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('PolicyTemplateVersionsPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/policy_templates/testString/versions';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"versions":[{"name":"name","description":"description","account_id":"account_id","version":"version","committed":false,"policy":{"type":"access","description":"description","resource":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}],"tags":[{"key":"key","value":"value","operator":"stringEquals"}]},"subject":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}]},"pattern":"pattern","rule":{"key":"key","operator":"stringEquals","value":"anyValue"},"control":{"grant":{"roles":[{"role_id":"role_id"}]}}},"state":"active","id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"versions":[{"name":"name","description":"description","account_id":"account_id","version":"version","committed":false,"policy":{"type":"access","description":"description","resource":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}],"tags":[{"key":"key","value":"value","operator":"stringEquals"}]},"subject":{"attributes":[{"key":"key","operator":"stringEquals","value":"anyValue"}]},"pattern":"pattern","rule":{"key":"key","operator":"stringEquals","value":"anyValue"},"control":{"grant":{"roles":[{"role_id":"role_id"}]}}},"state":"active","id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id"}],"total_count":2,"limit":1}';

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
          policyTemplateId: 'testString',
          state: 'active',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.PolicyTemplateVersionsPager(iamPolicyManagementService, params);
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
          policyTemplateId: 'testString',
          state: 'active',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.PolicyTemplateVersionsPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('replacePolicyTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

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

      // V2PolicyRuleRuleAttribute
      const v2PolicyRuleModel = {
        key: 'testString',
        operator: 'stringEquals',
        value: 'testString',
      };

      // Roles
      const rolesModel = {
        role_id: 'testString',
      };

      // TemplateGrantRoles
      const templateGrantModel = {
        roles: [rolesModel],
      };

      // TemplateControl
      const templateControlModel = {
        grant: templateGrantModel,
      };

      // TemplatePolicy
      const templatePolicyModel = {
        type: 'access',
        description: 'testString',
        resource: v2PolicyResourceModel,
        subject: v2PolicySubjectModel,
        pattern: 'testString',
        rule: v2PolicyRuleModel,
        control: templateControlModel,
      };

      function __replacePolicyTemplateTest() {
        // Construct the params object for operation replacePolicyTemplate
        const policyTemplateId = 'testString';
        const version = 'testString';
        const ifMatch = 'testString';
        const policy = templatePolicyModel;
        const name = 'testString';
        const description = 'testString';
        const committed = true;
        const replacePolicyTemplateParams = {
          policyTemplateId,
          version,
          ifMatch,
          policy,
          name,
          description,
          committed,
        };

        const replacePolicyTemplateResult = iamPolicyManagementService.replacePolicyTemplate(replacePolicyTemplateParams);

        // all methods should return a Promise
        expectToBePromise(replacePolicyTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}/versions/{version}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.policy).toEqual(policy);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replacePolicyTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __replacePolicyTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __replacePolicyTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const version = 'testString';
        const ifMatch = 'testString';
        const policy = templatePolicyModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replacePolicyTemplateParams = {
          policyTemplateId,
          version,
          ifMatch,
          policy,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.replacePolicyTemplate(replacePolicyTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.replacePolicyTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.replacePolicyTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePolicyTemplateVersion', () => {
    describe('positive tests', () => {
      function __deletePolicyTemplateVersionTest() {
        // Construct the params object for operation deletePolicyTemplateVersion
        const policyTemplateId = 'testString';
        const version = 'testString';
        const deletePolicyTemplateVersionParams = {
          policyTemplateId,
          version,
        };

        const deletePolicyTemplateVersionResult = iamPolicyManagementService.deletePolicyTemplateVersion(deletePolicyTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(deletePolicyTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}/versions/{version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePolicyTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deletePolicyTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deletePolicyTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePolicyTemplateVersionParams = {
          policyTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deletePolicyTemplateVersion(deletePolicyTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicyTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicyTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPolicyTemplateVersion', () => {
    describe('positive tests', () => {
      function __getPolicyTemplateVersionTest() {
        // Construct the params object for operation getPolicyTemplateVersion
        const policyTemplateId = 'testString';
        const version = 'testString';
        const getPolicyTemplateVersionParams = {
          policyTemplateId,
          version,
        };

        const getPolicyTemplateVersionResult = iamPolicyManagementService.getPolicyTemplateVersion(getPolicyTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getPolicyTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}/versions/{version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPolicyTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getPolicyTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getPolicyTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPolicyTemplateVersionParams = {
          policyTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getPolicyTemplateVersion(getPolicyTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicyTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicyTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('commitPolicyTemplate', () => {
    describe('positive tests', () => {
      function __commitPolicyTemplateTest() {
        // Construct the params object for operation commitPolicyTemplate
        const policyTemplateId = 'testString';
        const version = 'testString';
        const commitPolicyTemplateParams = {
          policyTemplateId,
          version,
        };

        const commitPolicyTemplateResult = iamPolicyManagementService.commitPolicyTemplate(commitPolicyTemplateParams);

        // all methods should return a Promise
        expectToBePromise(commitPolicyTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_templates/{policy_template_id}/versions/{version}/commit', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.policy_template_id).toEqual(policyTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __commitPolicyTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __commitPolicyTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __commitPolicyTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const policyTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const commitPolicyTemplateParams = {
          policyTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.commitPolicyTemplate(commitPolicyTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.commitPolicyTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.commitPolicyTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listPolicyAssignments', () => {
    describe('positive tests', () => {
      function __listPolicyAssignmentsTest() {
        // Construct the params object for operation listPolicyAssignments
        const version = '1.0';
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const templateId = 'testString';
        const templateVersion = 'testString';
        const limit = 50;
        const start = 'testString';
        const listPolicyAssignmentsParams = {
          version,
          accountId,
          acceptLanguage,
          templateId,
          templateVersion,
          limit,
          start,
        };

        const listPolicyAssignmentsResult = iamPolicyManagementService.listPolicyAssignments(listPolicyAssignmentsParams);

        // all methods should return a Promise
        expectToBePromise(listPolicyAssignmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_assignments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.template_id).toEqual(templateId);
        expect(mockRequestOptions.qs.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listPolicyAssignmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listPolicyAssignmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listPolicyAssignmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const version = '1.0';
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listPolicyAssignmentsParams = {
          version,
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listPolicyAssignments(listPolicyAssignmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicyAssignments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listPolicyAssignments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('PolicyAssignmentsPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/policy_assignments';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"assignments":[{"target":{"type":"Account","id":"id"},"id":"id","account_id":"account_id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","resources":[{"target":{"type":"Account","id":"id"},"policy":{"resource_created":{"id":"id"},"status":"status","error_message":{"name":"name","errorCode":"errorCode","message":"message","code":"code","errors":[{"code":"insufficent_permissions","message":"message","details":{"conflicts_with":{"etag":"etag","role":"role","policy":"policy"}},"more_info":"more_info"}]}}}],"subject":{"id":"id","type":"iam_id"},"template":{"id":"id","version":"version"},"status":"in_progress"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"assignments":[{"target":{"type":"Account","id":"id"},"id":"id","account_id":"account_id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","resources":[{"target":{"type":"Account","id":"id"},"policy":{"resource_created":{"id":"id"},"status":"status","error_message":{"name":"name","errorCode":"errorCode","message":"message","code":"code","errors":[{"code":"insufficent_permissions","message":"message","details":{"conflicts_with":{"etag":"etag","role":"role","policy":"policy"}},"more_info":"more_info"}]}}}],"subject":{"id":"id","type":"iam_id"},"template":{"id":"id","version":"version"},"status":"in_progress"}],"total_count":2,"limit":1}';

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
          version: '1.0',
          accountId: 'testString',
          acceptLanguage: 'default',
          templateId: 'testString',
          templateVersion: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.PolicyAssignmentsPager(iamPolicyManagementService, params);
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
          version: '1.0',
          accountId: 'testString',
          acceptLanguage: 'default',
          templateId: 'testString',
          templateVersion: 'testString',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.PolicyAssignmentsPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createPolicyTemplateAssignment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AssignmentTargetDetails
      const assignmentTargetDetailsModel = {
        type: 'Account',
        id: 'testString',
      };

      // AssignmentTemplateDetails
      const assignmentTemplateDetailsModel = {
        id: 'testString',
        version: 'testString',
      };

      function __createPolicyTemplateAssignmentTest() {
        // Construct the params object for operation createPolicyTemplateAssignment
        const version = '1.0';
        const target = assignmentTargetDetailsModel;
        const templates = [assignmentTemplateDetailsModel];
        const acceptLanguage = 'default';
        const createPolicyTemplateAssignmentParams = {
          version,
          target,
          templates,
          acceptLanguage,
        };

        const createPolicyTemplateAssignmentResult = iamPolicyManagementService.createPolicyTemplateAssignment(createPolicyTemplateAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(createPolicyTemplateAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_assignments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.templates).toEqual(templates);
        expect(mockRequestOptions.qs.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPolicyTemplateAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createPolicyTemplateAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createPolicyTemplateAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const version = '1.0';
        const target = assignmentTargetDetailsModel;
        const templates = [assignmentTemplateDetailsModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPolicyTemplateAssignmentParams = {
          version,
          target,
          templates,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createPolicyTemplateAssignment(createPolicyTemplateAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicyTemplateAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createPolicyTemplateAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPolicyAssignment', () => {
    describe('positive tests', () => {
      function __getPolicyAssignmentTest() {
        // Construct the params object for operation getPolicyAssignment
        const assignmentId = 'testString';
        const version = '1.0';
        const getPolicyAssignmentParams = {
          assignmentId,
          version,
        };

        const getPolicyAssignmentResult = iamPolicyManagementService.getPolicyAssignment(getPolicyAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(getPolicyAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_assignments/{assignment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPolicyAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getPolicyAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getPolicyAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const version = '1.0';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPolicyAssignmentParams = {
          assignmentId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getPolicyAssignment(getPolicyAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicyAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getPolicyAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updatePolicyAssignment', () => {
    describe('positive tests', () => {
      function __updatePolicyAssignmentTest() {
        // Construct the params object for operation updatePolicyAssignment
        const assignmentId = 'testString';
        const version = '1.0';
        const ifMatch = 'testString';
        const templateVersion = 'testString';
        const updatePolicyAssignmentParams = {
          assignmentId,
          version,
          ifMatch,
          templateVersion,
        };

        const updatePolicyAssignmentResult = iamPolicyManagementService.updatePolicyAssignment(updatePolicyAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(updatePolicyAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_assignments/{assignment_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updatePolicyAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __updatePolicyAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __updatePolicyAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const version = '1.0';
        const ifMatch = 'testString';
        const templateVersion = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updatePolicyAssignmentParams = {
          assignmentId,
          version,
          ifMatch,
          templateVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.updatePolicyAssignment(updatePolicyAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.updatePolicyAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.updatePolicyAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deletePolicyAssignment', () => {
    describe('positive tests', () => {
      function __deletePolicyAssignmentTest() {
        // Construct the params object for operation deletePolicyAssignment
        const assignmentId = 'testString';
        const deletePolicyAssignmentParams = {
          assignmentId,
        };

        const deletePolicyAssignmentResult = iamPolicyManagementService.deletePolicyAssignment(deletePolicyAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(deletePolicyAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/policy_assignments/{assignment_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deletePolicyAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deletePolicyAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deletePolicyAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deletePolicyAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deletePolicyAssignment(deletePolicyAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicyAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deletePolicyAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSettings', () => {
    describe('positive tests', () => {
      function __getSettingsTest() {
        // Construct the params object for operation getSettings
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const getSettingsParams = {
          accountId,
          acceptLanguage,
        };

        const getSettingsResult = iamPolicyManagementService.getSettings(getSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/accounts/{account_id}/settings/access_management', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSettingsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getSettings(getSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSettings', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // IdentityTypesBase
      const identityTypesBaseModel = {
        state: 'enabled',
        external_allowed_accounts: ['testString'],
      };

      // IdentityTypesPatch
      const identityTypesPatchModel = {
        user: identityTypesBaseModel,
        service_id: identityTypesBaseModel,
        service: identityTypesBaseModel,
      };

      // ExternalAccountIdentityInteractionPatch
      const externalAccountIdentityInteractionPatchModel = {
        identity_types: identityTypesPatchModel,
      };

      function __updateSettingsTest() {
        // Construct the params object for operation updateSettings
        const accountId = 'testString';
        const ifMatch = 'testString';
        const externalAccountIdentityInteraction = externalAccountIdentityInteractionPatchModel;
        const acceptLanguage = 'default';
        const updateSettingsParams = {
          accountId,
          ifMatch,
          externalAccountIdentityInteraction,
          acceptLanguage,
        };

        const updateSettingsResult = iamPolicyManagementService.updateSettings(updateSettingsParams);

        // all methods should return a Promise
        expectToBePromise(updateSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/accounts/{account_id}/settings/access_management', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.external_account_identity_interaction).toEqual(externalAccountIdentityInteraction);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __updateSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __updateSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSettingsParams = {
          accountId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.updateSettings(updateSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listActionControlTemplates', () => {
    describe('positive tests', () => {
      function __listActionControlTemplatesTest() {
        // Construct the params object for operation listActionControlTemplates
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const limit = 50;
        const start = 'testString';
        const listActionControlTemplatesParams = {
          accountId,
          acceptLanguage,
          limit,
          start,
        };

        const listActionControlTemplatesResult = iamPolicyManagementService.listActionControlTemplates(listActionControlTemplatesParams);

        // all methods should return a Promise
        expectToBePromise(listActionControlTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listActionControlTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listActionControlTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listActionControlTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listActionControlTemplatesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listActionControlTemplates(listActionControlTemplatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listActionControlTemplates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listActionControlTemplates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ActionControlTemplatesPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/action_control_templates';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"action_control_templates":[{"name":"name","description":"description","account_id":"account_id","committed":false,"action_control":{"service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"action_control_templates":[{"name":"name","description":"description","account_id":"account_id","committed":false,"action_control":{"service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}]}';

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
          accountId: 'testString',
          acceptLanguage: 'default',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.ActionControlTemplatesPager(iamPolicyManagementService, params);
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
          accountId: 'testString',
          acceptLanguage: 'default',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.ActionControlTemplatesPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createActionControlTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TemplateActionControl
      const templateActionControlModel = {
        service_name: 'testString',
        description: 'testString',
        actions: ['testString'],
      };

      function __createActionControlTemplateTest() {
        // Construct the params object for operation createActionControlTemplate
        const name = 'testString';
        const accountId = 'testString';
        const description = 'testString';
        const committed = true;
        const actionControl = templateActionControlModel;
        const acceptLanguage = 'default';
        const createActionControlTemplateParams = {
          name,
          accountId,
          description,
          committed,
          actionControl,
          acceptLanguage,
        };

        const createActionControlTemplateResult = iamPolicyManagementService.createActionControlTemplate(createActionControlTemplateParams);

        // all methods should return a Promise
        expectToBePromise(createActionControlTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.body.action_control).toEqual(actionControl);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createActionControlTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createActionControlTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createActionControlTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createActionControlTemplateParams = {
          name,
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createActionControlTemplate(createActionControlTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createActionControlTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createActionControlTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getActionControlTemplate', () => {
    describe('positive tests', () => {
      function __getActionControlTemplateTest() {
        // Construct the params object for operation getActionControlTemplate
        const actionControlTemplateId = 'testString';
        const state = 'active';
        const getActionControlTemplateParams = {
          actionControlTemplateId,
          state,
        };

        const getActionControlTemplateResult = iamPolicyManagementService.getActionControlTemplate(getActionControlTemplateParams);

        // all methods should return a Promise
        expectToBePromise(getActionControlTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getActionControlTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getActionControlTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getActionControlTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getActionControlTemplateParams = {
          actionControlTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getActionControlTemplate(getActionControlTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getActionControlTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getActionControlTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteActionControlTemplate', () => {
    describe('positive tests', () => {
      function __deleteActionControlTemplateTest() {
        // Construct the params object for operation deleteActionControlTemplate
        const actionControlTemplateId = 'testString';
        const deleteActionControlTemplateParams = {
          actionControlTemplateId,
        };

        const deleteActionControlTemplateResult = iamPolicyManagementService.deleteActionControlTemplate(deleteActionControlTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deleteActionControlTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteActionControlTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteActionControlTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteActionControlTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteActionControlTemplateParams = {
          actionControlTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteActionControlTemplate(deleteActionControlTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteActionControlTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteActionControlTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createActionControlTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TemplateActionControl
      const templateActionControlModel = {
        service_name: 'testString',
        description: 'testString',
        actions: ['testString'],
      };

      function __createActionControlTemplateVersionTest() {
        // Construct the params object for operation createActionControlTemplateVersion
        const actionControlTemplateId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const actionControl = templateActionControlModel;
        const committed = true;
        const createActionControlTemplateVersionParams = {
          actionControlTemplateId,
          name,
          description,
          actionControl,
          committed,
        };

        const createActionControlTemplateVersionResult = iamPolicyManagementService.createActionControlTemplateVersion(createActionControlTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(createActionControlTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}/versions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.action_control).toEqual(actionControl);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createActionControlTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createActionControlTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createActionControlTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createActionControlTemplateVersionParams = {
          actionControlTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createActionControlTemplateVersion(createActionControlTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createActionControlTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createActionControlTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listActionControlTemplateVersions', () => {
    describe('positive tests', () => {
      function __listActionControlTemplateVersionsTest() {
        // Construct the params object for operation listActionControlTemplateVersions
        const actionControlTemplateId = 'testString';
        const state = 'active';
        const limit = 50;
        const start = 'testString';
        const listActionControlTemplateVersionsParams = {
          actionControlTemplateId,
          state,
          limit,
          start,
        };

        const listActionControlTemplateVersionsResult = iamPolicyManagementService.listActionControlTemplateVersions(listActionControlTemplateVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listActionControlTemplateVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listActionControlTemplateVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listActionControlTemplateVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listActionControlTemplateVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listActionControlTemplateVersionsParams = {
          actionControlTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listActionControlTemplateVersions(listActionControlTemplateVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listActionControlTemplateVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listActionControlTemplateVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ActionControlTemplateVersionsPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/action_control_templates/testString/versions';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"versions":[{"name":"name","description":"description","account_id":"account_id","committed":false,"action_control":{"service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"versions":[{"name":"name","description":"description","account_id":"account_id","committed":false,"action_control":{"service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}],"total_count":2,"limit":1}';

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
          actionControlTemplateId: 'testString',
          state: 'active',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.ActionControlTemplateVersionsPager(iamPolicyManagementService, params);
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
          actionControlTemplateId: 'testString',
          state: 'active',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.ActionControlTemplateVersionsPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('replaceActionControlTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TemplateActionControl
      const templateActionControlModel = {
        service_name: 'testString',
        description: 'testString',
        actions: ['testString'],
      };

      function __replaceActionControlTemplateTest() {
        // Construct the params object for operation replaceActionControlTemplate
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const ifMatch = 'testString';
        const name = 'testString';
        const description = 'testString';
        const actionControl = templateActionControlModel;
        const committed = true;
        const replaceActionControlTemplateParams = {
          actionControlTemplateId,
          version,
          ifMatch,
          name,
          description,
          actionControl,
          committed,
        };

        const replaceActionControlTemplateResult = iamPolicyManagementService.replaceActionControlTemplate(replaceActionControlTemplateParams);

        // all methods should return a Promise
        expectToBePromise(replaceActionControlTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}/versions/{version}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.action_control).toEqual(actionControl);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceActionControlTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __replaceActionControlTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __replaceActionControlTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceActionControlTemplateParams = {
          actionControlTemplateId,
          version,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.replaceActionControlTemplate(replaceActionControlTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceActionControlTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceActionControlTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteActionControlTemplateVersion', () => {
    describe('positive tests', () => {
      function __deleteActionControlTemplateVersionTest() {
        // Construct the params object for operation deleteActionControlTemplateVersion
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const deleteActionControlTemplateVersionParams = {
          actionControlTemplateId,
          version,
        };

        const deleteActionControlTemplateVersionResult = iamPolicyManagementService.deleteActionControlTemplateVersion(deleteActionControlTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteActionControlTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}/versions/{version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteActionControlTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteActionControlTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteActionControlTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteActionControlTemplateVersionParams = {
          actionControlTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteActionControlTemplateVersion(deleteActionControlTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteActionControlTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteActionControlTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getActionControlTemplateVersion', () => {
    describe('positive tests', () => {
      function __getActionControlTemplateVersionTest() {
        // Construct the params object for operation getActionControlTemplateVersion
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const getActionControlTemplateVersionParams = {
          actionControlTemplateId,
          version,
        };

        const getActionControlTemplateVersionResult = iamPolicyManagementService.getActionControlTemplateVersion(getActionControlTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getActionControlTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}/versions/{version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getActionControlTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getActionControlTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getActionControlTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getActionControlTemplateVersionParams = {
          actionControlTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getActionControlTemplateVersion(getActionControlTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getActionControlTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getActionControlTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('commitActionControlTemplate', () => {
    describe('positive tests', () => {
      function __commitActionControlTemplateTest() {
        // Construct the params object for operation commitActionControlTemplate
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const commitActionControlTemplateParams = {
          actionControlTemplateId,
          version,
        };

        const commitActionControlTemplateResult = iamPolicyManagementService.commitActionControlTemplate(commitActionControlTemplateParams);

        // all methods should return a Promise
        expectToBePromise(commitActionControlTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_templates/{action_control_template_id}/versions/{version}/commit', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.action_control_template_id).toEqual(actionControlTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __commitActionControlTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __commitActionControlTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __commitActionControlTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const actionControlTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const commitActionControlTemplateParams = {
          actionControlTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.commitActionControlTemplate(commitActionControlTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.commitActionControlTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.commitActionControlTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listActionControlAssignments', () => {
    describe('positive tests', () => {
      function __listActionControlAssignmentsTest() {
        // Construct the params object for operation listActionControlAssignments
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const templateId = 'testString';
        const templateVersion = 'testString';
        const limit = 50;
        const start = 'testString';
        const listActionControlAssignmentsParams = {
          accountId,
          acceptLanguage,
          templateId,
          templateVersion,
          limit,
          start,
        };

        const listActionControlAssignmentsResult = iamPolicyManagementService.listActionControlAssignments(listActionControlAssignmentsParams);

        // all methods should return a Promise
        expectToBePromise(listActionControlAssignmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_assignments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.template_id).toEqual(templateId);
        expect(mockRequestOptions.qs.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listActionControlAssignmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listActionControlAssignmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listActionControlAssignmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listActionControlAssignmentsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listActionControlAssignments(listActionControlAssignmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listActionControlAssignments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listActionControlAssignments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ActionControlAssignmentsPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/action_control_assignments';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"assignments":[{"id":"id","account_id":"account_id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","operation":"create","resources":[{"target":{"type":"Account","id":"id"},"action_control":{"resource_created":{"id":"id"},"error_message":{"name":"name","errorCode":"errorCode","message":"message","code":"code","errors":[{"code":"insufficent_permissions","message":"message","details":{"conflicts_with":{"etag":"etag","role":"role","policy":"policy"}},"more_info":"more_info"}]}}}],"template":{"id":"id","version":"version"},"target":{"type":"Account","id":"id"},"status":"accepted"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"assignments":[{"id":"id","account_id":"account_id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","operation":"create","resources":[{"target":{"type":"Account","id":"id"},"action_control":{"resource_created":{"id":"id"},"error_message":{"name":"name","errorCode":"errorCode","message":"message","code":"code","errors":[{"code":"insufficent_permissions","message":"message","details":{"conflicts_with":{"etag":"etag","role":"role","policy":"policy"}},"more_info":"more_info"}]}}}],"template":{"id":"id","version":"version"},"target":{"type":"Account","id":"id"},"status":"accepted"}],"total_count":2,"limit":1}';

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
          accountId: 'testString',
          acceptLanguage: 'default',
          templateId: 'testString',
          templateVersion: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.ActionControlAssignmentsPager(iamPolicyManagementService, params);
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
          accountId: 'testString',
          acceptLanguage: 'default',
          templateId: 'testString',
          templateVersion: 'testString',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.ActionControlAssignmentsPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createActionControlTemplateAssignment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AssignmentTargetDetails
      const assignmentTargetDetailsModel = {
        type: 'Account',
        id: 'testString',
      };

      // ActionControlAssignmentTemplate
      const actionControlAssignmentTemplateModel = {
        id: 'testString',
        version: 'testString',
      };

      function __createActionControlTemplateAssignmentTest() {
        // Construct the params object for operation createActionControlTemplateAssignment
        const target = assignmentTargetDetailsModel;
        const templates = [actionControlAssignmentTemplateModel];
        const acceptLanguage = 'default';
        const createActionControlTemplateAssignmentParams = {
          target,
          templates,
          acceptLanguage,
        };

        const createActionControlTemplateAssignmentResult = iamPolicyManagementService.createActionControlTemplateAssignment(createActionControlTemplateAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(createActionControlTemplateAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_assignments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.templates).toEqual(templates);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createActionControlTemplateAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createActionControlTemplateAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createActionControlTemplateAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const target = assignmentTargetDetailsModel;
        const templates = [actionControlAssignmentTemplateModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createActionControlTemplateAssignmentParams = {
          target,
          templates,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createActionControlTemplateAssignment(createActionControlTemplateAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createActionControlTemplateAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createActionControlTemplateAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getActionControlAssignment', () => {
    describe('positive tests', () => {
      function __getActionControlAssignmentTest() {
        // Construct the params object for operation getActionControlAssignment
        const assignmentId = 'testString';
        const getActionControlAssignmentParams = {
          assignmentId,
        };

        const getActionControlAssignmentResult = iamPolicyManagementService.getActionControlAssignment(getActionControlAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(getActionControlAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_assignments/{assignment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getActionControlAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getActionControlAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getActionControlAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getActionControlAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getActionControlAssignment(getActionControlAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getActionControlAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getActionControlAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateActionControlAssignment', () => {
    describe('positive tests', () => {
      function __updateActionControlAssignmentTest() {
        // Construct the params object for operation updateActionControlAssignment
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 'testString';
        const updateActionControlAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
        };

        const updateActionControlAssignmentResult = iamPolicyManagementService.updateActionControlAssignment(updateActionControlAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(updateActionControlAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_assignments/{assignment_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateActionControlAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __updateActionControlAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __updateActionControlAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateActionControlAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.updateActionControlAssignment(updateActionControlAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateActionControlAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateActionControlAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteActionControlAssignment', () => {
    describe('positive tests', () => {
      function __deleteActionControlAssignmentTest() {
        // Construct the params object for operation deleteActionControlAssignment
        const assignmentId = 'testString';
        const deleteActionControlAssignmentParams = {
          assignmentId,
        };

        const deleteActionControlAssignmentResult = iamPolicyManagementService.deleteActionControlAssignment(deleteActionControlAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteActionControlAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/action_control_assignments/{assignment_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteActionControlAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteActionControlAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteActionControlAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteActionControlAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteActionControlAssignment(deleteActionControlAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteActionControlAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteActionControlAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listRoleTemplates', () => {
    describe('positive tests', () => {
      function __listRoleTemplatesTest() {
        // Construct the params object for operation listRoleTemplates
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const name = 'testString';
        const roleName = 'testString';
        const roleServiceName = 'testString';
        const state = 'active';
        const limit = 50;
        const start = 'testString';
        const listRoleTemplatesParams = {
          accountId,
          acceptLanguage,
          name,
          roleName,
          roleServiceName,
          state,
          limit,
          start,
        };

        const listRoleTemplatesResult = iamPolicyManagementService.listRoleTemplates(listRoleTemplatesParams);

        // all methods should return a Promise
        expectToBePromise(listRoleTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.role_name).toEqual(roleName);
        expect(mockRequestOptions.qs.role_service_name).toEqual(roleServiceName);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRoleTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listRoleTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listRoleTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRoleTemplatesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listRoleTemplates(listRoleTemplatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listRoleTemplates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listRoleTemplates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('RoleTemplatesPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/role_templates';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"role_templates":[{"name":"name","description":"description","account_id":"account_id","committed":false,"role":{"name":"name","display_name":"display_name","service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"role_templates":[{"name":"name","description":"description","account_id":"account_id","committed":false,"role":{"name":"name","display_name":"display_name","service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}]}';

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
          accountId: 'testString',
          acceptLanguage: 'default',
          name: 'testString',
          roleName: 'testString',
          roleServiceName: 'testString',
          state: 'active',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.RoleTemplatesPager(iamPolicyManagementService, params);
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
          accountId: 'testString',
          acceptLanguage: 'default',
          name: 'testString',
          roleName: 'testString',
          roleServiceName: 'testString',
          state: 'active',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.RoleTemplatesPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createRoleTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RoleTemplatePrototypeRole
      const roleTemplatePrototypeRoleModel = {
        name: 'testString',
        display_name: 'testString',
        service_name: 'testString',
        description: 'testString',
        actions: ['testString'],
      };

      function __createRoleTemplateTest() {
        // Construct the params object for operation createRoleTemplate
        const name = 'testString';
        const accountId = 'testString';
        const description = 'testString';
        const committed = true;
        const role = roleTemplatePrototypeRoleModel;
        const acceptLanguage = 'default';
        const createRoleTemplateParams = {
          name,
          accountId,
          description,
          committed,
          role,
          acceptLanguage,
        };

        const createRoleTemplateResult = iamPolicyManagementService.createRoleTemplate(createRoleTemplateParams);

        // all methods should return a Promise
        expectToBePromise(createRoleTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.body.role).toEqual(role);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createRoleTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createRoleTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createRoleTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRoleTemplateParams = {
          name,
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createRoleTemplate(createRoleTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRoleTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRoleTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRoleTemplate', () => {
    describe('positive tests', () => {
      function __getRoleTemplateTest() {
        // Construct the params object for operation getRoleTemplate
        const roleTemplateId = 'testString';
        const state = 'active';
        const getRoleTemplateParams = {
          roleTemplateId,
          state,
        };

        const getRoleTemplateResult = iamPolicyManagementService.getRoleTemplate(getRoleTemplateParams);

        // all methods should return a Promise
        expectToBePromise(getRoleTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRoleTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getRoleTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getRoleTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRoleTemplateParams = {
          roleTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getRoleTemplate(getRoleTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRoleTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRoleTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteRoleTemplate', () => {
    describe('positive tests', () => {
      function __deleteRoleTemplateTest() {
        // Construct the params object for operation deleteRoleTemplate
        const roleTemplateId = 'testString';
        const deleteRoleTemplateParams = {
          roleTemplateId,
        };

        const deleteRoleTemplateResult = iamPolicyManagementService.deleteRoleTemplate(deleteRoleTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deleteRoleTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteRoleTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteRoleTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteRoleTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteRoleTemplateParams = {
          roleTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteRoleTemplate(deleteRoleTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRoleTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRoleTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createRoleTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TemplateRole
      const templateRoleModel = {
        display_name: 'testString',
        service_name: 'testString',
        description: 'testString',
        actions: ['testString'],
      };

      function __createRoleTemplateVersionTest() {
        // Construct the params object for operation createRoleTemplateVersion
        const roleTemplateId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const role = templateRoleModel;
        const committed = true;
        const createRoleTemplateVersionParams = {
          roleTemplateId,
          name,
          description,
          role,
          committed,
        };

        const createRoleTemplateVersionResult = iamPolicyManagementService.createRoleTemplateVersion(createRoleTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(createRoleTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}/versions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.role).toEqual(role);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createRoleTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createRoleTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createRoleTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRoleTemplateVersionParams = {
          roleTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createRoleTemplateVersion(createRoleTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRoleTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRoleTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listRoleTemplateVersions', () => {
    describe('positive tests', () => {
      function __listRoleTemplateVersionsTest() {
        // Construct the params object for operation listRoleTemplateVersions
        const roleTemplateId = 'testString';
        const state = 'active';
        const limit = 50;
        const start = 'testString';
        const listRoleTemplateVersionsParams = {
          roleTemplateId,
          state,
          limit,
          start,
        };

        const listRoleTemplateVersionsResult = iamPolicyManagementService.listRoleTemplateVersions(listRoleTemplateVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listRoleTemplateVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.state).toEqual(state);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRoleTemplateVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listRoleTemplateVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listRoleTemplateVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRoleTemplateVersionsParams = {
          roleTemplateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listRoleTemplateVersions(listRoleTemplateVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listRoleTemplateVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listRoleTemplateVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('RoleTemplateVersionsPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/role_templates/testString/versions';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"versions":[{"name":"name","description":"description","account_id":"account_id","committed":false,"role":{"name":"name","display_name":"display_name","service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"versions":[{"name":"name","description":"description","account_id":"account_id","committed":false,"role":{"name":"name","display_name":"display_name","service_name":"service_name","description":"description","actions":["actions"]},"id":"id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","version":"version","state":"active"}],"total_count":2,"limit":1}';

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
          roleTemplateId: 'testString',
          state: 'active',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.RoleTemplateVersionsPager(iamPolicyManagementService, params);
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
          roleTemplateId: 'testString',
          state: 'active',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.RoleTemplateVersionsPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('replaceRoleTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TemplateRole
      const templateRoleModel = {
        display_name: 'testString',
        service_name: 'testString',
        description: 'testString',
        actions: ['testString'],
      };

      function __replaceRoleTemplateTest() {
        // Construct the params object for operation replaceRoleTemplate
        const roleTemplateId = 'testString';
        const version = 'testString';
        const ifMatch = 'testString';
        const name = 'testString';
        const description = 'testString';
        const role = templateRoleModel;
        const committed = true;
        const replaceRoleTemplateParams = {
          roleTemplateId,
          version,
          ifMatch,
          name,
          description,
          role,
          committed,
        };

        const replaceRoleTemplateResult = iamPolicyManagementService.replaceRoleTemplate(replaceRoleTemplateParams);

        // all methods should return a Promise
        expectToBePromise(replaceRoleTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}/versions/{version}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.role).toEqual(role);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceRoleTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __replaceRoleTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __replaceRoleTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const version = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceRoleTemplateParams = {
          roleTemplateId,
          version,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.replaceRoleTemplate(replaceRoleTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceRoleTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.replaceRoleTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteRoleTemplateVersion', () => {
    describe('positive tests', () => {
      function __deleteRoleTemplateVersionTest() {
        // Construct the params object for operation deleteRoleTemplateVersion
        const roleTemplateId = 'testString';
        const version = 'testString';
        const deleteRoleTemplateVersionParams = {
          roleTemplateId,
          version,
        };

        const deleteRoleTemplateVersionResult = iamPolicyManagementService.deleteRoleTemplateVersion(deleteRoleTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteRoleTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}/versions/{version}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteRoleTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteRoleTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteRoleTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteRoleTemplateVersionParams = {
          roleTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteRoleTemplateVersion(deleteRoleTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRoleTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRoleTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRoleTemplateVersion', () => {
    describe('positive tests', () => {
      function __getRoleTemplateVersionTest() {
        // Construct the params object for operation getRoleTemplateVersion
        const roleTemplateId = 'testString';
        const version = 'testString';
        const getRoleTemplateVersionParams = {
          roleTemplateId,
          version,
        };

        const getRoleTemplateVersionResult = iamPolicyManagementService.getRoleTemplateVersion(getRoleTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getRoleTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}/versions/{version}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRoleTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getRoleTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getRoleTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRoleTemplateVersionParams = {
          roleTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getRoleTemplateVersion(getRoleTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRoleTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRoleTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('commitRoleTemplate', () => {
    describe('positive tests', () => {
      function __commitRoleTemplateTest() {
        // Construct the params object for operation commitRoleTemplate
        const roleTemplateId = 'testString';
        const version = 'testString';
        const commitRoleTemplateParams = {
          roleTemplateId,
          version,
        };

        const commitRoleTemplateResult = iamPolicyManagementService.commitRoleTemplate(commitRoleTemplateParams);

        // all methods should return a Promise
        expectToBePromise(commitRoleTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_templates/{role_template_id}/versions/{version}/commit', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.role_template_id).toEqual(roleTemplateId);
        expect(mockRequestOptions.path.version).toEqual(version);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __commitRoleTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __commitRoleTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __commitRoleTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const roleTemplateId = 'testString';
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const commitRoleTemplateParams = {
          roleTemplateId,
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.commitRoleTemplate(commitRoleTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.commitRoleTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.commitRoleTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listRoleAssignments', () => {
    describe('positive tests', () => {
      function __listRoleAssignmentsTest() {
        // Construct the params object for operation listRoleAssignments
        const accountId = 'testString';
        const acceptLanguage = 'default';
        const templateId = 'testString';
        const templateVersion = 'testString';
        const limit = 50;
        const start = 'testString';
        const listRoleAssignmentsParams = {
          accountId,
          acceptLanguage,
          templateId,
          templateVersion,
          limit,
          start,
        };

        const listRoleAssignmentsResult = iamPolicyManagementService.listRoleAssignments(listRoleAssignmentsParams);

        // all methods should return a Promise
        expectToBePromise(listRoleAssignmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_assignments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.template_id).toEqual(templateId);
        expect(mockRequestOptions.qs.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.start).toEqual(start);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listRoleAssignmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __listRoleAssignmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __listRoleAssignmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listRoleAssignmentsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.listRoleAssignments(listRoleAssignmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.listRoleAssignments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.listRoleAssignments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('RoleAssignmentsPager tests', () => {
      const serviceUrl = iamPolicyManagementServiceOptions.url;
      const path = '/v1/role_assignments';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"assignments":[{"id":"id","account_id":"account_id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","operation":"create","resources":[{"target":{"type":"Account","id":"id"},"role":{"resource_created":{"id":"id"},"error_message":{"name":"name","errorCode":"errorCode","message":"message","code":"code","errors":[{"code":"insufficent_permissions","message":"message","details":{"conflicts_with":{"etag":"etag","role":"role","policy":"policy"}},"more_info":"more_info"}]}}}],"template":{"id":"id","version":"version"},"target":{"type":"Account","id":"id"},"status":"accepted"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"assignments":[{"id":"id","account_id":"account_id","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","operation":"create","resources":[{"target":{"type":"Account","id":"id"},"role":{"resource_created":{"id":"id"},"error_message":{"name":"name","errorCode":"errorCode","message":"message","code":"code","errors":[{"code":"insufficent_permissions","message":"message","details":{"conflicts_with":{"etag":"etag","role":"role","policy":"policy"}},"more_info":"more_info"}]}}}],"template":{"id":"id","version":"version"},"target":{"type":"Account","id":"id"},"status":"accepted"}],"total_count":2,"limit":1}';

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
          accountId: 'testString',
          acceptLanguage: 'default',
          templateId: 'testString',
          templateVersion: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new IamPolicyManagementV1.RoleAssignmentsPager(iamPolicyManagementService, params);
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
          accountId: 'testString',
          acceptLanguage: 'default',
          templateId: 'testString',
          templateVersion: 'testString',
          limit: 10,
        };
        const pager = new IamPolicyManagementV1.RoleAssignmentsPager(iamPolicyManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createRoleTemplateAssignment', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AssignmentTargetDetails
      const assignmentTargetDetailsModel = {
        type: 'Account',
        id: 'testString',
      };

      // RoleAssignmentTemplate
      const roleAssignmentTemplateModel = {
        id: 'testString',
        version: 'testString',
      };

      function __createRoleTemplateAssignmentTest() {
        // Construct the params object for operation createRoleTemplateAssignment
        const target = assignmentTargetDetailsModel;
        const templates = [roleAssignmentTemplateModel];
        const acceptLanguage = 'default';
        const createRoleTemplateAssignmentParams = {
          target,
          templates,
          acceptLanguage,
        };

        const createRoleTemplateAssignmentResult = iamPolicyManagementService.createRoleTemplateAssignment(createRoleTemplateAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(createRoleTemplateAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_assignments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept-Language', acceptLanguage);
        expect(mockRequestOptions.body.target).toEqual(target);
        expect(mockRequestOptions.body.templates).toEqual(templates);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createRoleTemplateAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __createRoleTemplateAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __createRoleTemplateAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const target = assignmentTargetDetailsModel;
        const templates = [roleAssignmentTemplateModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createRoleTemplateAssignmentParams = {
          target,
          templates,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.createRoleTemplateAssignment(createRoleTemplateAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRoleTemplateAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.createRoleTemplateAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getRoleAssignment', () => {
    describe('positive tests', () => {
      function __getRoleAssignmentTest() {
        // Construct the params object for operation getRoleAssignment
        const assignmentId = 'testString';
        const getRoleAssignmentParams = {
          assignmentId,
        };

        const getRoleAssignmentResult = iamPolicyManagementService.getRoleAssignment(getRoleAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(getRoleAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_assignments/{assignment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getRoleAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __getRoleAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __getRoleAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getRoleAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.getRoleAssignment(getRoleAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRoleAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.getRoleAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateRoleAssignment', () => {
    describe('positive tests', () => {
      function __updateRoleAssignmentTest() {
        // Construct the params object for operation updateRoleAssignment
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 'testString';
        const updateRoleAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
        };

        const updateRoleAssignmentResult = iamPolicyManagementService.updateRoleAssignment(updateRoleAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(updateRoleAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_assignments/{assignment_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateRoleAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __updateRoleAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __updateRoleAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateRoleAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.updateRoleAssignment(updateRoleAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateRoleAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.updateRoleAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteRoleAssignment', () => {
    describe('positive tests', () => {
      function __deleteRoleAssignmentTest() {
        // Construct the params object for operation deleteRoleAssignment
        const assignmentId = 'testString';
        const deleteRoleAssignmentParams = {
          assignmentId,
        };

        const deleteRoleAssignmentResult = iamPolicyManagementService.deleteRoleAssignment(deleteRoleAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteRoleAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/role_assignments/{assignment_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteRoleAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.enableRetries();
        __deleteRoleAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamPolicyManagementService.disableRetries();
        __deleteRoleAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteRoleAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamPolicyManagementService.deleteRoleAssignment(deleteRoleAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRoleAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamPolicyManagementService.deleteRoleAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
