/**
 * @jest-environment node
 */
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

const PlatformNotificationsV1 = require('../dist/platform-notifications/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Platform Notifications service.
//
// The following configuration properties are assumed to be defined:
// PLATFORM_NOTIFICATIONS_URL=<service base url>
// PLATFORM_NOTIFICATIONS_AUTH_TYPE=iam
// PLATFORM_NOTIFICATIONS_APIKEY=<IAM apikey>
// PLATFORM_NOTIFICATIONS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'platform_notifications_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('PlatformNotificationsV1', () => {
  // Service instance
  let platformNotificationsService;

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(PlatformNotificationsV1.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    platformNotificationsService = PlatformNotificationsV1.newInstance();

    // end-common
  });

  test('listDistributionListDestinations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDistributionListDestinations() result:');
    // begin-list_distribution_list_destinations

    const params = {
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    };

    let res;
    try {
      res = await platformNotificationsService.listDistributionListDestinations(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_distribution_list_destinations
  });

  test('createDistributionListDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDistributionListDestination() result:');
    // begin-create_distribution_list_destination

    // Request models needed by this operation.

    // AddDestinationPrototypeEventNotificationDestinationPrototype
    const addDestinationPrototypeModel = {
      destination_id: '12345678-1234-1234-1234-123456789012',
      destination_type: 'event_notifications',
    };

    const params = {
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      addDestinationPrototype: addDestinationPrototypeModel,
    };

    let res;
    try {
      res = await platformNotificationsService.createDistributionListDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_distribution_list_destination
  });

  test('getDistributionListDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDistributionListDestination() result:');
    // begin-get_distribution_list_destination

    const params = {
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      destinationId: '12345678-1234-1234-1234-123456789012',
    };

    let res;
    try {
      res = await platformNotificationsService.getDistributionListDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_distribution_list_destination
  });

  test('testDistributionListDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('testDistributionListDestination() result:');
    // begin-test_distribution_list_destination

    // Request models needed by this operation.

    // TestDestinationRequestBodyPrototypeTestEventNotificationDestinationRequestBodyPrototype
    const testDestinationRequestBodyPrototypeModel = {
      destination_type: 'event_notifications',
      notification_type: 'incident',
    };

    const params = {
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      destinationId: '12345678-1234-1234-1234-123456789012',
      testDestinationRequestBodyPrototype: testDestinationRequestBodyPrototypeModel,
    };

    let res;
    try {
      res = await platformNotificationsService.testDistributionListDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-test_distribution_list_destination
  });

  test('createPreferences request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createPreferences() result:');
    // begin-create_preferences

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
      iamId: 'IBMid-1234567890',
      incidentSeverity1: preferenceValueWithUpdatesModel,
      orderingReview: preferenceValueWithoutUpdatesModel,
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    };

    let res;
    try {
      res = await platformNotificationsService.createPreferences(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_preferences
  });

  test('getPreferences request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPreferences() result:');
    // begin-get_preferences

    const params = {
      iamId: 'IBMid-1234567890',
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    };

    let res;
    try {
      res = await platformNotificationsService.getPreferences(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_preferences
  });

  test('replaceNotificationPreferences request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceNotificationPreferences() result:');
    // begin-replace_notification_preferences

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
      iamId: 'IBMid-1234567890',
      incidentSeverity1: preferenceValueWithUpdatesModel,
      orderingReview: preferenceValueWithoutUpdatesModel,
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    };

    let res;
    try {
      res = await platformNotificationsService.replaceNotificationPreferences(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_notification_preferences
  });

  test('listNotifications request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listNotifications() result:');
    // begin-list_notifications

    const params = {
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      limit: 50,
    };

    const allResults = [];
    try {
      const pager = new PlatformNotificationsV1.NotificationsPager(platformNotificationsService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_notifications
  });

  test('getAcknowledgment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAcknowledgment() result:');
    // begin-get_acknowledgment

    const params = {
      accountId: '1369339417d906e5620b8d861d40cfd7',
      lastProcessedId: '1678901234000',
    };

    let res;
    try {
      res = await platformNotificationsService.getAcknowledgment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_acknowledgment
  });

  test('replaceNotificationAcknowledgment request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceNotificationAcknowledgment() result:');
    // begin-replace_notification_acknowledgment

    const params = {
      lastAcknowledgedId: '1772804159452',
      accountId: '1369339417d906e5620b8d861d40cfd7',
    };

    let res;
    try {
      res = await platformNotificationsService.replaceNotificationAcknowledgment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_notification_acknowledgment
  });

  test('deleteDistributionListDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_distribution_list_destination

    const params = {
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      destinationId: '12345678-1234-1234-1234-123456789012',
    };

    try {
      await platformNotificationsService.deleteDistributionListDestination(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_distribution_list_destination
  });

  test('deleteNotificationPreferences request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_notification_preferences

    const params = {
      iamId: 'IBMid-1234567890',
      accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    };

    try {
      await platformNotificationsService.deleteNotificationPreferences(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_notification_preferences
  });
});
