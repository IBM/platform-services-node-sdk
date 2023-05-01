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
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the iam-access-groups service.
//
// The following configuration properties are assumed to be defined:
// IAM_ACCESS_GROUPS_URL=<service base url>
// IAM_ACCESS_GROUPS_AUTH_TYPE=iam
// IAM_ACCESS_GROUPS_APIKEY=<IAM apikey>
// IAM_ACCESS_GROUPS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'iam_access_groups_v2.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('IamAccessGroupsV2', () => {
  // Service instance
  let iamAccessGroupsService;

  // Variables to hold link values
  let accessGroupETagLink;
  let accessGroupIdLink;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(IamAccessGroupsV2.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    iamAccessGroupsService = IamAccessGroupsV2.newInstance();

    // end-common
  });

  test('createAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createAccessGroup() result:');
    // begin-create_access_group

    const params = {
      accountId: 'testString',
      name: 'Managers',
      description: 'Group for managers',
    };

    let res;
    try {
      res = await iamAccessGroupsService.createAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_access_group
    const responseBody = res.result;
    accessGroupIdLink = responseBody.id;
  });

  test('getAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAccessGroup() result:');
    // begin-get_access_group

    const params = {
      accessGroupId: accessGroupIdLink,
    };

    let res;
    try {
      res = await iamAccessGroupsService.getAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_access_group
    const responseBody = res.result;
    accessGroupETagLink = res.headers['etag'];
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
      accountId: 'testString',
      transactionId: 'testString',
      iamId: 'testString',
      search: 'testString',
      membershipType: 'static',
      limit: 10,
      sort: 'name',
      showFederated: false,
      hidePublicAccess: false,
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

  test('updateAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateAccessGroup() result:');
    // begin-update_access_group

    const params = {
      accessGroupId: accessGroupIdLink,
      ifMatch: accessGroupETagLink,
      name: 'Awesome Managers',
      description: 'Group for awesome managers.',
    };

    let res;
    try {
      res = await iamAccessGroupsService.updateAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_access_group
  });

  test('isMemberOfAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-is_member_of_access_group

    const params = {
      accessGroupId: accessGroupIdLink,
      iamId: 'testString',
    };

    try {
      await iamAccessGroupsService.isMemberOfAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-is_member_of_access_group
  });

  test('addMembersToAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addMembersToAccessGroup() result:');
    // begin-add_members_to_access_group

    // Request models needed by this operation.

    // AddGroupMembersRequestMembersItem
    const addGroupMembersRequestMembersItemModel = {
      iam_id: 'IBMid-user1',
      type: 'user',
    };

    const params = {
      accessGroupId: accessGroupIdLink,
      members: [addGroupMembersRequestMembersItemModel],
    };

    let res;
    try {
      res = await iamAccessGroupsService.addMembersToAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_members_to_access_group
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
      accessGroupId: accessGroupIdLink,
      transactionId: 'testString',
      membershipType: 'static',
      limit: 10,
      type: 'testString',
      verbose: false,
      sort: 'testString',
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

  test('removeMembersFromAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('removeMembersFromAccessGroup() result:');
    // begin-remove_members_from_access_group

    const params = {
      accessGroupId: accessGroupIdLink,
      members: ['IBMId-user1', 'iam-ServiceId-123', 'iam-Profile-123'],
    };

    let res;
    try {
      res = await iamAccessGroupsService.removeMembersFromAccessGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-remove_members_from_access_group
  });

  test('addMemberToMultipleAccessGroups request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addMemberToMultipleAccessGroups() result:');
    // begin-add_member_to_multiple_access_groups

    const params = {
      accountId: 'testString',
      iamId: 'testString',
      type: 'user',
      groups: ['access-group-id-1'],
    };

    let res;
    try {
      res = await iamAccessGroupsService.addMemberToMultipleAccessGroups(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_member_to_multiple_access_groups
  });

  test('addAccessGroupRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addAccessGroupRule() result:');
    // begin-add_access_group_rule

    // Request models needed by this operation.

    // RuleConditions
    const ruleConditionsModel = {
      claim: 'isManager',
      operator: 'EQUALS',
      value: 'true',
    };

    const params = {
      accessGroupId: accessGroupIdLink,
      expiration: 12,
      realmName: 'https://idp.example.org/SAML2',
      conditions: [ruleConditionsModel],
      name: 'Manager group rule',
    };

    let res;
    try {
      res = await iamAccessGroupsService.addAccessGroupRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_access_group_rule
  });

  test('listAccessGroupRules request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccessGroupRules() result:');
    // begin-list_access_group_rules

    const params = {
      accessGroupId: accessGroupIdLink,
    };

    let res;
    try {
      res = await iamAccessGroupsService.listAccessGroupRules(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_access_group_rules
  });

  test('getAccessGroupRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAccessGroupRule() result:');
    // begin-get_access_group_rule

    const params = {
      accessGroupId: accessGroupIdLink,
      ruleId: 'testString',
    };

    let res;
    try {
      res = await iamAccessGroupsService.getAccessGroupRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_access_group_rule
  });

  test('replaceAccessGroupRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceAccessGroupRule() result:');
    // begin-replace_access_group_rule

    // Request models needed by this operation.

    // RuleConditions
    const ruleConditionsModel = {
      claim: 'isManager',
      operator: 'EQUALS',
      value: 'true',
    };

    const params = {
      accessGroupId: accessGroupIdLink,
      ruleId: 'testString',
      ifMatch: 'testString',
      expiration: 12,
      realmName: 'https://idp.example.org/SAML2',
      conditions: [ruleConditionsModel],
      name: 'Manager group rule',
    };

    let res;
    try {
      res = await iamAccessGroupsService.replaceAccessGroupRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_access_group_rule
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
      users: ['IBMid-123', 'IBMid-234'],
      action_controls: membersActionControlsModel,
    };

    // ConditionInput
    const conditionInputModel = {
      claim: 'blueGroup',
      operator: 'CONTAINS',
      value: 'test-bluegroup-saml',
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

    // AccessGroupActionControls
    const accessGroupActionControlsModel = {
      access: accessActionControlsModel,
    };

    // AccessGroupInput
    const accessGroupInputModel = {
      name: 'IAM Admin Group',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      members: membersInputModel,
      assertions: assertionsInputModel,
      action_controls: accessGroupActionControlsModel,
    };

    // PolicyTemplatesInput
    const policyTemplatesInputModel = {
      id: 'policyTemplateId-123',
      version: '1',
    };

    const params = {
      name: 'IAM Admin Group template',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      accountId: 'accountID-123',
      accessGroup: accessGroupInputModel,
      policyTemplateReferences: [policyTemplatesInputModel],
    };

    let res;
    try {
      res = await iamAccessGroupsService.createTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_template
  });

  test('listTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTemplate() result:');
    // begin-list_template

    const params = {
      accountId: 'accountID-123',
      transactionId: 'testString',
      limit: 50,
      verbose: true,
    };

    const allResults = [];
    try {
      const pager = new IamAccessGroupsV2.TemplatePager(iamAccessGroupsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_template
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

    // MembersInput
    const membersInputModel = {
      users: ['IBMid-123', 'IBMid-234'],
    };

    // ConditionInput
    const conditionInputModel = {
      claim: 'blueGroup',
      operator: 'CONTAINS',
      value: 'test-bluegroup-saml',
    };

    // RuleInput
    const ruleInputModel = {
      name: 'Manager group rule',
      expiration: 12,
      realm_name: 'https://idp.example.org/SAML2',
      conditions: [conditionInputModel],
    };

    // AssertionsInput
    const assertionsInputModel = {
      rules: [ruleInputModel],
    };

    // AccessGroupInput
    const accessGroupInputModel = {
      name: 'IAM Admin Group 8',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      members: membersInputModel,
      assertions: assertionsInputModel,
    };

    // PolicyTemplatesInput
    const policyTemplatesInputModel = {
      id: 'policyTemplateId-123',
      version: '1',
    };

    const params = {
      templateId: 'testString',
      name: 'IAM Admin Group template 2',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      accessGroup: accessGroupInputModel,
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
      templateId: 'testString',
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

  test('getTemplateSpecificVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getTemplateSpecificVersion() result:');
    // begin-get_template_specific_version

    const params = {
      templateId: 'testString',
      versionNum: 'testString',
    };

    let res;
    try {
      res = await iamAccessGroupsService.getTemplateSpecificVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_template_specific_version
  });

  test('replaceTemplateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceTemplateVersion() result:');
    // begin-replace_template_version

    // Request models needed by this operation.

    // MembersInput
    const membersInputModel = {
      users: ['IBMid-5500085Q21'],
    };

    // ConditionInput
    const conditionInputModel = {
      claim: 'blueGroup',
      operator: 'CONTAINS',
      value: 'test-bluegroup-saml',
    };

    // RuleInput
    const ruleInputModel = {
      name: 'Manager group rule',
      expiration: 12,
      realm_name: 'https://idp.example.org/SAML2',
      conditions: [conditionInputModel],
    };

    // AssertionsInput
    const assertionsInputModel = {
      rules: [ruleInputModel],
    };

    // AccessGroupInput
    const accessGroupInputModel = {
      name: 'IAM Admin Group 8',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      members: membersInputModel,
      assertions: assertionsInputModel,
    };

    // PolicyTemplatesInput
    const policyTemplatesInputModel = {
      id: 'policyTemplateId-123',
      version: '1',
    };

    const params = {
      templateId: 'testString',
      versionNum: 'testString',
      ifMatch: 'testString',
      name: 'IAM Admin Group template 2',
      description: 'This access group template allows admin access to all IAM platform services in the account.',
      accessGroup: accessGroupInputModel,
      policyTemplateReferences: [policyTemplatesInputModel],
      transactionId: '83adf5bd-de790caa3',
    };

    let res;
    try {
      res = await iamAccessGroupsService.replaceTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_template_version
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

    originalLog('commitTemplate() result:');
    // begin-commit_template

    const params = {
      templateId: 'testString',
      versionNum: 'testString',
      ifMatch: 'testString',
    };

    let res;
    try {
      res = await iamAccessGroupsService.commitTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-commit_template
  });

  test('getTemplateLatestVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getTemplateLatestVersion() result:');
    // begin-get_template_latest_version

    const params = {
      templateId: 'testString',
    };

    let res;
    try {
      res = await iamAccessGroupsService.getTemplateLatestVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_template_latest_version
  });

  test('createAssignTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createAssignTemplate() result:');
    // begin-create_assign_template

    const params = {
      templateId: 'AccessGroupTemplateId-4be4',
      templateVersion: '1',
      targetType: 'accountGroup',
      target: '0a45594d0f-123',
    };

    let res;
    try {
      res = await iamAccessGroupsService.createAssignTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_assign_template
  });

  test('listAssignment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAssignment() result:');
    // begin-list_assignment

    const params = {
      accountId: 'accountID-123',
    };

    let res;
    try {
      res = await iamAccessGroupsService.listAssignment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_assignment
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
      assignmentId: 'testString',
    };

    let res;
    try {
      res = await iamAccessGroupsService.getAssignment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_assignment
  });

  test('getAccountSettings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAccountSettings() result:');
    // begin-get_account_settings

    const params = {
      accountId: 'testString',
    };

    let res;
    try {
      res = await iamAccessGroupsService.getAccountSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_account_settings
  });

  test('updateAccountSettings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateAccountSettings() result:');
    // begin-update_account_settings

    const params = {
      accountId: 'testString',
      publicAccessEnabled: true,
    };

    let res;
    try {
      res = await iamAccessGroupsService.updateAccountSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_account_settings
  });

  test('deleteAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_access_group

    const params = {
      accessGroupId: accessGroupIdLink,
    };

    try {
      await iamAccessGroupsService.deleteAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_access_group
  });

  test('removeMemberFromAccessGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-remove_member_from_access_group

    const params = {
      accessGroupId: accessGroupIdLink,
      iamId: 'testString',
    };

    try {
      await iamAccessGroupsService.removeMemberFromAccessGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-remove_member_from_access_group
  });

  test('removeAccessGroupRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-remove_access_group_rule

    const params = {
      accessGroupId: accessGroupIdLink,
      ruleId: 'testString',
    };

    try {
      await iamAccessGroupsService.removeAccessGroupRule(params);
    } catch (err) {
      console.warn(err);
    }

    // end-remove_access_group_rule
  });

  test('removeMemberFromAllAccessGroups request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('removeMemberFromAllAccessGroups() result:');
    // begin-remove_member_from_all_access_groups

    const params = {
      accountId: 'testString',
      iamId: 'testString',
    };

    let res;
    try {
      res = await iamAccessGroupsService.removeMemberFromAllAccessGroups(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-remove_member_from_all_access_groups
  });

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
      templateId: 'testString',
      versionNum: 'testString',
    };

    try {
      await iamAccessGroupsService.deleteTemplateVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_template_version
  });

  test('deleteTemplate request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_template

    const params = {
      templateId: 'testString',
    };

    try {
      await iamAccessGroupsService.deleteTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_template
  });

  test('deleteAssignment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_assignment

    const params = {
      assignmentId: 'testString',
    };

    try {
      await iamAccessGroupsService.deleteAssignment(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_assignment
  });
});
