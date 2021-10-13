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
const PostureManagementV1 = require('../../dist/posture-management/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'posture_management.env';

const describe = authHelper.prepareTests(configFile);

describe('PostureManagementV1_integration', () => {
  let postureManagementService;
  let apiKey;
  let accountId;
  let profileName;
  let scopesName;
  let scopesId;
  let profileId;
  const groupProfileId = '0';

  test('Init', async () => {
    postureManagementService = PostureManagementV1.newInstance({});

    expect(postureManagementService).not.toBeNull();

    const config = readExternalSources(PostureManagementV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
    apiKey = config.apikey;
    expect(apiKey).toBeDefined();
    accountId = config;
    expect(accountId).toBeDefined();
    profileName = config;
    expect(profileName).toBeDefined();
    scopesName = config;
    expect(scopesName).toBeDefined();
  });

  jest.setTimeout(timeout);

  test('listProfiles()', async () => {
    const params = {
      accountId,
      name: profileName,
    };

    const res = await postureManagementService.listProfiles(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result.profiles).toBeDefined();
    expect(res.result.profiles[0]).toBeDefined();
    expect(res.result.profiles[0].profile_id).toBeDefined();
    profileId = res.result.profiles[0].profile_id;
  });
  test('listScopes()', async () => {
    const params = {
      accountId,
      name: scopesName,
    };

    const res = await postureManagementService.listScopes(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.result.scopes).toBeDefined();
    expect(res.result.scopes[0]).toBeDefined();
    expect(res.result.scopes[0].scope_id).toBeDefined();
    scopesId = res.result.scopes[0].scope_id;
  });
  test('createValidation()', async () => {
    const params = {
      accountId,
      scopeId: scopesId,
      profileId,
      groupProfileId,
    };

    const res = await postureManagementService.createValidation(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
