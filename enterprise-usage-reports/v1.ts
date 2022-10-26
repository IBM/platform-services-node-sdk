/**
 * (C) Copyright IBM Corp. 2022.
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
 * IBM OpenAPI SDK Code Generator Version: 3.60.0-13f6e1ba-20221019-164457
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
  getQueryParam,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Usage reports for IBM Cloud enterprise entities
 *
 * API Version: 1.0.0-beta.1
 */

class EnterpriseUsageReportsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://enterprise.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'enterprise_usage_reports';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of EnterpriseUsageReportsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {EnterpriseUsageReportsV1}
   */

  public static newInstance(options: UserOptions): EnterpriseUsageReportsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new EnterpriseUsageReportsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a EnterpriseUsageReportsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {EnterpriseUsageReportsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(EnterpriseUsageReportsV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * enterpriseUsageReports
   ************************/

  /**
   * Get usage reports for enterprise entities.
   *
   * Usage reports for entities in the IBM Cloud enterprise. These entities can be the enterprise, an account group, or
   * an account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.enterpriseId] - The ID of the enterprise for which the reports are queried. This parameter
   * cannot be used with the `account_id` or `account_group_id` query parameters.
   * @param {string} [params.accountGroupId] - The ID of the account group for which the reports are queried. This
   * parameter cannot be used with the `account_id` or `enterprise_id` query parameters.
   * @param {string} [params.accountId] - The ID of the account for which the reports are queried. This parameter cannot
   * be used with the `account_group_id` or `enterprise_id` query parameters.
   * @param {boolean} [params.children] - Returns the reports for the immediate child entities under the current account
   * group or enterprise. This parameter cannot be used with the `account_id` query parameter.
   * @param {string} [params.month] - The billing month for which the usage report is requested. The format is in
   * yyyy-mm. Defaults to the month in which the report is queried.
   * @param {string} [params.billingUnitId] - The ID of the billing unit by which to filter the reports.
   * @param {number} [params.limit] - The maximum number of search results to be returned.
   * @param {string} [params.offset] - An opaque value representing the offset of the first item to be returned by a
   * search query. If not specified, then the first page of results is returned. To retrieve the next page of search
   * results, use the 'offset' query parameter value within the 'next.href' URL found within a prior search query
   * response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<EnterpriseUsageReportsV1.Response<EnterpriseUsageReportsV1.Reports>>}
   */
  public getResourceUsageReport(
    params?: EnterpriseUsageReportsV1.GetResourceUsageReportParams
  ): Promise<EnterpriseUsageReportsV1.Response<EnterpriseUsageReportsV1.Reports>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'enterpriseId',
      'accountGroupId',
      'accountId',
      'children',
      'month',
      'billingUnitId',
      'limit',
      'offset',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'enterprise_id': _params.enterpriseId,
      'account_group_id': _params.accountGroupId,
      'account_id': _params.accountId,
      'children': _params.children,
      'month': _params.month,
      'billing_unit_id': _params.billingUnitId,
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const sdkHeaders = getSdkHeaders(
      EnterpriseUsageReportsV1.DEFAULT_SERVICE_NAME,
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

namespace EnterpriseUsageReportsV1 {
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
    /** The ID of the enterprise for which the reports are queried. This parameter cannot be used with the
     *  `account_id` or `account_group_id` query parameters.
     */
    enterpriseId?: string;
    /** The ID of the account group for which the reports are queried. This parameter cannot be used with the
     *  `account_id` or `enterprise_id` query parameters.
     */
    accountGroupId?: string;
    /** The ID of the account for which the reports are queried. This parameter cannot be used with the
     *  `account_group_id` or `enterprise_id` query parameters.
     */
    accountId?: string;
    /** Returns the reports for the immediate child entities under the current account group or enterprise. This
     *  parameter cannot be used with the `account_id` query parameter.
     */
    children?: boolean;
    /** The billing month for which the usage report is requested. The format is in yyyy-mm. Defaults to the month
     *  in which the report is queried.
     */
    month?: string;
    /** The ID of the billing unit by which to filter the reports. */
    billingUnitId?: string;
    /** The maximum number of search results to be returned. */
    limit?: number;
    /** An opaque value representing the offset of the first item to be returned by a search query. If not
     *  specified, then the first page of results is returned. To retrieve the next page of search results, use the
     *  'offset' query parameter value within the 'next.href' URL found within a prior search query response.
     */
    offset?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** An object that contains a link to a page of search results. */
  export interface Link {
    /** A link to a page of search results. */
    href?: string;
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

  /** Resource Usage Reports API response. */
  export interface Reports {
    /** The maximum number of reports in the response. */
    limit?: number;
    /** An object that contains the link to the first page of the search query. */
    first?: Link;
    /** An object that contains the link to the next page of the search query. */
    next?: Link;
    /** The list of usage reports. */
    reports?: ResourceUsageReport[];
  }

  /** A container for all the plans in the resource. */
  export interface ResourceUsage {
    /** The ID of the resource. */
    resource_id: string;
    /** The billable charges for the account. */
    billable_cost: number;
    /** The pre-discounted billable charges for the account. */
    billable_rated_cost: number;
    /** The non-billable charges for the account. */
    non_billable_cost: number;
    /** The pre-discounted, non-billable charges for the account. */
    non_billable_rated_cost: number;
    /** All of the plans in the resource. */
    plans: PlanUsage[];
  }

  /** An object that represents a usage report. */
  export interface ResourceUsageReport {
    /** The ID of the entity. */
    entity_id: string;
    /** The entity type. */
    entity_type: string;
    /** The Cloud Resource Name (CRN) of the entity towards which the resource usages were rolled up. */
    entity_crn: string;
    /** A user-defined name for the entity, such as the enterprise name or account group name. */
    entity_name: string;
    /** The ID of the billing unit. */
    billing_unit_id: string;
    /** The CRN of the billing unit. */
    billing_unit_crn: string;
    /** The name of the billing unit. */
    billing_unit_name: string;
    /** The country code of the billing unit. */
    country_code: string;
    /** The currency code of the billing unit. */
    currency_code: string;
    /** Billing month. */
    month: string;
    /** Billable charges that are aggregated from all entities in the report. */
    billable_cost: number;
    /** Non-billable charges that are aggregated from all entities in the report. */
    non_billable_cost: number;
    /** Aggregated billable charges before discounts. */
    billable_rated_cost: number;
    /** Aggregated non-billable charges before discounts. */
    non_billable_rated_cost: number;
    /** Details about all the resources that are included in the aggregated charges. */
    resources: ResourceUsage[];
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

    protected client: EnterpriseUsageReportsV1;

    protected params: EnterpriseUsageReportsV1.GetResourceUsageReportParams;

    /**
     * Construct a GetResourceUsageReportPager object.
     *
     * @param {EnterpriseUsageReportsV1}  client - The service client instance used to invoke getResourceUsageReport()
     * @param {Object} [params] - The parameters to be passed to getResourceUsageReport()
     * @constructor
     * @returns {GetResourceUsageReportPager}
     */
    constructor(
      client: EnterpriseUsageReportsV1,
      params?: EnterpriseUsageReportsV1.GetResourceUsageReportParams
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
     * @returns {Promise<EnterpriseUsageReportsV1.ResourceUsageReport[]>}
     */
    public async getNext(): Promise<EnterpriseUsageReportsV1.ResourceUsageReport[]> {
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
        if (result.next.href) {
          next = getQueryParam(result.next.href, 'offset');
        }
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.reports;
    }

    /**
     * Returns all results by invoking getResourceUsageReport() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<EnterpriseUsageReportsV1.ResourceUsageReport[]>}
     */
    public async getAll(): Promise<EnterpriseUsageReportsV1.ResourceUsageReport[]> {
      const results: ResourceUsageReport[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = EnterpriseUsageReportsV1;
