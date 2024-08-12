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
 * IBM OpenAPI SDK Code Generator Version: 3.93.0-c40121e6-20240729-182103
 */

import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import {
  Authenticator,
  BaseService,
  UserOptions,
  getAuthenticatorFromEnvironment,
  validateParams,
} from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IAM Identity Service API allows for the management of Account Settings and Identities (Service IDs, ApiKeys).
 *
 * API Version: 1.0.0
 */

class IamIdentityV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://iam.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'iam_identity';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of IamIdentityV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {IamIdentityV1}
   */

  public static newInstance(options: UserOptions): IamIdentityV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new IamIdentityV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a IamIdentityV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {IamIdentityV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(IamIdentityV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * aPIKeyOperations
   ************************/

  /**
   * Get API keys for a given service or user IAM ID and account ID.
   *
   * Returns the list of API key details for a given service or user IAM ID and account ID. Users can manage user API
   * keys for themself, or service ID API keys for service IDs that are bound to an entity they have access to. In case
   * of service IDs and their API keys, a user must be either an account owner, a IBM Cloud org manager or IBM Cloud
   * space developer in order to manage service IDs of the entity.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the API keys to query. If a service IAM ID is specified in
   * iam_id then account_id must match the account of the IAM ID. If a user IAM ID is specified in iam_id then then
   * account_id must match the account of the Authorization token.
   * @param {string} [params.iamId] - IAM ID of the API keys to be queried. The IAM ID may be that of a user or a
   * service. For a user IAM ID iam_id must match the Authorization token.
   * @param {number} [params.pagesize] - Optional size of a single page. Default is 20 items per page. Valid range is 1
   * to 100.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.scope] - Optional parameter to define the scope of the queried API keys. Can be 'entity'
   * (default) or 'account'.
   * @param {string} [params.type] - Optional parameter to filter the type of the queried API keys. Can be 'user' or
   * 'serviceid'.
   * @param {string} [params.sort] - Optional sort property, valid values are name, description, created_at and
   * created_by. If specified, the items are sorted by the value of this property.
   * @param {string} [params.order] - Optional sort order, valid values are asc and desc. Default: asc.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ApiKeyList>>}
   */
  public listApiKeys(
    params?: IamIdentityV1.ListApiKeysParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ApiKeyList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'iamId', 'pagesize', 'pagetoken', 'scope', 'type', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'iam_id': _params.iamId,
      'pagesize': _params.pagesize,
      'pagetoken': _params.pagetoken,
      'scope': _params.scope,
      'type': _params.type,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listApiKeys');

    const parameters = {
      options: {
        url: '/v1/apikeys',
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
   * Create an API key.
   *
   * Creates an API key for a UserID or service ID. Users can manage user API keys for themself, or service ID API keys
   * for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Name of the API key. The name is not checked for uniqueness. Therefore multiple names
   * with the same value can exist. Access is done via the UUID of the API key.
   * @param {string} params.iamId - The iam_id that this API key authenticates.
   * @param {string} [params.description] - The optional description of the API key. The 'description' property is only
   * available if a description was provided during a create of an API key.
   * @param {string} [params.accountId] - The account ID of the API key.
   * @param {string} [params.apikey] - You can optionally passthrough the API key value for this API key. If passed, a
   * minimum length validation of 32 characters for that apiKey value is done, i.e. the value can contain any characters
   * and can even be non-URL safe, but the minimum length requirement must be met. If omitted, the API key management
   * will create an URL safe opaque API key value. The value of the API key is checked for uniqueness. Ensure enough
   * variations when passing in this value.
   * @param {boolean} [params.storeValue] - Send true or false to set whether the API key value is retrievable in the
   * future by using the Get details of an API key request. If you create an API key for a user, you must specify
   * `false` or omit the value. We don't allow storing of API keys for users.
   * @param {boolean} [params.supportSessions] - Defines if the API key supports sessions. Sessions are only supported
   * for user apikeys.
   * @param {string} [params.actionWhenLeaked] - Defines the action to take when API key is leaked, valid values are
   * 'none', 'disable' and 'delete'.
   * @param {string} [params.entityLock] - Indicates if the API key is locked for further write operations. False by
   * default.
   * @param {string} [params.entityDisable] - Indicates if the API key is disabled. False by default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>>}
   */
  public createApiKey(
    params: IamIdentityV1.CreateApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'iamId'];
    const _validParams = ['name', 'iamId', 'description', 'accountId', 'apikey', 'storeValue', 'supportSessions', 'actionWhenLeaked', 'entityLock', 'entityDisable', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'iam_id': _params.iamId,
      'description': _params.description,
      'account_id': _params.accountId,
      'apikey': _params.apikey,
      'store_value': _params.storeValue,
      'support_sessions': _params.supportSessions,
      'action_when_leaked': _params.actionWhenLeaked,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys',
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
            'Entity-Disable': _params.entityDisable,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get details of an API key by its value.
   *
   * Returns the details of an API key by its value. Users can manage user API keys for themself, or service ID API keys
   * for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.iamApiKey] - API key value.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>>}
   */
  public getApiKeysDetails(
    params?: IamIdentityV1.GetApiKeysDetailsParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['iamApiKey', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getApiKeysDetails');

    const parameters = {
      options: {
        url: '/v1/apikeys/details',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'IAM-ApiKey': _params.iamApiKey,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get details of an API key.
   *
   * Returns the details of an API key. Users can manage user API keys for themself, or service ID API keys for service
   * IDs that are bound to an entity they have access to. In case of service IDs and their API keys, a user must be
   * either an account owner, a IBM Cloud org manager or IBM Cloud space developer in order to manage service IDs of the
   * entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {boolean} [params.includeActivity] - Defines if the entity's activity is included in the response.
   * Retrieving activity data is an expensive operation, so only request this when needed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>>}
   */
  public getApiKey(
    params: IamIdentityV1.GetApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'includeHistory', 'includeActivity', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
      'include_activity': _params.includeActivity,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys/{id}',
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
   * Updates an API key.
   *
   * Updates properties of an API key. This does NOT affect existing access tokens. Their token content will stay
   * unchanged until the access token is refreshed. To update an API key, pass the property to be modified. To delete
   * one property's value, pass the property with an empty value "".Users can manage user API keys for themself, or
   * service ID API keys for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key to be updated.
   * @param {string} params.ifMatch - Version of the API key to be updated. Specify the version that you retrieved when
   * reading the API key. This value helps identifying parallel usage of this API. Pass * to indicate to update any
   * version available. This might result in stale updates.
   * @param {string} [params.name] - The name of the API key to update. If specified in the request the parameter must
   * not be empty. The name is not checked for uniqueness. Failure to this will result in an Error condition.
   * @param {string} [params.description] - The description of the API key to update. If specified an empty description
   * will clear the description of the API key. If a non empty value is provided the API key will be updated.
   * @param {boolean} [params.supportSessions] - Defines if the API key supports sessions. Sessions are only supported
   * for user apikeys.
   * @param {string} [params.actionWhenLeaked] - Defines the action to take when API key is leaked, valid values are
   * 'none', 'disable' and 'delete'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>>}
   */
  public updateApiKey(
    params: IamIdentityV1.UpdateApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ApiKey>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'ifMatch'];
    const _validParams = ['id', 'ifMatch', 'name', 'description', 'supportSessions', 'actionWhenLeaked', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'support_sessions': _params.supportSessions,
      'action_when_leaked': _params.actionWhenLeaked,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys/{id}',
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
   * Deletes an API key.
   *
   * Deletes an API key. Existing tokens will remain valid until expired. Users can manage user API keys for themself,
   * or service ID API keys for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteApiKey(
    params: IamIdentityV1.DeleteApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Lock the API key.
   *
   * Locks an API key by ID. Users can manage user API keys for themself, or service ID API keys for service IDs that
   * are bound to an entity they have access to. In case of service IDs and their API keys, a user must be either an
   * account owner, a IBM Cloud org manager or IBM Cloud space developer in order to manage service IDs of the entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public lockApiKey(
    params: IamIdentityV1.LockApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'lockApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys/{id}/lock',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Unlock the API key.
   *
   * Unlocks an API key by ID. Users can manage user API keys for themself, or service ID API keys for service IDs that
   * are bound to an entity they have access to. In case of service IDs and their API keys, a user must be either an
   * account owner, a IBM Cloud org manager or IBM Cloud space developer in order to manage service IDs of the entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public unlockApiKey(
    params: IamIdentityV1.UnlockApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'unlockApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys/{id}/lock',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * disable the API key.
   *
   * Disable an API key. Users can manage user API keys for themself, or service ID API keys for service IDs that are
   * bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public disableApiKey(
    params: IamIdentityV1.DisableApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'disableApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys/{id}/disable',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Enable the API key.
   *
   * Enable an API key. Users can manage user API keys for themself, or service ID API keys for service IDs that are
   * bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the API key.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public enableApiKey(
    params: IamIdentityV1.EnableApiKeyParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'enableApiKey');

    const parameters = {
      options: {
        url: '/v1/apikeys/{id}/disable',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * serviceIDOperations
   ************************/

  /**
   * List service IDs.
   *
   * Returns a list of service IDs. Users can manage user API keys for themself, or service ID API keys for service IDs
   * that are bound to an entity they have access to. Note: apikey details are only included in the response when
   * creating a Service ID with an api key.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the service ID(s) to query. This parameter is required (unless
   * using a pagetoken).
   * @param {string} [params.name] - Name of the service ID(s) to query. Optional.20 items per page. Valid range is 1 to
   * 100.
   * @param {number} [params.pagesize] - Optional size of a single page. Default is 20 items per page. Valid range is 1
   * to 100.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - Optional sort property, valid values are name, description, created_at and
   * modified_at. If specified, the items are sorted by the value of this property.
   * @param {string} [params.order] - Optional sort order, valid values are asc and desc. Default: asc.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ServiceIdList>>}
   */
  public listServiceIds(
    params?: IamIdentityV1.ListServiceIdsParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ServiceIdList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'name', 'pagesize', 'pagetoken', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'name': _params.name,
      'pagesize': _params.pagesize,
      'pagetoken': _params.pagetoken,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listServiceIds');

    const parameters = {
      options: {
        url: '/v1/serviceids/',
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
   * Create a service ID.
   *
   * Creates a service ID for an IBM Cloud account. Users can manage user API keys for themself, or service ID API keys
   * for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - ID of the account the service ID belongs to.
   * @param {string} params.name - Name of the Service Id. The name is not checked for uniqueness. Therefore multiple
   * names with the same value can exist. Access is done via the UUID of the Service Id.
   * @param {string} [params.description] - The optional description of the Service Id. The 'description' property is
   * only available if a description was provided during a create of a Service Id.
   * @param {string[]} [params.uniqueInstanceCrns] - Optional list of CRNs (string array) which point to the services
   * connected to the service ID.
   * @param {ApiKeyInsideCreateServiceIdRequest} [params.apikey] - Parameters for the API key in the Create service Id
   * V1 REST request.
   * @param {string} [params.entityLock] - Indicates if the service ID is locked for further write operations. False by
   * default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ServiceId>>}
   */
  public createServiceId(
    params: IamIdentityV1.CreateServiceIdParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ServiceId>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'name'];
    const _validParams = ['accountId', 'name', 'description', 'uniqueInstanceCrns', 'apikey', 'entityLock', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'name': _params.name,
      'description': _params.description,
      'unique_instance_crns': _params.uniqueInstanceCrns,
      'apikey': _params.apikey,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createServiceId');

    const parameters = {
      options: {
        url: '/v1/serviceids/',
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
   * Get details of a service ID.
   *
   * Returns the details of a service ID. Users can manage user API keys for themself, or service ID API keys for
   * service IDs that are bound to an entity they have access to. Note: apikey details are only included in the response
   * when creating a Service ID with an api key.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {boolean} [params.includeActivity] - Defines if the entity's activity is included in the response.
   * Retrieving activity data is an expensive operation, so only request this when needed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ServiceId>>}
   */
  public getServiceId(
    params: IamIdentityV1.GetServiceIdParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ServiceId>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'includeHistory', 'includeActivity', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
      'include_activity': _params.includeActivity,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getServiceId');

    const parameters = {
      options: {
        url: '/v1/serviceids/{id}',
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
   * Update service ID.
   *
   * Updates properties of a service ID. This does NOT affect existing access tokens. Their token content will stay
   * unchanged until the access token is refreshed. To update a service ID, pass the property to be modified. To delete
   * one property's value, pass the property with an empty value "".Users can manage user API keys for themself, or
   * service ID API keys for service IDs that are bound to an entity they have access to. Note: apikey details are only
   * included in the response when creating a Service ID with an apikey.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID to be updated.
   * @param {string} params.ifMatch - Version of the service ID to be updated. Specify the version that you retrieved as
   * entity_tag (ETag header) when reading the service ID. This value helps identifying parallel usage of this API. Pass
   * * to indicate to update any version available. This might result in stale updates.
   * @param {string} [params.name] - The name of the service ID to update. If specified in the request the parameter
   * must not be empty. The name is not checked for uniqueness. Failure to this will result in an Error condition.
   * @param {string} [params.description] - The description of the service ID to update. If specified an empty
   * description will clear the description of the service ID. If an non empty value is provided the service ID will be
   * updated.
   * @param {string[]} [params.uniqueInstanceCrns] - List of CRNs which point to the services connected to this service
   * ID. If specified an empty list will clear all existing unique instance crns of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ServiceId>>}
   */
  public updateServiceId(
    params: IamIdentityV1.UpdateServiceIdParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ServiceId>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'ifMatch'];
    const _validParams = ['id', 'ifMatch', 'name', 'description', 'uniqueInstanceCrns', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
      'unique_instance_crns': _params.uniqueInstanceCrns,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateServiceId');

    const parameters = {
      options: {
        url: '/v1/serviceids/{id}',
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
   * Deletes a service ID and associated API keys.
   *
   * Deletes a service ID and all API keys associated to it. Before deleting the service ID, all associated API keys are
   * deleted. In case a Delete Conflict (status code 409) a retry of the request may help as the service ID is only
   * deleted if the associated API keys were successfully deleted before. Users can manage user API keys for themself,
   * or service ID API keys for service IDs that are bound to an entity they have access to.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteServiceId(
    params: IamIdentityV1.DeleteServiceIdParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteServiceId');

    const parameters = {
      options: {
        url: '/v1/serviceids/{id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Lock the service ID.
   *
   * Locks a service ID by ID. Users can manage user API keys for themself, or service ID API keys for service IDs that
   * are bound to an entity they have access to. In case of service IDs and their API keys, a user must be either an
   * account owner, a IBM Cloud org manager or IBM Cloud space developer in order to manage service IDs of the entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public lockServiceId(
    params: IamIdentityV1.LockServiceIdParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'lockServiceId');

    const parameters = {
      options: {
        url: '/v1/serviceids/{id}/lock',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Unlock the service ID.
   *
   * Unlocks a service ID by ID. Users can manage user API keys for themself, or service ID API keys for service IDs
   * that are bound to an entity they have access to. In case of service IDs and their API keys, a user must be either
   * an account owner, a IBM Cloud org manager or IBM Cloud space developer in order to manage service IDs of the
   * entity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - Unique ID of the service ID.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public unlockServiceId(
    params: IamIdentityV1.UnlockServiceIdParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'unlockServiceId');

    const parameters = {
      options: {
        url: '/v1/serviceids/{id}/lock',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * trustedProfilesOperations
   ************************/

  /**
   * Create a trusted profile.
   *
   * Create a trusted profile for a given account ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Name of the trusted profile. The name is checked for uniqueness. Therefore trusted
   * profiles with the same names can not exist in the same account.
   * @param {string} params.accountId - The account ID of the trusted profile.
   * @param {string} [params.description] - The optional description of the trusted profile. The 'description' property
   * is only available if a description was provided during creation of trusted profile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfile>>}
   */
  public createProfile(
    params: IamIdentityV1.CreateProfileParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfile>> {
    const _params = { ...params };
    const _requiredParams = ['name', 'accountId'];
    const _validParams = ['name', 'accountId', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'account_id': _params.accountId,
      'description': _params.description,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createProfile');

    const parameters = {
      options: {
        url: '/v1/profiles',
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
   * List trusted profiles.
   *
   * List the trusted profiles in an account. The `account_id` query parameter determines the account from which to
   * retrieve the list of trusted profiles.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Account ID to query for trusted profiles.
   * @param {string} [params.name] - Name of the trusted profile to query.
   * @param {number} [params.pagesize] - Optional size of a single page. Default is 20 items per page. Valid range is 1
   * to 100.
   * @param {string} [params.sort] - Optional sort property, valid values are name, description, created_at and
   * modified_at. If specified, the items are sorted by the value of this property.
   * @param {string} [params.order] - Optional sort order, valid values are asc and desc. Default: asc.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfilesList>>}
   */
  public listProfiles(
    params: IamIdentityV1.ListProfilesParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfilesList>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'name', 'pagesize', 'sort', 'order', 'includeHistory', 'pagetoken', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'name': _params.name,
      'pagesize': _params.pagesize,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
      'pagetoken': _params.pagetoken,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listProfiles');

    const parameters = {
      options: {
        url: '/v1/profiles',
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
   * Get a trusted profile.
   *
   * Retrieve a trusted profile by its `profile-id`. Only the trusted profile's data is returned (`name`, `description`,
   * `iam_id`, etc.), not the federated users or compute resources that qualify to apply the trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile to get.
   * @param {boolean} [params.includeActivity] - Defines if the entity's activity is included in the response.
   * Retrieving activity data is an expensive operation, so only request this when needed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfile>>}
   */
  public getProfile(
    params: IamIdentityV1.GetProfileParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfile>> {
    const _params = { ...params };
    const _requiredParams = ['profileId'];
    const _validParams = ['profileId', 'includeActivity', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_activity': _params.includeActivity,
    };

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getProfile');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}',
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
   * Update a trusted profile.
   *
   * Update the name or description of an existing trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile to be updated.
   * @param {string} params.ifMatch - Version of the trusted profile to be updated. Specify the version that you
   * retrived when reading list of trusted profiles. This value helps to identify any parallel usage of trusted profile.
   * Pass * to indicate to update any version available. This might result in stale updates.
   * @param {string} [params.name] - The name of the trusted profile to update. If specified in the request the
   * parameter must not be empty. The name is checked for uniqueness. Failure to this will result in an Error condition.
   * @param {string} [params.description] - The description of the trusted profile to update. If specified an empty
   * description will clear the description of the trusted profile. If a non empty value is provided the trusted profile
   * will be updated.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfile>>}
   */
  public updateProfile(
    params: IamIdentityV1.UpdateProfileParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfile>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'ifMatch'];
    const _validParams = ['profileId', 'ifMatch', 'name', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'description': _params.description,
    };

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateProfile');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}',
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
   * Delete a trusted profile.
   *
   * Delete a trusted profile. When you delete trusted profile, compute resources and federated users are unlinked from
   * the profile and can no longer apply the trusted profile identity.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteProfile(
    params: IamIdentityV1.DeleteProfileParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['profileId'];
    const _validParams = ['profileId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteProfile');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create claim rule for a trusted profile.
   *
   * Create a claim rule for a trusted profile. There is a limit of 20 rules per trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile to create a claim rule.
   * @param {string} params.type - Type of the claim rule, either 'Profile-SAML' or 'Profile-CR'.
   * @param {ProfileClaimRuleConditions[]} params.conditions - Conditions of this claim rule.
   * @param {ResponseContext} [params.context] - Context with key properties for problem determination.
   * @param {string} [params.name] - Name of the claim rule to be created or updated.
   * @param {string} [params.realmName] - The realm name of the Idp this claim rule applies to. This field is required
   * only if the type is specified as 'Profile-SAML'.
   * @param {string} [params.crType] - The compute resource type the rule applies to, required only if type is specified
   * as 'Profile-CR'. Valid values are VSI, IKS_SA, ROKS_SA.
   * @param {number} [params.expiration] - Session expiration in seconds, only required if type is 'Profile-SAML'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRule>>}
   */
  public createClaimRule(
    params: IamIdentityV1.CreateClaimRuleParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRule>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'type', 'conditions'];
    const _validParams = ['profileId', 'type', 'conditions', 'context', 'name', 'realmName', 'crType', 'expiration', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'conditions': _params.conditions,
      'context': _params.context,
      'name': _params.name,
      'realm_name': _params.realmName,
      'cr_type': _params.crType,
      'expiration': _params.expiration,
    };

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createClaimRule');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/rules',
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
   * List claim rules for a trusted profile.
   *
   * Get a list of all claim rules for a trusted profile. The `profile-id` query parameter determines the profile from
   * which to retrieve the list of claim rules.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRuleList>>}
   */
  public listClaimRules(
    params: IamIdentityV1.ListClaimRulesParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRuleList>> {
    const _params = { ...params };
    const _requiredParams = ['profileId'];
    const _validParams = ['profileId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listClaimRules');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/rules',
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
   * Get a claim rule for a trusted profile.
   *
   * A specific claim rule can be fetched for a given trusted profile ID and rule ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.ruleId - ID of the claim rule to get.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRule>>}
   */
  public getClaimRule(
    params: IamIdentityV1.GetClaimRuleParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRule>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'ruleId'];
    const _validParams = ['profileId', 'ruleId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
      'rule-id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getClaimRule');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/rules/{rule-id}',
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
   * Update claim rule for a trusted profile.
   *
   * Update a specific claim rule for a given trusted profile ID and rule ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.ruleId - ID of the claim rule to update.
   * @param {string} params.ifMatch - Version of the claim rule to be updated. Specify the version that you retrived
   * when reading list of claim rules. This value helps to identify any parallel usage of claim rule. Pass * to indicate
   * to update any version available. This might result in stale updates.
   * @param {string} params.type - Type of the claim rule, either 'Profile-SAML' or 'Profile-CR'.
   * @param {ProfileClaimRuleConditions[]} params.conditions - Conditions of this claim rule.
   * @param {ResponseContext} [params.context] - Context with key properties for problem determination.
   * @param {string} [params.name] - Name of the claim rule to be created or updated.
   * @param {string} [params.realmName] - The realm name of the Idp this claim rule applies to. This field is required
   * only if the type is specified as 'Profile-SAML'.
   * @param {string} [params.crType] - The compute resource type the rule applies to, required only if type is specified
   * as 'Profile-CR'. Valid values are VSI, IKS_SA, ROKS_SA.
   * @param {number} [params.expiration] - Session expiration in seconds, only required if type is 'Profile-SAML'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRule>>}
   */
  public updateClaimRule(
    params: IamIdentityV1.UpdateClaimRuleParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileClaimRule>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'ruleId', 'ifMatch', 'type', 'conditions'];
    const _validParams = ['profileId', 'ruleId', 'ifMatch', 'type', 'conditions', 'context', 'name', 'realmName', 'crType', 'expiration', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'type': _params.type,
      'conditions': _params.conditions,
      'context': _params.context,
      'name': _params.name,
      'realm_name': _params.realmName,
      'cr_type': _params.crType,
      'expiration': _params.expiration,
    };

    const path = {
      'profile-id': _params.profileId,
      'rule-id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateClaimRule');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/rules/{rule-id}',
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
   * Delete a claim rule.
   *
   * Delete a claim rule. When you delete a claim rule, federated user or compute resources are no longer required to
   * meet the conditions of the claim rule in order to apply the trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.ruleId - ID of the claim rule to delete.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteClaimRule(
    params: IamIdentityV1.DeleteClaimRuleParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'ruleId'];
    const _validParams = ['profileId', 'ruleId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
      'rule-id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteClaimRule');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/rules/{rule-id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Create link to a trusted profile.
   *
   * Create a direct link between a specific compute resource and a trusted profile, rather than creating conditions
   * that a compute resource must fulfill to apply a trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.crType - The compute resource type. Valid values are VSI, IKS_SA, ROKS_SA.
   * @param {CreateProfileLinkRequestLink} params.link - Link details.
   * @param {string} [params.name] - Optional name of the Link.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileLink>>}
   */
  public createLink(
    params: IamIdentityV1.CreateLinkParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileLink>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'crType', 'link'];
    const _validParams = ['profileId', 'crType', 'link', 'name', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cr_type': _params.crType,
      'link': _params.link,
      'name': _params.name,
    };

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createLink');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/links',
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
   * List links to a trusted profile.
   *
   * Get a list of links to a trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileLinkList>>}
   */
  public listLinks(
    params: IamIdentityV1.ListLinksParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileLinkList>> {
    const _params = { ...params };
    const _requiredParams = ['profileId'];
    const _validParams = ['profileId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listLinks');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/links',
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
   * Get link to a trusted profile.
   *
   * Get a specific link to a trusted profile by `link_id`.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.linkId - ID of the link.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileLink>>}
   */
  public getLink(
    params: IamIdentityV1.GetLinkParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileLink>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'linkId'];
    const _validParams = ['profileId', 'linkId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
      'link-id': _params.linkId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getLink');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/links/{link-id}',
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
   * Delete link to a trusted profile.
   *
   * Delete a link between a compute resource and a trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.linkId - ID of the link.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteLink(
    params: IamIdentityV1.DeleteLinkParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'linkId'];
    const _validParams = ['profileId', 'linkId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
      'link-id': _params.linkId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteLink');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/links/{link-id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a list of identities that can assume the trusted profile.
   *
   * Get a list of identities that can assume the trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentitiesResponse>>}
   */
  public getProfileIdentities(
    params: IamIdentityV1.GetProfileIdentitiesParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentitiesResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profileId'];
    const _validParams = ['profileId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getProfileIdentities');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/identities',
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
   * Update the list of identities that can assume the trusted profile.
   *
   * Update the list of identities that can assume the trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.ifMatch - Entity tag of the Identities to be updated. Specify the tag that you retrieved
   * when reading the Profile Identities. This value helps identify parallel usage of this API. Pass * to indicate
   * updating any available version, which may result in stale updates.
   * @param {ProfileIdentityRequest[]} [params.identities] - List of identities that can assume the trusted profile.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentitiesResponse>>}
   */
  public setProfileIdentities(
    params: IamIdentityV1.SetProfileIdentitiesParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentitiesResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'ifMatch'];
    const _validParams = ['profileId', 'ifMatch', 'identities', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'identities': _params.identities,
    };

    const path = {
      'profile-id': _params.profileId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'setProfileIdentities');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/identities',
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
   * Add a specific identity that can assume the trusted profile.
   *
   * Add a specific identity that can assume the trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.identityType - Type of the identity.
   * @param {string} params.identifier - Identifier of the identity that can assume the trusted profiles. This can be a
   * user identifier (IAM id), serviceid or crn. Internally it uses account id of the service id for the identifier
   * 'serviceid' and for the identifier 'crn' it uses account id contained in the CRN.
   * @param {string} params.type - Type of the identity.
   * @param {string[]} [params.accounts] - Only valid for the type user. Accounts from which a user can assume the
   * trusted profile.
   * @param {string} [params.description] - Description of the identity that can assume the trusted profile. This is
   * optional field for all the types of identities. When this field is not set for the identity type 'serviceid' then
   * the description of the service id is used. Description is recommended for the identity type 'crn' E.g. 'Instance
   * 1234 of IBM Cloud Service project'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentityResponse>>}
   */
  public setProfileIdentity(
    params: IamIdentityV1.SetProfileIdentityParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentityResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'identityType', 'identifier', 'type'];
    const _validParams = ['profileId', 'identityType', 'identifier', 'type', 'accounts', 'description', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'identifier': _params.identifier,
      'type': _params.type,
      'accounts': _params.accounts,
      'description': _params.description,
    };

    const path = {
      'profile-id': _params.profileId,
      'identity-type': _params.identityType,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'setProfileIdentity');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/identities/{identity-type}',
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
   * Get the identity that can assume the trusted profile.
   *
   * Get the identity that can assume the trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.identityType - Type of the identity.
   * @param {string} params.identifierId - Identifier of the identity that can assume the trusted profiles.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentityResponse>>}
   */
  public getProfileIdentity(
    params: IamIdentityV1.GetProfileIdentityParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ProfileIdentityResponse>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'identityType', 'identifierId'];
    const _validParams = ['profileId', 'identityType', 'identifierId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
      'identity-type': _params.identityType,
      'identifier-id': _params.identifierId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getProfileIdentity');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/identities/{identity-type}/{identifier-id}',
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
   * Delete the identity that can assume the trusted profile.
   *
   * Delete the identity that can assume the trusted profile.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.profileId - ID of the trusted profile.
   * @param {string} params.identityType - Type of the identity.
   * @param {string} params.identifierId - Identifier of the identity that can assume the trusted profiles.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteProfileIdentity(
    params: IamIdentityV1.DeleteProfileIdentityParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['profileId', 'identityType', 'identifierId'];
    const _validParams = ['profileId', 'identityType', 'identifierId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'profile-id': _params.profileId,
      'identity-type': _params.identityType,
      'identifier-id': _params.identifierId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteProfileIdentity');

    const parameters = {
      options: {
        url: '/v1/profiles/{profile-id}/identities/{identity-type}/{identifier-id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
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
   * Get account configurations.
   *
   * Returns the details of an account's configuration.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Unique ID of the account.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsResponse>>}
   */
  public getAccountSettings(
    params: IamIdentityV1.GetAccountSettingsParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getAccountSettings');

    const parameters = {
      options: {
        url: '/v1/accounts/{account_id}/settings/identity',
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
   * Update account configurations.
   *
   * Allows a user to configure settings on their account with regards to MFA, MFA excemption list, session lifetimes,
   * access control for creating new identities, and enforcing IP restrictions on token creation.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ifMatch - Version of the account settings to be updated. Specify the version that you
   * retrieved as entity_tag (ETag header) when reading the account. This value helps identifying parallel usage of this
   * API. Pass * to indicate to update any version available. This might result in stale updates.
   * @param {string} params.accountId - The id of the account to update the settings for.
   * @param {string} [params.restrictCreateServiceId] - Defines whether or not creating a service ID is access
   * controlled. Valid values:
   *   * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create service
   * IDs, including the account owner
   *   * NOT_RESTRICTED - all members of an account can create service IDs
   *   * NOT_SET - to 'unset' a previous set value.
   * @param {string} [params.restrictCreatePlatformApikey] - Defines whether or not creating platform API keys is access
   * controlled. Valid values:
   *   * RESTRICTED - only users assigned the 'User API key creator' role on the IAM Identity Service can create API
   * keys, including the account owner
   *   * NOT_RESTRICTED - all members of an account can create platform API keys
   *   * NOT_SET - to 'unset' a previous set value.
   * @param {string} [params.allowedIpAddresses] - Defines the IP addresses and subnets from which IAM tokens can be
   * created for the account.
   * @param {string} [params.mfa] - Defines the MFA trait for the account. Valid values:
   *   * NONE - No MFA trait set
   *   * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
   *   * TOTP - For all non-federated IBMId users
   *   * TOTP4ALL - For all users
   *   * LEVEL1 - Email-based MFA for all users
   *   * LEVEL2 - TOTP-based MFA for all users
   *   * LEVEL3 - U2F MFA for all users.
   * @param {AccountSettingsUserMFA[]} [params.userMfa] - List of users that are exempted from the MFA requirement of
   * the account.
   * @param {string} [params.sessionExpirationInSeconds] - Defines the session expiration in seconds for the account.
   * Valid values:
   *   * Any whole number between between '900' and '86400'
   *   * NOT_SET - To unset account setting and use service default.
   * @param {string} [params.sessionInvalidationInSeconds] - Defines the period of time in seconds in which a session
   * will be invalidated due to inactivity. Valid values:
   *   * Any whole number between '900' and '7200'
   *   * NOT_SET - To unset account setting and use service default.
   * @param {string} [params.maxSessionsPerIdentity] - Defines the max allowed sessions per identity required by the
   * account. Value values:
   *   * Any whole number greater than 0
   *   * NOT_SET - To unset account setting and use service default.
   * @param {string} [params.systemAccessTokenExpirationInSeconds] - Defines the access token expiration in seconds.
   * Valid values:
   *   * Any whole number between '900' and '3600'
   *   * NOT_SET - To unset account setting and use service default.
   * @param {string} [params.systemRefreshTokenExpirationInSeconds] - Defines the refresh token expiration in seconds.
   * Valid values:
   *   * Any whole number between '900' and '259200'
   *   * NOT_SET - To unset account setting and use service default.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsResponse>>}
   */
  public updateAccountSettings(
    params: IamIdentityV1.UpdateAccountSettingsParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['ifMatch', 'accountId'];
    const _validParams = ['ifMatch', 'accountId', 'restrictCreateServiceId', 'restrictCreatePlatformApikey', 'allowedIpAddresses', 'mfa', 'userMfa', 'sessionExpirationInSeconds', 'sessionInvalidationInSeconds', 'maxSessionsPerIdentity', 'systemAccessTokenExpirationInSeconds', 'systemRefreshTokenExpirationInSeconds', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'restrict_create_service_id': _params.restrictCreateServiceId,
      'restrict_create_platform_apikey': _params.restrictCreatePlatformApikey,
      'allowed_ip_addresses': _params.allowedIpAddresses,
      'mfa': _params.mfa,
      'user_mfa': _params.userMfa,
      'session_expiration_in_seconds': _params.sessionExpirationInSeconds,
      'session_invalidation_in_seconds': _params.sessionInvalidationInSeconds,
      'max_sessions_per_identity': _params.maxSessionsPerIdentity,
      'system_access_token_expiration_in_seconds': _params.systemAccessTokenExpirationInSeconds,
      'system_refresh_token_expiration_in_seconds': _params.systemRefreshTokenExpirationInSeconds,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateAccountSettings');

    const parameters = {
      options: {
        url: '/v1/accounts/{account_id}/settings/identity',
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
  /*************************
   * mFAEnrollmentStatus
   ************************/

  /**
   * Get MFA enrollment status for a single user in the account.
   *
   * Get MFA enrollment status for a single user in the account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - ID of the account.
   * @param {string} params.iamId - iam_id of the user. This user must be the member of the account.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.UserMfaEnrollments>>}
   */
  public getMfaStatus(
    params: IamIdentityV1.GetMfaStatusParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.UserMfaEnrollments>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'iamId'];
    const _validParams = ['accountId', 'iamId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'iam_id': _params.iamId,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getMfaStatus');

    const parameters = {
      options: {
        url: '/v1/mfa/accounts/{account_id}/status',
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
   * Trigger MFA enrollment status report for the account.
   *
   * Trigger MFA enrollment status report for the account by specifying the account ID. It can take a few minutes to
   * generate the report for retrieval.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - ID of the account.
   * @param {string} [params.type] - Optional report type. The supported value is 'mfa_status'. List MFA enrollment
   * status for all the identities.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ReportReference>>}
   */
  public createMfaReport(
    params: IamIdentityV1.CreateMfaReportParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ReportReference>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'type', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'type': _params.type,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createMfaReport');

    const parameters = {
      options: {
        url: '/v1/mfa/accounts/{account_id}/report',
        method: 'POST',
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
   * Get MFA enrollment status report for the account.
   *
   * Get MFA enrollment status report for the account by specifying the account ID and the reference that is generated
   * by triggering the report. Reports older than a day are deleted when generating a new report.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - ID of the account.
   * @param {string} params.reference - Reference for the report to be generated, You can use 'latest' to get the latest
   * report for the given account.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ReportMfaEnrollmentStatus>>}
   */
  public getMfaReport(
    params: IamIdentityV1.GetMfaReportParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ReportMfaEnrollmentStatus>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'reference'];
    const _validParams = ['accountId', 'reference', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
      'reference': _params.reference,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getMfaReport');

    const parameters = {
      options: {
        url: '/v1/mfa/accounts/{account_id}/report/{reference}',
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
  /*************************
   * accountSettingsAssignments
   ************************/

  /**
   * List assignments.
   *
   * List account settings assignments.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the Assignments to query. This parameter is required unless
   * using a pagetoken.
   * @param {string} [params.templateId] - Filter results by Template Id.
   * @param {string} [params.templateVersion] - Filter results Template Version.
   * @param {string} [params.target] - Filter results by the assignment target.
   * @param {string} [params.targetType] - Filter results by the assignment's target type.
   * @param {number} [params.limit] - Optional size of a single page. Default is 20 items per page. Valid range is 1 to
   * 100.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - If specified, the items are sorted by the value of this property.
   * @param {string} [params.order] - Sort order.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentListResponse>>}
   */
  public listAccountSettingsAssignments(
    params?: IamIdentityV1.ListAccountSettingsAssignmentsParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentListResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'templateId', 'templateVersion', 'target', 'targetType', 'limit', 'pagetoken', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'template_id': _params.templateId,
      'template_version': _params.templateVersion,
      'target': _params.target,
      'target_type': _params.targetType,
      'limit': _params.limit,
      'pagetoken': _params.pagetoken,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listAccountSettingsAssignments');

    const parameters = {
      options: {
        url: '/v1/account_settings_assignments/',
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
   * Create assignment.
   *
   * Create an assigment for an account settings template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template to assign.
   * @param {number} params.templateVersion - Version of the template to assign.
   * @param {string} params.targetType - Type of target to deploy to.
   * @param {string} params.target - Identifier of target to deploy to.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>>}
   */
  public createAccountSettingsAssignment(
    params: IamIdentityV1.CreateAccountSettingsAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'templateVersion', 'targetType', 'target'];
    const _validParams = ['templateId', 'templateVersion', 'targetType', 'target', 'headers'];
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createAccountSettingsAssignment');

    const parameters = {
      options: {
        url: '/v1/account_settings_assignments/',
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
   * Get assignment.
   *
   * Get an assigment for an account settings template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - ID of the Assignment Record.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>>}
   */
  public getAccountSettingsAssignment(
    params: IamIdentityV1.GetAccountSettingsAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getAccountSettingsAssignment');

    const parameters = {
      options: {
        url: '/v1/account_settings_assignments/{assignment_id}',
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
   * Delete assignment.
   *
   * Delete an account settings template assignment. This removes any IAM resources created by this assignment in child
   * accounts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - ID of the Assignment Record.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ExceptionResponse>>}
   */
  public deleteAccountSettingsAssignment(
    params: IamIdentityV1.DeleteAccountSettingsAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ExceptionResponse>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAccountSettingsAssignment');

    const parameters = {
      options: {
        url: '/v1/account_settings_assignments/{assignment_id}',
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
   * Update assignment.
   *
   * Update an account settings assignment. Call this method to retry failed assignments or migrate the settings in
   * child accounts to a new version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - ID of the Assignment Record.
   * @param {string} params.ifMatch - Version of the assignment to be updated. Specify the version that you retrieved
   * when reading the assignment. This value  helps identifying parallel usage of this API. Pass * to indicate to update
   * any version available. This might result in stale updates.
   * @param {number} params.templateVersion - Template version to be applied to the assignment. To retry all failed
   * assignments, provide the existing version. To migrate to a different version, provide the new version number.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>>}
   */
  public updateAccountSettingsAssignment(
    params: IamIdentityV1.UpdateAccountSettingsAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateAccountSettingsAssignment');

    const parameters = {
      options: {
        url: '/v1/account_settings_assignments/{assignment_id}',
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
   * accountSettingsTemplate
   ************************/

  /**
   * List account settings templates.
   *
   * List account settings templates in an enterprise account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the account settings templates to query. This parameter is
   * required unless using a pagetoken.
   * @param {string} [params.limit] - Optional size of a single page.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - Optional sort property. If specified, the returned templated are sorted according
   * to this property.
   * @param {string} [params.order] - Optional sort order.
   * @param {string} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateList>>}
   */
  public listAccountSettingsTemplates(
    params?: IamIdentityV1.ListAccountSettingsTemplatesParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'limit', 'pagetoken', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'limit': _params.limit,
      'pagetoken': _params.pagetoken,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listAccountSettingsTemplates');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates',
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
   * Create an account settings template.
   *
   * Create a new account settings template in an enterprise account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - ID of the account where the template resides.
   * @param {string} [params.name] - The name of the trusted profile template. This is visible only in the enterprise
   * account.
   * @param {string} [params.description] - The description of the trusted profile template. Describe the template for
   * enterprise account users.
   * @param {AccountSettingsComponent} [params.accountSettings] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>>}
   */
  public createAccountSettingsTemplate(
    params?: IamIdentityV1.CreateAccountSettingsTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'name', 'description', 'accountSettings', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'name': _params.name,
      'description': _params.description,
      'account_settings': _params.accountSettings,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createAccountSettingsTemplate');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates',
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
   * Get latest version of an account settings template.
   *
   * Get the latest version of a specific account settings template in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>>}
   */
  public getLatestAccountSettingsTemplateVersion(
    params: IamIdentityV1.GetLatestAccountSettingsTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getLatestAccountSettingsTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}',
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
   * Delete all versions of an account settings template.
   *
   * Delete all versions of an account settings template in an enterprise account. If any version is assigned to child
   * accounts, you must first delete the assignment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteAllVersionsOfAccountSettingsTemplate(
    params: IamIdentityV1.DeleteAllVersionsOfAccountSettingsTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAllVersionsOfAccountSettingsTemplate');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List account settings template versions.
   *
   * List the versions of a specific account settings template in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {string} [params.limit] - Optional size of a single page.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - Optional sort property. If specified, the returned templated are sorted according
   * to this property.
   * @param {string} [params.order] - Optional sort order.
   * @param {string} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateList>>}
   */
  public listVersionsOfAccountSettingsTemplate(
    params: IamIdentityV1.ListVersionsOfAccountSettingsTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateList>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'limit', 'pagetoken', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'pagetoken': _params.pagetoken,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listVersionsOfAccountSettingsTemplate');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}/versions',
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
   * Create a new version of an account settings template.
   *
   * Create a new version of an account settings template in an Enterprise Account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {string} [params.accountId] - ID of the account where the template resides.
   * @param {string} [params.name] - The name of the trusted profile template. This is visible only in the enterprise
   * account.
   * @param {string} [params.description] - The description of the trusted profile template. Describe the template for
   * enterprise account users.
   * @param {AccountSettingsComponent} [params.accountSettings] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>>}
   */
  public createAccountSettingsTemplateVersion(
    params: IamIdentityV1.CreateAccountSettingsTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'accountId', 'name', 'description', 'accountSettings', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'name': _params.name,
      'description': _params.description,
      'account_settings': _params.accountSettings,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createAccountSettingsTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}/versions',
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
   * Get version of an account settings template.
   *
   * Get a specific version of an account settings template in an Enterprise Account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {string} params.version - Version of the account settings template.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>>}
   */
  public getAccountSettingsTemplateVersion(
    params: IamIdentityV1.GetAccountSettingsTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'version'];
    const _validParams = ['templateId', 'version', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getAccountSettingsTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}/versions/{version}',
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
   * Update version of an account settings template.
   *
   * Update a specific version of an account settings template in an Enterprise Account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ifMatch - Entity tag of the Template to be updated. Specify the tag that you retrieved when
   * reading the account settings template. This value helps identifying parallel usage of this API. Pass * to indicate
   * to update any version available. This might result in stale updates.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {string} params.version - Version of the account settings template.
   * @param {string} [params.accountId] - ID of the account where the template resides.
   * @param {string} [params.name] - The name of the trusted profile template. This is visible only in the enterprise
   * account.
   * @param {string} [params.description] - The description of the trusted profile template. Describe the template for
   * enterprise account users.
   * @param {AccountSettingsComponent} [params.accountSettings] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>>}
   */
  public updateAccountSettingsTemplateVersion(
    params: IamIdentityV1.UpdateAccountSettingsTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.AccountSettingsTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['ifMatch', 'templateId', 'version'];
    const _validParams = ['ifMatch', 'templateId', 'version', 'accountId', 'name', 'description', 'accountSettings', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'name': _params.name,
      'description': _params.description,
      'account_settings': _params.accountSettings,
    };

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateAccountSettingsTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}/versions/{version}',
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
   * Delete version of an account settings template.
   *
   * Delete a specific version of an account settings template in an Enterprise Account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {string} params.version - Version of the account settings template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteAccountSettingsTemplateVersion(
    params: IamIdentityV1.DeleteAccountSettingsTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'version'];
    const _validParams = ['templateId', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAccountSettingsTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}/versions/{version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Commit a template version.
   *
   * Commit a specific version of an account settings template in an Enterprise Account. A Template must be committed
   * before being assigned, and once committed, can no longer be modified.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the account settings template.
   * @param {string} params.version - Version of the account settings template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public commitAccountSettingsTemplate(
    params: IamIdentityV1.CommitAccountSettingsTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'version'];
    const _validParams = ['templateId', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'commitAccountSettingsTemplate');

    const parameters = {
      options: {
        url: '/v1/account_settings_templates/{template_id}/versions/{version}/commit',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * activityOperations
   ************************/

  /**
   * Trigger activity report for the account.
   *
   * Trigger activity report for the account by specifying the account ID. It can take a few minutes to generate the
   * report for retrieval.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - ID of the account.
   * @param {string} [params.type] - Optional report type. The supported value is 'inactive'. List all identities that
   * have not authenticated within the time indicated by duration.
   * @param {string} [params.duration] - Optional duration of the report. The supported unit of duration is hours.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ReportReference>>}
   */
  public createReport(
    params: IamIdentityV1.CreateReportParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ReportReference>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'type', 'duration', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'type': _params.type,
      'duration': _params.duration,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createReport');

    const parameters = {
      options: {
        url: '/v1/activity/accounts/{account_id}/report',
        method: 'POST',
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
   * Get activity report for the account.
   *
   * Get activity report for the account by specifying the account ID and the reference that is generated by triggering
   * the report. Reports older than a day are deleted when generating a new report.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - ID of the account.
   * @param {string} params.reference - Reference for the report to be generated, You can use 'latest' to get the latest
   * report for the given account.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.Report>>}
   */
  public getReport(
    params: IamIdentityV1.GetReportParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.Report>> {
    const _params = { ...params };
    const _requiredParams = ['accountId', 'reference'];
    const _validParams = ['accountId', 'reference', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
      'reference': _params.reference,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getReport');

    const parameters = {
      options: {
        url: '/v1/activity/accounts/{account_id}/report/{reference}',
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
  /*************************
   * effectiveAccountSettings
   ************************/

  /**
   * Get effective account settings configuration.
   *
   * Returns effective account settings for given account ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - Unique ID of the account.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {boolean} [params.resolveUserMfa] - Enrich MFA exemptions with user information.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EffectiveAccountSettingsResponse>>}
   */
  public getEffectiveAccountSettings(
    params: IamIdentityV1.GetEffectiveAccountSettingsParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EffectiveAccountSettingsResponse>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'includeHistory', 'resolveUserMfa', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
      'resolve_user_mfa': _params.resolveUserMfa,
    };

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getEffectiveAccountSettings');

    const parameters = {
      options: {
        url: '/v1/accounts/{account_id}/effective_settings/identity',
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
   * trustedProfileAssignments
   ************************/

  /**
   * List assignments.
   *
   * List trusted profile template assignments.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the Assignments to query. This parameter is required unless
   * using a pagetoken.
   * @param {string} [params.templateId] - Filter results by Template Id.
   * @param {string} [params.templateVersion] - Filter results Template Version.
   * @param {string} [params.target] - Filter results by the assignment target.
   * @param {string} [params.targetType] - Filter results by the assignment's target type.
   * @param {number} [params.limit] - Optional size of a single page. Default is 20 items per page. Valid range is 1 to
   * 100.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - If specified, the items are sorted by the value of this property.
   * @param {string} [params.order] - Sort order.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentListResponse>>}
   */
  public listTrustedProfileAssignments(
    params?: IamIdentityV1.ListTrustedProfileAssignmentsParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentListResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'templateId', 'templateVersion', 'target', 'targetType', 'limit', 'pagetoken', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'template_id': _params.templateId,
      'template_version': _params.templateVersion,
      'target': _params.target,
      'target_type': _params.targetType,
      'limit': _params.limit,
      'pagetoken': _params.pagetoken,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listTrustedProfileAssignments');

    const parameters = {
      options: {
        url: '/v1/profile_assignments/',
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
   * Create assignment.
   *
   * Create an assigment for a trusted profile template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the template to assign.
   * @param {number} params.templateVersion - Version of the template to assign.
   * @param {string} params.targetType - Type of target to deploy to.
   * @param {string} params.target - Identifier of target to deploy to.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>>}
   */
  public createTrustedProfileAssignment(
    params: IamIdentityV1.CreateTrustedProfileAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'templateVersion', 'targetType', 'target'];
    const _validParams = ['templateId', 'templateVersion', 'targetType', 'target', 'headers'];
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createTrustedProfileAssignment');

    const parameters = {
      options: {
        url: '/v1/profile_assignments/',
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
   * Get assignment.
   *
   * Get an assigment for a trusted profile template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - ID of the Assignment Record.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>>}
   */
  public getTrustedProfileAssignment(
    params: IamIdentityV1.GetTrustedProfileAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getTrustedProfileAssignment');

    const parameters = {
      options: {
        url: '/v1/profile_assignments/{assignment_id}',
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
   * Delete assignment.
   *
   * Delete a trusted profile assignment. This removes any IAM resources created by this assignment in child accounts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - ID of the Assignment Record.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.ExceptionResponse>>}
   */
  public deleteTrustedProfileAssignment(
    params: IamIdentityV1.DeleteTrustedProfileAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.ExceptionResponse>> {
    const _params = { ...params };
    const _requiredParams = ['assignmentId'];
    const _validParams = ['assignmentId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'assignment_id': _params.assignmentId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTrustedProfileAssignment');

    const parameters = {
      options: {
        url: '/v1/profile_assignments/{assignment_id}',
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
   * Update assignment.
   *
   * Update a trusted profile assignment. Call this method to retry failed assignments or migrate the trusted profile in
   * child accounts to a new version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.assignmentId - ID of the Assignment Record.
   * @param {string} params.ifMatch - Version of the Assignment to be updated. Specify the version that you retrieved
   * when reading the Assignment. This value  helps identifying parallel usage of this API. Pass * to indicate to update
   * any version available. This might result in stale updates.
   * @param {number} params.templateVersion - Template version to be applied to the assignment. To retry all failed
   * assignments, provide the existing version. To migrate to a different version, provide the new version number.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>>}
   */
  public updateTrustedProfileAssignment(
    params: IamIdentityV1.UpdateTrustedProfileAssignmentParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TemplateAssignmentResponse>> {
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

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateTrustedProfileAssignment');

    const parameters = {
      options: {
        url: '/v1/profile_assignments/{assignment_id}',
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
   * trustedProfileTemplate
   ************************/

  /**
   * List trusted profile templates.
   *
   * List the trusted profile templates in an enterprise account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - Account ID of the trusted profile templates to query. This parameter is
   * required unless using a pagetoken.
   * @param {string} [params.limit] - Optional size of a single page.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - Optional sort property. If specified, the returned templates are sorted according
   * to this property.
   * @param {string} [params.order] - Optional sort order.
   * @param {string} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateList>>}
   */
  public listProfileTemplates(
    params?: IamIdentityV1.ListProfileTemplatesParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'limit', 'pagetoken', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'limit': _params.limit,
      'pagetoken': _params.pagetoken,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listProfileTemplates');

    const parameters = {
      options: {
        url: '/v1/profile_templates',
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
   * Create a trusted profile template.
   *
   * Create a new trusted profile template in an enterprise account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.accountId] - ID of the account where the template resides.
   * @param {string} [params.name] - The name of the trusted profile template. This is visible only in the enterprise
   * account. Required field when creating a new template. Otherwise this field is optional. If the field is included it
   * will change the name value for all existing versions of the template.
   * @param {string} [params.description] - The description of the trusted profile template. Describe the template for
   * enterprise account users.
   * @param {TemplateProfileComponentRequest} [params.profile] - Input body parameters for the TemplateProfileComponent.
   * @param {PolicyTemplateReference[]} [params.policyTemplateReferences] - Existing policy templates that you can
   * reference to assign access in the trusted profile component.
   * @param {ActionControls} [params.actionControls] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>>}
   */
  public createProfileTemplate(
    params?: IamIdentityV1.CreateProfileTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['accountId', 'name', 'description', 'profile', 'policyTemplateReferences', 'actionControls', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'name': _params.name,
      'description': _params.description,
      'profile': _params.profile,
      'policy_template_references': _params.policyTemplateReferences,
      'action_controls': _params.actionControls,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createProfileTemplate');

    const parameters = {
      options: {
        url: '/v1/profile_templates',
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
   * Get latest version of a trusted profile template.
   *
   * Get the latest version of a trusted profile template in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>>}
   */
  public getLatestProfileTemplateVersion(
    params: IamIdentityV1.GetLatestProfileTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getLatestProfileTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}',
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
   * Delete all versions of a trusted profile template.
   *
   * Delete all versions of a trusted profile template in an enterprise account. If any version is assigned to child
   * accounts, you must first delete the assignment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteAllVersionsOfProfileTemplate(
    params: IamIdentityV1.DeleteAllVersionsOfProfileTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteAllVersionsOfProfileTemplate');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List trusted profile template versions.
   *
   * List the versions of a trusted profile template in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {string} [params.limit] - Optional size of a single page.
   * @param {string} [params.pagetoken] - Optional Prev or Next page token returned from a previous query execution.
   * Default is start with first page.
   * @param {string} [params.sort] - Optional sort property. If specified, the returned templated are sorted according
   * to this property.
   * @param {string} [params.order] - Optional sort order.
   * @param {string} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateList>>}
   */
  public listVersionsOfProfileTemplate(
    params: IamIdentityV1.ListVersionsOfProfileTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateList>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'limit', 'pagetoken', 'sort', 'order', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'pagetoken': _params.pagetoken,
      'sort': _params.sort,
      'order': _params.order,
      'include_history': _params.includeHistory,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'listVersionsOfProfileTemplate');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}/versions',
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
   * Create new version of a trusted profile template.
   *
   * Create a new version of a trusted profile template in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {string} [params.accountId] - ID of the account where the template resides.
   * @param {string} [params.name] - The name of the trusted profile template. This is visible only in the enterprise
   * account. Required field when creating a new template. Otherwise this field is optional. If the field is included it
   * will change the name value for all existing versions of the template.
   * @param {string} [params.description] - The description of the trusted profile template. Describe the template for
   * enterprise account users.
   * @param {TemplateProfileComponentRequest} [params.profile] - Input body parameters for the TemplateProfileComponent.
   * @param {PolicyTemplateReference[]} [params.policyTemplateReferences] - Existing policy templates that you can
   * reference to assign access in the trusted profile component.
   * @param {ActionControls} [params.actionControls] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>>}
   */
  public createProfileTemplateVersion(
    params: IamIdentityV1.CreateProfileTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId'];
    const _validParams = ['templateId', 'accountId', 'name', 'description', 'profile', 'policyTemplateReferences', 'actionControls', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'name': _params.name,
      'description': _params.description,
      'profile': _params.profile,
      'policy_template_references': _params.policyTemplateReferences,
      'action_controls': _params.actionControls,
    };

    const path = {
      'template_id': _params.templateId,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'createProfileTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}/versions',
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
   * Get version of trusted profile template.
   *
   * Get a specific version of a trusted profile template in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {string} params.version - Version of the Profile Template.
   * @param {boolean} [params.includeHistory] - Defines if the entity history is included in the response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>>}
   */
  public getProfileTemplateVersion(
    params: IamIdentityV1.GetProfileTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'version'];
    const _validParams = ['templateId', 'version', 'includeHistory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'include_history': _params.includeHistory,
    };

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'getProfileTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}/versions/{version}',
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
   * Update version of trusted profile template.
   *
   * Update a specific version of a trusted profile template in an enterprise account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ifMatch - Entity tag of the Template to be updated. Specify the tag that you retrieved when
   * reading the Profile Template. This value helps identifying parallel usage of this API. Pass * to indicate to update
   * any version available. This might result in stale updates.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {string} params.version - Version of the Profile Template.
   * @param {string} [params.accountId] - ID of the account where the template resides.
   * @param {string} [params.name] - The name of the trusted profile template. This is visible only in the enterprise
   * account. Required field when creating a new template. Otherwise this field is optional. If the field is included it
   * will change the name value for all existing versions of the template.
   * @param {string} [params.description] - The description of the trusted profile template. Describe the template for
   * enterprise account users.
   * @param {TemplateProfileComponentRequest} [params.profile] - Input body parameters for the TemplateProfileComponent.
   * @param {PolicyTemplateReference[]} [params.policyTemplateReferences] - Existing policy templates that you can
   * reference to assign access in the trusted profile component.
   * @param {ActionControls} [params.actionControls] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>>}
   */
  public updateProfileTemplateVersion(
    params: IamIdentityV1.UpdateProfileTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.TrustedProfileTemplateResponse>> {
    const _params = { ...params };
    const _requiredParams = ['ifMatch', 'templateId', 'version'];
    const _validParams = ['ifMatch', 'templateId', 'version', 'accountId', 'name', 'description', 'profile', 'policyTemplateReferences', 'actionControls', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'account_id': _params.accountId,
      'name': _params.name,
      'description': _params.description,
      'profile': _params.profile,
      'policy_template_references': _params.policyTemplateReferences,
      'action_controls': _params.actionControls,
    };

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'updateProfileTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}/versions/{version}',
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
   * Delete version of trusted profile template.
   *
   * Delete a specific version of a trusted profile template in an enterprise account. If the version is assigned to
   * child accounts, you must first delete the assignment.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {string} params.version - Version of the Profile Template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public deleteProfileTemplateVersion(
    params: IamIdentityV1.DeleteProfileTemplateVersionParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'version'];
    const _validParams = ['templateId', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteProfileTemplateVersion');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}/versions/{version}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Commit a template version.
   *
   * Commit a specific version of a trusted profile template in an enterprise account. You must commit a template before
   * you can assign it to child accounts. Once a template is committed, you can no longer modify the template.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.templateId - ID of the trusted profile template.
   * @param {string} params.version - Version of the Profile Template.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>>}
   */
  public commitProfileTemplate(
    params: IamIdentityV1.CommitProfileTemplateParams
  ): Promise<IamIdentityV1.Response<IamIdentityV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['templateId', 'version'];
    const _validParams = ['templateId', 'version', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'template_id': _params.templateId,
      'version': _params.version,
    };

    const sdkHeaders = getSdkHeaders(IamIdentityV1.DEFAULT_SERVICE_NAME, 'v1', 'commitProfileTemplate');

    const parameters = {
      options: {
        url: '/v1/profile_templates/{template_id}/versions/{version}/commit',
        method: 'POST',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
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

namespace IamIdentityV1 {
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

  /** Parameters for the `listApiKeys` operation. */
  export interface ListApiKeysParams {
    /** Account ID of the API keys to query. If a service IAM ID is specified in iam_id then account_id must match
     *  the account of the IAM ID. If a user IAM ID is specified in iam_id then then account_id must match the account
     *  of the Authorization token.
     */
    accountId?: string;
    /** IAM ID of the API keys to be queried. The IAM ID may be that of a user or a service. For a user IAM ID
     *  iam_id must match the Authorization token.
     */
    iamId?: string;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    pagesize?: number;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** Optional parameter to define the scope of the queried API keys. Can be 'entity' (default) or 'account'. */
    scope?: ListApiKeysConstants.Scope | string;
    /** Optional parameter to filter the type of the queried API keys. Can be 'user' or 'serviceid'. */
    type?: ListApiKeysConstants.Type | string;
    /** Optional sort property, valid values are name, description, created_at and created_by. If specified, the
     *  items are sorted by the value of this property.
     */
    sort?: string;
    /** Optional sort order, valid values are asc and desc. Default: asc. */
    order?: ListApiKeysConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listApiKeys` operation. */
  export namespace ListApiKeysConstants {
    /** Optional parameter to define the scope of the queried API keys. Can be 'entity' (default) or 'account'. */
    export enum Scope {
      ENTITY = 'entity',
      ACCOUNT = 'account',
    }
    /** Optional parameter to filter the type of the queried API keys. Can be 'user' or 'serviceid'. */
    export enum Type {
      USER = 'user',
      SERVICEID = 'serviceid',
    }
    /** Optional sort order, valid values are asc and desc. Default: asc. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createApiKey` operation. */
  export interface CreateApiKeyParams {
    /** Name of the API key. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the API key.
     */
    name: string;
    /** The iam_id that this API key authenticates. */
    iamId: string;
    /** The optional description of the API key. The 'description' property is only available if a description was
     *  provided during a create of an API key.
     */
    description?: string;
    /** The account ID of the API key. */
    accountId?: string;
    /** You can optionally passthrough the API key value for this API key. If passed, a minimum length validation of
     *  32 characters for that apiKey value is done, i.e. the value can contain any characters and can even be non-URL
     *  safe, but the minimum length requirement must be met. If omitted, the API key management will create an URL safe
     *  opaque API key value. The value of the API key is checked for uniqueness. Ensure enough variations when passing
     *  in this value.
     */
    apikey?: string;
    /** Send true or false to set whether the API key value is retrievable in the future by using the Get details of
     *  an API key request. If you create an API key for a user, you must specify `false` or omit the value. We don't
     *  allow storing of API keys for users.
     */
    storeValue?: boolean;
    /** Defines if the API key supports sessions. Sessions are only supported for user apikeys. */
    supportSessions?: boolean;
    /** Defines the action to take when API key is leaked, valid values are 'none', 'disable' and 'delete'. */
    actionWhenLeaked?: string;
    /** Indicates if the API key is locked for further write operations. False by default. */
    entityLock?: string;
    /** Indicates if the API key is disabled. False by default. */
    entityDisable?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getApiKeysDetails` operation. */
  export interface GetApiKeysDetailsParams {
    /** API key value. */
    iamApiKey?: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getApiKey` operation. */
  export interface GetApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    /** Defines if the entity's activity is included in the response. Retrieving activity data is an expensive
     *  operation, so only request this when needed.
     */
    includeActivity?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateApiKey` operation. */
  export interface UpdateApiKeyParams {
    /** Unique ID of the API key to be updated. */
    id: string;
    /** Version of the API key to be updated. Specify the version that you retrieved when reading the API key. This
     *  value helps identifying parallel usage of this API. Pass * to indicate to update any version available. This
     *  might result in stale updates.
     */
    ifMatch: string;
    /** The name of the API key to update. If specified in the request the parameter must not be empty. The name is
     *  not checked for uniqueness. Failure to this will result in an Error condition.
     */
    name?: string;
    /** The description of the API key to update. If specified an empty description will clear the description of
     *  the API key. If a non empty value is provided the API key will be updated.
     */
    description?: string;
    /** Defines if the API key supports sessions. Sessions are only supported for user apikeys. */
    supportSessions?: boolean;
    /** Defines the action to take when API key is leaked, valid values are 'none', 'disable' and 'delete'. */
    actionWhenLeaked?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteApiKey` operation. */
  export interface DeleteApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `lockApiKey` operation. */
  export interface LockApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `unlockApiKey` operation. */
  export interface UnlockApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `disableApiKey` operation. */
  export interface DisableApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `enableApiKey` operation. */
  export interface EnableApiKeyParams {
    /** Unique ID of the API key. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listServiceIds` operation. */
  export interface ListServiceIdsParams {
    /** Account ID of the service ID(s) to query. This parameter is required (unless using a pagetoken). */
    accountId?: string;
    /** Name of the service ID(s) to query. Optional.20 items per page. Valid range is 1 to 100. */
    name?: string;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    pagesize?: number;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** Optional sort property, valid values are name, description, created_at and modified_at. If specified, the
     *  items are sorted by the value of this property.
     */
    sort?: string;
    /** Optional sort order, valid values are asc and desc. Default: asc. */
    order?: ListServiceIdsConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listServiceIds` operation. */
  export namespace ListServiceIdsConstants {
    /** Optional sort order, valid values are asc and desc. Default: asc. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createServiceId` operation. */
  export interface CreateServiceIdParams {
    /** ID of the account the service ID belongs to. */
    accountId: string;
    /** Name of the Service Id. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the Service Id.
     */
    name: string;
    /** The optional description of the Service Id. The 'description' property is only available if a description
     *  was provided during a create of a Service Id.
     */
    description?: string;
    /** Optional list of CRNs (string array) which point to the services connected to the service ID. */
    uniqueInstanceCrns?: string[];
    /** Parameters for the API key in the Create service Id V1 REST request. */
    apikey?: ApiKeyInsideCreateServiceIdRequest;
    /** Indicates if the service ID is locked for further write operations. False by default. */
    entityLock?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getServiceId` operation. */
  export interface GetServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    /** Defines if the entity's activity is included in the response. Retrieving activity data is an expensive
     *  operation, so only request this when needed.
     */
    includeActivity?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateServiceId` operation. */
  export interface UpdateServiceIdParams {
    /** Unique ID of the service ID to be updated. */
    id: string;
    /** Version of the service ID to be updated. Specify the version that you retrieved as entity_tag (ETag header)
     *  when reading the service ID. This value helps identifying parallel usage of this API. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** The name of the service ID to update. If specified in the request the parameter must not be empty. The name
     *  is not checked for uniqueness. Failure to this will result in an Error condition.
     */
    name?: string;
    /** The description of the service ID to update. If specified an empty description will clear the description of
     *  the service ID. If an non empty value is provided the service ID will be updated.
     */
    description?: string;
    /** List of CRNs which point to the services connected to this service ID. If specified an empty list will clear
     *  all existing unique instance crns of the service ID.
     */
    uniqueInstanceCrns?: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteServiceId` operation. */
  export interface DeleteServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `lockServiceId` operation. */
  export interface LockServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `unlockServiceId` operation. */
  export interface UnlockServiceIdParams {
    /** Unique ID of the service ID. */
    id: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createProfile` operation. */
  export interface CreateProfileParams {
    /** Name of the trusted profile. The name is checked for uniqueness. Therefore trusted profiles with the same
     *  names can not exist in the same account.
     */
    name: string;
    /** The account ID of the trusted profile. */
    accountId: string;
    /** The optional description of the trusted profile. The 'description' property is only available if a
     *  description was provided during creation of trusted profile.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProfiles` operation. */
  export interface ListProfilesParams {
    /** Account ID to query for trusted profiles. */
    accountId: string;
    /** Name of the trusted profile to query. */
    name?: string;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    pagesize?: number;
    /** Optional sort property, valid values are name, description, created_at and modified_at. If specified, the
     *  items are sorted by the value of this property.
     */
    sort?: string;
    /** Optional sort order, valid values are asc and desc. Default: asc. */
    order?: ListProfilesConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listProfiles` operation. */
  export namespace ListProfilesConstants {
    /** Optional sort order, valid values are asc and desc. Default: asc. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `getProfile` operation. */
  export interface GetProfileParams {
    /** ID of the trusted profile to get. */
    profileId: string;
    /** Defines if the entity's activity is included in the response. Retrieving activity data is an expensive
     *  operation, so only request this when needed.
     */
    includeActivity?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProfile` operation. */
  export interface UpdateProfileParams {
    /** ID of the trusted profile to be updated. */
    profileId: string;
    /** Version of the trusted profile to be updated. Specify the version that you retrived when reading list of
     *  trusted profiles. This value helps to identify any parallel usage of trusted profile. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** The name of the trusted profile to update. If specified in the request the parameter must not be empty. The
     *  name is checked for uniqueness. Failure to this will result in an Error condition.
     */
    name?: string;
    /** The description of the trusted profile to update. If specified an empty description will clear the
     *  description of the trusted profile. If a non empty value is provided the trusted profile will be updated.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProfile` operation. */
  export interface DeleteProfileParams {
    /** ID of the trusted profile. */
    profileId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createClaimRule` operation. */
  export interface CreateClaimRuleParams {
    /** ID of the trusted profile to create a claim rule. */
    profileId: string;
    /** Type of the claim rule, either 'Profile-SAML' or 'Profile-CR'. */
    type: string;
    /** Conditions of this claim rule. */
    conditions: ProfileClaimRuleConditions[];
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Name of the claim rule to be created or updated. */
    name?: string;
    /** The realm name of the Idp this claim rule applies to. This field is required only if the type is specified
     *  as 'Profile-SAML'.
     */
    realmName?: string;
    /** The compute resource type the rule applies to, required only if type is specified as 'Profile-CR'. Valid
     *  values are VSI, IKS_SA, ROKS_SA.
     */
    crType?: string;
    /** Session expiration in seconds, only required if type is 'Profile-SAML'. */
    expiration?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listClaimRules` operation. */
  export interface ListClaimRulesParams {
    /** ID of the trusted profile. */
    profileId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getClaimRule` operation. */
  export interface GetClaimRuleParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** ID of the claim rule to get. */
    ruleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateClaimRule` operation. */
  export interface UpdateClaimRuleParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** ID of the claim rule to update. */
    ruleId: string;
    /** Version of the claim rule to be updated. Specify the version that you retrived when reading list of claim
     *  rules. This value helps to identify any parallel usage of claim rule. Pass * to indicate to update any version
     *  available. This might result in stale updates.
     */
    ifMatch: string;
    /** Type of the claim rule, either 'Profile-SAML' or 'Profile-CR'. */
    type: string;
    /** Conditions of this claim rule. */
    conditions: ProfileClaimRuleConditions[];
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Name of the claim rule to be created or updated. */
    name?: string;
    /** The realm name of the Idp this claim rule applies to. This field is required only if the type is specified
     *  as 'Profile-SAML'.
     */
    realmName?: string;
    /** The compute resource type the rule applies to, required only if type is specified as 'Profile-CR'. Valid
     *  values are VSI, IKS_SA, ROKS_SA.
     */
    crType?: string;
    /** Session expiration in seconds, only required if type is 'Profile-SAML'. */
    expiration?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteClaimRule` operation. */
  export interface DeleteClaimRuleParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** ID of the claim rule to delete. */
    ruleId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createLink` operation. */
  export interface CreateLinkParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** The compute resource type. Valid values are VSI, IKS_SA, ROKS_SA. */
    crType: string;
    /** Link details. */
    link: CreateProfileLinkRequestLink;
    /** Optional name of the Link. */
    name?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listLinks` operation. */
  export interface ListLinksParams {
    /** ID of the trusted profile. */
    profileId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLink` operation. */
  export interface GetLinkParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** ID of the link. */
    linkId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteLink` operation. */
  export interface DeleteLinkParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** ID of the link. */
    linkId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProfileIdentities` operation. */
  export interface GetProfileIdentitiesParams {
    /** ID of the trusted profile. */
    profileId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setProfileIdentities` operation. */
  export interface SetProfileIdentitiesParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** Entity tag of the Identities to be updated. Specify the tag that you retrieved when reading the Profile
     *  Identities. This value helps identify parallel usage of this API. Pass * to indicate updating any available
     *  version, which may result in stale updates.
     */
    ifMatch: string;
    /** List of identities that can assume the trusted profile. */
    identities?: ProfileIdentityRequest[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setProfileIdentity` operation. */
  export interface SetProfileIdentityParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** Type of the identity. */
    identityType: SetProfileIdentityConstants.IdentityType | string;
    /** Identifier of the identity that can assume the trusted profiles. This can be a user identifier (IAM id),
     *  serviceid or crn. Internally it uses account id of the service id for the identifier 'serviceid' and for the
     *  identifier 'crn' it uses account id contained in the CRN.
     */
    identifier: string;
    /** Type of the identity. */
    type: SetProfileIdentityConstants.Type | string;
    /** Only valid for the type user. Accounts from which a user can assume the trusted profile. */
    accounts?: string[];
    /** Description of the identity that can assume the trusted profile. This is optional field for all the types of
     *  identities. When this field is not set for the identity type 'serviceid' then the description of the service id
     *  is used. Description is recommended for the identity type 'crn' E.g. 'Instance 1234 of IBM Cloud Service
     *  project'.
     */
    description?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `setProfileIdentity` operation. */
  export namespace SetProfileIdentityConstants {
    /** Type of the identity. */
    export enum IdentityType {
      USER = 'user',
      SERVICEID = 'serviceid',
      CRN = 'crn',
    }
    /** Type of the identity. */
    export enum Type {
      USER = 'user',
      SERVICEID = 'serviceid',
      CRN = 'crn',
    }
  }

  /** Parameters for the `getProfileIdentity` operation. */
  export interface GetProfileIdentityParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** Type of the identity. */
    identityType: GetProfileIdentityConstants.IdentityType | string;
    /** Identifier of the identity that can assume the trusted profiles. */
    identifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getProfileIdentity` operation. */
  export namespace GetProfileIdentityConstants {
    /** Type of the identity. */
    export enum IdentityType {
      USER = 'user',
      SERVICEID = 'serviceid',
      CRN = 'crn',
    }
  }

  /** Parameters for the `deleteProfileIdentity` operation. */
  export interface DeleteProfileIdentityParams {
    /** ID of the trusted profile. */
    profileId: string;
    /** Type of the identity. */
    identityType: DeleteProfileIdentityConstants.IdentityType | string;
    /** Identifier of the identity that can assume the trusted profiles. */
    identifierId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteProfileIdentity` operation. */
  export namespace DeleteProfileIdentityConstants {
    /** Type of the identity. */
    export enum IdentityType {
      USER = 'user',
      SERVICEID = 'serviceid',
      CRN = 'crn',
    }
  }

  /** Parameters for the `getAccountSettings` operation. */
  export interface GetAccountSettingsParams {
    /** Unique ID of the account. */
    accountId: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccountSettings` operation. */
  export interface UpdateAccountSettingsParams {
    /** Version of the account settings to be updated. Specify the version that you retrieved as entity_tag (ETag
     *  header) when reading the account. This value helps identifying parallel usage of this API. Pass * to indicate to
     *  update any version available. This might result in stale updates.
     */
    ifMatch: string;
    /** The id of the account to update the settings for. */
    accountId: string;
    /** Defines whether or not creating a service ID is access controlled. Valid values:
     *    * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create
     *  service IDs, including the account owner
     *    * NOT_RESTRICTED - all members of an account can create service IDs
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrictCreateServiceId?: UpdateAccountSettingsConstants.RestrictCreateServiceId | string;
    /** Defines whether or not creating platform API keys is access controlled. Valid values:
     *    * RESTRICTED - only users assigned the 'User API key creator' role on the IAM Identity Service can create API
     *  keys, including the account owner
     *    * NOT_RESTRICTED - all members of an account can create platform API keys
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrictCreatePlatformApikey?: UpdateAccountSettingsConstants.RestrictCreatePlatformApikey | string;
    /** Defines the IP addresses and subnets from which IAM tokens can be created for the account. */
    allowedIpAddresses?: string;
    /** Defines the MFA trait for the account. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa?: UpdateAccountSettingsConstants.Mfa | string;
    /** List of users that are exempted from the MFA requirement of the account. */
    userMfa?: AccountSettingsUserMFA[];
    /** Defines the session expiration in seconds for the account. Valid values:
     *    * Any whole number between between '900' and '86400'
     *    * NOT_SET - To unset account setting and use service default.
     */
    sessionExpirationInSeconds?: string;
    /** Defines the period of time in seconds in which a session will be invalidated due to inactivity. Valid
     *  values:
     *    * Any whole number between '900' and '7200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    sessionInvalidationInSeconds?: string;
    /** Defines the max allowed sessions per identity required by the account. Value values:
     *    * Any whole number greater than 0
     *    * NOT_SET - To unset account setting and use service default.
     */
    maxSessionsPerIdentity?: string;
    /** Defines the access token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '3600'
     *    * NOT_SET - To unset account setting and use service default.
     */
    systemAccessTokenExpirationInSeconds?: string;
    /** Defines the refresh token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '259200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    systemRefreshTokenExpirationInSeconds?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateAccountSettings` operation. */
  export namespace UpdateAccountSettingsConstants {
    /** Defines whether or not creating a service ID is access controlled. Valid values: * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create service IDs, including the account owner * NOT_RESTRICTED - all members of an account can create service IDs * NOT_SET - to 'unset' a previous set value. */
    export enum RestrictCreateServiceId {
      RESTRICTED = 'RESTRICTED',
      NOT_RESTRICTED = 'NOT_RESTRICTED',
      NOT_SET = 'NOT_SET',
    }
    /** Defines whether or not creating platform API keys is access controlled. Valid values: * RESTRICTED - only users assigned the 'User API key creator' role on the IAM Identity Service can create API keys, including the account owner * NOT_RESTRICTED - all members of an account can create platform API keys * NOT_SET - to 'unset' a previous set value. */
    export enum RestrictCreatePlatformApikey {
      RESTRICTED = 'RESTRICTED',
      NOT_RESTRICTED = 'NOT_RESTRICTED',
      NOT_SET = 'NOT_SET',
    }
    /** Defines the MFA trait for the account. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
    export enum Mfa {
      NONE = 'NONE',
      NONE_NO_ROPC = 'NONE_NO_ROPC',
      TOTP = 'TOTP',
      TOTP4ALL = 'TOTP4ALL',
      LEVEL1 = 'LEVEL1',
      LEVEL2 = 'LEVEL2',
      LEVEL3 = 'LEVEL3',
    }
  }

  /** Parameters for the `getMfaStatus` operation. */
  export interface GetMfaStatusParams {
    /** ID of the account. */
    accountId: string;
    /** iam_id of the user. This user must be the member of the account. */
    iamId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createMfaReport` operation. */
  export interface CreateMfaReportParams {
    /** ID of the account. */
    accountId: string;
    /** Optional report type. The supported value is 'mfa_status'. List MFA enrollment status for all the
     *  identities.
     */
    type?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMfaReport` operation. */
  export interface GetMfaReportParams {
    /** ID of the account. */
    accountId: string;
    /** Reference for the report to be generated, You can use 'latest' to get the latest report for the given
     *  account.
     */
    reference: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAccountSettingsAssignments` operation. */
  export interface ListAccountSettingsAssignmentsParams {
    /** Account ID of the Assignments to query. This parameter is required unless using a pagetoken. */
    accountId?: string;
    /** Filter results by Template Id. */
    templateId?: string;
    /** Filter results Template Version. */
    templateVersion?: string;
    /** Filter results by the assignment target. */
    target?: string;
    /** Filter results by the assignment's target type. */
    targetType?: ListAccountSettingsAssignmentsConstants.TargetType | string;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** If specified, the items are sorted by the value of this property. */
    sort?: ListAccountSettingsAssignmentsConstants.Sort | string;
    /** Sort order. */
    order?: ListAccountSettingsAssignmentsConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAccountSettingsAssignments` operation. */
  export namespace ListAccountSettingsAssignmentsConstants {
    /** Filter results by the assignment's target type. */
    export enum TargetType {
      ACCOUNT = 'Account',
      ACCOUNTGROUP = 'AccountGroup',
    }
    /** If specified, the items are sorted by the value of this property. */
    export enum Sort {
      TEMPLATE_ID = 'template_id',
      CREATED_AT = 'created_at',
      LAST_MODIFIED_AT = 'last_modified_at',
    }
    /** Sort order. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createAccountSettingsAssignment` operation. */
  export interface CreateAccountSettingsAssignmentParams {
    /** ID of the template to assign. */
    templateId: string;
    /** Version of the template to assign. */
    templateVersion: number;
    /** Type of target to deploy to. */
    targetType: CreateAccountSettingsAssignmentConstants.TargetType | string;
    /** Identifier of target to deploy to. */
    target: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createAccountSettingsAssignment` operation. */
  export namespace CreateAccountSettingsAssignmentConstants {
    /** Type of target to deploy to. */
    export enum TargetType {
      ACCOUNT = 'Account',
      ACCOUNTGROUP = 'AccountGroup',
    }
  }

  /** Parameters for the `getAccountSettingsAssignment` operation. */
  export interface GetAccountSettingsAssignmentParams {
    /** ID of the Assignment Record. */
    assignmentId: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAccountSettingsAssignment` operation. */
  export interface DeleteAccountSettingsAssignmentParams {
    /** ID of the Assignment Record. */
    assignmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccountSettingsAssignment` operation. */
  export interface UpdateAccountSettingsAssignmentParams {
    /** ID of the Assignment Record. */
    assignmentId: string;
    /** Version of the assignment to be updated. Specify the version that you retrieved when reading the assignment.
     *  This value  helps identifying parallel usage of this API. Pass * to indicate to update any version available.
     *  This might result in stale updates.
     */
    ifMatch: string;
    /** Template version to be applied to the assignment. To retry all failed assignments, provide the existing
     *  version. To migrate to a different version, provide the new version number.
     */
    templateVersion: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAccountSettingsTemplates` operation. */
  export interface ListAccountSettingsTemplatesParams {
    /** Account ID of the account settings templates to query. This parameter is required unless using a pagetoken. */
    accountId?: string;
    /** Optional size of a single page. */
    limit?: string;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** Optional sort property. If specified, the returned templated are sorted according to this property. */
    sort?: ListAccountSettingsTemplatesConstants.Sort | string;
    /** Optional sort order. */
    order?: ListAccountSettingsTemplatesConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAccountSettingsTemplates` operation. */
  export namespace ListAccountSettingsTemplatesConstants {
    /** Optional sort property. If specified, the returned templated are sorted according to this property. */
    export enum Sort {
      CREATED_AT = 'created_at',
      LAST_MODIFIED_AT = 'last_modified_at',
      NAME = 'name',
    }
    /** Optional sort order. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createAccountSettingsTemplate` operation. */
  export interface CreateAccountSettingsTemplateParams {
    /** ID of the account where the template resides. */
    accountId?: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. */
    name?: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    accountSettings?: AccountSettingsComponent;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLatestAccountSettingsTemplateVersion` operation. */
  export interface GetLatestAccountSettingsTemplateVersionParams {
    /** ID of the account settings template. */
    templateId: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAllVersionsOfAccountSettingsTemplate` operation. */
  export interface DeleteAllVersionsOfAccountSettingsTemplateParams {
    /** ID of the account settings template. */
    templateId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVersionsOfAccountSettingsTemplate` operation. */
  export interface ListVersionsOfAccountSettingsTemplateParams {
    /** ID of the account settings template. */
    templateId: string;
    /** Optional size of a single page. */
    limit?: string;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** Optional sort property. If specified, the returned templated are sorted according to this property. */
    sort?: ListVersionsOfAccountSettingsTemplateConstants.Sort | string;
    /** Optional sort order. */
    order?: ListVersionsOfAccountSettingsTemplateConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listVersionsOfAccountSettingsTemplate` operation. */
  export namespace ListVersionsOfAccountSettingsTemplateConstants {
    /** Optional sort property. If specified, the returned templated are sorted according to this property. */
    export enum Sort {
      CREATED_AT = 'created_at',
      LAST_MODIFIED_AT = 'last_modified_at',
      NAME = 'name',
    }
    /** Optional sort order. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createAccountSettingsTemplateVersion` operation. */
  export interface CreateAccountSettingsTemplateVersionParams {
    /** ID of the account settings template. */
    templateId: string;
    /** ID of the account where the template resides. */
    accountId?: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. */
    name?: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    accountSettings?: AccountSettingsComponent;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccountSettingsTemplateVersion` operation. */
  export interface GetAccountSettingsTemplateVersionParams {
    /** ID of the account settings template. */
    templateId: string;
    /** Version of the account settings template. */
    version: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateAccountSettingsTemplateVersion` operation. */
  export interface UpdateAccountSettingsTemplateVersionParams {
    /** Entity tag of the Template to be updated. Specify the tag that you retrieved when reading the account
     *  settings template. This value helps identifying parallel usage of this API. Pass * to indicate to update any
     *  version available. This might result in stale updates.
     */
    ifMatch: string;
    /** ID of the account settings template. */
    templateId: string;
    /** Version of the account settings template. */
    version: string;
    /** ID of the account where the template resides. */
    accountId?: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. */
    name?: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    accountSettings?: AccountSettingsComponent;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAccountSettingsTemplateVersion` operation. */
  export interface DeleteAccountSettingsTemplateVersionParams {
    /** ID of the account settings template. */
    templateId: string;
    /** Version of the account settings template. */
    version: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `commitAccountSettingsTemplate` operation. */
  export interface CommitAccountSettingsTemplateParams {
    /** ID of the account settings template. */
    templateId: string;
    /** Version of the account settings template. */
    version: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createReport` operation. */
  export interface CreateReportParams {
    /** ID of the account. */
    accountId: string;
    /** Optional report type. The supported value is 'inactive'. List all identities that have not authenticated
     *  within the time indicated by duration.
     */
    type?: string;
    /** Optional duration of the report. The supported unit of duration is hours. */
    duration?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getReport` operation. */
  export interface GetReportParams {
    /** ID of the account. */
    accountId: string;
    /** Reference for the report to be generated, You can use 'latest' to get the latest report for the given
     *  account.
     */
    reference: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEffectiveAccountSettings` operation. */
  export interface GetEffectiveAccountSettingsParams {
    /** Unique ID of the account. */
    accountId: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    /** Enrich MFA exemptions with user information. */
    resolveUserMfa?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listTrustedProfileAssignments` operation. */
  export interface ListTrustedProfileAssignmentsParams {
    /** Account ID of the Assignments to query. This parameter is required unless using a pagetoken. */
    accountId?: string;
    /** Filter results by Template Id. */
    templateId?: string;
    /** Filter results Template Version. */
    templateVersion?: string;
    /** Filter results by the assignment target. */
    target?: string;
    /** Filter results by the assignment's target type. */
    targetType?: ListTrustedProfileAssignmentsConstants.TargetType | string;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** If specified, the items are sorted by the value of this property. */
    sort?: ListTrustedProfileAssignmentsConstants.Sort | string;
    /** Sort order. */
    order?: ListTrustedProfileAssignmentsConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listTrustedProfileAssignments` operation. */
  export namespace ListTrustedProfileAssignmentsConstants {
    /** Filter results by the assignment's target type. */
    export enum TargetType {
      ACCOUNT = 'Account',
      ACCOUNTGROUP = 'AccountGroup',
    }
    /** If specified, the items are sorted by the value of this property. */
    export enum Sort {
      TEMPLATE_ID = 'template_id',
      CREATED_AT = 'created_at',
      LAST_MODIFIED_AT = 'last_modified_at',
    }
    /** Sort order. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createTrustedProfileAssignment` operation. */
  export interface CreateTrustedProfileAssignmentParams {
    /** ID of the template to assign. */
    templateId: string;
    /** Version of the template to assign. */
    templateVersion: number;
    /** Type of target to deploy to. */
    targetType: CreateTrustedProfileAssignmentConstants.TargetType | string;
    /** Identifier of target to deploy to. */
    target: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createTrustedProfileAssignment` operation. */
  export namespace CreateTrustedProfileAssignmentConstants {
    /** Type of target to deploy to. */
    export enum TargetType {
      ACCOUNT = 'Account',
      ACCOUNTGROUP = 'AccountGroup',
    }
  }

  /** Parameters for the `getTrustedProfileAssignment` operation. */
  export interface GetTrustedProfileAssignmentParams {
    /** ID of the Assignment Record. */
    assignmentId: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteTrustedProfileAssignment` operation. */
  export interface DeleteTrustedProfileAssignmentParams {
    /** ID of the Assignment Record. */
    assignmentId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateTrustedProfileAssignment` operation. */
  export interface UpdateTrustedProfileAssignmentParams {
    /** ID of the Assignment Record. */
    assignmentId: string;
    /** Version of the Assignment to be updated. Specify the version that you retrieved when reading the Assignment.
     *  This value  helps identifying parallel usage of this API. Pass * to indicate to update any version available.
     *  This might result in stale updates.
     */
    ifMatch: string;
    /** Template version to be applied to the assignment. To retry all failed assignments, provide the existing
     *  version. To migrate to a different version, provide the new version number.
     */
    templateVersion: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listProfileTemplates` operation. */
  export interface ListProfileTemplatesParams {
    /** Account ID of the trusted profile templates to query. This parameter is required unless using a pagetoken. */
    accountId?: string;
    /** Optional size of a single page. */
    limit?: string;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** Optional sort property. If specified, the returned templates are sorted according to this property. */
    sort?: ListProfileTemplatesConstants.Sort | string;
    /** Optional sort order. */
    order?: ListProfileTemplatesConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listProfileTemplates` operation. */
  export namespace ListProfileTemplatesConstants {
    /** Optional sort property. If specified, the returned templates are sorted according to this property. */
    export enum Sort {
      CREATED_AT = 'created_at',
      LAST_MODIFIED_AT = 'last_modified_at',
      NAME = 'name',
    }
    /** Optional sort order. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createProfileTemplate` operation. */
  export interface CreateProfileTemplateParams {
    /** ID of the account where the template resides. */
    accountId?: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. Required field
     *  when creating a new template. Otherwise this field is optional. If the field is included it will change the name
     *  value for all existing versions of the template.
     */
    name?: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    /** Input body parameters for the TemplateProfileComponent. */
    profile?: TemplateProfileComponentRequest;
    /** Existing policy templates that you can reference to assign access in the trusted profile component. */
    policyTemplateReferences?: PolicyTemplateReference[];
    actionControls?: ActionControls;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getLatestProfileTemplateVersion` operation. */
  export interface GetLatestProfileTemplateVersionParams {
    /** ID of the trusted profile template. */
    templateId: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteAllVersionsOfProfileTemplate` operation. */
  export interface DeleteAllVersionsOfProfileTemplateParams {
    /** ID of the trusted profile template. */
    templateId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listVersionsOfProfileTemplate` operation. */
  export interface ListVersionsOfProfileTemplateParams {
    /** ID of the trusted profile template. */
    templateId: string;
    /** Optional size of a single page. */
    limit?: string;
    /** Optional Prev or Next page token returned from a previous query execution. Default is start with first page. */
    pagetoken?: string;
    /** Optional sort property. If specified, the returned templated are sorted according to this property. */
    sort?: ListVersionsOfProfileTemplateConstants.Sort | string;
    /** Optional sort order. */
    order?: ListVersionsOfProfileTemplateConstants.Order | string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listVersionsOfProfileTemplate` operation. */
  export namespace ListVersionsOfProfileTemplateConstants {
    /** Optional sort property. If specified, the returned templated are sorted according to this property. */
    export enum Sort {
      CREATED_AT = 'created_at',
      LAST_MODIFIED_AT = 'last_modified_at',
      NAME = 'name',
    }
    /** Optional sort order. */
    export enum Order {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createProfileTemplateVersion` operation. */
  export interface CreateProfileTemplateVersionParams {
    /** ID of the trusted profile template. */
    templateId: string;
    /** ID of the account where the template resides. */
    accountId?: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. Required field
     *  when creating a new template. Otherwise this field is optional. If the field is included it will change the name
     *  value for all existing versions of the template.
     */
    name?: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    /** Input body parameters for the TemplateProfileComponent. */
    profile?: TemplateProfileComponentRequest;
    /** Existing policy templates that you can reference to assign access in the trusted profile component. */
    policyTemplateReferences?: PolicyTemplateReference[];
    actionControls?: ActionControls;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getProfileTemplateVersion` operation. */
  export interface GetProfileTemplateVersionParams {
    /** ID of the trusted profile template. */
    templateId: string;
    /** Version of the Profile Template. */
    version: string;
    /** Defines if the entity history is included in the response. */
    includeHistory?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateProfileTemplateVersion` operation. */
  export interface UpdateProfileTemplateVersionParams {
    /** Entity tag of the Template to be updated. Specify the tag that you retrieved when reading the Profile
     *  Template. This value helps identifying parallel usage of this API. Pass * to indicate to update any version
     *  available. This might result in stale updates.
     */
    ifMatch: string;
    /** ID of the trusted profile template. */
    templateId: string;
    /** Version of the Profile Template. */
    version: string;
    /** ID of the account where the template resides. */
    accountId?: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. Required field
     *  when creating a new template. Otherwise this field is optional. If the field is included it will change the name
     *  value for all existing versions of the template.
     */
    name?: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    /** Input body parameters for the TemplateProfileComponent. */
    profile?: TemplateProfileComponentRequest;
    /** Existing policy templates that you can reference to assign access in the trusted profile component. */
    policyTemplateReferences?: PolicyTemplateReference[];
    actionControls?: ActionControls;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteProfileTemplateVersion` operation. */
  export interface DeleteProfileTemplateVersionParams {
    /** ID of the trusted profile template. */
    templateId: string;
    /** Version of the Profile Template. */
    version: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `commitProfileTemplate` operation. */
  export interface CommitProfileTemplateParams {
    /** ID of the trusted profile template. */
    templateId: string;
    /** Version of the Profile Template. */
    version: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * AccountBasedMfaEnrollment.
   */
  export interface AccountBasedMfaEnrollment {
    security_questions: MfaEnrollmentTypeStatus;
    totp: MfaEnrollmentTypeStatus;
    verisign: MfaEnrollmentTypeStatus;
    /** The enrollment complies to the effective requirement. */
    complies: boolean;
  }

  /**
   * AccountSettingsAccountSection.
   */
  export interface AccountSettingsAccountSection {
    /** Unique ID of the account. */
    account_id?: string;
    /** Defines whether or not creating a service ID is access controlled. Valid values:
     *    * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create
     *  service IDs, including the account owner
     *    * NOT_RESTRICTED - all members of an account can create service IDs
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_service_id?: AccountSettingsAccountSection.Constants.RestrictCreateServiceId | string;
    /** Defines whether or not creating platform API keys is access controlled. Valid values:
     *    * RESTRICTED - to apply access control
     *    * NOT_RESTRICTED - to remove access control
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_platform_apikey?: AccountSettingsAccountSection.Constants.RestrictCreatePlatformApikey | string;
    /** Defines the IP addresses and subnets from which IAM tokens can be created for the account. */
    allowed_ip_addresses?: string;
    /** Defines the MFA requirement for the user. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa?: AccountSettingsAccountSection.Constants.Mfa | string;
    /** List of users that are exempted from the MFA requirement of the account. */
    user_mfa?: EffectiveAccountSettingsUserMFA[];
    /** History of the Account Settings. */
    history?: EnityHistoryRecord[];
    /** Defines the session expiration in seconds for the account. Valid values:
     *    * Any whole number between between '900' and '86400'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_expiration_in_seconds?: string;
    /** Defines the period of time in seconds in which a session will be invalidated due to inactivity. Valid
     *  values:
     *    * Any whole number between '900' and '7200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_invalidation_in_seconds?: string;
    /** Defines the max allowed sessions per identity required by the account. Valid values:
     *    * Any whole number greater than 0
     *    * NOT_SET - To unset account setting and use service default.
     */
    max_sessions_per_identity?: string;
    /** Defines the access token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '3600'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_access_token_expiration_in_seconds?: string;
    /** Defines the refresh token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '259200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_refresh_token_expiration_in_seconds?: string;
  }
  export namespace AccountSettingsAccountSection {
    export namespace Constants {
      /** Defines whether or not creating a service ID is access controlled. Valid values: * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create service IDs, including the account owner * NOT_RESTRICTED - all members of an account can create service IDs * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreateServiceId {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines whether or not creating platform API keys is access controlled. Valid values: * RESTRICTED - to apply access control * NOT_RESTRICTED - to remove access control * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreatePlatformApikey {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines the MFA requirement for the user. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum Mfa {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
    }
  }

  /**
   * AccountSettingsAssignedTemplatesSection.
   */
  export interface AccountSettingsAssignedTemplatesSection {
    /** Template Id. */
    template_id?: string;
    /** Template version. */
    template_version?: number;
    /** Template name. */
    template_name?: string;
    /** Defines whether or not creating a service ID is access controlled. Valid values:
     *    * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create
     *  service IDs, including the account owner
     *    * NOT_RESTRICTED - all members of an account can create service IDs
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_service_id?: AccountSettingsAssignedTemplatesSection.Constants.RestrictCreateServiceId | string;
    /** Defines whether or not creating platform API keys is access controlled. Valid values:
     *    * RESTRICTED - to apply access control
     *    * NOT_RESTRICTED - to remove access control
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_platform_apikey?: AccountSettingsAssignedTemplatesSection.Constants.RestrictCreatePlatformApikey | string;
    /** Defines the IP addresses and subnets from which IAM tokens can be created for the account. */
    allowed_ip_addresses?: string;
    /** Defines the MFA requirement for the user. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa?: AccountSettingsAssignedTemplatesSection.Constants.Mfa | string;
    /** List of users that are exempted from the MFA requirement of the account. */
    user_mfa?: EffectiveAccountSettingsUserMFA[];
    /** Defines the session expiration in seconds for the account. Valid values:
     *    * Any whole number between between '900' and '86400'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_expiration_in_seconds?: string;
    /** Defines the period of time in seconds in which a session will be invalidated due to inactivity. Valid
     *  values:
     *    * Any whole number between '900' and '7200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_invalidation_in_seconds?: string;
    /** Defines the max allowed sessions per identity required by the account. Valid values:
     *    * Any whole number greater than 0
     *    * NOT_SET - To unset account setting and use service default.
     */
    max_sessions_per_identity?: string;
    /** Defines the access token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '3600'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_access_token_expiration_in_seconds?: string;
    /** Defines the refresh token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '259200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_refresh_token_expiration_in_seconds?: string;
  }
  export namespace AccountSettingsAssignedTemplatesSection {
    export namespace Constants {
      /** Defines whether or not creating a service ID is access controlled. Valid values: * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create service IDs, including the account owner * NOT_RESTRICTED - all members of an account can create service IDs * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreateServiceId {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines whether or not creating platform API keys is access controlled. Valid values: * RESTRICTED - to apply access control * NOT_RESTRICTED - to remove access control * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreatePlatformApikey {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines the MFA requirement for the user. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum Mfa {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
    }
  }

  /**
   * AccountSettingsComponent.
   */
  export interface AccountSettingsComponent {
    /** Defines whether or not creating a service ID is access controlled. Valid values:
     *    * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create
     *  service IDs, including the account owner
     *    * NOT_RESTRICTED - all members of an account can create service IDs
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_service_id?: AccountSettingsComponent.Constants.RestrictCreateServiceId | string;
    /** Defines whether or not creating platform API keys is access controlled. Valid values:
     *    * RESTRICTED - to apply access control
     *    * NOT_RESTRICTED - to remove access control
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_platform_apikey?: AccountSettingsComponent.Constants.RestrictCreatePlatformApikey | string;
    /** Defines the IP addresses and subnets from which IAM tokens can be created for the account. */
    allowed_ip_addresses?: string;
    /** Defines the MFA trait for the account. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa?: AccountSettingsComponent.Constants.Mfa | string;
    /** List of users that are exempted from the MFA requirement of the account. */
    user_mfa?: AccountSettingsUserMFA[];
    /** Defines the session expiration in seconds for the account. Valid values:
     *    * Any whole number between between '900' and '86400'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_expiration_in_seconds?: string;
    /** Defines the period of time in seconds in which a session will be invalidated due to inactivity. Valid
     *  values:
     *    * Any whole number between '900' and '7200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_invalidation_in_seconds?: string;
    /** Defines the max allowed sessions per identity required by the account. Valid values:
     *    * Any whole number greater than 0
     *    * NOT_SET - To unset account setting and use service default.
     */
    max_sessions_per_identity?: string;
    /** Defines the access token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '3600'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_access_token_expiration_in_seconds?: string;
    /** Defines the refresh token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '259200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_refresh_token_expiration_in_seconds?: string;
  }
  export namespace AccountSettingsComponent {
    export namespace Constants {
      /** Defines whether or not creating a service ID is access controlled. Valid values: * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create service IDs, including the account owner * NOT_RESTRICTED - all members of an account can create service IDs * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreateServiceId {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines whether or not creating platform API keys is access controlled. Valid values: * RESTRICTED - to apply access control * NOT_RESTRICTED - to remove access control * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreatePlatformApikey {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines the MFA trait for the account. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum Mfa {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
    }
  }

  /**
   * AccountSettingsEffectiveSection.
   */
  export interface AccountSettingsEffectiveSection {
    /** Defines whether or not creating a service ID is access controlled. Valid values:
     *    * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create
     *  service IDs, including the account owner
     *    * NOT_RESTRICTED - all members of an account can create service IDs
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_service_id?: AccountSettingsEffectiveSection.Constants.RestrictCreateServiceId | string;
    /** Defines whether or not creating platform API keys is access controlled. Valid values:
     *    * RESTRICTED - to apply access control
     *    * NOT_RESTRICTED - to remove access control
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_platform_apikey?: AccountSettingsEffectiveSection.Constants.RestrictCreatePlatformApikey | string;
    /** Defines the IP addresses and subnets from which IAM tokens can be created for the account. */
    allowed_ip_addresses?: string;
    /** Defines the MFA requirement for the user. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa?: AccountSettingsEffectiveSection.Constants.Mfa | string;
    /** List of users that are exempted from the MFA requirement of the account. */
    user_mfa?: EffectiveAccountSettingsUserMFA[];
    /** Defines the session expiration in seconds for the account. Valid values:
     *    * Any whole number between between '900' and '86400'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_expiration_in_seconds?: string;
    /** Defines the period of time in seconds in which a session will be invalidated due to inactivity. Valid
     *  values:
     *    * Any whole number between '900' and '7200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_invalidation_in_seconds?: string;
    /** Defines the max allowed sessions per identity required by the account. Valid values:
     *    * Any whole number greater than 0
     *    * NOT_SET - To unset account setting and use service default.
     */
    max_sessions_per_identity?: string;
    /** Defines the access token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '3600'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_access_token_expiration_in_seconds?: string;
    /** Defines the refresh token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '259200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_refresh_token_expiration_in_seconds?: string;
  }
  export namespace AccountSettingsEffectiveSection {
    export namespace Constants {
      /** Defines whether or not creating a service ID is access controlled. Valid values: * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create service IDs, including the account owner * NOT_RESTRICTED - all members of an account can create service IDs * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreateServiceId {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines whether or not creating platform API keys is access controlled. Valid values: * RESTRICTED - to apply access control * NOT_RESTRICTED - to remove access control * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreatePlatformApikey {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines the MFA requirement for the user. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum Mfa {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
    }
  }

  /**
   * Response body format for Account Settings REST requests.
   */
  export interface AccountSettingsResponse {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Unique ID of the account. */
    account_id: string;
    /** Defines whether or not creating a service ID is access controlled. Valid values:
     *    * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create
     *  service IDs, including the account owner
     *    * NOT_RESTRICTED - all members of an account can create service IDs
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_service_id: AccountSettingsResponse.Constants.RestrictCreateServiceId | string;
    /** Defines whether or not creating platform API keys is access controlled. Valid values:
     *    * RESTRICTED - to apply access control
     *    * NOT_RESTRICTED - to remove access control
     *    * NOT_SET - to 'unset' a previous set value.
     */
    restrict_create_platform_apikey: AccountSettingsResponse.Constants.RestrictCreatePlatformApikey | string;
    /** Defines the IP addresses and subnets from which IAM tokens can be created for the account. */
    allowed_ip_addresses: string;
    /** Version of the account settings. */
    entity_tag: string;
    /** Defines the MFA trait for the account. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa: AccountSettingsResponse.Constants.Mfa | string;
    /** List of users that are exempted from the MFA requirement of the account. */
    user_mfa: AccountSettingsUserMFA[];
    /** History of the Account Settings. */
    history?: EnityHistoryRecord[];
    /** Defines the session expiration in seconds for the account. Valid values:
     *    * Any whole number between between '900' and '86400'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_expiration_in_seconds: string;
    /** Defines the period of time in seconds in which a session will be invalidated due to inactivity. Valid
     *  values:
     *    * Any whole number between '900' and '7200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    session_invalidation_in_seconds: string;
    /** Defines the max allowed sessions per identity required by the account. Valid values:
     *    * Any whole number greater than 0
     *    * NOT_SET - To unset account setting and use service default.
     */
    max_sessions_per_identity: string;
    /** Defines the access token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '3600'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_access_token_expiration_in_seconds: string;
    /** Defines the refresh token expiration in seconds. Valid values:
     *    * Any whole number between '900' and '259200'
     *    * NOT_SET - To unset account setting and use service default.
     */
    system_refresh_token_expiration_in_seconds: string;
  }
  export namespace AccountSettingsResponse {
    export namespace Constants {
      /** Defines whether or not creating a service ID is access controlled. Valid values: * RESTRICTED - only users assigned the 'Service ID creator' role on the IAM Identity Service can create service IDs, including the account owner * NOT_RESTRICTED - all members of an account can create service IDs * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreateServiceId {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines whether or not creating platform API keys is access controlled. Valid values: * RESTRICTED - to apply access control * NOT_RESTRICTED - to remove access control * NOT_SET - to 'unset' a previous set value. */
      export enum RestrictCreatePlatformApikey {
        RESTRICTED = 'RESTRICTED',
        NOT_RESTRICTED = 'NOT_RESTRICTED',
        NOT_SET = 'NOT_SET',
      }
      /** Defines the MFA trait for the account. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum Mfa {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
    }
  }

  /**
   * AccountSettingsTemplateList.
   */
  export interface AccountSettingsTemplateList {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of account settings templates based on the query paramters and the page size. The
     *  account_settings_templates array is always part of the response but might be empty depending on the query
     *  parameter values provided.
     */
    account_settings_templates: AccountSettingsTemplateResponse[];
  }

  /**
   * Response body format for account settings template REST requests.
   */
  export interface AccountSettingsTemplateResponse {
    /** ID of the the template. */
    id: string;
    /** Version of the the template. */
    version: number;
    /** ID of the account where the template resides. */
    account_id: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. */
    name: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    /** Committed flag determines if the template is ready for assignment. */
    committed: boolean;
    account_settings: AccountSettingsComponent;
    /** History of the Template. */
    history?: EnityHistoryRecord[];
    /** Entity tag for this templateId-version combination. */
    entity_tag: string;
    /** Cloud resource name. */
    crn: string;
    /** Template Created At. */
    created_at?: string;
    /** IAMid of the creator. */
    created_by_id?: string;
    /** Template last modified at. */
    last_modified_at?: string;
    /** IAMid of the identity that made the latest modification. */
    last_modified_by_id?: string;
  }

  /**
   * AccountSettingsUserMFA.
   */
  export interface AccountSettingsUserMFA {
    /** The iam_id of the user. */
    iam_id: string;
    /** Defines the MFA requirement for the user. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa: AccountSettingsUserMFA.Constants.Mfa | string;
  }
  export namespace AccountSettingsUserMFA {
    export namespace Constants {
      /** Defines the MFA requirement for the user. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum Mfa {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
    }
  }

  /**
   * ActionControls.
   */
  export interface ActionControls {
    identities?: ActionControlsIdentities;
    rules: ActionControlsRules;
    policies: ActionControlsPolicies;
  }

  /**
   * ActionControlsIdentities.
   */
  export interface ActionControlsIdentities {
    add: boolean;
    remove: boolean;
  }

  /**
   * ActionControlsPolicies.
   */
  export interface ActionControlsPolicies {
    add: boolean;
    remove: boolean;
  }

  /**
   * ActionControlsRules.
   */
  export interface ActionControlsRules {
    add: boolean;
    remove: boolean;
  }

  /**
   * Activity.
   */
  export interface Activity {
    /** Time when the entity was last authenticated. */
    last_authn?: string;
    /** Authentication count, number of times the entity was authenticated. */
    authn_count: number;
  }

  /**
   * Response body format for API key V1 REST requests.
   */
  export interface ApiKey {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Unique identifier of this API Key. */
    id: string;
    /** Version of the API Key details object. You need to specify this value when updating the API key to avoid
     *  stale updates.
     */
    entity_tag?: string;
    /** Cloud Resource Name of the item. Example Cloud Resource Name:
     *  'crn:v1:bluemix:public:iam-identity:us-south:a/myaccount::apikey:1234-9012-5678'.
     */
    crn: string;
    /** The API key cannot be changed if set to true. */
    locked: boolean;
    /** Defines if API key is disabled, API key cannot be used if 'disabled' is set to true. */
    disabled?: boolean;
    /** If set contains a date time string of the creation date in ISO format. */
    created_at?: string;
    /** IAM ID of the user or service which created the API key. */
    created_by: string;
    /** If set contains a date time string of the last modification date in ISO format. */
    modified_at?: string;
    /** Name of the API key. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the API key.
     */
    name: string;
    /** Defines if the API key supports sessions. Sessions are only supported for user apikeys. */
    support_sessions?: boolean;
    /** Defines the action to take when API key is leaked, valid values are 'none', 'disable' and 'delete'. */
    action_when_leaked?: string;
    /** The optional description of the API key. The 'description' property is only available if a description was
     *  provided during a create of an API key.
     */
    description?: string;
    /** The iam_id that this API key authenticates. */
    iam_id: string;
    /** ID of the account that this API key authenticates for. */
    account_id: string;
    /** The API key value. This property only contains the API key value for the following cases: create an API key,
     *  update a service ID API key that stores the API key value as retrievable, or get a service ID API key that
     *  stores the API key value as retrievable. All other operations don't return the API key value, for example all
     *  user API key related operations, except for create, don't contain the API key value.
     */
    apikey: string;
    /** History of the API key. */
    history?: EnityHistoryRecord[];
    activity?: Activity;
  }

  /**
   * Parameters for the API key in the Create service Id V1 REST request.
   */
  export interface ApiKeyInsideCreateServiceIdRequest {
    /** Name of the API key. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the API key.
     */
    name: string;
    /** The optional description of the API key. The 'description' property is only available if a description was
     *  provided during a create of an API key.
     */
    description?: string;
    /** You can optionally passthrough the API key value for this API key. If passed, a minimum length validation of
     *  32 characters for that apiKey value is done, i.e. the value can contain any characters and can even be non-URL
     *  safe, but the minimum length requirement must be met. If omitted, the API key management will create an URL safe
     *  opaque API key value. The value of the API key is checked for uniqueness. Ensure enough variations when passing
     *  in this value.
     */
    apikey?: string;
    /** Send true or false to set whether the API key value is retrievable in the future by using the Get details of
     *  an API key request. If you create an API key for a user, you must specify `false` or omit the value. We don't
     *  allow storing of API keys for users.
     */
    store_value?: boolean;
  }

  /**
   * Response body format for the List API keys V1 REST request.
   */
  export interface ApiKeyList {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of API keys based on the query paramters and the page size. The apikeys array is always part of the
     *  response but might be empty depending on the query parameters values provided.
     */
    apikeys: ApiKey[];
  }

  /**
   * Apikeys activity details.
   */
  export interface ApikeyActivity {
    /** Unique id of the apikey. */
    id: string;
    /** Name provided during creation of the apikey. */
    name?: string;
    /** Type of the apikey. Supported values are `serviceid` and `user`. */
    type: string;
    /** serviceid details will be present if type is `serviceid`. */
    serviceid?: ApikeyActivityServiceid;
    /** user details will be present if type is `user`. */
    user?: ApikeyActivityUser;
    /** Time when the apikey was last authenticated. */
    last_authn?: string;
  }

  /**
   * serviceid details will be present if type is `serviceid`.
   */
  export interface ApikeyActivityServiceid {
    /** Unique identifier of this Service Id. */
    id?: string;
    /** Name provided during creation of the serviceid. */
    name?: string;
  }

  /**
   * user details will be present if type is `user`.
   */
  export interface ApikeyActivityUser {
    /** IAMid of the user. */
    iam_id?: string;
    /** Name of the user. */
    name?: string;
    /** Username of the user. */
    username?: string;
    /** Email of the user. */
    email?: string;
  }

  /**
   * Link details.
   */
  export interface CreateProfileLinkRequestLink {
    /** The CRN of the compute resource. */
    crn: string;
    /** The compute resource namespace, only required if cr_type is IKS_SA or ROKS_SA. */
    namespace: string;
    /** Name of the compute resource, only required if cr_type is IKS_SA or ROKS_SA. */
    name?: string;
  }

  /**
   * Response body format for Account Settings REST requests.
   */
  export interface EffectiveAccountSettingsResponse {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Unique ID of the account. */
    account_id: string;
    effective: AccountSettingsEffectiveSection;
    account: AccountSettingsAccountSection;
    /** assigned template section. */
    assigned_templates?: AccountSettingsAssignedTemplatesSection[];
  }

  /**
   * EffectiveAccountSettingsUserMFA.
   */
  export interface EffectiveAccountSettingsUserMFA {
    /** The iam_id of the user. */
    iam_id: string;
    /** Defines the MFA requirement for the user. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    mfa: EffectiveAccountSettingsUserMFA.Constants.Mfa | string;
    /** name of the user account. */
    name?: string;
    /** userName of the user. */
    userName?: string;
    /** email of the user. */
    email?: string;
    /** optional description. */
    description?: string;
  }
  export namespace EffectiveAccountSettingsUserMFA {
    export namespace Constants {
      /** Defines the MFA requirement for the user. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum Mfa {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
    }
  }

  /**
   * Response body format for an entity history record.
   */
  export interface EnityHistoryRecord {
    /** Timestamp when the action was triggered. */
    timestamp: string;
    /** IAM ID of the identity which triggered the action. */
    iam_id: string;
    /** Account of the identity which triggered the action. */
    iam_id_account: string;
    /** Action of the history entry. */
    action: string;
    /** Params of the history entry. */
    params: string[];
    /** Message which summarizes the executed action. */
    message: string;
  }

  /**
   * EntityActivity.
   */
  export interface EntityActivity {
    /** Unique id of the entity. */
    id: string;
    /** Name provided during creation of the entity. */
    name?: string;
    /** Time when the entity was last authenticated. */
    last_authn?: string;
  }

  /**
   * Error information.
   */
  export interface Error {
    /** Error code of the REST Exception. */
    code: string;
    /** Error message code of the REST Exception. */
    message_code: string;
    /** Error message of the REST Exception. Error messages are derived base on the input locale of the REST request
     *  and the available Message catalogs. Dynamic fallback to 'us-english' is happening if no message catalog is
     *  available for the provided input locale.
     */
    message: string;
    /** Error details of the REST Exception. */
    details?: string;
  }

  /**
   * Response body parameters in case of error situations.
   */
  export interface ExceptionResponse {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Error message code of the REST Exception. */
    status_code: string;
    /** List of errors that occured. */
    errors: Error[];
    /** Unique ID of the requst. */
    trace?: string;
  }

  /**
   * IdBasedMfaEnrollment.
   */
  export interface IdBasedMfaEnrollment {
    /** Defines the MFA trait for the account. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    trait_account_default: IdBasedMfaEnrollment.Constants.TraitAccountDefault | string;
    /** Defines the MFA trait for the account. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    trait_user_specific?: IdBasedMfaEnrollment.Constants.TraitUserSpecific | string;
    /** Defines the MFA trait for the account. Valid values:
     *    * NONE - No MFA trait set
     *    * NONE_NO_ROPC- No MFA, disable CLI logins with only a password
     *    * TOTP - For all non-federated IBMId users
     *    * TOTP4ALL - For all users
     *    * LEVEL1 - Email-based MFA for all users
     *    * LEVEL2 - TOTP-based MFA for all users
     *    * LEVEL3 - U2F MFA for all users.
     */
    trait_effective: IdBasedMfaEnrollment.Constants.TraitEffective | string;
    /** The enrollment complies to the effective requirement. */
    complies: boolean;
    /** Defines comply state for the account. Valid values:
     *    * NO - User does not comply in the given account.
     *    * ACCOUNT- User complies in the given account, but does not comply in at least one of the other account
     *  memberships.
     *    * CROSS_ACCOUNT - User complies in the given account and across all other account memberships.
     */
    comply_state?: IdBasedMfaEnrollment.Constants.ComplyState | string;
  }
  export namespace IdBasedMfaEnrollment {
    export namespace Constants {
      /** Defines the MFA trait for the account. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum TraitAccountDefault {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
      /** Defines the MFA trait for the account. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum TraitUserSpecific {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
      /** Defines the MFA trait for the account. Valid values: * NONE - No MFA trait set * NONE_NO_ROPC- No MFA, disable CLI logins with only a password * TOTP - For all non-federated IBMId users * TOTP4ALL - For all users * LEVEL1 - Email-based MFA for all users * LEVEL2 - TOTP-based MFA for all users * LEVEL3 - U2F MFA for all users. */
      export enum TraitEffective {
        NONE = 'NONE',
        NONE_NO_ROPC = 'NONE_NO_ROPC',
        TOTP = 'TOTP',
        TOTP4ALL = 'TOTP4ALL',
        LEVEL1 = 'LEVEL1',
        LEVEL2 = 'LEVEL2',
        LEVEL3 = 'LEVEL3',
      }
      /** Defines comply state for the account. Valid values: * NO - User does not comply in the given account. * ACCOUNT- User complies in the given account, but does not comply in at least one of the other account memberships. * CROSS_ACCOUNT - User complies in the given account and across all other account memberships. */
      export enum ComplyState {
        NO = 'NO',
        ACCOUNT = 'ACCOUNT',
        CROSS_ACCOUNT = 'CROSS_ACCOUNT',
      }
    }
  }

  /**
   * MfaEnrollmentTypeStatus.
   */
  export interface MfaEnrollmentTypeStatus {
    /** Describes whether the enrollment type is required. */
    required: boolean;
    /** Describes whether the enrollment type is enrolled. */
    enrolled: boolean;
  }

  /**
   * MfaEnrollments.
   */
  export interface MfaEnrollments {
    /** currently effective mfa type i.e. id_based_mfa or account_based_mfa. */
    effective_mfa_type: string;
    id_based_mfa?: IdBasedMfaEnrollment;
    account_based_mfa?: AccountBasedMfaEnrollment;
  }

  /**
   * Metadata for external access policy.
   */
  export interface PolicyTemplateReference {
    /** ID of Access Policy Template. */
    id: string;
    /** Version of Access Policy Template. */
    version: string;
  }

  /**
   * ProfileClaimRule.
   */
  export interface ProfileClaimRule {
    /** the unique identifier of the claim rule. */
    id: string;
    /** version of the claim rule. */
    entity_tag: string;
    /** If set contains a date time string of the creation date in ISO format. */
    created_at: string;
    /** If set contains a date time string of the last modification date in ISO format. */
    modified_at?: string;
    /** The optional claim rule name. */
    name?: string;
    /** Type of the claim rule, either 'Profile-SAML' or 'Profile-CR'. */
    type: string;
    /** The realm name of the Idp this claim rule applies to. */
    realm_name?: string;
    /** Session expiration in seconds. */
    expiration: number;
    /** The compute resource type. Not required if type is Profile-SAML. Valid values are VSI, IKS_SA, ROKS_SA. */
    cr_type?: string;
    /** Conditions of this claim rule. */
    conditions: ProfileClaimRuleConditions[];
  }

  /**
   * ProfileClaimRuleConditions.
   */
  export interface ProfileClaimRuleConditions {
    /** The claim to evaluate against. [Learn
     *  more](/docs/account?topic=account-iam-condition-properties&interface=ui#cr-attribute-names).
     */
    claim: string;
    /** The operation to perform on the claim. valid values are EQUALS, NOT_EQUALS, EQUALS_IGNORE_CASE,
     *  NOT_EQUALS_IGNORE_CASE, CONTAINS, IN.
     */
    operator: string;
    /** The stringified JSON value that the claim is compared to using the operator. */
    value: string;
  }

  /**
   * ProfileClaimRuleList.
   */
  export interface ProfileClaimRuleList {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** List of claim rules. */
    rules: ProfileClaimRule[];
  }

  /**
   * ProfileIdentitiesResponse.
   */
  export interface ProfileIdentitiesResponse {
    /** Entity tag of the profile identities response. */
    entity_tag?: string;
    /** List of identities. */
    identities?: ProfileIdentityResponse[];
  }

  /**
   * ProfileIdentityRequest.
   */
  export interface ProfileIdentityRequest {
    /** Identifier of the identity that can assume the trusted profiles. This can be a user identifier (IAM id),
     *  serviceid or crn. Internally it uses account id of the service id for the identifier 'serviceid' and for the
     *  identifier 'crn' it uses account id contained in the CRN.
     */
    identifier: string;
    /** Type of the identity. */
    type: ProfileIdentityRequest.Constants.Type | string;
    /** Only valid for the type user. Accounts from which a user can assume the trusted profile. */
    accounts?: string[];
    /** Description of the identity that can assume the trusted profile. This is optional field for all the types of
     *  identities. When this field is not set for the identity type 'serviceid' then the description of the service id
     *  is used. Description is recommended for the identity type 'crn' E.g. 'Instance 1234 of IBM Cloud Service
     *  project'.
     */
    description?: string;
  }
  export namespace ProfileIdentityRequest {
    export namespace Constants {
      /** Type of the identity. */
      export enum Type {
        USER = 'user',
        SERVICEID = 'serviceid',
        CRN = 'crn',
      }
    }
  }

  /**
   * ProfileIdentityResponse.
   */
  export interface ProfileIdentityResponse {
    /** IAM ID of the identity. */
    iam_id: string;
    /** Identifier of the identity that can assume the trusted profiles. This can be a user identifier (IAM id),
     *  serviceid or crn. Internally it uses account id of the service id for the identifier 'serviceid' and for the
     *  identifier 'crn' it uses account id contained in the CRN.
     */
    identifier: string;
    /** Type of the identity. */
    type: ProfileIdentityResponse.Constants.Type | string;
    /** Only valid for the type user. Accounts from which a user can assume the trusted profile. */
    accounts?: string[];
    /** Description of the identity that can assume the trusted profile. This is optional field for all the types of
     *  identities. When this field is not set for the identity type 'serviceid' then the description of the service id
     *  is used. Description is recommended for the identity type 'crn' E.g. 'Instance 1234 of IBM Cloud Service
     *  project'.
     */
    description?: string;
  }
  export namespace ProfileIdentityResponse {
    export namespace Constants {
      /** Type of the identity. */
      export enum Type {
        USER = 'user',
        SERVICEID = 'serviceid',
        CRN = 'crn',
      }
    }
  }

  /**
   * Link details.
   */
  export interface ProfileLink {
    /** the unique identifier of the link. */
    id: string;
    /** version of the link. */
    entity_tag: string;
    /** If set contains a date time string of the creation date in ISO format. */
    created_at: string;
    /** If set contains a date time string of the last modification date in ISO format. */
    modified_at: string;
    /** Optional name of the Link. */
    name?: string;
    /** The compute resource type. Valid values are VSI, IKS_SA, ROKS_SA. */
    cr_type: string;
    link: ProfileLinkLink;
  }

  /**
   * ProfileLinkLink.
   */
  export interface ProfileLinkLink {
    /** The CRN of the compute resource. */
    crn?: string;
    /** The compute resource namespace, only required if cr_type is IKS_SA or ROKS_SA. */
    namespace?: string;
    /** Name of the compute resource, only required if cr_type is IKS_SA or ROKS_SA. */
    name?: string;
  }

  /**
   * ProfileLinkList.
   */
  export interface ProfileLinkList {
    /** List of links to a trusted profile. */
    links: ProfileLink[];
  }

  /**
   * Report.
   */
  export interface Report {
    /** IAMid of the user who triggered the report. */
    created_by: string;
    /** Unique reference used to generate the report. */
    reference: string;
    /** Duration in hours for which the report is generated. */
    report_duration: string;
    /** Start time of the report. */
    report_start_time: string;
    /** End time of the report. */
    report_end_time: string;
    /** List of users. */
    users?: UserActivity[];
    /** List of apikeys. */
    apikeys?: ApikeyActivity[];
    /** List of serviceids. */
    serviceids?: EntityActivity[];
    /** List of profiles. */
    profiles?: EntityActivity[];
  }

  /**
   * ReportMfaEnrollmentStatus.
   */
  export interface ReportMfaEnrollmentStatus {
    /** IAMid of the user who triggered the report. */
    created_by: string;
    /** Unique reference used to generate the report. */
    reference: string;
    /** Date time at which report is generated. Date is in ISO format. */
    report_time: string;
    /** BSS account id of the user who triggered the report. */
    account_id: string;
    /** IMS account id of the user who triggered the report. */
    ims_account_id?: string;
    /** List of users. */
    users?: UserReportMfaEnrollmentStatus[];
  }

  /**
   * ReportReference.
   */
  export interface ReportReference {
    /** Reference for the report to be generated. */
    reference: string;
  }

  /**
   * Context with key properties for problem determination.
   */
  export interface ResponseContext {
    /** The transaction ID of the inbound REST request. */
    transaction_id?: string;
    /** The operation of the inbound REST request. */
    operation?: string;
    /** The user agent of the inbound REST request. */
    user_agent?: string;
    /** The URL of that cluster. */
    url?: string;
    /** The instance ID of the server instance processing the request. */
    instance_id?: string;
    /** The thread ID of the server instance processing the request. */
    thread_id?: string;
    /** The host of the server instance processing the request. */
    host?: string;
    /** The start time of the request. */
    start_time?: string;
    /** The finish time of the request. */
    end_time?: string;
    /** The elapsed time in msec. */
    elapsed_time?: string;
    /** The cluster name. */
    cluster_name?: string;
  }

  /**
   * Response body format for service ID V1 REST requests.
   */
  export interface ServiceId {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Unique identifier of this Service Id. */
    id: string;
    /** Cloud wide identifier for identities of this service ID. */
    iam_id: string;
    /** Version of the service ID details object. You need to specify this value when updating the service ID to
     *  avoid stale updates.
     */
    entity_tag: string;
    /** Cloud Resource Name of the item. Example Cloud Resource Name:
     *  'crn:v1:bluemix:public:iam-identity:us-south:a/myaccount::serviceid:1234-5678-9012'.
     */
    crn: string;
    /** The service ID cannot be changed if set to true. */
    locked: boolean;
    /** If set contains a date time string of the creation date in ISO format. */
    created_at: string;
    /** If set contains a date time string of the last modification date in ISO format. */
    modified_at: string;
    /** ID of the account the service ID belongs to. */
    account_id: string;
    /** Name of the Service Id. The name is not checked for uniqueness. Therefore multiple names with the same value
     *  can exist. Access is done via the UUID of the Service Id.
     */
    name: string;
    /** The optional description of the Service Id. The 'description' property is only available if a description
     *  was provided during a create of a Service Id.
     */
    description?: string;
    /** Optional list of CRNs (string array) which point to the services connected to the service ID. */
    unique_instance_crns?: string[];
    /** History of the Service ID. */
    history?: EnityHistoryRecord[];
    /** Response body format for API key V1 REST requests. */
    apikey?: ApiKey;
    activity?: Activity;
  }

  /**
   * Response body format for the list service ID V1 REST request.
   */
  export interface ServiceIdList {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of service IDs based on the query paramters and the page size. The service IDs array is always part of
     *  the response but might be empty depending on the query parameter values provided.
     */
    serviceids: ServiceId[];
  }

  /**
   * List Response body format for Template Assignments Records.
   */
  export interface TemplateAssignmentListResponse {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of Assignments based on the query paramters and the page size. The assignments array is always part of
     *  the response but might be empty depending on the query parameter values provided.
     */
    assignments: TemplateAssignmentResponse[];
  }

  /**
   * Body parameters for created resource.
   */
  export interface TemplateAssignmentResource {
    /** Id of the created resource. */
    id?: string;
  }

  /**
   * Body parameters for assignment error.
   */
  export interface TemplateAssignmentResourceError {
    /** Name of the error. */
    name?: string;
    /** Internal error code. */
    errorCode?: string;
    /** Error message detailing the nature of the error. */
    message?: string;
    /** Internal status code for the error. */
    statusCode?: string;
  }

  /**
   * Response body format for Template Assignment Record.
   */
  export interface TemplateAssignmentResponse {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** Assignment record Id. */
    id: string;
    /** Enterprise account Id. */
    account_id: string;
    /** Template Id. */
    template_id: string;
    /** Template version. */
    template_version: number;
    /** Assignment target type. */
    target_type: string;
    /** Assignment target. */
    target: string;
    /** Assignment status. */
    status: string;
    /** Status breakdown per target account of IAM resources created or errors encountered in attempting to create
     *  those IAM resources. IAM resources are only included in the response providing the assignment is not in
     *  progress. IAM resources are also only included when getting a single assignment, and excluded by list APIs.
     */
    resources?: TemplateAssignmentResponseResource[];
    /** Assignment history. */
    history?: EnityHistoryRecord[];
    /** Href. */
    href?: string;
    /** Assignment created at. */
    created_at: string;
    /** IAMid of the identity that created the assignment. */
    created_by_id: string;
    /** Assignment modified at. */
    last_modified_at: string;
    /** IAMid of the identity that last modified the assignment. */
    last_modified_by_id: string;
    /** Entity tag for this assignment record. */
    entity_tag: string;
  }

  /**
   * Overview of resources assignment per target account.
   */
  export interface TemplateAssignmentResponseResource {
    /** Target account where the IAM resource is created. */
    target: string;
    profile?: TemplateAssignmentResponseResourceDetail;
    account_settings?: TemplateAssignmentResponseResourceDetail;
    /** Policy resource(s) included only for trusted profile assignments with policy references. */
    policy_template_refs?: TemplateAssignmentResponseResourceDetail[];
  }

  /**
   * TemplateAssignmentResponseResourceDetail.
   */
  export interface TemplateAssignmentResponseResourceDetail {
    /** Policy Template Id, only returned for a profile assignment with policy references. */
    id?: string;
    /** Policy version, only returned for a profile assignment with policy references. */
    version?: string;
    /** Body parameters for created resource. */
    resource_created?: TemplateAssignmentResource;
    /** Body parameters for assignment error. */
    error_message?: TemplateAssignmentResourceError;
    /** Status for the target account's assignment. */
    status: string;
  }

  /**
   * Input body parameters for the TemplateProfileComponent.
   */
  export interface TemplateProfileComponentRequest {
    /** Name of the Profile. */
    name: string;
    /** Description of the Profile. */
    description?: string;
    /** Rules for the Profile. */
    rules?: TrustedProfileTemplateClaimRule[];
    /** Identities for the Profile. */
    identities?: ProfileIdentityRequest[];
  }

  /**
   * Input body parameters for the TemplateProfileComponent.
   */
  export interface TemplateProfileComponentResponse {
    /** Name of the Profile. */
    name: string;
    /** Description of the Profile. */
    description?: string;
    /** Rules for the Profile. */
    rules?: TrustedProfileTemplateClaimRule[];
    /** Identities for the Profile. */
    identities?: ProfileIdentityResponse[];
  }

  /**
   * Response body format for trusted profile V1 REST requests.
   */
  export interface TrustedProfile {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** the unique identifier of the trusted profile. Example:'Profile-94497d0d-2ac3-41bf-a993-a49d1b14627c'. */
    id: string;
    /** Version of the trusted profile details object. You need to specify this value when updating the trusted
     *  profile to avoid stale updates.
     */
    entity_tag: string;
    /** Cloud Resource Name of the item. Example Cloud Resource Name:
     *  'crn:v1:bluemix:public:iam-identity:us-south:a/myaccount::profile:Profile-94497d0d-2ac3-41bf-a993-a49d1b14627c'.
     */
    crn: string;
    /** Name of the trusted profile. The name is checked for uniqueness. Therefore trusted profiles with the same
     *  names can not exist in the same account.
     */
    name: string;
    /** The optional description of the trusted profile. The 'description' property is only available if a
     *  description was provided during a create of a trusted profile.
     */
    description?: string;
    /** If set contains a date time string of the creation date in ISO format. */
    created_at?: string;
    /** If set contains a date time string of the last modification date in ISO format. */
    modified_at?: string;
    /** The iam_id of this trusted profile. */
    iam_id: string;
    /** ID of the account that this trusted profile belong to. */
    account_id: string;
    /** ID of the IAM template that was used to create an enterprise-managed trusted profile in your account. When
     *  returned, this indicates that the trusted profile is created from and managed by a template in the root
     *  enterprise account.
     */
    template_id?: string;
    /** ID of the assignment that was used to create an enterprise-managed trusted profile in your account. When
     *  returned, this indicates that the trusted profile is created from and managed by a template in the root
     *  enterprise account.
     */
    assignment_id?: string;
    /** IMS acount ID of the trusted profile. */
    ims_account_id?: number;
    /** IMS user ID of the trusted profile. */
    ims_user_id?: number;
    /** History of the trusted profile. */
    history?: EnityHistoryRecord[];
    activity?: Activity;
  }

  /**
   * TrustedProfileTemplateClaimRule.
   */
  export interface TrustedProfileTemplateClaimRule {
    /** Name of the claim rule to be created or updated. */
    name?: string;
    /** Type of the claim rule. */
    type: TrustedProfileTemplateClaimRule.Constants.Type | string;
    /** The realm name of the Idp this claim rule applies to. This field is required only if the type is specified
     *  as 'Profile-SAML'.
     */
    realm_name?: string;
    /** Session expiration in seconds, only required if type is 'Profile-SAML'. */
    expiration?: number;
    /** Conditions of this claim rule. */
    conditions: ProfileClaimRuleConditions[];
  }
  export namespace TrustedProfileTemplateClaimRule {
    export namespace Constants {
      /** Type of the claim rule. */
      export enum Type {
        PROFILE_SAML = 'Profile-SAML',
      }
    }
  }

  /**
   * TrustedProfileTemplateList.
   */
  export interface TrustedProfileTemplateList {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of Profile Templates based on the query paramters and the page size. The profile_templates array is
     *  always part of the response but might be empty depending on the query parameter values provided.
     */
    profile_templates: TrustedProfileTemplateResponse[];
  }

  /**
   * Response body format for Trusted Profile Template REST requests.
   */
  export interface TrustedProfileTemplateResponse {
    /** ID of the the template. */
    id: string;
    /** Version of the the template. */
    version: number;
    /** ID of the account where the template resides. */
    account_id: string;
    /** The name of the trusted profile template. This is visible only in the enterprise account. */
    name: string;
    /** The description of the trusted profile template. Describe the template for enterprise account users. */
    description?: string;
    /** Committed flag determines if the template is ready for assignment. */
    committed?: boolean;
    /** Input body parameters for the TemplateProfileComponent. */
    profile?: TemplateProfileComponentResponse;
    /** Existing policy templates that you can reference to assign access in the trusted profile component. */
    policy_template_references?: PolicyTemplateReference[];
    action_controls?: ActionControls;
    /** History of the trusted profile template. */
    history?: EnityHistoryRecord[];
    /** Entity tag for this templateId-version combination. */
    entity_tag?: string;
    /** Cloud resource name. */
    crn?: string;
    /** Timestamp of when the template was created. */
    created_at?: string;
    /** IAMid of the creator. */
    created_by_id?: string;
    /** Timestamp of when the template was last modified. */
    last_modified_at?: string;
    /** IAMid of the identity that made the latest modification. */
    last_modified_by_id?: string;
  }

  /**
   * Response body format for the List trusted profiles V1 REST request.
   */
  export interface TrustedProfilesList {
    /** Context with key properties for problem determination. */
    context?: ResponseContext;
    /** The offset of the current page. */
    offset?: number;
    /** Optional size of a single page. Default is 20 items per page. Valid range is 1 to 100. */
    limit?: number;
    /** Link to the first page. */
    first?: string;
    /** Link to the previous available page. If 'previous' property is not part of the response no previous page is
     *  available.
     */
    previous?: string;
    /** Link to the next available page. If 'next' property is not part of the response no next page is available. */
    next?: string;
    /** List of trusted profiles. */
    profiles: TrustedProfile[];
  }

  /**
   * UserActivity.
   */
  export interface UserActivity {
    /** IAMid of the user. */
    iam_id: string;
    /** Name of the user. */
    name?: string;
    /** Username of the user. */
    username: string;
    /** Email of the user. */
    email?: string;
    /** Time when the user was last authenticated. */
    last_authn?: string;
  }

  /**
   * UserMfaEnrollments.
   */
  export interface UserMfaEnrollments {
    /** IAMid of the user. */
    iam_id: string;
    /** currently effective mfa type i.e. id_based_mfa or account_based_mfa. */
    effective_mfa_type?: string;
    id_based_mfa?: IdBasedMfaEnrollment;
    account_based_mfa?: AccountBasedMfaEnrollment;
  }

  /**
   * UserReportMfaEnrollmentStatus.
   */
  export interface UserReportMfaEnrollmentStatus {
    /** IAMid of the user. */
    iam_id: string;
    /** Name of the user. */
    name?: string;
    /** Username of the user. */
    username: string;
    /** Email of the user. */
    email?: string;
    enrollments: MfaEnrollments;
  }
}

export = IamIdentityV1;
