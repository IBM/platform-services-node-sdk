/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2020, 2022.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

const { readExternalSources, getQueryParam } = require('ibm-cloud-sdk-core');
const { v4: uuidv4 } = require('uuid');
const ResourceControllerV2 = require('../../dist/resource-controller/v2');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (90s).
const timeout = 90000;

// Location of our config file.
const configFile = 'resource_controller.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

const reclaimInstanceName = 'RcSdkReclaimInstance1';
const lockedInstanceNameUpdate = 'RcSdkLockedInstanceUpdate1';
const instanceNames = { 'name': 'RcSdkInstance1NodeJS', 'update': 'RcSdkInstanceUpdate1NodeJS' };
const keyNames = {
  'name': 'RcSdkKey1NodeJS',
  'update': 'RcSdkKeyUpdate1NodeJS',
  'name2': 'RcSdkKey2NodeJS',
  'update2': 'RcSdkKeyUpdate2NodeJS',
};
const bindingNames = { 'name': 'RcSdkBinding1NodeJS', 'update': 'RcSdkBindingUpdate1NodeJS' };
const aliasNames = { 'name': 'RcSdkAlias1NodeJS', 'update': 'RcSdkAliasUpdate1NodeJS' };

const testRegionId1 = 'global';
const testRegionId2 = 'global';
const transactionId = uuidv4();

const resultsPerPage = 200;

let resourceControllerService;
let testAccountId;
let testInstanceCrn;
let testInstanceGuid;
let testAliasCrn;
let testAliasGuid;
let testBindingCrn;
let testBindingGuid;
let testInstanceKeyCrn;
let testInstanceKeyGuid;
let testAliasKeyCrn;
let testAliasKeyGuid;
let aliasTargetCrn;
let bindTargetCrn;
// let testReclaimInstanceCrn; //commented to fix linting error of declared but not used
let testReclaimInstanceGuid;
let testReclamationId1;
let testReclamationId2;

const delay = (millis) => new Promise((p) => setTimeout(p, millis));

