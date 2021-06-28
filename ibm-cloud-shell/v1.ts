/**
 * (C) Copyright IBM Corp. 2021.
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
 * IBM OpenAPI SDK Code Generator Version: 3.33.0-caf29bd0-20210603-225214
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  getMissingParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * API docs for IBM Cloud Shell repository
 */

class IbmCloudShellV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://api.shell.test.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'ibm_cloud_shell';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of IbmCloudShellV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {IbmCloudShellV1}
   */

  public static newInstance(options: UserOptions): IbmCloudShellV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new IbmCloudShellV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a IbmCloudShellV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {IbmCloudShellV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(IbmCloudShellV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * accountSettings
   ************************/

  /**
   * Get account settings.
   *
   * Retrieve account settings for the given account ID. Call this method to get details about a particular account
   * setting, whether Cloud Shell is enabled, the list of enabled regions and the list of enabled features. Users need
   * to be an account owner or users need to be assigned an IAM policy with the Administrator role for the Cloud Shell
   * account management service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID in which the account settings belong to.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudShellV1.Response<IbmCloudShellV1.AccountSettings>>}
   */
  public getAccountSettingsById(
    params: IbmCloudShellV1.GetAccountSettingsByIdParams
  ): Promise<IbmCloudShellV1.Response<IbmCloudShellV1.AccountSettings>> {
    const _params = { ...params };
    const requiredParams = ['accountId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      IbmCloudShellV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAccountSettingsById'
    );

    const parameters = {
      options: {
        url: '/api/v1/user/accounts/{account_id}/settings',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update account settings.
   *
   * Update account settings for the given account ID. Call this method to update account settings configuration, you
   * can enable or disable Cloud Shell, enable or disable available regions and enable and disable features. To update
   * account settings, users need to be an account owner or users need to be assigned an IAM policy with the
   * Administrator role for the Cloud Shell account management service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID in which the account settings belong to.
   * @param {string} [params.newId] - Unique id of the settings object.
   * @param {string} [params.newRev] - Unique revision number for the settings object.
   * @param {string} [params.newAccountId] - The id of the account the settings belong to.
   * @param {number} [params.newCreatedAt] - Creation timestamp.
   * @param {string} [params.newCreatedBy] - IAM ID of creator.
   * @param {boolean} [params.newDefaultEnableNewFeatures] - You can choose which Cloud Shell features are available in
   * the account and whether any new features are enabled as they become available. The feature settings apply only to
   * the enabled Cloud Shell locations.
   * @param {boolean} [params.newDefaultEnableNewRegions] - Set whether Cloud Shell is enabled in a specific location
   * for the account. The location determines where user and session data are stored. By default, users are routed to
   * the nearest available location.
   * @param {boolean} [params.newEnabled] - When enabled, Cloud Shell is available to all users in the account.
   * @param {Feature[]} [params.newFeatures] - List of Cloud Shell features.
   * @param {RegionSetting[]} [params.newRegions] - List of Cloud Shell region settings.
   * @param {string} [params.newType] - Type of api response object.
   * @param {number} [params.newUpdatedAt] - Timestamp of last update.
   * @param {string} [params.newUpdatedBy] - IAM ID of last updater.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IbmCloudShellV1.Response<IbmCloudShellV1.AccountSettings>>}
   */
  public updateAccountSettingsById(
    params: IbmCloudShellV1.UpdateAccountSettingsByIdParams
  ): Promise<IbmCloudShellV1.Response<IbmCloudShellV1.AccountSettings>> {
    const _params = { ...params };
    const requiredParams = ['accountId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      '_id': _params.newId,
      '_rev': _params.newRev,
      'account_id': _params.newAccountId,
      'created_at': _params.newCreatedAt,
      'created_by': _params.newCreatedBy,
      'default_enable_new_features': _params.newDefaultEnableNewFeatures,
      'default_enable_new_regions': _params.newDefaultEnableNewRegions,
      'enabled': _params.newEnabled,
      'features': _params.newFeatures,
      'regions': _params.newRegions,
      'type': _params.newType,
      'updated_at': _params.newUpdatedAt,
      'updated_by': _params.newUpdatedBy,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      IbmCloudShellV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateAccountSettingsById'
    );

    const parameters = {
      options: {
        url: '/api/v1/user/accounts/{account_id}/settings',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

/*************************
 * interfaces
 ************************/

namespace IbmCloudShellV1 {
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
  export interface Empty {}

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `getAccountSettingsById` operation. */
  export interface GetAccountSettingsByIdParams {
    /** The account ID in which the account settings belong to. */
    accountId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccountSettingsById` operation. */
  export interface UpdateAccountSettingsByIdParams {
    /** The account ID in which the account settings belong to. */
    accountId: string;
    /** Unique id of the settings object. */
    newId?: string;
    /** Unique revision number for the settings object. */
    newRev?: string;
    /** The id of the account the settings belong to. */
    newAccountId?: string;
    /** Creation timestamp. */
    newCreatedAt?: number;
    /** IAM ID of creator. */
    newCreatedBy?: string;
    /** You can choose which Cloud Shell features are available in the account and whether any new features are
     *  enabled as they become available. The feature settings apply only to the enabled Cloud Shell locations.
     */
    newDefaultEnableNewFeatures?: boolean;
    /** Set whether Cloud Shell is enabled in a specific location for the account. The location determines where
     *  user and session data are stored. By default, users are routed to the nearest available location.
     */
    newDefaultEnableNewRegions?: boolean;
    /** When enabled, Cloud Shell is available to all users in the account. */
    newEnabled?: boolean;
    /** List of Cloud Shell features. */
    newFeatures?: Feature[];
    /** List of Cloud Shell region settings. */
    newRegions?: RegionSetting[];
    /** Type of api response object. */
    newType?: string;
    /** Timestamp of last update. */
    newUpdatedAt?: number;
    /** IAM ID of last updater. */
    newUpdatedBy?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Definition of Cloud Shell account settings. */
  export interface AccountSettings {
    /** Unique id of the settings object. */
    _id?: string;
    /** Unique revision number for the settings object. */
    _rev?: string;
    /** The id of the account the settings belong to. */
    account_id?: string;
    /** Creation timestamp. */
    created_at?: number;
    /** IAM ID of creator. */
    created_by?: string;
    /** You can choose which Cloud Shell features are available in the account and whether any new features are
     *  enabled as they become available. The feature settings apply only to the enabled Cloud Shell locations.
     */
    default_enable_new_features?: boolean;
    /** Set whether Cloud Shell is enabled in a specific location for the account. The location determines where
     *  user and session data are stored. By default, users are routed to the nearest available location.
     */
    default_enable_new_regions?: boolean;
    /** When enabled, Cloud Shell is available to all users in the account. */
    enabled?: boolean;
    /** List of Cloud Shell features. */
    features?: Feature[];
    /** List of Cloud Shell region settings. */
    regions?: RegionSetting[];
    /** Type of api response object. */
    type?: string;
    /** Timestamp of last update. */
    updated_at?: number;
    /** IAM ID of last updater. */
    updated_by?: string;
  }

  /** Describes a Cloud Shell feature. */
  export interface Feature {
    /** State of the feature. */
    enabled?: boolean;
    /** Name of the feature. */
    key?: string;
  }

  /** Describes a Cloud Shell region setting. */
  export interface RegionSetting {
    /** State of the region. */
    enabled?: boolean;
    /** Name of the region. */
    key?: string;
  }
}

export = IbmCloudShellV1;
