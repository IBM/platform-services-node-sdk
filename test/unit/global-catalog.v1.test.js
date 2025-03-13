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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator } = sdkCorePackage;
const GlobalCatalogV1 = require('../../dist/global-catalog/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const globalCatalogServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://globalcatalog.cloud.ibm.com/api/v1',
};

const globalCatalogService = new GlobalCatalogV1(globalCatalogServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(globalCatalogService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('GlobalCatalogV1', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = GlobalCatalogV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(GlobalCatalogV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(GlobalCatalogV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(GlobalCatalogV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = GlobalCatalogV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(GlobalCatalogV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new GlobalCatalogV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new GlobalCatalogV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(GlobalCatalogV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('listCatalogEntries', () => {
    describe('positive tests', () => {
      function __listCatalogEntriesTest() {
        // Construct the params object for operation listCatalogEntries
        const account = 'testString';
        const include = 'testString';
        const q = 'testString';
        const sortBy = 'testString';
        const descending = 'testString';
        const languages = 'testString';
        const catalog = true;
        const complete = true;
        const offset = 0;
        const limit = 50;
        const listCatalogEntriesParams = {
          account,
          include,
          q,
          sortBy,
          descending,
          languages,
          catalog,
          complete,
          offset,
          limit,
        };

        const listCatalogEntriesResult =
          globalCatalogService.listCatalogEntries(listCatalogEntriesParams);

        // all methods should return a Promise
        expectToBePromise(listCatalogEntriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.qs.include).toEqual(include);
        expect(mockRequestOptions.qs.q).toEqual(q);
        expect(mockRequestOptions.qs['sort-by']).toEqual(sortBy);
        expect(mockRequestOptions.qs.descending).toEqual(descending);
        expect(mockRequestOptions.qs.languages).toEqual(languages);
        expect(mockRequestOptions.qs.catalog).toEqual(catalog);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.qs._offset).toEqual(offset);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCatalogEntriesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __listCatalogEntriesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __listCatalogEntriesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCatalogEntriesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.listCatalogEntries(listCatalogEntriesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalCatalogService.listCatalogEntries({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('createCatalogEntry', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Overview
      const overviewModel = {
        display_name: 'testString',
        long_description: 'testString',
        description: 'testString',
        featured_description: 'testString',
      };

      // Image
      const imageModel = {
        image: 'testString',
        small_image: 'testString',
        medium_image: 'testString',
        feature_image: 'testString',
      };

      // Provider
      const providerModel = {
        email: 'testString',
        name: 'testString',
        contact: 'testString',
        support_email: 'testString',
        phone: 'testString',
      };

      // CFMetaData
      const cfMetaDataModel = {
        type: 'testString',
        iam_compatible: true,
        unique_api_key: true,
        provisionable: true,
        bindable: true,
        async_provisioning_supported: true,
        async_unprovisioning_supported: true,
        requires: ['testString'],
        plan_updateable: true,
        state: 'testString',
        service_check_enabled: true,
        test_check_interval: 38,
        service_key_supported: true,
        cf_guid: { 'key1': 'testString' },
      };

      // PlanMetaData
      const planMetaDataModel = {
        bindable: true,
        reservable: true,
        allow_internal_users: true,
        async_provisioning_supported: true,
        async_unprovisioning_supported: true,
        test_check_interval: 38,
        single_scope_instance: 'testString',
        service_check_enabled: true,
        cf_guid: { 'key1': 'testString' },
      };

      // AliasMetaData
      const aliasMetaDataModel = {
        type: 'testString',
        plan_id: 'testString',
      };

      // SourceMetaData
      const sourceMetaDataModel = {
        path: 'testString',
        type: 'testString',
        url: 'testString',
      };

      // TemplateMetaData
      const templateMetaDataModel = {
        services: ['testString'],
        default_memory: 38,
        start_cmd: 'testString',
        source: sourceMetaDataModel,
        runtime_catalog_id: 'testString',
        cf_runtime_id: 'testString',
        template_id: 'testString',
        executable_file: 'testString',
        buildpack: 'testString',
        environment_variables: { 'key1': 'testString' },
      };

      // Bullets
      const bulletsModel = {
        title: 'testString',
        description: 'testString',
        icon: 'testString',
        quantity: 38,
      };

      // UIMediaSourceMetaData
      const uiMediaSourceMetaDataModel = {
        type: 'testString',
        url: 'testString',
      };

      // UIMetaMedia
      const uiMetaMediaModel = {
        caption: 'testString',
        thumbnail_url: 'testString',
        type: 'testString',
        URL: 'testString',
        source: [uiMediaSourceMetaDataModel],
      };

      // Strings
      const stringsModel = {
        bullets: [bulletsModel],
        media: [uiMetaMediaModel],
        not_creatable_msg: 'testString',
        not_creatable__robot_msg: 'testString',
        deprecation_warning: 'testString',
        popup_warning_message: 'testString',
        instruction: 'testString',
      };

      // URLS
      const urlsModel = {
        doc_url: 'testString',
        instructions_url: 'testString',
        api_url: 'testString',
        create_url: 'testString',
        sdk_download_url: 'testString',
        terms_url: 'testString',
        custom_create_page_url: 'testString',
        catalog_details_url: 'testString',
        deprecation_doc_url: 'testString',
        dashboard_url: 'testString',
        registration_url: 'testString',
        apidocsurl: 'testString',
      };

      // UIMetaData
      const uiMetaDataModel = {
        strings: { 'key1': stringsModel },
        urls: urlsModel,
        embeddable_dashboard: 'testString',
        embeddable_dashboard_full_width: true,
        navigation_order: ['testString'],
        not_creatable: true,
        primary_offering_id: 'testString',
        accessible_during_provision: true,
        side_by_side_index: 38,
        end_of_service_time: '2019-01-01T12:00:00.000Z',
        hidden: true,
        hide_lite_metering: true,
        no_upgrade_next_step: true,
      };

      // DRMetaData
      const drMetaDataModel = {
        dr: true,
        description: 'testString',
      };

      // SLAMetaData
      const slaMetaDataModel = {
        terms: 'testString',
        tenancy: 'testString',
        provisioning: 72.5,
        responsiveness: 72.5,
        dr: drMetaDataModel,
      };

      // Callbacks
      const callbacksModel = {
        controller_url: 'testString',
        broker_url: 'testString',
        broker_proxy_url: 'testString',
        dashboard_url: 'testString',
        dashboard_data_url: 'testString',
        dashboard_detail_tab_url: 'testString',
        dashboard_detail_tab_ext_url: 'testString',
        service_monitor_api: 'testString',
        service_monitor_app: 'testString',
        api_endpoint: { 'key1': 'testString' },
      };

      // Price
      const priceModel = {
        quantity_tier: 38,
        price: 72.5,
      };

      // Amount
      const amountModel = {
        country: 'testString',
        currency: 'testString',
        prices: [priceModel],
      };

      // StartingPrice
      const startingPriceModel = {
        plan_id: 'testString',
        deployment_id: 'testString',
        unit: 'testString',
        amount: [amountModel],
      };

      // PricingSet
      const pricingSetModel = {
        type: 'testString',
        origin: 'testString',
        starting_price: startingPriceModel,
      };

      // Broker
      const brokerModel = {
        name: 'testString',
        guid: 'testString',
      };

      // DeploymentBase
      const deploymentBaseModel = {
        location: 'testString',
        location_url: 'testString',
        original_location: 'testString',
        target_crn: 'testString',
        service_crn: 'testString',
        mccp_id: 'testString',
        broker: brokerModel,
        supports_rc_migration: true,
        target_network: 'testString',
      };

      // ObjectMetadataSet
      const objectMetadataSetModel = {
        rc_compatible: true,
        service: cfMetaDataModel,
        plan: planMetaDataModel,
        alias: aliasMetaDataModel,
        template: templateMetaDataModel,
        ui: uiMetaDataModel,
        compliance: ['testString'],
        sla: slaMetaDataModel,
        callbacks: callbacksModel,
        original_name: 'testString',
        version: 'testString',
        other: { anyKey: 'anyValue' },
        pricing: pricingSetModel,
        deployment: deploymentBaseModel,
      };

      function __createCatalogEntryTest() {
        // Construct the params object for operation createCatalogEntry
        const name = 'testString';
        const kind = 'service';
        const overviewUi = { 'key1': overviewModel };
        const images = imageModel;
        const disabled = true;
        const tags = ['testString'];
        const provider = providerModel;
        const id = 'testString';
        const parentId = 'testString';
        const group = true;
        const active = true;
        const url = 'testString';
        const metadata = objectMetadataSetModel;
        const account = 'testString';
        const createCatalogEntryParams = {
          name,
          kind,
          overviewUi,
          images,
          disabled,
          tags,
          provider,
          id,
          parentId,
          group,
          active,
          url,
          metadata,
          account,
        };

        const createCatalogEntryResult =
          globalCatalogService.createCatalogEntry(createCatalogEntryParams);

        // all methods should return a Promise
        expectToBePromise(createCatalogEntryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.overview_ui).toEqual(overviewUi);
        expect(mockRequestOptions.body.images).toEqual(images);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.provider).toEqual(provider);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.parent_id).toEqual(parentId);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.active).toEqual(active);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.qs.account).toEqual(account);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCatalogEntryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __createCatalogEntryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __createCatalogEntryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'testString';
        const kind = 'service';
        const overviewUi = { 'key1': overviewModel };
        const images = imageModel;
        const disabled = true;
        const tags = ['testString'];
        const provider = providerModel;
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCatalogEntryParams = {
          name,
          kind,
          overviewUi,
          images,
          disabled,
          tags,
          provider,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.createCatalogEntry(createCatalogEntryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.createCatalogEntry({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.createCatalogEntry();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCatalogEntry', () => {
    describe('positive tests', () => {
      function __getCatalogEntryTest() {
        // Construct the params object for operation getCatalogEntry
        const id = 'testString';
        const account = 'testString';
        const include = 'testString';
        const languages = 'testString';
        const complete = true;
        const depth = 38;
        const getCatalogEntryParams = {
          id,
          account,
          include,
          languages,
          complete,
          depth,
        };

        const getCatalogEntryResult = globalCatalogService.getCatalogEntry(getCatalogEntryParams);

        // all methods should return a Promise
        expectToBePromise(getCatalogEntryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.qs.include).toEqual(include);
        expect(mockRequestOptions.qs.languages).toEqual(languages);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.qs.depth).toEqual(depth);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogEntryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __getCatalogEntryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __getCatalogEntryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCatalogEntryParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.getCatalogEntry(getCatalogEntryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.getCatalogEntry({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.getCatalogEntry();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateCatalogEntry', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Overview
      const overviewModel = {
        display_name: 'testString',
        long_description: 'testString',
        description: 'testString',
        featured_description: 'testString',
      };

      // Image
      const imageModel = {
        image: 'testString',
        small_image: 'testString',
        medium_image: 'testString',
        feature_image: 'testString',
      };

      // Provider
      const providerModel = {
        email: 'testString',
        name: 'testString',
        contact: 'testString',
        support_email: 'testString',
        phone: 'testString',
      };

      // CFMetaData
      const cfMetaDataModel = {
        type: 'testString',
        iam_compatible: true,
        unique_api_key: true,
        provisionable: true,
        bindable: true,
        async_provisioning_supported: true,
        async_unprovisioning_supported: true,
        requires: ['testString'],
        plan_updateable: true,
        state: 'testString',
        service_check_enabled: true,
        test_check_interval: 38,
        service_key_supported: true,
        cf_guid: { 'key1': 'testString' },
      };

      // PlanMetaData
      const planMetaDataModel = {
        bindable: true,
        reservable: true,
        allow_internal_users: true,
        async_provisioning_supported: true,
        async_unprovisioning_supported: true,
        test_check_interval: 38,
        single_scope_instance: 'testString',
        service_check_enabled: true,
        cf_guid: { 'key1': 'testString' },
      };

      // AliasMetaData
      const aliasMetaDataModel = {
        type: 'testString',
        plan_id: 'testString',
      };

      // SourceMetaData
      const sourceMetaDataModel = {
        path: 'testString',
        type: 'testString',
        url: 'testString',
      };

      // TemplateMetaData
      const templateMetaDataModel = {
        services: ['testString'],
        default_memory: 38,
        start_cmd: 'testString',
        source: sourceMetaDataModel,
        runtime_catalog_id: 'testString',
        cf_runtime_id: 'testString',
        template_id: 'testString',
        executable_file: 'testString',
        buildpack: 'testString',
        environment_variables: { 'key1': 'testString' },
      };

      // Bullets
      const bulletsModel = {
        title: 'testString',
        description: 'testString',
        icon: 'testString',
        quantity: 38,
      };

      // UIMediaSourceMetaData
      const uiMediaSourceMetaDataModel = {
        type: 'testString',
        url: 'testString',
      };

      // UIMetaMedia
      const uiMetaMediaModel = {
        caption: 'testString',
        thumbnail_url: 'testString',
        type: 'testString',
        URL: 'testString',
        source: [uiMediaSourceMetaDataModel],
      };

      // Strings
      const stringsModel = {
        bullets: [bulletsModel],
        media: [uiMetaMediaModel],
        not_creatable_msg: 'testString',
        not_creatable__robot_msg: 'testString',
        deprecation_warning: 'testString',
        popup_warning_message: 'testString',
        instruction: 'testString',
      };

      // URLS
      const urlsModel = {
        doc_url: 'testString',
        instructions_url: 'testString',
        api_url: 'testString',
        create_url: 'testString',
        sdk_download_url: 'testString',
        terms_url: 'testString',
        custom_create_page_url: 'testString',
        catalog_details_url: 'testString',
        deprecation_doc_url: 'testString',
        dashboard_url: 'testString',
        registration_url: 'testString',
        apidocsurl: 'testString',
      };

      // UIMetaData
      const uiMetaDataModel = {
        strings: { 'key1': stringsModel },
        urls: urlsModel,
        embeddable_dashboard: 'testString',
        embeddable_dashboard_full_width: true,
        navigation_order: ['testString'],
        not_creatable: true,
        primary_offering_id: 'testString',
        accessible_during_provision: true,
        side_by_side_index: 38,
        end_of_service_time: '2019-01-01T12:00:00.000Z',
        hidden: true,
        hide_lite_metering: true,
        no_upgrade_next_step: true,
      };

      // DRMetaData
      const drMetaDataModel = {
        dr: true,
        description: 'testString',
      };

      // SLAMetaData
      const slaMetaDataModel = {
        terms: 'testString',
        tenancy: 'testString',
        provisioning: 72.5,
        responsiveness: 72.5,
        dr: drMetaDataModel,
      };

      // Callbacks
      const callbacksModel = {
        controller_url: 'testString',
        broker_url: 'testString',
        broker_proxy_url: 'testString',
        dashboard_url: 'testString',
        dashboard_data_url: 'testString',
        dashboard_detail_tab_url: 'testString',
        dashboard_detail_tab_ext_url: 'testString',
        service_monitor_api: 'testString',
        service_monitor_app: 'testString',
        api_endpoint: { 'key1': 'testString' },
      };

      // Price
      const priceModel = {
        quantity_tier: 38,
        price: 72.5,
      };

      // Amount
      const amountModel = {
        country: 'testString',
        currency: 'testString',
        prices: [priceModel],
      };

      // StartingPrice
      const startingPriceModel = {
        plan_id: 'testString',
        deployment_id: 'testString',
        unit: 'testString',
        amount: [amountModel],
      };

      // PricingSet
      const pricingSetModel = {
        type: 'testString',
        origin: 'testString',
        starting_price: startingPriceModel,
      };

      // Broker
      const brokerModel = {
        name: 'testString',
        guid: 'testString',
      };

      // DeploymentBase
      const deploymentBaseModel = {
        location: 'testString',
        location_url: 'testString',
        original_location: 'testString',
        target_crn: 'testString',
        service_crn: 'testString',
        mccp_id: 'testString',
        broker: brokerModel,
        supports_rc_migration: true,
        target_network: 'testString',
      };

      // ObjectMetadataSet
      const objectMetadataSetModel = {
        rc_compatible: true,
        service: cfMetaDataModel,
        plan: planMetaDataModel,
        alias: aliasMetaDataModel,
        template: templateMetaDataModel,
        ui: uiMetaDataModel,
        compliance: ['testString'],
        sla: slaMetaDataModel,
        callbacks: callbacksModel,
        original_name: 'testString',
        version: 'testString',
        other: { anyKey: 'anyValue' },
        pricing: pricingSetModel,
        deployment: deploymentBaseModel,
      };

      function __updateCatalogEntryTest() {
        // Construct the params object for operation updateCatalogEntry
        const id = 'testString';
        const name = 'testString';
        const kind = 'service';
        const overviewUi = { 'key1': overviewModel };
        const images = imageModel;
        const disabled = true;
        const tags = ['testString'];
        const provider = providerModel;
        const parentId = 'testString';
        const group = true;
        const active = true;
        const url = 'testString';
        const metadata = objectMetadataSetModel;
        const account = 'testString';
        const move = 'testString';
        const updateCatalogEntryParams = {
          id,
          name,
          kind,
          overviewUi,
          images,
          disabled,
          tags,
          provider,
          parentId,
          group,
          active,
          url,
          metadata,
          account,
          move,
        };

        const updateCatalogEntryResult =
          globalCatalogService.updateCatalogEntry(updateCatalogEntryParams);

        // all methods should return a Promise
        expectToBePromise(updateCatalogEntryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.overview_ui).toEqual(overviewUi);
        expect(mockRequestOptions.body.images).toEqual(images);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.provider).toEqual(provider);
        expect(mockRequestOptions.body.parent_id).toEqual(parentId);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.active).toEqual(active);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.qs.move).toEqual(move);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCatalogEntryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __updateCatalogEntryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __updateCatalogEntryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const name = 'testString';
        const kind = 'service';
        const overviewUi = { 'key1': overviewModel };
        const images = imageModel;
        const disabled = true;
        const tags = ['testString'];
        const provider = providerModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCatalogEntryParams = {
          id,
          name,
          kind,
          overviewUi,
          images,
          disabled,
          tags,
          provider,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.updateCatalogEntry(updateCatalogEntryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.updateCatalogEntry({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.updateCatalogEntry();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteCatalogEntry', () => {
    describe('positive tests', () => {
      function __deleteCatalogEntryTest() {
        // Construct the params object for operation deleteCatalogEntry
        const id = 'testString';
        const account = 'testString';
        const force = true;
        const deleteCatalogEntryParams = {
          id,
          account,
          force,
        };

        const deleteCatalogEntryResult =
          globalCatalogService.deleteCatalogEntry(deleteCatalogEntryParams);

        // all methods should return a Promise
        expectToBePromise(deleteCatalogEntryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.qs.force).toEqual(force);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCatalogEntryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __deleteCatalogEntryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __deleteCatalogEntryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteCatalogEntryParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.deleteCatalogEntry(deleteCatalogEntryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.deleteCatalogEntry({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.deleteCatalogEntry();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getChildObjects', () => {
    describe('positive tests', () => {
      function __getChildObjectsTest() {
        // Construct the params object for operation getChildObjects
        const id = 'testString';
        const kind = 'testString';
        const account = 'testString';
        const include = 'testString';
        const q = 'testString';
        const sortBy = 'testString';
        const descending = 'testString';
        const languages = 'testString';
        const complete = true;
        const offset = 0;
        const limit = 50;
        const getChildObjectsParams = {
          id,
          kind,
          account,
          include,
          q,
          sortBy,
          descending,
          languages,
          complete,
          offset,
          limit,
        };

        const getChildObjectsResult = globalCatalogService.getChildObjects(getChildObjectsParams);

        // all methods should return a Promise
        expectToBePromise(getChildObjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}/{kind}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.qs.include).toEqual(include);
        expect(mockRequestOptions.qs.q).toEqual(q);
        expect(mockRequestOptions.qs['sort-by']).toEqual(sortBy);
        expect(mockRequestOptions.qs.descending).toEqual(descending);
        expect(mockRequestOptions.qs.languages).toEqual(languages);
        expect(mockRequestOptions.qs.complete).toEqual(complete);
        expect(mockRequestOptions.qs._offset).toEqual(offset);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.kind).toEqual(kind);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getChildObjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __getChildObjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __getChildObjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const kind = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getChildObjectsParams = {
          id,
          kind,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.getChildObjects(getChildObjectsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.getChildObjects({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.getChildObjects();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('restoreCatalogEntry', () => {
    describe('positive tests', () => {
      function __restoreCatalogEntryTest() {
        // Construct the params object for operation restoreCatalogEntry
        const id = 'testString';
        const account = 'testString';
        const restoreCatalogEntryParams = {
          id,
          account,
        };

        const restoreCatalogEntryResult =
          globalCatalogService.restoreCatalogEntry(restoreCatalogEntryParams);

        // all methods should return a Promise
        expectToBePromise(restoreCatalogEntryResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}/restore', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __restoreCatalogEntryTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __restoreCatalogEntryTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __restoreCatalogEntryTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const restoreCatalogEntryParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.restoreCatalogEntry(restoreCatalogEntryParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.restoreCatalogEntry({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.restoreCatalogEntry();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getVisibility', () => {
    describe('positive tests', () => {
      function __getVisibilityTest() {
        // Construct the params object for operation getVisibility
        const id = 'testString';
        const account = 'testString';
        const getVisibilityParams = {
          id,
          account,
        };

        const getVisibilityResult = globalCatalogService.getVisibility(getVisibilityParams);

        // all methods should return a Promise
        expectToBePromise(getVisibilityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}/visibility', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVisibilityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __getVisibilityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __getVisibilityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getVisibilityParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.getVisibility(getVisibilityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.getVisibility({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.getVisibility();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateVisibility', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // VisibilityDetailAccounts
      const visibilityDetailAccountsModel = {
        _accountid_: 'testString',
      };

      // VisibilityDetail
      const visibilityDetailModel = {
        accounts: visibilityDetailAccountsModel,
      };

      function __updateVisibilityTest() {
        // Construct the params object for operation updateVisibility
        const id = 'testString';
        const extendable = true;
        const include = visibilityDetailModel;
        const exclude = visibilityDetailModel;
        const account = 'testString';
        const updateVisibilityParams = {
          id,
          extendable,
          include,
          exclude,
          account,
        };

        const updateVisibilityResult =
          globalCatalogService.updateVisibility(updateVisibilityParams);

        // all methods should return a Promise
        expectToBePromise(updateVisibilityResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}/visibility', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.extendable).toEqual(extendable);
        expect(mockRequestOptions.body.include).toEqual(include);
        expect(mockRequestOptions.body.exclude).toEqual(exclude);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVisibilityTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __updateVisibilityTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __updateVisibilityTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVisibilityParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.updateVisibility(updateVisibilityParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.updateVisibility({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.updateVisibility();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPricing', () => {
    describe('positive tests', () => {
      function __getPricingTest() {
        // Construct the params object for operation getPricing
        const id = 'testString';
        const account = 'testString';
        const deploymentRegion = 'testString';
        const getPricingParams = {
          id,
          account,
          deploymentRegion,
        };

        const getPricingResult = globalCatalogService.getPricing(getPricingParams);

        // all methods should return a Promise
        expectToBePromise(getPricingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}/pricing', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.qs.deployment_region).toEqual(deploymentRegion);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPricingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __getPricingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __getPricingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPricingParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.getPricing(getPricingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.getPricing({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.getPricing();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getPricingDeployments', () => {
    describe('positive tests', () => {
      function __getPricingDeploymentsTest() {
        // Construct the params object for operation getPricingDeployments
        const id = 'testString';
        const account = 'testString';
        const getPricingDeploymentsParams = {
          id,
          account,
        };

        const getPricingDeploymentsResult = globalCatalogService.getPricingDeployments(
          getPricingDeploymentsParams
        );

        // all methods should return a Promise
        expectToBePromise(getPricingDeploymentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}/pricing/deployment', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPricingDeploymentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __getPricingDeploymentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __getPricingDeploymentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getPricingDeploymentsParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.getPricingDeployments(getPricingDeploymentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.getPricingDeployments({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.getPricingDeployments();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAuditLogs', () => {
    describe('positive tests', () => {
      function __getAuditLogsTest() {
        // Construct the params object for operation getAuditLogs
        const id = 'testString';
        const account = 'testString';
        const ascending = 'false';
        const startat = 'testString';
        const offset = 0;
        const limit = 50;
        const getAuditLogsParams = {
          id,
          account,
          ascending,
          startat,
          offset,
          limit,
        };

        const getAuditLogsResult = globalCatalogService.getAuditLogs(getAuditLogsParams);

        // all methods should return a Promise
        expectToBePromise(getAuditLogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{id}/logs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.qs.ascending).toEqual(ascending);
        expect(mockRequestOptions.qs.startat).toEqual(startat);
        expect(mockRequestOptions.qs._offset).toEqual(offset);
        expect(mockRequestOptions.qs._limit).toEqual(limit);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAuditLogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __getAuditLogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __getAuditLogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAuditLogsParams = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.getAuditLogs(getAuditLogsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.getAuditLogs({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.getAuditLogs();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listArtifacts', () => {
    describe('positive tests', () => {
      function __listArtifactsTest() {
        // Construct the params object for operation listArtifacts
        const objectId = 'testString';
        const account = 'testString';
        const listArtifactsParams = {
          objectId,
          account,
        };

        const listArtifactsResult = globalCatalogService.listArtifacts(listArtifactsParams);

        // all methods should return a Promise
        expectToBePromise(listArtifactsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{object_id}/artifacts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.object_id).toEqual(objectId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listArtifactsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __listArtifactsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __listArtifactsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listArtifactsParams = {
          objectId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.listArtifacts(listArtifactsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.listArtifacts({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.listArtifacts();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getArtifact', () => {
    describe('positive tests', () => {
      function __getArtifactTest() {
        // Construct the params object for operation getArtifact
        const objectId = 'testString';
        const artifactId = 'testString';
        const accept = 'testString';
        const account = 'testString';
        const getArtifactParams = {
          objectId,
          artifactId,
          accept,
          account,
        };

        const getArtifactResult = globalCatalogService.getArtifact(getArtifactParams);

        // all methods should return a Promise
        expectToBePromise(getArtifactResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{object_id}/artifacts/{artifact_id}', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.object_id).toEqual(objectId);
        expect(mockRequestOptions.path.artifact_id).toEqual(artifactId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getArtifactTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __getArtifactTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __getArtifactTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectId = 'testString';
        const artifactId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getArtifactParams = {
          objectId,
          artifactId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.getArtifact(getArtifactParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.getArtifact({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.getArtifact();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('uploadArtifact', () => {
    describe('positive tests', () => {
      function __uploadArtifactTest() {
        // Construct the params object for operation uploadArtifact
        const objectId = 'testString';
        const artifactId = 'testString';
        const artifact = Buffer.from('This is a mock file.');
        const contentType = 'testString';
        const account = 'testString';
        const uploadArtifactParams = {
          objectId,
          artifactId,
          artifact,
          contentType,
          account,
        };

        const uploadArtifactResult = globalCatalogService.uploadArtifact(uploadArtifactParams);

        // all methods should return a Promise
        expectToBePromise(uploadArtifactResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{object_id}/artifacts/{artifact_id}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = contentType;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Content-Type', contentType);
        expect(mockRequestOptions.body).toEqual(artifact);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.object_id).toEqual(objectId);
        expect(mockRequestOptions.path.artifact_id).toEqual(artifactId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __uploadArtifactTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __uploadArtifactTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __uploadArtifactTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectId = 'testString';
        const artifactId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const uploadArtifactParams = {
          objectId,
          artifactId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.uploadArtifact(uploadArtifactParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.uploadArtifact({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.uploadArtifact();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteArtifact', () => {
    describe('positive tests', () => {
      function __deleteArtifactTest() {
        // Construct the params object for operation deleteArtifact
        const objectId = 'testString';
        const artifactId = 'testString';
        const account = 'testString';
        const deleteArtifactParams = {
          objectId,
          artifactId,
          account,
        };

        const deleteArtifactResult = globalCatalogService.deleteArtifact(deleteArtifactParams);

        // all methods should return a Promise
        expectToBePromise(deleteArtifactResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/{object_id}/artifacts/{artifact_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account).toEqual(account);
        expect(mockRequestOptions.path.object_id).toEqual(objectId);
        expect(mockRequestOptions.path.artifact_id).toEqual(artifactId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteArtifactTest();

        // enable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.enableRetries();
        __deleteArtifactTest();

        // disable retries and test again
        createRequestMock.mockClear();
        globalCatalogService.disableRetries();
        __deleteArtifactTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectId = 'testString';
        const artifactId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteArtifactParams = {
          objectId,
          artifactId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalCatalogService.deleteArtifact(deleteArtifactParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await globalCatalogService.deleteArtifact({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await globalCatalogService.deleteArtifact();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
