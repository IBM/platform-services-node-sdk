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

const describe = authHelper.prepareTests(configFile);
const firstExampleAccountName = 'First Example Account Name';

describe('EnterpriseManagementV1_integration', () => {
  const enterpriseManagementService = EnterpriseManagementV1.newInstance({});
  
  expect(enterpriseManagementService).not.toBeNull();
  
  const config = readExternalSources(EnterpriseManagementV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();
  const url = config.url;
  expect(url).not.toBeNull();
  const authType = config.authtype;
  expect(authType).not.toBeNull();
  const authUrl = config.authUrl;
  expect(authUrl).not.toBeNull();
  const apiKey = config.apikey;
  expect(apiKey).not.toBeNull();
  const enterpriseId = config.enterpriseId;
  expect(enterpriseId).not.toBeNull();
  const accountId = config.accountId;
  expect(accountId).not.toBeNull();
  const accountIamId = config.accountIamId;
  expect(accountIamId).not.toBeNull();
  
  jest.setTimeout(timeout);
  
  test.skip('createAccountGroup()', async () => {
    const accountGroupCrn = `crn:v1:bluemix:public:enterprise::a/${accountId}::enterprise:${enterpriseId}`;
    const params = {
      parent: accountGroupCrn,
      name: firstExampleAccountName,
      primaryContactIamId: accountIamId,
    };
    const res = await enterpriseManagementService.createAccountGroup(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });
  test.skip('listAccountGroups()', async () => {
    const params = {
      enterpriseId: enterpriseId,
    };
    
    const res = await enterpriseManagementService.listAccountGroups(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listAccountGroups() with pagination', async () => {
    const accountGroups = [];
    let nextDocId = null;
    const limit = 10;
    let counter = 1;
    
    try {
      do {
        console.log('iteration:', counter);
        const params = {
          enterpriseId: enterpriseId,
          limit: limit,
          nextDocId: nextDocId,
        };
        console.log('params:', params);
        const res = await enterpriseManagementService.listAccountGroups(params);
        expect(res).toBeDefined();
        expect(res.result).toBeDefined();
        console.log('size:', res.result.rows_count);
        console.log(res.result);
        accountGroups.push(...res.result.resources);
        console.log('next_url:', res.result.next_url);
        if (res.result.next_url) {
          nextDocId = getNextDocId(res.result.next_url);
        } else {
          nextDocId = null;
        }
        console.log('next_docid:', nextDocId);
        counter++;
      } while (nextDocId != null);
    } catch (err) {
      console.log(err);
    }
    console.log(`listAccountGroups returned ${accountGroups.length} account groups.`);
  });
  test.skip('getAccountGroup()', async () => {
    const params = {
      accountGroupId: 'testString',
    };
    
    const res = await enterpriseManagementService.getAccountGroup(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('updateAccountGroup()', async () => {
    const params = {
      accountGroupId: 'testString',
      name: 'testString',
      primaryContactIamId: 'testString',
    };
    
    const res = await enterpriseManagementService.updateAccountGroup(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('importAccountToEnterprise()', async () => {
    const params = {
      enterpriseId: 'testString',
      accountId: 'testString',
      parent: 'testString',
      billingUnitId: 'testString',
    };
    
    const res = await enterpriseManagementService.importAccountToEnterprise(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('createAccount()', async () => {
    const params = {
      parent: 'testString',
      name: 'testString',
      ownerIamId: 'testString',
    };
    
    const res = await enterpriseManagementService.createAccount(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('listAccounts()', async () => {
    const params = {
      enterpriseId: 'testString',
      accountGroupId: 'testString',
      nextDocid: 'testString',
      parent: 'testString',
      limit: 38,
    };
    
    const res = await enterpriseManagementService.listAccounts(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('getAccount()', async () => {
    const params = {
      accountId: 'testString',
    };
    
    const res = await enterpriseManagementService.getAccount(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('updateAccount()', async () => {
    const params = {
      accountId: 'testString',
      parent: 'testString',
    };
    
    const res = await enterpriseManagementService.updateAccount(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('createEnterprise()', async () => {
    const params = {
      sourceAccountId: 'testString',
      name: 'testString',
      primaryContactIamId: 'testString',
      domain: 'testString',
    };
    
    const res = await enterpriseManagementService.createEnterprise(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('listEnterprises()', async () => {
    const params = {
      enterpriseAccountId: 'testString',
      accountGroupId: 'testString',
      accountId: 'testString',
      nextDocid: 'testString',
      limit: 38,
    };
    
    const res = await enterpriseManagementService.listEnterprises(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('getEnterprise()', async () => {
    const params = {
      enterpriseId: 'testString',
    };
    
    const res = await enterpriseManagementService.getEnterprise(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test.skip('updateEnterprise()', async () => {
    const params = {
      enterpriseId: 'testString',
      name: 'testString',
      domain: 'testString',
      primaryContactIamId: 'testString',
    };
    
    const res = await enterpriseManagementService.updateEnterprise(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});

function getNextDocId(urlstring) {
  let offset = null;
  if (urlstring) {
    // We use a bogus "baseurl" in case "urlstring" is a relative url.
    // This is fine since we're only trying to retrieve the "offset" query parameter.
    const url = new URL(urlstring, 'https://fakehost.com');
    offset = url.searchParams.get('next_docid');
  }
  return offset;
}
