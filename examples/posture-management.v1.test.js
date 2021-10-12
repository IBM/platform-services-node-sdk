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

const PostureManagementV1 = require('../dist/posture-management/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the Posture Management service.
//
// The following configuration properties are assumed to be defined:
// POSTURE_MANAGEMENT_URL=<service base url>
// POSTURE_MANAGEMENT_AUTH_TYPE=iam
// POSTURE_MANAGEMENT_APIKEY=<IAM apikey>
// POSTURE_MANAGEMENT_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// POSTURE_MANAGEMENT_PROFILE_NAME=<Profile Name>
// POSTURE_MANAGEMENT_SCOPES_NAME=<Scope Name>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'posture_management.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('PostureManagementV1', () => {

  // begin-common

  const postureManagementService = PostureManagementV1.newInstance({});

  // end-common

  const config = readExternalSources(PostureManagementV1.DEFAULT_SERVICE_NAME);
  const accountId = config.accountId;
  const profileName = config.profileName;
  const scopesName = config.scopesName;

  expect(accountId).toBeDefined();
  expect(profileName).toBeDefined();
  expect(scopesName).toBeDefined();

  let profileId;
  let scopeId;
  const groupProfileId = '0';

  test('listProfiles request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listProfiles() result:');
    // begin-list_profiles

    const params = {
      accountId: accountId,
      name: profileName,
    };

    try {
      const result = await postureManagementService.listProfiles(params);
      profileId = result.result.profiles[0].profile_id;
    } catch (e){
      console.warn(e);
    }

    // end-list_profiles
  });
  test('listScopes request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listScopes() result:');
    // begin-list_scopes

    const params = {
      accountId: accountId,
      name: scopesName,
    };

    try {
      const result = await postureManagementService.listScopes(params);
      scopeId = result.result.scopes[0].scope_id;
    } catch (e){
      console.warn(e);
    }

    // end-list_scopes
  });
  test('createValidationScan request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createValidation() result:');
    // begin-create_validation

    const params = {
      accountId: accountId,
      scopeId: scopeId,
      profileId: profileId,
      groupProfileId: groupProfileId,
    };

    try {
      const result = await postureManagementService.createValidation(params);
      console.log(JSON.stringify(result.result, null, 2));
    } catch (e) {
      console.warn(e);
    }

    // end-create_validation
  });
});
