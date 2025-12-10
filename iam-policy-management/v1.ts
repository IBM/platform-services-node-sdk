/**
 * (C) Copyright IBM Corp. 2025.
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
 * IBM OpenAPI SDK Code Generator Version: 3.103.0-e8b84313-20250402-201816
 */

/* eslint-disable max-classes-per-file */
/* eslint-disable no-await-in-loop */

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
 * IAM Policy Management API
 *
 * API Version: 1.0.1
 */

class IamPolicyManagementV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://iam.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'iam_policy_management';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of IamPolicyManagementV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {IamPolicyManagementV1}
   */

  public static newInstance(options: UserOptions): IamPolicyManagementV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new IamPolicyManagementV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a IamPolicyManagementV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {IamPolicyManagementV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(IamPolicyManagementV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * policies
   ************************/

  /**
   * Get policies by attributes.
   *
   * Get policies and filter by attributes. While managing policies, you might want to retrieve policies in the account
   * and filter by attribute values. This can be done through query parameters. The following attributes are supported:
   * account_id, iam_id, access_group_id, type, service_type, sort, format and state. account_id is a required query
   * parameter. Only policies that have the specified attributes and that the caller has read access to are returned. If
   * the caller does not have read access to any policies an empty array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID that the policies belong to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.iamId] - Optional IAM ID used to identify the subject.
   * @param {string} [params.accessGroupId] - Optional access group id.
   * @param {string} [params.type] - Optional type of policy.
   * @param {string} [params.serviceType] - Optional type of service.
   * @param {string} [params.tagName] - Optional name of the access tag in the policy.
   * @param {string} [params.tagValue] - Optional value of the access tag in the policy.
   * @param {string} [params.sort] - Optional top level policy field to sort results. Ascending sort is default.
   * Descending sort available by prepending '-' to field. Example '-last_modified_at'.
   * @param {string} [params.format] - Include additional data per policy returned
   * * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times
   * it has done so
   * * `display` - returns the list of all actions included in each of the policy roles.
   * @param {string} [params.state] - The state of the policy.
   * * `active` - returns active policies
   * * `deleted` - returns non-active policies.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyCollection>>}
   */
  public listPolicies(
    params: IamPolicyManagementV1.ListPoliciesParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyCollection>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'acceptLanguage',
      'iamId',
      'accessGroupId',
      'type',
      'serviceType',
      'tagName',
      'tagValue',
      'sort',
      'format',
      'state',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
      'access_group_id': _params.accessGroupId,
      'type': _params.type,
      'service_type': _params.serviceType,
      'tag_name': _params.tagName,
      'tag_value': _params.tagValue,
      'sort': _params.sort,
      'format': _params.format,
      'state': _params.state,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listPolicies'
    );

    const parameters = {
      options: {
        url: '/v1/policies',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create a policy.
   *
   * Creates a policy to grant access between a subject and a resource. There are two types of policies: **access** and
   * **authorization**. A policy administrator might want to create an access policy which grants access to a user,
   * service-id, or an access group. They might also want to create an authorization policy and setup access between
   * services.
   *
   * ### Access
   *
   * To create an access policy, use **`"type": "access"`** in the body. The possible subject attributes are
   * **`iam_id`** and **`access_group_id`**. Use the **`iam_id`** subject attribute for assigning access for a user or
   * service-id. Use the **`access_group_id`** subject attribute for assigning access for an access group. Assign roles
   * that are supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * The policy resource must include either the **`serviceType`**, **`serviceName`**, **`resourceGroupId`** or
   * **`service_group_id`** attribute and the **`accountId`** attribute. The IAM Services group (`IAM`) is a subset of
   * account management services that includes the IAM platform services IAM Identity, IAM Access Management, IAM Users
   * Management, IAM Groups, and future IAM services. If the subject is a locked service-id, the request will fail.
   *
   * ### Authorization
   *
   * Authorization policies are supported by services on a case by case basis. Refer to service documentation to verify
   * their support of authorization policies. To create an authorization policy, use **`"type": "authorization"`** in
   * the body. The subject attributes must match the supported authorization subjects of the resource. Multiple subject
   * attributes might be provided. The following attributes are supported:
   *   serviceName, serviceInstance, region, resourceType, resource, accountId, resourceGroupId Assign roles that are
   * supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). The user must also have the same level of access
   * or greater to the target resource in order to grant the role. Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * Both the policy subject and the policy resource must include the **`accountId`** attributes. The policy subject
   * must include either **`serviceName`** or **`resourceGroupId`** (or both) attributes.
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals` and the `stringMatch` operators are available. Resource attributes may support
   * one or both operators. For more information, see [Assigning access by using wildcard
   * policies](https://cloud.ibm.com/docs/account?topic=account-wildcard).
   *
   * ### Attribute Validations
   *
   * Policy attribute values must be between 1 and 1,000 characters in length. If location related attributes like
   * geography, country, metro, region, satellite, and locationvalues are supported by the service, they are validated
   * against Global Catalog locations.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.type - The policy type; either 'access' or 'authorization'.
   * @param {PolicySubject[]} params.subjects - The subjects associated with a policy.
   * @param {PolicyRole[]} params.roles - A set of role Cloud Resource Names (CRNs) granted by the policy.
   * @param {PolicyResource[]} params.resources - The resources associated with a policy.
   * @param {string} [params.description] - Customer-defined description.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>>}
   */
  public createPolicy(
    params: IamPolicyManagementV1.CreatePolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>> {
    const _params = { ...params };
    const _requiredParams = ['type', 'subjects', 'roles', 'resources'];
    const _validParams = [
      'type',
      'subjects',
      'roles',
      'resources',
      'description',
      'acceptLanguage',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'subjects': _params.subjects,
      'roles': _params.roles,
      'resources': _params.resources,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createPolicy'
    );

    const parameters = {
      options: {
        url: '/v1/policies',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Update a policy.
   *
   * Update a policy to grant access between a subject and a resource. A policy administrator might want to update an
   * existing policy. The policy type cannot be changed (You cannot change an access policy to an authorization policy).
   *
   * ### Access
   *
   * To update an access policy, use **`"type": "access"`** in the body. The possible subject attributes are
   * **`iam_id`** and **`access_group_id`**. Use the **`iam_id`** subject attribute for assigning access for a user or
   * service-id. Use the **`access_group_id`** subject attribute for assigning access for an access group. Assign roles
   * that are supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * The policy resource must include either the **`serviceType`**, **`serviceName`**,  or **`resourceGroupId`**
   * attribute and the **`accountId`** attribute.` If the subject is a locked service-id, the request will fail.
   *
   * ### Authorization
   *
   * To update an authorization policy, use **`"type": "authorization"`** in the body. The subject attributes must match
   * the supported authorization subjects of the resource. Multiple subject attributes might be provided. The following
   * attributes are supported:
   *   serviceName, serviceInstance, region, resourceType, resource, accountId, resourceGroupId Assign roles that are
   * supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). The user must also have the same level of access
   * or greater to the target resource in order to grant the role. Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * Both the policy subject and the policy resource must include the **`accountId`** attributes. The policy subject
   * must include either **`serviceName`** or **`resourceGroupId`** (or both) attributes.
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals` and the `stringMatch` operators are available. Resource attributes might support
   * one or both operators. For more information, see [Assigning access by using wildcard
   * policies](https://cloud.ibm.com/docs/account?topic=account-wildcard).
   *
   * ### Attribute Validations
   *
   * Policy attribute values must be between 1 and 1,000 characters in length. If location related attributes like
   * geography, country, metro, region, satellite, and locationvalues are supported by the service, they are validated
   * against Global Catalog locations.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - The policy ID.
   * @param {string} params.ifMatch - The revision number for updating a policy and must match the ETag value of the
   * existing policy. The Etag can be retrieved using the GET /v1/policies/{policy_id} API and looking at the ETag
   * response header.
   * @param {string} params.type - The policy type; either 'access' or 'authorization'.
   * @param {PolicySubject[]} params.subjects - The subjects associated with a policy.
   * @param {PolicyRole[]} params.roles - A set of role Cloud Resource Names (CRNs) granted by the policy.
   * @param {PolicyResource[]} params.resources - The resources associated with a policy.
   * @param {string} [params.description] - Customer-defined description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>>}
   */
  public replacePolicy(
    params: IamPolicyManagementV1.ReplacePolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>> {
    const _params = { ...params };
    const _requiredParams = ['policyId', 'ifMatch', 'type', 'subjects', 'roles', 'resources'];
    const _validParams = [
      'policyId',
      'ifMatch',
      'type',
      'subjects',
      'roles',
      'resources',
      'description',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'subjects': _params.subjects,
      'roles': _params.roles,
      'resources': _params.resources,
      'description': _params.description,
    };

    const path = {
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replacePolicy'
    );

    const parameters = {
      options: {
        url: '/v1/policies/{policy_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Retrieve a policy by ID.
   *
   * Retrieve a policy by providing a policy ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - The policy ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateMetaData>>}
   */
  public getPolicy(
    params: IamPolicyManagementV1.GetPolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateMetaData>> {
    const _params = { ...params };
    const _requiredParams = ['policyId'];
    const _validParams = ['policyId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(IamPolicyManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getPolicy');

    const parameters = {
      options: {
        url: '/v1/policies/{policy_id}',
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

  /**
   * Delete a policy by ID.
   *
   * Delete a policy by providing a policy ID. A policy cannot be deleted if the subject ID contains a locked service
   * ID. If the subject of the policy is a locked service-id, the request will fail.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - The policy ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deletePolicy(
    params: IamPolicyManagementV1.DeletePolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['policyId'];
    const _validParams = ['policyId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deletePolicy'
    );

    const parameters = {
      options: {
        url: '/v1/policies/{policy_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Restore a deleted policy by ID.
   *
   * Restore a policy that has recently been deleted. A policy administrator might want to restore a deleted policy. To
   * restore a policy, use **`"state": "active"`** in the body.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyId - The policy ID.
   * @param {string} params.ifMatch - The revision number for updating a policy and must match the ETag value of the
   * existing policy. The Etag can be retrieved using the GET /v1/policies/{policy_id} API and looking at the ETag
   * response header.
   * @param {string} [params.state] - The policy state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>>}
   */
  public updatePolicyState(
    params: IamPolicyManagementV1.UpdatePolicyStateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>> {
    const _params = { ...params };
    const _requiredParams = ['policyId', 'ifMatch'];
    const _validParams = ['policyId', 'ifMatch', 'state', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'state': _params.state,
    };

    const path = {
      'policy_id': _params.policyId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updatePolicyState'
    );

    const parameters = {
      options: {
        url: '/v1/policies/{policy_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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
  /*************************
   * roles
   ************************/

  /**
   * Get roles by filters.
   *
   * Get roles based on the filters. While managing roles, you may want to retrieve roles and filter by usages. This can
   * be done through query parameters. Currently, we only support the following attributes: account_id, service_name,
   * service_group_id, source_service_name and policy_type. Both service_name and service_group_id attributes are
   * mutually exclusive. Only roles that match the filter and that the caller has read access to are returned. If the
   * caller does not have read access to any roles an empty array is returned.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.accountId] - Optional account GUID in which the roles belong to.
   * @param {string} [params.serviceName] - Optional name of IAM enabled service.
   * @param {string} [params.sourceServiceName] - Optional name of source IAM enabled service.
   * @param {string} [params.policyType] - Optional Policy Type.
   * @param {string} [params.serviceGroupId] - Optional id of service group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleCollection>>}
   */
  public listRoles(
    params?: IamPolicyManagementV1.ListRolesParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleCollection>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'acceptLanguage',
      'accountId',
      'serviceName',
      'sourceServiceName',
      'policyType',
      'serviceGroupId',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'service_name': _params.serviceName,
      'source_service_name': _params.sourceServiceName,
      'policy_type': _params.policyType,
      'service_group_id': _params.serviceGroupId,
    };

    const sdkHeaders = getSdkHeaders(IamPolicyManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listRoles');

    const parameters = {
      options: {
        url: '/v2/roles',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create a role.
   *
   * Creates a custom role for a specific service within the account. An account owner or a user assigned the
   * Administrator role on the Role management service can create a custom role. Any number of actions for a single
   * service can be mapped to the new role, but there must be at least one service-defined action to successfully create
   * the new role.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.displayName - The display the name of the role that is shown in the console.
   * @param {string[]} params.actions - The actions of the role. For more information, see [IAM roles and
   * actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
   * @param {string} params.name - The name of the role that is used in the CRN. This must be alphanumeric and
   * capitalized.
   * @param {string} params.accountId - The account GUID.
   * @param {string} params.serviceName - The service name.
   * @param {string} [params.description] - The description of the role.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.CustomRole>>}
   */
  public createRole(
    params: IamPolicyManagementV1.CreateRoleParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.CustomRole>> {
    const _params = { ...params };
    const _requiredParams = ['displayName', 'actions', 'name', 'accountId', 'serviceName'];
    const _validParams = [
      'displayName',
      'actions',
      'name',
      'accountId',
      'serviceName',
      'description',
      'acceptLanguage',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'display_name': _params.displayName,
      'actions': _params.actions,
      'name': _params.name,
      'account_id': _params.accountId,
      'service_name': _params.serviceName,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createRole'
    );

    const parameters = {
      options: {
        url: '/v2/roles',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Update a role.
   *
   * Update a custom role. A role administrator might want to update an existing role by updating the display name,
   * description, or the actions that are mapped to the role. The name, account_id, and service_name can't be changed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleId - The role ID.
   * @param {string} params.ifMatch - The revision number for updating a role and must match the ETag value of the
   * existing role. The Etag can be retrieved using the GET /v2/roles/{role_id} API and looking at the ETag response
   * header.
   * @param {string} params.displayName - The display the name of the role that is shown in the console.
   * @param {string[]} params.actions - The actions of the role. For more information, see [IAM roles and
   * actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
   * @param {string} [params.description] - The description of the role.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.CustomRole>>}
   */
  public replaceRole(
    params: IamPolicyManagementV1.ReplaceRoleParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.CustomRole>> {
    const _params = { ...params };
    const _requiredParams = ['roleId', 'ifMatch', 'displayName', 'actions'];
    const _validParams = [
      'roleId',
      'ifMatch',
      'displayName',
      'actions',
      'description',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'display_name': _params.displayName,
      'actions': _params.actions,
      'description': _params.description,
    };

    const path = {
      'role_id': _params.roleId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceRole'
    );

    const parameters = {
      options: {
        url: '/v2/roles/{role_id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Retrieve a role by ID.
   *
   * Retrieve a role by providing a role ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleId - The role ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.CustomRole>>}
   */
  public getRole(
    params: IamPolicyManagementV1.GetRoleParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.CustomRole>> {
    const _params = { ...params };
    const _requiredParams = ['roleId'];
    const _validParams = ['roleId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'role_id': _params.roleId,
    };

    const sdkHeaders = getSdkHeaders(IamPolicyManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getRole');

    const parameters = {
      options: {
        url: '/v2/roles/{role_id}',
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

  /**
   * Delete a role by ID.
   *
   * Delete a role by providing a role ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleId - The role ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteRole(
    params: IamPolicyManagementV1.DeleteRoleParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['roleId'];
    const _validParams = ['roleId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'role_id': _params.roleId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteRole'
    );

    const parameters = {
      options: {
        url: '/v2/roles/{role_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * v2Policies
   ************************/

  /**
   * Get policies by attributes.
   *
   * Get policies and filter by attributes. While managing policies, you might want to retrieve policies in the account
   * and filter by attribute values. This can be done through query parameters. The following attributes are supported:
   * account_id, iam_id, access_group_id, type, service_type, sort, format and state. account_id is a required query
   * parameter. Only policies that have the specified attributes and that the caller has read access to are returned. If
   * the caller does not have read access to any policies an empty array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID in which the policies belong to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.iamId] - Optional IAM ID used to identify the subject.
   * @param {string} [params.accessGroupId] - Optional access group id.
   * @param {string} [params.type] - Optional type of policy.
   * @param {string} [params.serviceType] - Optional type of service.
   * @param {string} [params.serviceName] - Optional name of service.
   * @param {string} [params.serviceGroupId] - Optional ID of service group.
   * @param {string} [params.sort] - Optional top level policy field to sort results. Ascending sort is default.
   * Descending sort available by prepending '-' to field, for example, '-last_modified_at'. Note that last permit
   * information is only included when 'format=include_last_permit', for example,
   * "format=include_last_permit&sort=last_permit_at" Example fields that can be sorted on:
   *   - 'id'
   *   - 'type'
   *   - 'href'
   *   - 'created_at'
   *   - 'created_by_id'
   *   - 'last_modified_at'
   *   - 'last_modified_by_id'
   *   - 'state'
   *   - 'last_permit_at'
   *   - 'last_permit_frequency'.
   * @param {string} [params.format] - Include additional data per policy returned
   * * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times
   * it has done so
   * * `display` - returns the list of all actions included in each of the policy roles and translations for all
   * relevant fields.
   * @param {string} [params.state] - The state of the policy.
   * * `active` - returns active policies
   * * `deleted` - returns non-active policies.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2PolicyCollection>>}
   */
  public listV2Policies(
    params: IamPolicyManagementV1.ListV2PoliciesParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2PolicyCollection>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'acceptLanguage',
      'iamId',
      'accessGroupId',
      'type',
      'serviceType',
      'serviceName',
      'serviceGroupId',
      'sort',
      'format',
      'state',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
      'access_group_id': _params.accessGroupId,
      'type': _params.type,
      'service_type': _params.serviceType,
      'service_name': _params.serviceName,
      'service_group_id': _params.serviceGroupId,
      'sort': _params.sort,
      'format': _params.format,
      'state': _params.state,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listV2Policies'
    );

    const parameters = {
      options: {
        url: '/v2/policies',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create a policy.
   *
   * Creates a policy to grant access between a subject and a resource. Currently, there is one type of a v2/policy:
   * **access**. A policy administrator might want to create an access policy that grants access to a user, service-id,
   * or an access group.
   *
   * ### Access
   *
   * To create an access policy, use **`"type": "access"`** in the body. The supported subject attributes are
   * **`iam_id`** and **`access_group_id`**. Use the **`iam_id`** subject attribute to assign access to a user or
   * service-id. Use the **`access_group_id`** subject attribute to assign access to an access group. Assign roles that
   * are supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * The policy resource must include either the **`serviceType`**, **`serviceName`**, **`resourceGroupId`** or
   * **`service_group_id`** attribute and the **`accountId`** attribute. In the rule field, you can specify a single
   * condition by using **`key`**, **`value`**, and condition **`operator`**, or a set of **`conditions`** with a
   * combination **`operator`**. The possible combination operators are **`and`** and **`or`**.
   *
   * Currently, we support two types of patterns:
   *
   * 1. `time-based`: Used to specify a time-based restriction
   *
   * Combine conditions to specify a time-based restriction (e.g., access only during business hours, during the
   * Monday-Friday work week). For example, a policy can grant access Monday-Friday, 9:00am-5:00pm using the following
   * rule:
   * ```json
   *   "rule": {
   *     "operator": "and",
   *     "conditions": [{
   *       "key": "{{environment.attributes.day_of_week}}",
   *       "operator": "dayOfWeekAnyOf",
   *       "value": ["1+00:00", "2+00:00", "3+00:00", "4+00:00", "5+00:00"]
   *     },
   *       "key": "{{environment.attributes.current_time}}",
   *       "operator": "timeGreaterThanOrEquals",
   *       "value": "09:00:00+00:00"
   *     },
   *       "key": "{{environment.attributes.current_time}}",
   *       "operator": "timeLessThanOrEquals",
   *       "value": "17:00:00+00:00"
   *     }]
   *   }
   * ``` You can use the following operators in the **`key`** and **`value`** pair:
   * ```
   *   'timeLessThan', 'timeLessThanOrEquals', 'timeGreaterThan', 'timeGreaterThanOrEquals',
   *   'dateLessThan', 'dateLessThanOrEquals', 'dateGreaterThan', 'dateGreaterThanOrEquals',
   *   'dateTimeLessThan', 'dateTimeLessThanOrEquals', 'dateTimeGreaterThan', 'dateTimeGreaterThanOrEquals',
   *   'dayOfWeekEquals', 'dayOfWeekAnyOf'
   * ```
   *
   * The pattern field that matches the rule is required when rule is provided. For the business hour rule example
   * above, the **`pattern`** is **`"time-based-conditions:weekly"`**. For more information, see [Time-based conditions
   * operators](/docs/account?topic=account-iam-condition-properties&interface=ui#policy-condition-properties) and
   * [Limiting access with time-based conditions](/docs/account?topic=account-iam-time-based&interface=ui). If the
   * subject is a locked service-id, the request will fail.
   *
   * 2. `attribute-based`: Used to specify a combination of OR/AND based conditions applied on resource attributes.
   *
   * Combine conditions to specify an attribute-based condition using AND/OR-based operators.
   *
   * For example, a policy can grant access based on multiple conditions applied on the resource attributes below:
   * ```json
   *   "pattern": "attribute-based-condition:resource:literal-and-wildcard"
   *   "rule": {
   *       "operator": "or",
   *       "conditions": [
   *         {
   *           "operator": "and",
   *           "conditions": [
   *             {
   *               "key": "{{resource.attributes.prefix}}",
   *               "operator": "stringEquals",
   *               "value": "home/test"
   *             },
   *             {
   *               "key": "{{environment.attributes.delimiter}}",
   *               "operator": "stringEquals",
   *               "value": "/"
   *             }
   *           ]
   *         },
   *         {
   *           "key": "{{resource.attributes.path}}",
   *           "operator": "stringMatch",
   *           "value": "home/David/_*"
   *         }
   *       ]
   *   }
   * ```
   *
   * In addition to satisfying the `resources` section, the policy grants permission only if either the `path` begins
   * with `home/David/` **OR**  the `prefix` is `home/test` and the `delimiter` is `/`. This mechanism helps you
   * consolidate multiple policies in to a single policy,  making policies easier to administer and stay within the
   * policy limit for an account. View the list of operators that can be used in the condition
   * [here](/docs/account?topic=account-wildcard#string-comparisons).
   *
   * ### Authorization
   *
   * Authorization policies are supported by services on a case by case basis. Refer to service documentation to verify
   * their support of authorization policies. To create an authorization policy, use **`"type": "authorization"`** in
   * the body. The subject attributes must match the supported authorization subjects of the resource. Multiple subject
   * attributes might be provided. The following attributes are supported:
   *   serviceName, serviceInstance, region, resourceType, resource, accountId, resourceGroupId Assign roles that are
   * supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). The user must also have the same level of access
   * or greater to the target resource in order to grant the role. Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * Both the policy subject and the policy resource must include the **`accountId`** attributes. The policy subject
   * must include either **`serviceName`** or **`resourceGroupId`** (or both) attributes.
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals`, `stringMatch`, and `stringEquals` operators are available. For more
   * information, see [Assigning access by using wildcard
   * policies](https://cloud.ibm.com/docs/account?topic=account-wildcard).
   *
   * ### Attribute Validations
   *
   * Policy attribute values must be between 1 and 1,000 characters in length. If location related attributes like
   * geography, country, metro, region, satellite, and locationvalues are supported by the service, they are validated
   * against Global Catalog locations.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Control} params.control - Specifies the type of access that is granted by the policy.
   * @param {string} params.type - The policy type; either 'access' or 'authorization'.
   * @param {string} [params.description] - Description of the policy.
   * @param {V2PolicySubject} [params.subject] - The subject attributes for whom the policy grants access.
   * @param {V2PolicyResource} [params.resource] - The resource attributes to which the policy grants access.
   * @param {string} [params.pattern] - Indicates pattern of rule, either 'time-based-conditions:once',
   * 'time-based-conditions:weekly:all-day', or 'time-based-conditions:weekly:custom-hours'.
   * @param {V2PolicyRule} [params.rule] - Additional access conditions associated with the policy.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2Policy>>}
   */
  public createV2Policy(
    params: IamPolicyManagementV1.CreateV2PolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2Policy>> {
    const _params = { ...params };
    const _requiredParams = ['control', 'type'];
    const _validParams = [
      'control',
      'type',
      'description',
      'subject',
      'resource',
      'pattern',
      'rule',
      'acceptLanguage',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'control': _params.control,
      'type': _params.type,
      'description': _params.description,
      'subject': _params.subject,
      'resource': _params.resource,
      'pattern': _params.pattern,
      'rule': _params.rule,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createV2Policy'
    );

    const parameters = {
      options: {
        url: '/v2/policies',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Update a policy.
   *
   * Update a policy to grant access between a subject and a resource. A policy administrator might want to update an
   * existing policy.
   *
   * ### Access
   *
   * To update an access policy, use **`"type": "access"`** in the body. The supported subject attributes are
   * **`iam_id`** and **`access_group_id`**. Use the **`iam_id`** subject attribute to assign access to a user or
   * service-id. Use the **`access_group_id`** subject attribute to assign access to an access group. Assign roles that
   * are supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * The policy resource must include either the **`serviceType`**, **`serviceName`**, **`resourceGroupId`** or
   * **`service_group_id`** attribute and the **`accountId`** attribute. In the rule field, you can specify a single
   * condition by using **`key`**, **`value`**, and condition **`operator`**, or a set of **`conditions`** with a
   * combination **`operator`**. The possible combination operators are **`and`** and **`or`**.
   *
   * Currently, we support two types of patterns:
   *
   * 1. `time-based`: Used to specify a time-based restriction
   *
   * Combine conditions to specify a time-based restriction (e.g., access only during business hours, during the
   * Monday-Friday work week). For example, a policy can grant access Monday-Friday, 9:00am-5:00pm using the following
   * rule:
   * ```json
   *   "rule": {
   *     "operator": "and",
   *     "conditions": [{
   *       "key": "{{environment.attributes.day_of_week}}",
   *       "operator": "dayOfWeekAnyOf",
   *       "value": ["1+00:00", "2+00:00", "3+00:00", "4+00:00", "5+00:00"]
   *     },
   *       "key": "{{environment.attributes.current_time}}",
   *       "operator": "timeGreaterThanOrEquals",
   *       "value": "09:00:00+00:00"
   *     },
   *       "key": "{{environment.attributes.current_time}}",
   *       "operator": "timeLessThanOrEquals",
   *       "value": "17:00:00+00:00"
   *     }]
   *   }
   * ``` You can use the following operators in the **`key`** and **`value`** pair:
   * ```
   *   'timeLessThan', 'timeLessThanOrEquals', 'timeGreaterThan', 'timeGreaterThanOrEquals',
   *   'dateLessThan', 'dateLessThanOrEquals', 'dateGreaterThan', 'dateGreaterThanOrEquals',
   *   'dateTimeLessThan', 'dateTimeLessThanOrEquals', 'dateTimeGreaterThan', 'dateTimeGreaterThanOrEquals',
   *   'dayOfWeekEquals', 'dayOfWeekAnyOf'
   * ``` The pattern field that matches the rule is required when rule is provided. For the business hour rule example
   * above, the **`pattern`** is **`"time-based-conditions:weekly"`**. For more information, see [Time-based conditions
   * operators](/docs/account?topic=account-iam-condition-properties&interface=ui#policy-condition-properties) and
   * [Limiting access with time-based conditions](/docs/account?topic=account-iam-time-based&interface=ui). If the
   * subject is a locked service-id, the request will fail.
   *
   * 2. `attribute-based`: Used to specify a combination of OR/AND based conditions applied on resource attributes.
   *
   * Combine conditions to specify an attribute-based condition using AND/OR-based operators.
   *
   * For example, a policy can grant access based on multiple conditions applied on the resource attributes below:
   * ```json
   *   "pattern": "attribute-based-condition:resource:literal-and-wildcard"
   *   "rule": {
   *       "operator": "or",
   *       "conditions": [
   *         {
   *           "operator": "and",
   *           "conditions": [
   *             {
   *               "key": "{{resource.attributes.prefix}}",
   *               "operator": "stringEquals",
   *               "value": "home/test"
   *             },
   *             {
   *               "key": "{{environment.attributes.delimiter}}",
   *               "operator": "stringEquals",
   *               "value": "/"
   *             }
   *           ]
   *         },
   *         {
   *           "key": "{{resource.attributes.path}}",
   *           "operator": "stringMatch",
   *           "value": "home/David/_*"
   *         }
   *       ]
   *   }
   * ```
   *
   * In addition to satisfying the `resources` section, the policy grants permission only if either the `path` begins
   * with `home/David/` **OR**  the `prefix` is `home/test` and the `delimiter` is `/`. This mechanism helps you
   * consolidate multiple policies in to a single policy,  making policies easier to administer and stay within the
   * policy limit for an account. View the list of operators that can be used in the condition
   * [here](/docs/account?topic=account-wildcard#string-comparisons).
   *
   * ### Authorization
   *
   * To update an authorization policy, use **`"type": "authorization"`** in the body. The subject attributes must match
   * the supported authorization subjects of the resource. Multiple subject attributes might be provided. The following
   * attributes are supported:
   *   serviceName, serviceInstance, region, resourceType, resource, accountId, resourceGroupId Assign roles that are
   * supported by the service or platform roles. For more information, see [IAM roles and
   * actions](/docs/account?topic=account-iam-service-roles-actions). The user must also have the same level of access
   * or greater to the target resource in order to grant the role. Use only the resource attributes supported by the
   * service. To view a service's or the platform's supported attributes, check the [documentation](/docs?tab=all-docs).
   * Both the policy subject and the policy resource must include the **`accountId`** attributes. The policy subject
   * must include either **`serviceName`** or **`resourceGroupId`** (or both) attributes.
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals`, `stringMatch`, and `stringEquals` operators are available. For more
   * information, see [Assigning access by using wildcard
   * policies](https://cloud.ibm.com/docs/account?topic=account-wildcard).
   *
   * ### Attribute Validations
   *
   * Policy attribute values must be between 1 and 1,000 characters in length. If location related attributes like
   * geography, country, metro, region, satellite, and locationvalues are supported by the service, they are validated
   * against Global Catalog locations.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The policy ID.
   * @param {string} params.ifMatch - The revision number for updating a policy and must match the ETag value of the
   * existing policy. The Etag can be retrieved using the GET /v2/policies/{id} API and looking at the ETag response
   * header.
   * @param {Control} params.control - Specifies the type of access that is granted by the policy.
   * @param {string} params.type - The policy type; either 'access' or 'authorization'.
   * @param {string} [params.description] - Description of the policy.
   * @param {V2PolicySubject} [params.subject] - The subject attributes for whom the policy grants access.
   * @param {V2PolicyResource} [params.resource] - The resource attributes to which the policy grants access.
   * @param {string} [params.pattern] - Indicates pattern of rule, either 'time-based-conditions:once',
   * 'time-based-conditions:weekly:all-day', or 'time-based-conditions:weekly:custom-hours'.
   * @param {V2PolicyRule} [params.rule] - Additional access conditions associated with the policy.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2Policy>>}
   */
  public replaceV2Policy(
    params: IamPolicyManagementV1.ReplaceV2PolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2Policy>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'ifMatch', 'control', 'type'];
    const _validParams = [
      'id',
      'ifMatch',
      'control',
      'type',
      'description',
      'subject',
      'resource',
      'pattern',
      'rule',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'control': _params.control,
      'type': _params.type,
      'description': _params.description,
      'subject': _params.subject,
      'resource': _params.resource,
      'pattern': _params.pattern,
      'rule': _params.rule,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceV2Policy'
    );

    const parameters = {
      options: {
        url: '/v2/policies/{id}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Retrieve a policy by ID.
   *
   * Retrieve a policy by providing a policy ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The policy ID.
   * @param {string} [params.format] - Include additional data for policy returned
   * * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times
   * it has done so
   * * `display` - returns the list of all actions included in each of the policy roles and translations for all
   * relevant fields.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2PolicyTemplateMetaData>>}
   */
  public getV2Policy(
    params: IamPolicyManagementV1.GetV2PolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2PolicyTemplateMetaData>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'format', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'format': _params.format,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getV2Policy'
    );

    const parameters = {
      options: {
        url: '/v2/policies/{id}',
        method: 'GET',
        qs: query,
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

  /**
   * Delete a policy by ID.
   *
   * Delete a policy by providing a policy ID. A policy cannot be deleted if the subject ID contains a locked service
   * ID. If the subject of the policy is a locked service-id, the request will fail.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The policy ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteV2Policy(
    params: IamPolicyManagementV1.DeleteV2PolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteV2Policy'
    );

    const parameters = {
      options: {
        url: '/v2/policies/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * policyTemplates
   ************************/

  /**
   * List policy templates by attributes.
   *
   * List policy templates and filter by attributes by using query parameters. The following attributes are supported:
   * `account_id`, `policy_service_name`, `policy_service_type`, `policy_service_group_id` and `policy_type`.
   * `account_id` is a required query parameter. These attributes `policy_service_name`, `policy_service_type` and
   * `policy_service_group_id` are mutually exclusive. Only policy templates that have the specified attributes and that
   * the caller has read access to are returned. If the caller does not have read access to any policy templates an
   * empty array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID that the policy templates belong to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.state] - The policy template state.
   * @param {string} [params.name] - The policy template name.
   * @param {string} [params.policyServiceType] - Service type, Optional.
   * @param {string} [params.policyServiceName] - Service name, Optional.
   * @param {string} [params.policyServiceGroupId] - Service group id, Optional.
   * @param {string} [params.policyType] - Policy type, Optional.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateCollection>>}
   */
  public listPolicyTemplates(
    params: IamPolicyManagementV1.ListPolicyTemplatesParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateCollection>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'acceptLanguage',
      'state',
      'name',
      'policyServiceType',
      'policyServiceName',
      'policyServiceGroupId',
      'policyType',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'state': _params.state,
      'name': _params.name,
      'policy_service_type': _params.policyServiceType,
      'policy_service_name': _params.policyServiceName,
      'policy_service_group_id': _params.policyServiceGroupId,
      'policy_type': _params.policyType,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listPolicyTemplates'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create a policy template.
   *
   * Create a policy template. Policy templates define a policy without requiring a subject, and you can use them to
   * grant access to multiple subjects.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it changes the name value for all existing versions of the template.
   * @param {string} params.accountId - Enterprise account ID where this template is created.
   * @param {TemplatePolicy} params.policy - The core set of properties associated with the template's policy object.
   * @param {string} [params.description] - Description of the policy template. This is shown to users in the enterprise
   * account. Use this to describe the purpose or context of the policy for enterprise users managing IAM templates.
   * @param {boolean} [params.committed] - Committed status of the template.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateLimitData>>}
   */
  public createPolicyTemplate(
    params: IamPolicyManagementV1.CreatePolicyTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateLimitData>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'accountId', 'policy'];
    const _validParams = [
      'name',
      'accountId',
      'policy',
      'description',
      'committed',
      'acceptLanguage',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'account_id': _params.accountId,
      'policy': _params.policy,
      'description': _params.description,
      'committed': _params.committed,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createPolicyTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Retrieve latest version of a policy template.
   *
   * Retrieve the latest version of a policy template by providing a policy template ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {string} [params.state] - The policy template state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplate>>}
   */
  public getPolicyTemplate(
    params: IamPolicyManagementV1.GetPolicyTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId'];
    const _validParams = ['policyTemplateId', 'state', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
    };

    const path = {
      'policy_template_id': _params.policyTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPolicyTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}',
        method: 'GET',
        qs: query,
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

  /**
   * Delete a policy template.
   *
   * Delete a policy template by providing the policy template ID. This deletes all versions of this template. A policy
   * template can't be deleted if any version of the template is assigned to one or more child accounts. You must remove
   * the policy assignments first.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deletePolicyTemplate(
    params: IamPolicyManagementV1.DeletePolicyTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId'];
    const _validParams = ['policyTemplateId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'policy_template_id': _params.policyTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deletePolicyTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a new policy template version.
   *
   * Create a new version of a policy template. Use this if you need to make updates to a policy template that is
   * committed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {TemplatePolicy} params.policy - The core set of properties associated with the template's policy object.
   * @param {string} [params.name] - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it changes the name value for all existing versions of the template.
   * @param {string} [params.description] - Description of the policy template. This is shown to users in the enterprise
   * account. Use this to describe the purpose or context of the policy for enterprise users managing IAM templates.
   * @param {boolean} [params.committed] - Committed status of the template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateLimitData>>}
   */
  public createPolicyTemplateVersion(
    params: IamPolicyManagementV1.CreatePolicyTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateLimitData>> {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId', 'policy'];
    const _validParams = [
      'policyTemplateId',
      'policy',
      'name',
      'description',
      'committed',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'policy': _params.policy,
      'name': _params.name,
      'description': _params.description,
      'committed': _params.committed,
    };

    const path = {
      'policy_template_id': _params.policyTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createPolicyTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}/versions',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

  /**
   * Retrieve policy template versions.
   *
   * Retrieve the versions of a policy template by providing a policy template ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {string} [params.state] - The policy template state.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateVersionsCollection>>}
   */
  public listPolicyTemplateVersions(
    params: IamPolicyManagementV1.ListPolicyTemplateVersionsParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateVersionsCollection>
  > {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId'];
    const _validParams = ['policyTemplateId', 'state', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'policy_template_id': _params.policyTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listPolicyTemplateVersions'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}/versions',
        method: 'GET',
        qs: query,
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

  /**
   * Update a policy template version.
   *
   * Update a specific version of a policy template. You can use this only if the version isn't committed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {string} params.version - The policy template version.
   * @param {string} params.ifMatch - The revision number for updating a policy template version and must match the Etag
   * value of the existing policy template version. The Etag can be retrieved using the GET
   * /v1/policy_templates/{policy_template_id}/versions/{version} API and looking at the Etag response header.
   * @param {TemplatePolicy} params.policy - The core set of properties associated with the template's policy object.
   * @param {string} [params.name] - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it changes the name value for all existing versions of the template.
   * @param {string} [params.description] - Description of the policy template. This is shown to users in the enterprise
   * account. Use this to describe the purpose or context of the policy for enterprise users managing IAM templates.
   * @param {boolean} [params.committed] - Committed status of the template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplate>>}
   */
  public replacePolicyTemplate(
    params: IamPolicyManagementV1.ReplacePolicyTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId', 'version', 'ifMatch', 'policy'];
    const _validParams = [
      'policyTemplateId',
      'version',
      'ifMatch',
      'policy',
      'name',
      'description',
      'committed',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'policy': _params.policy,
      'name': _params.name,
      'description': _params.description,
      'committed': _params.committed,
    };

    const path = {
      'policy_template_id': _params.policyTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replacePolicyTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}/versions/{version}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Delete a policy template version.
   *
   * Delete a specific version of a policy template by providing a policy template ID and version number. You can't
   * delete a policy template version that is assigned to one or more child accounts. You must remove the policy
   * assignments first.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {string} params.version - The policy template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deletePolicyTemplateVersion(
    params: IamPolicyManagementV1.DeletePolicyTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId', 'version'];
    const _validParams = ['policyTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'policy_template_id': _params.policyTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deletePolicyTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}/versions/{version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve a policy template version.
   *
   * Retrieve a policy template by providing a policy template ID and version number.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {string} params.version - The policy template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplate>>}
   */
  public getPolicyTemplateVersion(
    params: IamPolicyManagementV1.GetPolicyTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId', 'version'];
    const _validParams = ['policyTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'policy_template_id': _params.policyTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPolicyTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}/versions/{version}',
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

  /**
   * Commit a policy template version.
   *
   * Commit a policy template version. You can make no further changes to the policy template once it's committed. If
   * you need to make updates after committing a version, create a new version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.policyTemplateId - The policy template ID.
   * @param {string} params.version - The policy template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public commitPolicyTemplate(
    params: IamPolicyManagementV1.CommitPolicyTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['policyTemplateId', 'version'];
    const _validParams = ['policyTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'policy_template_id': _params.policyTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'commitPolicyTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/policy_templates/{policy_template_id}/versions/{version}/commit',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * policyAssignments
   ************************/

  /**
   * Get policy template assignments.
   *
   * Get policy template assignments by attributes. The following attributes are supported:
   * `account_id`, `template_id`, `template_version`, `sort`.
   * `account_id` is a required query parameter. Only policy template assignments that have the specified attributes and
   * that the caller has read access to are returned. If the caller does not have read access to any policy template
   * assignments an empty array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.version - specify version of response body format.
   * @param {string} params.accountId - The account GUID in which the policies belong to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.templateId] - Optional template id.
   * @param {string} [params.templateVersion] - Optional policy template version.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateAssignmentCollection>>}
   */
  public listPolicyAssignments(
    params: IamPolicyManagementV1.ListPolicyAssignmentsParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateAssignmentCollection>
  > {
    const _params = { ...params };
    const _requiredParams = ['version', 'accountId'];
    const _validParams = [
      'version',
      'accountId',
      'acceptLanguage',
      'templateId',
      'templateVersion',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
      'account_id': _params.accountId,
      'template_id': _params.templateId,
      'template_version': _params.templateVersion,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listPolicyAssignments'
    );

    const parameters = {
      options: {
        url: '/v1/policy_assignments',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create a policy authorization template assignment.
   *
   * Assign a policy template to child accounts and account groups. This creates the policy in the accounts and account
   * groups that you specify.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.version - specify version of response body format.
   * @param {AssignmentTargetDetails} params.target - assignment target account and type.
   * @param {AssignmentTemplateDetails[]} params.templates - List of template details for policy assignment.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyAssignmentV1Collection>>}
   */
  public createPolicyTemplateAssignment(
    params: IamPolicyManagementV1.CreatePolicyTemplateAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyAssignmentV1Collection>> {
    const _params = { ...params };
    const _requiredParams = ['version', 'target', 'templates'];
    const _validParams = ['version', 'target', 'templates', 'acceptLanguage', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'target': _params.target,
      'templates': _params.templates,
    };

    const query = {
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createPolicyTemplateAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/policy_assignments',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Retrieve a policy assignment.
   *
   * Retrieve a policy template assignment by providing a policy assignment ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - The policy template assignment ID.
   * @param {string} params.version - specify version of response body format.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateAssignmentItems>>}
   */
  public getPolicyAssignment(
    params: IamPolicyManagementV1.GetPolicyAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyTemplateAssignmentItems>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId', 'version'];
    const _validParams = ['assignmentId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
    };

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPolicyAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/policy_assignments/{assignment_id}',
        method: 'GET',
        qs: query,
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

  /**
   * Update a policy authorization type assignment.
   *
   * Update a policy assignment by providing a policy assignment ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - The policy template assignment ID.
   * @param {string} params.version - specify version of response body format.
   * @param {string} params.ifMatch - The revision number for updating a policy assignment and must match the Etag value
   * of the existing policy assignment. The Etag can be retrieved using the GET /v1/policy_assignments/{assignment_id}
   * API and looking at the Etag response header.
   * @param {string} params.templateVersion - The policy template version to update to.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyAssignmentV1>>}
   */
  public updatePolicyAssignment(
    params: IamPolicyManagementV1.UpdatePolicyAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyAssignmentV1>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId', 'version', 'ifMatch', 'templateVersion'];
    const _validParams = [
      'assignmentId',
      'version',
      'ifMatch',
      'templateVersion',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'template_version': _params.templateVersion,
    };

    const query = {
      'version': _params.version,
    };

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updatePolicyAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/policy_assignments/{assignment_id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Remove a policy assignment.
   *
   * Remove a policy template assignment by providing a policy assignment ID. You can't delete a policy assignment if
   * the status is "in_progress".
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - The policy template assignment ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deletePolicyAssignment(
    params: IamPolicyManagementV1.DeletePolicyAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deletePolicyAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/policy_assignments/{assignment_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * accessManagementSettings
   ************************/

  /**
   * Retrieve Access Management account settings by account ID.
   *
   * Retrieve Access Management settings for an account by providing the account ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID that the settings belong to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.AccountSettingsAccessManagement>>}
   */
  public getSettings(
    params: IamPolicyManagementV1.GetSettingsParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.AccountSettingsAccessManagement>
  > {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'acceptLanguage', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getSettings'
    );

    const parameters = {
      options: {
        url: '/v1/accounts/{account_id}/settings/access_management',
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
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Update Access Management account settings by account ID.
   *
   * Update access management settings for an account.
   *
   * ### External Account Identity Interaction
   *
   * Update the way identities within an external account are allowed to interact with the requested account by
   * providing:
   * * the `account_id` as a parameter
   * * one or more external account ID(s) and state for the specific identity in the request body
   *
   * External account identity interaction includes the following `identity_types`: `user` (user identities that are
   * defined as [IBMid's](https://cloud.ibm.com/docs/account?topic=account-identity-overview#users-bestpract)),
   * `service_id` (defined as [IAM
   * ServiceIds](https://cloud.ibm.com/docs/account?topic=account-identity-overview#serviceid-bestpract)), `service`
   * (defined by a service’s [CRN](https://cloud.ibm.com/docs/account?topic=account-crn)). To update an Identity’s
   * setting, the `state` and `external_allowed_accounts` fields are required.
   *
   * Different identity states are:
   * * "enabled": An identity type is allowed to access resources in the account provided it has access policies on
   * those resources.
   * * "limited": An identity type is allowed to access resources in the account provided it has access policies on
   * those resources AND it is associated with either the account the resources are in or one of the allowed accounts.
   * This setting uses the "external_allowed_accounts" list.
   * * "monitor": It has no direct impact on an Identity’s access. Instead, it creates AT events for access decisions as
   * if the account were in a limited “state”.
   *
   * **Note**: The state "enabled" is a special case. In this case, access is given to all accounts and there is no need
   * to specify a particular list. Therefore, when updating "state" to "enabled" for an identity type
   * "external_allowed_accounts" should be left empty.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID that the settings belong to.
   * @param {string} params.ifMatch - The revision number for updating Access Management Account Settings and must match
   * the Etag value of the existing Access Management Account Settings. The Etag can be retrieved using the GET
   * /v1/accounts/{account_id}/settings/access_management API and looking at the Etag response header.
   * @param {ExternalAccountIdentityInteractionPatch} [params.externalAccountIdentityInteraction] - Update to how
   * external accounts can interact in relation to the requested account.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.AccountSettingsAccessManagement>>}
   */
  public updateSettings(
    params: IamPolicyManagementV1.UpdateSettingsParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.AccountSettingsAccessManagement>
  > {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'ifMatch'];
    const _validParams = [
      'accountId',
      'ifMatch',
      'externalAccountIdentityInteraction',
      'acceptLanguage',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'external_account_identity_interaction': _params.externalAccountIdentityInteraction,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateSettings'
    );

    const parameters = {
      options: {
        url: '/v1/accounts/{account_id}/settings/access_management',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
            'Accept-Language': _params.acceptLanguage,
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
  /*************************
   * actionControlTemplates
   ************************/

  /**
   * List action control templates by attributes.
   *
   * List action control templates and filter by attributes by using query parameters. The following attributes are
   * supported:
   * `account_id`
   * `account_id` is a required query parameter. Only action control templates that have the specified attributes and
   * that the caller has read access to are returned. If the caller does not have read access to any action control
   * templates an empty array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID that the action control templates belong to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplateCollection>>}
   */
  public listActionControlTemplates(
    params: IamPolicyManagementV1.ListActionControlTemplatesParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplateCollection>
  > {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'acceptLanguage', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listActionControlTemplates'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create an action control template.
   *
   * Create an action control template. Action control templates define a service action control.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it changes the name value for all existing versions of the template.
   * @param {string} params.accountId - Enterprise account ID where this template is created.
   * @param {string} [params.description] - Description of the action control template. This is shown to users in the
   * enterprise account. Use this to describe the purpose or context of the action control for enterprise users managing
   * IAM templates.
   * @param {boolean} [params.committed] - Committed status of the template. If committed is set to true, then the
   * template version can no longer be updated.
   * @param {TemplateActionControl} [params.actionControl] - The action control properties that are created in an action
   * resource when the template is assigned.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>>}
   */
  public createActionControlTemplate(
    params: IamPolicyManagementV1.CreateActionControlTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'accountId'];
    const _validParams = [
      'name',
      'accountId',
      'description',
      'committed',
      'actionControl',
      'acceptLanguage',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'account_id': _params.accountId,
      'description': _params.description,
      'committed': _params.committed,
      'action_control': _params.actionControl,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createActionControlTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Retrieve the latest version of an action control template.
   *
   * Retrieve the latest version of an action control template by providing an action control template ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - Action control template ID.
   * @param {string} [params.state] - The action control template state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>>}
   */
  public getActionControlTemplate(
    params: IamPolicyManagementV1.GetActionControlTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId'];
    const _validParams = ['actionControlTemplateId', 'state', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
    };

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getActionControlTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}',
        method: 'GET',
        qs: query,
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

  /**
   * Delete an action control template.
   *
   * Delete an action control template by providing the action control template ID. This deletes all versions of this
   * template. An action control template can't be deleted if any version of the template is assigned to one or more
   * child accounts. You must remove the action control assignments first.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - Action control template ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteActionControlTemplate(
    params: IamPolicyManagementV1.DeleteActionControlTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId'];
    const _validParams = ['actionControlTemplateId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteActionControlTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a new action control template version.
   *
   * Create a new version of an action control template. Use this if you need to make updates to an action control
   * template that is committed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - The action control template ID.
   * @param {string} [params.name] - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it will change the name value for all existing versions of the template.
   * @param {string} [params.description] - Description of the action control template. This is shown to users in the
   * enterprise account. Use this to describe the purpose or context of the action control for enterprise users managing
   * IAM templates.
   * @param {TemplateActionControl} [params.actionControl] - The action control properties that are created in an action
   * resource when the template is assigned.
   * @param {boolean} [params.committed] - Committed status of the template version. If committed is set to true, then
   * the template version can no longer be updated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>>}
   */
  public createActionControlTemplateVersion(
    params: IamPolicyManagementV1.CreateActionControlTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId'];
    const _validParams = [
      'actionControlTemplateId',
      'name',
      'description',
      'actionControl',
      'committed',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'action_control': _params.actionControl,
      'committed': _params.committed,
    };

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createActionControlTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}/versions',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

  /**
   * Retrieve action control template versions.
   *
   * Retrieve the versions of an action control template by providing an action control template ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - The action control template ID.
   * @param {string} [params.state] - Action control template state.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplateVersionsCollection>>}
   */
  public listActionControlTemplateVersions(
    params: IamPolicyManagementV1.ListActionControlTemplateVersionsParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplateVersionsCollection>
  > {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId'];
    const _validParams = [
      'actionControlTemplateId',
      'state',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listActionControlTemplateVersions'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}/versions',
        method: 'GET',
        qs: query,
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

  /**
   * Update an action control template version.
   *
   * Update a specific version of an action control template. You can use this only if the version isn't committed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - Action control template ID.
   * @param {string} params.version - Action control template version.
   * @param {string} params.ifMatch - The revision number for updating an action control template version must match the
   * Etag value of the existing action control template version. The Etag can be retrieved using the GET
   * /v1/action_control_templates/{template_id}/versions/{version} API and looking at the Etag response header.
   * @param {string} [params.name] - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it will change the name value for all existing versions of the template.
   * @param {string} [params.description] - Description of the action control template. This is shown to users in the
   * enterprise account. Use this to describe the purpose or context of the action control for enterprise users managing
   * IAM templates.
   * @param {TemplateActionControl} [params.actionControl] - The action control properties that are created in an action
   * resource when the template is assigned.
   * @param {boolean} [params.committed] - Committed status of the template version. If committed is set to true, then
   * the template version can no longer be updated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>>}
   */
  public replaceActionControlTemplate(
    params: IamPolicyManagementV1.ReplaceActionControlTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId', 'version', 'ifMatch'];
    const _validParams = [
      'actionControlTemplateId',
      'version',
      'ifMatch',
      'name',
      'description',
      'actionControl',
      'committed',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'action_control': _params.actionControl,
      'committed': _params.committed,
    };

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceActionControlTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}/versions/{version}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Delete an action control template version.
   *
   * Delete a specific version of an action control template by providing an action control template ID and version
   * number. You can't delete an action control template version that is assigned to one or more child accounts. You
   * must remove the action control assignments first.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - Action control template ID.
   * @param {string} params.version - Action control template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteActionControlTemplateVersion(
    params: IamPolicyManagementV1.DeleteActionControlTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId', 'version'];
    const _validParams = ['actionControlTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteActionControlTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}/versions/{version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve an action control template version.
   *
   * Retrieve an action control template by providing an action control template ID and version number.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - Action control template ID.
   * @param {string} params.version - Action control template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>>}
   */
  public getActionControlTemplateVersion(
    params: IamPolicyManagementV1.GetActionControlTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId', 'version'];
    const _validParams = ['actionControlTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getActionControlTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}/versions/{version}',
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

  /**
   * Commit an action control template version.
   *
   * Commit an action control template version. You cannot make any further changes to the action control template once
   * it's committed. If you have to make updates after committing a version, create a new version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.actionControlTemplateId - Action control template ID.
   * @param {string} params.version - The action control template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public commitActionControlTemplate(
    params: IamPolicyManagementV1.CommitActionControlTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['actionControlTemplateId', 'version'];
    const _validParams = ['actionControlTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'action_control_template_id': _params.actionControlTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'commitActionControlTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_templates/{action_control_template_id}/versions/{version}/commit',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * actionControlAssignments
   ************************/

  /**
   * Get action control template assignments.
   *
   * Get action control template assignments by attributes. The following attributes are supported:
   * `account_id`, `template_id`, `template_version`, `sort`.
   * `account_id` is a required query parameter. Only action control template assignments with the specified attributes
   * and  accessible by the caller are returned. If the caller does not have read access to any action control template
   * assignments, an empty array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID in which the action control assignment belongs to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.templateId] - Optional template ID.
   * @param {string} [params.templateVersion] - Optional action control template version.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignmentCollection>>}
   */
  public listActionControlAssignments(
    params: IamPolicyManagementV1.ListActionControlAssignmentsParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignmentCollection>
  > {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'acceptLanguage',
      'templateId',
      'templateVersion',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'template_id': _params.templateId,
      'template_version': _params.templateVersion,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listActionControlAssignments'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_assignments',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create an action control template assignment.
   *
   * Assign an action control template to child accounts and account groups. This creates the action control in the
   * accounts and account groups that you specify.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {AssignmentTargetDetails} params.target - assignment target account and type.
   * @param {ActionControlAssignmentTemplate[]} params.templates - List of action control template details for action
   * control assignment.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignmentCollection>>}
   */
  public createActionControlTemplateAssignment(
    params: IamPolicyManagementV1.CreateActionControlTemplateAssignmentParams
  ): Promise<
    IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignmentCollection>
  > {
    const _params = { ...params };
    const _requiredParams = ['target', 'templates'];
    const _validParams = ['target', 'templates', 'acceptLanguage', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'target': _params.target,
      'templates': _params.templates,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createActionControlTemplateAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_assignments',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Retrieve an action control assignment.
   *
   * Retrieve an action control template assignment by providing an action control assignment ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - Action control template assignment ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignment>>}
   */
  public getActionControlAssignment(
    params: IamPolicyManagementV1.GetActionControlAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignment>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getActionControlAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_assignments/{assignment_id}',
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

  /**
   * Update an action control assignment.
   *
   * Update an action control assignment by providing an action control assignment ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - Action control template assignment ID.
   * @param {string} params.ifMatch - The revision number for updating an action control assignment and must match the
   * Etag value of the existing action control assignment. The Etag can be retrieved using the GET
   * /v1/action_control_assignments/{assignment_id} API and looking at the Etag response header.
   * @param {string} params.templateVersion - The version number of the template used to identify different versions of
   * same template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignment>>}
   */
  public updateActionControlAssignment(
    params: IamPolicyManagementV1.UpdateActionControlAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.ActionControlAssignment>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId', 'ifMatch', 'templateVersion'];
    const _validParams = ['assignmentId', 'ifMatch', 'templateVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'template_version': _params.templateVersion,
    };

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateActionControlAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_assignments/{assignment_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Remove an action control assignment.
   *
   * Remove an action control template assignment by providing an action control assignment ID. You can't delete an
   * action control assignment if the status is "in_progress".
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - Action control template assignment ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteActionControlAssignment(
    params: IamPolicyManagementV1.DeleteActionControlAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteActionControlAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/action_control_assignments/{assignment_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * roleTemplates
   ************************/

  /**
   * List role templates by attributes.
   *
   * List role templates and filter by attributes by using query parameters. The following attributes are supported:
   * `account_id`, `name`, `role_name`, `role_service_name`, `state`, `limit`, `start`.
   * `account_id` is a required query parameter. Only role templates that have the specified attributes and that the
   * caller has read access to are returned. If the caller does not have read access to any role templates an empty
   * array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID that the role templates belong to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.name] - The role template name.
   * @param {string} [params.roleName] - The template role name.
   * @param {string} [params.roleServiceName] - The template role service name.
   * @param {string} [params.state] - The role template state.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplateCollection>>}
   */
  public listRoleTemplates(
    params: IamPolicyManagementV1.ListRoleTemplatesParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplateCollection>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'acceptLanguage',
      'name',
      'roleName',
      'roleServiceName',
      'state',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'name': _params.name,
      'role_name': _params.roleName,
      'role_service_name': _params.roleServiceName,
      'state': _params.state,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listRoleTemplates'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create role template.
   *
   * Create a role template. Role templates define roles from an existing system or service defined role.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it changes the name value for all existing versions of the template.
   * @param {string} params.accountId - Enterprise account ID where this template is created.
   * @param {string} [params.description] - Description of the role template. This is shown to users in the enterprise
   * account. Use this to describe the purpose or context of the role for enterprise users managing IAM templates.
   * @param {boolean} [params.committed] - Committed status of the template. If committed is set to true, then the
   * template version can no longer be updated.
   * @param {RoleTemplatePrototypeRole} [params.role] - The role properties that are created in an action resource when
   * the template is assigned.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>>}
   */
  public createRoleTemplate(
    params: IamPolicyManagementV1.CreateRoleTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'accountId'];
    const _validParams = [
      'name',
      'accountId',
      'description',
      'committed',
      'role',
      'acceptLanguage',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'account_id': _params.accountId,
      'description': _params.description,
      'committed': _params.committed,
      'role': _params.role,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createRoleTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Retrieve the latest version of a role template.
   *
   * Retrieve the latest version of a role template by providing a role template ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - Role template ID.
   * @param {string} [params.state] - The role template state.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>>}
   */
  public getRoleTemplate(
    params: IamPolicyManagementV1.GetRoleTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId'];
    const _validParams = ['roleTemplateId', 'state', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
    };

    const path = {
      'role_template_id': _params.roleTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getRoleTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}',
        method: 'GET',
        qs: query,
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

  /**
   * Delete a Role template.
   *
   * Delete a role template by providing the role template ID. This deletes all versions of this template. A role
   * template can't be deleted if any version of the template is assigned to one or more child accounts. You must remove
   * the role assignments first.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - Role template ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteRoleTemplate(
    params: IamPolicyManagementV1.DeleteRoleTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId'];
    const _validParams = ['roleTemplateId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'role_template_id': _params.roleTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteRoleTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a new role template version.
   *
   * Create a new version of a role template. Use this if you need to make updates to a role template that is committed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - The role template ID.
   * @param {string} [params.name] - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it will change the name value for all existing versions of the template.
   * @param {string} [params.description] - Description of the role template. This is shown to users in the enterprise
   * account. Use this to describe the purpose or context of the role for enterprise users managing IAM templates.
   * @param {TemplateRole} [params.role] - The role properties that are created in an action resource when the template
   * is assigned.
   * @param {boolean} [params.committed] - Committed status of the template version. If committed is set to true, then
   * the template version can no longer be updated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>>}
   */
  public createRoleTemplateVersion(
    params: IamPolicyManagementV1.CreateRoleTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId'];
    const _validParams = [
      'roleTemplateId',
      'name',
      'description',
      'role',
      'committed',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'role': _params.role,
      'committed': _params.committed,
    };

    const path = {
      'role_template_id': _params.roleTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createRoleTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}/versions',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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

  /**
   * Retrieve role template versions.
   *
   * Retrieve the versions of a role template by providing a role template ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - The role template ID.
   * @param {string} [params.state] - Role template state.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplateVersionsCollection>>}
   */
  public listRoleTemplateVersions(
    params: IamPolicyManagementV1.ListRoleTemplateVersionsParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplateVersionsCollection>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId'];
    const _validParams = ['roleTemplateId', 'state', 'limit', 'start', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'state': _params.state,
      'limit': _params.limit,
      'start': _params.start,
    };

    const path = {
      'role_template_id': _params.roleTemplateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listRoleTemplateVersions'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}/versions',
        method: 'GET',
        qs: query,
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

  /**
   * Update a role template version.
   *
   * Update a specific version of a role template. You can use this only if the version isn't committed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - Role template ID.
   * @param {string} params.version - Role template version.
   * @param {string} params.ifMatch - The revision number for updating a role template version must match the Etag value
   * of the existing role template version. The Etag can be retrieved using the GET
   * /v1/role_templates/{template_id}/versions/{version} API and looking at the Etag response header.
   * @param {string} [params.name] - Required field when creating a new template. Otherwise, this field is optional. If
   * the field is included, it will change the name value for all existing versions of the template.
   * @param {string} [params.description] - Description of the role template. This is shown to users in the enterprise
   * account. Use this to describe the purpose or context of the role for enterprise users managing IAM templates.
   * @param {TemplateRole} [params.role] - The role properties that are created in an action resource when the template
   * is assigned.
   * @param {boolean} [params.committed] - Committed status of the template version. If committed is set to true, then
   * the template version can no longer be updated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>>}
   */
  public replaceRoleTemplate(
    params: IamPolicyManagementV1.ReplaceRoleTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId', 'version', 'ifMatch'];
    const _validParams = [
      'roleTemplateId',
      'version',
      'ifMatch',
      'name',
      'description',
      'role',
      'committed',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'role': _params.role,
      'committed': _params.committed,
    };

    const path = {
      'role_template_id': _params.roleTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceRoleTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}/versions/{version}',
        method: 'PUT',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Delete a role template version.
   *
   * Delete a specific version of a role template by providing a role template ID and version number. You can't delete a
   * role template version that is assigned to one or more child accounts. You must remove the role assignments first.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - Role template ID.
   * @param {string} params.version - Role template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteRoleTemplateVersion(
    params: IamPolicyManagementV1.DeleteRoleTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId', 'version'];
    const _validParams = ['roleTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'role_template_id': _params.roleTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteRoleTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}/versions/{version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Retrieve a role template version.
   *
   * Retrieve a role template by providing a role template ID and version number.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - Role template ID.
   * @param {string} params.version - Role template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>>}
   */
  public getRoleTemplateVersion(
    params: IamPolicyManagementV1.GetRoleTemplateVersionParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleTemplate>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId', 'version'];
    const _validParams = ['roleTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'role_template_id': _params.roleTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getRoleTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}/versions/{version}',
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

  /**
   * Commit a role template version.
   *
   * Commit a role template version. You cannot make any further changes to the role template once it's committed. If
   * you have to make updates after committing a version, create a new version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.roleTemplateId - Role template ID.
   * @param {string} params.version - The role template version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public commitRoleTemplate(
    params: IamPolicyManagementV1.CommitRoleTemplateParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['roleTemplateId', 'version'];
    const _validParams = ['roleTemplateId', 'version', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'role_template_id': _params.roleTemplateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'commitRoleTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/role_templates/{role_template_id}/versions/{version}/commit',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
        axiosOptions: {
          signal: _params.signal,
        },
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * roleAssignments
   ************************/

  /**
   * Get role template assignments.
   *
   * Get role template assignments by attributes. The following attributes are supported:
   * `account_id`, `template_id`, `template_version`, `target`, `target_type`, `limit`, `start`.
   * `account_id` is a required query parameter. Only role template assignments with the specified attributes and
   * accessible by the caller are returned. If the caller does not have read access to any role template assignments, an
   * empty array is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account GUID in which the role assignment belongs to.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {string} [params.templateId] - Optional template ID.
   * @param {string} [params.templateVersion] - Optional role template version.
   * @param {number} [params.limit] - The number of documents to include in the collection.
   * @param {string} [params.start] - Page token that refers to the page of the collection to return.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignmentCollection>>}
   */
  public listRoleAssignments(
    params: IamPolicyManagementV1.ListRoleAssignmentsParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignmentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'acceptLanguage',
      'templateId',
      'templateVersion',
      'limit',
      'start',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'template_id': _params.templateId,
      'template_version': _params.templateVersion,
      'limit': _params.limit,
      'start': _params.start,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listRoleAssignments'
    );

    const parameters = {
      options: {
        url: '/v1/role_assignments',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Create a role template assignment.
   *
   * Assign a role template to child accounts and account groups. This creates the role in the accounts and account
   * groups that you specify.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {AssignmentTargetDetails} params.target - assignment target account and type.
   * @param {RoleAssignmentTemplate[]} params.templates - List of role template details for role assignment.
   * @param {string} [params.acceptLanguage] - Language code for translations
   * * `default` - English
   * * `de` -  German (Standard)
   * * `en` - English
   * * `es` - Spanish (Spain)
   * * `fr` - French (Standard)
   * * `it` - Italian (Standard)
   * * `ja` - Japanese
   * * `ko` - Korean
   * * `pt-br` - Portuguese (Brazil)
   * * `zh-cn` - Chinese (Simplified, PRC)
   * * `zh-tw` - (Chinese, Taiwan).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignmentCollection>>}
   */
  public createRoleTemplateAssignment(
    params: IamPolicyManagementV1.CreateRoleTemplateAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignmentCollection>> {
    const _params = { ...params };
    const _requiredParams = ['target', 'templates'];
    const _validParams = ['target', 'templates', 'acceptLanguage', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'target': _params.target,
      'templates': _params.templates,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createRoleTemplateAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/role_assignments',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
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

  /**
   * Retrieve a role assignment.
   *
   * Retrieve a role template assignment by providing a role assignment ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - Role template assignment ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignment>>}
   */
  public getRoleAssignment(
    params: IamPolicyManagementV1.GetRoleAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignment>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getRoleAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/role_assignments/{assignment_id}',
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

  /**
   * Update a role assignment.
   *
   * Update a role assignment by providing a role assignment ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - Role template assignment ID.
   * @param {string} params.ifMatch - The revision number for updating a role assignment and must match the Etag value
   * of the existing role assignment. The Etag can be retrieved using the GET /v1/role_assignments/{assignment_id} API
   * and looking at the Etag response header.
   * @param {string} params.templateVersion - The version number of the template used to identify different versions of
   * same template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignment>>}
   */
  public updateRoleAssignment(
    params: IamPolicyManagementV1.UpdateRoleAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleAssignment>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId', 'ifMatch', 'templateVersion'];
    const _validParams = ['assignmentId', 'ifMatch', 'templateVersion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'template_version': _params.templateVersion,
    };

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateRoleAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/role_assignments/{assignment_id}',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
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

  /**
   * Remove a role assignment.
   *
   * Remove a role template assignment by providing a role assignment ID. You can't delete a role assignment if the
   * status is "in_progress".
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - Role template assignment ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>>}
   */
  public deleteRoleAssignment(
    params: IamPolicyManagementV1.DeleteRoleAssignmentParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteRoleAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/role_assignments/{assignment_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, this.baseOptions.headers, {}, _params.headers),
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

namespace IamPolicyManagementV1 {
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

  /** Parameters for the `listPolicies` operation. */
  export interface ListPoliciesParams extends DefaultParams {
    /** The account GUID that the policies belong to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** Optional IAM ID used to identify the subject. */
    iamId?: string;
    /** Optional access group id. */
    accessGroupId?: string;
    /** Optional type of policy. */
    type?: ListPoliciesConstants.Type | string;
    /** Optional type of service. */
    serviceType?: ListPoliciesConstants.ServiceType | string;
    /** Optional name of the access tag in the policy. */
    tagName?: string;
    /** Optional value of the access tag in the policy. */
    tagValue?: string;
    /** Optional top level policy field to sort results. Ascending sort is default. Descending sort available by
     *  prepending '-' to field. Example '-last_modified_at'.
     */
    sort?: ListPoliciesConstants.Sort | string;
    /** Include additional data per policy returned
     *  * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of
     *  times it has done so
     *  * `display` - returns the list of all actions included in each of the policy roles.
     */
    format?: ListPoliciesConstants.Format | string;
    /** The state of the policy. * `active` - returns active policies * `deleted` - returns non-active policies. */
    state?: ListPoliciesConstants.State | string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Constants for the `listPolicies` operation. */
  export namespace ListPoliciesConstants {
    /** Optional type of policy. */
    export enum Type {
      ACCESS = 'access',
      AUTHORIZATION = 'authorization',
    }
    /** Optional type of service. */
    export enum ServiceType {
      SERVICE = 'service',
      PLATFORM_SERVICE = 'platform_service',
    }
    /** Optional top level policy field to sort results. Ascending sort is default. Descending sort available by prepending '-' to field. Example '-last_modified_at'. */
    export enum Sort {
      ID = 'id',
      TYPE = 'type',
      HREF = 'href',
      CREATED_AT = 'created_at',
      CREATED_BY_ID = 'created_by_id',
      LAST_MODIFIED_AT = 'last_modified_at',
      LAST_MODIFIED_BY_ID = 'last_modified_by_id',
      STATE = 'state',
    }
    /** Include additional data per policy returned * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times it has done so * `display` - returns the list of all actions included in each of the policy roles. */
    export enum Format {
      INCLUDE_LAST_PERMIT = 'include_last_permit',
      DISPLAY = 'display',
    }
    /** The state of the policy. * `active` - returns active policies * `deleted` - returns non-active policies. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `createPolicy` operation. */
  export interface CreatePolicyParams extends DefaultParams {
    /** The policy type; either 'access' or 'authorization'. */
    type: string;
    /** The subjects associated with a policy. */
    subjects: PolicySubject[];
    /** A set of role Cloud Resource Names (CRNs) granted by the policy. */
    roles: PolicyRole[];
    /** The resources associated with a policy. */
    resources: PolicyResource[];
    /** Customer-defined description. */
    description?: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `replacePolicy` operation. */
  export interface ReplacePolicyParams extends DefaultParams {
    /** The policy ID. */
    policyId: string;
    /** The revision number for updating a policy and must match the ETag value of the existing policy. The Etag can
     *  be retrieved using the GET /v1/policies/{policy_id} API and looking at the ETag response header.
     */
    ifMatch: string;
    /** The policy type; either 'access' or 'authorization'. */
    type: string;
    /** The subjects associated with a policy. */
    subjects: PolicySubject[];
    /** A set of role Cloud Resource Names (CRNs) granted by the policy. */
    roles: PolicyRole[];
    /** The resources associated with a policy. */
    resources: PolicyResource[];
    /** Customer-defined description. */
    description?: string;
  }

  /** Parameters for the `getPolicy` operation. */
  export interface GetPolicyParams extends DefaultParams {
    /** The policy ID. */
    policyId: string;
  }

  /** Parameters for the `deletePolicy` operation. */
  export interface DeletePolicyParams extends DefaultParams {
    /** The policy ID. */
    policyId: string;
  }

  /** Parameters for the `updatePolicyState` operation. */
  export interface UpdatePolicyStateParams extends DefaultParams {
    /** The policy ID. */
    policyId: string;
    /** The revision number for updating a policy and must match the ETag value of the existing policy. The Etag can
     *  be retrieved using the GET /v1/policies/{policy_id} API and looking at the ETag response header.
     */
    ifMatch: string;
    /** The policy state. */
    state?: UpdatePolicyStateConstants.State | string;
  }

  /** Constants for the `updatePolicyState` operation. */
  export namespace UpdatePolicyStateConstants {
    /** The policy state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `listRoles` operation. */
  export interface ListRolesParams extends DefaultParams {
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** Optional account GUID in which the roles belong to. */
    accountId?: string;
    /** Optional name of IAM enabled service. */
    serviceName?: string;
    /** Optional name of source IAM enabled service. */
    sourceServiceName?: string;
    /** Optional Policy Type. */
    policyType?: string;
    /** Optional id of service group. */
    serviceGroupId?: string;
  }

  /** Parameters for the `createRole` operation. */
  export interface CreateRoleParams extends DefaultParams {
    /** The display the name of the role that is shown in the console. */
    displayName: string;
    /** The actions of the role. For more information, see [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The name of the role that is used in the CRN. This must be alphanumeric and capitalized. */
    name: string;
    /** The account GUID. */
    accountId: string;
    /** The service name. */
    serviceName: string;
    /** The description of the role. */
    description?: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `replaceRole` operation. */
  export interface ReplaceRoleParams extends DefaultParams {
    /** The role ID. */
    roleId: string;
    /** The revision number for updating a role and must match the ETag value of the existing role. The Etag can be
     *  retrieved using the GET /v2/roles/{role_id} API and looking at the ETag response header.
     */
    ifMatch: string;
    /** The display the name of the role that is shown in the console. */
    displayName: string;
    /** The actions of the role. For more information, see [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The description of the role. */
    description?: string;
  }

  /** Parameters for the `getRole` operation. */
  export interface GetRoleParams extends DefaultParams {
    /** The role ID. */
    roleId: string;
  }

  /** Parameters for the `deleteRole` operation. */
  export interface DeleteRoleParams extends DefaultParams {
    /** The role ID. */
    roleId: string;
  }

  /** Parameters for the `listV2Policies` operation. */
  export interface ListV2PoliciesParams extends DefaultParams {
    /** The account GUID in which the policies belong to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** Optional IAM ID used to identify the subject. */
    iamId?: string;
    /** Optional access group id. */
    accessGroupId?: string;
    /** Optional type of policy. */
    type?: ListV2PoliciesConstants.Type | string;
    /** Optional type of service. */
    serviceType?: ListV2PoliciesConstants.ServiceType | string;
    /** Optional name of service. */
    serviceName?: string;
    /** Optional ID of service group. */
    serviceGroupId?: string;
    /** Optional top level policy field to sort results. Ascending sort is default. Descending sort available by
     *  prepending '-' to field, for example, '-last_modified_at'. Note that last permit information is only included
     *  when 'format=include_last_permit', for example, "format=include_last_permit&sort=last_permit_at" Example fields
     *  that can be sorted on:
     *    - 'id'
     *    - 'type'
     *    - 'href'
     *    - 'created_at'
     *    - 'created_by_id'
     *    - 'last_modified_at'
     *    - 'last_modified_by_id'
     *    - 'state'
     *    - 'last_permit_at'
     *    - 'last_permit_frequency'.
     */
    sort?: string;
    /** Include additional data per policy returned
     *  * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of
     *  times it has done so
     *  * `display` - returns the list of all actions included in each of the policy roles and translations for all
     *  relevant fields.
     */
    format?: ListV2PoliciesConstants.Format | string;
    /** The state of the policy. * `active` - returns active policies * `deleted` - returns non-active policies. */
    state?: ListV2PoliciesConstants.State | string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Constants for the `listV2Policies` operation. */
  export namespace ListV2PoliciesConstants {
    /** Optional type of policy. */
    export enum Type {
      ACCESS = 'access',
      AUTHORIZATION = 'authorization',
    }
    /** Optional type of service. */
    export enum ServiceType {
      SERVICE = 'service',
      PLATFORM_SERVICE = 'platform_service',
    }
    /** Include additional data per policy returned * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times it has done so * `display` - returns the list of all actions included in each of the policy roles and translations for all relevant fields. */
    export enum Format {
      INCLUDE_LAST_PERMIT = 'include_last_permit',
      DISPLAY = 'display',
    }
    /** The state of the policy. * `active` - returns active policies * `deleted` - returns non-active policies. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `createV2Policy` operation. */
  export interface CreateV2PolicyParams extends DefaultParams {
    /** Specifies the type of access that is granted by the policy. */
    control: Control;
    /** The policy type; either 'access' or 'authorization'. */
    type: CreateV2PolicyConstants.Type | string;
    /** Description of the policy. */
    description?: string;
    /** The subject attributes for whom the policy grants access. */
    subject?: V2PolicySubject;
    /** The resource attributes to which the policy grants access. */
    resource?: V2PolicyResource;
    /** Indicates pattern of rule, either 'time-based-conditions:once', 'time-based-conditions:weekly:all-day', or
     *  'time-based-conditions:weekly:custom-hours'.
     */
    pattern?: string;
    /** Additional access conditions associated with the policy. */
    rule?: V2PolicyRule;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Constants for the `createV2Policy` operation. */
  export namespace CreateV2PolicyConstants {
    /** The policy type; either 'access' or 'authorization'. */
    export enum Type {
      ACCESS = 'access',
      AUTHORIZATION = 'authorization',
    }
  }

  /** Parameters for the `replaceV2Policy` operation. */
  export interface ReplaceV2PolicyParams extends DefaultParams {
    /** The policy ID. */
    id: string;
    /** The revision number for updating a policy and must match the ETag value of the existing policy. The Etag can
     *  be retrieved using the GET /v2/policies/{id} API and looking at the ETag response header.
     */
    ifMatch: string;
    /** Specifies the type of access that is granted by the policy. */
    control: Control;
    /** The policy type; either 'access' or 'authorization'. */
    type: ReplaceV2PolicyConstants.Type | string;
    /** Description of the policy. */
    description?: string;
    /** The subject attributes for whom the policy grants access. */
    subject?: V2PolicySubject;
    /** The resource attributes to which the policy grants access. */
    resource?: V2PolicyResource;
    /** Indicates pattern of rule, either 'time-based-conditions:once', 'time-based-conditions:weekly:all-day', or
     *  'time-based-conditions:weekly:custom-hours'.
     */
    pattern?: string;
    /** Additional access conditions associated with the policy. */
    rule?: V2PolicyRule;
  }

  /** Constants for the `replaceV2Policy` operation. */
  export namespace ReplaceV2PolicyConstants {
    /** The policy type; either 'access' or 'authorization'. */
    export enum Type {
      ACCESS = 'access',
      AUTHORIZATION = 'authorization',
    }
  }

  /** Parameters for the `getV2Policy` operation. */
  export interface GetV2PolicyParams extends DefaultParams {
    /** The policy ID. */
    id: string;
    /** Include additional data for policy returned
     *  * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of
     *  times it has done so
     *  * `display` - returns the list of all actions included in each of the policy roles and translations for all
     *  relevant fields.
     */
    format?: GetV2PolicyConstants.Format | string;
  }

  /** Constants for the `getV2Policy` operation. */
  export namespace GetV2PolicyConstants {
    /** Include additional data for policy returned * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times it has done so * `display` - returns the list of all actions included in each of the policy roles and translations for all relevant fields. */
    export enum Format {
      INCLUDE_LAST_PERMIT = 'include_last_permit',
      DISPLAY = 'display',
    }
  }

  /** Parameters for the `deleteV2Policy` operation. */
  export interface DeleteV2PolicyParams extends DefaultParams {
    /** The policy ID. */
    id: string;
  }

  /** Parameters for the `listPolicyTemplates` operation. */
  export interface ListPolicyTemplatesParams extends DefaultParams {
    /** The account GUID that the policy templates belong to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** The policy template state. */
    state?: ListPolicyTemplatesConstants.State | string;
    /** The policy template name. */
    name?: string;
    /** Service type, Optional. */
    policyServiceType?: ListPolicyTemplatesConstants.PolicyServiceType | string;
    /** Service name, Optional. */
    policyServiceName?: string;
    /** Service group id, Optional. */
    policyServiceGroupId?: string;
    /** Policy type, Optional. */
    policyType?: ListPolicyTemplatesConstants.PolicyType | string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Constants for the `listPolicyTemplates` operation. */
  export namespace ListPolicyTemplatesConstants {
    /** The policy template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
    /** Service type, Optional. */
    export enum PolicyServiceType {
      SERVICE = 'service',
      PLATFORM_SERVICE = 'platform_service',
    }
    /** Policy type, Optional. */
    export enum PolicyType {
      ACCESS = 'access',
      AUTHORIZATION = 'authorization',
    }
  }

  /** Parameters for the `createPolicyTemplate` operation. */
  export interface CreatePolicyTemplateParams extends DefaultParams {
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name: string;
    /** Enterprise account ID where this template is created. */
    accountId: string;
    /** The core set of properties associated with the template's policy object. */
    policy: TemplatePolicy;
    /** Description of the policy template. This is shown to users in the enterprise account. Use this to describe
     *  the purpose or context of the policy for enterprise users managing IAM templates.
     */
    description?: string;
    /** Committed status of the template. */
    committed?: boolean;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `getPolicyTemplate` operation. */
  export interface GetPolicyTemplateParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
    /** The policy template state. */
    state?: GetPolicyTemplateConstants.State | string;
  }

  /** Constants for the `getPolicyTemplate` operation. */
  export namespace GetPolicyTemplateConstants {
    /** The policy template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `deletePolicyTemplate` operation. */
  export interface DeletePolicyTemplateParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
  }

  /** Parameters for the `createPolicyTemplateVersion` operation. */
  export interface CreatePolicyTemplateVersionParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
    /** The core set of properties associated with the template's policy object. */
    policy: TemplatePolicy;
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name?: string;
    /** Description of the policy template. This is shown to users in the enterprise account. Use this to describe
     *  the purpose or context of the policy for enterprise users managing IAM templates.
     */
    description?: string;
    /** Committed status of the template version. */
    committed?: boolean;
  }

  /** Parameters for the `listPolicyTemplateVersions` operation. */
  export interface ListPolicyTemplateVersionsParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
    /** The policy template state. */
    state?: ListPolicyTemplateVersionsConstants.State | string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Constants for the `listPolicyTemplateVersions` operation. */
  export namespace ListPolicyTemplateVersionsConstants {
    /** The policy template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `replacePolicyTemplate` operation. */
  export interface ReplacePolicyTemplateParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
    /** The policy template version. */
    version: string;
    /** The revision number for updating a policy template version and must match the Etag value of the existing
     *  policy template version. The Etag can be retrieved using the GET
     *  /v1/policy_templates/{policy_template_id}/versions/{version} API and looking at the Etag response header.
     */
    ifMatch: string;
    /** The core set of properties associated with the template's policy object. */
    policy: TemplatePolicy;
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name?: string;
    /** Description of the policy template. This is shown to users in the enterprise account. Use this to describe
     *  the purpose or context of the policy for enterprise users managing IAM templates.
     */
    description?: string;
    /** Committed status of the template version. */
    committed?: boolean;
  }

  /** Parameters for the `deletePolicyTemplateVersion` operation. */
  export interface DeletePolicyTemplateVersionParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
    /** The policy template version. */
    version: string;
  }

  /** Parameters for the `getPolicyTemplateVersion` operation. */
  export interface GetPolicyTemplateVersionParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
    /** The policy template version. */
    version: string;
  }

  /** Parameters for the `commitPolicyTemplate` operation. */
  export interface CommitPolicyTemplateParams extends DefaultParams {
    /** The policy template ID. */
    policyTemplateId: string;
    /** The policy template version. */
    version: string;
  }

  /** Parameters for the `listPolicyAssignments` operation. */
  export interface ListPolicyAssignmentsParams extends DefaultParams {
    /** specify version of response body format. */
    version: string;
    /** The account GUID in which the policies belong to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** Optional template id. */
    templateId?: string;
    /** Optional policy template version. */
    templateVersion?: string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Parameters for the `createPolicyTemplateAssignment` operation. */
  export interface CreatePolicyTemplateAssignmentParams extends DefaultParams {
    /** specify version of response body format. */
    version: string;
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** List of template details for policy assignment. */
    templates: AssignmentTemplateDetails[];
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `getPolicyAssignment` operation. */
  export interface GetPolicyAssignmentParams extends DefaultParams {
    /** The policy template assignment ID. */
    assignmentId: string;
    /** specify version of response body format. */
    version: string;
  }

  /** Parameters for the `updatePolicyAssignment` operation. */
  export interface UpdatePolicyAssignmentParams extends DefaultParams {
    /** The policy template assignment ID. */
    assignmentId: string;
    /** specify version of response body format. */
    version: string;
    /** The revision number for updating a policy assignment and must match the Etag value of the existing policy
     *  assignment. The Etag can be retrieved using the GET /v1/policy_assignments/{assignment_id} API and looking at
     *  the Etag response header.
     */
    ifMatch: string;
    /** The policy template version to update to. */
    templateVersion: string;
  }

  /** Parameters for the `deletePolicyAssignment` operation. */
  export interface DeletePolicyAssignmentParams extends DefaultParams {
    /** The policy template assignment ID. */
    assignmentId: string;
  }

  /** Parameters for the `getSettings` operation. */
  export interface GetSettingsParams extends DefaultParams {
    /** The account GUID that the settings belong to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `updateSettings` operation. */
  export interface UpdateSettingsParams extends DefaultParams {
    /** The account GUID that the settings belong to. */
    accountId: string;
    /** The revision number for updating Access Management Account Settings and must match the Etag value of the
     *  existing Access Management Account Settings. The Etag can be retrieved using the GET
     *  /v1/accounts/{account_id}/settings/access_management API and looking at the Etag response header.
     */
    ifMatch: string;
    /** Update to how external accounts can interact in relation to the requested account. */
    externalAccountIdentityInteraction?: ExternalAccountIdentityInteractionPatch;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `listActionControlTemplates` operation. */
  export interface ListActionControlTemplatesParams extends DefaultParams {
    /** The account GUID that the action control templates belong to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Parameters for the `createActionControlTemplate` operation. */
  export interface CreateActionControlTemplateParams extends DefaultParams {
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name: string;
    /** Enterprise account ID where this template is created. */
    accountId: string;
    /** Description of the action control template. This is shown to users in the enterprise account. Use this to
     *  describe the purpose or context of the action control for enterprise users managing IAM templates.
     */
    description?: string;
    /** Committed status of the template. If committed is set to true, then the template version can no longer be
     *  updated.
     */
    committed?: boolean;
    /** The action control properties that are created in an action resource when the template is assigned. */
    actionControl?: TemplateActionControl;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `getActionControlTemplate` operation. */
  export interface GetActionControlTemplateParams extends DefaultParams {
    /** Action control template ID. */
    actionControlTemplateId: string;
    /** The action control template state. */
    state?: GetActionControlTemplateConstants.State | string;
  }

  /** Constants for the `getActionControlTemplate` operation. */
  export namespace GetActionControlTemplateConstants {
    /** The action control template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `deleteActionControlTemplate` operation. */
  export interface DeleteActionControlTemplateParams extends DefaultParams {
    /** Action control template ID. */
    actionControlTemplateId: string;
  }

  /** Parameters for the `createActionControlTemplateVersion` operation. */
  export interface CreateActionControlTemplateVersionParams extends DefaultParams {
    /** The action control template ID. */
    actionControlTemplateId: string;
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  will change the name value for all existing versions of the template.
     */
    name?: string;
    /** Description of the action control template. This is shown to users in the enterprise account. Use this to
     *  describe the purpose or context of the action control for enterprise users managing IAM templates.
     */
    description?: string;
    /** The action control properties that are created in an action resource when the template is assigned. */
    actionControl?: TemplateActionControl;
    /** Committed status of the template version. If committed is set to true, then the template version can no
     *  longer be updated.
     */
    committed?: boolean;
  }

  /** Parameters for the `listActionControlTemplateVersions` operation. */
  export interface ListActionControlTemplateVersionsParams extends DefaultParams {
    /** The action control template ID. */
    actionControlTemplateId: string;
    /** Action control template state. */
    state?: ListActionControlTemplateVersionsConstants.State | string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Constants for the `listActionControlTemplateVersions` operation. */
  export namespace ListActionControlTemplateVersionsConstants {
    /** Action control template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `replaceActionControlTemplate` operation. */
  export interface ReplaceActionControlTemplateParams extends DefaultParams {
    /** Action control template ID. */
    actionControlTemplateId: string;
    /** Action control template version. */
    version: string;
    /** The revision number for updating an action control template version must match the Etag value of the
     *  existing action control template version. The Etag can be retrieved using the GET
     *  /v1/action_control_templates/{template_id}/versions/{version} API and looking at the Etag response header.
     */
    ifMatch: string;
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  will change the name value for all existing versions of the template.
     */
    name?: string;
    /** Description of the action control template. This is shown to users in the enterprise account. Use this to
     *  describe the purpose or context of the action control for enterprise users managing IAM templates.
     */
    description?: string;
    /** The action control properties that are created in an action resource when the template is assigned. */
    actionControl?: TemplateActionControl;
    /** Committed status of the template version. If committed is set to true, then the template version can no
     *  longer be updated.
     */
    committed?: boolean;
  }

  /** Parameters for the `deleteActionControlTemplateVersion` operation. */
  export interface DeleteActionControlTemplateVersionParams extends DefaultParams {
    /** Action control template ID. */
    actionControlTemplateId: string;
    /** Action control template version. */
    version: string;
  }

  /** Parameters for the `getActionControlTemplateVersion` operation. */
  export interface GetActionControlTemplateVersionParams extends DefaultParams {
    /** Action control template ID. */
    actionControlTemplateId: string;
    /** Action control template version. */
    version: string;
  }

  /** Parameters for the `commitActionControlTemplate` operation. */
  export interface CommitActionControlTemplateParams extends DefaultParams {
    /** Action control template ID. */
    actionControlTemplateId: string;
    /** The action control template version. */
    version: string;
  }

  /** Parameters for the `listActionControlAssignments` operation. */
  export interface ListActionControlAssignmentsParams extends DefaultParams {
    /** The account GUID in which the action control assignment belongs to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** Optional template ID. */
    templateId?: string;
    /** Optional action control template version. */
    templateVersion?: string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Parameters for the `createActionControlTemplateAssignment` operation. */
  export interface CreateActionControlTemplateAssignmentParams extends DefaultParams {
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** List of action control template details for action control assignment. */
    templates: ActionControlAssignmentTemplate[];
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `getActionControlAssignment` operation. */
  export interface GetActionControlAssignmentParams extends DefaultParams {
    /** Action control template assignment ID. */
    assignmentId: string;
  }

  /** Parameters for the `updateActionControlAssignment` operation. */
  export interface UpdateActionControlAssignmentParams extends DefaultParams {
    /** Action control template assignment ID. */
    assignmentId: string;
    /** The revision number for updating an action control assignment and must match the Etag value of the existing
     *  action control assignment. The Etag can be retrieved using the GET
     *  /v1/action_control_assignments/{assignment_id} API and looking at the Etag response header.
     */
    ifMatch: string;
    /** The version number of the template used to identify different versions of same template. */
    templateVersion: string;
  }

  /** Parameters for the `deleteActionControlAssignment` operation. */
  export interface DeleteActionControlAssignmentParams extends DefaultParams {
    /** Action control template assignment ID. */
    assignmentId: string;
  }

  /** Parameters for the `listRoleTemplates` operation. */
  export interface ListRoleTemplatesParams extends DefaultParams {
    /** The account GUID that the role templates belong to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** The role template name. */
    name?: string;
    /** The template role name. */
    roleName?: string;
    /** The template role service name. */
    roleServiceName?: string;
    /** The role template state. */
    state?: ListRoleTemplatesConstants.State | string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Constants for the `listRoleTemplates` operation. */
  export namespace ListRoleTemplatesConstants {
    /** The role template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `createRoleTemplate` operation. */
  export interface CreateRoleTemplateParams extends DefaultParams {
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name: string;
    /** Enterprise account ID where this template is created. */
    accountId: string;
    /** Description of the role template. This is shown to users in the enterprise account. Use this to describe the
     *  purpose or context of the role for enterprise users managing IAM templates.
     */
    description?: string;
    /** Committed status of the template. If committed is set to true, then the template version can no longer be
     *  updated.
     */
    committed?: boolean;
    /** The role properties that are created in an action resource when the template is assigned. */
    role?: RoleTemplatePrototypeRole;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `getRoleTemplate` operation. */
  export interface GetRoleTemplateParams extends DefaultParams {
    /** Role template ID. */
    roleTemplateId: string;
    /** The role template state. */
    state?: GetRoleTemplateConstants.State | string;
  }

  /** Constants for the `getRoleTemplate` operation. */
  export namespace GetRoleTemplateConstants {
    /** The role template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `deleteRoleTemplate` operation. */
  export interface DeleteRoleTemplateParams extends DefaultParams {
    /** Role template ID. */
    roleTemplateId: string;
  }

  /** Parameters for the `createRoleTemplateVersion` operation. */
  export interface CreateRoleTemplateVersionParams extends DefaultParams {
    /** The role template ID. */
    roleTemplateId: string;
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  will change the name value for all existing versions of the template.
     */
    name?: string;
    /** Description of the role template. This is shown to users in the enterprise account. Use this to describe the
     *  purpose or context of the role for enterprise users managing IAM templates.
     */
    description?: string;
    /** The role properties that are created in an action resource when the template is assigned. */
    role?: TemplateRole;
    /** Committed status of the template version. If committed is set to true, then the template version can no
     *  longer be updated.
     */
    committed?: boolean;
  }

  /** Parameters for the `listRoleTemplateVersions` operation. */
  export interface ListRoleTemplateVersionsParams extends DefaultParams {
    /** The role template ID. */
    roleTemplateId: string;
    /** Role template state. */
    state?: ListRoleTemplateVersionsConstants.State | string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Constants for the `listRoleTemplateVersions` operation. */
  export namespace ListRoleTemplateVersionsConstants {
    /** Role template state. */
    export enum State {
      ACTIVE = 'active',
      DELETED = 'deleted',
    }
  }

  /** Parameters for the `replaceRoleTemplate` operation. */
  export interface ReplaceRoleTemplateParams extends DefaultParams {
    /** Role template ID. */
    roleTemplateId: string;
    /** Role template version. */
    version: string;
    /** The revision number for updating a role template version must match the Etag value of the existing role
     *  template version. The Etag can be retrieved using the GET /v1/role_templates/{template_id}/versions/{version}
     *  API and looking at the Etag response header.
     */
    ifMatch: string;
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  will change the name value for all existing versions of the template.
     */
    name?: string;
    /** Description of the role template. This is shown to users in the enterprise account. Use this to describe the
     *  purpose or context of the role for enterprise users managing IAM templates.
     */
    description?: string;
    /** The role properties that are created in an action resource when the template is assigned. */
    role?: TemplateRole;
    /** Committed status of the template version. If committed is set to true, then the template version can no
     *  longer be updated.
     */
    committed?: boolean;
  }

  /** Parameters for the `deleteRoleTemplateVersion` operation. */
  export interface DeleteRoleTemplateVersionParams extends DefaultParams {
    /** Role template ID. */
    roleTemplateId: string;
    /** Role template version. */
    version: string;
  }

  /** Parameters for the `getRoleTemplateVersion` operation. */
  export interface GetRoleTemplateVersionParams extends DefaultParams {
    /** Role template ID. */
    roleTemplateId: string;
    /** Role template version. */
    version: string;
  }

  /** Parameters for the `commitRoleTemplate` operation. */
  export interface CommitRoleTemplateParams extends DefaultParams {
    /** Role template ID. */
    roleTemplateId: string;
    /** The role template version. */
    version: string;
  }

  /** Parameters for the `listRoleAssignments` operation. */
  export interface ListRoleAssignmentsParams extends DefaultParams {
    /** The account GUID in which the role assignment belongs to. */
    accountId: string;
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
    /** Optional template ID. */
    templateId?: string;
    /** Optional role template version. */
    templateVersion?: string;
    /** The number of documents to include in the collection. */
    limit?: number;
    /** Page token that refers to the page of the collection to return. */
    start?: string;
  }

  /** Parameters for the `createRoleTemplateAssignment` operation. */
  export interface CreateRoleTemplateAssignmentParams extends DefaultParams {
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** List of role template details for role assignment. */
    templates: RoleAssignmentTemplate[];
    /** Language code for translations
     *  * `default` - English
     *  * `de` -  German (Standard)
     *  * `en` - English
     *  * `es` - Spanish (Spain)
     *  * `fr` - French (Standard)
     *  * `it` - Italian (Standard)
     *  * `ja` - Japanese
     *  * `ko` - Korean
     *  * `pt-br` - Portuguese (Brazil)
     *  * `zh-cn` - Chinese (Simplified, PRC)
     *  * `zh-tw` - (Chinese, Taiwan).
     */
    acceptLanguage?: string;
  }

  /** Parameters for the `getRoleAssignment` operation. */
  export interface GetRoleAssignmentParams extends DefaultParams {
    /** Role template assignment ID. */
    assignmentId: string;
  }

  /** Parameters for the `updateRoleAssignment` operation. */
  export interface UpdateRoleAssignmentParams extends DefaultParams {
    /** Role template assignment ID. */
    assignmentId: string;
    /** The revision number for updating a role assignment and must match the Etag value of the existing role
     *  assignment. The Etag can be retrieved using the GET /v1/role_assignments/{assignment_id} API and looking at the
     *  Etag response header.
     */
    ifMatch: string;
    /** The version number of the template used to identify different versions of same template. */
    templateVersion: string;
  }

  /** Parameters for the `deleteRoleAssignment` operation. */
  export interface DeleteRoleAssignmentParams extends DefaultParams {
    /** Role template assignment ID. */
    assignmentId: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * The Access Management Account Settings that are currently set for the requested account.
   */
  export interface AccountSettingsAccessManagement {
    /** How external accounts can interact in relation to the requested account. */
    external_account_identity_interaction: ExternalAccountIdentityInteraction;
  }

  /**
   * The set of properties associated with the assigned action control template.
   */
  export interface ActionControlAssignment {
    /** Action control assignment ID. */
    id?: string;
    /** The account GUID that the action control assignments belong to. */
    account_id?: string;
    /** The href URL that links to the action control assignments API by action control assignment ID. */
    href?: string;
    /** The UTC timestamp when the action control assignment was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the action control assignment. */
    created_by_id?: string;
    /** The UTC timestamp when the action control assignment was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the action control assignment. */
    last_modified_by_id?: string;
    /** The current operation of the action control assignment. */
    operation?: ActionControlAssignment.Constants.Operation | string;
    /** Resources created when action control template is assigned. */
    resources?: ActionControlAssignmentResource[];
    /** The action control template id and version that will be assigned. */
    template: ActionControlAssignmentTemplate;
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** The action control assignment status. */
    status?: ActionControlAssignment.Constants.Status | string;
  }
  export namespace ActionControlAssignment {
    export namespace Constants {
      /** The current operation of the action control assignment. */
      export enum Operation {
        CREATE = 'create',
        APPLY = 'apply',
        UPDATE = 'update',
        REMOVE = 'remove',
      }
      /** The action control assignment status. */
      export enum Status {
        ACCEPTED = 'accepted',
        FAILURE = 'failure',
        IN_PROGRESS = 'in_progress',
        SUPERSEDED = 'superseded',
      }
    }
  }

  /**
   * A collection of action control assignments.
   */
  export interface ActionControlAssignmentCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of action control assignments. */
    assignments: ActionControlAssignment[];
  }

  /**
   * The action control assignment resources and target where the template is assigned.
   */
  export interface ActionControlAssignmentResource {
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** Set of properties of the assigned resource or error message if assignment failed. */
    action_control?: ActionControlAssignmentResourceActionControl;
  }

  /**
   * Set of properties of the assigned resource or error message if assignment failed.
   */
  export interface ActionControlAssignmentResourceActionControl {
    /** On success, it includes the action control assigned. */
    resource_created?: ActionControlAssignmentResourceCreated;
    /** Body parameters for assignment error. */
    error_message?: AssignmentResourceError;
  }

  /**
   * On success, it includes the action control assigned.
   */
  export interface ActionControlAssignmentResourceCreated {
    /** action control id. */
    id?: string;
  }

  /**
   * The action control template id and version that will be assigned.
   */
  export interface ActionControlAssignmentTemplate {
    /** Action control template ID. */
    id: string;
    /** Action control template version. */
    version: string;
  }

  /**
   * The set of properties associated with the action control template.
   */
  export interface ActionControlTemplate {
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name: string;
    /** Description of the action control template. This is shown to users in the enterprise account. Use this to
     *  describe the purpose or context of the action control for enterprise users managing IAM templates.
     */
    description: string;
    /** Enterprise account ID where this template is created. */
    account_id: string;
    /** Committed status of the template. If committed is set to true, then the template version can no longer be
     *  updated.
     */
    committed?: boolean;
    /** The action control properties that are created in an action resource when the template is assigned. */
    action_control?: TemplateActionControl;
    /** The action control template ID. */
    id?: string;
    /** The href URL that links to the action control templates API by action control template ID. */
    href?: string;
    /** The UTC timestamp when the action control template was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the action control template. */
    created_by_id?: string;
    /** The UTC timestamp when the action control template was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the action control template. */
    last_modified_by_id?: string;
    /** The version number of the template used to identify different versions of same template. */
    version: string;
    /** State of action control template. */
    state: ActionControlTemplate.Constants.State | string;
  }
  export namespace ActionControlTemplate {
    export namespace Constants {
      /** State of action control template. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * A collection of action control templates.
   */
  export interface ActionControlTemplateCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of action control templates. */
    action_control_templates: ActionControlTemplate[];
  }

  /**
   * A collection of versions for a specific action control template.
   */
  export interface ActionControlTemplateVersionsCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of action control templates versions. */
    versions: ActionControlTemplate[];
  }

  /**
   * On success, includes the  policy that is assigned.
   */
  export interface AssignmentResourceCreated {
    /** Policy id. */
    id?: string;
  }

  /**
   * Body parameters for assignment error.
   */
  export interface AssignmentResourceError {
    /** Name of the error. */
    name?: string;
    /** error code. */
    errorCode?: string;
    /** Error message detailing the nature of the error. */
    message?: string;
    /** Internal status code for the error. */
    code?: string;
    /** The errors encountered during the response. */
    errors?: ErrorObject[];
  }

  /**
   * assignment target account and type.
   */
  export interface AssignmentTargetDetails {
    /** Assignment target type. */
    type: AssignmentTargetDetails.Constants.Type | string;
    /** ID of the target account. */
    id: string;
  }
  export namespace AssignmentTargetDetails {
    export namespace Constants {
      /** Assignment target type. */
      export enum Type {
        ACCOUNT = 'Account',
      }
    }
  }

  /**
   * policy template details.
   */
  export interface AssignmentTemplateDetails {
    /** Policy template ID. */
    id?: string;
    /** Policy template version. */
    version?: string;
  }

  /**
   * Details of conflicting resource.
   */
  export interface ConflictsWith {
    /** The revision number of the resource. */
    etag?: string;
    /** The conflicting role of ID. */
    role?: string;
    /** The conflicting policy ID. */
    policy?: string;
  }

  /**
   * Specifies the type of access that is granted by the policy.
   */
  export interface Control {
    /** Permission is granted by the policy. */
    grant: Grant;
  }

  /**
   * ControlResponse.
   */
  export interface ControlResponse {}

  /**
   * An additional set of properties associated with a role.
   */
  export interface CustomRole {
    /** The role ID. Composed of hexadecimal characters. */
    id?: string;
    /** The display the name of the role that is shown in the console. */
    display_name: string;
    /** The description of the role. */
    description?: string;
    /** The actions of the role. For more information, see [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The role Cloud Resource Name (CRN). Example CRN:
     *  'crn:v1:ibmcloud:public:iam-access-management::a/exampleAccountId::customRole:ExampleRoleName'.
     */
    crn?: string;
    /** The name of the role that is used in the CRN. This must be alphanumeric and capitalized. */
    name: string;
    /** The account GUID. */
    account_id: string;
    /** The service name. */
    service_name: string;
    /** The UTC timestamp when the role was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the role. */
    created_by_id?: string;
    /** The UTC timestamp when the role was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The href links back to the role. */
    href?: string;
  }

  /**
   * A role associated with a policy with additional information (display_name, description, actions) when
   * `format=display`.
   */
  export interface EnrichedRoles {
    /** The role Cloud Resource Name (CRN) granted by the policy. Example CRN:
     *  'crn:v1:bluemix:public:iam::::role:Editor'.
     */
    role_id: string;
    /** The display name of the role, either service-defined or user-defined for custom roles. */
    display_name?: string;
    /** The role description, either service-defined or user-defined for custom roles. */
    description?: string;
    /** The actions of the role. For more information, see [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: RoleAction[];
  }

  /**
   * Additional error details.
   */
  export interface ErrorDetails {
    /** Details of conflicting resource. */
    conflicts_with?: ConflictsWith;
  }

  /**
   * ErrorObject.
   */
  export interface ErrorObject {
    /** The API error code for the error. */
    code: ErrorObject.Constants.Code | string;
    /** The error message returned by the API. */
    message: string;
    /** Additional error details. */
    details?: ErrorDetails;
    /** Additional info for error. */
    more_info?: string;
  }
  export namespace ErrorObject {
    export namespace Constants {
      /** The API error code for the error. */
      export enum Code {
        INSUFFICENT_PERMISSIONS = 'insufficent_permissions',
        INVALID_BODY = 'invalid_body',
        INVALID_TOKEN = 'invalid_token',
        MISSING_REQUIRED_QUERY_PARAMETER = 'missing_required_query_parameter',
        NOT_FOUND = 'not_found',
        POLICY_CONFLICT_ERROR = 'policy_conflict_error',
        POLICY_NOT_FOUND = 'policy_not_found',
        REQUEST_NOT_PROCESSED = 'request_not_processed',
        ROLE_CONFLICT_ERROR = 'role_conflict_error',
        ROLE_NOT_FOUND = 'role_not_found',
        TOO_MANY_REQUESTS = 'too_many_requests',
        UNABLE_TO_PROCESS = 'unable_to_process',
        UNSUPPORTED_CONTENT_TYPE = 'unsupported_content_type',
        POLICY_TEMPLATE_CONFLICT_ERROR = 'policy_template_conflict_error',
        POLICY_TEMPLATE_NOT_FOUND = 'policy_template_not_found',
        POLICY_ASSIGNMENT_NOT_FOUND = 'policy_assignment_not_found',
        POLICY_ASSIGNMENT_CONFLICT_ERROR = 'policy_assignment_conflict_error',
        RESOURCE_NOT_FOUND = 'resource_not_found',
        ACTION_CONTROL_TEMPLATE_NOT_FOUND = 'action_control_template_not_found',
        ACTION_CONTROL_ASSIGNMENT_NOT_FOUND = 'action_control_assignment_not_found',
        ROLE_TEMPLATE_CONFLICT_ERROR = 'role_template_conflict_error',
        ROLE_TEMPLATE_NOT_FOUND = 'role_template_not_found',
        ROLE_ASSIGNMENT_NOT_FOUND = 'role_assignment_not_found',
      }
    }
  }

  /**
   * How external accounts can interact in relation to the requested account.
   */
  export interface ExternalAccountIdentityInteraction {
    /** The settings for each identity type. */
    identity_types: IdentityTypes;
  }

  /**
   * Update to how external accounts can interact in relation to the requested account.
   */
  export interface ExternalAccountIdentityInteractionPatch {
    /** The settings to apply for each identity type for a request. */
    identity_types?: IdentityTypesPatch;
  }

  /**
   * Details with linking href to first page of requested collection.
   */
  export interface First {
    /** The href linking to the page of requested collection. */
    href?: string;
  }

  /**
   * Permission is granted by the policy.
   */
  export interface Grant {
    /** A set of role Cloud Resource Names (CRNs) granted by the policy. */
    roles: Roles[];
  }

  /**
   * Permission granted by the policy with translated roles and additional role information.
   */
  export interface GrantWithEnrichedRoles {
    /** A set of roles granted by the policy. */
    roles: EnrichedRoles[];
  }

  /**
   * The settings for each identity type.
   */
  export interface IdentityTypes {
    /** The core set of properties associated with an identity type. */
    user: IdentityTypesBase;
    /** The core set of properties associated with an identity type. */
    service_id: IdentityTypesBase;
    /** The core set of properties associated with an identity type. */
    service: IdentityTypesBase;
  }

  /**
   * The core set of properties associated with an identity type.
   */
  export interface IdentityTypesBase {
    /** The state of the identity type. */
    state: IdentityTypesBase.Constants.State | string;
    /** List of accounts that the state applies to for a given identity. */
    external_allowed_accounts: string[];
  }
  export namespace IdentityTypesBase {
    export namespace Constants {
      /** The state of the identity type. */
      export enum State {
        ENABLED = 'enabled',
        MONITOR = 'monitor',
        LIMITED = 'limited',
      }
    }
  }

  /**
   * The settings to apply for each identity type for a request.
   */
  export interface IdentityTypesPatch {
    /** The core set of properties associated with an identity type. */
    user?: IdentityTypesBase;
    /** The core set of properties associated with an identity type. */
    service_id?: IdentityTypesBase;
    /** The core set of properties associated with an identity type. */
    service?: IdentityTypesBase;
  }

  /**
   * policy template current and limit details with in an account.
   */
  export interface LimitData {
    /** policy template current count. */
    current?: number;
    /** policy template limit count. */
    limit?: number;
  }

  /**
   * Condition that specifies additional conditions or RuleAttribute to grant access.
   */
  export interface NestedCondition {}

  /**
   * Details with href linking to the following page of requested collection.
   */
  export interface Next {
    /** The href linking to the page of requested collection. */
    href?: string;
    /** Page token that refers to the page of the collection. */
    start?: string;
  }

  /**
   * The core set of properties associated with a policy.
   */
  export interface Policy {
    /** The policy ID. */
    id?: string;
    /** The policy type; either 'access' or 'authorization'. */
    type: string;
    /** Customer-defined description. */
    description?: string;
    /** The subjects associated with a policy. */
    subjects: PolicySubject[];
    /** A set of role Cloud Resource Names (CRNs) granted by the policy. */
    roles: PolicyRole[];
    /** The resources associated with a policy. */
    resources: PolicyResource[];
    /** The href links back to the policy. */
    href?: string;
    /** The UTC timestamp when the policy was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy. */
    created_by_id?: string;
    /** The UTC timestamp when the policy was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The policy state. */
    state?: Policy.Constants.State | string;
  }
  export namespace Policy {
    export namespace Constants {
      /** The policy state. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * Set of properties for the assigned resource.
   */
  export interface PolicyAssignmentResourcePolicy {
    /** On success, includes the  policy that is assigned. */
    resource_created?: AssignmentResourceCreated;
    /** policy status. */
    status?: string;
    /** Body parameters for assignment error. */
    error_message?: AssignmentResourceError;
  }

  /**
   * The policy assignment resources.
   */
  export interface PolicyAssignmentResources {
    /** Account ID where resources are assigned. */
    target?: string;
    /** Set of properties for the assigned resource. */
    policy?: PolicyAssignmentResourcePolicy;
  }

  /**
   * The set of properties associated with the policy template assignment.
   */
  export interface PolicyAssignmentV1 {
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** Policy assignment ID. */
    id?: string;
    /** The account GUID that the policies assignments belong to. */
    account_id?: string;
    /** The href URL that links to the policies assignments API by policy assignment ID. */
    href?: string;
    /** The UTC timestamp when the policy assignment was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy assignment. */
    created_by_id?: string;
    /** The UTC timestamp when the policy assignment was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy assignment. */
    last_modified_by_id?: string;
    /** Object for each account assigned. */
    resources: PolicyAssignmentV1Resources[];
    /** Subject details of access type assignment. */
    subject?: PolicyAssignmentV1Subject;
    /** policy template details. */
    template: AssignmentTemplateDetails;
    /** The policy assignment status. */
    status: PolicyAssignmentV1.Constants.Status | string;
  }
  export namespace PolicyAssignmentV1 {
    export namespace Constants {
      /** The policy assignment status. */
      export enum Status {
        IN_PROGRESS = 'in_progress',
        SUCCEEDED = 'succeeded',
        SUCCEED_WITH_ERRORS = 'succeed_with_errors',
        FAILED = 'failed',
      }
    }
  }

  /**
   * Policy assignment response.
   */
  export interface PolicyAssignmentV1Collection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** Response of policy assignments. */
    assignments: PolicyAssignmentV1[];
  }

  /**
   * The policy assignment resources.
   */
  export interface PolicyAssignmentV1Resources {
    /** assignment target account and type. */
    target?: AssignmentTargetDetails;
    /** Set of properties for the assigned resource. */
    policy?: PolicyAssignmentResourcePolicy;
  }

  /**
   * Subject details of access type assignment.
   */
  export interface PolicyAssignmentV1Subject {
    /** The unique identifier of the subject of the assignment. */
    id?: string;
    /** The identity type of the subject of the assignment. */
    type?: PolicyAssignmentV1Subject.Constants.Type | string;
  }
  export namespace PolicyAssignmentV1Subject {
    export namespace Constants {
      /** The identity type of the subject of the assignment. */
      export enum Type {
        IAM_ID = 'iam_id',
        ACCESS_GROUP_ID = 'access_group_id',
      }
    }
  }

  /**
   * A collection of policies.
   */
  export interface PolicyCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of policies. */
    policies: PolicyTemplateMetaData[];
  }

  /**
   * The attributes of the resource. Note that only one resource is allowed in a policy.
   */
  export interface PolicyResource {
    /** List of resource attributes. */
    attributes: ResourceAttribute[];
    /** List of access management tags. */
    tags?: ResourceTag[];
  }

  /**
   * A role associated with a policy.
   */
  export interface PolicyRole {
    /** The role Cloud Resource Name (CRN) granted by the policy. Example CRN:
     *  'crn:v1:bluemix:public:iam::::role:Editor'.
     */
    role_id: string;
    /** The display name of the role. */
    display_name?: string;
    /** The description of the role. */
    description?: string;
  }

  /**
   * The subject attribute values that must match in order for this policy to apply in a permission decision.
   */
  export interface PolicySubject {
    /** List of subject attributes. */
    attributes: SubjectAttribute[];
  }

  /**
   * The core set of properties associated with the policy template.
   */
  export interface PolicyTemplate {
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name: string;
    /** Description of the policy template. This is shown to users in the enterprise account. Use this to describe
     *  the purpose or context of the policy for enterprise users managing IAM templates.
     */
    description?: string;
    /** Enterprise account ID where this template is created. */
    account_id: string;
    /** Template version. */
    version: string;
    /** Committed status of the template version. */
    committed?: boolean;
    /** The core set of properties associated with the template's policy object. */
    policy: TemplatePolicy;
    /** State of policy template. */
    state: PolicyTemplate.Constants.State | string;
    /** The policy template ID. */
    id?: string;
    /** The href URL that links to the policy templates API by policy template ID. */
    href?: string;
    /** The UTC timestamp when the policy template was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy template. */
    created_by_id?: string;
    /** The UTC timestamp when the policy template was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy template. */
    last_modified_by_id?: string;
  }
  export namespace PolicyTemplate {
    export namespace Constants {
      /** State of policy template. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * A collection of policies assignments.
   */
  export interface PolicyTemplateAssignmentCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of policy assignments. */
    assignments: PolicyTemplateAssignmentItems[];
  }

  /**
   * PolicyTemplateAssignmentItems.
   */
  export interface PolicyTemplateAssignmentItems {}

  /**
   * A collection of policy Templates.
   */
  export interface PolicyTemplateCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of policy templates. */
    policy_templates: PolicyTemplate[];
  }

  /**
   * The core set of properties associated with the policy template.
   */
  export interface PolicyTemplateLimitData {
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name: string;
    /** Description of the policy template. This is shown to users in the enterprise account. Use this to describe
     *  the purpose or context of the policy for enterprise users managing IAM templates.
     */
    description?: string;
    /** Enterprise account ID where this template is created. */
    account_id: string;
    /** Template version. */
    version: string;
    /** Committed status of the template version. */
    committed?: boolean;
    /** The core set of properties associated with the template's policy object. */
    policy: TemplatePolicy;
    /** State of policy template. */
    state: PolicyTemplateLimitData.Constants.State | string;
    /** The policy template ID. */
    id?: string;
    /** The href URL that links to the policy templates API by policy template ID. */
    href?: string;
    /** The UTC timestamp when the policy template was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy template. */
    created_by_id?: string;
    /** The UTC timestamp when the policy template was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy template. */
    last_modified_by_id?: string;
    /** policy template count details. */
    counts?: TemplateCountData;
  }
  export namespace PolicyTemplateLimitData {
    export namespace Constants {
      /** State of policy template. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * The core set of properties associated with a policy.
   */
  export interface PolicyTemplateMetaData {
    /** The policy ID. */
    id?: string;
    /** The policy type; either 'access' or 'authorization'. */
    type: string;
    /** Customer-defined description. */
    description?: string;
    /** The subjects associated with a policy. */
    subjects: PolicySubject[];
    /** A set of role Cloud Resource Names (CRNs) granted by the policy. */
    roles: PolicyRole[];
    /** The resources associated with a policy. */
    resources: PolicyResource[];
    /** The href links back to the policy. */
    href?: string;
    /** The UTC timestamp when the policy was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy. */
    created_by_id?: string;
    /** The UTC timestamp when the policy was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The policy state. */
    state?: PolicyTemplateMetaData.Constants.State | string;
    /** The details of the IAM template that was used to create an enterprise-managed policy in your account. When
     *  returned, this indicates that the policy is created from and managed by a template in the root enterprise
     *  account.
     */
    template?: TemplateMetadata;
  }
  export namespace PolicyTemplateMetaData {
    export namespace Constants {
      /** The policy state. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * A collection of versions for a specific policy template.
   */
  export interface PolicyTemplateVersionsCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of policy templates versions. */
    versions: PolicyTemplate[];
  }

  /**
   * Details with linking href to previous page of requested collection.
   */
  export interface Previous {
    /** The href linking to the page of requested collection. */
    href?: string;
    /** Page token that refers to the page of the collection. */
    start?: string;
  }

  /**
   * An attribute associated with a resource.
   */
  export interface ResourceAttribute {
    /** The name of an attribute. */
    name: string;
    /** The value of an attribute. */
    value: string;
    /** The operator of an attribute. */
    operator?: string;
  }

  /**
   * A tag associated with a resource.
   */
  export interface ResourceTag {
    /** The name of an access management tag. */
    name: string;
    /** The value of an access management tag. */
    value: string;
    /** The operator of an access management tag. */
    operator?: string;
  }

  /**
   * A role resource.
   */
  export interface Role {
    /** The display the name of the role that is shown in the console. */
    display_name: string;
    /** The description of the role. */
    description?: string;
    /** The actions of the role. For more information, see [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The role Cloud Resource Name (CRN). Example CRN:
     *  'crn:v1:ibmcloud:public:iam-access-management::a/exampleAccountId::customRole:ExampleRoleName'.
     */
    crn?: string;
  }

  /**
   * An action that can be performed by the policy subject when assigned a role.
   */
  export interface RoleAction {
    /** Unique identifier for action with structure service.resource.action. For example, cbr.rule.read. */
    id: string;
    /** Services defined display name for action. */
    display_name: string;
    /** Service defined description for action. */
    description: string;
  }

  /**
   * The set of properties associated with the assigned role template.
   */
  export interface RoleAssignment {
    /** Action control assignment ID. */
    id?: string;
    /** The account GUID that the role assignments belong to. */
    account_id?: string;
    /** The href URL that links to the role assignments API by role assignment ID. */
    href?: string;
    /** The UTC timestamp when the role assignment was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the role assignment. */
    created_by_id?: string;
    /** The UTC timestamp when the role assignment was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the role assignment. */
    last_modified_by_id?: string;
    /** The current operation of the role assignment. */
    operation?: RoleAssignment.Constants.Operation | string;
    /** Resources created when role template is assigned. */
    resources?: RoleAssignmentResource[];
    /** The role template id and version that will be assigned. */
    template: RoleAssignmentTemplate;
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** The role assignment status. */
    status?: RoleAssignment.Constants.Status | string;
  }
  export namespace RoleAssignment {
    export namespace Constants {
      /** The current operation of the role assignment. */
      export enum Operation {
        CREATE = 'create',
        APPLY = 'apply',
        UPDATE = 'update',
        REMOVE = 'remove',
      }
      /** The role assignment status. */
      export enum Status {
        ACCEPTED = 'accepted',
        FAILURE = 'failure',
        IN_PROGRESS = 'in_progress',
        SUPERSEDED = 'superseded',
      }
    }
  }

  /**
   * A collection of role assignments.
   */
  export interface RoleAssignmentCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of role assignments. */
    assignments: RoleAssignment[];
  }

  /**
   * The role assignment resources and target where the template is assigned.
   */
  export interface RoleAssignmentResource {
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** Set of properties of the assigned resource or error message if assignment failed. */
    role?: RoleAssignmentResourceRole;
  }

  /**
   * On success, it includes the role assigned.
   */
  export interface RoleAssignmentResourceCreated {
    /** role id. */
    id?: string;
  }

  /**
   * Set of properties of the assigned resource or error message if assignment failed.
   */
  export interface RoleAssignmentResourceRole {
    /** On success, it includes the role assigned. */
    resource_created?: RoleAssignmentResourceCreated;
    /** Body parameters for assignment error. */
    error_message?: AssignmentResourceError;
  }

  /**
   * The role template id and version that will be assigned.
   */
  export interface RoleAssignmentTemplate {
    /** Action control template ID. */
    id: string;
    /** Action control template version. */
    version: string;
  }

  /**
   * A collection of roles returned by the 'list roles' operation.
   */
  export interface RoleCollection {
    /** List of custom roles. */
    custom_roles: CustomRole[];
    /** List of service roles. */
    service_roles: Role[];
    /** List of system roles. */
    system_roles: Role[];
  }

  /**
   * The set of properties associated with the role template.
   */
  export interface RoleTemplate {
    /** Required field when creating a new template. Otherwise, this field is optional. If the field is included, it
     *  changes the name value for all existing versions of the template.
     */
    name: string;
    /** Description of the role template. This is shown to users in the enterprise account. Use this to describe the
     *  purpose or context of the role for enterprise users managing IAM templates.
     */
    description: string;
    /** Enterprise account ID where this template is created. */
    account_id: string;
    /** Committed status of the template. If committed is set to true, then the template version can no longer be
     *  updated.
     */
    committed?: boolean;
    /** The role properties that are created in an action resource when the template is assigned. */
    role?: RoleTemplatePrototypeRole;
    /** The role template ID. */
    id?: string;
    /** The href URL that links to the role templates API by role template ID. */
    href?: string;
    /** The UTC timestamp when the role template was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the role template. */
    created_by_id?: string;
    /** The UTC timestamp when the role template was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the role template. */
    last_modified_by_id?: string;
    /** The version number of the template used to identify different versions of same template. */
    version: string;
    /** State of role template. */
    state: RoleTemplate.Constants.State | string;
  }
  export namespace RoleTemplate {
    export namespace Constants {
      /** State of role template. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * A collection of role templates.
   */
  export interface RoleTemplateCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of role templates. */
    role_templates: RoleTemplate[];
  }

  /**
   * The role properties that are created in an action resource when the template is assigned.
   */
  export interface RoleTemplatePrototypeRole {
    /** The name of the role that is used in the CRN. This must be alphanumeric and capitalized. */
    name: string;
    /** The display the name of the role that is shown in the console. */
    display_name: string;
    /** The service name that the role refers. */
    service_name?: string;
    /** Description of the role. */
    description?: string;
    /** The actions of the role. */
    actions: string[];
  }

  /**
   * A role template reference associated with a policy template.
   */
  export interface RoleTemplateReferencesItem {
    /** The role template ID. */
    id: string;
    /** Role template version. */
    version: string;
  }

  /**
   * A collection of versions for a specific role template.
   */
  export interface RoleTemplateVersionsCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of role templates versions. */
    versions: RoleTemplate[];
  }

  /**
   * A role associated with a policy.
   */
  export interface Roles {
    /** The role Cloud Resource Name (CRN) granted by the policy. Example CRN:
     *  'crn:v1:bluemix:public:iam::::role:Editor'.
     */
    role_id: string;
  }

  /**
   * Rule that specifies additional access that is granted (For example, time-based condition).
   */
  export interface RuleAttribute {
    /** The name of an attribute. */
    key: string;
    /** The operator of an attribute. */
    operator: RuleAttribute.Constants.Operator | string;
    /** The value of a rule, resource, or subject attribute; can be boolean or string for resource and subject
     *  attribute. Can be a string or an array of strings (for example, an array of days to permit access) for rule
     *  attribute.
     */
    value: any;
  }
  export namespace RuleAttribute {
    export namespace Constants {
      /** The operator of an attribute. */
      export enum Operator {
        STRINGEQUALS = 'stringEquals',
        STRINGEXISTS = 'stringExists',
        STRINGEQUALSANYOF = 'stringEqualsAnyOf',
        STRINGMATCHANYOF = 'stringMatchAnyOf',
        STRINGMATCH = 'stringMatch',
        TIMELESSTHAN = 'timeLessThan',
        TIMELESSTHANOREQUALS = 'timeLessThanOrEquals',
        TIMEGREATERTHAN = 'timeGreaterThan',
        TIMEGREATERTHANOREQUALS = 'timeGreaterThanOrEquals',
        DATELESSTHAN = 'dateLessThan',
        DATELESSTHANOREQUALS = 'dateLessThanOrEquals',
        DATEGREATERTHAN = 'dateGreaterThan',
        DATEGREATERTHANOREQUALS = 'dateGreaterThanOrEquals',
        DATETIMELESSTHAN = 'dateTimeLessThan',
        DATETIMELESSTHANOREQUALS = 'dateTimeLessThanOrEquals',
        DATETIMEGREATERTHAN = 'dateTimeGreaterThan',
        DATETIMEGREATERTHANOREQUALS = 'dateTimeGreaterThanOrEquals',
        DAYOFWEEKEQUALS = 'dayOfWeekEquals',
        DAYOFWEEKANYOF = 'dayOfWeekAnyOf',
      }
    }
  }

  /**
   * An attribute associated with a subject.
   */
  export interface SubjectAttribute {
    /** The name of an attribute. */
    name: string;
    /** The value of an attribute. */
    value: string;
  }

  /**
   * The action control properties that are created in an action resource when the template is assigned.
   */
  export interface TemplateActionControl {
    /** The service name that the action control refers. */
    service_name: string;
    /** Description of the action control. */
    description?: string;
    /** List of actions to control access. */
    actions: string[];
  }

  /**
   * Specifies the type of access that is granted by the policy.
   */
  export interface TemplateControl {
    /** Permission is granted by the policy. */
    grant: TemplateGrant;
  }

  /**
   * policy template count details.
   */
  export interface TemplateCountData {
    /** policy template current and limit details with in an account. */
    template?: LimitData;
    /** policy template current and limit details with in an account. */
    version?: LimitData;
  }

  /**
   * Permission is granted by the policy.
   */
  export interface TemplateGrant {}

  /**
   * The details of the IAM template that was used to create an enterprise-managed policy in your account. When
   * returned, this indicates that the policy is created from and managed by a template in the root enterprise account.
   */
  export interface TemplateMetadata {
    /** The policy template ID. */
    id?: string;
    /** Template version. */
    version?: string;
    /** Policy assignment ID. */
    assignment_id?: string;
    /** Orchestrator template ID. */
    root_id?: string;
    /** Orchestrator template version. */
    root_version?: string;
  }

  /**
   * The core set of properties associated with the template's policy object.
   */
  export interface TemplatePolicy {
    /** The policy type; either 'access' or 'authorization'. */
    type: TemplatePolicy.Constants.Type | string;
    /** Description of the policy. This is shown in child accounts when an access group or trusted profile template
     *  uses the policy template to assign access.
     */
    description?: string;
    /** The resource attributes to which the policy grants access. */
    resource?: V2PolicyResource;
    /** The subject attributes for whom the policy grants access. */
    subject?: V2PolicySubject;
    /** Indicates pattern of rule, either 'time-based-conditions:once', 'time-based-conditions:weekly:all-day', or
     *  'time-based-conditions:weekly:custom-hours'.
     */
    pattern?: string;
    /** Additional access conditions associated with the policy. */
    rule?: V2PolicyRule;
    /** Specifies the type of access that is granted by the policy. */
    control?: TemplateControl;
  }
  export namespace TemplatePolicy {
    export namespace Constants {
      /** The policy type; either 'access' or 'authorization'. */
      export enum Type {
        ACCESS = 'access',
        AUTHORIZATION = 'authorization',
      }
    }
  }

  /**
   * The role properties that are created in an action resource when the template is assigned.
   */
  export interface TemplateRole {
    /** The display the name of the role that is shown in the console. */
    display_name: string;
    /** The service name that the role refers. */
    service_name?: string;
    /** Description of the role. */
    description?: string;
    /** The actions of the role. */
    actions: string[];
  }

  /**
   * The core set of properties associated with the policy.
   */
  export interface V2Policy {
    /** The policy type; either 'access' or 'authorization'. */
    type: V2Policy.Constants.Type | string;
    /** Description of the policy. */
    description?: string;
    /** The subject attributes for whom the policy grants access. */
    subject?: V2PolicySubject;
    /** The resource attributes to which the policy grants access. */
    resource?: V2PolicyResource;
    /** Indicates pattern of rule, either 'time-based-conditions:once', 'time-based-conditions:weekly:all-day', or
     *  'time-based-conditions:weekly:custom-hours'.
     */
    pattern?: string;
    /** Additional access conditions associated with the policy. */
    rule?: V2PolicyRule;
    /** The policy ID. */
    id?: string;
    /** The href URL that links to the policies API by policy ID. */
    href?: string;
    control: ControlResponse;
    /** The UTC timestamp when the policy was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy. */
    created_by_id?: string;
    /** The UTC timestamp when the policy was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The policy state, either 'deleted' or 'active'. */
    state: V2Policy.Constants.State | string;
    /** The optional last permit time of policy, when passing query parameter format=include_last_permit. */
    last_permit_at?: string;
    /** The optional count of times that policy has provided a permit, when passing query parameter
     *  format=include_last_permit.
     */
    last_permit_frequency?: number;
  }
  export namespace V2Policy {
    export namespace Constants {
      /** The policy type; either 'access' or 'authorization'. */
      export enum Type {
        ACCESS = 'access',
        AUTHORIZATION = 'authorization',
      }
      /** The policy state, either 'deleted' or 'active'. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * A collection of policies.
   */
  export interface V2PolicyCollection {
    /** The number of documents to include per each page of the collection. */
    limit?: number;
    /** Details with linking href to first page of requested collection. */
    first?: First;
    /** Details with href linking to the following page of requested collection. */
    next?: Next;
    /** Details with linking href to previous page of requested collection. */
    previous?: Previous;
    /** List of policies. */
    policies: V2PolicyTemplateMetaData[];
  }

  /**
   * The resource attributes to which the policy grants access.
   */
  export interface V2PolicyResource {
    /** List of resource attributes to which the policy grants access. */
    attributes: V2PolicyResourceAttribute[];
    /** Optional list of resource tags to which the policy grants access. */
    tags?: V2PolicyResourceTag[];
  }

  /**
   * Resource attribute to which the policy grants access.
   */
  export interface V2PolicyResourceAttribute {
    /** The name of a resource attribute. */
    key: string;
    /** The operator of an attribute. */
    operator: V2PolicyResourceAttribute.Constants.Operator | string;
    /** The value of a rule, resource, or subject attribute; can be boolean or string for resource and subject
     *  attribute. Can be a string or an array of strings (for example, an array of days to permit access) for rule
     *  attribute.
     */
    value: any;
  }
  export namespace V2PolicyResourceAttribute {
    export namespace Constants {
      /** The operator of an attribute. */
      export enum Operator {
        STRINGEQUALS = 'stringEquals',
        STRINGEXISTS = 'stringExists',
        STRINGMATCH = 'stringMatch',
        STRINGEQUALSANYOF = 'stringEqualsAnyOf',
        STRINGMATCHANYOF = 'stringMatchAnyOf',
      }
    }
  }

  /**
   * A tag associated with a resource.
   */
  export interface V2PolicyResourceTag {
    /** The name of an access management tag. */
    key: string;
    /** The value of an access management tag. */
    value: string;
    /** The operator of an access management tag. */
    operator: V2PolicyResourceTag.Constants.Operator | string;
  }
  export namespace V2PolicyResourceTag {
    export namespace Constants {
      /** The operator of an access management tag. */
      export enum Operator {
        STRINGEQUALS = 'stringEquals',
        STRINGMATCH = 'stringMatch',
      }
    }
  }

  /**
   * Additional access conditions associated with the policy.
   */
  export interface V2PolicyRule {}

  /**
   * The subject attributes for whom the policy grants access.
   */
  export interface V2PolicySubject {
    /** List of subject attributes associated with policy. */
    attributes: V2PolicySubjectAttribute[];
  }

  /**
   * Subject attribute for whom the policy grants access.
   */
  export interface V2PolicySubjectAttribute {
    /** The name of a subject attribute. For example, iam_id, access_group_id. */
    key: string;
    /** The operator of an attribute. */
    operator: V2PolicySubjectAttribute.Constants.Operator | string;
    /** The value of a rule, resource, or subject attribute; can be boolean or string for resource and subject
     *  attribute. Can be a string or an array of strings (for example, an array of days to permit access) for rule
     *  attribute.
     */
    value: any;
  }
  export namespace V2PolicySubjectAttribute {
    export namespace Constants {
      /** The operator of an attribute. */
      export enum Operator {
        STRINGEQUALS = 'stringEquals',
        STRINGEXISTS = 'stringExists',
      }
    }
  }

  /**
   * The core set of properties associated with the policy.
   */
  export interface V2PolicyTemplateMetaData {
    /** The policy type; either 'access' or 'authorization'. */
    type: V2PolicyTemplateMetaData.Constants.Type | string;
    /** Description of the policy. */
    description?: string;
    /** The subject attributes for whom the policy grants access. */
    subject?: V2PolicySubject;
    /** The resource attributes to which the policy grants access. */
    resource?: V2PolicyResource;
    /** Indicates pattern of rule, either 'time-based-conditions:once', 'time-based-conditions:weekly:all-day', or
     *  'time-based-conditions:weekly:custom-hours'.
     */
    pattern?: string;
    /** Additional access conditions associated with the policy. */
    rule?: V2PolicyRule;
    /** The policy ID. */
    id?: string;
    /** The href URL that links to the policies API by policy ID. */
    href?: string;
    control: ControlResponse;
    /** The UTC timestamp when the policy was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy. */
    created_by_id?: string;
    /** The UTC timestamp when the policy was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The policy state, either 'deleted' or 'active'. */
    state: V2PolicyTemplateMetaData.Constants.State | string;
    /** The optional last permit time of policy, when passing query parameter format=include_last_permit. */
    last_permit_at?: string;
    /** The optional count of times that policy has provided a permit, when passing query parameter
     *  format=include_last_permit.
     */
    last_permit_frequency?: number;
    /** The details of the IAM template that was used to create an enterprise-managed policy in your account. When
     *  returned, this indicates that the policy is created from and managed by a template in the root enterprise
     *  account.
     */
    template?: TemplateMetadata;
  }
  export namespace V2PolicyTemplateMetaData {
    export namespace Constants {
      /** The policy type; either 'access' or 'authorization'. */
      export enum Type {
        ACCESS = 'access',
        AUTHORIZATION = 'authorization',
      }
      /** The policy state, either 'deleted' or 'active'. */
      export enum State {
        ACTIVE = 'active',
        DELETED = 'deleted',
      }
    }
  }

  /**
   * Specifies the type of access that is granted by the policy.
   */
  export interface ControlResponseControl extends ControlResponse {
    /** Permission is granted by the policy. */
    grant: Grant;
  }

  /**
   * Specifies the type of access that is granted by the policy with additional role information.
   */
  export interface ControlResponseControlWithEnrichedRoles extends ControlResponse {
    /** Permission granted by the policy with translated roles and additional role information. */
    grant: GrantWithEnrichedRoles;
  }

  /**
   * Rule that specifies additional access that is granted (For example, time-based condition).
   */
  export interface NestedConditionRuleAttribute extends NestedCondition {
    /** The name of an attribute. */
    key: string;
    /** The operator of an attribute. */
    operator: NestedConditionRuleAttribute.Constants.Operator | string;
    /** The value of a rule, resource, or subject attribute; can be boolean or string for resource and subject
     *  attribute. Can be a string or an array of strings (for example, an array of days to permit access) for rule
     *  attribute.
     */
    value: any;
  }
  export namespace NestedConditionRuleAttribute {
    export namespace Constants {
      /** The operator of an attribute. */
      export enum Operator {
        STRINGEQUALS = 'stringEquals',
        STRINGEXISTS = 'stringExists',
        STRINGEQUALSANYOF = 'stringEqualsAnyOf',
        STRINGMATCHANYOF = 'stringMatchAnyOf',
        STRINGMATCH = 'stringMatch',
        TIMELESSTHAN = 'timeLessThan',
        TIMELESSTHANOREQUALS = 'timeLessThanOrEquals',
        TIMEGREATERTHAN = 'timeGreaterThan',
        TIMEGREATERTHANOREQUALS = 'timeGreaterThanOrEquals',
        DATELESSTHAN = 'dateLessThan',
        DATELESSTHANOREQUALS = 'dateLessThanOrEquals',
        DATEGREATERTHAN = 'dateGreaterThan',
        DATEGREATERTHANOREQUALS = 'dateGreaterThanOrEquals',
        DATETIMELESSTHAN = 'dateTimeLessThan',
        DATETIMELESSTHANOREQUALS = 'dateTimeLessThanOrEquals',
        DATETIMEGREATERTHAN = 'dateTimeGreaterThan',
        DATETIMEGREATERTHANOREQUALS = 'dateTimeGreaterThanOrEquals',
        DAYOFWEEKEQUALS = 'dayOfWeekEquals',
        DAYOFWEEKANYOF = 'dayOfWeekAnyOf',
      }
    }
  }

  /**
   * Rule that specifies additional access that is granted (for example, time-based condition) accross multiple
   * conditions.
   */
  export interface NestedConditionRuleWithConditions extends NestedCondition {
    /** Operator to evaluate conditions. */
    operator: NestedConditionRuleWithConditions.Constants.Operator | string;
    /** List of conditions associated with a policy. For example, time-based conditions that grant access over a
     *  certain time period.
     */
    conditions: RuleAttribute[];
  }
  export namespace NestedConditionRuleWithConditions {
    export namespace Constants {
      /** Operator to evaluate conditions. */
      export enum Operator {
        AND = 'and',
        OR = 'or',
      }
    }
  }

  /**
   * The set of properties associated with the policy template assignment.
   */
  export interface PolicyTemplateAssignmentItemsPolicyAssignment
    extends PolicyTemplateAssignmentItems {
    /** policy template ID. */
    template_id: string;
    /** policy template version. */
    template_version: string;
    /** Passed in value to correlate with other assignments. */
    assignment_id?: string;
    /** Assignment target type. */
    target_type: PolicyTemplateAssignmentItemsPolicyAssignment.Constants.TargetType | string;
    /** ID of the target account. */
    target: string;
    /** Policy assignment ID. */
    id?: string;
    /** The account GUID that the policies assignments belong to. */
    account_id?: string;
    /** The href URL that links to the policies assignments API by policy assignment ID. */
    href?: string;
    /** The UTC timestamp when the policy assignment was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy assignment. */
    created_by_id?: string;
    /** The UTC timestamp when the policy assignment was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy assignment. */
    last_modified_by_id?: string;
    /** Object for each account assigned. */
    resources: PolicyAssignmentResources[];
    /** The policy assignment status. */
    status: PolicyTemplateAssignmentItemsPolicyAssignment.Constants.Status | string;
  }
  export namespace PolicyTemplateAssignmentItemsPolicyAssignment {
    export namespace Constants {
      /** Assignment target type. */
      export enum TargetType {
        ACCOUNT = 'Account',
        ACCOUNTGROUP = 'AccountGroup',
        ENTERPRISE = 'Enterprise',
      }
      /** The policy assignment status. */
      export enum Status {
        IN_PROGRESS = 'in_progress',
        SUCCEEDED = 'succeeded',
        SUCCEED_WITH_ERRORS = 'succeed_with_errors',
        FAILED = 'failed',
      }
    }
  }

  /**
   * The set of properties associated with the policy template assignment.
   */
  export interface PolicyTemplateAssignmentItemsPolicyAssignmentV1
    extends PolicyTemplateAssignmentItems {
    /** assignment target account and type. */
    target: AssignmentTargetDetails;
    /** Policy assignment ID. */
    id?: string;
    /** The account GUID that the policies assignments belong to. */
    account_id?: string;
    /** The href URL that links to the policies assignments API by policy assignment ID. */
    href?: string;
    /** The UTC timestamp when the policy assignment was created. */
    created_at?: string;
    /** The IAM ID of the entity that created the policy assignment. */
    created_by_id?: string;
    /** The UTC timestamp when the policy assignment was last modified. */
    last_modified_at?: string;
    /** The IAM ID of the entity that last modified the policy assignment. */
    last_modified_by_id?: string;
    /** Object for each account assigned. */
    resources: PolicyAssignmentV1Resources[];
    /** Subject details of access type assignment. */
    subject?: PolicyAssignmentV1Subject;
    /** policy template details. */
    template: AssignmentTemplateDetails;
    /** The policy assignment status. */
    status: PolicyTemplateAssignmentItemsPolicyAssignmentV1.Constants.Status | string;
  }
  export namespace PolicyTemplateAssignmentItemsPolicyAssignmentV1 {
    export namespace Constants {
      /** The policy assignment status. */
      export enum Status {
        IN_PROGRESS = 'in_progress',
        SUCCEEDED = 'succeeded',
        SUCCEED_WITH_ERRORS = 'succeed_with_errors',
        FAILED = 'failed',
      }
    }
  }

  /**
   * TemplateGrantRoleReferences.
   */
  export interface TemplateGrantRoleReferences extends TemplateGrant {
    /** A set of role template reference IDs granted by the policy. */
    role_template_references: RoleTemplateReferencesItem[];
  }

  /**
   * TemplateGrantRoles.
   */
  export interface TemplateGrantRoles extends TemplateGrant {
    /** A set of role Cloud Resource Names (CRNs) granted by the policy. */
    roles: Roles[];
  }

  /**
   * Rule that specifies additional access that is granted (For example, time-based condition).
   */
  export interface V2PolicyRuleRuleAttribute extends V2PolicyRule {
    /** The name of an attribute. */
    key: string;
    /** The operator of an attribute. */
    operator: V2PolicyRuleRuleAttribute.Constants.Operator | string;
    /** The value of a rule, resource, or subject attribute; can be boolean or string for resource and subject
     *  attribute. Can be a string or an array of strings (for example, an array of days to permit access) for rule
     *  attribute.
     */
    value: any;
  }
  export namespace V2PolicyRuleRuleAttribute {
    export namespace Constants {
      /** The operator of an attribute. */
      export enum Operator {
        STRINGEQUALS = 'stringEquals',
        STRINGEXISTS = 'stringExists',
        STRINGEQUALSANYOF = 'stringEqualsAnyOf',
        STRINGMATCHANYOF = 'stringMatchAnyOf',
        STRINGMATCH = 'stringMatch',
        TIMELESSTHAN = 'timeLessThan',
        TIMELESSTHANOREQUALS = 'timeLessThanOrEquals',
        TIMEGREATERTHAN = 'timeGreaterThan',
        TIMEGREATERTHANOREQUALS = 'timeGreaterThanOrEquals',
        DATELESSTHAN = 'dateLessThan',
        DATELESSTHANOREQUALS = 'dateLessThanOrEquals',
        DATEGREATERTHAN = 'dateGreaterThan',
        DATEGREATERTHANOREQUALS = 'dateGreaterThanOrEquals',
        DATETIMELESSTHAN = 'dateTimeLessThan',
        DATETIMELESSTHANOREQUALS = 'dateTimeLessThanOrEquals',
        DATETIMEGREATERTHAN = 'dateTimeGreaterThan',
        DATETIMEGREATERTHANOREQUALS = 'dateTimeGreaterThanOrEquals',
        DAYOFWEEKEQUALS = 'dayOfWeekEquals',
        DAYOFWEEKANYOF = 'dayOfWeekAnyOf',
      }
    }
  }

  /**
   * Rule that specifies additional access that is granted (for example, time-based condition) accross multiple
   * conditions.
   */
  export interface V2PolicyRuleRuleWithNestedConditions extends V2PolicyRule {
    /** Operator to evaluate conditions. */
    operator: V2PolicyRuleRuleWithNestedConditions.Constants.Operator | string;
    /** List of conditions associated with a policy. For example, time-based conditions that grant access over a
     *  certain time period.
     */
    conditions: NestedCondition[];
  }
  export namespace V2PolicyRuleRuleWithNestedConditions {
    export namespace Constants {
      /** Operator to evaluate conditions. */
      export enum Operator {
        AND = 'and',
        OR = 'or',
      }
    }
  }

  /*************************
   * pager classes
   ************************/

  /**
   * PoliciesPager can be used to simplify the use of listPolicies().
   */
  export class PoliciesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListPoliciesParams;

    /**
     * Construct a PoliciesPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listPolicies()
     * @param {Object} params - The parameters to be passed to listPolicies()
     * @constructor
     * @returns {PoliciesPager}
     */
    constructor(client: IamPolicyManagementV1, params: IamPolicyManagementV1.ListPoliciesParams) {
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
     * Returns the next page of results by invoking listPolicies().
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplateMetaData[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.PolicyTemplateMetaData[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listPolicies(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.policies;
    }

    /**
     * Returns all results by invoking listPolicies() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplateMetaData[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.PolicyTemplateMetaData[]> {
      const results: PolicyTemplateMetaData[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * V2PoliciesPager can be used to simplify the use of listV2Policies().
   */
  export class V2PoliciesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListV2PoliciesParams;

    /**
     * Construct a V2PoliciesPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listV2Policies()
     * @param {Object} params - The parameters to be passed to listV2Policies()
     * @constructor
     * @returns {V2PoliciesPager}
     */
    constructor(client: IamPolicyManagementV1, params: IamPolicyManagementV1.ListV2PoliciesParams) {
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
     * Returns the next page of results by invoking listV2Policies().
     * @returns {Promise<IamPolicyManagementV1.V2PolicyTemplateMetaData[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.V2PolicyTemplateMetaData[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listV2Policies(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.policies;
    }

    /**
     * Returns all results by invoking listV2Policies() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.V2PolicyTemplateMetaData[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.V2PolicyTemplateMetaData[]> {
      const results: V2PolicyTemplateMetaData[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * PolicyTemplatesPager can be used to simplify the use of listPolicyTemplates().
   */
  export class PolicyTemplatesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListPolicyTemplatesParams;

    /**
     * Construct a PolicyTemplatesPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listPolicyTemplates()
     * @param {Object} params - The parameters to be passed to listPolicyTemplates()
     * @constructor
     * @returns {PolicyTemplatesPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListPolicyTemplatesParams
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
     * Returns the next page of results by invoking listPolicyTemplates().
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplate[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.PolicyTemplate[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listPolicyTemplates(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.policy_templates;
    }

    /**
     * Returns all results by invoking listPolicyTemplates() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplate[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.PolicyTemplate[]> {
      const results: PolicyTemplate[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * PolicyTemplateVersionsPager can be used to simplify the use of listPolicyTemplateVersions().
   */
  export class PolicyTemplateVersionsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListPolicyTemplateVersionsParams;

    /**
     * Construct a PolicyTemplateVersionsPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listPolicyTemplateVersions()
     * @param {Object} params - The parameters to be passed to listPolicyTemplateVersions()
     * @constructor
     * @returns {PolicyTemplateVersionsPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListPolicyTemplateVersionsParams
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
     * Returns the next page of results by invoking listPolicyTemplateVersions().
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplate[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.PolicyTemplate[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listPolicyTemplateVersions(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.versions;
    }

    /**
     * Returns all results by invoking listPolicyTemplateVersions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplate[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.PolicyTemplate[]> {
      const results: PolicyTemplate[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * PolicyAssignmentsPager can be used to simplify the use of listPolicyAssignments().
   */
  export class PolicyAssignmentsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListPolicyAssignmentsParams;

    /**
     * Construct a PolicyAssignmentsPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listPolicyAssignments()
     * @param {Object} params - The parameters to be passed to listPolicyAssignments()
     * @constructor
     * @returns {PolicyAssignmentsPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListPolicyAssignmentsParams
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
     * Returns the next page of results by invoking listPolicyAssignments().
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplateAssignmentItems[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.PolicyTemplateAssignmentItems[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listPolicyAssignments(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.assignments;
    }

    /**
     * Returns all results by invoking listPolicyAssignments() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.PolicyTemplateAssignmentItems[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.PolicyTemplateAssignmentItems[]> {
      const results: PolicyTemplateAssignmentItems[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ActionControlTemplatesPager can be used to simplify the use of listActionControlTemplates().
   */
  export class ActionControlTemplatesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListActionControlTemplatesParams;

    /**
     * Construct a ActionControlTemplatesPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listActionControlTemplates()
     * @param {Object} params - The parameters to be passed to listActionControlTemplates()
     * @constructor
     * @returns {ActionControlTemplatesPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListActionControlTemplatesParams
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
     * Returns the next page of results by invoking listActionControlTemplates().
     * @returns {Promise<IamPolicyManagementV1.ActionControlTemplate[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.ActionControlTemplate[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listActionControlTemplates(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.action_control_templates;
    }

    /**
     * Returns all results by invoking listActionControlTemplates() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.ActionControlTemplate[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.ActionControlTemplate[]> {
      const results: ActionControlTemplate[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ActionControlTemplateVersionsPager can be used to simplify the use of listActionControlTemplateVersions().
   */
  export class ActionControlTemplateVersionsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListActionControlTemplateVersionsParams;

    /**
     * Construct a ActionControlTemplateVersionsPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listActionControlTemplateVersions()
     * @param {Object} params - The parameters to be passed to listActionControlTemplateVersions()
     * @constructor
     * @returns {ActionControlTemplateVersionsPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListActionControlTemplateVersionsParams
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
     * Returns the next page of results by invoking listActionControlTemplateVersions().
     * @returns {Promise<IamPolicyManagementV1.ActionControlTemplate[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.ActionControlTemplate[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listActionControlTemplateVersions(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.versions;
    }

    /**
     * Returns all results by invoking listActionControlTemplateVersions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.ActionControlTemplate[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.ActionControlTemplate[]> {
      const results: ActionControlTemplate[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ActionControlAssignmentsPager can be used to simplify the use of listActionControlAssignments().
   */
  export class ActionControlAssignmentsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListActionControlAssignmentsParams;

    /**
     * Construct a ActionControlAssignmentsPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listActionControlAssignments()
     * @param {Object} params - The parameters to be passed to listActionControlAssignments()
     * @constructor
     * @returns {ActionControlAssignmentsPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListActionControlAssignmentsParams
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
     * Returns the next page of results by invoking listActionControlAssignments().
     * @returns {Promise<IamPolicyManagementV1.ActionControlAssignment[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.ActionControlAssignment[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listActionControlAssignments(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.assignments;
    }

    /**
     * Returns all results by invoking listActionControlAssignments() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.ActionControlAssignment[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.ActionControlAssignment[]> {
      const results: ActionControlAssignment[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * RoleTemplatesPager can be used to simplify the use of listRoleTemplates().
   */
  export class RoleTemplatesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListRoleTemplatesParams;

    /**
     * Construct a RoleTemplatesPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listRoleTemplates()
     * @param {Object} params - The parameters to be passed to listRoleTemplates()
     * @constructor
     * @returns {RoleTemplatesPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListRoleTemplatesParams
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
     * Returns the next page of results by invoking listRoleTemplates().
     * @returns {Promise<IamPolicyManagementV1.RoleTemplate[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.RoleTemplate[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listRoleTemplates(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.role_templates;
    }

    /**
     * Returns all results by invoking listRoleTemplates() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.RoleTemplate[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.RoleTemplate[]> {
      const results: RoleTemplate[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * RoleTemplateVersionsPager can be used to simplify the use of listRoleTemplateVersions().
   */
  export class RoleTemplateVersionsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListRoleTemplateVersionsParams;

    /**
     * Construct a RoleTemplateVersionsPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listRoleTemplateVersions()
     * @param {Object} params - The parameters to be passed to listRoleTemplateVersions()
     * @constructor
     * @returns {RoleTemplateVersionsPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListRoleTemplateVersionsParams
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
     * Returns the next page of results by invoking listRoleTemplateVersions().
     * @returns {Promise<IamPolicyManagementV1.RoleTemplate[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.RoleTemplate[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listRoleTemplateVersions(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.versions;
    }

    /**
     * Returns all results by invoking listRoleTemplateVersions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.RoleTemplate[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.RoleTemplate[]> {
      const results: RoleTemplate[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * RoleAssignmentsPager can be used to simplify the use of listRoleAssignments().
   */
  export class RoleAssignmentsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamPolicyManagementV1;

    protected params: IamPolicyManagementV1.ListRoleAssignmentsParams;

    /**
     * Construct a RoleAssignmentsPager object.
     *
     * @param {IamPolicyManagementV1}  client - The service client instance used to invoke listRoleAssignments()
     * @param {Object} params - The parameters to be passed to listRoleAssignments()
     * @constructor
     * @returns {RoleAssignmentsPager}
     */
    constructor(
      client: IamPolicyManagementV1,
      params: IamPolicyManagementV1.ListRoleAssignmentsParams
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
     * Returns the next page of results by invoking listRoleAssignments().
     * @returns {Promise<IamPolicyManagementV1.RoleAssignment[]>}
     */
    public async getNext(): Promise<IamPolicyManagementV1.RoleAssignment[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listRoleAssignments(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.assignments;
    }

    /**
     * Returns all results by invoking listRoleAssignments() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamPolicyManagementV1.RoleAssignment[]>}
     */
    public async getAll(): Promise<IamPolicyManagementV1.RoleAssignment[]> {
      const results: RoleAssignment[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = IamPolicyManagementV1;
