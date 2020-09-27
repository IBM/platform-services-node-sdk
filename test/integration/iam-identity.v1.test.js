/* eslint-disable no-console */
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
const IamIdentityV1 = require('../../dist/iam-identity/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = '../iam_identity.env';

const describe = authHelper.prepareTests(configFile);

const verbose = true;

const apikeyName = 'Node-SDK-IT-ApiKey';
const serviceIDName = 'Node-SDK-IT-ServiceId';
const newDescription = 'This is an updated description';

let iamIdentityService;
let accountID;
let iamID;
let iamApikey;

let apikeyID1;
let apikeyEtag1;
let apikeyID2;

let serviceID1;
let serviceIDEtag1;

describe('IamIdentityV1_integration', () => {
  jest.setTimeout(timeout);

  beforeAll(async done => {
    log('Starting setup...');
    const iamIdentityService = IamIdentityV1.newInstance({});
    const config = readExternalSources(IamIdentityV1.DEFAULT_SERVICE_NAME);

    expect(iamIdentityService).not.toBeNull();
    expect(config).not.toBeNull();

    accountID = config.ACCOUNT_ID;
    iamID = config.IAM_ID;
    iamApikey = config.APIKEY;

    expect(accountID).not.toBeNull();
    expect(accountID).not.toBeUndefined();
    expect(iamID).not.toBeNull();
    expect(iamID).not.toBeUndefined();
    expect(iamApikey).not.toBeNull();
    expect(iamApikey).not.toBeUndefined();

    await cleanupResources();

    log('Finished setup.');
  });

  test('createApiKey1()', done => {
    const params = {
      name: apikeyName,
      iamId: iamID,
      description: 'NodeSDK test apikey #1',
      accountId: accountID,
    };

    iamIdentityService
      .createApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const result = res.result;
        expect(result).not.toBeNull();
        apikeyID1 = result.id;
        expect(apikeyID1).not.toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('createApiKey2()', done => {
    const params = {
      name: apikeyName,
      iamId: iamID,
      description: 'NodeSDK test apikey #2',
      accountId: accountID,
    };

    iamIdentityService
      .createApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const result = res.result;
        expect(result).not.toBeNull();
        apikeyID2 = result.id;
        expect(apikeyID2).not.toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('getApiKey()', done => {
    const params = {
      id: apikeyID1,
      includeHistory: true,
    };

    iamIdentityService
      .getApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result.id).toEqual(apikeyID1);
        expect(result.name).toEqual(apikeyName);
        expect(result.iam_id).toEqual(iamID);
        expect(result.account_id).toEqual(accountID);
        expect(result.created_by).toEqual(iamID);
        expect(result.created_at).not.toBeNull();
        expect(result.locked).toEqual(false);
        expect(result.crn).not.toBeNull();

        apikeyEtag1 = result.entity_tag;
        expect(apikeyEtag1).not.toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('getApiKeysDetails()', done => {
    const params = {
      iamApiKey: iamApikey,
      includeHistory: true,
    };

    iamIdentityService
      .getApiKeysDetails(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;

        expect(result.iam_id).toEqual(iamID);
        expect(result.account_id).toEqual(accountID);
        expect(result.created_by).toEqual(iamID);
        expect(result.created_at).not.toBeNull();
        expect(result.locked).toEqual(false);

        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('listApiKeys()', done => {
    let pageToken = null;
    do {
      const params = {
        accountId: accountID,
        iamId: iamID,
        pagesize: 1,
        pagetoken: pageToken,
        includeHistory: true,
      };

      iamIdentityService
        .listApiKeys(params)
        .then(res => {
          log(res);
          expect(res).not.toBeNull();
          expect(res.status).toEqual(200);

          const result = res.result;
          expect(result.apikeys.length).not.toBeNull();
          const apikeysArr = [];
          result.apikeys.forEach(att => {
            if (apikeyName === att.name) {
              apikeysArr.push(att.id);
            }
          });
          pageToken = getPageToken(result.next);
          expect(apikeysArr.length).toEqual(2);

          done();
        })
        .catch(err => {
          console.warn(err);
          done(err);
        });
    } while (pageToken != null);
  });

  test('updateApiKey()', done => {
    const params = {
      id: apikeyID1,
      ifMatch: apikeyEtag1,
      description: newDescription,
    };

    iamIdentityService
      .updateApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.description).toEqual(newDescription);

        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('lockApiKey()', done => {
    const params = {
      id: apikeyID2,
    };

    iamIdentityService
      .lockApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.locked).toEqual(true);

        const apikey = getApikeybyID(apikeyID2);
        expect(apikey).not.toBeNull();
        expect(apikey.locked).toEqual(true);

        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('unlockApiKey()', done => {
    const params = {
      id: apikeyID2,
    };

    iamIdentityService
      .unlockApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.locked).toEqual(false);

        const apikey = getApikeybyID(apikeyID2);
        expect(apikey).not.toBeNull();
        expect(apikey.locked).toEqual(false);

        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteApiKey1()', done => {
    const params = {
      id: apikeyID1,
    };

    iamIdentityService
      .deleteApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        const apikey = getApikeybyID(apikeyID1);
        expect(apikey).toBeNull();

        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteApiKey2()', done => {
    const params = {
      id: apikeyID2,
    };

    iamIdentityService
      .deleteApiKey(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        const apikey = getApikeybyID(apikeyID2);
        expect(apikey).toBeNull();

        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('createServiceId()', done => {
    const params = {
      accountId: accountID,
      name: serviceIDName,
      description: 'NodeSDK ServiceID desc',
    };

    iamIdentityService
      .createServiceId(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        serviceID1 = result.id;
        expect(serviceID1).not.toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('getServiceId()', done => {
    const params = {
      id: serviceID1,
      includeHistory: true,
    };

    iamIdentityService
      .getServiceId(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.id).toEqual(serviceID1);
        expect(result.name).toEqual(serviceIDName);
        expect(result.description).toEqual('NodeSDK ServiceID desc');

        serviceIDEtag1 = result.entity_tag;
        expect(serviceIDEtag1).not.toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('listServiceIds()', done => {
    const params = {
      accountId: accountID,
      name: serviceIDName,
      pagesize: 100,
    };

    iamIdentityService
      .listServiceIds(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.serviceids.length).toEqual(1);
        expect(result.offset).not.toBeNull();
        expect(result.offset).toEqual(0);
        expect(result.next).toBeNull();

        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('updateServiceId()', done => {
    const params = {
      id: serviceID1,
      ifMatch: serviceIDEtag1,
      description: newDescription,
    };

    iamIdentityService
      .updateServiceId(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.description).toEqual(newDescription);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('lockServiceId()', done => {
    const params = {
      id: serviceID1,
    };

    iamIdentityService
      .lockServiceId(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.locked).toEqual(true);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('unlockServiceId()', done => {
    const params = {
      id: serviceID1,
    };

    iamIdentityService
      .unlockServiceId(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const result = res.result;
        expect(result).not.toBeNull();
        expect(result.locked).toEqual(false);
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteServiceId()', done => {
    const params = {
      id: serviceID1,
    };

    iamIdentityService
      .deleteServiceId(params)
      .then(res => {
        log(res);
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        const serviceID = getServiceID(serviceID1);
        expect(serviceID).toBeNull();
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });

  // cleanup resources
  afterAll(async done => {
    log('Starting post clean up...');
    await cleanupResources();
    log('Post clean up complete.');
    done();
  });
});

function log(msg) {
  if (verbose) {
    console.log(msg);
  }
}

async function getPageToken(urlstring) {
  const url = new URL(urlstring);
  return url.searchParams.get('pagetoken');
}

async function getApikeybyID(apikeyID) {
  let result = null;
  try {
    const params = {
      id: apikeyID,
    };

    const res = await iamIdentityService.getApiKey(params);

    if (res != null) {
      result = res.result;
    }
    return result;
  } catch (err) {
    return result;
  }
}

async function getServiceID(serviceID) {
  let result = null;
  try {
    const params = {
      id: serviceID,
    };

    const res = await iamIdentityService.getServiceId(params);

    if (res != null) {
      result = res.result;
    }
    return result;
  } catch (err) {
    return result;
  }
}

async function cleanupResources() {
  // list apikeys
  const params1 = {
    accountId: accountID,
    iamId: iamID,
    pagesize: 100,
  };

  const res = iamIdentityService.listApiKeys(params1);

  if (res.apikeys.length > 0) {
    res.apikeys.forEach(att => {
      const params = {
        id: att.id,
      };
      const delRes1 = iamIdentityService.deleteApiKey(params);
      expect(delRes1).not.toBeNull();
      expect(delRes1.status).toEqual(204);
    });
  }

  // list serviceIDs
  const params2 = {
    accountId: accountID,
    name: serviceIDName,
    pagesize: 100,
  };

  const listRes = iamIdentityService.listServiceIds(params2);

  if (listRes.serviceids.length > 0) {
    res.apikeys.forEach(att => {
      const params = {
        id: att.id,
      };
      const delRes2 = iamIdentityService.deleteServiceId(params);
      expect(delRes2).not.toBeNull();
      expect(delRes2.status).toEqual(204);
    });
  }
}
