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
 * IBM OpenAPI SDK Code Generator Version: 3.105.0-3c13b041-20250605-193116
 */

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
 * Manage your tags with the Tagging API in IBM Cloud. You can attach, detach, delete, or list all of the tags in your
 * billing account with the Tagging API. The tag name must be unique within a billing account. You can create tags in
 * two formats: `key:value` or `label`. The tagging API supports three types of tag: `user` `service`, and `access`
 * tags. `service` tags cannot be attached to IMS resources. `service` tags must be in the form
 * `service_prefix:tag_label` where `service_prefix` identifies the Service owning the tag. `access` tags cannot be
 * attached to IMS resources. They must be in the form `key:value`. You can replace all resource's tags using the
 * `replace` query parameter in the attach operation. You can update the `value` of a resource's tag in the format
 * `key:value`, using the `update` query parameter in the attach operation.
 *
 * API Version: 1.2.0
 */

class GlobalTaggingV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://tags.global-search-tagging.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'global_tagging';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of GlobalTaggingV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {GlobalTaggingV1}
   */

  public static newInstance(options: UserOptions): GlobalTaggingV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new GlobalTaggingV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a GlobalTaggingV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {GlobalTaggingV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(GlobalTaggingV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * tags
   ************************/

  /**
   * Get all tags.
   *
   * Lists all tags that are in a billing account. Use the `attached_to` parameter to return the list of tags that are
   * attached to the specified resource.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xRequestId] - An alphanumeric string that is used to trace the request. The value  may
   * include ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and
   * underscore (_) and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that
   * value includes any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or
   * invalid, it is automatically replaced by a random (version 4) UUID.
   * @param {string} [params.xCorrelationId] - An alphanumeric string that is used to trace the request as a part of a
   * larger context: the same value is used for downstream requests and retries of those requests. The value may include
   * ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_)
   * and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that value includes
   * any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is
   * automatically replaced by a random (version 4) UUID.
   * @param {string} [params.accountId] - The ID of the billing account to list the tags for. If it is not set, then it
   * is taken from the authorization token. This parameter is required if `tag_type` is set to `service`.
   * @param {string} [params.tagType] - The type of the tag you want to list. Supported values are `user`, `service` and
   * `access`.
   * @param {boolean} [params.fullData] - If set to `true`, this query returns the provider, `ghost`, `ims` or
   * `ghost,ims`, where the tag exists and the number of attached resources.
   * @param {string[]} [params.providers] - Select a provider. Supported values are `ghost` and `ims`. To list both
   * Global Search and Tagging tags and infrastructure tags, use `ghost,ims`. `service` and `access` tags can only be
   * attached to resources that are onboarded to Global Search and Tagging, so you should not set this parameter to list
   * them.
   * @param {string} [params.attachedTo] - If you want to return only the list of tags that are attached to a specified
   * resource, pass the ID of the resource on this parameter. For resources that are onboarded to Global Search and
   * Tagging, the resource ID is the CRN; for IMS resources, it is the IMS ID. When using this parameter, you must
   * specify the appropriate provider (`ims` or `ghost`).
   * @param {number} [params.offset] - The offset is the index of the item from which you want to start returning data
   * from.
   * @param {number} [params.limit] - The number of tags to return.
   * @param {number} [params.timeout] - The timeout in milliseconds, bounds the request to run within the specified time
   * value. It returns the accumulated results until time runs out.
   * @param {string} [params.orderByName] - Order the output by tag name.
   * @param {boolean} [params.attachedOnly] - Filter on attached tags. If `true`, it returns only tags that are attached
   * to one or more resources. If `false`, it returns all tags.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalTaggingV1.Response<GlobalTaggingV1.TagList>>}
   */
  public listTags(
    params?: GlobalTaggingV1.ListTagsParams
  ): Promise<GlobalTaggingV1.Response<GlobalTaggingV1.TagList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'xRequestId',
      'xCorrelationId',
      'accountId',
      'tagType',
      'fullData',
      'providers',
      'attachedTo',
      'offset',
      'limit',
      'timeout',
      'orderByName',
      'attachedOnly',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'tag_type': _params.tagType,
      'full_data': _params.fullData,
      'providers': _params.providers,
      'attached_to': _params.attachedTo,
      'offset': _params.offset,
      'limit': _params.limit,
      'timeout': _params.timeout,
      'order_by_name': _params.orderByName,
      'attached_only': _params.attachedOnly,
    };

    const sdkHeaders = getSdkHeaders(GlobalTaggingV1.DEFAULT_SERVICE_NAME, 'v1', 'listTags');

    const parameters = {
      options: {
        url: '/v3/tags',
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
            'x-request-id': _params.xRequestId,
            'x-correlation-id': _params.xCorrelationId,
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
   * Create an access management tag.
   *
   * Create an access management tag. To create an `access` tag, you must have the access listed in the [Granting users
   * access to tag resources](https://cloud.ibm.com/docs/account?topic=account-access) documentation. `service` and
   * `user` tags cannot be created upfront. They are created when they are attached for the first time to a resource.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.tagNames - An array of tag names to create.
   * @param {string} [params.xRequestId] - An alphanumeric string that is used to trace the request. The value  may
   * include ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and
   * underscore (_) and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that
   * value includes any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or
   * invalid, it is automatically replaced by a random (version 4) UUID.
   * @param {string} [params.xCorrelationId] - An alphanumeric string that is used to trace the request as a part of a
   * larger context: the same value is used for downstream requests and retries of those requests. The value may include
   * ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_)
   * and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that value includes
   * any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is
   * automatically replaced by a random (version 4) UUID.
   * @param {string} [params.accountId] - The ID of the billing account where the tag must be created.
   * @param {string} [params.tagType] - The type of the tags you want to create. The only allowed value is `access`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalTaggingV1.Response<GlobalTaggingV1.CreateTagResults>>}
   */
  public createTag(
    params: GlobalTaggingV1.CreateTagParams
  ): Promise<GlobalTaggingV1.Response<GlobalTaggingV1.CreateTagResults>> {
    const _params = { ...params };
    const _requiredParams = ['tagNames'];
    const _validParams = [
      'tagNames',
      'xRequestId',
      'xCorrelationId',
      'accountId',
      'tagType',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tag_names': _params.tagNames,
    };

    const query = {
      'account_id': _params.accountId,
      'tag_type': _params.tagType,
    };

    const sdkHeaders = getSdkHeaders(GlobalTaggingV1.DEFAULT_SERVICE_NAME, 'v1', 'createTag');

    const parameters = {
      options: {
        url: '/v3/tags',
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
            'x-request-id': _params.xRequestId,
            'x-correlation-id': _params.xCorrelationId,
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
   * Delete all unused tags.
   *
   * Delete the tags that are not attached to any resource.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xRequestId] - An alphanumeric string that is used to trace the request. The value  may
   * include ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and
   * underscore (_) and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that
   * value includes any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or
   * invalid, it is automatically replaced by a random (version 4) UUID.
   * @param {string} [params.xCorrelationId] - An alphanumeric string that is used to trace the request as a part of a
   * larger context: the same value is used for downstream requests and retries of those requests. The value may include
   * ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_)
   * and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that value includes
   * any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is
   * automatically replaced by a random (version 4) UUID.
   * @param {string} [params.providers] - Select a provider. Supported values are `ghost` and `ims`.
   * @param {string} [params.accountId] - The ID of the billing account to delete the tags for. If it is not set, then
   * it is taken from the authorization token. It is a required parameter if `tag_type` is set to `service`.
   * @param {string} [params.tagType] - The type of the tag. Supported values are `user`, `service` and `access`.
   * `service` and `access` are not supported for IMS resources (`providers` parameter set to `ims`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalTaggingV1.Response<GlobalTaggingV1.DeleteTagsResult>>}
   */
  public deleteTagAll(
    params?: GlobalTaggingV1.DeleteTagAllParams
  ): Promise<GlobalTaggingV1.Response<GlobalTaggingV1.DeleteTagsResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'xRequestId',
      'xCorrelationId',
      'providers',
      'accountId',
      'tagType',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'providers': _params.providers,
      'account_id': _params.accountId,
      'tag_type': _params.tagType,
    };

    const sdkHeaders = getSdkHeaders(GlobalTaggingV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTagAll');

    const parameters = {
      options: {
        url: '/v3/tags',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': 'application/json',
            'x-request-id': _params.xRequestId,
            'x-correlation-id': _params.xCorrelationId,
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
   * Delete an unused tag.
   *
   * Delete an existing tag. A tag can be deleted only if it is not attached to any resource.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.tagName - The name of tag to be deleted.
   * @param {string} [params.xRequestId] - An alphanumeric string that is used to trace the request. The value  may
   * include ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and
   * underscore (_) and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that
   * value includes any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or
   * invalid, it is automatically replaced by a random (version 4) UUID.
   * @param {string} [params.xCorrelationId] - An alphanumeric string that is used to trace the request as a part of a
   * larger context: the same value is used for downstream requests and retries of those requests. The value may include
   * ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_)
   * and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that value includes
   * any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is
   * automatically replaced by a random (version 4) UUID.
   * @param {string[]} [params.providers] - Select a provider. Supported values are `ghost` and `ims`. To delete tags
   * both in Global Search and Tagging and in IMS, use `ghost,ims`.
   * @param {string} [params.accountId] - The ID of the billing account to delete the tag for. It is a required
   * parameter if `tag_type` is set to `service`, otherwise it is inferred from the authorization IAM token.
   * @param {string} [params.tagType] - The type of the tag. Supported values are `user`, `service` and `access`.
   * `service` and `access` are not supported for IMS resources (`providers` parameter set to `ims`).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalTaggingV1.Response<GlobalTaggingV1.DeleteTagResults>>}
   */
  public deleteTag(
    params: GlobalTaggingV1.DeleteTagParams
  ): Promise<GlobalTaggingV1.Response<GlobalTaggingV1.DeleteTagResults>> {
    const _params = { ...params };
    const _requiredParams = ['tagName'];
    const _validParams = [
      'tagName',
      'xRequestId',
      'xCorrelationId',
      'providers',
      'accountId',
      'tagType',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'providers': _params.providers,
      'account_id': _params.accountId,
      'tag_type': _params.tagType,
    };

    const path = {
      'tag_name': _params.tagName,
    };

    const sdkHeaders = getSdkHeaders(GlobalTaggingV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteTag');

    const parameters = {
      options: {
        url: '/v3/tags/{tag_name}',
        method: 'DELETE',
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
            'x-request-id': _params.xRequestId,
            'x-correlation-id': _params.xCorrelationId,
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
   * Attach tags.
   *
   * Attaches one or more tags to one or more resources. Each resource can have no more than 1000 tags per each 'user'
   * and 'service' type, and no more than 250 'access' tags (which is the account limit).
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.tagName] - The name of the tag to attach.
   * @param {string[]} [params.tagNames] - An array of tag names to attach.
   * @param {Resource[]} [params.resources] - List of resources on which the tagging operation operates on.
   * @param {QueryString} [params.query] - A valid Global Search string.
   * @param {string} [params.xRequestId] - An alphanumeric string that is used to trace the request. The value  may
   * include ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and
   * underscore (_) and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that
   * value includes any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or
   * invalid, it is automatically replaced by a random (version 4) UUID.
   * @param {string} [params.xCorrelationId] - An alphanumeric string that is used to trace the request as a part of a
   * larger context: the same value is used for downstream requests and retries of those requests. The value may include
   * ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_)
   * and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that value includes
   * any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is
   * automatically replaced by a random (version 4) UUID.
   * @param {string} [params.accountId] - The ID of the billing account of the tagged resource. It is a required
   * parameter if `tag_type` is set to `service`. Otherwise, it is inferred from the authorization IAM token.
   * @param {string} [params.tagType] - The type of the tag. Supported values are `user`, `service` and `access`.
   * `service` and `access` are not supported for IMS resources.
   * @param {boolean} [params.replace] - Flag to request replacement of all attached tags. Set `true` if you want to
   * replace all tags attached to the resource with the current ones. Default value is false.
   * @param {boolean} [params.update] - Flag to request update of attached tags in the format `key:value`. Here's how it
   * works for each tag in the request body: If the tag to attach is in the format `key:value`, the System will
   * atomically detach all existing tags starting with `key:` and attach the new `key:value` tag. If no such tags exist,
   * a new `key:value` tag will be attached. If the tag is not in the `key:value` format (e.g., a simple label), the
   * System will attach the label as usual. The update query parameter is available for user and access management tags,
   * but not for service tags.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalTaggingV1.Response<GlobalTaggingV1.TagResults>>}
   */
  public attachTag(
    params?: GlobalTaggingV1.AttachTagParams
  ): Promise<GlobalTaggingV1.Response<GlobalTaggingV1.TagResults>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'tagName',
      'tagNames',
      'resources',
      'query',
      'xRequestId',
      'xCorrelationId',
      'accountId',
      'tagType',
      'replace',
      'update',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tag_name': _params.tagName,
      'tag_names': _params.tagNames,
      'resources': _params.resources,
      'query': _params.query,
    };

    const query = {
      'account_id': _params.accountId,
      'tag_type': _params.tagType,
      'replace': _params.replace,
      'update': _params.update,
    };

    const sdkHeaders = getSdkHeaders(GlobalTaggingV1.DEFAULT_SERVICE_NAME, 'v1', 'attachTag');

    const parameters = {
      options: {
        url: '/v3/tags/attach',
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
            'x-request-id': _params.xRequestId,
            'x-correlation-id': _params.xCorrelationId,
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
   * Detach tags.
   *
   * Detaches one or more tags from one or more resources.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.tagName] - The name of the tag to detach.
   * @param {string[]} [params.tagNames] - An array of tag names to detach.
   * @param {Resource[]} [params.resources] - List of resources on which the tagging operation operates on.
   * @param {QueryString} [params.query] - A valid Global Search string.
   * @param {string} [params.xRequestId] - An alphanumeric string that is used to trace the request. The value  may
   * include ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and
   * underscore (_) and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that
   * value includes any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or
   * invalid, it is automatically replaced by a random (version 4) UUID.
   * @param {string} [params.xCorrelationId] - An alphanumeric string that is used to trace the request as a part of a
   * larger context: the same value is used for downstream requests and retries of those requests. The value may include
   * ASCII alphanumerics and any of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_)
   * and may have a length up to 1024 bytes. The value is considered invalid and must be ignored if that value includes
   * any other character or is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is
   * automatically replaced by a random (version 4) UUID.
   * @param {string} [params.accountId] - The ID of the billing account of the untagged resource. It is a required
   * parameter if `tag_type` is set to `service`, otherwise it is inferred from the authorization IAM token.
   * @param {string} [params.tagType] - The type of the tag. Supported values are `user`, `service` and `access`.
   * `service` and `access` are not supported for IMS resources.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalTaggingV1.Response<GlobalTaggingV1.TagResults>>}
   */
  public detachTag(
    params?: GlobalTaggingV1.DetachTagParams
  ): Promise<GlobalTaggingV1.Response<GlobalTaggingV1.TagResults>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'tagName',
      'tagNames',
      'resources',
      'query',
      'xRequestId',
      'xCorrelationId',
      'accountId',
      'tagType',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tag_name': _params.tagName,
      'tag_names': _params.tagNames,
      'resources': _params.resources,
      'query': _params.query,
    };

    const query = {
      'account_id': _params.accountId,
      'tag_type': _params.tagType,
    };

    const sdkHeaders = getSdkHeaders(GlobalTaggingV1.DEFAULT_SERVICE_NAME, 'v1', 'detachTag');

    const parameters = {
      options: {
        url: '/v3/tags/detach',
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
            'x-request-id': _params.xRequestId,
            'x-correlation-id': _params.xCorrelationId,
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
}

/*************************
 * interfaces
 ************************/

namespace GlobalTaggingV1 {
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

  /** Parameters for the `listTags` operation. */
  export interface ListTagsParams extends DefaultParams {
    /** An alphanumeric string that is used to trace the request. The value  may include ASCII alphanumerics and any
     *  of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up
     *  to 1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or
     *  is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically
     *  replaced by a random (version 4) UUID.
     */
    xRequestId?: string;
    /** An alphanumeric string that is used to trace the request as a part of a larger context: the same value is
     *  used for downstream requests and retries of those requests. The value may include ASCII alphanumerics and any of
     *  following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up to
     *  1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or is
     *  longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically replaced
     *  by a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The ID of the billing account to list the tags for. If it is not set, then it is taken from the
     *  authorization token. This parameter is required if `tag_type` is set to `service`.
     */
    accountId?: string;
    /** The type of the tag you want to list. Supported values are `user`, `service` and `access`. */
    tagType?: ListTagsConstants.TagType | string;
    /** If set to `true`, this query returns the provider, `ghost`, `ims` or `ghost,ims`, where the tag exists and
     *  the number of attached resources.
     */
    fullData?: boolean;
    /** Select a provider. Supported values are `ghost` and `ims`. To list both Global Search and Tagging tags and
     *  infrastructure tags, use `ghost,ims`. `service` and `access` tags can only be attached to resources that are
     *  onboarded to Global Search and Tagging, so you should not set this parameter to list them.
     */
    providers?: ListTagsConstants.Providers[] | string[];
    /** If you want to return only the list of tags that are attached to a specified resource, pass the ID of the
     *  resource on this parameter. For resources that are onboarded to Global Search and Tagging, the resource ID is
     *  the CRN; for IMS resources, it is the IMS ID. When using this parameter, you must specify the appropriate
     *  provider (`ims` or `ghost`).
     */
    attachedTo?: string;
    /** The offset is the index of the item from which you want to start returning data from. */
    offset?: number;
    /** The number of tags to return. */
    limit?: number;
    /** The timeout in milliseconds, bounds the request to run within the specified time value. It returns the
     *  accumulated results until time runs out.
     */
    timeout?: number;
    /** Order the output by tag name. */
    orderByName?: ListTagsConstants.OrderByName | string;
    /** Filter on attached tags. If `true`, it returns only tags that are attached to one or more resources. If
     *  `false`, it returns all tags.
     */
    attachedOnly?: boolean;
  }

  /** Constants for the `listTags` operation. */
  export namespace ListTagsConstants {
    /** The type of the tag you want to list. Supported values are `user`, `service` and `access`. */
    export enum TagType {
      USER = 'user',
      SERVICE = 'service',
      ACCESS = 'access',
    }
    /** Select a provider. Supported values are `ghost` and `ims`. To list both Global Search and Tagging tags and infrastructure tags, use `ghost,ims`. `service` and `access` tags can only be attached to resources that are onboarded to Global Search and Tagging, so you should not set this parameter to list them. */
    export enum Providers {
      GHOST = 'ghost',
      IMS = 'ims',
    }
    /** Order the output by tag name. */
    export enum OrderByName {
      ASC = 'asc',
      DESC = 'desc',
    }
  }

  /** Parameters for the `createTag` operation. */
  export interface CreateTagParams extends DefaultParams {
    /** An array of tag names to create. */
    tagNames: string[];
    /** An alphanumeric string that is used to trace the request. The value  may include ASCII alphanumerics and any
     *  of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up
     *  to 1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or
     *  is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically
     *  replaced by a random (version 4) UUID.
     */
    xRequestId?: string;
    /** An alphanumeric string that is used to trace the request as a part of a larger context: the same value is
     *  used for downstream requests and retries of those requests. The value may include ASCII alphanumerics and any of
     *  following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up to
     *  1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or is
     *  longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically replaced
     *  by a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The ID of the billing account where the tag must be created. */
    accountId?: string;
    /** The type of the tags you want to create. The only allowed value is `access`. */
    tagType?: CreateTagConstants.TagType | string;
  }

  /** Constants for the `createTag` operation. */
  export namespace CreateTagConstants {
    /** The type of the tags you want to create. The only allowed value is `access`. */
    export enum TagType {
      ACCESS = 'access',
    }
  }

  /** Parameters for the `deleteTagAll` operation. */
  export interface DeleteTagAllParams extends DefaultParams {
    /** An alphanumeric string that is used to trace the request. The value  may include ASCII alphanumerics and any
     *  of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up
     *  to 1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or
     *  is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically
     *  replaced by a random (version 4) UUID.
     */
    xRequestId?: string;
    /** An alphanumeric string that is used to trace the request as a part of a larger context: the same value is
     *  used for downstream requests and retries of those requests. The value may include ASCII alphanumerics and any of
     *  following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up to
     *  1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or is
     *  longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically replaced
     *  by a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Select a provider. Supported values are `ghost` and `ims`. */
    providers?: DeleteTagAllConstants.Providers | string;
    /** The ID of the billing account to delete the tags for. If it is not set, then it is taken from the
     *  authorization token. It is a required parameter if `tag_type` is set to `service`.
     */
    accountId?: string;
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not
     *  supported for IMS resources (`providers` parameter set to `ims`).
     */
    tagType?: DeleteTagAllConstants.TagType | string;
  }

  /** Constants for the `deleteTagAll` operation. */
  export namespace DeleteTagAllConstants {
    /** Select a provider. Supported values are `ghost` and `ims`. */
    export enum Providers {
      GHOST = 'ghost',
      IMS = 'ims',
    }
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not supported for IMS resources (`providers` parameter set to `ims`). */
    export enum TagType {
      USER = 'user',
      SERVICE = 'service',
      ACCESS = 'access',
    }
  }

  /** Parameters for the `deleteTag` operation. */
  export interface DeleteTagParams extends DefaultParams {
    /** The name of tag to be deleted. */
    tagName: string;
    /** An alphanumeric string that is used to trace the request. The value  may include ASCII alphanumerics and any
     *  of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up
     *  to 1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or
     *  is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically
     *  replaced by a random (version 4) UUID.
     */
    xRequestId?: string;
    /** An alphanumeric string that is used to trace the request as a part of a larger context: the same value is
     *  used for downstream requests and retries of those requests. The value may include ASCII alphanumerics and any of
     *  following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up to
     *  1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or is
     *  longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically replaced
     *  by a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Select a provider. Supported values are `ghost` and `ims`. To delete tags both in Global Search and Tagging
     *  and in IMS, use `ghost,ims`.
     */
    providers?: DeleteTagConstants.Providers[] | string[];
    /** The ID of the billing account to delete the tag for. It is a required parameter if `tag_type` is set to
     *  `service`, otherwise it is inferred from the authorization IAM token.
     */
    accountId?: string;
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not
     *  supported for IMS resources (`providers` parameter set to `ims`).
     */
    tagType?: DeleteTagConstants.TagType | string;
  }

  /** Constants for the `deleteTag` operation. */
  export namespace DeleteTagConstants {
    /** Select a provider. Supported values are `ghost` and `ims`. To delete tags both in Global Search and Tagging and in IMS, use `ghost,ims`. */
    export enum Providers {
      GHOST = 'ghost',
      IMS = 'ims',
    }
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not supported for IMS resources (`providers` parameter set to `ims`). */
    export enum TagType {
      USER = 'user',
      SERVICE = 'service',
      ACCESS = 'access',
    }
  }

  /** Parameters for the `attachTag` operation. */
  export interface AttachTagParams extends DefaultParams {
    /** The name of the tag to attach. */
    tagName?: string;
    /** An array of tag names to attach. */
    tagNames?: string[];
    /** List of resources on which the tagging operation operates on. */
    resources?: Resource[];
    /** A valid Global Search string. */
    query?: QueryString;
    /** An alphanumeric string that is used to trace the request. The value  may include ASCII alphanumerics and any
     *  of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up
     *  to 1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or
     *  is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically
     *  replaced by a random (version 4) UUID.
     */
    xRequestId?: string;
    /** An alphanumeric string that is used to trace the request as a part of a larger context: the same value is
     *  used for downstream requests and retries of those requests. The value may include ASCII alphanumerics and any of
     *  following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up to
     *  1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or is
     *  longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically replaced
     *  by a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The ID of the billing account of the tagged resource. It is a required parameter if `tag_type` is set to
     *  `service`. Otherwise, it is inferred from the authorization IAM token.
     */
    accountId?: string;
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not
     *  supported for IMS resources.
     */
    tagType?: AttachTagConstants.TagType | string;
    /** Flag to request replacement of all attached tags. Set `true` if you want to replace all tags attached to the
     *  resource with the current ones. Default value is false.
     */
    replace?: boolean;
    /** Flag to request update of attached tags in the format `key:value`. Here's how it works for each tag in the
     *  request body: If the tag to attach is in the format `key:value`, the System will atomically detach all existing
     *  tags starting with `key:` and attach the new `key:value` tag. If no such tags exist, a new `key:value` tag will
     *  be attached. If the tag is not in the `key:value` format (e.g., a simple label), the System will attach the
     *  label as usual. The update query parameter is available for user and access management tags, but not for service
     *  tags.
     */
    update?: boolean;
  }

  /** Constants for the `attachTag` operation. */
  export namespace AttachTagConstants {
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not supported for IMS resources. */
    export enum TagType {
      USER = 'user',
      SERVICE = 'service',
      ACCESS = 'access',
    }
  }

  /** Parameters for the `detachTag` operation. */
  export interface DetachTagParams extends DefaultParams {
    /** The name of the tag to detach. */
    tagName?: string;
    /** An array of tag names to detach. */
    tagNames?: string[];
    /** List of resources on which the tagging operation operates on. */
    resources?: Resource[];
    /** A valid Global Search string. */
    query?: QueryString;
    /** An alphanumeric string that is used to trace the request. The value  may include ASCII alphanumerics and any
     *  of following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up
     *  to 1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or
     *  is longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically
     *  replaced by a random (version 4) UUID.
     */
    xRequestId?: string;
    /** An alphanumeric string that is used to trace the request as a part of a larger context: the same value is
     *  used for downstream requests and retries of those requests. The value may include ASCII alphanumerics and any of
     *  following segment separators: space ( ), comma (,), hyphen, (-), and underscore (_) and may have a length up to
     *  1024 bytes. The value is considered invalid and must be ignored if that value includes any other character or is
     *  longer than 1024 bytes or is fewer than 8 characters. If not specified or invalid, it is automatically replaced
     *  by a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** The ID of the billing account of the untagged resource. It is a required parameter if `tag_type` is set to
     *  `service`, otherwise it is inferred from the authorization IAM token.
     */
    accountId?: string;
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not
     *  supported for IMS resources.
     */
    tagType?: DetachTagConstants.TagType | string;
  }

  /** Constants for the `detachTag` operation. */
  export namespace DetachTagConstants {
    /** The type of the tag. Supported values are `user`, `service` and `access`. `service` and `access` are not supported for IMS resources. */
    export enum TagType {
      USER = 'user',
      SERVICE = 'service',
      ACCESS = 'access',
    }
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Results of a create tag(s) request.
   */
  export interface CreateTagResults {
    /** Array of results of a create_tag request. */
    results?: CreateTagResultsResultsItem[];
  }

  /**
   * CreateTagResultsResultsItem.
   */
  export interface CreateTagResultsResultsItem {
    /** The name of the tag created. */
    tag_name?: string;
    /** true if the tag was not created (for example, the tag already exists). */
    is_error?: boolean;
  }

  /**
   * Results of a delete_tag request.
   */
  export interface DeleteTagResults {
    /** Array of results of a delete_tag request. */
    results?: DeleteTagResultsItem[];
  }

  /**
   * Result of a delete_tag request.
   *
   * This type supports additional properties of type any.
   */
  export interface DeleteTagResultsItem {
    /** The provider of the tag. */
    provider?: DeleteTagResultsItem.Constants.Provider | string;
    /** It is `true` if the operation exits with an error (for example, the tag does not exist). */
    is_error?: boolean;

    /**
     * DeleteTagResultsItem accepts additional properties of type any.
     */
    [propName: string]: any;
  }
  export namespace DeleteTagResultsItem {
    export namespace Constants {
      /** The provider of the tag. */
      export enum Provider {
        GHOST = 'ghost',
        IMS = 'ims',
      }
    }
  }

  /**
   * Results of deleting unattatched tags.
   */
  export interface DeleteTagsResult {
    /** The number of tags that have been deleted. */
    total_count?: number;
    /** It is set to true if there is at least one tag operation in error. */
    errors?: boolean;
    /** The list of tag operation results. */
    items?: DeleteTagsResultItem[];
  }

  /**
   * Result of a delete_tags request.
   */
  export interface DeleteTagsResultItem {
    /** The name of the deleted tag. */
    tag_name?: string;
    /** true if the tag was not deleted. */
    is_error?: boolean;
  }

  /**
   * A valid Global Search string.
   */
  export interface QueryString {
    /** The Lucene-formatted query string. */
    query_string: string;
  }

  /**
   * A resource that might have tags that are attached.
   */
  export interface Resource {
    /** The CRN or IMS ID of the resource. */
    resource_id: string;
    /** The IMS resource type of the resource. It can be one of SoftLayer_Virtual_DedicatedHost, SoftLayer_Hardware,
     *  SoftLayer_Hardware_Server, SoftLayer_Network_Application_Delivery_Controller, SoftLayer_Network_Vlan,
     *  SoftLayer_Network_Vlan_Firewall, SoftLayer_Network_Component_Firewall,
     *  SoftLayer_Network_Firewall_Module_Context, SoftLayer_Virtual_Guest.
     */
    resource_type?: string;
  }

  /**
   * A tag.
   */
  export interface Tag {
    /** The name of the tag. */
    name: string;
  }

  /**
   * A list of tags.
   */
  export interface TagList {
    /** Set the occurrences of the total tags that are associated with this account. */
    total_count?: number;
    /** The offset at which tags are returned. */
    offset?: number;
    /** The number of tags requested to be returned. */
    limit?: number;
    /** Array of output results. */
    items?: Tag[];
  }

  /**
   * Results of an attach_tag or detach_tag request.
   */
  export interface TagResults {
    /** Array of results of an attach_tag or detach_tag request. */
    results?: TagResultsItem[];
  }

  /**
   * Result of an attach_tag or detach_tag request for a tagged resource.
   */
  export interface TagResultsItem {
    /** The CRN or IMS ID of the resource. */
    resource_id: string;
    /** It is `true` if the operation exits with an error. */
    is_error?: boolean;
  }
}

export = GlobalTaggingV1;
