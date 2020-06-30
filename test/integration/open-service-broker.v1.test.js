/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2020.
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

'use strict';

const OpenServiceBrokerV1 = require('../../dist/open-service-broker/v1');
const authHelper = require('../resources/auth-helper.js');
const { v4: uuidv4 } = require('uuid');
const { Context } = require('typedoc/dist/lib/converter');

// testcase timeout value (40s).
const timeout = 60000;

// Location of our config file.
const configFile = 'open_service_broker.env';

// Use authHelper to skip tests if our configFile is not available.
const describe = authHelper.prepareTests(configFile);

const testAccountId = 'bc2b2fca0af84354a916dc1de6eee42e';
const testResourceGroupGuid = '13aa3ee48c3b44ddb64c05c79f7ab8ef';
const testOrgGuid = 'd35d4f0e-5076-4c89-9361-2522894b6548';
const testSpaceGuid = '336ba5f3-f185-488e-ac8d-02195eebb2f3';
const testAppGuid = 'bf692181-1f0e-46be-9faf-eb0857f4d1d5';
const testPlanId1 = 'a10e4820-3685-11e9-b210-d663bd873d93';
const testPlanId2 = 'a10e4410-3685-11e9-b210-d663bd873d933'
const testPlanId3 = 'a10e4960-3685-11e9-b210-d663bd873d93'
const testInstanceId = 'crn:v1:staging:public:bss-monitor:global:a/bc2b2fca0af84354a916dc1de6eee42e:sdkTestInstance::'
const testInstanceId2 = 'crn:v1:staging:public:bss-monitor:us-south:a/bc2b2fca0af84354a916dc1de6eee42e:osb-sdk-test00:resource-binding:osb-sdk-binding-test00'
const testBindingId = 'crn:v1:staging:public:bss-monitor:us-south:a/bc2b2fca0af84354a916dc1de6eee42e:sdkTestInstance:resource-binding:sdkTestBinding'
const testBindingId2 = 'crnL:v1:staging:public:bss-monitor:global:a/bc2b2fca0af84354a916dc1de6eee42e:osb-sdk-test00::'

const testPlatform = 'ibmcloud'
const testReasonCode = 'test_reason'
const testInitiatorId = 'test_initiator'
const transactionId = uuidv4();
const testDashboardUrlEscaped = 'http://www.example.com/crn%3Av1%3Astaging%3Apublic%3Abss-monitor%3Aglobal%3Aa%2Fbc2b2fca0af84354a916dc1de6eee42e%3AsdkTestInstance%3A%3A'
const testDashboardUrl = 'http://www.example.com/crn:v1:staging:public:bss-monitor:global:a/bc2b2fca0af84354a916dc1de6eee42e:sdkTestInstance::'
const testInstanceIdEscaped = 'crn%3Av1%3Astaging%3Apublic%3Abss-monitor%3Aglobal%3Aa%2Fbc2b2fca0af84354a916dc1de6eee42e%3AsdkTestInstance%3A%3A'        
const testInstanceId2Escaped = 'crn%3Av1%3Astaging%3Apublic%3Abss-monitor%3Aus-south%3Aa%2Fbc2b2fca0af84354a916dc1de6eee42e%3Aosb-sdk-test00%3Aresource-binding%3Aosb-sdk-binding-test00'
const testBindingIdEscaped = 'crn%3Av1%3Astaging%3Apublic%3Abss-monitor%3Aus-south%3Aa%2Fbc2b2fca0af84354a916dc1de6eee42e%3AsdkTestInstance%3Aresource-binding%3AsdkTestBinding'
const testBindingId2Escaped = 'crn%3Av1%3Astaging%3Apublic%3Abss-monitor%3Aglobal%3Aa%2Fbc2b2fca0af84354a916dc1de6eee42e%3Aosb-sdk-test00%3A%3A'
const testServiceId = 'a10e46ae-3685-11e9-b210-d663bd873d93'
const testEnable = true

let service;

describe('OpenServiceBrokerV1_integration', () => {
  jest.setTimeout(timeout);

  test('should successfully complete initialization', done => {
    // Initialize the service client.
    service = OpenServiceBrokerV1.newInstance();
    expect(service).not.toBeNull();

    console.log("Transaction-Id for Test Run:", transactionId);
    done();
  });

  test('00 - Create A Service Instance', async done => {
    const customHeader = {
      'Transaction-Id': 'osb-sdk-node-test00-' + transactionId,
    };

    const testContext = {
        account_id: testAccountId,
        crn: testInstanceId,
        platform: testPlatform
    }

    const testPars = {hello: 'bye'}

    const params = {
      instanceId: testInstanceId,
      organizationGuid: testOrgGuid,
      planId: testPlanId1,
      serviceId: testServiceId,
      spaceGuid: testSpaceGuid,
      context: testContext,
      parameters: testPars,
      acceptsIncomplete: true,
      headers: customHeader,
    };

    let response;
    try {
      response = await service.replaceServiceInstance(params);
    } catch (err) {
      done(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);
    expect(response.result).toBeDefined();

    const result = response.result;
    expect(result.dashboard_url).toEqual(testDashboardUrl);

    done();
  });

  test('01 - Update Service Instance', async done => {
    const customHeader = {
      'Transaction-Id': 'osb-sdk-node-test01-' + transactionId,
    };

    const testContext = {
        account_id: testAccountId,
        crn: testInstanceId,
        platform: testPlatform
    }

    const testPars = {hello: 'bye'}
    const testPrevValues = {hello: 'bye'}

    const params = {
      instanceId: testInstanceId,
      serviceId: testServiceId,
      context: testContext,
      parameters: testPars,
      planId: testPlanId1,
      previousValues: testPrevValues,
      acceptsIncomplete: true,
      headers: customHeader,
    };

    let response;
    try {
      response = await service.updateServiceInstance(params);
    } catch (err) {
      done(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const result = response.result;
    expect(result.service_instance_id).toEqual(testInstanceId);
    expect(result.plan_id).toEqual(testPlanId1);

    done();
  });

  test('02 - Disable Service Instance State', async done => {
    const customHeader = {
      'Transaction-Id': 'osb-sdk-node-test02-' + transactionId,
    };

    const params = {
      instanceId: testInstanceId,
      enabled: false,
      initiatorId: testInitiatorId,
      reasonCode: testReasonCode,
      headers: customHeader,
    };

    let response;
    try {
      response = await service.updateServiceInstance(params);
    } catch (err) {
      done(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.result).toBeDefined();

    const result = response.result;
    // expect(result.active).toBeTruthy(); //comes back undefined? postman is 400?
    // expect(result.enabled).toBeTruthy(); //comes back undefined? postman is 400?

    done();
  });

});

