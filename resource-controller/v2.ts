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
 * IBM OpenAPI SDK Code Generator Version: 3.94.1-71478489-20240820-161623
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  SDKLogger,
  UserOptions,
  getAuthenticatorFromEnvironment,
  getNewLogger,
  getQueryParam,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * Manage lifecycle of your Cloud resources using Resource Controller APIs. Resources are provisioned globally in an
 * account scope. Supports asynchronous provisioning of resources. Enables consumption of a global resource through a
 * Cloud Foundry space in any region.
 *
 * API Version: 2.0
 */

class ResourceControllerV2 extends BaseService {
  static _logger: SDKLogger = getNewLogger('ResourceControllerV2');

  static DEFAULT_SERVICE_URL: string = 'https://resource-controller.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'resource_controller';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ResourceControllerV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {ResourceControllerV2}
   */

  public static newInstance(options: UserOptions): ResourceControllerV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ResourceControllerV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a ResourceControllerV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ResourceControllerV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ResourceControllerV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * resourceInstances
   ************************/

  /**
   * Get a list of all resource instances.
   *
   * View a list of all available resource instances. Resources is a broad term that could mean anything from a service
   * instance to a virtual machine associated with the customer account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.guid] - The GUID of the instance.
   * @param {string} [params.name] - The human-readable name of the instance.
   * @param {string} [params.resourceGroupId] - The ID of the resource group.
   * @param {string} [params.resourceId] - The unique ID of the offering. This value is provided by and stored in the
   * global catalog.
   * @param {string} [params.resourcePlanId] - The unique ID of the plan associated with the offering. This value is
   * provided by and stored in the global catalog.
   * @param {string} [params.type] - The type of the instance, for example, `service_instance`.
   * @param {string} [params.subType] - The sub-type of instance, for example, `kms`.
   * @param {number} [params.limit] - Limit on how many items should be returned.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of the
   * operation response.
   * @param {string} [params.state] - The state of the instance. If not specified, instances in state `active` and
   * `provisioning` are returned.
   * @param {string} [params.updatedFrom] - Start date inclusive filter.
   * @param {string} [params.updatedTo] - End date inclusive filter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstancesList>>}
   */
  public listResourceInstances(
    params?: ResourceControllerV2.ListResourceInstancesParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstancesList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'guid',
      'name',
      'resourceGroupId',
      'resourceId',
      'resourcePlanId',
      'type',
      'subType',
      'limit',
      'start',
      'state',
      'updatedFrom',
      'updatedTo',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'guid': _params.guid,
      'name': _params.name,
      'resource_group_id': _params.resourceGroupId,
      'resource_id': _params.resourceId,
      'resource_plan_id': _params.resourcePlanId,
      'type': _params.type,
      'sub_type': _params.subType,
      'limit': _params.limit,
      'start': _params.start,
      'state': _params.state,
      'updated_from': _params.updatedFrom,
      'updated_to': _params.updatedTo,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceInstances'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances',
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

  /**
   * Create (provision) a new resource instance.
   *
   * When you provision a service you get an instance of that service. An instance represents the resource with which
   * you create, and additionally, represents a chargeable record of which billing can occur.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the instance. Must be 180 characters or less and cannot include any
   * special characters other than `(space) - . _ :`.
   * @param {string} params.target - The deployment location where the instance should be hosted.
   * @param {string} params.resourceGroup - The ID of the resource group.
   * @param {string} params.resourcePlanId - The unique ID of the plan associated with the offering. This value is
   * provided by and stored in the global catalog.
   * @param {string[]} [params.tags] - Tags that are attached to the instance after provisioning. These tags can be
   * searched and managed through the Tagging API in IBM Cloud.
   * @param {boolean} [params.allowCleanup] - A boolean that dictates if the resource instance should be deleted
   * (cleaned up) during the processing of a region instance delete call.
   * @param {JsonObject} [params.parameters] - Configuration options represented as key-value pairs that are passed
   * through to the target resource brokers. Set the `onetime_credentials` property to specify whether newly created
   * resource key credentials can be retrieved by using get resource key or get a list of all of the resource keys
   * requests.
   * @param {boolean} [params.entityLock] - Indicates if the resource instance is locked for further update or delete
   * operations. It does not affect actions performed on child resources like aliases, bindings or keys. False by
   * default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>>}
   */
  public createResourceInstance(
    params: ResourceControllerV2.CreateResourceInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'target', 'resourceGroup', 'resourcePlanId'];
    const _validParams = [
      'name',
      'target',
      'resourceGroup',
      'resourcePlanId',
      'tags',
      'allowCleanup',
      'parameters',
      'entityLock',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'target': _params.target,
      'resource_group': _params.resourceGroup,
      'resource_plan_id': _params.resourcePlanId,
      'tags': _params.tags,
      'allow_cleanup': _params.allowCleanup,
      'parameters': _params.parameters,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createResourceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Entity-Lock': _params.entityLock,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a resource instance.
   *
   * Retrieve a resource instance by URL-encoded CRN or GUID. Find more details on a particular instance, like when it
   * was provisioned and who provisioned it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>>}
   */
  public getResourceInstance(
    params: ResourceControllerV2.GetResourceInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getResourceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}',
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
   * Delete a resource instance.
   *
   * Delete a resource instance by URL-encoded CRN or GUID. If the resource instance has any resource keys or aliases
   * associated with it, use the `recursive=true` parameter to delete it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {boolean} [params.recursive] - Will delete resource bindings, keys and aliases associated with the instance.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>>}
   */
  public deleteResourceInstance(
    params: ResourceControllerV2.DeleteResourceInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'recursive', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'recursive': _params.recursive,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteResourceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a resource instance.
   *
   * Use the resource instance URL-encoded CRN or GUID to make updates to the resource instance, like changing the name
   * or plan.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {string} [params.name] - The new name of the instance. Must be 180 characters or less and cannot include any
   * special characters other than `(space) - . _ :`.
   * @param {JsonObject} [params.parameters] - The new configuration options for the instance. Set the
   * `onetime_credentials` property to specify whether newly created resource key credentials can be retrieved by using
   * get resource key or get a list of all of the resource keys requests.
   * @param {string} [params.resourcePlanId] - The unique ID of the plan associated with the offering. This value is
   * provided by and stored in the global catalog.
   * @param {boolean} [params.allowCleanup] - A boolean that dictates if the resource instance should be deleted
   * (cleaned up) during the processing of a region instance delete call.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>>}
   */
  public updateResourceInstance(
    params: ResourceControllerV2.UpdateResourceInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'name', 'parameters', 'resourcePlanId', 'allowCleanup', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'parameters': _params.parameters,
      'resource_plan_id': _params.resourcePlanId,
      'allow_cleanup': _params.allowCleanup,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateResourceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}',
        method: 'PATCH',
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

