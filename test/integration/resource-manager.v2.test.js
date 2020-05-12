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
const ResourceManagerV2 = require('../../dist/resource-manager/v2');
const authHelper = require('../resources/auth-helper.js');
const IamAuthenticator = require('ibm-cloud-sdk-core').IamAuthenticator;

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'resource_manager.env';

const describe = authHelper.prepareTests(configFile);
const config = authHelper.loadConfig();

describe('ResourceManagerV2_integration', () => {
  jest.setTimeout(timeout);

  let service;
  let service1;
  let new_resource_group_id;
  const test_quota_id = '7ce89f4a-4381-4600-b814-3cd9a4f4bdf4';
  const test_user_account_id = '60ce10d1d94749bf8dceff12065db1b0';

  it('should successfully complete initialization', done => {
    service = ResourceManagerV2.newInstance({});
    expect(service).not.toBeNull();
    done();
  });

  it('should get a list of all qupta definitions', done => {
    service
      .listQuotaDefinitions()
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get a quota definition by quota id', done => {
    const params = {
      id: test_quota_id,
    };
    service
      .getQuotaDefinition(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get a list of all resource groups in an account', done => {
    const params = {
      accountId: test_user_account_id,
    };
    service
      .listResourceGroups(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should create a new resource group in an account', done => {
    const params = {
      accountId: test_user_account_id,
      name: 'TestGroup',
    };
    service
      .createResourceGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(201);
        new_resource_group_id = response.result.id;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should retrieve a resource group by id', done => {
    const params = {
      id: new_resource_group_id,
    };
    service
      .getResourceGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should update a resource group by id', done => {
    const params = {
      id: new_resource_group_id,
      name: 'TestGroup2',
      state: 'ACTIVE',
    };
    service
      .updateResourceGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should instantiate service with custom authenticator', done => {
    const options = {};
    options.authenticator = new IamAuthenticator({
      apikey: config.TEST_USER_API_KEY,
      url: config.RESOURCE_MANAGER_AUTH_URL,
    });
    service1 = ResourceManagerV2.newInstance(options);
    expect(service1).not.toBeNull();
    done();
  });

  it('should delete a resource group by id', done => {
    const params = {
      id: new_resource_group_id,
    };
    service1
      .deleteResourceGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(204);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
