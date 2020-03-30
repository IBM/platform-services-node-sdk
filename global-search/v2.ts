/**
 * (C) Copyright IBM Corp. 2020.
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

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Search for resources with the global and shared resource properties repository integrated in the IBM Cloud Platform.
 * The search repository stores and searches cloud resources attributes, which categorize or classify resources. A
 * resource is a physical or logical component that can be provisioned or reserved for an application or service
 * instance and is owned by resource providers, such as Cloud Foundry, IBM containers, or Resource Controller, in the
 * IBM Cloud platform. Resources are uniquely identified by a CRN (Cloud Resource Naming identifier) or by an IMS ID.
 * The properties of a resource include tags and system properties. Both properties are defined in an IBM Cloud billing
 * account, and span across many regions.
 */

class GlobalSearchV2 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://api.global-search-tagging.cloud.ibm.com/';
  static DEFAULT_SERVICE_NAME: string = 'global_search';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of GlobalSearchV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {GlobalSearchV2}
   */

  public static newInstance(options: UserOptions): GlobalSearchV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new GlobalSearchV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /**
   * Construct a GlobalSearchV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net'). The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {GlobalSearchV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(GlobalSearchV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * resourceFinder
   ************************/

  /**
   * Find instances of resources.
   *
   * 'Find cloud foundry resources, resource controlled enabled resources, or storage and network resources running on
   * classic infrastructure in a specific account ID. You can apply query strings if necessary. To filter results, you
   * can insert a string using the Lucene syntax and the query string is parsed into a series of terms and operators. A
   * term can be a single word or a phrase, in which case the search is performed for all the words, in the same order.
   * To filter for a specific value regardless of the property that contains it, use an asterisk as the key name. Only
   * resources that belong to the account ID and that are accessible by the client are returned. You must use this
   * operation when you need to fetch more than `10000` resource items. The `/v2/resources/search` prohibits paginating
   * through such a big number. On the first call, the operation returns a live cursor on the data that you must use on
   * all the subsequent calls to get the next batch of results until you get the empty result set. By default, the
   * fields returned for every resources are: "crn", "name", "family", "type", "account_id". You can specify the subset
   * of the fields you want in your request.''.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.query] - The Lucene-formatted query string. Default to '*' if not set.
   * @param {string[]} [params.fields] - The list of the fields returned by the search. Defaults to all. `crn` is always
   * returned.
   * @param {string} [params.searchCursor] - An opaque search cursor that is returned on each operation call and that
   * must be set on next call.
   * @param {string} [params.transactionId] - An aplhanumeric string that can be used to trace a request across
   * services. If not specified it will be automatically generated with the prefix "gst-".
   * @param {string} [params.accountId] - The account ID to filter resources.
   * @param {number} [params.limit] - The maximum number of hits to return. Defaults to 10.
   * @param {number} [params.timeout] - A search timeout, bounding the search request to be executed within the
   * specified time value and bail with the hits accumulated up to that point when expired. Defaults to the system
   * defined timeout.
   * @param {string[]} [params.sort] - Comma separated properties names used for sorting.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalSearchV2.Response<GlobalSearchV2.ScanResult>>}
   */
  public search(params?: GlobalSearchV2.SearchParams): Promise<GlobalSearchV2.Response<GlobalSearchV2.ScanResult>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const body = {
        'query': _params.query,
        'fields': _params.fields,
        'search_cursor': _params.searchCursor
      };

      const query = {
        'account_id': _params.accountId,
        'limit': _params.limit,
        'timeout': _params.timeout,
        'sort': _params.sort
      };

      const sdkHeaders = getSdkHeaders(GlobalSearchV2.DEFAULT_SERVICE_NAME, 'v2', 'search');

      const parameters = {
        options: {
          url: '/v3/resources/search',
          method: 'POST',
          body,
          qs: query,
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'transaction-id': _params.transactionId
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

  /*************************
   * resourceTypes
   ************************/

  /**
   * Get all supported resource types.
   *
   * Retrieves a list of all the resource types supported by GhoST.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalSearchV2.Response<GlobalSearchV2.SupportedTypesList>>}
   */
  public getSupportedTypes(params?: GlobalSearchV2.GetSupportedTypesParams): Promise<GlobalSearchV2.Response<GlobalSearchV2.SupportedTypesList>> {
    const _params = extend({}, params);

    return new Promise((resolve, reject) => {
      const sdkHeaders = getSdkHeaders(GlobalSearchV2.DEFAULT_SERVICE_NAME, 'v2', 'getSupportedTypes');

      const parameters = {
        options: {
          url: '/v2/resources/supported_types',
          method: 'GET',
        },
        defaultOptions: extend(true, {}, this.baseOptions, {
          headers: extend(true, sdkHeaders, {
            'Accept': 'application/json',
          }, _params.headers),
        }),
      };

      return resolve(this.createRequest(parameters));
    });
  };

}

/*************************
 * interfaces
 ************************/

namespace GlobalSearchV2 {

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `search` operation. */
  export interface SearchParams {
    /** The Lucene-formatted query string. Default to '*' if not set. */
    query?: string;
    /** The list of the fields returned by the search. Defaults to all. `crn` is always returned. */
    fields?: string[];
    /** An opaque search cursor that is returned on each operation call and that must be set on next call. */
    searchCursor?: string;
    /** An aplhanumeric string that can be used to trace a request across services. If not specified it will be
     *  automatically generated with the prefix "gst-".
     */
    transactionId?: string;
    /** The account ID to filter resources. */
    accountId?: string;
    /** The maximum number of hits to return. Defaults to 10. */
    limit?: number;
    /** A search timeout, bounding the search request to be executed within the specified time value and bail with
     *  the hits accumulated up to that point when expired. Defaults to the system defined timeout.
     */
    timeout?: number;
    /** Comma separated properties names used for sorting. */
    sort?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getSupportedTypes` operation. */
  export interface GetSupportedTypesParams {
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** A resource returned in a search result. */
  export interface ResultItem {
    /** Resource identifier in CRN format. */
    crn?: string;
    /** ResultItem accepts additional properties. */
    [propName: string]: any;
  }

  /** The search scan response. */
  export interface ScanResult {
    /** The search cursor to use on all calls after the first one. */
    search_cursor: string;
    /** Value of the limit parameter specified by the user. */
    limit?: number;
    /** The array of results. Each item represents a resource. An empty array signals the end of the result set,
     *  there are no more hits to fetch.
     */
    items: ResultItem[];
  }

  /** A list of resource types supported by GhoST. */
  export interface SupportedTypesList {
    /** A list of resource types supported by GhoST. */
    supported_types?: string[];
  }

}

export = GlobalSearchV2;
