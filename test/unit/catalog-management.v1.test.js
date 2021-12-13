/**
 * (C) Copyright IBM Corp. 2021.
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
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const CatalogManagementV1 = require('../../dist/catalog-management/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const catalogManagementServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://cm.globalcatalog.cloud.ibm.com/api/v1-beta',
};

const catalogManagementService = new CatalogManagementV1(catalogManagementServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(catalogManagementService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('CatalogManagementV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = CatalogManagementV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(CatalogManagementV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(CatalogManagementV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(CatalogManagementV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = CatalogManagementV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(CatalogManagementV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new CatalogManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new CatalogManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CatalogManagementV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('getCatalogAccount', () => {
    describe('positive tests', () => {
      function __getCatalogAccountTest() {
        // Construct the params object for operation getCatalogAccount
        const params = {};

        const getCatalogAccountResult = catalogManagementService.getCatalogAccount(params);

        // all methods should return a Promise
        expectToBePromise(getCatalogAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogaccount', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getCatalogAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getCatalogAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAccount(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.getCatalogAccount({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('updateCatalogAccount', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // FilterTerms
      const filterTermsModel = {
        filter_terms: ['testString'],
      };

      // CategoryFilter
      const categoryFilterModel = {
        include: true,
        filter: filterTermsModel,
      };

      // IDFilter
      const idFilterModel = {
        include: filterTermsModel,
        exclude: filterTermsModel,
      };

      // Filters
      const filtersModel = {
        include_all: true,
        category_filters: { 'key1': categoryFilterModel },
        id_filters: idFilterModel,
      };

      function __updateCatalogAccountTest() {
        // Construct the params object for operation updateCatalogAccount
        const id = 'testString';
        const hideIbmCloudCatalog = true;
        const accountFilters = filtersModel;
        const params = {
          id: id,
          hideIbmCloudCatalog: hideIbmCloudCatalog,
          accountFilters: accountFilters,
        };

        const updateCatalogAccountResult = catalogManagementService.updateCatalogAccount(params);

        // all methods should return a Promise
        expectToBePromise(updateCatalogAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogaccount', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.hide_IBM_cloud_catalog).toEqual(hideIbmCloudCatalog);
        expect(mockRequestOptions.body.account_filters).toEqual(accountFilters);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCatalogAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __updateCatalogAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __updateCatalogAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.updateCatalogAccount(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.updateCatalogAccount({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getCatalogAccountAudit', () => {
    describe('positive tests', () => {
      function __getCatalogAccountAuditTest() {
        // Construct the params object for operation getCatalogAccountAudit
        const params = {};

        const getCatalogAccountAuditResult = catalogManagementService.getCatalogAccountAudit(params);

        // all methods should return a Promise
        expectToBePromise(getCatalogAccountAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogaccount/audit', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogAccountAuditTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getCatalogAccountAuditTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getCatalogAccountAuditTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAccountAudit(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.getCatalogAccountAudit({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getCatalogAccountFilters', () => {
    describe('positive tests', () => {
      function __getCatalogAccountFiltersTest() {
        // Construct the params object for operation getCatalogAccountFilters
        const catalog = 'testString';
        const params = {
          catalog: catalog,
        };

        const getCatalogAccountFiltersResult = catalogManagementService.getCatalogAccountFilters(params);

        // all methods should return a Promise
        expectToBePromise(getCatalogAccountFiltersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogaccount/filters', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.catalog).toEqual(catalog);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogAccountFiltersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getCatalogAccountFiltersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getCatalogAccountFiltersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAccountFilters(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.getCatalogAccountFilters({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listCatalogs', () => {
    describe('positive tests', () => {
      function __listCatalogsTest() {
        // Construct the params object for operation listCatalogs
        const params = {};

        const listCatalogsResult = catalogManagementService.listCatalogs(params);

        // all methods should return a Promise
        expectToBePromise(listCatalogsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCatalogsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listCatalogsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listCatalogsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listCatalogs(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.listCatalogs({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createCatalog', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Feature
      const featureModel = {
        title: 'testString',
        description: 'testString',
      };

      // FilterTerms
      const filterTermsModel = {
        filter_terms: ['testString'],
      };

      // CategoryFilter
      const categoryFilterModel = {
        include: true,
        filter: filterTermsModel,
      };

      // IDFilter
      const idFilterModel = {
        include: filterTermsModel,
        exclude: filterTermsModel,
      };

      // Filters
      const filtersModel = {
        include_all: true,
        category_filters: { 'key1': categoryFilterModel },
        id_filters: idFilterModel,
      };

      // SyndicationCluster
      const syndicationClusterModel = {
        region: 'testString',
        id: 'testString',
        name: 'testString',
        resource_group_name: 'testString',
        type: 'testString',
        namespaces: ['testString'],
        all_namespaces: true,
      };

      // SyndicationHistory
      const syndicationHistoryModel = {
        namespaces: ['testString'],
        clusters: [syndicationClusterModel],
        last_run: '2019-01-01T12:00:00.000Z',
      };

      // SyndicationAuthorization
      const syndicationAuthorizationModel = {
        token: 'testString',
        last_run: '2019-01-01T12:00:00.000Z',
      };

      // SyndicationResource
      const syndicationResourceModel = {
        remove_related_components: true,
        clusters: [syndicationClusterModel],
        history: syndicationHistoryModel,
        authorization: syndicationAuthorizationModel,
      };

      function __createCatalogTest() {
        // Construct the params object for operation createCatalog
        const id = 'testString';
        const rev = 'testString';
        const label = 'testString';
        const shortDescription = 'testString';
        const catalogIconUrl = 'testString';
        const tags = ['testString'];
        const features = [featureModel];
        const disabled = true;
        const resourceGroupId = 'testString';
        const owningAccount = 'testString';
        const catalogFilters = filtersModel;
        const syndicationSettings = syndicationResourceModel;
        const kind = 'testString';
        const params = {
          id: id,
          rev: rev,
          label: label,
          shortDescription: shortDescription,
          catalogIconUrl: catalogIconUrl,
          tags: tags,
          features: features,
          disabled: disabled,
          resourceGroupId: resourceGroupId,
          owningAccount: owningAccount,
          catalogFilters: catalogFilters,
          syndicationSettings: syndicationSettings,
          kind: kind,
        };

        const createCatalogResult = catalogManagementService.createCatalog(params);

        // all methods should return a Promise
        expectToBePromise(createCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.catalog_icon_url).toEqual(catalogIconUrl);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.owning_account).toEqual(owningAccount);
        expect(mockRequestOptions.body.catalog_filters).toEqual(catalogFilters);
        expect(mockRequestOptions.body.syndication_settings).toEqual(syndicationSettings);
        expect(mockRequestOptions.body.kind).toEqual(kind);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __createCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __createCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createCatalog(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.createCatalog({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getCatalog', () => {
    describe('positive tests', () => {
      function __getCatalogTest() {
        // Construct the params object for operation getCatalog
        const catalogIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
        };

        const getCatalogResult = catalogManagementService.getCatalog(params);

        // all methods should return a Promise
        expectToBePromise(getCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalog(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('replaceCatalog', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Feature
      const featureModel = {
        title: 'testString',
        description: 'testString',
      };

      // FilterTerms
      const filterTermsModel = {
        filter_terms: ['testString'],
      };

      // CategoryFilter
      const categoryFilterModel = {
        include: true,
        filter: filterTermsModel,
      };

      // IDFilter
      const idFilterModel = {
        include: filterTermsModel,
        exclude: filterTermsModel,
      };

      // Filters
      const filtersModel = {
        include_all: true,
        category_filters: { 'key1': categoryFilterModel },
        id_filters: idFilterModel,
      };

      // SyndicationCluster
      const syndicationClusterModel = {
        region: 'testString',
        id: 'testString',
        name: 'testString',
        resource_group_name: 'testString',
        type: 'testString',
        namespaces: ['testString'],
        all_namespaces: true,
      };

      // SyndicationHistory
      const syndicationHistoryModel = {
        namespaces: ['testString'],
        clusters: [syndicationClusterModel],
        last_run: '2019-01-01T12:00:00.000Z',
      };

      // SyndicationAuthorization
      const syndicationAuthorizationModel = {
        token: 'testString',
        last_run: '2019-01-01T12:00:00.000Z',
      };

      // SyndicationResource
      const syndicationResourceModel = {
        remove_related_components: true,
        clusters: [syndicationClusterModel],
        history: syndicationHistoryModel,
        authorization: syndicationAuthorizationModel,
      };

      function __replaceCatalogTest() {
        // Construct the params object for operation replaceCatalog
        const catalogIdentifier = 'testString';
        const id = 'testString';
        const rev = 'testString';
        const label = 'testString';
        const shortDescription = 'testString';
        const catalogIconUrl = 'testString';
        const tags = ['testString'];
        const features = [featureModel];
        const disabled = true;
        const resourceGroupId = 'testString';
        const owningAccount = 'testString';
        const catalogFilters = filtersModel;
        const syndicationSettings = syndicationResourceModel;
        const kind = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          id: id,
          rev: rev,
          label: label,
          shortDescription: shortDescription,
          catalogIconUrl: catalogIconUrl,
          tags: tags,
          features: features,
          disabled: disabled,
          resourceGroupId: resourceGroupId,
          owningAccount: owningAccount,
          catalogFilters: catalogFilters,
          syndicationSettings: syndicationSettings,
          kind: kind,
        };

        const replaceCatalogResult = catalogManagementService.replaceCatalog(params);

        // all methods should return a Promise
        expectToBePromise(replaceCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.catalog_icon_url).toEqual(catalogIconUrl);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.owning_account).toEqual(owningAccount);
        expect(mockRequestOptions.body.catalog_filters).toEqual(catalogFilters);
        expect(mockRequestOptions.body.syndication_settings).toEqual(syndicationSettings);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __replaceCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __replaceCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceCatalog(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.replaceCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.replaceCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteCatalog', () => {
    describe('positive tests', () => {
      function __deleteCatalogTest() {
        // Construct the params object for operation deleteCatalog
        const catalogIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
        };

        const deleteCatalogResult = catalogManagementService.deleteCatalog(params);

        // all methods should return a Promise
        expectToBePromise(deleteCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteCatalogTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteCatalogTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteCatalogTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteCatalog(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteCatalog({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteCatalog();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getCatalogAudit', () => {
    describe('positive tests', () => {
      function __getCatalogAuditTest() {
        // Construct the params object for operation getCatalogAudit
        const catalogIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
        };

        const getCatalogAuditResult = catalogManagementService.getCatalogAudit(params);

        // all methods should return a Promise
        expectToBePromise(getCatalogAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/audit', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCatalogAuditTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getCatalogAuditTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getCatalogAuditTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAudit(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getCatalogAudit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getCatalogAudit();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getConsumptionOfferings', () => {
    describe('positive tests', () => {
      function __getConsumptionOfferingsTest() {
        // Construct the params object for operation getConsumptionOfferings
        const digest = true;
        const catalog = 'testString';
        const select = 'all';
        const includeHidden = true;
        const limit = 1000;
        const offset = 38;
        const params = {
          digest: digest,
          catalog: catalog,
          select: select,
          includeHidden: includeHidden,
          limit: limit,
          offset: offset,
        };

        const getConsumptionOfferingsResult = catalogManagementService.getConsumptionOfferings(params);

        // all methods should return a Promise
        expectToBePromise(getConsumptionOfferingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/offerings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.digest).toEqual(digest);
        expect(mockRequestOptions.qs.catalog).toEqual(catalog);
        expect(mockRequestOptions.qs.select).toEqual(select);
        expect(mockRequestOptions.qs.includeHidden).toEqual(includeHidden);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getConsumptionOfferingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getConsumptionOfferingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getConsumptionOfferingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getConsumptionOfferings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.getConsumptionOfferings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('listOfferings', () => {
    describe('positive tests', () => {
      function __listOfferingsTest() {
        // Construct the params object for operation listOfferings
        const catalogIdentifier = 'testString';
        const digest = true;
        const limit = 1000;
        const offset = 38;
        const name = 'testString';
        const sort = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          digest: digest,
          limit: limit,
          offset: offset,
          name: name,
          sort: sort,
        };

        const listOfferingsResult = catalogManagementService.listOfferings(params);

        // all methods should return a Promise
        expectToBePromise(listOfferingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.digest).toEqual(digest);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOfferingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listOfferingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listOfferingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listOfferings(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listOfferings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listOfferings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createOffering', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Rating
      const ratingModel = {
        one_star_count: 38,
        two_star_count: 38,
        three_star_count: 38,
        four_star_count: 38,
      };

      // Feature
      const featureModel = {
        title: 'testString',
        description: 'testString',
      };

      // Configuration
      const configurationModel = {
        key: 'testString',
        type: 'testString',
        default_value: 'testString',
        value_constraint: 'testString',
        description: 'testString',
        required: true,
        options: ['testString'],
        hidden: true,
      };

      // Validation
      const validationModel = {
        validated: '2019-01-01T12:00:00.000Z',
        requested: '2019-01-01T12:00:00.000Z',
        state: 'testString',
        last_operation: 'testString',
        target: { 'key1': 'testString' },
      };

      // Resource
      const resourceModel = {
        type: 'mem',
        value: 'testString',
      };

      // Script
      const scriptModel = {
        instructions: 'testString',
        script: 'testString',
        script_permission: 'testString',
        delete_script: 'testString',
        scope: 'testString',
      };

      // VersionEntitlement
      const versionEntitlementModel = {
        provider_name: 'testString',
        provider_id: 'testString',
        product_id: 'testString',
        part_numbers: ['testString'],
        image_repo_name: 'testString',
      };

      // License
      const licenseModel = {
        id: 'testString',
        name: 'testString',
        type: 'testString',
        url: 'testString',
        description: 'testString',
      };

      // State
      const stateModel = {
        current: 'testString',
        current_entered: '2019-01-01T12:00:00.000Z',
        pending: 'testString',
        pending_requested: '2019-01-01T12:00:00.000Z',
        previous: 'testString',
      };

      // Version
      const versionModel = {
        id: 'testString',
        _rev: 'testString',
        crn: 'testString',
        version: 'testString',
        sha: 'testString',
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        offering_id: 'testString',
        catalog_id: 'testString',
        kind_id: 'testString',
        tags: ['testString'],
        repo_url: 'testString',
        source_url: 'testString',
        tgz_url: 'testString',
        configuration: [configurationModel],
        metadata: { 'key1': 'testString' },
        validation: validationModel,
        required_resources: [resourceModel],
        single_instance: true,
        install: scriptModel,
        pre_install: [scriptModel],
        entitlement: versionEntitlementModel,
        licenses: [licenseModel],
        image_manifest_url: 'testString',
        deprecated: true,
        package_version: 'testString',
        state: stateModel,
        version_locator: 'testString',
        console_url: 'testString',
        long_description: 'testString',
        whitelisted_accounts: ['testString'],
      };

      // Deployment
      const deploymentModel = {
        id: 'testString',
        label: 'testString',
        name: 'testString',
        short_description: 'testString',
        long_description: 'testString',
        metadata: { 'key1': 'testString' },
        tags: ['testString'],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
      };

      // Plan
      const planModel = {
        id: 'testString',
        label: 'testString',
        name: 'testString',
        short_description: 'testString',
        long_description: 'testString',
        metadata: { 'key1': 'testString' },
        tags: ['testString'],
        additional_features: [featureModel],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        deployments: [deploymentModel],
      };

      // Kind
      const kindModel = {
        id: 'testString',
        format_kind: 'testString',
        target_kind: 'testString',
        metadata: { 'key1': 'testString' },
        install_description: 'testString',
        tags: ['testString'],
        additional_features: [featureModel],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        versions: [versionModel],
        plans: [planModel],
      };

      // ProviderInfo
      const providerInfoModel = {
        id: 'testString',
        name: 'testString',
      };

      // RepoInfo
      const repoInfoModel = {
        token: 'testString',
        type: 'testString',
      };

      // Support
      const supportModel = {
        url: 'testString',
        process: 'testString',
        locations: ['testString'],
      };

      // MediaItem
      const mediaItemModel = {
        url: 'testString',
        caption: 'testString',
        type: 'testString',
        thumbnail_url: 'testString',
      };

      function __createOfferingTest() {
        // Construct the params object for operation createOffering
        const catalogIdentifier = 'testString';
        const id = 'testString';
        const rev = 'testString';
        const url = 'testString';
        const crn = 'testString';
        const label = 'testString';
        const name = 'testString';
        const offeringIconUrl = 'testString';
        const offeringDocsUrl = 'testString';
        const offeringSupportUrl = 'testString';
        const tags = ['testString'];
        const keywords = ['testString'];
        const rating = ratingModel;
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const features = [featureModel];
        const kinds = [kindModel];
        const permitRequestIbmPublicPublish = true;
        const ibmPublishApproved = true;
        const publicPublishApproved = true;
        const publicOriginalCrn = 'testString';
        const publishPublicCrn = 'testString';
        const portalApprovalRecord = 'testString';
        const portalUiUrl = 'testString';
        const catalogId = 'testString';
        const catalogName = 'testString';
        const metadata = { 'key1': 'testString' };
        const disclaimer = 'testString';
        const hidden = true;
        const provider = 'testString';
        const providerInfo = providerInfoModel;
        const repoInfo = repoInfoModel;
        const support = supportModel;
        const media = [mediaItemModel];
        const params = {
          catalogIdentifier: catalogIdentifier,
          id: id,
          rev: rev,
          url: url,
          crn: crn,
          label: label,
          name: name,
          offeringIconUrl: offeringIconUrl,
          offeringDocsUrl: offeringDocsUrl,
          offeringSupportUrl: offeringSupportUrl,
          tags: tags,
          keywords: keywords,
          rating: rating,
          created: created,
          updated: updated,
          shortDescription: shortDescription,
          longDescription: longDescription,
          features: features,
          kinds: kinds,
          permitRequestIbmPublicPublish: permitRequestIbmPublicPublish,
          ibmPublishApproved: ibmPublishApproved,
          publicPublishApproved: publicPublishApproved,
          publicOriginalCrn: publicOriginalCrn,
          publishPublicCrn: publishPublicCrn,
          portalApprovalRecord: portalApprovalRecord,
          portalUiUrl: portalUiUrl,
          catalogId: catalogId,
          catalogName: catalogName,
          metadata: metadata,
          disclaimer: disclaimer,
          hidden: hidden,
          provider: provider,
          providerInfo: providerInfo,
          repoInfo: repoInfo,
          support: support,
          media: media,
        };

        const createOfferingResult = catalogManagementService.createOffering(params);

        // all methods should return a Promise
        expectToBePromise(createOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.offering_icon_url).toEqual(offeringIconUrl);
        expect(mockRequestOptions.body.offering_docs_url).toEqual(offeringDocsUrl);
        expect(mockRequestOptions.body.offering_support_url).toEqual(offeringSupportUrl);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.keywords).toEqual(keywords);
        expect(mockRequestOptions.body.rating).toEqual(rating);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.updated).toEqual(updated);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.long_description).toEqual(longDescription);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.kinds).toEqual(kinds);
        expect(mockRequestOptions.body.permit_request_ibm_public_publish).toEqual(permitRequestIbmPublicPublish);
        expect(mockRequestOptions.body.ibm_publish_approved).toEqual(ibmPublishApproved);
        expect(mockRequestOptions.body.public_publish_approved).toEqual(publicPublishApproved);
        expect(mockRequestOptions.body.public_original_crn).toEqual(publicOriginalCrn);
        expect(mockRequestOptions.body.publish_public_crn).toEqual(publishPublicCrn);
        expect(mockRequestOptions.body.portal_approval_record).toEqual(portalApprovalRecord);
        expect(mockRequestOptions.body.portal_ui_url).toEqual(portalUiUrl);
        expect(mockRequestOptions.body.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.body.catalog_name).toEqual(catalogName);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.disclaimer).toEqual(disclaimer);
        expect(mockRequestOptions.body.hidden).toEqual(hidden);
        expect(mockRequestOptions.body.provider).toEqual(provider);
        expect(mockRequestOptions.body.provider_info).toEqual(providerInfo);
        expect(mockRequestOptions.body.repo_info).toEqual(repoInfo);
        expect(mockRequestOptions.body.support).toEqual(support);
        expect(mockRequestOptions.body.media).toEqual(media);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __createOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __createOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.createOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.createOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('importOfferingVersion', () => {
    describe('positive tests', () => {
      function __importOfferingVersionTest() {
        // Construct the params object for operation importOfferingVersion
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const tags = ['testString'];
        const targetKinds = ['testString'];
        const content = 'This is a mock byte array value.';
        const zipurl = 'testString';
        const targetVersion = 'testString';
        const includeConfig = true;
        const isVsi = true;
        const repoType = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          tags: tags,
          targetKinds: targetKinds,
          content: content,
          zipurl: zipurl,
          targetVersion: targetVersion,
          includeConfig: includeConfig,
          isVsi: isVsi,
          repoType: repoType,
        };

        const importOfferingVersionResult = catalogManagementService.importOfferingVersion(params);

        // all methods should return a Promise
        expectToBePromise(importOfferingVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/version', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.qs.zipurl).toEqual(zipurl);
        expect(mockRequestOptions.qs.targetVersion).toEqual(targetVersion);
        expect(mockRequestOptions.qs.includeConfig).toEqual(includeConfig);
        expect(mockRequestOptions.qs.isVSI).toEqual(isVsi);
        expect(mockRequestOptions.qs.repoType).toEqual(repoType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __importOfferingVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __importOfferingVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __importOfferingVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.importOfferingVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.importOfferingVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.importOfferingVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('importOffering', () => {
    describe('positive tests', () => {
      function __importOfferingTest() {
        // Construct the params object for operation importOffering
        const catalogIdentifier = 'testString';
        const tags = ['testString'];
        const targetKinds = ['testString'];
        const content = 'This is a mock byte array value.';
        const zipurl = 'testString';
        const offeringId = 'testString';
        const targetVersion = 'testString';
        const includeConfig = true;
        const isVsi = true;
        const repoType = 'testString';
        const xAuthToken = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          tags: tags,
          targetKinds: targetKinds,
          content: content,
          zipurl: zipurl,
          offeringId: offeringId,
          targetVersion: targetVersion,
          includeConfig: includeConfig,
          isVsi: isVsi,
          repoType: repoType,
          xAuthToken: xAuthToken,
        };

        const importOfferingResult = catalogManagementService.importOffering(params);

        // all methods should return a Promise
        expectToBePromise(importOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/import/offerings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Token', xAuthToken);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.qs.zipurl).toEqual(zipurl);
        expect(mockRequestOptions.qs.offeringID).toEqual(offeringId);
        expect(mockRequestOptions.qs.targetVersion).toEqual(targetVersion);
        expect(mockRequestOptions.qs.includeConfig).toEqual(includeConfig);
        expect(mockRequestOptions.qs.isVSI).toEqual(isVsi);
        expect(mockRequestOptions.qs.repoType).toEqual(repoType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __importOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __importOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __importOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.importOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.importOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.importOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('reloadOffering', () => {
    describe('positive tests', () => {
      function __reloadOfferingTest() {
        // Construct the params object for operation reloadOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const targetVersion = 'testString';
        const tags = ['testString'];
        const targetKinds = ['testString'];
        const content = 'This is a mock byte array value.';
        const zipurl = 'testString';
        const repoType = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          targetVersion: targetVersion,
          tags: tags,
          targetKinds: targetKinds,
          content: content,
          zipurl: zipurl,
          repoType: repoType,
        };

        const reloadOfferingResult = catalogManagementService.reloadOffering(params);

        // all methods should return a Promise
        expectToBePromise(reloadOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/reload', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.qs.targetVersion).toEqual(targetVersion);
        expect(mockRequestOptions.qs.zipurl).toEqual(zipurl);
        expect(mockRequestOptions.qs.repoType).toEqual(repoType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __reloadOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __reloadOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __reloadOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const targetVersion = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          targetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.reloadOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.reloadOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.reloadOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOffering', () => {
    describe('positive tests', () => {
      function __getOfferingTest() {
        // Construct the params object for operation getOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const type = 'testString';
        const digest = true;
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          type: type,
          digest: digest,
        };

        const getOfferingResult = catalogManagementService.getOffering(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.digest).toEqual(digest);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('replaceOffering', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Rating
      const ratingModel = {
        one_star_count: 38,
        two_star_count: 38,
        three_star_count: 38,
        four_star_count: 38,
      };

      // Feature
      const featureModel = {
        title: 'testString',
        description: 'testString',
      };

      // Configuration
      const configurationModel = {
        key: 'testString',
        type: 'testString',
        default_value: 'testString',
        value_constraint: 'testString',
        description: 'testString',
        required: true,
        options: ['testString'],
        hidden: true,
      };

      // Validation
      const validationModel = {
        validated: '2019-01-01T12:00:00.000Z',
        requested: '2019-01-01T12:00:00.000Z',
        state: 'testString',
        last_operation: 'testString',
        target: { 'key1': 'testString' },
      };

      // Resource
      const resourceModel = {
        type: 'mem',
        value: 'testString',
      };

      // Script
      const scriptModel = {
        instructions: 'testString',
        script: 'testString',
        script_permission: 'testString',
        delete_script: 'testString',
        scope: 'testString',
      };

      // VersionEntitlement
      const versionEntitlementModel = {
        provider_name: 'testString',
        provider_id: 'testString',
        product_id: 'testString',
        part_numbers: ['testString'],
        image_repo_name: 'testString',
      };

      // License
      const licenseModel = {
        id: 'testString',
        name: 'testString',
        type: 'testString',
        url: 'testString',
        description: 'testString',
      };

      // State
      const stateModel = {
        current: 'testString',
        current_entered: '2019-01-01T12:00:00.000Z',
        pending: 'testString',
        pending_requested: '2019-01-01T12:00:00.000Z',
        previous: 'testString',
      };

      // Version
      const versionModel = {
        id: 'testString',
        _rev: 'testString',
        crn: 'testString',
        version: 'testString',
        sha: 'testString',
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        offering_id: 'testString',
        catalog_id: 'testString',
        kind_id: 'testString',
        tags: ['testString'],
        repo_url: 'testString',
        source_url: 'testString',
        tgz_url: 'testString',
        configuration: [configurationModel],
        metadata: { 'key1': 'testString' },
        validation: validationModel,
        required_resources: [resourceModel],
        single_instance: true,
        install: scriptModel,
        pre_install: [scriptModel],
        entitlement: versionEntitlementModel,
        licenses: [licenseModel],
        image_manifest_url: 'testString',
        deprecated: true,
        package_version: 'testString',
        state: stateModel,
        version_locator: 'testString',
        console_url: 'testString',
        long_description: 'testString',
        whitelisted_accounts: ['testString'],
      };

      // Deployment
      const deploymentModel = {
        id: 'testString',
        label: 'testString',
        name: 'testString',
        short_description: 'testString',
        long_description: 'testString',
        metadata: { 'key1': 'testString' },
        tags: ['testString'],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
      };

      // Plan
      const planModel = {
        id: 'testString',
        label: 'testString',
        name: 'testString',
        short_description: 'testString',
        long_description: 'testString',
        metadata: { 'key1': 'testString' },
        tags: ['testString'],
        additional_features: [featureModel],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        deployments: [deploymentModel],
      };

      // Kind
      const kindModel = {
        id: 'testString',
        format_kind: 'testString',
        target_kind: 'testString',
        metadata: { 'key1': 'testString' },
        install_description: 'testString',
        tags: ['testString'],
        additional_features: [featureModel],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        versions: [versionModel],
        plans: [planModel],
      };

      // ProviderInfo
      const providerInfoModel = {
        id: 'testString',
        name: 'testString',
      };

      // RepoInfo
      const repoInfoModel = {
        token: 'testString',
        type: 'testString',
      };

      // Support
      const supportModel = {
        url: 'testString',
        process: 'testString',
        locations: ['testString'],
      };

      // MediaItem
      const mediaItemModel = {
        url: 'testString',
        caption: 'testString',
        type: 'testString',
        thumbnail_url: 'testString',
      };

      function __replaceOfferingTest() {
        // Construct the params object for operation replaceOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const id = 'testString';
        const rev = 'testString';
        const url = 'testString';
        const crn = 'testString';
        const label = 'testString';
        const name = 'testString';
        const offeringIconUrl = 'testString';
        const offeringDocsUrl = 'testString';
        const offeringSupportUrl = 'testString';
        const tags = ['testString'];
        const keywords = ['testString'];
        const rating = ratingModel;
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const shortDescription = 'testString';
        const longDescription = 'testString';
        const features = [featureModel];
        const kinds = [kindModel];
        const permitRequestIbmPublicPublish = true;
        const ibmPublishApproved = true;
        const publicPublishApproved = true;
        const publicOriginalCrn = 'testString';
        const publishPublicCrn = 'testString';
        const portalApprovalRecord = 'testString';
        const portalUiUrl = 'testString';
        const catalogId = 'testString';
        const catalogName = 'testString';
        const metadata = { 'key1': 'testString' };
        const disclaimer = 'testString';
        const hidden = true;
        const provider = 'testString';
        const providerInfo = providerInfoModel;
        const repoInfo = repoInfoModel;
        const support = supportModel;
        const media = [mediaItemModel];
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          id: id,
          rev: rev,
          url: url,
          crn: crn,
          label: label,
          name: name,
          offeringIconUrl: offeringIconUrl,
          offeringDocsUrl: offeringDocsUrl,
          offeringSupportUrl: offeringSupportUrl,
          tags: tags,
          keywords: keywords,
          rating: rating,
          created: created,
          updated: updated,
          shortDescription: shortDescription,
          longDescription: longDescription,
          features: features,
          kinds: kinds,
          permitRequestIbmPublicPublish: permitRequestIbmPublicPublish,
          ibmPublishApproved: ibmPublishApproved,
          publicPublishApproved: publicPublishApproved,
          publicOriginalCrn: publicOriginalCrn,
          publishPublicCrn: publishPublicCrn,
          portalApprovalRecord: portalApprovalRecord,
          portalUiUrl: portalUiUrl,
          catalogId: catalogId,
          catalogName: catalogName,
          metadata: metadata,
          disclaimer: disclaimer,
          hidden: hidden,
          provider: provider,
          providerInfo: providerInfo,
          repoInfo: repoInfo,
          support: support,
          media: media,
        };

        const replaceOfferingResult = catalogManagementService.replaceOffering(params);

        // all methods should return a Promise
        expectToBePromise(replaceOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.offering_icon_url).toEqual(offeringIconUrl);
        expect(mockRequestOptions.body.offering_docs_url).toEqual(offeringDocsUrl);
        expect(mockRequestOptions.body.offering_support_url).toEqual(offeringSupportUrl);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.keywords).toEqual(keywords);
        expect(mockRequestOptions.body.rating).toEqual(rating);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.updated).toEqual(updated);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.long_description).toEqual(longDescription);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.kinds).toEqual(kinds);
        expect(mockRequestOptions.body.permit_request_ibm_public_publish).toEqual(permitRequestIbmPublicPublish);
        expect(mockRequestOptions.body.ibm_publish_approved).toEqual(ibmPublishApproved);
        expect(mockRequestOptions.body.public_publish_approved).toEqual(publicPublishApproved);
        expect(mockRequestOptions.body.public_original_crn).toEqual(publicOriginalCrn);
        expect(mockRequestOptions.body.publish_public_crn).toEqual(publishPublicCrn);
        expect(mockRequestOptions.body.portal_approval_record).toEqual(portalApprovalRecord);
        expect(mockRequestOptions.body.portal_ui_url).toEqual(portalUiUrl);
        expect(mockRequestOptions.body.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.body.catalog_name).toEqual(catalogName);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.disclaimer).toEqual(disclaimer);
        expect(mockRequestOptions.body.hidden).toEqual(hidden);
        expect(mockRequestOptions.body.provider).toEqual(provider);
        expect(mockRequestOptions.body.provider_info).toEqual(providerInfo);
        expect(mockRequestOptions.body.repo_info).toEqual(repoInfo);
        expect(mockRequestOptions.body.support).toEqual(support);
        expect(mockRequestOptions.body.media).toEqual(media);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __replaceOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __replaceOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.replaceOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.replaceOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateOffering', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // JsonPatchOperation
      const jsonPatchOperationModel = {
        op: 'add',
        path: 'testString',
        value: { foo: 'bar' },
        from: 'testString',
      };

      function __updateOfferingTest() {
        // Construct the params object for operation updateOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const ifMatch = 'testString';
        const updates = [jsonPatchOperationModel];
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          ifMatch: ifMatch,
          updates: updates,
        };

        const updateOfferingResult = catalogManagementService.updateOffering(params);

        // all methods should return a Promise
        expectToBePromise(updateOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json-patch+json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body).toEqual(updates);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __updateOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __updateOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.updateOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.updateOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.updateOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteOffering', () => {
    describe('positive tests', () => {
      function __deleteOfferingTest() {
        // Construct the params object for operation deleteOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
        };

        const deleteOfferingResult = catalogManagementService.deleteOffering(params);

        // all methods should return a Promise
        expectToBePromise(deleteOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingAudit', () => {
    describe('positive tests', () => {
      function __getOfferingAuditTest() {
        // Construct the params object for operation getOfferingAudit
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
        };

        const getOfferingAuditResult = catalogManagementService.getOfferingAudit(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/audit', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingAuditTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingAuditTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingAuditTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingAudit(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAudit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAudit();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('replaceOfferingIcon', () => {
    describe('positive tests', () => {
      function __replaceOfferingIconTest() {
        // Construct the params object for operation replaceOfferingIcon
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const fileName = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          fileName: fileName,
        };

        const replaceOfferingIconResult = catalogManagementService.replaceOfferingIcon(params);

        // all methods should return a Promise
        expectToBePromise(replaceOfferingIconResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/icon/{file_name}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.path.file_name).toEqual(fileName);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceOfferingIconTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __replaceOfferingIconTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __replaceOfferingIconTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const fileName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          fileName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceOfferingIcon(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.replaceOfferingIcon({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.replaceOfferingIcon();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('updateOfferingIbm', () => {
    describe('positive tests', () => {
      function __updateOfferingIbmTest() {
        // Construct the params object for operation updateOfferingIbm
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const approvalType = 'pc_managed';
        const approved = 'true';
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          approvalType: approvalType,
          approved: approved,
        };

        const updateOfferingIbmResult = catalogManagementService.updateOfferingIbm(params);

        // all methods should return a Promise
        expectToBePromise(updateOfferingIbmResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/publish/{approval_type}/{approved}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.path.approval_type).toEqual(approvalType);
        expect(mockRequestOptions.path.approved).toEqual(approved);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateOfferingIbmTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __updateOfferingIbmTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __updateOfferingIbmTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const approvalType = 'pc_managed';
        const approved = 'true';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          approvalType,
          approved,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.updateOfferingIbm(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.updateOfferingIbm({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.updateOfferingIbm();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deprecateOffering', () => {
    describe('positive tests', () => {
      function __deprecateOfferingTest() {
        // Construct the params object for operation deprecateOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const setting = 'true';
        const description = 'testString';
        const daysUntilDeprecate = 38;
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          setting: setting,
          description: description,
          daysUntilDeprecate: daysUntilDeprecate,
        };

        const deprecateOfferingResult = catalogManagementService.deprecateOffering(params);

        // all methods should return a Promise
        expectToBePromise(deprecateOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/deprecate/{approved}', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.days_until_deprecate).toEqual(daysUntilDeprecate);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.path.setting).toEqual(setting);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deprecateOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deprecateOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deprecateOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const setting = 'true';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          setting,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deprecateOffering(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deprecateOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deprecateOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingUpdates', () => {
    describe('positive tests', () => {
      function __getOfferingUpdatesTest() {
        // Construct the params object for operation getOfferingUpdates
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const kind = 'testString';
        const xAuthRefreshToken = 'testString';
        const target = 'testString';
        const version = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const resourceGroupId = 'testString';
        const namespace = 'testString';
        const sha = 'testString';
        const channel = 'testString';
        const namespaces = ['testString'];
        const allNamespaces = true;
        const params = {
          catalogIdentifier: catalogIdentifier,
          offeringId: offeringId,
          kind: kind,
          xAuthRefreshToken: xAuthRefreshToken,
          target: target,
          version: version,
          clusterId: clusterId,
          region: region,
          resourceGroupId: resourceGroupId,
          namespace: namespace,
          sha: sha,
          channel: channel,
          namespaces: namespaces,
          allNamespaces: allNamespaces,
        };

        const getOfferingUpdatesResult = catalogManagementService.getOfferingUpdates(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingUpdatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/updates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.kind).toEqual(kind);
        expect(mockRequestOptions.qs.target).toEqual(target);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.qs.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.qs.namespace).toEqual(namespace);
        expect(mockRequestOptions.qs.sha).toEqual(sha);
        expect(mockRequestOptions.qs.channel).toEqual(channel);
        expect(mockRequestOptions.qs.namespaces).toEqual(namespaces);
        expect(mockRequestOptions.qs.all_namespaces).toEqual(allNamespaces);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingUpdatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingUpdatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingUpdatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const kind = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          offeringId,
          kind,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingUpdates(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingUpdates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingUpdates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingSource', () => {
    describe('positive tests', () => {
      function __getOfferingSourceTest() {
        // Construct the params object for operation getOfferingSource
        const version = 'testString';
        const accept = 'application/yaml';
        const catalogId = 'testString';
        const name = 'testString';
        const id = 'testString';
        const kind = 'testString';
        const channel = 'testString';
        const params = {
          version: version,
          accept: accept,
          catalogId: catalogId,
          name: name,
          id: id,
          kind: kind,
          channel: channel,
        };

        const getOfferingSourceResult = catalogManagementService.getOfferingSource(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingSourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/offering/source', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.version).toEqual(version);
        expect(mockRequestOptions.qs.catalogID).toEqual(catalogId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.id).toEqual(id);
        expect(mockRequestOptions.qs.kind).toEqual(kind);
        expect(mockRequestOptions.qs.channel).toEqual(channel);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingSourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingSourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingSourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingSource(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingSource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingSource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingAbout', () => {
    describe('positive tests', () => {
      function __getOfferingAboutTest() {
        // Construct the params object for operation getOfferingAbout
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const getOfferingAboutResult = catalogManagementService.getOfferingAbout(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingAboutResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/about', 'GET');
        const expectedAccept = 'text/markdown';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingAboutTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingAboutTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingAboutTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingAbout(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAbout({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAbout();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingLicense', () => {
    describe('positive tests', () => {
      function __getOfferingLicenseTest() {
        // Construct the params object for operation getOfferingLicense
        const versionLocId = 'testString';
        const licenseId = 'testString';
        const params = {
          versionLocId: versionLocId,
          licenseId: licenseId,
        };

        const getOfferingLicenseResult = catalogManagementService.getOfferingLicense(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingLicenseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/licenses/{license_id}', 'GET');
        const expectedAccept = 'text/plain';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
        expect(mockRequestOptions.path.license_id).toEqual(licenseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingLicenseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingLicenseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingLicenseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const licenseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          licenseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingLicense(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingLicense({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingLicense();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingContainerImages', () => {
    describe('positive tests', () => {
      function __getOfferingContainerImagesTest() {
        // Construct the params object for operation getOfferingContainerImages
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const getOfferingContainerImagesResult = catalogManagementService.getOfferingContainerImages(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingContainerImagesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/containerImages', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingContainerImagesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingContainerImagesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingContainerImagesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingContainerImages(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingContainerImages({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingContainerImages();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deprecateVersion', () => {
    describe('positive tests', () => {
      function __deprecateVersionTest() {
        // Construct the params object for operation deprecateVersion
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const deprecateVersionResult = catalogManagementService.deprecateVersion(params);

        // all methods should return a Promise
        expectToBePromise(deprecateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/deprecate', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deprecateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deprecateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deprecateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deprecateVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deprecateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deprecateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('setDeprecateVersion', () => {
    describe('positive tests', () => {
      function __setDeprecateVersionTest() {
        // Construct the params object for operation setDeprecateVersion
        const versionLocId = 'testString';
        const setting = 'true';
        const description = 'testString';
        const daysUntilDeprecate = 38;
        const params = {
          versionLocId: versionLocId,
          setting: setting,
          description: description,
          daysUntilDeprecate: daysUntilDeprecate,
        };

        const setDeprecateVersionResult = catalogManagementService.setDeprecateVersion(params);

        // all methods should return a Promise
        expectToBePromise(setDeprecateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/deprecate/{setting}', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.days_until_deprecate).toEqual(daysUntilDeprecate);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
        expect(mockRequestOptions.path.setting).toEqual(setting);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setDeprecateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __setDeprecateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __setDeprecateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const setting = 'true';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          setting,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.setDeprecateVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.setDeprecateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.setDeprecateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('accountPublishVersion', () => {
    describe('positive tests', () => {
      function __accountPublishVersionTest() {
        // Construct the params object for operation accountPublishVersion
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const accountPublishVersionResult = catalogManagementService.accountPublishVersion(params);

        // all methods should return a Promise
        expectToBePromise(accountPublishVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/account-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __accountPublishVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __accountPublishVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __accountPublishVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.accountPublishVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.accountPublishVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.accountPublishVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('ibmPublishVersion', () => {
    describe('positive tests', () => {
      function __ibmPublishVersionTest() {
        // Construct the params object for operation ibmPublishVersion
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const ibmPublishVersionResult = catalogManagementService.ibmPublishVersion(params);

        // all methods should return a Promise
        expectToBePromise(ibmPublishVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/ibm-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __ibmPublishVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __ibmPublishVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __ibmPublishVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.ibmPublishVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.ibmPublishVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.ibmPublishVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('publicPublishVersion', () => {
    describe('positive tests', () => {
      function __publicPublishVersionTest() {
        // Construct the params object for operation publicPublishVersion
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const publicPublishVersionResult = catalogManagementService.publicPublishVersion(params);

        // all methods should return a Promise
        expectToBePromise(publicPublishVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/public-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __publicPublishVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __publicPublishVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __publicPublishVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.publicPublishVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.publicPublishVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.publicPublishVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('commitVersion', () => {
    describe('positive tests', () => {
      function __commitVersionTest() {
        // Construct the params object for operation commitVersion
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const commitVersionResult = catalogManagementService.commitVersion(params);

        // all methods should return a Promise
        expectToBePromise(commitVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/commit', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __commitVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __commitVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __commitVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.commitVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.commitVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.commitVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('copyVersion', () => {
    describe('positive tests', () => {
      function __copyVersionTest() {
        // Construct the params object for operation copyVersion
        const versionLocId = 'testString';
        const tags = ['testString'];
        const targetKinds = ['testString'];
        const content = 'This is a mock byte array value.';
        const params = {
          versionLocId: versionLocId,
          tags: tags,
          targetKinds: targetKinds,
          content: content,
        };

        const copyVersionResult = catalogManagementService.copyVersion(params);

        // all methods should return a Promise
        expectToBePromise(copyVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/copy', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __copyVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __copyVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __copyVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.copyVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.copyVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.copyVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingWorkingCopy', () => {
    describe('positive tests', () => {
      function __getOfferingWorkingCopyTest() {
        // Construct the params object for operation getOfferingWorkingCopy
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const getOfferingWorkingCopyResult = catalogManagementService.getOfferingWorkingCopy(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingWorkingCopyResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/workingcopy', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingWorkingCopyTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingWorkingCopyTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingWorkingCopyTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingWorkingCopy(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingWorkingCopy({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingWorkingCopy();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getVersion', () => {
    describe('positive tests', () => {
      function __getVersionTest() {
        // Construct the params object for operation getVersion
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const getVersionResult = catalogManagementService.getVersion(params);

        // all methods should return a Promise
        expectToBePromise(getVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteVersion', () => {
    describe('positive tests', () => {
      function __deleteVersionTest() {
        // Construct the params object for operation deleteVersion
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const deleteVersionResult = catalogManagementService.deleteVersion(params);

        // all methods should return a Promise
        expectToBePromise(deleteVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getCluster', () => {
    describe('positive tests', () => {
      function __getClusterTest() {
        // Construct the params object for operation getCluster
        const clusterId = 'testString';
        const region = 'testString';
        const xAuthRefreshToken = 'testString';
        const params = {
          clusterId: clusterId,
          region: region,
          xAuthRefreshToken: xAuthRefreshToken,
        };

        const getClusterResult = catalogManagementService.getCluster(params);

        // all methods should return a Promise
        expectToBePromise(getClusterResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/deploy/kubernetes/clusters/{cluster_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.path.cluster_id).toEqual(clusterId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getClusterTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getClusterTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getClusterTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const clusterId = 'testString';
        const region = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          clusterId,
          region,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCluster(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getCluster({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getCluster();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getNamespaces', () => {
    describe('positive tests', () => {
      function __getNamespacesTest() {
        // Construct the params object for operation getNamespaces
        const clusterId = 'testString';
        const region = 'testString';
        const xAuthRefreshToken = 'testString';
        const limit = 1000;
        const offset = 38;
        const params = {
          clusterId: clusterId,
          region: region,
          xAuthRefreshToken: xAuthRefreshToken,
          limit: limit,
          offset: offset,
        };

        const getNamespacesResult = catalogManagementService.getNamespaces(params);

        // all methods should return a Promise
        expectToBePromise(getNamespacesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/deploy/kubernetes/clusters/{cluster_id}/namespaces', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.path.cluster_id).toEqual(clusterId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getNamespacesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getNamespacesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getNamespacesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const clusterId = 'testString';
        const region = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          clusterId,
          region,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getNamespaces(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getNamespaces({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getNamespaces();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deployOperators', () => {
    describe('positive tests', () => {
      function __deployOperatorsTest() {
        // Construct the params object for operation deployOperators
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespaces = ['testString'];
        const allNamespaces = true;
        const versionLocatorId = 'testString';
        const params = {
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          namespaces: namespaces,
          allNamespaces: allNamespaces,
          versionLocatorId: versionLocatorId,
        };

        const deployOperatorsResult = catalogManagementService.deployOperators(params);

        // all methods should return a Promise
        expectToBePromise(deployOperatorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/deploy/kubernetes/olm/operator', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.namespaces).toEqual(namespaces);
        expect(mockRequestOptions.body.all_namespaces).toEqual(allNamespaces);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deployOperatorsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deployOperatorsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deployOperatorsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deployOperators(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deployOperators({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deployOperators();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listOperators', () => {
    describe('positive tests', () => {
      function __listOperatorsTest() {
        // Construct the params object for operation listOperators
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const versionLocatorId = 'testString';
        const params = {
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          versionLocatorId: versionLocatorId,
        };

        const listOperatorsResult = catalogManagementService.listOperators(params);

        // all methods should return a Promise
        expectToBePromise(listOperatorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/deploy/kubernetes/olm/operator', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.qs.version_locator_id).toEqual(versionLocatorId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOperatorsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listOperatorsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listOperatorsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const versionLocatorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthRefreshToken,
          clusterId,
          region,
          versionLocatorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listOperators(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listOperators({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listOperators();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('replaceOperators', () => {
    describe('positive tests', () => {
      function __replaceOperatorsTest() {
        // Construct the params object for operation replaceOperators
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespaces = ['testString'];
        const allNamespaces = true;
        const versionLocatorId = 'testString';
        const params = {
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          namespaces: namespaces,
          allNamespaces: allNamespaces,
          versionLocatorId: versionLocatorId,
        };

        const replaceOperatorsResult = catalogManagementService.replaceOperators(params);

        // all methods should return a Promise
        expectToBePromise(replaceOperatorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/deploy/kubernetes/olm/operator', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.namespaces).toEqual(namespaces);
        expect(mockRequestOptions.body.all_namespaces).toEqual(allNamespaces);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceOperatorsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __replaceOperatorsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __replaceOperatorsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceOperators(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.replaceOperators({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.replaceOperators();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteOperators', () => {
    describe('positive tests', () => {
      function __deleteOperatorsTest() {
        // Construct the params object for operation deleteOperators
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const versionLocatorId = 'testString';
        const params = {
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          versionLocatorId: versionLocatorId,
        };

        const deleteOperatorsResult = catalogManagementService.deleteOperators(params);

        // all methods should return a Promise
        expectToBePromise(deleteOperatorsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/deploy/kubernetes/olm/operator', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.qs.version_locator_id).toEqual(versionLocatorId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteOperatorsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteOperatorsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteOperatorsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const versionLocatorId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthRefreshToken,
          clusterId,
          region,
          versionLocatorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteOperators(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteOperators({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteOperators();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('installVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DeployRequestBodySchematics
      const deployRequestBodySchematicsModel = {
        name: 'testString',
        description: 'testString',
        tags: ['testString'],
        resource_group_id: 'testString',
      };

      function __installVersionTest() {
        // Construct the params object for operation installVersion
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespace = 'testString';
        const overrideValues = { 'key1': 'testString' };
        const entitlementApikey = 'testString';
        const schematics = deployRequestBodySchematicsModel;
        const script = 'testString';
        const scriptId = 'testString';
        const versionLocatorId = 'testString';
        const vcenterId = 'testString';
        const vcenterUser = 'testString';
        const vcenterPassword = 'testString';
        const vcenterLocation = 'testString';
        const vcenterDatastore = 'testString';
        const params = {
          versionLocId: versionLocId,
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          namespace: namespace,
          overrideValues: overrideValues,
          entitlementApikey: entitlementApikey,
          schematics: schematics,
          script: script,
          scriptId: scriptId,
          versionLocatorId: versionLocatorId,
          vcenterId: vcenterId,
          vcenterUser: vcenterUser,
          vcenterPassword: vcenterPassword,
          vcenterLocation: vcenterLocation,
          vcenterDatastore: vcenterDatastore,
        };

        const installVersionResult = catalogManagementService.installVersion(params);

        // all methods should return a Promise
        expectToBePromise(installVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/install', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.namespace).toEqual(namespace);
        expect(mockRequestOptions.body.override_values).toEqual(overrideValues);
        expect(mockRequestOptions.body.entitlement_apikey).toEqual(entitlementApikey);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
        expect(mockRequestOptions.body.script).toEqual(script);
        expect(mockRequestOptions.body.script_id).toEqual(scriptId);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
        expect(mockRequestOptions.body.vcenter_id).toEqual(vcenterId);
        expect(mockRequestOptions.body.vcenter_user).toEqual(vcenterUser);
        expect(mockRequestOptions.body.vcenter_password).toEqual(vcenterPassword);
        expect(mockRequestOptions.body.vcenter_location).toEqual(vcenterLocation);
        expect(mockRequestOptions.body.vcenter_datastore).toEqual(vcenterDatastore);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __installVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __installVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __installVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.installVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.installVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.installVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('preinstallVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DeployRequestBodySchematics
      const deployRequestBodySchematicsModel = {
        name: 'testString',
        description: 'testString',
        tags: ['testString'],
        resource_group_id: 'testString',
      };

      function __preinstallVersionTest() {
        // Construct the params object for operation preinstallVersion
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespace = 'testString';
        const overrideValues = { 'key1': 'testString' };
        const entitlementApikey = 'testString';
        const schematics = deployRequestBodySchematicsModel;
        const script = 'testString';
        const scriptId = 'testString';
        const versionLocatorId = 'testString';
        const vcenterId = 'testString';
        const vcenterUser = 'testString';
        const vcenterPassword = 'testString';
        const vcenterLocation = 'testString';
        const vcenterDatastore = 'testString';
        const params = {
          versionLocId: versionLocId,
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          namespace: namespace,
          overrideValues: overrideValues,
          entitlementApikey: entitlementApikey,
          schematics: schematics,
          script: script,
          scriptId: scriptId,
          versionLocatorId: versionLocatorId,
          vcenterId: vcenterId,
          vcenterUser: vcenterUser,
          vcenterPassword: vcenterPassword,
          vcenterLocation: vcenterLocation,
          vcenterDatastore: vcenterDatastore,
        };

        const preinstallVersionResult = catalogManagementService.preinstallVersion(params);

        // all methods should return a Promise
        expectToBePromise(preinstallVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/preinstall', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.namespace).toEqual(namespace);
        expect(mockRequestOptions.body.override_values).toEqual(overrideValues);
        expect(mockRequestOptions.body.entitlement_apikey).toEqual(entitlementApikey);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
        expect(mockRequestOptions.body.script).toEqual(script);
        expect(mockRequestOptions.body.script_id).toEqual(scriptId);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
        expect(mockRequestOptions.body.vcenter_id).toEqual(vcenterId);
        expect(mockRequestOptions.body.vcenter_user).toEqual(vcenterUser);
        expect(mockRequestOptions.body.vcenter_password).toEqual(vcenterPassword);
        expect(mockRequestOptions.body.vcenter_location).toEqual(vcenterLocation);
        expect(mockRequestOptions.body.vcenter_datastore).toEqual(vcenterDatastore);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __preinstallVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __preinstallVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __preinstallVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.preinstallVersion(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.preinstallVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.preinstallVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getPreinstall', () => {
    describe('positive tests', () => {
      function __getPreinstallTest() {
        // Construct the params object for operation getPreinstall
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespace = 'testString';
        const params = {
          versionLocId: versionLocId,
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          namespace: namespace,
        };

        const getPreinstallResult = catalogManagementService.getPreinstall(params);

        // all methods should return a Promise
        expectToBePromise(getPreinstallResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/preinstall', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.qs.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.qs.region).toEqual(region);
        expect(mockRequestOptions.qs.namespace).toEqual(namespace);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getPreinstallTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getPreinstallTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getPreinstallTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getPreinstall(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getPreinstall({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getPreinstall();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('validateInstall', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DeployRequestBodySchematics
      const deployRequestBodySchematicsModel = {
        name: 'testString',
        description: 'testString',
        tags: ['testString'],
        resource_group_id: 'testString',
      };

      function __validateInstallTest() {
        // Construct the params object for operation validateInstall
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespace = 'testString';
        const overrideValues = { 'key1': 'testString' };
        const entitlementApikey = 'testString';
        const schematics = deployRequestBodySchematicsModel;
        const script = 'testString';
        const scriptId = 'testString';
        const versionLocatorId = 'testString';
        const vcenterId = 'testString';
        const vcenterUser = 'testString';
        const vcenterPassword = 'testString';
        const vcenterLocation = 'testString';
        const vcenterDatastore = 'testString';
        const params = {
          versionLocId: versionLocId,
          xAuthRefreshToken: xAuthRefreshToken,
          clusterId: clusterId,
          region: region,
          namespace: namespace,
          overrideValues: overrideValues,
          entitlementApikey: entitlementApikey,
          schematics: schematics,
          script: script,
          scriptId: scriptId,
          versionLocatorId: versionLocatorId,
          vcenterId: vcenterId,
          vcenterUser: vcenterUser,
          vcenterPassword: vcenterPassword,
          vcenterLocation: vcenterLocation,
          vcenterDatastore: vcenterDatastore,
        };

        const validateInstallResult = catalogManagementService.validateInstall(params);

        // all methods should return a Promise
        expectToBePromise(validateInstallResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/validation/install', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.region).toEqual(region);
        expect(mockRequestOptions.body.namespace).toEqual(namespace);
        expect(mockRequestOptions.body.override_values).toEqual(overrideValues);
        expect(mockRequestOptions.body.entitlement_apikey).toEqual(entitlementApikey);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
        expect(mockRequestOptions.body.script).toEqual(script);
        expect(mockRequestOptions.body.script_id).toEqual(scriptId);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
        expect(mockRequestOptions.body.vcenter_id).toEqual(vcenterId);
        expect(mockRequestOptions.body.vcenter_user).toEqual(vcenterUser);
        expect(mockRequestOptions.body.vcenter_password).toEqual(vcenterPassword);
        expect(mockRequestOptions.body.vcenter_location).toEqual(vcenterLocation);
        expect(mockRequestOptions.body.vcenter_datastore).toEqual(vcenterDatastore);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __validateInstallTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __validateInstallTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __validateInstallTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.validateInstall(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.validateInstall({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.validateInstall();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getValidationStatus', () => {
    describe('positive tests', () => {
      function __getValidationStatusTest() {
        // Construct the params object for operation getValidationStatus
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const params = {
          versionLocId: versionLocId,
          xAuthRefreshToken: xAuthRefreshToken,
        };

        const getValidationStatusResult = catalogManagementService.getValidationStatus(params);

        // all methods should return a Promise
        expectToBePromise(getValidationStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/validation/install', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getValidationStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getValidationStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getValidationStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getValidationStatus(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getValidationStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getValidationStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOverrideValues', () => {
    describe('positive tests', () => {
      function __getOverrideValuesTest() {
        // Construct the params object for operation getOverrideValues
        const versionLocId = 'testString';
        const params = {
          versionLocId: versionLocId,
        };

        const getOverrideValuesResult = catalogManagementService.getOverrideValues(params);

        // all methods should return a Promise
        expectToBePromise(getOverrideValuesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/validation/overridevalues', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOverrideValuesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOverrideValuesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOverrideValuesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOverrideValues(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOverrideValues({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOverrideValues();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('searchObjects', () => {
    describe('positive tests', () => {
      function __searchObjectsTest() {
        // Construct the params object for operation searchObjects
        const query = 'testString';
        const limit = 1000;
        const offset = 38;
        const collapse = true;
        const digest = true;
        const params = {
          query: query,
          limit: limit,
          offset: offset,
          collapse: collapse,
          digest: digest,
        };

        const searchObjectsResult = catalogManagementService.searchObjects(params);

        // all methods should return a Promise
        expectToBePromise(searchObjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/objects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.query).toEqual(query);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.collapse).toEqual(collapse);
        expect(mockRequestOptions.qs.digest).toEqual(digest);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __searchObjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __searchObjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __searchObjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const query = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.searchObjects(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.searchObjects({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.searchObjects();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listObjects', () => {
    describe('positive tests', () => {
      function __listObjectsTest() {
        // Construct the params object for operation listObjects
        const catalogIdentifier = 'testString';
        const limit = 1000;
        const offset = 38;
        const name = 'testString';
        const sort = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          limit: limit,
          offset: offset,
          name: name,
          sort: sort,
        };

        const listObjectsResult = catalogManagementService.listObjects(params);

        // all methods should return a Promise
        expectToBePromise(listObjectsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listObjectsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listObjectsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listObjectsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listObjects(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listObjects({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listObjects();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createObject', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PublishObject
      const publishObjectModel = {
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
        portal_approval_record: 'testString',
        portal_url: 'testString',
      };

      // State
      const stateModel = {
        current: 'testString',
        current_entered: '2019-01-01T12:00:00.000Z',
        pending: 'testString',
        pending_requested: '2019-01-01T12:00:00.000Z',
        previous: 'testString',
      };

      function __createObjectTest() {
        // Construct the params object for operation createObject
        const catalogIdentifier = 'testString';
        const id = 'testString';
        const name = 'testString';
        const rev = 'testString';
        const crn = 'testString';
        const url = 'testString';
        const parentId = 'testString';
        const labelI18n = 'testString';
        const label = 'testString';
        const tags = ['testString'];
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const shortDescription = 'testString';
        const shortDescriptionI18n = 'testString';
        const kind = 'testString';
        const publish = publishObjectModel;
        const state = stateModel;
        const catalogId = 'testString';
        const catalogName = 'testString';
        const data = { 'key1': 'testString' };
        const params = {
          catalogIdentifier: catalogIdentifier,
          id: id,
          name: name,
          rev: rev,
          crn: crn,
          url: url,
          parentId: parentId,
          labelI18n: labelI18n,
          label: label,
          tags: tags,
          created: created,
          updated: updated,
          shortDescription: shortDescription,
          shortDescriptionI18n: shortDescriptionI18n,
          kind: kind,
          publish: publish,
          state: state,
          catalogId: catalogId,
          catalogName: catalogName,
          data: data,
        };

        const createObjectResult = catalogManagementService.createObject(params);

        // all methods should return a Promise
        expectToBePromise(createObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.parent_id).toEqual(parentId);
        expect(mockRequestOptions.body.label_i18n).toEqual(labelI18n);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.updated).toEqual(updated);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.short_description_i18n).toEqual(shortDescriptionI18n);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.publish).toEqual(publish);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.body.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.body.catalog_name).toEqual(catalogName);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __createObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __createObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.createObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.createObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getObject', () => {
    describe('positive tests', () => {
      function __getObjectTest() {
        // Construct the params object for operation getObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
        };

        const getObjectResult = catalogManagementService.getObject(params);

        // all methods should return a Promise
        expectToBePromise(getObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('replaceObject', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PublishObject
      const publishObjectModel = {
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
        portal_approval_record: 'testString',
        portal_url: 'testString',
      };

      // State
      const stateModel = {
        current: 'testString',
        current_entered: '2019-01-01T12:00:00.000Z',
        pending: 'testString',
        pending_requested: '2019-01-01T12:00:00.000Z',
        previous: 'testString',
      };

      function __replaceObjectTest() {
        // Construct the params object for operation replaceObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const id = 'testString';
        const name = 'testString';
        const rev = 'testString';
        const crn = 'testString';
        const url = 'testString';
        const parentId = 'testString';
        const labelI18n = 'testString';
        const label = 'testString';
        const tags = ['testString'];
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const shortDescription = 'testString';
        const shortDescriptionI18n = 'testString';
        const kind = 'testString';
        const publish = publishObjectModel;
        const state = stateModel;
        const catalogId = 'testString';
        const catalogName = 'testString';
        const data = { 'key1': 'testString' };
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
          id: id,
          name: name,
          rev: rev,
          crn: crn,
          url: url,
          parentId: parentId,
          labelI18n: labelI18n,
          label: label,
          tags: tags,
          created: created,
          updated: updated,
          shortDescription: shortDescription,
          shortDescriptionI18n: shortDescriptionI18n,
          kind: kind,
          publish: publish,
          state: state,
          catalogId: catalogId,
          catalogName: catalogName,
          data: data,
        };

        const replaceObjectResult = catalogManagementService.replaceObject(params);

        // all methods should return a Promise
        expectToBePromise(replaceObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.parent_id).toEqual(parentId);
        expect(mockRequestOptions.body.label_i18n).toEqual(labelI18n);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.updated).toEqual(updated);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.short_description_i18n).toEqual(shortDescriptionI18n);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.publish).toEqual(publish);
        expect(mockRequestOptions.body.state).toEqual(state);
        expect(mockRequestOptions.body.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.body.catalog_name).toEqual(catalogName);
        expect(mockRequestOptions.body.data).toEqual(data);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __replaceObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __replaceObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.replaceObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.replaceObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteObject', () => {
    describe('positive tests', () => {
      function __deleteObjectTest() {
        // Construct the params object for operation deleteObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
        };

        const deleteObjectResult = catalogManagementService.deleteObject(params);

        // all methods should return a Promise
        expectToBePromise(deleteObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getObjectAudit', () => {
    describe('positive tests', () => {
      function __getObjectAuditTest() {
        // Construct the params object for operation getObjectAudit
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
        };

        const getObjectAuditResult = catalogManagementService.getObjectAudit(params);

        // all methods should return a Promise
        expectToBePromise(getObjectAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/audit', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getObjectAuditTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getObjectAuditTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getObjectAuditTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObjectAudit(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAudit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAudit();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('accountPublishObject', () => {
    describe('positive tests', () => {
      function __accountPublishObjectTest() {
        // Construct the params object for operation accountPublishObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
        };

        const accountPublishObjectResult = catalogManagementService.accountPublishObject(params);

        // all methods should return a Promise
        expectToBePromise(accountPublishObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/account-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __accountPublishObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __accountPublishObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __accountPublishObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.accountPublishObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.accountPublishObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.accountPublishObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('sharedPublishObject', () => {
    describe('positive tests', () => {
      function __sharedPublishObjectTest() {
        // Construct the params object for operation sharedPublishObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
        };

        const sharedPublishObjectResult = catalogManagementService.sharedPublishObject(params);

        // all methods should return a Promise
        expectToBePromise(sharedPublishObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/shared-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __sharedPublishObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __sharedPublishObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __sharedPublishObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.sharedPublishObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.sharedPublishObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.sharedPublishObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('ibmPublishObject', () => {
    describe('positive tests', () => {
      function __ibmPublishObjectTest() {
        // Construct the params object for operation ibmPublishObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
        };

        const ibmPublishObjectResult = catalogManagementService.ibmPublishObject(params);

        // all methods should return a Promise
        expectToBePromise(ibmPublishObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/ibm-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __ibmPublishObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __ibmPublishObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __ibmPublishObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.ibmPublishObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.ibmPublishObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.ibmPublishObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('publicPublishObject', () => {
    describe('positive tests', () => {
      function __publicPublishObjectTest() {
        // Construct the params object for operation publicPublishObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
        };

        const publicPublishObjectResult = catalogManagementService.publicPublishObject(params);

        // all methods should return a Promise
        expectToBePromise(publicPublishObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/public-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __publicPublishObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __publicPublishObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __publicPublishObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.publicPublishObject(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.publicPublishObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.publicPublishObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createObjectAccess', () => {
    describe('positive tests', () => {
      function __createObjectAccessTest() {
        // Construct the params object for operation createObjectAccess
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accountIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
          accountIdentifier: accountIdentifier,
        };

        const createObjectAccessResult = catalogManagementService.createObjectAccess(params);

        // all methods should return a Promise
        expectToBePromise(createObjectAccessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{account_identifier}', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
        expect(mockRequestOptions.path.account_identifier).toEqual(accountIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createObjectAccessTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __createObjectAccessTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __createObjectAccessTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accountIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          accountIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createObjectAccess(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.createObjectAccess({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.createObjectAccess();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getObjectAccess', () => {
    describe('positive tests', () => {
      function __getObjectAccessTest() {
        // Construct the params object for operation getObjectAccess
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accountIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
          accountIdentifier: accountIdentifier,
        };

        const getObjectAccessResult = catalogManagementService.getObjectAccess(params);

        // all methods should return a Promise
        expectToBePromise(getObjectAccessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{account_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
        expect(mockRequestOptions.path.account_identifier).toEqual(accountIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getObjectAccessTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getObjectAccessTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getObjectAccessTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accountIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          accountIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObjectAccess(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAccess({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAccess();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteObjectAccess', () => {
    describe('positive tests', () => {
      function __deleteObjectAccessTest() {
        // Construct the params object for operation deleteObjectAccess
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accountIdentifier = 'testString';
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
          accountIdentifier: accountIdentifier,
        };

        const deleteObjectAccessResult = catalogManagementService.deleteObjectAccess(params);

        // all methods should return a Promise
        expectToBePromise(deleteObjectAccessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{account_identifier}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
        expect(mockRequestOptions.path.account_identifier).toEqual(accountIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteObjectAccessTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteObjectAccessTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteObjectAccessTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accountIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          accountIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteObjectAccess(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteObjectAccess({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteObjectAccess();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getObjectAccessList', () => {
    describe('positive tests', () => {
      function __getObjectAccessListTest() {
        // Construct the params object for operation getObjectAccessList
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const limit = 1000;
        const offset = 38;
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
          limit: limit,
          offset: offset,
        };

        const getObjectAccessListResult = catalogManagementService.getObjectAccessList(params);

        // all methods should return a Promise
        expectToBePromise(getObjectAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getObjectAccessListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getObjectAccessListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getObjectAccessListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObjectAccessList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAccessList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAccessList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteObjectAccessList', () => {
    describe('positive tests', () => {
      function __deleteObjectAccessListTest() {
        // Construct the params object for operation deleteObjectAccessList
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accounts = ['testString'];
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
          accounts: accounts,
        };

        const deleteObjectAccessListResult = catalogManagementService.deleteObjectAccessList(params);

        // all methods should return a Promise
        expectToBePromise(deleteObjectAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accounts);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteObjectAccessListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteObjectAccessListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteObjectAccessListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accounts = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          accounts,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteObjectAccessList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteObjectAccessList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteObjectAccessList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('addObjectAccessList', () => {
    describe('positive tests', () => {
      function __addObjectAccessListTest() {
        // Construct the params object for operation addObjectAccessList
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accounts = ['testString'];
        const params = {
          catalogIdentifier: catalogIdentifier,
          objectIdentifier: objectIdentifier,
          accounts: accounts,
        };

        const addObjectAccessListResult = catalogManagementService.addObjectAccessList(params);

        // all methods should return a Promise
        expectToBePromise(addObjectAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accounts);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addObjectAccessListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __addObjectAccessListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __addObjectAccessListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accounts = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          catalogIdentifier,
          objectIdentifier,
          accounts,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.addObjectAccessList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.addObjectAccessList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.addObjectAccessList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('createOfferingInstance', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // OfferingInstanceLastOperation
      const offeringInstanceLastOperationModel = {
        operation: 'testString',
        state: 'testString',
        message: 'testString',
        transaction_id: 'testString',
        updated: 'testString',
      };

      function __createOfferingInstanceTest() {
        // Construct the params object for operation createOfferingInstance
        const xAuthRefreshToken = 'testString';
        const id = 'testString';
        const rev = 'testString';
        const url = 'testString';
        const crn = 'testString';
        const label = 'testString';
        const catalogId = 'testString';
        const offeringId = 'testString';
        const kindFormat = 'testString';
        const version = 'testString';
        const clusterId = 'testString';
        const clusterRegion = 'testString';
        const clusterNamespaces = ['testString'];
        const clusterAllNamespaces = true;
        const schematicsWorkspaceId = 'testString';
        const resourceGroupId = 'testString';
        const installPlan = 'testString';
        const channel = 'testString';
        const metadata = { 'key1': 'testString' };
        const lastOperation = offeringInstanceLastOperationModel;
        const params = {
          xAuthRefreshToken: xAuthRefreshToken,
          id: id,
          rev: rev,
          url: url,
          crn: crn,
          label: label,
          catalogId: catalogId,
          offeringId: offeringId,
          kindFormat: kindFormat,
          version: version,
          clusterId: clusterId,
          clusterRegion: clusterRegion,
          clusterNamespaces: clusterNamespaces,
          clusterAllNamespaces: clusterAllNamespaces,
          schematicsWorkspaceId: schematicsWorkspaceId,
          resourceGroupId: resourceGroupId,
          installPlan: installPlan,
          channel: channel,
          metadata: metadata,
          lastOperation: lastOperation,
        };

        const createOfferingInstanceResult = catalogManagementService.createOfferingInstance(params);

        // all methods should return a Promise
        expectToBePromise(createOfferingInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/offerings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.body.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.body.kind_format).toEqual(kindFormat);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.cluster_region).toEqual(clusterRegion);
        expect(mockRequestOptions.body.cluster_namespaces).toEqual(clusterNamespaces);
        expect(mockRequestOptions.body.cluster_all_namespaces).toEqual(clusterAllNamespaces);
        expect(mockRequestOptions.body.schematics_workspace_id).toEqual(schematicsWorkspaceId);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.install_plan).toEqual(installPlan);
        expect(mockRequestOptions.body.channel).toEqual(channel);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.last_operation).toEqual(lastOperation);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createOfferingInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __createOfferingInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __createOfferingInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createOfferingInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.createOfferingInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.createOfferingInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getOfferingInstance', () => {
    describe('positive tests', () => {
      function __getOfferingInstanceTest() {
        // Construct the params object for operation getOfferingInstance
        const instanceIdentifier = 'testString';
        const params = {
          instanceIdentifier: instanceIdentifier,
        };

        const getOfferingInstanceResult = catalogManagementService.getOfferingInstance(params);

        // all methods should return a Promise
        expectToBePromise(getOfferingInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/offerings/{instance_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_identifier).toEqual(instanceIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('putOfferingInstance', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // OfferingInstanceLastOperation
      const offeringInstanceLastOperationModel = {
        operation: 'testString',
        state: 'testString',
        message: 'testString',
        transaction_id: 'testString',
        updated: 'testString',
      };

      function __putOfferingInstanceTest() {
        // Construct the params object for operation putOfferingInstance
        const instanceIdentifier = 'testString';
        const xAuthRefreshToken = 'testString';
        const id = 'testString';
        const rev = 'testString';
        const url = 'testString';
        const crn = 'testString';
        const label = 'testString';
        const catalogId = 'testString';
        const offeringId = 'testString';
        const kindFormat = 'testString';
        const version = 'testString';
        const clusterId = 'testString';
        const clusterRegion = 'testString';
        const clusterNamespaces = ['testString'];
        const clusterAllNamespaces = true;
        const schematicsWorkspaceId = 'testString';
        const resourceGroupId = 'testString';
        const installPlan = 'testString';
        const channel = 'testString';
        const metadata = { 'key1': 'testString' };
        const lastOperation = offeringInstanceLastOperationModel;
        const params = {
          instanceIdentifier: instanceIdentifier,
          xAuthRefreshToken: xAuthRefreshToken,
          id: id,
          rev: rev,
          url: url,
          crn: crn,
          label: label,
          catalogId: catalogId,
          offeringId: offeringId,
          kindFormat: kindFormat,
          version: version,
          clusterId: clusterId,
          clusterRegion: clusterRegion,
          clusterNamespaces: clusterNamespaces,
          clusterAllNamespaces: clusterAllNamespaces,
          schematicsWorkspaceId: schematicsWorkspaceId,
          resourceGroupId: resourceGroupId,
          installPlan: installPlan,
          channel: channel,
          metadata: metadata,
          lastOperation: lastOperation,
        };

        const putOfferingInstanceResult = catalogManagementService.putOfferingInstance(params);

        // all methods should return a Promise
        expectToBePromise(putOfferingInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/offerings/{instance_identifier}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.catalog_id).toEqual(catalogId);
        expect(mockRequestOptions.body.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.body.kind_format).toEqual(kindFormat);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.cluster_region).toEqual(clusterRegion);
        expect(mockRequestOptions.body.cluster_namespaces).toEqual(clusterNamespaces);
        expect(mockRequestOptions.body.cluster_all_namespaces).toEqual(clusterAllNamespaces);
        expect(mockRequestOptions.body.schematics_workspace_id).toEqual(schematicsWorkspaceId);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.install_plan).toEqual(installPlan);
        expect(mockRequestOptions.body.channel).toEqual(channel);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.last_operation).toEqual(lastOperation);
        expect(mockRequestOptions.path.instance_identifier).toEqual(instanceIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __putOfferingInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __putOfferingInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __putOfferingInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceIdentifier = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceIdentifier,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.putOfferingInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.putOfferingInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.putOfferingInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('deleteOfferingInstance', () => {
    describe('positive tests', () => {
      function __deleteOfferingInstanceTest() {
        // Construct the params object for operation deleteOfferingInstance
        const instanceIdentifier = 'testString';
        const xAuthRefreshToken = 'testString';
        const params = {
          instanceIdentifier: instanceIdentifier,
          xAuthRefreshToken: xAuthRefreshToken,
        };

        const deleteOfferingInstanceResult = catalogManagementService.deleteOfferingInstance(params);

        // all methods should return a Promise
        expectToBePromise(deleteOfferingInstanceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/offerings/{instance_identifier}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Refresh-Token', xAuthRefreshToken);
        expect(mockRequestOptions.path.instance_identifier).toEqual(instanceIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteOfferingInstanceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteOfferingInstanceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteOfferingInstanceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceIdentifier = 'testString';
        const xAuthRefreshToken = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceIdentifier,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteOfferingInstance(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteOfferingInstance({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteOfferingInstance();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
