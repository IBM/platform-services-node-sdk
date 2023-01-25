/**
 * (C) Copyright IBM Corp. 2023.
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
 * IBM OpenAPI SDK Code Generator Version: 3.64.0-959a5845-20230112-195144
 */

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
   * @param {string} [options.serviceUrl] - The URL for the service
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
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
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
   * Get policies and filter by attributes. While managing policies, you may want to retrieve policies in the account
   * and filter by attribute values. This can be done through query parameters. Currently, only the following attributes
   * are supported: account_id, iam_id, access_group_id, type, service_type, sort, format and state. account_id is a
   * required query parameter. Only policies that have the specified attributes and that the caller has read access to
   * are returned. If the caller does not have read access to any policies an empty array is returned. If a policy was
   * created using the new beta v2/policies API, then the caller will see placeholder information, e.g., "unsupported
   * version" for iam_id, and a valid v2/policies href. The caller should use this href to view the policy.
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
   * @param {string} [params.tagName] - Optional name of the access management tag in the policy.
   * @param {string} [params.tagValue] - Optional value of the access management tag in the policy.
   * @param {string} [params.sort] - Optional top level policy field to sort results. Ascending sort is default.
   * Descending sort available by prepending '-' to field. Example '-last_modified_at'.
   * @param {string} [params.format] - Include additional data per policy returned
   * * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times
   * it has done so
   * * `display` - returns the list of all actions included in each of the policy roles.
   * @param {string} [params.state] - The state of the policy.
   * * `active` - returns active policies
   * * `deleted` - returns non-active policies.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyList>>}
   */
  public listPolicies(
    params: IamPolicyManagementV1.ListPoliciesParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.PolicyList>> {
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
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
          },
          _params.headers
        ),
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
   * service-id. Use the **`access_group_id`** subject attribute for assigning access for an access group. The roles
   * must be a subset of a service's or the platform's supported roles. The resource attributes must be a subset of a
   * service's or the platform's supported attributes. The policy resource must include either the **`serviceType`**,
   * **`serviceName`**, **`resourceGroupId`** or **`service_group_id`** attribute and the **`accountId`** attribute.`
   * The IAM Services group (`IAM`) is a subset of account management services that includes the IAM platform services
   * IAM Identity, IAM Access Management, IAM Users Management, IAM Groups, and future IAM services. If the subject is a
   * locked service-id, the request will fail.
   *
   * ### Authorization
   *
   * Authorization policies are supported by services on a case by case basis. Refer to service documentation to verify
   * their support of authorization policies. To create an authorization policy, use **`"type": "authorization"`** in
   * the body. The subject attributes must match the supported authorization subjects of the resource. Multiple subject
   * attributes might be provided. The following attributes are supported:
   *   serviceName, serviceInstance, region, resourceType, resource, accountId The policy roles must be a subset of the
   * supported authorization roles supported by the target service. The user must also have the same level of access or
   * greater to the target resource in order to grant the role. The resource attributes must be a subset of a service's
   * or the platform's supported attributes. Both the policy subject and the policy resource must include the
   * **`serviceName`** and **`accountId`** attributes.
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals` and the `stringMatch` operators are available. Resource attributes may support
   * one or both operators. For more information, see [how to assign access by using wildcards
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
   * @param {PolicyRole[]} params.roles - A set of role cloud resource names (CRNs) granted by the policy.
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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
          },
          _params.headers
        ),
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
   * service-id. Use the **`access_group_id`** subject attribute for assigning access for an access group. The roles
   * must be a subset of a service's or the platform's supported roles. The resource attributes must be a subset of a
   * service's or the platform's supported attributes. The policy resource must include either the **`serviceType`**,
   * **`serviceName`**,  or **`resourceGroupId`** attribute and the **`accountId`** attribute.` If the subject is a
   * locked service-id, the request will fail.
   *
   * ### Authorization
   *
   * To update an authorization policy, use **`"type": "authorization"`** in the body. The subject attributes must match
   * the supported authorization subjects of the resource. Multiple subject attributes might be provided. The following
   * attributes are supported:
   *   serviceName, serviceInstance, region, resourceType, resource, accountId The policy roles must be a subset of the
   * supported authorization roles supported by the target service. The user must also have the same level of access or
   * greater to the target resource in order to grant the role. The resource attributes must be a subset of a service's
   * or the platform's supported attributes. Both the policy subject and the policy resource must include the
   * **`serviceName`** and **`accountId`** attributes.
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals` and the `stringMatch` operators are available. Resource attributes might support
   * one or both operators. For more information, see [how to assign access by using wildcards
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
   * @param {PolicyRole[]} params.roles - A set of role cloud resource names (CRNs) granted by the policy.
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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
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
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>>}
   */
  public getPolicy(
    params: IamPolicyManagementV1.GetPolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.Policy>> {
    const _params = { ...params };
    const _requiredParams = ['policyId'];
    const _validParams = ['policyId', 'headers'];
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
    const _validParams = ['policyId', 'headers'];
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
    const _validParams = ['policyId', 'ifMatch', 'state', 'headers'];
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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
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
   * source_service_name and policy_type. Only roles that match the filter and that the caller has read access to are
   * returned. If the caller does not have read access to any roles an empty array is returned.
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
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleList>>}
   */
  public listRoles(
    params?: IamPolicyManagementV1.ListRolesParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.RoleList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'acceptLanguage',
      'accountId',
      'serviceName',
      'sourceServiceName',
      'policyType',
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
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
          },
          _params.headers
        ),
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
   * @param {string} params.displayName - The display name of the role that is shown in the console.
   * @param {string[]} params.actions - The actions of the role. Please refer to [IAM roles and
   * actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
   * @param {string} params.name - The name of the role that is used in the CRN. Can only be alphanumeric and has to be
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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
          },
          _params.headers
        ),
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
   * @param {string} params.displayName - The display name of the role that is shown in the console.
   * @param {string[]} params.actions - The actions of the role. Please refer to [IAM roles and
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
    const _validParams = ['roleId', 'ifMatch', 'displayName', 'actions', 'description', 'headers'];
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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
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
    const _validParams = ['roleId', 'headers'];
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
    const _validParams = ['roleId', 'headers'];
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
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
   * Get policies and filter by attributes. While managing policies, you may want to retrieve policies in the account
   * and filter by attribute values. This can be done through query parameters. Currently, only the following attributes
   * are supported: account_id, iam_id, access_group_id, type, service_type, sort, format and state. account_id is a
   * required query parameter. Only policies that have the specified attributes and that the caller has read access to
   * are returned. If the caller does not have read access to any policies an empty array is returned.
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
   * @param {string} [params.format] - Include additional data per policy returned
   * * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of times
   * it has done so
   * * `display` - returns the list of all actions included in each of the policy roles and translations for all
   * relevant fields.
   * @param {string} [params.state] - The state of the policy.
   * * `active` - returns active policies
   * * `deleted` - returns non-active policies.
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
      'format',
      'state',
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
      'format': _params.format,
      'state': _params.state,
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
          {
            'Accept': 'application/json',
            'Accept-Language': _params.acceptLanguage,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create a policy.
   *
   * Creates a policy to grant access between a subject and a resource. Currently, there is one type of a v2/policy:
   * **access**. A policy administrator might want to create an access policy which grants access to a user, service-id,
   * or an access group.
   *
   * ### Access
   *
   * To create an access policy, use **`"type": "access"`** in the body. The possible subject attributes are
   * **`iam_id`** and **`access_group_id`**. Use the **`iam_id`** subject attribute for assigning access for a user or
   * service-id. Use the **`access_group_id`** subject attribute for assigning access for an access group. The roles
   * must be a subset of a service's or the platform's supported roles. For more information, see [IAM roles and
   * actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions). The resource attributes must
   * be a subset of a service's or the platform's supported attributes. Caller should check with service, e.g.,
   * [VPC](https://cloud.ibm.com/docs/vpc?topic=vpc-resource-attributes), to view supported attributes. The policy
   * resource must include either the **`serviceType`**, **`serviceName`**, **`resourceGroupId`** or
   * **`service_group_id`** attribute and the **`accountId`** attribute.` The rule field can either specify single
   * **`key`**, **`value`**, and **`operator`** or be set of **`conditions`** with a combination **`operator`**.  The
   * possible combination operator are **`and`** and **`or`**. The operator for a rule can be used to specify a
   * time-based condition (e.g., access only during business hours, during the Monday-Friday work week). For example, a
   * policy can grant access Monday-Friday, 9:00am-5:00pm using the following rule:
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
   * ``` Rules and conditions allow the following operators with **`key`**, **`value`** :
   * ```
   *   'timeLessThan', 'timeLessThanOrEquals', 'timeGreaterThan', 'timeGreaterThanOrEquals',
   *   'dateTimeLessThan', 'dateTimeLessThanOrEquals', 'dateTimeGreaterThan', 'dateTimeGreaterThanOrEquals',
   *   'dayOfWeekEquals', 'dayOfWeekAnyOf',
   * ```
   *
   * The pattern field that matches the rule is required when rule is provided. For the business hour rule example
   * above, the **`pattern`** is **`"time-based-conditions:weekly"`**. For more information, see [Time-based conditions
   * operators](https://cloud.ibm.com/docs/account?topic=account-iam-condition-properties&interface=ui#policy-condition-properties)
   * and
   * [Limiting access with time-based
   * conditions](https://cloud.ibm.com/docs/account?topic=account-iam-time-based&interface=ui). The IAM Services group
   * (`IAM`) is a subset of account management services that includes the IAM platform services IAM Identity, IAM Access
   * Management, IAM Users Management, IAM Groups, and future IAM services. If the subject is a locked service-id, the
   * request will fail.
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals`, `stringMatch`, and `stringEquals` operators are available. For more
   * information, see [how to assign access by using wildcards
   * policies](https://cloud.ibm.com/docs/account?topic=account-wildcard).
   *
   * ### Attribute Validations
   *
   * Policy attribute values must be between 1 and 1,000 characters in length. If location related attributes like
   * geography, country, metro, region, satellite, and locationvalues are supported by the service, they are validated
   * against Global Catalog locations.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {Control} params.control - Specifies the type of access granted by the policy.
   * @param {string} params.type - The policy type; either 'access' or 'authorization'.
   * @param {string} [params.description] - Allows the customer to use their own words to record the purpose/context
   * related to a policy.
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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': _params.acceptLanguage,
          },
          _params.headers
        ),
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
   * To update an access policy, use **`"type": "access"`** in the body. The possible subject attributes are
   * **`iam_id`** and **`access_group_id`**. Use the **`iam_id`** subject attribute for assigning access for a user or
   * service-id. Use the **`access_group_id`** subject attribute for assigning access for an access group. The roles
   * must be a subset of a service's or the platform's supported roles. For more information, see [IAM roles and
   * actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions). The resource attributes must
   * be a subset of a service's or the platform's supported attributes. Caller should check with service, e.g.,
   * [VPC](https://cloud.ibm.com/docs/vpc?topic=vpc-resource-attributes), to view supported attributes. The policy
   * resource must include either the **`serviceType`**, **`serviceName`**,  or **`resourceGroupId`** attribute and the
   * **`accountId`** attribute.` The rule field can either specify single **`key`**, **`value`**, and **`operator`** or
   * be set of **`conditions`** with a combination **`operator`**.  The possible combination operator are **`and`** and
   * **`or`**. The operator for a rule can be used to specify a time-based condition (e.g., access only during business
   * hours, during the Monday-Friday work week). For example, a policy can grant access Monday-Friday, 9:00am-5:00pm
   * using the following rule:
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
   * ``` Rules and conditions allow the following operators with **`key`**, **`value`** :
   * ```
   *   'timeLessThan', 'timeLessThanOrEquals', 'timeGreaterThan', 'timeGreaterThanOrEquals',
   *   'dateTimeLessThan', 'dateTimeLessThanOrEquals', 'dateTimeGreaterThan', 'dateTimeGreaterThanOrEquals',
   *   'dayOfWeekEquals', 'dayOfWeekAnyOf',
   * ``` The pattern field that matches the rule is required when rule is provided. For the business hour rule example
   * above, the **`pattern`** is **`"time-based-conditions:weekly"`**. For more information, see [Time-based conditions
   * operators](https://cloud.ibm.com/docs/account?topic=account-iam-condition-properties&interface=ui#policy-condition-properties)
   * and
   * [Limiting access with time-based
   * conditions](https://cloud.ibm.com/docs/account?topic=account-iam-time-based&interface=ui).
   *
   * ### Attribute Operators
   *
   * Currently, only the `stringEquals`, `stringMatch`, and `stringEquals` operators are available. For more
   * information, see [how to assign access by using wildcards
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
   * @param {Control} params.control - Specifies the type of access granted by the policy.
   * @param {string} params.type - The policy type; either 'access' or 'authorization'.
   * @param {string} [params.description] - Allows the customer to use their own words to record the purpose/context
   * related to a policy.
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
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
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
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2Policy>>}
   */
  public getV2Policy(
    params: IamPolicyManagementV1.GetV2PolicyParams
  ): Promise<IamPolicyManagementV1.Response<IamPolicyManagementV1.V2Policy>> {
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
      IamPolicyManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getV2Policy'
    );

    const parameters = {
      options: {
        url: '/v2/policies/{id}',
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
    const _validParams = ['id', 'headers'];
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
        headers: extend(true, sdkHeaders, {}, _params.headers),
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

  /** Parameters for the `listPolicies` operation. */
  export interface ListPoliciesParams {
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
    type?: ListPoliciesConstants.Type | string;
    /** Optional type of service. */
    serviceType?: ListPoliciesConstants.ServiceType | string;
    /** Optional name of the access management tag in the policy. */
    tagName?: string;
    /** Optional value of the access management tag in the policy. */
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
    headers?: OutgoingHttpHeaders;
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
  export interface CreatePolicyParams {
    /** The policy type; either 'access' or 'authorization'. */
    type: string;
    /** The subjects associated with a policy. */
    subjects: PolicySubject[];
    /** A set of role cloud resource names (CRNs) granted by the policy. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replacePolicy` operation. */
  export interface ReplacePolicyParams {
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
    /** A set of role cloud resource names (CRNs) granted by the policy. */
    roles: PolicyRole[];
    /** The resources associated with a policy. */
    resources: PolicyResource[];
    /** Customer-defined description. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPolicy` operation. */
  export interface GetPolicyParams {
    /** The policy ID. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deletePolicy` operation. */
  export interface DeletePolicyParams {
    /** The policy ID. */
    policyId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updatePolicyState` operation. */
  export interface UpdatePolicyStateParams {
    /** The policy ID. */
    policyId: string;
    /** The revision number for updating a policy and must match the ETag value of the existing policy. The Etag can
     *  be retrieved using the GET /v1/policies/{policy_id} API and looking at the ETag response header.
     */
    ifMatch: string;
    /** The policy state. */
    state?: UpdatePolicyStateConstants.State | string;
    headers?: OutgoingHttpHeaders;
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
  export interface ListRolesParams {
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createRole` operation. */
  export interface CreateRoleParams {
    /** The display name of the role that is shown in the console. */
    displayName: string;
    /** The actions of the role. Please refer to [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The name of the role that is used in the CRN. Can only be alphanumeric and has to be capitalized. */
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
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceRole` operation. */
  export interface ReplaceRoleParams {
    /** The role ID. */
    roleId: string;
    /** The revision number for updating a role and must match the ETag value of the existing role. The Etag can be
     *  retrieved using the GET /v2/roles/{role_id} API and looking at the ETag response header.
     */
    ifMatch: string;
    /** The display name of the role that is shown in the console. */
    displayName: string;
    /** The actions of the role. Please refer to [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The description of the role. */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getRole` operation. */
  export interface GetRoleParams {
    /** The role ID. */
    roleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteRole` operation. */
  export interface DeleteRoleParams {
    /** The role ID. */
    roleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listV2Policies` operation. */
  export interface ListV2PoliciesParams {
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
    /** Include additional data per policy returned
     *  * `include_last_permit` - returns details of when the policy last granted a permit decision and the number of
     *  times it has done so
     *  * `display` - returns the list of all actions included in each of the policy roles and translations for all
     *  relevant fields.
     */
    format?: ListV2PoliciesConstants.Format | string;
    /** The state of the policy. * `active` - returns active policies * `deleted` - returns non-active policies. */
    state?: ListV2PoliciesConstants.State | string;
    headers?: OutgoingHttpHeaders;
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
  export interface CreateV2PolicyParams {
    /** Specifies the type of access granted by the policy. */
    control: Control;
    /** The policy type; either 'access' or 'authorization'. */
    type: CreateV2PolicyConstants.Type | string;
    /** Allows the customer to use their own words to record the purpose/context related to a policy. */
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
    headers?: OutgoingHttpHeaders;
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
  export interface ReplaceV2PolicyParams {
    /** The policy ID. */
    id: string;
    /** The revision number for updating a policy and must match the ETag value of the existing policy. The Etag can
     *  be retrieved using the GET /v2/policies/{id} API and looking at the ETag response header.
     */
    ifMatch: string;
    /** Specifies the type of access granted by the policy. */
    control: Control;
    /** The policy type; either 'access' or 'authorization'. */
    type: ReplaceV2PolicyConstants.Type | string;
    /** Allows the customer to use their own words to record the purpose/context related to a policy. */
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
    headers?: OutgoingHttpHeaders;
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
  export interface GetV2PolicyParams {
    /** The policy ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteV2Policy` operation. */
  export interface DeleteV2PolicyParams {
    /** The policy ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Specifies the type of access granted by the policy. */
  export interface Control {
    /** Permission granted by the policy. */
    grant: V2PolicyGrant;
  }

  /** ControlResponse. */
  export interface ControlResponse {}

  /** Permission granted by the policy with translated roles and additional role information. */
  export interface GrantWithTranslatedRoles {
    /** A set of roles granted by the policy. */
    roles: RoleInDisplayFormat[];
  }

  /** A role associated with a policy. */
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

  /** An action that can be performed by the policy subject when assigned role. */
  export interface RoleAction {
    /** Unique identifier for action with structure service.resource.action e.g., cbr.rule.read. */
    id: string;
    /** Service defined display name for action. */
    display_name: string;
    /** Service defined description for action. */
    description: string;
  }

  /** A role associated with a policy with additional information (display_name, description, actions) when `format=display`. */
  export interface RoleInDisplayFormat {
    /** The role Cloud Resource Name (CRN) granted by the policy. Example CRN:
     *  'crn:v1:bluemix:public:iam::::role:Editor'.
     */
    role_id: string;
    /** The service defined (or user defined if a custom role) display name of the role. */
    display_name?: string;
    /** The service defined (or user defined if a custom role) description of the role. */
    description?: string;
    /** The actions of the role. Please refer to [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: RoleAction[];
  }

  /** Rule that specifies additional access granted (e.g., time-based condition). */
  export interface RuleAttribute {
    /** The name of an attribute. */
    key: string;
    /** The operator of an attribute. */
    operator: string;
    /** The value of an rule or resource attribute; can be boolean or string for resource attribute. Can be a string
     *  or an array of strings (e.g., array of days to permit access) for rule attribute.
     */
    value: any;
  }

  /** The core set of properties associated with the policy. */
  export interface V2Policy {
    /** The policy type; either 'access' or 'authorization'. */
    type: string;
    /** Allows the customer to use their own words to record the purpose/context related to a policy. */
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
    /** The iam ID of the entity that created the policy. */
    created_by_id?: string;
    /** The UTC timestamp when the policy was last modified. */
    last_modified_at?: string;
    /** The iam ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The policy state, either 'deleted' or 'active'. */
    state: string;
    /** The optional last permit time of policy, when passing query parameter format=include_last_permit. */
    last_permit_at?: string;
    /** The optional count of times that policy has provided a permit, when passing query parameter
     *  format=include_last_permit.
     */
    last_permit_frequency?: number;
  }

  /** A collection of policies. */
  export interface V2PolicyCollection {
    /** List of policies. */
    policies?: V2Policy[];
  }

  /** Permission granted by the policy. */
  export interface V2PolicyGrant {
    /** A set of role cloud resource names (CRNs) granted by the policy. */
    roles: PolicyRole[];
  }

  /** The resource attributes to which the policy grants access. */
  export interface V2PolicyResource {
    /** List of resource attributes to which the policy grants access. */
    attributes: V2PolicyResourceAttribute[];
    /** Optional list of resource tags to which the policy grants access. */
    tags?: V2PolicyResourceTag[];
  }

  /** Resource attribute to which the policy grants access. */
  export interface V2PolicyResourceAttribute {
    /** The name of a resource attribute. */
    key: string;
    /** The operator of an attribute. */
    operator: string;
    /** The value of an rule or resource attribute; can be boolean or string for resource attribute. Can be a string
     *  or an array of strings (e.g., array of days to permit access) for rule attribute.
     */
    value: any;
  }

  /** A tag associated with a resource. */
  export interface V2PolicyResourceTag {
    /** The name of an access management tag. */
    key: string;
    /** The value of an access management tag. */
    value: string;
    /** The operator of an access management tag. */
    operator: string;
  }

  /** Additional access conditions associated with the policy. */
  export interface V2PolicyRule {}

  /** The subject attributes for whom the policy grants access. */
  export interface V2PolicySubject {
    /** List of subject attributes associated with policy/. */
    attributes: V2PolicySubjectAttribute[];
  }

  /** Subject attribute for whom the policy grants access. */
  export interface V2PolicySubjectAttribute {
    /** The name of a subject attribute, e.g., iam_id, access_group_id. */
    key: string;
    /** The operator of an attribute. */
    operator: string;
    /** The value of the ID of the subject, e.g., service ID, access group ID, IAM ID. */
    value: string;
  }

  /** An additional set of properties associated with a role. */
  export interface CustomRole {
    /** The role ID. Composed of hexadecimal characters. */
    id?: string;
    /** The display name of the role that is shown in the console. */
    display_name: string;
    /** The description of the role. */
    description?: string;
    /** The actions of the role. Please refer to [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The role Cloud Resource Name (CRN). Example CRN:
     *  'crn:v1:ibmcloud:public:iam-access-management::a/exampleAccountId::customRole:ExampleRoleName'.
     */
    crn?: string;
    /** The name of the role that is used in the CRN. Can only be alphanumeric and has to be capitalized. */
    name: string;
    /** The account GUID. */
    account_id: string;
    /** The service name. */
    service_name: string;
    /** The UTC timestamp when the role was created. */
    created_at?: string;
    /** The iam ID of the entity that created the role. */
    created_by_id?: string;
    /** The UTC timestamp when the role was last modified. */
    last_modified_at?: string;
    /** The iam ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The href link back to the role. */
    href?: string;
  }

  /** The core set of properties associated with a policy. */
  export interface Policy {
    /** The policy ID. */
    id?: string;
    /** The policy type; either 'access' or 'authorization'. */
    type: string;
    /** Customer-defined description. */
    description?: string;
    /** The subjects associated with a policy. */
    subjects: PolicySubject[];
    /** A set of role cloud resource names (CRNs) granted by the policy. */
    roles: PolicyRole[];
    /** The resources associated with a policy. */
    resources: PolicyResource[];
    /** The href link back to the policy. */
    href?: string;
    /** The UTC timestamp when the policy was created. */
    created_at?: string;
    /** The iam ID of the entity that created the policy. */
    created_by_id?: string;
    /** The UTC timestamp when the policy was last modified. */
    last_modified_at?: string;
    /** The iam ID of the entity that last modified the policy. */
    last_modified_by_id?: string;
    /** The policy state. */
    state?: string;
  }

  /** A collection of policies. */
  export interface PolicyList {
    /** List of policies. */
    policies?: Policy[];
  }

  /** The attributes of the resource. Note that only one resource is allowed in a policy. */
  export interface PolicyResource {
    /** List of resource attributes. */
    attributes?: ResourceAttribute[];
    /** List of access management tags. */
    tags?: ResourceTag[];
  }

  /** The subject attribute values that must match in order for this policy to apply in a permission decision. */
  export interface PolicySubject {
    /** List of subject attributes. */
    attributes?: SubjectAttribute[];
  }

  /** An attribute associated with a resource. */
  export interface ResourceAttribute {
    /** The name of an attribute. */
    name: string;
    /** The value of an attribute. */
    value: string;
    /** The operator of an attribute. */
    operator?: string;
  }

  /** A tag associated with a resource. */
  export interface ResourceTag {
    /** The name of an access management tag. */
    name: string;
    /** The value of an access management tag. */
    value: string;
    /** The operator of an access management tag. */
    operator?: string;
  }

  /** A role resource. */
  export interface Role {
    /** The display name of the role that is shown in the console. */
    display_name: string;
    /** The description of the role. */
    description?: string;
    /** The actions of the role. Please refer to [IAM roles and
     *  actions](https://cloud.ibm.com/docs/account?topic=account-iam-service-roles-actions).
     */
    actions: string[];
    /** The role Cloud Resource Name (CRN). Example CRN:
     *  'crn:v1:ibmcloud:public:iam-access-management::a/exampleAccountId::customRole:ExampleRoleName'.
     */
    crn?: string;
  }

  /** A collection of roles returned by the 'list roles' operation. */
  export interface RoleList {
    /** List of custom roles. */
    custom_roles?: CustomRole[];
    /** List of service roles. */
    service_roles?: Role[];
    /** List of system roles. */
    system_roles?: Role[];
  }

  /** An attribute associated with a subject. */
  export interface SubjectAttribute {
    /** The name of an attribute. */
    name: string;
    /** The value of an attribute. */
    value: string;
  }

  /** Specifies the type of access granted by the policy. */
  export interface ControlResponseControl extends ControlResponse {
    /** Permission granted by the policy. */
    grant: V2PolicyGrant;
  }

  /** Specifies the type of access granted by the policy with additional role information. */
  export interface ControlResponseControlWithTranslatedRoles extends ControlResponse {
    /** Permission granted by the policy with translated roles and additional role information. */
    grant: GrantWithTranslatedRoles;
  }

  /** Rule that specifies additional access granted (e.g., time-based condition). */
  export interface V2PolicyRuleRuleAttribute extends V2PolicyRule {
    /** The name of an attribute. */
    key: string;
    /** The operator of an attribute. */
    operator: string;
    /** The value of an rule or resource attribute; can be boolean or string for resource attribute. Can be a string
     *  or an array of strings (e.g., array of days to permit access) for rule attribute.
     */
    value: any;
  }

  /** Rule that specifies additional access granted (e.g., time-based condition) accross multiple conditions. */
  export interface V2PolicyRuleRuleWithConditions extends V2PolicyRule {
    /** Operator to evalute conditions. */
    operator: string;
    /** List of conditions associated with a policy, e.g., time-based-conditions that grant access over a certain
     *  time period.
     */
    conditions: RuleAttribute[];
  }
}

export = IamPolicyManagementV1;
