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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const PartnerBillingUnitsV1 = require('../../dist/partner-billing-units/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'partner_billing_units_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('PartnerBillingUnitsV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let partnerBillingUnitsService;
  let partnerId;
  let customerId;
  let resellerId;
  let billingMonth;

  test('Initialize service', async () => {
    partnerBillingUnitsService = PartnerBillingUnitsV1.newInstance();

    expect(partnerBillingUnitsService).not.toBeNull();

    const config = readExternalSources(PartnerBillingUnitsV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    partnerId = config.partnerId;
    customerId = config.customerId;
    resellerId = config.resellerId;
    billingMonth = config.billingMonth;
    expect(partnerId).not.toBeNull();
    expect(customerId).not.toBeNull();
    expect(resellerId).not.toBeNull();
    expect(billingMonth).not.toBeNull();

    partnerBillingUnitsService.enableRetries();
  });

  test('getBillingOptions() - Get customers billing options of a partner', async () => {
    const params = {
      partnerId,
      date: billingMonth,
      limit: 30,
    };

    const res = await partnerBillingUnitsService.getBillingOptions(params);
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

    const res = await partnerBillingUnitsService.getBillingOptions(params);
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

    const res = await partnerBillingUnitsService.getBillingOptions(params);
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

    const res = await partnerBillingUnitsService.getCreditPoolsReport(params);
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

    const res = await partnerBillingUnitsService.getCreditPoolsReport(params);
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

    const res = await partnerBillingUnitsService.getCreditPoolsReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
