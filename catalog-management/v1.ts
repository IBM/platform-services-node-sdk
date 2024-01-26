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
 * IBM OpenAPI SDK Code Generator Version: 3.84.2-a032c73d-20240125-175315
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
 * This is the API to use for managing private catalogs for IBM Cloud. Private catalogs provide a way to centrally
 * manage access to products in the IBM Cloud catalog and your own catalogs.
 *
 * API Version: 1.0
 */

class CatalogManagementV1 extends BaseService {
  static _logger: SDKLogger = getNewLogger('CatalogManagementV1');

  static DEFAULT_SERVICE_URL: string = 'https://cm.globalcatalog.cloud.ibm.com/api/v1-beta';

  static DEFAULT_SERVICE_NAME: string = 'catalog_management';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of CatalogManagementV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @returns {CatalogManagementV1}
   */

  public static newInstance(options: UserOptions): CatalogManagementV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new CatalogManagementV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a CatalogManagementV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base URL for the service
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {CatalogManagementV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(CatalogManagementV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * account
   ************************/

  /**
   * Get catalog account settings.
   *
   * Get the account level settings for the account for private catalog.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Account>>}
   */
  public getCatalogAccount(
    params?: CatalogManagementV1.GetCatalogAccountParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Account>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getCatalogAccount');

    const parameters = {
      options: {
        url: '/catalogaccount',
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
   * Update account settings.
   *
   * Update the account level settings for the account for private catalog.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.id] - Account identification.
   * @param {string} [params.rev] - Cloudant revision.
   * @param {boolean} [params.hideIbmCloudCatalog] - Hide the public catalog in this account.
   * @param {Filters} [params.accountFilters] - Filters for account and catalog filters.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Account>>}
   */
  public updateCatalogAccount(
    params?: CatalogManagementV1.UpdateCatalogAccountParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Account>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['id', 'rev', 'hideIbmCloudCatalog', 'accountFilters', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      '_rev': _params.rev,
      'hide_IBM_cloud_catalog': _params.hideIbmCloudCatalog,
      'account_filters': _params.accountFilters,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'updateCatalogAccount');

    const parameters = {
      options: {
        url: '/catalogaccount',
        method: 'PUT',
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
   * Get catalog account audit logs.
   *
   * Get the audit logs associated with a catalog account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>>}
   */
  public listCatalogAccountAudits(
    params?: CatalogManagementV1.ListCatalogAccountAuditsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['start', 'limit', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'lookupnames': _params.lookupnames,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listCatalogAccountAudits');

    const parameters = {
      options: {
        url: '/catalogaccount/audits',
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
   * Get a catalog account audit log entry.
   *
   * Get the full audit log entry associated with a catalog account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.auditlogIdentifier - Auditlog ID.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>>}
   */
  public getCatalogAccountAudit(
    params: CatalogManagementV1.GetCatalogAccountAuditParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>> {
    const _params = { ...params };
    const _requiredParams = ['auditlogIdentifier'];
    const _validParams = ['auditlogIdentifier', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'auditlog_identifier': _params.auditlogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getCatalogAccountAudit');

    const parameters = {
      options: {
        url: '/catalogaccount/audits/{auditlog_identifier}',
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
   * Get catalog account filters.
   *
   * Get the accumulated filters of the account and of the catalogs you have access to.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.catalog] - catalog id. Narrow down filters to the account and just the one catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccumulatedFilters>>}
   */
  public getCatalogAccountFilters(
    params?: CatalogManagementV1.GetCatalogAccountFiltersParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccumulatedFilters>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['catalog', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'catalog': _params.catalog,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getCatalogAccountFilters');

    const parameters = {
      options: {
        url: '/catalogaccount/filters',
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
   * Get share approval access list.
   *
   * Get the share approval access list associated with the specified object type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectType - The type for the object.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareApprovalListAccessResult>>}
   */
  public getShareApprovalList(
    params: CatalogManagementV1.GetShareApprovalListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareApprovalListAccessResult>> {
    const _params = { ...params };
    const _requiredParams = ['objectType'];
    const _validParams = ['objectType', 'start', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
    };

    const path = {
      'object_type': _params.objectType,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getShareApprovalList');

    const parameters = {
      options: {
        url: '/shareapproval/{object_type}/access',
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
   * Delete share approval access.
   *
   * Delete share approval accesses associated with the specified object type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectType - The type for the object.
   * @param {string[]} params.accesses - A list of accesses to delete.  An entry with star["*"] will remove all
   * accesses.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>>}
   */
  public deleteShareApprovalList(
    params: CatalogManagementV1.DeleteShareApprovalListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>> {
    const _params = { ...params };
    const _requiredParams = ['objectType', 'accesses'];
    const _validParams = ['objectType', 'accesses', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.accesses;
    const path = {
      'object_type': _params.objectType,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteShareApprovalList');

    const parameters = {
      options: {
        url: '/shareapproval/{object_type}/access',
        method: 'DELETE',
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
   * Add accesses to share approval access list.
   *
   * Add one or more accesses to the share approval access list for a specific object type.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectType - The type for the object.
   * @param {string[]} params.accesses - A list of accesses to add.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>>}
   */
  public addShareApprovalList(
    params: CatalogManagementV1.AddShareApprovalListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>> {
    const _params = { ...params };
    const _requiredParams = ['objectType', 'accesses'];
    const _validParams = ['objectType', 'accesses', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.accesses;
    const path = {
      'object_type': _params.objectType,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'addShareApprovalList');

    const parameters = {
      options: {
        url: '/shareapproval/{object_type}/access',
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
   * Get share approval access list for requesting accounts.
   *
   * Get the share approval access list associated with the specified object type in a certain approval state for
   * requesting accounts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectType - The type for the object.
   * @param {string} params.approvalStateIdentifier - The different possible approval states for share requests or
   * access request.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {string} [params.enterpriseId] - Execute the request in the context of an enterprise or enterpise account
   * group ID. Use '-ent-enterpriseid' for an enterprise and '-entgrp-enterprisegroupid for an enterprise group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareApprovalListAccessResult>>}
   */
  public getShareApprovalListAsSource(
    params: CatalogManagementV1.GetShareApprovalListAsSourceParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareApprovalListAccessResult>> {
    const _params = { ...params };
    const _requiredParams = ['objectType', 'approvalStateIdentifier'];
    const _validParams = ['objectType', 'approvalStateIdentifier', 'start', 'limit', 'enterpriseId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'enterprise_id': _params.enterpriseId,
    };

    const path = {
      'object_type': _params.objectType,
      'approval_state_identifier': _params.approvalStateIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getShareApprovalListAsSource');

    const parameters = {
      options: {
        url: '/shareapproval/{object_type}/access/source/{approval_state_identifier}',
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
   * Update approval states for share approval access list for requesting accounts.
   *
   * Update one or more access approval states from the share approval access list for a specific object type for
   * requesting accounts.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.objectType - The type for the object.
   * @param {string} params.approvalStateIdentifier - The different possible approval states for share requests or
   * access request.
   * @param {string[]} params.accesses - A list of accesses to update to the specified approval state.
   * @param {string} [params.enterpriseId] - Execute the request in the context of an enterprise or enterpise account
   * group ID. Use '-ent-enterpriseid' for an enterprise and '-entgrp-enterprisegroupid for an enterprise group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>>}
   */
  public updateShareApprovalListAsSource(
    params: CatalogManagementV1.UpdateShareApprovalListAsSourceParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>> {
    const _params = { ...params };
    const _requiredParams = ['objectType', 'approvalStateIdentifier', 'accesses'];
    const _validParams = ['objectType', 'approvalStateIdentifier', 'accesses', 'enterpriseId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.accesses;
    const query = {
      'enterprise_id': _params.enterpriseId,
    };

    const path = {
      'object_type': _params.objectType,
      'approval_state_identifier': _params.approvalStateIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'updateShareApprovalListAsSource');

    const parameters = {
      options: {
        url: '/shareapproval/{object_type}/access/source/{approval_state_identifier}',
        method: 'POST',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * catalogs
   ************************/

  /**
   * Get list of catalogs.
   *
   * Retrieves the available catalogs for a given account. This can be used by an unauthenticated user to retrieve the
   * public catalog.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogSearchResult>>}
   */
  public listCatalogs(
    params?: CatalogManagementV1.ListCatalogsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogSearchResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listCatalogs');

    const parameters = {
      options: {
        url: '/catalogs',
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
   * Create a catalog.
   *
   * Create a catalog for a given account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.label] - Display Name in the requested language.
   * @param {JsonObject} [params.labelI18n] - A map of translated strings, by language code.
   * @param {string} [params.shortDescription] - Description in the requested language.
   * @param {JsonObject} [params.shortDescriptionI18n] - A map of translated strings, by language code.
   * @param {string} [params.catalogIconUrl] - URL for an icon associated with this catalog.
   * @param {string} [params.catalogBannerUrl] - URL for a banner image for this catalog.
   * @param {string[]} [params.tags] - List of tags associated with this catalog.
   * @param {Feature[]} [params.features] - List of features associated with this catalog.
   * @param {boolean} [params.disabled] - Denotes whether a catalog is disabled.
   * @param {string} [params.resourceGroupId] - Resource group id the catalog is owned by.
   * @param {string} [params.owningAccount] - Account that owns catalog.
   * @param {Filters} [params.catalogFilters] - Filters for account and catalog filters.
   * @param {SyndicationResource} [params.syndicationSettings] - Feature information.
   * @param {string} [params.kind] - Kind of catalog. Supported kinds are offering and vpe.
   * @param {JsonObject} [params.metadata] - Catalog specific metadata.
   * @param {TargetAccountContext[]} [params.targetAccountContexts] - List of target accounts contexts on this catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Catalog>>}
   */
  public createCatalog(
    params?: CatalogManagementV1.CreateCatalogParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Catalog>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['label', 'labelI18n', 'shortDescription', 'shortDescriptionI18n', 'catalogIconUrl', 'catalogBannerUrl', 'tags', 'features', 'disabled', 'resourceGroupId', 'owningAccount', 'catalogFilters', 'syndicationSettings', 'kind', 'metadata', 'targetAccountContexts', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'label': _params.label,
      'label_i18n': _params.labelI18n,
      'short_description': _params.shortDescription,
      'short_description_i18n': _params.shortDescriptionI18n,
      'catalog_icon_url': _params.catalogIconUrl,
      'catalog_banner_url': _params.catalogBannerUrl,
      'tags': _params.tags,
      'features': _params.features,
      'disabled': _params.disabled,
      'resource_group_id': _params.resourceGroupId,
      'owning_account': _params.owningAccount,
      'catalog_filters': _params.catalogFilters,
      'syndication_settings': _params.syndicationSettings,
      'kind': _params.kind,
      'metadata': _params.metadata,
      'target_account_contexts': _params.targetAccountContexts,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'createCatalog');

    const parameters = {
      options: {
        url: '/catalogs',
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
   * Get catalog.
   *
   * Get a catalog. This can also be used by an unauthenticated user to get the public catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Catalog>>}
   */
  public getCatalog(
    params: CatalogManagementV1.GetCatalogParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Catalog>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getCatalog');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}',
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
   * Update catalog.
   *
   * Update a catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} [params.id] - Unique ID.
   * @param {string} [params.rev] - Cloudant revision.
   * @param {string} [params.label] - Display Name in the requested language.
   * @param {JsonObject} [params.labelI18n] - A map of translated strings, by language code.
   * @param {string} [params.shortDescription] - Description in the requested language.
   * @param {JsonObject} [params.shortDescriptionI18n] - A map of translated strings, by language code.
   * @param {string} [params.catalogIconUrl] - URL for an icon associated with this catalog.
   * @param {string} [params.catalogBannerUrl] - URL for a banner image for this catalog.
   * @param {string[]} [params.tags] - List of tags associated with this catalog.
   * @param {Feature[]} [params.features] - List of features associated with this catalog.
   * @param {boolean} [params.disabled] - Denotes whether a catalog is disabled.
   * @param {string} [params.resourceGroupId] - Resource group id the catalog is owned by.
   * @param {string} [params.owningAccount] - Account that owns catalog.
   * @param {Filters} [params.catalogFilters] - Filters for account and catalog filters.
   * @param {SyndicationResource} [params.syndicationSettings] - Feature information.
   * @param {string} [params.kind] - Kind of catalog. Supported kinds are offering and vpe.
   * @param {JsonObject} [params.metadata] - Catalog specific metadata.
   * @param {TargetAccountContext[]} [params.targetAccountContexts] - List of target accounts contexts on this catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Catalog>>}
   */
  public replaceCatalog(
    params: CatalogManagementV1.ReplaceCatalogParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Catalog>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'id', 'rev', 'label', 'labelI18n', 'shortDescription', 'shortDescriptionI18n', 'catalogIconUrl', 'catalogBannerUrl', 'tags', 'features', 'disabled', 'resourceGroupId', 'owningAccount', 'catalogFilters', 'syndicationSettings', 'kind', 'metadata', 'targetAccountContexts', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      '_rev': _params.rev,
      'label': _params.label,
      'label_i18n': _params.labelI18n,
      'short_description': _params.shortDescription,
      'short_description_i18n': _params.shortDescriptionI18n,
      'catalog_icon_url': _params.catalogIconUrl,
      'catalog_banner_url': _params.catalogBannerUrl,
      'tags': _params.tags,
      'features': _params.features,
      'disabled': _params.disabled,
      'resource_group_id': _params.resourceGroupId,
      'owning_account': _params.owningAccount,
      'catalog_filters': _params.catalogFilters,
      'syndication_settings': _params.syndicationSettings,
      'kind': _params.kind,
      'metadata': _params.metadata,
      'target_account_contexts': _params.targetAccountContexts,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceCatalog');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete catalog.
   *
   * Delete a catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public deleteCatalog(
    params: CatalogManagementV1.DeleteCatalogParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteCatalog');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}',
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
   * Get catalog audit logs.
   *
   * Get the audit logs associated with a catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>>}
   */
  public listCatalogAudits(
    params: CatalogManagementV1.ListCatalogAuditsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'start', 'limit', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listCatalogAudits');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/audits',
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
   * Get a catalog audit log entry.
   *
   * Get the full audit log entry associated with a catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.auditlogIdentifier - Auditlog ID.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>>}
   */
  public getCatalogAudit(
    params: CatalogManagementV1.GetCatalogAuditParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'auditlogIdentifier'];
    const _validParams = ['catalogIdentifier', 'auditlogIdentifier', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'auditlog_identifier': _params.auditlogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getCatalogAudit');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/audits/{auditlog_identifier}',
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
   * enterprise
   ************************/

  /**
   * Get enterprise audit logs.
   *
   * Get the audit logs associated with an enterprise.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.enterpriseIdentifier - Enterprise ID.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>>}
   */
  public listEnterpriseAudits(
    params: CatalogManagementV1.ListEnterpriseAuditsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>> {
    const _params = { ...params };
    const _requiredParams = ['enterpriseIdentifier'];
    const _validParams = ['enterpriseIdentifier', 'start', 'limit', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'enterprise_identifier': _params.enterpriseIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listEnterpriseAudits');

    const parameters = {
      options: {
        url: '/enterprises/{enterprise_identifier}/audits',
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
   * Get an enterprise audit log entry.
   *
   * Get the full audit log entry associated with an enterprise.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.enterpriseIdentifier - Enterprise ID.
   * @param {string} params.auditlogIdentifier - Auditlog ID.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>>}
   */
  public getEnterpriseAudit(
    params: CatalogManagementV1.GetEnterpriseAuditParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>> {
    const _params = { ...params };
    const _requiredParams = ['enterpriseIdentifier', 'auditlogIdentifier'];
    const _validParams = ['enterpriseIdentifier', 'auditlogIdentifier', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'enterprise_identifier': _params.enterpriseIdentifier,
      'auditlog_identifier': _params.auditlogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getEnterpriseAudit');

    const parameters = {
      options: {
        url: '/enterprises/{enterprise_identifier}/audits/{auditlog_identifier}',
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
   * offerings
   ************************/

  /**
   * Get consumption offerings.
   *
   * Retrieve the available offerings from both public and from the account that currently scoped for consumption. These
   * copies cannot be used for updating. They are not complete and only return what is visible to the caller. This can
   * be used by an unauthenticated user to retreive publicly available offerings.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.digest] - true - Strip down the content of what is returned. For example don't return the
   * readme. Makes the result much smaller. Defaults to false.
   * @param {string} [params.catalog] - catalog id. Narrow search down to just a particular catalog. It will apply the
   * catalog's public filters to the public catalog offerings on the result.
   * @param {string} [params.select] - What should be selected. Default is 'all' which will return both public and
   * private offerings. 'public' returns only the public offerings and 'private' returns only the private offerings.
   * @param {boolean} [params.includeHidden] - true - include offerings which have been marked as hidden. The default is
   * false and hidden offerings are not returned.
   * @param {number} [params.limit] - number or results to return.
   * @param {number} [params.offset] - number of results to skip before returning values.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingSearchResult>>}
   */
  public getConsumptionOfferings(
    params?: CatalogManagementV1.GetConsumptionOfferingsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingSearchResult>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['digest', 'catalog', 'select', 'includeHidden', 'limit', 'offset', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'digest': _params.digest,
      'catalog': _params.catalog,
      'select': _params.select,
      'includeHidden': _params.includeHidden,
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getConsumptionOfferings');

    const parameters = {
      options: {
        url: '/offerings',
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
   * Get list of offerings.
   *
   * Retrieve the available offerings in the specified catalog. This can also be used by an unauthenticated user to
   * retreive publicly available offerings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {boolean} [params.digest] - true - Strip down the content of what is returned. For example don't return the
   * readme. Makes the result much smaller. Defaults to false.
   * @param {number} [params.limit] - The maximum number of results to return.
   * @param {number} [params.offset] - The number of results to skip before returning values.
   * @param {string} [params.name] - Only return results that contain the specified string.
   * @param {string} [params.sort] - The field on which the output is sorted. Sorts by default by **label** property.
   * Available fields are **name**, **label**, **created**, and **updated**. By adding **-** (i.e. **-label**) in front
   * of the query string, you can specify descending order. Default is ascending order.
   * @param {boolean} [params.includeHidden] - true - include offerings which have been marked as hidden. The default is
   * true. To not return hidden offerings false must be explicitly set.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingSearchResult>>}
   */
  public listOfferings(
    params: CatalogManagementV1.ListOfferingsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingSearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'digest', 'limit', 'offset', 'name', 'sort', 'includeHidden', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'digest': _params.digest,
      'limit': _params.limit,
      'offset': _params.offset,
      'name': _params.name,
      'sort': _params.sort,
      'includeHidden': _params.includeHidden,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listOfferings');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings',
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
   * Create offering.
   *
   * Create an offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} [params.url] - The url for this specific offering.
   * @param {string} [params.crn] - The crn for this specific offering.
   * @param {string} [params.label] - Display Name in the requested language.
   * @param {JsonObject} [params.labelI18n] - A map of translated strings, by language code.
   * @param {string} [params.name] - The programmatic name of this offering.
   * @param {string} [params.offeringIconUrl] - URL for an icon associated with this offering.
   * @param {string} [params.offeringDocsUrl] - URL for an additional docs with this offering.
   * @param {string} [params.offeringSupportUrl] - [deprecated] - Use offering.support instead.  URL to be displayed in
   * the Consumption UI for getting support on this offering.
   * @param {string[]} [params.tags] - List of tags associated with this catalog.
   * @param {string[]} [params.keywords] - List of keywords associated with offering, typically used to search for it.
   * @param {Rating} [params.rating] - Repository info for offerings.
   * @param {string} [params.created] - The date and time this catalog was created.
   * @param {string} [params.updated] - The date and time this catalog was last updated.
   * @param {string} [params.shortDescription] - Short description in the requested language.
   * @param {JsonObject} [params.shortDescriptionI18n] - A map of translated strings, by language code.
   * @param {string} [params.longDescription] - Long description in the requested language.
   * @param {JsonObject} [params.longDescriptionI18n] - A map of translated strings, by language code.
   * @param {Feature[]} [params.features] - list of features associated with this offering.
   * @param {Kind[]} [params.kinds] - Array of kind.
   * @param {PublishObject} [params.publish] - Publish information.
   * @param {boolean} [params.pcManaged] - Offering is managed by Partner Center.
   * @param {boolean} [params.publishApproved] - Offering has been approved to publish to permitted to IBM or Public
   * Catalog.
   * @param {boolean} [params.shareWithAll] - Denotes public availability of an Offering.
   * @param {boolean} [params.shareWithIbm] - Denotes IBM employee availability of an Offering - if share_enabled is
   * true.
   * @param {boolean} [params.shareEnabled] - Denotes sharing including access list availability of an Offering is
   * enabled.
   * @param {boolean} [params.permitRequestIbmPublicPublish] - Deprecated: Is it permitted to request publishing to IBM
   * or Public.
   * @param {boolean} [params.ibmPublishApproved] - Deprecated: Indicates if this offering has been approved for use by
   * all IBMers.
   * @param {boolean} [params.publicPublishApproved] - Deprecated: Indicates if this offering has been approved for use
   * by all IBM Cloud users.
   * @param {string} [params.publicOriginalCrn] - The original offering CRN that this publish entry came from.
   * @param {string} [params.publishPublicCrn] - The crn of the public catalog entry of this offering.
   * @param {string} [params.portalApprovalRecord] - The portal's approval record ID.
   * @param {string} [params.portalUiUrl] - The portal UI URL.
   * @param {string} [params.catalogId] - The id of the catalog containing this offering.
   * @param {string} [params.catalogName] - The name of the catalog.
   * @param {JsonObject} [params.metadata] - Map of metadata values for this offering.
   * @param {string} [params.disclaimer] - A disclaimer for this offering.
   * @param {boolean} [params.hidden] - Determine if this offering should be displayed in the Consumption UI.
   * @param {string} [params.provider] - Deprecated: Deprecated - Provider of this offering.
   * @param {ProviderInfo} [params.providerInfo] - Information on the provider for this offering, or omitted if no
   * provider information is given.
   * @param {RepoInfo} [params.repoInfo] - Repository info for offerings.
   * @param {ImagePullKey[]} [params.imagePullKeys] - Image pull keys for this offering.
   * @param {Support} [params.support] - Offering Support information.
   * @param {MediaItem[]} [params.media] - A list of media items related to this offering.
   * @param {DeprecatePending} [params.deprecatePending] - Deprecation information for an Offering.
   * @param {string} [params.productKind] - The product kind.  Valid values are module, solution, or empty string.
   * @param {Badge[]} [params.badges] - A list of badges for this offering.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public createOffering(
    params: CatalogManagementV1.CreateOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'url', 'crn', 'label', 'labelI18n', 'name', 'offeringIconUrl', 'offeringDocsUrl', 'offeringSupportUrl', 'tags', 'keywords', 'rating', 'created', 'updated', 'shortDescription', 'shortDescriptionI18n', 'longDescription', 'longDescriptionI18n', 'features', 'kinds', 'publish', 'pcManaged', 'publishApproved', 'shareWithAll', 'shareWithIbm', 'shareEnabled', 'permitRequestIbmPublicPublish', 'ibmPublishApproved', 'publicPublishApproved', 'publicOriginalCrn', 'publishPublicCrn', 'portalApprovalRecord', 'portalUiUrl', 'catalogId', 'catalogName', 'metadata', 'disclaimer', 'hidden', 'provider', 'providerInfo', 'repoInfo', 'imagePullKeys', 'support', 'media', 'deprecatePending', 'productKind', 'badges', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'url': _params.url,
      'crn': _params.crn,
      'label': _params.label,
      'label_i18n': _params.labelI18n,
      'name': _params.name,
      'offering_icon_url': _params.offeringIconUrl,
      'offering_docs_url': _params.offeringDocsUrl,
      'offering_support_url': _params.offeringSupportUrl,
      'tags': _params.tags,
      'keywords': _params.keywords,
      'rating': _params.rating,
      'created': _params.created,
      'updated': _params.updated,
      'short_description': _params.shortDescription,
      'short_description_i18n': _params.shortDescriptionI18n,
      'long_description': _params.longDescription,
      'long_description_i18n': _params.longDescriptionI18n,
      'features': _params.features,
      'kinds': _params.kinds,
      'publish': _params.publish,
      'pc_managed': _params.pcManaged,
      'publish_approved': _params.publishApproved,
      'share_with_all': _params.shareWithAll,
      'share_with_ibm': _params.shareWithIbm,
      'share_enabled': _params.shareEnabled,
      'permit_request_ibm_public_publish': _params.permitRequestIbmPublicPublish,
      'ibm_publish_approved': _params.ibmPublishApproved,
      'public_publish_approved': _params.publicPublishApproved,
      'public_original_crn': _params.publicOriginalCrn,
      'publish_public_crn': _params.publishPublicCrn,
      'portal_approval_record': _params.portalApprovalRecord,
      'portal_ui_url': _params.portalUiUrl,
      'catalog_id': _params.catalogId,
      'catalog_name': _params.catalogName,
      'metadata': _params.metadata,
      'disclaimer': _params.disclaimer,
      'hidden': _params.hidden,
      'provider': _params.provider,
      'provider_info': _params.providerInfo,
      'repo_info': _params.repoInfo,
      'image_pull_keys': _params.imagePullKeys,
      'support': _params.support,
      'media': _params.media,
      'deprecate_pending': _params.deprecatePending,
      'product_kind': _params.productKind,
      'badges': _params.badges,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'createOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings',
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
   * Import offering version.
   *
   * Import new version to an offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string[]} [params.tags] - Tags array.
   * @param {string} [params.content] - Byte array representing the content to be imported. Only supported for OVA
   * images at this time.
   * @param {string} [params.name] - Name of version. Required for virtual server image for VPC.
   * @param {string} [params.label] - Display name of version. Required for virtual server image for VPC.
   * @param {string} [params.installKind] - Install type. Example: instance. Required for virtual server image for VPC.
   * @param {string[]} [params.targetKinds] - Deployment target of the content being onboarded. Current valid values are
   * iks, roks, vcenter, power-iaas, terraform, and vpc-x86. Required for virtual server image for VPC.
   * @param {string} [params.formatKind] - Format of content being onboarded. Example: vsi-image. Required for virtual
   * server image for VPC.
   * @param {string} [params.productKind] - Optional product kind for the software being onboarded.  Valid values are
   * software, module, or solution.  Default value is software.
   * @param {string} [params.sha] - SHA256 fingerprint of the image file. Required for virtual server image for VPC.
   * @param {string} [params.version] - Semantic version of the software being onboarded. Required for virtual server
   * image for VPC.
   * @param {Flavor} [params.flavor] - Version Flavor Information.  Only supported for Product kind Solution.
   * @param {ImportOfferingBodyMetadata} [params.metadata] - Generic data to be included with content being onboarded.
   * Required for virtual server image for VPC.
   * @param {string} [params.workingDirectory] - Optional - The sub-folder within the specified tgz file that contains
   * the software being onboarded.
   * @param {string} [params.zipurl] - URL path to zip location.  If not specified, must provide content in the body of
   * this call.
   * @param {string} [params.targetVersion] - The semver value for this new version, if not found in the zip url package
   * content.
   * @param {boolean} [params.includeConfig] - Add all possible configuration values to this version when importing.
   * @param {boolean} [params.isVsi] - Indicates that the current terraform template is used to install a virtual server
   * image.
   * @param {string} [params.repotype] - The type of repository containing this version.  Valid values are 'public_git'
   * or 'enterprise_git'.
   * @param {string} [params.xAuthToken] - Authentication token used to access the specified zip file.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public importOfferingVersion(
    params: CatalogManagementV1.ImportOfferingVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'tags', 'content', 'name', 'label', 'installKind', 'targetKinds', 'formatKind', 'productKind', 'sha', 'version', 'flavor', 'metadata', 'workingDirectory', 'zipurl', 'targetVersion', 'includeConfig', 'isVsi', 'repotype', 'xAuthToken', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tags': _params.tags,
      'content': _params.content,
      'name': _params.name,
      'label': _params.label,
      'install_kind': _params.installKind,
      'target_kinds': _params.targetKinds,
      'format_kind': _params.formatKind,
      'product_kind': _params.productKind,
      'sha': _params.sha,
      'version': _params.version,
      'flavor': _params.flavor,
      'metadata': _params.metadata,
      'working_directory': _params.workingDirectory,
    };

    const query = {
      'zipurl': _params.zipurl,
      'targetVersion': _params.targetVersion,
      'includeConfig': _params.includeConfig,
      'isVSI': _params.isVsi,
      'repotype': _params.repotype,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'importOfferingVersion');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/version',
        method: 'POST',
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
            'X-Auth-Token': _params.xAuthToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Import offering.
   *
   * Import a new offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string[]} [params.tags] - Tags array.
   * @param {string} [params.content] - Byte array representing the content to be imported. Only supported for OVA
   * images at this time.
   * @param {string} [params.name] - Name of version. Required for virtual server image for VPC.
   * @param {string} [params.label] - Display name of version. Required for virtual server image for VPC.
   * @param {string} [params.installKind] - Install type. Example: instance. Required for virtual server image for VPC.
   * @param {string[]} [params.targetKinds] - Deployment target of the content being onboarded. Current valid values are
   * iks, roks, vcenter, power-iaas, terraform, and vpc-x86. Required for virtual server image for VPC.
   * @param {string} [params.formatKind] - Format of content being onboarded. Example: vsi-image. Required for virtual
   * server image for VPC.
   * @param {string} [params.productKind] - Optional product kind for the software being onboarded.  Valid values are
   * software, module, or solution.  Default value is software.
   * @param {string} [params.sha] - SHA256 fingerprint of the image file. Required for virtual server image for VPC.
   * @param {string} [params.version] - Semantic version of the software being onboarded. Required for virtual server
   * image for VPC.
   * @param {Flavor} [params.flavor] - Version Flavor Information.  Only supported for Product kind Solution.
   * @param {ImportOfferingBodyMetadata} [params.metadata] - Generic data to be included with content being onboarded.
   * Required for virtual server image for VPC.
   * @param {string} [params.workingDirectory] - Optional - The sub-folder within the specified tgz file that contains
   * the software being onboarded.
   * @param {string} [params.zipurl] - URL path to zip location.  If not specified, must provide content in this post
   * body.
   * @param {string} [params.offeringId] - Re-use the specified offeringID during import.
   * @param {string} [params.targetVersion] - The semver value for this new version.
   * @param {boolean} [params.includeConfig] - Add all possible configuration items when creating this version.
   * @param {boolean} [params.isVsi] - Indicates that the current terraform template is used to install a virtual server
   * image.
   * @param {string} [params.repotype] - The type of repository containing this version.  Valid values are 'public_git'
   * or 'enterprise_git'.
   * @param {string} [params.xAuthToken] - Authentication token used to access the specified zip file.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public importOffering(
    params: CatalogManagementV1.ImportOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'tags', 'content', 'name', 'label', 'installKind', 'targetKinds', 'formatKind', 'productKind', 'sha', 'version', 'flavor', 'metadata', 'workingDirectory', 'zipurl', 'offeringId', 'targetVersion', 'includeConfig', 'isVsi', 'repotype', 'xAuthToken', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tags': _params.tags,
      'content': _params.content,
      'name': _params.name,
      'label': _params.label,
      'install_kind': _params.installKind,
      'target_kinds': _params.targetKinds,
      'format_kind': _params.formatKind,
      'product_kind': _params.productKind,
      'sha': _params.sha,
      'version': _params.version,
      'flavor': _params.flavor,
      'metadata': _params.metadata,
      'working_directory': _params.workingDirectory,
    };

    const query = {
      'zipurl': _params.zipurl,
      'offeringID': _params.offeringId,
      'targetVersion': _params.targetVersion,
      'includeConfig': _params.includeConfig,
      'isVSI': _params.isVsi,
      'repotype': _params.repotype,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'importOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/import/offerings',
        method: 'POST',
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
            'X-Auth-Token': _params.xAuthToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Reload offering.
   *
   * Reload an existing version in offering from a tgz.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} params.targetVersion - The semver value for this new version.
   * @param {string[]} [params.tags] - Tags array.
   * @param {string} [params.content] - byte array representing the content to be imported.  Only supported for OVA
   * images at this time.
   * @param {string[]} [params.targetKinds] - Target kinds.  Current valid values are 'iks', 'roks', 'vcenter',
   * 'power-iaas', and 'terraform'.
   * @param {string} [params.formatKind] - Format of content being onboarded. Example: vsi-image. Required for virtual
   * server image for VPC.
   * @param {Flavor} [params.flavor] - Version Flavor Information.  Only supported for Product kind Solution.
   * @param {string} [params.workingDirectory] - Optional - The sub-folder within the specified tgz file that contains
   * the software being onboarded.
   * @param {string} [params.zipurl] - URL path to zip location.  If not specified, must provide content in this post
   * body.
   * @param {string} [params.repoType] - The type of repository containing this version.  Valid values are 'public_git'
   * or 'enterprise_git'.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public reloadOffering(
    params: CatalogManagementV1.ReloadOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'targetVersion'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'targetVersion', 'tags', 'content', 'targetKinds', 'formatKind', 'flavor', 'workingDirectory', 'zipurl', 'repoType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tags': _params.tags,
      'content': _params.content,
      'target_kinds': _params.targetKinds,
      'format_kind': _params.formatKind,
      'flavor': _params.flavor,
      'working_directory': _params.workingDirectory,
    };

    const query = {
      'targetVersion': _params.targetVersion,
      'zipurl': _params.zipurl,
      'repoType': _params.repoType,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'reloadOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/reload',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get offering.
   *
   * Get an offering. This can be used by an unauthenticated user for publicly available offerings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} [params.type] - Offering Parameter Type.  Valid values are 'name' or 'id'.  Default is 'id'.
   * @param {boolean} [params.digest] - Return the digest format of the specified offering.  Default is false.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public getOffering(
    params: CatalogManagementV1.GetOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'type', 'digest', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'type': _params.type,
      'digest': _params.digest,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}',
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
   * Update offering.
   *
   * Update an offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} [params.id] - unique id.
   * @param {string} [params.rev] - Cloudant revision.
   * @param {string} [params.url] - The url for this specific offering.
   * @param {string} [params.crn] - The crn for this specific offering.
   * @param {string} [params.label] - Display Name in the requested language.
   * @param {JsonObject} [params.labelI18n] - A map of translated strings, by language code.
   * @param {string} [params.name] - The programmatic name of this offering.
   * @param {string} [params.offeringIconUrl] - URL for an icon associated with this offering.
   * @param {string} [params.offeringDocsUrl] - URL for an additional docs with this offering.
   * @param {string} [params.offeringSupportUrl] - [deprecated] - Use offering.support instead.  URL to be displayed in
   * the Consumption UI for getting support on this offering.
   * @param {string[]} [params.tags] - List of tags associated with this catalog.
   * @param {string[]} [params.keywords] - List of keywords associated with offering, typically used to search for it.
   * @param {Rating} [params.rating] - Repository info for offerings.
   * @param {string} [params.created] - The date and time this catalog was created.
   * @param {string} [params.updated] - The date and time this catalog was last updated.
   * @param {string} [params.shortDescription] - Short description in the requested language.
   * @param {JsonObject} [params.shortDescriptionI18n] - A map of translated strings, by language code.
   * @param {string} [params.longDescription] - Long description in the requested language.
   * @param {JsonObject} [params.longDescriptionI18n] - A map of translated strings, by language code.
   * @param {Feature[]} [params.features] - list of features associated with this offering.
   * @param {Kind[]} [params.kinds] - Array of kind.
   * @param {PublishObject} [params.publish] - Publish information.
   * @param {boolean} [params.pcManaged] - Offering is managed by Partner Center.
   * @param {boolean} [params.publishApproved] - Offering has been approved to publish to permitted to IBM or Public
   * Catalog.
   * @param {boolean} [params.shareWithAll] - Denotes public availability of an Offering.
   * @param {boolean} [params.shareWithIbm] - Denotes IBM employee availability of an Offering - if share_enabled is
   * true.
   * @param {boolean} [params.shareEnabled] - Denotes sharing including access list availability of an Offering is
   * enabled.
   * @param {boolean} [params.permitRequestIbmPublicPublish] - Deprecated: Is it permitted to request publishing to IBM
   * or Public.
   * @param {boolean} [params.ibmPublishApproved] - Deprecated: Indicates if this offering has been approved for use by
   * all IBMers.
   * @param {boolean} [params.publicPublishApproved] - Deprecated: Indicates if this offering has been approved for use
   * by all IBM Cloud users.
   * @param {string} [params.publicOriginalCrn] - The original offering CRN that this publish entry came from.
   * @param {string} [params.publishPublicCrn] - The crn of the public catalog entry of this offering.
   * @param {string} [params.portalApprovalRecord] - The portal's approval record ID.
   * @param {string} [params.portalUiUrl] - The portal UI URL.
   * @param {string} [params.catalogId] - The id of the catalog containing this offering.
   * @param {string} [params.catalogName] - The name of the catalog.
   * @param {JsonObject} [params.metadata] - Map of metadata values for this offering.
   * @param {string} [params.disclaimer] - A disclaimer for this offering.
   * @param {boolean} [params.hidden] - Determine if this offering should be displayed in the Consumption UI.
   * @param {string} [params.provider] - Deprecated: Deprecated - Provider of this offering.
   * @param {ProviderInfo} [params.providerInfo] - Information on the provider for this offering, or omitted if no
   * provider information is given.
   * @param {RepoInfo} [params.repoInfo] - Repository info for offerings.
   * @param {ImagePullKey[]} [params.imagePullKeys] - Image pull keys for this offering.
   * @param {Support} [params.support] - Offering Support information.
   * @param {MediaItem[]} [params.media] - A list of media items related to this offering.
   * @param {DeprecatePending} [params.deprecatePending] - Deprecation information for an Offering.
   * @param {string} [params.productKind] - The product kind.  Valid values are module, solution, or empty string.
   * @param {Badge[]} [params.badges] - A list of badges for this offering.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public replaceOffering(
    params: CatalogManagementV1.ReplaceOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'id', 'rev', 'url', 'crn', 'label', 'labelI18n', 'name', 'offeringIconUrl', 'offeringDocsUrl', 'offeringSupportUrl', 'tags', 'keywords', 'rating', 'created', 'updated', 'shortDescription', 'shortDescriptionI18n', 'longDescription', 'longDescriptionI18n', 'features', 'kinds', 'publish', 'pcManaged', 'publishApproved', 'shareWithAll', 'shareWithIbm', 'shareEnabled', 'permitRequestIbmPublicPublish', 'ibmPublishApproved', 'publicPublishApproved', 'publicOriginalCrn', 'publishPublicCrn', 'portalApprovalRecord', 'portalUiUrl', 'catalogId', 'catalogName', 'metadata', 'disclaimer', 'hidden', 'provider', 'providerInfo', 'repoInfo', 'imagePullKeys', 'support', 'media', 'deprecatePending', 'productKind', 'badges', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      '_rev': _params.rev,
      'url': _params.url,
      'crn': _params.crn,
      'label': _params.label,
      'label_i18n': _params.labelI18n,
      'name': _params.name,
      'offering_icon_url': _params.offeringIconUrl,
      'offering_docs_url': _params.offeringDocsUrl,
      'offering_support_url': _params.offeringSupportUrl,
      'tags': _params.tags,
      'keywords': _params.keywords,
      'rating': _params.rating,
      'created': _params.created,
      'updated': _params.updated,
      'short_description': _params.shortDescription,
      'short_description_i18n': _params.shortDescriptionI18n,
      'long_description': _params.longDescription,
      'long_description_i18n': _params.longDescriptionI18n,
      'features': _params.features,
      'kinds': _params.kinds,
      'publish': _params.publish,
      'pc_managed': _params.pcManaged,
      'publish_approved': _params.publishApproved,
      'share_with_all': _params.shareWithAll,
      'share_with_ibm': _params.shareWithIbm,
      'share_enabled': _params.shareEnabled,
      'permit_request_ibm_public_publish': _params.permitRequestIbmPublicPublish,
      'ibm_publish_approved': _params.ibmPublishApproved,
      'public_publish_approved': _params.publicPublishApproved,
      'public_original_crn': _params.publicOriginalCrn,
      'publish_public_crn': _params.publishPublicCrn,
      'portal_approval_record': _params.portalApprovalRecord,
      'portal_ui_url': _params.portalUiUrl,
      'catalog_id': _params.catalogId,
      'catalog_name': _params.catalogName,
      'metadata': _params.metadata,
      'disclaimer': _params.disclaimer,
      'hidden': _params.hidden,
      'provider': _params.provider,
      'provider_info': _params.providerInfo,
      'repo_info': _params.repoInfo,
      'image_pull_keys': _params.imagePullKeys,
      'support': _params.support,
      'media': _params.media,
      'deprecate_pending': _params.deprecatePending,
      'product_kind': _params.productKind,
      'badges': _params.badges,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update offering.
   *
   * Update an offering using a JSONPatch document as defined by RFC 6902.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} params.ifMatch - Offering etag contained in quotes.
   * @param {JsonPatchOperation[]} [params.updates] -
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public updateOffering(
    params: CatalogManagementV1.UpdateOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'ifMatch'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'ifMatch', 'updates', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.updates;
    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'updateOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}',
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
            'Content-Type': 'application/json-patch+json',
            'If-Match': _params.ifMatch,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete offering.
   *
   * Delete an offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public deleteOffering(
    params: CatalogManagementV1.DeleteOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}',
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
   * Get offering audit logs.
   *
   * Get the audit logs associated with an offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>>}
   */
  public listOfferingAudits(
    params: CatalogManagementV1.ListOfferingAuditsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'start', 'limit', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listOfferingAudits');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/audits',
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
   * Get an offering audit log entry.
   *
   * Get the full audit log entry associated with an offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} params.auditlogIdentifier - Auditlog ID.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>>}
   */
  public getOfferingAudit(
    params: CatalogManagementV1.GetOfferingAuditParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'auditlogIdentifier'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'auditlogIdentifier', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
      'auditlog_identifier': _params.auditlogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingAudit');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/audits/{auditlog_identifier}',
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
   * Set offering publish approval settings.
   *
   * Approve or disapprove the offering to be allowed to publish to the IBM Public Catalog. This is used only by Partner
   * Center. Only users with Approval IAM authority can use this. Approvers should use the catalog and offering id from
   * the public catalog since they wouldn't have access to the private offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} params.approvalType - Type of approval.
   *  * `pc_managed` - Partner Center is managing this offering
   *  * `ibm_module_repo` - Offering is from an approved repository can be published into the public catalog.
   *  * `publish_approved` - Publishing approved, offering owners can now set who sees the offering in public catalog
   *  * `approval_required` - Offering will be removed from public catalog when this flag is set to true, regardless of
   * the approval and visibility settings.
   * @param {string} params.approved - Approve (true) or disapprove (false).
   * @param {string} [params.portalRecord] - Partner Center identifier for this offering.
   * @param {string} [params.portalUrl] - Partner Center url for this offering.
   * @param {string} [params.xApproverToken] - IAM token of partner center. Only needed when Partner Center accessing
   * the private catalog offering. When accessing the public offering Partner Center only needs to use their token in
   * the authorization header.
   * @param {string} [params.xAuthToken] - Authentication token used to verify if user is a collaborator of a repository
   * as part of the checks to set the approval type as `ibm_module_repo`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ApprovalResult>>}
   */
  public setOfferingPublish(
    params: CatalogManagementV1.SetOfferingPublishParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ApprovalResult>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'approvalType', 'approved'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'approvalType', 'approved', 'portalRecord', 'portalUrl', 'xApproverToken', 'xAuthToken', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'portal_record': _params.portalRecord,
      'portal_url': _params.portalUrl,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
      'approval_type': _params.approvalType,
      'approved': _params.approved,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'setOfferingPublish');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/publish/{approval_type}/{approved}',
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
            'X-Approver-Token': _params.xApproverToken,
            'X-Auth-Token': _params.xAuthToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Allows offering to be deprecated.
   *
   * Approve or disapprove the offering to be deprecated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} params.setting - Set deprecation (true) or cancel deprecation (false).
   * @param {string} [params.description] - Additional information that users can provide to be displayed in deprecation
   * notification.
   * @param {number} [params.daysUntilDeprecate] - Specifies the amount of days until product is not available in
   * catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public deprecateOffering(
    params: CatalogManagementV1.DeprecateOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'setting'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'setting', 'description', 'daysUntilDeprecate', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'days_until_deprecate': _params.daysUntilDeprecate,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
      'setting': _params.setting,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deprecateOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/deprecate/{setting}',
        method: 'POST',
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

  /**
   * Allows offering to be shared.
   *
   * Set the share options on an offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {boolean} [params.ibm] - Visible to IBM employees.
   * @param {boolean} [params._public] - Visible to everyone in the public catalog.
   * @param {boolean} [params.enabled] - Visible to access list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareSetting>>}
   */
  public shareOffering(
    params: CatalogManagementV1.ShareOfferingParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareSetting>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'ibm', '_public', 'enabled', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'ibm': _params.ibm,
      'public': _params._public,
      'enabled': _params.enabled,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'shareOffering');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/share',
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
   * Check for account ID in offering access list.
   *
   * Determine if an account ID is in an offering's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} params.accessIdentifier - Identifier for access. Use 'accountId' or '-acct-accountId' for an
   * account, '-ent-enterpriseid' for an enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Access>>}
   */
  public getOfferingAccess(
    params: CatalogManagementV1.GetOfferingAccessParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Access>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'accessIdentifier'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'accessIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
      'access_identifier': _params.accessIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingAccess');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/access/{access_identifier}',
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
   * Get offering access list.
   *
   * Get the access list associated with the specified offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListResult>>}
   */
  public getOfferingAccessList(
    params: CatalogManagementV1.GetOfferingAccessListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListResult>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'start', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingAccessList');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/access',
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
   * Delete accesses from offering access list.
   *
   * Delete all or a set of accesses from an offering's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string[]} params.accesses - A list of accesses to delete.  An entry with star["*"] will remove all
   * accesses.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>>}
   */
  public deleteOfferingAccessList(
    params: CatalogManagementV1.DeleteOfferingAccessListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'accesses'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'accesses', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.accesses;
    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteOfferingAccessList');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/access',
        method: 'DELETE',
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
   * Add accesses to offering access list.
   *
   * Add one or more accesses to the specified offering's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string[]} params.accesses - A list of accesses to add.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListResult>>}
   */
  public addOfferingAccessList(
    params: CatalogManagementV1.AddOfferingAccessListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListResult>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'accesses'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'accesses', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.accesses;
    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'addOfferingAccessList');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/access',
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
   * Get version updates.
   *
   * Get available updates for the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.offeringId - Offering identification.
   * @param {string} params.kind - The kind of offering (e.g, helm, ova, terraform ...).
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.target] - The target kind of the currently installed version (e.g. iks, roks, etc).
   * @param {string} [params.version] - optionaly provide an existing version to check updates for if one is not given,
   * all version will be returned.
   * @param {string} [params.clusterId] - The id of the cluster where this version was installed.
   * @param {string} [params.region] - The region of the cluster where this version was installed.
   * @param {string} [params.resourceGroupId] - The resource group id of the cluster where this version was installed.
   * @param {string} [params.namespace] - The namespace of the cluster where this version was installed.
   * @param {string} [params.sha] - The sha value of the currently installed version.
   * @param {string} [params.channel] - Optionally provide the channel value of the currently installed version.
   * @param {string[]} [params.namespaces] - Optionally provide a list of namespaces used for the currently installed
   * version.
   * @param {boolean} [params.allNamespaces] - Optionally indicate that the current version was installed in all
   * namespaces.
   * @param {string} [params.flavor] - The programmatic flavor name of the version that was installed.
   * @param {string} [params.installType] - The install type of the version that was installed.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.VersionUpdateDescriptor[]>>}
   */
  public getOfferingUpdates(
    params: CatalogManagementV1.GetOfferingUpdatesParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.VersionUpdateDescriptor[]>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'offeringId', 'kind', 'xAuthRefreshToken'];
    const _validParams = ['catalogIdentifier', 'offeringId', 'kind', 'xAuthRefreshToken', 'target', 'version', 'clusterId', 'region', 'resourceGroupId', 'namespace', 'sha', 'channel', 'namespaces', 'allNamespaces', 'flavor', 'installType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'kind': _params.kind,
      'target': _params.target,
      'version': _params.version,
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'resource_group_id': _params.resourceGroupId,
      'namespace': _params.namespace,
      'sha': _params.sha,
      'channel': _params.channel,
      'namespaces': _params.namespaces,
      'all_namespaces': _params.allNamespaces,
      'flavor': _params.flavor,
      'install_type': _params.installType,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'offering_id': _params.offeringId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingUpdates');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/offerings/{offering_id}/updates',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get offering source.
   *
   * Get an offering's source.  This request requires authorization for private offerings.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.version - The version being requested.
   * @param {string} [params.accept] - The type of the response: application/yaml, application/json, or
   * application/x-gzip.
   * @param {string} [params.catalogId] - Catalog ID.  If not specified, this value will default to the public catalog.
   * @param {string} [params.name] - Offering name.  An offering name or ID must be specified.
   * @param {string} [params.id] - Offering id.  An offering name or ID must be specified.
   * @param {string} [params.kind] - The kind of offering (e.g. helm, ova, terraform...).
   * @param {string} [params.channel] - The channel value of the specified version.
   * @param {string} [params.flavor] - The programmatic flavor name of the specified version.
   * @param {boolean} [params.asIs] - If false (the default), the root folder from the original onboarded tgz file is
   * removed.  If true, the root folder is returned.
   * @param {string} [params.installType] - The install type of the specified version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<NodeJS.ReadableStream>>}
   */
  public getOfferingSource(
    params: CatalogManagementV1.GetOfferingSourceParams
  ): Promise<CatalogManagementV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['version'];
    const _validParams = ['version', 'accept', 'catalogId', 'name', 'id', 'kind', 'channel', 'flavor', 'asIs', 'installType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
      'catalogID': _params.catalogId,
      'name': _params.name,
      'id': _params.id,
      'kind': _params.kind,
      'channel': _params.channel,
      'flavor': _params.flavor,
      'asIs': _params.asIs,
      'installType': _params.installType,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingSource');

    const parameters = {
      options: {
        url: '/offering/source',
        method: 'GET',
        qs: query,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get offering source.
   *
   * Get an offering's source.  This request requires authorization for private offerings.  Note that the URL can
   * include an additional 'working directory' value (i.e. /offering/source/archive//solutions/standard), which allows
   * this single URL to be used in a Terraform module statement as well.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.version - The version being requested.
   * @param {string} [params.accept] - The type of the response: application/yaml, application/json, or
   * application/x-gzip.
   * @param {string} [params.catalogId] - Catalog ID.  If not specified, this value will default to the public catalog.
   * @param {string} [params.name] - Offering name.  An offering name or ID must be specified.
   * @param {string} [params.id] - Offering id.  An offering name or ID must be specified.
   * @param {string} [params.kind] - The kind of offering (e.g. helm, ova, terraform...).
   * @param {string} [params.channel] - The channel value of the specified version.
   * @param {string} [params.flavor] - The programmatic flavor name of the specified version.
   * @param {boolean} [params.asIs] - If false (the default), the root folder from the original onboarded tgz file is
   * removed.  If true, the root folder is returned.
   * @param {string} [params.installType] - The install type of the specified version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<NodeJS.ReadableStream>>}
   */
  public getOfferingSourceArchive(
    params: CatalogManagementV1.GetOfferingSourceArchiveParams
  ): Promise<CatalogManagementV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['version'];
    const _validParams = ['version', 'accept', 'catalogId', 'name', 'id', 'kind', 'channel', 'flavor', 'asIs', 'installType', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'version': _params.version,
      'catalogID': _params.catalogId,
      'name': _params.name,
      'id': _params.id,
      'kind': _params.kind,
      'channel': _params.channel,
      'flavor': _params.flavor,
      'asIs': _params.asIs,
      'installType': _params.installType,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingSourceArchive');

    const parameters = {
      options: {
        url: '/offering/source/archive',
        method: 'GET',
        qs: query,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get offering source URL.
   *
   * Get an offering's private source image.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.keyIdentifier - Unique key identifying an image.
   * @param {string} [params.accept] - The type of the response: application/yaml, application/json, or
   * application/x-gzip.
   * @param {string} [params.catalogId] - Catalog ID. If not specified, this value will default to the public catalog.
   * @param {string} [params.name] - Offering name. An offering name or ID must be specified.
   * @param {string} [params.id] - Offering id. An offering name or ID must be specified.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<NodeJS.ReadableStream>>}
   */
  public getOfferingSourceUrl(
    params: CatalogManagementV1.GetOfferingSourceUrlParams
  ): Promise<CatalogManagementV1.Response<NodeJS.ReadableStream>> {
    const _params = { ...params };
    const _requiredParams = ['keyIdentifier'];
    const _validParams = ['keyIdentifier', 'accept', 'catalogId', 'name', 'id', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'catalogID': _params.catalogId,
      'name': _params.name,
      'id': _params.id,
    };

    const path = {
      'key_identifier': _params.keyIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingSourceUrl');

    const parameters = {
      options: {
        url: '/offering/source/url/{key_identifier}',
        method: 'GET',
        qs: query,
        path,
        responseType: 'stream',
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': _params.accept,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * versions
   ************************/

  /**
   * Get version about information.
   *
   * Get the about information, in markdown, for the current version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<string>>}
   */
  public getOfferingAbout(
    params: CatalogManagementV1.GetOfferingAboutParams
  ): Promise<CatalogManagementV1.Response<string>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingAbout');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/about',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'text/markdown',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get version license content.
   *
   * Get the license content for the specified license ID in the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.licenseId - The ID of the license, which maps to the file name in the 'licenses' directory
   * of this verions tgz file.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<string>>}
   */
  public getOfferingLicense(
    params: CatalogManagementV1.GetOfferingLicenseParams
  ): Promise<CatalogManagementV1.Response<string>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'licenseId'];
    const _validParams = ['versionLocId', 'licenseId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
      'license_id': _params.licenseId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingLicense');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/licenses/{license_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'text/plain',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get version's container images.
   *
   * Get the list of container images associated with the specified version. The "image_manifest_url" property of the
   * version should be the URL for the image manifest, and the operation will return that content.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ImageManifest>>}
   */
  public getOfferingContainerImages(
    params: CatalogManagementV1.GetOfferingContainerImagesParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ImageManifest>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingContainerImages');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/containerImages',
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
   * Archive version immediately.
   *
   * Archive the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public archiveVersion(
    params: CatalogManagementV1.ArchiveVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'archiveVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/archive',
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
   * Sets version to be deprecated in a certain time period.
   *
   * Set or cancel the version to be deprecated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.setting - Set deprecation (true) or cancel deprecation (false).
   * @param {string} [params.description] - Additional information that users can provide to be displayed in deprecation
   * notification.
   * @param {number} [params.daysUntilDeprecate] - Specifies the amount of days until product is not available in
   * catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public setDeprecateVersion(
    params: CatalogManagementV1.SetDeprecateVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'setting'];
    const _validParams = ['versionLocId', 'setting', 'description', 'daysUntilDeprecate', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'description': _params.description,
      'days_until_deprecate': _params.daysUntilDeprecate,
    };

    const path = {
      'version_loc_id': _params.versionLocId,
      'setting': _params.setting,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'setDeprecateVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/deprecate/{setting}',
        method: 'POST',
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

  /**
   * Make version consumable for sharing.
   *
   * Set the version as consumable in order to inherit the offering sharing permissions.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public consumableVersion(
    params: CatalogManagementV1.ConsumableVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'consumableVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/consume-publish',
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
   * Make version prerelease.
   *
   * Set the version as prerelease.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public prereleaseVersion(
    params: CatalogManagementV1.PrereleaseVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'prereleaseVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/prerelease-publish',
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
   * Suspend a version.
   *
   * Limits the visibility of a version by moving a version state from consumable back to validated.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public suspendVersion(
    params: CatalogManagementV1.SuspendVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'suspendVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/suspend',
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
   * Commit version.
   *
   * Commit a working copy of the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public commitVersion(
    params: CatalogManagementV1.CommitVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'commitVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/commit',
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
   * Copy version to new target kind.
   *
   * Copy the specified version to a new target kind within the same offering.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string[]} [params.tags] - Tags array.
   * @param {string} [params.content] - byte array representing the content to be imported.  Only supported for OVA
   * images at this time.
   * @param {string[]} [params.targetKinds] - Target kinds.  Current valid values are 'iks', 'roks', 'vcenter',
   * 'power-iaas', and 'terraform'.
   * @param {string} [params.formatKind] - Format of content being onboarded. Example: vsi-image. Required for virtual
   * server image for VPC.
   * @param {Flavor} [params.flavor] - Version Flavor Information.  Only supported for Product kind Solution.
   * @param {string} [params.workingDirectory] - Optional - The sub-folder within the specified tgz file that contains
   * the software being onboarded.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public copyVersion(
    params: CatalogManagementV1.CopyVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'tags', 'content', 'targetKinds', 'formatKind', 'flavor', 'workingDirectory', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'tags': _params.tags,
      'content': _params.content,
      'target_kinds': _params.targetKinds,
      'format_kind': _params.formatKind,
      'flavor': _params.flavor,
      'working_directory': _params.workingDirectory,
    };

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'copyVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/copy',
        method: 'POST',
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

  /**
   * Create working copy of version.
   *
   * Create a working copy of the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Version>>}
   */
  public getOfferingWorkingCopy(
    params: CatalogManagementV1.GetOfferingWorkingCopyParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Version>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingWorkingCopy');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/workingcopy',
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
   * Copy values from a previous version.
   *
   * Copy values from a specified previous version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.type - The type of data you would like to copy from a previous version. Valid values are
   * 'configuration' or 'licenses'.
   * @param {string} params.versionLocIdToCopyFrom - The version locator id of the version you wish to copy data from.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public copyFromPreviousVersion(
    params: CatalogManagementV1.CopyFromPreviousVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'type', 'versionLocIdToCopyFrom'];
    const _validParams = ['versionLocId', 'type', 'versionLocIdToCopyFrom', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
      'type': _params.type,
      'version_loc_id_to_copy_from': _params.versionLocIdToCopyFrom,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'copyFromPreviousVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/copy/{type}/{version_loc_id_to_copy_from}',
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
   * Get offering/kind/version 'branch'.
   *
   * Get the Offering/Kind/Version 'branch' for the specified locator ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>>}
   */
  public getVersion(
    params: CatalogManagementV1.GetVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Offering>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}',
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
   * Delete version.
   *
   * Delete the specified version.  If the version is an active version with a working copy, the working copy will be
   * deleted as well.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public deleteVersion(
    params: CatalogManagementV1.DeleteVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}',
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
   * Deprecate version immediately - use /archive instead.
   *
   * Deprecate the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public deprecateVersion(
    params: CatalogManagementV1.DeprecateVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    CatalogManagementV1._logger.warn('A deprecated operation has been invoked: deprecateVersion');
    const _params = { ...params };
    const _requiredParams = ['versionLocId'];
    const _validParams = ['versionLocId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deprecateVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/deprecate',
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
   * deploy
   ************************/

  /**
   * Get kubernetes cluster.
   *
   * Get the contents of the specified kubernetes cluster.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.clusterId - ID of the cluster.
   * @param {string} params.region - Region of the cluster.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ClusterInfo>>}
   */
  public getCluster(
    params: CatalogManagementV1.GetClusterParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ClusterInfo>> {
    const _params = { ...params };
    const _requiredParams = ['clusterId', 'region', 'xAuthRefreshToken'];
    const _validParams = ['clusterId', 'region', 'xAuthRefreshToken', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'region': _params.region,
    };

    const path = {
      'cluster_id': _params.clusterId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getCluster');

    const parameters = {
      options: {
        url: '/deploy/kubernetes/clusters/{cluster_id}',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get cluster namespaces.
   *
   * Get the namespaces associated with the specified kubernetes cluster.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.clusterId - ID of the cluster.
   * @param {string} params.region - Cluster region.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {number} [params.limit] - The maximum number of results to return.
   * @param {number} [params.offset] - The number of results to skip before returning values.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.NamespaceSearchResult>>}
   */
  public getNamespaces(
    params: CatalogManagementV1.GetNamespacesParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.NamespaceSearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['clusterId', 'region', 'xAuthRefreshToken'];
    const _validParams = ['clusterId', 'region', 'xAuthRefreshToken', 'limit', 'offset', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'region': _params.region,
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const path = {
      'cluster_id': _params.clusterId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getNamespaces');

    const parameters = {
      options: {
        url: '/deploy/kubernetes/clusters/{cluster_id}/namespaces',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Deploy operators.
   *
   * Deploy operators on a kubernetes cluster.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.clusterId] - Cluster ID.
   * @param {string} [params.region] - Cluster region.
   * @param {string[]} [params.namespaces] - Kube namespaces to deploy Operator(s) to.
   * @param {boolean} [params.allNamespaces] - Denotes whether to install Operator(s) globally.
   * @param {string} [params.versionLocatorId] - A dotted value of `catalogID`.`versionID`.
   * @param {string} [params.channel] - Operator channel.
   * @param {string} [params.installPlan] - Plan.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OperatorDeployResult[]>>}
   */
  public deployOperators(
    params: CatalogManagementV1.DeployOperatorsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OperatorDeployResult[]>> {
    const _params = { ...params };
    const _requiredParams = ['xAuthRefreshToken'];
    const _validParams = ['xAuthRefreshToken', 'clusterId', 'region', 'namespaces', 'allNamespaces', 'versionLocatorId', 'channel', 'installPlan', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'namespaces': _params.namespaces,
      'all_namespaces': _params.allNamespaces,
      'version_locator_id': _params.versionLocatorId,
      'channel': _params.channel,
      'install_plan': _params.installPlan,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deployOperators');

    const parameters = {
      options: {
        url: '/deploy/kubernetes/olm/operator',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List operators.
   *
   * List the operators from a kubernetes cluster.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} params.clusterId - Cluster identification.
   * @param {string} params.region - Cluster region.
   * @param {string} params.versionLocatorId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OperatorDeployResult[]>>}
   */
  public listOperators(
    params: CatalogManagementV1.ListOperatorsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OperatorDeployResult[]>> {
    const _params = { ...params };
    const _requiredParams = ['xAuthRefreshToken', 'clusterId', 'region', 'versionLocatorId'];
    const _validParams = ['xAuthRefreshToken', 'clusterId', 'region', 'versionLocatorId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'version_locator_id': _params.versionLocatorId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listOperators');

    const parameters = {
      options: {
        url: '/deploy/kubernetes/olm/operator',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Update operators.
   *
   * Update the operators on a kubernetes cluster.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.clusterId] - Cluster ID.
   * @param {string} [params.region] - Cluster region.
   * @param {string[]} [params.namespaces] - Kube namespaces to deploy Operator(s) to.
   * @param {boolean} [params.allNamespaces] - Denotes whether to install Operator(s) globally.
   * @param {string} [params.versionLocatorId] - A dotted value of `catalogID`.`versionID`.
   * @param {string} [params.channel] - Operator channel.
   * @param {string} [params.installPlan] - Plan.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OperatorDeployResult[]>>}
   */
  public replaceOperators(
    params: CatalogManagementV1.ReplaceOperatorsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OperatorDeployResult[]>> {
    const _params = { ...params };
    const _requiredParams = ['xAuthRefreshToken'];
    const _validParams = ['xAuthRefreshToken', 'clusterId', 'region', 'namespaces', 'allNamespaces', 'versionLocatorId', 'channel', 'installPlan', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'namespaces': _params.namespaces,
      'all_namespaces': _params.allNamespaces,
      'version_locator_id': _params.versionLocatorId,
      'channel': _params.channel,
      'install_plan': _params.installPlan,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceOperators');

    const parameters = {
      options: {
        url: '/deploy/kubernetes/olm/operator',
        method: 'PUT',
        body,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete operators.
   *
   * Delete operators from a kubernetes cluster.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} params.clusterId - Cluster identification.
   * @param {string} params.region - Cluster region.
   * @param {string} params.versionLocatorId - A dotted value of `catalogID`.`versionID`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public deleteOperators(
    params: CatalogManagementV1.DeleteOperatorsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['xAuthRefreshToken', 'clusterId', 'region', 'versionLocatorId'];
    const _validParams = ['xAuthRefreshToken', 'clusterId', 'region', 'versionLocatorId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'version_locator_id': _params.versionLocatorId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteOperators');

    const parameters = {
      options: {
        url: '/deploy/kubernetes/olm/operator',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Install version.
   *
   * Create an install for the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.clusterId] - Cluster ID.
   * @param {string} [params.region] - Cluster region.
   * @param {string} [params.namespace] - Kube namespace.
   * @param {DeployRequestBodyOverrideValues} [params.overrideValues] - Validation override values. Required for virtual
   * server image for VPC.
   * @param {DeployRequestBodyEnvironmentVariablesItem[]} [params.environmentVariables] - Schematics environment
   * variables to use with this workspace.
   * @param {string} [params.entitlementApikey] - Entitlement API Key for this offering.
   * @param {DeployRequestBodySchematics} [params.schematics] - Schematics workspace configuration.
   * @param {string} [params.script] - Script.
   * @param {string} [params.scriptId] - Script ID.
   * @param {string} [params.versionLocatorId] - A dotted value of `catalogID`.`versionID`.
   * @param {string} [params.vcenterId] - VCenter ID.
   * @param {string} [params.vcenterLocation] - VCenter Location.
   * @param {string} [params.vcenterUser] - VCenter User.
   * @param {string} [params.vcenterPassword] - VCenter Password.
   * @param {string} [params.vcenterDatastore] - VCenter Datastore.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public installVersion(
    params: CatalogManagementV1.InstallVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'xAuthRefreshToken'];
    const _validParams = ['versionLocId', 'xAuthRefreshToken', 'clusterId', 'region', 'namespace', 'overrideValues', 'environmentVariables', 'entitlementApikey', 'schematics', 'script', 'scriptId', 'versionLocatorId', 'vcenterId', 'vcenterLocation', 'vcenterUser', 'vcenterPassword', 'vcenterDatastore', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'namespace': _params.namespace,
      'override_values': _params.overrideValues,
      'environment_variables': _params.environmentVariables,
      'entitlement_apikey': _params.entitlementApikey,
      'schematics': _params.schematics,
      'script': _params.script,
      'script_id': _params.scriptId,
      'version_locator_id': _params.versionLocatorId,
      'vcenter_id': _params.vcenterId,
      'vcenter_location': _params.vcenterLocation,
      'vcenter_user': _params.vcenterUser,
      'vcenter_password': _params.vcenterPassword,
      'vcenter_datastore': _params.vcenterDatastore,
    };

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'installVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/install',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Pre-install version.
   *
   * Create a pre-install for the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.clusterId] - Cluster ID.
   * @param {string} [params.region] - Cluster region.
   * @param {string} [params.namespace] - Kube namespace.
   * @param {DeployRequestBodyOverrideValues} [params.overrideValues] - Validation override values. Required for virtual
   * server image for VPC.
   * @param {DeployRequestBodyEnvironmentVariablesItem[]} [params.environmentVariables] - Schematics environment
   * variables to use with this workspace.
   * @param {string} [params.entitlementApikey] - Entitlement API Key for this offering.
   * @param {DeployRequestBodySchematics} [params.schematics] - Schematics workspace configuration.
   * @param {string} [params.script] - Script.
   * @param {string} [params.scriptId] - Script ID.
   * @param {string} [params.versionLocatorId] - A dotted value of `catalogID`.`versionID`.
   * @param {string} [params.vcenterId] - VCenter ID.
   * @param {string} [params.vcenterLocation] - VCenter Location.
   * @param {string} [params.vcenterUser] - VCenter User.
   * @param {string} [params.vcenterPassword] - VCenter Password.
   * @param {string} [params.vcenterDatastore] - VCenter Datastore.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public preinstallVersion(
    params: CatalogManagementV1.PreinstallVersionParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'xAuthRefreshToken'];
    const _validParams = ['versionLocId', 'xAuthRefreshToken', 'clusterId', 'region', 'namespace', 'overrideValues', 'environmentVariables', 'entitlementApikey', 'schematics', 'script', 'scriptId', 'versionLocatorId', 'vcenterId', 'vcenterLocation', 'vcenterUser', 'vcenterPassword', 'vcenterDatastore', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'namespace': _params.namespace,
      'override_values': _params.overrideValues,
      'environment_variables': _params.environmentVariables,
      'entitlement_apikey': _params.entitlementApikey,
      'schematics': _params.schematics,
      'script': _params.script,
      'script_id': _params.scriptId,
      'version_locator_id': _params.versionLocatorId,
      'vcenter_id': _params.vcenterId,
      'vcenter_location': _params.vcenterLocation,
      'vcenter_user': _params.vcenterUser,
      'vcenter_password': _params.vcenterPassword,
      'vcenter_datastore': _params.vcenterDatastore,
    };

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'preinstallVersion');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/preinstall',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Content-Type': 'application/json',
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get version pre-install status.
   *
   * Get the pre-install status for the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.clusterId] - ID of the cluster.
   * @param {string} [params.region] - Cluster region.
   * @param {string} [params.namespace] - Required if the version's pre-install scope is `namespace`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.InstallStatus>>}
   */
  public getPreinstall(
    params: CatalogManagementV1.GetPreinstallParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.InstallStatus>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'xAuthRefreshToken'];
    const _validParams = ['versionLocId', 'xAuthRefreshToken', 'clusterId', 'region', 'namespace', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'namespace': _params.namespace,
    };

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getPreinstall');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/preinstall',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Validate offering.
   *
   * Validate the offering associated with the specified version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.clusterId] - Cluster ID.
   * @param {string} [params.region] - Cluster region.
   * @param {string} [params.namespace] - Kube namespace.
   * @param {DeployRequestBodyOverrideValues} [params.overrideValues] - Validation override values. Required for virtual
   * server image for VPC.
   * @param {DeployRequestBodyEnvironmentVariablesItem[]} [params.environmentVariables] - Schematics environment
   * variables to use with this workspace.
   * @param {string} [params.entitlementApikey] - Entitlement API Key for this offering.
   * @param {DeployRequestBodySchematics} [params.schematics] - Schematics workspace configuration.
   * @param {string} [params.script] - Script.
   * @param {string} [params.scriptId] - Script ID.
   * @param {string} [params.versionLocatorId] - A dotted value of `catalogID`.`versionID`.
   * @param {string} [params.vcenterId] - VCenter ID.
   * @param {string} [params.vcenterLocation] - VCenter Location.
   * @param {string} [params.vcenterUser] - VCenter User.
   * @param {string} [params.vcenterPassword] - VCenter Password.
   * @param {string} [params.vcenterDatastore] - VCenter Datastore.
   * @param {string} [params.targetContextName] - The name of a target account context on a catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public validateInstall(
    params: CatalogManagementV1.ValidateInstallParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'xAuthRefreshToken'];
    const _validParams = ['versionLocId', 'xAuthRefreshToken', 'clusterId', 'region', 'namespace', 'overrideValues', 'environmentVariables', 'entitlementApikey', 'schematics', 'script', 'scriptId', 'versionLocatorId', 'vcenterId', 'vcenterLocation', 'vcenterUser', 'vcenterPassword', 'vcenterDatastore', 'targetContextName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'cluster_id': _params.clusterId,
      'region': _params.region,
      'namespace': _params.namespace,
      'override_values': _params.overrideValues,
      'environment_variables': _params.environmentVariables,
      'entitlement_apikey': _params.entitlementApikey,
      'schematics': _params.schematics,
      'script': _params.script,
      'script_id': _params.scriptId,
      'version_locator_id': _params.versionLocatorId,
      'vcenter_id': _params.vcenterId,
      'vcenter_location': _params.vcenterLocation,
      'vcenter_user': _params.vcenterUser,
      'vcenter_password': _params.vcenterPassword,
      'vcenter_datastore': _params.vcenterDatastore,
    };

    const query = {
      'targetContextName': _params.targetContextName,
    };

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'validateInstall');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/validation/install',
        method: 'POST',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get offering install status.
   *
   * Returns the install status for the specified offering version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.versionLocId - A dotted value of `catalogID`.`versionID`.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.targetContextName] - The name of a target account context on a catalog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Validation>>}
   */
  public getValidationStatus(
    params: CatalogManagementV1.GetValidationStatusParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Validation>> {
    const _params = { ...params };
    const _requiredParams = ['versionLocId', 'xAuthRefreshToken'];
    const _validParams = ['versionLocId', 'xAuthRefreshToken', 'targetContextName', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'targetContextName': _params.targetContextName,
    };

    const path = {
      'version_loc_id': _params.versionLocId,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getValidationStatus');

    const parameters = {
      options: {
        url: '/versions/{version_loc_id}/validation/install',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * objects
   ************************/

  /**
   * List objects across catalogs.
   *
   * List the available objects from both public and private catalogs. These copies cannot be used for updating. They
   * are not complete and only return what is visible to the caller.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.query - Lucene query string.
   * @param {string} [params.kind] - The kind of the object. It will default to "vpe".
   * @param {number} [params.limit] - The maximum number of results to return.
   * @param {number} [params.offset] - The number of results to skip before returning values.
   * @param {boolean} [params.collapse] - When true, hide private objects that correspond to public or IBM published
   * objects.
   * @param {boolean} [params.digest] - Display a digests of search results, has default value of true.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ObjectSearchResult>>}
   */
  public searchObjects(
    params: CatalogManagementV1.SearchObjectsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ObjectSearchResult>> {
    const _params = { ...params };
    const _requiredParams = ['query'];
    const _validParams = ['query', 'kind', 'limit', 'offset', 'collapse', 'digest', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'query': _params.query,
      'kind': _params.kind,
      'limit': _params.limit,
      'offset': _params.offset,
      'collapse': _params.collapse,
      'digest': _params.digest,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'searchObjects');

    const parameters = {
      options: {
        url: '/objects',
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
   * List objects within a catalog.
   *
   * List the available objects within the specified catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {number} [params.limit] - The number of results to return.
   * @param {number} [params.offset] - The number of results to skip before returning values.
   * @param {string} [params.name] - Only return results that contain the specified string.
   * @param {string} [params.sort] - The field on which the output is sorted. Sorts by default by **label** property.
   * Available fields are **name**, **label**, **created**, and **updated**. By adding **-** (i.e. **-label**) in front
   * of the query string, you can specify descending order. Default is ascending order.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ObjectListResult>>}
   */
  public listObjects(
    params: CatalogManagementV1.ListObjectsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ObjectListResult>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'limit', 'offset', 'name', 'sort', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
      'name': _params.name,
      'sort': _params.sort,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listObjects');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects',
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
   * Create catalog object.
   *
   * Create an object with a specific catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} [params.name] - The programmatic name of this object.
   * @param {string} [params.crn] - The crn for this specific object.
   * @param {string} [params.url] - The url for this specific object.
   * @param {string} [params.parentId] - The parent for this specific object.
   * @param {JsonObject} [params.labelI18n] - A map of translated strings, by language code.
   * @param {string} [params.label] - Display name in the requested language.
   * @param {string[]} [params.tags] - List of tags associated with this catalog.
   * @param {string} [params.created] - The date and time this catalog was created.
   * @param {string} [params.updated] - The date and time this catalog was last updated.
   * @param {string} [params.shortDescription] - Short description in the requested language.
   * @param {JsonObject} [params.shortDescriptionI18n] - A map of translated strings, by language code.
   * @param {string} [params.kind] - Kind of object.
   * @param {PublishObject} [params.publish] - Publish information.
   * @param {State} [params.state] - Offering state.
   * @param {string} [params.catalogId] - The id of the catalog containing this offering.
   * @param {string} [params.catalogName] - The name of the catalog.
   * @param {JsonObject} [params.data] - Map of data values for this object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogObject>>}
   */
  public createObject(
    params: CatalogManagementV1.CreateObjectParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier'];
    const _validParams = ['catalogIdentifier', 'name', 'crn', 'url', 'parentId', 'labelI18n', 'label', 'tags', 'created', 'updated', 'shortDescription', 'shortDescriptionI18n', 'kind', 'publish', 'state', 'catalogId', 'catalogName', 'data', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'name': _params.name,
      'crn': _params.crn,
      'url': _params.url,
      'parent_id': _params.parentId,
      'label_i18n': _params.labelI18n,
      'label': _params.label,
      'tags': _params.tags,
      'created': _params.created,
      'updated': _params.updated,
      'short_description': _params.shortDescription,
      'short_description_i18n': _params.shortDescriptionI18n,
      'kind': _params.kind,
      'publish': _params.publish,
      'state': _params.state,
      'catalog_id': _params.catalogId,
      'catalog_name': _params.catalogName,
      'data': _params.data,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'createObject');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects',
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
   * Get catalog object.
   *
   * Get the specified object from within the specified catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogObject>>}
   */
  public getObject(
    params: CatalogManagementV1.GetObjectParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getObject');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}',
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
   * Update catalog object.
   *
   * Update an object within a specific catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string} [params.id] - unique id.
   * @param {string} [params.rev] - Cloudant revision.
   * @param {string} [params.name] - The programmatic name of this object.
   * @param {string} [params.crn] - The crn for this specific object.
   * @param {string} [params.url] - The url for this specific object.
   * @param {string} [params.parentId] - The parent for this specific object.
   * @param {JsonObject} [params.labelI18n] - A map of translated strings, by language code.
   * @param {string} [params.label] - Display name in the requested language.
   * @param {string[]} [params.tags] - List of tags associated with this catalog.
   * @param {string} [params.created] - The date and time this catalog was created.
   * @param {string} [params.updated] - The date and time this catalog was last updated.
   * @param {string} [params.shortDescription] - Short description in the requested language.
   * @param {JsonObject} [params.shortDescriptionI18n] - A map of translated strings, by language code.
   * @param {string} [params.kind] - Kind of object.
   * @param {PublishObject} [params.publish] - Publish information.
   * @param {State} [params.state] - Offering state.
   * @param {string} [params.catalogId] - The id of the catalog containing this offering.
   * @param {string} [params.catalogName] - The name of the catalog.
   * @param {JsonObject} [params.data] - Map of data values for this object.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogObject>>}
   */
  public replaceObject(
    params: CatalogManagementV1.ReplaceObjectParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.CatalogObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'id', 'rev', 'name', 'crn', 'url', 'parentId', 'labelI18n', 'label', 'tags', 'created', 'updated', 'shortDescription', 'shortDescriptionI18n', 'kind', 'publish', 'state', 'catalogId', 'catalogName', 'data', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      '_rev': _params.rev,
      'name': _params.name,
      'crn': _params.crn,
      'url': _params.url,
      'parent_id': _params.parentId,
      'label_i18n': _params.labelI18n,
      'label': _params.label,
      'tags': _params.tags,
      'created': _params.created,
      'updated': _params.updated,
      'short_description': _params.shortDescription,
      'short_description_i18n': _params.shortDescriptionI18n,
      'kind': _params.kind,
      'publish': _params.publish,
      'state': _params.state,
      'catalog_id': _params.catalogId,
      'catalog_name': _params.catalogName,
      'data': _params.data,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'replaceObject');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}',
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
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete catalog object.
   *
   * Delete a specific object within a specific catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public deleteObject(
    params: CatalogManagementV1.DeleteObjectParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteObject');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}',
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
   * Get object audit logs.
   *
   * Get the audit logs associated with an object.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>>}
   */
  public listObjectAudits(
    params: CatalogManagementV1.ListObjectAuditsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'start', 'limit', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listObjectAudits');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/audits',
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
   * Get an object audit log entry.
   *
   * Get the full audit log entry associated with an object.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string} params.auditlogIdentifier - Auditlog ID.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>>}
   */
  public getObjectAudit(
    params: CatalogManagementV1.GetObjectAuditParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier', 'auditlogIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'auditlogIdentifier', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
      'auditlog_identifier': _params.auditlogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getObjectAudit');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/audits/{auditlog_identifier}',
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
   * Make object consumable for sharing.
   *
   * Set the object as consumable in order to use the object sharing permissions.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public consumableShareObject(
    params: CatalogManagementV1.ConsumableShareObjectParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'consumableShareObject');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/consume-publish',
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
   * Allows object to be shared.
   *
   * Set the share options on an object.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {boolean} [params.ibm] - Visible to IBM employees.
   * @param {boolean} [params._public] - Visible to everyone in the public catalog.
   * @param {boolean} [params.enabled] - Visible to access list.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareSetting>>}
   */
  public shareObject(
    params: CatalogManagementV1.ShareObjectParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ShareSetting>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'ibm', '_public', 'enabled', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'ibm': _params.ibm,
      'public': _params._public,
      'enabled': _params.enabled,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'shareObject');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/share',
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
   * Get object access list.
   *
   * Get the access list associated with the specified object.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListResult>>}
   */
  public getObjectAccessList(
    params: CatalogManagementV1.GetObjectAccessListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListResult>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'start', 'limit', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getObjectAccessList');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/accessv1',
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
   * Check for account ID in object access list.
   *
   * Determine if an account ID is in an object's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string} params.accessIdentifier - Identifier for access. Use 'accountId' or '-acct-accountId' for an
   * account, '-ent-enterpriseid' for an enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.Access>>}
   */
  public getObjectAccess(
    params: CatalogManagementV1.GetObjectAccessParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.Access>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier', 'accessIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'accessIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
      'access_identifier': _params.accessIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getObjectAccess');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{access_identifier}',
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
   * Add account ID to object access list.
   *
   * Add an account ID to an object's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string} params.accessIdentifier - Identifier for access. Use 'accountId' or '-acct-accountId' for an
   * account, '-ent-enterpriseid' for an enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public createObjectAccess(
    params: CatalogManagementV1.CreateObjectAccessParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    CatalogManagementV1._logger.warn('A deprecated operation has been invoked: createObjectAccess');
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier', 'accessIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'accessIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
      'access_identifier': _params.accessIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'createObjectAccess');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{access_identifier}',
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
   * Remove account ID from object access list.
   *
   * Delete the specified account ID from the specified object's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string} params.accessIdentifier - Identifier for access. Use 'accountId' or '-acct-accountId' for an
   * account, '-ent-enterpriseid' for an enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public deleteObjectAccess(
    params: CatalogManagementV1.DeleteObjectAccessParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    CatalogManagementV1._logger.warn('A deprecated operation has been invoked: deleteObjectAccess');
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier', 'accessIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'accessIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
      'access_identifier': _params.accessIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteObjectAccess');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{access_identifier}',
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
   * Get object access list.
   *
   * Deprecated - use /accessv1 instead.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {number} [params.limit] - The maximum number of results to return.
   * @param {number} [params.offset] - The number of results to skip before returning values.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.ObjectAccessListResult>>}
   * @deprecated this method is deprecated and may be removed in a future release
   */
  public getObjectAccessListDeprecated(
    params: CatalogManagementV1.GetObjectAccessListDeprecatedParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.ObjectAccessListResult>> {
    CatalogManagementV1._logger.warn('A deprecated operation has been invoked: getObjectAccessListDeprecated');
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'limit', 'offset', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'limit': _params.limit,
      'offset': _params.offset,
    };

    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getObjectAccessListDeprecated');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/access',
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
   * Delete accesses from object access list.
   *
   * Delete all or a set of accesses from an object's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string[]} params.accesses - A list of accesses to delete.  An entry with star["*"] will remove all
   * accesses.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>>}
   */
  public deleteObjectAccessList(
    params: CatalogManagementV1.DeleteObjectAccessListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier', 'accesses'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'accesses', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.accesses;
    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteObjectAccessList');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/access',
        method: 'DELETE',
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
   * Add accesses to object access list.
   *
   * Add one or more accesses to the specified object's access list.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.catalogIdentifier - Catalog identifier.
   * @param {string} params.objectIdentifier - Object identifier.
   * @param {string[]} params.accesses - A list of accesses to add.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>>}
   */
  public addObjectAccessList(
    params: CatalogManagementV1.AddObjectAccessListParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AccessListBulkResponse>> {
    const _params = { ...params };
    const _requiredParams = ['catalogIdentifier', 'objectIdentifier', 'accesses'];
    const _validParams = ['catalogIdentifier', 'objectIdentifier', 'accesses', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = _params.accesses;
    const path = {
      'catalog_identifier': _params.catalogIdentifier,
      'object_identifier': _params.objectIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'addObjectAccessList');

    const parameters = {
      options: {
        url: '/catalogs/{catalog_identifier}/objects/{object_identifier}/access',
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
  /*************************
   * instances
   ************************/

  /**
   * Create an offering resource instance.
   *
   * Provision a new offering in a given account, and return its resource instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.id] - provisioned instance ID (part of the CRN).
   * @param {string} [params.rev] - Cloudant revision.
   * @param {string} [params.url] - url reference to this object.
   * @param {string} [params.crn] - platform CRN for this instance.
   * @param {string} [params.label] - the label for this instance.
   * @param {string} [params.catalogId] - Catalog ID this instance was created from.
   * @param {string} [params.offeringId] - Offering ID this instance was created from.
   * @param {string} [params.kindFormat] - the format this instance has (helm, operator, ova...).
   * @param {string} [params.version] - The version this instance was installed from (semver - not version id).
   * @param {string} [params.versionId] - The version id this instance was installed from (version id - not semver).
   * @param {string} [params.clusterId] - Cluster ID.
   * @param {string} [params.clusterRegion] - Cluster region (e.g., us-south).
   * @param {string[]} [params.clusterNamespaces] - List of target namespaces to install into.
   * @param {boolean} [params.clusterAllNamespaces] - designate to install into all namespaces.
   * @param {string} [params.schematicsWorkspaceId] - Id of the schematics workspace, for offering instances provisioned
   * through schematics.
   * @param {string} [params.installPlan] - Type of install plan (also known as approval strategy) for operator
   * subscriptions. Can be either automatic, which automatically upgrades operators to the latest in a channel, or
   * manual, which requires approval on the cluster.
   * @param {string} [params.channel] - Channel to pin the operator subscription to.
   * @param {string} [params.created] - date and time create.
   * @param {string} [params.updated] - date and time updated.
   * @param {JsonObject} [params.metadata] - Map of metadata values for this offering instance.
   * @param {string} [params.resourceGroupId] - Id of the resource group to provision the offering instance into.
   * @param {string} [params.location] - String location of OfferingInstance deployment.
   * @param {boolean} [params.disabled] - Indicates if Resource Controller has disabled this instance.
   * @param {string} [params.account] - The account this instance is owned by.
   * @param {OfferingInstanceLastOperation} [params.lastOperation] - the last operation performed and status.
   * @param {string} [params.kindTarget] - The target kind for the installed software version.
   * @param {string} [params.sha] - The digest value of the installed software version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingInstance>>}
   */
  public createOfferingInstance(
    params: CatalogManagementV1.CreateOfferingInstanceParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingInstance>> {
    const _params = { ...params };
    const _requiredParams = ['xAuthRefreshToken'];
    const _validParams = ['xAuthRefreshToken', 'id', 'rev', 'url', 'crn', 'label', 'catalogId', 'offeringId', 'kindFormat', 'version', 'versionId', 'clusterId', 'clusterRegion', 'clusterNamespaces', 'clusterAllNamespaces', 'schematicsWorkspaceId', 'installPlan', 'channel', 'created', 'updated', 'metadata', 'resourceGroupId', 'location', 'disabled', 'account', 'lastOperation', 'kindTarget', 'sha', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      '_rev': _params.rev,
      'url': _params.url,
      'crn': _params.crn,
      'label': _params.label,
      'catalog_id': _params.catalogId,
      'offering_id': _params.offeringId,
      'kind_format': _params.kindFormat,
      'version': _params.version,
      'version_id': _params.versionId,
      'cluster_id': _params.clusterId,
      'cluster_region': _params.clusterRegion,
      'cluster_namespaces': _params.clusterNamespaces,
      'cluster_all_namespaces': _params.clusterAllNamespaces,
      'schematics_workspace_id': _params.schematicsWorkspaceId,
      'install_plan': _params.installPlan,
      'channel': _params.channel,
      'created': _params.created,
      'updated': _params.updated,
      'metadata': _params.metadata,
      'resource_group_id': _params.resourceGroupId,
      'location': _params.location,
      'disabled': _params.disabled,
      'account': _params.account,
      'last_operation': _params.lastOperation,
      'kind_target': _params.kindTarget,
      'sha': _params.sha,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'createOfferingInstance');

    const parameters = {
      options: {
        url: '/instances/offerings',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get Offering Instance.
   *
   * Get the resource associated with an installed offering instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceIdentifier - Version Instance identifier.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingInstance>>}
   */
  public getOfferingInstance(
    params: CatalogManagementV1.GetOfferingInstanceParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingInstance>> {
    const _params = { ...params };
    const _requiredParams = ['instanceIdentifier'];
    const _validParams = ['instanceIdentifier', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_identifier': _params.instanceIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingInstance');

    const parameters = {
      options: {
        url: '/instances/offerings/{instance_identifier}',
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
   * Update Offering Instance.
   *
   * Update an installed offering instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceIdentifier - Version Instance identifier.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {string} [params.id] - provisioned instance ID (part of the CRN).
   * @param {string} [params.rev] - Cloudant revision.
   * @param {string} [params.url] - url reference to this object.
   * @param {string} [params.crn] - platform CRN for this instance.
   * @param {string} [params.label] - the label for this instance.
   * @param {string} [params.catalogId] - Catalog ID this instance was created from.
   * @param {string} [params.offeringId] - Offering ID this instance was created from.
   * @param {string} [params.kindFormat] - the format this instance has (helm, operator, ova...).
   * @param {string} [params.version] - The version this instance was installed from (semver - not version id).
   * @param {string} [params.versionId] - The version id this instance was installed from (version id - not semver).
   * @param {string} [params.clusterId] - Cluster ID.
   * @param {string} [params.clusterRegion] - Cluster region (e.g., us-south).
   * @param {string[]} [params.clusterNamespaces] - List of target namespaces to install into.
   * @param {boolean} [params.clusterAllNamespaces] - designate to install into all namespaces.
   * @param {string} [params.schematicsWorkspaceId] - Id of the schematics workspace, for offering instances provisioned
   * through schematics.
   * @param {string} [params.installPlan] - Type of install plan (also known as approval strategy) for operator
   * subscriptions. Can be either automatic, which automatically upgrades operators to the latest in a channel, or
   * manual, which requires approval on the cluster.
   * @param {string} [params.channel] - Channel to pin the operator subscription to.
   * @param {string} [params.created] - date and time create.
   * @param {string} [params.updated] - date and time updated.
   * @param {JsonObject} [params.metadata] - Map of metadata values for this offering instance.
   * @param {string} [params.resourceGroupId] - Id of the resource group to provision the offering instance into.
   * @param {string} [params.location] - String location of OfferingInstance deployment.
   * @param {boolean} [params.disabled] - Indicates if Resource Controller has disabled this instance.
   * @param {string} [params.account] - The account this instance is owned by.
   * @param {OfferingInstanceLastOperation} [params.lastOperation] - the last operation performed and status.
   * @param {string} [params.kindTarget] - The target kind for the installed software version.
   * @param {string} [params.sha] - The digest value of the installed software version.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingInstance>>}
   */
  public putOfferingInstance(
    params: CatalogManagementV1.PutOfferingInstanceParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.OfferingInstance>> {
    const _params = { ...params };
    const _requiredParams = ['instanceIdentifier', 'xAuthRefreshToken'];
    const _validParams = ['instanceIdentifier', 'xAuthRefreshToken', 'id', 'rev', 'url', 'crn', 'label', 'catalogId', 'offeringId', 'kindFormat', 'version', 'versionId', 'clusterId', 'clusterRegion', 'clusterNamespaces', 'clusterAllNamespaces', 'schematicsWorkspaceId', 'installPlan', 'channel', 'created', 'updated', 'metadata', 'resourceGroupId', 'location', 'disabled', 'account', 'lastOperation', 'kindTarget', 'sha', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'id': _params.id,
      '_rev': _params.rev,
      'url': _params.url,
      'crn': _params.crn,
      'label': _params.label,
      'catalog_id': _params.catalogId,
      'offering_id': _params.offeringId,
      'kind_format': _params.kindFormat,
      'version': _params.version,
      'version_id': _params.versionId,
      'cluster_id': _params.clusterId,
      'cluster_region': _params.clusterRegion,
      'cluster_namespaces': _params.clusterNamespaces,
      'cluster_all_namespaces': _params.clusterAllNamespaces,
      'schematics_workspace_id': _params.schematicsWorkspaceId,
      'install_plan': _params.installPlan,
      'channel': _params.channel,
      'created': _params.created,
      'updated': _params.updated,
      'metadata': _params.metadata,
      'resource_group_id': _params.resourceGroupId,
      'location': _params.location,
      'disabled': _params.disabled,
      'account': _params.account,
      'last_operation': _params.lastOperation,
      'kind_target': _params.kindTarget,
      'sha': _params.sha,
    };

    const path = {
      'instance_identifier': _params.instanceIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'putOfferingInstance');

    const parameters = {
      options: {
        url: '/instances/offerings/{instance_identifier}',
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
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a version instance.
   *
   * Delete and instance deployed out of a product version.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceIdentifier - Version Instance identifier.
   * @param {string} params.xAuthRefreshToken - IAM Refresh token.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>>}
   */
  public deleteOfferingInstance(
    params: CatalogManagementV1.DeleteOfferingInstanceParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['instanceIdentifier', 'xAuthRefreshToken'];
    const _validParams = ['instanceIdentifier', 'xAuthRefreshToken', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'instance_identifier': _params.instanceIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'deleteOfferingInstance');

    const parameters = {
      options: {
        url: '/instances/offerings/{instance_identifier}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Auth-Refresh-Token': _params.xAuthRefreshToken,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get offering instance audit logs.
   *
   * Get the audit logs associated with an offering instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceIdentifier - Version Instance identifier.
   * @param {string} [params.start] - Start token for a query.
   * @param {number} [params.limit] - number or results to return in the query.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>>}
   */
  public listOfferingInstanceAudits(
    params: CatalogManagementV1.ListOfferingInstanceAuditsParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLogs>> {
    const _params = { ...params };
    const _requiredParams = ['instanceIdentifier'];
    const _validParams = ['instanceIdentifier', 'start', 'limit', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'start': _params.start,
      'limit': _params.limit,
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'instance_identifier': _params.instanceIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'listOfferingInstanceAudits');

    const parameters = {
      options: {
        url: '/instances/offerings/{instance_identifier}/audits',
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
   * Get an offering instance audit log entry.
   *
   * Get the full audit log entry associated with an offering instance.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceIdentifier - Version Instance identifier.
   * @param {string} params.auditlogIdentifier - Auditlog ID.
   * @param {boolean} [params.lookupnames] - Auditlog Lookup Names - by default names are not returned in auditlog.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>>}
   */
  public getOfferingInstanceAudit(
    params: CatalogManagementV1.GetOfferingInstanceAuditParams
  ): Promise<CatalogManagementV1.Response<CatalogManagementV1.AuditLog>> {
    const _params = { ...params };
    const _requiredParams = ['instanceIdentifier', 'auditlogIdentifier'];
    const _validParams = ['instanceIdentifier', 'auditlogIdentifier', 'lookupnames', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'lookupnames': _params.lookupnames,
    };

    const path = {
      'instance_identifier': _params.instanceIdentifier,
      'auditlog_identifier': _params.auditlogIdentifier,
    };

    const sdkHeaders = getSdkHeaders(CatalogManagementV1.DEFAULT_SERVICE_NAME, 'v1', 'getOfferingInstanceAudit');

    const parameters = {
      options: {
        url: '/instances/offerings/{instance_identifier}/audits/{auditlog_identifier}',
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
}

/*************************
 * interfaces
 ************************/

namespace CatalogManagementV1 {
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

  /** Parameters for the `getCatalogAccount` operation. */
  export interface GetCatalogAccountParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateCatalogAccount` operation. */
  export interface UpdateCatalogAccountParams {
    /** Account identification. */
    id?: string;
    /** Cloudant revision. */
    rev?: string;
    /** Hide the public catalog in this account. */
    hideIbmCloudCatalog?: boolean;
    /** Filters for account and catalog filters. */
    accountFilters?: Filters;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCatalogAccountAudits` operation. */
  export interface ListCatalogAccountAuditsParams {
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCatalogAccountAudit` operation. */
  export interface GetCatalogAccountAuditParams {
    /** Auditlog ID. */
    auditlogIdentifier: string;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCatalogAccountFilters` operation. */
  export interface GetCatalogAccountFiltersParams {
    /** catalog id. Narrow down filters to the account and just the one catalog. */
    catalog?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getShareApprovalList` operation. */
  export interface GetShareApprovalListParams {
    /** The type for the object. */
    objectType: GetShareApprovalListConstants.ObjectType | string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getShareApprovalList` operation. */
  export namespace GetShareApprovalListConstants {
    /** The type for the object. */
    export enum ObjectType {
      OFFERING = 'offering',
      VPE = 'vpe',
      PROXY_SOURCE = 'proxy_source',
      PRESET_CONFIGURATION = 'preset_configuration',
    }
  }

  /** Parameters for the `deleteShareApprovalList` operation. */
  export interface DeleteShareApprovalListParams {
    /** The type for the object. */
    objectType: DeleteShareApprovalListConstants.ObjectType | string;
    /** A list of accesses to delete.  An entry with star["*"] will remove all accesses. */
    accesses: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deleteShareApprovalList` operation. */
  export namespace DeleteShareApprovalListConstants {
    /** The type for the object. */
    export enum ObjectType {
      OFFERING = 'offering',
      VPE = 'vpe',
      PROXY_SOURCE = 'proxy_source',
      PRESET_CONFIGURATION = 'preset_configuration',
    }
  }

  /** Parameters for the `addShareApprovalList` operation. */
  export interface AddShareApprovalListParams {
    /** The type for the object. */
    objectType: AddShareApprovalListConstants.ObjectType | string;
    /** A list of accesses to add. */
    accesses: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `addShareApprovalList` operation. */
  export namespace AddShareApprovalListConstants {
    /** The type for the object. */
    export enum ObjectType {
      OFFERING = 'offering',
      VPE = 'vpe',
      PROXY_SOURCE = 'proxy_source',
      PRESET_CONFIGURATION = 'preset_configuration',
    }
  }

  /** Parameters for the `getShareApprovalListAsSource` operation. */
  export interface GetShareApprovalListAsSourceParams {
    /** The type for the object. */
    objectType: GetShareApprovalListAsSourceConstants.ObjectType | string;
    /** The different possible approval states for share requests or access request. */
    approvalStateIdentifier: GetShareApprovalListAsSourceConstants.ApprovalStateIdentifier | string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    /** Execute the request in the context of an enterprise or enterpise account group ID. Use '-ent-enterpriseid'
     *  for an enterprise and '-entgrp-enterprisegroupid for an enterprise group.
     */
    enterpriseId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getShareApprovalListAsSource` operation. */
  export namespace GetShareApprovalListAsSourceConstants {
    /** The type for the object. */
    export enum ObjectType {
      OFFERING = 'offering',
      VPE = 'vpe',
      PROXY_SOURCE = 'proxy_source',
      PRESET_CONFIGURATION = 'preset_configuration',
    }
    /** The different possible approval states for share requests or access request. */
    export enum ApprovalStateIdentifier {
      APPROVED = 'approved',
      PENDING = 'pending',
      REJECTED = 'rejected',
    }
  }

  /** Parameters for the `updateShareApprovalListAsSource` operation. */
  export interface UpdateShareApprovalListAsSourceParams {
    /** The type for the object. */
    objectType: UpdateShareApprovalListAsSourceConstants.ObjectType | string;
    /** The different possible approval states for share requests or access request. */
    approvalStateIdentifier: UpdateShareApprovalListAsSourceConstants.ApprovalStateIdentifier | string;
    /** A list of accesses to update to the specified approval state. */
    accesses: string[];
    /** Execute the request in the context of an enterprise or enterpise account group ID. Use '-ent-enterpriseid'
     *  for an enterprise and '-entgrp-enterprisegroupid for an enterprise group.
     */
    enterpriseId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `updateShareApprovalListAsSource` operation. */
  export namespace UpdateShareApprovalListAsSourceConstants {
    /** The type for the object. */
    export enum ObjectType {
      OFFERING = 'offering',
      VPE = 'vpe',
      PROXY_SOURCE = 'proxy_source',
      PRESET_CONFIGURATION = 'preset_configuration',
    }
    /** The different possible approval states for share requests or access request. */
    export enum ApprovalStateIdentifier {
      APPROVED = 'approved',
      PENDING = 'pending',
      REJECTED = 'rejected',
    }
  }

  /** Parameters for the `listCatalogs` operation. */
  export interface ListCatalogsParams {
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createCatalog` operation. */
  export interface CreateCatalogParams {
    /** Display Name in the requested language. */
    label?: string;
    /** A map of translated strings, by language code. */
    labelI18n?: JsonObject;
    /** Description in the requested language. */
    shortDescription?: string;
    /** A map of translated strings, by language code. */
    shortDescriptionI18n?: JsonObject;
    /** URL for an icon associated with this catalog. */
    catalogIconUrl?: string;
    /** URL for a banner image for this catalog. */
    catalogBannerUrl?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** List of features associated with this catalog. */
    features?: Feature[];
    /** Denotes whether a catalog is disabled. */
    disabled?: boolean;
    /** Resource group id the catalog is owned by. */
    resourceGroupId?: string;
    /** Account that owns catalog. */
    owningAccount?: string;
    /** Filters for account and catalog filters. */
    catalogFilters?: Filters;
    /** Feature information. */
    syndicationSettings?: SyndicationResource;
    /** Kind of catalog. Supported kinds are offering and vpe. */
    kind?: string;
    /** Catalog specific metadata. */
    metadata?: JsonObject;
    /** List of target accounts contexts on this catalog. */
    targetAccountContexts?: TargetAccountContext[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCatalog` operation. */
  export interface GetCatalogParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceCatalog` operation. */
  export interface ReplaceCatalogParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Unique ID. */
    id?: string;
    /** Cloudant revision. */
    rev?: string;
    /** Display Name in the requested language. */
    label?: string;
    /** A map of translated strings, by language code. */
    labelI18n?: JsonObject;
    /** Description in the requested language. */
    shortDescription?: string;
    /** A map of translated strings, by language code. */
    shortDescriptionI18n?: JsonObject;
    /** URL for an icon associated with this catalog. */
    catalogIconUrl?: string;
    /** URL for a banner image for this catalog. */
    catalogBannerUrl?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** List of features associated with this catalog. */
    features?: Feature[];
    /** Denotes whether a catalog is disabled. */
    disabled?: boolean;
    /** Resource group id the catalog is owned by. */
    resourceGroupId?: string;
    /** Account that owns catalog. */
    owningAccount?: string;
    /** Filters for account and catalog filters. */
    catalogFilters?: Filters;
    /** Feature information. */
    syndicationSettings?: SyndicationResource;
    /** Kind of catalog. Supported kinds are offering and vpe. */
    kind?: string;
    /** Catalog specific metadata. */
    metadata?: JsonObject;
    /** List of target accounts contexts on this catalog. */
    targetAccountContexts?: TargetAccountContext[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteCatalog` operation. */
  export interface DeleteCatalogParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listCatalogAudits` operation. */
  export interface ListCatalogAuditsParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCatalogAudit` operation. */
  export interface GetCatalogAuditParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Auditlog ID. */
    auditlogIdentifier: string;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listEnterpriseAudits` operation. */
  export interface ListEnterpriseAuditsParams {
    /** Enterprise ID. */
    enterpriseIdentifier: string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getEnterpriseAudit` operation. */
  export interface GetEnterpriseAuditParams {
    /** Enterprise ID. */
    enterpriseIdentifier: string;
    /** Auditlog ID. */
    auditlogIdentifier: string;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getConsumptionOfferings` operation. */
  export interface GetConsumptionOfferingsParams {
    /** true - Strip down the content of what is returned. For example don't return the readme. Makes the result
     *  much smaller. Defaults to false.
     */
    digest?: boolean;
    /** catalog id. Narrow search down to just a particular catalog. It will apply the catalog's public filters to
     *  the public catalog offerings on the result.
     */
    catalog?: string;
    /** What should be selected. Default is 'all' which will return both public and private offerings. 'public'
     *  returns only the public offerings and 'private' returns only the private offerings.
     */
    select?: GetConsumptionOfferingsConstants.Select | string;
    /** true - include offerings which have been marked as hidden. The default is false and hidden offerings are not
     *  returned.
     */
    includeHidden?: boolean;
    /** number or results to return. */
    limit?: number;
    /** number of results to skip before returning values. */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getConsumptionOfferings` operation. */
  export namespace GetConsumptionOfferingsConstants {
    /** What should be selected. Default is 'all' which will return both public and private offerings. 'public' returns only the public offerings and 'private' returns only the private offerings. */
    export enum Select {
      ALL = 'all',
      PUBLIC = 'public',
      PRIVATE = 'private',
    }
  }

  /** Parameters for the `listOfferings` operation. */
  export interface ListOfferingsParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** true - Strip down the content of what is returned. For example don't return the readme. Makes the result
     *  much smaller. Defaults to false.
     */
    digest?: boolean;
    /** The maximum number of results to return. */
    limit?: number;
    /** The number of results to skip before returning values. */
    offset?: number;
    /** Only return results that contain the specified string. */
    name?: string;
    /** The field on which the output is sorted. Sorts by default by **label** property. Available fields are
     *  **name**, **label**, **created**, and **updated**. By adding **-** (i.e. **-label**) in front of the query
     *  string, you can specify descending order. Default is ascending order.
     */
    sort?: string;
    /** true - include offerings which have been marked as hidden. The default is true. To not return hidden
     *  offerings false must be explicitly set.
     */
    includeHidden?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createOffering` operation. */
  export interface CreateOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** The url for this specific offering. */
    url?: string;
    /** The crn for this specific offering. */
    crn?: string;
    /** Display Name in the requested language. */
    label?: string;
    /** A map of translated strings, by language code. */
    labelI18n?: JsonObject;
    /** The programmatic name of this offering. */
    name?: string;
    /** URL for an icon associated with this offering. */
    offeringIconUrl?: string;
    /** URL for an additional docs with this offering. */
    offeringDocsUrl?: string;
    /** [deprecated] - Use offering.support instead.  URL to be displayed in the Consumption UI for getting support
     *  on this offering.
     */
    offeringSupportUrl?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** List of keywords associated with offering, typically used to search for it. */
    keywords?: string[];
    /** Repository info for offerings. */
    rating?: Rating;
    /** The date and time this catalog was created. */
    created?: string;
    /** The date and time this catalog was last updated. */
    updated?: string;
    /** Short description in the requested language. */
    shortDescription?: string;
    /** A map of translated strings, by language code. */
    shortDescriptionI18n?: JsonObject;
    /** Long description in the requested language. */
    longDescription?: string;
    /** A map of translated strings, by language code. */
    longDescriptionI18n?: JsonObject;
    /** list of features associated with this offering. */
    features?: Feature[];
    /** Array of kind. */
    kinds?: Kind[];
    /** Publish information. */
    publish?: PublishObject;
    /** Offering is managed by Partner Center. */
    pcManaged?: boolean;
    /** Offering has been approved to publish to permitted to IBM or Public Catalog. */
    publishApproved?: boolean;
    /** Denotes public availability of an Offering. */
    shareWithAll?: boolean;
    /** Denotes IBM employee availability of an Offering - if share_enabled is true. */
    shareWithIbm?: boolean;
    /** Denotes sharing including access list availability of an Offering is enabled. */
    shareEnabled?: boolean;
    /** Deprecated: Is it permitted to request publishing to IBM or Public. */
    permitRequestIbmPublicPublish?: boolean;
    /** Deprecated: Indicates if this offering has been approved for use by all IBMers. */
    ibmPublishApproved?: boolean;
    /** Deprecated: Indicates if this offering has been approved for use by all IBM Cloud users. */
    publicPublishApproved?: boolean;
    /** The original offering CRN that this publish entry came from. */
    publicOriginalCrn?: string;
    /** The crn of the public catalog entry of this offering. */
    publishPublicCrn?: string;
    /** The portal's approval record ID. */
    portalApprovalRecord?: string;
    /** The portal UI URL. */
    portalUiUrl?: string;
    /** The id of the catalog containing this offering. */
    catalogId?: string;
    /** The name of the catalog. */
    catalogName?: string;
    /** Map of metadata values for this offering. */
    metadata?: JsonObject;
    /** A disclaimer for this offering. */
    disclaimer?: string;
    /** Determine if this offering should be displayed in the Consumption UI. */
    hidden?: boolean;
    /** Deprecated: Deprecated - Provider of this offering. */
    provider?: string;
    /** Information on the provider for this offering, or omitted if no provider information is given. */
    providerInfo?: ProviderInfo;
    /** Repository info for offerings. */
    repoInfo?: RepoInfo;
    /** Image pull keys for this offering. */
    imagePullKeys?: ImagePullKey[];
    /** Offering Support information. */
    support?: Support;
    /** A list of media items related to this offering. */
    media?: MediaItem[];
    /** Deprecation information for an Offering. */
    deprecatePending?: DeprecatePending;
    /** The product kind.  Valid values are module, solution, or empty string. */
    productKind?: string;
    /** A list of badges for this offering. */
    badges?: Badge[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `importOfferingVersion` operation. */
  export interface ImportOfferingVersionParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Tags array. */
    tags?: string[];
    /** Byte array representing the content to be imported. Only supported for OVA images at this time. */
    content?: string;
    /** Name of version. Required for virtual server image for VPC. */
    name?: string;
    /** Display name of version. Required for virtual server image for VPC. */
    label?: string;
    /** Install type. Example: instance. Required for virtual server image for VPC. */
    installKind?: string;
    /** Deployment target of the content being onboarded. Current valid values are iks, roks, vcenter, power-iaas,
     *  terraform, and vpc-x86. Required for virtual server image for VPC.
     */
    targetKinds?: string[];
    /** Format of content being onboarded. Example: vsi-image. Required for virtual server image for VPC. */
    formatKind?: string;
    /** Optional product kind for the software being onboarded.  Valid values are software, module, or solution.
     *  Default value is software.
     */
    productKind?: string;
    /** SHA256 fingerprint of the image file. Required for virtual server image for VPC. */
    sha?: string;
    /** Semantic version of the software being onboarded. Required for virtual server image for VPC. */
    version?: string;
    /** Version Flavor Information.  Only supported for Product kind Solution. */
    flavor?: Flavor;
    /** Generic data to be included with content being onboarded. Required for virtual server image for VPC. */
    metadata?: ImportOfferingBodyMetadata;
    /** Optional - The sub-folder within the specified tgz file that contains the software being onboarded. */
    workingDirectory?: string;
    /** URL path to zip location.  If not specified, must provide content in the body of this call. */
    zipurl?: string;
    /** The semver value for this new version, if not found in the zip url package content. */
    targetVersion?: string;
    /** Add all possible configuration values to this version when importing. */
    includeConfig?: boolean;
    /** Indicates that the current terraform template is used to install a virtual server image. */
    isVsi?: boolean;
    /** The type of repository containing this version.  Valid values are 'public_git' or 'enterprise_git'. */
    repotype?: string;
    /** Authentication token used to access the specified zip file. */
    xAuthToken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `importOffering` operation. */
  export interface ImportOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Tags array. */
    tags?: string[];
    /** Byte array representing the content to be imported. Only supported for OVA images at this time. */
    content?: string;
    /** Name of version. Required for virtual server image for VPC. */
    name?: string;
    /** Display name of version. Required for virtual server image for VPC. */
    label?: string;
    /** Install type. Example: instance. Required for virtual server image for VPC. */
    installKind?: string;
    /** Deployment target of the content being onboarded. Current valid values are iks, roks, vcenter, power-iaas,
     *  terraform, and vpc-x86. Required for virtual server image for VPC.
     */
    targetKinds?: string[];
    /** Format of content being onboarded. Example: vsi-image. Required for virtual server image for VPC. */
    formatKind?: string;
    /** Optional product kind for the software being onboarded.  Valid values are software, module, or solution.
     *  Default value is software.
     */
    productKind?: string;
    /** SHA256 fingerprint of the image file. Required for virtual server image for VPC. */
    sha?: string;
    /** Semantic version of the software being onboarded. Required for virtual server image for VPC. */
    version?: string;
    /** Version Flavor Information.  Only supported for Product kind Solution. */
    flavor?: Flavor;
    /** Generic data to be included with content being onboarded. Required for virtual server image for VPC. */
    metadata?: ImportOfferingBodyMetadata;
    /** Optional - The sub-folder within the specified tgz file that contains the software being onboarded. */
    workingDirectory?: string;
    /** URL path to zip location.  If not specified, must provide content in this post body. */
    zipurl?: string;
    /** Re-use the specified offeringID during import. */
    offeringId?: string;
    /** The semver value for this new version. */
    targetVersion?: string;
    /** Add all possible configuration items when creating this version. */
    includeConfig?: boolean;
    /** Indicates that the current terraform template is used to install a virtual server image. */
    isVsi?: boolean;
    /** The type of repository containing this version.  Valid values are 'public_git' or 'enterprise_git'. */
    repotype?: string;
    /** Authentication token used to access the specified zip file. */
    xAuthToken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `reloadOffering` operation. */
  export interface ReloadOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** The semver value for this new version. */
    targetVersion: string;
    /** Tags array. */
    tags?: string[];
    /** byte array representing the content to be imported.  Only supported for OVA images at this time. */
    content?: string;
    /** Target kinds.  Current valid values are 'iks', 'roks', 'vcenter', 'power-iaas', and 'terraform'. */
    targetKinds?: string[];
    /** Format of content being onboarded. Example: vsi-image. Required for virtual server image for VPC. */
    formatKind?: string;
    /** Version Flavor Information.  Only supported for Product kind Solution. */
    flavor?: Flavor;
    /** Optional - The sub-folder within the specified tgz file that contains the software being onboarded. */
    workingDirectory?: string;
    /** URL path to zip location.  If not specified, must provide content in this post body. */
    zipurl?: string;
    /** The type of repository containing this version.  Valid values are 'public_git' or 'enterprise_git'. */
    repoType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOffering` operation. */
  export interface GetOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Offering Parameter Type.  Valid values are 'name' or 'id'.  Default is 'id'. */
    type?: string;
    /** Return the digest format of the specified offering.  Default is false. */
    digest?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceOffering` operation. */
  export interface ReplaceOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** unique id. */
    id?: string;
    /** Cloudant revision. */
    rev?: string;
    /** The url for this specific offering. */
    url?: string;
    /** The crn for this specific offering. */
    crn?: string;
    /** Display Name in the requested language. */
    label?: string;
    /** A map of translated strings, by language code. */
    labelI18n?: JsonObject;
    /** The programmatic name of this offering. */
    name?: string;
    /** URL for an icon associated with this offering. */
    offeringIconUrl?: string;
    /** URL for an additional docs with this offering. */
    offeringDocsUrl?: string;
    /** [deprecated] - Use offering.support instead.  URL to be displayed in the Consumption UI for getting support
     *  on this offering.
     */
    offeringSupportUrl?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** List of keywords associated with offering, typically used to search for it. */
    keywords?: string[];
    /** Repository info for offerings. */
    rating?: Rating;
    /** The date and time this catalog was created. */
    created?: string;
    /** The date and time this catalog was last updated. */
    updated?: string;
    /** Short description in the requested language. */
    shortDescription?: string;
    /** A map of translated strings, by language code. */
    shortDescriptionI18n?: JsonObject;
    /** Long description in the requested language. */
    longDescription?: string;
    /** A map of translated strings, by language code. */
    longDescriptionI18n?: JsonObject;
    /** list of features associated with this offering. */
    features?: Feature[];
    /** Array of kind. */
    kinds?: Kind[];
    /** Publish information. */
    publish?: PublishObject;
    /** Offering is managed by Partner Center. */
    pcManaged?: boolean;
    /** Offering has been approved to publish to permitted to IBM or Public Catalog. */
    publishApproved?: boolean;
    /** Denotes public availability of an Offering. */
    shareWithAll?: boolean;
    /** Denotes IBM employee availability of an Offering - if share_enabled is true. */
    shareWithIbm?: boolean;
    /** Denotes sharing including access list availability of an Offering is enabled. */
    shareEnabled?: boolean;
    /** Deprecated: Is it permitted to request publishing to IBM or Public. */
    permitRequestIbmPublicPublish?: boolean;
    /** Deprecated: Indicates if this offering has been approved for use by all IBMers. */
    ibmPublishApproved?: boolean;
    /** Deprecated: Indicates if this offering has been approved for use by all IBM Cloud users. */
    publicPublishApproved?: boolean;
    /** The original offering CRN that this publish entry came from. */
    publicOriginalCrn?: string;
    /** The crn of the public catalog entry of this offering. */
    publishPublicCrn?: string;
    /** The portal's approval record ID. */
    portalApprovalRecord?: string;
    /** The portal UI URL. */
    portalUiUrl?: string;
    /** The id of the catalog containing this offering. */
    catalogId?: string;
    /** The name of the catalog. */
    catalogName?: string;
    /** Map of metadata values for this offering. */
    metadata?: JsonObject;
    /** A disclaimer for this offering. */
    disclaimer?: string;
    /** Determine if this offering should be displayed in the Consumption UI. */
    hidden?: boolean;
    /** Deprecated: Deprecated - Provider of this offering. */
    provider?: string;
    /** Information on the provider for this offering, or omitted if no provider information is given. */
    providerInfo?: ProviderInfo;
    /** Repository info for offerings. */
    repoInfo?: RepoInfo;
    /** Image pull keys for this offering. */
    imagePullKeys?: ImagePullKey[];
    /** Offering Support information. */
    support?: Support;
    /** A list of media items related to this offering. */
    media?: MediaItem[];
    /** Deprecation information for an Offering. */
    deprecatePending?: DeprecatePending;
    /** The product kind.  Valid values are module, solution, or empty string. */
    productKind?: string;
    /** A list of badges for this offering. */
    badges?: Badge[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateOffering` operation. */
  export interface UpdateOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Offering etag contained in quotes. */
    ifMatch: string;
    updates?: JsonPatchOperation[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteOffering` operation. */
  export interface DeleteOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listOfferingAudits` operation. */
  export interface ListOfferingAuditsParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingAudit` operation. */
  export interface GetOfferingAuditParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Auditlog ID. */
    auditlogIdentifier: string;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setOfferingPublish` operation. */
  export interface SetOfferingPublishParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Type of approval.
     *   * `pc_managed` - Partner Center is managing this offering
     *   * `ibm_module_repo` - Offering is from an approved repository can be published into the public catalog.
     *   * `publish_approved` - Publishing approved, offering owners can now set who sees the offering in public catalog
     *   * `approval_required` - Offering will be removed from public catalog when this flag is set to true, regardless
     *  of the approval and visibility settings.
     */
    approvalType: SetOfferingPublishConstants.ApprovalType | string;
    /** Approve (true) or disapprove (false). */
    approved: SetOfferingPublishConstants.Approved | string;
    /** Partner Center identifier for this offering. */
    portalRecord?: string;
    /** Partner Center url for this offering. */
    portalUrl?: string;
    /** IAM token of partner center. Only needed when Partner Center accessing the private catalog offering. When
     *  accessing the public offering Partner Center only needs to use their token in the authorization header.
     */
    xApproverToken?: string;
    /** Authentication token used to verify if user is a collaborator of a repository as part of the checks to set
     *  the approval type as `ibm_module_repo`.
     */
    xAuthToken?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `setOfferingPublish` operation. */
  export namespace SetOfferingPublishConstants {
    /** Type of approval. * `pc_managed` - Partner Center is managing this offering * `ibm_module_repo` - Offering is from an approved repository can be published into the public catalog. * `publish_approved` - Publishing approved, offering owners can now set who sees the offering in public catalog * `approval_required` - Offering will be removed from public catalog when this flag is set to true, regardless of the approval and visibility settings. */
    export enum ApprovalType {
      PC_MANAGED = 'pc_managed',
      PUBLISH_APPROVED = 'publish_approved',
      IBM_MODULE_REPO = 'ibm_module_repo',
      APPROVAL_REQUIRED = 'approval_required',
    }
    /** Approve (true) or disapprove (false). */
    export enum Approved {
      TRUE = 'true',
      FALSE = 'false',
    }
  }

  /** Parameters for the `deprecateOffering` operation. */
  export interface DeprecateOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Set deprecation (true) or cancel deprecation (false). */
    setting: DeprecateOfferingConstants.Setting | string;
    /** Additional information that users can provide to be displayed in deprecation notification. */
    description?: string;
    /** Specifies the amount of days until product is not available in catalog. */
    daysUntilDeprecate?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `deprecateOffering` operation. */
  export namespace DeprecateOfferingConstants {
    /** Set deprecation (true) or cancel deprecation (false). */
    export enum Setting {
      TRUE = 'true',
      FALSE = 'false',
    }
  }

  /** Parameters for the `shareOffering` operation. */
  export interface ShareOfferingParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Visible to IBM employees. */
    ibm?: boolean;
    /** Visible to everyone in the public catalog. */
    _public?: boolean;
    /** Visible to access list. */
    enabled?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingAccess` operation. */
  export interface GetOfferingAccessParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Identifier for access. Use 'accountId' or '-acct-accountId' for an account, '-ent-enterpriseid' for an
     *  enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
     */
    accessIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingAccessList` operation. */
  export interface GetOfferingAccessListParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteOfferingAccessList` operation. */
  export interface DeleteOfferingAccessListParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** A list of accesses to delete.  An entry with star["*"] will remove all accesses. */
    accesses: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addOfferingAccessList` operation. */
  export interface AddOfferingAccessListParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** A list of accesses to add. */
    accesses: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingUpdates` operation. */
  export interface GetOfferingUpdatesParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Offering identification. */
    offeringId: string;
    /** The kind of offering (e.g, helm, ova, terraform ...). */
    kind: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** The target kind of the currently installed version (e.g. iks, roks, etc). */
    target?: string;
    /** optionaly provide an existing version to check updates for if one is not given, all version will be
     *  returned.
     */
    version?: string;
    /** The id of the cluster where this version was installed. */
    clusterId?: string;
    /** The region of the cluster where this version was installed. */
    region?: string;
    /** The resource group id of the cluster where this version was installed. */
    resourceGroupId?: string;
    /** The namespace of the cluster where this version was installed. */
    namespace?: string;
    /** The sha value of the currently installed version. */
    sha?: string;
    /** Optionally provide the channel value of the currently installed version. */
    channel?: string;
    /** Optionally provide a list of namespaces used for the currently installed version. */
    namespaces?: string[];
    /** Optionally indicate that the current version was installed in all namespaces. */
    allNamespaces?: boolean;
    /** The programmatic flavor name of the version that was installed. */
    flavor?: string;
    /** The install type of the version that was installed. */
    installType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingSource` operation. */
  export interface GetOfferingSourceParams {
    /** The version being requested. */
    version: string;
    /** The type of the response: application/yaml, application/json, or application/x-gzip. */
    accept?: GetOfferingSourceConstants.Accept | string;
    /** Catalog ID.  If not specified, this value will default to the public catalog. */
    catalogId?: string;
    /** Offering name.  An offering name or ID must be specified. */
    name?: string;
    /** Offering id.  An offering name or ID must be specified. */
    id?: string;
    /** The kind of offering (e.g. helm, ova, terraform...). */
    kind?: string;
    /** The channel value of the specified version. */
    channel?: string;
    /** The programmatic flavor name of the specified version. */
    flavor?: string;
    /** If false (the default), the root folder from the original onboarded tgz file is removed.  If true, the root
     *  folder is returned.
     */
    asIs?: boolean;
    /** The install type of the specified version. */
    installType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getOfferingSource` operation. */
  export namespace GetOfferingSourceConstants {
    /** The type of the response: application/yaml, application/json, or application/x-gzip. */
    export enum Accept {
      APPLICATION_YAML = 'application/yaml',
      APPLICATION_JSON = 'application/json',
      APPLICATION_X_GZIP = 'application/x-gzip',
    }
  }

  /** Parameters for the `getOfferingSourceArchive` operation. */
  export interface GetOfferingSourceArchiveParams {
    /** The version being requested. */
    version: string;
    /** The type of the response: application/yaml, application/json, or application/x-gzip. */
    accept?: GetOfferingSourceArchiveConstants.Accept | string;
    /** Catalog ID.  If not specified, this value will default to the public catalog. */
    catalogId?: string;
    /** Offering name.  An offering name or ID must be specified. */
    name?: string;
    /** Offering id.  An offering name or ID must be specified. */
    id?: string;
    /** The kind of offering (e.g. helm, ova, terraform...). */
    kind?: string;
    /** The channel value of the specified version. */
    channel?: string;
    /** The programmatic flavor name of the specified version. */
    flavor?: string;
    /** If false (the default), the root folder from the original onboarded tgz file is removed.  If true, the root
     *  folder is returned.
     */
    asIs?: boolean;
    /** The install type of the specified version. */
    installType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getOfferingSourceArchive` operation. */
  export namespace GetOfferingSourceArchiveConstants {
    /** The type of the response: application/yaml, application/json, or application/x-gzip. */
    export enum Accept {
      APPLICATION_YAML = 'application/yaml',
      APPLICATION_JSON = 'application/json',
      APPLICATION_X_GZIP = 'application/x-gzip',
    }
  }

  /** Parameters for the `getOfferingSourceUrl` operation. */
  export interface GetOfferingSourceUrlParams {
    /** Unique key identifying an image. */
    keyIdentifier: string;
    /** The type of the response: application/yaml, application/json, or application/x-gzip. */
    accept?: GetOfferingSourceUrlConstants.Accept | string;
    /** Catalog ID. If not specified, this value will default to the public catalog. */
    catalogId?: string;
    /** Offering name. An offering name or ID must be specified. */
    name?: string;
    /** Offering id. An offering name or ID must be specified. */
    id?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `getOfferingSourceUrl` operation. */
  export namespace GetOfferingSourceUrlConstants {
    /** The type of the response: application/yaml, application/json, or application/x-gzip. */
    export enum Accept {
      APPLICATION_YAML = 'application/yaml',
      APPLICATION_JSON = 'application/json',
      APPLICATION_X_GZIP = 'application/x-gzip',
    }
  }

  /** Parameters for the `getOfferingAbout` operation. */
  export interface GetOfferingAboutParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingLicense` operation. */
  export interface GetOfferingLicenseParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** The ID of the license, which maps to the file name in the 'licenses' directory of this verions tgz file. */
    licenseId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingContainerImages` operation. */
  export interface GetOfferingContainerImagesParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `archiveVersion` operation. */
  export interface ArchiveVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `setDeprecateVersion` operation. */
  export interface SetDeprecateVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** Set deprecation (true) or cancel deprecation (false). */
    setting: SetDeprecateVersionConstants.Setting | string;
    /** Additional information that users can provide to be displayed in deprecation notification. */
    description?: string;
    /** Specifies the amount of days until product is not available in catalog. */
    daysUntilDeprecate?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `setDeprecateVersion` operation. */
  export namespace SetDeprecateVersionConstants {
    /** Set deprecation (true) or cancel deprecation (false). */
    export enum Setting {
      TRUE = 'true',
      FALSE = 'false',
    }
  }

  /** Parameters for the `consumableVersion` operation. */
  export interface ConsumableVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `prereleaseVersion` operation. */
  export interface PrereleaseVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `suspendVersion` operation. */
  export interface SuspendVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `commitVersion` operation. */
  export interface CommitVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `copyVersion` operation. */
  export interface CopyVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** Tags array. */
    tags?: string[];
    /** byte array representing the content to be imported.  Only supported for OVA images at this time. */
    content?: string;
    /** Target kinds.  Current valid values are 'iks', 'roks', 'vcenter', 'power-iaas', and 'terraform'. */
    targetKinds?: string[];
    /** Format of content being onboarded. Example: vsi-image. Required for virtual server image for VPC. */
    formatKind?: string;
    /** Version Flavor Information.  Only supported for Product kind Solution. */
    flavor?: Flavor;
    /** Optional - The sub-folder within the specified tgz file that contains the software being onboarded. */
    workingDirectory?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingWorkingCopy` operation. */
  export interface GetOfferingWorkingCopyParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `copyFromPreviousVersion` operation. */
  export interface CopyFromPreviousVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** The type of data you would like to copy from a previous version. Valid values are 'configuration' or
     *  'licenses'.
     */
    type: string;
    /** The version locator id of the version you wish to copy data from. */
    versionLocIdToCopyFrom: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getVersion` operation. */
  export interface GetVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteVersion` operation. */
  export interface DeleteVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deprecateVersion` operation. */
  export interface DeprecateVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getCluster` operation. */
  export interface GetClusterParams {
    /** ID of the cluster. */
    clusterId: string;
    /** Region of the cluster. */
    region: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getNamespaces` operation. */
  export interface GetNamespacesParams {
    /** ID of the cluster. */
    clusterId: string;
    /** Cluster region. */
    region: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** The maximum number of results to return. */
    limit?: number;
    /** The number of results to skip before returning values. */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deployOperators` operation. */
  export interface DeployOperatorsParams {
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** Cluster ID. */
    clusterId?: string;
    /** Cluster region. */
    region?: string;
    /** Kube namespaces to deploy Operator(s) to. */
    namespaces?: string[];
    /** Denotes whether to install Operator(s) globally. */
    allNamespaces?: boolean;
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocatorId?: string;
    /** Operator channel. */
    channel?: string;
    /** Plan. */
    installPlan?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listOperators` operation. */
  export interface ListOperatorsParams {
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** Cluster identification. */
    clusterId: string;
    /** Cluster region. */
    region: string;
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocatorId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceOperators` operation. */
  export interface ReplaceOperatorsParams {
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** Cluster ID. */
    clusterId?: string;
    /** Cluster region. */
    region?: string;
    /** Kube namespaces to deploy Operator(s) to. */
    namespaces?: string[];
    /** Denotes whether to install Operator(s) globally. */
    allNamespaces?: boolean;
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocatorId?: string;
    /** Operator channel. */
    channel?: string;
    /** Plan. */
    installPlan?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteOperators` operation. */
  export interface DeleteOperatorsParams {
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** Cluster identification. */
    clusterId: string;
    /** Cluster region. */
    region: string;
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocatorId: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `installVersion` operation. */
  export interface InstallVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** Cluster ID. */
    clusterId?: string;
    /** Cluster region. */
    region?: string;
    /** Kube namespace. */
    namespace?: string;
    /** Validation override values. Required for virtual server image for VPC. */
    overrideValues?: DeployRequestBodyOverrideValues;
    /** Schematics environment variables to use with this workspace. */
    environmentVariables?: DeployRequestBodyEnvironmentVariablesItem[];
    /** Entitlement API Key for this offering. */
    entitlementApikey?: string;
    /** Schematics workspace configuration. */
    schematics?: DeployRequestBodySchematics;
    /** Script. */
    script?: string;
    /** Script ID. */
    scriptId?: string;
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocatorId?: string;
    /** VCenter ID. */
    vcenterId?: string;
    /** VCenter Location. */
    vcenterLocation?: string;
    /** VCenter User. */
    vcenterUser?: string;
    /** VCenter Password. */
    vcenterPassword?: string;
    /** VCenter Datastore. */
    vcenterDatastore?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `preinstallVersion` operation. */
  export interface PreinstallVersionParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** Cluster ID. */
    clusterId?: string;
    /** Cluster region. */
    region?: string;
    /** Kube namespace. */
    namespace?: string;
    /** Validation override values. Required for virtual server image for VPC. */
    overrideValues?: DeployRequestBodyOverrideValues;
    /** Schematics environment variables to use with this workspace. */
    environmentVariables?: DeployRequestBodyEnvironmentVariablesItem[];
    /** Entitlement API Key for this offering. */
    entitlementApikey?: string;
    /** Schematics workspace configuration. */
    schematics?: DeployRequestBodySchematics;
    /** Script. */
    script?: string;
    /** Script ID. */
    scriptId?: string;
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocatorId?: string;
    /** VCenter ID. */
    vcenterId?: string;
    /** VCenter Location. */
    vcenterLocation?: string;
    /** VCenter User. */
    vcenterUser?: string;
    /** VCenter Password. */
    vcenterPassword?: string;
    /** VCenter Datastore. */
    vcenterDatastore?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getPreinstall` operation. */
  export interface GetPreinstallParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** ID of the cluster. */
    clusterId?: string;
    /** Cluster region. */
    region?: string;
    /** Required if the version's pre-install scope is `namespace`. */
    namespace?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `validateInstall` operation. */
  export interface ValidateInstallParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** Cluster ID. */
    clusterId?: string;
    /** Cluster region. */
    region?: string;
    /** Kube namespace. */
    namespace?: string;
    /** Validation override values. Required for virtual server image for VPC. */
    overrideValues?: DeployRequestBodyOverrideValues;
    /** Schematics environment variables to use with this workspace. */
    environmentVariables?: DeployRequestBodyEnvironmentVariablesItem[];
    /** Entitlement API Key for this offering. */
    entitlementApikey?: string;
    /** Schematics workspace configuration. */
    schematics?: DeployRequestBodySchematics;
    /** Script. */
    script?: string;
    /** Script ID. */
    scriptId?: string;
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocatorId?: string;
    /** VCenter ID. */
    vcenterId?: string;
    /** VCenter Location. */
    vcenterLocation?: string;
    /** VCenter User. */
    vcenterUser?: string;
    /** VCenter Password. */
    vcenterPassword?: string;
    /** VCenter Datastore. */
    vcenterDatastore?: string;
    /** The name of a target account context on a catalog. */
    targetContextName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getValidationStatus` operation. */
  export interface GetValidationStatusParams {
    /** A dotted value of `catalogID`.`versionID`. */
    versionLocId: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** The name of a target account context on a catalog. */
    targetContextName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `searchObjects` operation. */
  export interface SearchObjectsParams {
    /** Lucene query string. */
    query: string;
    /** The kind of the object. It will default to "vpe". */
    kind?: SearchObjectsConstants.Kind | string;
    /** The maximum number of results to return. */
    limit?: number;
    /** The number of results to skip before returning values. */
    offset?: number;
    /** When true, hide private objects that correspond to public or IBM published objects. */
    collapse?: boolean;
    /** Display a digests of search results, has default value of true. */
    digest?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `searchObjects` operation. */
  export namespace SearchObjectsConstants {
    /** The kind of the object. It will default to "vpe". */
    export enum Kind {
      VPE = 'vpe',
    }
  }

  /** Parameters for the `listObjects` operation. */
  export interface ListObjectsParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** The number of results to return. */
    limit?: number;
    /** The number of results to skip before returning values. */
    offset?: number;
    /** Only return results that contain the specified string. */
    name?: string;
    /** The field on which the output is sorted. Sorts by default by **label** property. Available fields are
     *  **name**, **label**, **created**, and **updated**. By adding **-** (i.e. **-label**) in front of the query
     *  string, you can specify descending order. Default is ascending order.
     */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createObject` operation. */
  export interface CreateObjectParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** The programmatic name of this object. */
    name?: string;
    /** The crn for this specific object. */
    crn?: string;
    /** The url for this specific object. */
    url?: string;
    /** The parent for this specific object. */
    parentId?: string;
    /** A map of translated strings, by language code. */
    labelI18n?: JsonObject;
    /** Display name in the requested language. */
    label?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** The date and time this catalog was created. */
    created?: string;
    /** The date and time this catalog was last updated. */
    updated?: string;
    /** Short description in the requested language. */
    shortDescription?: string;
    /** A map of translated strings, by language code. */
    shortDescriptionI18n?: JsonObject;
    /** Kind of object. */
    kind?: string;
    /** Publish information. */
    publish?: PublishObject;
    /** Offering state. */
    state?: State;
    /** The id of the catalog containing this offering. */
    catalogId?: string;
    /** The name of the catalog. */
    catalogName?: string;
    /** Map of data values for this object. */
    data?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getObject` operation. */
  export interface GetObjectParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceObject` operation. */
  export interface ReplaceObjectParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** unique id. */
    id?: string;
    /** Cloudant revision. */
    rev?: string;
    /** The programmatic name of this object. */
    name?: string;
    /** The crn for this specific object. */
    crn?: string;
    /** The url for this specific object. */
    url?: string;
    /** The parent for this specific object. */
    parentId?: string;
    /** A map of translated strings, by language code. */
    labelI18n?: JsonObject;
    /** Display name in the requested language. */
    label?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** The date and time this catalog was created. */
    created?: string;
    /** The date and time this catalog was last updated. */
    updated?: string;
    /** Short description in the requested language. */
    shortDescription?: string;
    /** A map of translated strings, by language code. */
    shortDescriptionI18n?: JsonObject;
    /** Kind of object. */
    kind?: string;
    /** Publish information. */
    publish?: PublishObject;
    /** Offering state. */
    state?: State;
    /** The id of the catalog containing this offering. */
    catalogId?: string;
    /** The name of the catalog. */
    catalogName?: string;
    /** Map of data values for this object. */
    data?: JsonObject;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteObject` operation. */
  export interface DeleteObjectParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listObjectAudits` operation. */
  export interface ListObjectAuditsParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getObjectAudit` operation. */
  export interface GetObjectAuditParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** Auditlog ID. */
    auditlogIdentifier: string;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `consumableShareObject` operation. */
  export interface ConsumableShareObjectParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `shareObject` operation. */
  export interface ShareObjectParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** Visible to IBM employees. */
    ibm?: boolean;
    /** Visible to everyone in the public catalog. */
    _public?: boolean;
    /** Visible to access list. */
    enabled?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getObjectAccessList` operation. */
  export interface GetObjectAccessListParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getObjectAccess` operation. */
  export interface GetObjectAccessParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** Identifier for access. Use 'accountId' or '-acct-accountId' for an account, '-ent-enterpriseid' for an
     *  enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
     */
    accessIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createObjectAccess` operation. */
  export interface CreateObjectAccessParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** Identifier for access. Use 'accountId' or '-acct-accountId' for an account, '-ent-enterpriseid' for an
     *  enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
     */
    accessIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteObjectAccess` operation. */
  export interface DeleteObjectAccessParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** Identifier for access. Use 'accountId' or '-acct-accountId' for an account, '-ent-enterpriseid' for an
     *  enterprise, and '-entgrp-enterprisegroupid' for an enterprise group.
     */
    accessIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getObjectAccessListDeprecated` operation. */
  export interface GetObjectAccessListDeprecatedParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** The maximum number of results to return. */
    limit?: number;
    /** The number of results to skip before returning values. */
    offset?: number;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteObjectAccessList` operation. */
  export interface DeleteObjectAccessListParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** A list of accesses to delete.  An entry with star["*"] will remove all accesses. */
    accesses: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `addObjectAccessList` operation. */
  export interface AddObjectAccessListParams {
    /** Catalog identifier. */
    catalogIdentifier: string;
    /** Object identifier. */
    objectIdentifier: string;
    /** A list of accesses to add. */
    accesses: string[];
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createOfferingInstance` operation. */
  export interface CreateOfferingInstanceParams {
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** provisioned instance ID (part of the CRN). */
    id?: string;
    /** Cloudant revision. */
    rev?: string;
    /** url reference to this object. */
    url?: string;
    /** platform CRN for this instance. */
    crn?: string;
    /** the label for this instance. */
    label?: string;
    /** Catalog ID this instance was created from. */
    catalogId?: string;
    /** Offering ID this instance was created from. */
    offeringId?: string;
    /** the format this instance has (helm, operator, ova...). */
    kindFormat?: string;
    /** The version this instance was installed from (semver - not version id). */
    version?: string;
    /** The version id this instance was installed from (version id - not semver). */
    versionId?: string;
    /** Cluster ID. */
    clusterId?: string;
    /** Cluster region (e.g., us-south). */
    clusterRegion?: string;
    /** List of target namespaces to install into. */
    clusterNamespaces?: string[];
    /** designate to install into all namespaces. */
    clusterAllNamespaces?: boolean;
    /** Id of the schematics workspace, for offering instances provisioned through schematics. */
    schematicsWorkspaceId?: string;
    /** Type of install plan (also known as approval strategy) for operator subscriptions. Can be either automatic,
     *  which automatically upgrades operators to the latest in a channel, or manual, which requires approval on the
     *  cluster.
     */
    installPlan?: string;
    /** Channel to pin the operator subscription to. */
    channel?: string;
    /** date and time create. */
    created?: string;
    /** date and time updated. */
    updated?: string;
    /** Map of metadata values for this offering instance. */
    metadata?: JsonObject;
    /** Id of the resource group to provision the offering instance into. */
    resourceGroupId?: string;
    /** String location of OfferingInstance deployment. */
    location?: string;
    /** Indicates if Resource Controller has disabled this instance. */
    disabled?: boolean;
    /** The account this instance is owned by. */
    account?: string;
    /** the last operation performed and status. */
    lastOperation?: OfferingInstanceLastOperation;
    /** The target kind for the installed software version. */
    kindTarget?: string;
    /** The digest value of the installed software version. */
    sha?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingInstance` operation. */
  export interface GetOfferingInstanceParams {
    /** Version Instance identifier. */
    instanceIdentifier: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `putOfferingInstance` operation. */
  export interface PutOfferingInstanceParams {
    /** Version Instance identifier. */
    instanceIdentifier: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    /** provisioned instance ID (part of the CRN). */
    id?: string;
    /** Cloudant revision. */
    rev?: string;
    /** url reference to this object. */
    url?: string;
    /** platform CRN for this instance. */
    crn?: string;
    /** the label for this instance. */
    label?: string;
    /** Catalog ID this instance was created from. */
    catalogId?: string;
    /** Offering ID this instance was created from. */
    offeringId?: string;
    /** the format this instance has (helm, operator, ova...). */
    kindFormat?: string;
    /** The version this instance was installed from (semver - not version id). */
    version?: string;
    /** The version id this instance was installed from (version id - not semver). */
    versionId?: string;
    /** Cluster ID. */
    clusterId?: string;
    /** Cluster region (e.g., us-south). */
    clusterRegion?: string;
    /** List of target namespaces to install into. */
    clusterNamespaces?: string[];
    /** designate to install into all namespaces. */
    clusterAllNamespaces?: boolean;
    /** Id of the schematics workspace, for offering instances provisioned through schematics. */
    schematicsWorkspaceId?: string;
    /** Type of install plan (also known as approval strategy) for operator subscriptions. Can be either automatic,
     *  which automatically upgrades operators to the latest in a channel, or manual, which requires approval on the
     *  cluster.
     */
    installPlan?: string;
    /** Channel to pin the operator subscription to. */
    channel?: string;
    /** date and time create. */
    created?: string;
    /** date and time updated. */
    updated?: string;
    /** Map of metadata values for this offering instance. */
    metadata?: JsonObject;
    /** Id of the resource group to provision the offering instance into. */
    resourceGroupId?: string;
    /** String location of OfferingInstance deployment. */
    location?: string;
    /** Indicates if Resource Controller has disabled this instance. */
    disabled?: boolean;
    /** The account this instance is owned by. */
    account?: string;
    /** the last operation performed and status. */
    lastOperation?: OfferingInstanceLastOperation;
    /** The target kind for the installed software version. */
    kindTarget?: string;
    /** The digest value of the installed software version. */
    sha?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteOfferingInstance` operation. */
  export interface DeleteOfferingInstanceParams {
    /** Version Instance identifier. */
    instanceIdentifier: string;
    /** IAM Refresh token. */
    xAuthRefreshToken: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listOfferingInstanceAudits` operation. */
  export interface ListOfferingInstanceAuditsParams {
    /** Version Instance identifier. */
    instanceIdentifier: string;
    /** Start token for a query. */
    start?: string;
    /** number or results to return in the query. */
    limit?: number;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getOfferingInstanceAudit` operation. */
  export interface GetOfferingInstanceAuditParams {
    /** Version Instance identifier. */
    instanceIdentifier: string;
    /** Auditlog ID. */
    auditlogIdentifier: string;
    /** Auditlog Lookup Names - by default names are not returned in auditlog. */
    lookupnames?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** access. */
  export interface Access {
    /** unique id. */
    id?: string;
    /** account id. */
    account?: string;
    /** Normal account or enterprise. */
    account_type?: number;
    /** unique id. */
    catalog_id?: string;
    /** object ID. */
    target_id?: string;
    /** object's owner's account. */
    target_account?: string;
    /** entity type. */
    target_kind?: string;
    /** date and time create. */
    created?: string;
    /** Approval state for access. If this field is an empty string, then it means that it's approved. */
    approval_state?: string;
  }

  /** Access List Add/Remove result. */
  export interface AccessListBulkResponse {
    /** in the case of error on an account add/remove - account: error. */
    errors?: JsonObject;
  }

  /** Paginated Offering search result. */
  export interface AccessListResult {
    /** The start token used for this response. */
    start?: string;
    /** The limit that was applied to this response. It may be smaller than in the request because that was too
     *  large.
     */
    limit: number;
    /** The total count of resources in the system that matches the request. */
    total_count?: number;
    /** The number of resources returned in this response. */
    resource_count: number;
    /** Link response on a token paginated query. */
    first: PaginationTokenLink;
    /** Link response on a token paginated query. */
    next?: PaginationTokenLink;
    /** Link response on a token paginated query. */
    prev?: PaginationTokenLink;
    /** Link response on a token paginated query. */
    last?: PaginationTokenLink;
    /** A list of access records. */
    resources: Access[];
  }

  /** Account information. */
  export interface Account {
    /** Account identification. */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** Hide the public catalog in this account. */
    hide_IBM_cloud_catalog?: boolean;
    /** Filters for account and catalog filters. */
    account_filters?: Filters;
  }

  /** The accumulated filters for an account. This will return the account filters plus a filter for each catalog the user has access to. */
  export interface AccumulatedFilters {
    /** Hide the public catalog in this account. */
    hide_IBM_cloud_catalog?: boolean;
    /** Filters for accounts (at this time this will always be just one item array). */
    account_filters?: Filters[];
    /** The filters for all of the accessible catalogs. */
    catalog_filters?: AccumulatedFiltersCatalogFiltersItem[];
  }

  /** AccumulatedFiltersCatalogFiltersItem. */
  export interface AccumulatedFiltersCatalogFiltersItem {
    /** Filters for catalog. */
    catalog?: AccumulatedFiltersCatalogFiltersItemCatalog;
    /** Filters for account and catalog filters. */
    filters?: Filters;
  }

  /** Filters for catalog. */
  export interface AccumulatedFiltersCatalogFiltersItemCatalog {
    /** The ID of the catalog. */
    id?: string;
    /** The name of the catalog. */
    name?: string;
  }

  /** Result of approval. */
  export interface ApprovalResult {
    /** Deprecated: Shared - object is shared using access list - not set when using PC Managed objects. */
    shared?: boolean;
    /** Deprecated: Shared with IBM only - access list is also applicable - not set when using PC Managed objects. */
    ibm?: boolean;
    /** Deprecated: Shared with everyone - not set when using PC Managed objects. */
    public?: boolean;
    /** Published to Partner Center (pc_managed) or for objects, allowed to request publishing. */
    allow_request?: boolean;
    /** Approvers have approved publishing to public catalog. */
    approved?: boolean;
    /** Partner Center document ID. */
    portal_record?: string;
    /** Partner Center URL for this product. */
    portal_url?: string;
    /** Denotes whether approvals have changed. */
    changed?: boolean;
  }

  /** An Architecture Diagram. */
  export interface ArchitectureDiagram {
    /** Offering Media information. */
    diagram?: MediaItem;
    /** Description of this diagram. */
    description?: string;
    /** A map of translated strings, by language code. */
    description_i18n?: JsonObject;
  }

  /** An audit log which describes a change made to a catalog or associated resource. */
  export interface AuditLog {
    /** The identifier of the audit record. */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** The time at which the change was made. */
    created?: string;
    /** The type of change described by the audit record. */
    change_type?: string;
    /** The resource type associated with the change. */
    target_type?: string;
    /** The identifier of the resource that was changed. */
    target_id?: string;
    /** The email address of the user that made the change. */
    who_email?: string;
    /** The email address of the delegate user that made the change. This happens when a service makes a change
     *  onbehalf of the user.
     */
    who_delegate_email?: string;
    /** A message which describes the change. */
    message?: string;
    /** Transaction id for this change. */
    gid?: string;
    /** IAM identifier of the user who made the change. */
    who_id?: string;
    /** Name of the user who made the change. */
    who_name?: string;
    /** IAM identifier of the delegate user who made the change. */
    who_delegate_id?: string;
    /** Name of the delegate user who made the change. */
    who_delegate_name?: string;
    /** Data about the change. Usually a change log of what was changed, both before and after. Can be of any type. */
    data?: any;
  }

  /** An reduced audit log which describes a change made to a catalog or associated resource. */
  export interface AuditLogDigest {
    /** The identifier of the audit record. */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** The time at which the change was made. */
    created?: string;
    /** The type of change described by the audit record. */
    change_type?: string;
    /** The resource type associated with the change. */
    target_type?: string;
    /** The identifier of the resource that was changed. */
    target_id?: string;
    /** The email address of the user that made the change. */
    who_email?: string;
    /** The email address of the delegate user that made the change. This happens when a service makes a change
     *  onbehalf of the user.
     */
    who_delegate_email?: string;
    /** A message which describes the change. */
    message?: string;
  }

  /** A collection of audit records. */
  export interface AuditLogs {
    /** The start token used for this response. */
    start?: string;
    /** The limit that was applied to this response. It may be smaller than in the request because that was too
     *  large.
     */
    limit: number;
    /** The total count of resources in the system that matches the request. */
    total_count?: number;
    /** The number of resources returned in this response. */
    resource_count: number;
    /** Link response on a token paginated query. */
    first: PaginationTokenLink;
    /** Link response on a token paginated query. */
    next?: PaginationTokenLink;
    /** Link response on a token paginated query. */
    prev?: PaginationTokenLink;
    /** Link response on a token paginated query. */
    last?: PaginationTokenLink;
    /** A list of audit records. */
    audits: AuditLogDigest[];
  }

  /** Badge information. */
  export interface Badge {
    /** ID of the current badge. */
    id?: string;
    /** Display name for the current badge. */
    label?: string;
    /** A map of translated strings, by language code. */
    label_i18n?: JsonObject;
    /** Description of the current badge. */
    description?: string;
    /** A map of translated strings, by language code. */
    description_i18n?: JsonObject;
    /** Icon for the current badge. */
    icon?: string;
    /** Authority for the current badge. */
    authority?: string;
    /** Tag for the current badge. */
    tag?: string;
    /** Learn more links for a badge. */
    learn_more_links?: LearnMoreLinks;
    /** An optional set of constraints indicating which versions in an Offering have this particular badge. */
    constraints?: Constraint[];
  }

  /** Catalog information. */
  export interface Catalog {
    /** Unique ID. */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** Display Name in the requested language. */
    label?: string;
    /** A map of translated strings, by language code. */
    label_i18n?: JsonObject;
    /** Description in the requested language. */
    short_description?: string;
    /** A map of translated strings, by language code. */
    short_description_i18n?: JsonObject;
    /** URL for an icon associated with this catalog. */
    catalog_icon_url?: string;
    /** URL for a banner image for this catalog. */
    catalog_banner_url?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** The url for this specific catalog. */
    url?: string;
    /** CRN associated with the catalog. */
    crn?: string;
    /** URL path to offerings. */
    offerings_url?: string;
    /** List of features associated with this catalog. */
    features?: Feature[];
    /** Denotes whether a catalog is disabled. */
    disabled?: boolean;
    /** The date-time this catalog was created. */
    created?: string;
    /** The date-time this catalog was last updated. */
    updated?: string;
    /** Resource group id the catalog is owned by. */
    resource_group_id?: string;
    /** Account that owns catalog. */
    owning_account?: string;
    /** Filters for account and catalog filters. */
    catalog_filters?: Filters;
    /** Feature information. */
    syndication_settings?: SyndicationResource;
    /** Kind of catalog. Supported kinds are offering and vpe. */
    kind?: string;
    /** Catalog specific metadata. */
    metadata?: JsonObject;
    /** List of target accounts contexts on this catalog. */
    target_account_contexts?: TargetAccountContext[];
  }

  /** object information. */
  export interface CatalogObject {
    /** unique id. */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** The programmatic name of this object. */
    name?: string;
    /** The crn for this specific object. */
    crn?: string;
    /** The url for this specific object. */
    url?: string;
    /** The parent for this specific object. */
    parent_id?: string;
    /** A map of translated strings, by language code. */
    label_i18n?: JsonObject;
    /** Display name in the requested language. */
    label?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** The date and time this catalog was created. */
    created?: string;
    /** The date and time this catalog was last updated. */
    updated?: string;
    /** Short description in the requested language. */
    short_description?: string;
    /** A map of translated strings, by language code. */
    short_description_i18n?: JsonObject;
    /** Kind of object. */
    kind?: string;
    /** Publish information. */
    publish?: PublishObject;
    /** Offering state. */
    state?: State;
    /** The id of the catalog containing this offering. */
    catalog_id?: string;
    /** The name of the catalog. */
    catalog_name?: string;
    /** Map of data values for this object. */
    data?: JsonObject;
  }

  /** Paginated catalog search result. */
  export interface CatalogSearchResult {
    /** The overall total number of resources in the search result set. */
    total_count?: number;
    /** Resulting objects. */
    resources?: Catalog[];
  }

  /** Filter on a category. The filter will match against the values of the given category with include or exclude. */
  export interface CategoryFilter {
    /** -> true - This is an include filter, false - this is an exclude filter. */
    include?: boolean;
    /** Offering filter terms. */
    filter?: FilterTerms;
  }

  /** Claimed control. */
  export interface ClaimedControl {
    /** SCC Profile. */
    profile?: SCCProfile;
    /** Names. */
    names?: string[];
  }

  /** SCC Claims. */
  export interface Claims {
    /** Profiles. */
    profiles?: SCCProfile[];
    /** Controls. */
    controls?: ClaimedControl[];
  }

  /** Cluster information. */
  export interface ClusterInfo {
    /** Resource Group ID. */
    resource_group_id?: string;
    /** Resource Group name. */
    resource_group_name?: string;
    /** Cluster ID. */
    id?: string;
    /** Cluster name. */
    name?: string;
    /** Cluster region. */
    region?: string;
    /** Cluster Ingress hostname. */
    ingress_hostname?: string;
    /** Cluster provider. */
    provider?: string;
    /** Cluster status. */
    status?: string;
  }

  /** Compliance info for a version. */
  export interface Compliance {
    /** Authority. */
    authority?: string;
    /** SCC Claims. */
    claims?: Claims;
    /** Evaluations. */
    evaluations?: Evaluation[];
  }

  /** Configuration description. */
  export interface Configuration {
    /** Configuration key. */
    key?: string;
    /** Value type (string, boolean, int). */
    type?: string;
    /** The default value.  To use a secret when the type is password, specify a JSON encoded value of
     *  $ref:#/components/schemas/SecretInstance, prefixed with `cmsm_v1:`.
     */
    default_value?: any;
    /** Display name for configuration type. */
    display_name?: string;
    /** Constraint associated with value, e.g., for string type - regx:[a-z]. */
    value_constraint?: string;
    /** Key description. */
    description?: string;
    /** Is key required to install. */
    required?: boolean;
    /** List of options of type. */
    options?: any[];
    /** Hide values. */
    hidden?: boolean;
    /** Render type. */
    custom_config?: RenderType;
    /** The original type, as found in the source being onboarded. */
    type_metadata?: string;
  }

  /** Constraint information. */
  export interface Constraint {
    /** Type of the current constraint. */
    type?: string;
    /** Rule for the current constraint. */
    rule?: any;
  }

  /** Cost breakdown definition. */
  export interface CostBreakdown {
    /** Total hourly cost. */
    totalHourlyCost?: string;
    /** Total monthly cost. */
    totalMonthlyCost?: string;
    /** Resources. */
    resources?: CostResource[];
  }

  /** Cost component definition. */
  export interface CostComponent {
    /** Cost component name. */
    name?: string;
    /** Cost component unit. */
    unit?: string;
    /** Cost component hourly quantity. */
    hourlyQuantity?: string;
    /** Cost component monthly quantity. */
    monthlyQuantity?: string;
    /** Cost component price. */
    price?: string;
    /** Cost component hourly cost. */
    hourlyCost?: string;
    /** Cost component monthly cist. */
    monthlyCost?: string;
  }

  /** Cost estimate definition. */
  export interface CostEstimate {
    /** Cost estimate version. */
    version?: string;
    /** Cost estimate currency. */
    currency?: string;
    /** Cost estimate projects. */
    projects?: Project[];
    /** Cost summary definition. */
    summary?: CostSummary;
    /** Total hourly cost. */
    totalHourlyCost?: string;
    /** Total monthly cost. */
    totalMonthlyCost?: string;
    /** Past total hourly cost. */
    pastTotalHourlyCost?: string;
    /** Past total monthly cost. */
    pastTotalMonthlyCost?: string;
    /** Difference in total hourly cost. */
    diffTotalHourlyCost?: string;
    /** Difference in total monthly cost. */
    diffTotalMonthlyCost?: string;
    /** When this estimate was generated. */
    timeGenerated?: string;
  }

  /** Cost resource definition. */
  export interface CostResource {
    /** Resource name. */
    name?: string;
    /** Resource metadata. */
    metadata?: JsonObject;
    /** Hourly cost. */
    hourlyCost?: string;
    /** Monthly cost. */
    monthlyCost?: string;
    /** Cost components. */
    costComponents?: CostComponent[];
  }

  /** Cost summary definition. */
  export interface CostSummary {
    /** Total detected resources. */
    totalDetectedResources?: number;
    /** Total supported resources. */
    totalSupportedResources?: number;
    /** Total unsupported resources. */
    totalUnsupportedResources?: number;
    /** Total usage based resources. */
    totalUsageBasedResources?: number;
    /** Total no price resources. */
    totalNoPriceResources?: number;
    /** Unsupported resource counts. */
    unsupportedResourceCounts?: JsonObject;
    /** No price resource counts. */
    noPriceResourceCounts?: JsonObject;
  }

  /** DeployRequestBodyEnvironmentVariablesItem. */
  export interface DeployRequestBodyEnvironmentVariablesItem {
    /** Variable name. */
    name?: string;
    /** Variable value. */
    value?: any;
    /** Does this variable contain a secure value. */
    secure?: boolean;
    /** Environment variable is hidden. */
    hidden?: boolean;
  }

  /** Validation override values. Required for virtual server image for VPC. */
  export interface DeployRequestBodyOverrideValues {
    /** Name of virtual server image instance to create. Required for virtual server image for VPC. */
    vsi_instance_name?: string;
    /** Profile to use when validating virtual server image. Required for virtual server image for VPC. */
    vpc_profile?: string;
    /** ID of subnet to use when validating virtual server image. Required for virtual server image for VPC. */
    subnet_id?: string;
    /** ID of VPC to use when validating virtual server image. Required for virtual server image for VPC. */
    vpc_id?: string;
    /** Zone of subnet to use when validating virtual server image. Required for virtual server image for VPC. */
    subnet_zone?: string;
    /** ID off SSH key to use when validating virtual server image. Required for virtual server image for VPC. */
    ssh_key_id?: string;
    /** Region virtual server image exists in. Required for virtual server image for VPC. */
    vpc_region?: string;
    /** DeployRequestBodyOverrideValues accepts additional properties. */
    [propName: string]: any;
  }

  /** Schematics workspace configuration. */
  export interface DeployRequestBodySchematics {
    /** Schematics workspace name. */
    name?: string;
    /** Schematics workspace description. */
    description?: string;
    /** Schematics workspace tags. */
    tags?: string[];
    /** Resource group to use when creating the schematics workspace. */
    resource_group_id?: string;
    /** Terraform version override. */
    terraform_version?: string;
    /** Schematics workspace region. */
    region?: string;
  }

  /** Deprecation information for an Offering. */
  export interface DeprecatePending {
    /** Date of deprecation. */
    deprecate_date?: string;
    /** Deprecation state. */
    deprecate_state?: string;
    description?: string;
  }

  /** Evaluated control. */
  export interface EvaluatedControl {
    /** ID. */
    id?: string;
    /** Name. */
    name?: string;
    /** Description. */
    description?: string;
    /** Specifications. */
    specifications?: SCCSpecification[];
    /** Child controls. */
    child_controls?: EvaluatedControl[];
    /** Failure count. */
    failure_count?: number;
    /** Pass count. */
    pass_count?: number;
    /** SCC Control. */
    parent?: SCCControl;
    /** UI href. */
    ui_href?: string;
  }

  /** Evaluation. */
  export interface Evaluation {
    /** Scan ID. */
    scan_id?: string;
    /** Account ID. */
    account_id?: string;
    /** SCC Profile. */
    profile?: SCCProfile;
    /** Result. */
    result?: Result;
    /** Controls. */
    controls?: EvaluatedControl[];
  }

  /** Feature information. */
  export interface Feature {
    /** Heading. */
    title?: string;
    /** A map of translated strings, by language code. */
    title_i18n?: JsonObject;
    /** Feature description. */
    description?: string;
    /** A map of translated strings, by language code. */
    description_i18n?: JsonObject;
  }

  /** Offering filter terms. */
  export interface FilterTerms {
    /** List of values to match against. If include is true, then if the offering has one of the values then the
     *  offering is included. If include is false, then if the offering has one of the values then the offering is
     *  excluded.
     */
    filter_terms?: string[];
  }

  /** Filters for account and catalog filters. */
  export interface Filters {
    /** -> true - Include all of the public catalog when filtering. Further settings will specifically exclude some
     *  offerings. false - Exclude all of the public catalog when filtering. Further settings will specifically include
     *  some offerings.
     */
    include_all?: boolean;
    /** Filter against offering properties. */
    category_filters?: JsonObject;
    /** Filter on offering ID's. There is an include filter and an exclule filter. Both can be set. */
    id_filters?: IDFilter;
  }

  /** Version Flavor Information.  Only supported for Product kind Solution. */
  export interface Flavor {
    /** Programmatic name for this flavor. */
    name?: string;
    /** Label for this flavor. */
    label?: string;
    /** A map of translated strings, by language code. */
    label_i18n?: JsonObject;
    /** Order that this flavor should appear when listed for a single version. */
    index?: number;
  }

  /** IAM Permission definition. */
  export interface IAMPermission {
    /** Service name. */
    service_name?: string;
    /** Role CRNs for this permission. */
    role_crns?: string[];
    /** Resources for this permission. */
    resources?: IAMResource[];
  }

  /** IAM Resource definition. */
  export interface IAMResource {
    /** Resource name. */
    name?: string;
    /** Resource description. */
    description?: string;
    /** Role CRNs for this permission. */
    role_crns?: string[];
  }

  /** Filter on offering ID's. There is an include filter and an exclule filter. Both can be set. */
  export interface IDFilter {
    /** Offering filter terms. */
    include?: FilterTerms;
    /** Offering filter terms. */
    exclude?: FilterTerms;
  }

  /** Image. */
  export interface Image {
    /** Image. */
    image?: string;
  }

  /** Image Manifest. */
  export interface ImageManifest {
    /** Image manifest description. */
    description?: string;
    /** List of images. */
    images?: Image[];
  }

  /** Image pull keys for an offering. */
  export interface ImagePullKey {
    /** Key name. */
    name?: string;
    /** Key value. */
    value?: string;
    /** Key description. */
    description?: string;
  }

  /** Generic data to be included with content being onboarded. Required for virtual server image for VPC. */
  export interface ImportOfferingBodyMetadata {
    /** Operating system included in this image. Required for virtual server image for VPC. */
    operating_system?: ImportOfferingBodyMetadataOperatingSystem;
    /** Details for the stored image file. Required for virtual server image for VPC. */
    file?: ImportOfferingBodyMetadataFile;
    /** Minimum size (in gigabytes) of a volume onto which this image may be provisioned. Required for virtual
     *  server image for VPC.
     */
    minimum_provisioned_size?: number;
    /** Image operating system. Required for virtual server image for VPC. */
    images?: ImportOfferingBodyMetadataImagesItem[];
  }

  /** Details for the stored image file. Required for virtual server image for VPC. */
  export interface ImportOfferingBodyMetadataFile {
    /** Size of the stored image file rounded up to the next gigabyte. Required for virtual server image for VPC. */
    size?: number;
  }

  /** A list of details that identify a virtual server image. Required for virtual server image for VPC. */
  export interface ImportOfferingBodyMetadataImagesItem {
    /** Programmatic ID of virtual server image. Required for virtual server image for VPC. */
    id?: string;
    /** Programmatic name of virtual server image. Required for virtual server image for VPC. */
    name?: string;
    /** Region the virtual server image is available in. Required for virtual server image for VPC. */
    region?: string;
  }

  /** Operating system included in this image. Required for virtual server image for VPC. */
  export interface ImportOfferingBodyMetadataOperatingSystem {
    /** Images with this operating system can only be used on dedicated hosts or dedicated host groups. Required for
     *  virtual server image for VPC.
     */
    dedicated_host_only?: boolean;
    /** Vendor of the operating system. Required for virtual server image for VPC. */
    vendor?: string;
    /** Globally unique name for this operating system Required for virtual server image for VPC. */
    name?: string;
    /** URL for this operating system. Required for virtual server image for VPC. */
    href?: string;
    /** Unique, display-friendly name for the operating system. Required for virtual server image for VPC. */
    display_name?: string;
    /** Software family for this operating system. Required for virtual server image for VPC. */
    family?: string;
    /** Major release version of this operating system. Required for virtual server image for VPC. */
    version?: string;
    /** Operating system architecture. Required for virtual server image for VPC. */
    architecture?: string;
  }

  /** Installation status. */
  export interface InstallStatus {
    /** Installation status metadata. */
    metadata?: InstallStatusMetadata;
    /** Release information. */
    release?: InstallStatusRelease;
    /** Content management information. */
    content_mgmt?: InstallStatusContentMgmt;
  }

  /** Content management information. */
  export interface InstallStatusContentMgmt {
    /** Pods. */
    pods?: JsonObject[];
    /** Errors. */
    errors?: JsonObject[];
  }

  /** Installation status metadata. */
  export interface InstallStatusMetadata {
    /** Cluster ID. */
    cluster_id?: string;
    /** Cluster region. */
    region?: string;
    /** Cluster namespace. */
    namespace?: string;
    /** Workspace ID. */
    workspace_id?: string;
    /** Workspace name. */
    workspace_name?: string;
  }

  /** Release information. */
  export interface InstallStatusRelease {
    /** Kube deployments. */
    deployments?: JsonObject[];
    /** Kube replica sets. */
    replicasets?: JsonObject[];
    /** Kube stateful sets. */
    statefulsets?: JsonObject[];
    /** Kube pods. */
    pods?: JsonObject[];
    /** Kube errors. */
    errors?: JsonObject[];
  }

  /** A JSONPatch document as defined by RFC 6902. */
  export interface JsonPatchOperation {
    /** The operation to be performed. */
    op: JsonPatchOperation.Constants.Op | string;
    /** A JSON-Pointer. */
    path: string;
    /** The value to be used within the operations. */
    value?: any;
    /** A string containing a JSON Pointer value. */
    from?: string;
  }
  export namespace JsonPatchOperation {
    export namespace Constants {
      /** The operation to be performed. */
      export enum Op {
        ADD = 'add',
        REMOVE = 'remove',
        REPLACE = 'replace',
        MOVE = 'move',
        COPY = 'copy',
        TEST = 'test',
      }
    }
  }

  /** Offering kind. */
  export interface Kind {
    /** Unique ID. */
    id?: string;
    /** content kind, e.g., helm, vm image. */
    format_kind?: string;
    /** install kind, e.g., helm, operator, terraform. */
    install_kind?: string;
    /** target cloud to install, e.g., iks, open_shift_iks. */
    target_kind?: string;
    /** Open ended metadata information. */
    metadata?: JsonObject;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** List of features associated with this offering. */
    additional_features?: Feature[];
    /** The date and time this catalog was created. */
    created?: string;
    /** The date and time this catalog was last updated. */
    updated?: string;
    /** list of versions. */
    versions?: Version[];
  }

  /** Learn more links for a badge. */
  export interface LearnMoreLinks {
    /** First party link. */
    first_party?: string;
    /** Third party link. */
    third_party?: string;
  }

  /** BSS license. */
  export interface License {
    /** License ID. */
    id?: string;
    /** license name. */
    name?: string;
    /** type of license e.g., Apache xxx. */
    type?: string;
    /** URL for the license text. */
    url?: string;
    /** License description. */
    description?: string;
  }

  /** Offering Media information. */
  export interface MediaItem {
    /** URL of the specified media item. */
    url?: string;
    /** CM API specific URL of the specified media item. */
    api_url?: string;
    /** Offering URL proxy information. */
    url_proxy?: URLProxy;
    /** Caption for this media item. */
    caption?: string;
    /** A map of translated strings, by language code. */
    caption_i18n?: JsonObject;
    /** Type of this media item. */
    type?: string;
    /** Thumbnail URL for this media item. */
    thumbnail_url?: string;
  }

  /** Paginated list of namespace search results. */
  export interface NamespaceSearchResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset: number;
    /** The maximum number of resources returned in each page of search results. */
    limit: number;
    /** The overall total number of resources in the search result set. */
    total_count?: number;
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
    /** Resulting objects. */
    resources?: string[];
  }

  /** Paginated object search result. */
  export interface ObjectAccessListResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset: number;
    /** The maximum number of resources returned in each page of search results. */
    limit: number;
    /** The overall total number of resources in the search result set. */
    total_count?: number;
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
    /** Resulting objects. */
    resources?: Access[];
  }

  /** Paginated object search result. */
  export interface ObjectListResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset: number;
    /** The maximum number of resources returned in each page of search results. */
    limit: number;
    /** The overall total number of resources in the search result set. */
    total_count?: number;
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
    /** Resulting objects. */
    resources?: CatalogObject[];
  }

  /** Paginated object search result. */
  export interface ObjectSearchResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset: number;
    /** The maximum number of resources returned in each page of search results. */
    limit: number;
    /** The overall total number of resources in the search result set. */
    total_count?: number;
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
    /** Resulting objects. */
    resources?: CatalogObject[];
  }

  /** Offering information. */
  export interface Offering {
    /** unique id. */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** The url for this specific offering. */
    url?: string;
    /** The crn for this specific offering. */
    crn?: string;
    /** Display Name in the requested language. */
    label?: string;
    /** A map of translated strings, by language code. */
    label_i18n?: JsonObject;
    /** The programmatic name of this offering. */
    name?: string;
    /** URL for an icon associated with this offering. */
    offering_icon_url?: string;
    /** URL for an additional docs with this offering. */
    offering_docs_url?: string;
    /** [deprecated] - Use offering.support instead.  URL to be displayed in the Consumption UI for getting support
     *  on this offering.
     */
    offering_support_url?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** List of keywords associated with offering, typically used to search for it. */
    keywords?: string[];
    /** Repository info for offerings. */
    rating?: Rating;
    /** The date and time this catalog was created. */
    created?: string;
    /** The date and time this catalog was last updated. */
    updated?: string;
    /** Short description in the requested language. */
    short_description?: string;
    /** A map of translated strings, by language code. */
    short_description_i18n?: JsonObject;
    /** Long description in the requested language. */
    long_description?: string;
    /** A map of translated strings, by language code. */
    long_description_i18n?: JsonObject;
    /** list of features associated with this offering. */
    features?: Feature[];
    /** Array of kind. */
    kinds?: Kind[];
    /** Publish information. */
    publish?: PublishObject;
    /** Offering is managed by Partner Center. */
    pc_managed?: boolean;
    /** Offering has been approved to publish to permitted to IBM or Public Catalog. */
    publish_approved?: boolean;
    /** Denotes public availability of an Offering. */
    share_with_all?: boolean;
    /** Denotes IBM employee availability of an Offering - if share_enabled is true. */
    share_with_ibm?: boolean;
    /** Denotes sharing including access list availability of an Offering is enabled. */
    share_enabled?: boolean;
    /** Deprecated: Is it permitted to request publishing to IBM or Public. */
    permit_request_ibm_public_publish?: boolean;
    /** Deprecated: Indicates if this offering has been approved for use by all IBMers. */
    ibm_publish_approved?: boolean;
    /** Deprecated: Indicates if this offering has been approved for use by all IBM Cloud users. */
    public_publish_approved?: boolean;
    /** The original offering CRN that this publish entry came from. */
    public_original_crn?: string;
    /** The crn of the public catalog entry of this offering. */
    publish_public_crn?: string;
    /** The portal's approval record ID. */
    portal_approval_record?: string;
    /** The portal UI URL. */
    portal_ui_url?: string;
    /** The id of the catalog containing this offering. */
    catalog_id?: string;
    /** The name of the catalog. */
    catalog_name?: string;
    /** Map of metadata values for this offering. */
    metadata?: JsonObject;
    /** A disclaimer for this offering. */
    disclaimer?: string;
    /** Determine if this offering should be displayed in the Consumption UI. */
    hidden?: boolean;
    /** Deprecated: Deprecated - Provider of this offering. */
    provider?: string;
    /** Information on the provider for this offering, or omitted if no provider information is given. */
    provider_info?: ProviderInfo;
    /** Repository info for offerings. */
    repo_info?: RepoInfo;
    /** Image pull keys for this offering. */
    image_pull_keys?: ImagePullKey[];
    /** Offering Support information. */
    support?: Support;
    /** A list of media items related to this offering. */
    media?: MediaItem[];
    /** Deprecation information for an Offering. */
    deprecate_pending?: DeprecatePending;
    /** The product kind.  Valid values are module, solution, or empty string. */
    product_kind?: string;
    /** A list of badges for this offering. */
    badges?: Badge[];
  }

  /** A offering instance resource (provision instance of a catalog offering). */
  export interface OfferingInstance {
    /** provisioned instance ID (part of the CRN). */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** url reference to this object. */
    url?: string;
    /** platform CRN for this instance. */
    crn?: string;
    /** the label for this instance. */
    label?: string;
    /** Catalog ID this instance was created from. */
    catalog_id?: string;
    /** Offering ID this instance was created from. */
    offering_id?: string;
    /** the format this instance has (helm, operator, ova...). */
    kind_format?: string;
    /** The version this instance was installed from (semver - not version id). */
    version?: string;
    /** The version id this instance was installed from (version id - not semver). */
    version_id?: string;
    /** Cluster ID. */
    cluster_id?: string;
    /** Cluster region (e.g., us-south). */
    cluster_region?: string;
    /** List of target namespaces to install into. */
    cluster_namespaces?: string[];
    /** designate to install into all namespaces. */
    cluster_all_namespaces?: boolean;
    /** Id of the schematics workspace, for offering instances provisioned through schematics. */
    schematics_workspace_id?: string;
    /** Type of install plan (also known as approval strategy) for operator subscriptions. Can be either automatic,
     *  which automatically upgrades operators to the latest in a channel, or manual, which requires approval on the
     *  cluster.
     */
    install_plan?: string;
    /** Channel to pin the operator subscription to. */
    channel?: string;
    /** date and time create. */
    created?: string;
    /** date and time updated. */
    updated?: string;
    /** Map of metadata values for this offering instance. */
    metadata?: JsonObject;
    /** Id of the resource group to provision the offering instance into. */
    resource_group_id?: string;
    /** String location of OfferingInstance deployment. */
    location?: string;
    /** Indicates if Resource Controller has disabled this instance. */
    disabled?: boolean;
    /** The account this instance is owned by. */
    account?: string;
    /** the last operation performed and status. */
    last_operation?: OfferingInstanceLastOperation;
    /** The target kind for the installed software version. */
    kind_target?: string;
    /** The digest value of the installed software version. */
    sha?: string;
  }

  /** the last operation performed and status. */
  export interface OfferingInstanceLastOperation {
    /** last operation performed. */
    operation?: string;
    /** state after the last operation performed. */
    state?: string;
    /** additional information about the last operation. */
    message?: string;
    /** transaction id from the last operation. */
    transaction_id?: string;
    /** Date and time last updated. */
    updated?: string;
    /** Error code from the last operation, if applicable. */
    code?: string;
  }

  /** Offering reference definition. */
  export interface OfferingReference {
    /** Optional - If not specified, assumes the Public Catalog. */
    catalog_id?: string;
    /** Optional - Offering ID - not required if name is set. */
    id?: string;
    /** Optional - Programmatic Offering name. */
    name?: string;
    /** Format kind. */
    kind?: string;
    /** Required - Semver value or range. */
    version?: string;
    /** Optional - List of dependent flavors in the specified range. */
    flavors?: string[];
  }

  /** Paginated offering search result. */
  export interface OfferingSearchResult {
    /** The offset (origin 0) of the first resource in this page of search results. */
    offset: number;
    /** The maximum number of resources returned in each page of search results. */
    limit: number;
    /** The overall total number of resources in the search result set. */
    total_count?: number;
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
    /** Resulting objects. */
    resources?: Offering[];
  }

  /** Operator deploy result. */
  export interface OperatorDeployResult {
    /** Status phase. */
    phase?: string;
    /** Status message. */
    message?: string;
    /** Operator API path. */
    link?: string;
    /** Name of Operator. */
    name?: string;
    /** Operator version. */
    version?: string;
    /** Kube namespace. */
    namespace?: string;
    /** Package Operator exists in. */
    package_name?: string;
    /** Catalog identification. */
    catalog_id?: string;
  }

  /** Outputs for a version. */
  export interface Output {
    /** Output key. */
    key?: string;
    /** Output description. */
    description?: string;
  }

  /** Link response on a token paginated query. */
  export interface PaginationTokenLink {
    /** The href to the linked response. */
    href: string;
    /** The start token used in this link. Will not be returned on First links. */
    start?: string;
  }

  /** Cost estimate project definition. */
  export interface Project {
    /** Project name. */
    name?: string;
    /** Project metadata. */
    metadata?: JsonObject;
    /** Cost breakdown definition. */
    pastBreakdown?: CostBreakdown;
    /** Cost breakdown definition. */
    breakdown?: CostBreakdown;
    /** Cost breakdown definition. */
    diff?: CostBreakdown;
    /** Cost summary definition. */
    summary?: CostSummary;
  }

  /** Information on the provider for this offering, or omitted if no provider information is given. */
  export interface ProviderInfo {
    /** The id of this provider. */
    id?: string;
    /** The name of this provider. */
    name?: string;
  }

  /** Publish information. */
  export interface PublishObject {
    /** Offering is managed by Partner Center. */
    pc_managed?: boolean;
    /** Determines how the offering gets approved into the public catalog. The only value supported at the moment is
     *  `ibm_module_repo`.
     */
    approval_type?: string;
    /** Offering has been approved to publish to permitted to IBM or Public Catalog. */
    publish_approved?: boolean;
    /** Denotes public availability of an Offering. */
    share_with_all?: boolean;
    /** Denotes IBM employee availability of an Offering - if share_enabled is true. */
    share_with_ibm?: boolean;
    /** Denotes sharing including access list availability of an Offering is enabled. */
    share_enabled?: boolean;
    /** The original offering CRN that this publish entry came from. */
    original_crn?: string;
    /** The crn of the public catalog entry of this offering. */
    public_crn?: string;
    /** Record describing offering's approval details. */
    approval_record?: JsonObject;
    /** Is it permitted to request publishing to IBM or Public. */
    permit_ibm_public_publish?: boolean;
    /** Indicates if this offering has been approved for use by all IBMers. */
    ibm_approved?: boolean;
    /** Indicates if this offering has been approved for use by all IBM Cloud users. */
    public_approved?: boolean;
  }

  /** Repository info for offerings. */
  export interface Rating {
    /** One start rating. */
    one_star_count?: number;
    /** Two start rating. */
    two_star_count?: number;
    /** Three start rating. */
    three_star_count?: number;
    /** Four start rating. */
    four_star_count?: number;
  }

  /** Render type. */
  export interface RenderType {
    /** ID of the widget type. */
    type?: string;
    /** Determines where this configuration type is rendered (3 sections today - Target, Resource, and Deployment). */
    grouping?: string;
    /** Original grouping type for this configuration (3 types - Target, Resource, and Deployment). */
    original_grouping?: string;
    /** Determines the order that this configuration item shows in that particular grouping. */
    grouping_index?: number;
    /** Map of constraint parameters that will be passed to the custom widget. */
    config_constraints?: JsonObject;
    /** List of parameters that are associated with this configuration. */
    associations?: RenderTypeAssociations;
  }

  /** List of parameters that are associated with this configuration. */
  export interface RenderTypeAssociations {
    /** Parameters for this association. */
    parameters?: RenderTypeAssociationsParametersItem[];
  }

  /** RenderTypeAssociationsParametersItem. */
  export interface RenderTypeAssociationsParametersItem {
    /** Name of this parameter. */
    name?: string;
    /** Refresh options. */
    optionsRefresh?: boolean;
  }

  /** Repository info for offerings. */
  export interface RepoInfo {
    /** Token for private repos. */
    token?: string;
    /** Public or enterprise GitHub. */
    type?: string;
  }

  /** Resource requirements. */
  export interface Resource {
    /** Type of requirement. */
    type?: Resource.Constants.Type | string;
    /** mem, disk, cores, and nodes can be parsed as an int.  targetVersion will be a semver range value. */
    value?: any;
  }
  export namespace Resource {
    export namespace Constants {
      /** Type of requirement. */
      export enum Type {
        MEM = 'mem',
        DISK = 'disk',
        CORES = 'cores',
        TARGETVERSION = 'targetVersion',
        NODES = 'nodes',
      }
    }
  }

  /** Result. */
  export interface Result {
    /** Total (assessment) errors against claimed controls. */
    failure_count?: number;
    /** When the scan took place. */
    scan_time?: string;
    /** Error message, empty implies no error. */
    error_message?: string;
    /** False if just a subset of (profile) controls will be looked at for this DA. */
    complete_scan?: boolean;
    /** List of un-scanned resource IDs. */
    unscanned_resources?: string[];
  }

  /** SCC Assessment. */
  export interface SCCAssessment {
    /** ID. */
    id?: string;
    /** Description. */
    description?: string;
    /** Version. */
    version?: string;
    /** Type. */
    type?: string;
    /** Method. */
    method?: string;
    /** UI href. */
    ui_href?: string;
  }

  /** SCC Control. */
  export interface SCCControl {
    /** ID. */
    id?: string;
    /** Name. */
    name?: string;
    /** Version. */
    version?: string;
    /** Description. */
    description?: string;
    /** SCC Profile. */
    profile?: SCCProfile;
    /** SCC Control. */
    parent?: SCCControl;
    /** Parent name. */
    parent_name?: string;
    /** Specifications. */
    specifications?: SCCSpecification[];
    /** UI href. */
    ui_href?: string;
  }

  /** SCC Profile. */
  export interface SCCProfile {
    /** ID. */
    id?: string;
    /** Name. */
    name?: string;
    /** Version. */
    version?: string;
    /** Description. */
    description?: string;
    /** Type. */
    type?: string;
    /** UI href. */
    ui_href?: string;
  }

  /** SCC Specification. */
  export interface SCCSpecification {
    /** ID. */
    id?: string;
    /** Description. */
    description?: string;
    /** Component name. */
    component_name?: string;
    /** Assessments. */
    assessments?: SCCAssessment[];
    /** UI href. */
    ui_href?: string;
  }

  /** Environment values to be passed to Schematics Workspace on creation. */
  export interface SchematicsEnvValues {
    /** JSON string containing an array of values in Environment Variable format defined by the Schematics service. */
    value?: string;
    /** JSON encoded value of $ref:#/components/schemas/SecretInstance, prefixed with `cmsm_v1:`, where the secret
     *  value in Secrets Manager specifies a JSON string, which contains an array of values in the Environment Variable
     *  foramt defined by the Schematics service.
     */
    sm_ref?: string;
  }

  /** Script information. */
  export interface Script {
    /** Instruction on step and by whom (role) that are needed to take place to prepare the target for installing
     *  this version.
     */
    instructions?: string;
    /** A map of translated strings, by language code. */
    instructions_i18n?: JsonObject;
    /** Optional script that needs to be run post any pre-condition script. */
    script?: string;
    /** Optional iam permissions that are required on the target cluster to run this script. */
    script_permission?: string;
    /** Optional script that if run will remove the installed version. */
    delete_script?: string;
    /** Optional value indicating if this script is scoped to a namespace or the entire cluster. */
    scope?: string;
  }

  /** A script to be run as part of a Project configuration, during the specified stage and action. */
  export interface ScriptRef {
    /** The short description for this script. */
    short_description?: string;
    /** The type of the script. */
    type?: string;
    /** The path to this script within the current version source.  Must begin with scripts/. */
    path?: string;
    /** The stage of the specified action where this script should be run. */
    stage?: ScriptRef.Constants.Stage | string;
    /** The action where this script should be run. */
    action?: ScriptRef.Constants.Action | string;
  }
  export namespace ScriptRef {
    export namespace Constants {
      /** The stage of the specified action where this script should be run. */
      export enum Stage {
        PRE = 'pre',
        POST = 'post',
      }
      /** The action where this script should be run. */
      export enum Action {
        VALIDATE = 'validate',
        DEPLOY = 'deploy',
        UNDEPLOY = 'undeploy',
      }
    }
  }

  /** access for share approval. */
  export interface ShareApprovalAccess {
    /** unique id. */
    id?: string;
    /** account id. */
    account?: string;
    /** Normal account or enterprise. */
    account_type?: number;
    /** object's owner's account. */
    target_account?: string;
    /** entity type. */
    target_kind?: string;
    /** date and time create. */
    created?: string;
    /** Approval state for access. If this field is an empty string, then it means that it's approved. */
    approval_state?: string;
  }

  /** Paginated search result for share approval requests. */
  export interface ShareApprovalListAccessResult {
    /** The start token used for this response. */
    start?: string;
    /** The limit that was applied to this response. It may be smaller than in the request because that was too
     *  large.
     */
    limit: number;
    /** The total count of resources in the system that matches the request. */
    total_count?: number;
    /** The number of resources returned in this response. */
    resource_count: number;
    /** Link response on a token paginated query. */
    first: PaginationTokenLink;
    /** Link response on a token paginated query. */
    next?: PaginationTokenLink;
    /** Link response on a token paginated query. */
    prev?: PaginationTokenLink;
    /** Link response on a token paginated query. */
    last?: PaginationTokenLink;
    /** A list of access records. */
    resources: ShareApprovalAccess[];
  }

  /** Share setting information. */
  export interface ShareSetting {
    /** Visible to IBM employees. */
    ibm?: boolean;
    /** Visible to everyone in the public catalog. */
    public?: boolean;
    /** Visible to access list. */
    enabled?: boolean;
  }

  /** Version Solution Information.  Only supported for Product kind Solution. */
  export interface SolutionInfo {
    /** Architecture diagrams for this solution. */
    architecture_diagrams?: ArchitectureDiagram[];
    /** Features - titles only. */
    features?: Feature[];
    /** Cost estimate definition. */
    cost_estimate?: CostEstimate;
    /** Dependencies for this solution. */
    dependencies?: OfferingReference[];
    /** The install type for this solution. */
    install_type?: string;
  }

  /** Offering state. */
  export interface State {
    /** one of: new, validated, consumable. */
    current?: string;
    /** Date and time of current request. */
    current_entered?: string;
    /** one of: new, validated, consumable. */
    pending?: string;
    /** Date and time of pending request. */
    pending_requested?: string;
    /** one of: new, validated, consumable. */
    previous?: string;
  }

  /** Offering Support information. */
  export interface Support {
    /** URL to be displayed in the Consumption UI for getting support on this offering. */
    url?: string;
    /** Support process as provided by an ISV. */
    process?: string;
    /** A map of translated strings, by language code. */
    process_i18n?: JsonObject;
    /** A list of country codes indicating where support is provided. */
    locations?: string[];
    /** A list of support options (e.g. email, phone, slack, other). */
    support_details?: SupportDetail[];
    /** Support escalation policy. */
    support_escalation?: SupportEscalation;
    /** Support type for this product. */
    support_type?: string;
  }

  /** Times when support is available. */
  export interface SupportAvailability {
    /** A list of support times. */
    times?: SupportTime[];
    /** Timezone (e.g. America/New_York). */
    timezone?: string;
    /** Is this support always available. */
    always_available?: boolean;
  }

  /** A support option. */
  export interface SupportDetail {
    /** Type of the current support detail. */
    type?: string;
    /** Contact for the current support detail. */
    contact?: string;
    /** Time descriptor. */
    response_wait_time?: SupportWaitTime;
    /** Times when support is available. */
    availability?: SupportAvailability;
  }

  /** Support escalation policy. */
  export interface SupportEscalation {
    /** Time descriptor. */
    escalation_wait_time?: SupportWaitTime;
    /** Time descriptor. */
    response_wait_time?: SupportWaitTime;
    /** Escalation contact. */
    contact?: string;
  }

  /** Time range for support on a given day. */
  export interface SupportTime {
    /** The day of the week, represented as an integer. */
    day?: number;
    /** HOURS:MINUTES:SECONDS using 24 hour time (e.g. 8:15:00). */
    start_time?: string;
    /** HOURS:MINUTES:SECONDS using 24 hour time (e.g. 8:15:00). */
    end_time?: string;
  }

  /** Time descriptor. */
  export interface SupportWaitTime {
    /** Amount of time to wait in unit 'type'. */
    value?: number;
    /** Valid values are hour or day. */
    type?: string;
  }

  /** Feature information. */
  export interface SyndicationAuthorization {
    /** Array of syndicated namespaces. */
    token?: string;
    /** Date and time last updated. */
    last_run?: string;
  }

  /** Feature information. */
  export interface SyndicationCluster {
    /** Cluster region. */
    region?: string;
    /** Cluster ID. */
    id?: string;
    /** Cluster name. */
    name?: string;
    /** Resource group ID. */
    resource_group_name?: string;
    /** Syndication type. */
    type?: string;
    /** Syndicated namespaces. */
    namespaces?: string[];
    /** Syndicated to all namespaces on cluster. */
    all_namespaces?: boolean;
  }

  /** Feature information. */
  export interface SyndicationHistory {
    /** Array of syndicated namespaces. */
    namespaces?: string[];
    /** Array of syndicated namespaces. */
    clusters?: SyndicationCluster[];
    /** Date and time last syndicated. */
    last_run?: string;
  }

  /** Feature information. */
  export interface SyndicationResource {
    /** Remove related components. */
    remove_related_components?: boolean;
    /** Syndication clusters. */
    clusters?: SyndicationCluster[];
    /** Feature information. */
    history?: SyndicationHistory;
    /** Feature information. */
    authorization?: SyndicationAuthorization;
  }

  /** Target account context. */
  export interface TargetAccountContext {
    /** API Key. */
    api_key?: string;
    /** Trusted profile info. */
    trusted_profile?: TrustedProfileInfo;
    /** Unique identifier/name. */
    name?: string;
    /** Display name. */
    label?: string;
    /** Project ID. */
    project_id?: string;
  }

  /** Trusted profile info. */
  export interface TrustedProfileInfo {
    /** Trusted profile ID. */
    trusted_profile_id?: string;
    /** Catalog CRN. */
    catalog_crn?: string;
    /** Catalog name. */
    catalog_name?: string;
    /** Target service ID. */
    target_service_id?: string;
  }

  /** Offering URL proxy information. */
  export interface URLProxy {
    /** URL of the specified media item being proxied. */
    url?: string;
    /** SHA256 fingerprint of image. */
    sha?: string;
  }

  /** Validation response. */
  export interface Validation {
    /** Date and time of last successful validation. */
    validated?: string;
    /** Date and time of last validation was requested. */
    requested?: string;
    /** Current validation state - <empty>, in_progress, valid, invalid, expired. */
    state?: string;
    /** Last operation (e.g. submit_deployment, generate_installer, install_offering. */
    last_operation?: string;
    /** Validation target information (e.g. cluster_id, region, namespace, etc).  Values will vary by Content type. */
    target?: JsonObject;
    /** Any message needing to be conveyed as part of the validation job. */
    message?: string;
  }

  /** Offering version information. */
  export interface Version {
    /** Unique ID. */
    id?: string;
    /** Cloudant revision. */
    _rev?: string;
    /** Version's CRN. */
    crn?: string;
    /** Version of content type. */
    version?: string;
    /** Version Flavor Information.  Only supported for Product kind Solution. */
    flavor?: Flavor;
    /** hash of the content. */
    sha?: string;
    /** The date and time this version was created. */
    created?: string;
    /** The date and time this version was last updated. */
    updated?: string;
    /** Offering ID. */
    offering_id?: string;
    /** Catalog ID. */
    catalog_id?: string;
    /** Kind ID. */
    kind_id?: string;
    /** List of tags associated with this catalog. */
    tags?: string[];
    /** Content's repo URL. */
    repo_url?: string;
    /** Content's source URL (e.g git repo). */
    source_url?: string;
    /** File used to on-board this version. */
    tgz_url?: string;
    /** List of user solicited overrides. */
    configuration?: Configuration[];
    /** List of output values for this version. */
    outputs?: Output[];
    /** List of IAM permissions that are required to consume this version. */
    iam_permissions?: IAMPermission[];
    /** Open ended metadata information. */
    metadata?: JsonObject;
    /** Validation response. */
    validation?: Validation;
    /** Resource requirments for installation. */
    required_resources?: Resource[];
    /** Denotes if single instance can be deployed to a given cluster. */
    single_instance?: boolean;
    /** Environment values to be passed to Schematics Workspace on creation. */
    schematics_env_values?: SchematicsEnvValues;
    /** Script information. */
    install?: Script;
    /** Optional pre-install instructions. */
    pre_install?: Script[];
    /** A map of scripts to be run by a Project during a particular stage of a specified action.  Each key in the
     *  map must match the format "action"_"stage" in the specified ScriptRef.
     */
    scripts?: JsonObject;
    /** Entitlement license info. */
    entitlement?: VersionEntitlement;
    /** List of licenses the product was built with. */
    licenses?: License[];
    /** If set, denotes a url to a YAML file with list of container images used by this version. */
    image_manifest_url?: string;
    /** read only field, indicating if this version is deprecated. */
    deprecated?: boolean;
    /** Version of the package used to create this version. */
    package_version?: string;
    /** Offering state. */
    state?: State;
    /** A dotted value of `catalogID`.`versionID`. */
    version_locator?: string;
    /** Long description for version. */
    long_description?: string;
    /** A map of translated strings, by language code. */
    long_description_i18n?: JsonObject;
    /** Whitelisted accounts for version. */
    whitelisted_accounts?: string[];
    /** ID of the image pull key to use from Offering.ImagePullKeys. */
    image_pull_key_name?: string;
    /** Deprecation information for an Offering. */
    deprecate_pending?: DeprecatePending;
    /** Version Solution Information.  Only supported for Product kind Solution. */
    solution_info?: SolutionInfo;
    /** Is the version able to be shared. */
    is_consumable?: boolean;
    /** Compliance info for a version. */
    compliance_v3?: Compliance;
  }

  /** Entitlement license info. */
  export interface VersionEntitlement {
    /** Provider name. */
    provider_name?: string;
    /** Provider ID. */
    provider_id?: string;
    /** Product ID. */
    product_id?: string;
    /** list of license entitlement part numbers, eg. D1YGZLL,D1ZXILL. */
    part_numbers?: string[];
    /** Image repository name. */
    image_repo_name?: string;
  }

  /** Indicates if the current version can be upgraded to the version identified by the descriptor. */
  export interface VersionUpdateDescriptor {
    /** A dotted value of `catalogID`.`versionID`. */
    version_locator?: string;
    /** the version number of this version. */
    version?: string;
    /** Version Flavor Information.  Only supported for Product kind Solution. */
    flavor?: Flavor;
    /** Offering state. */
    state?: State;
    /** Resource requirments for installation. */
    required_resources?: Resource[];
    /** Version of package. */
    package_version?: string;
    /** The SHA value of this version. */
    sha?: string;
    /** true if the current version can be upgraded to this version, false otherwise. */
    can_update?: boolean;
    /** If can_update is false, this map will contain messages for each failed check, otherwise it will be omitted.
     *  Possible keys include nodes, cores, mem, disk, targetVersion, and install-permission-check.
     */
    messages?: JsonObject;
  }

  /*************************
   * pager classes
   ************************/

  /**
   * CatalogAccountAuditsPager can be used to simplify the use of listCatalogAccountAudits().
   */
  export class CatalogAccountAuditsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListCatalogAccountAuditsParams;

    /**
     * Construct a CatalogAccountAuditsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listCatalogAccountAudits()
     * @param {Object} [params] - The parameters to be passed to listCatalogAccountAudits()
     * @constructor
     * @returns {CatalogAccountAuditsPager}
     */
    constructor(client: CatalogManagementV1, params?: CatalogManagementV1.ListCatalogAccountAuditsParams) {
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
     * Returns the next page of results by invoking listCatalogAccountAudits().
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listCatalogAccountAudits(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.audits;
    }

    /**
     * Returns all results by invoking listCatalogAccountAudits() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      const results: AuditLogDigest[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * GetShareApprovalListPager can be used to simplify the use of getShareApprovalList().
   */
  export class GetShareApprovalListPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.GetShareApprovalListParams;

    /**
     * Construct a GetShareApprovalListPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke getShareApprovalList()
     * @param {Object} params - The parameters to be passed to getShareApprovalList()
     * @constructor
     * @returns {GetShareApprovalListPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.GetShareApprovalListParams) {
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
     * Returns the next page of results by invoking getShareApprovalList().
     * @returns {Promise<CatalogManagementV1.ShareApprovalAccess[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.ShareApprovalAccess[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.getShareApprovalList(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking getShareApprovalList() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.ShareApprovalAccess[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.ShareApprovalAccess[]> {
      const results: ShareApprovalAccess[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * GetShareApprovalListAsSourcePager can be used to simplify the use of getShareApprovalListAsSource().
   */
  export class GetShareApprovalListAsSourcePager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.GetShareApprovalListAsSourceParams;

    /**
     * Construct a GetShareApprovalListAsSourcePager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke getShareApprovalListAsSource()
     * @param {Object} params - The parameters to be passed to getShareApprovalListAsSource()
     * @constructor
     * @returns {GetShareApprovalListAsSourcePager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.GetShareApprovalListAsSourceParams) {
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
     * Returns the next page of results by invoking getShareApprovalListAsSource().
     * @returns {Promise<CatalogManagementV1.ShareApprovalAccess[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.ShareApprovalAccess[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.getShareApprovalListAsSource(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking getShareApprovalListAsSource() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.ShareApprovalAccess[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.ShareApprovalAccess[]> {
      const results: ShareApprovalAccess[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * CatalogAuditsPager can be used to simplify the use of listCatalogAudits().
   */
  export class CatalogAuditsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListCatalogAuditsParams;

    /**
     * Construct a CatalogAuditsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listCatalogAudits()
     * @param {Object} params - The parameters to be passed to listCatalogAudits()
     * @constructor
     * @returns {CatalogAuditsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.ListCatalogAuditsParams) {
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
     * Returns the next page of results by invoking listCatalogAudits().
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listCatalogAudits(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.audits;
    }

    /**
     * Returns all results by invoking listCatalogAudits() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      const results: AuditLogDigest[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * EnterpriseAuditsPager can be used to simplify the use of listEnterpriseAudits().
   */
  export class EnterpriseAuditsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListEnterpriseAuditsParams;

    /**
     * Construct a EnterpriseAuditsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listEnterpriseAudits()
     * @param {Object} params - The parameters to be passed to listEnterpriseAudits()
     * @constructor
     * @returns {EnterpriseAuditsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.ListEnterpriseAuditsParams) {
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
     * Returns the next page of results by invoking listEnterpriseAudits().
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listEnterpriseAudits(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.audits;
    }

    /**
     * Returns all results by invoking listEnterpriseAudits() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      const results: AuditLogDigest[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * GetConsumptionOfferingsPager can be used to simplify the use of getConsumptionOfferings().
   */
  export class GetConsumptionOfferingsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.GetConsumptionOfferingsParams;

    /**
     * Construct a GetConsumptionOfferingsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke getConsumptionOfferings()
     * @param {Object} [params] - The parameters to be passed to getConsumptionOfferings()
     * @constructor
     * @returns {GetConsumptionOfferingsPager}
     */
    constructor(client: CatalogManagementV1, params?: CatalogManagementV1.GetConsumptionOfferingsParams) {
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
     * Returns the next page of results by invoking getConsumptionOfferings().
     * @returns {Promise<CatalogManagementV1.Offering[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.Offering[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.getConsumptionOfferings(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = getQueryParam(result.next, 'offset');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking getConsumptionOfferings() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.Offering[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.Offering[]> {
      const results: Offering[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * OfferingsPager can be used to simplify the use of listOfferings().
   */
  export class OfferingsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListOfferingsParams;

    /**
     * Construct a OfferingsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listOfferings()
     * @param {Object} params - The parameters to be passed to listOfferings()
     * @constructor
     * @returns {OfferingsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.ListOfferingsParams) {
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
     * Returns the next page of results by invoking listOfferings().
     * @returns {Promise<CatalogManagementV1.Offering[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.Offering[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listOfferings(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = getQueryParam(result.next, 'offset');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listOfferings() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.Offering[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.Offering[]> {
      const results: Offering[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * OfferingAuditsPager can be used to simplify the use of listOfferingAudits().
   */
  export class OfferingAuditsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListOfferingAuditsParams;

    /**
     * Construct a OfferingAuditsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listOfferingAudits()
     * @param {Object} params - The parameters to be passed to listOfferingAudits()
     * @constructor
     * @returns {OfferingAuditsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.ListOfferingAuditsParams) {
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
     * Returns the next page of results by invoking listOfferingAudits().
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listOfferingAudits(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.audits;
    }

    /**
     * Returns all results by invoking listOfferingAudits() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      const results: AuditLogDigest[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * GetOfferingAccessListPager can be used to simplify the use of getOfferingAccessList().
   */
  export class GetOfferingAccessListPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.GetOfferingAccessListParams;

    /**
     * Construct a GetOfferingAccessListPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke getOfferingAccessList()
     * @param {Object} params - The parameters to be passed to getOfferingAccessList()
     * @constructor
     * @returns {GetOfferingAccessListPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.GetOfferingAccessListParams) {
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
     * Returns the next page of results by invoking getOfferingAccessList().
     * @returns {Promise<CatalogManagementV1.Access[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.Access[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.getOfferingAccessList(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking getOfferingAccessList() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.Access[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.Access[]> {
      const results: Access[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * GetNamespacesPager can be used to simplify the use of getNamespaces().
   */
  export class GetNamespacesPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.GetNamespacesParams;

    /**
     * Construct a GetNamespacesPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke getNamespaces()
     * @param {Object} params - The parameters to be passed to getNamespaces()
     * @constructor
     * @returns {GetNamespacesPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.GetNamespacesParams) {
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
     * Returns the next page of results by invoking getNamespaces().
     * @returns {Promise<string[]>}
     */
    public async getNext(): Promise<string[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.getNamespaces(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = getQueryParam(result.next, 'offset');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking getNamespaces() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<string[]>}
     */
    public async getAll(): Promise<string[]> {
      const results: string[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * SearchObjectsPager can be used to simplify the use of searchObjects().
   */
  export class SearchObjectsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.SearchObjectsParams;

    /**
     * Construct a SearchObjectsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke searchObjects()
     * @param {Object} params - The parameters to be passed to searchObjects()
     * @constructor
     * @returns {SearchObjectsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.SearchObjectsParams) {
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
     * Returns the next page of results by invoking searchObjects().
     * @returns {Promise<CatalogManagementV1.CatalogObject[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.CatalogObject[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.searchObjects(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = getQueryParam(result.next, 'offset');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking searchObjects() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.CatalogObject[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.CatalogObject[]> {
      const results: CatalogObject[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ObjectsPager can be used to simplify the use of listObjects().
   */
  export class ObjectsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListObjectsParams;

    /**
     * Construct a ObjectsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listObjects()
     * @param {Object} params - The parameters to be passed to listObjects()
     * @constructor
     * @returns {ObjectsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.ListObjectsParams) {
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
     * Returns the next page of results by invoking listObjects().
     * @returns {Promise<CatalogManagementV1.CatalogObject[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.CatalogObject[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.listObjects(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = getQueryParam(result.next, 'offset');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking listObjects() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.CatalogObject[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.CatalogObject[]> {
      const results: CatalogObject[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * ObjectAuditsPager can be used to simplify the use of listObjectAudits().
   */
  export class ObjectAuditsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListObjectAuditsParams;

    /**
     * Construct a ObjectAuditsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listObjectAudits()
     * @param {Object} params - The parameters to be passed to listObjectAudits()
     * @constructor
     * @returns {ObjectAuditsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.ListObjectAuditsParams) {
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
     * Returns the next page of results by invoking listObjectAudits().
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listObjectAudits(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.audits;
    }

    /**
     * Returns all results by invoking listObjectAudits() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      const results: AuditLogDigest[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * GetObjectAccessListPager can be used to simplify the use of getObjectAccessList().
   */
  export class GetObjectAccessListPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.GetObjectAccessListParams;

    /**
     * Construct a GetObjectAccessListPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke getObjectAccessList()
     * @param {Object} params - The parameters to be passed to getObjectAccessList()
     * @constructor
     * @returns {GetObjectAccessListPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.GetObjectAccessListParams) {
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
     * Returns the next page of results by invoking getObjectAccessList().
     * @returns {Promise<CatalogManagementV1.Access[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.Access[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.getObjectAccessList(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking getObjectAccessList() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.Access[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.Access[]> {
      const results: Access[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * GetObjectAccessListDeprecatedPager can be used to simplify the use of getObjectAccessListDeprecated().
   */
  export class GetObjectAccessListDeprecatedPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.GetObjectAccessListDeprecatedParams;

    /**
     * Construct a GetObjectAccessListDeprecatedPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke getObjectAccessListDeprecated()
     * @param {Object} params - The parameters to be passed to getObjectAccessListDeprecated()
     * @constructor
     * @returns {GetObjectAccessListDeprecatedPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.GetObjectAccessListDeprecatedParams) {
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
     * Returns the next page of results by invoking getObjectAccessListDeprecated().
     * @returns {Promise<CatalogManagementV1.Access[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.Access[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.offset = this.pageContext.next;
      }
      const response = await this.client.getObjectAccessListDeprecated(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = getQueryParam(result.next, 'offset');
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.resources;
    }

    /**
     * Returns all results by invoking getObjectAccessListDeprecated() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.Access[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.Access[]> {
      const results: Access[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }

  /**
   * OfferingInstanceAuditsPager can be used to simplify the use of listOfferingInstanceAudits().
   */
  export class OfferingInstanceAuditsPager {
    protected _hasNext: boolean;

    protected pageContext: any;

    protected client: CatalogManagementV1;

    protected params: CatalogManagementV1.ListOfferingInstanceAuditsParams;

    /**
     * Construct a OfferingInstanceAuditsPager object.
     *
     * @param {CatalogManagementV1}  client - The service client instance used to invoke listOfferingInstanceAudits()
     * @param {Object} params - The parameters to be passed to listOfferingInstanceAudits()
     * @constructor
     * @returns {OfferingInstanceAuditsPager}
     */
    constructor(client: CatalogManagementV1, params: CatalogManagementV1.ListOfferingInstanceAuditsParams) {
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
     * Returns the next page of results by invoking listOfferingInstanceAudits().
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getNext(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      if (!this.hasNext()) {
        throw new Error('No more results available');
      }

      if (this.pageContext.next) {
        this.params.start = this.pageContext.next;
      }
      const response = await this.client.listOfferingInstanceAudits(this.params);
      const { result } = response;

      let next;
      if (result && result.next) {
        next = result.next.start;
      }
      this.pageContext.next = next;
      if (!this.pageContext.next) {
        this._hasNext = false;
      }
      return result.audits;
    }

    /**
     * Returns all results by invoking listOfferingInstanceAudits() repeatedly until all pages of results have been retrieved.
     * @returns {Promise<CatalogManagementV1.AuditLogDigest[]>}
     */
    public async getAll(): Promise<CatalogManagementV1.AuditLogDigest[]> {
      const results: AuditLogDigest[] = [];
      while (this.hasNext()) {
        const nextPage = await this.getNext();
        results.push(...nextPage);
      }
      return results;
    }
  }
}

export = CatalogManagementV1;
