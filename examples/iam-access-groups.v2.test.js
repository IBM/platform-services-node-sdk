/**
 * @jest-environment node
 */
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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const IamAccessGroupsV2 = require('../dist/iam-access-groups/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the iam-access-groups service.
//
// The following configuration properties are assumed to be defined:
//
// IAM_ACCESS_GROUPS_URL=<service url>
// IAM_ACCESS_GROUPS_AUTHTYPE=iam
// IAM_ACCESS_GROUPS_APIKEY=<your iam apikey>
// IAM_ACCESS_GROUPS_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// IAM_ACCESS_GROUPS_TEST_ACCOUNT_ID=<id of an account used for testing>
// IAM_ACCESS_GROUPS_TEST_PROFILE_ID=<id of an profile used for testing which exists in the account>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'iam_access_groups_v2.env';

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
  let profileId = config.testProfileId
  let testGroupETag;
  let testGroupId;
  let testClaimRuleId;
  let testClaimRuleETag;
  let testPolicyTemplateId = config.testPolicyTemplateId;
  let testTemplateId;
  let testTemplateEtag;
  let testAccountGroupId = config.testAccountGroupId;
  let testAssignmentId;
  let testAssignmentEtag;

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
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccessGroups() result:');
    // begin-list_access_groups

    const params = {
      accountId: testAccountId,
    };

    const allResults = [];
    try {
      const pager = new IamAccessGroupsV2.AccessGroupsPager(iamAccessGroupsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
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
    var groupMember3 = {
      iam_id: profileId,
      type: 'profile',
    }

    const params = {
      accessGroupId: testGroupId,
      members: [groupMember1, groupMember2, groupMember3],
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
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccessGroupMembers() result:');
    // begin-list_access_group_members

    const params = {
      accessGroupId: testGroupId,
    };

    const allResults = [];
    try {
      const pager = new IamAccessGroupsV2.AccessGroupMembersPager(iamAccessGroupsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
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
      members: [profileId]
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
      realmName: 'https://idp.example.org/SAML2a',
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

  test('createTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createTemplate() result:');
    // begin-create_template

    // Request models needed by this operation.

    // MembersActionControls
    const membersActionControlsModel = {
      add: true,
      remove: false,
    };

    // MembersInput
    const membersInputModel = {
      users: ['IBMid-50PJGPKYJJ', 'IBMid-665000T8WY'],
      action_controls: membersActionControlsModel,
    };

    // ConditionInput
    const conditionInputModel = {
      claim: 'blueGroup',
      operator: 'CONTAINS',
      value: '\"test-bluegroup-saml\"',
    };

    // RulesActionControls
    const rulesActionControlsModel = {
      remove: false,
      update: false,
    };

    // RuleInput
    const ruleInputModel = {
      name: 'Manager group rule',
      expiration: 12,
      realm_name: 'https://idp.example.org/SAML2',
      conditions: [conditionInputModel],
      action_controls: rulesActionControlsModel,
    };

    // AssertionsActionControls
    const assertionsActionControlsModel = {
      add: false,
      remove: true,
      update: true,
    };

    // AssertionsInput
    const assertionsInputModel = {
      rules: [ruleInputModel],
      action_controls: assertionsActionControlsModel,
    };

    // AccessActionControls
    const accessActionControlsModel = {
      add: false,
    };

    // GroupActionControls
    const groupActionControlsModel = {
      access: accessActionControlsModel,
    };

    // AccessGroupInput
    const accessGroupInputModel = {
      name: 'IAM Admin Group',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      members: membersInputModel,
      assertions: assertionsInputModel,
      action_controls: groupActionControlsModel,
    };

    // PolicyTemplatesInput
    const policyTemplatesInputModel = {
      id: testPolicyTemplateId,
      version: '1',
    };

    const params = {
      name: 'IAM Admin Group template',
      accountId: testAccountId,
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      group: accessGroupInputModel,
      policyTemplateReferences: [policyTemplatesInputModel],
    };

    let res;
    try {
      res = await iamAccessGroupsService.createTemplate(params);
      testTemplateId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_template
  });

  test('listTemplates request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTemplates() result:');
    // begin-list_templates

    const params = {
      accountId: testAccountId,
      transactionId: 'testString',
      limit: 50,
    };

    const allResults = [];
    try {
      const pager = new IamAccessGroupsV2.TemplatesPager(iamAccessGroupsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_templates
  });

  test('createTemplateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createTemplateVersion() result:');
    // begin-create_template_version

    // Request models needed by this operation.

    // MembersActionControls
    const membersActionControlsModel = {
      add: true,
      remove: false,
    };

    // MembersInput
    const membersInputModel = {
      users: ['IBMid-50PJGPKYJJ', 'IBMid-665000T8WY'],
      action_controls: membersActionControlsModel,
    };

    // ConditionInput
    const conditionInputModel = {
      claim: 'blueGroup',
      operator: 'CONTAINS',
      value: '\"test-bluegroup-saml\"',
    };

    // RuleInput
    const ruleInputModel = {
      name: 'Manager group rule',
      expiration: 12,
      realm_name: 'https://idp.example.org/SAML2',
      conditions: [conditionInputModel],
    };

    // AssertionsActionControls
    const assertionsActionControlsModel = {
      add: false,
    };

    // AssertionsInput
    const assertionsInputModel = {
      rules: [ruleInputModel],
      action_controls: assertionsActionControlsModel,
    };

    // AccessActionControls
    const accessActionControlsModel = {
      add: false,
    };

    // GroupActionControls
    const groupActionControlsModel = {
      access: accessActionControlsModel,
    };

    // AccessGroupInput
    const accessGroupInputModel = {
      name: 'IAM Admin Group 8',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      members: membersInputModel,
      assertions: assertionsInputModel,
      action_controls: groupActionControlsModel,
    };

    // PolicyTemplatesInput
    const policyTemplatesInputModel = {
      id: testPolicyTemplateId,
      version: '1',
    };

    const params = {
      templateId: testTemplateId,
      name: 'IAM Admin Group template 2',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      group: accessGroupInputModel,
      policyTemplateReferences: [policyTemplatesInputModel],
    };

    let res;
    try {
      res = await iamAccessGroupsService.createTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_template_version
  });

  test('listTemplateVersions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTemplateVersions() result:');
    // begin-list_template_versions

    const params = {
      templateId: testTemplateId,
      limit: 100,
    };

    const allResults = [];
    try {
      const pager = new IamAccessGroupsV2.TemplateVersionsPager(iamAccessGroupsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_template_versions
  });

  test('getTemplateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getTemplateVersion() result:');
    // begin-get_template_version

    const params = {
      templateId: testTemplateId,
      versionNum: '1',
    };

    let res;
    try {
      res = await iamAccessGroupsService.getTemplateVersion(params);
      testTemplateEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_template_version
  });

  test('updateTemplateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateTemplateVersion() result:');
    // begin-update_template_version

    // Request models needed by this operation.

    // MembersActionControls
    const membersActionControlsModel = {
      add: true,
      remove: false,
    };

    // MembersInput
    const membersInputModel = {
      users: ['IBMid-665000T8WY'],
      action_controls: membersActionControlsModel,
    };

    // ConditionInput
    const conditionInputModel = {
      claim: 'blueGroup',
      operator: 'CONTAINS',
      value: '\"test-bluegroup-saml\"',
    };

    // RulesActionControls
    const rulesActionControlsModel = {
      remove: false,
      update: false,
    };

    // RuleInput
    const ruleInputModel = {
      name: 'Manager group rule',
      expiration: 12,
      realm_name: 'https://idp.example.org/SAML2',
      conditions: [conditionInputModel],
      action_controls: rulesActionControlsModel,
    };

    // AssertionsActionControls
    const assertionsActionControlsModel = {
      add: false,
    };

    // AssertionsInput
    const assertionsInputModel = {
      rules: [ruleInputModel],
      action_controls: assertionsActionControlsModel,
    };

    // AccessActionControls
    const accessActionControlsModel = {
      add: false,
    };

    // GroupActionControls
    const groupActionControlsModel = {
      access: accessActionControlsModel,
    };

    // AccessGroupInput
    const accessGroupInputModel = {
      name: 'IAM Admin Group 8',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      members: membersInputModel,
      assertions: assertionsInputModel,
      action_controls: groupActionControlsModel,
    };

    // PolicyTemplatesInput
    const policyTemplatesInputModel = {
      id: testPolicyTemplateId,
      version: '1',
    };

    const params = {
      templateId: testTemplateId,
      versionNum: '1',
      ifMatch: testTemplateEtag,
      name: 'IAM Admin Group template 2',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      group: accessGroupInputModel,
      policyTemplateReferences: [policyTemplatesInputModel],
      transactionId: '83adf5bd-de790caa3',
    };

    let res;
    try {
      res = await iamAccessGroupsService.updateTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_template_version
  });

  test('getLatestTemplateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getLatestTemplateVersion() result:');
    // begin-get_latest_template_version

    const params = {
      templateId: testTemplateId,
    };

    let res;
    try {
      res = await iamAccessGroupsService.getLatestTemplateVersion(params);
      testTemplateEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_latest_template_version
  });

  test('commitTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-commit_template

    const params = {
      templateId: testTemplateId,
      versionNum: '2',
      ifMatch: testTemplateEtag,
    };

    try {
      await iamAccessGroupsService.commitTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-commit_template
  });

  test('createAssignment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createAssignment() result:');
    // begin-create_assignment

    const params = {
      templateId: testTemplateId,
      templateVersion: '2',
      targetType: 'AccountGroup',
      target: testAccountGroupId,
    };

    let res;
    try {
      res = await iamAccessGroupsService.createAssignment(params);
      testAssignmentId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_assignment
    await new Promise((r) => setTimeout(r, 60000));
  }, 70000);


  test('listAssignments request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAssignments() result:');
    // begin-list_assignments

    const params = {
      accountId: testAccountId,
    };

    let res;
    try {
      res = await iamAccessGroupsService.listAssignments(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_assignments
  });

  test('getAssignment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAssignment() result:');
    // begin-get_assignment

    const params = {
      assignmentId: testAssignmentId,
    };

    let res;
    try {
      res = await iamAccessGroupsService.getAssignment(params);
      testAssignmentEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_assignment
  });

  test('updateAssignment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateAssignment() result:');
    await new Promise((r) => setTimeout(r, 60000));
    // begin-update_assignment

    const params = {
      assignmentId: testAssignmentId,
      ifMatch: testAssignmentEtag,
      templateVersion: "2",
    };

    let res;
    try {
      res = await iamAccessGroupsService.updateAssignment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_assignment
  }, 70000);

  test('deleteAssignment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    await new Promise((r) => setTimeout(r, 60000));
    // begin-delete_assignment

    const params = {
      assignmentId: testAssignmentId,
    };

    try {
      await iamAccessGroupsService.deleteAssignment(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_assignment
  }, 70000);

  test('deleteTemplateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_template_version

    const params = {
      templateId: testTemplateId,
      versionNum: '1',
    };

    try {
      await iamAccessGroupsService.deleteTemplateVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_template_version
    await new Promise((r) => setTimeout(r, 60000));
  }, 70000);

  test('deleteTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    await new Promise((r) => setTimeout(r, 60000));

    // begin-delete_template

    const params = {
      templateId: testTemplateId,
    };

    try {
      await iamAccessGroupsService.deleteTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_template
  }, 70000);
});
