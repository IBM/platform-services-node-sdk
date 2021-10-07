/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2020.
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

const ResourceControllerV2 = require('../dist/resource-controller/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');
const { expectToBePromise } = require('ibm-cloud-sdk-core/lib/sdk-test-helpers');

//
// This file provides an example of how to use the Resource Controller service.
//
// The following configuration properties are assumed to be defined:
//
// RESOURCE_CONTROLLER_URL=<service url>
// RESOURCE_CONTROLLER_AUTH_TYPE=iam
// RESOURCE_CONTROLLER_AUTH_URL=<IAM Token Service url>
// RESOURCE_CONTROLLER_APIKEY=<User's IAM API Key>
// RESOURCE_CONTROLLER_RESOURCE_GROUP=<Short ID of the user's resource group>
// RESOURCE_CONTROLLER_PLAN_ID=<Unique ID of the plan associated with the offering>
// RESOURCE_CONTROLLER_ACCOUNT_ID=<User's account ID>
// RESOURCE_CONTROLLER_ALIAS_TARGET_CRN=<The CRN of target name(space) in a specific environment>
// RESOURCE_CONTROLLER_BINDING_TARGET_CRN=<The CRN of application to bind to in a specific environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'resource_controller.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ResourceControllerV2', () => {
  jest.setTimeout(30000);

  // begin-common

  const resourceControllerService = ResourceControllerV2.newInstance({});

  // end-common

  const config = readExternalSources(ResourceControllerV2.DEFAULT_SERVICE_NAME);

  let instanceGuid = null;
  let aliasGuid = null;
  let bindingGuid = null;
  let instanceKeyGuid = null;
  let reclamationId = null;
  let resourceGroupGuid = config.resourceGroup;
  let resourcePlanId = config.reclamationPlanId;
  let accountId = config.accountId;
  let aliasTargetCRN = config.aliasTargetCrn;
  let bindingTargetCRN = config.bindingTargetCrn;
  let resourceInstanceName = 'RcSdkInstance1Node';
  let resourceInstanceUpdateName = 'RcSdkInstanceUpdate1Node';
  let aliasName = 'RcSdkAlias1Node';
  let aliasUpdateName = 'RcSdkAliasUpdate1Node';
  let bindingName = 'RcSdkBinding1Node';
  let bindingUpdateName = 'RcSdkBindingUpdate1Node';
  let keyName = 'RcSdkKey1Node';
  let keyUpdateName = 'RcSdkKeyUpdate1Node';
  let targetRegion = 'global';

  test('createResourceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createResourceInstance() result:');
    // begin-create_resource_instance

    const params = {
      name: resourceInstanceName,
      target: targetRegion,
      resourceGroup: resourceGroupGuid,
      resourcePlanId: resourcePlanId,
    };

    try {
      const res = await resourceControllerService.createResourceInstance(params)
      instanceGuid = res.result.guid;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_resource_instance
  });
  test('getResourceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getResourceInstance() result:');
    // begin-get_resource_instance

    const params = {
      id: instanceGuid,
    };

    try {
      const res = await resourceControllerService.getResourceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_instance
  });
  test('listResourceInstances request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listResourceInstances() result:');
    // begin-list_resource_instances

    const params = {
      name: resourceInstanceName,
    };

    try {
      const async = await resourceControllerService.listResourceInstances(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_instances
  });
  test('updateResourceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateResourceInstance() result:');
    // begin-update_resource_instance

    const parameters = {
      'exampleParameter': 'exampleValue',
    };

    const params = {
      id: instanceGuid,
      name: resourceInstanceUpdateName,
      parameters: parameters,
    };

    try {
      const res = await resourceControllerService.updateResourceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_resource_instance
  });
  test('createResourceAlias request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createResourceAlias() result:');
    // begin-create_resource_alias

    const params = {
      name: aliasName,
      source: instanceGuid,
      target: aliasTargetCRN,
    };

    try {
      const res = await resourceControllerService.createResourceAlias(params);
      aliasGuid = res.result.guid;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_resource_alias
  });
  test('getResourceAlias request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getResourceAlias() result:');
    // begin-get_resource_alias

    const params = {
      id: aliasGuid,
    };

    try {
      const res = await resourceControllerService.getResourceAlias(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_alias
  });
  test('listResourceAliases request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listResourceAliases() result:');
    // begin-list_resource_aliases

    const params = {
      name: aliasName,
    };

    try {
      const res = await resourceControllerService.listResourceAliases(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_aliases
  });
  test('updateResourceAlias request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateResourceAlias() result:');
    // begin-update_resource_alias

    const params = {
      id: aliasGuid,
      name: aliasUpdateName,
    };

    try {
      const res = await resourceControllerService.updateResourceAlias(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_resource_alias
  });
  test('listResourceAliasesForInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    expect(instanceGuid).toBeTruthy();

    originalLog('listResourceAliasesForInstance() result:');
    // begin-list_resource_aliases_for_instance

    const params = {
      id: instanceGuid,
    };

    try {
      const res = await resourceControllerService.listResourceAliasesForInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_aliases_for_instance
  });
  test('createResourceBinding request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createResourceBinding() result:');
    // begin-create_resource_binding

    const parameters = {
      'exampleParameter': 'exampleValue'
    };

    const params = {
      name: bindingName,
      source: aliasGuid,
      target: bindingTargetCRN,
      parameters: parameters,
    };

    try {
      const res = await resourceControllerService.createResourceBinding(params);
      bindingGuid = res.result.guid;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_resource_binding
  });
  test('getResourceBinding request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getResourceBinding() result:');
    // begin-get_resource_binding

    const params = {
      id: bindingGuid,
    };

    try {
      const res = await resourceControllerService.getResourceBinding(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_binding
  });
  test('listResourceBindings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listResourceBindings() result:');
    // begin-list_resource_bindings

    const params = {
      name: bindingName,
    };

    try {
      const res = await resourceControllerService.listResourceBindings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_bindings
  });
  test('updateResourceBinding request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateResourceBinding() result:');
    // begin-update_resource_binding

    const params = {
      id: bindingGuid,
      name: bindingUpdateName,
    };

    try {
      const res = await resourceControllerService.updateResourceBinding(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_resource_binding
  });
  test('listResourceBindingsForAlias request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    expect(aliasGuid).toBeTruthy();

    originalLog('listResourceBindingsForAlias() result:');
    // begin-list_resource_bindings_for_alias

    const params = {
      id: aliasGuid,
    };

    try {
      const res = await resourceControllerService.listResourceBindingsForAlias(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_bindings_for_alias
  });
  test('createResourceKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createResourceKey() result:');
    // begin-create_resource_key

    const parameters = {
      'exampleParameter': 'exampleValue'
    };

    const params = {
      name: keyName,
      source: instanceGuid,
      parameters: parameters,
    };

    try {
      const res = await resourceControllerService.createResourceKey(params);
      instanceKeyGuid = res.result.guid;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_resource_key
  });
  test('getResourceKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getResourceKey() result:');
    // begin-get_resource_key

    const params = {
      id: instanceKeyGuid,
    };

    try {
      const res = await resourceControllerService.getResourceKey(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_key
  });
  test('listResourceKeys request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listResourceKeys() result:');
    // begin-list_resource_keys

    const params = {
      name: keyName,
    };

    try {
      const res = await resourceControllerService.listResourceKeys(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_keys
  });
  test('updateResourceKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateResourceKey() result:');
    // begin-update_resource_key

    const params = {
      id: instanceKeyGuid,
      name: keyUpdateName,
    };

    try {
      const res = await resourceControllerService.updateResourceKey(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_resource_key
  });
  test('listResourceKeysForInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    expect(instanceGuid).toBeTruthy();

    originalLog('listResourceKeysForInstance() result:');
    // begin-list_resource_keys_for_instance

    const params = {
      id: instanceGuid,
    };

    try {
      const res = await resourceControllerService.listResourceKeysForInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_resource_keys_for_instance
  });
  test('deleteResourceBinding request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_resource_binding

    const params = {
      id: bindingGuid,
    };

    try {
      await resourceControllerService.deleteResourceBinding(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_resource_binding
  });
  test('deleteResourceKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_resource_key

    const params = {
      id: instanceKeyGuid,
    };

    try {
      await resourceControllerService.deleteResourceKey(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_resource_key
  });
  test('deleteResourceAlias request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_resource_alias

    const params = {
      id: aliasGuid,
    };

    try {
      await resourceControllerService.deleteResourceAlias(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_resource_alias
  });
  test('lockResourceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('lockResourceInstance() result:');
    // begin-lock_resource_instance

    const params = {
      id: instanceGuid,
    };

    try {
      const res = await resourceControllerService.lockResourceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-lock_resource_instance
  });
  test('unlockResourceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('unlockResourceInstance() result:');
    // begin-unlock_resource_instance

    const params = {
      id: instanceGuid,
    };

    try {
      const res = await resourceControllerService.unlockResourceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-unlock_resource_instance
  });
  test('deleteResourceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_resource_instance

    const params = {
      id: instanceGuid,
      recursive: false,
    };

    try {
      await resourceControllerService.deleteResourceInstance(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_resource_instance
    await new Promise(resolve => setTimeout(resolve, 20000));
  });
  test('listReclamations request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });
    await new Promise(resolve => setTimeout(resolve, 20000));

    originalLog('listReclamations() result:');
    // begin-list_reclamations

    const params = {
      accountId: accountId,
    };

    try {
      const res = await resourceControllerService.listReclamations(params);
      var resources = res.result.resources;
      resources.forEach(reclaim => {
        if (reclaim.resource_instance_id.toString() === instanceGuid) {
          reclamationId = reclaim.id;
        }
      });
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_reclamations
  });
  test('runReclamationAction request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('runReclamationAction() result:');
    // begin-run_reclamation_action

    const params = {
      id: reclamationId,
      actionName: 'reclaim',
    };

    try {
      const res = await resourceControllerService.runReclamationAction(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-run_reclamation_action
  });
});
