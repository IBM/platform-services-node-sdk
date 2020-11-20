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

const OpenServiceBrokerV1 = require('../dist/open-service-broker/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

// Location of our config file.
const configFile = 'open_service_broker.env';

///////////////////////////////////////////////////////
///////////// Example config file fields //////////////
// OPEN_SERVICE_BROKER_URL=<Service Broker's URL>
// OPEN_SERVICE_BROKER_AUTH_TYPE=basic
// OPEN_SERVICE_BROKER_USERNAME=<username>
// OPEN_SERVICE_BROKER_PASSWORD=<password>
// OPEN_SERVICE_BROKER_PLAN_ID=ecc19311-aba2-49f7-8198-1e450c8460d4
// OPEN_SERVICE_BROKER_RESOURCE_INSTANCE_ID=crn:v1:bluemix:public:compose-redis:us-south:a/003e9bc3993aec710d30a5a719e57a80:416d769b-682d-4833-8bd7-5ef8778e5b52
// OPEN_SERVICE_BROKER_SERVICE_ID=0bc9d744-6f8c-4821-9648-2278bf6925bb
// OPEN_SERVICE_BROKER_ACCOUNT_ID=003e9bc3993aec710d30a5a719e57a80
// OPEN_SERVICE_BROKER_BINDING_ID=crn:v1:staging:public:compose-redis:global:a/bc2b2fca0af84354a916dc1de6eee42e:osb-sdk-example::
// OPEN_SERVICE_BROKER_SPACE_GUID=336ba5f3-f185-488e-ac8d-02195ee3f2cc
// OPEN_SERVICE_BROKER_APPLICATION_GUID=d3f16a48-8bd1-4aab-a7de-e2a22ad38292
// OPEN_SERVICE_BROKER_ORGANIZATION_GUID=d35d4f0e-5076-4c89-9361-2522894b4856
///////////////////////////////////////////////////////

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('OpenServiceBrokerV1', () => {

  // begin-common

  const openServiceBrokerService = OpenServiceBrokerV1.newInstance({});

  // end-common

  const config = readExternalSources(OpenServiceBrokerV1.DEFAULT_SERVICE_NAME);

  let instanceId = config.resourceInstanceId;
  let orgGuid = config.organizationGuid;
  let planId = config.planId;
  let serviceId = config.serviceId;
  let spaceGuid = config.spaceGuid;
  let accountId = config.accountId;
  let bindingId = config.bindingId;
  let appGuid = config.applicationGuid;
  let initiatorId = 'null';
  let reasonCode = 'IBMCLOUD_ACCT_SUSPEND';
  let operation = 'Provision_45';

  test('getServiceInstanceState request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_service_instance_state

    const params = {
      instanceId: instanceId,
    };

    openServiceBrokerService.getServiceInstanceState(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_service_instance_state
  });
  test('replaceServiceInstanceState request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-replace_service_instance_state

    const params = {
      instanceId: instanceId,
      enabled: false,
      initiatorId: initiatorId,
      reasonCode: reasonCode,
    };

    openServiceBrokerService.replaceServiceInstanceState(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-replace_service_instance_state
  });
  test('replaceServiceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-replace_service_instance

    const context = {
      account_id: accountId,
      crn: instanceId,
      platform: 'ibmcloud',
    };

    const pars = { example: 'property'};

    const params = {
      instanceId: instanceId,
      organizationGuid: orgGuid,
      planId: planId,
      serviceId: serviceId,
      spaceGuid: spaceGuid,
      context: context,
      parameters: pars,
      acceptsIncomplete: true,
    };

    openServiceBrokerService.replaceServiceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-replace_service_instance
  });
  test('updateServiceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_service_instance

    const context = {
      account_id: accountId,
      crn: instanceId,
      platform: 'ibmcloud',
    };

    const pars = { example: 'property'};
    const prevValues = { previous: 'values'};

    const params = {
      instanceId: instanceId,
      planId: planId,
      serviceId: serviceId,
      context: context,
      parameters: pars,
      previousValues: prevValues,
      acceptsIncomplete: true,
    };

    openServiceBrokerService.updateServiceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_service_instance
  });
  test('listCatalog request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_catalog

    openServiceBrokerService.listCatalog({})
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_catalog
  });
  test('getLastOperation request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_last_operation

    const params = {
      instanceId: instanceId,
      operation: operation,
      planId: planId,
      serviceId: serviceId,
    };

    openServiceBrokerService.getLastOperation(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_last_operation
  });
  test('replaceServiceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-replace_service_binding

    const pars = { example: 'property'};

    const bindResource = {
      account_id: accountId,
      serviceid_crn: appGuid,
    };
    
    const params = {
      bindingId: bindingId,
      bindResource: bindResource,
      instanceId: instanceId,
      planId: planId,
      serviceId: serviceId,
      parameters: pars,
    };

    openServiceBrokerService.replaceServiceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-replace_service_binding
  });
  test('deleteServiceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_service_instance

    const params = {
      serviceId: serviceId,
      planId: planId,
      instanceId: instanceId,
    };

    openServiceBrokerService.deleteServiceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_service_instance
  });
  test('deleteServiceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_service_binding

    const params = {
      bindingId: bindingId,
      instanceId: instanceId,
      planId: planId,
      serviceId: serviceId,
    };

    openServiceBrokerService.deleteServiceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_service_binding
  });
});
