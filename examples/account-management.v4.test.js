/**
 * @jest-environment node
 */
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

const AccountManagementV4 = require('../dist/account-management/v4');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the account_management service.
//
// The following configuration properties are assumed to be defined:
// ACCOUNT_MANAGEMENT_URL=<service base url>
// ACCOUNT_MANAGEMENT_AUTH_TYPE=iam
// ACCOUNT_MANAGEMENT_APIKEY=<IAM apikey>
// ACCOUNT_MANAGEMENT_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'account_management_v4.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('AccountManagementV4', () => {
  // Service instance
  let accountManagementService;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(AccountManagementV4.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    accountManagementService = AccountManagementV4.newInstance();

    // end-common
  });

  test('getAccount request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAccount() result:');
    // begin-getAccount

    const params = {
      accountId: 'testString',
    };

    let res;
    try {
      res = await accountManagementService.getAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-getAccount
  });
});
