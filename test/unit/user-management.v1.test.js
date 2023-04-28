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

const UserManagementV1 = require('../../dist/user-management/v1');
const nock = require('nock');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const userManagementServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://user-management.cloud.ibm.com',
};

const userManagementService = new UserManagementV1(userManagementServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(userManagementService, 'createRequest');
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
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('UserManagementV1', () => {

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
      const testInstance = UserManagementV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(UserManagementV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(UserManagementV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(UserManagementV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = UserManagementV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(UserManagementV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new UserManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new UserManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(UserManagementV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('listUsers', () => {
    describe('positive tests', () => {
      function __listUsersTest() {
        // Construct the params object for operation listUsers
        const accountId = 'testString';
        const limit = 100;
        const includeSettings = true;
        const search = 'testString';
        const start = 'testString';
        const userId = 'testString';
        const listUsersParams = {
          accountId,
          limit,
          includeSettings,
          search,
          start,
          userId,
        };

        const listUsersResult = userManagementService.listUsers(listUsersParams);

        // all methods should return a Promise
        expectToBePromise(listUsersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/accounts/{account_id}/users', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.include_settings).toEqual(includeSettings);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.qs._start).toEqual(start);
        expect(mockRequestOptions.qs.user_id).toEqual(userId);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listUsersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __listUsersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __listUsersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listUsersParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.listUsers(listUsersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.listUsers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.listUsers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('UsersPager tests', () => {
      const serviceUrl = userManagementServiceOptions.url;
      const path = '/v2/accounts/testString/users';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?_start=1","resources":[{"id":"id","iam_id":"iam_id","realm":"realm","user_id":"user_id","firstname":"firstname","lastname":"lastname","state":"state","email":"email","phonenumber":"phonenumber","altphonenumber":"altphonenumber","photo":"photo","account_id":"account_id","added_on":"added_on"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","iam_id":"iam_id","realm":"realm","user_id":"user_id","firstname":"firstname","lastname":"lastname","state":"state","email":"email","phonenumber":"phonenumber","altphonenumber":"altphonenumber","photo":"photo","account_id":"account_id","added_on":"added_on"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'testString',
          limit: 10,
          includeSettings: true,
          search: 'testString',
          userId: 'testString',
        };
        const allResults = [];
        const pager = new UserManagementV1.UsersPager(userManagementService, params);
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
          limit: 10,
          includeSettings: true,
          search: 'testString',
          userId: 'testString',
        };
        const pager = new UserManagementV1.UsersPager(userManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('inviteUsers', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // InviteUser
      const inviteUserModel = {
        email: 'testString',
        account_role: 'testString',
      };

      // Role
      const roleModel = {
        role_id: 'testString',
      };

      // Attribute
      const attributeModel = {
        name: 'testString',
        value: 'testString',
      };

      // Resource
      const resourceModel = {
        attributes: [attributeModel],
      };

      // InviteUserIamPolicy
      const inviteUserIamPolicyModel = {
        type: 'testString',
        roles: [roleModel],
        resources: [resourceModel],
      };

      function __inviteUsersTest() {
        // Construct the params object for operation inviteUsers
        const accountId = 'testString';
        const users = [inviteUserModel];
        const iamPolicy = [inviteUserIamPolicyModel];
        const accessGroups = ['testString'];
        const inviteUsersParams = {
          accountId,
          users,
          iamPolicy,
          accessGroups,
        };

        const inviteUsersResult = userManagementService.inviteUsers(inviteUsersParams);

        // all methods should return a Promise
        expectToBePromise(inviteUsersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/accounts/{account_id}/users', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.users).toEqual(users);
        expect(mockRequestOptions.body.iam_policy).toEqual(iamPolicy);
        expect(mockRequestOptions.body.access_groups).toEqual(accessGroups);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __inviteUsersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __inviteUsersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __inviteUsersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const inviteUsersParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.inviteUsers(inviteUsersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.inviteUsers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.inviteUsers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getUserProfile', () => {
    describe('positive tests', () => {
      function __getUserProfileTest() {
        // Construct the params object for operation getUserProfile
        const accountId = 'testString';
        const iamId = 'testString';
        const includeActivity = 'testString';
        const getUserProfileParams = {
          accountId,
          iamId,
          includeActivity,
        };

        const getUserProfileResult = userManagementService.getUserProfile(getUserProfileParams);

        // all methods should return a Promise
        expectToBePromise(getUserProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/accounts/{account_id}/users/{iam_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_activity).toEqual(includeActivity);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getUserProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __getUserProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __getUserProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getUserProfileParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.getUserProfile(getUserProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.getUserProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.getUserProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateUserProfile', () => {
    describe('positive tests', () => {
      function __updateUserProfileTest() {
        // Construct the params object for operation updateUserProfile
        const accountId = 'testString';
        const iamId = 'testString';
        const firstname = 'testString';
        const lastname = 'testString';
        const state = 'testString';
        const email = 'testString';
        const phonenumber = 'testString';
        const altphonenumber = 'testString';
        const photo = 'testString';
        const includeActivity = 'testString';
        const updateUserProfileParams = {
          accountId,
          iamId,
          firstname,
          lastname,
          state,
          email,
          phonenumber,
          altphonenumber,
          photo,
          includeActivity,
        };

        const updateUserProfileResult = userManagementService.updateUserProfile(updateUserProfileParams);

        // all methods should return a Promise
        expectToBePromise(updateUserProfileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/accounts/{account_id}/users/{iam_id}', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.firstname).toEqual(firstname);
        expect(mockRequestOptions.body.lastname).toEqual(lastname);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.body.email).toEqual(email);
        expect(mockRequestOptions.body.phonenumber).toEqual(phonenumber);
        expect(mockRequestOptions.body.altphonenumber).toEqual(altphonenumber);
        expect(mockRequestOptions.body.photo).toEqual(photo);
        expect(mockRequestOptions.qs.include_activity).toEqual(includeActivity);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateUserProfileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __updateUserProfileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __updateUserProfileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateUserProfileParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.updateUserProfile(updateUserProfileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.updateUserProfile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.updateUserProfile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('removeUser', () => {
    describe('positive tests', () => {
      function __removeUserTest() {
        // Construct the params object for operation removeUser
        const accountId = 'testString';
        const iamId = 'testString';
        const includeActivity = 'testString';
        const removeUserParams = {
          accountId,
          iamId,
          includeActivity,
        };

        const removeUserResult = userManagementService.removeUser(removeUserParams);

        // all methods should return a Promise
        expectToBePromise(removeUserResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/accounts/{account_id}/users/{iam_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include_activity).toEqual(includeActivity);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeUserTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __removeUserTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __removeUserTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeUserParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.removeUser(removeUserParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.removeUser({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.removeUser();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('accept', () => {
    describe('positive tests', () => {
      function __acceptTest() {
        // Construct the params object for operation accept
        const accountId = 'testString';
        const acceptParams = {
          accountId,
        };

        const acceptResult = userManagementService.accept(acceptParams);

        // all methods should return a Promise
        expectToBePromise(acceptResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/users/accept', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __acceptTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __acceptTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __acceptTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const acceptParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.accept(acceptParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        userManagementService.accept({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('v3RemoveUser', () => {
    describe('positive tests', () => {
      function __v3RemoveUserTest() {
        // Construct the params object for operation v3RemoveUser
        const accountId = 'testString';
        const iamId = 'testString';
        const v3RemoveUserParams = {
          accountId,
          iamId,
        };

        const v3RemoveUserResult = userManagementService.v3RemoveUser(v3RemoveUserParams);

        // all methods should return a Promise
        expectToBePromise(v3RemoveUserResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v3/accounts/{account_id}/users/{iam_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __v3RemoveUserTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __v3RemoveUserTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __v3RemoveUserTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const v3RemoveUserParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.v3RemoveUser(v3RemoveUserParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.v3RemoveUser({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.v3RemoveUser();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getUserSettings', () => {
    describe('positive tests', () => {
      function __getUserSettingsTest() {
        // Construct the params object for operation getUserSettings
        const accountId = 'testString';
        const iamId = 'testString';
        const getUserSettingsParams = {
          accountId,
          iamId,
        };

        const getUserSettingsResult = userManagementService.getUserSettings(getUserSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getUserSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/accounts/{account_id}/users/{iam_id}/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getUserSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __getUserSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __getUserSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getUserSettingsParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.getUserSettings(getUserSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.getUserSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.getUserSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateUserSettings', () => {
    describe('positive tests', () => {
      function __updateUserSettingsTest() {
        // Construct the params object for operation updateUserSettings
        const accountId = 'testString';
        const iamId = 'testString';
        const language = 'testString';
        const notificationLanguage = 'testString';
        const allowedIpAddresses = '32.96.110.50,172.16.254.1';
        const selfManage = true;
        const updateUserSettingsParams = {
          accountId,
          iamId,
          language,
          notificationLanguage,
          allowedIpAddresses,
          selfManage,
        };

        const updateUserSettingsResult = userManagementService.updateUserSettings(updateUserSettingsParams);

        // all methods should return a Promise
        expectToBePromise(updateUserSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/accounts/{account_id}/users/{iam_id}/settings', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.language).toEqual(language);
        expect(mockRequestOptions.body.notification_language).toEqual(notificationLanguage);
        expect(mockRequestOptions.body.allowed_ip_addresses).toEqual(allowedIpAddresses);
        expect(mockRequestOptions.body.self_manage).toEqual(selfManage);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateUserSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        userManagementService.enableRetries();
        __updateUserSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        userManagementService.disableRetries();
        __updateUserSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateUserSettingsParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        userManagementService.updateUserSettings(updateUserSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await userManagementService.updateUserSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await userManagementService.updateUserSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
