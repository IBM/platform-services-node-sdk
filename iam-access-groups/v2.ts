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
 * IBM OpenAPI SDK Code Generator Version: 3.74.0-89f1dbab-20230630-160213
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
 * The IAM Access Groups API allows for the management of access groups (Create, Read, Update, Delete) as well as the
 * management of memberships and rules within the group container.
 *
 * API Version: 2.0
 */

class IamAccessGroupsV2 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://iam.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'iam_access_groups';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of IamAccessGroupsV2 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {IamAccessGroupsV2}
   */

  public static newInstance(options: UserOptions): IamAccessGroupsV2 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new IamAccessGroupsV2(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a IamAccessGroupsV2 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {IamAccessGroupsV2}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(IamAccessGroupsV2.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * accessGroupOperations
   ************************/

  /**
   * Create an access group.
   *
   * Create a new access group to assign multiple users and service ids to multiple policies. The group will be created
   * in the account specified by the `account_id` parameter. The group name is a required field, but a description is
   * optional. Because the group's name does not have to be unique, it is possible to create multiple groups with the
   * same name.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID of the API keys(s) to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {string} params.name - Give the access group a unique name that doesn't conflict with an existing access
   * group in the account. This field is case-insensitive and has a limit of 100 characters.
   * @param {string} [params.description] - Assign an optional description for the access group. This field has a limit
   * of 250 characters.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Group>>}
   */
  public createAccessGroup(
    params: IamAccessGroupsV2.CreateAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Group>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'name'];
    const _validParams = ['accountId', 'name', 'description', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List access groups.
   *
   * This API lists access groups within an account. Parameters for pagination and sorting can be used to filter the
   * results. The `account_id` query parameter determines which account to retrieve groups from. Only the groups you
   * have access to are returned (either because of a policy on a specific group or account level access (admin, editor,
   * or viewer)). There may be more groups in the account that aren't shown if you lack the aforementioned permissions.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID of the API keys(s) to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {string} [params.iamId] - Return groups for member ID (IBMid, service ID or trusted profile ID).
   * @param {string} [params.search] - Use search to filter access groups list by id, name or description.
   * * `search=id:<ACCESS_GROUP_ID>` - To list access groups by id
   * * `search=name:<ACCESS_GROUP_NAME>` - To list access groups by name
   * * `search=description:<ACCESS_GROUP_DESC>` - To list access groups by description.
   * @param {string} [params.membershipType] - Membership type need to be specified along with iam_id and must be either
   * `static`, `dynamic` or `all`. If membership type is `static`, members explicitly added to the group will be shown.
   * If membership type is `dynamic`, members accessing the access group at the moment via dynamic rules will be shown.
   * If membership type is `all`, both static and dynamic members will be shown.
   * @param {number} [params.limit] - Return up to this limit of results where limit is between 0 and 100.
   * @param {number} [params.offset] - The offset of the first result item to be returned.
   * @param {string} [params.sort] - Sort the results by id, name, description, or is_federated flag.
   * @param {boolean} [params.showFederated] - If show_federated is true, each group listed will return an is_federated
   * value that is set to true if rules exist for the group.
   * @param {boolean} [params.hidePublicAccess] - If hide_public_access is true, do not include the Public Access Group
   * in the results.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.GroupsList>>}
   */
  public listAccessGroups(
    params: IamAccessGroupsV2.ListAccessGroupsParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.GroupsList>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'transactionId',
      'iamId',
      'search',
      'membershipType',
      'limit',
      'offset',
      'sort',
      'showFederated',
      'hidePublicAccess',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
      'search': _params.search,
      'membership_type': _params.membershipType,
      'limit': _params.limit,
      'offset': _params.offset,
      'sort': _params.sort,
      'show_federated': _params.showFederated,
      'hide_public_access': _params.hidePublicAccess,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listAccessGroups'
    );

    const parameters = {
      options: {
        url: '/v2/groups',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an access group.
   *
   * Retrieve an access group by its `access_group_id`. Only the groups data is returned (group name, description,
   * account_id, ...), not membership or rule information. A revision number is returned in the `ETag` header, which is
   * needed when updating the access group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {boolean} [params.showFederated] - If show_federated is true, the group will return an is_federated value
   * that is set to true if rules exist for the group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Group>>}
   */
  public getAccessGroup(
    params: IamAccessGroupsV2.GetAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Group>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId'];
    const _validParams = ['accessGroupId', 'transactionId', 'showFederated', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'show_federated': _params.showFederated,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update an access group.
   *
   * Update the group name or description of an existing access group using this API. An `If-Match` header must be
   * populated with the group's most recent revision number (which can be acquired in the `Get an access group` API).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} params.ifMatch - The current revision number of the group being updated. This can be found in the
   * Create/Get access group response ETag header.
   * @param {string} [params.name] - Give the access group a unique name that doesn't conflict with an existing access
   * group in the account. This field is case-insensitive and has a limit of 100 characters.
   * @param {string} [params.description] - Assign an optional description for the access group. This field has a limit
   * of 250 characters.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Group>>}
   */
  public updateAccessGroup(
    params: IamAccessGroupsV2.UpdateAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Group>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId', 'ifMatch'];
    const _validParams = [
      'accessGroupId',
      'ifMatch',
      'name',
      'description',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an access group.
   *
   * This API is used for deleting an access group. If the access group has no members or rules associated with it, the
   * group and its policies will be deleted. However, if rules or members do exist, set the `force` parameter to true to
   * delete the group as well as its associated members, rules, and policies.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {boolean} [params.force] - If force is true, delete the group as well as its associated members and rules.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public deleteAccessGroup(
    params: IamAccessGroupsV2.DeleteAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId'];
    const _validParams = ['accessGroupId', 'transactionId', 'force', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'force': _params.force,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * membershipOperations
   ************************/

  /**
   * Check membership in an access group.
   *
   * This HEAD operation determines if a given `iam_id` is present in a group either explicitly or via dynamic rules. No
   * response body is returned with this request. If the membership exists, a `204 - No Content` status code is
   * returned. If the membership or the group does not exist, a `404 - Not Found` status code is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} params.iamId - The IAM identifier.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public isMemberOfAccessGroup(
    params: IamAccessGroupsV2.IsMemberOfAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId', 'iamId'];
    const _validParams = ['accessGroupId', 'iamId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'access_group_id': _params.accessGroupId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'isMemberOfAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/members/{iam_id}',
        method: 'HEAD',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add members to an access group.
   *
   * Use this API to add users (`IBMid-...`), service IDs (`iam-ServiceId-...`) or trusted profiles (`iam-Profile-...`)
   * to an access group. Any member added gains access to resources defined in the group's policies. To revoke a given
   * members's access, simply remove them from the group. There is no limit to the number of members one group can have,
   * but each `iam_id` can only be added to 50 groups. Additionally, this API request payload can add up to 50 members
   * per call.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {AddGroupMembersRequestMembersItem[]} [params.members] - An array of member objects to add to an access
   * group.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AddGroupMembersResponse>>}
   */
  public addMembersToAccessGroup(
    params: IamAccessGroupsV2.AddMembersToAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AddGroupMembersResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId'];
    const _validParams = ['accessGroupId', 'members', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'members': _params.members,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'addMembersToAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/members',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List access group members.
   *
   * List all members of a given group using this API. Parameters for pagination and sorting can be used to filter the
   * results. The most useful query parameter may be the `verbose` flag. If `verbose=true`, user, service ID and trusted
   * profile names will be retrieved for each `iam_id`. If performance is a concern, leave the `verbose` parameter off
   * so that name information does not get retrieved.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {string} [params.membershipType] - Filters members by membership type. Filter by `static`, `dynamic` or
   * `all`. `static` lists the members explicitly added to the access group, and `dynamic` lists the members that are
   * part of the access group at that time via dynamic rules. `all` lists both static and dynamic members.
   * @param {number} [params.limit] - Return up to this limit of results where limit is between 0 and 100.
   * @param {number} [params.offset] - The offset of the first result item to be returned.
   * @param {string} [params.type] - Filter the results by member type.
   * @param {boolean} [params.verbose] - Return user's email and name for each user ID or the name for each service ID
   * or trusted profile.
   * @param {string} [params.sort] - If verbose is true, sort the results by id, name, or email.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.GroupMembersList>>}
   */
  public listAccessGroupMembers(
    params: IamAccessGroupsV2.ListAccessGroupMembersParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.GroupMembersList>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId'];
    const _validParams = [
      'accessGroupId',
      'transactionId',
      'membershipType',
      'limit',
      'offset',
      'type',
      'verbose',
      'sort',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'membership_type': _params.membershipType,
      'limit': _params.limit,
      'offset': _params.offset,
      'type': _params.type,
      'verbose': _params.verbose,
      'sort': _params.sort,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listAccessGroupMembers'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/members',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete member from an access group.
   *
   * Remove one member from a group using this API. If the operation is successful, only a `204 - No Content` response
   * with no body is returned. However, if any error occurs, the standard error format will be returned. Dynamic member
   * cannot be deleted using this API. Dynamic rules needs to be adjusted to delete dynamic members.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} params.iamId - The IAM identifier.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public removeMemberFromAccessGroup(
    params: IamAccessGroupsV2.RemoveMemberFromAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId', 'iamId'];
    const _validParams = ['accessGroupId', 'iamId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'access_group_id': _params.accessGroupId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'removeMemberFromAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/members/{iam_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete members from an access group.
   *
   * Remove multiple members from a group using this API. On a successful call, this API will always return 207. It is
   * the caller's responsibility to iterate across the body to determine successful deletion of each member. This API
   * request payload can delete up to 50 members per call. This API doesnt delete dynamic members accessing the access
   * group via dynamic rules.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string[]} [params.members] - The `iam_id`s to remove from the access group. This field has a limit of 50
   * `iam_id`s.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.DeleteGroupBulkMembersResponse>>}
   */
  public removeMembersFromAccessGroup(
    params: IamAccessGroupsV2.RemoveMembersFromAccessGroupParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.DeleteGroupBulkMembersResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId'];
    const _validParams = ['accessGroupId', 'members', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'members': _params.members,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'removeMembersFromAccessGroup'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/members/delete',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete member from all access groups.
   *
   * This API removes a given member from every group they are a member of within the specified account. By using one
   * operation, you can revoke one member's access to all access groups in the account. If a partial failure occurs on
   * deletion, the response will be shown in the body.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID of the API keys(s) to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {string} params.iamId - The IAM identifier.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.DeleteFromAllGroupsResponse>>}
   */
  public removeMemberFromAllAccessGroups(
    params: IamAccessGroupsV2.RemoveMemberFromAllAccessGroupsParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.DeleteFromAllGroupsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = ['accountId', 'iamId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'removeMemberFromAllAccessGroups'
    );

    const parameters = {
      options: {
        url: '/v2/groups/_allgroups/members/{iam_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Add member to multiple access groups.
   *
   * This API will add a member to multiple access groups in an account. The limit of how many groups that can be in the
   * request is 50. The response is a list of results that show if adding the member to each group was successful or
   * not.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID of the API keys(s) to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {string} params.iamId - The IAM identifier.
   * @param {string} [params.type] - The type of the member, must be either "user", "service" or "profile".
   * @param {string[]} [params.groups] - The ids of the access groups a given member is to be added to.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AddMembershipMultipleGroupsResponse>>}
   */
  public addMemberToMultipleAccessGroups(
    params: IamAccessGroupsV2.AddMemberToMultipleAccessGroupsParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AddMembershipMultipleGroupsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = ['accountId', 'iamId', 'type', 'groups', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'groups': _params.groups,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const path = {
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'addMemberToMultipleAccessGroups'
    );

    const parameters = {
      options: {
        url: '/v2/groups/_allgroups/members/{iam_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * ruleOperations
   ************************/

  /**
   * Create rule for an access group.
   *
   * Rules can be used to dynamically add users to an access group. If a user's SAML assertions match the rule's
   * conditions during login, the user will be dynamically added to the group. The duration of the user's access to the
   * group is determined by the `expiration` field. After access expires, the user will need to log in again to regain
   * access. Note that the condition's value field must be a stringified JSON value. [Consult this documentation for
   * further explanation of dynamic rules.](/docs/account?topic=account-rules).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {number} params.expiration - Session duration in hours. Access group membership is revoked after this time
   * period expires. Users must log back in to refresh their access group membership.
   * @param {string} params.realmName - The URL of the identity provider (IdP).
   * @param {RuleConditions[]} params.conditions - A list of conditions that identities must satisfy to gain access
   * group membership.
   * @param {string} [params.name] - The name of the dynaimic rule.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Rule>>}
   */
  public addAccessGroupRule(
    params: IamAccessGroupsV2.AddAccessGroupRuleParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId', 'expiration', 'realmName', 'conditions'];
    const _validParams = [
      'accessGroupId',
      'expiration',
      'realmName',
      'conditions',
      'name',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'expiration': _params.expiration,
      'realm_name': _params.realmName,
      'conditions': _params.conditions,
      'name': _params.name,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'addAccessGroupRule'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/rules',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List access group rules.
   *
   * This API lists all rules in a given access group. Because only a few rules are created on each group, there is no
   * pagination or sorting support on this API.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.RulesList>>}
   */
  public listAccessGroupRules(
    params: IamAccessGroupsV2.ListAccessGroupRulesParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.RulesList>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId'];
    const _validParams = ['accessGroupId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'access_group_id': _params.accessGroupId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listAccessGroupRules'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/rules',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get an access group rule.
   *
   * Retrieve a rule from an access group. A revision number is returned in the `ETag` header, which is needed when
   * updating the rule.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} params.ruleId - The rule to get.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Rule>>}
   */
  public getAccessGroupRule(
    params: IamAccessGroupsV2.GetAccessGroupRuleParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId', 'ruleId'];
    const _validParams = ['accessGroupId', 'ruleId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'access_group_id': _params.accessGroupId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getAccessGroupRule'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/rules/{rule_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Replace an access group rule.
   *
   * Update the body of an existing rule using this API. An `If-Match` header must be populated with the rule's most
   * recent revision number (which can be acquired in the `Get an access group rule` API).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} params.ruleId - The rule to get.
   * @param {string} params.ifMatch - The current revision number of the rule being updated. This can be found in the
   * Get Rule response ETag header.
   * @param {number} params.expiration - Session duration in hours. Access group membership is revoked after this time
   * period expires. Users must log back in to refresh their access group membership.
   * @param {string} params.realmName - The URL of the identity provider (IdP).
   * @param {RuleConditions[]} params.conditions - A list of conditions that identities must satisfy to gain access
   * group membership.
   * @param {string} [params.name] - The name of the dynaimic rule.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Rule>>}
   */
  public replaceAccessGroupRule(
    params: IamAccessGroupsV2.ReplaceAccessGroupRuleParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.Rule>> {
    const _params = { ...params };
    const _requiredParams = [
      'accessGroupId',
      'ruleId',
      'ifMatch',
      'expiration',
      'realmName',
      'conditions',
    ];
    const _validParams = [
      'accessGroupId',
      'ruleId',
      'ifMatch',
      'expiration',
      'realmName',
      'conditions',
      'name',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'expiration': _params.expiration,
      'realm_name': _params.realmName,
      'conditions': _params.conditions,
      'name': _params.name,
    };

    const path = {
      'access_group_id': _params.accessGroupId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceAccessGroupRule'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/rules/{rule_id}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete an access group rule.
   *
   * Remove one rule from a group using this API. If the operation is successful, only a `204 - No Content` response
   * with no body is returned. However, if any error occurs, the standard error format will be returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accessGroupId - The access group identifier.
   * @param {string} params.ruleId - The rule to get.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public removeAccessGroupRule(
    params: IamAccessGroupsV2.RemoveAccessGroupRuleParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accessGroupId', 'ruleId'];
    const _validParams = ['accessGroupId', 'ruleId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'access_group_id': _params.accessGroupId,
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'removeAccessGroupRule'
    );

    const parameters = {
      options: {
        url: '/v2/groups/{access_group_id}/rules/{rule_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * accountSettings
   ************************/

  /**
   * Get account settings.
   *
   * Retrieve the access groups settings for a specific account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID of the API keys(s) to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AccountSettings>>}
   */
  public getAccountSettings(
    params: IamAccessGroupsV2.GetAccountSettingsParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AccountSettings>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getAccountSettings'
    );

    const parameters = {
      options: {
        url: '/v2/groups/settings',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update account settings.
   *
   * Update the access groups settings for a specific account. Note: When the `public_access_enabled` setting is set to
   * false, all policies within the account attached to the Public Access group will be deleted. Only set
   * `public_access_enabled` to false if you are sure that you want those policies to be removed.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID of the API keys(s) to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {boolean} [params.publicAccessEnabled] - This flag controls the public access feature within the account. It
   * is set to true by default. Note: When this flag is set to false, all policies within the account attached to the
   * Public Access group will be deleted.
   * @param {string} [params.transactionId] - An optional transaction ID can be passed to your request, which can be
   * useful for tracking calls through multiple services by using one identifier. The header key must be set to
   * Transaction-Id and the value is anything that you choose. If no transaction ID is passed in, then a random ID is
   * generated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AccountSettings>>}
   */
  public updateAccountSettings(
    params: IamAccessGroupsV2.UpdateAccountSettingsParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.AccountSettings>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'publicAccessEnabled', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'public_access_enabled': _params.publicAccessEnabled,
    };

    const query = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateAccountSettings'
    );

    const parameters = {
      options: {
        url: '/v2/groups/settings',
        method: 'PATCH',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * templateOperations
   ************************/

  /**
   * Create template.
   *
   * Create an access group template. Make sure that the template is generic enough to apply to multiple different child
   * accounts. Before you can assign an access group template to child accounts, you must commit it so that no further
   * changes can be made to the version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Give the access group template a unique name that doesn't conflict with an existing
   * access group templates in the account.
   * @param {string} params.accountId - Enterprise account id in which the template will be created.
   * @param {string} [params.description] - Assign an optional description for the access group template.
   * @param {AccessGroupRequest} [params.group] - Access Group Component.
   * @param {PolicyTemplates[]} [params.policyTemplateReferences] - Existing policy templates that you can reference to
   * assign access in the Access group input component.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateResponse>>}
   */
  public createTemplate(
    params: IamAccessGroupsV2.CreateTemplateParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'accountId'];
    const _validParams = [
      'name',
      'accountId',
      'description',
      'group',
      'policyTemplateReferences',
      'transactionId',
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
      'group': _params.group,
      'policy_template_references': _params.policyTemplateReferences,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List templates.
   *
   * List the access group templates in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Enterprise account ID.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {number} [params.limit] - Return up to this limit of results where limit is between 0 and 100.
   * @param {number} [params.offset] - The offset of the first result item to be returned.
   * @param {boolean} [params.verbose] - If `verbose=true`, IAM resource details are returned. If performance is a
   * concern, leave the `verbose` parameter off so that details are not retrieved.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.ListTemplatesResponse>>}
   */
  public listTemplates(
    params: IamAccessGroupsV2.ListTemplatesParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.ListTemplatesResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'transactionId', 'limit', 'offset', 'verbose', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'limit': _params.limit,
      'offset': _params.offset,
      'verbose': _params.verbose,
    };

    const sdkHeaders = getSdkHeaders(IamAccessGroupsV2.DEFAULT_SERVICE_NAME, 'v2', 'listTemplates');

    const parameters = {
      options: {
        url: '/v1/group_templates',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create template version.
   *
   * Create a new version of an access group template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template that you want to create a new version of.
   * @param {string} [params.name] - This is an optional field. If the field is included it will change the name value
   * for all existing versions of the template..
   * @param {string} [params.description] - Assign an optional description for the access group template version.
   * @param {AccessGroupRequest} [params.group] - Access Group Component.
   * @param {PolicyTemplates[]} [params.policyTemplateReferences] - The policy templates associated with the template
   * version.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>>}
   */
  public createTemplateVersion(
    params: IamAccessGroupsV2.CreateTemplateVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = [
      'templateId',
      'name',
      'description',
      'group',
      'policyTemplateReferences',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'group': _params.group,
      'policy_template_references': _params.policyTemplateReferences,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}/versions',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List template versions.
   *
   * List all the versions of an access group template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template that you want to list all versions of.
   * @param {number} [params.limit] - Return up to this limit of results where limit is between 0 and 100.
   * @param {number} [params.offset] - The offset of the first result item to be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.ListTemplateVersionsResponse>>}
   */
  public listTemplateVersions(
    params: IamAccessGroupsV2.ListTemplateVersionsParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.ListTemplateVersionsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'limit', 'offset', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listTemplateVersions'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}/versions',
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
   * Get template version.
   *
   * Get a specific version of a template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template to get a specific version of.
   * @param {string} params.versionNum - Version number.
   * @param {boolean} [params.verbose] - If `verbose=true`, IAM resource details are returned. If performance is a
   * concern, leave the `verbose` parameter off so that details are not retrieved.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>>}
   */
  public getTemplateVersion(
    params: IamAccessGroupsV2.GetTemplateVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'versionNum'];
    const _validParams = ['templateId', 'versionNum', 'verbose', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'verbose': _params.verbose,
    };

    const path = {
      'template_id': _params.templateId,
      'version_num': _params.versionNum,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}/versions/{version_num}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update template version.
   *
   * Update a template version. You can only update a version that isn't committed. Create a new version if you need to
   * update a committed version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template.
   * @param {string} params.versionNum - Version number of the template.
   * @param {string} params.ifMatch - ETag value of the template version document.
   * @param {string} [params.name] - This is an optional field. If the field is included it will change the name value
   * for all existing versions of the template..
   * @param {string} [params.description] - Assign an optional description for the access group template version.
   * @param {AccessGroupRequest} [params.group] - Access Group Component.
   * @param {PolicyTemplates[]} [params.policyTemplateReferences] - The policy templates associated with the template
   * version.
   * @param {string} [params.transactionId] - transaction id in header.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>>}
   */
  public updateTemplateVersion(
    params: IamAccessGroupsV2.UpdateTemplateVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'versionNum', 'ifMatch'];
    const _validParams = [
      'templateId',
      'versionNum',
      'ifMatch',
      'name',
      'description',
      'group',
      'policyTemplateReferences',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'group': _params.group,
      'policy_template_references': _params.policyTemplateReferences,
    };

    const path = {
      'template_id': _params.templateId,
      'version_num': _params.versionNum,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}/versions/{version_num}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete template version.
   *
   * Delete a template version. You must remove all assignments for a template version before you can delete it.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template to delete.
   * @param {string} params.versionNum - version number in path.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public deleteTemplateVersion(
    params: IamAccessGroupsV2.DeleteTemplateVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'versionNum'];
    const _validParams = ['templateId', 'versionNum', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
      'version_num': _params.versionNum,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}/versions/{version_num}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Commit a template.
   *
   * Commit a template version. You must do this before you can assign a template version to child accounts. After you
   * commit the template version, you can't make any further changes.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template to commit.
   * @param {string} params.versionNum - version number in path.
   * @param {string} params.ifMatch - ETag value of the template version document.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public commitTemplate(
    params: IamAccessGroupsV2.CommitTemplateParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'versionNum', 'ifMatch'];
    const _validParams = ['templateId', 'versionNum', 'ifMatch', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
      'version_num': _params.versionNum,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'commitTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}/versions/{version_num}/commit',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'If-Match': _params.ifMatch,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get latest template version.
   *
   * Get the latest version of a template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template to get a specific version of.
   * @param {boolean} [params.verbose] - If `verbose=true`, IAM resource details are returned. If performance is a
   * concern, leave the `verbose` parameter off so that details are not retrieved.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>>}
   */
  public getLatestTemplateVersion(
    params: IamAccessGroupsV2.GetLatestTemplateVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateVersionResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'verbose', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'verbose': _params.verbose,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'getLatestTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete template.
   *
   * Endpoint to delete a template. All access assigned by that template is deleted from all of the accounts where the
   * template was assigned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - template id parameter.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public deleteTemplate(
    params: IamAccessGroupsV2.DeleteTemplateParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/group_templates/{template_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * templateAssignmentOperations
   ************************/

  /**
   * Create assignment.
   *
   * Assign a template version to accounts that have enabled enterprise-managed IAM. You can specify individual
   * accounts, or an entire account group to assign the template to all current and future child accounts of that
   * account group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - The unique identifier of the template to be assigned.
   * @param {string} params.templateVersion - The version number of the template to be assigned.
   * @param {string} params.targetType - The type of the entity to which the template should be assigned, e.g.
   * 'Account', 'AccountGroup', etc.
   * @param {string} params.target - The unique identifier of the entity to which the template should be assigned.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateAssignmentResponse>>}
   */
  public createAssignment(
    params: IamAccessGroupsV2.CreateAssignmentParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateAssignmentResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'templateVersion', 'targetType', 'target'];
    const _validParams = [
      'templateId',
      'templateVersion',
      'targetType',
      'target',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'template_id': _params.templateId,
      'template_version': _params.templateVersion,
      'target_type': _params.targetType,
      'target': _params.target,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/group_assignments',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List assignments.
   *
   * List template assignments from an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Enterprise account ID.
   * @param {string} [params.templateId] - Filter results by Template Id.
   * @param {string} [params.templateVersion] - Filter results by Template Version.
   * @param {string} [params.target] - Filter results by the assignment target.
   * @param {string} [params.status] - Filter results by the assignment status.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {number} [params.limit] - Return up to this limit of results where limit is between 0 and 100.
   * @param {number} [params.offset] - The offset of the first result item to be returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.ListTemplateAssignmentResponse>>}
   */
  public listAssignments(
    params: IamAccessGroupsV2.ListAssignmentsParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.ListTemplateAssignmentResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'templateId',
      'templateVersion',
      'target',
      'status',
      'transactionId',
      'limit',
      'offset',
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
      'target': _params.target,
      'status': _params.status,
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'listAssignments'
    );

    const parameters = {
      options: {
        url: '/v1/group_assignments',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get assignment.
   *
   * Get a specific template assignment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - Assignment ID.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {boolean} [params.verbose] - Returns resources access group template assigned, possible values `true` or
   * `false`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateAssignmentVerboseResponse>>}
   */
  public getAssignment(
    params: IamAccessGroupsV2.GetAssignmentParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateAssignmentVerboseResponse>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'transactionId', 'verbose', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'verbose': _params.verbose,
    };

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(IamAccessGroupsV2.DEFAULT_SERVICE_NAME, 'v2', 'getAssignment');

    const parameters = {
      options: {
        url: '/v1/group_assignments/{assignment_id}',
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
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update Assignment.
   *
   * Endpoint to update template assignment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - ID of the Assignment Record.
   * @param {string} params.ifMatch - Version of the Assignment to be updated. Specify the version that you retrieved
   * when reading the Assignment. This value helps identifying parallel usage of this API. Pass * to indicate to update
   * any version available. This might result in stale updates.
   * @param {string} params.templateVersion - Template version which shall be applied to the assignment.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateAssignmentVerboseResponse>>}
   */
  public updateAssignment(
    params: IamAccessGroupsV2.UpdateAssignmentParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateAssignmentVerboseResponse>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId', 'ifMatch', 'templateVersion'];
    const _validParams = ['assignmentId', 'ifMatch', 'templateVersion', 'headers'];
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
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'updateAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/group_assignments/{assignment_id}',
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

  /**
   * Delete assignment.
   *
   * Delete an access group template assignment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - assignment id path parameter.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>>}
   */
  public deleteAssignment(
    params: IamAccessGroupsV2.DeleteAssignmentParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'deleteAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/group_assignments/{assignment_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Transaction-Id': _params.transactionId,
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

namespace IamAccessGroupsV2 {
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

  /** Parameters for the `createAccessGroup` operation. */
  export interface CreateAccessGroupParams {
    /** Account ID of the API keys(s) to query. If a service IAM ID is specified in iam_id then account_id must
     *  match the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the
     *  account of the Authorization token.
     */
    accountId: string;
    /** Give the access group a unique name that doesn't conflict with an existing access group in the account. This
     *  field is case-insensitive and has a limit of 100 characters.
     */
    name: string;
    /** Assign an optional description for the access group. This field has a limit of 250 characters. */
    description?: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAccessGroups` operation. */
  export interface ListAccessGroupsParams {
    /** Account ID of the API keys(s) to query. If a service IAM ID is specified in iam_id then account_id must
     *  match the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the
     *  account of the Authorization token.
     */
    accountId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    /** Return groups for member ID (IBMid, service ID or trusted profile ID). */
    iamId?: string;
    /** Use search to filter access groups list by id, name or description.
     *  * `search=id:<ACCESS_GROUP_ID>` - To list access groups by id
     *  * `search=name:<ACCESS_GROUP_NAME>` - To list access groups by name
     *  * `search=description:<ACCESS_GROUP_DESC>` - To list access groups by description.
     */
    search?: string;
    /** Membership type need to be specified along with iam_id and must be either `static`, `dynamic` or `all`. If
     *  membership type is `static`, members explicitly added to the group will be shown. If membership type is
     *  `dynamic`, members accessing the access group at the moment via dynamic rules will be shown. If membership type
     *  is `all`, both static and dynamic members will be shown.
     */
    membershipType?: string;
    /** Return up to this limit of results where limit is between 0 and 100. */
    limit?: number;
    /** The offset of the first result item to be returned. */
    offset?: number;
    /** Sort the results by id, name, description, or is_federated flag. */
    sort?: string;
    /** If show_federated is true, each group listed will return an is_federated value that is set to true if rules
     *  exist for the group.
     */
    showFederated?: boolean;
    /** If hide_public_access is true, do not include the Public Access Group in the results. */
    hidePublicAccess?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccessGroup` operation. */
  export interface GetAccessGroupParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    /** If show_federated is true, the group will return an is_federated value that is set to true if rules exist
     *  for the group.
     */
    showFederated?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccessGroup` operation. */
  export interface UpdateAccessGroupParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** The current revision number of the group being updated. This can be found in the Create/Get access group
     *  response ETag header.
     */
    ifMatch: string;
    /** Give the access group a unique name that doesn't conflict with an existing access group in the account. This
     *  field is case-insensitive and has a limit of 100 characters.
     */
    name?: string;
    /** Assign an optional description for the access group. This field has a limit of 250 characters. */
    description?: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAccessGroup` operation. */
  export interface DeleteAccessGroupParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    /** If force is true, delete the group as well as its associated members and rules. */
    force?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `isMemberOfAccessGroup` operation. */
  export interface IsMemberOfAccessGroupParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** The IAM identifier. */
    iamId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addMembersToAccessGroup` operation. */
  export interface AddMembersToAccessGroupParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** An array of member objects to add to an access group. */
    members?: AddGroupMembersRequestMembersItem[];
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAccessGroupMembers` operation. */
  export interface ListAccessGroupMembersParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    /** Filters members by membership type. Filter by `static`, `dynamic` or `all`. `static` lists the members
     *  explicitly added to the access group, and `dynamic` lists the members that are part of the access group at that
     *  time via dynamic rules. `all` lists both static and dynamic members.
     */
    membershipType?: string;
    /** Return up to this limit of results where limit is between 0 and 100. */
    limit?: number;
    /** The offset of the first result item to be returned. */
    offset?: number;
    /** Filter the results by member type. */
    type?: string;
    /** Return user's email and name for each user ID or the name for each service ID or trusted profile. */
    verbose?: boolean;
    /** If verbose is true, sort the results by id, name, or email. */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeMemberFromAccessGroup` operation. */
  export interface RemoveMemberFromAccessGroupParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** The IAM identifier. */
    iamId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeMembersFromAccessGroup` operation. */
  export interface RemoveMembersFromAccessGroupParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** The `iam_id`s to remove from the access group. This field has a limit of 50 `iam_id`s. */
    members?: string[];
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeMemberFromAllAccessGroups` operation. */
  export interface RemoveMemberFromAllAccessGroupsParams {
    /** Account ID of the API keys(s) to query. If a service IAM ID is specified in iam_id then account_id must
     *  match the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the
     *  account of the Authorization token.
     */
    accountId: string;
    /** The IAM identifier. */
    iamId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addMemberToMultipleAccessGroups` operation. */
  export interface AddMemberToMultipleAccessGroupsParams {
    /** Account ID of the API keys(s) to query. If a service IAM ID is specified in iam_id then account_id must
     *  match the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the
     *  account of the Authorization token.
     */
    accountId: string;
    /** The IAM identifier. */
    iamId: string;
    /** The type of the member, must be either "user", "service" or "profile". */
    type?: string;
    /** The ids of the access groups a given member is to be added to. */
    groups?: string[];
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addAccessGroupRule` operation. */
  export interface AddAccessGroupRuleParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** Session duration in hours. Access group membership is revoked after this time period expires. Users must log
     *  back in to refresh their access group membership.
     */
    expiration: number;
    /** The URL of the identity provider (IdP). */
    realmName: string;
    /** A list of conditions that identities must satisfy to gain access group membership. */
    conditions: RuleConditions[];
    /** The name of the dynaimic rule. */
    name?: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAccessGroupRules` operation. */
  export interface ListAccessGroupRulesParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccessGroupRule` operation. */
  export interface GetAccessGroupRuleParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** The rule to get. */
    ruleId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceAccessGroupRule` operation. */
  export interface ReplaceAccessGroupRuleParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** The rule to get. */
    ruleId: string;
    /** The current revision number of the rule being updated. This can be found in the Get Rule response ETag
     *  header.
     */
    ifMatch: string;
    /** Session duration in hours. Access group membership is revoked after this time period expires. Users must log
     *  back in to refresh their access group membership.
     */
    expiration: number;
    /** The URL of the identity provider (IdP). */
    realmName: string;
    /** A list of conditions that identities must satisfy to gain access group membership. */
    conditions: RuleConditions[];
    /** The name of the dynaimic rule. */
    name?: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeAccessGroupRule` operation. */
  export interface RemoveAccessGroupRuleParams {
    /** The access group identifier. */
    accessGroupId: string;
    /** The rule to get. */
    ruleId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccountSettings` operation. */
  export interface GetAccountSettingsParams {
    /** Account ID of the API keys(s) to query. If a service IAM ID is specified in iam_id then account_id must
     *  match the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the
     *  account of the Authorization token.
     */
    accountId: string;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccountSettings` operation. */
  export interface UpdateAccountSettingsParams {
    /** Account ID of the API keys(s) to query. If a service IAM ID is specified in iam_id then account_id must
     *  match the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the
     *  account of the Authorization token.
     */
    accountId: string;
    /** This flag controls the public access feature within the account. It is set to true by default. Note: When
     *  this flag is set to false, all policies within the account attached to the Public Access group will be deleted.
     */
    publicAccessEnabled?: boolean;
    /** An optional transaction ID can be passed to your request, which can be useful for tracking calls through
     *  multiple services by using one identifier. The header key must be set to Transaction-Id and the value is
     *  anything that you choose. If no transaction ID is passed in, then a random ID is generated.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTemplate` operation. */
  export interface CreateTemplateParams {
    /** Give the access group template a unique name that doesn't conflict with an existing access group templates
     *  in the account.
     */
    name: string;
    /** Enterprise account id in which the template will be created. */
    accountId: string;
    /** Assign an optional description for the access group template. */
    description?: string;
    /** Access Group Component. */
    group?: AccessGroupRequest;
    /** Existing policy templates that you can reference to assign access in the Access group input component. */
    policyTemplateReferences?: PolicyTemplates[];
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTemplates` operation. */
  export interface ListTemplatesParams {
    /** Enterprise account ID. */
    accountId: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    /** Return up to this limit of results where limit is between 0 and 100. */
    limit?: number;
    /** The offset of the first result item to be returned. */
    offset?: number;
    /** If `verbose=true`, IAM resource details are returned. If performance is a concern, leave the `verbose`
     *  parameter off so that details are not retrieved.
     */
    verbose?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTemplateVersion` operation. */
  export interface CreateTemplateVersionParams {
    /** ID of the template that you want to create a new version of. */
    templateId: string;
    /** This is an optional field. If the field is included it will change the name value for all existing versions
     *  of the template..
     */
    name?: string;
    /** Assign an optional description for the access group template version. */
    description?: string;
    /** Access Group Component. */
    group?: AccessGroupRequest;
    /** The policy templates associated with the template version. */
    policyTemplateReferences?: PolicyTemplates[];
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTemplateVersions` operation. */
  export interface ListTemplateVersionsParams {
    /** ID of the template that you want to list all versions of. */
    templateId: string;
    /** Return up to this limit of results where limit is between 0 and 100. */
    limit?: number;
    /** The offset of the first result item to be returned. */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTemplateVersion` operation. */
  export interface GetTemplateVersionParams {
    /** ID of the template to get a specific version of. */
    templateId: string;
    /** Version number. */
    versionNum: string;
    /** If `verbose=true`, IAM resource details are returned. If performance is a concern, leave the `verbose`
     *  parameter off so that details are not retrieved.
     */
    verbose?: boolean;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTemplateVersion` operation. */
  export interface UpdateTemplateVersionParams {
    /** ID of the template. */
    templateId: string;
    /** Version number of the template. */
    versionNum: string;
    /** ETag value of the template version document. */
    ifMatch: string;
    /** This is an optional field. If the field is included it will change the name value for all existing versions
     *  of the template..
     */
    name?: string;
    /** Assign an optional description for the access group template version. */
    description?: string;
    /** Access Group Component. */
    group?: AccessGroupRequest;
    /** The policy templates associated with the template version. */
    policyTemplateReferences?: PolicyTemplates[];
    /** transaction id in header. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTemplateVersion` operation. */
  export interface DeleteTemplateVersionParams {
    /** ID of the template to delete. */
    templateId: string;
    /** version number in path. */
    versionNum: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `commitTemplate` operation. */
  export interface CommitTemplateParams {
    /** ID of the template to commit. */
    templateId: string;
    /** version number in path. */
    versionNum: string;
    /** ETag value of the template version document. */
    ifMatch: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLatestTemplateVersion` operation. */
  export interface GetLatestTemplateVersionParams {
    /** ID of the template to get a specific version of. */
    templateId: string;
    /** If `verbose=true`, IAM resource details are returned. If performance is a concern, leave the `verbose`
     *  parameter off so that details are not retrieved.
     */
    verbose?: boolean;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTemplate` operation. */
  export interface DeleteTemplateParams {
    /** template id parameter. */
    templateId: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createAssignment` operation. */
  export interface CreateAssignmentParams {
    /** The unique identifier of the template to be assigned. */
    templateId: string;
    /** The version number of the template to be assigned. */
    templateVersion: string;
    /** The type of the entity to which the template should be assigned, e.g. 'Account', 'AccountGroup', etc. */
    targetType: CreateAssignmentConstants.TargetType | string;
    /** The unique identifier of the entity to which the template should be assigned. */
    target: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createAssignment` operation. */
  export namespace CreateAssignmentConstants {
    /** The type of the entity to which the template should be assigned, e.g. 'Account', 'AccountGroup', etc. */
    export enum TargetType {
      ACCOUNT = 'Account',
      ACCOUNTGROUP = 'AccountGroup',
    }
  }

  /** Parameters for the `listAssignments` operation. */
  export interface ListAssignmentsParams {
    /** Enterprise account ID. */
    accountId: string;
    /** Filter results by Template Id. */
    templateId?: string;
    /** Filter results by Template Version. */
    templateVersion?: string;
    /** Filter results by the assignment target. */
    target?: string;
    /** Filter results by the assignment status. */
    status?: ListAssignmentsConstants.Status | string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    /** Return up to this limit of results where limit is between 0 and 100. */
    limit?: number;
    /** The offset of the first result item to be returned. */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAssignments` operation. */
  export namespace ListAssignmentsConstants {
    /** Filter results by the assignment status. */
    export enum Status {
      ACCEPTED = 'accepted',
      IN_PROGRESS = 'in_progress',
      SUCCEEDED = 'succeeded',
      FAILED = 'failed',
    }
  }

  /** Parameters for the `getAssignment` operation. */
  export interface GetAssignmentParams {
    /** Assignment ID. */
    assignmentId: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    /** Returns resources access group template assigned, possible values `true` or `false`. */
    verbose?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAssignment` operation. */
  export interface UpdateAssignmentParams {
    /** ID of the Assignment Record. */
    assignmentId: string;
    /** Version of the Assignment to be updated. Specify the version that you retrieved when reading the Assignment.
     *  This value helps identifying parallel usage of this API. Pass * to indicate to update any version available.
     *  This might result in stale updates.
     */
    ifMatch: string;
    /** Template version which shall be applied to the assignment. */
    templateVersion: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAssignment` operation. */
  export interface DeleteAssignmentParams {
    /** assignment id path parameter. */
    assignmentId: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Control whether or not access group administrators in child accounts can add access policies to the enterprise-managed access group in their account. */
  export interface AccessActionControls {
    /** Action control for adding access policies to an enterprise-managed access group in a child account. If an
     *  access group administrator in a child account adds a policy, they can always update or remove it.
     */
    add?: boolean;
  }

  /** Access Group Component. */
  export interface AccessGroupRequest {
    /** Give the access group a unique name that doesn't conflict with other templates access group name in the
     *  given account. This is shown in child accounts.
     */
    name: string;
    /** Access group description. This is shown in child accounts. */
    description?: string;
    /** Array of enterprise users to add to the template. All enterprise users that you add to the template must be
     *  invited to the child accounts where the template is assigned.
     */
    members?: Members;
    /** Assertions Input Component. */
    assertions?: Assertions;
    /** Access group action controls component. */
    action_controls?: GroupActionControls;
  }

  /** Access Group Component. */
  export interface AccessGroupResponse {
    /** Give the access group a unique name that doesn't conflict with other templates access group name in the
     *  given account. This is shown in child accounts.
     */
    name: string;
    /** Access group description. This is shown in child accounts. */
    description?: string;
    /** Array of enterprise users to add to the template. All enterprise users that you add to the template must be
     *  invited to the child accounts where the template is assigned.
     */
    members?: Members;
    /** Assertions Input Component. */
    assertions?: Assertions;
    /** Access group action controls component. */
    action_controls?: GroupActionControls;
  }

  /** The access groups settings for a specific account. */
  export interface AccountSettings {
    /** The account id of the settings being shown. */
    account_id?: string;
    /** The timestamp the settings were last edited at. */
    last_modified_at?: string;
    /** The `iam_id` of the entity that last modified the settings. */
    last_modified_by_id?: string;
    /** This flag controls the public access feature within the account. It is set to true by default. Note: When
     *  this flag is set to false, all policies within the account attached to the Public Access group will be deleted.
     */
    public_access_enabled?: boolean;
  }

  /** AddGroupMembersRequestMembersItem. */
  export interface AddGroupMembersRequestMembersItem {
    /** The IBMid, service ID or trusted profile ID of the member. */
    iam_id: string;
    /** The type of the member, must be either "user", "service" or "profile". */
    type: string;
  }

  /** The members added to an access group. */
  export interface AddGroupMembersResponse {
    /** The members added to an access group. */
    members?: AddGroupMembersResponseMembersItem[];
  }

  /** AddGroupMembersResponseMembersItem. */
  export interface AddGroupMembersResponseMembersItem {
    /** The IBMid or Service Id of the member. */
    iam_id?: string;
    /** The member type - either `user`, `service` or `profile`. */
    type?: string;
    /** The timestamp of when the membership was created. */
    created_at?: string;
    /** The `iam_id` of the entity that created the membership. */
    created_by_id?: string;
    /** The outcome of the operation on this `iam_id`. */
    status_code?: number;
    /** A transaction-id that can be used for debugging purposes. */
    trace?: string;
    /** A list of errors that occurred when trying to add members to a group. */
    errors?: Error[];
  }

  /** The response from the add member to multiple access groups request. */
  export interface AddMembershipMultipleGroupsResponse {
    /** The iam_id of a member. */
    iam_id?: string;
    /** The list of access groups a member was added to. */
    groups?: AddMembershipMultipleGroupsResponseGroupsItem[];
  }

  /** AddMembershipMultipleGroupsResponseGroupsItem. */
  export interface AddMembershipMultipleGroupsResponseGroupsItem {
    /** The access group that the member is to be added to. */
    access_group_id?: string;
    /** The outcome of the add membership operation on this `access_group_id`. */
    status_code?: number;
    /** A transaction-id that can be used for debugging purposes. */
    trace?: string;
    /** List of errors encountered when adding member to access group. */
    errors?: Error[];
  }

  /** Assertions Input Component. */
  export interface Assertions {
    /** Dynamic rules to automatically add federated users to access groups based on specific identity attributes. */
    rules?: AssertionsRule[];
    /** Control whether or not access group administrators in child accounts can add, remove, and update dynamic
     *  rules for the enterprise-managed access group in their account. The inner level RuleActionControls override
     *  these `remove` and `update` action controls.
     */
    action_controls?: AssertionsActionControls;
  }

  /** Control whether or not access group administrators in child accounts can add, remove, and update dynamic rules for the enterprise-managed access group in their account. The inner level RuleActionControls override these `remove` and `update` action controls. */
  export interface AssertionsActionControls {
    /** Action control for adding dynamic rules to an enterprise-managed access group. If an access group
     *  administrator in a child account adds a dynamic rule, they can always update or remove it.
     */
    add?: boolean;
    /** Action control for removing enterprise-managed dynamic rules in an enterprise-managed access group. */
    remove?: boolean;
    /** Action control for updating enterprise-managed dynamic rules in an enterprise-managed access group. */
    update?: boolean;
  }

  /** Rule Input component. */
  export interface AssertionsRule {
    /** Dynamic rule name. */
    name?: string;
    /** Session duration in hours. Access group membership is revoked after this time period expires. Users must log
     *  back in to refresh their access group membership.
     */
    expiration?: number;
    /** The identity provider (IdP) URL. */
    realm_name?: string;
    /** Conditions of membership. You can think of this as a key:value pair. */
    conditions?: Conditions[];
    /** Control whether or not access group administrators in child accounts can update and remove this dynamic rule
     *  in the enterprise-managed access group in their account.This overrides outer level AssertionsActionControls.
     */
    action_controls?: RuleActionControls;
  }

  /** Assignment Resource Access Group. */
  export interface AssignmentResourceAccessGroup {
    /** Assignment resource entry. */
    group: AssignmentResourceEntry;
    /** List of member resources of the group. */
    members: AssignmentResourceEntry[];
    /** List of rules associated with the group. */
    rules: AssignmentResourceEntry[];
  }

  /** Assignment resource entry. */
  export interface AssignmentResourceEntry {
    /** Assignment Resource Entry Id. */
    id: string;
    /** Optional name of the resource. */
    name?: string;
    /** Optional version of the resource. */
    version?: string;
    /** Resource in assignment resource entry. */
    resource: string;
    /** Error in assignment resource entry. */
    error: string;
    /** Optional operation on the resource. */
    operation?: string;
    /** Status of assignment resource entry. */
    status: string;
  }

  /** Condition Input component. */
  export interface Conditions {
    /** The key in the key:value pair. */
    claim?: string;
    /** Compares the claim and the value. */
    operator?: string;
    /** The value in the key:value pair. */
    value?: string;
  }

  /** The response from the delete member from access groups request. */
  export interface DeleteFromAllGroupsResponse {
    /** The `iam_id` of the member to removed from groups. */
    iam_id?: string;
    /** The groups the member was removed from. */
    groups?: DeleteFromAllGroupsResponseGroupsItem[];
  }

  /** DeleteFromAllGroupsResponseGroupsItem. */
  export interface DeleteFromAllGroupsResponseGroupsItem {
    /** The access group that the member is to be deleted from. */
    access_group_id?: string;
    /** The outcome of the delete operation on this `access_group_id`. */
    status_code?: number;
    /** A transaction-id that can be used for debugging purposes. */
    trace?: string;
    /** A list of errors that occurred when trying to remove a member from groups. */
    errors?: Error[];
  }

  /** The access group id and the members removed from it. */
  export interface DeleteGroupBulkMembersResponse {
    /** The access group id. */
    access_group_id?: string;
    /** The `iam_id`s removed from the access group. */
    members?: DeleteGroupBulkMembersResponseMembersItem[];
  }

  /** DeleteGroupBulkMembersResponseMembersItem. */
  export interface DeleteGroupBulkMembersResponseMembersItem {
    /** The `iam_id` to be deleted. */
    iam_id?: string;
    /** A transaction-id that can be used for debugging purposes. */
    trace?: string;
    /** The outcome of the delete membership operation on this `access_group_id`. */
    status_code?: number;
    /** A list of errors that occurred when trying to remove a member from groups. */
    errors?: Error[];
  }

  /** Error contains the code and message for an error returned to the user code is a string identifying the problem, examples "missing_field", "reserved_value" message is a string explaining the solution to the problem that was encountered. */
  export interface Error {
    /** A human-readable error code represented by a snake case string. */
    code?: string;
    /** A specific error message that details the issue or an action to take. */
    message?: string;
  }

  /** An IAM access group. */
  export interface Group {
    /** The group's access group ID. */
    id?: string;
    /** The group's name. */
    name?: string;
    /** The group's description - if defined. */
    description?: string;
    /** The account id where the group was created. */
    account_id?: string;
    /** The timestamp of when the group was created. */
    created_at?: string;
    /** The `iam_id` of the entity that created the group. */
    created_by_id?: string;
    /** The timestamp of when the group was last edited. */
    last_modified_at?: string;
    /** The `iam_id` of the entity that last modified the group name or description. */
    last_modified_by_id?: string;
    /** A url to the given group resource. */
    href?: string;
    /** This is set to true if rules exist for the group. */
    is_federated?: boolean;
  }

  /** Access group action controls component. */
  export interface GroupActionControls {
    /** Control whether or not access group administrators in child accounts can add access policies to the
     *  enterprise-managed access group in their account.
     */
    access?: AccessActionControls;
  }

  /** The members of a group. */
  export interface GroupMembersList {
    /** Limit on how many items can be returned. */
    limit: number;
    /** The offset of the first item returned in the result set. */
    offset: number;
    /** The total number of items that match the query. */
    total_count: number;
    /** A link object. */
    first?: HrefStruct;
    /** A link object. */
    previous?: HrefStruct;
    /** A link object. */
    next?: HrefStruct;
    /** A link object. */
    last?: HrefStruct;
    /** The members of an access group. */
    members?: ListGroupMembersResponseMember[];
  }

  /** Response output for template. */
  export interface GroupTemplate {
    /** The ID of the access group template. */
    id: string;
    /** The name of the access group template. */
    name: string;
    /** The description of the access group template. */
    description: string;
    /** The version of the access group template. */
    version: string;
    /** A boolean indicating whether the access group template is committed. You must commit a template before you
     *  can assign it to child accounts.
     */
    committed: boolean;
    /** Access Group Component. */
    group: AccessGroupResponse;
    /** References to policy templates assigned to the access group template. */
    policy_template_references: PolicyTemplates[];
    /** The URL of the access group template resource. */
    href: string;
    /** The date and time when the access group template was created. */
    created_at: string;
    /** The ID of the user who created the access group template. */
    created_by_id: string;
    /** The date and time when the access group template was last modified. */
    last_modified_at: string;
    /** The ID of the user who last modified the access group template. */
    last_modified_by_id: string;
  }

  /** The list of access groups returned as part of a response. */
  export interface GroupsList {
    /** Limit on how many items can be returned. */
    limit: number;
    /** The offset of the first item returned in the result set. */
    offset: number;
    /** The total number of items that match the query. */
    total_count: number;
    /** A link object. */
    first?: HrefStruct;
    /** A link object. */
    previous?: HrefStruct;
    /** A link object. */
    next?: HrefStruct;
    /** A link object. */
    last?: HrefStruct;
    /** An array of access groups. */
    groups?: Group[];
  }

  /** A link object. */
  export interface HrefStruct {
    /** A string containing the link’s URL. */
    href?: string;
  }

  /** A single member of an access group in a list. */
  export interface ListGroupMembersResponseMember {
    /** The IBMid or Service Id of the member. */
    iam_id?: string;
    /** The member type - either `user`, `service` or `profile`. */
    type?: string;
    /** The membership type - either `static` or `dynamic`. */
    membership_type?: string;
    /** The user's or service id's name. */
    name?: string;
    /** If the member type is user, this is the user's email. */
    email?: string;
    /** If the member type is service, this is the service id's description. */
    description?: string;
    /** A url to the given member resource. */
    href?: string;
    /** The timestamp the membership was created at. */
    created_at?: string;
    /** The `iam_id` of the entity that created the membership. */
    created_by_id?: string;
  }

  /** Response object containing a list of template assignments. */
  export interface ListTemplateAssignmentResponse {
    /** Maximum number of items returned in the response. */
    limit: number;
    /** Index of the first item returned in the response. */
    offset: number;
    /** Total number of items matching the query. */
    total_count: number;
    /** A link object. */
    first: HrefStruct;
    /** A link object. */
    last: HrefStruct;
    /** List of template assignments. */
    assignments: TemplateAssignmentResponse[];
  }

  /** Response object for a single access group template version. */
  export interface ListTemplateVersionResponse {
    /** The name of the template. */
    name: string;
    /** The description of the template. */
    description: string;
    /** The ID of the account associated with the template. */
    account_id: string;
    /** The version number of the template. */
    version: string;
    /** A boolean indicating whether the template is committed or not. */
    committed: boolean;
    /** Access Group Component. */
    group: AccessGroupResponse;
    /** A list of policy templates associated with the template. */
    policy_template_references: PolicyTemplates[];
    /** The URL to the template resource. */
    href: string;
    /** The date and time the template was created. */
    created_at: string;
    /** The ID of the user who created the template. */
    created_by_id: string;
    /** The date and time the template was last modified. */
    last_modified_at: string;
    /** The ID of the user who last modified the template. */
    last_modified_by_id: string;
  }

  /** Response object for listing template versions. */
  export interface ListTemplateVersionsResponse {
    /** The maximum number of IAM resources to return. */
    limit: number;
    /** The offset of the first IAM resource in the list. */
    offset: number;
    /** The total number of IAM resources in the list. */
    total_count: number;
    /** A link object. */
    first: HrefStruct;
    /** A link object. */
    previous?: HrefStruct;
    /** A link object. */
    next?: HrefStruct;
    /** A link object. */
    last: HrefStruct;
    /** A list of access group template versions. */
    group_template_versions: ListTemplateVersionResponse[];
  }

  /** Response object for listing templates. */
  export interface ListTemplatesResponse {
    /** The maximum number of IAM resources to return. */
    limit: number;
    /** The offset of the first IAM resource in the list. */
    offset: number;
    /** The total number of IAM resources in the list. */
    total_count: number;
    /** A link object. */
    first: HrefStruct;
    /** A link object. */
    previous?: HrefStruct;
    /** A link object. */
    next?: HrefStruct;
    /** A link object. */
    last: HrefStruct;
    /** A list of access group templates. */
    group_templates: GroupTemplate[];
  }

  /** Array of enterprise users to add to the template. All enterprise users that you add to the template must be invited to the child accounts where the template is assigned. */
  export interface Members {
    /** Array of enterprise users to add to the template. All enterprise users that you add to the template must be
     *  invited to the child accounts where the template is assigned.
     */
    users?: string[];
    /** Array of service IDs to add to the template. */
    services?: string[];
    /** Control whether or not access group administrators in child accounts can add and remove members from the
     *  enterprise-managed access group in their account.
     */
    action_controls?: MembersActionControls;
  }

  /** Control whether or not access group administrators in child accounts can add and remove members from the enterprise-managed access group in their account. */
  export interface MembersActionControls {
    /** Action control for adding child account members to an enterprise-managed access group. If an access group
     *  administrator in a child account adds a member, they can always remove them.
     */
    add?: boolean;
    /** Action control for removing enterprise-managed members from an enterprise-managed access group. */
    remove?: boolean;
  }

  /** Policy Templates Input component. */
  export interface PolicyTemplates {
    /** Policy template ID. */
    id?: string;
    /** Policy template version. */
    version?: string;
  }

  /** Object containing details of a resource list with target account ID. */
  export interface ResourceListWithTargetAccountID {
    /** The ID of the entity that the resource list applies to. */
    target?: string;
    /** Assignment Resource Access Group. */
    group?: AssignmentResourceAccessGroup;
    /** List of policy template references for the resource list. */
    policy_template_references?: AssignmentResourceEntry[];
  }

  /** A dynamic rule of an access group. */
  export interface Rule {
    /** The rule id. */
    id?: string;
    /** The name of the rule. */
    name?: string;
    /** Session duration in hours. Access group membership is revoked after this time period expires. Users must log
     *  back in to refresh their access group membership. Must be between 1 and 24.
     */
    expiration?: number;
    /** The URL of the identity provider. */
    realm_name?: string;
    /** The group id that the dynamic rule is assigned to. */
    access_group_id?: string;
    /** The account id that the group is in. */
    account_id?: string;
    /** A list of conditions that identities must satisfy to gain access group membership. */
    conditions?: RuleConditions[];
    /** The timestamp for when the rule was created. */
    created_at?: string;
    /** The `iam_id` of the entity that created the dynamic rule. */
    created_by_id?: string;
    /** The timestamp for when the dynamic rule was last edited. */
    last_modified_at?: string;
    /** The IAM id that last modified the rule. */
    last_modified_by_id?: string;
  }

  /** Control whether or not access group administrators in child accounts can update and remove this dynamic rule in the enterprise-managed access group in their account.This overrides outer level AssertionsActionControls. */
  export interface RuleActionControls {
    /** Action control for removing this enterprise-managed dynamic rule. */
    remove?: boolean;
    /** Action control for updating this enterprise-managed dynamic rule. */
    update?: boolean;
  }

  /** The conditions of a dynamic rule. */
  export interface RuleConditions {
    /** The claim to evaluate against. This will be found in the `ext` claims of a user's login request. */
    claim: string;
    /** The operation to perform on the claim. */
    operator: string;
    /** The stringified JSON value that the claim is compared to using the operator. */
    value: string;
  }

  /** A list of dynamic rules attached to the access group. */
  export interface RulesList {
    /** A list of dynamic rules. */
    rules?: Rule[];
  }

  /** Response object containing the details of a template assignment. */
  export interface TemplateAssignmentResponse {
    /** The ID of the assignment. */
    id: string;
    /** The ID of the account that the assignment belongs to. */
    account_id: string;
    /** The ID of the template that the assignment is based on. */
    template_id: string;
    /** The version of the template that the assignment is based on. */
    template_version: string;
    /** The type of the entity that the assignment applies to. */
    target_type: string;
    /** The ID of the entity that the assignment applies to. */
    target: string;
    /** The operation that the assignment applies to (e.g. 'assign', 'update', 'remove'). */
    operation: string;
    /** The status of the assignment (e.g. 'accepted', 'in_progress', 'succeeded', 'failed', 'superseded'). */
    status: string;
    /** The URL of the assignment resource. */
    href: string;
    /** The date and time when the assignment was created. */
    created_at: string;
    /** The user or system that created the assignment. */
    created_by_id: string;
    /** The date and time when the assignment was last updated. */
    last_modified_at: string;
    /** The user or system that last updated the assignment. */
    last_modified_by_id: string;
  }

  /** Response object containing the details of a template assignment. */
  export interface TemplateAssignmentVerboseResponse {
    /** The ID of the assignment. */
    id: string;
    /** The ID of the account that the assignment belongs to. */
    account_id: string;
    /** The ID of the template that the assignment is based on. */
    template_id: string;
    /** The version of the template that the assignment is based on. */
    template_version: string;
    /** The type of the entity that the assignment applies to. */
    target_type: string;
    /** The ID of the entity that the assignment applies to. */
    target: string;
    /** The operation that the assignment applies to (e.g. 'create', 'update', 'delete'). */
    operation: string;
    /** The status of the assignment (e.g. 'pending', 'success', 'failure'). */
    status: string;
    /** List of resources for the assignment. */
    resources?: ResourceListWithTargetAccountID[];
    /** The URL of the assignment resource. */
    href: string;
    /** The date and time when the assignment was created. */
    created_at: string;
    /** The user or system that created the assignment. */
    created_by_id: string;
    /** The date and time when the assignment was last updated. */
    last_modified_at: string;
    /** The user or system that last updated the assignment. */
    last_modified_by_id: string;
  }

  /** Response output for template. */
  export interface TemplateResponse {
    /** The ID of the access group template. */
    id: string;
    /** The name of the access group template. */
    name: string;
    /** The description of the access group template. */
    description: string;
    /** The ID of the account to which the access group template is assigned. */
    account_id: string;
    /** The version of the access group template. */
    version: string;
    /** A boolean indicating whether the access group template is committed. You must commit a template before you
     *  can assign it to child accounts.
     */
    committed: boolean;
    /** Access Group Component. */
    group: AccessGroupResponse;
    /** References to policy templates assigned to the access group template. */
    policy_template_references: PolicyTemplates[];
    /** The URL of the access group template resource. */
    href: string;
    /** The date and time when the access group template was created. */
    created_at: string;
    /** The ID of the user who created the access group template. */
    created_by_id: string;
    /** The date and time when the access group template was last modified. */
    last_modified_at: string;
    /** The ID of the user who last modified the access group template. */
    last_modified_by_id: string;
  }

  /** Response output for template. */
  export interface TemplateVersionResponse {
    /** The ID of the access group template. */
    id: string;
    /** The name of the access group template. */
    name: string;
    /** The description of the access group template. */
    description: string;
    /** The ID of the account to which the access group template is assigned. */
    account_id: string;
    /** The version of the access group template. */
    version: string;
    /** A boolean indicating whether the access group template is committed. You must commit a template before you
     *  can assign it to child accounts.
     */
    committed: boolean;
    /** Access Group Component. */
    group: AccessGroupResponse;
    /** References to policy templates assigned to the access group template. */
    policy_template_references: PolicyTemplates[];
    /** The URL of the access group template resource. */
    href: string;
    /** The date and time when the access group template was created. */
    created_at: string;
    /** The ID of the user who created the access group template. */
    created_by_id: string;
    /** The date and time when the access group template was last modified. */
    last_modified_at: string;
    /** The ID of the user who last modified the access group template. */
    last_modified_by_id: string;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * AccessGroupsPager can be used to simplify the use of listAccessGroups().
   */
  export class AccessGroupsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamAccessGroupsV2;

    protected params: IamAccessGroupsV2.ListAccessGroupsParams;

    /**
     * Construct a AccessGroupsPager object.
     *
     * @param {IamAccessGroupsV2}  client - The service client instance used to invoke listAccessGroups()
     * @param {Object} params - The parameters to be passed to listAccessGroups()
     * @constructor
     * @returns {AccessGroupsPager}
     */
    constructor(client: IamAccessGroupsV2, params: IamAccessGroupsV2.ListAccessGroupsParams) {
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
     * Returns the next page of results by invoking listAccessGroups().
     * @returns {Promise<IamAccessGroupsV2.Group[]>}
     */
    public async getNext(): Promise<IamAccessGroupsV2.Group[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listAccessGroups(this.params);
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
      return result.groups;
    }

    /**
     * Returns all results by invoking listAccessGroups() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamAccessGroupsV2.Group[]>}
     */
    public async getAll(): Promise<IamAccessGroupsV2.Group[]> {
      const results: Group[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * AccessGroupMembersPager can be used to simplify the use of listAccessGroupMembers().
   */
  export class AccessGroupMembersPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamAccessGroupsV2;

    protected params: IamAccessGroupsV2.ListAccessGroupMembersParams;

    /**
     * Construct a AccessGroupMembersPager object.
     *
     * @param {IamAccessGroupsV2}  client - The service client instance used to invoke listAccessGroupMembers()
     * @param {Object} params - The parameters to be passed to listAccessGroupMembers()
     * @constructor
     * @returns {AccessGroupMembersPager}
     */
    constructor(client: IamAccessGroupsV2, params: IamAccessGroupsV2.ListAccessGroupMembersParams) {
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
     * Returns the next page of results by invoking listAccessGroupMembers().
     * @returns {Promise<IamAccessGroupsV2.ListGroupMembersResponseMember[]>}
     */
    public async getNext(): Promise<IamAccessGroupsV2.ListGroupMembersResponseMember[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listAccessGroupMembers(this.params);
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
      return result.members;
    }

    /**
     * Returns all results by invoking listAccessGroupMembers() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamAccessGroupsV2.ListGroupMembersResponseMember[]>}
     */
    public async getAll(): Promise<IamAccessGroupsV2.ListGroupMembersResponseMember[]> {
      const results: ListGroupMembersResponseMember[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * TemplatesPager can be used to simplify the use of listTemplates().
   */
  export class TemplatesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamAccessGroupsV2;

    protected params: IamAccessGroupsV2.ListTemplatesParams;

    /**
     * Construct a TemplatesPager object.
     *
     * @param {IamAccessGroupsV2}  client - The service client instance used to invoke listTemplates()
     * @param {Object} params - The parameters to be passed to listTemplates()
     * @constructor
     * @returns {TemplatesPager}
     */
    constructor(client: IamAccessGroupsV2, params: IamAccessGroupsV2.ListTemplatesParams) {
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
     * Returns the next page of results by invoking listTemplates().
     * @returns {Promise<IamAccessGroupsV2.GroupTemplate[]>}
     */
    public async getNext(): Promise<IamAccessGroupsV2.GroupTemplate[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listTemplates(this.params);
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
      return result.group_templates;
    }

    /**
     * Returns all results by invoking listTemplates() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamAccessGroupsV2.GroupTemplate[]>}
     */
    public async getAll(): Promise<IamAccessGroupsV2.GroupTemplate[]> {
      const results: GroupTemplate[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * TemplateVersionsPager can be used to simplify the use of listTemplateVersions().
   */
  export class TemplateVersionsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamAccessGroupsV2;

    protected params: IamAccessGroupsV2.ListTemplateVersionsParams;

    /**
     * Construct a TemplateVersionsPager object.
     *
     * @param {IamAccessGroupsV2}  client - The service client instance used to invoke listTemplateVersions()
     * @param {Object} params - The parameters to be passed to listTemplateVersions()
     * @constructor
     * @returns {TemplateVersionsPager}
     */
    constructor(client: IamAccessGroupsV2, params: IamAccessGroupsV2.ListTemplateVersionsParams) {
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
     * Returns the next page of results by invoking listTemplateVersions().
     * @returns {Promise<IamAccessGroupsV2.ListTemplateVersionResponse[]>}
     */
    public async getNext(): Promise<IamAccessGroupsV2.ListTemplateVersionResponse[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listTemplateVersions(this.params);
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
      return result.group_template_versions;
    }

    /**
     * Returns all results by invoking listTemplateVersions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamAccessGroupsV2.ListTemplateVersionResponse[]>}
     */
    public async getAll(): Promise<IamAccessGroupsV2.ListTemplateVersionResponse[]> {
      const results: ListTemplateVersionResponse[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = IamAccessGroupsV2;
