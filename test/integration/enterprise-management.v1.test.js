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

const EnterpriseManagementV1 = require('../../dist/enterprise-management/v1');
// const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (10s).
const timeout = 10000;

// Location of our config file.
const configFile = 'enterprise-management.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

describe('IamAccessGroupsV2_integration', () => {
  jest.setTimeout(timeout);

  let service;
  
  test('should successfully complete initialization', done => {
    // Initialize the service client.
    service = EnterpriseManagementV1.newInstance();
    expect(service).not.toBeNull();
    done();
  });
  
});

