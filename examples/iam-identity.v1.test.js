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

const IamIdentityV1 = require('../dist/iam-identity/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

// Location of our config file.
const configFile = 'iam_identity_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('IamIdentityV1', () => {

  // begin-common

  const iamIdentityService = IamIdentityV1.newInstance({});

  // end-common

  const config = readExternalSources(IamIdentityV1.DEFAULT_SERVICE_NAME);
  const apikeyName = 'Node-SDK-IT-ApiKey';
  const serviceIDName = 'Node-SDK-IT-ServiceId';
  const newDescription = 'This is an updated description';

  let accountID = config.ACCOUNT_ID;
  let iamID = config.IAM_ID;
  let iamApikey = config.APIKEY;

  let apikeyID;
  let apikeyEtag;

  let serviceID;
  let serviceIDEtag;

  test('createApiKey request example', done => {

    // begin-create_api_key

    const params = {
      name: apikeyName,
      iamId: iamID,
      description: 'NodeSDK test apikey',
      accountId: accountID,
    };

    iamIdentityService.createApiKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const apikey = res.result;
        apikeyID = apikey.id;
        apikeyEtag = apikey.entity_tag;
        expect(apikeyID).not.toBeNull();
        expect(apikeyEtag).not.toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-create_api_key
  });
  test('getApiKey request example', done => {

    // begin-get_api_key

    const params = {
      id: apikeyID,
    };

    iamIdentityService.getApiKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-get_api_key
  });
  test('getApiKeysDetails request example', done => {

    // begin-get_api_keys_details

    const params = {
      iamApiKey: iamApikey,
      includeHistory: true,
    };

    iamIdentityService.getApiKeysDetails(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-get_api_keys_details
  });
  test('listApiKeys request example', done => {

    // begin-list_api_keys
    
    const params = {
      accountId: accountID,
      iamId: iamID,
      pagesize: 1,
      includeHistory: true,
    };

    iamIdentityService.listApiKeys({})
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-list_api_keys
  });
  test('updateApiKey request example', done => {

    // begin-update_api_key

    const params = {
      id: apikeyID,
      ifMatch: apikeyEtag,
      description: newDescription,
    };

    iamIdentityService.updateApiKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-update_api_key
  });
  test('lockApiKey request example', done => {

    // begin-lock_api_key

    const params = {
      id: apikeyID,
    };

    iamIdentityService.lockApiKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-lock_api_key
  });
  test('unlockApiKey request example', done => {

    // begin-unlock_api_key

    const params = {
      id: apikeyID,
    };

    iamIdentityService.unlockApiKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-unlock_api_key
  });
  test('deleteApiKey request example', done => {

    // begin-delete_api_key

    const params = {
      id: apikeyID,
    };

    iamIdentityService.deleteApiKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-delete_api_key
  });
  test('createServiceId request example', done => {

    // begin-create_service_id

    const params = {
      accountId: accountID,
      name: serviceIDName,
      description: 'NodeSDK ServiceID desc',
    };

    iamIdentityService.createServiceId(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-create_service_id
  });
  test('getServiceId request example', done => {

    // begin-get_service_id

    const params = {
      id: serviceID,
    };

    iamIdentityService.getServiceId(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();

        serviceIDEtag = result.entity_tag;
        expect(serviceIDEtag).not.toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-get_service_id
  });
  test('listServiceIds request example', done => {

    // begin-list_service_ids

    const params = {
      accountId: accountID,
      name: serviceIDName,
      pagesize: 100,
    };

    iamIdentityService.listServiceIds(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-list_service_ids
  });
  test('updateServiceId request example', done => {

    // begin-update_service_id

    const params = {
      id: serviceID,
      ifMatch: serviceIDEtag,
      description: newDescription,
    };

    iamIdentityService.updateServiceId(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-update_service_id
  });
  test('lockServiceId request example', done => {

    // begin-lock_service_id

    const params = {
      id: serviceID,
    };

    iamIdentityService.lockServiceId(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-lock_service_id
  });
  test('unlockServiceId request example', done => {

    // begin-unlock_service_id

    const params = {
      id: serviceID,
    };

    iamIdentityService.unlockServiceId(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-unlock_service_id
  });
  test('deleteServiceId request example', done => {

    // begin-delete_service_id

    const params = {
      id: serviceID,
    };

    iamIdentityService.deleteServiceId(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });

    // end-delete_service_id
  });
});
