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
 * IBM OpenAPI SDK Code Generator Version: 3.36.0-6f5b0381-20210716-180747
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * With the Network-based Access Control Admin API, you can:
 * * Create, list, get, update, and delete zones
 * * Create, list, get, update, and delete policies
 * * Get account settings
 */

class NetworkBasedAccessControlAdminApiV1 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://network-based-access-control-admin-api.cloud.ibm.com';
  static DEFAULT_SERVICE_NAME: string = 'network_based_access_control_admin_api';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of NetworkBasedAccessControlAdminApiV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {NetworkBasedAccessControlAdminApiV1}
   */

  public static newInstance(options: UserOptions): NetworkBasedAccessControlAdminApiV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new NetworkBasedAccessControlAdminApiV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /**
   * Construct a NetworkBasedAccessControlAdminApiV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {NetworkBasedAccessControlAdminApiV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * zones
   ************************/

  /**
   * Create a zone.
   *
   * Creates a zone for the specified account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of the zone.
   * @param {string} [params.accountId] - The id of the account owning this zone.
   * @param {Address[]} [params.addresses] - The list of addresses in the zone.
   * @param {string} [params.description] - The description of the zone.
   * @param {Address[]} [params.excluded] - The list of excluded addresses in the zone.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutZone>>}
   */
  public createZone(params?: NetworkBasedAccessControlAdminApiV1.CreateZoneParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutZone>> {
    const _params = Object.assign({}, params);

    const body = {
      'name': _params.name,
      'account_id': _params.accountId,
      'addresses': _params.addresses,
      'description': _params.description,
      'excluded': _params.excluded
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createZone');

    const parameters = {
      options: {
        url: '/v1/zones',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List zones.
   *
   * Lists zones for the specified account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The ID of the managing account.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {string} [params.name] - The name of the zone.
   * @param {string} [params.sort] - Sorts results by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.ZonePage>>}
   */
  public listZones(params: NetworkBasedAccessControlAdminApiV1.ListZonesParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.ZonePage>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accountId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'account_id': _params.accountId,
      'name': _params.name,
      'sort': _params.sort
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listZones');

    const parameters = {
      options: {
        url: '/v1/zones',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get the specified zone.
   *
   * Gets the zone for the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - The ID of a zone.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutZone>>}
   */
  public getZone(params: NetworkBasedAccessControlAdminApiV1.GetZoneParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutZone>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['zoneId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'zone_id': _params.zoneId
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getZone');

    const parameters = {
      options: {
        url: '/v1/zones/{zone_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update the specified zone.
   *
   * Updates the zone for the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - The ID of a zone.
   * @param {string} params.ifMatch - The current revision of the resource being updated. This can be found in the
   * Create/Get/Update resource response ETag header.
   * @param {string} [params.name] - The name of the zone.
   * @param {string} [params.accountId] - The id of the account owning this zone.
   * @param {Address[]} [params.addresses] - The list of addresses in the zone.
   * @param {string} [params.description] - The description of the zone.
   * @param {Address[]} [params.excluded] - The list of excluded addresses in the zone.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutZone>>}
   */
  public updateZone(params: NetworkBasedAccessControlAdminApiV1.UpdateZoneParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutZone>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['zoneId', 'ifMatch'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'account_id': _params.accountId,
      'addresses': _params.addresses,
      'description': _params.description,
      'excluded': _params.excluded
    };

    const path = {
      'zone_id': _params.zoneId
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updateZone');

    const parameters = {
      options: {
        url: '/v1/zones/{zone_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'If-Match': _params.ifMatch,
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete the specified zone.
   *
   * Deletes the zone for the specified home ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - The ID of a zone.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.Empty>>}
   */
  public deleteZone(params: NetworkBasedAccessControlAdminApiV1.DeleteZoneParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['zoneId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'zone_id': _params.zoneId
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteZone');

    const parameters = {
      options: {
        url: '/v1/zones/{zone_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * policies
   ************************/

  /**
   * Create a policy.
   *
   * Creates a policy for the specified account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {Environment[]} [params.environments] - The environments this policy applies to.
   * @param {Resource[]} [params.resources] - The resources this policy apply to.
   * @param {string} [params.description] - The description of the policy.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutPolicy>>}
   */
  public createPolicy(params?: NetworkBasedAccessControlAdminApiV1.CreatePolicyParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutPolicy>> {
    const _params = Object.assign({}, params);

    const body = {
      'environments': _params.environments,
      'resources': _params.resources,
      'description': _params.description
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'createPolicy');

    const parameters = {
      options: {
        url: '/v1/policies',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * List policies.
   *
   * Lists policies for the specified account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The ID of the managing account.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {string} [params.region] - The `region` resource attribute.
   * @param {string} [params.resource] - The `resource` resource attribute.
   * @param {string} [params.resourceType] - The `resourceType` resource attribute.
   * @param {string} [params.serviceInstance] - The `serviceInstance` resource attribute.
   * @param {string} [params.serviceName] - The `serviceName` resource attribute.
   * @param {string} [params.serviceType] - The policy's `serviceType` resource attribute.
   * @param {string} [params.zoneId] - The globally unique ID of the zone.
   * @param {string} [params.sort] - Sorts results by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.PolicyPage>>}
   */
  public listPolicies(params: NetworkBasedAccessControlAdminApiV1.ListPoliciesParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.PolicyPage>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accountId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'account_id': _params.accountId,
      'region': _params.region,
      'resource': _params.resource,
      'resource_type': _params.resourceType,
      'service_instance': _params.serviceInstance,
      'service_name': _params.serviceName,
      'service_type': _params.serviceType,
      'zone_id': _params.zoneId,
      'sort': _params.sort
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'listPolicies');

    const parameters = {
      options: {
        url: '/v1/policies',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get the specified policy.
   *
   * Gets the policy for the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - The ID of a policy.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutPolicy>>}
   */
  public getPolicy(params: NetworkBasedAccessControlAdminApiV1.GetPolicyParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['policyId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'policy_id': _params.policyId
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getPolicy');

    const parameters = {
      options: {
        url: '/v1/policies/{policy_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update the specified policy.
   *
   * Updates the policy for the specified ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - The ID of a policy.
   * @param {string} params.ifMatch - The current revision of the resource being updated. This can be found in the
   * Create/Get/Update resource response ETag header.
   * @param {Environment[]} [params.environments] - The environments this policy applies to.
   * @param {Resource[]} [params.resources] - The resources this policy apply to.
   * @param {string} [params.description] - The description of the policy.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutPolicy>>}
   */
  public updatePolicy(params: NetworkBasedAccessControlAdminApiV1.UpdatePolicyParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutPolicy>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['policyId', 'ifMatch'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'environments': _params.environments,
      'resources': _params.resources,
      'description': _params.description
    };

    const path = {
      'policy_id': _params.policyId
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'updatePolicy');

    const parameters = {
      options: {
        url: '/v1/policies/{policy_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'If-Match': _params.ifMatch,
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Delete the specified policy.
   *
   * Deletes the policy for the specified home ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - The ID of a policy.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.Empty>>}
   */
  public deletePolicy(params: NetworkBasedAccessControlAdminApiV1.DeletePolicyParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['policyId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'policy_id': _params.policyId
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'deletePolicy');

    const parameters = {
      options: {
        url: '/v1/policies/{policy_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * accountSettings
   ************************/

  /**
   * Get the specified account settings.
   *
   * Gets the settings for the specified account ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The ID of the account the settings are for.
   * @param {string} [params.transactionId] - The UUID that is used to correlate and track transactions. If you omit
   * this field, the service generates and sends a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutAccountSettings>>}
   */
  public getAccountSettings(params: NetworkBasedAccessControlAdminApiV1.GetAccountSettingsParams): Promise<NetworkBasedAccessControlAdminApiV1.Response<NetworkBasedAccessControlAdminApiV1.OutAccountSettings>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['accountId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'account_id': _params.accountId
    };

    const sdkHeaders = getSdkHeaders(NetworkBasedAccessControlAdminApiV1.DEFAULT_SERVICE_NAME, 'v1', 'getAccountSettings');

    const parameters = {
      options: {
        url: '/v1/account_settings/{account_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json',
          'Transaction-Id': _params.transactionId
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace NetworkBasedAccessControlAdminApiV1 {

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

  /** Parameters for the `createZone` operation. */
  export interface CreateZoneParams {
    /** The name of the zone. */
    name?: string;
    /** The id of the account owning this zone. */
    accountId?: string;
    /** The list of addresses in the zone. */
    addresses?: Address[];
    /** The description of the zone. */
    description?: string;
    /** The list of excluded addresses in the zone. */
    excluded?: Address[];
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listZones` operation. */
  export interface ListZonesParams {
    /** The ID of the managing account. */
    accountId: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    /** The name of the zone. */
    name?: string;
    /** Sorts results by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getZone` operation. */
  export interface GetZoneParams {
    /** The ID of a zone. */
    zoneId: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateZone` operation. */
  export interface UpdateZoneParams {
    /** The ID of a zone. */
    zoneId: string;
    /** The current revision of the resource being updated. This can be found in the Create/Get/Update resource
     *  response ETag header.
     */
    ifMatch: string;
    /** The name of the zone. */
    name?: string;
    /** The id of the account owning this zone. */
    accountId?: string;
    /** The list of addresses in the zone. */
    addresses?: Address[];
    /** The description of the zone. */
    description?: string;
    /** The list of excluded addresses in the zone. */
    excluded?: Address[];
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteZone` operation. */
  export interface DeleteZoneParams {
    /** The ID of a zone. */
    zoneId: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createPolicy` operation. */
  export interface CreatePolicyParams {
    /** The environments this policy applies to. */
    environments?: Environment[];
    /** The resources this policy apply to. */
    resources?: Resource[];
    /** The description of the policy. */
    description?: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listPolicies` operation. */
  export interface ListPoliciesParams {
    /** The ID of the managing account. */
    accountId: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    /** The `region` resource attribute. */
    region?: string;
    /** The `resource` resource attribute. */
    resource?: string;
    /** The `resourceType` resource attribute. */
    resourceType?: string;
    /** The `serviceInstance` resource attribute. */
    serviceInstance?: string;
    /** The `serviceName` resource attribute. */
    serviceName?: string;
    /** The policy's `serviceType` resource attribute. */
    serviceType?: string;
    /** The globally unique ID of the zone. */
    zoneId?: string;
    /** Sorts results by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPolicy` operation. */
  export interface GetPolicyParams {
    /** The ID of a policy. */
    policyId: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePolicy` operation. */
  export interface UpdatePolicyParams {
    /** The ID of a policy. */
    policyId: string;
    /** The current revision of the resource being updated. This can be found in the Create/Get/Update resource
     *  response ETag header.
     */
    ifMatch: string;
    /** The environments this policy applies to. */
    environments?: Environment[];
    /** The resources this policy apply to. */
    resources?: Resource[];
    /** The description of the policy. */
    description?: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deletePolicy` operation. */
  export interface DeletePolicyParams {
    /** The ID of a policy. */
    policyId: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccountSettings` operation. */
  export interface GetAccountSettingsParams {
    /** The ID of the account the settings are for. */
    accountId: string;
    /** The UUID that is used to correlate and track transactions. If you omit this field, the service generates and
     *  sends a transaction ID in the response.
     *  **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with
     *  each request.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** A zone address. */
  export interface Address {
  }

  /** A policy environment. */
  export interface Environment {
    /** The attributes. */
    attributes: EnvironmentAttribute[];
  }

  /** An policy environment attribute. */
  export interface EnvironmentAttribute {
    /** The attribute name. */
    name: string;
    /** The attribute value. */
    value: string;
  }

  /** An output account settings. */
  export interface OutAccountSettings {
    /** The globally unique ID of the account settings. */
    id: string;
    /** The account settings CRN. */
    crn: string;
    /** the max number of policies allowed for the account. */
    policy_count_limit: number;
    /** the max number of zones allowed for the account. */
    zone_count_limit: number;
    /** the current number of policies used by the account. */
    current_policy_count: number;
    /** the current number of zones used by the account. */
    current_zone_count: number;
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** An output policy. */
  export interface OutPolicy {
    /** The globally unique ID of the policy. */
    id: string;
    /** The policy CRN. */
    crn: string;
    /** The description of the policy. */
    description?: string;
    /** The environments this policy applies to. */
    environments: Environment[];
    /** The resources this policy apply to. */
    resources: Resource[];
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** An output zone. */
  export interface OutZone {
    /** The globally unique ID of the zone. */
    id: string;
    /** The zone CRN. */
    crn: string;
    /** The name of the zone. */
    name: string;
    /** The id of the account owning this zone. */
    account_id: string;
    /** The description of the zone. */
    description?: string;
    /** The list of addresses in the zone. */
    addresses: Address[];
    /** The list of excluded addresses in the zone. */
    excluded?: Address[];
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** An output zone summary. */
  export interface OutZoneSummary {
    /** The globally unique ID of the zone. */
    id: string;
    /** The zone CRN. */
    crn: string;
    /** The name of the zone. */
    name: string;
    /** The description of the zone. */
    description?: string;
    /** A preview of addresses in the zone (3 addresses maximum). */
    addresses_preview: Address[];
    /** The number of addresses in the zone. */
    address_count: number;
    /** The number of excluded addresses in the zone. */
    excluded_count: number;
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** The response object of the ListPolicies operation. */
  export interface PolicyPage {
    /** The number of returned results. */
    count: number;
    /** The returned policies. */
    policies: OutPolicy[];
  }

  /** An policy resource. */
  export interface Resource {
    /** The resource attributes. */
    attributes: ResourceAttribute[];
    /** The optional resource tags. */
    tags?: ResourceTagAttribute[];
  }

  /** A policy resource attribute. */
  export interface ResourceAttribute {
    /** The attribute name. */
    name: string;
    /** The attribute value. */
    value: string;
    /** The attribute operator. */
    operator?: string;
  }

  /** A policy resource tag attribute. */
  export interface ResourceTagAttribute {
    /** The tag attribute name. */
    name: string;
    /** The tag attribute value. */
    value: string;
    /** The attribute operator. */
    operator?: string;
  }

  /** A service reference value. */
  export interface ServiceRefValue {
    /** The service name. */
    service_name: string;
    /** The id of the account owning the service. */
    account_id?: string;
    /** The service instance. */
    service_instance?: string;
  }

  /** The response object of the ListZones operation. */
  export interface ZonePage {
    /** The number of returned results. */
    count: number;
    /** The returned zones. */
    zones: OutZoneSummary[];
  }

  /** A single IP address. */
  export interface AddressIPAddress extends Address {
    /** The type of address. */
    type: string;
    /** The IP address. */
    value: string;
  }

  /** An IP address range. */
  export interface AddressIPAddressRange extends Address {
    /** The type of address. */
    type: string;
    /** The ip range in <first-ip>-<last-ip> format. */
    value: string;
  }

  /** A service reference. */
  export interface AddressServiceRef extends Address {
    /** The type of address. */
    type: string;
    /** A service reference value. */
    value: ServiceRefValue;
  }

  /** A subnet in CIDR format. */
  export interface AddressSubnet extends Address {
    /** The type of address. */
    type: string;
    /** The subnet in CIDR format. */
    value: string;
  }

  /** A single VPC address. */
  export interface AddressVPC extends Address {
    /** The type of address. */
    type: string;
    /** The VPC CRN. */
    value: string;
  }

}

export = NetworkBasedAccessControlAdminApiV1;
