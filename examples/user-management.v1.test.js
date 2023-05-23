/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2021, 2022.
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

const UserManagementV1 = require('../dist/user-management/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');
const { expectToBePromise } = require('ibm-cloud-sdk-core/lib/sdk-test-helpers');

//
// This file provides an example of how to use the User Management service.
//
// The following configuration properties are assumed to be defined:
//
// USER_MANAGEMENT_URL=<service url>
// USER_MANAGEMENT_AUTHTYPE=iam
// USER_MANAGEMENT_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// USER_MANAGEMENT_APIKEY=<IAM apikey>
// USER_MANAGEMENT_ACCOUNT_ID=<account ID>
// USER_MANAGEMENT_USER_ID=<user ID>
// USER_MANAGEMENT_MEMBER_EMAIL=<member email to invite>
// USER_MANAGEMENT_VIEWER_ROLE_ID=<viewer role ID>
// USER_MANAGEMENT_ACCESS_GROUP_ID=<access group ID>
// # alternateService
// USER_MANAGEMENT_ADMIN_URL=<service url>
// USER_MANAGEMENT_ADMIN_AUTHTYPE=iam
// USER_MANAGEMENT_ADMIN_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// USER_MANAGEMENT_ADMIN_APIKEY=<IAM apikey>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'user_management.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('UserManagementV1', () => {

  // begin-common

  const userManagementService = UserManagementV1.newInstance(
    { serviceName: UserManagementV1.DEFAULT_SERVICE_NAME },
  );
  const userManagementAdminService = UserManagementV1.newInstance(
    { serviceName: 'USER_MANAGEMENT_ADMIN' },
  );

  // end-common

  const config = readExternalSources(UserManagementV1.DEFAULT_SERVICE_NAME);

  let accountId = config.accountId;
  let userId = config.userId;
  let memberEmail = config.memberEmail;
  let viewerRoleId = config.viewerRoleId;
  let accessGroupId = config.accessGroupId;

  let deleteUserId = null;
  jest.setTimeout(30000);

  test('inviteUsers request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(memberEmail).not.toBeNull();
    expect(viewerRoleId).not.toBeNull();
    expect(accountId).not.toBeNull();
    expect(accessGroupId).not.toBeNull();

    originalLog('inviteUsers() result:');
    // begin-invite_users

    const inviteUserModel = {
      email: memberEmail,
      account_role: 'Member',
    };

    const roleModel = {
      role_id: viewerRoleId,
    };

    const attributeModel = {
      name: 'accountId',
      value: accountId,
    };

    const attributeModel2 = {
      name: 'resourceGroupId',
      value: '*',
    };

    const resourceModel = {
      attributes: [attributeModel, attributeModel2],
    };

    const inviteUserIamPolicyModel = {
      type: 'access',
      roles: [roleModel],
      resources: [resourceModel],
    };

    const params = {
      accountId: accountId,
      users: [inviteUserModel],
      iamPolicy: [inviteUserIamPolicyModel],
      accessGroups: [accessGroupId],
    };

    try {
      const res = await userManagementAdminService.inviteUsers(params);
      deleteUserId = res.result.resources[0].id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-invite_users
  });
  test('listUsers request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listUsers() result:');
    // begin-list_users

    const params = {
      accountId: accountId,
      includeSettings: true,
      search: 'state:ACTIVE',
    };

    const allResults = [];
    try {
      const pager = new UserManagementV1.UsersPager(userManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_users
  });
  test('removeUser request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountId).not.toBeNull();
    expect(deleteUserId).not.toBeNull();

    // begin-remove_user

    const params = {
      accountId: accountId,
      iamId: deleteUserId,
    };

    try {
      await userManagementAdminService.removeUser(params);
    } catch (err) {
      console.warn(err);
    }

    // end-remove_user
  });
  test('getUserProfile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountId).not.toBeNull();
    expect(userId).not.toBeNull();

    originalLog('getUserProfile() result:');
    // begin-get_user_profile

    const params = {
      accountId: accountId,
      iamId: userId,
    };

    try {
      const res = await userManagementService.getUserProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_user_profile
  });
  test('updateUserProfile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountId).not.toBeNull();
    expect(userId).not.toBeNull();

    // begin-update_user_profile

    const params = {
      accountId: accountId,
      iamId: userId,
      phonenumber: '123456789',
    };

    try {
      await userManagementService.updateUserProfile(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_user_profile
  });
  test('getUserSettings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountId).not.toBeNull();
    expect(userId).not.toBeNull();

    originalLog('getUserSettings() result:');
    // begin-get_user_settings

    const params = {
      accountId: accountId,
      iamId: userId,
    };

    try {
      const res = await userManagementService.getUserSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_user_settings
  });
  test('updateUserSettings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountId).not.toBeNull();
    expect(userId).not.toBeNull();

    // begin-update_user_settings

    const params = {
      accountId: accountId,
      iamId: userId,
      selfManage: true,
      allowedIpAddresses: '192.168.0.2,192.168.0.3',
    };

    try {
      await userManagementService.updateUserSettings(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_user_settings
  });
});
