/**
 * (C) Copyright IBM Corp. 2026.
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
const PlatformNotificationsV1 = require('../../dist/platform-notifications/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
/**
 * required variables in platform_notifications_v1.env
 * PLATFORM_NOTIFICATIONS_URL
 * PLATFORM_NOTIFICATIONS_AUTH_TYPE
 * PLATFORM_NOTIFICATIONS_AUTH_URL
 * PLATFORM_NOTIFICATIONS_APIKEY
 * PLATFORM_NOTIFICATIONS_ACCOUNT_ID
 * PLATFORM_NOTIFICATIONS_DESTINATION_ID
 * PLATFORM_NOTIFICATIONS_IAM_ID
 */
const configFile = 'platform_notifications_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('PlatformNotificationsV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let platformNotificationsService;
  let accountId;
  let destinationId;
  let iamId;

  beforeAll(() => {
    const config = readExternalSources(PlatformNotificationsV1.DEFAULT_SERVICE_NAME);

    platformNotificationsService = PlatformNotificationsV1.newInstance({
      serviceUrl: config.serviceUrl,
    });
    accountId = config.accountId;
    destinationId = config.destinationId;
    iamId = config.iamId;
    platformNotificationsService.enableRetries();
  });

  test('Initialize service', async () => {
    expect(platformNotificationsService).not.toBeNull();
  });

  test('testDistributionListDestination()', async () => {
    // Request models needed by this operation.

    // TestDestinationRequestBodyPrototypeTestEventNotificationDestinationRequestBodyPrototype
    const testDestinationRequestBodyPrototypeModel = {
      destination_type: 'event_notifications',
      notification_type: 'incident',
    };

    const params = {
      accountId,
      destinationId,
      testDestinationRequestBodyPrototype: testDestinationRequestBodyPrototypeModel,
    };

    const res = await platformNotificationsService.testDistributionListDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteDistributionListDestination()', async () => {
    const params = {
      accountId,
      destinationId,
    };

    const res = await platformNotificationsService.deleteDistributionListDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('createDistributionListDestination()', async () => {
    // Request models needed by this operation.

    // AddDestinationPrototypeEventNotificationDestinationPrototype
    const addDestinationPrototypeModel = {
      destination_id: destinationId,
      destination_type: 'event_notifications',
    };

    const params = {
      accountId,
      addDestinationPrototype: addDestinationPrototypeModel,
    };

    const res = await platformNotificationsService.createDistributionListDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listDistributionListDestinations()', async () => {
    const params = {
      accountId,
    };

    const res = await platformNotificationsService.listDistributionListDestinations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getDistributionListDestination()', async () => {
    const params = {
      accountId,
      destinationId,
    };

    const res = await platformNotificationsService.getDistributionListDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createPreferences()', async () => {
    // Request models needed by this operation.

    // PreferenceValueWithUpdates
    const preferenceValueWithUpdatesModel = {
      channels: ['email'],
      updates: true,
    };

    // PreferenceValueWithoutUpdates
    const preferenceValueWithoutUpdatesModel = {
      channels: ['email'],
    };

    const params = {
      iamId,
      incidentSeverity1: preferenceValueWithUpdatesModel,
      incidentSeverity2: preferenceValueWithUpdatesModel,
      incidentSeverity3: preferenceValueWithUpdatesModel,
      incidentSeverity4: preferenceValueWithUpdatesModel,
      maintenanceHigh: preferenceValueWithUpdatesModel,
      maintenanceMedium: preferenceValueWithUpdatesModel,
      maintenanceLow: preferenceValueWithUpdatesModel,
      announcementsMajor: preferenceValueWithoutUpdatesModel,
      announcementsMinor: preferenceValueWithoutUpdatesModel,
      securityNormal: preferenceValueWithoutUpdatesModel,
      accountNormal: preferenceValueWithoutUpdatesModel,
      billingAndUsageOrder: preferenceValueWithoutUpdatesModel,
      billingAndUsageInvoices: preferenceValueWithoutUpdatesModel,
      billingAndUsagePayments: preferenceValueWithoutUpdatesModel,
      billingAndUsageSubscriptionsAndPromoCodes: preferenceValueWithoutUpdatesModel,
      billingAndUsageSpendingAlerts: preferenceValueWithoutUpdatesModel,
      resourceactivityNormal: preferenceValueWithoutUpdatesModel,
      orderingReview: preferenceValueWithoutUpdatesModel,
      orderingApproved: preferenceValueWithoutUpdatesModel,
      orderingApprovedVsi: preferenceValueWithoutUpdatesModel,
      orderingApprovedServer: preferenceValueWithoutUpdatesModel,
      provisioningReloadComplete: preferenceValueWithoutUpdatesModel,
      provisioningCompleteVsi: preferenceValueWithoutUpdatesModel,
      provisioningCompleteServer: preferenceValueWithoutUpdatesModel,
      accountId,
    };

    const res = await platformNotificationsService.createPreferences(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getPreferences()', async () => {
    const params = {
      iamId,
      accountId,
    };

    const res = await platformNotificationsService.getPreferences(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceNotificationPreferences()', async () => {
    // Request models needed by this operation.

    // PreferenceValueWithUpdates
    const preferenceValueWithUpdatesModel = {
      channels: ['email'],
      updates: true,
    };

    // PreferenceValueWithoutUpdates
    const preferenceValueWithoutUpdatesModel = {
      channels: ['email'],
    };

    const params = {
      iamId,
      incidentSeverity1: preferenceValueWithUpdatesModel,
      incidentSeverity2: preferenceValueWithUpdatesModel,
      incidentSeverity3: preferenceValueWithUpdatesModel,
      incidentSeverity4: preferenceValueWithUpdatesModel,
      maintenanceHigh: preferenceValueWithUpdatesModel,
      maintenanceMedium: preferenceValueWithUpdatesModel,
      maintenanceLow: preferenceValueWithUpdatesModel,
      announcementsMajor: preferenceValueWithoutUpdatesModel,
      announcementsMinor: preferenceValueWithoutUpdatesModel,
      securityNormal: preferenceValueWithoutUpdatesModel,
      accountNormal: preferenceValueWithoutUpdatesModel,
      billingAndUsageOrder: preferenceValueWithoutUpdatesModel,
      billingAndUsageInvoices: preferenceValueWithoutUpdatesModel,
      billingAndUsagePayments: preferenceValueWithoutUpdatesModel,
      billingAndUsageSubscriptionsAndPromoCodes: preferenceValueWithoutUpdatesModel,
      billingAndUsageSpendingAlerts: preferenceValueWithoutUpdatesModel,
      resourceactivityNormal: preferenceValueWithoutUpdatesModel,
      orderingReview: preferenceValueWithoutUpdatesModel,
      orderingApproved: preferenceValueWithoutUpdatesModel,
      orderingApprovedVsi: preferenceValueWithoutUpdatesModel,
      orderingApprovedServer: preferenceValueWithoutUpdatesModel,
      provisioningReloadComplete: preferenceValueWithoutUpdatesModel,
      provisioningCompleteVsi: preferenceValueWithoutUpdatesModel,
      provisioningCompleteServer: preferenceValueWithoutUpdatesModel,
      accountId,
    };

    const res = await platformNotificationsService.replaceNotificationPreferences(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listNotifications()', async () => {
    const params = {
      accountId,
    };

    const res = await platformNotificationsService.listNotifications(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listNotifications() via NotificationsPager', async () => {
    const params = {
      accountId,
      limit: 50,
    };

    const allResults = [];

    // Test getNext().
    let pager = new PlatformNotificationsV1.NotificationsPager(
      platformNotificationsService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new PlatformNotificationsV1.NotificationsPager(platformNotificationsService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('deleteNotificationPreferences()', async () => {
    const params = {
      iamId,
      accountId,
    };

    const res = await platformNotificationsService.deleteNotificationPreferences(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
