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

/* eslint-disable no-console */

const ContextBasedRestrictionsV1 = require('../dist/context-based-restrictions/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Context Based Restrictions service.
//
// The following configuration properties are assumed to be defined:
// CONTEXT_BASED_RESTRICTIONS_URL=<service base url>
// CONTEXT_BASED_RESTRICTIONS_AUTH_TYPE=iam
// CONTEXT_BASED_RESTRICTIONS_APIKEY=<IAM apikey>
// CONTEXT_BASED_RESTRICTIONS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'context_based_restrictions_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ContextBasedRestrictionsV1', () => {
  // begin-common

  const contextBasedRestrictionsService = ContextBasedRestrictionsV1.newInstance({});

  // end-common

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME);

  test('createZone request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
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
      accountId: '12ab34cd56ef78ab90cd12ef34ab56cd',
      addresses: [addressModel],
      description: 'this is an example of zone',
      excluded: [addressModel],
    };

    contextBasedRestrictionsService
      .createZone(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-create_zone
  });
  test('listZones request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listZones() result:');
    // begin-list_zones

    const params = {
      accountId: 'testString',
    };

    contextBasedRestrictionsService
      .listZones(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-list_zones
  });
  test('getZone request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('getZone() result:');
    // begin-get_zone

    const params = {
      zoneId: 'testString',
    };

    contextBasedRestrictionsService
      .getZone(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-get_zone
  });
  test('replaceZone request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
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
      zoneId: 'testString',
      ifMatch: 'testString',
      name: 'an example of zone',
      accountId: '12ab34cd56ef78ab90cd12ef34ab56cd',
      addresses: [addressModel],
      description: 'this is an example of zone',
      excluded: [addressModel],
    };

    contextBasedRestrictionsService
      .replaceZone(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-replace_zone
  });
  test('listAvailableServicerefTargets request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listAvailableServicerefTargets() result:');
    // begin-list_available_serviceref_targets

    contextBasedRestrictionsService
      .listAvailableServicerefTargets({})
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-list_available_serviceref_targets
  });
  test('createRule request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('createRule() result:');
    // begin-create_rule

    // Request models needed by this operation.

    // RuleContextAttribute
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: '65810ac762004f22ac19f8f8edf70a34',
    };

    // RuleContext
    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    // ResourceAttribute
    const resourceAttributeModel = {
      name: 'accountId',
      value: '12ab34cd56ef78ab90cd12ef34ab56cd',
    };

    // Resource
    const resourceModel = {
      attributes: [resourceAttributeModel],
    };

    const params = {
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'this is an example of rule',
    };

    contextBasedRestrictionsService
      .createRule(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-create_rule
  });
  test('listRules request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listRules() result:');
    // begin-list_rules

    const params = {
      accountId: 'testString',
    };

    contextBasedRestrictionsService
      .listRules(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-list_rules
  });
  test('getRule request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('getRule() result:');
    // begin-get_rule

    const params = {
      ruleId: 'testString',
    };

    contextBasedRestrictionsService
      .getRule(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-get_rule
  });
  test('replaceRule request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('replaceRule() result:');
    // begin-replace_rule

    // Request models needed by this operation.

    // RuleContextAttribute
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: '76921bd873115033bd2a0909fe081b45',
    };

    // RuleContext
    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    // ResourceAttribute
    const resourceAttributeModel = {
      name: 'accountId',
      value: '12ab34cd56ef78ab90cd12ef34ab56cd',
    };

    // Resource
    const resourceModel = {
      attributes: [resourceAttributeModel],
    };

    const params = {
      ruleId: 'testString',
      ifMatch: 'testString',
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'this is an example of rule',
    };

    contextBasedRestrictionsService
      .replaceRule(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-replace_rule
  });
  test('getAccountSettings request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('getAccountSettings() result:');
    // begin-get_account_settings

    const params = {
      accountId: 'testString',
    };

    contextBasedRestrictionsService
      .getAccountSettings(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-get_account_settings
  });
  test('deleteZone request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    // begin-delete_zone

    const params = {
      zoneId: 'testString',
    };

    contextBasedRestrictionsService
      .deleteZone(params)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-delete_zone
  });
  test('deleteRule request example', (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    // begin-delete_rule

    const params = {
      ruleId: 'testString',
    };

    contextBasedRestrictionsService
      .deleteRule(params)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-delete_rule
  });
});
