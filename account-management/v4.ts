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
 * IBM OpenAPI SDK Code Generator Version: 3.111.0-1bfb72c2-20260206-185521
 */

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
 * The Account Management API allows for the management of Account
 *
 * API Version: 4.0.0
 */

class AccountManagementV4 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://accounts.test.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'account_management';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of AccountManagementV4 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {AccountManagementV4}
   */

  public static newInstance(options: UserOptions): AccountManagementV4 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new AccountManagementV4(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a AccountManagementV4 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {AccountManagementV4}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(AccountManagementV4.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * default
   ************************/

  /**
   * Get Account by Account ID.
   *
   * Returns the details of an account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The unique identifier of the account you want to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<AccountManagementV4.Response<AccountManagementV4.AccountResponse>>}
   */
  public getAccount(
    params: AccountManagementV4.GetAccountParams
  ): Promise<AccountManagementV4.Response<AccountManagementV4.AccountResponse>> {
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

    const sdkHeaders = getSdkHeaders(AccountManagementV4.DEFAULT_SERVICE_NAME, 'v4', 'getAccount');

    const parameters = {
      options: {
        url: '/v4/accounts/{account_id}',
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
}

/*************************
 * interfaces
 ************************/

namespace AccountManagementV4 {
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

  /** Parameters for the `getAccount` operation. */
  export interface GetAccountParams extends DefaultParams {
    /** The unique identifier of the account you want to retrieve. */
    accountId: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * AccountResponseTraits.
   */
  export interface AccountResponseTraits {
    eu_supported: boolean;
    poc: boolean;
    hippa: boolean;
  }

  /**
   * AccountResponse.
   */
  export interface AccountResponse {
    name: string;
    id: string;
    owner: string;
    owner_userid: string;
    owner_iamid: string;
    type: string;
    status: string;
    linked_softlayer_account: string;
    team_directory_enabled: boolean;
    traits: AccountResponseTraits;
  }
}

export = AccountManagementV4;
