/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2022.
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

const ContextBasedRestrictionsV1 = require('../dist/context-based-restrictions/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Context Based Restrictions service.
//
// The following configuration properties are assumed to be defined:
// CONTEXT_BASED_RESTRICTIONS_URL=<service base url>
// CONTEXT_BASED_RESTRICTIONS_AUTH_TYPE=iam
// CONTEXT_BASED_RESTRICTIONS_APIKEY=<IAM apikey>
// CONTEXT_BASED_RESTRICTIONS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// CONTEXT_BASED_RESTRICTIONS_TEST_ACCOUNT_ID=<the id of the account under which test CBR zones and rules are created>
// CONTEXT_BASED_RESTRICTIONS_TEST_SERVICE_NAME=<the name of the service to be associated with the test CBR rules>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'context_based_restrictions_v1.env';

const describe = authHelper.prepareTests(configFile);

const originalLog = console.log;
const originalWarn = console.warn;

const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ContextBasedRestrictionsV1', () => {
  const contextBasedRestrictionsService = ContextBasedRestrictionsV1.newInstance({});
  const config = readExternalSources(ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME);
  const {
    apikey: apiKey,
    url: URL,
    authUrl,
    authType,
    testAccountId: accountId,
    testServiceName: serviceName,
  } = config;

  expect(config).not.toBeNull();
  expect(accountId).not.toBeNull();
  expect(accountId).toBeDefined();
  expect(apiKey).not.toBeNull();
  expect(apiKey).toBeDefined();
  expect(URL).not.toBeNull();
  expect(URL).toBeDefined();
  expect(authUrl).not.toBeNull();
  expect(authUrl).toBeDefined();
  expect(authType).not.toBeNull();
  expect(authType).toBeDefined();
  expect(serviceName).not.toBeNull();
  expect(serviceName).toBeDefined();

  let zoneId;
  let zoneRev;
  let ruleId;
  let ruleRev;

  test('createZone request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createZone() result:');
    // begin-create_zone

    // Request models needed by this operation.

    // AddressIPAddress
    const addressModel = {
      type: 'ipAddress',
      value: '169.23.56.234',
    };

    const params = {
      name: 'an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'this is an example of zone',
    };

    try {
      const res = await contextBasedRestrictionsService.createZone(params);
      zoneId = res.result.id;
      zoneRev = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_zone
  });

  test('listZones request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listZones() result:');
    // begin-list_zones

    const params = {
      accountId,
    };

    try {
      const res = await contextBasedRestrictionsService.listZones(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_zones
  });

  test('getZone request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getZone() result:');
    // begin-get_zone

    const params = {
      zoneId,
    };

    try {
      const res = await contextBasedRestrictionsService.getZone(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_zone
  });

  test('replaceZone request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceZone() result:');
    // begin-replace_zone

    // Request models needed by this operation.

    // AddressIPAddress
    const addressModel = {
      type: 'ipAddress',
      value: '169.23.56.234',
    };

    const params = {
      zoneId,
      ifMatch: zoneRev,
      name: 'an example of updated zone',
      accountId,
      addresses: [addressModel],
      description: 'this is an example of updated zone',
    };

    try {
      const res = await contextBasedRestrictionsService.replaceZone(params);
      zoneId = res.result.id;
      zoneRev = res.headers.etag;

      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_zone
  });

  test('listAvailableServicerefTargets request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAvailableServicerefTargets() result:');
    // begin-list_available_serviceref_targets

    try {
      const res = await contextBasedRestrictionsService.listAvailableServicerefTargets({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_available_serviceref_targets
  });

  test('createRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createRule() result:');
    // begin-create_rule

    // Request models needed by this operation.

    // RuleContextAttribute
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    // RuleContext
    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    // ResourceAttribute
    const resourceAttributeAccountIdModel = {
      name: 'accountId',
      value: accountId,
    };

    // Resource Attribute
    const resourceAttributeServiceNameModel = {
      name: 'serviceName',
      value: serviceName,
      operator: 'stringEquals',
    };

    // Resource
    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
    };

    const params = {
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'this is an example of rule',
      enforcementMode: 'enabled',
    };

    try {
      const res = await contextBasedRestrictionsService.createRule(params);
      ruleId = res.result.id;
      ruleRev = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_rule
  });

  test('listRules request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listRules() result:');
    // begin-list_rules

    const params = {
      accountId,
    };

    try {
      const res = await contextBasedRestrictionsService.listRules(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_rules
  });

  test('getRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getRule() result:');
    // begin-get_rule

    const params = {
      ruleId,
    };

    try {
      const res = await contextBasedRestrictionsService.getRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_rule
  });

  test('replaceRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceRule() result:');
    // begin-replace_rule

    // Request models needed by this operation.

    // RuleContextAttribute
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    // RuleContext
    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    // ResourceAttribute
    const resourceAttributeAccountIdModel = {
      name: 'accountId',
      value: accountId,
    };

    // ResourceAttribute
    const resourceAttributeServiceNameModel = {
      name: 'serviceName',
      value: serviceName,
    };

    const resourceTagAttributeModel = {
      name: 'TagName',
      value: 'aTagValue',
    };

    // Resource
    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      ruleId,
      ifMatch: ruleRev,
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'this is an example of updated rule',
      enforcementMode: 'disabled',
    };

    try {
      const res = await contextBasedRestrictionsService.replaceRule(params);
      ruleId = res.result.id;
      ruleRev = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_rule
  });

  test('getAccountSettings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAccountSettings() result:');
    // begin-get_account_settings

    const params = {
      accountId,
    };

    try {
      const res = await contextBasedRestrictionsService.getAccountSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_account_settings
  });

  test('listAvailableServiceOperations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAvailableServiceOperations() result:');
    // begin-list_available_service_operations

    const params = {
      serviceName: 'containers-kubernetes',
    };

    let res;
    try {
      res = await contextBasedRestrictionsService.listAvailableServiceOperations(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_available_service_operations
  });

  test('deleteRule request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_rule

    const params = {
      ruleId,
    };

    try {
      await contextBasedRestrictionsService.deleteRule(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_rule
  });

  test('deleteZone request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_zone

    const params = {
      zoneId,
    };

    try {
      await contextBasedRestrictionsService.deleteZone(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_zone
  });
});
