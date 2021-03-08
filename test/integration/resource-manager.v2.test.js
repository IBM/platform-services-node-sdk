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
const { readExternalSources } = require('ibm-cloud-sdk-core');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'resource_manager.env';

const describe = authHelper.prepareTests(configFile);

describe('ResourceManagerV2_integration', () => {
  jest.setTimeout(timeout);

  let canCreateRetrieveAndUpdateResourceGroupService;
  let usersService;
  let new_resource_group_id;
  let url;
  let authType;
  let apiKey;
  let authUrl;
  let testQuotaId;
  let testUserAccountId;

  it('should successfully complete initialization', done => {
    canCreateRetrieveAndUpdateResourceGroupService = ResourceManagerV2.newInstance({ serviceName: 'RMGR1' });
    expect(canCreateRetrieveAndUpdateResourceGroupService).not.toBeNull();

    usersService = ResourceManagerV2.newInstance({ serviceName: 'RMGR2' });
    expect(usersService).not.toBeNull();

    const config = readExternalSources(ResourceManagerV2.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    url = config.URL;
    authType = config.AUTH_TYPE;
    apiKey = config.APIKEY;
    authUrl = config.AUTH_URL;
    testQuotaId = config.TEST_QUOTA_ID;
    testUserAccountId = config.TEST_USER_ACCOUNT_ID;

    expect(url).not.toBeNull();
    expect(authType).not.toBeNull();
    expect(apiKey).not.toBeNull();
    expect(authUrl).not.toBeNull();
    expect(testQuotaId).not.toBeNull();
    expect(testUserAccountId).not.toBeNull();

    done();
  });

  it('should create a new resource group in an account', done => {
    const params = {
      accountId: testUserAccountId,
      name: 'TestGroup',
    };
    canCreateRetrieveAndUpdateResourceGroupService
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

  it('should get a list of all resource groups in an account', done => {
    const params = {
      accountId: testUserAccountId,
    };
    canCreateRetrieveAndUpdateResourceGroupService
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

  it('should update a resource group by id', done => {
    const params = {
      id: new_resource_group_id,
      name: 'TestGroup2',
      state: 'ACTIVE',
    };
    canCreateRetrieveAndUpdateResourceGroupService
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

  it('should retrieve a resource group by id', done => {
    const params = {
      id: new_resource_group_id,
    };
    canCreateRetrieveAndUpdateResourceGroupService
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

  it('should delete a resource group by id', done => {
    const params = {
      id: new_resource_group_id,
    };
    usersService
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

  it('should get a list of all quota definitions', done => {
    canCreateRetrieveAndUpdateResourceGroupService
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
      id: testQuotaId,
    };
    canCreateRetrieveAndUpdateResourceGroupService
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
});
