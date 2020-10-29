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

// Location of our config file.
const configFile = 'resource_controller.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ResourceControllerV2', () => {

  // begin-common

  const resourceControllerService = ResourceControllerV2.newInstance({});

  // end-common

  const config = readExternalSources(ResourceControllerV2.DEFAULT_SERVICE_NAME);

  test('listResourceInstances request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_instances

    const params = {
      updatedFrom: '2019-01-08T00:00:00.000Z',
      updatedTo: '2019-01-08T00:00:00.000Z',
    };

    resourceControllerService.listResourceInstances(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_instances
  });
  test('createResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_instance

    const params = {
      name: 'my-instance',
      target: 'bluemix-us-south',
      resourceGroup: '5c49eabc-f5e8-5881-a37e-2d100a33b3df',
      resourcePlanId: 'cloudant-standard',
    };

    resourceControllerService.createResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_instance
  });
  test('getResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_instance

    const params = {
      id: 'testString',
    };

    resourceControllerService.getResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_instance
  });
  test('updateResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_instance

    const params = {
      id: 'testString',
    };

    resourceControllerService.updateResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_instance
  });
  test('lockResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-lock_resource_instance

    const params = {
      id: 'testString',
    };

    resourceControllerService.lockResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-lock_resource_instance
  });
  test('listResourceKeys request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_keys

    const params = {
      updatedFrom: '2019-01-08T00:00:00.000Z',
      updatedTo: '2019-01-08T00:00:00.000Z',
    };

    resourceControllerService.listResourceKeys(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_keys
  });
  test('createResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_key

    const params = {
      name: 'my-key',
      source: '25eba2a9-beef-450b-82cf-f5ad5e36c6dd',
    };

    resourceControllerService.createResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_key
  });
  test('getResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_key

    const params = {
      id: 'testString',
    };

    resourceControllerService.getResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_key
  });
  test('updateResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_key

    const params = {
      id: 'testString',
      name: 'my-new-key-name',
    };

    resourceControllerService.updateResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_key
  });
  test('listResourceBindings request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_bindings

    const params = {
      updatedFrom: '2019-01-08T00:00:00.000Z',
      updatedTo: '2019-01-08T00:00:00.000Z',
    };

    resourceControllerService.listResourceBindings(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_bindings
  });
  test('createResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_binding

    const params = {
      source: '25eba2a9-beef-450b-82cf-f5ad5e36c6dd',
      target: 'crn:v1:cf:public:cf:us-south:s/0ba4dba0-a120-4a1e-a124-5a249a904b76::cf-application:a1caa40b-2c24-4da8-8267-ac2c1a42ad0c',
    };

    resourceControllerService.createResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_binding
  });
  test('getResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_binding

    const params = {
      id: 'testString',
    };

    resourceControllerService.getResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_binding
  });
  test('updateResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_binding

    const params = {
      id: 'testString',
      name: 'my-new-binding-name',
    };

    resourceControllerService.updateResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_binding
  });
  test('listResourceAliases request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_aliases

    const params = {
      updatedFrom: '2019-01-08T00:00:00.000Z',
      updatedTo: '2019-01-08T00:00:00.000Z',
    };

    resourceControllerService.listResourceAliases(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_aliases
  });
  test('createResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_alias

    const params = {
      name: 'my-alias',
      source: 'a8dff6d3-d287-4668-a81d-c87c55c2656d',
      target: 'crn:v1:cf:public:cf:us-south:o/5e939cd5-6377-4383-b9e0-9db22cd11753::cf-space:66c8b915-101a-406c-a784-e6636676e4f5',
    };

    resourceControllerService.createResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_alias
  });
  test('getResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_alias

    const params = {
      id: 'testString',
    };

    resourceControllerService.getResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_alias
  });
  test('updateResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_alias

    const params = {
      id: 'testString',
      name: 'my-new-alias-name',
    };

    resourceControllerService.updateResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_alias
  });
  test('listReclamations request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_reclamations

    resourceControllerService.listReclamations({})
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_reclamations
  });
  test('runReclamationAction request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-run_reclamation_action

    const params = {
      id: 'testString',
      actionName: 'testString',
    };

    resourceControllerService.runReclamationAction(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-run_reclamation_action
  });
  test('unlockResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-unlock_resource_instance

    const params = {
      id: 'testString',
    };

    resourceControllerService.unlockResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-unlock_resource_instance
  });
  test('deleteResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_key

    const params = {
      id: 'testString',
    };

    resourceControllerService.deleteResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_key
  });
  test('deleteResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_instance

    const params = {
      id: 'testString',
    };

    resourceControllerService.deleteResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_instance
  });
  test('deleteResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_binding

    const params = {
      id: 'testString',
    };

    resourceControllerService.deleteResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_binding
  });
  test('deleteResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_alias

    const params = {
      id: 'testString',
    };

    resourceControllerService.deleteResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_alias
  });
});