  /**
   * Get a list of all resource aliases for the instance.
   *
   * Retrieving a list of all resource aliases can help you find out who's using the resource instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {number} [params.limit] - Limit on how many items should be returned.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of the
   * operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAliasesList>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public listResourceAliasesForInstance(
    params: ResourceControllerV2.ListResourceAliasesForInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAliasesList>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: listResourceAliasesForInstance'
    );
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceAliasesForInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}/resource_aliases',
        method: 'GET',
        qs: query,
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
   * Get a list of all the resource keys for the instance.
   *
   * You may have many resource keys for one resource instance. For example, you may have a different resource key for
   * each user or each role.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {number} [params.limit] - Limit on how many items should be returned.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of the
   * operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKeysList>>}
   */
  public listResourceKeysForInstance(
    params: ResourceControllerV2.ListResourceKeysForInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKeysList>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceKeysForInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}/resource_keys',
        method: 'GET',
        qs: query,
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
   * Lock a resource instance.
   *
   * Locks a resource instance. A locked instance can not be updated or deleted. It does not affect actions performed on
   * child resources like aliases, bindings, or keys.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>>}
   */
  public lockResourceInstance(
    params: ResourceControllerV2.LockResourceInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'lockResourceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}/lock',
        method: 'POST',
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
   * Unlock a resource instance.
   *
   * Unlock a resource instance to update or delete it. Unlocking a resource instance does not affect child resources
   * like aliases, bindings or keys.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>>}
   */
  public unlockResourceInstance(
    params: ResourceControllerV2.UnlockResourceInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'unlockResourceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}/lock',
        method: 'DELETE',
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
   * Cancel the in progress last operation of the resource instance.
   *
   * Cancel the in progress last operation of the resource instance. After successful cancellation, the resource
   * instance is removed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource instance URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>>}
   */
  public cancelLastopResourceInstance(
    params: ResourceControllerV2.CancelLastopResourceInstanceParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceInstance>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'cancelLastopResourceInstance'
    );

    const parameters = {
      options: {
        url: '/v2/resource_instances/{id}/last_operation',
        method: 'DELETE',
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
  /*************************
   * resourceKeys
   ************************/

  /**
   * Get a list of all of the resource keys.
   *
   * View all of the resource keys that exist for all of your resource instances.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.guid] - The GUID of the key.
   * @param {string} [params.name] - The human-readable name of the key.
   * @param {string} [params.resourceGroupId] - The ID of the resource group.
   * @param {string} [params.resourceId] - The unique ID of the offering. This value is provided by and stored in the
   * global catalog.
   * @param {number} [params.limit] - Limit on how many items should be returned.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of the
   * operation response.
   * @param {string} [params.updatedFrom] - Start date inclusive filter.
   * @param {string} [params.updatedTo] - End date inclusive filter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKeysList>>}
   */
  public listResourceKeys(
    params?: ResourceControllerV2.ListResourceKeysParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKeysList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'guid',
      'name',
      'resourceGroupId',
      'resourceId',
      'limit',
      'start',
      'updatedFrom',
      'updatedTo',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'guid': _params.guid,
      'name': _params.name,
      'resource_group_id': _params.resourceGroupId,
      'resource_id': _params.resourceId,
      'limit': _params.limit,
      'start': _params.start,
      'updated_from': _params.updatedFrom,
      'updated_to': _params.updatedTo,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceKeys'
    );

    const parameters = {
      options: {
        url: '/v2/resource_keys',
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

  /**
   * Create a new resource key.
   *
   * A resource key is a saved credential you can use to authenticate with a resource instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the key.
   * @param {string} params.source - The ID of resource instance or alias.
   * @param {ResourceKeyPostParameters} [params.parameters] - Configuration options represented as key-value pairs.
   * Service defined options are passed through to the target resource brokers, whereas platform defined options are
   * not.
   * @param {string} [params.role] - The base IAM service role name (Reader, Writer, or Manager), or the service or
   * custom role CRN. Refer to service’s documentation for supported roles.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKey>>}
   */
  public createResourceKey(
    params: ResourceControllerV2.CreateResourceKeyParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKey>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'source'];
    const _validParams = ['name', 'source', 'parameters', 'role', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'source': _params.source,
      'parameters': _params.parameters,
      'role': _params.role,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createResourceKey'
    );

    const parameters = {
      options: {
        url: '/v2/resource_keys',
        method: 'POST',
        body,
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

  /**
   * Get resource key.
   *
   * View the details of a resource key by URL-encoded CRN or GUID, like the credentials for the key and who created it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource key URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKey>>}
   */
  public getResourceKey(
    params: ResourceControllerV2.GetResourceKeyParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKey>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getResourceKey'
    );

    const parameters = {
      options: {
        url: '/v2/resource_keys/{id}',
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
   * Delete a resource key.
   *
   * Deleting a resource key does not affect any resource instance or resource alias associated with the key.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource key URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>>}
   */
  public deleteResourceKey(
    params: ResourceControllerV2.DeleteResourceKeyParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteResourceKey'
    );

    const parameters = {
      options: {
        url: '/v2/resource_keys/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a resource key.
   *
   * Use the resource key URL-encoded CRN or GUID to update the resource key.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource key URL-encoded CRN or GUID.
   * @param {string} params.name - The new name of the key. Must be 180 characters or less and cannot include any
   * special characters other than `(space) - . _ :`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKey>>}
   */
  public updateResourceKey(
    params: ResourceControllerV2.UpdateResourceKeyParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceKey>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'name'];
    const _validParams = ['id', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateResourceKey'
    );

    const parameters = {
      options: {
        url: '/v2/resource_keys/{id}',
        method: 'PATCH',
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
  /*************************
   * resourceBindings
   ************************/

  /**
   * Get a list of all resource bindings.
   *
   * View all of the resource bindings that exist for all of your resource aliases.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.guid] - The GUID of the binding.
   * @param {string} [params.name] - The human-readable name of the binding.
   * @param {string} [params.resourceGroupId] - The ID of the resource group.
   * @param {string} [params.resourceId] - The unique ID of the offering (service name). This value is provided by and
   * stored in the global catalog.
   * @param {string} [params.regionBindingId] - The ID of the binding in the target environment. For example,
   * `service_binding_id` in a given IBM Cloud environment.
   * @param {number} [params.limit] - Limit on how many items should be returned.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of the
   * operation response.
   * @param {string} [params.updatedFrom] - Start date inclusive filter.
   * @param {string} [params.updatedTo] - End date inclusive filter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBindingsList>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public listResourceBindings(
    params?: ResourceControllerV2.ListResourceBindingsParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBindingsList>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: listResourceBindings'
    );
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'guid',
      'name',
      'resourceGroupId',
      'resourceId',
      'regionBindingId',
      'limit',
      'start',
      'updatedFrom',
      'updatedTo',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'guid': _params.guid,
      'name': _params.name,
      'resource_group_id': _params.resourceGroupId,
      'resource_id': _params.resourceId,
      'region_binding_id': _params.regionBindingId,
      'limit': _params.limit,
      'start': _params.start,
      'updated_from': _params.updatedFrom,
      'updated_to': _params.updatedTo,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceBindings'
    );

    const parameters = {
      options: {
        url: '/v2/resource_bindings',
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

  /**
   * Create a new resource binding.
   *
   * A resource binding connects credentials to a resource alias. The credentials are in the form of a resource key.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.source - The ID of resource alias.
   * @param {string} params.target - The CRN of application to bind to in a specific environment, for example, Dallas
   * YP, CFEE instance.
   * @param {string} [params.name] - The name of the binding. Must be 180 characters or less and cannot include any
   * special characters other than `(space) - . _ :`.
   * @param {ResourceBindingPostParameters} [params.parameters] - Configuration options represented as key-value pairs.
   * Service defined options are passed through to the target resource brokers, whereas platform defined options are
   * not.
   * @param {string} [params.role] - The base IAM service role name (Reader, Writer, or Manager), or the service or
   * custom role CRN. Refer to service’s documentation for supported roles.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBinding>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public createResourceBinding(
    params: ResourceControllerV2.CreateResourceBindingParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBinding>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: createResourceBinding'
    );
    const _params = { ...params };
    const _requiredParams = ['source', 'target'];
    const _validParams = ['source', 'target', 'name', 'parameters', 'role', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'source': _params.source,
      'target': _params.target,
      'name': _params.name,
      'parameters': _params.parameters,
      'role': _params.role,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createResourceBinding'
    );

    const parameters = {
      options: {
        url: '/v2/resource_bindings',
        method: 'POST',
        body,
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

  /**
   * Get a resource binding.
   *
   * View a resource binding and all of its details, like who created it, the credential, and the resource alias that
   * the binding is associated with.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource binding URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBinding>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public getResourceBinding(
    params: ResourceControllerV2.GetResourceBindingParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBinding>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: getResourceBinding'
    );
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getResourceBinding'
    );

    const parameters = {
      options: {
        url: '/v2/resource_bindings/{id}',
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
   * Delete a resource binding.
   *
   * Deleting a resource binding does not affect the resource alias that the binding is associated with.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource binding URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public deleteResourceBinding(
    params: ResourceControllerV2.DeleteResourceBindingParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: deleteResourceBinding'
    );
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteResourceBinding'
    );

    const parameters = {
      options: {
        url: '/v2/resource_bindings/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a resource binding.
   *
   * Use the resource binding URL-encoded CRN or GUID to update the resource binding.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource binding URL-encoded CRN or GUID.
   * @param {string} params.name - The new name of the binding. Must be 180 characters or less and cannot include any
   * special characters other than `(space) - . _ :`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBinding>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public updateResourceBinding(
    params: ResourceControllerV2.UpdateResourceBindingParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBinding>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: updateResourceBinding'
    );
    const _params = { ...params };
    const _requiredParams = ['id', 'name'];
    const _validParams = ['id', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateResourceBinding'
    );

    const parameters = {
      options: {
        url: '/v2/resource_bindings/{id}',
        method: 'PATCH',
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
  /*************************
   * resourceAliases
   ************************/

  /**
   * Get a list of all resource aliases.
   *
   * View all of the resource aliases that exist for every resource instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.guid] - The GUID of the alias.
   * @param {string} [params.name] - The human-readable name of the alias.
   * @param {string} [params.resourceInstanceId] - The ID of the resource instance.
   * @param {string} [params.regionInstanceId] - The ID of the instance in the target environment. For example,
   * `service_instance_id` in a given IBM Cloud environment.
   * @param {string} [params.resourceId] - The unique ID of the offering (service name). This value is provided by and
   * stored in the global catalog.
   * @param {string} [params.resourceGroupId] - The ID of the resource group.
   * @param {number} [params.limit] - Limit on how many items should be returned.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of the
   * operation response.
   * @param {string} [params.updatedFrom] - Start date inclusive filter.
   * @param {string} [params.updatedTo] - End date inclusive filter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAliasesList>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public listResourceAliases(
    params?: ResourceControllerV2.ListResourceAliasesParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAliasesList>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: listResourceAliases'
    );
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'guid',
      'name',
      'resourceInstanceId',
      'regionInstanceId',
      'resourceId',
      'resourceGroupId',
      'limit',
      'start',
      'updatedFrom',
      'updatedTo',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'guid': _params.guid,
      'name': _params.name,
      'resource_instance_id': _params.resourceInstanceId,
      'region_instance_id': _params.regionInstanceId,
      'resource_id': _params.resourceId,
      'resource_group_id': _params.resourceGroupId,
      'limit': _params.limit,
      'start': _params.start,
      'updated_from': _params.updatedFrom,
      'updated_to': _params.updatedTo,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceAliases'
    );

    const parameters = {
      options: {
        url: '/v2/resource_aliases',
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

  /**
   * Create a new resource alias.
   *
   * Alias a resource instance into a targeted environment's (name)space.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the alias. Must be 180 characters or less and cannot include any special
   * characters other than `(space) - . _ :`.
   * @param {string} params.source - The ID of resource instance.
   * @param {string} params.target - The CRN of target name(space) in a specific environment, for example, space in
   * Dallas YP, CFEE instance etc.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAlias>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public createResourceAlias(
    params: ResourceControllerV2.CreateResourceAliasParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAlias>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: createResourceAlias'
    );
    const _params = { ...params };
    const _requiredParams = ['name', 'source', 'target'];
    const _validParams = ['name', 'source', 'target', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'source': _params.source,
      'target': _params.target,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createResourceAlias'
    );

    const parameters = {
      options: {
        url: '/v2/resource_aliases',
        method: 'POST',
        body,
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

  /**
   * Get a resource alias.
   *
   * View a resource alias and all of its details, like who created it and the resource instance that it's associated
   * with.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource alias URL-encoded CRN or GUID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAlias>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public getResourceAlias(
    params: ResourceControllerV2.GetResourceAliasParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAlias>> {
    ResourceControllerV2._logger.warn('A deprecated operation has been invoked: getResourceAlias');
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getResourceAlias'
    );

    const parameters = {
      options: {
        url: '/v2/resource_aliases/{id}',
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
   * Delete a resource alias.
   *
   * Delete a resource alias by URL-encoded CRN or GUID. If the resource alias has any resource keys or bindings
   * associated with it, use the `recursive=true` parameter to delete it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource alias URL-encoded CRN or GUID.
   * @param {boolean} [params.recursive] - Deletes the resource bindings and keys associated with the alias.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public deleteResourceAlias(
    params: ResourceControllerV2.DeleteResourceAliasParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.EmptyObject>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: deleteResourceAlias'
    );
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'recursive', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'recursive': _params.recursive,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteResourceAlias'
    );

    const parameters = {
      options: {
        url: '/v2/resource_aliases/{id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update a resource alias.
   *
   * Use the resource alias URL-encoded CRN or GUID to update the resource alias.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource alias URL-encoded CRN or GUID.
   * @param {string} params.name - The new name of the alias. Must be 180 characters or less and cannot include any
   * special characters other than `(space) - . _ :`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAlias>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public updateResourceAlias(
    params: ResourceControllerV2.UpdateResourceAliasParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceAlias>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: updateResourceAlias'
    );
    const _params = { ...params };
    const _requiredParams = ['id', 'name'];
    const _validParams = ['id', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateResourceAlias'
    );

    const parameters = {
      options: {
        url: '/v2/resource_aliases/{id}',
        method: 'PATCH',
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

  /**
   * Get a list of all resource bindings for the alias.
   *
   * View all of the resource bindings associated with a specific resource alias.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The resource alias URL-encoded CRN or GUID.
   * @param {number} [params.limit] - Limit on how many items should be returned.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. Any additional query parameters are ignored if a page token is present. If omitted, the first page of
   * results is returned. This value is obtained from the 'start' query parameter in the 'next_url' field of the
   * operation response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBindingsList>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public listResourceBindingsForAlias(
    params: ResourceControllerV2.ListResourceBindingsForAliasParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ResourceBindingsList>> {
    ResourceControllerV2._logger.warn(
      'A deprecated operation has been invoked: listResourceBindingsForAlias'
    );
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'limit', 'start', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceBindingsForAlias'
    );

    const parameters = {
      options: {
        url: '/v2/resource_aliases/{id}/resource_bindings',
        method: 'GET',
        qs: query,
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
  /*************************
   * resourceReclamations
   ************************/

  /**
   * Get a list of all reclamations.
   *
   * View all of the resource reclamations that exist for every resource instance.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - An alpha-numeric value identifying the account ID.
   * @param {string} [params.resourceInstanceId] - The GUID of the resource instance.
   * @param {string} [params.resourceGroupId] - The ID of the resource group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.ReclamationsList>>}
   */
  public listReclamations(
    params?: ResourceControllerV2.ListReclamationsParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.ReclamationsList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'resourceInstanceId', 'resourceGroupId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'resource_instance_id': _params.resourceInstanceId,
      'resource_group_id': _params.resourceGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listReclamations'
    );

    const parameters = {
      options: {
        url: '/v1/reclamations',
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

  /**
   * Perform a reclamation action.
   *
   * Reclaim a resource instance so that it can no longer be used, or restore the resource instance so that it's usable
   * again.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The ID associated with the reclamation.
   * @param {string} params.actionName - The reclamation action name. Specify `reclaim` to delete a resource, or
   * `restore` to restore a resource.
   * @param {string} [params.requestBy] - The request initiator, if different from the request token.
   * @param {string} [params.comment] - A comment to describe the action.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceControllerV2.Response<ResourceControllerV2.Reclamation>>}
   */
  public runReclamationAction(
    params: ResourceControllerV2.RunReclamationActionParams
  ): Promise<ResourceControllerV2.Response<ResourceControllerV2.Reclamation>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'actionName'];
    const _validParams = ['id', 'actionName', 'requestBy', 'comment', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'request_by': _params.requestBy,
      'comment': _params.comment,
    };

    const path = {
      'id': _params.id,
      'action_name': _params.actionName,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceControllerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'runReclamationAction'
    );

    const parameters = {
      options: {
        url: '/v1/reclamations/{id}/actions/{action_name}',
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

namespace ResourceControllerV2 {
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

  /** Parameters for the `listResourceInstances` operation. */
  export interface ListResourceInstancesParams {
    /** The GUID of the instance. */
    guid?: string;
    /** The human-readable name of the instance. */
    name?: string;
    /** The ID of the resource group. */
    resourceGroupId?: string;
    /** The unique ID of the offering. This value is provided by and stored in the global catalog. */
    resourceId?: string;
    /** The unique ID of the plan associated with the offering. This value is provided by and stored in the global
     *  catalog.
     */
    resourcePlanId?: string;
    /** The type of the instance, for example, `service_instance`. */
    type?: string;
    /** The sub-type of instance, for example, `kms`. */
    subType?: string;
    /** Limit on how many items should be returned. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the 'next_url' field of the operation response.
     */
    start?: string;
    /** The state of the instance. If not specified, instances in state `active` and `provisioning` are returned. */
    state?: ListResourceInstancesConstants.State | string;
    /** Start date inclusive filter. */
    updatedFrom?: string;
    /** End date inclusive filter. */
    updatedTo?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listResourceInstances` operation. */
  export namespace ListResourceInstancesConstants {
    /** The state of the instance. If not specified, instances in state `active` and `provisioning` are returned. */
    export enum State {
      ACTIVE = 'active',
      INACTIVE = 'inactive',
      FAILED = 'failed',
      PENDING_RECLAMATION = 'pending_reclamation',
      PROVISIONING = 'provisioning',
      PRE_PROVISIONING = 'pre_provisioning',
      REMOVED = 'removed',
    }
  }

  /** Parameters for the `createResourceInstance` operation. */
  export interface CreateResourceInstanceParams {
    /** The name of the instance. Must be 180 characters or less and cannot include any special characters other
     *  than `(space) - . _ :`.
     */
    name: string;
    /** The deployment location where the instance should be hosted. */
    target: string;
    /** The ID of the resource group. */
    resourceGroup: string;
    /** The unique ID of the plan associated with the offering. This value is provided by and stored in the global
     *  catalog.
     */
    resourcePlanId: string;
    /** Tags that are attached to the instance after provisioning. These tags can be searched and managed through
     *  the Tagging API in IBM Cloud.
     */
    tags?: string[];
    /** A boolean that dictates if the resource instance should be deleted (cleaned up) during the processing of a
     *  region instance delete call.
     */
    allowCleanup?: boolean;
    /** Configuration options represented as key-value pairs that are passed through to the target resource brokers.
     *  Set the `onetime_credentials` property to specify whether newly created resource key credentials can be
     *  retrieved by using get resource key or get a list of all of the resource keys requests.
     */
    parameters?: JsonObject;
    /** Indicates if the resource instance is locked for further update or delete operations. It does not affect
     *  actions performed on child resources like aliases, bindings or keys. False by default.
     */
    entityLock?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResourceInstance` operation. */
  export interface GetResourceInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteResourceInstance` operation. */
  export interface DeleteResourceInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    /** Will delete resource bindings, keys and aliases associated with the instance. */
    recursive?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateResourceInstance` operation. */
  export interface UpdateResourceInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    /** The new name of the instance. Must be 180 characters or less and cannot include any special characters other
     *  than `(space) - . _ :`.
     */
    name?: string;
    /** The new configuration options for the instance. Set the `onetime_credentials` property to specify whether
     *  newly created resource key credentials can be retrieved by using get resource key or get a list of all of the
     *  resource keys requests.
     */
    parameters?: JsonObject;
    /** The unique ID of the plan associated with the offering. This value is provided by and stored in the global
     *  catalog.
     */
    resourcePlanId?: string;
    /** A boolean that dictates if the resource instance should be deleted (cleaned up) during the processing of a
     *  region instance delete call.
     */
    allowCleanup?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listResourceAliasesForInstance` operation. */
  export interface ListResourceAliasesForInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    /** Limit on how many items should be returned. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the 'next_url' field of the operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listResourceKeysForInstance` operation. */
  export interface ListResourceKeysForInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    /** Limit on how many items should be returned. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the 'next_url' field of the operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `lockResourceInstance` operation. */
  export interface LockResourceInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `unlockResourceInstance` operation. */
  export interface UnlockResourceInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cancelLastopResourceInstance` operation. */
  export interface CancelLastopResourceInstanceParams {
    /** The resource instance URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listResourceKeys` operation. */
  export interface ListResourceKeysParams {
    /** The GUID of the key. */
    guid?: string;
    /** The human-readable name of the key. */
    name?: string;
    /** The ID of the resource group. */
    resourceGroupId?: string;
    /** The unique ID of the offering. This value is provided by and stored in the global catalog. */
    resourceId?: string;
    /** Limit on how many items should be returned. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the 'next_url' field of the operation response.
     */
    start?: string;
    /** Start date inclusive filter. */
    updatedFrom?: string;
    /** End date inclusive filter. */
    updatedTo?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createResourceKey` operation. */
  export interface CreateResourceKeyParams {
    /** The name of the key. */
    name: string;
    /** The ID of resource instance or alias. */
    source: string;
    /** Configuration options represented as key-value pairs. Service defined options are passed through to the
     *  target resource brokers, whereas platform defined options are not.
     */
    parameters?: ResourceKeyPostParameters;
    /** The base IAM service role name (Reader, Writer, or Manager), or the service or custom role CRN. Refer to
     *  service’s documentation for supported roles.
     */
    role?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResourceKey` operation. */
  export interface GetResourceKeyParams {
    /** The resource key URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteResourceKey` operation. */
  export interface DeleteResourceKeyParams {
    /** The resource key URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateResourceKey` operation. */
  export interface UpdateResourceKeyParams {
    /** The resource key URL-encoded CRN or GUID. */
    id: string;
    /** The new name of the key. Must be 180 characters or less and cannot include any special characters other than
     *  `(space) - . _ :`.
     */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listResourceBindings` operation. */
  export interface ListResourceBindingsParams {
    /** The GUID of the binding. */
    guid?: string;
    /** The human-readable name of the binding. */
    name?: string;
    /** The ID of the resource group. */
    resourceGroupId?: string;
    /** The unique ID of the offering (service name). This value is provided by and stored in the global catalog. */
    resourceId?: string;
    /** The ID of the binding in the target environment. For example, `service_binding_id` in a given IBM Cloud
     *  environment.
     */
    regionBindingId?: string;
    /** Limit on how many items should be returned. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the 'next_url' field of the operation response.
     */
    start?: string;
    /** Start date inclusive filter. */
    updatedFrom?: string;
    /** End date inclusive filter. */
    updatedTo?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createResourceBinding` operation. */
  export interface CreateResourceBindingParams {
    /** The ID of resource alias. */
    source: string;
    /** The CRN of application to bind to in a specific environment, for example, Dallas YP, CFEE instance. */
    target: string;
    /** The name of the binding. Must be 180 characters or less and cannot include any special characters other than
     *  `(space) - . _ :`.
     */
    name?: string;
    /** Configuration options represented as key-value pairs. Service defined options are passed through to the
     *  target resource brokers, whereas platform defined options are not.
     */
    parameters?: ResourceBindingPostParameters;
    /** The base IAM service role name (Reader, Writer, or Manager), or the service or custom role CRN. Refer to
     *  service’s documentation for supported roles.
     */
    role?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResourceBinding` operation. */
  export interface GetResourceBindingParams {
    /** The resource binding URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteResourceBinding` operation. */
  export interface DeleteResourceBindingParams {
    /** The resource binding URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateResourceBinding` operation. */
  export interface UpdateResourceBindingParams {
    /** The resource binding URL-encoded CRN or GUID. */
    id: string;
    /** The new name of the binding. Must be 180 characters or less and cannot include any special characters other
     *  than `(space) - . _ :`.
     */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listResourceAliases` operation. */
  export interface ListResourceAliasesParams {
    /** The GUID of the alias. */
    guid?: string;
    /** The human-readable name of the alias. */
    name?: string;
    /** The ID of the resource instance. */
    resourceInstanceId?: string;
    /** The ID of the instance in the target environment. For example, `service_instance_id` in a given IBM Cloud
     *  environment.
     */
    regionInstanceId?: string;
    /** The unique ID of the offering (service name). This value is provided by and stored in the global catalog. */
    resourceId?: string;
    /** The ID of the resource group. */
    resourceGroupId?: string;
    /** Limit on how many items should be returned. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the 'next_url' field of the operation response.
     */
    start?: string;
    /** Start date inclusive filter. */
    updatedFrom?: string;
    /** End date inclusive filter. */
    updatedTo?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createResourceAlias` operation. */
  export interface CreateResourceAliasParams {
    /** The name of the alias. Must be 180 characters or less and cannot include any special characters other than
     *  `(space) - . _ :`.
     */
    name: string;
    /** The ID of resource instance. */
    source: string;
    /** The CRN of target name(space) in a specific environment, for example, space in Dallas YP, CFEE instance etc. */
    target: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResourceAlias` operation. */
  export interface GetResourceAliasParams {
    /** The resource alias URL-encoded CRN or GUID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteResourceAlias` operation. */
  export interface DeleteResourceAliasParams {
    /** The resource alias URL-encoded CRN or GUID. */
    id: string;
    /** Deletes the resource bindings and keys associated with the alias. */
    recursive?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateResourceAlias` operation. */
  export interface UpdateResourceAliasParams {
    /** The resource alias URL-encoded CRN or GUID. */
    id: string;
    /** The new name of the alias. Must be 180 characters or less and cannot include any special characters other
     *  than `(space) - . _ :`.
     */
    name: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listResourceBindingsForAlias` operation. */
  export interface ListResourceBindingsForAliasParams {
    /** The resource alias URL-encoded CRN or GUID. */
    id: string;
    /** Limit on how many items should be returned. */
    limit?: number;
    /** An optional token that indicates the beginning of the page of results to be returned. Any additional query
     *  parameters are ignored if a page token is present. If omitted, the first page of results is returned. This value
     *  is obtained from the 'start' query parameter in the 'next_url' field of the operation response.
     */
    start?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listReclamations` operation. */
  export interface ListReclamationsParams {
    /** An alpha-numeric value identifying the account ID. */
    accountId?: string;
    /** The GUID of the resource instance. */
    resourceInstanceId?: string;
    /** The ID of the resource group. */
    resourceGroupId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `runReclamationAction` operation. */
  export interface RunReclamationActionParams {
    /** The ID associated with the reclamation. */
    id: string;
    /** The reclamation action name. Specify `reclaim` to delete a resource, or `restore` to restore a resource. */
    actionName: string;
    /** The request initiator, if different from the request token. */
    requestBy?: string;
    /** A comment to describe the action. */
    comment?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * The credentials for a resource.
   *
   * This type supports additional properties of type any. Additional key-value pairs from the resource broker.
   */
  export interface Credentials {
    /** If present, the user doesn't have the correct access to view the credentials and the details are redacted.
     *  The string value identifies the level of access that's required to view the credential. For additional
     *  information, see [viewing a
     *  credential](https://cloud.ibm.com/docs/account?topic=account-service_credentials&interface=ui#viewing-credentials-ui).
     */
    REDACTED?: Credentials.Constants.Redacted | string;
    /** The API key for the credentials. */
    apikey?: string;
    /** The optional description of the API key. */
    iam_apikey_description?: string;
    /** The name of the API key. */
    iam_apikey_name?: string;
    /** The Cloud Resource Name for the role of the credentials. */
    iam_role_crn?: string;
    /** The Cloud Resource Name for the service ID of the credentials. */
    iam_serviceid_crn?: string;

    /**
     * Credentials accepts additional properties of type any. Additional key-value pairs from the resource broker.
     */
    [propName: string]: any;
  }
  export namespace Credentials {
    export namespace Constants {
      /** If present, the user doesn't have the correct access to view the credentials and the details are redacted.  The string value identifies the level of access that's required to view the credential. For additional information, see [viewing a credential](https://cloud.ibm.com/docs/account?topic=account-service_credentials&interface=ui#viewing-credentials-ui). */
      export enum Redacted {
        REDACTED = 'REDACTED',
        REDACTED_EXPLICIT = 'REDACTED_EXPLICIT',
      }
    }
  }

  /**
   * An element of the plan history of the instance.
   */
  export interface PlanHistoryItem {
    /** The unique ID of the plan associated with the offering. This value is provided by and stored in the global
     *  catalog.
     */
    resource_plan_id: string;
    /** The date on which the plan was changed. */
    start_date: string;
    /** The subject who made the plan change. */
    requestor_id?: string;
  }

  /**
   * A reclamation.
   */
  export interface Reclamation {
    /** The ID associated with the reclamation. */
    id?: string;
    /** The ID of the entity for the reclamation. */
    entity_id?: string;
    /** The ID of the entity type for the reclamation. */
    entity_type_id?: string;
    /** The full Cloud Resource Name (CRN) associated with the binding. For more information about this format, see
     *  [Cloud Resource Names](https://cloud.ibm.com/docs/overview?topic=overview-crn).
     */
    entity_crn?: string;
    /** The ID of the resource instance. */
    resource_instance_id?: string;
    /** The ID of the resource group. */
    resource_group_id?: string;
    /** An alpha-numeric value identifying the account ID. */
    account_id?: string;
    /** The ID of policy for the reclamation. */
    policy_id?: string;
    /** The state of the reclamation. */
    state?: string;
    /** The target time that the reclamation retention period end. */
    target_time?: string;
    /** The custom properties of the reclamation. */
    custom_properties?: JsonObject;
    /** The date when the reclamation was created. */
    created_at?: string;
    /** The subject who created the reclamation. */
    created_by?: string;
    /** The date when the reclamation was last updated. */
    updated_at?: string;
    /** The subject who updated the reclamation. */
    updated_by?: string;
  }

  /**
   * A list of reclamations.
   */
  export interface ReclamationsList {
    /** A list of reclamations. */
    resources?: Reclamation[];
  }

  /**
   * A resource alias.
   */
  export interface ResourceAlias {
    /** The ID associated with the alias. */
    id?: string;
    /** The GUID of the alias. */
    guid?: string;
    /** When you created a new alias, a relative URL path is created identifying the location of the alias. */
    url?: string;
    /** The date when the alias was created. */
    created_at?: string;
    /** The date when the alias was last updated. */
    updated_at?: string;
    /** The date when the alias was deleted. */
    deleted_at?: string;
    /** The subject who created the alias. */
    created_by?: string;
    /** The subject who updated the alias. */
    updated_by?: string;
    /** The subject who deleted the alias. */
    deleted_by?: string;
    /** The human-readable name of the alias. */
    name?: string;
    /** The ID of the resource instance that is being aliased. */
    resource_instance_id?: string;
    /** The CRN of the target namespace in the specific environment. */
    target_crn?: string;
    /** An alpha-numeric value identifying the account ID. */
    account_id?: string;
    /** The unique ID of the offering. This value is provided by and stored in the global catalog. */
    resource_id?: string;
    /** The ID of the resource group. */
    resource_group_id?: string;
    /** The CRN of the alias. For more information about this format, see [Cloud Resource
     *  Names](https://cloud.ibm.com/docs/overview?topic=overview-crn).
     */
    crn?: string;
    /** The ID of the instance in the target environment. For example, `service_instance_id` in a given IBM Cloud
     *  environment.
     */
    region_instance_id?: string;
    /** The CRN of the instance in the target environment. */
    region_instance_crn?: string;
    /** The state of the alias. */
    state?: string;
    /** A boolean that dictates if the alias was migrated from a previous CF instance. */
    migrated?: boolean;
    /** The relative path to the resource instance. */
    resource_instance_url?: string;
    /** The relative path to the resource bindings for the alias. */
    resource_bindings_url?: string;
    /** The relative path to the resource keys for the alias. */
    resource_keys_url?: string;
  }

  /**
   * A list of resource aliases.
   */
  export interface ResourceAliasesList {
    /** The number of resource aliases in `resources`. */
    rows_count: number;
    /** The URL for requesting the next page of results. */
    next_url: string;
    /** A list of resource aliases. */
    resources: ResourceAlias[];
  }

  /**
   * A resource binding.
   */
  export interface ResourceBinding {
    /** The ID associated with the binding. */
    id?: string;
    /** The GUID of the binding. */
    guid?: string;
    /** When you provision a new binding, a relative URL path is created identifying the location of the binding. */
    url?: string;
    /** The date when the binding was created. */
    created_at?: string;
    /** The date when the binding was last updated. */
    updated_at?: string;
    /** The date when the binding was deleted. */
    deleted_at?: string;
    /** The subject who created the binding. */
    created_by?: string;
    /** The subject who updated the binding. */
    updated_by?: string;
    /** The subject who deleted the binding. */
    deleted_by?: string;
    /** The CRN of resource alias associated to the binding. */
    source_crn?: string;
    /** The CRN of target resource, for example, application, in a specific environment. */
    target_crn?: string;
    /** The full Cloud Resource Name (CRN) associated with the binding. For more information about this format, see
     *  [Cloud Resource Names](https://cloud.ibm.com/docs/overview?topic=overview-crn).
     */
    crn?: string;
    /** The ID of the binding in the target environment. For example, `service_binding_id` in a given IBM Cloud
     *  environment.
     */
    region_binding_id?: string;
    /** The CRN of the binding in the target environment. */
    region_binding_crn?: string;
    /** The human-readable name of the binding. */
    name?: string;
    /** An alpha-numeric value identifying the account ID. */
    account_id?: string;
    /** The ID of the resource group. */
    resource_group_id?: string;
    /** The state of the binding. */
    state?: string;
    /** The credentials for the binding. Additional key-value pairs are passed through from the resource brokers.
     *  After a credential is created for a service, it can be viewed at any time for users that need the API key value.
     *  However, all users must have the correct level of access to see the details of a credential that includes the
     *  API key value. For additional details, see [viewing a
     *  credential](https://cloud.ibm.com/docs/account?topic=account-service_credentials&interface=ui#viewing-credentials-ui)
     *  or the service’s documentation.
     */
    credentials?: Credentials;
    /** Specifies whether the binding’s credentials support IAM. */
    iam_compatible?: boolean;
    /** The unique ID of the offering. This value is provided by and stored in the global catalog. */
    resource_id?: string;
    /** A boolean that dictates if the alias was migrated from a previous CF instance. */
    migrated?: boolean;
    /** The relative path to the resource alias that this binding is associated with. */
    resource_alias_url?: string;
  }

  /**
   * Configuration options represented as key-value pairs. Service defined options are passed through to the target
   * resource brokers, whereas platform defined options are not.
   *
   * This type supports additional properties of type any.
   */
  export interface ResourceBindingPostParameters {
    /** An optional platform defined option to reuse an existing IAM serviceId for the role assignment. */
    serviceid_crn?: string;

    /**
     * ResourceBindingPostParameters accepts additional properties of type any.
     */
    [propName: string]: any;
  }

  /**
   * A list of resource bindings.
   */
  export interface ResourceBindingsList {
    /** The number of resource bindings in `resources`. */
    rows_count: number;
    /** The URL for requesting the next page of results. */
    next_url: string;
    /** A list of resource bindings. */
    resources: ResourceBinding[];
  }

  /**
   * A resource instance.
   */
  export interface ResourceInstance {
    /** The ID associated with the instance. */
    id?: string;
    /** The GUID of the instance. */
    guid?: string;
    /** When you provision a new resource, a relative URL path is created identifying the location of the instance. */
    url?: string;
    /** The date when the instance was created. */
    created_at?: string;
    /** The date when the instance was last updated. */
    updated_at?: string;
    /** The date when the instance was deleted. */
    deleted_at?: string;
    /** The subject who created the instance. */
    created_by?: string;
    /** The subject who updated the instance. */
    updated_by?: string;
    /** The subject who deleted the instance. */
    deleted_by?: string;
    /** The date when the instance was scheduled for reclamation. */
    scheduled_reclaim_at?: string;
    /** The date when the instance under reclamation was restored. */
    restored_at?: string;
    /** The subject who restored the instance back from reclamation. */
    restored_by?: string;
    /** The subject who initiated the instance reclamation. */
    scheduled_reclaim_by?: string;
    /** The human-readable name of the instance. */
    name?: string;
    /** The deployment location where the instance was provisioned. */
    region_id?: string;
    /** An alpha-numeric value identifying the account ID. */
    account_id?: string;
    /** The unique ID of the reseller channel where the instance was provisioned from. */
    reseller_channel_id?: string;
    /** The unique ID of the plan associated with the offering. This value is provided by and stored in the global
     *  catalog.
     */
    resource_plan_id?: string;
    /** The ID of the resource group. */
    resource_group_id?: string;
    /** The CRN of the resource group. */
    resource_group_crn?: string;
    /** The deployment CRN as defined in the global catalog. The Cloud Resource Name (CRN) of the deployment
     *  location where the instance is provisioned.
     */
    target_crn?: string;
    /** Whether newly created resource key credentials can be retrieved by using get resource key or get a list of
     *  all of the resource keys requests.
     */
    onetime_credentials?: boolean;
    /** The current configuration parameters of the instance. */
    parameters?: JsonObject;
    /** A boolean that dictates if the resource instance should be deleted (cleaned up) during the processing of a
     *  region instance delete call.
     */
    allow_cleanup?: boolean;
    /** The full Cloud Resource Name (CRN) associated with the instance. For more information about this format, see
     *  [Cloud Resource Names](https://cloud.ibm.com/docs/overview?topic=overview-crn).
     */
    crn?: string;
    /** The current state of the instance. For example, if the instance is deleted, it will return removed. */
    state?: ResourceInstance.Constants.State | string;
    /** The type of the instance, for example, `service_instance`. */
    type?: string;
    /** The sub-type of instance, for example, `cfaas`. */
    sub_type?: string;
    /** The unique ID of the offering. This value is provided by and stored in the global catalog. */
    resource_id?: string;
    /** The resource-broker-provided URL to access administrative features of the instance. */
    dashboard_url?: string;
    /** The status of the last operation requested on the instance. */
    last_operation?: ResourceInstanceLastOperation;
    /** Deprecated: The relative path to the resource aliases for the instance. */
    resource_aliases_url?: string;
    /** Deprecated: The relative path to the resource bindings for the instance. */
    resource_bindings_url?: string;
    /** The relative path to the resource keys for the instance. */
    resource_keys_url?: string;
    /** The plan history of the instance. */
    plan_history?: PlanHistoryItem[];
    /** A boolean that dictates if the resource instance was migrated from a previous CF instance. */
    migrated?: boolean;
    /** Additional instance properties, contributed by the service and/or platform, are represented as key-value
     *  pairs.
     */
    extensions?: JsonObject;
    /** The CRN of the resource that has control of the instance. */
    controlled_by?: string;
    /** A boolean that dictates if the resource instance is locked or not. */
    locked?: boolean;
  }
  export namespace ResourceInstance {
    export namespace Constants {
      /** The current state of the instance. For example, if the instance is deleted, it will return removed. */
      export enum State {
        ACTIVE = 'active',
        INACTIVE = 'inactive',
        REMOVED = 'removed',
        PENDING_REMOVAL = 'pending_removal',
        PENDING_RECLAMATION = 'pending_reclamation',
        FAILED = 'failed',
        PROVISIONING = 'provisioning',
        PRE_PROVISIONING = 'pre_provisioning',
      }
    }
  }

  /**
   * The status of the last operation requested on the instance.
   *
   * This type supports additional properties of type any.
   */
  export interface ResourceInstanceLastOperation {
    /** The last operation type of the resource instance. */
    type: string;
    /** The last operation state of the resoure instance. This indicates if the resource's last operation is in
     *  progress, succeeded or failed.
     */
    state: ResourceInstanceLastOperation.Constants.State | string;
    /** The last operation sub type of the resoure instance. */
    sub_type?: string;
    /** A boolean that indicates if the resource is provisioned asynchronously or not. */
    async: boolean;
    /** The description of the status of last operation. */
    description: string;
    /** Optional string that states the reason code for the last operation state change. */
    reason_code?: string;
    /** A field which indicates the time after which the instance's last operation is to be polled. */
    poll_after?: number;
    /** A boolean that indicates if the resource's last operation is cancelable or not. */
    cancelable: boolean;
    /** A boolean that indicates if the resource broker's last operation can be polled or not. */
    poll: boolean;

    /**
     * ResourceInstanceLastOperation accepts additional properties of type any.
     */
    [propName: string]: any;
  }
  export namespace ResourceInstanceLastOperation {
    export namespace Constants {
      /** The last operation state of the resoure instance. This indicates if the resource's last operation is in progress, succeeded or failed. */
      export enum State {
        IN_PROGRESS = 'in progress',
        SUCCEEDED = 'succeeded',
        FAILED = 'failed',
      }
    }
  }

  /**
   * A list of resource instances.
   */
  export interface ResourceInstancesList {
    /** The number of resource instances in `resources`. */
    rows_count: number;
    /** The URL for requesting the next page of results. */
    next_url: string;
    /** A list of resource instances. */
    resources: ResourceInstance[];
  }

  /**
   * A resource key.
   */
  export interface ResourceKey {
    /** The ID associated with the key. */
    id?: string;
    /** The GUID of the key. */
    guid?: string;
    /** When you created a new key, a relative URL path is created identifying the location of the key. */
    url?: string;
    /** The date when the key was created. */
    created_at?: string;
    /** The date when the key was last updated. */
    updated_at?: string;
    /** The date when the key was deleted. */
    deleted_at?: string;
    /** The subject who created the key. */
    created_by?: string;
    /** The subject who updated the key. */
    updated_by?: string;
    /** The subject who deleted the key. */
    deleted_by?: string;
    /** The CRN of resource instance or alias associated to the key. */
    source_crn?: string;
    /** The human-readable name of the key. */
    name?: string;
    /** The full Cloud Resource Name (CRN) associated with the key. For more information about this format, see
     *  [Cloud Resource Names](https://cloud.ibm.com/docs/overview?topic=overview-crn).
     */
    crn?: string;
    /** The state of the key. */
    state?: string;
    /** An alpha-numeric value identifying the account ID. */
    account_id?: string;
    /** The ID of the resource group. */
    resource_group_id?: string;
    /** The unique ID of the offering. This value is provided by and stored in the global catalog. */
    resource_id?: string;
    /** Whether newly created resource key credentials can be retrieved by using get resource key or get a list of
     *  all of the resource keys requests.
     */
    onetime_credentials?: boolean;
    /** The credentials for the key. Additional key-value pairs are passed through from the resource brokers. After
     *  a credential is created for a service, it can be viewed at any time for users that need the API key value.
     *  However, all users must have the correct level of access to see the details of a credential that includes the
     *  API key value. For additional details, see [viewing a
     *  credential](https://cloud.ibm.com/docs/account?topic=account-service_credentials&interface=ui#viewing-credentials-ui)
     *  or the service’s documentation.
     */
    credentials?: Credentials;
    /** Specifies whether the key’s credentials support IAM. */
    iam_compatible?: boolean;
    /** A boolean that dictates if the alias was migrated from a previous CF instance. */
    migrated?: boolean;
    /** The relative path to the resource. */
    resource_instance_url?: string;
    /** The relative path to the resource alias that this binding is associated with. */
    resource_alias_url?: string;
  }

  /**
   * Configuration options represented as key-value pairs. Service defined options are passed through to the target
   * resource brokers, whereas platform defined options are not.
   *
   * This type supports additional properties of type any.
   */
  export interface ResourceKeyPostParameters {
    /** An optional platform defined option to reuse an existing IAM serviceId for the role assignment. */
    serviceid_crn?: string;

    /**
     * ResourceKeyPostParameters accepts additional properties of type any.
     */
    [propName: string]: any;
  }

  /**
   * A list of resource keys.
   */
  export interface ResourceKeysList {
    /** The number of resource keys in `resources`. */
    rows_count: number;
    /** The URL for requesting the next page of results. */
    next_url: string;
    /** A list of resource keys. */
    resources: ResourceKey[];
  }

  /*************************
   * pager classes
   ************************/

  /**
   * ResourceInstancesPager can be used to simplify the use of listResourceInstances().
   */
  export class ResourceInstancesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceControllerV2;

    protected params: ResourceControllerV2.ListResourceInstancesParams;

    /**
     * Construct a ResourceInstancesPager object.
     *
     * @param {ResourceControllerV2}  client - The service client instance used to invoke listResourceInstances()
     * @param {Object} [params] - The parameters to be passed to listResourceInstances()
     * @constructor
     * @returns {ResourceInstancesPager}
     */
    constructor(
      client: ResourceControllerV2,
      params?: ResourceControllerV2.ListResourceInstancesParams
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
     * Returns the next page of results by invoking listResourceInstances().
     * @returns {Promise<ResourceControllerV2.ResourceInstance[]>}
     */
    public async getNext(): Promise<ResourceControllerV2.ResourceInstance[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listResourceInstances(this.params);
      const { result } = response;

      let next;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, 'start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listResourceInstances() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceControllerV2.ResourceInstance[]>}
     */
    public async getAll(): Promise<ResourceControllerV2.ResourceInstance[]> {
      const results: ResourceInstance[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ResourceAliasesForInstancePager can be used to simplify the use of listResourceAliasesForInstance().
   */
  export class ResourceAliasesForInstancePager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceControllerV2;

    protected params: ResourceControllerV2.ListResourceAliasesForInstanceParams;

    /**
     * Construct a ResourceAliasesForInstancePager object.
     *
     * @param {ResourceControllerV2}  client - The service client instance used to invoke listResourceAliasesForInstance()
     * @param {Object} params - The parameters to be passed to listResourceAliasesForInstance()
     * @constructor
     * @returns {ResourceAliasesForInstancePager}
     */
    constructor(
      client: ResourceControllerV2,
      params: ResourceControllerV2.ListResourceAliasesForInstanceParams
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
     * Returns the next page of results by invoking listResourceAliasesForInstance().
     * @returns {Promise<ResourceControllerV2.ResourceAlias[]>}
     */
    public async getNext(): Promise<ResourceControllerV2.ResourceAlias[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listResourceAliasesForInstance(this.params);
      const { result } = response;

      let next;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, 'start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listResourceAliasesForInstance() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceControllerV2.ResourceAlias[]>}
     */
    public async getAll(): Promise<ResourceControllerV2.ResourceAlias[]> {
      const results: ResourceAlias[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ResourceKeysForInstancePager can be used to simplify the use of listResourceKeysForInstance().
   */
  export class ResourceKeysForInstancePager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceControllerV2;

    protected params: ResourceControllerV2.ListResourceKeysForInstanceParams;

    /**
     * Construct a ResourceKeysForInstancePager object.
     *
     * @param {ResourceControllerV2}  client - The service client instance used to invoke listResourceKeysForInstance()
     * @param {Object} params - The parameters to be passed to listResourceKeysForInstance()
     * @constructor
     * @returns {ResourceKeysForInstancePager}
     */
    constructor(
      client: ResourceControllerV2,
      params: ResourceControllerV2.ListResourceKeysForInstanceParams
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
     * Returns the next page of results by invoking listResourceKeysForInstance().
     * @returns {Promise<ResourceControllerV2.ResourceKey[]>}
     */
    public async getNext(): Promise<ResourceControllerV2.ResourceKey[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listResourceKeysForInstance(this.params);
      const { result } = response;

      let next;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, 'start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listResourceKeysForInstance() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceControllerV2.ResourceKey[]>}
     */
    public async getAll(): Promise<ResourceControllerV2.ResourceKey[]> {
      const results: ResourceKey[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ResourceKeysPager can be used to simplify the use of listResourceKeys().
   */
  export class ResourceKeysPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceControllerV2;

    protected params: ResourceControllerV2.ListResourceKeysParams;

    /**
     * Construct a ResourceKeysPager object.
     *
     * @param {ResourceControllerV2}  client - The service client instance used to invoke listResourceKeys()
     * @param {Object} [params] - The parameters to be passed to listResourceKeys()
     * @constructor
     * @returns {ResourceKeysPager}
     */
    constructor(
      client: ResourceControllerV2,
      params?: ResourceControllerV2.ListResourceKeysParams
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
     * Returns the next page of results by invoking listResourceKeys().
     * @returns {Promise<ResourceControllerV2.ResourceKey[]>}
     */
    public async getNext(): Promise<ResourceControllerV2.ResourceKey[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listResourceKeys(this.params);
      const { result } = response;

      let next;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, 'start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listResourceKeys() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceControllerV2.ResourceKey[]>}
     */
    public async getAll(): Promise<ResourceControllerV2.ResourceKey[]> {
      const results: ResourceKey[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ResourceBindingsPager can be used to simplify the use of listResourceBindings().
   */
  export class ResourceBindingsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceControllerV2;

    protected params: ResourceControllerV2.ListResourceBindingsParams;

    /**
     * Construct a ResourceBindingsPager object.
     *
     * @param {ResourceControllerV2}  client - The service client instance used to invoke listResourceBindings()
     * @param {Object} [params] - The parameters to be passed to listResourceBindings()
     * @constructor
     * @returns {ResourceBindingsPager}
     */
    constructor(
      client: ResourceControllerV2,
      params?: ResourceControllerV2.ListResourceBindingsParams
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
     * Returns the next page of results by invoking listResourceBindings().
     * @returns {Promise<ResourceControllerV2.ResourceBinding[]>}
     */
    public async getNext(): Promise<ResourceControllerV2.ResourceBinding[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listResourceBindings(this.params);
      const { result } = response;

      let next;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, 'start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listResourceBindings() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceControllerV2.ResourceBinding[]>}
     */
    public async getAll(): Promise<ResourceControllerV2.ResourceBinding[]> {
      const results: ResourceBinding[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ResourceAliasesPager can be used to simplify the use of listResourceAliases().
   */
  export class ResourceAliasesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceControllerV2;

    protected params: ResourceControllerV2.ListResourceAliasesParams;

    /**
     * Construct a ResourceAliasesPager object.
     *
     * @param {ResourceControllerV2}  client - The service client instance used to invoke listResourceAliases()
     * @param {Object} [params] - The parameters to be passed to listResourceAliases()
     * @constructor
     * @returns {ResourceAliasesPager}
     */
    constructor(
      client: ResourceControllerV2,
      params?: ResourceControllerV2.ListResourceAliasesParams
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
     * Returns the next page of results by invoking listResourceAliases().
     * @returns {Promise<ResourceControllerV2.ResourceAlias[]>}
     */
    public async getNext(): Promise<ResourceControllerV2.ResourceAlias[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listResourceAliases(this.params);
      const { result } = response;

      let next;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, 'start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listResourceAliases() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceControllerV2.ResourceAlias[]>}
     */
    public async getAll(): Promise<ResourceControllerV2.ResourceAlias[]> {
      const results: ResourceAlias[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ResourceBindingsForAliasPager can be used to simplify the use of listResourceBindingsForAlias().
   */
  export class ResourceBindingsForAliasPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: ResourceControllerV2;

    protected params: ResourceControllerV2.ListResourceBindingsForAliasParams;

    /**
     * Construct a ResourceBindingsForAliasPager object.
     *
     * @param {ResourceControllerV2}  client - The service client instance used to invoke listResourceBindingsForAlias()
     * @param {Object} params - The parameters to be passed to listResourceBindingsForAlias()
     * @constructor
     * @returns {ResourceBindingsForAliasPager}
     */
    constructor(
      client: ResourceControllerV2,
      params: ResourceControllerV2.ListResourceBindingsForAliasParams
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
     * Returns the next page of results by invoking listResourceBindingsForAlias().
     * @returns {Promise<ResourceControllerV2.ResourceBinding[]>}
     */
    public async getNext(): Promise<ResourceControllerV2.ResourceBinding[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listResourceBindingsForAlias(this.params);
      const { result } = response;

      let next;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, 'start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listResourceBindingsForAlias() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<ResourceControllerV2.ResourceBinding[]>}
     */
    public async getAll(): Promise<ResourceControllerV2.ResourceBinding[]> {
      const results: ResourceBinding[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = ResourceControllerV2;
