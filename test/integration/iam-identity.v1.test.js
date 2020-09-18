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
const configFile = 'iam_identity.env';

const describe = authHelper.prepareTests(configFile);

describe('IamIdentityV1_integration', () => {
  const iamIdentityService = IamIdentityV1.newInstance({});

  const config = readExternalSources(IamIdentityV1.DEFAULT_SERVICE_NAME);

  expect(iamIdentityService).not.toBeNull();
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  test('listApiKeys()', done => {
    const params = {
      accountId: 'testString',
      iamId: 'testString',
      pagesize: 38,
      pagetoken: 'testString',
      scope: 'entity',
      type: 'user',
      sort: 'testString',
      order: 'asc',
      includeHistory: true,
    };

    iamIdentityService
      .listApiKeys(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('createApiKey()', done => {
    const params = {
      name: 'testString',
      iamId: 'testString',
      description: 'testString',
      accountId: 'testString',
      apikey: 'testString',
      storeValue: true,
      entityLock: 'testString',
    };

    iamIdentityService
      .createApiKey(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('getApiKeysDetails()', done => {
    const params = {
      iamApiKey: 'testString',
      includeHistory: true,
    };

    iamIdentityService
      .getApiKeysDetails(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('getApiKey()', done => {
    const params = {
      id: 'testString',
      includeHistory: true,
    };

    iamIdentityService
      .getApiKey(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('updateApiKey()', done => {
    const params = {
      id: 'testString',
      ifMatch: 'testString',
      name: 'testString',
      description: 'testString',
    };

    iamIdentityService
      .updateApiKey(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('lockApiKey()', done => {
    const params = {
      id: 'testString',
    };

    iamIdentityService
      .lockApiKey(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('listServiceIds()', done => {
    const params = {
      accountId: 'testString',
      name: 'testString',
      pagesize: 38,
      pagetoken: 'testString',
      sort: 'testString',
      order: 'asc',
      includeHistory: true,
    };

    iamIdentityService
      .listServiceIds(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('createServiceId()', done => {
    // Request models needed by this operation.

    // CreateApiKeyRequest
    const createApiKeyRequestModel = {
      name: 'testString',
      description: 'testString',
      iam_id: 'testString',
      account_id: 'testString',
      apikey: 'testString',
      store_value: true,
    };

    const params = {
      accountId: 'testString',
      name: 'testString',
      description: 'testString',
      uniqueInstanceCrns: ['testString'],
      apikey: createApiKeyRequestModel,
      entityLock: 'testString',
    };

    iamIdentityService
      .createServiceId(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('getServiceId()', done => {
    const params = {
      id: 'testString',
      includeHistory: true,
    };

    iamIdentityService
      .getServiceId(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('updateServiceId()', done => {
    const params = {
      id: 'testString',
      ifMatch: 'testString',
      name: 'testString',
      description: 'testString',
      uniqueInstanceCrns: ['testString'],
    };

    iamIdentityService
      .updateServiceId(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('lockServiceId()', done => {
    const params = {
      id: 'testString',
    };

    iamIdentityService
      .lockServiceId(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('unlockServiceId()', done => {
    const params = {
      id: 'testString',
    };

    iamIdentityService
      .unlockServiceId(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('unlockApiKey()', done => {
    const params = {
      id: 'testString',
    };

    iamIdentityService
      .unlockApiKey(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteServiceId()', done => {
    const params = {
      id: 'testString',
    };

    iamIdentityService
      .deleteServiceId(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteApiKey()', done => {
    const params = {
      id: 'testString',
    };

    iamIdentityService
      .deleteApiKey(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
});