describe('ResourceControllerV2_integration', () => {
  jest.setTimeout(timeout);

  let config;

  let testResourceGroupGuid;
  let testOrgGuid;
  let testSpaceGuid;
  let testAppGuid;
  let testPlanId1;
  let testPlanId2;

  test('should successfully complete initialization', async () => {
    // Initialize the service client.
    resourceControllerService = ResourceControllerV2.newInstance({});
    expect(resourceControllerService).not.toBeNull();

    config = readExternalSources(ResourceControllerV2.DEFAULT_SERVICE_NAME);

    testAccountId = config.accountId;
    testResourceGroupGuid = config.resourceGroup;
    testOrgGuid = config.organizationGuid;
    testSpaceGuid = config.spaceGuid;
    testAppGuid = config.applicationGuid;
    testPlanId1 = config.planId;
    testPlanId2 = config.reclamationPlanId;

    console.log('Transaction-Id for Test Run:', transactionId);
  });

  test('00 - Create A Resource Instance', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test00-${transactionId}`,
    };

    const params = {
      name: instanceNames.name,
      target: testRegionId1,
      resourceGroup: testResourceGroupGuid,
      resourcePlanId: testPlanId1,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.createResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toBeDefined();
    expect(result.guid).toBeDefined();
    expect(result.crn).toBeDefined();
    expect(result.id).toEqual(result.crn);
    expect(result.name).toEqual(instanceNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resource_plan_id).toEqual(testPlanId1);
    expect(result.state).toEqual('active');
    expect(result.locked).toBeFalsy();
    expect(result.last_operation.type).toEqual('create');
    expect(result.last_operation.async).toBeFalsy();
    expect(result.last_operation.state).toEqual('succeeded');

    testInstanceCrn = result.id;
    testInstanceGuid = result.guid;
  });

  test('01 - Get A Resource Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test01-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceCrn);
    expect(result.guid).toEqual(testInstanceGuid);
    expect(result.crn).toEqual(testInstanceCrn);
    expect(result.name).toEqual(instanceNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resource_plan_id).toEqual(testPlanId1);
    expect(result.state).toEqual('active');
    expect(result.locked).toBeFalsy();
    expect(result.last_operation.type).toEqual('create');
    expect(result.last_operation.async).toBeFalsy();
    expect(result.onetime_credentials).toBeDefined();
    expect(result.last_operation.state).toEqual('succeeded');
  });

  test('02 - Update A Resource Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test02-${transactionId}`,
    };

    const instanceParams = {
      'hello': 'bye',
    };

    const params = {
      id: testInstanceGuid,
      name: instanceNames.update,
      parameters: instanceParams,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.updateResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceCrn);
    expect(result.name).toEqual(instanceNames.update);
    expect(result.state).toEqual('active');
    expect(result.last_operation.type).toEqual('update');
    expect(result.last_operation.async).toBeFalsy();
    expect(result.last_operation.state).toEqual('succeeded');
  });

  test('03 - List Resource Instances With No Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test03-${transactionId}`,
    };

    const params = {
      headers: customHeader,
      limit: resultsPerPage,
      start: null,
    };

    let response;

    do {
      try {
        response = await resourceControllerService.listResourceInstances(params);
      } catch (err) {
        console.log(`An error occurred: `, JSON.stringify(err));
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();

      const { result } = response;
      expect(result.rows_count).toBeGreaterThanOrEqual(1);
      expect(result.rows_count).toBeLessThanOrEqual(resultsPerPage);
      expect(result.resources.length).toBeGreaterThanOrEqual(1);
      expect(result.resources.length).toBeLessThanOrEqual(resultsPerPage);

      params.start = getQueryParam(result.next_url, 'start');
    } while (params.start != null);
  });

  test('04 - List Resource Instances With Guid Filter', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test04-${transactionId}`,
    };

    const params = {
      guid: testInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceInstances(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].id).toEqual(testInstanceCrn);
    expect(result.resources[0].name).toEqual(instanceNames.update);
    expect(result.resources[0].state).toEqual('active');
    expect(result.resources[0].last_operation.type).toEqual('update');
    expect(result.resources[0].last_operation.async).toBeFalsy();
    expect(result.resources[0].last_operation.state).toEqual('succeeded');
  });

  test('05 - List Resource Instances With Name Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test05-${transactionId}`,
    };

    const params = {
      name: instanceNames.update,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceInstances(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
  });

  test('listResourceInstances() via ResourceInstancesPager', async () => {
    const params = {};

    const allResults = [];

    // Test getNext().
    let pager = new ResourceControllerV2.ResourceInstancesPager(resourceControllerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ResourceControllerV2.ResourceInstancesPager(resourceControllerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('06 - Create A Resource Alias', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test06-${transactionId}`,
    };

    const targetCrn = `crn:v1:bluemix:public:bluemix:us-south:o/${testOrgGuid}::cf-space:${testSpaceGuid}`;
    aliasTargetCrn = `crn:v1:bluemix:public:cf:us-south:o/${testOrgGuid}::cf-space:${testSpaceGuid}`;
    const params = {
      name: aliasNames.name,
      source: testInstanceGuid,
      target: targetCrn,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.createResourceAlias(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toBeDefined();
    expect(result.guid).toBeDefined();
    expect(result.crn).toBeDefined();
    expect(result.id).toEqual(result.crn);
    expect(result.name).toEqual(aliasNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.target_crn).toEqual(aliasTargetCrn);
    expect(result.state).toEqual('active');
    expect(result.resource_instance_id).toEqual(testInstanceCrn);

    testAliasCrn = result.id;
    testAliasGuid = result.guid;
  });

  test('07 - Get A Resource Alias', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test07-${transactionId}`,
    };

    const params = {
      id: testAliasGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceAlias(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testAliasCrn);
    expect(result.guid).toEqual(testAliasGuid);
    expect(result.crn).toEqual(testAliasCrn);
    expect(result.name).toEqual(aliasNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.target_crn).toEqual(aliasTargetCrn);
    expect(result.state).toEqual('active');
    expect(result.resource_instance_id).toEqual(testInstanceCrn);
  });

  test('08 - Update A Resource Alias', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test08-${transactionId}`,
    };

    const params = {
      id: testAliasGuid,
      name: aliasNames.update,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.updateResourceAlias(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testAliasCrn);
    expect(result.name).toEqual(aliasNames.update);
    expect(result.state).toEqual('active');
  });

  test('09 - List Resource Aliases With No Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test09-${transactionId}`,
    };

    const params = {
      headers: customHeader,
      limit: resultsPerPage,
      start: null,
    };

    let response;

    do {
      try {
        response = await resourceControllerService.listResourceAliases(params);
      } catch (err) {
        console.log(`An error occurred: `, JSON.stringify(err));
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();

      const { result } = response;
      expect(result.rows_count).toBeGreaterThanOrEqual(1);
      expect(result.rows_count).toBeLessThanOrEqual(resultsPerPage);
      expect(result.resources.length).toBeGreaterThanOrEqual(1);
      expect(result.resources.length).toBeLessThanOrEqual(resultsPerPage);

      params.start = getQueryParam(result.next_url, 'start');
    } while (params.start != null);
  });

  test('10 - List Resource Aliases With Guid Filter', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test10-${transactionId}`,
    };

    const params = {
      guid: testAliasGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceAliases(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].id).toEqual(testAliasCrn);
    expect(result.resources[0].name).toEqual(aliasNames.update);
    expect(result.resources[0].state).toEqual('active');
    expect(result.resources[0].account_id).toEqual(testAccountId);
    expect(result.resources[0].resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resources[0].target_crn).toEqual(aliasTargetCrn);
    expect(result.resources[0].state).toEqual('active');
    expect(result.resources[0].resource_instance_id).toEqual(testInstanceCrn);
  });

  test('11 - List Resource Aliases With Name Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test11-${transactionId}`,
    };

    const params = {
      name: aliasNames.update,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceAliases(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
  });

  test('listResourceAliases() via ResourceAliasesPager', async () => {
    const params = {};

    const allResults = [];

    // Test getNext().
    let pager = new ResourceControllerV2.ResourceAliasesPager(resourceControllerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ResourceControllerV2.ResourceAliasesPager(resourceControllerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('11a - List Resource Aliases For Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();

    const params = {
      id: testInstanceGuid,
      limit: resultsPerPage,
      start: null,
    };

    let response;

    do {
      try {
        response = await resourceControllerService.listResourceAliasesForInstance(params);
      } catch (err) {
        console.log(`An error occurred: `, JSON.stringify(err));
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();

      const { result } = response;
      expect(result.rows_count).toEqual(1);
      expect(result.resources).toHaveLength(1);

      params.start = getQueryParam(result.next_url, 'start');
    } while (params.start != null);
  });

  test('listResourceAliasesForInstance() via ResourceAliasesForInstancePager', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const params = {
      id: testInstanceGuid,
    };

    const allResults = [];

    // Test getNext().
    let pager = new ResourceControllerV2.ResourceAliasesForInstancePager(
      resourceControllerService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ResourceControllerV2.ResourceAliasesForInstancePager(
      resourceControllerService,
      params
    );
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('12 - Create A Resource Binding', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test12-${transactionId}`,
    };

    const parameters = {
      'parameter1': 'value1',
      'parameter2': 'value2',
    };

    const targetCrn = `crn:v1:staging:public:bluemix:us-south:s/${testSpaceGuid}::cf-application:${testAppGuid}`;
    bindTargetCrn = `crn:v1:staging:public:cf:us-south:s/${testSpaceGuid}::cf-application:${testAppGuid}`;
    const params = {
      name: bindingNames.name,
      source: testAliasGuid,
      target: targetCrn,
      parameters,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.createResourceBinding(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toBeDefined();
    expect(result.guid).toBeDefined();
    expect(result.crn).toBeDefined();
    expect(result.id).toEqual(result.crn);
    expect(result.name).toEqual(bindingNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.source_crn).toEqual(testAliasCrn);
    expect(result.target_crn).toEqual(bindTargetCrn);
    expect(result.state).toEqual('active');

    testBindingCrn = result.id;
    testBindingGuid = result.guid;
  });

  test('13 - Get A Resource Binding', async () => {
    expect(testBindingGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test13-${transactionId}`,
    };

    const params = {
      id: testBindingGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceBinding(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testBindingCrn);
    expect(result.guid).toEqual(testBindingGuid);
    expect(result.crn).toEqual(testBindingCrn);
    expect(result.name).toEqual(bindingNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.source_crn).toEqual(testAliasCrn);
    expect(result.target_crn).toEqual(bindTargetCrn);
    expect(result.state).toEqual('active');
  });

  test('14 - Update A Resource Binding', async () => {
    expect(testBindingGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test14-${transactionId}`,
    };

    const params = {
      id: testBindingGuid,
      name: bindingNames.update,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.updateResourceBinding(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testBindingCrn);
    expect(result.name).toEqual(bindingNames.update);
    expect(result.state).toEqual('active');
  });

  test('15 - List Resource Bindings With No Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test15-${transactionId}`,
    };

    const params = {
      headers: customHeader,
      limit: resultsPerPage,
    };

    let response;

    do {
      try {
        response = await resourceControllerService.listResourceBindings(params);
      } catch (err) {
        console.log(`An error occurred: `, JSON.stringify(err));
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();

      const { result } = response;
      expect(result.rows_count).toBeGreaterThanOrEqual(1);
      expect(result.rows_count).toBeLessThanOrEqual(resultsPerPage);
      expect(result.resources.length).toBeGreaterThanOrEqual(1);
      expect(result.resources.length).toBeLessThanOrEqual(resultsPerPage);

      params.start = getQueryParam(result.next_url, 'start');
    } while (params.start != null);
  });

  test('16 - List Resource Bindings With Guid Filter', async () => {
    expect(testBindingGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test16-${transactionId}`,
    };

    const params = {
      guid: testBindingGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceBindings(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].id).toEqual(testBindingCrn);
    expect(result.resources[0].name).toEqual(bindingNames.update);
    expect(result.resources[0].account_id).toEqual(testAccountId);
    expect(result.resources[0].resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resources[0].source_crn).toEqual(testAliasCrn);
    expect(result.resources[0].target_crn).toEqual(bindTargetCrn);
    expect(result.resources[0].state).toEqual('active');
  });

  test('17 - List Resource Bindings With Name Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test17-${transactionId}`,
    };

    const params = {
      name: bindingNames.update,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceBindings(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
  });

  test('listResourceBindings() via ResourceBindingsPager', async () => {
    const params = {};

    const allResults = [];

    // Test getNext().
    let pager = new ResourceControllerV2.ResourceBindingsPager(resourceControllerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ResourceControllerV2.ResourceBindingsPager(resourceControllerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('17a - ListResourceBindingsForAlias()', async () => {
    expect(testAliasGuid).toBeTruthy();

    const params = {
      id: testAliasGuid,
      limit: resultsPerPage,
      start: null,
    };

    let response;

    do {
      try {
        response = await resourceControllerService.listResourceBindingsForAlias(params);
      } catch (err) {
        console.log(`An error occurred: `, JSON.stringify(err));
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();

      const { result } = response;
      expect(result.rows_count).toEqual(1);
      expect(result.resources).toHaveLength(1);

      params.start = getQueryParam(result.next_url, 'start');
    } while (params.start != null);
  });

  test('listResourceBindingsForAlias() via ResourceBindingsForAliasPager', async () => {
    expect(testAliasGuid).toBeTruthy();
    const params = {
      id: testAliasGuid,
    };

    const allResults = [];

    // Test getNext().
    let pager = new ResourceControllerV2.ResourceBindingsForAliasPager(
      resourceControllerService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ResourceControllerV2.ResourceBindingsForAliasPager(
      resourceControllerService,
      params
    );
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('18 - Create A Resource Key For Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test18-${transactionId}`,
    };

    const parameters = {
      'parameter1': 'value1',
      'parameter2': 'value2',
    };

    const params = {
      name: keyNames.name,
      source: testInstanceGuid,
      parameters,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.createResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toBeDefined();
    expect(result.guid).toBeDefined();
    expect(result.crn).toBeDefined();
    expect(result.id).toEqual(result.crn);
    expect(result.name).toEqual(keyNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.source_crn).toEqual(testInstanceCrn);
    expect(result.state).toEqual('active');

    testInstanceKeyCrn = result.id;
    testInstanceKeyGuid = result.guid;
  });

  test('19 - Get A Resource Key', async () => {
    expect(testInstanceKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test19-${transactionId}`,
    };

    const params = {
      id: testInstanceKeyGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceKeyCrn);
    expect(result.guid).toEqual(testInstanceKeyGuid);
    expect(result.crn).toEqual(testInstanceKeyCrn);
    expect(result.name).toEqual(keyNames.name);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.source_crn).toEqual(testInstanceCrn);
    expect(result.state).toEqual('active');
    expect(result.onetime_credentials).toBeDefined();
  });

  test('20 - Update A Resource Key', async () => {
    expect(testInstanceKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test20-${transactionId}`,
    };

    const params = {
      id: testInstanceKeyGuid,
      name: keyNames.update,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.updateResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceKeyCrn);
    expect(result.name).toEqual(keyNames.update);
    expect(result.state).toEqual('active');
  });

  test('21 - List Resource Keys With No Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test21-${transactionId}`,
    };

    const params = {
      headers: customHeader,
      limit: resultsPerPage,
    };

    let response;

    do {
      try {
        response = await resourceControllerService.listResourceKeys(params);
      } catch (err) {
        console.log(`An error occurred: `, JSON.stringify(err));
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();

      const { result } = response;
      expect(result.rows_count).toBeGreaterThanOrEqual(1);
      expect(result.rows_count).toBeLessThanOrEqual(resultsPerPage);
      expect(result.resources.length).toBeGreaterThanOrEqual(1);
      expect(result.resources.length).toBeLessThanOrEqual(resultsPerPage);

      params.start = getQueryParam(result.next_url, 'start');
    } while (params.start != null);
  });

  test('22 - List Resource Keys With Guid Filter', async () => {
    expect(testInstanceKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test22-${transactionId}`,
    };

    const params = {
      guid: testInstanceKeyGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceKeys(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].id).toEqual(testInstanceKeyCrn);
    expect(result.resources[0].name).toEqual(keyNames.update);
    expect(result.resources[0].account_id).toEqual(testAccountId);
    expect(result.resources[0].resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resources[0].source_crn).toEqual(testInstanceCrn);
    expect(result.resources[0].state).toEqual('active');
  });

  test('23 - List Resource Keys With Name Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test23-${transactionId}`,
    };

    const params = {
      name: keyNames.update,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceKeys(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
  });

  test('listResourceKeys() via ResourceKeysPager', async () => {
    const params = {};

    const allResults = [];

    // Test getNext().
    let pager = new ResourceControllerV2.ResourceKeysPager(resourceControllerService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ResourceControllerV2.ResourceKeysPager(resourceControllerService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('23a - List Resource Keys For Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const params = {
      id: testInstanceGuid,
      limit: resultsPerPage,
      start: null,
    };

    let response;

    do {
      try {
        response = await resourceControllerService.listResourceKeysForInstance(params);
      } catch (err) {
        console.log(`An error occurred: `, JSON.stringify(err));
      }
      expect(response).toBeDefined();
      expect(response.status).toEqual(200);
      expect(response.result).toBeDefined();

      const { result } = response;
      expect(result.rows_count).toEqual(1);
      expect(result.resources).toHaveLength(1);

      params.start = getQueryParam(result.next_url, 'start');
    } while (params.start != null);
  });

  test('listResourceKeysForInstance() via ResourceKeysForInstancePager', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const params = {
      id: testInstanceGuid,
    };

    const allResults = [];

    // Test getNext().
    let pager = new ResourceControllerV2.ResourceKeysForInstancePager(
      resourceControllerService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new ResourceControllerV2.ResourceKeysForInstancePager(
      resourceControllerService,
      params
    );
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('24 - Create A Resource Key For Alias', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test24-${transactionId}`,
    };

    const params = {
      name: keyNames.name2,
      source: testAliasGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.createResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toBeDefined();
    expect(result.guid).toBeDefined();
    expect(result.crn).toBeDefined();
    expect(result.id).toEqual(result.crn);
    expect(result.name).toEqual(keyNames.name2);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.source_crn).toEqual(testAliasCrn);
    expect(result.state).toEqual('active');

    testAliasKeyCrn = result.id;
    testAliasKeyGuid = result.guid;
  });

  test('25 - Get A Resource Key', async () => {
    expect(testAliasKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test25-${transactionId}`,
    };

    const params = {
      id: testAliasKeyGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testAliasKeyCrn);
    expect(result.guid).toEqual(testAliasKeyGuid);
    expect(result.crn).toEqual(testAliasKeyCrn);
    expect(result.name).toEqual(keyNames.name2);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.source_crn).toEqual(testAliasCrn);
    expect(result.state).toEqual('active');
  });

  test('26 - Update A Resource Key', async () => {
    expect(testAliasKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test26-${transactionId}`,
    };

    const params = {
      id: testAliasKeyGuid,
      name: keyNames.update2,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.updateResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testAliasKeyCrn);
    expect(result.name).toEqual(keyNames.update2);
    expect(result.state).toEqual('active');
  });

  test('27 - List Resource Keys With No Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test27-${transactionId}`,
    };

    const params = {
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceKeys(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toBeGreaterThanOrEqual(1);
    expect(result.resources.length).toBeGreaterThanOrEqual(1);
  });

  test('28 - List Resource Keys With Guid Filter', async () => {
    expect(testAliasKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test28-${transactionId}`,
    };

    const params = {
      guid: testAliasKeyGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceKeys(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].id).toEqual(testAliasKeyCrn);
    expect(result.resources[0].name).toEqual(keyNames.update2);
    expect(result.resources[0].account_id).toEqual(testAccountId);
    expect(result.resources[0].resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resources[0].source_crn).toEqual(testAliasCrn);
    expect(result.resources[0].state).toEqual('active');
  });

  test('29 - List Resource Keys With Name Filter', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test29-${transactionId}`,
    };

    const params = {
      name: keyNames.update2,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listResourceKeys(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.rows_count).toEqual(1);
    expect(result.resources).toHaveLength(1);
  });

  test('30 - Delete A Resource Alias With Dependencies - Fail', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test30-${transactionId}`,
    };

    const params = {
      id: testAliasGuid,
      headers: customHeader,
    };

    let rerr;
    try {
      await resourceControllerService.deleteResourceAlias(params);
    } catch (err) {
      rerr = err;
    }

    expect(rerr).toBeDefined();
    expect(rerr.status).toEqual(400);
  });

  test('31 - Delete A Resource Instance With Dependencies - Fail', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test31-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      headers: customHeader,
    };

    let rerr;
    try {
      await resourceControllerService.deleteResourceInstance(params);
    } catch (err) {
      rerr = err;
    }

    expect(rerr).toBeDefined();
    expect(rerr.status).toEqual(400);
  });

  test('32 - Delete A Resource Binding', async () => {
    expect(testBindingGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test32-${transactionId}`,
    };

    const params = {
      id: testBindingGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.deleteResourceBinding(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);
  });

  test('33 - Verify Resource Binding Was Deleted', async () => {
    expect(testBindingGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test33-${transactionId}`,
    };

    const params = {
      id: testBindingGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceBinding(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testBindingCrn);
    expect(result.state).toEqual('removed');
  });

  test('34 - Delete Resource Keys', async () => {
    expect(testInstanceKeyGuid).toBeTruthy();
    expect(testAliasKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test34-${transactionId}`,
    };

    const params = {
      id: testInstanceKeyGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.deleteResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);

    const customHeader2 = {
      'Transaction-Id': `rc-sdk-node-test34-${transactionId}`,
    };

    const params2 = {
      id: testAliasKeyGuid,
      headers: customHeader2,
    };

    let response2;
    try {
      response2 = await resourceControllerService.deleteResourceKey(params2);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response2).toBeDefined();
    expect(response2.status).toEqual(204);
  });

  test('35 - Verify Resource Keys Were Deleted', async () => {
    expect(testInstanceKeyGuid).toBeTruthy();
    expect(testAliasKeyGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test35-${transactionId}`,
    };

    const params = {
      id: testInstanceKeyGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceKey(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceKeyCrn);
    expect(result.state).toEqual('removed');

    const customHeader2 = {
      'Transaction-Id': `rc-sdk-node-test35-${transactionId}`,
    };

    const params2 = {
      id: testAliasKeyGuid,
      headers: customHeader2,
    };

    let response2;
    try {
      response2 = await resourceControllerService.getResourceKey(params2);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response2).toBeDefined();
    expect(response2.status).toEqual(200);
    expect(response2.result).toBeDefined();

    const result2 = response2.result;
    expect(result2.id).toEqual(testAliasKeyCrn);
    expect(result2.state).toEqual('removed');
  });

  test('36 - Delete A Resource Alias', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test36-${transactionId}`,
    };

    const params = {
      id: testAliasGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.deleteResourceAlias(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);
  });

  test('37 - Verify Resource Alias Was Deleted', async () => {
    expect(testAliasGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test37-${transactionId}`,
    };

    const params = {
      id: testAliasGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceAlias(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testAliasCrn);
    expect(result.state).toEqual('removed');
  });

  test('38 - Lock A Resource Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test38-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.lockResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceCrn);
    expect(result.locked).toBeTruthy();
    expect(result.last_operation.type).toEqual('lock');
    expect(result.last_operation.async).toBeFalsy();
    expect(result.last_operation.state).toEqual('succeeded');
  });

  test('39 - Update A Locked Resource Instance - Fail', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test39-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      name: lockedInstanceNameUpdate,
      headers: customHeader,
    };

    let rerr;
    try {
      await resourceControllerService.updateResourceInstance(params);
    } catch (err) {
      rerr = err;
    }

    expect(rerr).toBeDefined();
    expect(rerr.status).toEqual(422);
  });

  test('40 - Delete A Locked Resource Instance - Fail', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test40-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      headers: customHeader,
    };

    let rerr;
    try {
      await resourceControllerService.deleteResourceInstance(params);
    } catch (err) {
      rerr = err;
    }

    expect(rerr).toBeDefined();
    expect(rerr.status).toEqual(422);
  });

  test('41 - Unlock A Resource Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test41-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.unlockResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceCrn);
    expect(result.locked).toBeFalsy();
    expect(result.last_operation.type).toEqual('unlock');
    expect(result.last_operation.async).toBeFalsy();
    expect(result.last_operation.state).toEqual('succeeded');
  });

  test('42 - Delete A Resource Instance', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test42-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      recursive: false,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.deleteResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);
  });

  test('43 - Verify Resource Instance Was Deleted', async () => {
    expect(testInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test43-${transactionId}`,
    };

    const params = {
      id: testInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.getResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testInstanceCrn);
    expect(result.state).toEqual('removed');
    expect(result.last_operation.type).toEqual('delete');
    expect(result.last_operation.async).toBeFalsy();
    expect(result.last_operation.state).toEqual('succeeded');
  });

  test('44 - Create Resource Instance For Reclamation Enabled Plan', async () => {
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test44-${transactionId}`,
    };

    const params = {
      name: reclaimInstanceName,
      target: testRegionId2,
      resourceGroup: testResourceGroupGuid,
      resourcePlanId: testPlanId2,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.createResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toBeDefined();
    expect(result.guid).toBeDefined();
    expect(result.crn).toBeDefined();
    expect(result.id).toEqual(result.crn);
    expect(result.name).toEqual(reclaimInstanceName);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resource_plan_id).toEqual(testPlanId2);
    expect(result.state).toEqual('active');
    expect(result.locked).toBeFalsy();
    expect(result.last_operation.type).toEqual('create');
    expect(result.last_operation.async).toBeFalsy();
    expect(result.last_operation.state).toEqual('succeeded');

    // testReclaimInstanceCrn = result.id; //commented to fix linting error of declared but not used
    testReclaimInstanceGuid = result.guid;
  });

  test('45 - Schedule A Resource Instance For Reclamation', async () => {
    expect(testReclaimInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test45-${transactionId}`,
    };

    const params = {
      id: testReclaimInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.deleteResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);

    await delay(20000);
  });

  // Commented because redis timeouts cause intermittent failure

  // test('46 - Verify The Resource Instance Is Pending Reclamation', async done => {
  //   const customHeader = {
  //     'Transaction-Id': 'rc-sdk-node-test46-' + transactionId,
  //   };

  //   const params = {
  //     id: testReclaimInstanceGuid,
  //     headers: customHeader,
  //   };

  //   let response;
  //   try {
  //     response = await resourceControllerService.getResourceInstance(params);
  //   } catch (err) {
  //     done(err);
  //   }

  //   expect(response).toBeDefined();
  //   expect(response.status).toEqual(200);
  //   expect(response.result).toBeDefined();

  //   const result = response.result;
  //   expect(result.id).toEqual(testReclaimInstanceCrn);
  //   expect(result.state).toEqual('pending_reclamation');
  //   expect(result.last_operation.type).toEqual('reclamation');
  //   expect(result.last_operation.async).toBeFalsy();
  //   expect(result.last_operation.state).toEqual('succeeded');

  //   done();
  // });

  test('47 - List Reclamations For Account Id', async () => {
    expect(testReclaimInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test47-${transactionId}`,
    };

    const params = {
      // accountId: testAccountId,
      resourceInstanceId: testReclaimInstanceGuid, // checking reclamations with instance guid for more test reliability
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listReclamations(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.resources.length).toBeGreaterThanOrEqual(1);

    let foundReclaim = false;
    result.resources.forEach((reclaim) => {
      if (reclaim.resource_instance_id.toString() === testReclaimInstanceGuid) {
        expect(reclaim.resource_instance_id).toEqual(testReclaimInstanceGuid);
        expect(reclaim.account_id).toEqual(testAccountId);
        expect(reclaim.resource_group_id).toEqual(testResourceGroupGuid);
        expect(reclaim.state).toEqual('SCHEDULED');

        foundReclaim = true;
        testReclamationId1 = reclaim.id;
      }
    });
    expect(foundReclaim).toBeTruthy();
  });

  test('48 - Restore A Resource Instance', async () => {
    expect(testReclamationId1).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test48-${transactionId}`,
    };

    const params = {
      id: testReclamationId1,
      actionName: 'restore',
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.runReclamationAction(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testReclamationId1);
    expect(result.resource_instance_id).toEqual(testReclaimInstanceGuid);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.state).toEqual('RESTORING');

    await delay(20000);
  });

  // Commented because redis timeouts cause intermittent failure

  // test('49 - Verify The Resource Instance Is Restored', async done => {
  //   const customHeader = {
  //     'Transaction-Id': 'rc-sdk-node-test49-' + transactionId,
  //   };

  //   const params = {
  //     id: testReclaimInstanceGuid,
  //     headers: customHeader,
  //   };

  //   let response;
  //   try {
  //     response = await resourceControllerService.getResourceInstance(params);
  //   } catch (err) {
  //     done(err);
  //   }

  //   expect(response).toBeDefined();
  //   expect(response.status).toEqual(200);
  //   expect(response.result).toBeDefined();

  //   const result = response.result;
  //   expect(result.id).toEqual(testReclaimInstanceCrn);
  //   expect(result.state).toEqual('active');
  //   expect(result.last_operation.type).toEqual('reclamation');
  //   expect(result.last_operation.async).toBeFalsy();
  //   expect(result.last_operation.state).toEqual('succeeded');

  //   done();
  // });

  test('50 - Schedule A Resource Instance For Reclamation 2', async () => {
    expect(testReclaimInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test50-${transactionId}`,
    };

    const params = {
      id: testReclaimInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.deleteResourceInstance(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err, null, 2));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(204);

    await delay(20000);
  });

  test('51 - List Reclamations For Account Id And Resource Instance Id', async () => {
    expect(testReclaimInstanceGuid).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test51-${transactionId}`,
    };

    const params = {
      accountId: testAccountId,
      resourceInstanceId: testReclaimInstanceGuid,
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.listReclamations(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.resources).toHaveLength(1);
    expect(result.resources[0].resource_instance_id).toEqual(testReclaimInstanceGuid);
    expect(result.resources[0].account_id).toEqual(testAccountId);
    expect(result.resources[0].resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.resources[0].state).toEqual('SCHEDULED');

    testReclamationId2 = result.resources[0].id;
  });

  test('52 - Reclaim A Resource Instance', async () => {
    expect(testReclamationId2).toBeTruthy();
    const customHeader = {
      'Transaction-Id': `rc-sdk-node-test52-${transactionId}`,
    };

    const params = {
      id: testReclamationId2,
      actionName: 'reclaim',
      headers: customHeader,
    };

    let response;
    try {
      response = await resourceControllerService.runReclamationAction(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const { result } = response;
    expect(result.id).toEqual(testReclamationId2);
    expect(result.resource_instance_id).toEqual(testReclaimInstanceGuid);
    expect(result.account_id).toEqual(testAccountId);
    expect(result.resource_group_id).toEqual(testResourceGroupGuid);
    expect(result.state).toEqual('RECLAIMING');

    await delay(20000);
  });

  // Commented because redis timeouts cause intermittent failure

  // test('53 - Verify The Resource Instance Is Reclaimed', async done => {
  //   const customHeader = {
  //     'Transaction-Id': 'rc-sdk-node-test53-' + transactionId,
  //   };

  //   const params = {
  //     id: testReclaimInstanceGuid,
  //     headers: customHeader,
  //   };

  //   let response;
  //   try {
  //     response = await resourceControllerService.getResourceInstance(params);
  //   } catch (err) {
  //     done(err);
  //   }

  //   expect(response).toBeDefined();
  //   expect(response.status).toEqual(200);
  //   expect(response.result).toBeDefined();

  //   const result = response.result;
  //   expect(result.id).toEqual(testReclaimInstanceCrn);
  //   expect(result.state).toEqual('removed');
  //   expect(result.last_operation.type).toEqual('reclamation');
  //   expect(result.last_operation.async).toBeFalsy();
  //   expect(result.last_operation.state).toEqual('succeeded');

  //   done();
  // });

  afterAll(async () => {
    await cleanUp();
  }, 120000);

  async function cleanUp() {
    // delete keys to cleanup
    if (testAliasKeyGuid) {
      try {
        const customHeader = {
          'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
        };

        const params = {
          id: testAliasKeyGuid,
          headers: customHeader,
        };
        await resourceControllerService.deleteResourceKey(params);
        console.log(`Successful cleanup of key ${testAliasKeyGuid}`);
      } catch (err) {
        if (err && err.status === 410) {
          console.log(`Key ${testAliasKeyGuid} was already deleted by the tests.`);
        } else {
          console.log(`Error cleaning up key ${testAliasKeyGuid}: `, JSON.stringify(err));
        }
      }
    } else {
      console.log('Key for alias was not created. No cleanup needed.');
    }

    if (testInstanceKeyGuid) {
      try {
        const customHeader = {
          'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
        };

        const params = {
          id: testInstanceKeyGuid,
          headers: customHeader,
        };
        await resourceControllerService.deleteResourceKey(params);
        console.log(`Successful cleanup of key ${testInstanceKeyGuid}`);
      } catch (err) {
        if (err && err.status === 410) {
          console.log(`Key ${testInstanceKeyGuid} was already deleted by the tests.`);
        } else {
          console.log(`Error cleaning up key ${testInstanceKeyGuid}: `, JSON.stringify(err));
        }
      }
    } else {
      console.log('Key for instance was not created. No cleanup needed.');
    }

    // delete binding to cleanup
    if (testBindingGuid) {
      try {
        const customHeader = {
          'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
        };

        const params = {
          id: testBindingGuid,
          headers: customHeader,
        };

        await resourceControllerService.deleteResourceBinding(params);
        console.log(`Successful cleanup of binding ${testBindingGuid}`);
      } catch (err) {
        if (err && err.status === 410) {
          console.log(`Binding ${testBindingGuid} was already deleted by the tests.`);
        } else {
          console.log(`Error cleaning up binding ${testBindingGuid}: `, JSON.stringify(err));
        }
      }
    } else {
      console.log('Binding was not created. No cleanup needed.');
    }

    // delete alias to cleanup
    if (testAliasGuid) {
      try {
        const customHeader = {
          'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
        };

        const params = {
          id: testAliasGuid,
          headers: customHeader,
        };

        await resourceControllerService.deleteResourceAlias(params);
        console.log(`Successful cleanup of alias ${testAliasGuid}`);
      } catch (err) {
        if (err && err.status === 410) {
          console.log(`Alias ${testAliasGuid} was already deleted by the tests.`);
        } else {
          console.log(`Error cleaning up alias ${testAliasGuid}: `, JSON.stringify(err));
        }
      }
    } else {
      console.log('Alias was not created. No cleanup needed.');
    }

    // instance cleanup
    if (testInstanceGuid) {
      // get instance to cleanup to check if active and locked
      let response;
      try {
        response = await getResourceInstanceForCleanup(testInstanceGuid);
      } catch (err) {
        console.log(
          `Error retrieving instance ${testInstanceGuid} for cleanup: `,
          JSON.stringify(err)
        );
      }

      // if active and locked, unlock instance to cleanup
      if (
        response &&
        response.result &&
        response.result.state === 'active' &&
        response.result.locked
      ) {
        try {
          const customHeader = {
            'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
          };

          const params = {
            id: testInstanceGuid,
            headers: customHeader,
          };
          await resourceControllerService.unlockResourceInstance(params);
        } catch (err) {
          console.log(
            `Error unlocking instance ${testInstanceGuid} for cleanup: `,
            JSON.stringify(err)
          );
        }
      }

      // delete instance to cleanup
      try {
        await deleteResourceInstanceForCleanup(testInstanceGuid);
        console.log(`Successful cleanup of instance ${testInstanceGuid}`);
      } catch (err) {
        if (err && err.status === 410) {
          console.log(`Instance ${testInstanceGuid} was already deleted by the tests.`);
        } else {
          console.log(`Error cleaning up instance ${testInstanceGuid}: `, JSON.stringify(err));
        }
      }
    } else {
      console.log('Instance was not created. No cleanup needed.');
    }

    const customHeader = {
      'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
    };

    // Clean up keys by name
    let names = Object.values(keyNames);
    let namesLength = names.length;
    let nameCounter = 0;
    while (nameCounter < namesLength) {
      const listKeyParams = {
        name: names[nameCounter],
        headers: customHeader,
      };
      let listKeyResponse;
      try {
        listKeyResponse = await resourceControllerService.listResourceKeys(listKeyParams);
      } catch (err) {
        console.log(
          `Error retrieving key with name ${names[nameCounter]} for cleanup: `,
          JSON.stringify(err)
        );
      }
      if (listKeyResponse.result.resources.length > 0) {
        const { resources } = listKeyResponse.result;
        const resLength = resources.length;
        let resCounter = 0;
        while (resCounter < resLength) {
          const keyGuid = resources[resCounter].guid;
          const deleteKeyParams = {
            id: keyGuid,
            headers: customHeader,
          };
          try {
            await resourceControllerService.deleteResourceKey(deleteKeyParams);
            console.log(`Successful cleanup of key with name ${names[nameCounter]}`);
          } catch (err) {
            if (err && err.status === 410) {
              console.log(`Key with name ${names[nameCounter]} was already deleted by the tests.`);
            } else {
              console.log(
                `Error cleaning up key with name${names[nameCounter]} and key guid ${keyGuid}: `,
                JSON.stringify(err)
              );
            }
          }
          resCounter++;
        }
      } else {
        console.log(`No keys found for name ${names[nameCounter]}`);
      }
      nameCounter++;
    }

    // Clean up instances by name
    names = Object.values(instanceNames);
    namesLength = names.length;
    nameCounter = 0;
    while (nameCounter < namesLength) {
      const listInstanceParams = {
        name: names[nameCounter],
        headers: customHeader,
      };
      let listInstanceResponse;
      try {
        listInstanceResponse = await resourceControllerService.listResourceInstances(
          listInstanceParams
        );
      } catch (err) {
        console.log(
          `Error retrieving instance with name ${names[nameCounter]} for cleanup: `,
          JSON.stringify(err)
        );
      }
      if (listInstanceResponse.result.resources.length > 0) {
        const { resources } = listInstanceResponse.result;
        const resLength = resources.length;
        let resCounter = 0;
        while (resCounter < resLength) {
          const instanceGuid = resources[resCounter].guid;

          // if active and locked, unlock instance to cleanup
          if (resources[resCounter].state === 'active' && resources[resCounter].locked) {
            try {
              const unlockParams = {
                id: instanceGuid,
                headers: customHeader,
              };
              await resourceControllerService.unlockResourceInstance(unlockParams);
            } catch (err) {
              console.log(
                `Error unlocking instance ${instanceGuid} for cleanup: `,
                JSON.stringify(err)
              );
            }
          }

          const deleteInstanceParams = {
            id: instanceGuid,
            headers: customHeader,
          };
          try {
            await resourceControllerService.deleteResourceInstance(deleteInstanceParams);
            console.log(`Successful cleanup of instance with name ${names[nameCounter]}`);
          } catch (err) {
            if (err && err.status === 410) {
              console.log(
                `Instance with name ${names[nameCounter]} was already deleted by the tests.`
              );
            } else {
              console.log(
                `Error cleaning up instance with name${names[nameCounter]} and instance guid ${instanceGuid}: `,
                JSON.stringify(err)
              );
            }
          }
          resCounter++;
        }
      } else {
        console.log(`No instances found for name ${names[nameCounter]}`);
      }
      nameCounter++;
    }

    // Clean up bindings by name
    names = Object.values(bindingNames);
    namesLength = names.length;
    nameCounter = 0;
    while (nameCounter < namesLength) {
      const listBindingParams = {
        name: names[nameCounter],
        headers: customHeader,
      };
      let listBindingResponse;
      try {
        listBindingResponse = await resourceControllerService.listResourceBindings(
          listBindingParams
        );
      } catch (err) {
        console.log(
          `Error retrieving binding with name ${names[nameCounter]} for cleanup: `,
          JSON.stringify(err)
        );
      }
      if (listBindingResponse.result.resources.length > 0) {
        const { resources } = listBindingResponse.result;
        const resLength = resources.length;
        let resCounter = 0;
        while (resCounter < resLength) {
          const bindingGuid = resources[resCounter].guid;
          const deleteBindingParams = {
            id: bindingGuid,
            headers: customHeader,
          };
          try {
            await resourceControllerService.deleteResourceBinding(deleteBindingParams);
            console.log(`Successful cleanup of binding with name ${names[nameCounter]}`);
          } catch (err) {
            if (err && err.status === 410) {
              console.log(
                `Binding with name ${names[nameCounter]} was already deleted by the tests.`
              );
            } else {
              console.log(
                `Error cleaning up binding with name${names[nameCounter]} and binding guid ${bindingGuid}: `,
                JSON.stringify(err)
              );
            }
          }
          resCounter++;
        }
      } else {
        console.log(`No bindings found for name ${names[nameCounter]}`);
      }
      nameCounter++;
    }

    // Clean up aliases by name
    names = Object.values(aliasNames);
    namesLength = names.length;
    nameCounter = 0;
    while (nameCounter < namesLength) {
      const listAliasParams = {
        name: names[nameCounter],
        headers: customHeader,
      };
      let listAliasResponse;
      try {
        listAliasResponse = await resourceControllerService.listResourceAliases(listAliasParams);
      } catch (err) {
        console.log(
          `Error retrieving alias with name ${names[nameCounter]} for cleanup: `,
          JSON.stringify(err)
        );
      }
      if (listAliasResponse.result.resources.length > 0) {
        const { resources } = listAliasResponse.result;
        const resLength = resources.length;
        let resCounter = 0;
        while (resCounter < resLength) {
          const aliasGuid = resources[resCounter].guid;
          const deleteAliasParams = {
            id: aliasGuid,
            headers: customHeader,
          };
          try {
            await resourceControllerService.deleteResourceAlias(deleteAliasParams);
            console.log(`Successful cleanup of alias with name ${names[nameCounter]}`);
          } catch (err) {
            if (err && err.status === 410) {
              console.log(
                `Alias with name ${names[nameCounter]} was already deleted by the tests.`
              );
            } else {
              console.log(
                `Error cleaning up alias with name${names[nameCounter]} and alias guid ${aliasGuid}: `,
                JSON.stringify(err)
              );
            }
          }
          resCounter++;
        }
      } else {
        console.log(`No aliases found for name ${names[nameCounter]}`);
      }
      nameCounter++;
    }

    await cleanupReclamationInstance();
  }
});

function getResourceInstanceForCleanup(instanceId) {
  const customHeader = {
    'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
  };

  const params = {
    id: instanceId,
    headers: customHeader,
  };
  return resourceControllerService.getResourceInstance(params);
}

function deleteResourceInstanceForCleanup(instanceId) {
  const customHeader = {
    'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
  };

  const params = {
    id: instanceId,
    headers: customHeader,
  };

  return resourceControllerService.deleteResourceInstance(params);
}

async function cleanupInstancePendingReclamation() {
  // if pending, get reclamation and run reclaim action
  let reclamationId;
  try {
    const customHeader = {
      'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
    };

    const params = {
      accountId: testAccountId,
      resourceInstanceId: testReclaimInstanceGuid,
      headers: customHeader,
    };
    const resp = await resourceControllerService.listReclamations(params);
    if (resp && resp.result && resp.result.resources && resp.result.resources.length === 1) {
      reclamationId = resp.result.resources[0].id;
    } else {
      console.log(
        `Failed to retrieve reclamation to process to reclaim instance ${testReclaimInstanceGuid}`
      );
    }
  } catch (err) {
    console.log(
      `Error retrieving reclamation for instance ${testReclaimInstanceGuid}: ${JSON.stringify(err)}`
    );
  }

  try {
    const customHeader = {
      'Transaction-Id': `rc-sdk-cleanup-${transactionId}`,
    };

    const params = {
      id: reclamationId,
      actionName: 'reclaim',
      headers: customHeader,
    };
    await resourceControllerService.runReclamationAction(params);
    console.log(`Successfully reclaimed instance ${testReclaimInstanceGuid}`);
  } catch (err) {
    console.log(
      `Error processing reclaim action for reclamation ${reclamationId}: ${JSON.stringify(err)}`
    );
  }
}

async function cleanupReclamationInstance() {
  if (testReclaimInstanceGuid) {
    let instanceState;
    try {
      const response = await getResourceInstanceForCleanup(testReclaimInstanceGuid);
      if (response && response.result) {
        instanceState = response.result.state;
      }
    } catch (err) {
      console.log(
        `Error retrieving instance ${testReclaimInstanceGuid} for cleanup: `,
        JSON.stringify(err)
      );
    }

    if (instanceState && instanceState === 'removed') {
      console.log(`Instance ${testReclaimInstanceGuid} was already reclaimed by the tests.`);
    } else if (instanceState && instanceState === 'pending_reclamation') {
      await cleanupInstancePendingReclamation();
    } else {
      try {
        await deleteResourceInstanceForCleanup(testReclaimInstanceGuid);
      } catch (err) {
        console.log(
          `Error scheduling instance ${testReclaimInstanceGuid} for reclamation: `,
          JSON.stringify(err)
        );
      }

      await delay(20000);
      await cleanupInstancePendingReclamation();
    }
  } else {
    console.log('Reclamation instance was not created. No cleanup needed.');
  }
}
