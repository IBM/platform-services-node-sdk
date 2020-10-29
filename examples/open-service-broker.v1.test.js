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

  test('getServiceInstanceState request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_service_instance_state

    const params = {
      instanceId: 'testString',
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
      instanceId: 'testString',
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

    const params = {
      instanceId: 'testString',
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

    const params = {
      instanceId: 'testString',
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
      instanceId: 'testString',
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

    const params = {
      bindingId: 'testString',
      instanceId: 'testString',
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
      serviceId: 'testString',
      planId: 'testString',
      instanceId: 'testString',
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
      bindingId: 'testString',
      instanceId: 'testString',
      planId: 'testString',
      serviceId: 'testString',
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
