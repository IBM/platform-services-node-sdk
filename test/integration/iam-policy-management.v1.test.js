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
  const testUniqueId = Math.floor(Math.random() * 100000);
  const testUserId = `IBMid-SDKNode${testUniqueId}`;
  const testViewerRoleCrn = 'crn:v1:bluemix:public:iam::::role:Viewer';
  const testEditorRoleCrn = 'crn:v1:bluemix:public:iam::::role:Editor';
  const testServiceName = 'iam-groups';
  const policyType = 'access';
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

  test('should successfully complete initialization', (done) => {
    // Initialize the service client.
    service = IamPolicyManagementV1.newInstance();

    // Grab our test-specific config properties.
    config = readExternalSources(IamPolicyManagementV1.DEFAULT_SERVICE_NAME);

    expect(service).not.toBeNull();
    expect(config).not.toBeNull();
    expect(config).toHaveProperty('testAccountId');

    // Retrieve the test account id to be used with the tests.
    testAccountId = config.testAccountId;
    policyResourceAccountAttribute.value = testAccountId;

    expect(testAccountId).not.toBeNull();
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
});
