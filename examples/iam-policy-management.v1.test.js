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

  // begin-common

  const iamPolicyManagementService = IamPolicyManagementV1.newInstance({});

  // end-common

  const config = readExternalSources(IamPolicyManagementV1.DEFAULT_SERVICE_NAME);

  test('listPolicies request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_policies

    const params = {
      accountId: 'testAccountId',
      format: 'include_last_permit',
    };

    iamPolicyManagementService.listPolicies(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_policies
  });
  test('createPolicy request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_policy

    const policySubjects = [
      {
        attributes: [
          {
            name: 'iam_id',
            value: 'IBMid-12345',
          },
        ],
      },
    ];
    const policyRoles = [
      {
        role_id: 'crn:v1:bluemix:public:iam::::role:Viewer',
      },
    ];
    const policyResourceAccountAttribute = {
      name: 'accountId',
      value: 'testAccountId',
      operator: 'stringEquals',
    };
    const policyResourceServiceAttribute = {
      name: 'serviceName',
      value: 'testServiceName',
      operator: 'stringEquals',
    };
    const policyResourceTag = {
      name: 'project',
      value: 'moonshoot',
    };
    const samplePolicyResources = [
      {
        attributes: [policyResourceAccountAttribute, policyResourceServiceAttribute],
        tags: [policyResourceTag],
      },
    ];
    const params = {
      type: 'access',
      subjects: policySubjects,
      roles: policyRoles,
      resources: samplePolicyResources,
    };

    iamPolicyManagementService.createPolicy(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_policy
  });
  test('updatePolicy request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_policy

    const policySubjects = [
      {
        attributes: [
          {
            name: 'iam_id',
            value: 'IBMid-12345',
          },
        ],
      },
    ];
    const policyResourceAccountAttribute = {
      name: 'accountId',
      value: 'testAccountId',
      operator: 'stringEquals',
    };
    const policyResourceServiceAttribute = {
      name: 'serviceName',
      value: 'testServiceName',
      operator: 'stringEquals',
    };
    const samplePolicyResources = [
      {
        attributes: [policyResourceAccountAttribute, policyResourceServiceAttribute],
      },
    ];
    const updatedPolicyRoles = [
      {
        role_id: 'crn:v1:bluemix:public:iam::::role:Editor',
      },
    ];
    const params = {
      policyId: 'testPolicyId',
      ifMatch: 'testETagExistingPolicy',
      type: 'access',
      subjects: policySubjects,
      roles: updatedPolicyRoles,
      resources: samplePolicyResources,
    };

    iamPolicyManagementService.updatePolicy(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_policy
  });
  test('getPolicy request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_policy

    const params = {
      policyId: 'testPolicyId',
    };

    iamPolicyManagementService.getPolicy(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_policy
  });
  test('listRoles request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_roles

    iamPolicyManagementService.listRoles({})
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_roles
  });
  test('createRole request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_role

    const params = {
      displayName: 'IAM Groups read access',
      actions: ['iam-groups.groups.read'],
      name: 'ExampleRoleIAMGroups',
      accountId: 'testAccountId',
      serviceName: 'iam-groups',
    };

    iamPolicyManagementService.createRole(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_role
  });
  test('updateRole request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_role

    const updatedRoleId = ['iam-groups.groups.read', 'iam-groups.groups.list'];
    const params = {
      roleId: 'testRoleId',
      ifMatch: 'testETagExistingRole',
      actions: updatedRoleId,
    };

    iamPolicyManagementService.updateRole(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_role
  });
  test('getRole request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_role

    const params = {
      roleId: 'testRoleId',
    };

    iamPolicyManagementService.getRole(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_role
  });
  test('deleteRole request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_role

    const params = {
      roleId: 'testRoleId',
    };

    iamPolicyManagementService.deleteRole(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_role
  });
  test('deletePolicy request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_policy

    const params = {
      policyId: 'testPolicyId',
    };

    iamPolicyManagementService.deletePolicy(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_policy
  });
});
