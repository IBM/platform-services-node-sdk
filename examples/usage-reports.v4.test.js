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

const UsageReportsV4 = require('../dist/usage-reports/v4');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the Usage Reports service.
//
// The following configuration properties are assumed to be defined:
// USAGE_REPORTS_URL=<service url>
// USAGE_REPORTS_AUTHTYPE=iam
// USAGE_REPORTS_APIKEY=<IAM api key of user with authority to create rules>
// USAGE_REPORTS_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// USAGE_REPORTS_ACCOUNT_ID=<the id of the account whose usage info will be retrieved>
// USAGE_REPORTS_RESOURCE_GROUP_ID=<the id of the resource group whose usage info will be retrieved>
// USAGE_REPORTS_ORG_ID=<the id of the organization whose usage info will be retrieved>
// USAGE_REPORTS_BILLING_MONTH=<the billing month (yyyy-mm) for which usage info will be retrieved>
// USAGE_REPORTS_COS_BUCKET=<The name of the COS bucket to store the snapshot of the billing reports.>
// USAGE_REPORTS_COS_LOCATION=<Region of the COS instance.>
// USAGE_REPORTS_DATE_FROM=<Timestamp in milliseconds for which billing report snapshot is requested.>
// USAGE_REPORTS_DATE_TO=<Timestamp in milliseconds for which billing report snapshot is requested.>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'usage_reports.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('UsageReportsV4', () => {
  jest.setTimeout(30000);

  // begin-common

  const usageReportsService = UsageReportsV4.newInstance({});

  // end-common

  const config = readExternalSources(UsageReportsV4.DEFAULT_SERVICE_NAME);

  let accountId = config.accountId;
  let resourceGroupId = config.resourceGroupId;
  let orgId = config.orgId;
  let billingMonth = config.billingMonth;
  let cosBucket = config.cosBucket;
  let cosLocation = config.cosLocation;
  let snapshotDateFrom = config.snapshotDateFrom;
  let snapshotDateTo = config.snapshotDateTo;

  test('getAccountSummary request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getAccountSummary() result:');
    // begin-get_account_summary

    const params = {
      accountId: accountId,
      billingmonth: billingMonth,
    };

    try {
      const res = await usageReportsService.getAccountSummary(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_account_summary
  });
  test('getAccountUsage request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getAccountUsage() result:');
    // begin-get_account_usage

    const params = {
      accountId: accountId,
      billingmonth: billingMonth,
    };

    try {
      const res = await usageReportsService.getAccountUsage(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_account_usage
  });
  test('getResourceGroupUsage request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getResourceGroupUsage() result:');
    // begin-get_resource_group_usage

    const params = {
      accountId: accountId,
      resourceGroupId: resourceGroupId,
      billingmonth: billingMonth,
    };

    try {
      const res = await usageReportsService.getResourceGroupUsage(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_group_usage
  });
  test('getOrgUsage request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getOrgUsage() result:');
    // begin-get_org_usage

    const params = {
      accountId: accountId,
      organizationId: orgId,
      billingmonth: billingMonth,
    };

    try {
      const res = await usageReportsService.getOrgUsage(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_org_usage
  });
  test('getResourceUsageAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getResourceUsageAccount() result:');
    // begin-get_resource_usage_account

    const params = {
      accountId: accountId,
      billingmonth: billingMonth,
    };

    try {
      const res = await usageReportsService.getResourceUsageAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_usage_account
  });
  test('getResourceUsageResourceGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getResourceUsageResourceGroup() result:');
    // begin-get_resource_usage_resource_group

    const params = {
      accountId: accountId,
      resourceGroupId: resourceGroupId,
      billingmonth: billingMonth,
    };

    try {
      const res = await usageReportsService.getResourceUsageResourceGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_usage_resource_group
  });
  test('getResourceUsageOrg request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getResourceUsageOrg() result:');
    // begin-get_resource_usage_org

    const params = {
      accountId: accountId,
      organizationId: orgId,
      billingmonth: billingMonth,
    };

    try {
      const res = await usageReportsService.getResourceUsageOrg(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_resource_usage_org
  });
  test('createReportsSnapshotConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createReportsSnapshotConfig() result:');
    // begin-create_reports_snapshot_config

    const params = {
      accountId,
      interval: 'daily',
      cosBucket,
      cosLocation,
    };

    let res;
    try {
      res = await usageReportsService.createReportsSnapshotConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_reports_snapshot_config
  });

  test('getReportsSnapshotConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportsSnapshotConfig() result:');
    // begin-get_reports_snapshot_config

    const params = {
      accountId,
    };

    let res;
    try {
      res = await usageReportsService.getReportsSnapshotConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_reports_snapshot_config
  });

  test('updateReportsSnapshotConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateReportsSnapshotConfig() result:');
    // begin-update_reports_snapshot_config

    const params = {
      accountId,
    };

    let res;
    try {
      res = await usageReportsService.updateReportsSnapshotConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_reports_snapshot_config
  });

  test('validateReportsSnapshotConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('validateReportsSnapshotConfig() result:');
    // begin-validate_reports_snapshot_config

    const params = {
      accountId,
    };

    let res;
    try {
      res = await usageReportsService.validateReportsSnapshotConfig(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-validate_reports_snapshot_config
  });

  test('getReportsSnapshot request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReportsSnapshot() result:');
    // begin-get_reports_snapshot

    const params = {
      accountId,
      month: billingMonth,
      dateFrom: snapshotDateFrom,
      dateTo: snapshotDateTo,
      limit: 30,
    };

    const allResults = [];
    try {
      const pager = new UsageReportsV4.GetReportsSnapshotPager(usageReportsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_reports_snapshot
  });

  test('deleteReportsSnapshotConfig request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_reports_snapshot_config

    const params = {
      accountId,
    };

    try {
      await usageReportsService.deleteReportsSnapshotConfig(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_reports_snapshot_config
  });
});
