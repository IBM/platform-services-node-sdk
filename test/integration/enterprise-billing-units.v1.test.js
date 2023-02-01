/**
 * (C) Copyright IBM Corp. 2023.
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

const EnterpriseBillingUnitsV1 = require('../../dist/enterprise-billing-units/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'enterprise_billing_units_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('EnterpriseBillingUnitsV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let enterpriseBillingUnitsService;

  test('Initialize service', async () => {
    enterpriseBillingUnitsService = EnterpriseBillingUnitsV1.newInstance();

    expect(enterpriseBillingUnitsService).not.toBeNull();

    const config = readExternalSources(EnterpriseBillingUnitsV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
  
    enterpriseBillingUnitsService.enableRetries();
  });

  test('getBillingUnit()', async () => {
    const params = {
      billingUnitId: 'testString',
    };

    const res = await enterpriseBillingUnitsService.getBillingUnit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listBillingUnits()', async () => {
    const params = {
      accountId: 'testString',
      enterpriseId: 'testString',
      accountGroupId: 'testString',
      limit: 1,
      start: 38,
    };

    const res = await enterpriseBillingUnitsService.listBillingUnits(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listBillingUnits() via BillingUnitsPager', async () => {
    const params = {
      accountId: 'testString',
      enterpriseId: 'testString',
      accountGroupId: 'testString',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new EnterpriseBillingUnitsV1.BillingUnitsPager(enterpriseBillingUnitsService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new EnterpriseBillingUnitsV1.BillingUnitsPager(enterpriseBillingUnitsService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('listBillingOptions()', async () => {
    const params = {
      billingUnitId: 'testString',
      limit: 1,
      start: 38,
    };

    const res = await enterpriseBillingUnitsService.listBillingOptions(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listBillingOptions() via BillingOptionsPager', async () => {
    const params = {
      billingUnitId: 'testString',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new EnterpriseBillingUnitsV1.BillingOptionsPager(enterpriseBillingUnitsService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new EnterpriseBillingUnitsV1.BillingOptionsPager(enterpriseBillingUnitsService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getCreditPools()', async () => {
    const params = {
      billingUnitId: 'testString',
      date: 'testString',
      type: 'testString',
      limit: 1,
      start: 38,
    };

    const res = await enterpriseBillingUnitsService.getCreditPools(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCreditPools() via GetCreditPoolsPager', async () => {
    const params = {
      billingUnitId: 'testString',
      date: 'testString',
      type: 'testString',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new EnterpriseBillingUnitsV1.GetCreditPoolsPager(enterpriseBillingUnitsService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new EnterpriseBillingUnitsV1.GetCreditPoolsPager(enterpriseBillingUnitsService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });
});
