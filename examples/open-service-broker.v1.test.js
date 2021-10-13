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

//
// This file provides an example of how to use the Open Service Broker service.
//
// The following configuration properties are assumed to be defined:
//
// OPEN_SERVICE_BROKER_URL=<Service broker's URL>
// OPEN_SERVICE_BROKER_AUTH_TYPE=basic
// OPEN_SERVICE_BROKER_USERNAME=<username>
// OPEN_SERVICE_BROKER_PASSWORD=<password>
// OPEN_SERVICE_BROKER_PLAN_ID=<The ID of the plan associated with the service offering>
// OPEN_SERVICE_BROKER_RESOURCE_INSTANCE_ID=<The ID of a previously provisioned service instance>
// OPEN_SERVICE_BROKER_SERVICE_ID=<The ID of the service being offered>
// OPEN_SERVICE_BROKER_ACCOUNT_ID=<User's account ID>
// OPEN_SERVICE_BROKER_BINDING_ID=<The ID of a previously provisioned binding for that service instance>
// OPEN_SERVICE_BROKER_SPACE_GUID=<The identifier for the project space within the IBM Cloud platform organization>
// OPEN_SERVICE_BROKER_APPLICATION_GUID=<GUID of an application associated with the binding>
// OPEN_SERVICE_BROKER_ORGANIZATION_GUID=<The IBM Cloud platform GUID for the organization under which the service instance is to be provisioned>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
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

  let instanceId = config.resourceInstanceId;
  let orgGuid = config.organizationGuid;
  let planId = config.planId;
  let serviceId = config.serviceId;
  let spaceGuid = config.spaceGuid;
  let accountId = config.accountId;
  let bindingId = config.bindingId;
  let appGuid = config.applicationGuid;
  let initiatorId = 'null';
  let reasonCode = 'IBMCLOUD_ACCT_SUSPEND';
  let operation = 'Provision_45';

  test('getServiceInstanceState request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getServiceInstanceState() result:');
    // begin-get_service_instance_state

    const params = {
      instanceId: instanceId,
    };

    try {
      const res = await openServiceBrokerService.getServiceInstanceState(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_service_instance_state
  });
  test('replaceServiceInstanceState request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('replaceServiceInstanceState() result:');
    // begin-replace_service_instance_state

    const params = {
      instanceId: instanceId,
      enabled: false,
      initiatorId: initiatorId,
      reasonCode: reasonCode,
    };

    try {
      const res = await openServiceBrokerService.replaceServiceInstanceState(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_service_instance_state
  });
  test('replaceServiceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('replaceServiceInstance() result:');
    // begin-replace_service_instance

    const context = {
      account_id: accountId,
      crn: instanceId,
      platform: 'ibmcloud',
    };

    const pars = { example: 'property' };

    const params = {
      instanceId: instanceId,
      organizationGuid: orgGuid,
      planId: planId,
      serviceId: serviceId,
      spaceGuid: spaceGuid,
      context: context,
      parameters: pars,
      acceptsIncomplete: true,
    };

    try {
      const res = await openServiceBrokerService.replaceServiceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_service_instance
  });
  test('updateServiceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('updateServiceInstance() result:');
    // begin-update_service_instance

    const context = {
      account_id: accountId,
      crn: instanceId,
      platform: 'ibmcloud',
    };

    const pars = { example: 'property' };
    const prevValues = { previous: 'values' };

    const params = {
      instanceId: instanceId,
      planId: planId,
      serviceId: serviceId,
      context: context,
      parameters: pars,
      previousValues: prevValues,
      acceptsIncomplete: true,
    };

    try {
      const res = await openServiceBrokerService.updateServiceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_service_instance
  });
  test('listCatalog request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listCatalog() result:');
    // begin-list_catalog

    try {
      const res = await openServiceBrokerService.listCatalog({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_catalog
  });
  test('getLastOperation request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getLastOperation() result:');
    // begin-get_last_operation

    const params = {
      instanceId: instanceId,
      operation: operation,
      planId: planId,
      serviceId: serviceId,
    };

    try {
      const res = await openServiceBrokerService.getLastOperation(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_last_operation
  });
  test('replaceServiceBinding request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('replaceServiceBinding() result:');
    // begin-replace_service_binding

    const pars = { example: 'property' };

    const bindResource = {
      account_id: accountId,
      serviceid_crn: appGuid,
    };

    const params = {
      bindingId: bindingId,
      bindResource: bindResource,
      instanceId: instanceId,
      planId: planId,
      serviceId: serviceId,
      parameters: pars,
    };

    try {
      const res = await openServiceBrokerService.replaceServiceBinding(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_service_binding
  });
  test('deleteServiceInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('deleteServiceInstance() result:');
    // begin-delete_service_instance

    const params = {
      serviceId: serviceId,
      planId: planId,
      instanceId: instanceId,
    };

    try {
      const res = await openServiceBrokerService.deleteServiceInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_service_instance
  });
  test('deleteServiceBinding request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    // begin-delete_service_binding

    const params = {
      bindingId: bindingId,
      instanceId: instanceId,
      planId: planId,
      serviceId: serviceId,
    };

    try {
      await openServiceBrokerService.deleteServiceBinding(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_service_binding
  });
});
