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
 * IBM OpenAPI SDK Code Generator Version: 3.70.0-7df966bf-20230419-195904
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
   * @param {string} params.name - Assign the specified name to the access group. This field is case-insensitive and has
   * a limit of 100 characters. The group name has to be unique within an account.
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
   * @param {string} [params.name] - Assign the specified name to the access group. This field is case-insensitive and
   * has a limit of 100 characters. The group name has to be unique within an account.
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
   * @param {string} [params.membershipType] - Filters members by membership type. Membership type can be either
   * `static`, `dynamic` or `all`. `static` lists those members explicitly added to the access group, `dynamic` lists
   * those members part of access group via dynamic rules at the moment. `all` lists both static and dynamic members.
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
   * @param {number} params.expiration - The number of hours that the rule lives for.
   * @param {string} params.realmName - The url of the identity provider.
   * @param {RuleConditions[]} params.conditions - A list of conditions the rule must satisfy.
   * @param {string} [params.name] - The name of the rule.
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
   * @param {number} params.expiration - The number of hours that the rule lives for.
   * @param {string} params.realmName - The url of the identity provider.
   * @param {RuleConditions[]} params.conditions - A list of conditions the rule must satisfy.
   * @param {string} [params.name] - The name of the rule.
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
   * templateOperations
   ************************/

  /**
   * Create Template.
   *
   * Endpoint to create an access groups template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - create template input name.
   * @param {string} params.description - create template input description.
   * @param {string} params.accountId - create template input account id.
   * @param {AccessGroupInput} [params.accessGroup] - Access Group Input Component.
   * @param {PolicyTemplatesInput[]} [params.policyTemplateReferences] - policy template references.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>>}
   */
  public createTemplate(
    params: IamAccessGroupsV2.CreateTemplateParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'description', 'accountId'];
    const _validParams = [
      'name',
      'description',
      'accountId',
      'accessGroup',
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
      'account_id': _params.accountId,
      'access_group': _params.accessGroup,
      'policy_template_references': _params.policyTemplateReferences,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'createTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/groups_templates',
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
   * List Templates.
   *
   * Endpoint to list templates within a given account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - query parameter account id.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {number} [params.limit] - limit parameter.
   * @param {number} [params.offset] - offset parameter.
   * @param {boolean} [params.verbose] - query parameter verbose.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.ListTemplatesResponse>>}
   */
  public listTemplate(
    params: IamAccessGroupsV2.ListTemplateParams
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

    const sdkHeaders = getSdkHeaders(IamAccessGroupsV2.DEFAULT_SERVICE_NAME, 'v2', 'listTemplate');

    const parameters = {
      options: {
        url: '/v1/groups_templates',
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
   * Create Template Version.
   *
   * Endpoint to create a new template version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - parameter template id.
   * @param {string} [params.name] - The name of the template version.
   * @param {string} [params.description] - The description of the template version.
   * @param {AccessGroupInput} [params.accessGroup] - Access Group Input Component.
   * @param {PolicyTemplatesInput[]} [params.policyTemplateReferences] - The policy templates associated with the
   * template version.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>>}
   */
  public createTemplateVersion(
    params: IamAccessGroupsV2.CreateTemplateVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = [
      'templateId',
      'name',
      'description',
      'accessGroup',
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
      'access_group': _params.accessGroup,
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
        url: '/v1/groups_templates/{template_id}/versions',
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
   * List Template Versions.
   *
   * Endpoint to list all the tempalate versions of a template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - template id parameter.
   * @param {number} [params.limit] - limit parameter.
   * @param {number} [params.offset] - offset parameter.
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
        url: '/v1/groups_templates/{template_id}/versions',
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
   * Get Template - Specific Version.
   *
   * Endpoint to get specific template version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - template id parameter.
   * @param {string} params.versionNum - path parameter verison number.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>>}
   */
  public getTemplateSpecificVersion(
    params: IamAccessGroupsV2.GetTemplateSpecificVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>> {
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
      'getTemplateSpecificVersion'
    );

    const parameters = {
      options: {
        url: '/v1/groups_templates/{template_id}/versions/{version_num}',
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
   * Update Template Version.
   *
   * Endpoint to update a template version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template.
   * @param {string} params.versionNum - Version number of the template.
   * @param {string} params.ifMatch - ETag value of the template version document.
   * @param {string} [params.id] - The ID of the access group template.
   * @param {string} [params.name] - The name of the access group template.
   * @param {string} [params.description] - The description of the access group template.
   * @param {string} [params.accountId] - The ID of the account to which the access group template is assigned.
   * @param {string} [params.version] - The version of the access group template.
   * @param {boolean} [params.committed] - A boolean indicating whether the access group template is committed.
   * @param {AccessGroupInput} [params.accessGroup] - Access Group Input Component.
   * @param {PolicyTemplatesInput[]} [params.policyTemplateReferences] - References to policy templates assigned to the
   * access group template.
   * @param {string} [params.href] - The URL of the access group template resource.
   * @param {string} [params.createdAt] - The date and time when the access group template was created.
   * @param {string} [params.createdById] - The ID of the user who created the access group template.
   * @param {string} [params.lastModifiedAt] - The date and time when the access group template was last modified.
   * @param {string} [params.lastModifiedById] - The ID of the user who last modified the access group template.
   * @param {string} [params.transactionId] - transaction id in header.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>>}
   */
  public replaceTemplateVersion(
    params: IamAccessGroupsV2.ReplaceTemplateVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'versionNum', 'ifMatch'];
    const _validParams = [
      'templateId',
      'versionNum',
      'ifMatch',
      'id',
      'name',
      'description',
      'accountId',
      'version',
      'committed',
      'accessGroup',
      'policyTemplateReferences',
      'href',
      'createdAt',
      'createdById',
      'lastModifiedAt',
      'lastModifiedById',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      'name': _params.name,
      'description': _params.description,
      'account_id': _params.accountId,
      'version': _params.version,
      'committed': _params.committed,
      'access_group': _params.accessGroup,
      'policy_template_references': _params.policyTemplateReferences,
      'href': _params.href,
      'created_at': _params.createdAt,
      'created_by_id': _params.createdById,
      'last_modified_at': _params.lastModifiedAt,
      'last_modified_by_id': _params.lastModifiedById,
    };

    const path = {
      'template_id': _params.templateId,
      'version_num': _params.versionNum,
    };

    const sdkHeaders = getSdkHeaders(
      IamAccessGroupsV2.DEFAULT_SERVICE_NAME,
      'v2',
      'replaceTemplateVersion'
    );

    const parameters = {
      options: {
        url: '/v1/groups_templates/{template_id}/versions/{version_num}',
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
   * Delete Template Version.
   *
   * Endpoint to delete a template version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - template id parameter.
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
        url: '/v1/groups_templates/{template_id}/versions/{version_num}',
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
   * Commit Template.
   *
   * Endpoint to commit a template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - template id parameter.
   * @param {string} params.versionNum - version number in path.
   * @param {string} params.ifMatch - ETag value of the template version document.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>>}
   */
  public commitTemplate(
    params: IamAccessGroupsV2.CommitTemplateParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>> {
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
        url: '/v1/groups_templates/{template_id}/versions/{version_num}/commit',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
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
   * Get Template - Latest Version.
   *
   * Endpoint to Get the latest Template Version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - template id parameter.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>>}
   */
  public getTemplateLatestVersion(
    params: IamAccessGroupsV2.GetTemplateLatestVersionParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.CreateTemplateResponse>> {
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
      'getTemplateLatestVersion'
    );

    const parameters = {
      options: {
        url: '/v1/groups_templates/{template_id}',
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
   * Delete Template.
   *
   * Endpoint to delete a template.
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
        url: '/v1/groups_templates/{template_id}',
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
   * Assign Template To Account.
   *
   * Endpoint to assign a template to an account/account group.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - The unique identifier of the template to be assigned.
   * @param {string} params.templateVersion - The version number of the template to be assigned.
   * @param {string} params.targetType - The type of the entity to which the template should be assigned, e.g.
   * 'account', 'accountGroup', etc.
   * @param {string} params.target - The unique identifier of the entity to which the template should be assigned.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateCreateAssignmentResponse>>}
   */
  public createAssignTemplate(
    params: IamAccessGroupsV2.CreateAssignTemplateParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplateCreateAssignmentResponse>> {
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
      'createAssignTemplate'
    );

    const parameters = {
      options: {
        url: '/v1/groups_assignment',
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
   * List Assignment.
   *
   * Endpoint to list template assignments.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - query parameter account id.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplatesListAssignmentResponse>>}
   */
  public listAssignment(
    params?: IamAccessGroupsV2.ListAssignmentParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.TemplatesListAssignmentResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'headers'];
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
      'listAssignment'
    );

    const parameters = {
      options: {
        url: '/v1/groups_assignment',
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
   * Get Assignment.
   *
   * endpoint to get a specific template assignment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - assignment id parameter.
   * @param {string} [params.transactionId] - An optional transaction id for the request.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.GetTemplateAssignmentResponse>>}
   */
  public getAssignment(
    params: IamAccessGroupsV2.GetAssignmentParams
  ): Promise<IamAccessGroupsV2.Response<IamAccessGroupsV2.GetTemplateAssignmentResponse>> {
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

    const sdkHeaders = getSdkHeaders(IamAccessGroupsV2.DEFAULT_SERVICE_NAME, 'v2', 'getAssignment');

    const parameters = {
      options: {
        url: '/v1/groups_assignment/{assignment_id}',
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
   * Remove Assignment.
   *
   * Endpoint to remove template assignment.
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
        url: '/v1/groups_assignment/{assignment_id}',
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
    /** Assign the specified name to the access group. This field is case-insensitive and has a limit of 100
     *  characters. The group name has to be unique within an account.
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
    /** Assign the specified name to the access group. This field is case-insensitive and has a limit of 100
     *  characters. The group name has to be unique within an account.
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
    /** Filters members by membership type. Membership type can be either `static`, `dynamic` or `all`. `static`
     *  lists those members explicitly added to the access group, `dynamic` lists those members part of access group via
     *  dynamic rules at the moment. `all` lists both static and dynamic members.
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
    /** The number of hours that the rule lives for. */
    expiration: number;
    /** The url of the identity provider. */
    realmName: string;
    /** A list of conditions the rule must satisfy. */
    conditions: RuleConditions[];
    /** The name of the rule. */
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
    /** The number of hours that the rule lives for. */
    expiration: number;
    /** The url of the identity provider. */
    realmName: string;
    /** A list of conditions the rule must satisfy. */
    conditions: RuleConditions[];
    /** The name of the rule. */
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

  /** Parameters for the `createTemplate` operation. */
  export interface CreateTemplateParams {
    /** create template input name. */
    name: string;
    /** create template input description. */
    description: string;
    /** create template input account id. */
    accountId: string;
    /** Access Group Input Component. */
    accessGroup?: AccessGroupInput;
    /** policy template references. */
    policyTemplateReferences?: PolicyTemplatesInput[];
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTemplate` operation. */
  export interface ListTemplateParams {
    /** query parameter account id. */
    accountId: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    /** limit parameter. */
    limit?: number;
    /** offset parameter. */
    offset?: number;
    /** query parameter verbose. */
    verbose?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createTemplateVersion` operation. */
  export interface CreateTemplateVersionParams {
    /** parameter template id. */
    templateId: string;
    /** The name of the template version. */
    name?: string;
    /** The description of the template version. */
    description?: string;
    /** Access Group Input Component. */
    accessGroup?: AccessGroupInput;
    /** The policy templates associated with the template version. */
    policyTemplateReferences?: PolicyTemplatesInput[];
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTemplateVersions` operation. */
  export interface ListTemplateVersionsParams {
    /** template id parameter. */
    templateId: string;
    /** limit parameter. */
    limit?: number;
    /** offset parameter. */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTemplateSpecificVersion` operation. */
  export interface GetTemplateSpecificVersionParams {
    /** template id parameter. */
    templateId: string;
    /** path parameter verison number. */
    versionNum: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceTemplateVersion` operation. */
  export interface ReplaceTemplateVersionParams {
    /** ID of the template. */
    templateId: string;
    /** Version number of the template. */
    versionNum: string;
    /** ETag value of the template version document. */
    ifMatch: string;
    /** The ID of the access group template. */
    id?: string;
    /** The name of the access group template. */
    name?: string;
    /** The description of the access group template. */
    description?: string;
    /** The ID of the account to which the access group template is assigned. */
    accountId?: string;
    /** The version of the access group template. */
    version?: string;
    /** A boolean indicating whether the access group template is committed. */
    committed?: boolean;
    /** Access Group Input Component. */
    accessGroup?: AccessGroupInput;
    /** References to policy templates assigned to the access group template. */
    policyTemplateReferences?: PolicyTemplatesInput[];
    /** The URL of the access group template resource. */
    href?: string;
    /** The date and time when the access group template was created. */
    createdAt?: string;
    /** The ID of the user who created the access group template. */
    createdById?: string;
    /** The date and time when the access group template was last modified. */
    lastModifiedAt?: string;
    /** The ID of the user who last modified the access group template. */
    lastModifiedById?: string;
    /** transaction id in header. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTemplateVersion` operation. */
  export interface DeleteTemplateVersionParams {
    /** template id parameter. */
    templateId: string;
    /** version number in path. */
    versionNum: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `commitTemplate` operation. */
  export interface CommitTemplateParams {
    /** template id parameter. */
    templateId: string;
    /** version number in path. */
    versionNum: string;
    /** ETag value of the template version document. */
    ifMatch: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getTemplateLatestVersion` operation. */
  export interface GetTemplateLatestVersionParams {
    /** template id parameter. */
    templateId: string;
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

  /** Parameters for the `createAssignTemplate` operation. */
  export interface CreateAssignTemplateParams {
    /** The unique identifier of the template to be assigned. */
    templateId: string;
    /** The version number of the template to be assigned. */
    templateVersion: string;
    /** The type of the entity to which the template should be assigned, e.g. 'account', 'accountGroup', etc. */
    targetType: string;
    /** The unique identifier of the entity to which the template should be assigned. */
    target: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAssignment` operation. */
  export interface ListAssignmentParams {
    /** query parameter account id. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAssignment` operation. */
  export interface GetAssignmentParams {
    /** assignment id parameter. */
    assignmentId: string;
    /** An optional transaction id for the request. */
    transactionId?: string;
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

  /*************************
   * model interfaces
   ************************/

  /** Access Action Controls component. */
  export interface AccessActionControls {
    /** access action controls add. */
    add?: boolean;
  }

  /** Access Group Action Controls component. */
  export interface AccessGroupActionControls {
    /** Access Action Controls component. */
    access?: AccessActionControls;
  }

  /** Access Group Input Component. */
  export interface AccessGroupInput {
    /** access group input name. */
    name: string;
    /** access group input description. */
    description?: string;
    /** Members Input component. */
    members?: MembersInput;
    /** Assertions Input Component. */
    assertions?: AssertionsInput;
    /** Access Group Action Controls component. */
    action_controls?: AccessGroupActionControls;
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
    /** The timestamp the membership was created at. */
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

  /** Assertions Action Controls component. */
  export interface AssertionsActionControls {
    /** assertions action controls add. */
    add?: boolean;
    /** assertions action controls remove. */
    remove?: boolean;
    /** assertions action controls update. */
    update?: boolean;
  }

  /** Assertions Input Component. */
  export interface AssertionsInput {
    /** assertions input rules. */
    rules?: RuleInput[];
    /** Assertions Action Controls component. */
    action_controls?: AssertionsActionControls;
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
  export interface ConditionInput {
    /** condition input claim. */
    claim?: string;
    /** condition input operator. */
    operator?: string;
    /** condition input value. */
    value?: string;
  }

  /** Successful response output for create template. */
  export interface CreateTemplateResponse {
    /** The ID of the access group template. */
    id?: string;
    /** The name of the access group template. */
    name?: string;
    /** The description of the access group template. */
    description?: string;
    /** The ID of the account to which the access group template is assigned. */
    account_id?: string;
    /** The version of the access group template. */
    version?: string;
    /** A boolean indicating whether the access group template is committed. */
    committed?: boolean;
    /** Access Group Input Component. */
    access_group?: AccessGroupInput;
    /** References to policy templates assigned to the access group template. */
    policy_template_references?: PolicyTemplatesInput[];
    /** The URL of the access group template resource. */
    href?: string;
    /** The date and time when the access group template was created. */
    created_at?: string;
    /** The ID of the user who created the access group template. */
    created_by_id?: string;
    /** The date and time when the access group template was last modified. */
    last_modified_at?: string;
    /** The ID of the user who last modified the access group template. */
    last_modified_by_id?: string;
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

  /** Response object containing the details of a template assignment. */
  export interface GetTemplateAssignmentResponse {
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
    resources: ResourceListWithTargetAccountID[];
    /** The URL of the assignment resource. */
    href: string;
    /** The date and time when the assignment was created. */
    created_at: string;
    /** The user or system that created the assignment. */
    created_by: string;
    /** The date and time when the assignment was last updated. */
    updated_at: string;
    /** The user or system that last updated the assignment. */
    updated_by: string;
  }

  /** An IAM access group. */
  export interface Group {
    /** The group's access group ID. */
    id?: string;
    /** The group's name. */
    name?: string;
    /** The group's description - if defined. */
    description?: string;
    /** The timestamp the group was created at. */
    created_at?: string;
    /** The `iam_id` of the entity that created the group. */
    created_by_id?: string;
    /** The timestamp the group was last edited at. */
    last_modified_at?: string;
    /** The `iam_id` of the entity that last modified the group name or description. */
    last_modified_by_id?: string;
    /** A url to the given group resource. */
    href?: string;
    /** This is set to true if rules exist for the group. */
    is_federated?: boolean;
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

  /** Response object for listing template versions. */
  export interface ListTemplateVersionsResponse {
    /** The maximum number of resources to return. */
    limit: number;
    /** The offset of the first resource in the list. */
    offset: number;
    /** The total number of resources in the list. */
    total_count: number;
    /** A link object. */
    first?: HrefStruct;
    /** A link object. */
    previous?: HrefStruct;
    /** A link object. */
    next?: HrefStruct;
    /** A link object. */
    last?: HrefStruct;
    /** A list of access group template versions. */
    versions?: ListTemplatesVersionsResponse[];
  }

  /** Response object for listing templates. */
  export interface ListTemplatesResponse {
    /** The maximum number of resources to return. */
    limit: number;
    /** The offset of the first resource in the list. */
    offset: number;
    /** The total number of resources in the list. */
    total_count: number;
    /** A link object. */
    first?: HrefStruct;
    /** A link object. */
    previous?: HrefStruct;
    /** A link object. */
    next?: HrefStruct;
    /** A link object. */
    last?: HrefStruct;
    /** A list of templates. */
    groups_templates?: TemplateItem[];
  }

  /** Response object for a single access group template version. */
  export interface ListTemplatesVersionsResponse {
    /** The name of the template. */
    name?: string;
    /** The description of the template. */
    description?: string;
    /** The ID of the account associated with the template. */
    account_id?: string;
    /** The version number of the template. */
    version?: string;
    /** A boolean indicating whether the template is committed or not. */
    committed?: boolean;
    /** Access Group Input Component. */
    access_group?: AccessGroupInput;
    /** A list of policy templates associated with the template. */
    policy_template_references?: PolicyTemplatesInput[];
    /** The URL to the template resource. */
    href?: string;
    /** The date and time the template was created. */
    created_at?: string;
    /** The ID of the user who created the template. */
    created_by_id?: string;
    /** The date and time the template was last modified. */
    last_modified_at?: string;
    /** The ID of the user who last modified the template. */
    last_modified_by_id?: string;
  }

  /** Member Action Controls component. */
  export interface MembersActionControls {
    /** members action controls add. */
    add?: boolean;
    /** members action controls remove. */
    remove?: boolean;
  }

  /** Members Input component. */
  export interface MembersInput {
    /** Users array. */
    users?: string[];
    /** Service ids array. */
    service_ids?: string[];
    /** Member Action Controls component. */
    action_controls?: MembersActionControls;
  }

  /** Policy Templates Input component. */
  export interface PolicyTemplatesInput {
    /** policy template input id. */
    id?: string;
    /** policy template input version. */
    version?: string;
  }

  /** Object containing details of a resource list with target account ID. */
  export interface ResourceListWithTargetAccountID {
    /** The ID of the entity that the resource list applies to. */
    target?: string;
    /** Assignment Resource Access Group. */
    access_group?: AssignmentResourceAccessGroup;
    /** List of policy template references for the resource list. */
    policy_template_references?: AssignmentResourceEntry[];
  }

  /** A rule of an access group. */
  export interface Rule {
    /** The rule id. */
    id?: string;
    /** The name of the rule. */
    name?: string;
    /** The number of hours that the rule lives for (Must be between 1 and 24). */
    expiration?: number;
    /** The url of the identity provider. */
    realm_name?: string;
    /** The group id that the rule is assigned to. */
    access_group_id?: string;
    /** The account id that the group is in. */
    account_id?: string;
    /** A list of conditions the rule must satisfy. */
    conditions?: RuleConditions[];
    /** The timestamp the rule was created at. */
    created_at?: string;
    /** The `iam_id` of the entity that created the rule. */
    created_by_id?: string;
    /** The timestamp the rule was last edited at. */
    last_modified_at?: string;
    /** The IAM id that last modified the rule. */
    last_modified_by_id?: string;
  }

  /** The conditions of a rule. */
  export interface RuleConditions {
    /** The claim to evaluate against. This will be found in the `ext` claims of a user's login request. */
    claim: string;
    /** The operation to perform on the claim. */
    operator: string;
    /** The stringified JSON value that the claim is compared to using the operator. */
    value: string;
  }

  /** Rule Input component. */
  export interface RuleInput {
    /** rule input name. */
    name?: string;
    /** rule input expiration. */
    expiration?: number;
    /** rule input realm name. */
    realm_name?: string;
    /** rule input conditions. */
    conditions?: ConditionInput[];
    /** Rules Action Controls component. */
    action_controls?: RulesActionControls;
  }

  /** Rules Action Controls component. */
  export interface RulesActionControls {
    /** rules action controls remove. */
    remove?: boolean;
    /** rules action controls update. */
    update?: boolean;
  }

  /** A list of rules attached to the access group. */
  export interface RulesList {
    /** A list of rules. */
    rules?: Rule[];
  }

  /** Response object containing the details of a template assignment. */
  export interface TemplateCreateAssignmentResponse {
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
    /** The URL of the assignment resource. */
    href: string;
    /** The date and time when the assignment was created. */
    created_at: string;
    /** The user or system that created the assignment. */
    created_by: string;
    /** The date and time when the assignment was last updated. */
    updated_at: string;
    /** The user or system that last updated the assignment. */
    updated_by: string;
  }

  /** TemplateItem. */
  export interface TemplateItem {
    /** The ID of the template. */
    id: string;
    /** The name of the template. */
    name: string;
    /** The description of the template. */
    description?: string;
    /** The version of the template. */
    version: string;
    /** The timestamp when the template was created. */
    created_at: string;
    /** The ID of the user who created the template. */
    created_by_id: string;
    /** The timestamp when the template was last modified. */
    last_modified_at: string;
    /** The ID of the user who last modified the template. */
    last_modified_by_id: string;
    /** The URL to access the template resource. */
    href: string;
  }

  /** Response object containing a list of template assignments. */
  export interface TemplatesListAssignmentResponse {
    /** Total number of items matching the query. */
    total?: number;
    /** Maximum number of items returned in the response. */
    limit?: number;
    /** Index of the first item returned in the response. */
    offset?: number;
    /** List of template assignments. */
    groups_assignment?: TemplateCreateAssignmentResponse[];
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
   * TemplatePager can be used to simplify the use of listTemplate().
   */
  export class TemplatePager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: IamAccessGroupsV2;

    protected params: IamAccessGroupsV2.ListTemplateParams;

    /**
     * Construct a TemplatePager object.
     *
     * @param {IamAccessGroupsV2}  client - The service client instance used to invoke listTemplate()
     * @param {Object} params - The parameters to be passed to listTemplate()
     * @constructor
     * @returns {TemplatePager}
     */
    constructor(client: IamAccessGroupsV2, params: IamAccessGroupsV2.ListTemplateParams) {
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
     * Returns the next page of results by invoking listTemplate().
     * @returns {Promise<IamAccessGroupsV2.TemplateItem[]>}
     */
    public async getNext(): Promise<IamAccessGroupsV2.TemplateItem[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listTemplate(this.params);
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
      return result.groups_templates;
    }

    /**
     * Returns all results by invoking listTemplate() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamAccessGroupsV2.TemplateItem[]>}
     */
    public async getAll(): Promise<IamAccessGroupsV2.TemplateItem[]> {
      const results: TemplateItem[] = [];
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
     * @returns {Promise<IamAccessGroupsV2.ListTemplatesVersionsResponse[]>}
     */
    public async getNext(): Promise<IamAccessGroupsV2.ListTemplatesVersionsResponse[]> {
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
      return result.versions;
    }

    /**
     * Returns all results by invoking listTemplateVersions() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<IamAccessGroupsV2.ListTemplatesVersionsResponse[]>}
     */
    public async getAll(): Promise<IamAccessGroupsV2.ListTemplatesVersionsResponse[]> {
      const results: ListTemplatesVersionsResponse[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = IamAccessGroupsV2;
