/* eslint-disable no-console */
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
const EnterpriseManagementV1 = require('../../dist/enterprise-management/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'enterprise_management.env';

const accountGroups = [];
const accounts = [];
const enterprises = [];
const describe = authHelper.prepareTests(configFile);
let createdAccountId = undefined;

describe('EnterpriseManagementV1_integration', () => {
  const enterpriseManagementService = EnterpriseManagementV1.newInstance({});

  expect(enterpriseManagementService).not.toBeNull();

  const config = readExternalSources(EnterpriseManagementV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  const enterpriseId = config.enterpriseId;
  expect(enterpriseId).not.toBeNull();
  const accountId = config.accountId;
  expect(accountId).not.toBeNull();
  const accountIamId = config.accountIamId;
  expect(accountIamId).not.toBeNull();

  jest.setTimeout(timeout);

  test('createAccountGroup()', async () => {
    const accountGroupCrn = `crn:v1:bluemix:public:enterprise::a/${accountId}::enterprise:${enterpriseId}`;
    const params = {
      parent: accountGroupCrn,
      name: 'First Example Account Group Name',
      primaryContactIamId: accountIamId,
    };

    const res = await enterpriseManagementService.createAccountGroup(params);

    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test('listAccountGroups()', async () => {
    const params = {
      enterpriseId: enterpriseId,
    };

    const res = await enterpriseManagementService.listAccountGroups(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listAccountGroups()', async () => {
    let nextDocid = null;
    const limit = 10;

    const params = {
      enterpriseId: enterpriseId,
      limit: limit,
    };

    do {
      params.nextDocid = nextDocid;

      const res = await enterpriseManagementService.listAccountGroups(params);
      expect(res).toBeDefined();
      expect(res.result).toBeDefined();

      accountGroups.push(...res.result.resources);

      if (res.result.next_url) {
        nextDocid = getNextDocid(res.result.next_url);
      } else {
        nextDocid = null;
      }
    } while (nextDocid != null);
    console.log(`Received a total of ${accountGroups.length} account groups.`);
  });
  test('getAccountGroup()', async () => {
    const accountGroup = getRandomElementsIdFromList(accountGroups);
    const params = {
      accountGroupId: accountGroup.id,
    };

    const res = await enterpriseManagementService.getAccountGroup(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateAccountGroup()', async () => {
    const accountGroup = getRandomElementsIdFromList(accountGroups);
    const params = {
      accountGroupId: accountGroup.id,
      name: 'Updated Example Account Group Name',
      primaryContactIamId: accountIamId,
    };

    const res = await enterpriseManagementService.updateAccountGroup(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('createAccount()', async () => {
    const accountGroup = getRandomElementsIdFromList(accountGroups);
    const crn = `crn:v1:bluemix:public:enterprise::a/${accountId}::account-group:${accountGroup.id}`;
    const params = {
      parent: crn,
      name: 'New Example Account',
      ownerIamId: accountIamId,
    };

    const res = await enterpriseManagementService.createAccount(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();

    createdAccountId = res.result.account_id;
  });
  test('listAccounts()', async () => {
    let nextDocid = null;
    const limit = 1;

    const params = {
      enterpriseId: enterpriseId,
      limit: limit,
    };

    do {
      params.nextDocid = nextDocid;

      const res = await enterpriseManagementService.listAccounts(params);
      expect(res).toBeDefined();
      expect(res.result).toBeDefined();

      accounts.push(...res.result.resources);

      if (res.result.next_url) {
        nextDocid = getNextDocid(res.result.next_url);
      } else {
        nextDocid = null;
      }
    } while (nextDocid != null);

    console.log(`Received a total of ${accounts.length} accounts.`);
  });
  test('getAccount()', async () => {
    const account = getRandomElementsIdFromList(accounts);
    const params = {
      accountId: account.id,
    };

    const res = await enterpriseManagementService.getAccount(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateAccount()', async () => {
    const accountGroup = getRandomElementsIdFromList(accountGroups);
    const crn = `crn:v1:bluemix:public:enterprise::a/${accountId}::account-group:${accountGroup.id}`;
    const params = {
      accountId: createdAccountId,
      parent: crn,
    };

    const res = await enterpriseManagementService.updateAccount(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listEnterprises()', async () => {
    let nextDocid = null;
    const limit = 1;

    const params = {
      accountId: accountId,
      limit: limit,
    };

    do {
      params.nextDocid = nextDocid;

      const res = await enterpriseManagementService.listEnterprises(params);
      expect(res).toBeDefined();
      expect(res.result).toBeDefined();

      enterprises.push(...res.result.resources);

      if (res.result.next_url) {
        nextDocid = getNextDocid(res.result.next_url);
      } else {
        nextDocid = null;
      }
    } while (nextDocid != null);

    console.log(`Received a total of ${enterprises.length} enterprises.`);
  });
  test('getEnterprise()', async () => {
    const enterprise = getRandomElementsIdFromList(enterprises);
    const params = {
      enterpriseId: enterprise.id,
    };

    const res = await enterpriseManagementService.getEnterprise(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateEnterprise()', async () => {
    const params = {
      enterpriseId: enterpriseId,
      name: 'Updated Enterprise Name',
      primaryContactIamId: accountIamId,
    };

    const res = await enterpriseManagementService.updateEnterprise(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});

function getNextDocid(urlstring) {
  let offset = null;
  if (urlstring) {
    // We use a bogus "baseurl" in case "urlstring" is a relative url.
    // This is fine since we're only trying to retrieve the "offset" query parameter.
    const url = new URL(urlstring, 'https://fakehost.com');
    offset = url.searchParams.get('next_docid');
  }
  return offset;
}

function getRandomElementsIdFromList(list) {
  const randomNumber = Math.floor(Math.random() * list.length);
  return list[randomNumber];
}
