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
 * IBM OpenAPI SDK Code Generator Version: 3.75.0-726bc7e3-20230713-221716
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  getAuthenticatorFromEnvironment,
  validateParams,
  UserOptions,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Usage reports for IBM Cloud partner entities
 *
 * API Version: 1.0.0
 */

class PartnerUsageReportsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://partner.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'partner_usage_reports';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of PartnerUsageReportsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {PartnerUsageReportsV1}
   */

  public static newInstance(options: UserOptions): PartnerUsageReportsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new PartnerUsageReportsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a PartnerUsageReportsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {PartnerUsageReportsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(PartnerUsageReportsV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * partnerUsageReports
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
   * @param {string} [params.customerId] - Enterprise ID of the child customer for which the report is requested. This
   * parameter cannot be used along with `reseller_id` query parameter.
   * @param {boolean} [params.children] - Get report rolled-up to the direct children of the requested entity. Defaults
   * to false. This parameter cannot be used along with `customer_id` query parameter.
   * @param {string} [params.month] - The billing month for which the usage report is requested. Format is `yyyy-mm`.
   * Defaults to current month.
   * @param {string} [params.viewpoint] - Enables partner to view the cost of provisioned services as applicable at each
   * level of the hierarchy. Defaults to the type of the calling partner. The valid values are `DISTRIBUTOR`, `RESELLER`
   * and `END_CUSTOMER`.
   * @param {boolean} [params.recurse] - Get usage report rolled-up to the end customers of the requested entity.
   * Defaults to false. This parameter cannot be used along with `reseller_id` query parameter or `customer_id` query
   * parameter.
   * @param {number} [params.limit] - Number of usage records to be returned. The default value is 30. Maximum value is
   * 200.
   * @param {string} [params.offset] - An opaque value representing the offset of the first item to be returned by a
   * search query. If not specified, then the first page of results is returned. To retrieve the next page of search
   * results, use the 'offset' query parameter value within the 'next.href' URL found within a prior search query
   * response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<PartnerUsageReportsV1.Response<PartnerUsageReportsV1.PartnerUsageReportSummary>>}
   */
  public getResourceUsageReport(
    params: PartnerUsageReportsV1.GetResourceUsageReportParams
  ): Promise<PartnerUsageReportsV1.Response<PartnerUsageReportsV1.PartnerUsageReportSummary>> {
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
      PartnerUsageReportsV1.DEFAULT_SERVICE_NAME,
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
}

/*************************
 * interfaces
 ************************/

namespace PartnerUsageReportsV1 {
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
    /** Enterprise ID of the child customer for which the report is requested. This parameter cannot be used along
     *  with `reseller_id` query parameter.
     */
    customerId?: string;
    /** Get report rolled-up to the direct children of the requested entity. Defaults to false. This parameter
     *  cannot be used along with `customer_id` query parameter.
     */
    children?: boolean;
    /** The billing month for which the usage report is requested. Format is `yyyy-mm`. Defaults to current month. */
    month?: string;
    /** Enables partner to view the cost of provisioned services as applicable at each level of the hierarchy.
     *  Defaults to the type of the calling partner. The valid values are `DISTRIBUTOR`, `RESELLER` and `END_CUSTOMER`.
     */
    viewpoint?: GetResourceUsageReportConstants.Viewpoint | string;
    /** Get usage report rolled-up to the end customers of the requested entity. Defaults to false. This parameter
     *  cannot be used along with `reseller_id` query parameter or `customer_id` query parameter.
     */
    recurse?: boolean;
    /** Number of usage records to be returned. The default value is 30. Maximum value is 200. */
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
    /** Enables partner to view the cost of provisioned services as applicable at each level of the hierarchy. Defaults to the type of the calling partner. The valid values are `DISTRIBUTOR`, `RESELLER` and `END_CUSTOMER`. */
    export enum Viewpoint {
      DISTRIBUTOR = 'DISTRIBUTOR',
      RESELLER = 'RESELLER',
      END_CUSTOMER = 'END_CUSTOMER',
    }
  }

  /*************************
   * model interfaces
   ************************/

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
    /** A user-defined name for the entity, such as the enterprise name or account group name. */
    entity_name?: string;
    /** Role of the `entity_id` for which the usage report is fetched. */
    entity_partner_type?: string;
    /** Enables partner to view the cost of provisioned services as applicable at each level of the hierarchy. */
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

  /*************************
   * pager classes
   ************************/

  /**
   * GetResourceUsageReportPager can be used to simplify the use of getResourceUsageReport().
   */
  export class GetResourceUsageReportPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: PartnerUsageReportsV1;

    protected params: PartnerUsageReportsV1.GetResourceUsageReportParams;

    /**
     * Construct a GetResourceUsageReportPager object.
     *
     * @param {PartnerUsageReportsV1}  client - The service client instance used to invoke getResourceUsageReport()
     * @param {Object} params - The parameters to be passed to getResourceUsageReport()
     * @constructor
     * @returns {GetResourceUsageReportPager}
     */
    constructor(
      client: PartnerUsageReportsV1,
      params: PartnerUsageReportsV1.GetResourceUsageReportParams
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
     * @returns {Promise<PartnerUsageReportsV1.PartnerUsageReport[]>}
     */
    public async getNext(): Promise<PartnerUsageReportsV1.PartnerUsageReport[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.getResourceUsageReport(this.params);
      const { result } = response;

      let next = null;
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
     * @returns {Promise<PartnerUsageReportsV1.PartnerUsageReport[]>}
     */
    public async getAll(): Promise<PartnerUsageReportsV1.PartnerUsageReport[]> {
      const results: PartnerUsageReport[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = PartnerUsageReportsV1;
