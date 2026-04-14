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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.108.0-56772134-20251111-102802
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  AbortSignal,
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * **This API is currently in beta and subject to change.**
 *
 * API for managing notification distribution lists for IBM Cloud accounts.
 *
 * API Version: 1.0.0
 */

class PlatformNotificationsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://notifications.cloud.ibm.com/api';

  static DEFAULT_SERVICE_NAME: string = 'platform_notifications';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of PlatformNotificationsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {PlatformNotificationsV1}
   */

  public static newInstance(options: UserOptions): PlatformNotificationsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new PlatformNotificationsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a PlatformNotificationsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {PlatformNotificationsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(PlatformNotificationsV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * distributionLists
   ************************/

  /**
   * Get all destination entries.
   *
   * Retrieve all destinations in the distribution list for the specified account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The IBM Cloud account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.AddDestinationCollection>>}
   */
  public listDistributionListDestinations(
    params: PlatformNotificationsV1.ListDistributionListDestinationsParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.AddDestinationCollection>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listDistributionListDestinations'
    );

    const parameters = {
      options: {
        url: '/v1/distribution_lists/{account_id}/destinations',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add a destination entry.
   *
   * Add a destination entry to the distribution list. A maximum of 10 destination entries per destination type. In
   * terms of enterprise accounts, you can provide an Event Notifications destination that is from a different account
   * than the distribution list account, provided these two accounts are from the same enterprise and the user has
   * permission to manage the Event Notifications destinations on both accounts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The IBM Cloud account ID.
   * @param {AddDestinationPrototype} params.addDestinationPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.AddDestination>>}
   */
  public createDistributionListDestination(
    params: PlatformNotificationsV1.CreateDistributionListDestinationParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.AddDestination>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'addDestinationPrototype'];
    const _validParams = ['accountId', 'addDestinationPrototype', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.addDestinationPrototype;
    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createDistributionListDestination'
    );

    const parameters = {
      options: {
        url: '/v1/distribution_lists/{account_id}/destinations',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a destination entry.
   *
   * Retrieve a specific destination from the distribution list of the account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The IBM Cloud account ID.
   * @param {string} params.destinationId - The ID of the destination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.AddDestination>>}
   */
  public getDistributionListDestination(
    params: PlatformNotificationsV1.GetDistributionListDestinationParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.AddDestination>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'destinationId'];
    const _validParams = ['accountId', 'destinationId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getDistributionListDestination'
    );

    const parameters = {
      options: {
        url: '/v1/distribution_lists/{account_id}/destinations/{destination_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete destination entry.
   *
   * Remove a destination entry.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The IBM Cloud account ID.
   * @param {string} params.destinationId - The ID of the destination.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.EmptyObject>>}
   */
  public deleteDistributionListDestination(
    params: PlatformNotificationsV1.DeleteDistributionListDestinationParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'destinationId'];
    const _validParams = ['accountId', 'destinationId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteDistributionListDestination'
    );

    const parameters = {
      options: {
        url: '/v1/distribution_lists/{account_id}/destinations/{destination_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Test destination entry.
   *
   * Send a test notification to a destination in the distribution list. This allows you to verify that the destination
   * is properly configured and can receive notifications.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The IBM Cloud account ID.
   * @param {string} params.destinationId - The ID of the destination.
   * @param {TestDestinationRequestBodyPrototype} params.testDestinationRequestBodyPrototype -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.TestDestinationResponseBody>>}
   */
  public testDistributionListDestination(
    params: PlatformNotificationsV1.TestDistributionListDestinationParams
  ): Promise<
    PlatformNotificationsV1.Response<PlatformNotificationsV1.TestDestinationResponseBody>
  > {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'destinationId', 'testDestinationRequestBodyPrototype'];
    const _validParams = [
      'accountId',
      'destinationId',
      'testDestinationRequestBodyPrototype',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.testDestinationRequestBodyPrototype;
    const path = {
      'account_id': _params.accountId,
      'destination_id': _params.destinationId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'testDistributionListDestination'
    );

    const parameters = {
      options: {
        url: '/v1/distribution_lists/{account_id}/destinations/{destination_id}/test',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * userPreferences
   ************************/

  /**
   * Create communication preferences.
   *
   * Create communication preferences for the specified account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.iamId - The IAM ID of the user. Must match the IAM ID in the bearer token.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity1] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity2] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity3] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity4] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.maintenanceHigh] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.maintenanceMedium] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.maintenanceLow] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithoutUpdates} [params.announcementsMajor] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.announcementsMinor] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.securityNormal] - Preference settings for notification types that do
   * not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.accountNormal] - Preference settings for notification types that do
   * not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageOrder] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageInvoices] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsagePayments] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageSubscriptionsAndPromoCodes] - Preference settings for
   * notification types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageSpendingAlerts] - Preference settings for
   * notification types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.resourceactivityNormal] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingReview] - Preference settings for notification types that do
   * not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingApproved] - Preference settings for notification types that
   * do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingApprovedVsi] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingApprovedServer] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.provisioningReloadComplete] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.provisioningCompleteVsi] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.provisioningCompleteServer] - Preference settings for notification
   * types that do not support updates.
   * @param {string} [params.accountId] - The IBM Cloud account ID. If not provided, the account ID from the bearer
   * token will be used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.PreferencesObject>>}
   */
  public createPreferences(
    params: PlatformNotificationsV1.CreatePreferencesParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.PreferencesObject>> {
    const _params = { ...params };
    const _requiredParams = ['iamId'];
    const _validParams = [
      'iamId',
      'incidentSeverity1',
      'incidentSeverity2',
      'incidentSeverity3',
      'incidentSeverity4',
      'maintenanceHigh',
      'maintenanceMedium',
      'maintenanceLow',
      'announcementsMajor',
      'announcementsMinor',
      'securityNormal',
      'accountNormal',
      'billingAndUsageOrder',
      'billingAndUsageInvoices',
      'billingAndUsagePayments',
      'billingAndUsageSubscriptionsAndPromoCodes',
      'billingAndUsageSpendingAlerts',
      'resourceactivityNormal',
      'orderingReview',
      'orderingApproved',
      'orderingApprovedVsi',
      'orderingApprovedServer',
      'provisioningReloadComplete',
      'provisioningCompleteVsi',
      'provisioningCompleteServer',
      'accountId',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'incident_severity1': _params.incidentSeverity1,
      'incident_severity2': _params.incidentSeverity2,
      'incident_severity3': _params.incidentSeverity3,
      'incident_severity4': _params.incidentSeverity4,
      'maintenance_high': _params.maintenanceHigh,
      'maintenance_medium': _params.maintenanceMedium,
      'maintenance_low': _params.maintenanceLow,
      'announcements_major': _params.announcementsMajor,
      'announcements_minor': _params.announcementsMinor,
      'security_normal': _params.securityNormal,
      'account_normal': _params.accountNormal,
      'billing_and_usage_order': _params.billingAndUsageOrder,
      'billing_and_usage_invoices': _params.billingAndUsageInvoices,
      'billing_and_usage_payments': _params.billingAndUsagePayments,
      'billing_and_usage_subscriptions_and_promo_codes':
        _params.billingAndUsageSubscriptionsAndPromoCodes,
      'billing_and_usage_spending_alerts': _params.billingAndUsageSpendingAlerts,
      'resourceactivity_normal': _params.resourceactivityNormal,
      'ordering_review': _params.orderingReview,
      'ordering_approved': _params.orderingApproved,
      'ordering_approved_vsi': _params.orderingApprovedVsi,
      'ordering_approved_server': _params.orderingApprovedServer,
      'provisioning_reload_complete': _params.provisioningReloadComplete,
      'provisioning_complete_vsi': _params.provisioningCompleteVsi,
      'provisioning_complete_server': _params.provisioningCompleteServer,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createPreferences'
    );

    const parameters = {
      options: {
        url: '/v1/notifications/{iam_id}/preferences',
        method: 'POST',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get all communication preferences for a user in an account.
   *
   * Retrieve all communication preferences of a user in an account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.iamId - The IAM ID of the user. Must match the IAM ID in the bearer token.
   * @param {string} [params.accountId] - The IBM Cloud account ID. If not provided, the account ID from the bearer
   * token will be used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.PreferencesObject>>}
   */
  public getPreferences(
    params: PlatformNotificationsV1.GetPreferencesParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.PreferencesObject>> {
    const _params = { ...params };
    const _requiredParams = ['iamId'];
    const _validParams = ['iamId', 'accountId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPreferences'
    );

    const parameters = {
      options: {
        url: '/v1/notifications/{iam_id}/preferences',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update communication preferences.
   *
   * Update communication preferences for the specified account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.iamId - The IAM ID of the user. Must match the IAM ID in the bearer token.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity1] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity2] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity3] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.incidentSeverity4] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.maintenanceHigh] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.maintenanceMedium] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithUpdates} [params.maintenanceLow] - Preference settings for notification types that
   * support updates.
   * @param {PreferenceValueWithoutUpdates} [params.announcementsMajor] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.announcementsMinor] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.securityNormal] - Preference settings for notification types that do
   * not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.accountNormal] - Preference settings for notification types that do
   * not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageOrder] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageInvoices] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsagePayments] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageSubscriptionsAndPromoCodes] - Preference settings for
   * notification types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.billingAndUsageSpendingAlerts] - Preference settings for
   * notification types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.resourceactivityNormal] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingReview] - Preference settings for notification types that do
   * not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingApproved] - Preference settings for notification types that
   * do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingApprovedVsi] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.orderingApprovedServer] - Preference settings for notification types
   * that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.provisioningReloadComplete] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.provisioningCompleteVsi] - Preference settings for notification
   * types that do not support updates.
   * @param {PreferenceValueWithoutUpdates} [params.provisioningCompleteServer] - Preference settings for notification
   * types that do not support updates.
   * @param {string} [params.accountId] - The IBM Cloud account ID. If not provided, the account ID from the bearer
   * token will be used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.PreferencesObject>>}
   */
  public replaceNotificationPreferences(
    params: PlatformNotificationsV1.ReplaceNotificationPreferencesParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.PreferencesObject>> {
    const _params = { ...params };
    const _requiredParams = ['iamId'];
    const _validParams = [
      'iamId',
      'incidentSeverity1',
      'incidentSeverity2',
      'incidentSeverity3',
      'incidentSeverity4',
      'maintenanceHigh',
      'maintenanceMedium',
      'maintenanceLow',
      'announcementsMajor',
      'announcementsMinor',
      'securityNormal',
      'accountNormal',
      'billingAndUsageOrder',
      'billingAndUsageInvoices',
      'billingAndUsagePayments',
      'billingAndUsageSubscriptionsAndPromoCodes',
      'billingAndUsageSpendingAlerts',
      'resourceactivityNormal',
      'orderingReview',
      'orderingApproved',
      'orderingApprovedVsi',
      'orderingApprovedServer',
      'provisioningReloadComplete',
      'provisioningCompleteVsi',
      'provisioningCompleteServer',
      'accountId',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'incident_severity1': _params.incidentSeverity1,
      'incident_severity2': _params.incidentSeverity2,
      'incident_severity3': _params.incidentSeverity3,
      'incident_severity4': _params.incidentSeverity4,
      'maintenance_high': _params.maintenanceHigh,
      'maintenance_medium': _params.maintenanceMedium,
      'maintenance_low': _params.maintenanceLow,
      'announcements_major': _params.announcementsMajor,
      'announcements_minor': _params.announcementsMinor,
      'security_normal': _params.securityNormal,
      'account_normal': _params.accountNormal,
      'billing_and_usage_order': _params.billingAndUsageOrder,
      'billing_and_usage_invoices': _params.billingAndUsageInvoices,
      'billing_and_usage_payments': _params.billingAndUsagePayments,
      'billing_and_usage_subscriptions_and_promo_codes':
        _params.billingAndUsageSubscriptionsAndPromoCodes,
      'billing_and_usage_spending_alerts': _params.billingAndUsageSpendingAlerts,
      'resourceactivity_normal': _params.resourceactivityNormal,
      'ordering_review': _params.orderingReview,
      'ordering_approved': _params.orderingApproved,
      'ordering_approved_vsi': _params.orderingApprovedVsi,
      'ordering_approved_server': _params.orderingApprovedServer,
      'provisioning_reload_complete': _params.provisioningReloadComplete,
      'provisioning_complete_vsi': _params.provisioningCompleteVsi,
      'provisioning_complete_server': _params.provisioningCompleteServer,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceNotificationPreferences'
    );

    const parameters = {
      options: {
        url: '/v1/notifications/{iam_id}/preferences',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Resets all preferences to their default values.
   *
   * Delete all communication preferences for the specified account, and resets all preferences to their default values.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.iamId - The IAM ID of the user. Must match the IAM ID in the bearer token.
   * @param {string} [params.accountId] - The IBM Cloud account ID. If not provided, the account ID from the bearer
   * token will be used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.EmptyObject>>}
   */
  public deleteNotificationPreferences(
    params: PlatformNotificationsV1.DeleteNotificationPreferencesParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['iamId'];
    const _validParams = ['iamId', 'accountId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteNotificationPreferences'
    );

    const parameters = {
      options: {
        url: '/v1/notifications/{iam_id}/preferences',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * notifications
   ************************/

  /**
   * Get user notifications.
   *
   * Retrieve all notifications for the requested user.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - The IBM Cloud account ID. If not provided, the account ID from the bearer
   * token will be used.
   * @param {string} [params.start] - An opaque page token that specifies the resource to start the page on or after. If
   * unspecified, the first page of results is returned.
   * @param {number} [params.limit] - The maximum number of items to return per page. If unspecified, a default limit of
   * 50 is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.NotificationCollection>>}
   */
  public listNotifications(
    params?: PlatformNotificationsV1.ListNotificationsParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.NotificationCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'start', 'limit', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'start': _params.start,
      'limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listNotifications'
    );

    const parameters = {
      options: {
        url: '/v1/notifications',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get user's last acknowledged notification Id.
   *
   * Retrieve the ID of the last notification acknowledged by the user for a specific account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - The account ID to retrieve acknowledgment for.
   * @param {string} [params.lastProcessedId] - Client's last known notification ID for quick comparison.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.Acknowledgment>>}
   */
  public getAcknowledgment(
    params?: PlatformNotificationsV1.GetAcknowledgmentParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.Acknowledgment>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'lastProcessedId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'last_processed_id': _params.lastProcessedId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAcknowledgment'
    );

    const parameters = {
      options: {
        url: '/v1/notifications/acknowledgment',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update user's last acknowledged notification.
   *
   * Update the ID of the last notification acknowledged by the user for a specific account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.lastAcknowledgedId - The ID of a notification.
   * @param {string} [params.accountId] - The account ID to update acknowledgment for.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.Acknowledgment>>}
   */
  public replaceNotificationAcknowledgment(
    params: PlatformNotificationsV1.ReplaceNotificationAcknowledgmentParams
  ): Promise<PlatformNotificationsV1.Response<PlatformNotificationsV1.Acknowledgment>> {
    const _params = { ...params };
    const _requiredParams = ['lastAcknowledgedId'];
    const _validParams = ['lastAcknowledgedId', 'accountId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'last_acknowledged_id': _params.lastAcknowledgedId,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      PlatformNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceNotificationAcknowledgment'
    );

    const parameters = {
      options: {
        url: '/v1/notifications/acknowledgment',
        method: 'PUT',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace PlatformNotificationsV1 {
  /** An operation response. */
  export interface Response<T = any> {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface EmptyObject {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  interface DefaultParams {
    headers?: OutgoingHttpHeaders;
    signal?: AbortSignal;
  }

  /** Parameters for the `listDistributionListDestinations` operation. */
  export interface ListDistributionListDestinationsParams extends DefaultParams {
    /** The IBM Cloud account ID. */
    accountId: string;
  }

  /** Parameters for the `createDistributionListDestination` operation. */
  export interface CreateDistributionListDestinationParams extends DefaultParams {
    /** The IBM Cloud account ID. */
    accountId: string;
    addDestinationPrototype: AddDestinationPrototype;
  }

  /** Parameters for the `getDistributionListDestination` operation. */
  export interface GetDistributionListDestinationParams extends DefaultParams {
    /** The IBM Cloud account ID. */
    accountId: string;
    /** The ID of the destination. */
    destinationId: string;
  }

  /** Parameters for the `deleteDistributionListDestination` operation. */
  export interface DeleteDistributionListDestinationParams extends DefaultParams {
    /** The IBM Cloud account ID. */
    accountId: string;
    /** The ID of the destination. */
    destinationId: string;
  }

  /** Parameters for the `testDistributionListDestination` operation. */
  export interface TestDistributionListDestinationParams extends DefaultParams {
    /** The IBM Cloud account ID. */
    accountId: string;
    /** The ID of the destination. */
    destinationId: string;
    testDestinationRequestBodyPrototype: TestDestinationRequestBodyPrototype;
  }

  /** Parameters for the `createPreferences` operation. */
  export interface CreatePreferencesParams extends DefaultParams {
    /** The IAM ID of the user. Must match the IAM ID in the bearer token. */
    iamId: string;
    /** Preference settings for notification types that support updates. */
    incidentSeverity1?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incidentSeverity2?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incidentSeverity3?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incidentSeverity4?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenanceHigh?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenanceMedium?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenanceLow?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that do not support updates. */
    announcementsMajor?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    announcementsMinor?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    securityNormal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    accountNormal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageOrder?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageInvoices?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsagePayments?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageSubscriptionsAndPromoCodes?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageSpendingAlerts?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    resourceactivityNormal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingReview?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingApproved?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingApprovedVsi?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingApprovedServer?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioningReloadComplete?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioningCompleteVsi?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioningCompleteServer?: PreferenceValueWithoutUpdates;
    /** The IBM Cloud account ID. If not provided, the account ID from the bearer token will be used. */
    accountId?: string;
  }

  /** Parameters for the `getPreferences` operation. */
  export interface GetPreferencesParams extends DefaultParams {
    /** The IAM ID of the user. Must match the IAM ID in the bearer token. */
    iamId: string;
    /** The IBM Cloud account ID. If not provided, the account ID from the bearer token will be used. */
    accountId?: string;
  }

  /** Parameters for the `replaceNotificationPreferences` operation. */
  export interface ReplaceNotificationPreferencesParams extends DefaultParams {
    /** The IAM ID of the user. Must match the IAM ID in the bearer token. */
    iamId: string;
    /** Preference settings for notification types that support updates. */
    incidentSeverity1?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incidentSeverity2?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incidentSeverity3?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incidentSeverity4?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenanceHigh?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenanceMedium?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenanceLow?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that do not support updates. */
    announcementsMajor?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    announcementsMinor?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    securityNormal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    accountNormal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageOrder?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageInvoices?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsagePayments?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageSubscriptionsAndPromoCodes?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billingAndUsageSpendingAlerts?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    resourceactivityNormal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingReview?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingApproved?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingApprovedVsi?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    orderingApprovedServer?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioningReloadComplete?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioningCompleteVsi?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioningCompleteServer?: PreferenceValueWithoutUpdates;
    /** The IBM Cloud account ID. If not provided, the account ID from the bearer token will be used. */
    accountId?: string;
  }

  /** Parameters for the `deleteNotificationPreferences` operation. */
  export interface DeleteNotificationPreferencesParams extends DefaultParams {
    /** The IAM ID of the user. Must match the IAM ID in the bearer token. */
    iamId: string;
    /** The IBM Cloud account ID. If not provided, the account ID from the bearer token will be used. */
    accountId?: string;
  }

  /** Parameters for the `listNotifications` operation. */
  export interface ListNotificationsParams extends DefaultParams {
    /** The IBM Cloud account ID. If not provided, the account ID from the bearer token will be used. */
    accountId?: string;
    /** An opaque page token that specifies the resource to start the page on or after. If unspecified, the first
     *  page of results is returned.
     */
    start?: string;
    /** The maximum number of items to return per page. If unspecified, a default limit of 50 is used. */
    limit?: number;
  }

  /** Parameters for the `getAcknowledgment` operation. */
  export interface GetAcknowledgmentParams extends DefaultParams {
    /** The account ID to retrieve acknowledgment for. */
    accountId?: string;
    /** Client's last known notification ID for quick comparison. */
    lastProcessedId?: string;
  }

  /** Parameters for the `replaceNotificationAcknowledgment` operation. */
  export interface ReplaceNotificationAcknowledgmentParams extends DefaultParams {
    /** The ID of a notification, represented as a timestamp string. */
    lastAcknowledgedId: string;
    /** The account ID to update acknowledgment for. */
    accountId?: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Status indicating whether the user has unread notifications.
   */
  export interface Acknowledgment {
    /** Indicates whether the user has unread notifications. */
    has_unread: boolean;
    /** The ID of the most recent notification available to the user. */
    latest_notification_id: string;
    /** The ID of the last notification acknowledged by the user. */
    last_acknowledged_id: string;
  }

  /**
   * AddDestination.
   */
  export interface AddDestination {}

  /**
   * List of destinations in the distribution list.
   */
  export interface AddDestinationCollection {
    /** Array of destination entries. */
    destinations: AddDestination[];
  }

  /**
   * AddDestinationPrototype.
   */
  export interface AddDestinationPrototype {}

  /**
   * A notification entry.
   */
  export interface Notification {
    /** The title of the notification. */
    title: string;
    /** The body content of the notification. */
    body: string;
    /** The unique identifier for the notification. */
    id: string;
    /** The category of the notification. */
    category: Notification.Constants.Category | string;
    /** Array of component/service names affected by this notification. */
    component_names: string[];
    /** The start time of the notification in Unix timestamp (milliseconds). */
    start_time: number;
    /** Indicates if the notification is global. */
    is_global: boolean;
    /** The current state of the notification. */
    state: Notification.Constants.State | string;
    /** Array of region identifiers affected by this notification. */
    regions: string[];
    /** Array of CRN masks that define the scope of affected resources. */
    crn_masks: string[];
    /** The record identifier for tracking purposes. */
    record_id?: string;
    /** The source identifier of the notification. */
    source_id?: string;
    /** The completion code of the notification. */
    completion_code: Notification.Constants.CompletionCode | string;
    /** The end time of the notification in Unix timestamp (milliseconds). */
    end_time?: number;
    /** The last update time of the notification in Unix timestamp (milliseconds). */
    update_time: number;
    /** The severity level of the notification (0-3). The display value depends on the notification type:
     *
     *  **Incidents:**
     *  - 1 = Severity 1
     *  - 2 = Severity 2
     *  - 3 = Severity 3
     *  - 0 = Severity 4
     *
     *  **Maintenance:**
     *  - 1 = High
     *  - 2 = Medium
     *  - 3 = Low
     *
     *  **Announcements:**
     *  - 1 = Major
     *  - 0 = Minor.
     */
    severity: number;
    /** Lucene query string for filtering affected resources. Only present when instance targets are specified and
     *  resource_link is not available. Mutually exclusive with resource_link.
     */
    lucene_query?: string;
    /** Link to additional resource information or documentation. Takes precedence over lucene_query when both are
     *  available. Mutually exclusive with lucene_query.
     */
    resource_link?: string;
  }
  export namespace Notification {
    export namespace Constants {
      /** The category of the notification. */
      export enum Category {
        INCIDENT = 'incident',
        MAINTENANCE = 'maintenance',
        ANNOUNCEMENTS = 'announcements',
        SECURITY_BULLETINS = 'security_bulletins',
        SECURITY = 'security',
        RESOURCE = 'resource',
        BILLING_AND_USAGE = 'billing_and_usage',
        ORDERING = 'ordering',
        PROVISIONING = 'provisioning',
        ACCOUNT = 'account',
      }
      /** The current state of the notification. */
      export enum State {
        NEW = 'new',
        IN_PROGRESS = 'in-progress',
        COMPLETE = 'complete',
        RESOLVED = 'resolved',
      }
      /** The completion code of the notification. */
      export enum CompletionCode {
        SUCCESSFUL = 'successful',
        FAILED = 'failed',
        CANCELLED = 'cancelled',
      }
    }
  }

  /**
   * Collection of user notifications with token-based pagination metadata.
   */
  export interface NotificationCollection {
    /** The maximum number of items returned in this response. */
    limit: number;
    /** The total number of notifications in the collection. */
    total_count: number;
    /** A pagination link object containing the URL to a page. */
    first: PaginationLink;
    /** A pagination link object with a page token. Used for next, previous, and last page links. */
    previous?: PaginationLinkWithToken;
    /** A pagination link object with a page token. Used for next, previous, and last page links. */
    next?: PaginationLinkWithToken;
    /** A pagination link object with a page token. Used for next, previous, and last page links. */
    last?: PaginationLinkWithToken;
    /** Array of notification entries. */
    notifications: Notification[];
  }

  /**
   * A pagination link object containing the URL to a page.
   */
  export interface PaginationLink {
    /** Complete URL to the page. */
    href: string;
  }

  /**
   * A pagination link object with a page token. Used for next, previous, and last page links.
   */
  export interface PaginationLinkWithToken {
    /** Complete URL to the page. */
    href: string;
    /** Opaque page token that can be used to retrieve the page. */
    start: string;
  }

  /**
   * Preference settings for notification types that support updates.
   */
  export interface PreferenceValueWithUpdates {
    /** Array of communication channels for this preference. */
    channels: PreferenceValueWithUpdates.Constants.Channels[] | string[];
    /** Whether to receive updates for this preference. Optional, defaults to false if not provided. */
    updates?: boolean;
  }
  export namespace PreferenceValueWithUpdates {
    export namespace Constants {
      /** Array of communication channels for this preference. */
      export enum Channels {
        EMAIL = 'email',
      }
    }
  }

  /**
   * Preference settings for notification types that do not support updates.
   */
  export interface PreferenceValueWithoutUpdates {
    /** Array of communication channels for this preference. */
    channels: PreferenceValueWithoutUpdates.Constants.Channels[] | string[];
  }
  export namespace PreferenceValueWithoutUpdates {
    export namespace Constants {
      /** Array of communication channels for this preference. */
      export enum Channels {
        EMAIL = 'email',
      }
    }
  }

  /**
   * User communication preferences object. Only include preferences where communication is desired; absence of a key
   * means no communication for that preference type.
   */
  export interface PreferencesObject {
    /** Preference settings for notification types that support updates. */
    incident_severity1?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incident_severity2?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incident_severity3?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    incident_severity4?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenance_high?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenance_medium?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that support updates. */
    maintenance_low?: PreferenceValueWithUpdates;
    /** Preference settings for notification types that do not support updates. */
    announcements_major?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    announcements_minor?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    security_normal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    account_normal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billing_and_usage_order?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billing_and_usage_invoices?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billing_and_usage_payments?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billing_and_usage_subscriptions_and_promo_codes?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    billing_and_usage_spending_alerts?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    resourceactivity_normal?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    ordering_review?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    ordering_approved?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    ordering_approved_vsi?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    ordering_approved_server?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioning_reload_complete?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioning_complete_vsi?: PreferenceValueWithoutUpdates;
    /** Preference settings for notification types that do not support updates. */
    provisioning_complete_server?: PreferenceValueWithoutUpdates;
  }

  /**
   * TestDestinationRequestBodyPrototype.
   */
  export interface TestDestinationRequestBodyPrototype {}

  /**
   * Response from the test notification endpoint.
   */
  export interface TestDestinationResponseBody {
    /** The status message that indicates the test result. */
    message: string;
  }

  /**
   * Prototype for creating an Event Notifications destination entry.
   */
  export interface AddDestinationPrototypeEventNotificationDestinationPrototype
    extends AddDestinationPrototype {
    /** The GUID of the Event Notifications instance. */
    destination_id: string;
    /** The type of the destination. */
    destination_type:
      | AddDestinationPrototypeEventNotificationDestinationPrototype.Constants.DestinationType
      | string;
  }
  export namespace AddDestinationPrototypeEventNotificationDestinationPrototype {
    export namespace Constants {
      /** The type of the destination. */
      export enum DestinationType {
        EVENT_NOTIFICATIONS = 'event_notifications',
      }
    }
  }

  /**
   * An Event Notifications destination entry in the distribution list.
   */
  export interface AddDestinationEventNotificationDestination extends AddDestination {
    /** The GUID of the Event Notifications instance. */
    destination_id: string;
    /** The type of the destination. */
    destination_type: AddDestinationEventNotificationDestination.Constants.DestinationType | string;
  }
  export namespace AddDestinationEventNotificationDestination {
    export namespace Constants {
      /** The type of the destination. */
      export enum DestinationType {
        EVENT_NOTIFICATIONS = 'event_notifications',
      }
    }
  }

  /**
   * Request body for testing an Event Notifications destination.
   */
  export interface TestDestinationRequestBodyPrototypeTestEventNotificationDestinationRequestBodyPrototype
    extends TestDestinationRequestBodyPrototype {
    /** The type of the destination. */
    destination_type:
      | TestDestinationRequestBodyPrototypeTestEventNotificationDestinationRequestBodyPrototype.Constants.DestinationType
      | string;
    /** The type of the notification to test. */
    notification_type:
      | TestDestinationRequestBodyPrototypeTestEventNotificationDestinationRequestBodyPrototype.Constants.NotificationType
      | string;
  }
  export namespace TestDestinationRequestBodyPrototypeTestEventNotificationDestinationRequestBodyPrototype {
    export namespace Constants {
      /** The type of the destination. */
      export enum DestinationType {
        EVENT_NOTIFICATIONS = 'event_notifications',
      }
      /** The type of the notification to test. */
      export enum NotificationType {
        INCIDENT = 'incident',
        ANNOUNCEMENTS = 'announcements',
        MAINTENANCE = 'maintenance',
        SECURITY_BULLETINS = 'security_bulletins',
        RESOURCE = 'resource',
        BILLING_AND_USAGE = 'billing_and_usage',
      }
    }
  }

  /*************************
   * pager classes
   ************************/

  /**
   * NotificationsPager can be used to simplify the use of listNotifications().
   */
  export class NotificationsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: PlatformNotificationsV1;

    protected params: PlatformNotificationsV1.ListNotificationsParams;

    /**
     * Construct a NotificationsPager object.
     *
     * @param {PlatformNotificationsV1}  client - The service client instance used to invoke listNotifications()
     * @param {Object} [params] - The parameters to be passed to listNotifications()
     * @constructor
     * @returns {NotificationsPager}
     */
    constructor(
      client: PlatformNotificationsV1,
      params?: PlatformNotificationsV1.ListNotificationsParams
    ) {
      if (params && params.start) {
        throw new Error(`the params.start field should not be set`);
      }

      this._hasNext = true;
      this.pageContext = { next: undefined };
      this.client = client;
      this.params = JSON.parse(JSON.stringify(params || {}));
    }

    /**
     * Returns true if there are potentially more results to be retrieved by invoking getNext().
     * @returns {boolean}
     */
    public hasNext(): boolean {
      return this._hasNext;
    }

    /**
     * Returns the next page of results by invoking listNotifications().
     * @returns {Promise<PlatformNotificationsV1.Notification[]>}
     */
    public async getNext(): Promise<PlatformNotificationsV1.Notification[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listNotifications(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.notifications;
    }

    /**
     * Returns all results by invoking listNotifications() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<PlatformNotificationsV1.Notification[]>}
     */
    public async getAll(): Promise<PlatformNotificationsV1.Notification[]> {
      const results: Notification[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = PlatformNotificationsV1;
