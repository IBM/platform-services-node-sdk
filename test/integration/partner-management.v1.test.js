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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const PartnerManagementV1 = require('../../dist/partner-management/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'partner_management_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('PartnerManagementV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let partnerManagementService;
  let partnerId;
  let resellerId;
  let customerId;
  let billingMonth;
  let viewpoint;

  test('Initialize service', async () => {
    partnerManagementService = PartnerManagementV1.newInstance();

    expect(partnerManagementService).not.toBeNull();

    const config = readExternalSources(PartnerManagementV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    partnerId = config.partnerId;
    resellerId = config.resellerId;
    customerId = config.customerId;
    billingMonth = config.billingMonth;
    viewpoint = config.viewpoint;
    expect(partnerId).not.toBeNull();
    expect(resellerId).not.toBeNull();
    expect(customerId).not.toBeNull();
    expect(billingMonth).not.toBeNull();
    expect(viewpoint).not.toBeNull();

    partnerManagementService.enableRetries();
  });

  test('getResourceUsageReport() - Get rolled up usage report across all end customers and resellers', async () => {
    const params = {
      partnerId,
      month: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getResourceUsageReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getResourceUsageReport() via GetResourceUsageReportPager - Get rolled up usage report across all end customers and resellers', async () => {
    const params = {
      partnerId,
      month: billingMonth,
      limit: 30,
    };

    const allResults = [];

    // Test getNext().
    let pager = new PartnerManagementV1.GetResourceUsageReportPager(
      partnerManagementService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new PartnerManagementV1.GetResourceUsageReportPager(partnerManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getResourceUsageReport() - Get rolled up usage reports by reseller for partner', async () => {
    const params = {
      partnerId,
      children: true,
      month: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getResourceUsageReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getResourceUsageReport() via GetResourceUsageReportPager - Get rolled up usage reports by reseller for partner', async () => {
    const params = {
      partnerId,
      children: true,
      month: billingMonth,
      limit: 30,
    };

    const allResults = [];

    // Test getNext().
    let pager = new PartnerManagementV1.GetResourceUsageReportPager(
      partnerManagementService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new PartnerManagementV1.GetResourceUsageReportPager(partnerManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getResourceUsageReport() - Get usage report of a specific reseller for partner', async () => {
    const params = {
      partnerId,
      resellerId,
      month: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getResourceUsageReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getResourceUsageReport() via GetResourceUsageReportPager - Get usage report of a specific reseller for partner', async () => {
    const params = {
      partnerId,
      resellerId,
      month: billingMonth,
      limit: 30,
    };

    const allResults = [];

    // Test getNext().
    let pager = new PartnerManagementV1.GetResourceUsageReportPager(
      partnerManagementService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new PartnerManagementV1.GetResourceUsageReportPager(partnerManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getResourceUsageReport() - Get usage reports of a specific end_customer for partner', async () => {
    const params = {
      partnerId,
      customerId,
      month: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getResourceUsageReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getResourceUsageReport() via GetResourceUsageReportPager - Get usage reports of a specific end_customer for partner', async () => {
    const params = {
      partnerId,
      customerId,
      month: billingMonth,
      limit: 30,
    };

    const allResults = [];

    // Test getNext().
    let pager = new PartnerManagementV1.GetResourceUsageReportPager(
      partnerManagementService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new PartnerManagementV1.GetResourceUsageReportPager(partnerManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getResourceUsageReport() - Recursively GET usage reports for all end customers of a partner', async () => {
    const params = {
      partnerId,
      month: billingMonth,
      recurse: true,
      limit: 30,
    };

    const res = await partnerManagementService.getResourceUsageReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getResourceUsageReport() via GetResourceUsageReportPager - Recursively GET usage reports for all end customers of a partner', async () => {
    const params = {
      partnerId,
      month: billingMonth,
      recurse: true,
      limit: 30,
    };

    const allResults = [];

    // Test getNext().
    let pager = new PartnerManagementV1.GetResourceUsageReportPager(
      partnerManagementService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new PartnerManagementV1.GetResourceUsageReportPager(partnerManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getResourceUsageReport() - Get rolled up usage reports for partner by specified viewpoint', async () => {
    const params = {
      partnerId,
      children: true,
      month: billingMonth,
      viewpoint,
      limit: 30,
    };

    const res = await partnerManagementService.getResourceUsageReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getResourceUsageReport() via GetResourceUsageReportPager - Get rolled up usage reports for partner by specified viewpoint', async () => {
    const params = {
      partnerId,
      children: true,
      month: billingMonth,
      viewpoint,
      limit: 30,
    };

    const allResults = [];

    // Test getNext().
    let pager = new PartnerManagementV1.GetResourceUsageReportPager(
      partnerManagementService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new PartnerManagementV1.GetResourceUsageReportPager(partnerManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getBillingOptions() - Get customers billing options of a partner', async () => {
    const params = {
      partnerId,
      date: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getBillingOptions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getBillingOptions() - Get customers billing options of a Reseller for a specific partner', async () => {
    const params = {
      partnerId,
      resellerId,
      date: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getBillingOptions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getBillingOptions() - Get customers billing options of an end customer for a specific partner', async () => {
    const params = {
      partnerId,
      customerId,
      date: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getBillingOptions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCreditPoolsReport() - Get subscription burn-down report of a partner', async () => {
    const params = {
      partnerId,
      date: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getCreditPoolsReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCreditPoolsReport() - Get subscription burn-down report of a Reseller for a specific partner', async () => {
    const params = {
      partnerId,
      resellerId,
      date: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getCreditPoolsReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCreditPoolsReport() - Get subscription burn-down report of an end customer for a specific partner', async () => {
    const params = {
      partnerId,
      customerId,
      date: billingMonth,
      limit: 30,
    };

    const res = await partnerManagementService.getCreditPoolsReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
