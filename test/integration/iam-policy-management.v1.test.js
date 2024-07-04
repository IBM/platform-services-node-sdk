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
  let testTargetEnterpriseAccountId;
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
  const TEST_TEMPLATE_PREFIX = 'SDKNode';
  const testTemplateName = TEST_TEMPLATE_PREFIX + testUniqueId;
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
    expect(config).toHaveProperty('testTargetEnterpriseAccountId');

    // Retrieve the test account id and target account_id to be used with the tests.
    testAccountId = config.testAccountId;
    testTargetAccountId = config.testTargetAccountId;
    testTargetEnterpriseAccountId = config.testTargetEnterpriseAccountId;
    policyResourceAccountAttribute.value = testAccountId;

    expect(testAccountId).not.toBeNull();
    expect(testTargetEnterpriseAccountId).not.toBeNull();
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
    test('Create policy assignments error out check the input parameters target type is not one of enum values', async () => {
      const params = {
        acceptLanguage: 'default',
        version: '1.0',
        target: {
          id: testTargetEnterpriseAccountId,
          type: 'Enterprise',
        },
        templates: [
          {
            id: testS2STemplateId,
            version: testS2STemplateBaseVersion,
          },
        ],
      };

      try {
        await service.createPolicyTemplateAssignment(params);
      } catch (err) {
        expect(err).toBeTruthy(); // This assertion ensures that the test passes when an error occurs
        expect(err.status).toBe(400);
        expect(err.statusText).toBe('Bad Request');
        expect(err.body).toContain(
          'Invalid body format. Check the input parameters. instance.target.type is not one of enum values: Account'
        );
      }
    });

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
});
