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

const ResourceManagerV2 = require('../dist/resource-manager/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the Resource Manager service.
//
// The following configuration properties are assumed to be defined:
// The following configuration properties are assumed to be defined:
// RESOURCE_MANAGER_URL=<service base url>
// RESOURCE_MANAGER_AUTH_TYPE=iam
// RESOURCE_MANAGER_APIKEY=<IAM apikey of the service>
// RESOURCE_MANAGER_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// RESOURCE_MANAGER_QUOTA_ID=<quota ID>
// RESOURCE_MANAGER_USER_ACCOUNT_ID=<account ID of the user with delete permission>
//
// ALT_RESOURCE_MANAGER_URL=<service base url>
// ALT_RESOURCE_MANAGER_AUTH_TYPE=iam
// ALT_RESOURCE_MANAGER_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// ALT_RESOURCE_MANAGER_APIKEY=<IAM apikey of the user with delete permission>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'resource_manager.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ResourceManagerV2', () => {

  // begin-common

  const resourceManagerService = ResourceManagerV2.newInstance({ serviceName: ResourceManagerV2.DEFAULT_SERVICE_NAME });
  const deleteResourceManagerService = ResourceManagerV2.newInstance(
    { serviceName: 'ALT_RESOURCE_MANAGER' }
  );

  // end-common

  const config = readExternalSources(ResourceManagerV2.DEFAULT_SERVICE_NAME);
  const exampleUserAccountId = config.userAccountId;
  const exampleQuotaId = config.quotaId;
  let resourceGroupId = null;

  test('createResourceGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createResourceGroup() result:');
    // begin-create_resource_group
    const params = {
      accountId: exampleUserAccountId,
      name: "ExampleGroup"
    };

    try {
      const res = await resourceManagerService.createResourceGroup(params)
      resourceGroupId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_resource_group
  });
  test('getResourceGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getResourceGroup() result:');
    // begin-get_resource_group

    const params = {
      id: resourceGroupId,
    };

    try {
      const res = await resourceManagerService.getResourceGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_group
  });
  test('updateResourceGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('updateResourceGroup() result:');
    // begin-update_resource_group

    const params = {
      id: resourceGroupId,
      state: 'ACTIVE',
      name: 'RenamedExampleGroup'
    };

    try {
      const res = await resourceManagerService.updateResourceGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_resource_group
  });

  test('listResourceGroups request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listResourceGroups() result:');
    // begin-list_resource_groups
    const params = {
      accountId: exampleUserAccountId,
      includeDeleted: true,
    }

    try {
      const res = await resourceManagerService.listResourceGroups(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_groups
  });
  test('deleteResourceGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-delete_resource_group

    const params = {
      id: resourceGroupId,
    };

    try {
      await deleteResourceManagerService.deleteResourceGroup(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_resource_group
  });

  test('listQuotaDefinitions request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listQuotaDefinitions() result:');
    // begin-list_quota_definitions

    try {
      const res = await resourceManagerService.listQuotaDefinitions({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_quota_definitions
  });
  test('getQuotaDefinition request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getQuotaDefinition() result:');
    // begin-get_quota_definition

    const params = {
      id: exampleQuotaId,
    };

    try {
      const res = await resourceManagerService.getQuotaDefinition(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_quota_definition
  });

});
