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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const IbmCloudShellV1 = require('../../dist/ibm-cloud-shell/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'ibm_cloud_shell_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('IbmCloudShellV1_integration', () => {
  const ibmCloudShellService = IbmCloudShellV1.newInstance({});

  expect(ibmCloudShellService).not.toBeNull();

  const config = readExternalSources(IbmCloudShellV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  test('getAccountSettingsById()', async () => {
    const params = {
      accountId: '12345678-abcd-1a2b-a1b2-1234567890ab',
    };

    const res = await ibmCloudShellService.getAccountSettingsById(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('updateAccountSettingsById()', async () => {
    // Request models needed by this operation.

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

    const res = await ibmCloudShellService.updateAccountSettingsById(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
