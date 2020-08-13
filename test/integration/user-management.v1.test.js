/* eslint-disable no-console */
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
const UserManagementV1 = require('../../dist/user-management/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'user_management.env';

const describe = authHelper.prepareTests(configFile);

describe('UserManagementV1_integration', () => {
  const userManagementService = UserManagementV1.newInstance({});

  jest.setTimeout(timeout);

  test('getUserSettings()', done => {
    const params = {
      accountId: 'testString',
      iamId: 'testString',
    };

    userManagementService.getUserSettings(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('updateUserSettings()', done => {
    const params = {
      accountId: 'testString',
      iamId: 'testString',
      language: 'testString',
      notificationLanguage: 'testString',
      allowedIpAddresses: '32.96.110.50,172.16.254.1',
      selfManage: true,
    };

    userManagementService.updateUserSettings(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('listUsers()', done => {
    const params = {
      accountId: 'testString',
      state: 'testString',
    };

    userManagementService.listUsers(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('inviteUsers()', done => {
    // Request models needed by this operation.

    // InviteUser
    const inviteUserModel = {
      email: 'testString',
      account_role: 'testString',
    };

    // Role
    const roleModel = {
      role_id: 'testString',
    };

    // Attribute
    const attributeModel = {
      name: 'testString',
      value: 'testString',
    };

    // Resource
    const resourceModel = {
      attributes: [attributeModel],
    };

    // InviteUserIamPolicy
    const inviteUserIamPolicyModel = {
      roles: [roleModel],
      resources: [resourceModel],
    };

    const params = {
      accountId: 'testString',
      users: [inviteUserModel],
      iamPolicy: [inviteUserIamPolicyModel],
      accessGroups: ['testString'],
    };

    userManagementService.inviteUsers(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('getUserProfile()', done => {
    const params = {
      accountId: 'testString',
      iamId: 'testString',
    };

    userManagementService.getUserProfile(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('updateUserProfiles()', done => {
    const params = {
      accountId: 'testString',
      iamId: 'testString',
      firstname: 'testString',
      lastname: 'testString',
      state: 'testString',
      email: 'testString',
      phonenumber: 'testString',
      altphonenumber: 'testString',
      photo: 'testString',
    };

    userManagementService.updateUserProfiles(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('removeUsers()', done => {
    const params = {
      accountId: 'testString',
      iamId: 'testString',
    };

    userManagementService.removeUsers(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
});
