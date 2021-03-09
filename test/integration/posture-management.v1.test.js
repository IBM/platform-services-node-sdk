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
const PostureManagementV1 = require('../../dist/posture-management/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'posture_management_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('PostureManagementV1_integration', () => {
  const postureManagementService = PostureManagementV1.newInstance({});

  expect(postureManagementService).not.toBeNull();

  const config = readExternalSources(PostureManagementV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  test('createValidationScan()', async () => {
    const params = {
      accountId: 'testString',
      scopeId: 1,
      profileId: 6,
      groupProfileId: 13,
    };

    const res = await postureManagementService.createValidationScan(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listProfile()', async () => {
    const params = {
      accountId: 'testString',
      name: 'testString',
    };

    const res = await postureManagementService.listProfile(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('listScopes()', async () => {
    const params = {
      accountId: 'testString',
      name: 'testString',
    };

    const res = await postureManagementService.listScopes(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
