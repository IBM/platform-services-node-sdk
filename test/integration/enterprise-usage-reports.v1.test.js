/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2020, 2022.
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

const { readExternalSources, getQueryParam } = require('ibm-cloud-sdk-core');
const EnterpriseUsageReportsV1 = require('../../dist/enterprise-usage-reports/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'enterprise_usage_reports.env';

const describe = authHelper.prepareTests(configFile);

describe('EnterpriseUsageReportsV1_integration', () => {
  let enterpriseUsageReportsService;
  let accountId;
  let accountGroupId;
  let enterpriseId;
  let billingMonth;

  test('Init', async () => {
    enterpriseUsageReportsService = EnterpriseUsageReportsV1.newInstance();

    const config = readExternalSources(EnterpriseUsageReportsV1.DEFAULT_SERVICE_NAME);

    expect(enterpriseUsageReportsService).not.toBeNull();
    expect(config).not.toBeNull();

    accountId = config.accountId;
    accountGroupId = config.accountGroupId;
    enterpriseId = config.enterpriseId;
    billingMonth = config.billingMonth;
    expect(accountId).not.toBeNull();
    expect(accountGroupId).not.toBeNull();
    expect(enterpriseId).not.toBeNull();
    expect(billingMonth).not.toBeNull();
  });

  jest.setTimeout(timeout);

  test('getResourceUsageReportEnterprise()', async () => {
    const results = [];
    let offset = null;
    try {
      do {
        // Retrieve the reports one at a time to test pagination.
        const params = {
          enterpriseId,
          month: billingMonth,
          limit: 1,
          offset,
        };

        const res = await enterpriseUsageReportsService.getResourceUsageReport(params);
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).toBeDefined();

        // Add the just-retrieved page to "results".
        expect(result.reports).toBeDefined();
        results.push(...result.reports);

        // Determine the offset to use to get the next page.
        if (result.next) {
          offset = getQueryParam(result.next.href, 'offset');
        } else {
          offset = null;
        }
      } while (offset != null);
    } catch (err) {
      console.log(err);
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    // Make sure we found some reports.
    const numReports = results.length;
    // console.log(`getResourceUsageReport() response contained ${numReports} total reports`);
    expect(numReports).toBeGreaterThan(0);
  });

  test('getResourceUsageReportAccount()', async () => {
    const results = [];
    let offset = null;
    try {
      do {
        // Retrieve the reports one at a time to test pagination.
        const params = {
          accountId,
          month: billingMonth,
          limit: 1,
          offset,
        };

        const res = await enterpriseUsageReportsService.getResourceUsageReport(params);
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).toBeDefined();

        // Add the just-retrieved page to "results".
        expect(result.reports).toBeDefined();
        results.push(...result.reports);

        // Determine the offset to use to get the next page.
        if (result.next) {
          offset = getQueryParam(result.next.href, 'offset');
        } else {
          offset = null;
        }
      } while (offset != null);
    } catch (err) {
      console.log(err);
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    // Make sure we found some reports.
    const numReports = results.length;
    // console.log(`getResourceUsageReport() response contained ${numReports} total reports`);
    expect(numReports).toBeGreaterThan(0);
  });

  test('getResourceUsageReportAccountGroup()', async () => {
    const results = [];
    let offset = null;
    try {
      do {
        // Retrieve the reports one at a time to test pagination.
        const params = {
          accountGroupId,
          month: billingMonth,
          limit: 1,
          offset,
        };

        const res = await enterpriseUsageReportsService.getResourceUsageReport(params);
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).toBeDefined();

        // Add the just-retrieved page to "results".
        expect(result.reports).toBeDefined();
        results.push(...result.reports);

        // Determine the offset to use to get the next page.
        if (result.next) {
          offset = getQueryParam(result.next.href, 'offset');
        } else {
          offset = null;
        }
      } while (offset != null);
    } catch (err) {
      console.log(err);
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    // Make sure we found some reports.
    const numReports = results.length;
    // console.log(`getResourceUsageReport() response contained ${numReports} total reports`);
    expect(numReports).toBeGreaterThan(0);
  });

  test('getResourceUsageReport() via GetResourceUsageReportPager', async () => {
    const params = {
      accountGroupId,
      month: billingMonth,
    };

    const allResults = [];

    // Test getNext().
    let pager = new EnterpriseUsageReportsV1.GetResourceUsageReportPager(
      enterpriseUsageReportsService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new EnterpriseUsageReportsV1.GetResourceUsageReportPager(
      enterpriseUsageReportsService,
      params
    );
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });
});
