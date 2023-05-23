/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2021, 2022.
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

const EnterpriseManagementV1 = require('../dist/enterprise-management/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the Enterprise Management service.
//
// The following configuration properties are assumed to be defined:
// ENTERPRISE_MANAGEMENT_URL=<service base url>
// ENTERPRISE_MANAGEMENT_AUTH_TYPE=iam
// ENTERPRISE_MANAGEMENT_APIKEY=<IAM apikey>
// ENTERPRISE_MANAGEMENT_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// ENTERPRISE_MANAGEMENT_ENTERPRISE_ID=<ID of the enterprise>
// ENTERPRISE_MANAGEMENT_ACCOUNT_ID=<enterprise account ID>
// ENTERPRISE_MANAGEMENT_ACCOUNT_IAM_ID=<IAM ID of the enterprise account>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'enterprise_management.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

const timeout = 30000;

let accountId = null;
let accountGroupId = null;
let newParentAccountGroupId = null;
let newAccountId = null;

describe('EnterpriseManagementV1', () => {

  // begin-common

  const enterpriseManagementService = EnterpriseManagementV1.newInstance({});

  // end-common

  const config = readExternalSources(EnterpriseManagementV1.DEFAULT_SERVICE_NAME);

  const enterpriseId = config.enterpriseId;
  const enterpriseAccountId = config.accountId;
  const enterpriseAccountIamId = config.accountIamId;

  expect(enterpriseId).not.toBeNull();
  expect(enterpriseAccountId).not.toBeNull();
  expect(enterpriseAccountIamId).not.toBeNull();

  jest.setTimeout(timeout);

  test('createAccountGroup request example', async () => {

    const parentCrn = 'crn:v1:bluemix:public:enterprise::a/' + enterpriseAccountId + '::enterprise:' + enterpriseId;

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createAccountGroup() result:');
    // begin-create_account_group

    const params = {
      parent: parentCrn,
      name: 'Example Account Group',
      primaryContactIamId: enterpriseAccountIamId,
    };

    let res;
    try {
      res = await enterpriseManagementService.createAccountGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    accountGroupId = res.result.account_group_id;

    params.name = 'New Example Account Group';

    try {
      res = await enterpriseManagementService.createAccountGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_account_group
    newParentAccountGroupId = res.result.account_group_id;

  });
  test('listAccountGroups request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccountGroups() result:');
    // begin-list_account_groups

    const params = {
      enterpriseId: enterpriseId,
    };

    const allResults = [];
    try {
      const pager = new EnterpriseManagementV1.AccountGroupsPager(enterpriseManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_account_groups
  });
  test('getAccountGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountGroupId).not.toBeNull();

    originalLog('getAccountGroup() result:');
    // begin-get_account_group

    const params = {
      accountGroupId: accountGroupId,
    };

    try {
      const res = await enterpriseManagementService.getAccountGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_account_group
  });
  test('updateAccountGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountGroupId).not.toBeNull();

    // begin-update_account_group

    const params = {
      accountGroupId: accountGroupId,
      name: 'Updated Example Account Group',
      primaryContactIamId: enterpriseAccountIamId,
    };

    try {
      await enterpriseManagementService.updateAccountGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_account_group
  });
  test('deleteAccountGroup request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_account_group

    const params = {
      accountGroupId,
    };

    try {
      await enterpriseManagementService.deleteAccountGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_account_group
  });
  test('createAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountGroupId).not.toBeNull();

    const parentCrn = 'crn:v1:bluemix:public:enterprise::a/' + enterpriseAccountId + '::account-group:' + accountGroupId;

    originalLog('createAccount() result:');
    // begin-create_account

    const params = {
      parent: parentCrn,
      name: 'Example Account',
      ownerIamId: enterpriseAccountIamId,
    };

    let res;
    try {
      res = await enterpriseManagementService.createAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    accountId = res.result.account_id;

    params.name = 'New Example Account';

    try {
      res = await enterpriseManagementService.createAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_account
    newAccountId = res.result.account_id;
  });
  test.skip('importAccountToEnterprise request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    const importAccountId = '<accountid_to_be_imported>';

    // begin-import_account_to_enterprise

    const params = {
      enterpriseId: enterpriseId,
      accountId: importAccountId,
    };

    try {
      await enterpriseManagementService.importAccountToEnterprise(params);
    } catch (err) {
      console.warn(err);
    }

    // end-import_account_to_enterprise
  });
  test('listAccounts request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccounts() result:');
    // begin-list_accounts

    const params = {
      enterpriseId: enterpriseId,
    };

    const allResults = [];
    try {
      const pager = new EnterpriseManagementV1.AccountsPager(enterpriseManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_accounts
  });
  test('getAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountId).not.toBeNull();

    originalLog('getAccount() result:');
    // begin-get_account

    const params = {
      accountId: accountId,
    };

    try {
      const res = await enterpriseManagementService.getAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_account
  });
  test('updateAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(newAccountId).not.toBeNull();
    expect(newParentAccountGroupId).not.toBeNull();

    const newParentCrn = 'crn:v1:bluemix:public:enterprise::a/' + enterpriseAccountId + '::account-group:' + newParentAccountGroupId;

    // begin-update_account

    const params = {
      accountId: newAccountId,
      parent: newParentCrn,
    };

    try {
      await enterpriseManagementService.updateAccount(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_account
  });
  test('deleteAccount request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_account

    const params = {
      accountId,
    };

    try {
      await enterpriseManagementService.deleteAccount(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_account
  });
  test.skip('createEnterprise request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createEnterprise() result:');

    const srcAccountId = '<standalone_account_id>';
    const contactIamId = '<standalone_account_iam_id>';

    // begin-create_enterprise

    const params = {
      sourceAccountId: srcAccountId,
      name: 'Example Enterprise',
      primaryContactIamId: contactIamId,
    };

    try {
      const res = await enterpriseManagementService.createEnterprise(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_enterprise
  });
  test('listEnterprises request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listEnterprises() result:');
    // begin-list_enterprises

    const params = {
      accountId: enterpriseAccountId,
    };

    const allResults = [];
    try {
      const pager = new EnterpriseManagementV1.EnterprisesPager(enterpriseManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_enterprises
  });
  test('getEnterprise request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getEnterprise() result:');
    // begin-get_enterprise

    const params = {
      enterpriseId: enterpriseId,
    };

    try {
      const res = await enterpriseManagementService.getEnterprise(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_enterprise
  });
  test('updateEnterprise request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-update_enterprise

    const params = {
      enterpriseId: enterpriseId,
      name: 'Updated Example Enterprise',
      primaryContactIamId: enterpriseAccountIamId,
    };

    try {
      await enterpriseManagementService.updateEnterprise(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_enterprise
  });
});
