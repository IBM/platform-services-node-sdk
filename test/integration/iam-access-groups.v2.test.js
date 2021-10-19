/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

const { readExternalSources } = require('ibm-cloud-sdk-core');
const IamAccessGroupsV2 = require('../../dist/iam-access-groups/v2');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (25s).
const timeout = 25000;

// Location of our config file.
const configFile = 'iam_access_groups.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

describe('IamAccessGroupsV2_integration', () => {
  jest.setTimeout(timeout);

  let service;
  let config;
  let testAccountId;
  const testGroupName = 'SDK Test Group - Node';
  const testGroupDescription =
    'This group is used for integration test purposes. It can be deleted at any time.';
  let testGroupETag;
  let testGroupId;
  const testUserId = `IBMid-${Math.floor(Math.random() * 100000)}`;
  const userType = 'user';
  let testClaimRuleId;
  let testClaimRuleETag;
  let testAccountSettings;

  test('should successfully complete initialization', (done) => {
    // Initialize the service client.
    service = IamAccessGroupsV2.newInstance();

    // Grab our test-specific config properties.
    config = readExternalSources(IamAccessGroupsV2.DEFAULT_SERVICE_NAME);

    expect(service).not.toBeNull();
    expect(config).not.toBeNull();
    expect(config).toHaveProperty('testAccountId');

    // Retrieve the test account id to be used with the tests.
    testAccountId = config.testAccountId;

    expect(testAccountId).not.toBeNull();
    done();
  });

  test('Create an access group', async () => {
    const params = {
      accountId: testAccountId,
      name: testGroupName,
    };

    let response;
    try {
      response = await service.createAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);
    expect(result.name).toEqual(testGroupName);

    testGroupId = result.id;
  });

  test('Get an access group', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
    };

    let response;
    try {
      response = await service.getAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);
    expect(result.id).toEqual(testGroupId);
    expect(result.name).toEqual(testGroupName);
    expect(result.description).toEqual('');

    testGroupETag = response.headers.etag;
  });

  test('Update an access group', async () => {
    expect(testGroupId).toBeDefined();
    expect(testGroupETag).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
      ifMatch: testGroupETag,
      description: testGroupDescription,
    };

    let response;
    try {
      response = await service.updateAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);
    expect(result.id).toEqual(testGroupId);
    expect(result.name).toEqual(testGroupName);
    expect(result.description).toEqual(testGroupDescription);
  });

  test('List access groups', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accountId: testAccountId,
      hidePublicAccess: true,
    };

    let response;
    try {
      response = await service.listAccessGroups(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();

    // Confirm the test group is present
    let foundTestGroup = false;
    let group;
    for (group of result.groups) {
      if (group.id === testGroupId) {
        foundTestGroup = true;
        break;
      }
    }
    expect(foundTestGroup).toBeTruthy();
  });

  test('Add members to an access group', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
      members: [
        {
          iam_id: testUserId,
          type: userType,
        },
      ],
    };

    let response;
    try {
      response = await service.addMembersToAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(207);
    const { result } = response || {};
    expect(result).toBeDefined();

    // Confirm the test user is present
    let foundTestUser = false;
    let member;
    for (member of result.members) {
      if (member.iam_id === testUserId) {
        foundTestUser = true;
        expect(member.type).toEqual(userType);
        expect(member.status_code).toEqual(200);
        break;
      }
    }
    expect(foundTestUser).toBeTruthy();
  });

  test('Add member to multiple access groups', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accountId: testAccountId,
      iamId: testUserId,
      type: userType,
      groups: [testGroupId],
    };

    let response;
    try {
      response = await service.addMemberToMultipleAccessGroups(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(207);
    const { result } = response || {};
    expect(result).toBeDefined();

    // Confirm the test group is present
    let foundTestGroup = false;
    let group;
    for (group of result.groups) {
      if (group.access_group_id === testGroupId) {
        foundTestGroup = true;
        expect(group.status_code).toEqual(200);
        break;
      }
    }
    expect(foundTestGroup).toBeTruthy();
  });

  test('Check access group membership', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
      iamId: testUserId,
    };

    let response;
    try {
      response = await service.isMemberOfAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);
  });

  test('List access group memberships', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
    };

    let response;
    try {
      response = await service.listAccessGroupMembers(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();

    // Confirm the test user is present
    let foundTestUser = false;
    let member;
    for (member of result.members) {
      if (member.iam_id === testUserId) {
        foundTestUser = true;
        break;
      }
    }
    expect(foundTestUser).toBeTruthy();
  });

  test('Delete access group membership', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
      iamId: testUserId,
    };

    let response;
    try {
      response = await service.removeMemberFromAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);
  });

  test('Delete member from all groups', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accountId: testAccountId,
      iamId: testUserId,
    };

    try {
      await service.removeMemberFromAllAccessGroups(params);
    } catch (err) {
      expect(err.status).toEqual(404);
      expect(err.message).toContain(testUserId);
    }
  });

  test('Delete multiple members from an access group', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
      members: [testUserId],
    };

    try {
      await service.removeMembersFromAccessGroup(params);
    } catch (err) {
      expect(err.status).toEqual(404);
      expect(err.message).toContain(testGroupId);
    }
  });

  test('Create an access group rule', async () => {
    expect(testGroupId).toBeDefined();

    const testExpiration = 24;

    const params = {
      accessGroupId: testGroupId,
      expiration: testExpiration,
      realmName: 'test realm name',
      conditions: [
        {
          claim: 'test claim',
          operator: 'EQUALS',
          value: '1',
        },
      ],
    };

    let response;
    try {
      response = await service.addAccessGroupRule(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);
    expect(result.access_group_id).toEqual(testGroupId);
    expect(result.expiration).toEqual(testExpiration);

    testClaimRuleId = result.id;
  });

  test('Get an access group rule', async () => {
    expect(testGroupId).toBeDefined();
    expect(testClaimRuleId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
      ruleId: testClaimRuleId,
    };

    let response;
    try {
      response = await service.getAccessGroupRule(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);
    expect(result.access_group_id).toEqual(testGroupId);
    expect(result.id).toEqual(testClaimRuleId);

    testClaimRuleETag = response.headers.etag;
  });

  test('List access group rules', async () => {
    expect(testGroupId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
    };

    let response;
    try {
      response = await service.listAccessGroupRules(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();

    // Confirm the test rule is present
    let foundTestClaimRule = false;
    let rule;
    for (rule of result.rules) {
      if (rule.id === testClaimRuleId) {
        foundTestClaimRule = true;
        break;
      }
    }
    expect(foundTestClaimRule).toBeTruthy();
  });

  test('Update an access group rule', async () => {
    expect(testGroupId).toBeDefined();
    expect(testClaimRuleId).toBeDefined();

    const testExpiration = 24;

    const params = {
      accessGroupId: testGroupId,
      ruleId: testClaimRuleId,
      ifMatch: testClaimRuleETag,
      expiration: testExpiration,
      realmName: 'updated test realm name',
      conditions: [
        {
          claim: 'test claim',
          operator: 'EQUALS',
          value: '1',
        },
      ],
    };

    let response;
    try {
      response = await service.replaceAccessGroupRule(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);
    expect(result.access_group_id).toEqual(testGroupId);
    expect(result.id).toEqual(testClaimRuleId);
  });

  test('Delete an access group rule', async () => {
    expect(testGroupId).toBeDefined();
    expect(testClaimRuleId).toBeDefined();

    const params = {
      accessGroupId: testGroupId,
      ruleId: testClaimRuleId,
    };

    let response;
    try {
      response = await service.removeAccessGroupRule(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);
  });

  test('Get account settings', async () => {
    const params = {
      accountId: testAccountId,
    };

    let response;
    try {
      response = await service.getAccountSettings(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);

    testAccountSettings = result;
  });

  test('Update account settings', async () => {
    const params = {
      accountId: testAccountId,
      publicAccessEnabled: testAccountSettings.public_access_enabled,
    };

    let response;
    try {
      response = await service.updateAccountSettings(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.account_id).toEqual(testAccountId);
    expect(result.public_access_enabled).toEqual(testAccountSettings.public_access_enabled);
  });

  test('Clean up all test groups', async () => {
    // List all groups in the account (minus the public access group)
    const params = {
      accountId: testAccountId,
      hidePublicAccess: true,
    };

    let response;
    try {
      response = await service.listAccessGroups(params);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    const { result } = response || {};
    expect(result).toBeDefined();

    // Iterate across the groups
    let group;
    for (group of result.groups) {
      // Force delete the test group (or any test groups older than 5 minutes)
      if (group.name === testGroupName) {
        const createdAt = Date.parse(group.created_at);
        const FIVE_MINUTES = 5 * 60 * 1000;
        const fiveMinutesAgo = Date.now() - FIVE_MINUTES;

        if (group.id === testGroupId || createdAt < fiveMinutesAgo) {
          const params = {
            accessGroupId: group.id,
            force: true,
          };

          let response;
          try {
            response = await service.deleteAccessGroup(params);
          } catch (err) {
            console.warn(err);
          }

          expect(response).toBeDefined();
          expect(response.status).toEqual(204);
        }
      }
    }
  });
});
