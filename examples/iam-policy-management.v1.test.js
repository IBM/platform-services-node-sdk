/**
 * @jest-environment node
 */
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
'use strict';

const IamPolicyManagementV1 = require('../dist/iam-policy-management/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the IAM Policy Management service.
//
// The following configuration properties are assumed to be defined:
//
// IAM_POLICY_MANAGEMENT_URL=<service url>
// IAM_POLICY_MANAGEMENT_AUTH_TYPE=iam
// IAM_POLICY_MANAGEMENT_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// IAM_POLICY_MANAGEMENT_APIKEY=<YOUR_APIKEY>
// IAM_POLICY_MANAGEMENT_TEST_ACCOUNT_ID=<YOUR_ACCOUNT_ID>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of config file>
//
// Location of our config file.
const configFile = 'iam_policy_management.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('IamPolicyManagementV1', () => {

  let exampleAccountId;
  let examplePolicyId;
  let examplePolicyETag;
  let exampleCustomRoleId;
  let exampleCustomRoleEtag;
  let exampleTemplateId;
  let exampleTemplateVersion;
  let exampleTemplateBaseVersion;
  let exampleTemplateEtag;
  let exampleAssignmentId;
  let exampleAssignmentPolicyId;
  let exampleTargetAccountId;
  let exampleAssignmentETag;
  let exampleAccountSettingsETag;
  const exampleActionControlTemplateName = 'ActionControlTemplateNodeSDKTest';
  const exampleCustomRoleDipslayName = 'IAM Groups read access';
  const exampleUserId = 'IBMid-user1';
  const exampleServiceName = 'iam-groups';
  let exampleActionControlTemplateId;
  let exampleActionControlBaseVersion;
  let exampleActionControlTemplateEtag;
  let exampleActionControlTemplateVersion;
  let  exampleActionControlAssignmentId;
  let exampleActionControlAssignmentETag;

  // begin-common

  const iamPolicyManagementService = IamPolicyManagementV1.newInstance({});

  // end-common

  const config = readExternalSources(IamPolicyManagementV1.DEFAULT_SERVICE_NAME);

  expect(iamPolicyManagementService).not.toBeNull();
  expect(config).not.toBeNull();
  expect(config).toHaveProperty('testAccountId');
  expect(config).toHaveProperty('testTargetAccountId');
  exampleAccountId = config.testAccountId;
  exampleTargetAccountId = config.testTargetAccountId;

  test('createPolicy request example', async () => {
    expect(exampleAccountId).not.toBeNull();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createPolicy() result:');
    // begin-create_policy

    const policySubjects = [
      {
        attributes: [
          {
            name: 'iam_id',
            value: exampleUserId,
          },
        ],
      },
    ];
    const policyRoles = [
      {
        role_id: 'crn:v1:bluemix:public:iam::::role:Viewer',
      },
    ];
    const accountIdResourceAttribute = {
      name: 'accountId',
      value: exampleAccountId,
      operator: 'stringEquals',
    };
    const serviceNameResourceAttribute = {
      name: 'serviceType',
      value: 'service',
      operator: 'stringEquals',
    };
    const policyResourceTag = {
      name: 'project',
      operator: 'stringEquals',
      value: 'prototype',
    };
    const policyResources = [
      {
        attributes: [accountIdResourceAttribute, serviceNameResourceAttribute],
        tags: [policyResourceTag],
      },
    ];
    const params = {
      type: 'access',
      subjects: policySubjects,
      roles: policyRoles,
      resources: policyResources,
    };

    try {
      const res = await iamPolicyManagementService.createPolicy(params);
      examplePolicyId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-create_policy
  });
  test('getPolicy request example', async () => {
    expect(examplePolicyId).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getPolicy() result:');
    // begin-get_policy

    const params = {
      policyId: examplePolicyId,
    };

    try {
      const res = await iamPolicyManagementService.getPolicy(params);
      examplePolicyETag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-get_policy
  });
  test('replacePolicy request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    expect(examplePolicyId).toBeDefined();
    expect(examplePolicyETag).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('replacePolicy() result:');
    // begin-replace_policy

    const policySubjects = [
      {
        attributes: [
          {
            name: 'iam_id',
            value: exampleUserId,
          },
        ],
      },
    ];
    const accountIdResourceAttribute = {
      name: 'accountId',
      value: exampleAccountId,
      operator: 'stringEquals',
    };
    const serviceNameResourceAttribute = {
      name: 'serviceType',
      value: 'service',
      operator: 'stringEquals',
    };
    const policyResourceTag = {
      name: 'project',
      operator: 'stringEquals',
      value: 'prototype',
    };
    const policyResources = [
      {
        attributes: [accountIdResourceAttribute, serviceNameResourceAttribute],
        tags: [policyResourceTag],
      },
    ];
    const updatedPolicyRoles = [
      {
        role_id: 'crn:v1:bluemix:public:iam::::role:Editor',
      },
    ];
    const params = {
      type: 'access',
      policyId: examplePolicyId,
      ifMatch: examplePolicyETag,
      subjects: policySubjects,
      roles: updatedPolicyRoles,
      resources: policyResources,
    };

    try {
      const res = await iamPolicyManagementService.replacePolicy(params);
      examplePolicyETag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-replace_policy
  });
  test('updatePolicyState request example', async () => {
    expect(examplePolicyId).toBeDefined();
    expect(examplePolicyETag).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('updatePolicyState() result:');
    // begin-update_policy_state

    const params = {
      policyId: examplePolicyId,
      ifMatch: examplePolicyETag,
      state: 'active'
    };

    try {
      const res = await iamPolicyManagementService.updatePolicyState(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-update_policy_state
  });
  test('listPolicies request example', async () => {
    expect(exampleAccountId).not.toBeNull();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listPolicies() result:');
    // begin-list_policies

    const params = {
      accountId: exampleAccountId,
      iamId: exampleUserId,
      format: 'include_last_permit',
    };

    try {
      const res = await iamPolicyManagementService.listPolicies(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_policies
  });
  test('deletePolicy request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-delete_policy

    const params = {
      policyId: examplePolicyId,
    };

    try {
      await iamPolicyManagementService.deletePolicy(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_policy
  });
  test('createV2Policy request example', async () => {
    expect(exampleAccountId).not.toBeNull();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createV2Policy() result:');
    // begin-create_v2_policy

    const policySubject = {
      attributes: [
        {
          key: 'iam_id',
          operator: 'stringEquals',
          value: exampleUserId,
        },
      ],
    };
    const policyResourceAccountAttribute = {
      key: 'accountId',
      value: exampleAccountId,
      operator: 'stringEquals',
    };
    const policyResourceServiceAttribute = {
      key: 'serviceType',
      operator: 'stringEquals',
      value: 'service',
    };
    const policyResource = {
      attributes: [policyResourceAccountAttribute, policyResourceServiceAttribute]
    };
    const policyControl = {
      grant: {
        roles: [{
          role_id: 'crn:v1:bluemix:public:iam::::role:Viewer',
        }],
      }
    };
    const policyRule = {
      operator: 'and',
      conditions: [
          {
              key: '{{environment.attributes.day_of_week}}',
              operator: 'dayOfWeekAnyOf',
              value: ['1+00:00', '2+00:00', '3+00:00', '4+00:00', '5+00:00'],
          },
          {
              key: '{{environment.attributes.current_time}}',
              operator: 'timeGreaterThanOrEquals',
              value: '09:00:00+00:00',
          },
          {
              key: '{{environment.attributes.current_time}}',
              operator: 'timeLessThanOrEquals',
              value: '17:00:00+00:00',
          },
      ],
    }
    const policyPattern = 'time-based-conditions:weekly:custom-hours'
    const params = {
      type: 'access',
      subject: policySubject,
      control: policyControl,
      resource: policyResource,
      rule: policyRule,
      pattern: policyPattern,
    };

    try {
      const res = await iamPolicyManagementService.createV2Policy(params);
      examplePolicyId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-create_v2_policy
  });
  test('getV2Policy request example', async () => {
    expect(examplePolicyId).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getV2Policy() result:');
    // begin-get_v2_policy

    const params = {
      id: examplePolicyId,
    };

    try {
      const res = await iamPolicyManagementService.getV2Policy(params);
      examplePolicyETag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-get_v2_policy
  });
  test('replaceV2Policy request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    expect(examplePolicyId).toBeDefined();
    expect(examplePolicyETag).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('replaceV2Policy() result:');
    // begin-replace_v2_policy

    const policySubject = {
      attributes: [
        {
          key: 'iam_id',
          operator: 'stringEquals',
          value: exampleUserId,
        },
      ],
    };
    const policyResourceAccountAttribute = {
      key: 'accountId',
      value: exampleAccountId,
      operator: 'stringEquals',
    };
    const policyResourceServiceAttribute = {
      key: 'serviceType',
      operator: 'stringEquals',
      value: 'service',
    };
    const policyResource = {
      attributes: [policyResourceAccountAttribute, policyResourceServiceAttribute]
    };
    const updatedPolicyControl = {
      grant: {
        roles: [{
          role_id: 'crn:v1:bluemix:public:iam::::role:Editor',
        }],
      }
    };
    const policyRule = {
      operator: 'and',
      conditions: [
          {
              key: '{{environment.attributes.day_of_week}}',
              operator: 'dayOfWeekAnyOf',
              value: ['1+00:00', '2+00:00', '3+00:00', '4+00:00', '5+00:00'],
          },
          {
              key: '{{environment.attributes.current_time}}',
              operator: 'timeGreaterThanOrEquals',
              value: '09:00:00+00:00',
          },
          {
              key: '{{environment.attributes.current_time}}',
              operator: 'timeLessThanOrEquals',
              value: '17:00:00+00:00',
          },
      ],
    }
    const policyPattern = 'time-based-conditions:weekly:custom-hours'
    const params = {
      type: 'access',
      id: examplePolicyId,
      ifMatch: examplePolicyETag,
      subject: policySubject,
      control: updatedPolicyControl,
      resource: policyResource,
      rule: policyRule,
      pattern: policyPattern,
    };

    try {
      const res = await iamPolicyManagementService.replaceV2Policy(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-replace_v2_policy
  });
  test('listV2Policies request example', async () => {
    expect(exampleAccountId).not.toBeNull();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listV2Policies() result:');
    // begin-list_v2_policies

    const params = {
      accountId: exampleAccountId,
      iamId: exampleUserId,
      format: 'include_last_permit',
    };

    try {
      const res = await iamPolicyManagementService.listV2Policies(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_v2_policies
  });
  test('deleteV2Policy request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-delete_v2_policy

    const params = {
      id: examplePolicyId,
    };

    try {
      await iamPolicyManagementService.deleteV2Policy(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_v2_policy
  });
  test('createRole request example', async () => {
    expect(exampleAccountId).not.toBeNull();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createRole() result:');
    // begin-create_role

    const params = {
      displayName: exampleCustomRoleDipslayName,
      actions: ['iam-groups.groups.read'],
      name: 'ExampleRoleIAMGroups',
      accountId: exampleAccountId,
      serviceName: exampleServiceName,
    };

    try {
      const res = await iamPolicyManagementService.createRole(params);
      exampleCustomRoleId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_role
  });
  test('getRole request example', async () => {
    expect(exampleCustomRoleId).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getRole() result:');
    // begin-get_role

    const params = {
      roleId: exampleCustomRoleId,
    };

    try {
      const res = await iamPolicyManagementService.getRole(params);
      exampleCustomRoleEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_role
  });
  test('replaceRole request example', async () => {
    expect(exampleCustomRoleId).toBeDefined();
    expect(exampleCustomRoleEtag).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('replaceRole() result:');
    // begin-replace_role

    const updatedRoleActions = ['iam-groups.groups.read', 'iam-groups.groups.list'];
    const params = {
      roleId: exampleCustomRoleId,
      ifMatch: exampleCustomRoleEtag,
      displayName: exampleCustomRoleDipslayName,
      actions: updatedRoleActions,
    };

    try {
      const res = await iamPolicyManagementService.replaceRole(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_role
  });
  test('listRoles request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listRoles() result:');
    // begin-list_roles

    const params = {
      accountId: exampleAccountId,
    };

    try {
      const res = await iamPolicyManagementService.listRoles(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_roles
  });
  test('deleteRole request example', async () => {
    expect(exampleCustomRoleId).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-delete_role

    const params = {
      roleId: exampleCustomRoleId,
    };

    try {
      await iamPolicyManagementService.deleteRole(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_role
  });
  test('createPolicyS2STemplate request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createPolicyS2STemplate() result:');
    // begin-create_policy_template

    // Request models needed by this operation.

    // V2PolicyResourceAttribute
    const v2PolicyResourceAttributeModel = {
      key: 'serviceName',
      operator: 'stringEquals',
      value: 'cloud-object-storage',
    };

    // V2PolicyResource
    const v2PolicyResourceModel = {
      attributes: [v2PolicyResourceAttributeModel],
    };

    // V2PolicySubjectAttribute
    const v2PolicySubjectAttributeModel = {
      key: 'serviceName',
      operator: 'stringEquals',
      value: 'compliance',
    };

    // Roles
    const rolesModel = {
      role_id: 'crn:v1:bluemix:public:iam::::serviceRole:Writer',
    };

    // Grant
    const grantModel = {
      roles: [rolesModel],
    };

    // Control
    const controlModel = {
      grant: grantModel,
    };

    // TemplatePolicy
    const templatePolicyModel = {
      type: 'authorization',
      resource: v2PolicyResourceModel,
      control: controlModel,
      subject: {attributes: [ v2PolicySubjectAttributeModel ]},
    };

    const params = {
      name: 'SDKNodeExampleTemplate',
      accountId: exampleAccountId,
      policy: templatePolicyModel,
    };

    try {
      const res = await iamPolicyManagementService.createPolicyTemplate(params);
      exampleTemplateId = res.result.id;
      exampleTemplateBaseVersion = res.result.version;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_policy_template
  });
  test('getPolicyTemplate request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPolicyTemplate() result:');
    // begin-get_policy_template

    const params = {
      policyTemplateId: exampleTemplateId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.getPolicyTemplate(params);
      exampleTemplateEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_policy_template
  });
  test('replacePolicyTemplate request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    expect(exampleTemplateBaseVersion).not.toBeNull();
    expect(exampleTemplateEtag).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replacePolicyTemplate() result:');
    // begin-replace_policy_template

    // Request models needed by this operation.

    // V2PolicyResourceAttribute
    const v2PolicyResourceAttributeModel = {
      key: 'serviceName',
      operator: 'stringEquals',
      value: 'kms',
    };

    // V2PolicyResource
    const v2PolicyResourceModel = {
      attributes: [v2PolicyResourceAttributeModel],
    };

    // V2PolicySubjectAttribute
    const v2PolicySubjectAttributeModel = {
      key: 'serviceName',
      operator: 'stringEquals',
      value: 'compliance',
    };

    // Roles
    const rolesModel = {
      role_id: 'crn:v1:bluemix:public:iam::::serviceRole:Reader',
    };

    // Grant
    const grantModel = {
      roles: [rolesModel],
    };

    // Control
    const controlModel = {
      grant: grantModel,
    };

    // TemplatePolicy
    const templatePolicyModel = {
      type: 'authorization',
      resource: v2PolicyResourceModel,
      control: controlModel,
      subject: {attributes: [ v2PolicySubjectAttributeModel ]},
    };

    const params = {
      policyTemplateId: exampleTemplateId,
      version: exampleTemplateBaseVersion,
      ifMatch: exampleTemplateEtag,
      policy: templatePolicyModel,
      committed: true,
    };

    let res;
    try {
      res = await iamPolicyManagementService.replacePolicyTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_policy_template
  });
  test('listPolicyTemplates request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listPolicyTemplates() result:');
    // begin-list_policy_templates

    const params = {
      accountId: exampleAccountId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.listPolicyTemplates(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_policy_templates
  });
  test('createPolicyTemplateVersion request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createPolicyTemplateVersion() result:');
    // begin-create_policy_template_version

    // Request models needed by this operation.

    // V2PolicyResourceAttribute
    const v2PolicyResourceAttributeModel = {
      key: 'serviceName',
      operator: 'stringEquals',
      value: 'appid',
    };

    // V2PolicyResource
    const v2PolicyResourceModel = {
      attributes: [v2PolicyResourceAttributeModel],
    };

    // Roles
    const rolesModel = {
      role_id: 'crn:v1:bluemix:public:iam::::serviceRole:Reader',
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
      key: 'serviceName',
      operator: 'stringEquals',
      value: 'compliance',
    };

    // TemplatePolicy
    const templatePolicyModel = {
      type: 'authorization',
      resource: v2PolicyResourceModel,
      control: controlModel,
      subject: {attributes: [ v2PolicySubjectAttributeModel ]},
    };

    const params = {
      policyTemplateId: exampleTemplateId,
      policy: templatePolicyModel,
    };

    let res;
    try {
      res = await iamPolicyManagementService.createPolicyTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
      exampleTemplateVersion = res.result.version;
    } catch (err) {
      console.warn(err);
    }

    // end-create_policy_template_version
  });
  test('getPolicyTemplateVersion request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    expect(exampleTemplateVersion).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPolicyTemplateVersion() result:');
    // begin-get_policy_template_version

    const params = {
      policyTemplateId: exampleTemplateId,
      version: exampleTemplateVersion,
    };

    let res;
    try {
      res = await iamPolicyManagementService.getPolicyTemplateVersion(params);
      exampleTemplateEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_policy_template_version
  });
  test('commitPolicyTemplate request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    expect(exampleTemplateVersion).not.toBeNull();
    expect(exampleTemplateEtag).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-commit_policy_template

    const params = {
      policyTemplateId: exampleTemplateId,
      version: exampleTemplateVersion,
    };

    try {
      await iamPolicyManagementService.commitPolicyTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-commit_policy_template
  });
  test('listPolicyTemplateVersions request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listPolicyTemplateVersions() result:');
    // begin-list_policy_template_versions

    const params = {
      policyTemplateId: exampleTemplateId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.listPolicyTemplateVersions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_policy_template_versions
  });
  test('createPolicyTemplateAssignment request example', async () => {
    expect(exampleTargetAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createPolicyTemplateAssignment() result:');
    // begin-create_policy_template_assignment

    // Request models needed by this operation.

    const params = {
      acceptLanguage: 'default',
      version: '1.0',
      target: {
        id: exampleTargetAccountId,
        type: 'Account',
      },
      templates: [
        {
          id: exampleTemplateId,
          version: exampleTemplateBaseVersion,
        },
      ]
    };

    try {
      const res = await iamPolicyManagementService.createPolicyTemplateAssignment(params);
      exampleAssignmentId = res.result.assignments[0].id;
      exampleAssignmentETag = res.headers.etag;
      exampleAssignmentPolicyId = res.result.assignments[0].resources[0].policy.resource_created.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_policy_template_assignment
  });
  test('updatePolicyAssignment request example', async () => {
    expect(exampleAssignmentId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    originalLog('updatePolicyAssignment() result:');
    // begin-update_policy_assignment
    const params = {
      assignmentId: exampleAssignmentId,
      version: '1.0',
      templateVersion: exampleTemplateVersion,
      ifMatch: exampleAssignmentETag,
    };
    try {
    const response = await iamPolicyManagementService.updatePolicyAssignment(params);
    } catch (err){
      console.warn(err);
    }
    // end-update_policy_assignment
  });
  test('listPolicyAssignments request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listPolicyAssignments() result:');
    // begin-list_policy_assignments

    const params = {
      accountId: exampleAccountId,
      version: '1.0',
    };

    let res;
    try {
      res = await iamPolicyManagementService.listPolicyAssignments(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_policy_assignments
  });
  test('getPolicyAssignment request example', async () => {
    expect(exampleAssignmentId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPolicyAssignment() result:');
    // begin-get_policy_assignment

    const params = {
      assignmentId: exampleAssignmentId,
      version: '1.0',
    };

    let res;
    try {
      res = await iamPolicyManagementService.getPolicyAssignment(params);
      console.log(JSON.stringify(res.result, null, 2));
      exampleAssignmentPolicyId = res.result.resources[0].policy.resource_created.id;
    } catch (err) {
      console.warn(err);
    }

    // end-get_policy_assignment
  });
  test('getV2Policy to get Template meta data request example', async () => {
    expect(exampleAssignmentPolicyId).toBeDefined();

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getV2Policy() result:');
    // begin-get_v2_policy

    const params = {
      id: exampleAssignmentPolicyId,
    };

    try {
      const res = await iamPolicyManagementService.getV2Policy(params);
      examplePolicyETag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-get_v2_policy
  });
  test('deletePolicyAssignment request example', async () => {
    expect(exampleAssignmentId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_policy_assignment

    const params = {
      assignmentId: exampleAssignmentId,
    };

    try {
      await iamPolicyManagementService.deletePolicyAssignment(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_policy_assignment
  });
  test('deletePolicyTemplateVersion request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    expect(exampleTemplateVersion).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_policy_template_version

    const params = {
      policyTemplateId: exampleTemplateId,
      version: exampleTemplateVersion,
    };

    try {
      await iamPolicyManagementService.deletePolicyTemplateVersion(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_policy_template_version
  });
  test('deletePolicyTemplate request example', async () => {
    expect(exampleTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_policy_template

    const params = {
      policyTemplateId: exampleTemplateId,
    };

    try {
      await iamPolicyManagementService.deletePolicyTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_policy_template
  });
  test('createActionControlTemplate request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createActionControlTemplate() result:');
    // begin-create_action_control_template

    // Request models needed by this operation.
    const actionControl = {
      service_name: 'am-test-service',
      description: 'am-test-service service actionControl',
      actions: ['am-test-service.test.delete'],
    };

    try {
      const res = await iamPolicyManagementService.createActionControlTemplate({
        name: exampleActionControlTemplateName,
        accountId: exampleAccountId,
        description: 'Test ActionControl templates with action control',
        actionControl,
      });
      exampleActionControlTemplateId = res.result.id;
      exampleActionControlBaseVersion = res.result.version;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_action_control_template
  });
  test('getActionControlTemplate request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getActionControlTemplate() result:');
    // begin-get_action_control_template

    const params = {
      actionControlTemplateId: exampleActionControlTemplateId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.getActionControlTemplate(params);
      exampleActionControlTemplateEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_action_control_template
  });
  test('replaceActionControlTemplate request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    expect(exampleActionControlBaseVersion).not.toBeNull();
    expect(exampleActionControlTemplateEtag).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceActionControlTemplate() result:');
    // begin-replace_action_control_template
    // Request models needed by this operation.
    const actionControl = {
      service_name: 'am-test-service',
      description: 'am-test-service service actionControl',
      actions: ['am-test-service.test.delete'],
    };
    const params = {
      ifMatch: exampleActionControlTemplateEtag,
      actionControlTemplateId: exampleActionControlTemplateId,
      version: exampleActionControlBaseVersion,
      actionControl,
    };
    
    let res;
    try {
      res = await iamPolicyManagementService.replaceActionControlTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_action_control_template
  });
  test('listActionControlTemplates request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listActionControlTemplates() result:');
    // begin-list_action_control_templates

    const params = {
      accountId: exampleAccountId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.listActionControlTemplates(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_action_control_templates
  });
  test('createActionControlTemplateVersion request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createActionControlTemplateVersion() result:');
    // begin-create_action_control_template_version

    // Request models needed by this operation.
    const actionControl = {
      service_name: 'am-test-service',
      description: 'am-test-service service actionControl',
      actions: ['am-test-service.test.create'],
    };
    const params = {
      actionControlTemplateId: exampleActionControlTemplateId,
      actionControl,
      committed: true,
    };

    let res;
    try {
      res = await iamPolicyManagementService.createActionControlTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
      exampleActionControlTemplateVersion = res.result.version;
    } catch (err) {
      console.warn(err);
    }

    // end-create_action_control_template_version
  });
  test('getActionControlTemplateVersion request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    expect(exampleActionControlTemplateVersion).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getActionControlTemplateVersion() result:');
    // begin-get_action_control_template_version

    const params = {
      actionControlTemplateId: exampleActionControlTemplateId,
      version: exampleActionControlTemplateVersion,
    };

    let res;
    try {
      res = await iamPolicyManagementService.getActionControlTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_action_control_template_version
  });
  test('commitActionControlTemplate request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    expect(exampleActionControlBaseVersion).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-commit_action_control_template

    const params = {
      actionControlTemplateId: exampleActionControlTemplateId,
      version: exampleActionControlBaseVersion,
    };

    try {
      await iamPolicyManagementService.commitActionControlTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-commit_action_control_template
  });
  test('listActionControlTemplateVersions request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listActionControlTemplateVersions() result:');
    // begin-list_action_control_template_versions

    const params = {
      actionControlTemplateId: exampleActionControlTemplateId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.listActionControlTemplateVersions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_action_control_template_versions
  });
  test('createActionControlTemplateAssignment request example', async () => {
    expect(exampleTargetAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createActionControlTemplateAssignment() result:');
    // begin-create_action_control_template_assignment

    // Request models needed by this operation.

    const params = {
      acceptLanguage: 'default',
      target: {
        id: exampleTargetAccountId,
        type: 'Account',
      },
      templates: [
        {
          id: exampleActionControlTemplateId,
          version: exampleActionControlBaseVersion,
        },
      ]
    };

    try {
      const res = await iamPolicyManagementService.createActionControlTemplateAssignment(params);
      exampleActionControlAssignmentId = res.result.assignments[0].id;
      exampleActionControlAssignmentETag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_action_control_template_assignment
  });
  test('updateActionControlAssignment request example', async () => {
    expect(exampleActionControlAssignmentId).not.toBeNull();
    expect(exampleActionControlTemplateVersion).not.toBeNull();
    expect(exampleActionControlAssignmentETag).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    originalLog('updateActionControlAssignment() result:');
    // begin-update_action_control_assignment
    const params = {
      assignmentId: exampleActionControlAssignmentId,
      templateVersion: exampleActionControlTemplateVersion,
      ifMatch: exampleActionControlAssignmentETag,
    };
    try {
    const response = await iamPolicyManagementService.updateActionControlAssignment(params);
    } catch (err){
      console.warn(err);
    }
    // end-update_action_control_assignment
  });
  test('listActionControlAssignments request example', async () => {
    expect(exampleAccountId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listActionControlAssignments() result:');
    // begin-list_action_control_assignments

    const params = {
      accountId: exampleAccountId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.listActionControlAssignments(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_action_control_assignments
  });
  test('getActionControlAssignment request example', async () => {
    expect(exampleActionControlAssignmentId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getActionControlAssignment() result:');
    // begin-get_action_control_assignment

    const params = {
      assignmentId: exampleActionControlAssignmentId,
    };

    let res;
    try {
      res = await iamPolicyManagementService.getActionControlAssignment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_action_control_assignment
  });
  test('deleteActionControlAssignment request example', async () => {
    expect(exampleActionControlAssignmentId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_action_control_assignment

    const params = {
      assignmentId: exampleActionControlAssignmentId,
    };

    try {
      await iamPolicyManagementService.deleteActionControlAssignment(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_action_control_assignment
  });
  test('deleteActionControlTemplateVersion request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    expect(exampleActionControlBaseVersion).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_action_control_template_version

    const params = {
      actionControlTemplateId: exampleActionControlTemplateId,
      version: exampleActionControlBaseVersion,
    };

    try {
      await iamPolicyManagementService.deleteActionControlTemplateVersion(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_action_control_template_template_version
  });
  test('deleteActionControlTemplate request example', async () => {
    expect(exampleActionControlTemplateId).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_action_control_template

    const params = {
      actionControlTemplateId: exampleActionControlTemplateId,
    };

    try {
      await iamPolicyManagementService.deleteActionControlTemplate(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_action_control_template
  });
  test('getSettings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-get_access_management_account_settings

    const getSettingsParams = {
      accountId: exampleAccountId,
      acceptLanguage: 'default',
    };

    try {
      const res = await iamPolicyManagementService.getSettings(getSettingsParams);
      exampleAccountSettingsETag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }
    // end-get_access_management_account_settings
  });
  test('updateSettings request example', async () => {
    expect(exampleAccountSettingsETag).not.toBeNull();
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_access_management_account_settings

    // IdentityTypesBase
    const identityTypesBaseModel = {
      state: 'monitor',
      external_allowed_accounts: [],
    };

    // IdentityTypesPatch
    const identityTypesPatchModel = {
      user: identityTypesBaseModel,
      service_id: identityTypesBaseModel,
      service: identityTypesBaseModel,
    };

    // ExternalAccountIdentityInteractionPatch
    const externalAccountIdentityInteraction = {
      identity_types: identityTypesPatchModel,
    };
    const updateSettingsParams = {
      accountId: exampleAccountId,
      acceptLanguage: 'default',
      ifMatch: exampleAccountSettingsETag,
      externalAccountIdentityInteraction,
    };

    try {
      const res = await iamPolicyManagementService.updateSettings(updateSettingsParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }
    // end-update_access_management_account_settings
  });
});
