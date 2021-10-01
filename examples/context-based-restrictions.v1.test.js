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

  test('createZone request example', async (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('createZone() result:');

    // begin-create_zone

    const addressModel = {
      type: 'ipAddress',
      value: '169.23.56.234',
    };

    const params = {
      name: 'SDK TEST - an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of zone',
    };

    await contextBasedRestrictionsService
      .createZone(params)
      .then((res) => {
        zoneId = res.result.id;
        zoneRev = res.headers.etag;

        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-create_zone
  });

  test('listZones request example', async (done) => {
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
      accountId,
    };

    await contextBasedRestrictionsService
      .listZones(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-list_zones
  });

  test('getZone request example', async (done) => {
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
      zoneId,
    };

    await contextBasedRestrictionsService
      .getZone(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-get_zone
  });

  test('replaceZone request example', async (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('replaceZone() result:');

    // begin-replace_zone

    const addressModel = {
      type: 'ipAddress',
      value: '169.23.56.234',
    };

    const params = {
      zoneId,
      ifMatch: zoneRev,
      name: 'SDK TEST - an example of updated zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of updated zone',
    };

    await contextBasedRestrictionsService
      .replaceZone(params)
      .then((res) => {
        zoneId = res.result.id;
        zoneRev = res.headers.etag;

        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-replace_zone
  });

  test('listAvailableServicerefTargets request example', async (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('listAvailableServicerefTargets() result:');

    // begin-list_available_serviceref_targets

    await contextBasedRestrictionsService
      .listAvailableServicerefTargets({})
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-list_available_serviceref_targets
  });

  test('createRule request example', async (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('createRule() result:');

    // begin-create_rule

    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    const resourceAttributeAccountIdModel = {
      name: 'accountId',
      value: accountId,
    };

    const resourceAttributeServiceNameModel = {
      name: 'serviceName',
      value: serviceName,
      operator: 'stringEquals',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
    };

    const params = {
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of rule',
    };

    await contextBasedRestrictionsService
      .createRule(params)
      .then((res) => {
        ruleId = res.result.id;
        ruleRev = res.headers.etag;

        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-create_rule
  });

  test('listRules request example', async (done) => {
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
      accountId,
    };

    await contextBasedRestrictionsService
      .listRules(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-list_rules
  });

  test('getRule request example', async (done) => {
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
      ruleId,
    };

    await contextBasedRestrictionsService
      .getRule(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-get_rule
  });

  test('replaceRule request example', async (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    originalLog('replaceRule() result:');

    // begin-replace_rule

    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    const resourceAttributeAccountIdModel = {
      name: 'accountId',
      value: accountId,
    };

    const resourceAttributeServiceNameModel = {
      name: 'serviceName',
      value: serviceName,
    };

    const resourceTagAttributeModel = {
      name: 'TagName',
      value: 'aTagValue',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      ruleId,
      ifMatch: ruleRev,
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of updated rule',
    };

    await contextBasedRestrictionsService
      .replaceRule(params)
      .then((res) => {
        ruleId = res.result.id;
        ruleRev = res.headers.etag;

        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-replace_rule
  });

  test('getAccountSettings request example', async (done) => {
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
      accountId,
    };

    await contextBasedRestrictionsService
      .getAccountSettings(params)
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-get_account_settings
  });

  test('deleteRule request example', async (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    // begin-delete_rule

    const params = {
      ruleId,
    };

    await contextBasedRestrictionsService
      .deleteRule(params)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-delete_rule
  });

  test('deleteZone request example', async (done) => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation((output) => {
      done(output);
    });

    // begin-delete_zone

    const params = {
      zoneId,
    };

    await contextBasedRestrictionsService
      .deleteZone(params)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.warn(err);
      });

    // end-delete_zone
  });
});
