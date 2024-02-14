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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.85.0-75c38f8f-20240206-210220
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Billing units for IBM Cloud partners
 *
 * API Version: 1.0.0
 */

class PartnerBillingUnitsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://partner.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'partner_billing_units';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of PartnerBillingUnitsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {PartnerBillingUnitsV1}
   */

  public static newInstance(options: UserOptions): PartnerBillingUnitsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new PartnerBillingUnitsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a PartnerBillingUnitsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {PartnerBillingUnitsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(PartnerBillingUnitsV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * billingOptions
   ************************/

  /**
   * Get customers billing options.
   *
   * Returns the billing options for the requested customer for a given month.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.partnerId - Enterprise ID of the distributor or reseller for which the report is requested.
   * @param {string} [params.customerId] - Enterprise ID of the customer for which the report is requested.
   * @param {string} [params.resellerId] - Enterprise ID of the reseller for which the report is requested.
   * @param {string} [params.date] - The billing month for which the usage report is requested. Format is yyyy-mm.
   * Defaults to current month.
   * @param {number} [params.limit] - Number of usage records returned. The default value is 30. Maximum value is 200.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PartnerBillingUnitsV1.Response<PartnerBillingUnitsV1.BillingOptionsSummary>>}
   */
  public getBillingOptions(
    params: PartnerBillingUnitsV1.GetBillingOptionsParams
  ): Promise<PartnerBillingUnitsV1.Response<PartnerBillingUnitsV1.BillingOptionsSummary>> {
    const _params = { ...params };
    const _requiredParams = ['partnerId'];
    const _validParams = ['partnerId', 'customerId', 'resellerId', 'date', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'partner_id': _params.partnerId,
      'customer_id': _params.customerId,
      'reseller_id': _params.resellerId,
      'date': _params.date,
      '_limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(
      PartnerBillingUnitsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getBillingOptions'
    );

    const parameters = {
      options: {
        url: '/v1/billing-options',
        method: 'GET',
        qs: query,
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
  /*************************
   * creditPools
   ************************/

  /**
   * Get subscription burn-down report.
   *
   * Returns the subscription or commitment burn-down reports for the end customers for a given month.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.partnerId - Enterprise ID of the distributor or reseller for which the report is requested.
   * @param {string} [params.customerId] - Enterprise ID of the customer for which the report is requested.
   * @param {string} [params.resellerId] - Enterprise ID of the reseller for which the report is requested.
   * @param {string} [params.date] - The billing month for which the usage report is requested. Format is yyyy-mm.
   * Defaults to current month.
   * @param {number} [params.limit] - Number of usage records returned. The default value is 30. Maximum value is 200.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PartnerBillingUnitsV1.Response<PartnerBillingUnitsV1.CreditPoolsReportSummary>>}
   */
  public getCreditPoolsReport(
    params: PartnerBillingUnitsV1.GetCreditPoolsReportParams
  ): Promise<PartnerBillingUnitsV1.Response<PartnerBillingUnitsV1.CreditPoolsReportSummary>> {
    const _params = { ...params };
    const _requiredParams = ['partnerId'];
    const _validParams = ['partnerId', 'customerId', 'resellerId', 'date', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'partner_id': _params.partnerId,
      'customer_id': _params.customerId,
      'reseller_id': _params.resellerId,
      'date': _params.date,
      '_limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(
      PartnerBillingUnitsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getCreditPoolsReport'
    );

    const parameters = {
      options: {
        url: '/v1/credit-pools',
        method: 'GET',
        qs: query,
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
}

/*************************
 * interfaces
 ************************/

namespace PartnerBillingUnitsV1 {
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

  /** Parameters for the `getBillingOptions` operation. */
  export interface GetBillingOptionsParams {
    /** Enterprise ID of the distributor or reseller for which the report is requested. */
    partnerId: string;
    /** Enterprise ID of the customer for which the report is requested. */
    customerId?: string;
    /** Enterprise ID of the reseller for which the report is requested. */
    resellerId?: string;
    /** The billing month for which the usage report is requested. Format is yyyy-mm. Defaults to current month. */
    date?: string;
    /** Number of usage records returned. The default value is 30. Maximum value is 200. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCreditPoolsReport` operation. */
  export interface GetCreditPoolsReportParams {
    /** Enterprise ID of the distributor or reseller for which the report is requested. */
    partnerId: string;
    /** Enterprise ID of the customer for which the report is requested. */
    customerId?: string;
    /** Enterprise ID of the reseller for which the report is requested. */
    resellerId?: string;
    /** The billing month for which the usage report is requested. Format is yyyy-mm. Defaults to current month. */
    date?: string;
    /** Number of usage records returned. The default value is 30. Maximum value is 200. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The link to the first page of the search query. */
  export interface BillingOptionsSummaryFirst {
    /** A link to a page of query results. */
    href?: string;
  }

  /** The link to the next page of the search query. */
  export interface BillingOptionsSummaryNext {
    /** A link to a page of query results. */
    href?: string;
    /** The value of the `_start` query parameter to fetch the next page. */
    offset?: string;
  }

  /** Billing options report for the end customers. */
  export interface BillingOption {
    /** The ID of the billing option. */
    id?: string;
    /** The ID of the billing unit that's associated with the billing option. */
    billing_unit_id?: string;
    /** Account ID of the customer. */
    customer_id?: string;
    /** The customer type. The valid values are `ENTERPRISE`, `ACCOUNT`, and `ACCOUNT_GROUP`. */
    customer_type?: BillingOption.Constants.CustomerType | string;
    /** A user-defined name for the customer. */
    customer_name?: string;
    /** ID of the reseller in the heirarchy of the requested customer. */
    reseller_id?: string;
    /** Name of the reseller in the heirarchy of the requested customer. */
    reseller_name?: string;
    /** The billing month for which the burn-down report is requested. Format is yyyy-mm. Defaults to current month. */
    month?: string;
    /** Errors in the billing. */
    errors?: JsonObject[];
    /** The type of billing option. The valid values are `SUBSCRIPTION` and `OFFER`. */
    type?: BillingOption.Constants.Type | string;
    /** The start date of billing option. */
    start_date?: string;
    /** The end date of billing option. */
    end_date?: string;
    /** The state of the billing option. The valid values include `ACTIVE, `SUSPENDED`, and `CANCELED`. */
    state?: BillingOption.Constants.State | string;
    /** The category of the billing option. The valid values are `PLATFORM`, `SERVICE`, and `SUPPORT`. */
    category?: BillingOption.Constants.Category | string;
    /** The payment method for support. */
    payment_instrument?: JsonObject;
    /** Part number of the offering. */
    part_number?: string;
    /** ID of the catalog containing this offering. */
    catalog_id?: string;
    /** ID of the order containing this offering. */
    order_id?: string;
    /** PO Number of the offering. */
    po_number?: string;
    /** Subscription model. */
    subscription_model?: string;
    /** The duration of the billing options in months. */
    duration_in_months?: number;
    /** Amount billed monthly for this offering. */
    monthly_amount?: number;
    /** The support billing system. */
    billing_system?: JsonObject;
    /** The country code for the billing unit. */
    country_code?: string;
    /** The currency code of the billing unit. */
    currency_code?: string;
  }
  export namespace BillingOption {
    export namespace Constants {
      /** The customer type. The valid values are `ENTERPRISE`, `ACCOUNT`, and `ACCOUNT_GROUP`. */
      export enum CustomerType {
        ENTERPRISE = 'ENTERPRISE',
        ACCOUNT = 'ACCOUNT',
        ACCOUNT_GROUP = 'ACCOUNT_GROUP',
      }
      /** The type of billing option. The valid values are `SUBSCRIPTION` and `OFFER`. */
      export enum Type {
        SUBSCRIPTION = 'SUBSCRIPTION',
        OFFER = 'OFFER',
      }
      /** The state of the billing option. The valid values include `ACTIVE, `SUSPENDED`, and `CANCELED`. */
      export enum State {
        ACTIVE = 'ACTIVE',
        SUSPENDED = 'SUSPENDED',
        CANCELED = 'CANCELED',
      }
      /** The category of the billing option. The valid values are `PLATFORM`, `SERVICE`, and `SUPPORT`. */
      export enum Category {
        PLATFORM = 'PLATFORM',
        SERVICE = 'SERVICE',
        SUPPORT = 'SUPPORT',
      }
    }
  }

  /** The billing options report for the customer. */
  export interface BillingOptionsSummary {
    /** The max number of reports in the response. */
    limit?: number;
    /** The link to the first page of the search query. */
    first?: BillingOptionsSummaryFirst;
    /** The link to the next page of the search query. */
    next?: BillingOptionsSummaryNext;
    /** Aggregated usage report of all requested partners. */
    resources?: BillingOption[];
  }

  /** The link to the first page of the search query. */
  export interface CreditPoolsReportSummaryFirst {
    /** A link to a page of query results. */
    href?: string;
  }

  /** The link to the next page of the search query. */
  export interface CreditPoolsReportSummaryNext {
    /** A link to a page of query results. */
    href?: string;
    /** The value of the `_start` query parameter to fetch the next page. */
    offset?: string;
  }

  /** Aggregated subscription burn-down report for the end customers. */
  export interface CreditPoolsReport {
    /** The category of the billing option. The valid values are `PLATFORM`, `SERVICE` and `SUPPORT`. */
    type?: CreditPoolsReport.Constants.Type | string;
    /** The ID of the billing unit that's associated with the billing option. */
    billing_unit_id?: string;
    /** Account ID of the customer. */
    customer_id?: string;
    /** The customer type. The valid values are `ENTERPRISE`, `ACCOUNT`, and `ACCOUNT_GROUP`. */
    customer_type?: CreditPoolsReport.Constants.CustomerType | string;
    /** A user-defined name for the customer. */
    customer_name?: string;
    /** ID of the reseller in the heirarchy of the requested customer. */
    reseller_id?: string;
    /** Name of the reseller in the heirarchy of the requested customer. */
    reseller_name?: string;
    /** The billing month for which the burn-down report is requested. Format is yyyy-mm. Defaults to current month. */
    month?: string;
    /** The currency code of the billing unit. */
    currency_code?: string;
    /** A list of active subscription terms available within a credit. */
    term_credits?: TermCredits[];
    /** Overage that was generated on the credit pool. */
    overage?: Overage;
  }
  export namespace CreditPoolsReport {
    export namespace Constants {
      /** The category of the billing option. The valid values are `PLATFORM`, `SERVICE` and `SUPPORT`. */
      export enum Type {
        PLATFORM = 'PLATFORM',
        SERVICE = 'SERVICE',
        SUPPORT = 'SUPPORT',
      }
      /** The customer type. The valid values are `ENTERPRISE`, `ACCOUNT`, and `ACCOUNT_GROUP`. */
      export enum CustomerType {
        ENTERPRISE = 'ENTERPRISE',
        ACCOUNT = 'ACCOUNT',
        ACCOUNT_GROUP = 'ACCOUNT_GROUP',
      }
    }
  }

  /** The aggregated credit pools report. */
  export interface CreditPoolsReportSummary {
    /** The max number of reports in the response. */
    limit?: number;
    /** The link to the first page of the search query. */
    first?: CreditPoolsReportSummaryFirst;
    /** The link to the next page of the search query. */
    next?: CreditPoolsReportSummaryNext;
    /** Aggregated usage report of all requested partners. */
    resources?: CreditPoolsReport[];
  }

  /** Overage that was generated on the credit pool. */
  export interface Overage {
    /** The number of credits used as overage. */
    cost?: number;
    /** A list of resources that generated overage. */
    resources?: JsonObject[];
  }

  /** The subscription term that is active in the requested month. */
  export interface TermCredits {
    /** The ID of the billing option from which the subscription term is derived. */
    billing_option_id?: string;
    /** Billing option model. */
    billing_option_model?: string;
    /** The category of the billing option. The valid values are `PLATFORM`, `SERVICE`, and `SUPPORT`. */
    category?: TermCredits.Constants.Category | string;
    /** The start date of the term in ISO format. */
    start_date?: string;
    /** The end date of the term in ISO format. */
    end_date?: string;
    /** The total credit available in this term. */
    total_credits?: number;
    /** The balance of available credit at the start of the current month. */
    starting_balance?: number;
    /** The amount of credit used during the current month. */
    used_credits?: number;
    /** The balance of remaining credit in the subscription term. */
    current_balance?: number;
    /** A list of resources that used credit during the month. */
    resources?: JsonObject[];
  }
  export namespace TermCredits {
    export namespace Constants {
      /** The category of the billing option. The valid values are `PLATFORM`, `SERVICE`, and `SUPPORT`. */
      export enum Category {
        PLATFORM = 'PLATFORM',
        SERVICE = 'SERVICE',
        SUPPORT = 'SUPPORT',
      }
    }
  }
}

export = PartnerBillingUnitsV1;
