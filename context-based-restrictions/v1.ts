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
 * IBM OpenAPI SDK Code Generator Version: 3.79.0-2eb6af3d-20230905-174838
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
 * With the Context Based Restrictions API, you can:
 * * Create, list, get, replace, and delete network zones
 * * Create, list, get, replace, and delete context-based restriction rules
 * * Get account settings
 *
 * API Version: 1.0.1
 */

class ContextBasedRestrictionsV1 extends BaseService {
  static DEFAULT_SERVICE_URL: string = 'https://cbr.test.cloud.ibm.com';

  static DEFAULT_SERVICE_NAME: string = 'context_based_restrictions';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of ContextBasedRestrictionsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {ContextBasedRestrictionsV1}
   */

  public static newInstance(options: UserOptions): ContextBasedRestrictionsV1 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new ContextBasedRestrictionsV1(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a ContextBasedRestrictionsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {ContextBasedRestrictionsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(ContextBasedRestrictionsV1.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * zones
   ************************/

  /**
   * Create a network zone.
   *
   * This operation creates a network zone for the specified account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.name] - The name of the zone.
   * @param {string} [params.accountId] - The id of the account owning this zone.
   * @param {Address[]} [params.addresses] - The list of addresses in the zone.
   * @param {string} [params.description] - The description of the zone.
   * @param {Address[]} [params.excluded] - The list of excluded addresses in the zone. Only addresses of type
   * `ipAddress`, `ipRange`, and `subnet` can be excluded.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Zone>>}
   */
  public createZone(
    params?: ContextBasedRestrictionsV1.CreateZoneParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Zone>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'name',
      'accountId',
      'addresses',
      'description',
      'excluded',
      'xCorrelationId',
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
      'addresses': _params.addresses,
      'description': _params.description,
      'excluded': _params.excluded,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createZone'
    );

    const parameters = {
      options: {
        url: '/v1/zones',
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
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List network zones.
   *
   * This operation lists network zones in the specified account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The ID of the managing account.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {string} [params.name] - The name of the zone.
   * @param {string} [params.sort] - Sorts results by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.ZoneList>>}
   */
  public listZones(
    params: ContextBasedRestrictionsV1.ListZonesParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.ZoneList>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'xCorrelationId',
      'transactionId',
      'name',
      'sort',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'name': _params.name,
      'sort': _params.sort,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listZones'
    );

    const parameters = {
      options: {
        url: '/v1/zones',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a network zone.
   *
   * This operation retrieves the network zone identified by the specified zone ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - The ID of a zone.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Zone>>}
   */
  public getZone(
    params: ContextBasedRestrictionsV1.GetZoneParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Zone>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'xCorrelationId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getZone'
    );

    const parameters = {
      options: {
        url: '/v1/zones/{zone_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Replace a network zone.
   *
   * This operation replaces the network zone identified by the specified zone ID. Partial updates are not supported.
   * The entire network zone object must be replaced.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - The ID of a zone.
   * @param {string} params.ifMatch - The current revision of the resource being updated. This can be found in the
   * Create/Get/Update resource response ETag header.
   * @param {string} [params.name] - The name of the zone.
   * @param {string} [params.accountId] - The id of the account owning this zone.
   * @param {Address[]} [params.addresses] - The list of addresses in the zone.
   * @param {string} [params.description] - The description of the zone.
   * @param {Address[]} [params.excluded] - The list of excluded addresses in the zone. Only addresses of type
   * `ipAddress`, `ipRange`, and `subnet` can be excluded.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Zone>>}
   */
  public replaceZone(
    params: ContextBasedRestrictionsV1.ReplaceZoneParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Zone>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId', 'ifMatch'];
    const _validParams = [
      'zoneId',
      'ifMatch',
      'name',
      'accountId',
      'addresses',
      'description',
      'excluded',
      'xCorrelationId',
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
      'addresses': _params.addresses,
      'description': _params.description,
      'excluded': _params.excluded,
    };

    const path = {
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceZone'
    );

    const parameters = {
      options: {
        url: '/v1/zones/{zone_id}',
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
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a network zone.
   *
   * This operation deletes the network zone identified by the specified zone ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.zoneId - The ID of a zone.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.EmptyObject>>}
   */
  public deleteZone(
    params: ContextBasedRestrictionsV1.DeleteZoneParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['zoneId'];
    const _validParams = ['zoneId', 'xCorrelationId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'zone_id': _params.zoneId,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteZone'
    );

    const parameters = {
      options: {
        url: '/v1/zones/{zone_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List available service reference targets.
   *
   * This operation lists all available service reference targets.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {string} [params.type] - Specifies the types of services to retrieve.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.ServiceRefTargetList>>}
   */
  public listAvailableServicerefTargets(
    params?: ContextBasedRestrictionsV1.ListAvailableServicerefTargetsParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.ServiceRefTargetList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = ['xCorrelationId', 'transactionId', 'type', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'type': _params.type,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAvailableServicerefTargets'
    );

    const parameters = {
      options: {
        url: '/v1/zones/serviceref_targets',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * rules
   ************************/

  /**
   * Create a rule.
   *
   * This operation creates a rule for the specified account.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {RuleContext[]} [params.contexts] - The contexts this rule applies to.
   * @param {Resource[]} [params.resources] - The resources this rule apply to.
   * @param {string} [params.description] - The description of the rule.
   * @param {NewRuleOperations} [params.operations] - The operations this rule applies to.
   * @param {string} [params.enforcementMode] - The rule enforcement mode:
   *  * `enabled` - The restrictions are enforced and reported. This is the default.
   *  * `disabled` - The restrictions are disabled. Nothing is enforced or reported.
   *  * `report` - The restrictions are evaluated and reported, but not enforced.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Rule>>}
   */
  public createRule(
    params?: ContextBasedRestrictionsV1.CreateRuleParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'contexts',
      'resources',
      'description',
      'operations',
      'enforcementMode',
      'xCorrelationId',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'contexts': _params.contexts,
      'resources': _params.resources,
      'description': _params.description,
      'operations': _params.operations,
      'enforcement_mode': _params.enforcementMode,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'createRule'
    );

    const parameters = {
      options: {
        url: '/v1/rules',
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
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * List rules.
   *
   * This operation lists rules in the specified account.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The ID of the managing account.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {string} [params.region] - The `region` resource attribute.
   * @param {string} [params.resource] - The `resource` resource attribute.
   * @param {string} [params.resourceType] - The `resourceType` resource attribute.
   * @param {string} [params.serviceInstance] - The `serviceInstance` resource attribute.
   * @param {string} [params.serviceName] - The `serviceName` resource attribute.
   * @param {string} [params.serviceType] - The rule's `serviceType` resource attribute.
   * @param {string} [params.serviceGroupId] - The rule's `service_group_id` resource attribute.
   * @param {string} [params.zoneId] - The globally unique ID of the zone.
   * @param {string} [params.sort] - Sorts results by using a valid sort field. To learn more, see
   * [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
   * @param {string} [params.enforcementMode] - The rule's `enforcement_mode` attribute.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.RuleList>>}
   */
  public listRules(
    params: ContextBasedRestrictionsV1.ListRulesParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.RuleList>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = [
      'accountId',
      'xCorrelationId',
      'transactionId',
      'region',
      'resource',
      'resourceType',
      'serviceInstance',
      'serviceName',
      'serviceType',
      'serviceGroupId',
      'zoneId',
      'sort',
      'enforcementMode',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'account_id': _params.accountId,
      'region': _params.region,
      'resource': _params.resource,
      'resource_type': _params.resourceType,
      'service_instance': _params.serviceInstance,
      'service_name': _params.serviceName,
      'service_type': _params.serviceType,
      'service_group_id': _params.serviceGroupId,
      'zone_id': _params.zoneId,
      'sort': _params.sort,
      'enforcement_mode': _params.enforcementMode,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listRules'
    );

    const parameters = {
      options: {
        url: '/v1/rules',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Get a rule.
   *
   * This operation retrieves the rule identified by the specified rule ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - The ID of a rule.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Rule>>}
   */
  public getRule(
    params: ContextBasedRestrictionsV1.GetRuleParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['ruleId'];
    const _validParams = ['ruleId', 'xCorrelationId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getRule'
    );

    const parameters = {
      options: {
        url: '/v1/rules/{rule_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Replace a rule.
   *
   * This operation replaces the rule identified by the specified rule ID. Partial updates are not supported. The entire
   * rule object must be replaced.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - The ID of a rule.
   * @param {string} params.ifMatch - The current revision of the resource being updated. This can be found in the
   * Create/Get/Update resource response ETag header.
   * @param {RuleContext[]} [params.contexts] - The contexts this rule applies to.
   * @param {Resource[]} [params.resources] - The resources this rule apply to.
   * @param {string} [params.description] - The description of the rule.
   * @param {NewRuleOperations} [params.operations] - The operations this rule applies to.
   * @param {string} [params.enforcementMode] - The rule enforcement mode:
   *  * `enabled` - The restrictions are enforced and reported. This is the default.
   *  * `disabled` - The restrictions are disabled. Nothing is enforced or reported.
   *  * `report` - The restrictions are evaluated and reported, but not enforced.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Rule>>}
   */
  public replaceRule(
    params: ContextBasedRestrictionsV1.ReplaceRuleParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.Rule>> {
    const _params = { ...params };
    const _requiredParams = ['ruleId', 'ifMatch'];
    const _validParams = [
      'ruleId',
      'ifMatch',
      'contexts',
      'resources',
      'description',
      'operations',
      'enforcementMode',
      'xCorrelationId',
      'transactionId',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'contexts': _params.contexts,
      'resources': _params.resources,
      'description': _params.description,
      'operations': _params.operations,
      'enforcement_mode': _params.enforcementMode,
    };

    const path = {
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'replaceRule'
    );

    const parameters = {
      options: {
        url: '/v1/rules/{rule_id}',
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
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }

  /**
   * Delete a rule.
   *
   * This operation deletes the rule identified by the specified rule ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.ruleId - The ID of a rule.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.EmptyObject>>}
   */
  public deleteRule(
    params: ContextBasedRestrictionsV1.DeleteRuleParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.EmptyObject>> {
    const _params = { ...params };
    const _requiredParams = ['ruleId'];
    const _validParams = ['ruleId', 'xCorrelationId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'rule_id': _params.ruleId,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'deleteRule'
    );

    const parameters = {
      options: {
        url: '/v1/rules/{rule_id}',
        method: 'DELETE',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'X-Correlation-Id': _params.xCorrelationId,
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
   * This operation retrieves the settings for the specified account ID.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.accountId - The ID of the account the settings are for.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.AccountSettings>>}
   */
  public getAccountSettings(
    params: ContextBasedRestrictionsV1.GetAccountSettingsParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.AccountSettings>> {
    const _params = { ...params };
    const _requiredParams = ['accountId'];
    const _validParams = ['accountId', 'xCorrelationId', 'transactionId', 'headers'];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const path = {
      'account_id': _params.accountId,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'getAccountSettings'
    );

    const parameters = {
      options: {
        url: '/v1/account_settings/{account_id}',
        method: 'GET',
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
            'Transaction-Id': _params.transactionId,
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
  /*************************
   * operations
   ************************/

  /**
   * List available service operations.
   *
   * This operation lists all available service operations.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.xCorrelationId] - The supplied or generated value of this header is logged for a request
   * and repeated in a response header for the corresponding response. The same value is used for downstream requests
   * and retries of those requests. If a value of this headers is not supplied in a request, the service generates a
   * random (version 4) UUID.
   * @param {string} [params.transactionId] - Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id`
   * header. It is supported for backward compatibility with other IBM platform services that support the
   * `Transaction-Id` header only. If both `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has
   * the precedence over `Transaction-Id`.
   * @param {string} [params.serviceName] - The name of the service.
   * @param {string} [params.serviceGroupId] - The id of the service group.
   * @param {string} [params.resourceType] - The type of resource.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.OperationsList>>}
   */
  public listAvailableServiceOperations(
    params?: ContextBasedRestrictionsV1.ListAvailableServiceOperationsParams
  ): Promise<ContextBasedRestrictionsV1.Response<ContextBasedRestrictionsV1.OperationsList>> {
    const _params = { ...params };
    const _requiredParams = [];
    const _validParams = [
      'xCorrelationId',
      'transactionId',
      'serviceName',
      'serviceGroupId',
      'resourceType',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const query = {
      'service_name': _params.serviceName,
      'service_group_id': _params.serviceGroupId,
      'resource_type': _params.resourceType,
    };

    const sdkHeaders = getSdkHeaders(
      ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'listAvailableServiceOperations'
    );

    const parameters = {
      options: {
        url: '/v1/operations',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'X-Correlation-Id': _params.xCorrelationId,
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

namespace ContextBasedRestrictionsV1 {
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

  /** Parameters for the `createZone` operation. */
  export interface CreateZoneParams {
    /** The name of the zone. */
    name?: string;
    /** The id of the account owning this zone. */
    accountId?: string;
    /** The list of addresses in the zone. */
    addresses?: Address[];
    /** The description of the zone. */
    description?: string;
    /** The list of excluded addresses in the zone. Only addresses of type `ipAddress`, `ipRange`, and `subnet` can
     *  be excluded.
     */
    excluded?: Address[];
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listZones` operation. */
  export interface ListZonesParams {
    /** The ID of the managing account. */
    accountId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    /** The name of the zone. */
    name?: string;
    /** Sorts results by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getZone` operation. */
  export interface GetZoneParams {
    /** The ID of a zone. */
    zoneId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceZone` operation. */
  export interface ReplaceZoneParams {
    /** The ID of a zone. */
    zoneId: string;
    /** The current revision of the resource being updated. This can be found in the Create/Get/Update resource
     *  response ETag header.
     */
    ifMatch: string;
    /** The name of the zone. */
    name?: string;
    /** The id of the account owning this zone. */
    accountId?: string;
    /** The list of addresses in the zone. */
    addresses?: Address[];
    /** The description of the zone. */
    description?: string;
    /** The list of excluded addresses in the zone. Only addresses of type `ipAddress`, `ipRange`, and `subnet` can
     *  be excluded.
     */
    excluded?: Address[];
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteZone` operation. */
  export interface DeleteZoneParams {
    /** The ID of a zone. */
    zoneId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAvailableServicerefTargets` operation. */
  export interface ListAvailableServicerefTargetsParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    /** Specifies the types of services to retrieve. */
    type?: ListAvailableServicerefTargetsConstants.Type | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listAvailableServicerefTargets` operation. */
  export namespace ListAvailableServicerefTargetsConstants {
    /** Specifies the types of services to retrieve. */
    export enum Type {
      ALL = 'all',
      PLATFORM_SERVICE = 'platform_service',
    }
  }

  /** Parameters for the `createRule` operation. */
  export interface CreateRuleParams {
    /** The contexts this rule applies to. */
    contexts?: RuleContext[];
    /** The resources this rule apply to. */
    resources?: Resource[];
    /** The description of the rule. */
    description?: string;
    /** The operations this rule applies to. */
    operations?: NewRuleOperations;
    /** The rule enforcement mode:
     *   * `enabled` - The restrictions are enforced and reported. This is the default.
     *   * `disabled` - The restrictions are disabled. Nothing is enforced or reported.
     *   * `report` - The restrictions are evaluated and reported, but not enforced.
     */
    enforcementMode?: CreateRuleConstants.EnforcementMode | string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createRule` operation. */
  export namespace CreateRuleConstants {
    /** The rule enforcement mode: * `enabled` - The restrictions are enforced and reported. This is the default. * `disabled` - The restrictions are disabled. Nothing is enforced or reported. * `report` - The restrictions are evaluated and reported, but not enforced. */
    export enum EnforcementMode {
      ENABLED = 'enabled',
      DISABLED = 'disabled',
      REPORT = 'report',
    }
  }

  /** Parameters for the `listRules` operation. */
  export interface ListRulesParams {
    /** The ID of the managing account. */
    accountId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    /** The `region` resource attribute. */
    region?: string;
    /** The `resource` resource attribute. */
    resource?: string;
    /** The `resourceType` resource attribute. */
    resourceType?: string;
    /** The `serviceInstance` resource attribute. */
    serviceInstance?: string;
    /** The `serviceName` resource attribute. */
    serviceName?: string;
    /** The rule's `serviceType` resource attribute. */
    serviceType?: string;
    /** The rule's `service_group_id` resource attribute. */
    serviceGroupId?: string;
    /** The globally unique ID of the zone. */
    zoneId?: string;
    /** Sorts results by using a valid sort field. To learn more, see
     *  [Sorting](https://cloud.ibm.com/docs/api-handbook?topic=api-handbook-sorting).
     */
    sort?: string;
    /** The rule's `enforcement_mode` attribute. */
    enforcementMode?: ListRulesConstants.EnforcementMode | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `listRules` operation. */
  export namespace ListRulesConstants {
    /** The rule's `enforcement_mode` attribute. */
    export enum EnforcementMode {
      ENABLED = 'enabled',
      DISABLED = 'disabled',
      REPORT = 'report',
    }
  }

  /** Parameters for the `getRule` operation. */
  export interface GetRuleParams {
    /** The ID of a rule. */
    ruleId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `replaceRule` operation. */
  export interface ReplaceRuleParams {
    /** The ID of a rule. */
    ruleId: string;
    /** The current revision of the resource being updated. This can be found in the Create/Get/Update resource
     *  response ETag header.
     */
    ifMatch: string;
    /** The contexts this rule applies to. */
    contexts?: RuleContext[];
    /** The resources this rule apply to. */
    resources?: Resource[];
    /** The description of the rule. */
    description?: string;
    /** The operations this rule applies to. */
    operations?: NewRuleOperations;
    /** The rule enforcement mode:
     *   * `enabled` - The restrictions are enforced and reported. This is the default.
     *   * `disabled` - The restrictions are disabled. Nothing is enforced or reported.
     *   * `report` - The restrictions are evaluated and reported, but not enforced.
     */
    enforcementMode?: ReplaceRuleConstants.EnforcementMode | string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `replaceRule` operation. */
  export namespace ReplaceRuleConstants {
    /** The rule enforcement mode: * `enabled` - The restrictions are enforced and reported. This is the default. * `disabled` - The restrictions are disabled. Nothing is enforced or reported. * `report` - The restrictions are evaluated and reported, but not enforced. */
    export enum EnforcementMode {
      ENABLED = 'enabled',
      DISABLED = 'disabled',
      REPORT = 'report',
    }
  }

  /** Parameters for the `deleteRule` operation. */
  export interface DeleteRuleParams {
    /** The ID of a rule. */
    ruleId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getAccountSettings` operation. */
  export interface GetAccountSettingsParams {
    /** The ID of the account the settings are for. */
    accountId: string;
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listAvailableServiceOperations` operation. */
  export interface ListAvailableServiceOperationsParams {
    /** The supplied or generated value of this header is logged for a request and repeated in a response header for
     *  the corresponding response. The same value is used for downstream requests and retries of those requests. If a
     *  value of this headers is not supplied in a request, the service generates a random (version 4) UUID.
     */
    xCorrelationId?: string;
    /** Deprecated: The `Transaction-Id` header behaves as the `X-Correlation-Id` header. It is supported for
     *  backward compatibility with other IBM platform services that support the `Transaction-Id` header only. If both
     *  `X-Correlation-Id` and `Transaction-Id` are provided, `X-Correlation-Id` has the precedence over
     *  `Transaction-Id`.
     */
    transactionId?: string;
    /** The name of the service. */
    serviceName?: string;
    /** The id of the service group. */
    serviceGroupId?: string;
    /** The type of resource. */
    resourceType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** Service API Type details. */
  export interface APIType {
    /** The id of the API type. */
    api_type_id: string;
    /** The displayed name of the API type. */
    display_name: string;
    /** The description of the API type. */
    description: string;
    /** The actions available for the API type. */
    actions: Action[];
  }

  /** An output account settings. */
  export interface AccountSettings {
    /** The globally unique ID of the account settings. */
    id: string;
    /** The account settings CRN. */
    crn: string;
    /** the max number of rules allowed for the account. */
    rule_count_limit: number;
    /** the max number of zones allowed for the account. */
    zone_count_limit: number;
    /** the current number of rules used by the account. */
    current_rule_count: number;
    /** the current number of zones used by the account. */
    current_zone_count: number;
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** Service API Type actions. */
  export interface Action {
    /** The id of the action. */
    action_id: string;
    /** The description of the action. */
    description: string;
  }

  /** A zone address. */
  export interface Address {
    /** The type of address. */
    type?: string;
  }

  /** The operations this rule applies to. */
  export interface NewRuleOperations {
    /** The API types this rule applies to. */
    api_types: NewRuleOperationsApiTypesItem[];
  }

  /** NewRuleOperationsApiTypesItem. */
  export interface NewRuleOperationsApiTypesItem {
    api_type_id: string;
  }

  /** The response object of the `list_available_service_operations` operation. */
  export interface OperationsList {
    /** The returned API types. */
    api_types: APIType[];
  }

  /** An rule resource. */
  export interface Resource {
    /** The resource attributes. */
    attributes: ResourceAttribute[];
    /** The optional resource tags. */
    tags?: ResourceTagAttribute[];
  }

  /** A rule resource attribute. */
  export interface ResourceAttribute {
    /** The attribute name. */
    name: string;
    /** The attribute value. */
    value: string;
    /** The attribute operator. */
    operator?: string;
  }

  /** A rule resource tag attribute. */
  export interface ResourceTagAttribute {
    /** The tag attribute name. */
    name: string;
    /** The tag attribute value. */
    value: string;
    /** The attribute operator. */
    operator?: string;
  }

  /** An output rule. */
  export interface Rule {
    /** The globally unique ID of the rule. */
    id: string;
    /** The rule CRN. */
    crn: string;
    /** The description of the rule. */
    description: string;
    /** The contexts this rule applies to. */
    contexts: RuleContext[];
    /** The resources this rule apply to. */
    resources: Resource[];
    /** The operations this rule applies to. */
    operations?: NewRuleOperations;
    /** The rule enforcement mode:
     *   * `enabled` - The restrictions are enforced and reported. This is the default.
     *   * `disabled` - The restrictions are disabled. Nothing is enforced or reported.
     *   * `report` - The restrictions are evaluated and reported, but not enforced.
     */
    enforcement_mode?: string;
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** A rule context. */
  export interface RuleContext {
    /** The attributes. */
    attributes: RuleContextAttribute[];
  }

  /** An rule context attribute. */
  export interface RuleContextAttribute {
    /** The attribute name. */
    name: string;
    /** The attribute value. */
    value: string;
  }

  /** The response object of the ListRules operation. */
  export interface RuleList {
    /** The number of returned results. */
    count: number;
    /** The returned rules. */
    rules: Rule[];
  }

  /** Summary information about a service reference target. */
  export interface ServiceRefTarget {
    /** The name of the service. */
    service_name: string;
    /** The type of the service. */
    service_type?: string;
    /** The locations the service is available. */
    locations?: ServiceRefTargetLocationsItem[];
  }

  /** A list of service reference targets. */
  export interface ServiceRefTargetList {
    /** The number of returned results. */
    count: number;
    /** The list of service reference targets. */
    targets: ServiceRefTarget[];
  }

  /** ServiceRefTargetLocationsItem. */
  export interface ServiceRefTargetLocationsItem {
    /** The location name. */
    name: string;
  }

  /** A service reference value. */
  export interface ServiceRefValue {
    /** The id of the account owning the service. */
    account_id: string;
    /** The service type. */
    service_type?: string;
    /** The service name. */
    service_name?: string;
    /** The service instance. */
    service_instance?: string;
    /** The location. */
    location?: string;
  }

  /** An output zone. */
  export interface Zone {
    /** The globally unique ID of the zone. */
    id: string;
    /** The zone CRN. */
    crn: string;
    /** The number of addresses in the zone. */
    address_count: number;
    /** The number of excluded addresses in the zone. */
    excluded_count: number;
    /** The name of the zone. */
    name: string;
    /** The id of the account owning this zone. */
    account_id: string;
    /** The description of the zone. */
    description: string;
    /** The list of addresses in the zone. */
    addresses: Address[];
    /** The list of excluded addresses in the zone. Only addresses of type `ipAddress`, `ipRange`, and `subnet` can
     *  be excluded.
     */
    excluded: Address[];
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** The response object of the ListZones operation. */
  export interface ZoneList {
    /** The number of returned results. */
    count: number;
    /** The returned zones. */
    zones: ZoneSummary[];
  }

  /** An output zone summary. */
  export interface ZoneSummary {
    /** The globally unique ID of the zone. */
    id: string;
    /** The zone CRN. */
    crn: string;
    /** The name of the zone. */
    name: string;
    /** The description of the zone. */
    description?: string;
    /** A preview of addresses in the zone (3 addresses maximum). */
    addresses_preview: Address[];
    /** The number of addresses in the zone. */
    address_count: number;
    /** The number of excluded addresses in the zone. */
    excluded_count: number;
    /** The href link to the resource. */
    href: string;
    /** The time the resource was created. */
    created_at: string;
    /** IAM ID of the user or service which created the resource. */
    created_by_id: string;
    /** The last time the resource was modified. */
    last_modified_at: string;
    /** IAM ID of the user or service which modified the resource. */
    last_modified_by_id: string;
  }

  /** A single IP address. */
  export interface AddressIPAddress extends Address {
    /** The type of address. */
    type: string;
    /** The IP address. */
    value: string;
  }

  /** An IP address range. */
  export interface AddressIPAddressRange extends Address {
    /** The type of address. */
    type: string;
    /** The ip range in <first-ip>-<last-ip> format. */
    value: string;
  }

  /** A service reference. */
  export interface AddressServiceRef extends Address {
    /** The type of address. */
    type: string;
    /** A service reference value. */
    ref: ServiceRefValue;
  }

  /** A subnet in CIDR format. */
  export interface AddressSubnet extends Address {
    /** The type of address. */
    type: string;
    /** The subnet in CIDR format. */
    value: string;
  }

  /** A single VPC address. */
  export interface AddressVPC extends Address {
    /** The type of address. */
    type: string;
    /** The VPC CRN. */
    value: string;
  }
}

export = ContextBasedRestrictionsV1;
