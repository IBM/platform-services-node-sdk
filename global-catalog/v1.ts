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
 * IBM OpenAPI SDK Code Generator Version: 3.106.0-09823488-20250707-071701
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
 * The catalog service manages offerings across geographies as the system of record. The catalog supports a RESTful API
 * where users can retrieve information about existing offerings and create, manage, and delete their offerings. Start
 * with the base URL and use the endpoints to retrieve metadata about services in the catalog and manage service
 * visbility. Depending on the kind of object, the metadata can include information about pricing, provisioning,
 * regions, and more. For more information, see the [catalog
 * documentation](https://cloud.ibm.com/docs/overview/catalog.html#global-catalog-overview).
 *
 * API Version: 1.0.3
 */

class GlobalCatalogV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://globalcatalog.cloud.ibm.com/api/v1';

  static DEFAULT_SERVICE_NAME: string = 'global_catalog';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of GlobalCatalogV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {GlobalCatalogV1}
   */

  public static newInstance(options: UserOptions): GlobalCatalogV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new GlobalCatalogV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a GlobalCatalogV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {GlobalCatalogV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(GlobalCatalogV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * object
   ************************/

  /**
   * Returns parent catalog entries.
   *
   * Includes key information, such as ID, name, kind, CRN, tags, and provider. This endpoint is ETag enabled.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {string} [params.include] - A GET call by default returns a basic set of properties. To include other
   * properties, you must add this parameter. A wildcard (`*`) includes all properties for an object, for example `GET
   * /?include=*`. To include specific metadata fields, separate each field with a colon (:), for example `GET
   * /?include=metadata.ui:metadata.pricing`.
   * @param {string} [params.q] - Searches the catalog entries for keywords. Add filters to refine your search. A query
   * filter, for example, `q=kind:iaas service_name rc:true`, filters entries of kind iaas with
   * metadata.service.rc_compatible set to true and  have a service name is in their name, display name, or description.
   *  Valid tags are **kind**:<string>, **tag**:<strging>, **rc**:[true|false], **iam**:[true|false],
   * **active**:[true|false], **geo**:<string>, and **price**:<string>.
   * @param {string} [params.sortBy] - The field on which the output is sorted. Sorts by default by **name** property.
   * Available fields are **name**, **displayname** (overview_ui.display_name), **kind**, **provider** (provider.name),
   * **sbsindex** (metadata.ui.side_by_side_index), and the time **created**, and **updated**.
   * @param {string} [params.descending] - Sets the sort order. The default is false, which is ascending.
   * @param {string} [params.languages] - Return the data strings in a specified language. By default, the strings
   * returned are of the language preferred by your browser through the Accept-Language header, which allows an override
   * of the header. Languages are specified in standard form, such as `en-us`. To include all languages use a wildcard
   * (*).
   * @param {boolean} [params.catalog] - Checks to see if a catalog's object is visible, or if it's filtered by service,
   * plan, deployment, or region. Use the value `?catalog=true`. If a `200` code is returned, the object is visible. If
   * a `403` code is returned, the object is not visible for the user.
   * @param {boolean} [params.complete] - Returns all available fields for all languages. Use the value `?complete=true`
   * as shortcut for ?include=*&languages=*.
   * @param {number} [params.offset] - Useful for pagination, specifies index (origin 0) of first item to return in
   * response.
   * @param {number} [params.limit] - Useful for pagination, specifies the maximum number of items to return in the
   * response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EntrySearchResult>>}
   */
  public listCatalogEntries(
    params?: GlobalCatalogV1.ListCatalogEntriesParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EntrySearchResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'account',
      'include',
      'q',
      'sortBy',
      'descending',
      'languages',
      'catalog',
      'complete',
      'offset',
      'limit',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
      'include': _params.include,
      'q': _params.q,
      'sort-by': _params.sortBy,
      'descending': _params.descending,
      'languages': _params.languages,
      'catalog': _params.catalog,
      'complete': _params.complete,
      '_offset': _params.offset,
      '_limit': _params.limit,
    };

    const sdkHeaders = getSdkHeaders(
      GlobalCatalogV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listCatalogEntries'
    );

    const parameters = {
      options: {
        url: '/',
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
   * Create a catalog entry.
   *
   * The created catalog entry is restricted by default. You must have an administrator or editor role in the scope of
   * the provided token. This API will return an ETag that can be used for standard ETag processing, except when depth
   * query is used.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - Programmatic name for this catalog entry, which must be formatted like a CRN segment.
   * See the display name in OverviewUI for a user-readable name.
   * @param {string} params.kind - The type of catalog entry which determines the type and shape of the object. Valid GC
   * types are buildpack, cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard.
   * @param {JsonObject} params.overviewUi - Overview is nested in the top level. The key value pair is
   * `[_language_]overview_ui`.
   * @param {Image} params.images - Image annotation for this catalog entry. The image is a URL.
   * @param {boolean} params.disabled - Boolean value that determines the global visibility for the catalog entry, and
   * its children. If it is not enabled, all plans are disabled.
   * @param {string[]} params.tags - A searchable list of tags. For example, IBM, 3rd Party, Beta, GA, and Single
   * Tenant. Valid values found at https://globalcatalog.test.cloud.ibm.com/search.
   * @param {Provider} params.provider - Information related to the provider associated with a catalog entry.
   * @param {string} params.id - Catalog entry's unique ID. It's the same across all catalog instances.
   * @param {string} [params.parentId] - The ID of the parent catalog entry if it exists.
   * @param {boolean} [params.group] - Boolean value that determines whether the catalog entry is a group.
   * @param {boolean} [params.active] - Boolean value that describes whether the service is active.
   * @param {string} [params.url] - Url of the object.
   * @param {ObjectMetadataSet} [params.metadata] - Model used to describe metadata object that can be set.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.CatalogEntry>>}
   */
  public createCatalogEntry(
    params: GlobalCatalogV1.CreateCatalogEntryParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.CatalogEntry>> {
    const _params = { ...params };
    const _requiredParams = [
      'name',
      'kind',
      'overviewUi',
      'images',
      'disabled',
      'tags',
      'provider',
      'id',
    ];
    const _validParams = [
      'name',
      'kind',
      'overviewUi',
      'images',
      'disabled',
      'tags',
      'provider',
      'id',
      'parentId',
      'group',
      'active',
      'url',
      'metadata',
      'account',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'kind': _params.kind,
      'overview_ui': _params.overviewUi,
      'images': _params.images,
      'disabled': _params.disabled,
      'tags': _params.tags,
      'provider': _params.provider,
      'id': _params.id,
      'parent_id': _params.parentId,
      'group': _params.group,
      'active': _params.active,
      'url': _params.url,
      'metadata': _params.metadata,
    };

    const query = {
      'account': _params.account,
    };

    const sdkHeaders = getSdkHeaders(
      GlobalCatalogV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createCatalogEntry'
    );

    const parameters = {
      options: {
        url: '/',
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
   * Get a specific catalog object.
   *
   * This endpoint returns a specific catalog entry using the object's unique identifier, for example
   * `/_*service_name*?complete=true`. This endpoint is ETag enabled. This can be used by an unauthenticated user for
   * publicly available services.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The catalog entry's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {string} [params.include] - A GET call by default returns a basic set of properties. To include other
   * properties, you must add this parameter. A wildcard (`*`) includes all properties for an object, for example `GET
   * /id?include=*`. To include specific metadata fields, separate each field with a colon (:), for example `GET
   * /id?include=metadata.ui:metadata.pricing`.
   * @param {string} [params.languages] - Return the data strings in the specified language. By default the strings
   * returned are of the language preferred by your browser through the Accept-Language header, which allows an override
   * of the header. Languages are specified in standard form, such as `en-us`. To include all languages use a wildcard
   * (*).
   * @param {boolean} [params.complete] - Returns all available fields for all languages. Use the value `?complete=true`
   * as shortcut for ?include=*&languages=*.
   * @param {number} [params.depth] - Return the children down to the requested depth. Use * to include the entire
   * children tree. If there are more children than the maximum permitted an error will be returned. Be judicious with
   * this as it can cause a large number of database accesses and can result in a large amount of data returned.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.CatalogEntry>>}
   */
  public getCatalogEntry(
    params: GlobalCatalogV1.GetCatalogEntryParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.CatalogEntry>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = [
      'id',
      'account',
      'include',
      'languages',
      'complete',
      'depth',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
      'include': _params.include,
      'languages': _params.languages,
      'complete': _params.complete,
      'depth': _params.depth,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'getCatalogEntry');

    const parameters = {
      options: {
        url: '/{id}',
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
   * Update a catalog entry.
   *
   * Update a catalog entry. The visibility of the catalog entry cannot be modified with this endpoint. You must be an
   * administrator or editor in the scope of the provided token. This endpoint is ETag enabled.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The object's unique ID.
   * @param {string} params.name - Programmatic name for this catalog entry, which must be formatted like a CRN segment.
   * See the display name in OverviewUI for a user-readable name.
   * @param {string} params.kind - The type of catalog entry which determines the type and shape of the object. Valid GC
   * types are buildpack, cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard.
   * @param {JsonObject} params.overviewUi - Overview is nested in the top level. The key value pair is
   * `[_language_]overview_ui`.
   * @param {Image} params.images - Image annotation for this catalog entry. The image is a URL.
   * @param {boolean} params.disabled - Boolean value that determines the global visibility for the catalog entry, and
   * its children. If it is not enabled, all plans are disabled.
   * @param {string[]} params.tags - A searchable list of tags. For example, IBM, 3rd Party, Beta, GA, and Single
   * Tenant. Valid values found at https://globalcatalog.test.cloud.ibm.com/search.
   * @param {Provider} params.provider - Information related to the provider associated with a catalog entry.
   * @param {string} [params.parentId] - The ID of the parent catalog entry if it exists.
   * @param {boolean} [params.group] - Boolean value that determines whether the catalog entry is a group.
   * @param {boolean} [params.active] - Boolean value that describes whether the service is active.
   * @param {string} [params.url] - Url of the object.
   * @param {ObjectMetadataSet} [params.metadata] - Model used to describe metadata object that can be set.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {string} [params.move] - Reparenting object. In the body set the parent_id to a different parent. Or remove
   * the parent_id field to reparent to the root of the catalog. If this is not set to 'true' then changing the
   * parent_id in the body of the request will not be permitted. If this is 'true' and no change to parent_id then this
   * is also error. This is to prevent accidental changing of parent.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.CatalogEntry>>}
   */
  public updateCatalogEntry(
    params: GlobalCatalogV1.UpdateCatalogEntryParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.CatalogEntry>> {
    const _params = { ...params };
    const _requiredParams = [
      'id',
      'name',
      'kind',
      'overviewUi',
      'images',
      'disabled',
      'tags',
      'provider',
    ];
    const _validParams = [
      'id',
      'name',
      'kind',
      'overviewUi',
      'images',
      'disabled',
      'tags',
      'provider',
      'parentId',
      'group',
      'active',
      'url',
      'metadata',
      'account',
      'move',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'kind': _params.kind,
      'overview_ui': _params.overviewUi,
      'images': _params.images,
      'disabled': _params.disabled,
      'tags': _params.tags,
      'provider': _params.provider,
      'parent_id': _params.parentId,
      'group': _params.group,
      'active': _params.active,
      'url': _params.url,
      'metadata': _params.metadata,
    };

    const query = {
      'account': _params.account,
      'move': _params.move,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      GlobalCatalogV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateCatalogEntry'
    );

    const parameters = {
      options: {
        url: '/{id}',
        method: 'PUT',
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
   * Delete a catalog entry.
   *
   * Delete a catalog entry. This will archive the catalog entry for a minimum of two weeks. While archived, it can be
   * restored using the PUT restore API. After two weeks, it will be deleted and cannot be restored. You must have
   * administrator role in the scope of the provided token to modify it. This endpoint is ETag enabled.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The object's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {boolean} [params.force] - This will cause entry to be deleted fully. By default it is archived for two
   * weeks, so that it can be restored if necessary.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>>}
   */
  public deleteCatalogEntry(
    params: GlobalCatalogV1.DeleteCatalogEntryParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'account', 'force', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
      'force': _params.force,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      GlobalCatalogV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteCatalogEntry'
    );

    const parameters = {
      options: {
        url: '/{id}',
        method: 'DELETE',
        qs: query,
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
   * Get child catalog entries of a specific kind.
   *
   * Fetch child catalog entries for a catalog entry with a specific id. This endpoint is ETag enabled. This can be used
   * by an unauthenticated user for publicly available services.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The parent catalog entry's ID.
   * @param {string} params.kind - The **kind** of child catalog entries to search for. A wildcard (*) includes all
   * child catalog entries for all kinds, for example `GET /service_name/_*`.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {string} [params.include] - A colon (:) separated list of properties to include. A GET call by defaults
   * return a limited set of properties. To include other properties, you must add the include parameter.  A wildcard
   * (*) includes all properties.
   * @param {string} [params.q] - A query filter, for example, `q=kind:iaas IBM`  will filter on entries of **kind**
   * iaas that has `IBM` in their name, display name, or description.
   * @param {string} [params.sortBy] - The field on which to sort the output. By default by name. Available fields are
   * **name**, **kind**, and **provider**.
   * @param {string} [params.descending] - The sort order. The default is false, which is ascending.
   * @param {string} [params.languages] - Return the data strings in the specified language. By default the strings
   * returned are of the language preferred by your browser through the Accept-Language header. This allows an override
   * of the header. Languages are specified in standard form, such as `en-us`. To include all languages use the wildcard
   * (*).
   * @param {boolean} [params.complete] - Use the value `?complete=true` as shortcut for ?include=*&languages=*.
   * @param {number} [params.offset] - Useful for pagination, specifies index (origin 0) of first item to return in
   * response.
   * @param {number} [params.limit] - Useful for pagination, specifies the maximum number of items to return in the
   * response.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EntrySearchResult>>}
   */
  public getChildObjects(
    params: GlobalCatalogV1.GetChildObjectsParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EntrySearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['id', 'kind'];
    const _validParams = [
      'id',
      'kind',
      'account',
      'include',
      'q',
      'sortBy',
      'descending',
      'languages',
      'complete',
      'offset',
      'limit',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
      'include': _params.include,
      'q': _params.q,
      'sort-by': _params.sortBy,
      'descending': _params.descending,
      'languages': _params.languages,
      'complete': _params.complete,
      '_offset': _params.offset,
      '_limit': _params.limit,
    };

    const path = {
      'id': _params.id,
      'kind': _params.kind,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'getChildObjects');

    const parameters = {
      options: {
        url: '/{id}/{kind}',
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
   * Restore archived catalog entry.
   *
   * Restore an archived catalog entry. You must have an administrator role in the scope of the provided token.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The catalog entry's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>>}
   */
  public restoreCatalogEntry(
    params: GlobalCatalogV1.RestoreCatalogEntryParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'account', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      GlobalCatalogV1.DEFAULT_SERVICE_NAME,
      'v1',
      'restoreCatalogEntry'
    );

    const parameters = {
      options: {
        url: '/{id}/restore',
        method: 'PUT',
        qs: query,
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
   * visibility
   ************************/

  /**
   * Get the visibility constraints for an object.
   *
   * This endpoint returns the visibility rules for this object. Overall visibility is determined by the parent objects
   * and any further restrictions on this object. You must have an administrator role in the scope of the provided
   * token. This endpoint is ETag enabled.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The object's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.Visibility>>}
   */
  public getVisibility(
    params: GlobalCatalogV1.GetVisibilityParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.Visibility>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'account', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'getVisibility');

    const parameters = {
      options: {
        url: '/{id}/visibility',
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
   * Update visibility.
   *
   * Update an Object's Visibility. You must have an administrator role in the scope of the provided token. This
   * endpoint is ETag enabled.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The object's unique ID.
   * @param {string} [params.restrictions] - This controls the overall visibility. It is an enum of *public*,
   * *nonibm_only*, *ibm_only*, and *private*. public means it is visible to all. nonibm_only means it is visible to all
   * except IBM unless their account is explicitly included, ibm_only means it is visible to all IBM unless their
   * account is explicitly excluded. private means it is visible only to the included accounts.
   * @param {boolean} [params.extendable] - Allows the visibility to be extendable.
   * @param {VisibilityDetail} [params.include] - Visibility details related to a catalog entry.
   * @param {VisibilityDetail} [params.exclude] - Visibility details related to a catalog entry.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>>}
   */
  public updateVisibility(
    params: GlobalCatalogV1.UpdateVisibilityParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = [
      'id',
      'restrictions',
      'extendable',
      'include',
      'exclude',
      'account',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'restrictions': _params.restrictions,
      'extendable': _params.extendable,
      'include': _params.include,
      'exclude': _params.exclude,
    };

    const query = {
      'account': _params.account,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      GlobalCatalogV1.DEFAULT_SERVICE_NAME,
      'v1',
      'updateVisibility'
    );

    const parameters = {
      options: {
        url: '/{id}/visibility',
        method: 'PUT',
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
  /*************************
   * pricing
   ************************/

  /**
   * Get the pricing for an object.
   *
   * This endpoint returns the pricing for an object. Static pricing is defined in the catalog. Dynamic pricing is
   * stored in IBM Cloud Pricing Catalog. This can be used by an unauthenticated user for publicly available services.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The object's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {string} [params.deploymentRegion] - Specify a region to retrieve plan pricing for a global deployment. The
   * value must match an entry in the `deployment_regions` list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.PricingGet>>}
   */
  public getPricing(
    params: GlobalCatalogV1.GetPricingParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.PricingGet>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'account', 'deploymentRegion', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
      'deployment_region': _params.deploymentRegion,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'getPricing');

    const parameters = {
      options: {
        url: '/{id}/pricing',
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
   * Get the pricing deployments for a plan.
   *
   * This endpoint returns the deployment pricing for a plan. For a plan it returns a pricing for each visible child
   * deployment object. Static pricing is defined in the catalog. Dynamic pricing is stored in IBM Cloud Pricing
   * Catalog. This can be used by an unauthenticated user for publicly available services.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The object's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.PricingSearchResult>>}
   */
  public getPricingDeployments(
    params: GlobalCatalogV1.GetPricingDeploymentsParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.PricingSearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = ['id', 'account', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(
      GlobalCatalogV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getPricingDeployments'
    );

    const parameters = {
      options: {
        url: '/{id}/pricing/deployment',
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
  /*************************
   * audit
   ************************/

  /**
   * Get the audit logs for an object.
   *
   * This endpoint returns the audit logs for an object. Only administrators and editors can get logs.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.id - The object's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {string} [params.ascending] - Sets the sort order. False is descending.
   * @param {string} [params.startat] - Starting time for the logs. If it's descending then the entries will be equal or
   * earlier. The default is latest. For ascending it will entries equal or later. The default is earliest. It can be
   * either a number or a string. If a number then it is in the format of Unix timestamps. If it is a string then it is
   * a date in the format YYYY-MM-DDTHH:MM:SSZ  and the time is UTC. The T and the Z are required. For example:
   * 2017-12-24T12:00:00Z for Noon UTC on Dec 24, 2017.
   * @param {number} [params.offset] - Count of number of log entries to skip before returning logs. The default is
   * zero.
   * @param {number} [params.limit] - Count of number of entries to return. The default is fifty. The maximum value is
   * two hundred.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.AuditSearchResult>>}
   */
  public getAuditLogs(
    params: GlobalCatalogV1.GetAuditLogsParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.AuditSearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['id'];
    const _validParams = [
      'id',
      'account',
      'ascending',
      'startat',
      'offset',
      'limit',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
      'ascending': _params.ascending,
      'startat': _params.startat,
      '_offset': _params.offset,
      '_limit': _params.limit,
    };

    const path = {
      'id': _params.id,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'getAuditLogs');

    const parameters = {
      options: {
        url: '/{id}/logs',
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
  /*************************
   * artifact
   ************************/

  /**
   * Get artifacts.
   *
   * This endpoint returns a list of artifacts for an object.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectId - The object's unique ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.Artifacts>>}
   */
  public listArtifacts(
    params: GlobalCatalogV1.ListArtifactsParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.Artifacts>> {
    const _params = { ...params };
    const _requiredParams = ['objectId'];
    const _validParams = ['objectId', 'account', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
    };

    const path = {
      'object_id': _params.objectId,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'listArtifacts');

    const parameters = {
      options: {
        url: '/{object_id}/artifacts',
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
   * Get artifact.
   *
   * This endpoint returns the binary of an artifact.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectId - The object's unique ID.
   * @param {string} params.artifactId - The artifact's ID.
   * @param {string} [params.accept] - The type of the response: *_/_*.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<NodeJS.ReadableStream>>}
   */
  public getArtifact(
    params: GlobalCatalogV1.GetArtifactParams
  ): Promise<GlobalCatalogV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['objectId', 'artifactId'];
    const _validParams = ['objectId', 'artifactId', 'accept', 'account', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
    };

    const path = {
      'object_id': _params.objectId,
      'artifact_id': _params.artifactId,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'getArtifact');

    const parameters = {
      options: {
        url: '/{object_id}/artifacts/{artifact_id}',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          this.baseOptions.headers,
          {
            'Accept': _params.accept,
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
   * Upload artifact.
   *
   * This endpoint uploads the binary for an artifact. Only administrators and editors can upload artifacts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectId - The object's unique ID.
   * @param {string} params.artifactId - The artifact's ID.
   * @param {NodeJS.ReadableStream | Buffer} [params.artifact] -
   * @param {string} [params.contentType] - The type of the input.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>>}
   */
  public uploadArtifact(
    params: GlobalCatalogV1.UploadArtifactParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['objectId', 'artifactId'];
    const _validParams = [
      'objectId',
      'artifactId',
      'artifact',
      'contentType',
      'account',
      'signal',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.artifact;
    const query = {
      'account': _params.account,
    };

    const path = {
      'object_id': _params.objectId,
      'artifact_id': _params.artifactId,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'uploadArtifact');

    const parameters = {
      options: {
        url: '/{object_id}/artifacts/{artifact_id}',
        method: 'PUT',
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
            'Content-Type': _params.contentType,
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
   * Delete artifact.
   *
   * This endpoint deletes an artifact. Only administrators and editors can delete artifacts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectId - The object's unique ID.
   * @param {string} params.artifactId - The artifact's ID.
   * @param {string} [params.account] - This changes the scope of the request regardless of the authorization header.
   * Example scopes are `account` and `global`. `account=global` is reqired if operating with a service ID that has a
   * global admin policy, for example `GET /?account=global`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>>}
   */
  public deleteArtifact(
    params: GlobalCatalogV1.DeleteArtifactParams
  ): Promise<GlobalCatalogV1.Response<GlobalCatalogV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['objectId', 'artifactId'];
    const _validParams = ['objectId', 'artifactId', 'account', 'signal', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account': _params.account,
    };

    const path = {
      'object_id': _params.objectId,
      'artifact_id': _params.artifactId,
    };

    const sdkHeaders = getSdkHeaders(GlobalCatalogV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteArtifact');

    const parameters = {
      options: {
        url: '/{object_id}/artifacts/{artifact_id}',
        method: 'DELETE',
        qs: query,
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

namespace GlobalCatalogV1 {
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

  /** Parameters for the `listCatalogEntries` operation. */
  export interface ListCatalogEntriesParams extends DefaultParams {
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
    /** A GET call by default returns a basic set of properties. To include other properties, you must add this
     *  parameter. A wildcard (`*`) includes all properties for an object, for example `GET /?include=*`. To include
     *  specific metadata fields, separate each field with a colon (:), for example `GET
     *  /?include=metadata.ui:metadata.pricing`.
     */
    include?: string;
    /** Searches the catalog entries for keywords. Add filters to refine your search. A query filter, for example,
     *  `q=kind:iaas service_name rc:true`, filters entries of kind iaas with metadata.service.rc_compatible set to true
     *  and  have a service name is in their name, display name, or description.  Valid tags are **kind**:<string>,
     *  **tag**:<strging>, **rc**:[true|false], **iam**:[true|false], **active**:[true|false], **geo**:<string>, and
     *  **price**:<string>.
     */
    q?: string;
    /** The field on which the output is sorted. Sorts by default by **name** property. Available fields are
     *  **name**, **displayname** (overview_ui.display_name), **kind**, **provider** (provider.name), **sbsindex**
     *  (metadata.ui.side_by_side_index), and the time **created**, and **updated**.
     */
    sortBy?: string;
    /** Sets the sort order. The default is false, which is ascending. */
    descending?: string;
    /** Return the data strings in a specified language. By default, the strings returned are of the language
     *  preferred by your browser through the Accept-Language header, which allows an override of the header. Languages
     *  are specified in standard form, such as `en-us`. To include all languages use a wildcard (*).
     */
    languages?: string;
    /** Checks to see if a catalog's object is visible, or if it's filtered by service, plan, deployment, or region.
     *  Use the value `?catalog=true`. If a `200` code is returned, the object is visible. If a `403` code is returned,
     *  the object is not visible for the user.
     */
    catalog?: boolean;
    /** Returns all available fields for all languages. Use the value `?complete=true` as shortcut for
     *  ?include=*&languages=*.
     */
    complete?: boolean;
    /** Useful for pagination, specifies index (origin 0) of first item to return in response. */
    offset?: number;
    /** Useful for pagination, specifies the maximum number of items to return in the response. */
    limit?: number;
  }

  /** Parameters for the `createCatalogEntry` operation. */
  export interface CreateCatalogEntryParams extends DefaultParams {
    /** Programmatic name for this catalog entry, which must be formatted like a CRN segment. See the display name
     *  in OverviewUI for a user-readable name.
     */
    name: string;
    /** The type of catalog entry which determines the type and shape of the object. Valid GC types are buildpack,
     *  cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard.
     */
    kind: CreateCatalogEntryConstants.Kind | string;
    /** Overview is nested in the top level. The key value pair is `[_language_]overview_ui`. */
    overviewUi: JsonObject;
    /** Image annotation for this catalog entry. The image is a URL. */
    images: Image;
    /** Boolean value that determines the global visibility for the catalog entry, and its children. If it is not
     *  enabled, all plans are disabled.
     */
    disabled: boolean;
    /** A searchable list of tags. For example, IBM, 3rd Party, Beta, GA, and Single Tenant. Valid values found at
     *  https://globalcatalog.test.cloud.ibm.com/search.
     */
    tags: string[];
    /** Information related to the provider associated with a catalog entry. */
    provider: Provider;
    /** Catalog entry's unique ID. It's the same across all catalog instances. */
    id: string;
    /** The ID of the parent catalog entry if it exists. */
    parentId?: string;
    /** Boolean value that determines whether the catalog entry is a group. */
    group?: boolean;
    /** Boolean value that describes whether the service is active. */
    active?: boolean;
    /** Url of the object. */
    url?: string;
    /** Model used to describe metadata object that can be set. */
    metadata?: ObjectMetadataSet;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Constants for the `createCatalogEntry` operation. */
  export namespace CreateCatalogEntryConstants {
    /** The type of catalog entry which determines the type and shape of the object. Valid GC types are buildpack, cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard. */
    export enum Kind {
      SERVICE = 'service',
      TEMPLATE = 'template',
      DASHBOARD = 'dashboard',
    }
  }

  /** Parameters for the `getCatalogEntry` operation. */
  export interface GetCatalogEntryParams extends DefaultParams {
    /** The catalog entry's unique ID. */
    id: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
    /** A GET call by default returns a basic set of properties. To include other properties, you must add this
     *  parameter. A wildcard (`*`) includes all properties for an object, for example `GET /id?include=*`. To include
     *  specific metadata fields, separate each field with a colon (:), for example `GET
     *  /id?include=metadata.ui:metadata.pricing`.
     */
    include?: string;
    /** Return the data strings in the specified language. By default the strings returned are of the language
     *  preferred by your browser through the Accept-Language header, which allows an override of the header. Languages
     *  are specified in standard form, such as `en-us`. To include all languages use a wildcard (*).
     */
    languages?: string;
    /** Returns all available fields for all languages. Use the value `?complete=true` as shortcut for
     *  ?include=*&languages=*.
     */
    complete?: boolean;
    /** Return the children down to the requested depth. Use * to include the entire children tree. If there are
     *  more children than the maximum permitted an error will be returned. Be judicious with this as it can cause a
     *  large number of database accesses and can result in a large amount of data returned.
     */
    depth?: number;
  }

  /** Parameters for the `updateCatalogEntry` operation. */
  export interface UpdateCatalogEntryParams extends DefaultParams {
    /** The object's unique ID. */
    id: string;
    /** Programmatic name for this catalog entry, which must be formatted like a CRN segment. See the display name
     *  in OverviewUI for a user-readable name.
     */
    name: string;
    /** The type of catalog entry which determines the type and shape of the object. Valid GC types are buildpack,
     *  cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard.
     */
    kind: UpdateCatalogEntryConstants.Kind | string;
    /** Overview is nested in the top level. The key value pair is `[_language_]overview_ui`. */
    overviewUi: JsonObject;
    /** Image annotation for this catalog entry. The image is a URL. */
    images: Image;
    /** Boolean value that determines the global visibility for the catalog entry, and its children. If it is not
     *  enabled, all plans are disabled.
     */
    disabled: boolean;
    /** A searchable list of tags. For example, IBM, 3rd Party, Beta, GA, and Single Tenant. Valid values found at
     *  https://globalcatalog.test.cloud.ibm.com/search.
     */
    tags: string[];
    /** Information related to the provider associated with a catalog entry. */
    provider: Provider;
    /** The ID of the parent catalog entry if it exists. */
    parentId?: string;
    /** Boolean value that determines whether the catalog entry is a group. */
    group?: boolean;
    /** Boolean value that describes whether the service is active. */
    active?: boolean;
    /** Url of the object. */
    url?: string;
    /** Model used to describe metadata object that can be set. */
    metadata?: ObjectMetadataSet;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
    /** Reparenting object. In the body set the parent_id to a different parent. Or remove the parent_id field to
     *  reparent to the root of the catalog. If this is not set to 'true' then changing the parent_id in the body of the
     *  request will not be permitted. If this is 'true' and no change to parent_id then this is also error. This is to
     *  prevent accidental changing of parent.
     */
    move?: string;
  }

  /** Constants for the `updateCatalogEntry` operation. */
  export namespace UpdateCatalogEntryConstants {
    /** The type of catalog entry which determines the type and shape of the object. Valid GC types are buildpack, cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard. */
    export enum Kind {
      SERVICE = 'service',
      TEMPLATE = 'template',
      DASHBOARD = 'dashboard',
    }
  }

  /** Parameters for the `deleteCatalogEntry` operation. */
  export interface DeleteCatalogEntryParams extends DefaultParams {
    /** The object's unique ID. */
    id: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
    /** This will cause entry to be deleted fully. By default it is archived for two weeks, so that it can be
     *  restored if necessary.
     */
    force?: boolean;
  }

  /** Parameters for the `getChildObjects` operation. */
  export interface GetChildObjectsParams extends DefaultParams {
    /** The parent catalog entry's ID. */
    id: string;
    /** The **kind** of child catalog entries to search for. A wildcard (*) includes all child catalog entries for
     *  all kinds, for example `GET /service_name/_*`.
     */
    kind: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
    /** A colon (:) separated list of properties to include. A GET call by defaults return a limited set of
     *  properties. To include other properties, you must add the include parameter.  A wildcard (*) includes all
     *  properties.
     */
    include?: string;
    /** A query filter, for example, `q=kind:iaas IBM`  will filter on entries of **kind** iaas that has `IBM` in
     *  their name, display name, or description.
     */
    q?: string;
    /** The field on which to sort the output. By default by name. Available fields are **name**, **kind**, and
     *  **provider**.
     */
    sortBy?: string;
    /** The sort order. The default is false, which is ascending. */
    descending?: string;
    /** Return the data strings in the specified language. By default the strings returned are of the language
     *  preferred by your browser through the Accept-Language header. This allows an override of the header. Languages
     *  are specified in standard form, such as `en-us`. To include all languages use the wildcard (*).
     */
    languages?: string;
    /** Use the value `?complete=true` as shortcut for ?include=*&languages=*. */
    complete?: boolean;
    /** Useful for pagination, specifies index (origin 0) of first item to return in response. */
    offset?: number;
    /** Useful for pagination, specifies the maximum number of items to return in the response. */
    limit?: number;
  }

  /** Parameters for the `restoreCatalogEntry` operation. */
  export interface RestoreCatalogEntryParams extends DefaultParams {
    /** The catalog entry's unique ID. */
    id: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Parameters for the `getVisibility` operation. */
  export interface GetVisibilityParams extends DefaultParams {
    /** The object's unique ID. */
    id: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Parameters for the `updateVisibility` operation. */
  export interface UpdateVisibilityParams extends DefaultParams {
    /** The object's unique ID. */
    id: string;
    /** This controls the overall visibility. It is an enum of *public*, *nonibm_only*, *ibm_only*, and *private*.
     *  public means it is visible to all. nonibm_only means it is visible to all except IBM unless their account is
     *  explicitly included, ibm_only means it is visible to all IBM unless their account is explicitly excluded.
     *  private means it is visible only to the included accounts.
     */
    restrictions?: string;
    /** Allows the visibility to be extendable. */
    extendable?: boolean;
    /** Visibility details related to a catalog entry. */
    include?: VisibilityDetail;
    /** Visibility details related to a catalog entry. */
    exclude?: VisibilityDetail;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Parameters for the `getPricing` operation. */
  export interface GetPricingParams extends DefaultParams {
    /** The object's unique ID. */
    id: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
    /** Specify a region to retrieve plan pricing for a global deployment. The value must match an entry in the
     *  `deployment_regions` list.
     */
    deploymentRegion?: string;
  }

  /** Parameters for the `getPricingDeployments` operation. */
  export interface GetPricingDeploymentsParams extends DefaultParams {
    /** The object's unique ID. */
    id: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Parameters for the `getAuditLogs` operation. */
  export interface GetAuditLogsParams extends DefaultParams {
    /** The object's unique ID. */
    id: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
    /** Sets the sort order. False is descending. */
    ascending?: string;
    /** Starting time for the logs. If it's descending then the entries will be equal or earlier. The default is
     *  latest. For ascending it will entries equal or later. The default is earliest. It can be either a number or a
     *  string. If a number then it is in the format of Unix timestamps. If it is a string then it is a date in the
     *  format YYYY-MM-DDTHH:MM:SSZ  and the time is UTC. The T and the Z are required. For example:
     *  2017-12-24T12:00:00Z for Noon UTC on Dec 24, 2017.
     */
    startat?: string;
    /** Count of number of log entries to skip before returning logs. The default is zero. */
    offset?: number;
    /** Count of number of entries to return. The default is fifty. The maximum value is two hundred. */
    limit?: number;
  }

  /** Parameters for the `listArtifacts` operation. */
  export interface ListArtifactsParams extends DefaultParams {
    /** The object's unique ID. */
    objectId: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Parameters for the `getArtifact` operation. */
  export interface GetArtifactParams extends DefaultParams {
    /** The object's unique ID. */
    objectId: string;
    /** The artifact's ID. */
    artifactId: string;
    /** The type of the response: *_/_*. */
    accept?: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Parameters for the `uploadArtifact` operation. */
  export interface UploadArtifactParams extends DefaultParams {
    /** The object's unique ID. */
    objectId: string;
    /** The artifact's ID. */
    artifactId: string;
    artifact?: NodeJS.ReadableStream | Buffer;
    /** The type of the input. */
    contentType?: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /** Parameters for the `deleteArtifact` operation. */
  export interface DeleteArtifactParams extends DefaultParams {
    /** The object's unique ID. */
    objectId: string;
    /** The artifact's ID. */
    artifactId: string;
    /** This changes the scope of the request regardless of the authorization header. Example scopes are `account`
     *  and `global`. `account=global` is reqired if operating with a service ID that has a global admin policy, for
     *  example `GET /?account=global`.
     */
    account?: string;
  }

  /*************************
   * model interfaces
   ************************/

  /**
   * Alias-related metadata.
   */
  export interface AliasMetaData {
    /** Type of alias. */
    type?: string;
    /** Points to the plan that this object is an alias for. */
    plan_id?: string;
  }

  /**
   * Country-specific pricing information.
   */
  export interface Amount {
    /** Country. */
    country?: string;
    /** Currency. */
    currency?: string;
    /** See Price for nested fields. */
    prices?: Price[];
  }

  /**
   * Artifact Details.
   */
  export interface Artifact {
    /** The name of the artifact. */
    name?: string;
    /** The timestamp of the last update to the artifact. */
    updated?: string;
    /** The url for the artifact. */
    url?: string;
    /** The etag of the artifact. */
    etag?: string;
    /** The content length of the artifact. */
    size?: number;
  }

  /**
   * Artifacts List.
   */
  export interface Artifacts {
    /** The total number of artifacts. */
    count?: number;
    /** The list of artifacts. */
    resources?: Artifact[];
  }

  /**
   * A paginated search result containing audit logs.
   */
  export interface AuditSearchResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset?: number;
    /** The maximum number of resources returned in each page of search results. */
    limit?: number;
    /** The overall total number of resources in the search result set. */
    count?: number;
    /** The number of resources returned in this page of search results. */
    resource_count?: number;
    /** A URL for retrieving the first page of search results. */
    first?: string;
    /** A URL for retrieving the last page of search results. */
    last?: string;
    /** A URL for retrieving the previous page of search results. */
    prev?: string;
    /** A URL for retrieving the next page of search results. */
    next?: string;
    /** The resources (audit messages) contained in this page of search results. */
    resources?: Message[];
  }

  /**
   * The broker associated with a catalog entry.
   */
  export interface Broker {
    /** Broker name. */
    name?: string;
    /** Broker guid. */
    guid?: string;
  }

  /**
   * Information related to list delimiters.
   */
  export interface Bullets {
    /** The bullet title. */
    title?: string;
    /** The bullet description. */
    description?: string;
    /** The icon to use for rendering the bullet. */
    icon?: string;
    /** The bullet quantity. */
    quantity?: number;
  }

  /**
   * Service-related metadata.
   */
  export interface CFMetaData {
    /** Deprecated: The type of service (public, cfaas, personal_catalog, kms, toolchain, etc.). */
    type?: string;
    /** Boolean value that describes whether the service is compatible with Identity and Access Management for
     *  authentication and authorization.
     */
    iam_compatible?: boolean;
    /** Deprecated: Boolean value that describes whether the service has a unique API key. Only settable on
     *  services, should be set via partnercenter.
     */
    unique_api_key?: boolean;
    /** Boolean value that, if true, the service is provisionable via resource controller (RC) or, if false, via a
     *  service control point API. If false, you may need sales or support to create this service.
     */
    provisionable?: boolean;
    /** Boolean value that describes whether the service can be bound to an application. If true then this will
     *  create and use resource keys.
     */
    bindable?: boolean;
    /** Deprecated: Boolean value that describes whether the service supports asynchronous provisioning. Now handled
     *  by a 202 response indicating support from the broker on provisioning.
     */
    async_provisioning_supported?: boolean;
    /** Deprecated: Boolean value that describes whether the service supports asynchronous unprovisioning. Now
     *  handled by a 202 response indicating support from the broker on unprovisioning.
     */
    async_unprovisioning_supported?: boolean;
    /** Deprecated: Dependencies needed to use this service. */
    requires?: string[];
    /** Boolean value that describes whether the service supports changing plans within the service. Only settable
     *  on services, read only on plans and deployments.
     */
    plan_updateable?: boolean;
    /** Deprecated: String that describes whether the service is active or inactive. */
    state?: string;
    /** Deprecated: Boolean value that describes whether the Estado testing service will perform uptime tests for
     *  this service.
     */
    service_check_enabled?: boolean;
    /** Deprecated: A unit of time that determines the time in between uptime checks performed by Estado. */
    test_check_interval?: number;
    /** Boolean value that describes whether the service supports the creation of service credentials. Without
     *  service key support, a service cannot be bound to a cluster.
     */
    service_key_supported?: boolean;
    /** Deprecated: If the field is imported from Cloud Foundry, the Cloud Foundry region's GUID. This is a required
     *  field. For example, `us-south=123`.
     */
    cf_guid?: JsonObject;
    /** Cloud resource name identifying the environment containing this service. */
    crn_mask?: string;
    /** Deprecated: Boolean flag indicating if this service only offers paid pricing plans rather than the default
     *  paygo.
     */
    paid_only?: boolean;
    /** Boolean flag that determines if the hybrid page is accessible from the main catalog provisioning page. */
    custom_create_page_hybrid_enabled?: boolean;
  }

  /**
   * Callback-related information associated with a catalog entry.
   */
  export interface Callbacks {
    /** The URL of the deployment controller. */
    controller_url?: string;
    /** The URL of the deployment broker. */
    broker_url?: string;
    /** Deprecated: The URL of the deployment broker SC proxy. */
    broker_proxy_url?: string;
    /** The URL of dashboard callback. */
    dashboard_url?: string;
    /** The URL of dashboard data. */
    dashboard_data_url?: string;
    /** The URL of the dashboard detail tab. */
    dashboard_detail_tab_url?: string;
    /** The URL of the dashboard detail tab extension. */
    dashboard_detail_tab_ext_url?: string;
    /** Service monitor API URL. */
    service_monitor_api?: string;
    /** Service monitor app URL. */
    service_monitor_app?: string;
    /** API endpoint. */
    api_endpoint?: JsonObject;
  }

  /**
   * An entry in the global catalog.
   */
  export interface CatalogEntry {
    /** Programmatic name for this catalog entry, which must be formatted like a CRN segment. See the display name
     *  in OverviewUI for a user-readable name.
     */
    name: string;
    /** The type of catalog entry which determines the type and shape of the object. Valid GC types are buildpack,
     *  cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard.
     */
    kind: CatalogEntry.Constants.Kind | string;
    /** Overview is nested in the top level. The key value pair is `[_language_]overview_ui`. */
    overview_ui: JsonObject;
    /** Image annotation for this catalog entry. The image is a URL. */
    images: Image;
    /** The ID of the parent catalog entry if it exists. */
    parent_id?: string;
    /** Boolean value that determines the global visibility for the catalog entry, and its children. If it is not
     *  enabled, all plans are disabled.
     */
    disabled: boolean;
    /** A searchable list of tags. For example, IBM, 3rd Party, Beta, GA, and Single Tenant. Valid values found at
     *  https://globalcatalog.test.cloud.ibm.com/search.
     */
    tags: string[];
    /** Boolean value that determines whether the catalog entry is a group. */
    group?: boolean;
    /** Information related to the provider associated with a catalog entry. */
    provider: Provider;
    /** Boolean value that describes whether the service is active. */
    active?: boolean;
    /** URL to get details about this object. */
    url?: string;
    /** Model used to describe metadata object returned. */
    metadata?: CatalogEntryMetadata;
    /** Catalog entry's unique ID. It's the same across all catalog instances. */
    id?: string;
    /** The CRN associated with the catalog entry. */
    catalog_crn?: string;
    /** URL to get details about children of this object. */
    children_url?: string;
    /** tags to indicate the locations this service is deployable to. */
    geo_tags?: string[];
    /** tags to indicate the type of pricing plans this service supports. Plans tagged with paid_only will not be
     *  shown for trial accounts.
     */
    pricing_tags?: string[];
    /** Date created. */
    created?: string;
    /** Date last updated. */
    updated?: string;
  }
  export namespace CatalogEntry {
    export namespace Constants {
      /** The type of catalog entry which determines the type and shape of the object. Valid GC types are buildpack, cname, dataset, geography, iaas, platform_service, runtime, service, template, ui-dashboard. */
      export enum Kind {
        SERVICE = 'service',
        TEMPLATE = 'template',
        DASHBOARD = 'dashboard',
      }
    }
  }

  /**
   * Model used to describe metadata object returned.
   */
  export interface CatalogEntryMetadata {
    /** Boolean value that describes whether the service is compatible with the Resource Controller. Only settable
     *  for deployments, propogated upward.
     */
    rc_compatible?: boolean;
    /** Service-related metadata. */
    service?: CFMetaData;
    /** Plan-related metadata. */
    plan?: PlanMetaData;
    /** Alias-related metadata. */
    alias?: AliasMetaData;
    /** Template-related metadata. */
    template?: TemplateMetaData;
    /** Information related to the UI presentation associated with a catalog entry. */
    ui?: UIMetaData;
    /** Compliance information for HIPAA and PCI. */
    compliance?: string[];
    /** Service Level Agreement related metadata. */
    sla?: SLAMetaData;
    /** Callback-related information associated with a catalog entry. */
    callbacks?: Callbacks;
    /** The original name of the object. */
    original_name?: string;
    /** Deprecated: Optional version of the object. Only valid for templates. */
    version?: string;
    /** Additional information. */
    other?: JsonObject;
    /** Pricing-related information. */
    pricing?: CatalogEntryMetadataPricing;
    /** Deployment-related metadata. */
    deployment?: CatalogEntryMetadataDeployment;
  }

  /**
   * Deployment-related metadata.
   */
  export interface CatalogEntryMetadataDeployment {
    /** Describes the region where the service is located. */
    location?: string;
    /** Pointer to the location resource in the catalog. */
    location_url?: string;
    /** The original region in which this deployment existed. */
    original_location?: string;
    /** A CRN that describes the deployment. crn:v1:[cname]:[ctype]:[location]:[scope]::[resource-type]:[resource]. */
    target_crn?: string;
    /** Cloud resource name for this deployment. */
    service_crn?: string;
    /** Deprecated: ID of the multi cloud connectivity platform. */
    mccp_id?: string;
    /** The broker associated with a catalog entry. */
    broker?: Broker;
    /** Deprecated: This deployment not only supports RC but is ready to migrate and support the RC broker for a
     *  location.
     */
    supports_rc_migration?: boolean;
    /** When using the service_endpoint_supported tag for a deployment, this optional field can be set on a
     *  deployment to denote the supported service endpoint type (cse_private, public, or cse_private+public).
     */
    target_network?: string;
  }

  /**
   * Pricing-related information.
   */
  export interface CatalogEntryMetadataPricing {
    /** Type of plan. Valid values are `free`, `trial`, `paygo`, `paid`, `subscription`. */
    type?: string;
    /** Defines where the pricing originates. */
    origin?: string;
    /** Plan-specific starting price information. */
    starting_price?: StartingPrice;
    /** The deployment object id this pricing is from. Only set if object kind is deployment. */
    deployment_id?: string;
    /** The deployment location this pricing is from. Only set if object kind is deployment. */
    deployment_location?: string;
    /** If price is for a deployment object then the region in the pricing catalog of the deployment object will be
     *  here. To be valid, this value must be contained within deployment_regions.
     */
    deployment_region?: string;
    /** Is the location price not available. Only set in api /pricing/deployment and only set if true. This means
     *  for the given deployment object there was no pricing set in pricing catalog.
     */
    deployment_location_no_price_available?: boolean;
    /** Plan-specific cost metric structure. */
    metrics?: Metrics[];
    /** List of regions where region pricing is available. Only set on global deployments if enabled by owner. */
    deployment_regions?: string[];
    /** The start date-time indicating when this pricing plan takes effect. */
    effective_from?: string;
    /** The end date-time indicating when this pricing plan is no longer in effect. */
    effective_until?: string;
    /** Boolean value indicating whether or not this pricing plan requires login to get pricing data. */
    require_login?: boolean;
    /** URL to the entry for this plan on the pricing catalog. */
    pricing_catalog_url?: string;
    /** Tags describing how this plan was purchased (catalog [default], seller, private offer). Currently only
     *  settable on MCSP subscription plans.
     */
    sales_avenue?: string[];
  }

  /**
   * SLA Disaster Recovery-related metadata.
   */
  export interface DRMetaData {
    /** Required boolean value that describes whether disaster recovery is on. */
    dr?: boolean;
    /** Description of the disaster recovery implementation. */
    description?: string;
  }

  /**
   * Deployment-related metadata.
   */
  export interface DeploymentBase {
    /** Describes the region where the service is located. */
    location?: string;
    /** URL of deployment. */
    location_url?: string;
    /** The original region in which this deployment existed. */
    original_location?: string;
    /** A CRN that describes the deployment. crn:v1:[cname]:[ctype]:[location]:[scope]::[resource-type]:[resource]. */
    target_crn?: string;
    /** Cloud resource name for this deployment. */
    service_crn?: string;
    /** Deprecated: ID of the multi cloud connectivity platform. */
    mccp_id?: string;
    /** The broker associated with a catalog entry. */
    broker?: Broker;
    /** Deprecated: This deployment not only supports RC but is ready to migrate and support the RC broker for a
     *  location.
     */
    supports_rc_migration?: boolean;
    /** When using the service_endpoint_supported tag for a deployment, this optional field can be set on a
     *  deployment to denote the supported service endpoint type (cse_private, public, or cse_private+public).
     */
    target_network?: string;
  }

  /**
   * A paginated search result containing catalog entries.
   */
  export interface EntrySearchResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset?: number;
    /** The maximum number of resources returned in each page of search results. */
    limit?: number;
    /** The overall total number of resources in the search result set. */
    count?: number;
    /** The number of resources returned in this page of search results. */
    resource_count?: number;
    /** A URL for retrieving the first page of search results. */
    first?: string;
    /** A URL for retrieving the last page of search results. */
    last?: string;
    /** A URL for retrieving the previous page of search results. */
    prev?: string;
    /** A URL for retrieving the next page of search results. */
    next?: string;
    /** The resources (catalog entries) contained in this page of search results. */
    resources?: CatalogEntry[];
  }

  /**
   * Image annotation for this catalog entry. The image is a URL.
   */
  export interface Image {
    /** URL for the large, default image. */
    image: string;
    /** URL for a small image. */
    small_image?: string;
    /** URL for a medium image. */
    medium_image?: string;
    /** URL for a featured image. */
    feature_image?: string;
  }

  /**
   * log object describing who did what.
   */
  export interface Message {
    /** id of catalog entry. */
    id?: string;
    /** Information related to the visibility of a catalog entry. */
    effective?: Visibility;
    /** time of action. */
    time?: string;
    /** user ID of person who did action. */
    who_id?: string;
    /** name of person who did action. */
    who_name?: string;
    /** user email of person who did action. */
    who_email?: string;
    /** Global catalog instance where this occured. */
    instance?: string;
    /** transaction id associatd with action. */
    gid?: string;
    /** type of action taken. */
    type?: string;
    /** message describing action. */
    message?: string;
    /** An object containing details on changes made to object data. */
    data?: JsonObject;
  }

  /**
   * Plan-specific cost metrics information.
   */
  export interface Metrics {
    /** The reference guid for the part. */
    part_ref?: string;
    /** The metric ID or part number. */
    metric_id?: string;
    /** The pricing tier type used to calculate the marginal unit price. Follows simple, graduated or block tier
     *  styles.
     */
    tier_model?: string;
    /** The unit to be charged under this metric. */
    charge_unit?: string;
    /** The name associated with a charge unit to provide context. */
    charge_unit_name?: string;
    /** The quantity associated with the charge unit to determine price change intervals. */
    charge_unit_quantity?: number;
    /** The display name of the resource tied to the charge unit of this metric. */
    resource_display_name?: string;
    /** Display name of the charge unit to be rendered human readable by the UI. */
    charge_unit_display_name?: string;
    /** Upper bound for the usage under the parent metric. */
    usage_cap_qty?: number;
    /** The display capacity for the UI. */
    display_cap?: number;
    /** The end date-time indicating when this metric is no longer in effect. */
    effective_from?: string;
    /** The start date-time indicating when this metric takes effect. */
    effective_until?: string;
    /** The pricing per metric by country and currency. */
    amounts?: Amount[];
    /** A property-bag like extension to metric metadata. */
    additional_properties?: JsonObject;
  }

  /**
   * Model used to describe metadata object that can be set.
   */
  export interface ObjectMetadataSet {
    /** Boolean value that describes whether the service is compatible with the Resource Controller. Only settable
     *  for deployments, propogated upward.
     */
    rc_compatible?: boolean;
    /** Service-related metadata. */
    service?: CFMetaData;
    /** Plan-related metadata. */
    plan?: PlanMetaData;
    /** Alias-related metadata. */
    alias?: AliasMetaData;
    /** Template-related metadata. */
    template?: TemplateMetaData;
    /** Information related to the UI presentation associated with a catalog entry. */
    ui?: UIMetaData;
    /** Compliance information for HIPAA and PCI. */
    compliance?: string[];
    /** Service Level Agreement related metadata. */
    sla?: SLAMetaData;
    /** Callback-related information associated with a catalog entry. */
    callbacks?: Callbacks;
    /** The original name of the object. */
    original_name?: string;
    /** Deprecated: Optional version of the object. Only valid for templates. */
    version?: string;
    /** Additional information. */
    other?: JsonObject;
    /** Pricing-related information. */
    pricing?: PricingSet;
    /** Deployment-related metadata. */
    deployment?: DeploymentBase;
  }

  /**
   * Overview is nested in the top level. The key value pair is `[_language_]overview_ui`.
   */
  export interface Overview {
    /** The translated display name. */
    display_name: string;
    /** The translated long description. */
    long_description: string;
    /** The translated description. */
    description: string;
    /** The translated description that will be featured. */
    featured_description?: string;
  }

  /**
   * Plan-related metadata.
   */
  export interface PlanMetaData {
    /** Boolean value that describes whether the service can be bound to an application. If true then this will
     *  create and use resource keys.
     */
    bindable?: boolean;
    /** Boolean value that describes whether the service can be reserved for pricing subscriptions. */
    reservable?: boolean;
    /** Boolean value that describes whether the service can be used on IBM accounts. If false this cannot be
     *  onboarded by an IBM account.
     */
    allow_internal_users?: boolean;
    /** Deprecated: Boolean value that describes whether the service supports asynchronous provisioning. Now handled
     *  by a 202 response indicating support from the broker on provisioning.
     */
    async_provisioning_supported?: boolean;
    /** Deprecated: Boolean value that describes whether the service supports asynchronous unprovisioning. Now
     *  handled by a 202 response indicating support from the broker on unprovisioning.
     */
    async_unprovisioning_supported?: boolean;
    /** How the subscription is provisioned (managed cloud service provider (mcsp), IBM_cloud, legacy). */
    provision_type?: string;
    /** Deprecated: A unit of time that determines the time in between uptime checks to be performed by the Estado
     *  testing service.
     */
    test_check_interval?: number;
    /** Deprecated: String denoting if a single instance is shared among a group of users. E.g. org. */
    single_scope_instance?: string;
    /** Deprecated: Boolean value that describes whether the Estado testing service will perform uptime tests for
     *  this service.
     */
    service_check_enabled?: boolean;
    /** Deprecated: If the field is imported from Cloud Foundry, the Cloud Foundry region's GUID. This is a required
     *  field. For example, `us-south=123`.
     */
    cf_guid?: JsonObject;
  }

  /**
   * Pricing-related information.
   */
  export interface Price {
    /** The quantity of _metric_ associated with the current price point. */
    quantity_tier?: number;
    /** Price in the selected currency. */
    price?: number;
  }

  /**
   * Pricing-related information.
   */
  export interface PricingGet {
    /** The deployment object id this pricing is from. Only set if object kind is deployment. */
    deployment_id?: string;
    /** The deployment location this pricing is from. Only set if object kind is deployment. */
    deployment_location?: string;
    /** If price is for a deployment object then the region in the pricing catalog of the deployment object will be
     *  here. To be valid, this value must be contained within deployment_regions.
     */
    deployment_region?: string;
    /** Is the location price not available. Only set in api /pricing/deployment and only set if true. This means
     *  for the given deployment object there was no pricing set in pricing catalog.
     */
    deployment_location_no_price_available?: boolean;
    /** Type of plan. Valid values are `free`, `trial`, `paygo`, `paid`, `subscription`. */
    type?: string;
    /** Defines where the pricing originates. */
    origin?: string;
    /** Plan-specific starting price information. */
    starting_price?: StartingPrice;
    /** Plan-specific cost metric structure. */
    metrics?: Metrics[];
    /** List of regions where region pricing is available. Only set on global deployments if enabled by owner. */
    deployment_regions?: string[];
    /** The start date-time indicating when this pricing plan takes effect. */
    effective_from?: string;
    /** The end date-time indicating when this pricing plan is no longer in effect. */
    effective_until?: string;
    /** Boolean value indicating whether or not this pricing plan requires login to get pricing data. */
    require_login?: boolean;
    /** URL to the entry for this plan on the pricing catalog. */
    pricing_catalog_url?: string;
    /** Tags describing how this plan was purchased (catalog [default], seller, private offer). Currently only
     *  settable on MCSP subscription plans.
     */
    sales_avenue?: string[];
  }

  /**
   * A paginated result containing pricing entries.
   */
  export interface PricingSearchResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset?: number;
    /** The maximum number of resources returned in each page of search results. */
    limit?: number;
    /** The overall total number of resources in the search result set. */
    count?: number;
    /** The number of resources returned in this page of search results. */
    resource_count?: number;
    /** A URL for retrieving the first page of search results. */
    first?: string;
    /** A URL for retrieving the last page of search results. */
    last?: string;
    /** A URL for retrieving the previous page of search results. */
    prev?: string;
    /** A URL for retrieving the next page of search results. */
    next?: string;
    /** The resources (prices) contained in this page of search results. */
    resources?: PricingGet[];
  }

  /**
   * Pricing-related information.
   */
  export interface PricingSet {
    /** Type of plan. Valid values are `free`, `trial`, `paygo`, `paid`, `subscription`. */
    type?: string;
    /** Defines where the pricing originates, either the pricing catalog or the global catalog. */
    origin?: string;
    /** Plan-specific starting price information. */
    starting_price?: StartingPrice;
  }

  /**
   * Information related to the provider associated with a catalog entry.
   */
  export interface Provider {
    /** Provider's email address for this catalog entry. */
    email: string;
    /** Provider's name, for example, IBM. */
    name: string;
    /** Provider's contact name. */
    contact?: string;
    /** Provider's support email. */
    support_email?: string;
    /** Provider's contact phone. */
    phone?: string;
  }

  /**
   * Service Level Agreement related metadata.
   */
  export interface SLAMetaData {
    /** Required Service License Agreement Terms of Use. */
    terms?: string;
    /** Required deployment type. Valid values are dedicated, local, or public. It can be Single or Multi tennancy,
     *  more specifically on a Server, VM, Physical, or Pod.
     */
    tenancy?: string;
    /** Provisioning reliability, for example, 99.95. */
    provisioning?: number;
    /** Uptime reliability of the service, for example, 99.95. */
    responsiveness?: number;
    /** SLA Disaster Recovery-related metadata. */
    dr?: DRMetaData;
  }

  /**
   * Location of your applications source files.
   */
  export interface SourceMetaData {
    /** Path to your application. */
    path?: string;
    /** Type of source, for example, git. */
    type?: string;
    /** URL to source. */
    url?: string;
  }

  /**
   * Plan-specific starting price information.
   */
  export interface StartingPrice {
    /** ID of the plan the starting price is calculated. */
    plan_id?: string;
    /** ID of the deployment the starting price is calculated. */
    deployment_id?: string;
    /** Pricing unit. */
    unit?: string;
    /** The pricing per metric by country and currency. */
    amount?: Amount[];
  }

  /**
   * Information related to a translated text message.
   */
  export interface Strings {
    /** Presentation information related to list delimiters. */
    bullets?: Bullets[];
    /** Media-related metadata. */
    media?: UIMetaMedia[];
    /** Warning that a message is not creatable. */
    not_creatable_msg?: string;
    /** Warning that a robot message is not creatable. */
    not_creatable__robot_msg?: string;
    /** Warning for deprecation. */
    deprecation_warning?: string;
    /** Popup warning message. */
    popup_warning_message?: string;
    /** Instructions for UI strings. */
    instruction?: string;
  }

  /**
   * Template-related metadata.
   */
  export interface TemplateMetaData {
    /** List of required offering or plan IDs. */
    services?: string[];
    /** Cloud Foundry instance memory value. */
    default_memory?: number;
    /** Command used to start a service. */
    start_cmd?: string;
    /** Location of your applications source files. */
    source?: SourceMetaData;
    /** ID of the runtime. */
    runtime_catalog_id?: string;
    /** ID of the Cloud Foundry runtime. */
    cf_runtime_id?: string;
    /** ID of the boilerplate or template. */
    template_id?: string;
    /** File path to the executable file for the template. */
    executable_file?: string;
    /** ID of the buildpack used by the template. */
    buildpack?: string;
    /** Environment variables (key/value pairs) for the template. */
    environment_variables?: JsonObject;
  }

  /**
   * Location of your applications media source files.
   */
  export interface UIMediaSourceMetaData {
    /** Type of source, for example, git. */
    type?: string;
    /** URL to source. */
    url?: string;
  }

  /**
   * Information related to the UI presentation associated with a catalog entry.
   */
  export interface UIMetaData {
    /** Language specific translation of translation properties, like label and description. */
    strings?: JsonObject;
    /** UI based URLs. */
    urls?: URLS;
    /** Describes how the embeddable dashboard is rendered. */
    embeddable_dashboard?: string;
    /** Describes whether the embeddable dashboard is rendered at the full width. */
    embeddable_dashboard_full_width?: boolean;
    /** Defines the order of information presented. */
    navigation_order?: string[];
    /** Describes whether this entry is able to be created from the UI element or CLI. */
    not_creatable?: boolean;
    /** ID of the primary offering for a group. */
    primary_offering_id?: string;
    /** Alert to ACE to allow instance UI to be accessible while the provisioning state of instance is in progress. */
    accessible_during_provision?: boolean;
    /** Specifies a side by side ordering weight to the UI. */
    side_by_side_index?: number;
    /** Date and time the service will no longer be available. */
    end_of_service_time?: string;
    /** Denotes visibility. Can be set on a service/plan/deployment only by an account with bluemix admin
     *  privileges.
     */
    hidden?: boolean;
    /** Denotes lite metering visibility. */
    hide_lite_metering?: boolean;
    /** Denotes whether an upgrade should occur. */
    no_upgrade_next_step?: boolean;
  }

  /**
   * Media-related metadata.
   */
  export interface UIMetaMedia {
    /** Caption for an image. */
    caption?: string;
    /** URL for thumbnail image. */
    thumbnail_url?: string;
    /** Type of media. */
    type?: string;
    /** URL for media. */
    URL?: string;
    /** UI media source data for for UI media data. */
    source?: UIMediaSourceMetaData[];
  }

  /**
   * UI based URLs.
   */
  export interface URLS {
    /** URL for documentation. */
    doc_url?: string;
    /** URL for usage instructions. */
    instructions_url?: string;
    /** API URL. */
    api_url?: string;
    /** URL Creation UI / API. */
    create_url?: string;
    /** URL to downlaod an SDK. */
    sdk_download_url?: string;
    /** URL to the terms of use for your service. */
    terms_url?: string;
    /** URL to the custom create page for your service. */
    custom_create_page_url?: string;
    /** URL to the catalog details page for your service. */
    catalog_details_url?: string;
    /** URL for deprecation documentation. */
    deprecation_doc_url?: string;
    /** URL for dashboard. */
    dashboard_url?: string;
    /** URL for registration. */
    registration_url?: string;
    /** URL for API documentation. */
    apidocsurl?: string;
  }

  /**
   * Information related to the visibility of a catalog entry.
   */
  export interface Visibility {
    /** This controls the overall visibility. It is an enum of *public*, *nonibm_only*, *ibm_only*, and *private*.
     *  public means it is visible to all. nonibm_only means it is visible to all except IBM unless their account is
     *  explicitly included, ibm_only means it is visible to all IBM unless their account is explicitly excluded.
     *  private means it is visible only to the included accounts.
     */
    restrictions?: string;
    /** IAM Scope-related information associated with a catalog entry. */
    owner?: string;
    /** Allows the visibility to be extendable. */
    extendable?: boolean;
    /** Visibility details related to a catalog entry. */
    include?: VisibilityDetail;
    /** Visibility details related to a catalog entry. */
    exclude?: VisibilityDetail;
    /** Determines whether the owning account has full control over the visibility of the entry such as adding
     *  non-IBM accounts to the whitelist and making entries `private`, `nonibm_only`, `ibm_only` or `public`.
     */
    approved?: boolean;
  }

  /**
   * Visibility details related to a catalog entry.
   */
  export interface VisibilityDetail {
    /** Information related to the accounts for which a catalog entry is visible. */
    accounts: VisibilityDetailAccounts;
  }

  /**
   * Information related to the accounts for which a catalog entry is visible.
   */
  export interface VisibilityDetailAccounts {
    /** (_accountid_) is the GUID of the account and the value is the scope of who set it. For setting visibility
     *  use "" as the value. It is replaced with the owner scope when saved.
     */
    _accountid_?: string;
  }
}

export = GlobalCatalogV1;
