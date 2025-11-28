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
const IamPolicyManagementV1 = require('../../dist/iam-policy-management/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (25s).
const timeout = 25000;

// Location of our config file.
const configFile = 'iam_policy_management.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

describe('IamPolicyManagementV1_integration', () => {
  jest.setTimeout(timeout);

  let service;
  let config;
  let testAccountId;
  let testPolicyETag;
  let testPolicyId;
  let testV2PolicyETag;
  let testV2PolicyId;
  let testAssignmentPolicyId;
  let testTargetAccountId;
  let testAssignmentActionControlId;
  const testUniqueId = Math.floor(Math.random() * 100000);
  const testUserId = `IBMid-SDKNode${testUniqueId}`;
  const testViewerRoleCrn = 'crn:v1:bluemix:public:iam::::role:Viewer';
  const testEditorRoleCrn = 'crn:v1:bluemix:public:iam::::role:Editor';
  const testServiceName = 'iam-groups';
  const policyType = 'access';
  const testServiceRoleCrn = 'crn:v1:bluemix:public:iam-identity::::serviceRole:ServiceIdCreator';
  const policySubjects = [
    {
      attributes: [
        {
          name: 'iam_id',
          value: testUserId,
        },
      ],
    },
  ];
  const policyRoles = [
    {
      role_id: testViewerRoleCrn,
    },
  ];
  const policyResourceAccountAttribute = {
    name: 'accountId',
    value: testAccountId,
    operator: 'stringEquals',
  };
  const policyResourceServiceAttribute = {
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
      attributes: [policyResourceAccountAttribute, policyResourceServiceAttribute],
      tags: [policyResourceTag],
    },
  ];

  const v2PolicySubject = {
    attributes: [
      {
        key: 'iam_id',
        operator: 'stringEquals',
        value: testUserId,
      },
    ],
  };
  const v2PolicyResourceAccountAttribute = {
    key: 'accountId',
    value: testAccountId,
    operator: 'stringEquals',
  };
  const v2PolicyResourceServiceAttribute = {
    key: 'serviceType',
    operator: 'stringEquals',
    value: 'service',
  };
  const v2PolicyResource = {
    attributes: [v2PolicyResourceAccountAttribute, v2PolicyResourceServiceAttribute],
  };
  const control = {
    grant: {
      roles: policyRoles,
    },
  };
  const rule = {
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
  };
  const pattern = 'time-based-conditions:weekly:custom-hours';

  let testCustomRoleId;
  let testCustomRoleEtag;
  const testCustomRoleName = `TestNodeRole${testUniqueId}`;
  const testCustomRoleDisplayName = `SDK ${testCustomRoleName}`;
  const testCustomRoleDescription = `SDK ${testCustomRoleName}`;
  const testCustomRoleActions = ['iam-groups.groups.read'];

  let testTemplateId;
  let testTemplateVersion;
  let testTemplateETag;
  let testS2STemplateId;
  let testS2STemplateBaseVersion;
  let testS2STemplateVersion;
  let testAssignmentETag;
  let testAccountSettingsETag;
  const TEST_TEMPLATE_PREFIX = 'SDKNode';
  const testTemplateName = TEST_TEMPLATE_PREFIX + testUniqueId;
  const testActionControlTemplateName = `${TEST_TEMPLATE_PREFIX}ActionControl${testUniqueId}`;
  const testCustomRoleTemplateName = `${TEST_TEMPLATE_PREFIX}Role${testUniqueId}`;
  let testActionControlBasicTemplateId;
  let testActionControlBasicTemplateVersion;
  let testActionControlBasicTemplateETag;
  let testActionControlTemplateId;
  let testActionControlTemplateVersion;
  let testActionControlTemplateETag;
  let testActionControlTemplateUpdateVersion;
  let testRoleTemplateId;
  let testRoleTemplateVersion;
  let testRoleTemplateETag;
  let testRolePolicyTemplateId;
  const testTemplatePolicy = {
    type: 'access',
    description: 'SDK Test Policy',
    resource: { attributes: [v2PolicyResourceServiceAttribute] },
    control,
  };
  const testUpdatedTemplatePolicy = {
    ...testTemplatePolicy,
    control: {
      grant: {
        roles: [
          {
            role_id: testEditorRoleCrn,
          },
        ],
      },
    },
  };

  const testS2STemplate = {
    name: 'S2STest',
    description: 'Grant SCC access to monitor and enforce service rules',
    policy: {
      type: 'authorization',
      description: 'Grant Editor Role on SERVICE_NAME',
      subject: {
        attributes: [
          {
            key: 'serviceName',
            operator: 'stringEquals',
            value: 'compliance',
          },
        ],
      },
      control: {
        grant: {
          roles: [
            {
              role_id: 'crn:v1:bluemix:public:iam::::serviceRole:Writer',
            },
          ],
        },
      },
      resource: {
        attributes: [
          {
            key: 'serviceName',
            operator: 'stringEquals',
            value: 'cloud-object-storage',
          },
        ],
      },
    },
    'committed': true,
  };

  let testAssignmentId;

  test('should successfully complete initialization', (done) => {
    // Initialize the service client.
    service = IamPolicyManagementV1.newInstance();

    // Grab our test-specific config properties.
    config = readExternalSources(IamPolicyManagementV1.DEFAULT_SERVICE_NAME);
    expect(service).not.toBeNull();
    expect(config).not.toBeNull();
    expect(config).toHaveProperty('testAccountId');
    expect(config).toHaveProperty('testTargetAccountId');

    // Retrieve the test account id and target account_id to be used with the tests.
    testAccountId = config.testAccountId;
    testTargetAccountId = config.testTargetAccountId;
    policyResourceAccountAttribute.value = testAccountId;

    expect(testAccountId).not.toBeNull();
    expect(testTargetAccountId).not.toBeNull();
    done();
  });

  describe('Access policy tests', () => {
    test('Create an access policy', async () => {
      const params = {
        type: 'access',
        subjects: policySubjects,
        roles: policyRoles,
        resources: policyResources,
      };

      let response;
      try {
        response = await service.createPolicy(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.type).toEqual(policyType);
      expect(result.subjects).toEqual(policySubjects);
      expect(result.roles[0].role_id).toEqual(policyRoles[0].role_id);
      expect(result.resources).toEqual(policyResources);

      testPolicyId = result.id;
    });

    test('Get an access policy', async () => {
      expect(testPolicyId).toBeDefined();

      const params = {
        policyId: testPolicyId,
      };

      let response;
      try {
        response = await service.getPolicy(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testPolicyId);
      expect(result.type).toEqual(policyType);
      expect(result.subjects).toEqual(policySubjects);
      expect(result.roles[0].role_id).toEqual(policyRoles[0].role_id);
      expect(result.resources).toEqual(policyResources);

      testPolicyETag = response.headers.etag;
    });

    test('Update an access policy', async () => {
      expect(testPolicyId).toBeDefined();
      expect(testPolicyETag).toBeDefined();

      const updPolicyRoles = [
        {
          role_id: testEditorRoleCrn,
        },
      ];

      const params = {
        policyId: testPolicyId,
        ifMatch: testPolicyETag,
        type: 'access',
        subjects: policySubjects,
        roles: updPolicyRoles,
        resources: policyResources,
      };

      let response;
      try {
        response = await service.replacePolicy(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testPolicyId);
      expect(result.type).toEqual(policyType);
      expect(result.subjects).toEqual(policySubjects);
      expect(result.roles[0].role_id).toEqual(updPolicyRoles[0].role_id);
      expect(result.resources).toEqual(policyResources);

      testPolicyETag = response.headers.etag;
    });

    test('Patch an access policy', async () => {
      expect(testPolicyId).toBeDefined();
      expect(testPolicyETag).toBeDefined();

      const params = {
        policyId: testPolicyId,
        ifMatch: testPolicyETag,
        state: 'active',
      };

      let response;
      try {
        response = await service.updatePolicyState(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testPolicyId);
      expect(result.type).toEqual(policyType);
      expect(result.subjects).toEqual(policySubjects);
      expect(result.state).toEqual('active');
      expect(result.resources).toEqual(policyResources);
    });

    test('List access policies', async () => {
      expect(testPolicyId).toBeDefined();

      const params = {
        accountId: testAccountId,
        iamId: testUserId,
      };

      let response;
      try {
        response = await service.listPolicies(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Confirm the test policy is present
      let foundTestPolicy = false;
      let policy;
      for (policy of result.policies) {
        if (policy.id === testPolicyId) {
          foundTestPolicy = true;
          break;
        }
      }
      expect(foundTestPolicy).toBeTruthy();
    });

    test('Clean up all test policies', async () => {
      // List all policies for the test user in the account
      const params = {
        accountId: testAccountId,
        iamId: testUserId,
      };

      let response;
      try {
        response = await service.listPolicies(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Iterate across the policies
      let policy;
      for (policy of result.policies) {
        // Delete the test policy (or any test policies older than 5 minutes)
        const createdAt = Date.parse(policy.created_at);
        const FIVE_MINUTES = 5 * 60 * 1000;
        const fiveMinutesAgo = Date.now() - FIVE_MINUTES;

        if (policy.id === testPolicyId || createdAt < fiveMinutesAgo) {
          const params = {
            policyId: policy.id,
          };

          let response;
          try {
            response = await service.deletePolicy(params);
          } catch (err) {
            console.warn(err);
          }

          expect(response).toBeDefined();
          expect(response.status).toEqual(204);
        }
      }
    });
  });

  describe('V2 Access policy tests', () => {
    test('Create a v2 access policy', async () => {
      const params = {
        type: 'access',
        subject: v2PolicySubject,
        control,
        resource: v2PolicyResource,
        rule,
        pattern,
      };

      // ensure resource account value is defined
      v2PolicyResource.attributes[0].value = testAccountId;

      let response;
      try {
        response = await service.createV2Policy(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.type).toEqual(policyType);
      expect(result.subject).toEqual(v2PolicySubject);
      expect(result.control).toEqual(control);
      expect(result.resource).toEqual(v2PolicyResource);

      testV2PolicyId = result.id;
    });

    test('Get a v2 access policy', async () => {
      expect(testPolicyId).toBeDefined();

      const params = {
        id: testV2PolicyId,
      };

      let response;
      try {
        response = await service.getV2Policy(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testV2PolicyId);
      expect(result.type).toEqual(policyType);
      expect(result.subject).toEqual(v2PolicySubject);
      expect(result.control).toEqual(control);
      expect(result.resource).toEqual(v2PolicyResource);

      testV2PolicyETag = response.headers.etag;
    });

    test('Update a v2 access policy', async () => {
      expect(testV2PolicyId).toBeDefined();
      expect(testV2PolicyETag).toBeDefined();

      const updatedControl = {
        grant: {
          roles: [
            {
              role_id: testEditorRoleCrn,
            },
          ],
        },
      };

      const params = {
        id: testV2PolicyId,
        ifMatch: testV2PolicyETag,
        type: 'access',
        subject: v2PolicySubject,
        control: updatedControl,
        resource: v2PolicyResource,
        rule,
        pattern,
      };

      let response;
      try {
        response = await service.replaceV2Policy(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testV2PolicyId);
      expect(result.type).toEqual(policyType);
      expect(result.subject).toEqual(v2PolicySubject);
      expect(result.control).toEqual(updatedControl);
      expect(result.resource).toEqual(v2PolicyResource);
    });

    test('List v2 access policies', async () => {
      expect(testPolicyId).toBeDefined();

      const params = {
        accountId: testAccountId,
        iamId: testUserId,
      };

      let response;
      try {
        response = await service.listV2Policies(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Confirm the test policy is present
      let foundTestPolicy = false;
      let policy;
      for (policy of result.policies) {
        if (policy.id === testV2PolicyId) {
          foundTestPolicy = true;
          break;
        }
      }
      expect(foundTestPolicy).toBeTruthy();
    });

    test('Clean up all v2 test policies', async () => {
      // List all policies for the test user in the account
      const params = {
        accountId: testAccountId,
        iamId: testUserId,
      };

      let response;
      try {
        response = await service.listV2Policies(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Iterate across the policies
      let policy;
      for (policy of result.policies) {
        // Delete the test policy (or any test policies older than 5 minutes)
        const createdAt = Date.parse(policy.created_at);
        const FIVE_MINUTES = 5 * 60 * 1000;
        const fiveMinutesAgo = Date.now() - FIVE_MINUTES;

        if (policy.id === testV2PolicyId || createdAt < fiveMinutesAgo) {
          const params = {
            id: policy.id,
          };

          let response;
          try {
            response = await service.deleteV2Policy(params);
          } catch (err) {
            console.warn(err);
          }

          expect(response).toBeDefined();
          expect(response.status).toEqual(204);
        }
      }
    });
  });

  describe('Custom roles tests', () => {
    test('Create a custom role', async () => {
      const params = {
        displayName: testCustomRoleDisplayName,
        description: testCustomRoleDescription,
        name: testCustomRoleName,
        accountId: testAccountId,
        serviceName: testServiceName,
        actions: testCustomRoleActions,
      };

      let response;
      try {
        response = await service.createRole(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.name).toEqual(testCustomRoleName);
      expect(result.display_name).toEqual(testCustomRoleDisplayName);
      expect(result.description).toEqual(testCustomRoleDescription);
      expect(result.account_id).toEqual(testAccountId);
      expect(result.service_name).toEqual(testServiceName);
      expect(result.actions).toEqual(testCustomRoleActions);

      testCustomRoleId = result.id;
    });

    test('Get a custom role', async () => {
      expect(testCustomRoleId).toBeDefined();

      const params = {
        roleId: testCustomRoleId,
      };

      let response;
      try {
        response = await service.getRole(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testCustomRoleId);
      expect(result.name).toEqual(testCustomRoleName);
      expect(result.display_name).toEqual(testCustomRoleDisplayName);
      expect(result.description).toEqual(testCustomRoleDescription);
      expect(result.account_id).toEqual(testAccountId);
      expect(result.service_name).toEqual(testServiceName);
      expect(result.actions).toEqual(testCustomRoleActions);

      testCustomRoleEtag = response.headers.etag;
    });

    test('Update a custom role', async () => {
      expect(testCustomRoleId).toBeDefined();
      expect(testCustomRoleEtag).toBeDefined();

      const updCustomRoleDescription = 'Udated description';

      const params = {
        roleId: testCustomRoleId,
        ifMatch: testCustomRoleEtag,
        description: updCustomRoleDescription,
        displayName: testCustomRoleDisplayName,
        actions: testCustomRoleActions,
        headers: { 'transaction-Id': `SDKNode-${testUniqueId}` },
      };

      let response;
      try {
        response = await service.replaceRole(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testCustomRoleId);
      expect(result.name).toEqual(testCustomRoleName);
      expect(result.display_name).toEqual(testCustomRoleDisplayName);
      expect(result.description).toEqual(updCustomRoleDescription);
      expect(result.account_id).toEqual(testAccountId);
      expect(result.service_name).toEqual(testServiceName);
      expect(result.actions).toEqual(testCustomRoleActions);
    });

    test('List custom roles', async () => {
      expect(testCustomRoleId).toBeDefined();

      const params = {
        accountId: testAccountId,
        serviceName: testServiceName,
      };

      let response;
      try {
        response = await service.listRoles(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Confirm the test role is present
      let foundCustomRole = false;
      let role;
      for (role of result.custom_roles) {
        if (role.id === testCustomRoleId) {
          foundCustomRole = true;
          break;
        }
      }
      expect(foundCustomRole).toBeTruthy();
    });

    test('Clean up all test custom roles', async () => {
      // List all custom roles in the account
      const params = {
        accountId: testAccountId,
        serviceName: testServiceName,
      };

      let response;
      try {
        response = await service.listRoles(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Iterate across the custom_roles
      let role;
      for (role of result.custom_roles) {
        // Delete the test role (or any test role older than 5 minutes)
        const createdAt = Date.parse(role.created_at);
        const FIVE_MINUTES = 5 * 60 * 1000;
        const fiveMinutesAgo = Date.now() - FIVE_MINUTES;

        if (role.id === testCustomRoleId || createdAt < fiveMinutesAgo) {
          const params = {
            roleId: role.id,
          };

          let response;
          try {
            response = await service.deleteRole(params);
          } catch (err) {
            console.warn(err);
          }

          expect(response).toBeDefined();
          expect(response.status).toEqual(204);
        }
      }
    });
  });

  describe('List V2 roles tests', () => {
    test('List V2 roles with accountId and serviceGroupId', async () => {
      const params = {
        accountId: testAccountId,
        serviceGroupId: 'IAM',
      };

      let response;
      try {
        response = await service.listRoles(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Confirm the test role is present
      let foundServiceRole = false;
      let foundSystemRole = false;
      let role;
      for (role of result.service_roles) {
        if (role.crn === testServiceRoleCrn) {
          foundServiceRole = true;
          break;
        }
      }
      for (role of result.system_roles) {
        if (role.crn === testViewerRoleCrn) {
          foundSystemRole = true;
          break;
        }
      }
      expect(foundServiceRole).toBeTruthy();
      expect(foundSystemRole).toBeTruthy();
    });
  });

  describe('Policy Template tests', () => {
    test('Create a policy template', async () => {
      const testTemplateDescription = 'SDK Test template with viewer role';
      const params = {
        name: testTemplateName,
        accountId: testAccountId,
        policy: testTemplatePolicy,
        description: testTemplateDescription,
      };

      const response = await service.createPolicyTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.policy).toEqual(testTemplatePolicy);
      expect(result.name).toEqual(testTemplateName);
      expect(result.description).toEqual(testTemplateDescription);
      expect(result.state).toEqual('active');
      testTemplateId = result.id;
      testTemplateVersion = result.version;
    });
    test('Create a S2S policy template', async () => {
      const response = await service.createPolicyTemplate({
        ...testS2STemplate,
        accountId: testAccountId,
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.policy).toEqual(testS2STemplate.policy);
      expect(result.state).toEqual('active');
      testS2STemplateId = result.id;
      testS2STemplateBaseVersion = result.version;
    });
    test('Get a policy template by id', async () => {
      expect(testTemplateId).toBeDefined();
      const params = {
        policyTemplateId: testTemplateId,
      };

      const response = await service.getPolicyTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.state).toEqual('active');
      testTemplateETag = response.headers.etag;
    });
    test('Replace a policy template', async () => {
      expect(testTemplateId).toBeDefined();
      expect(testTemplateVersion).toBeDefined();
      expect(testTemplateETag).toBeDefined();

      const testTemplateDescription = 'Updated SDK Test template with editor role';
      const params = {
        policyTemplateId: testTemplateId,
        version: testTemplateVersion,
        ifMatch: testTemplateETag,
        policy: testUpdatedTemplatePolicy,
        description: testTemplateDescription,
      };

      const response = await service.replacePolicyTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.policy.control.grant.roles[0].role_id).toEqual(testEditorRoleCrn);
      expect(result.name).toEqual(testTemplateName);
      expect(result.description).toEqual(testTemplateDescription);
      expect(result.state).toEqual('active');
    });
    test('List policy templates', async () => {
      const params = {
        accountId: testAccountId,
        acceptLanguage: 'default',
      };

      const response = await service.listPolicyTemplates(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      let foundTestTemplate = false;
      for (const template of result.policy_templates) {
        if (template.id === testTemplateId) {
          foundTestTemplate = true;
          break;
        }
      }
      expect(foundTestTemplate).toBeTruthy();
    });
    test('Create a policy template version', async () => {
      expect(testTemplateId).toBeDefined();
      expect(testTemplateVersion).toBeDefined();

      const testTemplateDescription = 'New version of SDK Test template with viewer role';
      const params = {
        policyTemplateId: testTemplateId,
        policy: testTemplatePolicy,
        description: testTemplateDescription,
      };

      const response = await service.createPolicyTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(Number(result.version)).toBeGreaterThan(Number(testTemplateVersion));
      expect(result.state).toEqual('active');
    });
    test('Create a S2S policy template version', async () => {
      expect(testS2STemplateId).toBeDefined();
      expect(testS2STemplateBaseVersion).toBeDefined();

      const testTemplateDescription = 'New version of SDK Test S2S template';
      const params = {
        policyTemplateId: testS2STemplateId,
        policy: {
          ...testS2STemplate.policy,
          control: {
            grant: {
              roles: [
                {
                  role_id: 'crn:v1:bluemix:public:iam::::serviceRole:Reader',
                },
              ],
            },
          },
          resource: {
            attributes: [
              {
                key: 'serviceName',
                operator: 'stringEquals',
                value: 'kms',
              },
            ],
          },
        },
        description: testTemplateDescription,
        committed: true,
      };

      const response = await service.createPolicyTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(Number(result.version)).toBeGreaterThan(Number(testS2STemplateBaseVersion));
      expect(result.state).toEqual('active');
      testS2STemplateVersion = result.version;
    });

    test('Get a policy template version', async () => {
      expect(testTemplateId).toBeDefined();
      expect(testTemplateVersion).toBeDefined();
      const params = {
        policyTemplateId: testTemplateId,
        version: testTemplateVersion,
      };

      const response = await service.getPolicyTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.version).toEqual(testTemplateVersion);
      expect(result.state).toEqual('active');
      testTemplateETag = response.headers.etag;
    });
    test('Commit a policy template version', async () => {
      expect(testTemplateId).toBeDefined();
      expect(testTemplateVersion).toBeDefined();
      expect(testTemplateETag).toBeDefined();
      const params = {
        policyTemplateId: testTemplateId,
        version: testTemplateVersion,
      };

      let response = await service.commitPolicyTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(204);
      const { result } = response || {};
      expect(result).toBeDefined();

      response = await service.getPolicyTemplateVersion({
        policyTemplateId: testTemplateId,
        version: testTemplateVersion,
      });

      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      testTemplateETag = response.headers.etag;

      // Once template is committed, it cannot be updated. Check that update template for first version fails
      let errorMessage;
      try {
        await service.replacePolicyTemplate({
          policyTemplateId: testTemplateId,
          version: testTemplateVersion,
          ifMatch: testTemplateETag,
          policy: testTemplatePolicy,
          description: 'Failed SDK update a committed template',
        });
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toEqual(
        `Policy template id '${testTemplateId}' and version '${testTemplateVersion}' is committed and cannot be updated`
      );
    });
    test('Delete a policy template version', async () => {
      const params = {
        policyTemplateId: testTemplateId,
        version: testTemplateVersion,
      };

      const response = await service.deletePolicyTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(204);
    });
    test('List policy template versions', async () => {
      const response = await service.listPolicyTemplateVersions({
        policyTemplateId: testTemplateId,
      });
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      const { versions: templates } = result || [];
      expect(templates).toHaveLength(1);
      expect(templates[0].version).not.toEqual(testTemplateVersion);
      expect(templates[0].state).toEqual('active');
    });
    test('Clean up all test policy templates', async () => {
      // List all policy templates in the account
      const params = {
        accountId: testAccountId,
      };

      let response;
      try {
        response = await service.listPolicyTemplates(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Iterate across the policies
      let template;
      for (template of result.policy_templates) {
        // Delete the test policy (or any test policies older than 5 minutes)
        const createdAt = Date.parse(template.created_at);
        const FIVE_MINUTES = 5 * 60 * 1000;
        const fiveMinutesAgo = Date.now() - FIVE_MINUTES;
        if (
          template.name.startsWith(TEST_TEMPLATE_PREFIX) &&
          (template.id === testTemplateId || createdAt < fiveMinutesAgo)
        ) {
          const params = {
            policyTemplateId: template.id,
          };

          let response;
          try {
            response = await service.deletePolicyTemplate(params);
          } catch (err) {
            console.warn(err);
          }

          expect(response).toBeDefined();
          expect(response.status).toEqual(204);
        }
      }
    });
  });

  describe('Policy Assignment tests', () => {
    test('Create policy assignments', async () => {
      const params = {
        acceptLanguage: 'default',
        version: '1.0',
        target: {
          id: testTargetAccountId,
          type: 'Account',
        },
        templates: [
          {
            id: testS2STemplateId,
            version: testS2STemplateBaseVersion,
          },
        ],
      };
      const response = await service.createPolicyTemplateAssignment(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      testAssignmentId = result.assignments[0].id;
      testAssignmentETag = response.headers.etag;
      testAssignmentPolicyId = result.assignments[0].resources[0].policy.resource_created.id;
    });
    test('Update policy assignment by id', async () => {
      expect(testAssignmentId).toBeDefined();
      const params = {
        assignmentId: testAssignmentId,
        version: '1.0',
        templateVersion: testS2STemplateVersion,
        ifMatch: testAssignmentETag,
      };
      const response = await service.updatePolicyAssignment(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.result.resources[0].policy.resource_created.id).toEqual(
        testAssignmentPolicyId
      );
    });
    test('List policy assignments', async () => {
      const params = {
        accountId: testAccountId,
        acceptLanguage: 'default',
        version: '1.0',
      };
      const response = await service.listPolicyAssignments(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
    });
    test('Get policy assignment by id', async () => {
      expect(testAssignmentId).toBeDefined();
      const params = {
        assignmentId: testAssignmentId,
        version: '1.0',
      };
      const response = await service.getPolicyAssignment(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.result).toBeDefined();
    });
    test('GetPolicyV2 - Retrieve Policy Template MetaData created from assignment', async () => {
      expect(testPolicyId).toBeDefined();

      const params = {
        id: testAssignmentPolicyId,
      };

      let response;
      try {
        response = await service.getV2Policy(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.id).toEqual(testAssignmentPolicyId);
      expect(result.type).toEqual('authorization');
      expect(result.template).toBeDefined();
    });
    test('Delete policy assignment by id', async () => {
      expect(testAssignmentId).toBeDefined();
      const params = {
        assignmentId: testAssignmentId,
      };
      const response = await service.deletePolicyAssignment(params);
      expect(response.status).toBe(204);
    });
    test('Delete policy templates', async () => {
      const params = {
        policyTemplateId: testS2STemplateId,
      };

      let response;
      try {
        response = await service.deletePolicyTemplate(params);
      } catch (err) {
        console.warn(err);
      }

      expect(response).toBeDefined();
      expect(response.status).toEqual(204);
    });
  });

  describe('Access Management account settings tests', () => {
    test('GetSettings - Retrieve Access Management account settings by account ID', async () => {
      const getSettingsParams = {
        accountId: testAccountId,
        acceptLanguage: 'default',
      };
      let response;
      try {
        response = await service.getSettings(getSettingsParams);
      } catch (err) {
        console.warn(err);
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();
      expect(response.result).toHaveProperty('external_account_identity_interaction');
      expect(response.result.external_account_identity_interaction).toHaveProperty(
        'identity_types'
      );
      expect(response.result.external_account_identity_interaction.identity_types).toHaveProperty(
        'user'
      );
      expect(response.result.external_account_identity_interaction.identity_types).toHaveProperty(
        'service_id'
      );
      expect(response.result.external_account_identity_interaction.identity_types).toHaveProperty(
        'service'
      );
      testAccountSettingsETag = response.headers.etag;
    });
    test('UpdateSettings - Updates Access Management account settings by account ID', async () => {
      expect(testAccountSettingsETag).not.toBeNull();
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
        accountId: testAccountId,
        acceptLanguage: 'default',
        ifMatch: testAccountSettingsETag,
        externalAccountIdentityInteraction,
      };

      const response = await service.updateSettings(updateSettingsParams);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      expect(response.result).toBeDefined();
      expect(response.result).toHaveProperty('external_account_identity_interaction');
      const externalAccountIdentityInteractionResponse =
        response.result.external_account_identity_interaction;
      expect(externalAccountIdentityInteractionResponse).toHaveProperty('identity_types');
      expect(externalAccountIdentityInteractionResponse.identity_types).toHaveProperty('user');
      expect(externalAccountIdentityInteractionResponse.identity_types.user.state).toEqual(
        'monitor'
      );
      expect(externalAccountIdentityInteractionResponse.identity_types).toHaveProperty(
        'service_id'
      );
      expect(externalAccountIdentityInteractionResponse.identity_types.service_id.state).toEqual(
        'monitor'
      );
      expect(externalAccountIdentityInteractionResponse.identity_types).toHaveProperty('service');
      expect(externalAccountIdentityInteractionResponse.identity_types.service.state).toEqual(
        'monitor'
      );
    });
  });

  describe('Action Control Template tests', () => {
    test('Create an action control basic template', async () => {
      const testTemplateDescription = 'Node SDK Test template';
      const params = {
        name: testActionControlTemplateName,
        accountId: testAccountId,
        description: testTemplateDescription,
      };

      const response = await service.createActionControlTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.name).toEqual(testActionControlTemplateName);
      expect(result.description).toEqual(testTemplateDescription);
      expect(result.state).toEqual('active');
      testActionControlBasicTemplateId = result.id;
      testActionControlBasicTemplateVersion = result.version;
      testActionControlBasicTemplateETag = response.headers.etag;
    });
    test('Get an action control template basic version', async () => {
      expect(testActionControlBasicTemplateId).toBeDefined();
      expect(testActionControlBasicTemplateVersion).toBeDefined();
      const params = {
        actionControlTemplateId: testActionControlBasicTemplateId,
        version: testActionControlBasicTemplateVersion,
      };

      const response = await service.getActionControlTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.version).toEqual(testActionControlBasicTemplateVersion);
      expect(result.state).toEqual('active');
    });
    test('Replace an action control basic template', async () => {
      const testTemplateDescription = 'Node SDK Test template update';
      const name = `${TEST_TEMPLATE_PREFIX}ActionControlUpdate${testUniqueId}`;
      const params = {
        name,
        description: testTemplateDescription,
        ifMatch: testActionControlBasicTemplateETag,
        actionControlTemplateId: testActionControlBasicTemplateId,
        version: testActionControlBasicTemplateVersion,
      };

      const response = await service.replaceActionControlTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.name).toEqual(name);
      expect(result.description).toEqual(testTemplateDescription);
      expect(result.state).toEqual('active');
      testActionControlBasicTemplateETag = response.headers.etag;
    });
    test('Replace an action control basic template with action_control', async () => {
      const testTemplateDescription = 'Node SDK Test template update';
      const actionControl = {
        service_name: 'am-test-service',
        description: 'am-test-service service actionControl',
        actions: ['am-test-service.test.delete'],
      };
      const params = {
        description: testTemplateDescription,
        ifMatch: testActionControlBasicTemplateETag,
        actionControlTemplateId: testActionControlBasicTemplateId,
        actionControl,
        version: testActionControlBasicTemplateVersion,
      };

      const response = await service.replaceActionControlTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.description).toEqual(testTemplateDescription);
      expect(result.state).toEqual('active');
    });
    test('Delete an action control template version', async () => {
      const params = {
        actionControlTemplateId: testActionControlBasicTemplateId,
        version: testActionControlBasicTemplateVersion,
      };

      const response = await service.deleteActionControlTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(204);
    });
    test('Create an action control template', async () => {
      const actionControl = {
        service_name: 'am-test-service',
        description: 'am-test-service service actionControl',
        actions: ['am-test-service.test.delete'],
      };
      const response = await service.createActionControlTemplate({
        name: testActionControlTemplateName,
        accountId: testAccountId,
        description: 'Test ActionControl templates with action control',
        actionControl,
      });
      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.name).toEqual(testActionControlTemplateName);
      expect(result.state).toEqual('active');
      testActionControlTemplateId = result.id;
      testActionControlTemplateVersion = result.version;
      testActionControlTemplateETag = response.headers.etag;
    });
    test('Get an action control template by id', async () => {
      expect(testActionControlTemplateId).toBeDefined();
      const params = {
        actionControlTemplateId: testActionControlTemplateId,
      };

      const response = await service.getActionControlTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.state).toEqual('active');
    });
    test('Replace an action control template', async () => {
      expect(testActionControlTemplateId).toBeDefined();
      expect(testActionControlTemplateVersion).toBeDefined();
      expect(testActionControlTemplateETag).toBeDefined();

      const testTemplateDescription = 'Updated Node SDK Test template update';
      const actionControl = {
        service_name: 'am-test-service',
        description: 'am-test-service service actionControl',
        actions: ['am-test-service.test.delete'],
      };
      const params = {
        description: testTemplateDescription,
        ifMatch: testActionControlTemplateETag,
        actionControlTemplateId: testActionControlTemplateId,
        actionControl,
        version: testActionControlTemplateVersion,
      };

      const response = await service.replaceActionControlTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.description).toEqual(testTemplateDescription);
      expect(result.state).toEqual('active');
    });
    test('List action control templates', async () => {
      const params = {
        accountId: testAccountId,
        acceptLanguage: 'default',
      };

      const response = await service.listActionControlTemplates(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      let foundTestTemplate = false;
      for (const template of result.action_control_templates) {
        if (template.id === testActionControlTemplateId) {
          foundTestTemplate = true;
          break;
        }
      }
      expect(foundTestTemplate).toBeTruthy();
    });
    test('Create an action control template version', async () => {
      expect(testActionControlTemplateId).toBeDefined();
      expect(testActionControlTemplateVersion).toBeDefined();

      const testTemplateDescription = 'New version of SDK Test action control template';

      const actionControl = {
        service_name: 'am-test-service',
        description: 'am-test-service service actionControl',
        actions: ['am-test-service.test.create'],
      };
      const params = {
        description: testTemplateDescription,
        actionControlTemplateId: testActionControlTemplateId,
        actionControl,
        committed: true,
      };

      const response = await service.createActionControlTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(Number(result.version)).toBeGreaterThan(Number(testActionControlTemplateVersion));
      expect(result.state).toEqual('active');
      testActionControlTemplateUpdateVersion = result.version;
    });

    test('Get an action control template version', async () => {
      expect(testActionControlTemplateId).toBeDefined();
      expect(testActionControlTemplateVersion).toBeDefined();
      const params = {
        actionControlTemplateId: testActionControlTemplateId,
        version: testActionControlTemplateVersion,
      };

      const response = await service.getActionControlTemplateVersion(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.version).toEqual(testActionControlTemplateVersion);
      expect(result.state).toEqual('active');
    });
    test('Commit an action control template version', async () => {
      expect(testActionControlTemplateId).toBeDefined();
      expect(testActionControlTemplateVersion).toBeDefined();
      const params = {
        actionControlTemplateId: testActionControlTemplateId,
        version: testActionControlTemplateVersion,
      };

      const response = await service.commitActionControlTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toBe(204);
      const { result } = response || {};
      expect(result).toBeDefined();
    });
    test('List action control template versions', async () => {
      const response = await service.listActionControlTemplateVersions({
        actionControlTemplateId: testActionControlTemplateId,
      });
      expect(response).toBeDefined();
      expect(response.status).toBe(200);
      const { result } = response || {};
      expect(result).toBeDefined();
      const { versions: templates } = result || [];
      expect(templates).toHaveLength(2);
      expect(templates[0].version).not.toEqual(testActionControlTemplateUpdateVersion);
      expect(templates[0].state).toEqual('active');
    });

    describe('Action Control Assignment tests', () => {
      test('Create action control assignments', async () => {
        const params = {
          acceptLanguage: 'default',
          target: {
            id: testTargetAccountId,
            type: 'Account',
          },
          templates: [
            {
              id: testActionControlTemplateId,
              version: testActionControlTemplateVersion,
            },
          ],
        };
        const response = await service.createActionControlTemplateAssignment(params);
        expect(response).toBeDefined();
        expect(response.status).toBe(201);
        const { result } = response || {};
        expect(result).toBeDefined();
        testAssignmentId = result.assignments[0].id;
        testAssignmentETag = response.headers.etag;
        testAssignmentActionControlId =
          result.assignments[0].resources[0].action_control.resource_created.id;
      });
      test('Update action control assignment by id', async () => {
        expect(testAssignmentId).toBeDefined();
        const params = {
          assignmentId: testAssignmentId,
          templateVersion: testActionControlTemplateUpdateVersion,
          ifMatch: testAssignmentETag,
        };
        const response = await service.updateActionControlAssignment(params);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.result.resources[0].action_control.resource_created.id).toEqual(
          testAssignmentActionControlId
        );
      });
      test('List action control assignments', async () => {
        const params = {
          accountId: testAccountId,
          acceptLanguage: 'default',
        };
        const response = await service.listActionControlAssignments(params);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        const { result } = response || {};
        expect(result).toBeDefined();
      });
      test('Get action control assignment by id', async () => {
        expect(testAssignmentId).toBeDefined();
        const params = {
          assignmentId: testAssignmentId,
        };
        const response = await service.getActionControlAssignment(params);
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.result).toBeDefined();
      });
      test('Delete action control assignment by id', async () => {
        expect(testAssignmentId).toBeDefined();
        const params = {
          assignmentId: testAssignmentId,
        };
        const response = await service.deleteActionControlAssignment(params);
        expect(response.status).toBe(204);
      });
      test('Delete action control templates', async () => {
        const params = {
          actionControlTemplateId: testActionControlTemplateId,
        };

        let response;
        try {
          response = await service.deleteActionControlTemplate(params);
        } catch (err) {
          console.warn(err);
        }

        expect(response).toBeDefined();
        expect(response.status).toEqual(204);
      });
    });

    test('Clean up all test action control templates', async () => {
      // List all action control templates in the account
      const params = {
        accountId: testAccountId,
      };

      let response;
      try {
        response = await service.listActionControlTemplates(params);
      } catch (err) {
        console.warn(err);
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      const { result } = response || {};
      expect(result).toBeDefined();

      // Iterate across the action control templates
      let template;
      for (template of result.action_control_templates) {
        // Delete the test policy (or any test action control templates older than 5 minutes)
        const createdAt = Date.parse(template.created_at);
        const FIVE_MINUTES = 5 * 60 * 1000;
        const fiveMinutesAgo = Date.now() - FIVE_MINUTES;
        if (
          template.name.startsWith(TEST_TEMPLATE_PREFIX) &&
          (template.id === testActionControlBasicTemplateId ||
            template.id === testActionControlTemplateId ||
            createdAt < fiveMinutesAgo)
        ) {
          const params = {
            actionControlTemplateId: template.id,
          };
          let response;
          try {
            response = await service.deleteActionControlTemplate(params);
          } catch (err) {
            console.warn(err);
          }

          expect(response).toBeDefined();
          expect(response.status).toEqual(204);
        }
      }
    });
  });

  describe('Role Template & Assignment tests', () => {
    test('createRoleTemplate()', async () => {
      const testTemplateDescription = 'Node SDK Test Role template Create';

      // Request models needed by this operation.

      // TemplateRole
      const templateRoleModel = {
        name: testCustomRoleName,
        display_name: testCustomRoleDisplayName,
        service_name: 'am-test-service',
        description: testCustomRoleDescription,
        actions: ['am-test-service.test.create'],
      };

      const params = {
        name: testCustomRoleTemplateName,
        accountId: testAccountId,
        description: testTemplateDescription,
        role: templateRoleModel,
        acceptLanguage: 'default',
      };

      const res = await service.createRoleTemplate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(201);
      expect(res.result).toBeDefined();
      const { result } = res || {};
      testRoleTemplateId = result.id;
      testRoleTemplateVersion = result.version;
      testRoleTemplateETag = res.headers.etag;
    });

    test('createRolePolicyTemplate()', async () => {
      const testRolePolicyTemplate = {
        ...testTemplatePolicy,
        resource: {
          attributes: [
            {
              key: 'serviceName',
              operator: 'stringEquals',
              value: 'am-test-service',
            },
          ],
        },
        control: {
          grant: {
            roles: policyRoles,
            role_template_references: [
              {
                id: testRoleTemplateId,
                version: testRoleTemplateVersion,
              },
            ],
          },
        },
      };
      const testTemplateDescription = 'SDK Test template with viewer role';
      const params = {
        name: testTemplateName,
        accountId: testAccountId,
        policy: testRolePolicyTemplate,
        description: testTemplateDescription,
      };

      const response = await service.createPolicyTemplate(params);
      expect(response).toBeDefined();
      expect(response.status).toEqual(201);
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.policy).toEqual(testRolePolicyTemplate);
      expect(result.name).toEqual(testTemplateName);
      expect(result.description).toEqual(testTemplateDescription);
      expect(result.state).toEqual('active');
      testRolePolicyTemplateId = result.id;
    });

    test('getRoleTemplate()', async () => {
      const params = {
        roleTemplateId: testRoleTemplateId,
        state: 'active',
      };

      const res = await service.getRoleTemplate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('replaceRoleTemplate()', async () => {
      // Request models needed by this operation.

      // TemplateRole
      const templateRoleModel = {
        display_name: `${testCustomRoleDisplayName} Updated`,
        description: 'am-test-service service customRole',
        actions: ['am-test-service.test.delete'],
      };
      const params = {
        roleTemplateId: testRoleTemplateId,
        version: testRoleTemplateVersion,
        ifMatch: testRoleTemplateETag,
        role: templateRoleModel,
        committed: true,
      };

      const res = await service.replaceRoleTemplate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('listRoleTemplates()', async () => {
      const params = {
        accountId: testAccountId,
        state: 'active',
      };

      const res = await service.listRoleTemplates(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('listRoleTemplates() via RoleTemplatesPager', async () => {
      const params = {
        accountId: testAccountId,
        state: 'active',
        limit: 10,
      };

      const allResults = [];

      // Test getNext().
      let pager = new IamPolicyManagementV1.RoleTemplatesPager(service, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }

      // Test getAll().
      pager = new IamPolicyManagementV1.RoleTemplatesPager(service, params);
      const allItems = await pager.getAll();
      expect(allItems).not.toBeNull();
      expect(allItems).toHaveLength(allResults.length);
      console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
    });

    test('createRoleTemplateVersion()', async () => {
      // Request models needed by this operation.

      // TemplateRole
      const templateRoleModel = {
        display_name: `${testCustomRoleDisplayName}TemplateVersion`,
        description: 'am-test-service versioon customRole',
        actions: ['am-test-service.test.create'],
      };

      const params = {
        roleTemplateId: testRoleTemplateId,
        role: templateRoleModel,
        description: 'testString',
      };

      const res = await service.createRoleTemplateVersion(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(201);
      expect(res.result).toBeDefined();
      const { result } = res || {};
      testRoleTemplateVersion = result.version;
      testRoleTemplateETag = res.headers.etag;
    });

    test('listRoleTemplateVersions()', async () => {
      const params = {
        roleTemplateId: testRoleTemplateId,
        state: 'active',
        limit: 50,
      };

      const res = await service.listRoleTemplateVersions(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('listRoleTemplateVersions() via RoleTemplateVersionsPager', async () => {
      const params = {
        roleTemplateId: testRoleTemplateId,
        state: 'active',
        limit: 10,
      };

      const allResults = [];

      // Test getNext().
      let pager = new IamPolicyManagementV1.RoleTemplateVersionsPager(service, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }

      // Test getAll().
      pager = new IamPolicyManagementV1.RoleTemplateVersionsPager(service, params);
      const allItems = await pager.getAll();
      expect(allItems).not.toBeNull();
      expect(allItems).toHaveLength(allResults.length);
      console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
    });

    test('getRoleTemplateVersion()', async () => {
      const params = {
        roleTemplateId: testRoleTemplateId,
        version: testRoleTemplateVersion,
      };

      const res = await service.getRoleTemplateVersion(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('commitRoleTemplate()', async () => {
      const params = {
        roleTemplateId: testRoleTemplateId,
        version: testRoleTemplateVersion,
      };

      const res = await service.commitRoleTemplate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    });

    test('createRoleTemplateAssignment()', async () => {
      // Request models needed by this operation.

      // AssignmentTargetDetails
      const assignmentTargetDetailsModel = {
        type: 'Account',
        id: testTargetAccountId,
      };

      // RoleAssignmentTemplate
      const roleAssignmentTemplateModel = {
        id: testRoleTemplateId,
        version: testRoleTemplateVersion,
      };

      const params = {
        target: assignmentTargetDetailsModel,
        templates: [roleAssignmentTemplateModel],
        acceptLanguage: 'default',
      };

      const res = await service.createRoleTemplateAssignment(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(201);
      expect(res.result).toBeDefined();
      const { result } = res || {};
      testAssignmentId = result.assignments[0].id;
      testAssignmentETag = res.headers.etag;
    });

    test('getRoleAssignment()', async () => {
      const params = {
        assignmentId: testAssignmentId,
      };

      const res = await service.getRoleAssignment(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('updateRoleAssignment()', async () => {
      const params = {
        assignmentId: testAssignmentId,
        ifMatch: testAssignmentETag,
        templateVersion: testRoleTemplateVersion,
      };

      const res = await service.updateRoleAssignment(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
    });

    test('deleteRoleAssignment()', async () => {
      const params = {
        assignmentId: testAssignmentId,
      };

      const res = await service.deleteRoleAssignment(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    });

    test('deleteRolePolicyTemplate()', async () => {
      const params = {
        policyTemplateId: testRolePolicyTemplateId,
      };

      const res = await service.deletePolicyTemplate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    });

    test('deleteRoleTemplateVersion()', async () => {
      const params = {
        roleTemplateId: testRoleTemplateId,
        version: testRoleTemplateVersion,
      };

      const res = await service.deleteRoleTemplateVersion(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    });

    test('deleteRoleTemplate()', async () => {
      const params = {
        roleTemplateId: testRoleTemplateId,
      };

      const res = await service.deleteRoleTemplate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    });
  });
});
