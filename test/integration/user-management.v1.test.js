/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2020, 2022.
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

const { getQueryParam, readExternalSources } = require('ibm-cloud-sdk-core');
const UserManagementV1 = require('../../dist/user-management/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'user_management.env';

const describe = authHelper.prepareTests(configFile);

const verbose = true;

describe('UserManagementV1_integration', () => {
  jest.setTimeout(timeout);

  let userManagementService;
  let userManagementAdminService;

  let userId;

  let accountId;
  let iamUserId;
  let invitedUserEmail;
  let viewerRoleId;
  let accessGroupId;

  beforeAll(async () => {
    log('Starting setup...');

    userManagementService = UserManagementV1.newInstance({
      serviceName: UserManagementV1.DEFAULT_SERVICE_NAME,
    });
    userManagementAdminService = UserManagementV1.newInstance({
      serviceName: 'USER_MANAGEMENT_ADMIN',
    });
    expect(userManagementService).not.toBeNull();
    expect(userManagementAdminService).not.toBeNull();

    const config = readExternalSources(UserManagementV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    accountId = config.accountId;
    iamUserId = config.userId;
    invitedUserEmail = config.memberEmail;
    viewerRoleId = config.viewerRoleId;
    accessGroupId = config.accessGroupId;
    expect(accountId).not.toBeNull();
    expect(iamUserId).not.toBeNull();
    expect(invitedUserEmail).not.toBeNull();
    expect(viewerRoleId).not.toBeNull();
    expect(accessGroupId).not.toBeNull();

    log('Finished setup.');
  });

  test('getUserSettings()', async () => {
    const params = {
      accountId,
      iamId: iamUserId,
    };

    const res = await userManagementService.getUserSettings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('updateUserSettings()', async () => {
    const params = {
      accountId,
      iamId: iamUserId,
      language: 'French',
      notificationLanguage: 'English',
      allowedIpAddresses: '32.96.110.50,172.16.254.1',
      selfManage: true,
    };

    const res = await userManagementService.updateUserSettings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('listUsers()', async () => {
    const results = [];
    let start = null;

    do {
      // Retrieve the users, 10 per page to test out pagination.
      const params = {
        accountId,
        limit: 10,
        start,
      };

      const res = await userManagementService.listUsers(params);
      expect(res).toBeDefined();
      expect(res.status).toEqual(200);

      const { result } = res;
      expect(result).toBeDefined();

      // Add the just-retrieved page to "results".
      expect(result.resources).toBeDefined();
      results.push(...result.resources);

      // Determine the offset to use to get the next page.
      if (result.next_url) {
        start = getQueryParam(result.next_url, '_start');
      } else {
        start = null;
      }
    } while (start != null);

    // Make sure we found some users.
    const numUsers = results.length;
    console.log(`listUsers() response contained ${numUsers} total users`);
    expect(numUsers).toBeGreaterThan(0);
  });
  test('listUsers() via IncludeSettings', async () => {
    const results = [];
    let start = null;

    do {
      // Retrieve the users, 10 per page to test out pagination.
      const params = {
        accountId,
        limit: 10,
        start,
        includeSettings: true,
      };

      const res = await userManagementService.listUsers(params);
      expect(res).toBeDefined();
      expect(res.status).toEqual(200);

      const { result } = res;
      expect(result).toBeDefined();

      // Add the just-retrieved page to "results".
      expect(result.resources).toBeDefined();
      results.push(...result.resources);

      // Determine the offset to use to get the next page.
      if (result.next_url) {
        start = getQueryParam(result.next_url, '_start');
      } else {
        start = null;
      }
    } while (start != null);

    // Make sure we found some users.
    const numUsers = results.length;
    console.log(`listUsers() response contained ${numUsers} total users`);
    expect(numUsers).toBeGreaterThan(0);
  });
  test('listUsers() via Search', async () => {
    const results = [];
    let start = null;

    do {
      // Retrieve the users, 10 per page to test out pagination.
      const params = {
        accountId,
        limit: 10,
        start,
        search: 'state:ACTIVE',
      };

      const res = await userManagementService.listUsers(params);
      expect(res).toBeDefined();
      expect(res.status).toEqual(200);

      const { result } = res;
      expect(result).toBeDefined();

      // Add the just-retrieved page to "results".
      expect(result.resources).toBeDefined();
      results.push(...result.resources);

      // Determine the offset to use to get the next page.
      if (result.next_url) {
        start = getQueryParam(result.next_url, '_start');
      } else {
        start = null;
      }
    } while (start != null);

    // Make sure we found some users.
    const numUsers = results.length;
    console.log(`listUsers() response contained ${numUsers} total users`);
    expect(numUsers).toBeGreaterThan(0);
  });
  test('listUsers() via UsersPager', async () => {
    const params = {
      accountId,
    };

    const allResults = [];

    // Test getNext().
    let pager = new UserManagementV1.UsersPager(userManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new UserManagementV1.UsersPager(userManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });
  test('inviteUsers()', async () => {
    // Request models needed by this operation.

    // InviteUser
    const inviteUserModel = {
      email: invitedUserEmail,
      account_role: 'Member',
    };

    // Role
    const roleModel = {
      role_id: viewerRoleId,
    };

    // Attribute
    const attributeModel = {
      name: 'accountId',
      value: accountId,
    };

    // Attribute
    const attributeModel2 = {
      name: 'resourceGroupId',
      value: '*',
    };

    // Resource
    const resourceModel = {
      attributes: [attributeModel, attributeModel2],
    };

    // InviteUserIamPolicy
    const inviteUserIamPolicyModel = {
      type: 'access',
      roles: [roleModel],
      resources: [resourceModel],
    };

    const params = {
      accountId,
      users: [inviteUserModel],
      iamPolicy: [inviteUserIamPolicyModel],
      accessGroups: [accessGroupId],
    };

    const res = await userManagementAdminService.inviteUsers(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();

    userId = res.result.resources[0].id;
  });
  test('getUserProfile()', async () => {
    const params = {
      accountId,
      iamId: iamUserId,
    };

    const res = await userManagementService.getUserProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
  test('updateUserProfile()', async () => {
    const params = {
      accountId,
      iamId: iamUserId,
      firstname: 'John',
      lastname: 'Doe',
      state: 'ACTIVE',
      email: 'do_not_delete_user_without_iam_policy_stage@mail.test.ibm.com',
    };

    const res = await userManagementService.updateUserProfile(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
  test('removeUser()', async () => {
    const params = {
      accountId,
      iamId: userId,
    };

    const res = await userManagementService.removeUser(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});

function log(msg) {
  if (verbose) {
    console.log(msg);
  }
}
