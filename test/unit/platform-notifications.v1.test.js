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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const PlatformNotificationsV1 = require('../../dist/platform-notifications/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const platformNotificationsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://notifications.cloud.ibm.com/api',
};

const platformNotificationsService = new PlatformNotificationsV1(
  platformNotificationsServiceOptions
);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(platformNotificationsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('PlatformNotificationsV1', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = PlatformNotificationsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(
        PlatformNotificationsV1.DEFAULT_SERVICE_NAME
      );
      expect(testInstance.baseOptions.serviceUrl).toBe(PlatformNotificationsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(PlatformNotificationsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = PlatformNotificationsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(PlatformNotificationsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new PlatformNotificationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new PlatformNotificationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(PlatformNotificationsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('listDistributionListDestinations', () => {
    describe('positive tests', () => {
      function __listDistributionListDestinationsTest() {
        // Construct the params object for operation listDistributionListDestinations
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const listDistributionListDestinationsParams = {
          accountId,
        };

        const listDistributionListDestinationsResult =
          platformNotificationsService.listDistributionListDestinations(
            listDistributionListDestinationsParams
          );

        // all methods should return a Promise
        expectToBePromise(listDistributionListDestinationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/distribution_lists/{account_id}/destinations',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDistributionListDestinationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __listDistributionListDestinationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __listDistributionListDestinationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDistributionListDestinationsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.listDistributionListDestinations(
          listDistributionListDestinationsParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.listDistributionListDestinations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.listDistributionListDestinations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDistributionListDestination', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AddDestinationPrototypeEventNotificationDestinationPrototype
      const addDestinationPrototypeModel = {
        destination_id: '12345678-1234-1234-1234-123456789012',
        destination_type: 'event_notifications',
      };

      function __createDistributionListDestinationTest() {
        // Construct the params object for operation createDistributionListDestination
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const addDestinationPrototype = addDestinationPrototypeModel;
        const createDistributionListDestinationParams = {
          accountId,
          addDestinationPrototype,
        };

        const createDistributionListDestinationResult =
          platformNotificationsService.createDistributionListDestination(
            createDistributionListDestinationParams
          );

        // all methods should return a Promise
        expectToBePromise(createDistributionListDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/distribution_lists/{account_id}/destinations',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(addDestinationPrototype);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDistributionListDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __createDistributionListDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __createDistributionListDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const addDestinationPrototype = addDestinationPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDistributionListDestinationParams = {
          accountId,
          addDestinationPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.createDistributionListDestination(
          createDistributionListDestinationParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.createDistributionListDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.createDistributionListDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getDistributionListDestination', () => {
    describe('positive tests', () => {
      function __getDistributionListDestinationTest() {
        // Construct the params object for operation getDistributionListDestination
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const destinationId = '12345678-1234-1234-1234-123456789012';
        const getDistributionListDestinationParams = {
          accountId,
          destinationId,
        };

        const getDistributionListDestinationResult =
          platformNotificationsService.getDistributionListDestination(
            getDistributionListDestinationParams
          );

        // all methods should return a Promise
        expectToBePromise(getDistributionListDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/distribution_lists/{account_id}/destinations/{destination_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDistributionListDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __getDistributionListDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __getDistributionListDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const destinationId = '12345678-1234-1234-1234-123456789012';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDistributionListDestinationParams = {
          accountId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.getDistributionListDestination(
          getDistributionListDestinationParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.getDistributionListDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.getDistributionListDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDistributionListDestination', () => {
    describe('positive tests', () => {
      function __deleteDistributionListDestinationTest() {
        // Construct the params object for operation deleteDistributionListDestination
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const destinationId = '12345678-1234-1234-1234-123456789012';
        const deleteDistributionListDestinationParams = {
          accountId,
          destinationId,
        };

        const deleteDistributionListDestinationResult =
          platformNotificationsService.deleteDistributionListDestination(
            deleteDistributionListDestinationParams
          );

        // all methods should return a Promise
        expectToBePromise(deleteDistributionListDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/distribution_lists/{account_id}/destinations/{destination_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDistributionListDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __deleteDistributionListDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __deleteDistributionListDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const destinationId = '12345678-1234-1234-1234-123456789012';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDistributionListDestinationParams = {
          accountId,
          destinationId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.deleteDistributionListDestination(
          deleteDistributionListDestinationParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.deleteDistributionListDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.deleteDistributionListDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('testDistributionListDestination', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TestDestinationRequestBodyPrototypeTestEventNotificationDestinationRequestBodyPrototype
      const testDestinationRequestBodyPrototypeModel = {
        destination_type: 'event_notifications',
        notification_type: 'incident',
      };

      function __testDistributionListDestinationTest() {
        // Construct the params object for operation testDistributionListDestination
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const destinationId = '12345678-1234-1234-1234-123456789012';
        const testDestinationRequestBodyPrototype = testDestinationRequestBodyPrototypeModel;
        const testDistributionListDestinationParams = {
          accountId,
          destinationId,
          testDestinationRequestBodyPrototype,
        };

        const testDistributionListDestinationResult =
          platformNotificationsService.testDistributionListDestination(
            testDistributionListDestinationParams
          );

        // all methods should return a Promise
        expectToBePromise(testDistributionListDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/distribution_lists/{account_id}/destinations/{destination_id}/test',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(testDestinationRequestBodyPrototype);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.destination_id).toEqual(destinationId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __testDistributionListDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __testDistributionListDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __testDistributionListDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const destinationId = '12345678-1234-1234-1234-123456789012';
        const testDestinationRequestBodyPrototype = testDestinationRequestBodyPrototypeModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const testDistributionListDestinationParams = {
          accountId,
          destinationId,
          testDestinationRequestBodyPrototype,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.testDistributionListDestination(
          testDistributionListDestinationParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.testDistributionListDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.testDistributionListDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createPreferences', () => {
    describe('positive tests', () => {
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

      function __createPreferencesTest() {
        // Construct the params object for operation createPreferences
        const iamId = 'IBMid-1234567890';
        const incidentSeverity1 = preferenceValueWithUpdatesModel;
        const incidentSeverity2 = preferenceValueWithUpdatesModel;
        const incidentSeverity3 = preferenceValueWithUpdatesModel;
        const incidentSeverity4 = preferenceValueWithUpdatesModel;
        const maintenanceHigh = preferenceValueWithUpdatesModel;
        const maintenanceMedium = preferenceValueWithUpdatesModel;
        const maintenanceLow = preferenceValueWithUpdatesModel;
        const announcementsMajor = preferenceValueWithoutUpdatesModel;
        const announcementsMinor = preferenceValueWithoutUpdatesModel;
        const securityNormal = preferenceValueWithoutUpdatesModel;
        const accountNormal = preferenceValueWithoutUpdatesModel;
        const billingAndUsageOrder = preferenceValueWithoutUpdatesModel;
        const billingAndUsageInvoices = preferenceValueWithoutUpdatesModel;
        const billingAndUsagePayments = preferenceValueWithoutUpdatesModel;
        const billingAndUsageSubscriptionsAndPromoCodes = preferenceValueWithoutUpdatesModel;
        const billingAndUsageSpendingAlerts = preferenceValueWithoutUpdatesModel;
        const resourceactivityNormal = preferenceValueWithoutUpdatesModel;
        const orderingReview = preferenceValueWithoutUpdatesModel;
        const orderingApproved = preferenceValueWithoutUpdatesModel;
        const orderingApprovedVsi = preferenceValueWithoutUpdatesModel;
        const orderingApprovedServer = preferenceValueWithoutUpdatesModel;
        const provisioningReloadComplete = preferenceValueWithoutUpdatesModel;
        const provisioningCompleteVsi = preferenceValueWithoutUpdatesModel;
        const provisioningCompleteServer = preferenceValueWithoutUpdatesModel;
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const createPreferencesParams = {
          iamId,
          incidentSeverity1,
          incidentSeverity2,
          incidentSeverity3,
          incidentSeverity4,
          maintenanceHigh,
          maintenanceMedium,
          maintenanceLow,
          announcementsMajor,
          announcementsMinor,
          securityNormal,
          accountNormal,
          billingAndUsageOrder,
          billingAndUsageInvoices,
          billingAndUsagePayments,
          billingAndUsageSubscriptionsAndPromoCodes,
          billingAndUsageSpendingAlerts,
          resourceactivityNormal,
          orderingReview,
          orderingApproved,
          orderingApprovedVsi,
          orderingApprovedServer,
          provisioningReloadComplete,
          provisioningCompleteVsi,
          provisioningCompleteServer,
          accountId,
        };

        const createPreferencesResult =
          platformNotificationsService.createPreferences(createPreferencesParams);

        // all methods should return a Promise
        expectToBePromise(createPreferencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/notifications/{iam_id}/preferences', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.incident_severity1).toEqual(incidentSeverity1);
        expect(mockRequestOptions.body.incident_severity2).toEqual(incidentSeverity2);
        expect(mockRequestOptions.body.incident_severity3).toEqual(incidentSeverity3);
        expect(mockRequestOptions.body.incident_severity4).toEqual(incidentSeverity4);
        expect(mockRequestOptions.body.maintenance_high).toEqual(maintenanceHigh);
        expect(mockRequestOptions.body.maintenance_medium).toEqual(maintenanceMedium);
        expect(mockRequestOptions.body.maintenance_low).toEqual(maintenanceLow);
        expect(mockRequestOptions.body.announcements_major).toEqual(announcementsMajor);
        expect(mockRequestOptions.body.announcements_minor).toEqual(announcementsMinor);
        expect(mockRequestOptions.body.security_normal).toEqual(securityNormal);
        expect(mockRequestOptions.body.account_normal).toEqual(accountNormal);
        expect(mockRequestOptions.body.billing_and_usage_order).toEqual(billingAndUsageOrder);
        expect(mockRequestOptions.body.billing_and_usage_invoices).toEqual(billingAndUsageInvoices);
        expect(mockRequestOptions.body.billing_and_usage_payments).toEqual(billingAndUsagePayments);
        expect(mockRequestOptions.body.billing_and_usage_subscriptions_and_promo_codes).toEqual(
          billingAndUsageSubscriptionsAndPromoCodes
        );
        expect(mockRequestOptions.body.billing_and_usage_spending_alerts).toEqual(
          billingAndUsageSpendingAlerts
        );
        expect(mockRequestOptions.body.resourceactivity_normal).toEqual(resourceactivityNormal);
        expect(mockRequestOptions.body.ordering_review).toEqual(orderingReview);
        expect(mockRequestOptions.body.ordering_approved).toEqual(orderingApproved);
        expect(mockRequestOptions.body.ordering_approved_vsi).toEqual(orderingApprovedVsi);
        expect(mockRequestOptions.body.ordering_approved_server).toEqual(orderingApprovedServer);
        expect(mockRequestOptions.body.provisioning_reload_complete).toEqual(
          provisioningReloadComplete
        );
        expect(mockRequestOptions.body.provisioning_complete_vsi).toEqual(provisioningCompleteVsi);
        expect(mockRequestOptions.body.provisioning_complete_server).toEqual(
          provisioningCompleteServer
        );
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createPreferencesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __createPreferencesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __createPreferencesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const iamId = 'IBMid-1234567890';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createPreferencesParams = {
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.createPreferences(createPreferencesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.createPreferences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.createPreferences();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPreferences', () => {
    describe('positive tests', () => {
      function __getPreferencesTest() {
        // Construct the params object for operation getPreferences
        const iamId = 'IBMid-1234567890';
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const getPreferencesParams = {
          iamId,
          accountId,
        };

        const getPreferencesResult =
          platformNotificationsService.getPreferences(getPreferencesParams);

        // all methods should return a Promise
        expectToBePromise(getPreferencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/notifications/{iam_id}/preferences', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPreferencesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __getPreferencesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __getPreferencesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const iamId = 'IBMid-1234567890';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPreferencesParams = {
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.getPreferences(getPreferencesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.getPreferences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.getPreferences();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceNotificationPreferences', () => {
    describe('positive tests', () => {
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

      function __replaceNotificationPreferencesTest() {
        // Construct the params object for operation replaceNotificationPreferences
        const iamId = 'IBMid-1234567890';
        const incidentSeverity1 = preferenceValueWithUpdatesModel;
        const incidentSeverity2 = preferenceValueWithUpdatesModel;
        const incidentSeverity3 = preferenceValueWithUpdatesModel;
        const incidentSeverity4 = preferenceValueWithUpdatesModel;
        const maintenanceHigh = preferenceValueWithUpdatesModel;
        const maintenanceMedium = preferenceValueWithUpdatesModel;
        const maintenanceLow = preferenceValueWithUpdatesModel;
        const announcementsMajor = preferenceValueWithoutUpdatesModel;
        const announcementsMinor = preferenceValueWithoutUpdatesModel;
        const securityNormal = preferenceValueWithoutUpdatesModel;
        const accountNormal = preferenceValueWithoutUpdatesModel;
        const billingAndUsageOrder = preferenceValueWithoutUpdatesModel;
        const billingAndUsageInvoices = preferenceValueWithoutUpdatesModel;
        const billingAndUsagePayments = preferenceValueWithoutUpdatesModel;
        const billingAndUsageSubscriptionsAndPromoCodes = preferenceValueWithoutUpdatesModel;
        const billingAndUsageSpendingAlerts = preferenceValueWithoutUpdatesModel;
        const resourceactivityNormal = preferenceValueWithoutUpdatesModel;
        const orderingReview = preferenceValueWithoutUpdatesModel;
        const orderingApproved = preferenceValueWithoutUpdatesModel;
        const orderingApprovedVsi = preferenceValueWithoutUpdatesModel;
        const orderingApprovedServer = preferenceValueWithoutUpdatesModel;
        const provisioningReloadComplete = preferenceValueWithoutUpdatesModel;
        const provisioningCompleteVsi = preferenceValueWithoutUpdatesModel;
        const provisioningCompleteServer = preferenceValueWithoutUpdatesModel;
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const replaceNotificationPreferencesParams = {
          iamId,
          incidentSeverity1,
          incidentSeverity2,
          incidentSeverity3,
          incidentSeverity4,
          maintenanceHigh,
          maintenanceMedium,
          maintenanceLow,
          announcementsMajor,
          announcementsMinor,
          securityNormal,
          accountNormal,
          billingAndUsageOrder,
          billingAndUsageInvoices,
          billingAndUsagePayments,
          billingAndUsageSubscriptionsAndPromoCodes,
          billingAndUsageSpendingAlerts,
          resourceactivityNormal,
          orderingReview,
          orderingApproved,
          orderingApprovedVsi,
          orderingApprovedServer,
          provisioningReloadComplete,
          provisioningCompleteVsi,
          provisioningCompleteServer,
          accountId,
        };

        const replaceNotificationPreferencesResult =
          platformNotificationsService.replaceNotificationPreferences(
            replaceNotificationPreferencesParams
          );

        // all methods should return a Promise
        expectToBePromise(replaceNotificationPreferencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/notifications/{iam_id}/preferences', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.incident_severity1).toEqual(incidentSeverity1);
        expect(mockRequestOptions.body.incident_severity2).toEqual(incidentSeverity2);
        expect(mockRequestOptions.body.incident_severity3).toEqual(incidentSeverity3);
        expect(mockRequestOptions.body.incident_severity4).toEqual(incidentSeverity4);
        expect(mockRequestOptions.body.maintenance_high).toEqual(maintenanceHigh);
        expect(mockRequestOptions.body.maintenance_medium).toEqual(maintenanceMedium);
        expect(mockRequestOptions.body.maintenance_low).toEqual(maintenanceLow);
        expect(mockRequestOptions.body.announcements_major).toEqual(announcementsMajor);
        expect(mockRequestOptions.body.announcements_minor).toEqual(announcementsMinor);
        expect(mockRequestOptions.body.security_normal).toEqual(securityNormal);
        expect(mockRequestOptions.body.account_normal).toEqual(accountNormal);
        expect(mockRequestOptions.body.billing_and_usage_order).toEqual(billingAndUsageOrder);
        expect(mockRequestOptions.body.billing_and_usage_invoices).toEqual(billingAndUsageInvoices);
        expect(mockRequestOptions.body.billing_and_usage_payments).toEqual(billingAndUsagePayments);
        expect(mockRequestOptions.body.billing_and_usage_subscriptions_and_promo_codes).toEqual(
          billingAndUsageSubscriptionsAndPromoCodes
        );
        expect(mockRequestOptions.body.billing_and_usage_spending_alerts).toEqual(
          billingAndUsageSpendingAlerts
        );
        expect(mockRequestOptions.body.resourceactivity_normal).toEqual(resourceactivityNormal);
        expect(mockRequestOptions.body.ordering_review).toEqual(orderingReview);
        expect(mockRequestOptions.body.ordering_approved).toEqual(orderingApproved);
        expect(mockRequestOptions.body.ordering_approved_vsi).toEqual(orderingApprovedVsi);
        expect(mockRequestOptions.body.ordering_approved_server).toEqual(orderingApprovedServer);
        expect(mockRequestOptions.body.provisioning_reload_complete).toEqual(
          provisioningReloadComplete
        );
        expect(mockRequestOptions.body.provisioning_complete_vsi).toEqual(provisioningCompleteVsi);
        expect(mockRequestOptions.body.provisioning_complete_server).toEqual(
          provisioningCompleteServer
        );
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceNotificationPreferencesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __replaceNotificationPreferencesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __replaceNotificationPreferencesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const iamId = 'IBMid-1234567890';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceNotificationPreferencesParams = {
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.replaceNotificationPreferences(
          replaceNotificationPreferencesParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.replaceNotificationPreferences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.replaceNotificationPreferences();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteNotificationPreferences', () => {
    describe('positive tests', () => {
      function __deleteNotificationPreferencesTest() {
        // Construct the params object for operation deleteNotificationPreferences
        const iamId = 'IBMid-1234567890';
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const deleteNotificationPreferencesParams = {
          iamId,
          accountId,
        };

        const deleteNotificationPreferencesResult =
          platformNotificationsService.deleteNotificationPreferences(
            deleteNotificationPreferencesParams
          );

        // all methods should return a Promise
        expectToBePromise(deleteNotificationPreferencesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/notifications/{iam_id}/preferences', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteNotificationPreferencesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __deleteNotificationPreferencesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __deleteNotificationPreferencesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const iamId = 'IBMid-1234567890';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteNotificationPreferencesParams = {
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.deleteNotificationPreferences(
          deleteNotificationPreferencesParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.deleteNotificationPreferences({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.deleteNotificationPreferences();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listNotifications', () => {
    describe('positive tests', () => {
      function __listNotificationsTest() {
        // Construct the params object for operation listNotifications
        const accountId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
        const start = '3fe78a36b9aa7f26';
        const limit = 50;
        const listNotificationsParams = {
          accountId,
          start,
          limit,
        };

        const listNotificationsResult =
          platformNotificationsService.listNotifications(listNotificationsParams);

        // all methods should return a Promise
        expectToBePromise(listNotificationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/notifications', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listNotificationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __listNotificationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __listNotificationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listNotificationsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.listNotifications(listNotificationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        platformNotificationsService.listNotifications({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('NotificationsPager tests', () => {
      const serviceUrl = platformNotificationsServiceOptions.url;
      const path = '/v1/notifications';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"notifications":[{"title":"System Maintenance Scheduled","body":"Scheduled maintenance will occur on March 15th from 10:00 AM to 11:00 AM UTC.","id":"12345","category":"maintenance","component_names":["component_names"],"start_time":1771791490,"is_global":false,"state":"new","regions":["regions"],"crn_masks":["crn_masks"],"record_id":"rec-67890","source_id":"src-11111","completion_code":"successful","end_time":1771791490,"update_time":1771791490,"severity":2,"lucene_query":"region:us-south AND service_name:event-notifications","resource_link":"https://cloud.ibm.com/status/incident/12345"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"notifications":[{"title":"System Maintenance Scheduled","body":"Scheduled maintenance will occur on March 15th from 10:00 AM to 11:00 AM UTC.","id":"12345","category":"maintenance","component_names":["component_names"],"start_time":1771791490,"is_global":false,"state":"new","regions":["regions"],"crn_masks":["crn_masks"],"record_id":"rec-67890","source_id":"src-11111","completion_code":"successful","end_time":1771791490,"update_time":1771791490,"severity":2,"lucene_query":"region:us-south AND service_name:event-notifications","resource_link":"https://cloud.ibm.com/status/incident/12345"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
          limit: 50,
        };
        const allResults = [];
        const pager = new PlatformNotificationsV1.NotificationsPager(
          platformNotificationsService,
          params
        );
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          accountId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
          limit: 50,
        };
        const pager = new PlatformNotificationsV1.NotificationsPager(
          platformNotificationsService,
          params
        );
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getAcknowledgment', () => {
    describe('positive tests', () => {
      function __getAcknowledgmentTest() {
        // Construct the params object for operation getAcknowledgment
        const accountId = '1369339417d906e5620b8d861d40cfd7';
        const lastProcessedId = '1678901234000';
        const getAcknowledgmentParams = {
          accountId,
          lastProcessedId,
        };

        const getAcknowledgmentResult =
          platformNotificationsService.getAcknowledgment(getAcknowledgmentParams);

        // all methods should return a Promise
        expectToBePromise(getAcknowledgmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/notifications/acknowledgment', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.last_processed_id).toEqual(lastProcessedId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAcknowledgmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __getAcknowledgmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __getAcknowledgmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAcknowledgmentParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.getAcknowledgment(getAcknowledgmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        platformNotificationsService.getAcknowledgment({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('replaceNotificationAcknowledgment', () => {
    describe('positive tests', () => {
      function __replaceNotificationAcknowledgmentTest() {
        // Construct the params object for operation replaceNotificationAcknowledgment
        const lastAcknowledgedId = '1772804159452';
        const accountId = '1369339417d906e5620b8d861d40cfd7';
        const replaceNotificationAcknowledgmentParams = {
          lastAcknowledgedId,
          accountId,
        };

        const replaceNotificationAcknowledgmentResult =
          platformNotificationsService.replaceNotificationAcknowledgment(
            replaceNotificationAcknowledgmentParams
          );

        // all methods should return a Promise
        expectToBePromise(replaceNotificationAcknowledgmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/notifications/acknowledgment', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.last_acknowledged_id).toEqual(lastAcknowledgedId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceNotificationAcknowledgmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.enableRetries();
        __replaceNotificationAcknowledgmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        platformNotificationsService.disableRetries();
        __replaceNotificationAcknowledgmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const lastAcknowledgedId = '1772804159452';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceNotificationAcknowledgmentParams = {
          lastAcknowledgedId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        platformNotificationsService.replaceNotificationAcknowledgment(
          replaceNotificationAcknowledgmentParams
        );
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await platformNotificationsService.replaceNotificationAcknowledgment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await platformNotificationsService.replaceNotificationAcknowledgment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
