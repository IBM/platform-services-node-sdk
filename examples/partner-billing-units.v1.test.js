/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2024.
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

/* eslint-disable no-console */

const PartnerBillingUnitsV1 = require('../dist/partner-billing-units/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Partner Billing Units service.
//
// The following configuration properties are assumed to be defined:
// PARTNER_BILLING_UNITS_URL=<service base url>
// PARTNER_BILLING_UNITS_AUTH_TYPE=iam
// PARTNER_BILLING_UNITS_APIKEY=<IAM apikey>
// PARTNER_BILLING_UNITS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// PARTNER_BILLING_UNITS_PARTNER_ID=<Enterprise ID of the distributor or reseller for which the report is requested>
// PARTNER_BILLING_UNITS_CUSTOMER_ID=<Enterprise ID of the customer for which the report is requested>
// PARTNER_BILLING_UNITS_RESELLER_ID=<Enterprise ID of the reseller for which the report is requested>
// PARTNER_BILLING_UNITS_BILLING_MONTH=<The billing month (yyyy-mm) for which usage report will be retrieved>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'partner_billing_units_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('PartnerBillingUnitsV1', () => {
  jest.setTimeout(30000);
  // Service instance
  let partnerBillingUnitsService;

  let partnerId;
  let billingMonth;

  test('Initialize service', async () => {
    // begin-common

    partnerBillingUnitsService = PartnerBillingUnitsV1.newInstance();

    const config = readExternalSources(PartnerBillingUnitsV1.DEFAULT_SERVICE_NAME);

    partnerId = config.partnerId;
    billingMonth = config.billingMonth;

    // end-common
  });

  test('getBillingOptions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getBillingOptions() result:');
    // begin-get_billing_options

    const params = {
      partnerId,
      date: billingMonth,
    };

    let res;
    try {
      res = await partnerBillingUnitsService.getBillingOptions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_billing_options
  });

  test('getCreditPoolsReport request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCreditPoolsReport() result:');
    // begin-get_credit_pools_report

    const params = {
      partnerId,
      date: billingMonth,
    };

    let res;
    try {
      res = await partnerBillingUnitsService.getCreditPoolsReport(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_credit_pools_report
  });
});
