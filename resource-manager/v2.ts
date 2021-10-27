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
 * IBM OpenAPI SDK Code Generator Version: 3.41.0-f1ef0102-20211018-193503
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
 * Manage lifecycle of your Cloud resource groups using Resource Manager APIs.
 *
 * API Version: 2.0
 */

class ResourceManagerV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://resource-controller.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'resource_manager';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ResourceManagerV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ResourceManagerV2}
   */

  public static newInstance(options: UserOptions): ResourceManagerV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ResourceManagerV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a ResourceManagerV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ResourceManagerV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ResourceManagerV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * resourceGroup
   ************************/

  /**
   * Get a list of all resource groups.
   *
   * Call this method to retrieve information about all resource groups and associated quotas in an account. The `id`
   * returned in the response can be used to [create a resource instance
   * later](https://cloud.ibm.com/apidocs/resource-controller/resource-controller?code=java#create-resource-instance).
   * The response can be filtered based on queryParams such as `account_id`, `name`, `default`, and more to narrow your
   * search.Users need to be assigned IAM policies with the Viewer role or higher on the targeted resource groups.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - The ID of the account that contains the resource groups that you want to get.
   * @param {string} [params.date] - The date in the format of YYYY-MM which returns resource groups. Deleted resource
   * groups will be excluded before this month.
   * @param {string} [params.name] - The name of the resource group.
   * @param {boolean} [params._default] - Boolean value to specify whether or not to list default resource groups.
   * @param {boolean} [params.includeDeleted] - Boolean value to specify whether or not to list default resource groups.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceManagerV2.Response<ResourceManagerV2.ResourceGroupList>>}
   */
  public listResourceGroups(
    params?: ResourceManagerV2.ListResourceGroupsParams
  ): Promise<ResourceManagerV2.Response<ResourceManagerV2.ResourceGroupList>> {
    const _params = { ...params };

    const query = {
      'account_id': _params.accountId,
      'date': _params.date,
      'name': _params.name,
      'default': _params._default,
      'include_deleted': _params.includeDeleted,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listResourceGroups'
    );

    const parameters = {
      options: {
        url: '/v2/resource_groups',
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
   * Create a resource group.
   *
   * Create a resource group in an account to organize your account resources in customizable groupings so that you can
   * quickly assign users access to more than one resource at a time. To learn what makes a good resource group
   * strategy, see [Best practices for organizing
   * resources](https://cloud.ibm.com/docs/account?topic=account-account_setup). A default resource group is created
   * when an account is created. If you have a Lite account or 30-day trial, you cannot create extra resource groups,
   * but you can rename your default resource group. If you have a Pay-As-You-Go or Subscription account, you can create
   * multiple resource groups. You must be assigned an IAM policy with the Administrator role on All Account Management
   * services to create extra resource groups.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The new name of the resource group.
   * @param {string} [params.accountId] - The account id of the resource group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceManagerV2.Response<ResourceManagerV2.ResCreateResourceGroup>>}
   */
  public createResourceGroup(
    params?: ResourceManagerV2.CreateResourceGroupParams
  ): Promise<ResourceManagerV2.Response<ResourceManagerV2.ResCreateResourceGroup>> {
    const _params = { ...params };

    const body = {
      'name': _params.name,
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createResourceGroup'
    );

    const parameters = {
      options: {
        url: '/v2/resource_groups',
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
   * Get a resource group.
   *
   * Retrieve a resource group by alias ID. Call this method to get details about a particular resource group, like the
   * name of the resource group, associated quotas, whether the state is active, the resource group ID and the CRN. The
   * `id` returned in the response can be used to [create a resource instance
   * later](https://cloud.ibm.com/apidocs/resource-controller/resource-controller?code=java#create-resource-instance).
   * Users need to be assigned an IAM policy with the Viewer role or higher on the targeted resource group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The short or long ID of the alias.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceManagerV2.Response<ResourceManagerV2.ResourceGroup>>}
   */
  public getResourceGroup(
    params: ResourceManagerV2.GetResourceGroupParams
  ): Promise<ResourceManagerV2.Response<ResourceManagerV2.ResourceGroup>> {
    const _params = { ...params };
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getResourceGroup'
    );

    const parameters = {
      options: {
        url: '/v2/resource_groups/{id}',
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
   * Update a resource group.
   *
   * Update a resource group by the alias ID. Call this method to update information about an existing resource group.
   * You can rename a resource group and activate or suspend a particular resource group. To update a resource group,
   * users need to be assigned with IAM policies with the Editor role or higher.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The short or long ID of the alias.
   * @param {string} [params.name] - The new name of the resource group.
   * @param {string} [params.state] - The state of the resource group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceManagerV2.Response<ResourceManagerV2.ResourceGroup>>}
   */
  public updateResourceGroup(
    params: ResourceManagerV2.UpdateResourceGroupParams
  ): Promise<ResourceManagerV2.Response<ResourceManagerV2.ResourceGroup>> {
    const _params = { ...params };
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'name': _params.name,
      'state': _params.state,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateResourceGroup'
    );

    const parameters = {
      options: {
        url: '/v2/resource_groups/{id}',
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
   * Delete a resource group.
   *
   * Delete a resource group by the alias ID. You can delete a resource group only if the targeted resource group does
   * not contain any resources or if it is not a default resource group. When a user creates an account, a default
   * resource group is created in the account. If you want to delete a resource group that contains resources, first
   * [delete the resource
   * instances](https://cloud.ibm.com/apidocs/resource-controller/resource-controller?code=java#delete-resource-instance).
   * Then, delete the resource group when all resource instances in the group are deleted. Users need to be assigned an
   * IAM policy with the Editor role or higher on the targeted resource group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The short or long ID of the alias.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceManagerV2.Response<ResourceManagerV2.Empty>>}
   */
  public deleteResourceGroup(
    params: ResourceManagerV2.DeleteResourceGroupParams
  ): Promise<ResourceManagerV2.Response<ResourceManagerV2.Empty>> {
    const _params = { ...params };
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteResourceGroup'
    );

    const parameters = {
      options: {
        url: '/v2/resource_groups/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {}, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * quotaDefinition
   ************************/

  /**
   * List quota definitions.
   *
   * Get a list of all quota definitions. Quotas for a resource group limit the number of apps, instances, and memory
   * allowed for that specific resource group. Each resource group that you have on your account has a specific set of
   * quotas. Standard quotas are for resource groups that are created by users with a Lite account, and Pay-As-You-Go
   * quotas are for resource groups that are created with a Pay-As-You-Go account. This method provides list of all
   * available quota definitions. No specific IAM policy needed.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceManagerV2.Response<ResourceManagerV2.QuotaDefinitionList>>}
   */
  public listQuotaDefinitions(
    params?: ResourceManagerV2.ListQuotaDefinitionsParams
  ): Promise<ResourceManagerV2.Response<ResourceManagerV2.QuotaDefinitionList>> {
    const _params = { ...params };

    const sdkHeaders = getSdkHeaders(
      ResourceManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listQuotaDefinitions'
    );

    const parameters = {
      options: {
        url: '/v2/quota_definitions',
        method: 'GET',
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
   * Get a quota definition.
   *
   * Call this method to retrieve information about a particular quota by passing the quota ID. The response can be used
   * to identify the quota type, Standard or Paid. Information about available resources, such as number of apps, number
   * of service instances, and memory, are returned in the response. Quotas for a resource group limit the number of
   * apps, instances, and memory allowed for that specific resource group. Each resource group that you have on your
   * account has a specific set of quotas. Standard quotas are for resource groups that are created by users with a Lite
   * account, and Pay-As-You-Go quotas are for resource groups that are created with a Pay-As-You-Go account. No
   * specific IAM policy needed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The id of the quota.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ResourceManagerV2.Response<ResourceManagerV2.QuotaDefinition>>}
   */
  public getQuotaDefinition(
    params: ResourceManagerV2.GetQuotaDefinitionParams
  ): Promise<ResourceManagerV2.Response<ResourceManagerV2.QuotaDefinition>> {
    const _params = { ...params };
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      ResourceManagerV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getQuotaDefinition'
    );

    const parameters = {
      options: {
        url: '/v2/quota_definitions/{id}',
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
}

/*************************
 * interfaces
 ************************/

namespace ResourceManagerV2 {
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

  /** Parameters for the `listResourceGroups` operation. */
  export interface ListResourceGroupsParams {
    /** The ID of the account that contains the resource groups that you want to get. */
    accountId?: string;
    /** The date in the format of YYYY-MM which returns resource groups. Deleted resource groups will be excluded
     *  before this month.
     */
    date?: string;
    /** The name of the resource group. */
    name?: string;
    /** Boolean value to specify whether or not to list default resource groups. */
    _default?: boolean;
    /** Boolean value to specify whether or not to list default resource groups. */
    includeDeleted?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createResourceGroup` operation. */
  export interface CreateResourceGroupParams {
    /** The new name of the resource group. */
    name?: string;
    /** The account id of the resource group. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getResourceGroup` operation. */
  export interface GetResourceGroupParams {
    /** The short or long ID of the alias. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateResourceGroup` operation. */
  export interface UpdateResourceGroupParams {
    /** The short or long ID of the alias. */
    id: string;
    /** The new name of the resource group. */
    name?: string;
    /** The state of the resource group. */
    state?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteResourceGroup` operation. */
  export interface DeleteResourceGroupParams {
    /** The short or long ID of the alias. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listQuotaDefinitions` operation. */
  export interface ListQuotaDefinitionsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getQuotaDefinition` operation. */
  export interface GetQuotaDefinitionParams {
    /** The id of the quota. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** A returned quota definition. */
  export interface QuotaDefinition {
    /** An alpha-numeric value identifying the quota. */
    id?: string;
    /** The human-readable name of the quota. */
    name?: string;
    /** The type of the quota. */
    type?: string;
    /** The total app limit. */
    number_of_apps?: number;
    /** The total service instances limit per app. */
    number_of_service_instances?: number;
    /** Default number of instances per lite plan. */
    default_number_of_instances_per_lite_plan?: number;
    /** The total instances limit per app. */
    instances_per_app?: number;
    /** The total memory of app instance. */
    instance_memory?: string;
    /** The total app memory capacity. */
    total_app_memory?: string;
    /** The VSI limit. */
    vsi_limit?: number;
    /** The resource quotas associated with a quota definition. */
    resource_quotas?: ResourceQuota[];
    /** The date when the quota was initially created. */
    created_at?: string;
    /** The date when the quota was last updated. */
    updated_at?: string;
  }

  /** A list of quota definitions. */
  export interface QuotaDefinitionList {
    /** The list of quota definitions. */
    resources: QuotaDefinition[];
  }

  /** A newly-created resource group. */
  export interface ResCreateResourceGroup {
    /** An alpha-numeric value identifying the resource group. */
    id?: string;
    /** The full CRN (cloud resource name) associated with the resource group. For more on this format, see [Cloud
     *  Resource Names](https://cloud.ibm.com/docs/account?topic=account-crn).
     */
    crn?: string;
  }

  /** A resource group. */
  export interface ResourceGroup {
    /** An alpha-numeric value identifying the resource group. */
    id?: string;
    /** The full CRN (cloud resource name) associated with the resource group. For more on this format, see [Cloud
     *  Resource Names](https://cloud.ibm.com/docs/account?topic=account-crn).
     */
    crn?: string;
    /** An alpha-numeric value identifying the account ID. */
    account_id?: string;
    /** The human-readable name of the resource group. */
    name?: string;
    /** The state of the resource group. */
    state?: string;
    /** Identify if this resource group is default of the account or not. */
    default?: boolean;
    /** An alpha-numeric value identifying the quota ID associated with the resource group. */
    quota_id?: string;
    /** The URL to access the quota details that associated with the resource group. */
    quota_url?: string;
    /** The URL to access the payment methods details that associated with the resource group. */
    payment_methods_url?: string;
    /** An array of the resources that linked to the resource group. */
    resource_linkages?: JsonObject[];
    /** The URL to access the team details that associated with the resource group. */
    teams_url?: string;
    /** The date when the resource group was initially created. */
    created_at?: string;
    /** The date when the resource group was last updated. */
    updated_at?: string;
  }

  /** A list of resource groups. */
  export interface ResourceGroupList {
    /** The list of resource groups. */
    resources: ResourceGroup[];
  }

  /** A resource quota. */
  export interface ResourceQuota {
    /** An alpha-numeric value identifying the quota. */
    _id?: string;
    /** The human-readable name of the quota. */
    resource_id?: string;
    /** The full CRN (cloud resource name) associated with the quota. For more on this format, see
     *  https://cloud.ibm.com/docs/account?topic=account-crn.
     */
    crn?: string;
    /** The limit number of this resource. */
    limit?: number;
  }
}

export = ResourceManagerV2;
