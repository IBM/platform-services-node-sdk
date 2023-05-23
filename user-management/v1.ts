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
 * Manage the lifecycle of your users using User Management APIs.
 *
 * API Version: 1.0
 */

class UserManagementV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://user-management.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'user_management';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of UserManagementV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {UserManagementV1}
   */

  public static newInstance(options: UserOptions): UserManagementV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new UserManagementV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a UserManagementV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {UserManagementV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(UserManagementV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * users
   ************************/

  /**
   * List users.
   *
   * Retrieve users in the account. You can use the IAM service token or a user token for authorization. To use this
   * method, the requesting user or service ID must have at least the viewer, editor, or administrator role on the User
   * Management service. If unrestricted view is enabled, the user can see all users in the same account without an IAM
   * role. If restricted view is enabled and user has the viewer, editor, or administrator role on the user management
   * service, the API returns all users in the account. If unrestricted view is enabled and the user does not have these
   * roles, the API returns only the current user. Users are returned in a paginated list with a default limit of 100
   * users. You can iterate through all users by following the `next_url` field. Additional substring search fields are
   * supported to filter the users.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {number} [params.limit] - The number of results to be returned.
   * @param {boolean} [params.includeSettings] - The user settings to be returned. Set to true to view language, allowed
   * IP address, and authentication settings.
   * @param {string} [params.search] - The desired search results to be returned. To view the list of users with the
   * additional search filter, use the following query options: `firstname`, `lastname`, `email`, `state`, `substate`,
   * `iam_id`, `realm`, and `userId`. HTML URL encoding for the search query and `:` must be used. For example,
   * search=state%3AINVALID returns a list of invalid users. Multiple search queries can be combined to obtain `OR`
   * results using `,` operator (not URL encoded). For example, search=state%3AINVALID,email%3Amail.test.ibm.com.
   * @param {string} [params.start] - An optional token that indicates the beginning of the page of results to be
   * returned. If omitted, the first page of results is returned. This value is obtained from the 'next_url' field of
   * the operation response.
   * @param {string} [params.userId] - Filter users based on their user ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.UserList>>}
   */
  public listUsers(
    params: UserManagementV1.ListUsersParams
  ): Promise<UserManagementV1.Response<UserManagementV1.UserList>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'limit',
      'includeSettings',
      'search',
      'start',
      'userId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'include_settings': _params.includeSettings,
      'search': _params.search,
      '_start': _params.start,
      'user_id': _params.userId,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(UserManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listUsers');

    const parameters = {
      options: {
        url: '/v2/accounts/{account_id}/users',
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
   * Invite users to an account.
   *
   * Invite users to the account. You must use a user token for authorization. Service IDs can't invite users to the
   * account. To use this method, the requesting user must have the editor or administrator role on the User Management
   * service. For more information, see the [Inviting
   * users](https://cloud.ibm.com/docs/account?topic=account-iamuserinv) documentation. You can specify the user account
   * role and the corresponding IAM policy information in the request body. <br/><br/>When you invite a user to an
   * account, the user is initially created in the `PROCESSING` state. After the user is successfully created, all
   * specified permissions are configured, and the activation email is sent, the invited user is transitioned to the
   * `PENDING` state. When the invited user clicks the activation email and creates and confirms their IBM Cloud
   * account, the user is transitioned to `ACTIVE` state. If the user email is already verified, no email is generated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {InviteUser[]} [params.users] - A list of users to be invited.
   * @param {InviteUserIamPolicy[]} [params.iamPolicy] - A list of IAM policies.
   * @param {string[]} [params.accessGroups] - A list of access groups.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.InvitedUserList>>}
   */
  public inviteUsers(
    params: UserManagementV1.InviteUsersParams
  ): Promise<UserManagementV1.Response<UserManagementV1.InvitedUserList>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'users', 'iamPolicy', 'accessGroups', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'users': _params.users,
      'iam_policy': _params.iamPolicy,
      'access_groups': _params.accessGroups,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(UserManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'inviteUsers');

    const parameters = {
      options: {
        url: '/v2/accounts/{account_id}/users',
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

  /**
   * Get user profile.
   *
   * Retrieve a user's profile by the user's IAM ID in your account. You can use the IAM service token or a user token
   * for authorization. To use this method, the requesting user or service ID must have at least the viewer, editor, or
   * administrator role on the User Management service.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {string} params.iamId - The user's IAM ID.
   * @param {string} [params.includeActivity] - Include activity information of the user, such as the last
   * authentication timestamp.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.UserProfile>>}
   */
  public getUserProfile(
    params: UserManagementV1.GetUserProfileParams
  ): Promise<UserManagementV1.Response<UserManagementV1.UserProfile>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = ['accountId', 'iamId', 'includeActivity', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_activity': _params.includeActivity,
    };

    const path = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(UserManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getUserProfile');

    const parameters = {
      options: {
        url: '/v2/accounts/{account_id}/users/{iam_id}',
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
   * Partially update user profile.
   *
   * Partially update a user's profile by user's IAM ID. You can use the IAM service token or a user token for
   * authorization. To use this method, the requesting user or service ID must have at least the editor or administrator
   * role on the User Management service. A user or service ID with these roles can change a user's state between
   * `ACTIVE`, `VPN_ONLY`, or `DISABLED_CLASSIC_INFRASTRUCTURE`, but they can't change the state to `PROCESSING` or
   * `PENDING` because these are system states. For other request body fields, a user can update their own profile
   * without having User Management service permissions.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {string} params.iamId - The user's IAM ID.
   * @param {string} [params.firstname] - The first name of the user.
   * @param {string} [params.lastname] - The last name of the user.
   * @param {string} [params.state] - The state of the user. Possible values are `PROCESSING`, `PENDING`, `ACTIVE`,
   * `DISABLED_CLASSIC_INFRASTRUCTURE`, and `VPN_ONLY`.
   * @param {string} [params.email] - The email address of the user.
   * @param {string} [params.phonenumber] - The phone number of the user.
   * @param {string} [params.altphonenumber] - The alternative phone number of the user.
   * @param {string} [params.photo] - A link to a photo of the user.
   * @param {string} [params.includeActivity] - Include activity information of the user, such as the last
   * authentication timestamp.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>>}
   */
  public updateUserProfile(
    params: UserManagementV1.UpdateUserProfileParams
  ): Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = [
      'accountId',
      'iamId',
      'firstname',
      'lastname',
      'state',
      'email',
      'phonenumber',
      'altphonenumber',
      'photo',
      'includeActivity',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'firstname': _params.firstname,
      'lastname': _params.lastname,
      'state': _params.state,
      'email': _params.email,
      'phonenumber': _params.phonenumber,
      'altphonenumber': _params.altphonenumber,
      'photo': _params.photo,
    };

    const query = {
      'include_activity': _params.includeActivity,
    };

    const path = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      UserManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateUserProfile'
    );

    const parameters = {
      options: {
        url: '/v2/accounts/{account_id}/users/{iam_id}',
        method: 'PATCH',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Remove user from account.
   *
   * Remove users from an account by user's IAM ID. You must use a user token for authorization. Service IDs can't
   * remove users from an account. To use this method, the requesting user must have the editor or administrator role on
   * the User Management service. For more information, see the [Removing
   * users](https://cloud.ibm.com/docs/account?topic=account-remove) documentation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {string} params.iamId - The user's IAM ID.
   * @param {string} [params.includeActivity] - Include activity information of the user, such as the last
   * authentication timestamp.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>>}
   */
  public removeUser(
    params: UserManagementV1.RemoveUserParams
  ): Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = ['accountId', 'iamId', 'includeActivity', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_activity': _params.includeActivity,
    };

    const path = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(UserManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'removeUser');

    const parameters = {
      options: {
        url: '/v2/accounts/{account_id}/users/{iam_id}',
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
   * Accept an invitation.
   *
   * Accept a user invitation to an account. You can use the user's token for authorization. To use this method, the
   * requesting user must provide the account ID for the account that they are accepting an invitation for. If the user
   * already accepted the invitation request, it returns 204 with no response body.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - The account ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>>}
   */
  public accept(
    params?: UserManagementV1.AcceptParams
  ): Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(UserManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'accept');

    const parameters = {
      options: {
        url: '/v2/users/accept',
        method: 'POST',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Remove user from account (Asynchronous).
   *
   * Remove users from an account by using the user's IAM ID. You must use a user token for authorization. Service IDs
   * can't remove users from an account. If removing the user fails it will set the user's state to
   * ERROR_WHILE_DELETING. To use this method, the requesting user must have the editor or administrator role on the
   * User Management service. For more information, see the [Removing
   * users](https://cloud.ibm.com/docs/account?topic=account-remove) documentation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {string} params.iamId - The user's IAM ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>>}
   */
  public v3RemoveUser(
    params: UserManagementV1.V3RemoveUserParams
  ): Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = ['accountId', 'iamId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(UserManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'v3RemoveUser');

    const parameters = {
      options: {
        url: '/v3/accounts/{account_id}/users/{iam_id}',
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
   * userSettings
   ************************/

  /**
   * Get user settings.
   *
   * Retrieve a user's settings by the user's IAM ID. You can use the IAM service token or a user token for
   * authorization. To use this method, the requesting user or service ID must have the viewer, editor, or administrator
   * role on the User Management service. <br/><br/>The user settings have several fields. The `language` field is the
   * language setting for the user interface display language. The `notification_language` field is the language setting
   * for phone and email notifications. The `allowed_ip_addresses` field specifies a list of IP addresses that the user
   * can log in and perform operations from as described in [Allowing specific IP addresses for a
   * user](https://cloud.ibm.com/docs/account?topic=account-ips). For information about the `self_manage` field, review
   * information about the [user-managed login setting](https://cloud.ibm.com/docs/account?topic=account-types).
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {string} params.iamId - The user's IAM ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.UserSettings>>}
   */
  public getUserSettings(
    params: UserManagementV1.GetUserSettingsParams
  ): Promise<UserManagementV1.Response<UserManagementV1.UserSettings>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = ['accountId', 'iamId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      UserManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getUserSettings'
    );

    const parameters = {
      options: {
        url: '/v2/accounts/{account_id}/users/{iam_id}/settings',
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
   * Partially update user settings.
   *
   * Update a user's settings by the user's IAM ID. You can use the IAM service token or a user token for authorization.
   * To fully use this method, the user or service ID must have the editor or administrator role on the User Management
   * service. Without these roles, a user can update only their own `language` or `notification_language` fields. If
   * `self_manage` is `true`, the user can also update the `allowed_ip_addresses` field.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The account ID of the specified user.
   * @param {string} params.iamId - The user's IAM ID.
   * @param {string} [params.language] - The console UI language. By default, this field is empty.
   * @param {string} [params.notificationLanguage] - The language for email and phone notifications. By default, this
   * field is empty.
   * @param {string} [params.allowedIpAddresses] - A comma-separated list of IP addresses.
   * @param {boolean} [params.selfManage] - Whether user managed login is enabled. The default value is `false`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>>}
   */
  public updateUserSettings(
    params: UserManagementV1.UpdateUserSettingsParams
  ): Promise<UserManagementV1.Response<UserManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = [
      'accountId',
      'iamId',
      'language',
      'notificationLanguage',
      'allowedIpAddresses',
      'selfManage',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'language': _params.language,
      'notification_language': _params.notificationLanguage,
      'allowed_ip_addresses': _params.allowedIpAddresses,
      'self_manage': _params.selfManage,
    };

    const path = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
    };

    const sdkHeaders = getSdkHeaders(
      UserManagementV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateUserSettings'
    );

    const parameters = {
      options: {
        url: '/v2/accounts/{account_id}/users/{iam_id}/settings',
        method: 'PATCH',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
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

namespace UserManagementV1 {
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

  /** Parameters for the `listUsers` operation. */
  export interface ListUsersParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** The number of results to be returned. */
    limit?: number;
    /** The user settings to be returned. Set to true to view language, allowed IP address, and authentication
     *  settings.
     */
    includeSettings?: boolean;
    /** The desired search results to be returned. To view the list of users with the additional search filter, use
     *  the following query options: `firstname`, `lastname`, `email`, `state`, `substate`, `iam_id`, `realm`, and
     *  `userId`. HTML URL encoding for the search query and `:` must be used. For example, search=state%3AINVALID
     *  returns a list of invalid users. Multiple search queries can be combined to obtain `OR` results using `,`
     *  operator (not URL encoded). For example, search=state%3AINVALID,email%3Amail.test.ibm.com.
     */
    search?: string;
    /** An optional token that indicates the beginning of the page of results to be returned. If omitted, the first
     *  page of results is returned. This value is obtained from the 'next_url' field of the operation response.
     */
    start?: string;
    /** Filter users based on their user ID. */
    userId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `inviteUsers` operation. */
  export interface InviteUsersParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** A list of users to be invited. */
    users?: InviteUser[];
    /** A list of IAM policies. */
    iamPolicy?: InviteUserIamPolicy[];
    /** A list of access groups. */
    accessGroups?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getUserProfile` operation. */
  export interface GetUserProfileParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** The user's IAM ID. */
    iamId: string;
    /** Include activity information of the user, such as the last authentication timestamp. */
    includeActivity?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateUserProfile` operation. */
  export interface UpdateUserProfileParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** The user's IAM ID. */
    iamId: string;
    /** The first name of the user. */
    firstname?: string;
    /** The last name of the user. */
    lastname?: string;
    /** The state of the user. Possible values are `PROCESSING`, `PENDING`, `ACTIVE`,
     *  `DISABLED_CLASSIC_INFRASTRUCTURE`, and `VPN_ONLY`.
     */
    state?: string;
    /** The email address of the user. */
    email?: string;
    /** The phone number of the user. */
    phonenumber?: string;
    /** The alternative phone number of the user. */
    altphonenumber?: string;
    /** A link to a photo of the user. */
    photo?: string;
    /** Include activity information of the user, such as the last authentication timestamp. */
    includeActivity?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `removeUser` operation. */
  export interface RemoveUserParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** The user's IAM ID. */
    iamId: string;
    /** Include activity information of the user, such as the last authentication timestamp. */
    includeActivity?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `accept` operation. */
  export interface AcceptParams {
    /** The account ID. */
    accountId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `v3RemoveUser` operation. */
  export interface V3RemoveUserParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** The user's IAM ID. */
    iamId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getUserSettings` operation. */
  export interface GetUserSettingsParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** The user's IAM ID. */
    iamId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateUserSettings` operation. */
  export interface UpdateUserSettingsParams {
    /** The account ID of the specified user. */
    accountId: string;
    /** The user's IAM ID. */
    iamId: string;
    /** The console UI language. By default, this field is empty. */
    language?: string;
    /** The language for email and phone notifications. By default, this field is empty. */
    notificationLanguage?: string;
    /** A comma-separated list of IP addresses. */
    allowedIpAddresses?: string;
    /** Whether user managed login is enabled. The default value is `false`. */
    selfManage?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Information about a user that has been invited to join an account. */
  export interface InvitedUser {
    /** The email address associated with the invited user. */
    email?: string;
    /** The id associated with the invited user. */
    id?: string;
    /** The state of the invitation for the user. */
    state?: string;
  }

  /** A collection of invited users.  This is the response returned by the invite_users operation. */
  export interface InvitedUserList {
    /** The list of users that have been invited to join the account. */
    resources?: InvitedUser[];
  }

  /** The users returned. */
  export interface UserList {
    /** The number of users returned. */
    total_results: number;
    /** A limit to the number of users returned in a page. */
    limit: number;
    /** The first URL of the get users API. */
    first_url?: string;
    /** The next URL of the get users API. */
    next_url?: string;
    /** A list of users in the account. */
    resources?: UserProfile[];
  }

  /** Returned the user profile. */
  export interface UserProfile {
    /** An alphanumeric value identifying the user profile. */
    id?: string;
    /** An alphanumeric value identifying the user's IAM ID. */
    iam_id?: string;
    /** The realm of the user. The value is either `IBMid` or `SL`. */
    realm?: string;
    /** The user ID used for login. */
    user_id?: string;
    /** The first name of the user. */
    firstname?: string;
    /** The last name of the user. */
    lastname?: string;
    /** The state of the user. Possible values are `PROCESSING`, `PENDING`, `ACTIVE`,
     *  `DISABLED_CLASSIC_INFRASTRUCTURE`, and `VPN_ONLY`.
     */
    state?: string;
    /** The email address of the user. */
    email?: string;
    /** The phone number of the user. */
    phonenumber?: string;
    /** The alternative phone number of the user. */
    altphonenumber?: string;
    /** A link to a photo of the user. */
    photo?: string;
    /** An alphanumeric value identifying the account ID. */
    account_id?: string;
    /** The timestamp for when the user was added to the account. */
    added_on?: string;
  }

  /** The user settings returned. */
  export interface UserSettings {
    /** The console UI language. By default, this field is empty. */
    language?: string;
    /** The language for email and phone notifications. By default, this field is empty. */
    notification_language?: string;
    /** A comma-separated list of IP addresses. */
    allowed_ip_addresses?: string;
    /** Whether user managed login is enabled. The default value is `false`. */
    self_manage?: boolean;
  }

  /** An attribute/value pair. */
  export interface Attribute {
    /** The name of the attribute. */
    name?: string;
    /** The value of the attribute. */
    value?: string;
  }

  /** Invite a user. */
  export interface InviteUser {
    /** The email of the user to be invited. */
    email?: string;
    /** The account role of the user to be invited. */
    account_role?: string;
  }

  /** Invite a user to an IAM policy. */
  export interface InviteUserIamPolicy {
    /** The policy type. This can be either "access" or "authorization". */
    type: string;
    /** A list of IAM roles. */
    roles?: Role[];
    /** A list of resources. */
    resources?: Resource[];
  }

  /** A collection of attribute value pairs. */
  export interface Resource {
    /** A list of IAM attributes. */
    attributes?: Attribute[];
  }

  /** The role of an IAM policy. */
  export interface Role {
    /** An alphanumeric value identifying the origin. */
    role_id?: string;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * UsersPager can be used to simplify the use of listUsers().
   */
  export class UsersPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: UserManagementV1;

    protected params: UserManagementV1.ListUsersParams;

    /**
     * Construct a UsersPager object.
     *
     * @param {UserManagementV1}  client - The service client instance used to invoke listUsers()
     * @param {Object} params - The parameters to be passed to listUsers()
     * @constructor
     * @returns {UsersPager}
     */
    constructor(client: UserManagementV1, params: UserManagementV1.ListUsersParams) {
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
     * Returns the next page of results by invoking listUsers().
     * @returns {Promise<UserManagementV1.UserProfile[]>}
     */
    public async getNext(): Promise<UserManagementV1.UserProfile[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listUsers(this.params);
      const { result } = response;

      let next = null;
      if (result && result.next_url) {
        next = getQueryParam(result.next_url, '_start');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listUsers() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<UserManagementV1.UserProfile[]>}
     */
    public async getAll(): Promise<UserManagementV1.UserProfile[]> {
      const results: UserProfile[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = UserManagementV1;
