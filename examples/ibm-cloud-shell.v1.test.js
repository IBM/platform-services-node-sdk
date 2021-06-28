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

/* eslint-disable no-console */

const IbmCloudShellV1 = require('../dist/ibm-cloud-shell/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the IBM Cloud Shell service.
//
// The following configuration properties are assumed to be defined:
// IBM_CLOUD_SHELL_URL=<service base url>
// IBM_CLOUD_SHELL_AUTH_TYPE=iam
// IBM_CLOUD_SHELL_APIKEY=<IAM apikey>
// IBM_CLOUD_SHELL_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'ibm_cloud_shell_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('IbmCloudShellV1', () => {

  // begin-common

  const ibmCloudShellService = IbmCloudShellV1.newInstance({});

  // end-common

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(IbmCloudShellV1.DEFAULT_SERVICE_NAME);

  test('getAccountSettingsById request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getAccountSettingsById() result:');
    // begin-get_account_settings_by_id

    const params = {
      accountId: '12345678-abcd-1a2b-a1b2-1234567890ab',
    };

    ibmCloudShellService.getAccountSettingsById(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_account_settings_by_id
  });
  test('updateAccountSettingsById request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('updateAccountSettingsById() result:');
    // begin-update_account_settings_by_id

    // Feature
    const featureModel = [
      {
        enabled: true,
        key: 'server.file_manager',
      },
      {
        enabled: true,
        key: 'server.web_preview',
      },
    ];

    // RegionSetting
    const regionSettingModel = [
      {
        enabled: true,
        key: 'eu-de',
      },
      {
        enabled: true,
        key: 'jp-tok',
      },
      {
        enabled: true,
        key: 'us-south',
      },
    ];

    const accountId = '12345678-abcd-1a2b-a1b2-1234567890ab';
    const params = {
      accountId,
      newId: `ac${accountId}`,
      newRev: `130-${accountId}`,
      newAccountId: accountId,
      newCreatedAt: 1600079615,
      newCreatedBy: 'IBMid-1000000000',
      newDefaultEnableNewFeatures: true,
      newDefaultEnableNewRegions: true,
      newEnabled: true,
      newFeatures: featureModel,
      newRegions: regionSettingModel,
      newType: 'account_settings',
      newUpdatedAt: 1624359948,
      newUpdatedBy: 'IBMid-1000000000',
    };

    ibmCloudShellService.updateAccountSettingsById(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_account_settings_by_id
  });
});
