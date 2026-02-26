/**
 * (C) Copyright IBM Corp. 2026.
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

/* eslint-disable no-console */

const { readExternalSources } = require('ibm-cloud-sdk-core');
const AccountManagementV4 = require('../../dist/account-management/v4');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'account_management_v4.env';

const describe = authHelper.prepareTests(configFile);

describe('AccountManagementV4_integration', () => {
  jest.setTimeout(timeout);

  // global values used in various test cases
  let accountId;
  let accountManagementService;

  test('Initialize service', async () => {
    accountManagementService = AccountManagementV4.newInstance();

    expect(accountManagementService).not.toBeNull();

    const config = readExternalSources(AccountManagementV4.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
    accountId = config.accountId;
    expect(accountId).not.toBeNull();
    accountManagementService.enableRetries();
  });

  test('getAccount()', async () => {
    const params = {
      accountId,
    };

    const res = await accountManagementService.getAccount(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
