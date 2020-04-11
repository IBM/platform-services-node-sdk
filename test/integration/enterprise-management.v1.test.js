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

const EnterpriseManagementV1 = require('../../dist/enterprise-management/v1');
// const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (10s).
const timeout = 10000;

// Location of our config file.
const configFile = 'enterprise-management.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

const parent = 'crn:v1:bluemix:public:enterprise::a/74bcc349d963484f82e8279ba310c6df::enterprise:cbbb066a123a40ebadb806a293655aec';
const name = 'IBM-1586402147632';
const primaryContactIamId = 'IBMid-550006CNQ6';
const limit = 100;
const enterpriseId = '1b1d66e78e5941708e5775728ab22c51';
const parentAccountGroupId = '7e96629680604e0b9de15712c84719eb';
const accountId = 'b8a7c19fa050430b997c20c636bead83';

describe('EnterpriseManagementV1_integration', () => {
  jest.setTimeout(timeout);

  let service;

  it('should successfully complete initialization', done => {
    service = EnterpriseManagementV1.newInstance({});
    expect(service).not.toBeNull();
    done();
  });

  it('should create an account group', done => {
    const params = {
      parent: parent,
      name: name,
      primaryContactIamId: primaryContactIamId,
    };
    return service
      .createAccountGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(201);
        done();
      })
      .catch(err => {
        console.log('createAccountGroup error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should get account groups by query parameter', done => {
    const params = {
      enterpriseId: enterpriseId,
      parentAccountGroupId: parentAccountGroupId,
      parent: parent,
      limit: limit,
    };
    service
      .listAccountGroups(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log('listAccountGroups error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should get account group by id', done => {
    const params = {
      accountGroupId: parentAccountGroupId,
    };
    return service
      .getAccountGroupById(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log('getAccountGroupById error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should update an account group', done => {
    const params = {
      name: name,
      primaryContactIamId: primaryContactIamId,
      accountGroupId: parentAccountGroupId,
    };
    return service
      .updateAccountGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(204);
        done();
      })
      .catch(err => {
        console.log('updateAccountGroup error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should get permissible actions for an account group.', done => {
    const params = {
      actions: ['testString'],
      accountGroupId: parentAccountGroupId,
    };
    return service
      .getAccountGroupPermissibleActions(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log('getAccountGroupPermissibleActions error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should import an account into an enterprise', done => {
    const params = {
      parent: parent,
      billingUnitId: 'testString',
      enterpriseId: enterpriseId,
      accountId: accountId,
    };
    return service
      .importAccountToEnterprise(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(202);
        done();
      })
      .catch(err => {
        console.log('importAccountToEnterprise error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should create a new account in an enterprise', done => {
    const params = {
      parent: parent,
      name: name,
      ownerIamId: primaryContactIamId,
    };
    return service
      .createAccount(params)
      .then(response => {
	console.log("createAccount response: ", JSON.stringify(response, null, 4));
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(201);
        done();
      })
      .catch(err => {
        console.log('createAccount error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should get accounts by query parameter', done => {
    const params = {
      enterpriseId: enterpriseId,
      accountGroupId: parentAccountGroupId,
      parent: parent,
      limit: limit,
    };
    return service
      .listAccounts(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log('listAccounts (by query param) error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should get account by id', done => {
    const params = {
      accountId: accountId,
    };
    return service
      .getAccountById(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log('getAccountById error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should move an account with the enterprise', done => {
    const params = {
      parent: parent,
      accountId: accountId,
    };
    return service
      .updateAccount(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(204);
        done();
      })
      .catch(err => {
        console.log('updateAccount error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });

  it('should get permissible actions for an account', done => {
    const params = {
      actions: ['testString'],
      accountId: accountId,
    };
    return service
      .getAccountPermissibleActions(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        console.log('getAccountPermissibleActions error: ', JSON.stringify(err, null, 4));
        done(err);
      });
  });
});
