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
/* eslint-disable no-await-in-loop */

const PartnerUsageReportsV1 = require('../dist/partner-usage-reports/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Partner Usage Reports service.
//
// The following configuration properties are assumed to be defined:
// PARTNER_USAGE_REPORTS_URL=<service base url>
// PARTNER_USAGE_REPORTS_AUTH_TYPE=iam
// PARTNER_USAGE_REPORTS_APIKEY=<IAM apikey>
// PARTNER_USAGE_REPORTS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// PARTNER_USAGE_REPORTS_PARTNER_ID=<Enterprise ID of the distributor or reseller for which the report is requested>
// PARTNER_USAGE_REPORTS_CUSTOMER_ID=<Enterprise ID of the child customer for which the report is requested>
// PARTNER_USAGE_REPORTS_RESELLER_ID=<Enterprise ID of the reseller for which the report is requested>
// PARTNER_USAGE_REPORTS_BILLING_MONTH=<The billing month for which the usage report is requested. Format is `yyyy-mm`>
// PARTNER_USAGE_REPORTS_VIEWPOINT=<Enables partner to view the cost of provisioned services as applicable at each level of the hierarchy>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'partner_usage_reports_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('PartnerUsageReportsV1', () => {
  jest.setTimeout(30000);
  // Service instance
  let partnerUsageReportsService;

  const config = readExternalSources(PartnerUsageReportsV1.DEFAULT_SERVICE_NAME);
  const partnerId = config.partnerId;
  const billingMonth = config.billingMonth;

  test('Initialize service', async () => {
    // begin-common

    partnerUsageReportsService = PartnerUsageReportsV1.newInstance();

    // end-common
  });

  test('getResourceUsageReport request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getResourceUsageReport() result:');
    // begin-get_resource_usage_report

    const params = {
      partnerId,
      month: billingMonth,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new PartnerUsageReportsV1.GetResourceUsageReportPager(partnerUsageReportsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_usage_report
  });
});
