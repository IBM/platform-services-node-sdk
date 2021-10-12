/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2020.
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

const IamAccessGroupsV2 = require('../dist/iam-access-groups/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the IAM Access Groups service.
//
// The following configuration properties are assumed to be defined:
//
// IAM_ACCESS_GROUPS_URL=<service url>
// IAM_ACCESS_GROUPS_AUTHTYPE=iam
// IAM_ACCESS_GROUPS_APIKEY=<your iam apikey>
// IAM_ACCESS_GROUPS_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// IAM_ACCESS_GROUPS_TEST_ACCOUNT_ID=<id of an account used for testing>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'iam_access_groups.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('IamAccessGroupsV2', () => {

  // begin-common

  const iamAccessGroupsService = IamAccessGroupsV2.newInstance({});

  // end-common

  const config = readExternalSources(IamAccessGroupsV2.DEFAULT_SERVICE_NAME);

  let testAccountId = config.testAccountId;

  let testGroupETag;
  let testGroupId;
  let testClaimRuleId;
  let testClaimRuleETag;

  test('createAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createAccessGroup() result:');
    // begin-create_access_group

    const params = {
      accountId: testAccountId,
      name: 'Managers',
      description: 'Group for managers'
    };

    try {
      const res = await iamAccessGroupsService.createAccessGroup(params);
      testGroupId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_access_group
  });
  test('getAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getAccessGroup() result:');
    // begin-get_access_group

    const params = {
      accessGroupId: testGroupId,
    };

    try {
      const res = await iamAccessGroupsService.getAccessGroup(params);
      testGroupETag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_access_group
  });
  test('updateAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('updateAccessGroup() result:');
    // begin-update_access_group

    const params = {
      accessGroupId: testGroupId,
      ifMatch: testGroupETag,
      name: 'Awesome Managers',
      description: 'Group for awesome managers'
    };

    try {
      const res = await iamAccessGroupsService.updateAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_access_group
  });
  test('listAccessGroups request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listAccessGroups() result:');
    // begin-list_access_groups

    const params = {
      accountId: testAccountId,
    };

    try {
      const res = await iamAccessGroupsService.listAccessGroups(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_access_groups
  });
  test('addMembersToAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('addMembersToAccessGroup() result:');
    // begin-add_members_to_access_group

    const groupMember1 = {
      iam_id: 'IBMid-user1',
      type: 'user',
    };
    const groupMember2 = {
      iam_id: 'iam-ServiceId-123',
      type: 'service',
    };
    const params = {
      accessGroupId: testGroupId,
      members: [groupMember1, groupMember2],
    };

    try {
      const res = await iamAccessGroupsService.addMembersToAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_members_to_access_group
  });
  test('isMemberOfAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-is_member_of_access_group

    const params = {
      accessGroupId: testGroupId,
      iamId: 'IBMid-user1',
    };

    try {
      await iamAccessGroupsService.isMemberOfAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-is_member_of_access_group
  });
  test('listAccessGroupMembers request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listAccessGroupMembers() result:');
    // begin-list_access_group_members

    const params = {
      accessGroupId: testGroupId,
    };

    try {
      const res = await iamAccessGroupsService.listAccessGroupMembers(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_access_group_members
  });
  test('removeMemberFromAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-remove_member_from_access_group

    const params = {
      accessGroupId: testGroupId,
      iamId: 'IBMid-user1',
    };

    try {
      await iamAccessGroupsService.removeMemberFromAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-remove_member_from_access_group
  });
  test('removeMembersFromAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('removeMembersFromAccessGroup() result:');
    // begin-remove_members_from_access_group

    const params = {
      accessGroupId: testGroupId,
      members: ['iam-ServiceId-123']
    };

    try {
      const res = await iamAccessGroupsService.removeMembersFromAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-remove_members_from_access_group
  });
  test('addMemberToMultipleAccessGroups request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('addMemberToMultipleAccessGroups() result:');
    // begin-add_member_to_multiple_access_groups

    const params = {
      accountId: testAccountId,
      iamId: 'IBMid-user1',
      type: 'user',
      groups: [testGroupId]
    };

    try {
      const res = await iamAccessGroupsService.addMemberToMultipleAccessGroups(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_member_to_multiple_access_groups
  });
  test('removeMemberFromAllAccessGroups request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('removeMemberFromAllAccessGroups() result:');
    // begin-remove_member_from_all_access_groups

    const params = {
      accountId: testAccountId,
      iamId: 'IBMid-user1',
    };

    try {
      const res = await iamAccessGroupsService.removeMemberFromAllAccessGroups(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-remove_member_from_all_access_groups
  });
  test('addAccessGroupRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('addAccessGroupRule() result:');
    // begin-add_access_group_rule

    const params = {
      accessGroupId: testGroupId,
      name: 'Manager group rule',
      expiration: 12,
      realmName: 'https://idp.example.org/SAML2',
      conditions: [
        {
          claim: 'isManager',
          operator: 'EQUALS',
          value: 'true',
        },
      ],
    };

    try {
      const res = await iamAccessGroupsService.addAccessGroupRule(params);
      testClaimRuleId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_access_group_rule
  });
  test('getAccessGroupRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getAccessGroupRule() result:');
    // begin-get_access_group_rule

    const params = {
      accessGroupId: testGroupId,
      ruleId: testClaimRuleId,
    };

    try {
      const res = await iamAccessGroupsService.getAccessGroupRule(params);
      testClaimRuleETag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_access_group_rule
  });
  test('replaceAccessGroupRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('replaceAccessGroupRule() result:');
    // begin-replace_access_group_rule

    const params = {
      accessGroupId: testGroupId,
      ruleId: testClaimRuleId,
      ifMatch: testClaimRuleETag,
      name: 'Manager group rule',
      expiration: 24,
      realmName: 'https://idp.example.org/SAML2',
      conditions: [
        {
          claim: 'isManager',
          operator: 'EQUALS',
          value: 'true',
        },
      ]
    };

    try {
      const res = await iamAccessGroupsService.replaceAccessGroupRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_access_group_rule
  });
  test('listAccessGroupRules request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listAccessGroupRules() result:');
    // begin-list_access_group_rules

    const params = {
      accessGroupId: testGroupId,
    };

    try {
      const res = await iamAccessGroupsService.listAccessGroupRules(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_access_group_rules
  });
  test('removeAccessGroupRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-remove_access_group_rule

    const params = {
      accessGroupId: testGroupId,
      ruleId: testClaimRuleId,
    };

    try {
      await iamAccessGroupsService.removeAccessGroupRule(params);
    } catch (err) {
      console.warn(err);
    }

    // end-remove_access_group_rule
  });
  test('getAccountSettings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getAccountSettings() result:');
    // begin-get_account_settings

    const params = {
      accountId: testAccountId,
    };

    try {
      const res = await iamAccessGroupsService.getAccountSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_account_settings
  });
  test('updateAccountSettings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('updateAccountSettings() result:');
    // begin-update_account_settings

    const params = {
      accountId: testAccountId,
      publicAccessEnabled: true,
    };

    try {
      const res = await iamAccessGroupsService.updateAccountSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_account_settings
  });
  test('deleteAccessGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-delete_access_group

    const params = {
      accessGroupId: testGroupId,
    };

    try {
      await iamAccessGroupsService.deleteAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_access_group
  });
});
