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
 * IBM OpenAPI SDK Code Generator Version: 3.87.0-91c7c775-20240320-213027
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

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
 * The Partner Management APIs enable you to manage the IBM Cloud partner entities and fetch multiple reports in
 * different formats.
 *
 * API Version: 1.0.0
 */

class PartnerManagementV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://partner.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'partner_management';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of PartnerManagementV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {PartnerManagementV1}
   */

  public static newInstance(options: UserOptions): PartnerManagementV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new PartnerManagementV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a PartnerManagementV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {PartnerManagementV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(PartnerManagementV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * usageReports
   ************************/

  /**
   * Get partner resource usage report.
   *
   * Returns the summary for the partner for a given month. Partner billing managers are authorized to access this
   * report.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.partnerId - Enterprise ID of the distributor or reseller for which the report is requested.
   * @param {string} [params.resellerId] - Enterprise ID of the reseller for which the report is requested. This
   * parameter cannot be used along with `customer_id` query parameter.
   * @param {string} [params.customerId] - Account ID/Enterprise ID of the end customer for which the report is
   * requested. This parameter cannot be used along with `reseller_id` query parameter.
   * @param {boolean} [params.children] - Get report rolled-up to the direct children of the requested entity. Defaults
   * to false. This parameter cannot be used along with `customer_id` query parameter.
   * @param {string} [params.month] - The billing month for which the usage report is requested. Format is `yyyy-mm`.
   * Defaults to current month.
   * @param {string} [params.viewpoint] - Enables partner to view the cost of provisioned services as applicable at the
   * given level. Defaults to the type of the calling partner. The valid values are `DISTRIBUTOR`, `RESELLER` and
   * `END_CUSTOMER`.
   * @param {boolean} [params.recurse] - Get usage report rolled-up to the end customers of the requesting partner.
   * Defaults to false. This parameter cannot be used along with `reseller_id` query parameter or `customer_id` query
   * parameter.
   * @param {number} [params.limit] - Number of usage records to be returned. The default value is 30. Maximum value is
   * 100.
   * @param {string} [params.offset] - An opaque value representing the offset of the first item to be returned by a
   * search query. If not specified, then the first page of results is returned. To retrieve the next page of search
   * results, use the 'offset' query parameter value within the 'next.href' URL found within a prior search query
   * response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PartnerManagementV1.Response<PartnerManagementV1.PartnerUsageReportSummary>>}
   */
  public getResourceUsageReport(
    params: PartnerManagementV1.GetResourceUsageReportParams
  ): Promise<PartnerManagementV1.Response<PartnerManagementV1.PartnerUsageReportSummary>> {
    const _params = { ...params };
    const _requiredParams = ['partnerId'];
    const _validParams = [
      'partnerId',
      'resellerId',
      'customerId',
      'children',
      'month',
      'viewpoint',
      'recurse',
      'limit',
      'offset',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'partner_id': _params.partnerId,
      'reseller_id': _params.resellerId,
      'customer_id': _params.customerId,
      'children': _params.children,
      'month': _params.month,
      'viewpoint': _params.viewpoint,
      'recurse': _params.recurse,
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const sdkHeaders = getSdkHeaders(
      PartnerManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getResourceUsageReport'
    );

    const parameters = {
      options: {
        url: '/v1/resource-usage-reports',
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
   * billingOptions
   ************************/

  /**
   * Get customers billing options.
   *
   * Returns the billing options for the requested customer for a given month.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.partnerId - Enterprise ID of the distributor or reseller for which the report is requested.
   * @param {string} [params.customerId] - Account ID/Enterprise ID of the end customer for which the report is
   * requested. This parameter cannot be used along with `reseller_id` query parameter.
   * @param {string} [params.resellerId] - Enterprise ID of the reseller for which the report is requested. This
   * parameter cannot be used along with `customer_id` query parameter.
   * @param {string} [params.date] - The billing month for which the report is requested. Format is yyyy-mm. Defaults to
   * current month.
   * @param {number} [params.limit] - Number of billing option reports returned. The default value is 200. Maximum value
   * is 200.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PartnerManagementV1.Response<PartnerManagementV1.BillingOptionsSummary>>}
   */
  public getBillingOptions(
    params: PartnerManagementV1.GetBillingOptionsParams
  ): Promise<PartnerManagementV1.Response<PartnerManagementV1.BillingOptionsSummary>> {
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
      'limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(
      PartnerManagementV1.DEFAULT_SERVICE_NAME,
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
   * Get credit pools report.
   *
   * Returns the subscription or commitment burn-down reports for the end customers for a given month.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.partnerId - Enterprise ID of the distributor or reseller for which the report is requested.
   * @param {string} [params.customerId] - Account ID/Enterprise ID of the end customer for which the report is
   * requested. This parameter cannot be used along with `reseller_id` query parameter.
   * @param {string} [params.resellerId] - Enterprise ID of the reseller for which the report is requested. This
   * parameter cannot be used along with `customer_id` query parameter.
   * @param {string} [params.date] - The billing month for which the report is requested. Format is yyyy-mm. Defaults to
   * current month.
   * @param {number} [params.limit] - Number of billing units fetched to get the credit pools report. The default value
   * is 30. Maximum value is 30.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PartnerManagementV1.Response<PartnerManagementV1.CreditPoolsReportSummary>>}
   */
  public getCreditPoolsReport(
    params: PartnerManagementV1.GetCreditPoolsReportParams
  ): Promise<PartnerManagementV1.Response<PartnerManagementV1.CreditPoolsReportSummary>> {
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
      'limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(
      PartnerManagementV1.DEFAULT_SERVICE_NAME,
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

namespace PartnerManagementV1 {
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

  /** Parameters for the `getResourceUsageReport` operation. */
  export interface GetResourceUsageReportParams {
    /** Enterprise ID of the distributor or reseller for which the report is requested. */
    partnerId: string;
    /** Enterprise ID of the reseller for which the report is requested. This parameter cannot be used along with
     *  `customer_id` query parameter.
     */
    resellerId?: string;
    /** Account ID/Enterprise ID of the end customer for which the report is requested. This parameter cannot be
     *  used along with `reseller_id` query parameter.
     */
    customerId?: string;
    /** Get report rolled-up to the direct children of the requested entity. Defaults to false. This parameter
     *  cannot be used along with `customer_id` query parameter.
     */
    children?: boolean;
    /** The billing month for which the usage report is requested. Format is `yyyy-mm`. Defaults to current month. */
    month?: string;
    /** Enables partner to view the cost of provisioned services as applicable at the given level. Defaults to the
     *  type of the calling partner. The valid values are `DISTRIBUTOR`, `RESELLER` and `END_CUSTOMER`.
     */
    viewpoint?: GetResourceUsageReportConstants.Viewpoint | string;
    /** Get usage report rolled-up to the end customers of the requesting partner. Defaults to false. This parameter
     *  cannot be used along with `reseller_id` query parameter or `customer_id` query parameter.
     */
    recurse?: boolean;
    /** Number of usage records to be returned. The default value is 30. Maximum value is 100. */
    limit?: number;
    /** An opaque value representing the offset of the first item to be returned by a search query. If not
     *  specified, then the first page of results is returned. To retrieve the next page of search results, use the
     *  'offset' query parameter value within the 'next.href' URL found within a prior search query response.
     */
    offset?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getResourceUsageReport` operation. */
  export namespace GetResourceUsageReportConstants {
    /** Enables partner to view the cost of provisioned services as applicable at the given level. Defaults to the type of the calling partner. The valid values are `DISTRIBUTOR`, `RESELLER` and `END_CUSTOMER`. */
    export enum Viewpoint {
      DISTRIBUTOR = 'DISTRIBUTOR',
      RESELLER = 'RESELLER',
      END_CUSTOMER = 'END_CUSTOMER',
    }
  }

  /** Parameters for the `getBillingOptions` operation. */
  export interface GetBillingOptionsParams {
    /** Enterprise ID of the distributor or reseller for which the report is requested. */
    partnerId: string;
    /** Account ID/Enterprise ID of the end customer for which the report is requested. This parameter cannot be
     *  used along with `reseller_id` query parameter.
     */
    customerId?: string;
    /** Enterprise ID of the reseller for which the report is requested. This parameter cannot be used along with
     *  `customer_id` query parameter.
     */
    resellerId?: string;
    /** The billing month for which the report is requested. Format is yyyy-mm. Defaults to current month. */
    date?: string;
    /** Number of billing option reports returned. The default value is 200. Maximum value is 200. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCreditPoolsReport` operation. */
  export interface GetCreditPoolsReportParams {
    /** Enterprise ID of the distributor or reseller for which the report is requested. */
    partnerId: string;
    /** Account ID/Enterprise ID of the end customer for which the report is requested. This parameter cannot be
     *  used along with `reseller_id` query parameter.
     */
    customerId?: string;
    /** Enterprise ID of the reseller for which the report is requested. This parameter cannot be used along with
     *  `customer_id` query parameter.
     */
    resellerId?: string;
    /** The billing month for which the report is requested. Format is yyyy-mm. Defaults to current month. */
    date?: string;
    /** Number of billing units fetched to get the credit pools report. The default value is 30. Maximum value is
     *  30.
     */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

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
    rows_count?: number;
    /** The link to the next page of the search query. */
    next_url?: string;
    /** Aggregated usage report of all requested partners. */
    resources?: BillingOption[];
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
    rows_count?: number;
    /** The link to the next page of the search query. */
    next_url?: string;
    /** Aggregated usage report of all requested partners. */
    resources?: CreditPoolsReport[];
  }

  /** An object that represents a metric. */
  export interface MetricUsage {
    /** The name of the metric. */
    metric: string;
    /** A unit to qualify the quantity. */
    unit: string;
    /** The aggregated value for the metric. */
    quantity: number;
    /** The quantity that is used for calculating charges. */
    rateable_quantity: number;
    /** The cost that was incurred by the metric. */
    cost: number;
    /** The pre-discounted cost that was incurred by the metric. */
    rated_cost: number;
    /** The price with which cost was calculated. */
    price?: JsonObject[];
  }

  /** Overage that was generated on the credit pool. */
  export interface Overage {
    /** The number of credits used as overage. */
    cost?: number;
    /** A list of resources that generated overage. */
    resources?: JsonObject[];
  }

  /** The link to the first page of the search query. */
  export interface PartnerUsageReportSummaryFirst {
    /** A link to a page of query results. */
    href?: string;
  }

  /** The link to the next page of the search query. */
  export interface PartnerUsageReportSummaryNext {
    /** A link to a page of query results. */
    href?: string;
    /** The value of the `_start` query parameter to fetch the next page. */
    offset?: string;
  }

  /** Aggregated usage report of a partner. */
  export interface PartnerUsageReport {
    /** The ID of the entity. */
    entity_id?: string;
    /** The entity type. */
    entity_type?: string;
    /** The Cloud Resource Name (CRN) of the entity towards which the resource usages were rolled up. */
    entity_crn?: string;
    /** A user-defined name for the entity, such as the enterprise name or account name. */
    entity_name?: string;
    /** Role of the `entity_id` for which the usage report is fetched. */
    entity_partner_type?: string;
    /** Enables partner to view the cost of provisioned services as applicable at the given level. */
    viewpoint?: string;
    /** The billing month for which the usage report is requested. Format is yyyy-mm. */
    month?: string;
    /** The currency code of the billing unit. */
    currency_code?: string;
    /** The country code of the billing unit. */
    country_code?: string;
    /** Billable charges that are aggregated from all entities in the report. */
    billable_cost?: number;
    /** Aggregated billable charges before discounts. */
    billable_rated_cost?: number;
    /** Non-billable charges that are aggregated from all entities in the report. */
    non_billable_cost?: number;
    /** Aggregated non-billable charges before discounts. */
    non_billable_rated_cost?: number;
    resources?: ResourceUsage[];
  }

  /** The aggregated partner usage report. */
  export interface PartnerUsageReportSummary {
    /** The maximum number of usage records in the response. */
    limit?: number;
    /** The link to the first page of the search query. */
    first?: PartnerUsageReportSummaryFirst;
    /** The link to the next page of the search query. */
    next?: PartnerUsageReportSummaryNext;
    /** Aggregated usage report of all requested partners. */
    reports?: PartnerUsageReport[];
  }

  /** Aggregated values for the plan. */
  export interface PlanUsage {
    /** The ID of the plan. */
    plan_id: string;
    /** The pricing region for the plan. */
    pricing_region?: string;
    /** The pricing plan with which the usage was rated. */
    pricing_plan_id?: string;
    /** Whether the plan charges are billed to the customer. */
    billable: boolean;
    /** The total cost that was incurred by the plan. */
    cost: number;
    /** The total pre-discounted cost that was incurred by the plan. */
    rated_cost: number;
    /** All of the metrics in the plan. */
    usage: MetricUsage[];
  }

  /** A container for all the plans in the resource. */
  export interface ResourceUsage {
    /** The ID of the resource. */
    resource_id: string;
    /** The name of the resource. */
    resource_name?: string;
    /** The billable charges for the partner. */
    billable_cost: number;
    /** The pre-discounted billable charges for the partner. */
    billable_rated_cost: number;
    /** The non-billable charges for the partner. */
    non_billable_cost: number;
    /** The pre-discounted, non-billable charges for the partner. */
    non_billable_rated_cost: number;
    /** All of the plans in the resource. */
    plans: PlanUsage[];
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

  /*************************
   * pager classes
   ************************/

  /**
   * GetResourceUsageReportPager can be used to simplify the use of getResourceUsageReport().
   */
  export class GetResourceUsageReportPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: PartnerManagementV1;

    protected params: PartnerManagementV1.GetResourceUsageReportParams;

    /**
     * Construct a GetResourceUsageReportPager object.
     *
     * @param {PartnerManagementV1}  client - The service client instance used to invoke getResourceUsageReport()
     * @param {Object} params - The parameters to be passed to getResourceUsageReport()
     * @constructor
     * @returns {GetResourceUsageReportPager}
     */
    constructor(
      client: PartnerManagementV1,
      params: PartnerManagementV1.GetResourceUsageReportParams
    ) {
      if (params && params.offset) {
        throw new Error(`the params.offset field should not be set`);
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
     * Returns the next page of results by invoking getResourceUsageReport().
     * @returns {Promise<PartnerManagementV1.PartnerUsageReport[]>}
     */
    public async getNext(): Promise<PartnerManagementV1.PartnerUsageReport[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.getResourceUsageReport(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.offset;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.reports;
    }

    /**
     * Returns all results by invoking getResourceUsageReport() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<PartnerManagementV1.PartnerUsageReport[]>}
     */
    public async getAll(): Promise<PartnerManagementV1.PartnerUsageReport[]> {
      const results: PartnerUsageReport[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = PartnerManagementV1;
