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

/* eslint-disable no-await-in-loop */

const nock = require('nock');

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;
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

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(catalogManagementService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('CatalogManagementV1', () => {
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
        const getCatalogAccountParams = {};

        const getCatalogAccountResult = catalogManagementService.getCatalogAccount(getCatalogAccountParams);

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
        const getCatalogAccountParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAccount(getCatalogAccountParams);
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
        const rev = 'testString';
        const hideIbmCloudCatalog = true;
        const accountFilters = filtersModel;
        const updateCatalogAccountParams = {
          id,
          rev,
          hideIbmCloudCatalog,
          accountFilters,
        };

        const updateCatalogAccountResult = catalogManagementService.updateCatalogAccount(updateCatalogAccountParams);

        // all methods should return a Promise
        expectToBePromise(updateCatalogAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogaccount', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body._rev).toEqual(rev);
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
        const updateCatalogAccountParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.updateCatalogAccount(updateCatalogAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.updateCatalogAccount({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('listCatalogAccountAudits', () => {
    describe('positive tests', () => {
      function __listCatalogAccountAuditsTest() {
        // Construct the params object for operation listCatalogAccountAudits
        const start = 'testString';
        const limit = 100;
        const lookupnames = true;
        const listCatalogAccountAuditsParams = {
          start,
          limit,
          lookupnames,
        };

        const listCatalogAccountAuditsResult = catalogManagementService.listCatalogAccountAudits(listCatalogAccountAuditsParams);

        // all methods should return a Promise
        expectToBePromise(listCatalogAccountAuditsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogaccount/audits', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCatalogAccountAuditsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listCatalogAccountAuditsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listCatalogAccountAuditsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCatalogAccountAuditsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listCatalogAccountAudits(listCatalogAccountAuditsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.listCatalogAccountAudits({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('CatalogAccountAuditsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogaccount/audits';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          limit: 10,
          lookupnames: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.CatalogAccountAuditsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          limit: 10,
          lookupnames: true,
        };
        const pager = new CatalogManagementV1.CatalogAccountAuditsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getCatalogAccountAudit', () => {
    describe('positive tests', () => {
      function __getCatalogAccountAuditTest() {
        // Construct the params object for operation getCatalogAccountAudit
        const auditlogIdentifier = 'testString';
        const lookupnames = true;
        const getCatalogAccountAuditParams = {
          auditlogIdentifier,
          lookupnames,
        };

        const getCatalogAccountAuditResult = catalogManagementService.getCatalogAccountAudit(getCatalogAccountAuditParams);

        // all methods should return a Promise
        expectToBePromise(getCatalogAccountAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogaccount/audits/{auditlog_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.auditlog_identifier).toEqual(auditlogIdentifier);
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
        const auditlogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCatalogAccountAuditParams = {
          auditlogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAccountAudit(getCatalogAccountAuditParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getCatalogAccountAudit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getCatalogAccountAudit();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCatalogAccountFilters', () => {
    describe('positive tests', () => {
      function __getCatalogAccountFiltersTest() {
        // Construct the params object for operation getCatalogAccountFilters
        const catalog = 'testString';
        const getCatalogAccountFiltersParams = {
          catalog,
        };

        const getCatalogAccountFiltersResult = catalogManagementService.getCatalogAccountFilters(getCatalogAccountFiltersParams);

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
        const getCatalogAccountFiltersParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAccountFilters(getCatalogAccountFiltersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.getCatalogAccountFilters({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getShareApprovalList', () => {
    describe('positive tests', () => {
      function __getShareApprovalListTest() {
        // Construct the params object for operation getShareApprovalList
        const objectType = 'offering';
        const start = 'testString';
        const limit = 100;
        const getShareApprovalListParams = {
          objectType,
          start,
          limit,
        };

        const getShareApprovalListResult = catalogManagementService.getShareApprovalList(getShareApprovalListParams);

        // all methods should return a Promise
        expectToBePromise(getShareApprovalListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/shareapproval/{object_type}/access', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.object_type).toEqual(objectType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getShareApprovalListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getShareApprovalListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getShareApprovalListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectType = 'offering';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getShareApprovalListParams = {
          objectType,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getShareApprovalList(getShareApprovalListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getShareApprovalList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getShareApprovalList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetShareApprovalListPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/shareapproval/offering/access';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          objectType: 'offering',
          limit: 10,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.GetShareApprovalListPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          objectType: 'offering',
          limit: 10,
        };
        const pager = new CatalogManagementV1.GetShareApprovalListPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('deleteShareApprovalList', () => {
    describe('positive tests', () => {
      function __deleteShareApprovalListTest() {
        // Construct the params object for operation deleteShareApprovalList
        const objectType = 'offering';
        const accesses = ['testString'];
        const deleteShareApprovalListParams = {
          objectType,
          accesses,
        };

        const deleteShareApprovalListResult = catalogManagementService.deleteShareApprovalList(deleteShareApprovalListParams);

        // all methods should return a Promise
        expectToBePromise(deleteShareApprovalListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/shareapproval/{object_type}/access', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accesses);
        expect(mockRequestOptions.path.object_type).toEqual(objectType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteShareApprovalListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteShareApprovalListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteShareApprovalListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectType = 'offering';
        const accesses = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteShareApprovalListParams = {
          objectType,
          accesses,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteShareApprovalList(deleteShareApprovalListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteShareApprovalList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteShareApprovalList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addShareApprovalList', () => {
    describe('positive tests', () => {
      function __addShareApprovalListTest() {
        // Construct the params object for operation addShareApprovalList
        const objectType = 'offering';
        const accesses = ['testString'];
        const addShareApprovalListParams = {
          objectType,
          accesses,
        };

        const addShareApprovalListResult = catalogManagementService.addShareApprovalList(addShareApprovalListParams);

        // all methods should return a Promise
        expectToBePromise(addShareApprovalListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/shareapproval/{object_type}/access', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accesses);
        expect(mockRequestOptions.path.object_type).toEqual(objectType);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addShareApprovalListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __addShareApprovalListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __addShareApprovalListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectType = 'offering';
        const accesses = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addShareApprovalListParams = {
          objectType,
          accesses,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.addShareApprovalList(addShareApprovalListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.addShareApprovalList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.addShareApprovalList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getShareApprovalListAsSource', () => {
    describe('positive tests', () => {
      function __getShareApprovalListAsSourceTest() {
        // Construct the params object for operation getShareApprovalListAsSource
        const objectType = 'offering';
        const approvalStateIdentifier = 'approved';
        const start = 'testString';
        const limit = 100;
        const enterpriseId = 'testString';
        const getShareApprovalListAsSourceParams = {
          objectType,
          approvalStateIdentifier,
          start,
          limit,
          enterpriseId,
        };

        const getShareApprovalListAsSourceResult = catalogManagementService.getShareApprovalListAsSource(getShareApprovalListAsSourceParams);

        // all methods should return a Promise
        expectToBePromise(getShareApprovalListAsSourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/shareapproval/{object_type}/access/source/{approval_state_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.enterprise_id).toEqual(enterpriseId);
        expect(mockRequestOptions.path.object_type).toEqual(objectType);
        expect(mockRequestOptions.path.approval_state_identifier).toEqual(approvalStateIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getShareApprovalListAsSourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getShareApprovalListAsSourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getShareApprovalListAsSourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectType = 'offering';
        const approvalStateIdentifier = 'approved';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getShareApprovalListAsSourceParams = {
          objectType,
          approvalStateIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getShareApprovalListAsSource(getShareApprovalListAsSourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getShareApprovalListAsSource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getShareApprovalListAsSource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetShareApprovalListAsSourcePager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/shareapproval/offering/access/source/approved';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          objectType: 'offering',
          approvalStateIdentifier: 'approved',
          limit: 10,
          enterpriseId: 'testString',
        };
        const allResults = [];
        const pager = new CatalogManagementV1.GetShareApprovalListAsSourcePager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          objectType: 'offering',
          approvalStateIdentifier: 'approved',
          limit: 10,
          enterpriseId: 'testString',
        };
        const pager = new CatalogManagementV1.GetShareApprovalListAsSourcePager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('updateShareApprovalListAsSource', () => {
    describe('positive tests', () => {
      function __updateShareApprovalListAsSourceTest() {
        // Construct the params object for operation updateShareApprovalListAsSource
        const objectType = 'offering';
        const approvalStateIdentifier = 'approved';
        const accesses = ['testString'];
        const enterpriseId = 'testString';
        const updateShareApprovalListAsSourceParams = {
          objectType,
          approvalStateIdentifier,
          accesses,
          enterpriseId,
        };

        const updateShareApprovalListAsSourceResult = catalogManagementService.updateShareApprovalListAsSource(updateShareApprovalListAsSourceParams);

        // all methods should return a Promise
        expectToBePromise(updateShareApprovalListAsSourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/shareapproval/{object_type}/access/source/{approval_state_identifier}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accesses);
        expect(mockRequestOptions.qs.enterprise_id).toEqual(enterpriseId);
        expect(mockRequestOptions.path.object_type).toEqual(objectType);
        expect(mockRequestOptions.path.approval_state_identifier).toEqual(approvalStateIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateShareApprovalListAsSourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __updateShareApprovalListAsSourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __updateShareApprovalListAsSourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const objectType = 'offering';
        const approvalStateIdentifier = 'approved';
        const accesses = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateShareApprovalListAsSourceParams = {
          objectType,
          approvalStateIdentifier,
          accesses,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.updateShareApprovalListAsSource(updateShareApprovalListAsSourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.updateShareApprovalListAsSource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.updateShareApprovalListAsSource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listCatalogs', () => {
    describe('positive tests', () => {
      function __listCatalogsTest() {
        // Construct the params object for operation listCatalogs
        const listCatalogsParams = {};

        const listCatalogsResult = catalogManagementService.listCatalogs(listCatalogsParams);

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
        const listCatalogsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listCatalogs(listCatalogsParams);
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
        title_i18n: { 'key1': 'testString' },
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
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

      // TrustedProfileInfo
      const trustedProfileInfoModel = {
        trusted_profile_id: 'testString',
        catalog_crn: 'testString',
        catalog_name: 'testString',
        target_service_id: 'testString',
      };

      // TargetAccountContext
      const targetAccountContextModel = {
        api_key: 'testString',
        trusted_profile: trustedProfileInfoModel,
        name: 'testString',
        label: 'testString',
        project_id: 'testString',
      };

      function __createCatalogTest() {
        // Construct the params object for operation createCatalog
        const label = 'testString';
        const labelI18n = { 'key1': 'testString' };
        const shortDescription = 'testString';
        const shortDescriptionI18n = { 'key1': 'testString' };
        const catalogIconUrl = 'testString';
        const catalogBannerUrl = 'testString';
        const tags = ['testString'];
        const features = [featureModel];
        const disabled = true;
        const resourceGroupId = 'testString';
        const owningAccount = 'testString';
        const catalogFilters = filtersModel;
        const syndicationSettings = syndicationResourceModel;
        const kind = 'testString';
        const metadata = { anyKey: 'anyValue' };
        const targetAccountContexts = [targetAccountContextModel];
        const createCatalogParams = {
          label,
          labelI18n,
          shortDescription,
          shortDescriptionI18n,
          catalogIconUrl,
          catalogBannerUrl,
          tags,
          features,
          disabled,
          resourceGroupId,
          owningAccount,
          catalogFilters,
          syndicationSettings,
          kind,
          metadata,
          targetAccountContexts,
        };

        const createCatalogResult = catalogManagementService.createCatalog(createCatalogParams);

        // all methods should return a Promise
        expectToBePromise(createCatalogResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.label_i18n).toEqual(labelI18n);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.short_description_i18n).toEqual(shortDescriptionI18n);
        expect(mockRequestOptions.body.catalog_icon_url).toEqual(catalogIconUrl);
        expect(mockRequestOptions.body.catalog_banner_url).toEqual(catalogBannerUrl);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.owning_account).toEqual(owningAccount);
        expect(mockRequestOptions.body.catalog_filters).toEqual(catalogFilters);
        expect(mockRequestOptions.body.syndication_settings).toEqual(syndicationSettings);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.target_account_contexts).toEqual(targetAccountContexts);
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
        const createCatalogParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createCatalog(createCatalogParams);
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
        const getCatalogParams = {
          catalogIdentifier,
        };

        const getCatalogResult = catalogManagementService.getCatalog(getCatalogParams);

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
        const getCatalogParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalog(getCatalogParams);
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
        title_i18n: { 'key1': 'testString' },
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
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

      // TrustedProfileInfo
      const trustedProfileInfoModel = {
        trusted_profile_id: 'testString',
        catalog_crn: 'testString',
        catalog_name: 'testString',
        target_service_id: 'testString',
      };

      // TargetAccountContext
      const targetAccountContextModel = {
        api_key: 'testString',
        trusted_profile: trustedProfileInfoModel,
        name: 'testString',
        label: 'testString',
        project_id: 'testString',
      };

      function __replaceCatalogTest() {
        // Construct the params object for operation replaceCatalog
        const catalogIdentifier = 'testString';
        const id = 'testString';
        const rev = 'testString';
        const label = 'testString';
        const labelI18n = { 'key1': 'testString' };
        const shortDescription = 'testString';
        const shortDescriptionI18n = { 'key1': 'testString' };
        const catalogIconUrl = 'testString';
        const catalogBannerUrl = 'testString';
        const tags = ['testString'];
        const features = [featureModel];
        const disabled = true;
        const resourceGroupId = 'testString';
        const owningAccount = 'testString';
        const catalogFilters = filtersModel;
        const syndicationSettings = syndicationResourceModel;
        const kind = 'testString';
        const metadata = { anyKey: 'anyValue' };
        const targetAccountContexts = [targetAccountContextModel];
        const replaceCatalogParams = {
          catalogIdentifier,
          id,
          rev,
          label,
          labelI18n,
          shortDescription,
          shortDescriptionI18n,
          catalogIconUrl,
          catalogBannerUrl,
          tags,
          features,
          disabled,
          resourceGroupId,
          owningAccount,
          catalogFilters,
          syndicationSettings,
          kind,
          metadata,
          targetAccountContexts,
        };

        const replaceCatalogResult = catalogManagementService.replaceCatalog(replaceCatalogParams);

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
        expect(mockRequestOptions.body.label_i18n).toEqual(labelI18n);
        expect(mockRequestOptions.body.short_description).toEqual(shortDescription);
        expect(mockRequestOptions.body.short_description_i18n).toEqual(shortDescriptionI18n);
        expect(mockRequestOptions.body.catalog_icon_url).toEqual(catalogIconUrl);
        expect(mockRequestOptions.body.catalog_banner_url).toEqual(catalogBannerUrl);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.owning_account).toEqual(owningAccount);
        expect(mockRequestOptions.body.catalog_filters).toEqual(catalogFilters);
        expect(mockRequestOptions.body.syndication_settings).toEqual(syndicationSettings);
        expect(mockRequestOptions.body.kind).toEqual(kind);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.target_account_contexts).toEqual(targetAccountContexts);
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
        const replaceCatalogParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceCatalog(replaceCatalogParams);
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
        const deleteCatalogParams = {
          catalogIdentifier,
        };

        const deleteCatalogResult = catalogManagementService.deleteCatalog(deleteCatalogParams);

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
        const deleteCatalogParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteCatalog(deleteCatalogParams);
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

  describe('listCatalogAudits', () => {
    describe('positive tests', () => {
      function __listCatalogAuditsTest() {
        // Construct the params object for operation listCatalogAudits
        const catalogIdentifier = 'testString';
        const start = 'testString';
        const limit = 100;
        const lookupnames = true;
        const listCatalogAuditsParams = {
          catalogIdentifier,
          start,
          limit,
          lookupnames,
        };

        const listCatalogAuditsResult = catalogManagementService.listCatalogAudits(listCatalogAuditsParams);

        // all methods should return a Promise
        expectToBePromise(listCatalogAuditsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/audits', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listCatalogAuditsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listCatalogAuditsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listCatalogAuditsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listCatalogAuditsParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listCatalogAudits(listCatalogAuditsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listCatalogAudits({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listCatalogAudits();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('CatalogAuditsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/audits';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.CatalogAuditsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const pager = new CatalogManagementV1.CatalogAuditsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getCatalogAudit', () => {
    describe('positive tests', () => {
      function __getCatalogAuditTest() {
        // Construct the params object for operation getCatalogAudit
        const catalogIdentifier = 'testString';
        const auditlogIdentifier = 'testString';
        const lookupnames = true;
        const getCatalogAuditParams = {
          catalogIdentifier,
          auditlogIdentifier,
          lookupnames,
        };

        const getCatalogAuditResult = catalogManagementService.getCatalogAudit(getCatalogAuditParams);

        // all methods should return a Promise
        expectToBePromise(getCatalogAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/audits/{auditlog_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.auditlog_identifier).toEqual(auditlogIdentifier);
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
        const auditlogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCatalogAuditParams = {
          catalogIdentifier,
          auditlogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCatalogAudit(getCatalogAuditParams);
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

  describe('listEnterpriseAudits', () => {
    describe('positive tests', () => {
      function __listEnterpriseAuditsTest() {
        // Construct the params object for operation listEnterpriseAudits
        const enterpriseIdentifier = 'testString';
        const start = 'testString';
        const limit = 100;
        const lookupnames = true;
        const listEnterpriseAuditsParams = {
          enterpriseIdentifier,
          start,
          limit,
          lookupnames,
        };

        const listEnterpriseAuditsResult = catalogManagementService.listEnterpriseAudits(listEnterpriseAuditsParams);

        // all methods should return a Promise
        expectToBePromise(listEnterpriseAuditsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/enterprises/{enterprise_identifier}/audits', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.enterprise_identifier).toEqual(enterpriseIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEnterpriseAuditsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listEnterpriseAuditsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listEnterpriseAuditsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const enterpriseIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEnterpriseAuditsParams = {
          enterpriseIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listEnterpriseAudits(listEnterpriseAuditsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listEnterpriseAudits({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listEnterpriseAudits();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('EnterpriseAuditsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/enterprises/testString/audits';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          enterpriseIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.EnterpriseAuditsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          enterpriseIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const pager = new CatalogManagementV1.EnterpriseAuditsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getEnterpriseAudit', () => {
    describe('positive tests', () => {
      function __getEnterpriseAuditTest() {
        // Construct the params object for operation getEnterpriseAudit
        const enterpriseIdentifier = 'testString';
        const auditlogIdentifier = 'testString';
        const lookupnames = true;
        const getEnterpriseAuditParams = {
          enterpriseIdentifier,
          auditlogIdentifier,
          lookupnames,
        };

        const getEnterpriseAuditResult = catalogManagementService.getEnterpriseAudit(getEnterpriseAuditParams);

        // all methods should return a Promise
        expectToBePromise(getEnterpriseAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/enterprises/{enterprise_identifier}/audits/{auditlog_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.enterprise_identifier).toEqual(enterpriseIdentifier);
        expect(mockRequestOptions.path.auditlog_identifier).toEqual(auditlogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEnterpriseAuditTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getEnterpriseAuditTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getEnterpriseAuditTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const enterpriseIdentifier = 'testString';
        const auditlogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEnterpriseAuditParams = {
          enterpriseIdentifier,
          auditlogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getEnterpriseAudit(getEnterpriseAuditParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getEnterpriseAudit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getEnterpriseAudit();
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
        const limit = 100;
        const offset = 0;
        const getConsumptionOfferingsParams = {
          digest,
          catalog,
          select,
          includeHidden,
          limit,
          offset,
        };

        const getConsumptionOfferingsResult = catalogManagementService.getConsumptionOfferings(getConsumptionOfferingsParams);

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
        const getConsumptionOfferingsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getConsumptionOfferings(getConsumptionOfferingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        catalogManagementService.getConsumptionOfferings({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('GetConsumptionOfferingsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/offerings';
      const mockPagerResponse1 =
        '{"next":"https://myhost.com/somePath?offset=1","total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","url":"url","crn":"crn","label":"label","label_i18n":{"mapKey":"inner"},"name":"name","offering_icon_url":"offering_icon_url","offering_docs_url":"offering_docs_url","offering_support_url":"offering_support_url","tags":["tags"],"keywords":["keywords"],"rating":{"one_star_count":14,"two_star_count":14,"three_star_count":16,"four_star_count":15},"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"kinds":[{"id":"id","format_kind":"format_kind","install_kind":"install_kind","target_kind":"target_kind","metadata":{"anyKey":"anyValue"},"tags":["tags"],"additional_features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","versions":[{"id":"id","_rev":"_rev","crn":"crn","version":"version","flavor":{"name":"name","label":"label","label_i18n":{"mapKey":"inner"},"index":5},"sha":"sha","created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","offering_id":"offering_id","catalog_id":"catalog_id","kind_id":"kind_id","tags":["tags"],"repo_url":"repo_url","source_url":"source_url","tgz_url":"tgz_url","configuration":[{"key":"key","type":"type","default_value":"anyValue","display_name":"display_name","value_constraint":"value_constraint","description":"description","required":true,"options":["anyValue"],"hidden":true,"custom_config":{"type":"type","grouping":"grouping","original_grouping":"original_grouping","grouping_index":14,"config_constraints":{"anyKey":"anyValue"},"associations":{"parameters":[{"name":"name","optionsRefresh":true}]}},"type_metadata":"type_metadata"}],"outputs":[{"key":"key","description":"description"}],"iam_permissions":[{"service_name":"service_name","role_crns":["role_crns"],"resources":[{"name":"name","description":"description","role_crns":["role_crns"]}]}],"metadata":{"anyKey":"anyValue"},"validation":{"validated":"2019-01-01T12:00:00.000Z","requested":"2019-01-01T12:00:00.000Z","state":"state","last_operation":"last_operation","target":{"anyKey":"anyValue"},"message":"message"},"required_resources":[{"type":"mem","value":"anyValue"}],"single_instance":false,"schematics_env_values":{"value":"[{\\"name\\": \\"TF_LOG\\",\\"value\\": \\"TRACE\\",\\"secure\\": false,\\"hidden\\": false}]","sm_ref":"cmsm_v1:{\\"name\\": \\"envVarSecret\\",\\"id\\":\\"1234567890\\",\\"service_id\\":\\"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::\\",\\"service_name\\":\\"My SM Instance\\",\\"group_id\\":\\"1234567890\\",\\"group_name\\":\\"My SM Group\\",\\"resource_group_id\\":\\"1234567890\\",\\"region\\":\\"eu-gb\\",\\"type\\":\\"arbitrary\\"}"},"install":{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"},"pre_install":[{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"}],"scripts":{"mapKey":{"short_description":"short_description","type":"ansible","path":"scripts/validate-post-ansible-playbook.yaml","stage":"pre","action":"validate"}},"entitlement":{"provider_name":"provider_name","provider_id":"provider_id","product_id":"product_id","part_numbers":["part_numbers"],"image_repo_name":"image_repo_name"},"licenses":[{"id":"id","name":"name","type":"type","url":"url","description":"description"}],"image_manifest_url":"image_manifest_url","deprecated":true,"package_version":"package_version","state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"version_locator":"version_locator","long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"whitelisted_accounts":["whitelisted_accounts"],"image_pull_key_name":"image_pull_key_name","deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"solution_info":{"architecture_diagrams":[{"diagram":{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"},"description":"description","description_i18n":{"mapKey":"inner"}}],"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"cost_estimate":{"version":"version","currency":"currency","projects":[{"name":"name","metadata":{"anyKey":"anyValue"},"pastBreakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"breakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"diff":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}}}],"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}},"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","pastTotalHourlyCost":"pastTotalHourlyCost","pastTotalMonthlyCost":"pastTotalMonthlyCost","diffTotalHourlyCost":"diffTotalHourlyCost","diffTotalMonthlyCost":"diffTotalMonthlyCost","timeGenerated":"2019-01-01T12:00:00.000Z"},"dependencies":[{"catalog_id":"catalog_id","id":"id","name":"name","kind":"kind","version":"version","flavors":["flavors"]}],"install_type":"install_type"},"is_consumable":false,"compliance_v3":{"authority":"authority","claims":{"profiles":[{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"}],"controls":[{"profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"names":["names"]}]},"evaluations":[{"scan_id":"scan_id","account_id":"account_id","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"result":{"failure_count":13,"scan_time":"2019-01-01T12:00:00.000Z","error_message":"error_message","complete_scan":false,"unscanned_resources":["unscanned_resources"]},"controls":[{"id":"id","name":"name","description":"description","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"failure_count":13,"pass_count":10,"parent":{"id":"id","name":"name","version":"version","description":"description","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"parent_name":"parent_name","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"ui_href":"ui_href"},"ui_href":"ui_href"}]}]}}]}],"publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"pc_managed":true,"publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"permit_request_ibm_public_publish":false,"ibm_publish_approved":true,"public_publish_approved":false,"public_original_crn":"public_original_crn","publish_public_crn":"publish_public_crn","portal_approval_record":"portal_approval_record","portal_ui_url":"portal_ui_url","catalog_id":"catalog_id","catalog_name":"catalog_name","metadata":{"anyKey":"anyValue"},"disclaimer":"disclaimer","hidden":true,"provider":"provider","provider_info":{"id":"id","name":"name"},"repo_info":{"token":"token","type":"type"},"image_pull_keys":[{"name":"name","value":"value","description":"description"}],"support":{"url":"url","process":"process","process_i18n":{"mapKey":"inner"},"locations":["locations"],"support_details":[{"type":"type","contact":"contact","response_wait_time":{"value":5,"type":"type"},"availability":{"times":[{"day":3,"start_time":"start_time","end_time":"end_time"}],"timezone":"timezone","always_available":true}}],"support_escalation":{"escalation_wait_time":{"value":5,"type":"type"},"response_wait_time":{"value":5,"type":"type"},"contact":"contact"},"support_type":"support_type"},"media":[{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"}],"deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"product_kind":"product_kind","badges":[{"id":"id","label":"label","label_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"},"icon":"icon","authority":"authority","tag":"tag","learn_more_links":{"first_party":"first_party","third_party":"third_party"},"constraints":[{"type":"type","rule":"anyValue"}]}]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","url":"url","crn":"crn","label":"label","label_i18n":{"mapKey":"inner"},"name":"name","offering_icon_url":"offering_icon_url","offering_docs_url":"offering_docs_url","offering_support_url":"offering_support_url","tags":["tags"],"keywords":["keywords"],"rating":{"one_star_count":14,"two_star_count":14,"three_star_count":16,"four_star_count":15},"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"kinds":[{"id":"id","format_kind":"format_kind","install_kind":"install_kind","target_kind":"target_kind","metadata":{"anyKey":"anyValue"},"tags":["tags"],"additional_features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","versions":[{"id":"id","_rev":"_rev","crn":"crn","version":"version","flavor":{"name":"name","label":"label","label_i18n":{"mapKey":"inner"},"index":5},"sha":"sha","created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","offering_id":"offering_id","catalog_id":"catalog_id","kind_id":"kind_id","tags":["tags"],"repo_url":"repo_url","source_url":"source_url","tgz_url":"tgz_url","configuration":[{"key":"key","type":"type","default_value":"anyValue","display_name":"display_name","value_constraint":"value_constraint","description":"description","required":true,"options":["anyValue"],"hidden":true,"custom_config":{"type":"type","grouping":"grouping","original_grouping":"original_grouping","grouping_index":14,"config_constraints":{"anyKey":"anyValue"},"associations":{"parameters":[{"name":"name","optionsRefresh":true}]}},"type_metadata":"type_metadata"}],"outputs":[{"key":"key","description":"description"}],"iam_permissions":[{"service_name":"service_name","role_crns":["role_crns"],"resources":[{"name":"name","description":"description","role_crns":["role_crns"]}]}],"metadata":{"anyKey":"anyValue"},"validation":{"validated":"2019-01-01T12:00:00.000Z","requested":"2019-01-01T12:00:00.000Z","state":"state","last_operation":"last_operation","target":{"anyKey":"anyValue"},"message":"message"},"required_resources":[{"type":"mem","value":"anyValue"}],"single_instance":false,"schematics_env_values":{"value":"[{\\"name\\": \\"TF_LOG\\",\\"value\\": \\"TRACE\\",\\"secure\\": false,\\"hidden\\": false}]","sm_ref":"cmsm_v1:{\\"name\\": \\"envVarSecret\\",\\"id\\":\\"1234567890\\",\\"service_id\\":\\"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::\\",\\"service_name\\":\\"My SM Instance\\",\\"group_id\\":\\"1234567890\\",\\"group_name\\":\\"My SM Group\\",\\"resource_group_id\\":\\"1234567890\\",\\"region\\":\\"eu-gb\\",\\"type\\":\\"arbitrary\\"}"},"install":{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"},"pre_install":[{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"}],"scripts":{"mapKey":{"short_description":"short_description","type":"ansible","path":"scripts/validate-post-ansible-playbook.yaml","stage":"pre","action":"validate"}},"entitlement":{"provider_name":"provider_name","provider_id":"provider_id","product_id":"product_id","part_numbers":["part_numbers"],"image_repo_name":"image_repo_name"},"licenses":[{"id":"id","name":"name","type":"type","url":"url","description":"description"}],"image_manifest_url":"image_manifest_url","deprecated":true,"package_version":"package_version","state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"version_locator":"version_locator","long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"whitelisted_accounts":["whitelisted_accounts"],"image_pull_key_name":"image_pull_key_name","deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"solution_info":{"architecture_diagrams":[{"diagram":{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"},"description":"description","description_i18n":{"mapKey":"inner"}}],"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"cost_estimate":{"version":"version","currency":"currency","projects":[{"name":"name","metadata":{"anyKey":"anyValue"},"pastBreakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"breakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"diff":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}}}],"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}},"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","pastTotalHourlyCost":"pastTotalHourlyCost","pastTotalMonthlyCost":"pastTotalMonthlyCost","diffTotalHourlyCost":"diffTotalHourlyCost","diffTotalMonthlyCost":"diffTotalMonthlyCost","timeGenerated":"2019-01-01T12:00:00.000Z"},"dependencies":[{"catalog_id":"catalog_id","id":"id","name":"name","kind":"kind","version":"version","flavors":["flavors"]}],"install_type":"install_type"},"is_consumable":false,"compliance_v3":{"authority":"authority","claims":{"profiles":[{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"}],"controls":[{"profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"names":["names"]}]},"evaluations":[{"scan_id":"scan_id","account_id":"account_id","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"result":{"failure_count":13,"scan_time":"2019-01-01T12:00:00.000Z","error_message":"error_message","complete_scan":false,"unscanned_resources":["unscanned_resources"]},"controls":[{"id":"id","name":"name","description":"description","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"failure_count":13,"pass_count":10,"parent":{"id":"id","name":"name","version":"version","description":"description","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"parent_name":"parent_name","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"ui_href":"ui_href"},"ui_href":"ui_href"}]}]}}]}],"publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"pc_managed":true,"publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"permit_request_ibm_public_publish":false,"ibm_publish_approved":true,"public_publish_approved":false,"public_original_crn":"public_original_crn","publish_public_crn":"publish_public_crn","portal_approval_record":"portal_approval_record","portal_ui_url":"portal_ui_url","catalog_id":"catalog_id","catalog_name":"catalog_name","metadata":{"anyKey":"anyValue"},"disclaimer":"disclaimer","hidden":true,"provider":"provider","provider_info":{"id":"id","name":"name"},"repo_info":{"token":"token","type":"type"},"image_pull_keys":[{"name":"name","value":"value","description":"description"}],"support":{"url":"url","process":"process","process_i18n":{"mapKey":"inner"},"locations":["locations"],"support_details":[{"type":"type","contact":"contact","response_wait_time":{"value":5,"type":"type"},"availability":{"times":[{"day":3,"start_time":"start_time","end_time":"end_time"}],"timezone":"timezone","always_available":true}}],"support_escalation":{"escalation_wait_time":{"value":5,"type":"type"},"response_wait_time":{"value":5,"type":"type"},"contact":"contact"},"support_type":"support_type"},"media":[{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"}],"deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"product_kind":"product_kind","badges":[{"id":"id","label":"label","label_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"},"icon":"icon","authority":"authority","tag":"tag","learn_more_links":{"first_party":"first_party","third_party":"third_party"},"constraints":[{"type":"type","rule":"anyValue"}]}]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          digest: true,
          catalog: 'testString',
          select: 'all',
          includeHidden: true,
          limit: 10,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.GetConsumptionOfferingsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          digest: true,
          catalog: 'testString',
          select: 'all',
          includeHidden: true,
          limit: 10,
        };
        const pager = new CatalogManagementV1.GetConsumptionOfferingsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listOfferings', () => {
    describe('positive tests', () => {
      function __listOfferingsTest() {
        // Construct the params object for operation listOfferings
        const catalogIdentifier = 'testString';
        const digest = true;
        const limit = 100;
        const offset = 0;
        const name = 'testString';
        const sort = 'testString';
        const includeHidden = true;
        const listOfferingsParams = {
          catalogIdentifier,
          digest,
          limit,
          offset,
          name,
          sort,
          includeHidden,
        };

        const listOfferingsResult = catalogManagementService.listOfferings(listOfferingsParams);

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
        expect(mockRequestOptions.qs.includeHidden).toEqual(includeHidden);
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
        const listOfferingsParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listOfferings(listOfferingsParams);
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

    describe('OfferingsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/offerings';
      const mockPagerResponse1 =
        '{"next":"https://myhost.com/somePath?offset=1","total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","url":"url","crn":"crn","label":"label","label_i18n":{"mapKey":"inner"},"name":"name","offering_icon_url":"offering_icon_url","offering_docs_url":"offering_docs_url","offering_support_url":"offering_support_url","tags":["tags"],"keywords":["keywords"],"rating":{"one_star_count":14,"two_star_count":14,"three_star_count":16,"four_star_count":15},"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"kinds":[{"id":"id","format_kind":"format_kind","install_kind":"install_kind","target_kind":"target_kind","metadata":{"anyKey":"anyValue"},"tags":["tags"],"additional_features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","versions":[{"id":"id","_rev":"_rev","crn":"crn","version":"version","flavor":{"name":"name","label":"label","label_i18n":{"mapKey":"inner"},"index":5},"sha":"sha","created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","offering_id":"offering_id","catalog_id":"catalog_id","kind_id":"kind_id","tags":["tags"],"repo_url":"repo_url","source_url":"source_url","tgz_url":"tgz_url","configuration":[{"key":"key","type":"type","default_value":"anyValue","display_name":"display_name","value_constraint":"value_constraint","description":"description","required":true,"options":["anyValue"],"hidden":true,"custom_config":{"type":"type","grouping":"grouping","original_grouping":"original_grouping","grouping_index":14,"config_constraints":{"anyKey":"anyValue"},"associations":{"parameters":[{"name":"name","optionsRefresh":true}]}},"type_metadata":"type_metadata"}],"outputs":[{"key":"key","description":"description"}],"iam_permissions":[{"service_name":"service_name","role_crns":["role_crns"],"resources":[{"name":"name","description":"description","role_crns":["role_crns"]}]}],"metadata":{"anyKey":"anyValue"},"validation":{"validated":"2019-01-01T12:00:00.000Z","requested":"2019-01-01T12:00:00.000Z","state":"state","last_operation":"last_operation","target":{"anyKey":"anyValue"},"message":"message"},"required_resources":[{"type":"mem","value":"anyValue"}],"single_instance":false,"schematics_env_values":{"value":"[{\\"name\\": \\"TF_LOG\\",\\"value\\": \\"TRACE\\",\\"secure\\": false,\\"hidden\\": false}]","sm_ref":"cmsm_v1:{\\"name\\": \\"envVarSecret\\",\\"id\\":\\"1234567890\\",\\"service_id\\":\\"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::\\",\\"service_name\\":\\"My SM Instance\\",\\"group_id\\":\\"1234567890\\",\\"group_name\\":\\"My SM Group\\",\\"resource_group_id\\":\\"1234567890\\",\\"region\\":\\"eu-gb\\",\\"type\\":\\"arbitrary\\"}"},"install":{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"},"pre_install":[{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"}],"scripts":{"mapKey":{"short_description":"short_description","type":"ansible","path":"scripts/validate-post-ansible-playbook.yaml","stage":"pre","action":"validate"}},"entitlement":{"provider_name":"provider_name","provider_id":"provider_id","product_id":"product_id","part_numbers":["part_numbers"],"image_repo_name":"image_repo_name"},"licenses":[{"id":"id","name":"name","type":"type","url":"url","description":"description"}],"image_manifest_url":"image_manifest_url","deprecated":true,"package_version":"package_version","state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"version_locator":"version_locator","long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"whitelisted_accounts":["whitelisted_accounts"],"image_pull_key_name":"image_pull_key_name","deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"solution_info":{"architecture_diagrams":[{"diagram":{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"},"description":"description","description_i18n":{"mapKey":"inner"}}],"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"cost_estimate":{"version":"version","currency":"currency","projects":[{"name":"name","metadata":{"anyKey":"anyValue"},"pastBreakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"breakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"diff":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}}}],"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}},"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","pastTotalHourlyCost":"pastTotalHourlyCost","pastTotalMonthlyCost":"pastTotalMonthlyCost","diffTotalHourlyCost":"diffTotalHourlyCost","diffTotalMonthlyCost":"diffTotalMonthlyCost","timeGenerated":"2019-01-01T12:00:00.000Z"},"dependencies":[{"catalog_id":"catalog_id","id":"id","name":"name","kind":"kind","version":"version","flavors":["flavors"]}],"install_type":"install_type"},"is_consumable":false,"compliance_v3":{"authority":"authority","claims":{"profiles":[{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"}],"controls":[{"profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"names":["names"]}]},"evaluations":[{"scan_id":"scan_id","account_id":"account_id","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"result":{"failure_count":13,"scan_time":"2019-01-01T12:00:00.000Z","error_message":"error_message","complete_scan":false,"unscanned_resources":["unscanned_resources"]},"controls":[{"id":"id","name":"name","description":"description","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"failure_count":13,"pass_count":10,"parent":{"id":"id","name":"name","version":"version","description":"description","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"parent_name":"parent_name","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"ui_href":"ui_href"},"ui_href":"ui_href"}]}]}}]}],"publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"pc_managed":true,"publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"permit_request_ibm_public_publish":false,"ibm_publish_approved":true,"public_publish_approved":false,"public_original_crn":"public_original_crn","publish_public_crn":"publish_public_crn","portal_approval_record":"portal_approval_record","portal_ui_url":"portal_ui_url","catalog_id":"catalog_id","catalog_name":"catalog_name","metadata":{"anyKey":"anyValue"},"disclaimer":"disclaimer","hidden":true,"provider":"provider","provider_info":{"id":"id","name":"name"},"repo_info":{"token":"token","type":"type"},"image_pull_keys":[{"name":"name","value":"value","description":"description"}],"support":{"url":"url","process":"process","process_i18n":{"mapKey":"inner"},"locations":["locations"],"support_details":[{"type":"type","contact":"contact","response_wait_time":{"value":5,"type":"type"},"availability":{"times":[{"day":3,"start_time":"start_time","end_time":"end_time"}],"timezone":"timezone","always_available":true}}],"support_escalation":{"escalation_wait_time":{"value":5,"type":"type"},"response_wait_time":{"value":5,"type":"type"},"contact":"contact"},"support_type":"support_type"},"media":[{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"}],"deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"product_kind":"product_kind","badges":[{"id":"id","label":"label","label_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"},"icon":"icon","authority":"authority","tag":"tag","learn_more_links":{"first_party":"first_party","third_party":"third_party"},"constraints":[{"type":"type","rule":"anyValue"}]}]}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","url":"url","crn":"crn","label":"label","label_i18n":{"mapKey":"inner"},"name":"name","offering_icon_url":"offering_icon_url","offering_docs_url":"offering_docs_url","offering_support_url":"offering_support_url","tags":["tags"],"keywords":["keywords"],"rating":{"one_star_count":14,"two_star_count":14,"three_star_count":16,"four_star_count":15},"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"kinds":[{"id":"id","format_kind":"format_kind","install_kind":"install_kind","target_kind":"target_kind","metadata":{"anyKey":"anyValue"},"tags":["tags"],"additional_features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","versions":[{"id":"id","_rev":"_rev","crn":"crn","version":"version","flavor":{"name":"name","label":"label","label_i18n":{"mapKey":"inner"},"index":5},"sha":"sha","created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","offering_id":"offering_id","catalog_id":"catalog_id","kind_id":"kind_id","tags":["tags"],"repo_url":"repo_url","source_url":"source_url","tgz_url":"tgz_url","configuration":[{"key":"key","type":"type","default_value":"anyValue","display_name":"display_name","value_constraint":"value_constraint","description":"description","required":true,"options":["anyValue"],"hidden":true,"custom_config":{"type":"type","grouping":"grouping","original_grouping":"original_grouping","grouping_index":14,"config_constraints":{"anyKey":"anyValue"},"associations":{"parameters":[{"name":"name","optionsRefresh":true}]}},"type_metadata":"type_metadata"}],"outputs":[{"key":"key","description":"description"}],"iam_permissions":[{"service_name":"service_name","role_crns":["role_crns"],"resources":[{"name":"name","description":"description","role_crns":["role_crns"]}]}],"metadata":{"anyKey":"anyValue"},"validation":{"validated":"2019-01-01T12:00:00.000Z","requested":"2019-01-01T12:00:00.000Z","state":"state","last_operation":"last_operation","target":{"anyKey":"anyValue"},"message":"message"},"required_resources":[{"type":"mem","value":"anyValue"}],"single_instance":false,"schematics_env_values":{"value":"[{\\"name\\": \\"TF_LOG\\",\\"value\\": \\"TRACE\\",\\"secure\\": false,\\"hidden\\": false}]","sm_ref":"cmsm_v1:{\\"name\\": \\"envVarSecret\\",\\"id\\":\\"1234567890\\",\\"service_id\\":\\"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::\\",\\"service_name\\":\\"My SM Instance\\",\\"group_id\\":\\"1234567890\\",\\"group_name\\":\\"My SM Group\\",\\"resource_group_id\\":\\"1234567890\\",\\"region\\":\\"eu-gb\\",\\"type\\":\\"arbitrary\\"}"},"install":{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"},"pre_install":[{"instructions":"instructions","instructions_i18n":{"mapKey":"inner"},"script":"script","script_permission":"script_permission","delete_script":"delete_script","scope":"scope"}],"scripts":{"mapKey":{"short_description":"short_description","type":"ansible","path":"scripts/validate-post-ansible-playbook.yaml","stage":"pre","action":"validate"}},"entitlement":{"provider_name":"provider_name","provider_id":"provider_id","product_id":"product_id","part_numbers":["part_numbers"],"image_repo_name":"image_repo_name"},"licenses":[{"id":"id","name":"name","type":"type","url":"url","description":"description"}],"image_manifest_url":"image_manifest_url","deprecated":true,"package_version":"package_version","state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"version_locator":"version_locator","long_description":"long_description","long_description_i18n":{"mapKey":"inner"},"whitelisted_accounts":["whitelisted_accounts"],"image_pull_key_name":"image_pull_key_name","deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"solution_info":{"architecture_diagrams":[{"diagram":{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"},"description":"description","description_i18n":{"mapKey":"inner"}}],"features":[{"title":"title","title_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"}}],"cost_estimate":{"version":"version","currency":"currency","projects":[{"name":"name","metadata":{"anyKey":"anyValue"},"pastBreakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"breakdown":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"diff":{"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","resources":[{"name":"name","metadata":{"anyKey":"anyValue"},"hourlyCost":"hourlyCost","monthlyCost":"monthlyCost","costComponents":[{"name":"name","unit":"unit","hourlyQuantity":"hourlyQuantity","monthlyQuantity":"monthlyQuantity","price":"price","hourlyCost":"hourlyCost","monthlyCost":"monthlyCost"}]}]},"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}}}],"summary":{"totalDetectedResources":22,"totalSupportedResources":23,"totalUnsupportedResources":25,"totalUsageBasedResources":24,"totalNoPriceResources":21,"unsupportedResourceCounts":{"mapKey":5},"noPriceResourceCounts":{"mapKey":5}},"totalHourlyCost":"totalHourlyCost","totalMonthlyCost":"totalMonthlyCost","pastTotalHourlyCost":"pastTotalHourlyCost","pastTotalMonthlyCost":"pastTotalMonthlyCost","diffTotalHourlyCost":"diffTotalHourlyCost","diffTotalMonthlyCost":"diffTotalMonthlyCost","timeGenerated":"2019-01-01T12:00:00.000Z"},"dependencies":[{"catalog_id":"catalog_id","id":"id","name":"name","kind":"kind","version":"version","flavors":["flavors"]}],"install_type":"install_type"},"is_consumable":false,"compliance_v3":{"authority":"authority","claims":{"profiles":[{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"}],"controls":[{"profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"names":["names"]}]},"evaluations":[{"scan_id":"scan_id","account_id":"account_id","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"result":{"failure_count":13,"scan_time":"2019-01-01T12:00:00.000Z","error_message":"error_message","complete_scan":false,"unscanned_resources":["unscanned_resources"]},"controls":[{"id":"id","name":"name","description":"description","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"failure_count":13,"pass_count":10,"parent":{"id":"id","name":"name","version":"version","description":"description","profile":{"id":"id","name":"name","version":"version","description":"description","type":"type","ui_href":"ui_href"},"parent_name":"parent_name","specifications":[{"id":"id","description":"description","component_name":"component_name","assessments":[{"id":"id","description":"description","version":"version","type":"type","method":"method","ui_href":"ui_href"}],"ui_href":"ui_href"}],"ui_href":"ui_href"},"ui_href":"ui_href"}]}]}}]}],"publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"pc_managed":true,"publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"permit_request_ibm_public_publish":false,"ibm_publish_approved":true,"public_publish_approved":false,"public_original_crn":"public_original_crn","publish_public_crn":"publish_public_crn","portal_approval_record":"portal_approval_record","portal_ui_url":"portal_ui_url","catalog_id":"catalog_id","catalog_name":"catalog_name","metadata":{"anyKey":"anyValue"},"disclaimer":"disclaimer","hidden":true,"provider":"provider","provider_info":{"id":"id","name":"name"},"repo_info":{"token":"token","type":"type"},"image_pull_keys":[{"name":"name","value":"value","description":"description"}],"support":{"url":"url","process":"process","process_i18n":{"mapKey":"inner"},"locations":["locations"],"support_details":[{"type":"type","contact":"contact","response_wait_time":{"value":5,"type":"type"},"availability":{"times":[{"day":3,"start_time":"start_time","end_time":"end_time"}],"timezone":"timezone","always_available":true}}],"support_escalation":{"escalation_wait_time":{"value":5,"type":"type"},"response_wait_time":{"value":5,"type":"type"},"contact":"contact"},"support_type":"support_type"},"media":[{"url":"url","api_url":"api_url","url_proxy":{"url":"url","sha":"sha"},"caption":"caption","caption_i18n":{"mapKey":"inner"},"type":"type","thumbnail_url":"thumbnail_url"}],"deprecate_pending":{"deprecate_date":"2019-01-01T12:00:00.000Z","deprecate_state":"deprecate_state","description":"description"},"product_kind":"product_kind","badges":[{"id":"id","label":"label","label_i18n":{"mapKey":"inner"},"description":"description","description_i18n":{"mapKey":"inner"},"icon":"icon","authority":"authority","tag":"tag","learn_more_links":{"first_party":"first_party","third_party":"third_party"},"constraints":[{"type":"type","rule":"anyValue"}]}]}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          digest: true,
          limit: 10,
          name: 'testString',
          sort: 'testString',
          includeHidden: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.OfferingsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          digest: true,
          limit: 10,
          name: 'testString',
          sort: 'testString',
          includeHidden: true,
        };
        const pager = new CatalogManagementV1.OfferingsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
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
        title_i18n: { 'key1': 'testString' },
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
      };

      // Flavor
      const flavorModel = {
        name: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        index: 38,
      };

      // RenderTypeAssociationsParametersItem
      const renderTypeAssociationsParametersItemModel = {
        name: 'testString',
        optionsRefresh: true,
      };

      // RenderTypeAssociations
      const renderTypeAssociationsModel = {
        parameters: [renderTypeAssociationsParametersItemModel],
      };

      // RenderType
      const renderTypeModel = {
        type: 'testString',
        grouping: 'testString',
        original_grouping: 'testString',
        grouping_index: 38,
        config_constraints: { anyKey: 'anyValue' },
        associations: renderTypeAssociationsModel,
      };

      // Configuration
      const configurationModel = {
        key: 'testString',
        type: 'testString',
        default_value: 'testString',
        display_name: 'testString',
        value_constraint: 'testString',
        description: 'testString',
        required: true,
        options: ['testString'],
        hidden: true,
        custom_config: renderTypeModel,
        type_metadata: 'testString',
      };

      // Output
      const outputModel = {
        key: 'testString',
        description: 'testString',
      };

      // IAMResource
      const iamResourceModel = {
        name: 'testString',
        description: 'testString',
        role_crns: ['testString'],
      };

      // IAMPermission
      const iamPermissionModel = {
        service_name: 'testString',
        role_crns: ['testString'],
        resources: [iamResourceModel],
      };

      // Validation
      const validationModel = {
        validated: '2019-01-01T12:00:00.000Z',
        requested: '2019-01-01T12:00:00.000Z',
        state: 'testString',
        last_operation: 'testString',
        target: { anyKey: 'anyValue' },
        message: 'testString',
      };

      // Resource
      const resourceModel = {
        type: 'mem',
        value: 'testString',
      };

      // SchematicsEnvValues
      const schematicsEnvValuesModel = {
        value: '[{"name": "TF_LOG","value": "TRACE","secure": false,"hidden": false}]',
        sm_ref: 'cmsm_v1:{"name": "envVarSecret","id":"1234567890","service_id":"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::","service_name":"My SM Instance","group_id":"1234567890","group_name":"My SM Group","resource_group_id":"1234567890","region":"eu-gb","type":"arbitrary"}',
      };

      // Script
      const scriptModel = {
        instructions: 'testString',
        instructions_i18n: { 'key1': 'testString' },
        script: 'testString',
        script_permission: 'testString',
        delete_script: 'testString',
        scope: 'testString',
      };

      // ScriptRef
      const scriptRefModel = {
        short_description: 'testString',
        type: 'ansible',
        path: 'scripts/validate-post-ansible-playbook.yaml',
        stage: 'pre',
        action: 'validate',
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

      // DeprecatePending
      const deprecatePendingModel = {
        deprecate_date: '2019-01-01T12:00:00.000Z',
        deprecate_state: 'testString',
        description: 'testString',
      };

      // URLProxy
      const urlProxyModel = {
        url: 'testString',
        sha: 'testString',
      };

      // MediaItem
      const mediaItemModel = {
        url: 'testString',
        api_url: 'testString',
        url_proxy: urlProxyModel,
        caption: 'testString',
        caption_i18n: { 'key1': 'testString' },
        type: 'testString',
        thumbnail_url: 'testString',
      };

      // ArchitectureDiagram
      const architectureDiagramModel = {
        diagram: mediaItemModel,
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
      };

      // CostComponent
      const costComponentModel = {
        name: 'testString',
        unit: 'testString',
        hourlyQuantity: 'testString',
        monthlyQuantity: 'testString',
        price: 'testString',
        hourlyCost: 'testString',
        monthlyCost: 'testString',
      };

      // CostResource
      const costResourceModel = {
        name: 'testString',
        metadata: { anyKey: 'anyValue' },
        hourlyCost: 'testString',
        monthlyCost: 'testString',
        costComponents: [costComponentModel],
      };

      // CostBreakdown
      const costBreakdownModel = {
        totalHourlyCost: 'testString',
        totalMonthlyCost: 'testString',
        resources: [costResourceModel],
      };

      // CostSummary
      const costSummaryModel = {
        totalDetectedResources: 38,
        totalSupportedResources: 38,
        totalUnsupportedResources: 38,
        totalUsageBasedResources: 38,
        totalNoPriceResources: 38,
        unsupportedResourceCounts: { 'key1': 38 },
        noPriceResourceCounts: { 'key1': 38 },
      };

      // Project
      const projectModel = {
        name: 'testString',
        metadata: { anyKey: 'anyValue' },
        pastBreakdown: costBreakdownModel,
        breakdown: costBreakdownModel,
        diff: costBreakdownModel,
        summary: costSummaryModel,
      };

      // CostEstimate
      const costEstimateModel = {
        version: 'testString',
        currency: 'testString',
        projects: [projectModel],
        summary: costSummaryModel,
        totalHourlyCost: 'testString',
        totalMonthlyCost: 'testString',
        pastTotalHourlyCost: 'testString',
        pastTotalMonthlyCost: 'testString',
        diffTotalHourlyCost: 'testString',
        diffTotalMonthlyCost: 'testString',
        timeGenerated: '2019-01-01T12:00:00.000Z',
      };

      // OfferingReference
      const offeringReferenceModel = {
        catalog_id: 'testString',
        id: 'testString',
        name: 'testString',
        kind: 'testString',
        version: 'testString',
        flavors: ['testString'],
      };

      // SolutionInfo
      const solutionInfoModel = {
        architecture_diagrams: [architectureDiagramModel],
        features: [featureModel],
        cost_estimate: costEstimateModel,
        dependencies: [offeringReferenceModel],
        install_type: 'testString',
      };

      // SCCProfile
      const sccProfileModel = {
        id: 'testString',
        name: 'testString',
        version: 'testString',
        description: 'testString',
        type: 'testString',
        ui_href: 'testString',
      };

      // ClaimedControl
      const claimedControlModel = {
        profile: sccProfileModel,
        names: ['testString'],
      };

      // Claims
      const claimsModel = {
        profiles: [sccProfileModel],
        controls: [claimedControlModel],
      };

      // Result
      const resultModel = {
        failure_count: 38,
        scan_time: '2019-01-01T12:00:00.000Z',
        error_message: 'testString',
        complete_scan: true,
        unscanned_resources: ['testString'],
      };

      // SCCAssessment
      const sccAssessmentModel = {
        id: 'testString',
        description: 'testString',
        version: 'testString',
        type: 'testString',
        method: 'testString',
        ui_href: 'testString',
      };

      // SCCSpecification
      const sccSpecificationModel = {
        id: 'testString',
        description: 'testString',
        component_name: 'testString',
        assessments: [sccAssessmentModel],
        ui_href: 'testString',
      };

      // SCCControl
      const sccControlModel = {
        id: 'testString',
        name: 'testString',
        version: 'testString',
        description: 'testString',
        profile: sccProfileModel,
        parent_name: 'testString',
        specifications: [sccSpecificationModel],
        ui_href: 'testString',
      };

      // EvaluatedControl
      const evaluatedControlModel = {
        id: 'testString',
        name: 'testString',
        description: 'testString',
        specifications: [sccSpecificationModel],
        failure_count: 38,
        pass_count: 38,
        parent: sccControlModel,
        ui_href: 'testString',
      };

      // Evaluation
      const evaluationModel = {
        scan_id: 'testString',
        account_id: 'testString',
        profile: sccProfileModel,
        result: resultModel,
        controls: [evaluatedControlModel],
      };

      // Compliance
      const complianceModel = {
        authority: 'testString',
        claims: claimsModel,
        evaluations: [evaluationModel],
      };

      // Version
      const versionModel = {
        crn: 'testString',
        version: 'testString',
        flavor: flavorModel,
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
        outputs: [outputModel],
        iam_permissions: [iamPermissionModel],
        metadata: { anyKey: 'anyValue' },
        validation: validationModel,
        required_resources: [resourceModel],
        single_instance: true,
        schematics_env_values: schematicsEnvValuesModel,
        install: scriptModel,
        pre_install: [scriptModel],
        scripts: { 'key1': scriptRefModel },
        entitlement: versionEntitlementModel,
        licenses: [licenseModel],
        image_manifest_url: 'testString',
        deprecated: true,
        package_version: 'testString',
        state: stateModel,
        version_locator: 'testString',
        long_description: 'testString',
        long_description_i18n: { 'key1': 'testString' },
        whitelisted_accounts: ['testString'],
        image_pull_key_name: 'testString',
        deprecate_pending: deprecatePendingModel,
        solution_info: solutionInfoModel,
        is_consumable: true,
        compliance_v3: complianceModel,
      };

      // Kind
      const kindModel = {
        id: 'testString',
        format_kind: 'testString',
        install_kind: 'testString',
        target_kind: 'testString',
        metadata: { anyKey: 'anyValue' },
        tags: ['testString'],
        additional_features: [featureModel],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        versions: [versionModel],
      };

      // PublishObject
      const publishObjectModel = {
        pc_managed: true,
        approval_type: 'testString',
        publish_approved: true,
        share_with_all: true,
        share_with_ibm: true,
        share_enabled: true,
        original_crn: 'testString',
        public_crn: 'testString',
        approval_record: { anyKey: 'anyValue' },
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
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

      // ImagePullKey
      const imagePullKeyModel = {
        name: 'testString',
        value: 'testString',
        description: 'testString',
      };

      // SupportWaitTime
      const supportWaitTimeModel = {
        value: 38,
        type: 'testString',
      };

      // SupportTime
      const supportTimeModel = {
        day: 38,
        start_time: 'testString',
        end_time: 'testString',
      };

      // SupportAvailability
      const supportAvailabilityModel = {
        times: [supportTimeModel],
        timezone: 'testString',
        always_available: true,
      };

      // SupportDetail
      const supportDetailModel = {
        type: 'testString',
        contact: 'testString',
        response_wait_time: supportWaitTimeModel,
        availability: supportAvailabilityModel,
      };

      // SupportEscalation
      const supportEscalationModel = {
        escalation_wait_time: supportWaitTimeModel,
        response_wait_time: supportWaitTimeModel,
        contact: 'testString',
      };

      // Support
      const supportModel = {
        url: 'testString',
        process: 'testString',
        process_i18n: { 'key1': 'testString' },
        locations: ['testString'],
        support_details: [supportDetailModel],
        support_escalation: supportEscalationModel,
        support_type: 'testString',
      };

      // LearnMoreLinks
      const learnMoreLinksModel = {
        first_party: 'testString',
        third_party: 'testString',
      };

      // Constraint
      const constraintModel = {
        type: 'testString',
        rule: 'testString',
      };

      // Badge
      const badgeModel = {
        id: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
        icon: 'testString',
        authority: 'testString',
        tag: 'testString',
        learn_more_links: learnMoreLinksModel,
        constraints: [constraintModel],
      };

      function __createOfferingTest() {
        // Construct the params object for operation createOffering
        const catalogIdentifier = 'testString';
        const url = 'testString';
        const crn = 'testString';
        const label = 'testString';
        const labelI18n = { 'key1': 'testString' };
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
        const shortDescriptionI18n = { 'key1': 'testString' };
        const longDescription = 'testString';
        const longDescriptionI18n = { 'key1': 'testString' };
        const features = [featureModel];
        const kinds = [kindModel];
        const publish = publishObjectModel;
        const pcManaged = true;
        const publishApproved = true;
        const shareWithAll = true;
        const shareWithIbm = true;
        const shareEnabled = true;
        const permitRequestIbmPublicPublish = true;
        const ibmPublishApproved = true;
        const publicPublishApproved = true;
        const publicOriginalCrn = 'testString';
        const publishPublicCrn = 'testString';
        const portalApprovalRecord = 'testString';
        const portalUiUrl = 'testString';
        const catalogId = 'testString';
        const catalogName = 'testString';
        const metadata = { anyKey: 'anyValue' };
        const disclaimer = 'testString';
        const hidden = true;
        const provider = 'testString';
        const providerInfo = providerInfoModel;
        const repoInfo = repoInfoModel;
        const imagePullKeys = [imagePullKeyModel];
        const support = supportModel;
        const media = [mediaItemModel];
        const deprecatePending = deprecatePendingModel;
        const productKind = 'testString';
        const badges = [badgeModel];
        const createOfferingParams = {
          catalogIdentifier,
          url,
          crn,
          label,
          labelI18n,
          name,
          offeringIconUrl,
          offeringDocsUrl,
          offeringSupportUrl,
          tags,
          keywords,
          rating,
          created,
          updated,
          shortDescription,
          shortDescriptionI18n,
          longDescription,
          longDescriptionI18n,
          features,
          kinds,
          publish,
          pcManaged,
          publishApproved,
          shareWithAll,
          shareWithIbm,
          shareEnabled,
          permitRequestIbmPublicPublish,
          ibmPublishApproved,
          publicPublishApproved,
          publicOriginalCrn,
          publishPublicCrn,
          portalApprovalRecord,
          portalUiUrl,
          catalogId,
          catalogName,
          metadata,
          disclaimer,
          hidden,
          provider,
          providerInfo,
          repoInfo,
          imagePullKeys,
          support,
          media,
          deprecatePending,
          productKind,
          badges,
        };

        const createOfferingResult = catalogManagementService.createOffering(createOfferingParams);

        // all methods should return a Promise
        expectToBePromise(createOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.url).toEqual(url);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.label_i18n).toEqual(labelI18n);
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
        expect(mockRequestOptions.body.short_description_i18n).toEqual(shortDescriptionI18n);
        expect(mockRequestOptions.body.long_description).toEqual(longDescription);
        expect(mockRequestOptions.body.long_description_i18n).toEqual(longDescriptionI18n);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.kinds).toEqual(kinds);
        expect(mockRequestOptions.body.publish).toEqual(publish);
        expect(mockRequestOptions.body.pc_managed).toEqual(pcManaged);
        expect(mockRequestOptions.body.publish_approved).toEqual(publishApproved);
        expect(mockRequestOptions.body.share_with_all).toEqual(shareWithAll);
        expect(mockRequestOptions.body.share_with_ibm).toEqual(shareWithIbm);
        expect(mockRequestOptions.body.share_enabled).toEqual(shareEnabled);
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
        expect(mockRequestOptions.body.image_pull_keys).toEqual(imagePullKeys);
        expect(mockRequestOptions.body.support).toEqual(support);
        expect(mockRequestOptions.body.media).toEqual(media);
        expect(mockRequestOptions.body.deprecate_pending).toEqual(deprecatePending);
        expect(mockRequestOptions.body.product_kind).toEqual(productKind);
        expect(mockRequestOptions.body.badges).toEqual(badges);
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
        const createOfferingParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createOffering(createOfferingParams);
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
      // Request models needed by this operation.

      // Flavor
      const flavorModel = {
        name: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        index: 38,
      };

      // ImportOfferingBodyMetadataOperatingSystem
      const importOfferingBodyMetadataOperatingSystemModel = {
        dedicated_host_only: true,
        vendor: 'testString',
        name: 'testString',
        href: 'testString',
        display_name: 'testString',
        family: 'testString',
        version: 'testString',
        architecture: 'testString',
      };

      // ImportOfferingBodyMetadataFile
      const importOfferingBodyMetadataFileModel = {
        size: 38,
      };

      // ImportOfferingBodyMetadataImagesItem
      const importOfferingBodyMetadataImagesItemModel = {
        id: 'testString',
        name: 'testString',
        region: 'testString',
      };

      // ImportOfferingBodyMetadata
      const importOfferingBodyMetadataModel = {
        operating_system: importOfferingBodyMetadataOperatingSystemModel,
        file: importOfferingBodyMetadataFileModel,
        minimum_provisioned_size: 38,
        images: [importOfferingBodyMetadataImagesItemModel],
      };

      function __importOfferingVersionTest() {
        // Construct the params object for operation importOfferingVersion
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const tags = ['testString'];
        const content = 'This is a mock byte array value.';
        const name = 'testString';
        const label = 'testString';
        const installKind = 'testString';
        const targetKinds = ['testString'];
        const formatKind = 'testString';
        const productKind = 'testString';
        const sha = 'testString';
        const version = 'testString';
        const flavor = flavorModel;
        const metadata = importOfferingBodyMetadataModel;
        const workingDirectory = 'testString';
        const zipurl = 'testString';
        const targetVersion = 'testString';
        const includeConfig = true;
        const isVsi = true;
        const repotype = 'testString';
        const xAuthToken = 'testString';
        const importOfferingVersionParams = {
          catalogIdentifier,
          offeringId,
          tags,
          content,
          name,
          label,
          installKind,
          targetKinds,
          formatKind,
          productKind,
          sha,
          version,
          flavor,
          metadata,
          workingDirectory,
          zipurl,
          targetVersion,
          includeConfig,
          isVsi,
          repotype,
          xAuthToken,
        };

        const importOfferingVersionResult = catalogManagementService.importOfferingVersion(importOfferingVersionParams);

        // all methods should return a Promise
        expectToBePromise(importOfferingVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/version', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Auth-Token', xAuthToken);
        expect(mockRequestOptions.body.tags).toEqual(tags);
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.install_kind).toEqual(installKind);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.format_kind).toEqual(formatKind);
        expect(mockRequestOptions.body.product_kind).toEqual(productKind);
        expect(mockRequestOptions.body.sha).toEqual(sha);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.flavor).toEqual(flavor);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.working_directory).toEqual(workingDirectory);
        expect(mockRequestOptions.qs.zipurl).toEqual(zipurl);
        expect(mockRequestOptions.qs.targetVersion).toEqual(targetVersion);
        expect(mockRequestOptions.qs.includeConfig).toEqual(includeConfig);
        expect(mockRequestOptions.qs.isVSI).toEqual(isVsi);
        expect(mockRequestOptions.qs.repotype).toEqual(repotype);
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
        const importOfferingVersionParams = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.importOfferingVersion(importOfferingVersionParams);
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
      // Request models needed by this operation.

      // Flavor
      const flavorModel = {
        name: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        index: 38,
      };

      // ImportOfferingBodyMetadataOperatingSystem
      const importOfferingBodyMetadataOperatingSystemModel = {
        dedicated_host_only: true,
        vendor: 'testString',
        name: 'testString',
        href: 'testString',
        display_name: 'testString',
        family: 'testString',
        version: 'testString',
        architecture: 'testString',
      };

      // ImportOfferingBodyMetadataFile
      const importOfferingBodyMetadataFileModel = {
        size: 38,
      };

      // ImportOfferingBodyMetadataImagesItem
      const importOfferingBodyMetadataImagesItemModel = {
        id: 'testString',
        name: 'testString',
        region: 'testString',
      };

      // ImportOfferingBodyMetadata
      const importOfferingBodyMetadataModel = {
        operating_system: importOfferingBodyMetadataOperatingSystemModel,
        file: importOfferingBodyMetadataFileModel,
        minimum_provisioned_size: 38,
        images: [importOfferingBodyMetadataImagesItemModel],
      };

      function __importOfferingTest() {
        // Construct the params object for operation importOffering
        const catalogIdentifier = 'testString';
        const tags = ['testString'];
        const content = 'This is a mock byte array value.';
        const name = 'testString';
        const label = 'testString';
        const installKind = 'testString';
        const targetKinds = ['testString'];
        const formatKind = 'testString';
        const productKind = 'testString';
        const sha = 'testString';
        const version = 'testString';
        const flavor = flavorModel;
        const metadata = importOfferingBodyMetadataModel;
        const workingDirectory = 'testString';
        const zipurl = 'testString';
        const offeringId = 'testString';
        const targetVersion = 'testString';
        const includeConfig = true;
        const isVsi = true;
        const repotype = 'testString';
        const xAuthToken = 'testString';
        const importOfferingParams = {
          catalogIdentifier,
          tags,
          content,
          name,
          label,
          installKind,
          targetKinds,
          formatKind,
          productKind,
          sha,
          version,
          flavor,
          metadata,
          workingDirectory,
          zipurl,
          offeringId,
          targetVersion,
          includeConfig,
          isVsi,
          repotype,
          xAuthToken,
        };

        const importOfferingResult = catalogManagementService.importOffering(importOfferingParams);

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
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.label).toEqual(label);
        expect(mockRequestOptions.body.install_kind).toEqual(installKind);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.format_kind).toEqual(formatKind);
        expect(mockRequestOptions.body.product_kind).toEqual(productKind);
        expect(mockRequestOptions.body.sha).toEqual(sha);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.flavor).toEqual(flavor);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.working_directory).toEqual(workingDirectory);
        expect(mockRequestOptions.qs.zipurl).toEqual(zipurl);
        expect(mockRequestOptions.qs.offeringID).toEqual(offeringId);
        expect(mockRequestOptions.qs.targetVersion).toEqual(targetVersion);
        expect(mockRequestOptions.qs.includeConfig).toEqual(includeConfig);
        expect(mockRequestOptions.qs.isVSI).toEqual(isVsi);
        expect(mockRequestOptions.qs.repotype).toEqual(repotype);
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
        const importOfferingParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.importOffering(importOfferingParams);
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
      // Request models needed by this operation.

      // Flavor
      const flavorModel = {
        name: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        index: 38,
      };

      function __reloadOfferingTest() {
        // Construct the params object for operation reloadOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const targetVersion = 'testString';
        const tags = ['testString'];
        const content = 'This is a mock byte array value.';
        const targetKinds = ['testString'];
        const formatKind = 'testString';
        const flavor = flavorModel;
        const workingDirectory = 'testString';
        const zipurl = 'testString';
        const repoType = 'testString';
        const reloadOfferingParams = {
          catalogIdentifier,
          offeringId,
          targetVersion,
          tags,
          content,
          targetKinds,
          formatKind,
          flavor,
          workingDirectory,
          zipurl,
          repoType,
        };

        const reloadOfferingResult = catalogManagementService.reloadOffering(reloadOfferingParams);

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
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.format_kind).toEqual(formatKind);
        expect(mockRequestOptions.body.flavor).toEqual(flavor);
        expect(mockRequestOptions.body.working_directory).toEqual(workingDirectory);
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
        const reloadOfferingParams = {
          catalogIdentifier,
          offeringId,
          targetVersion,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.reloadOffering(reloadOfferingParams);
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
        const getOfferingParams = {
          catalogIdentifier,
          offeringId,
          type,
          digest,
        };

        const getOfferingResult = catalogManagementService.getOffering(getOfferingParams);

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
        const getOfferingParams = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOffering(getOfferingParams);
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
        title_i18n: { 'key1': 'testString' },
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
      };

      // Flavor
      const flavorModel = {
        name: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        index: 38,
      };

      // RenderTypeAssociationsParametersItem
      const renderTypeAssociationsParametersItemModel = {
        name: 'testString',
        optionsRefresh: true,
      };

      // RenderTypeAssociations
      const renderTypeAssociationsModel = {
        parameters: [renderTypeAssociationsParametersItemModel],
      };

      // RenderType
      const renderTypeModel = {
        type: 'testString',
        grouping: 'testString',
        original_grouping: 'testString',
        grouping_index: 38,
        config_constraints: { anyKey: 'anyValue' },
        associations: renderTypeAssociationsModel,
      };

      // Configuration
      const configurationModel = {
        key: 'testString',
        type: 'testString',
        default_value: 'testString',
        display_name: 'testString',
        value_constraint: 'testString',
        description: 'testString',
        required: true,
        options: ['testString'],
        hidden: true,
        custom_config: renderTypeModel,
        type_metadata: 'testString',
      };

      // Output
      const outputModel = {
        key: 'testString',
        description: 'testString',
      };

      // IAMResource
      const iamResourceModel = {
        name: 'testString',
        description: 'testString',
        role_crns: ['testString'],
      };

      // IAMPermission
      const iamPermissionModel = {
        service_name: 'testString',
        role_crns: ['testString'],
        resources: [iamResourceModel],
      };

      // Validation
      const validationModel = {
        validated: '2019-01-01T12:00:00.000Z',
        requested: '2019-01-01T12:00:00.000Z',
        state: 'testString',
        last_operation: 'testString',
        target: { anyKey: 'anyValue' },
        message: 'testString',
      };

      // Resource
      const resourceModel = {
        type: 'mem',
        value: 'testString',
      };

      // SchematicsEnvValues
      const schematicsEnvValuesModel = {
        value: '[{"name": "TF_LOG","value": "TRACE","secure": false,"hidden": false}]',
        sm_ref: 'cmsm_v1:{"name": "envVarSecret","id":"1234567890","service_id":"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::","service_name":"My SM Instance","group_id":"1234567890","group_name":"My SM Group","resource_group_id":"1234567890","region":"eu-gb","type":"arbitrary"}',
      };

      // Script
      const scriptModel = {
        instructions: 'testString',
        instructions_i18n: { 'key1': 'testString' },
        script: 'testString',
        script_permission: 'testString',
        delete_script: 'testString',
        scope: 'testString',
      };

      // ScriptRef
      const scriptRefModel = {
        short_description: 'testString',
        type: 'ansible',
        path: 'scripts/validate-post-ansible-playbook.yaml',
        stage: 'pre',
        action: 'validate',
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

      // DeprecatePending
      const deprecatePendingModel = {
        deprecate_date: '2019-01-01T12:00:00.000Z',
        deprecate_state: 'testString',
        description: 'testString',
      };

      // URLProxy
      const urlProxyModel = {
        url: 'testString',
        sha: 'testString',
      };

      // MediaItem
      const mediaItemModel = {
        url: 'testString',
        api_url: 'testString',
        url_proxy: urlProxyModel,
        caption: 'testString',
        caption_i18n: { 'key1': 'testString' },
        type: 'testString',
        thumbnail_url: 'testString',
      };

      // ArchitectureDiagram
      const architectureDiagramModel = {
        diagram: mediaItemModel,
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
      };

      // CostComponent
      const costComponentModel = {
        name: 'testString',
        unit: 'testString',
        hourlyQuantity: 'testString',
        monthlyQuantity: 'testString',
        price: 'testString',
        hourlyCost: 'testString',
        monthlyCost: 'testString',
      };

      // CostResource
      const costResourceModel = {
        name: 'testString',
        metadata: { anyKey: 'anyValue' },
        hourlyCost: 'testString',
        monthlyCost: 'testString',
        costComponents: [costComponentModel],
      };

      // CostBreakdown
      const costBreakdownModel = {
        totalHourlyCost: 'testString',
        totalMonthlyCost: 'testString',
        resources: [costResourceModel],
      };

      // CostSummary
      const costSummaryModel = {
        totalDetectedResources: 38,
        totalSupportedResources: 38,
        totalUnsupportedResources: 38,
        totalUsageBasedResources: 38,
        totalNoPriceResources: 38,
        unsupportedResourceCounts: { 'key1': 38 },
        noPriceResourceCounts: { 'key1': 38 },
      };

      // Project
      const projectModel = {
        name: 'testString',
        metadata: { anyKey: 'anyValue' },
        pastBreakdown: costBreakdownModel,
        breakdown: costBreakdownModel,
        diff: costBreakdownModel,
        summary: costSummaryModel,
      };

      // CostEstimate
      const costEstimateModel = {
        version: 'testString',
        currency: 'testString',
        projects: [projectModel],
        summary: costSummaryModel,
        totalHourlyCost: 'testString',
        totalMonthlyCost: 'testString',
        pastTotalHourlyCost: 'testString',
        pastTotalMonthlyCost: 'testString',
        diffTotalHourlyCost: 'testString',
        diffTotalMonthlyCost: 'testString',
        timeGenerated: '2019-01-01T12:00:00.000Z',
      };

      // OfferingReference
      const offeringReferenceModel = {
        catalog_id: 'testString',
        id: 'testString',
        name: 'testString',
        kind: 'testString',
        version: 'testString',
        flavors: ['testString'],
      };

      // SolutionInfo
      const solutionInfoModel = {
        architecture_diagrams: [architectureDiagramModel],
        features: [featureModel],
        cost_estimate: costEstimateModel,
        dependencies: [offeringReferenceModel],
        install_type: 'testString',
      };

      // SCCProfile
      const sccProfileModel = {
        id: 'testString',
        name: 'testString',
        version: 'testString',
        description: 'testString',
        type: 'testString',
        ui_href: 'testString',
      };

      // ClaimedControl
      const claimedControlModel = {
        profile: sccProfileModel,
        names: ['testString'],
      };

      // Claims
      const claimsModel = {
        profiles: [sccProfileModel],
        controls: [claimedControlModel],
      };

      // Result
      const resultModel = {
        failure_count: 38,
        scan_time: '2019-01-01T12:00:00.000Z',
        error_message: 'testString',
        complete_scan: true,
        unscanned_resources: ['testString'],
      };

      // SCCAssessment
      const sccAssessmentModel = {
        id: 'testString',
        description: 'testString',
        version: 'testString',
        type: 'testString',
        method: 'testString',
        ui_href: 'testString',
      };

      // SCCSpecification
      const sccSpecificationModel = {
        id: 'testString',
        description: 'testString',
        component_name: 'testString',
        assessments: [sccAssessmentModel],
        ui_href: 'testString',
      };

      // SCCControl
      const sccControlModel = {
        id: 'testString',
        name: 'testString',
        version: 'testString',
        description: 'testString',
        profile: sccProfileModel,
        parent_name: 'testString',
        specifications: [sccSpecificationModel],
        ui_href: 'testString',
      };

      // EvaluatedControl
      const evaluatedControlModel = {
        id: 'testString',
        name: 'testString',
        description: 'testString',
        specifications: [sccSpecificationModel],
        failure_count: 38,
        pass_count: 38,
        parent: sccControlModel,
        ui_href: 'testString',
      };

      // Evaluation
      const evaluationModel = {
        scan_id: 'testString',
        account_id: 'testString',
        profile: sccProfileModel,
        result: resultModel,
        controls: [evaluatedControlModel],
      };

      // Compliance
      const complianceModel = {
        authority: 'testString',
        claims: claimsModel,
        evaluations: [evaluationModel],
      };

      // Version
      const versionModel = {
        crn: 'testString',
        version: 'testString',
        flavor: flavorModel,
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
        outputs: [outputModel],
        iam_permissions: [iamPermissionModel],
        metadata: { anyKey: 'anyValue' },
        validation: validationModel,
        required_resources: [resourceModel],
        single_instance: true,
        schematics_env_values: schematicsEnvValuesModel,
        install: scriptModel,
        pre_install: [scriptModel],
        scripts: { 'key1': scriptRefModel },
        entitlement: versionEntitlementModel,
        licenses: [licenseModel],
        image_manifest_url: 'testString',
        deprecated: true,
        package_version: 'testString',
        state: stateModel,
        version_locator: 'testString',
        long_description: 'testString',
        long_description_i18n: { 'key1': 'testString' },
        whitelisted_accounts: ['testString'],
        image_pull_key_name: 'testString',
        deprecate_pending: deprecatePendingModel,
        solution_info: solutionInfoModel,
        is_consumable: true,
        compliance_v3: complianceModel,
      };

      // Kind
      const kindModel = {
        id: 'testString',
        format_kind: 'testString',
        install_kind: 'testString',
        target_kind: 'testString',
        metadata: { anyKey: 'anyValue' },
        tags: ['testString'],
        additional_features: [featureModel],
        created: '2019-01-01T12:00:00.000Z',
        updated: '2019-01-01T12:00:00.000Z',
        versions: [versionModel],
      };

      // PublishObject
      const publishObjectModel = {
        pc_managed: true,
        approval_type: 'testString',
        publish_approved: true,
        share_with_all: true,
        share_with_ibm: true,
        share_enabled: true,
        original_crn: 'testString',
        public_crn: 'testString',
        approval_record: { anyKey: 'anyValue' },
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
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

      // ImagePullKey
      const imagePullKeyModel = {
        name: 'testString',
        value: 'testString',
        description: 'testString',
      };

      // SupportWaitTime
      const supportWaitTimeModel = {
        value: 38,
        type: 'testString',
      };

      // SupportTime
      const supportTimeModel = {
        day: 38,
        start_time: 'testString',
        end_time: 'testString',
      };

      // SupportAvailability
      const supportAvailabilityModel = {
        times: [supportTimeModel],
        timezone: 'testString',
        always_available: true,
      };

      // SupportDetail
      const supportDetailModel = {
        type: 'testString',
        contact: 'testString',
        response_wait_time: supportWaitTimeModel,
        availability: supportAvailabilityModel,
      };

      // SupportEscalation
      const supportEscalationModel = {
        escalation_wait_time: supportWaitTimeModel,
        response_wait_time: supportWaitTimeModel,
        contact: 'testString',
      };

      // Support
      const supportModel = {
        url: 'testString',
        process: 'testString',
        process_i18n: { 'key1': 'testString' },
        locations: ['testString'],
        support_details: [supportDetailModel],
        support_escalation: supportEscalationModel,
        support_type: 'testString',
      };

      // LearnMoreLinks
      const learnMoreLinksModel = {
        first_party: 'testString',
        third_party: 'testString',
      };

      // Constraint
      const constraintModel = {
        type: 'testString',
        rule: 'testString',
      };

      // Badge
      const badgeModel = {
        id: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        description: 'testString',
        description_i18n: { 'key1': 'testString' },
        icon: 'testString',
        authority: 'testString',
        tag: 'testString',
        learn_more_links: learnMoreLinksModel,
        constraints: [constraintModel],
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
        const labelI18n = { 'key1': 'testString' };
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
        const shortDescriptionI18n = { 'key1': 'testString' };
        const longDescription = 'testString';
        const longDescriptionI18n = { 'key1': 'testString' };
        const features = [featureModel];
        const kinds = [kindModel];
        const publish = publishObjectModel;
        const pcManaged = true;
        const publishApproved = true;
        const shareWithAll = true;
        const shareWithIbm = true;
        const shareEnabled = true;
        const permitRequestIbmPublicPublish = true;
        const ibmPublishApproved = true;
        const publicPublishApproved = true;
        const publicOriginalCrn = 'testString';
        const publishPublicCrn = 'testString';
        const portalApprovalRecord = 'testString';
        const portalUiUrl = 'testString';
        const catalogId = 'testString';
        const catalogName = 'testString';
        const metadata = { anyKey: 'anyValue' };
        const disclaimer = 'testString';
        const hidden = true;
        const provider = 'testString';
        const providerInfo = providerInfoModel;
        const repoInfo = repoInfoModel;
        const imagePullKeys = [imagePullKeyModel];
        const support = supportModel;
        const media = [mediaItemModel];
        const deprecatePending = deprecatePendingModel;
        const productKind = 'testString';
        const badges = [badgeModel];
        const replaceOfferingParams = {
          catalogIdentifier,
          offeringId,
          id,
          rev,
          url,
          crn,
          label,
          labelI18n,
          name,
          offeringIconUrl,
          offeringDocsUrl,
          offeringSupportUrl,
          tags,
          keywords,
          rating,
          created,
          updated,
          shortDescription,
          shortDescriptionI18n,
          longDescription,
          longDescriptionI18n,
          features,
          kinds,
          publish,
          pcManaged,
          publishApproved,
          shareWithAll,
          shareWithIbm,
          shareEnabled,
          permitRequestIbmPublicPublish,
          ibmPublishApproved,
          publicPublishApproved,
          publicOriginalCrn,
          publishPublicCrn,
          portalApprovalRecord,
          portalUiUrl,
          catalogId,
          catalogName,
          metadata,
          disclaimer,
          hidden,
          provider,
          providerInfo,
          repoInfo,
          imagePullKeys,
          support,
          media,
          deprecatePending,
          productKind,
          badges,
        };

        const replaceOfferingResult = catalogManagementService.replaceOffering(replaceOfferingParams);

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
        expect(mockRequestOptions.body.label_i18n).toEqual(labelI18n);
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
        expect(mockRequestOptions.body.short_description_i18n).toEqual(shortDescriptionI18n);
        expect(mockRequestOptions.body.long_description).toEqual(longDescription);
        expect(mockRequestOptions.body.long_description_i18n).toEqual(longDescriptionI18n);
        expect(mockRequestOptions.body.features).toEqual(features);
        expect(mockRequestOptions.body.kinds).toEqual(kinds);
        expect(mockRequestOptions.body.publish).toEqual(publish);
        expect(mockRequestOptions.body.pc_managed).toEqual(pcManaged);
        expect(mockRequestOptions.body.publish_approved).toEqual(publishApproved);
        expect(mockRequestOptions.body.share_with_all).toEqual(shareWithAll);
        expect(mockRequestOptions.body.share_with_ibm).toEqual(shareWithIbm);
        expect(mockRequestOptions.body.share_enabled).toEqual(shareEnabled);
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
        expect(mockRequestOptions.body.image_pull_keys).toEqual(imagePullKeys);
        expect(mockRequestOptions.body.support).toEqual(support);
        expect(mockRequestOptions.body.media).toEqual(media);
        expect(mockRequestOptions.body.deprecate_pending).toEqual(deprecatePending);
        expect(mockRequestOptions.body.product_kind).toEqual(productKind);
        expect(mockRequestOptions.body.badges).toEqual(badges);
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
        const replaceOfferingParams = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceOffering(replaceOfferingParams);
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
        value: 'testString',
        from: 'testString',
      };

      function __updateOfferingTest() {
        // Construct the params object for operation updateOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const ifMatch = 'testString';
        const updates = [jsonPatchOperationModel];
        const updateOfferingParams = {
          catalogIdentifier,
          offeringId,
          ifMatch,
          updates,
        };

        const updateOfferingResult = catalogManagementService.updateOffering(updateOfferingParams);

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
        const updateOfferingParams = {
          catalogIdentifier,
          offeringId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.updateOffering(updateOfferingParams);
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
        const deleteOfferingParams = {
          catalogIdentifier,
          offeringId,
        };

        const deleteOfferingResult = catalogManagementService.deleteOffering(deleteOfferingParams);

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
        const deleteOfferingParams = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteOffering(deleteOfferingParams);
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

  describe('listOfferingAudits', () => {
    describe('positive tests', () => {
      function __listOfferingAuditsTest() {
        // Construct the params object for operation listOfferingAudits
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const start = 'testString';
        const limit = 100;
        const lookupnames = true;
        const listOfferingAuditsParams = {
          catalogIdentifier,
          offeringId,
          start,
          limit,
          lookupnames,
        };

        const listOfferingAuditsResult = catalogManagementService.listOfferingAudits(listOfferingAuditsParams);

        // all methods should return a Promise
        expectToBePromise(listOfferingAuditsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/audits', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOfferingAuditsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listOfferingAuditsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listOfferingAuditsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listOfferingAuditsParams = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listOfferingAudits(listOfferingAuditsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listOfferingAudits({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listOfferingAudits();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('OfferingAuditsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/offerings/testString/audits';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          offeringId: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.OfferingAuditsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          offeringId: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const pager = new CatalogManagementV1.OfferingAuditsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getOfferingAudit', () => {
    describe('positive tests', () => {
      function __getOfferingAuditTest() {
        // Construct the params object for operation getOfferingAudit
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const auditlogIdentifier = 'testString';
        const lookupnames = true;
        const getOfferingAuditParams = {
          catalogIdentifier,
          offeringId,
          auditlogIdentifier,
          lookupnames,
        };

        const getOfferingAuditResult = catalogManagementService.getOfferingAudit(getOfferingAuditParams);

        // all methods should return a Promise
        expectToBePromise(getOfferingAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/audits/{auditlog_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.path.auditlog_identifier).toEqual(auditlogIdentifier);
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
        const auditlogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOfferingAuditParams = {
          catalogIdentifier,
          offeringId,
          auditlogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingAudit(getOfferingAuditParams);
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

  describe('setOfferingPublish', () => {
    describe('positive tests', () => {
      function __setOfferingPublishTest() {
        // Construct the params object for operation setOfferingPublish
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const approvalType = 'pc_managed';
        const approved = 'true';
        const portalRecord = 'testString';
        const portalUrl = 'testString';
        const xApproverToken = 'testString';
        const xAuthToken = 'testString';
        const setOfferingPublishParams = {
          catalogIdentifier,
          offeringId,
          approvalType,
          approved,
          portalRecord,
          portalUrl,
          xApproverToken,
          xAuthToken,
        };

        const setOfferingPublishResult = catalogManagementService.setOfferingPublish(setOfferingPublishParams);

        // all methods should return a Promise
        expectToBePromise(setOfferingPublishResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/publish/{approval_type}/{approved}', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'X-Approver-Token', xApproverToken);
        checkUserHeader(createRequestMock, 'X-Auth-Token', xAuthToken);
        expect(mockRequestOptions.qs.portal_record).toEqual(portalRecord);
        expect(mockRequestOptions.qs.portal_url).toEqual(portalUrl);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.path.approval_type).toEqual(approvalType);
        expect(mockRequestOptions.path.approved).toEqual(approved);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __setOfferingPublishTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __setOfferingPublishTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __setOfferingPublishTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const approvalType = 'pc_managed';
        const approved = 'true';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const setOfferingPublishParams = {
          catalogIdentifier,
          offeringId,
          approvalType,
          approved,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.setOfferingPublish(setOfferingPublishParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.setOfferingPublish({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.setOfferingPublish();
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
        const deprecateOfferingParams = {
          catalogIdentifier,
          offeringId,
          setting,
          description,
          daysUntilDeprecate,
        };

        const deprecateOfferingResult = catalogManagementService.deprecateOffering(deprecateOfferingParams);

        // all methods should return a Promise
        expectToBePromise(deprecateOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/deprecate/{setting}', 'POST');
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
        const deprecateOfferingParams = {
          catalogIdentifier,
          offeringId,
          setting,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deprecateOffering(deprecateOfferingParams);
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

  describe('shareOffering', () => {
    describe('positive tests', () => {
      function __shareOfferingTest() {
        // Construct the params object for operation shareOffering
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const ibm = true;
        const _public = true;
        const enabled = true;
        const shareOfferingParams = {
          catalogIdentifier,
          offeringId,
          ibm,
          _public,
          enabled,
        };

        const shareOfferingResult = catalogManagementService.shareOffering(shareOfferingParams);

        // all methods should return a Promise
        expectToBePromise(shareOfferingResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/share', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.ibm).toEqual(ibm);
        expect(mockRequestOptions.body.public).toEqual(_public);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __shareOfferingTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __shareOfferingTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __shareOfferingTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const shareOfferingParams = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.shareOffering(shareOfferingParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.shareOffering({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.shareOffering();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getOfferingAccess', () => {
    describe('positive tests', () => {
      function __getOfferingAccessTest() {
        // Construct the params object for operation getOfferingAccess
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const accessIdentifier = 'testString';
        const getOfferingAccessParams = {
          catalogIdentifier,
          offeringId,
          accessIdentifier,
        };

        const getOfferingAccessResult = catalogManagementService.getOfferingAccess(getOfferingAccessParams);

        // all methods should return a Promise
        expectToBePromise(getOfferingAccessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/access/{access_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
        expect(mockRequestOptions.path.access_identifier).toEqual(accessIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingAccessTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingAccessTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingAccessTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const accessIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOfferingAccessParams = {
          catalogIdentifier,
          offeringId,
          accessIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingAccess(getOfferingAccessParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAccess({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAccess();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getOfferingAccessList', () => {
    describe('positive tests', () => {
      function __getOfferingAccessListTest() {
        // Construct the params object for operation getOfferingAccessList
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const start = 'testString';
        const limit = 100;
        const getOfferingAccessListParams = {
          catalogIdentifier,
          offeringId,
          start,
          limit,
        };

        const getOfferingAccessListResult = catalogManagementService.getOfferingAccessList(getOfferingAccessListParams);

        // all methods should return a Promise
        expectToBePromise(getOfferingAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/access', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingAccessListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingAccessListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingAccessListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOfferingAccessListParams = {
          catalogIdentifier,
          offeringId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingAccessList(getOfferingAccessListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAccessList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingAccessList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetOfferingAccessListPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/offerings/testString/access';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"catalog_id":"catalog_id","target_id":"target_id","target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"catalog_id":"catalog_id","target_id":"target_id","target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          offeringId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.GetOfferingAccessListPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          offeringId: 'testString',
          limit: 10,
        };
        const pager = new CatalogManagementV1.GetOfferingAccessListPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('deleteOfferingAccessList', () => {
    describe('positive tests', () => {
      function __deleteOfferingAccessListTest() {
        // Construct the params object for operation deleteOfferingAccessList
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const accesses = ['testString'];
        const deleteOfferingAccessListParams = {
          catalogIdentifier,
          offeringId,
          accesses,
        };

        const deleteOfferingAccessListResult = catalogManagementService.deleteOfferingAccessList(deleteOfferingAccessListParams);

        // all methods should return a Promise
        expectToBePromise(deleteOfferingAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/access', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accesses);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteOfferingAccessListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __deleteOfferingAccessListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __deleteOfferingAccessListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const accesses = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteOfferingAccessListParams = {
          catalogIdentifier,
          offeringId,
          accesses,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteOfferingAccessList(deleteOfferingAccessListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.deleteOfferingAccessList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.deleteOfferingAccessList();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addOfferingAccessList', () => {
    describe('positive tests', () => {
      function __addOfferingAccessListTest() {
        // Construct the params object for operation addOfferingAccessList
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const accesses = ['testString'];
        const addOfferingAccessListParams = {
          catalogIdentifier,
          offeringId,
          accesses,
        };

        const addOfferingAccessListResult = catalogManagementService.addOfferingAccessList(addOfferingAccessListParams);

        // all methods should return a Promise
        expectToBePromise(addOfferingAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/offerings/{offering_id}/access', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accesses);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.offering_id).toEqual(offeringId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addOfferingAccessListTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __addOfferingAccessListTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __addOfferingAccessListTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const offeringId = 'testString';
        const accesses = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addOfferingAccessListParams = {
          catalogIdentifier,
          offeringId,
          accesses,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.addOfferingAccessList(addOfferingAccessListParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.addOfferingAccessList({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.addOfferingAccessList();
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
        const flavor = 'testString';
        const installType = 'testString';
        const getOfferingUpdatesParams = {
          catalogIdentifier,
          offeringId,
          kind,
          xAuthRefreshToken,
          target,
          version,
          clusterId,
          region,
          resourceGroupId,
          namespace,
          sha,
          channel,
          namespaces,
          allNamespaces,
          flavor,
          installType,
        };

        const getOfferingUpdatesResult = catalogManagementService.getOfferingUpdates(getOfferingUpdatesParams);

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
        expect(mockRequestOptions.qs.flavor).toEqual(flavor);
        expect(mockRequestOptions.qs.install_type).toEqual(installType);
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
        const getOfferingUpdatesParams = {
          catalogIdentifier,
          offeringId,
          kind,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingUpdates(getOfferingUpdatesParams);
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
        const flavor = 'testString';
        const asIs = true;
        const installType = 'testString';
        const getOfferingSourceParams = {
          version,
          accept,
          catalogId,
          name,
          id,
          kind,
          channel,
          flavor,
          asIs,
          installType,
        };

        const getOfferingSourceResult = catalogManagementService.getOfferingSource(getOfferingSourceParams);

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
        expect(mockRequestOptions.qs.flavor).toEqual(flavor);
        expect(mockRequestOptions.qs.asIs).toEqual(asIs);
        expect(mockRequestOptions.qs.installType).toEqual(installType);
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
        const getOfferingSourceParams = {
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingSource(getOfferingSourceParams);
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

  describe('getOfferingSourceArchive', () => {
    describe('positive tests', () => {
      function __getOfferingSourceArchiveTest() {
        // Construct the params object for operation getOfferingSourceArchive
        const version = 'testString';
        const accept = 'application/yaml';
        const catalogId = 'testString';
        const name = 'testString';
        const id = 'testString';
        const kind = 'testString';
        const channel = 'testString';
        const flavor = 'testString';
        const asIs = true;
        const installType = 'testString';
        const getOfferingSourceArchiveParams = {
          version,
          accept,
          catalogId,
          name,
          id,
          kind,
          channel,
          flavor,
          asIs,
          installType,
        };

        const getOfferingSourceArchiveResult = catalogManagementService.getOfferingSourceArchive(getOfferingSourceArchiveParams);

        // all methods should return a Promise
        expectToBePromise(getOfferingSourceArchiveResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/offering/source/archive', 'GET');
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
        expect(mockRequestOptions.qs.flavor).toEqual(flavor);
        expect(mockRequestOptions.qs.asIs).toEqual(asIs);
        expect(mockRequestOptions.qs.installType).toEqual(installType);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingSourceArchiveTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingSourceArchiveTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingSourceArchiveTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const version = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOfferingSourceArchiveParams = {
          version,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingSourceArchive(getOfferingSourceArchiveParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingSourceArchive({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingSourceArchive();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getOfferingSourceUrl', () => {
    describe('positive tests', () => {
      function __getOfferingSourceUrlTest() {
        // Construct the params object for operation getOfferingSourceUrl
        const keyIdentifier = 'testString';
        const accept = 'application/yaml';
        const catalogId = 'testString';
        const name = 'testString';
        const id = 'testString';
        const getOfferingSourceUrlParams = {
          keyIdentifier,
          accept,
          catalogId,
          name,
          id,
        };

        const getOfferingSourceUrlResult = catalogManagementService.getOfferingSourceUrl(getOfferingSourceUrlParams);

        // all methods should return a Promise
        expectToBePromise(getOfferingSourceUrlResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/offering/source/url/{key_identifier}', 'GET');
        const expectedAccept = accept;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Accept', accept);
        expect(mockRequestOptions.qs.catalogID).toEqual(catalogId);
        expect(mockRequestOptions.qs.name).toEqual(name);
        expect(mockRequestOptions.qs.id).toEqual(id);
        expect(mockRequestOptions.path.key_identifier).toEqual(keyIdentifier);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingSourceUrlTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingSourceUrlTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingSourceUrlTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const keyIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOfferingSourceUrlParams = {
          keyIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingSourceUrl(getOfferingSourceUrlParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingSourceUrl({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingSourceUrl();
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
        const getOfferingAboutParams = {
          versionLocId,
        };

        const getOfferingAboutResult = catalogManagementService.getOfferingAbout(getOfferingAboutParams);

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
        const getOfferingAboutParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingAbout(getOfferingAboutParams);
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
        const getOfferingLicenseParams = {
          versionLocId,
          licenseId,
        };

        const getOfferingLicenseResult = catalogManagementService.getOfferingLicense(getOfferingLicenseParams);

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
        const getOfferingLicenseParams = {
          versionLocId,
          licenseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingLicense(getOfferingLicenseParams);
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
        const getOfferingContainerImagesParams = {
          versionLocId,
        };

        const getOfferingContainerImagesResult = catalogManagementService.getOfferingContainerImages(getOfferingContainerImagesParams);

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
        const getOfferingContainerImagesParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingContainerImages(getOfferingContainerImagesParams);
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

  describe('archiveVersion', () => {
    describe('positive tests', () => {
      function __archiveVersionTest() {
        // Construct the params object for operation archiveVersion
        const versionLocId = 'testString';
        const archiveVersionParams = {
          versionLocId,
        };

        const archiveVersionResult = catalogManagementService.archiveVersion(archiveVersionParams);

        // all methods should return a Promise
        expectToBePromise(archiveVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/archive', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __archiveVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __archiveVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __archiveVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const archiveVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.archiveVersion(archiveVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.archiveVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.archiveVersion();
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
        const setDeprecateVersionParams = {
          versionLocId,
          setting,
          description,
          daysUntilDeprecate,
        };

        const setDeprecateVersionResult = catalogManagementService.setDeprecateVersion(setDeprecateVersionParams);

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
        const setDeprecateVersionParams = {
          versionLocId,
          setting,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.setDeprecateVersion(setDeprecateVersionParams);
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

  describe('consumableVersion', () => {
    describe('positive tests', () => {
      function __consumableVersionTest() {
        // Construct the params object for operation consumableVersion
        const versionLocId = 'testString';
        const consumableVersionParams = {
          versionLocId,
        };

        const consumableVersionResult = catalogManagementService.consumableVersion(consumableVersionParams);

        // all methods should return a Promise
        expectToBePromise(consumableVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/consume-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __consumableVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __consumableVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __consumableVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const consumableVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.consumableVersion(consumableVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.consumableVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.consumableVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('prereleaseVersion', () => {
    describe('positive tests', () => {
      function __prereleaseVersionTest() {
        // Construct the params object for operation prereleaseVersion
        const versionLocId = 'testString';
        const prereleaseVersionParams = {
          versionLocId,
        };

        const prereleaseVersionResult = catalogManagementService.prereleaseVersion(prereleaseVersionParams);

        // all methods should return a Promise
        expectToBePromise(prereleaseVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/prerelease-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __prereleaseVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __prereleaseVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __prereleaseVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const prereleaseVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.prereleaseVersion(prereleaseVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.prereleaseVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.prereleaseVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('suspendVersion', () => {
    describe('positive tests', () => {
      function __suspendVersionTest() {
        // Construct the params object for operation suspendVersion
        const versionLocId = 'testString';
        const suspendVersionParams = {
          versionLocId,
        };

        const suspendVersionResult = catalogManagementService.suspendVersion(suspendVersionParams);

        // all methods should return a Promise
        expectToBePromise(suspendVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/suspend', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __suspendVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __suspendVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __suspendVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const suspendVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.suspendVersion(suspendVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.suspendVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.suspendVersion();
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
        const commitVersionParams = {
          versionLocId,
        };

        const commitVersionResult = catalogManagementService.commitVersion(commitVersionParams);

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
        const commitVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.commitVersion(commitVersionParams);
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
      // Request models needed by this operation.

      // Flavor
      const flavorModel = {
        name: 'testString',
        label: 'testString',
        label_i18n: { 'key1': 'testString' },
        index: 38,
      };

      function __copyVersionTest() {
        // Construct the params object for operation copyVersion
        const versionLocId = 'testString';
        const tags = ['testString'];
        const content = 'This is a mock byte array value.';
        const targetKinds = ['testString'];
        const formatKind = 'testString';
        const flavor = flavorModel;
        const workingDirectory = 'testString';
        const copyVersionParams = {
          versionLocId,
          tags,
          content,
          targetKinds,
          formatKind,
          flavor,
          workingDirectory,
        };

        const copyVersionResult = catalogManagementService.copyVersion(copyVersionParams);

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
        expect(mockRequestOptions.body.content).toEqual(content);
        expect(mockRequestOptions.body.target_kinds).toEqual(targetKinds);
        expect(mockRequestOptions.body.format_kind).toEqual(formatKind);
        expect(mockRequestOptions.body.flavor).toEqual(flavor);
        expect(mockRequestOptions.body.working_directory).toEqual(workingDirectory);
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
        const copyVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.copyVersion(copyVersionParams);
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
        const getOfferingWorkingCopyParams = {
          versionLocId,
        };

        const getOfferingWorkingCopyResult = catalogManagementService.getOfferingWorkingCopy(getOfferingWorkingCopyParams);

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
        const getOfferingWorkingCopyParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingWorkingCopy(getOfferingWorkingCopyParams);
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

  describe('copyFromPreviousVersion', () => {
    describe('positive tests', () => {
      function __copyFromPreviousVersionTest() {
        // Construct the params object for operation copyFromPreviousVersion
        const versionLocId = 'testString';
        const type = 'testString';
        const versionLocIdToCopyFrom = 'testString';
        const copyFromPreviousVersionParams = {
          versionLocId,
          type,
          versionLocIdToCopyFrom,
        };

        const copyFromPreviousVersionResult = catalogManagementService.copyFromPreviousVersion(copyFromPreviousVersionParams);

        // all methods should return a Promise
        expectToBePromise(copyFromPreviousVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/versions/{version_loc_id}/copy/{type}/{version_loc_id_to_copy_from}', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.version_loc_id).toEqual(versionLocId);
        expect(mockRequestOptions.path.type).toEqual(type);
        expect(mockRequestOptions.path.version_loc_id_to_copy_from).toEqual(versionLocIdToCopyFrom);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __copyFromPreviousVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __copyFromPreviousVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __copyFromPreviousVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const versionLocId = 'testString';
        const type = 'testString';
        const versionLocIdToCopyFrom = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const copyFromPreviousVersionParams = {
          versionLocId,
          type,
          versionLocIdToCopyFrom,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.copyFromPreviousVersion(copyFromPreviousVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.copyFromPreviousVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.copyFromPreviousVersion();
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
        const getVersionParams = {
          versionLocId,
        };

        const getVersionResult = catalogManagementService.getVersion(getVersionParams);

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
        const getVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getVersion(getVersionParams);
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
        const deleteVersionParams = {
          versionLocId,
        };

        const deleteVersionResult = catalogManagementService.deleteVersion(deleteVersionParams);

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
        const deleteVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteVersion(deleteVersionParams);
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

  describe('deprecateVersion', () => {
    describe('positive tests', () => {
      function __deprecateVersionTest() {
        // Construct the params object for operation deprecateVersion
        const versionLocId = 'testString';
        const deprecateVersionParams = {
          versionLocId,
        };

        const deprecateVersionResult = catalogManagementService.deprecateVersion(deprecateVersionParams);

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
        const deprecateVersionParams = {
          versionLocId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deprecateVersion(deprecateVersionParams);
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

  describe('getCluster', () => {
    describe('positive tests', () => {
      function __getClusterTest() {
        // Construct the params object for operation getCluster
        const clusterId = 'testString';
        const region = 'testString';
        const xAuthRefreshToken = 'testString';
        const getClusterParams = {
          clusterId,
          region,
          xAuthRefreshToken,
        };

        const getClusterResult = catalogManagementService.getCluster(getClusterParams);

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
        const getClusterParams = {
          clusterId,
          region,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getCluster(getClusterParams);
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
        const limit = 100;
        const offset = 0;
        const getNamespacesParams = {
          clusterId,
          region,
          xAuthRefreshToken,
          limit,
          offset,
        };

        const getNamespacesResult = catalogManagementService.getNamespaces(getNamespacesParams);

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
        const getNamespacesParams = {
          clusterId,
          region,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getNamespaces(getNamespacesParams);
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

    describe('GetNamespacesPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/deploy/kubernetes/clusters/testString/namespaces';
      const mockPagerResponse1 =
        '{"next":"https://myhost.com/somePath?offset=1","total_count":2,"limit":1,"resources":["resources"]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":["resources"]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          clusterId: 'testString',
          region: 'testString',
          xAuthRefreshToken: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.GetNamespacesPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          clusterId: 'testString',
          region: 'testString',
          xAuthRefreshToken: 'testString',
          limit: 10,
        };
        const pager = new CatalogManagementV1.GetNamespacesPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
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
        const channel = 'testString';
        const installPlan = 'testString';
        const deployOperatorsParams = {
          xAuthRefreshToken,
          clusterId,
          region,
          namespaces,
          allNamespaces,
          versionLocatorId,
          channel,
          installPlan,
        };

        const deployOperatorsResult = catalogManagementService.deployOperators(deployOperatorsParams);

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
        expect(mockRequestOptions.body.channel).toEqual(channel);
        expect(mockRequestOptions.body.install_plan).toEqual(installPlan);
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
        const deployOperatorsParams = {
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deployOperators(deployOperatorsParams);
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
        const listOperatorsParams = {
          xAuthRefreshToken,
          clusterId,
          region,
          versionLocatorId,
        };

        const listOperatorsResult = catalogManagementService.listOperators(listOperatorsParams);

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
        const listOperatorsParams = {
          xAuthRefreshToken,
          clusterId,
          region,
          versionLocatorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listOperators(listOperatorsParams);
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
        const channel = 'testString';
        const installPlan = 'testString';
        const replaceOperatorsParams = {
          xAuthRefreshToken,
          clusterId,
          region,
          namespaces,
          allNamespaces,
          versionLocatorId,
          channel,
          installPlan,
        };

        const replaceOperatorsResult = catalogManagementService.replaceOperators(replaceOperatorsParams);

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
        expect(mockRequestOptions.body.channel).toEqual(channel);
        expect(mockRequestOptions.body.install_plan).toEqual(installPlan);
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
        const replaceOperatorsParams = {
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceOperators(replaceOperatorsParams);
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
        const deleteOperatorsParams = {
          xAuthRefreshToken,
          clusterId,
          region,
          versionLocatorId,
        };

        const deleteOperatorsResult = catalogManagementService.deleteOperators(deleteOperatorsParams);

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
        const deleteOperatorsParams = {
          xAuthRefreshToken,
          clusterId,
          region,
          versionLocatorId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteOperators(deleteOperatorsParams);
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

      // DeployRequestBodyOverrideValues
      const deployRequestBodyOverrideValuesModel = {
        vsi_instance_name: 'testString',
        vpc_profile: 'testString',
        subnet_id: 'testString',
        vpc_id: 'testString',
        subnet_zone: 'testString',
        ssh_key_id: 'testString',
        vpc_region: 'testString',
        foo: 'testString',
      };

      // DeployRequestBodyEnvironmentVariablesItem
      const deployRequestBodyEnvironmentVariablesItemModel = {
        name: 'testString',
        value: 'testString',
        secure: true,
        hidden: true,
      };

      // DeployRequestBodySchematics
      const deployRequestBodySchematicsModel = {
        name: 'testString',
        description: 'testString',
        tags: ['testString'],
        resource_group_id: 'testString',
        terraform_version: 'testString',
        region: 'testString',
      };

      function __installVersionTest() {
        // Construct the params object for operation installVersion
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespace = 'testString';
        const overrideValues = deployRequestBodyOverrideValuesModel;
        const environmentVariables = [deployRequestBodyEnvironmentVariablesItemModel];
        const entitlementApikey = 'testString';
        const schematics = deployRequestBodySchematicsModel;
        const script = 'testString';
        const scriptId = 'testString';
        const versionLocatorId = 'testString';
        const vcenterId = 'testString';
        const vcenterLocation = 'testString';
        const vcenterUser = 'testString';
        const vcenterPassword = 'testString';
        const vcenterDatastore = 'testString';
        const installVersionParams = {
          versionLocId,
          xAuthRefreshToken,
          clusterId,
          region,
          namespace,
          overrideValues,
          environmentVariables,
          entitlementApikey,
          schematics,
          script,
          scriptId,
          versionLocatorId,
          vcenterId,
          vcenterLocation,
          vcenterUser,
          vcenterPassword,
          vcenterDatastore,
        };

        const installVersionResult = catalogManagementService.installVersion(installVersionParams);

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
        expect(mockRequestOptions.body.environment_variables).toEqual(environmentVariables);
        expect(mockRequestOptions.body.entitlement_apikey).toEqual(entitlementApikey);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
        expect(mockRequestOptions.body.script).toEqual(script);
        expect(mockRequestOptions.body.script_id).toEqual(scriptId);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
        expect(mockRequestOptions.body.vcenter_id).toEqual(vcenterId);
        expect(mockRequestOptions.body.vcenter_location).toEqual(vcenterLocation);
        expect(mockRequestOptions.body.vcenter_user).toEqual(vcenterUser);
        expect(mockRequestOptions.body.vcenter_password).toEqual(vcenterPassword);
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
        const installVersionParams = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.installVersion(installVersionParams);
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

      // DeployRequestBodyOverrideValues
      const deployRequestBodyOverrideValuesModel = {
        vsi_instance_name: 'testString',
        vpc_profile: 'testString',
        subnet_id: 'testString',
        vpc_id: 'testString',
        subnet_zone: 'testString',
        ssh_key_id: 'testString',
        vpc_region: 'testString',
        foo: 'testString',
      };

      // DeployRequestBodyEnvironmentVariablesItem
      const deployRequestBodyEnvironmentVariablesItemModel = {
        name: 'testString',
        value: 'testString',
        secure: true,
        hidden: true,
      };

      // DeployRequestBodySchematics
      const deployRequestBodySchematicsModel = {
        name: 'testString',
        description: 'testString',
        tags: ['testString'],
        resource_group_id: 'testString',
        terraform_version: 'testString',
        region: 'testString',
      };

      function __preinstallVersionTest() {
        // Construct the params object for operation preinstallVersion
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespace = 'testString';
        const overrideValues = deployRequestBodyOverrideValuesModel;
        const environmentVariables = [deployRequestBodyEnvironmentVariablesItemModel];
        const entitlementApikey = 'testString';
        const schematics = deployRequestBodySchematicsModel;
        const script = 'testString';
        const scriptId = 'testString';
        const versionLocatorId = 'testString';
        const vcenterId = 'testString';
        const vcenterLocation = 'testString';
        const vcenterUser = 'testString';
        const vcenterPassword = 'testString';
        const vcenterDatastore = 'testString';
        const preinstallVersionParams = {
          versionLocId,
          xAuthRefreshToken,
          clusterId,
          region,
          namespace,
          overrideValues,
          environmentVariables,
          entitlementApikey,
          schematics,
          script,
          scriptId,
          versionLocatorId,
          vcenterId,
          vcenterLocation,
          vcenterUser,
          vcenterPassword,
          vcenterDatastore,
        };

        const preinstallVersionResult = catalogManagementService.preinstallVersion(preinstallVersionParams);

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
        expect(mockRequestOptions.body.environment_variables).toEqual(environmentVariables);
        expect(mockRequestOptions.body.entitlement_apikey).toEqual(entitlementApikey);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
        expect(mockRequestOptions.body.script).toEqual(script);
        expect(mockRequestOptions.body.script_id).toEqual(scriptId);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
        expect(mockRequestOptions.body.vcenter_id).toEqual(vcenterId);
        expect(mockRequestOptions.body.vcenter_location).toEqual(vcenterLocation);
        expect(mockRequestOptions.body.vcenter_user).toEqual(vcenterUser);
        expect(mockRequestOptions.body.vcenter_password).toEqual(vcenterPassword);
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
        const preinstallVersionParams = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.preinstallVersion(preinstallVersionParams);
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
        const getPreinstallParams = {
          versionLocId,
          xAuthRefreshToken,
          clusterId,
          region,
          namespace,
        };

        const getPreinstallResult = catalogManagementService.getPreinstall(getPreinstallParams);

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
        const getPreinstallParams = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getPreinstall(getPreinstallParams);
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

      // DeployRequestBodyOverrideValues
      const deployRequestBodyOverrideValuesModel = {
        vsi_instance_name: 'testString',
        vpc_profile: 'testString',
        subnet_id: 'testString',
        vpc_id: 'testString',
        subnet_zone: 'testString',
        ssh_key_id: 'testString',
        vpc_region: 'testString',
        foo: 'testString',
      };

      // DeployRequestBodyEnvironmentVariablesItem
      const deployRequestBodyEnvironmentVariablesItemModel = {
        name: 'testString',
        value: 'testString',
        secure: true,
        hidden: true,
      };

      // DeployRequestBodySchematics
      const deployRequestBodySchematicsModel = {
        name: 'testString',
        description: 'testString',
        tags: ['testString'],
        resource_group_id: 'testString',
        terraform_version: 'testString',
        region: 'testString',
      };

      function __validateInstallTest() {
        // Construct the params object for operation validateInstall
        const versionLocId = 'testString';
        const xAuthRefreshToken = 'testString';
        const clusterId = 'testString';
        const region = 'testString';
        const namespace = 'testString';
        const overrideValues = deployRequestBodyOverrideValuesModel;
        const environmentVariables = [deployRequestBodyEnvironmentVariablesItemModel];
        const entitlementApikey = 'testString';
        const schematics = deployRequestBodySchematicsModel;
        const script = 'testString';
        const scriptId = 'testString';
        const versionLocatorId = 'testString';
        const vcenterId = 'testString';
        const vcenterLocation = 'testString';
        const vcenterUser = 'testString';
        const vcenterPassword = 'testString';
        const vcenterDatastore = 'testString';
        const targetContextName = 'testString';
        const validateInstallParams = {
          versionLocId,
          xAuthRefreshToken,
          clusterId,
          region,
          namespace,
          overrideValues,
          environmentVariables,
          entitlementApikey,
          schematics,
          script,
          scriptId,
          versionLocatorId,
          vcenterId,
          vcenterLocation,
          vcenterUser,
          vcenterPassword,
          vcenterDatastore,
          targetContextName,
        };

        const validateInstallResult = catalogManagementService.validateInstall(validateInstallParams);

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
        expect(mockRequestOptions.body.environment_variables).toEqual(environmentVariables);
        expect(mockRequestOptions.body.entitlement_apikey).toEqual(entitlementApikey);
        expect(mockRequestOptions.body.schematics).toEqual(schematics);
        expect(mockRequestOptions.body.script).toEqual(script);
        expect(mockRequestOptions.body.script_id).toEqual(scriptId);
        expect(mockRequestOptions.body.version_locator_id).toEqual(versionLocatorId);
        expect(mockRequestOptions.body.vcenter_id).toEqual(vcenterId);
        expect(mockRequestOptions.body.vcenter_location).toEqual(vcenterLocation);
        expect(mockRequestOptions.body.vcenter_user).toEqual(vcenterUser);
        expect(mockRequestOptions.body.vcenter_password).toEqual(vcenterPassword);
        expect(mockRequestOptions.body.vcenter_datastore).toEqual(vcenterDatastore);
        expect(mockRequestOptions.qs.targetContextName).toEqual(targetContextName);
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
        const validateInstallParams = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.validateInstall(validateInstallParams);
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
        const targetContextName = 'testString';
        const getValidationStatusParams = {
          versionLocId,
          xAuthRefreshToken,
          targetContextName,
        };

        const getValidationStatusResult = catalogManagementService.getValidationStatus(getValidationStatusParams);

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
        expect(mockRequestOptions.qs.targetContextName).toEqual(targetContextName);
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
        const getValidationStatusParams = {
          versionLocId,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getValidationStatus(getValidationStatusParams);
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

  describe('searchObjects', () => {
    describe('positive tests', () => {
      function __searchObjectsTest() {
        // Construct the params object for operation searchObjects
        const query = 'testString';
        const kind = 'vpe';
        const limit = 100;
        const offset = 0;
        const collapse = true;
        const digest = true;
        const searchObjectsParams = {
          query,
          kind,
          limit,
          offset,
          collapse,
          digest,
        };

        const searchObjectsResult = catalogManagementService.searchObjects(searchObjectsParams);

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
        expect(mockRequestOptions.qs.kind).toEqual(kind);
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
        const searchObjectsParams = {
          query,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.searchObjects(searchObjectsParams);
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

    describe('SearchObjectsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/objects';
      const mockPagerResponse1 =
        '{"next":"https://myhost.com/somePath?offset=1","total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","name":"name","crn":"crn","url":"url","parent_id":"parent_id","label_i18n":{"mapKey":"inner"},"label":"label","tags":["tags"],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"kind":"kind","publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"catalog_id":"catalog_id","catalog_name":"catalog_name","data":{"anyKey":"anyValue"}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","name":"name","crn":"crn","url":"url","parent_id":"parent_id","label_i18n":{"mapKey":"inner"},"label":"label","tags":["tags"],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"kind":"kind","publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"catalog_id":"catalog_id","catalog_name":"catalog_name","data":{"anyKey":"anyValue"}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          query: 'testString',
          kind: 'vpe',
          limit: 10,
          collapse: true,
          digest: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.SearchObjectsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          query: 'testString',
          kind: 'vpe',
          limit: 10,
          collapse: true,
          digest: true,
        };
        const pager = new CatalogManagementV1.SearchObjectsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('listObjects', () => {
    describe('positive tests', () => {
      function __listObjectsTest() {
        // Construct the params object for operation listObjects
        const catalogIdentifier = 'testString';
        const limit = 100;
        const offset = 0;
        const name = 'testString';
        const sort = 'testString';
        const listObjectsParams = {
          catalogIdentifier,
          limit,
          offset,
          name,
          sort,
        };

        const listObjectsResult = catalogManagementService.listObjects(listObjectsParams);

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
        const listObjectsParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listObjects(listObjectsParams);
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

    describe('ObjectsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/objects';
      const mockPagerResponse1 =
        '{"next":"https://myhost.com/somePath?offset=1","total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","name":"name","crn":"crn","url":"url","parent_id":"parent_id","label_i18n":{"mapKey":"inner"},"label":"label","tags":["tags"],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"kind":"kind","publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"catalog_id":"catalog_id","catalog_name":"catalog_name","data":{"anyKey":"anyValue"}}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","_rev":"_rev","name":"name","crn":"crn","url":"url","parent_id":"parent_id","label_i18n":{"mapKey":"inner"},"label":"label","tags":["tags"],"created":"2019-01-01T12:00:00.000Z","updated":"2019-01-01T12:00:00.000Z","short_description":"short_description","short_description_i18n":{"mapKey":"inner"},"kind":"kind","publish":{"pc_managed":true,"approval_type":"approval_type","publish_approved":true,"share_with_all":true,"share_with_ibm":true,"share_enabled":false,"original_crn":"original_crn","public_crn":"public_crn","approval_record":{"anyKey":"anyValue"},"permit_ibm_public_publish":false,"ibm_approved":true,"public_approved":false},"state":{"current":"current","current_entered":"2019-01-01T12:00:00.000Z","pending":"pending","pending_requested":"2019-01-01T12:00:00.000Z","previous":"previous"},"catalog_id":"catalog_id","catalog_name":"catalog_name","data":{"anyKey":"anyValue"}}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          limit: 10,
          name: 'testString',
          sort: 'testString',
        };
        const allResults = [];
        const pager = new CatalogManagementV1.ObjectsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          limit: 10,
          name: 'testString',
          sort: 'testString',
        };
        const pager = new CatalogManagementV1.ObjectsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createObject', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // PublishObject
      const publishObjectModel = {
        pc_managed: true,
        approval_type: 'testString',
        publish_approved: true,
        share_with_all: true,
        share_with_ibm: true,
        share_enabled: true,
        original_crn: 'testString',
        public_crn: 'testString',
        approval_record: { anyKey: 'anyValue' },
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
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
        const name = 'testString';
        const crn = 'testString';
        const url = 'testString';
        const parentId = 'testString';
        const labelI18n = { 'key1': 'testString' };
        const label = 'testString';
        const tags = ['testString'];
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const shortDescription = 'testString';
        const shortDescriptionI18n = { 'key1': 'testString' };
        const kind = 'testString';
        const publish = publishObjectModel;
        const state = stateModel;
        const catalogId = 'testString';
        const catalogName = 'testString';
        const data = { anyKey: 'anyValue' };
        const createObjectParams = {
          catalogIdentifier,
          name,
          crn,
          url,
          parentId,
          labelI18n,
          label,
          tags,
          created,
          updated,
          shortDescription,
          shortDescriptionI18n,
          kind,
          publish,
          state,
          catalogId,
          catalogName,
          data,
        };

        const createObjectResult = catalogManagementService.createObject(createObjectParams);

        // all methods should return a Promise
        expectToBePromise(createObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
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
        const createObjectParams = {
          catalogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createObject(createObjectParams);
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
        const getObjectParams = {
          catalogIdentifier,
          objectIdentifier,
        };

        const getObjectResult = catalogManagementService.getObject(getObjectParams);

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
        const getObjectParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObject(getObjectParams);
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
        pc_managed: true,
        approval_type: 'testString',
        publish_approved: true,
        share_with_all: true,
        share_with_ibm: true,
        share_enabled: true,
        original_crn: 'testString',
        public_crn: 'testString',
        approval_record: { anyKey: 'anyValue' },
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
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
        const rev = 'testString';
        const name = 'testString';
        const crn = 'testString';
        const url = 'testString';
        const parentId = 'testString';
        const labelI18n = { 'key1': 'testString' };
        const label = 'testString';
        const tags = ['testString'];
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const shortDescription = 'testString';
        const shortDescriptionI18n = { 'key1': 'testString' };
        const kind = 'testString';
        const publish = publishObjectModel;
        const state = stateModel;
        const catalogId = 'testString';
        const catalogName = 'testString';
        const data = { anyKey: 'anyValue' };
        const replaceObjectParams = {
          catalogIdentifier,
          objectIdentifier,
          id,
          rev,
          name,
          crn,
          url,
          parentId,
          labelI18n,
          label,
          tags,
          created,
          updated,
          shortDescription,
          shortDescriptionI18n,
          kind,
          publish,
          state,
          catalogId,
          catalogName,
          data,
        };

        const replaceObjectResult = catalogManagementService.replaceObject(replaceObjectParams);

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
        expect(mockRequestOptions.body._rev).toEqual(rev);
        expect(mockRequestOptions.body.name).toEqual(name);
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
        const replaceObjectParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.replaceObject(replaceObjectParams);
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
        const deleteObjectParams = {
          catalogIdentifier,
          objectIdentifier,
        };

        const deleteObjectResult = catalogManagementService.deleteObject(deleteObjectParams);

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
        const deleteObjectParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteObject(deleteObjectParams);
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

  describe('listObjectAudits', () => {
    describe('positive tests', () => {
      function __listObjectAuditsTest() {
        // Construct the params object for operation listObjectAudits
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const start = 'testString';
        const limit = 100;
        const lookupnames = true;
        const listObjectAuditsParams = {
          catalogIdentifier,
          objectIdentifier,
          start,
          limit,
          lookupnames,
        };

        const listObjectAuditsResult = catalogManagementService.listObjectAudits(listObjectAuditsParams);

        // all methods should return a Promise
        expectToBePromise(listObjectAuditsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/audits', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listObjectAuditsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listObjectAuditsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listObjectAuditsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listObjectAuditsParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listObjectAudits(listObjectAuditsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listObjectAudits({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listObjectAudits();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('ObjectAuditsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/objects/testString/audits';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          objectIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.ObjectAuditsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          objectIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const pager = new CatalogManagementV1.ObjectAuditsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getObjectAudit', () => {
    describe('positive tests', () => {
      function __getObjectAuditTest() {
        // Construct the params object for operation getObjectAudit
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const auditlogIdentifier = 'testString';
        const lookupnames = true;
        const getObjectAuditParams = {
          catalogIdentifier,
          objectIdentifier,
          auditlogIdentifier,
          lookupnames,
        };

        const getObjectAuditResult = catalogManagementService.getObjectAudit(getObjectAuditParams);

        // all methods should return a Promise
        expectToBePromise(getObjectAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/audits/{auditlog_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
        expect(mockRequestOptions.path.auditlog_identifier).toEqual(auditlogIdentifier);
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
        const auditlogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getObjectAuditParams = {
          catalogIdentifier,
          objectIdentifier,
          auditlogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObjectAudit(getObjectAuditParams);
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

  describe('consumableShareObject', () => {
    describe('positive tests', () => {
      function __consumableShareObjectTest() {
        // Construct the params object for operation consumableShareObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const consumableShareObjectParams = {
          catalogIdentifier,
          objectIdentifier,
        };

        const consumableShareObjectResult = catalogManagementService.consumableShareObject(consumableShareObjectParams);

        // all methods should return a Promise
        expectToBePromise(consumableShareObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/consume-publish', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __consumableShareObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __consumableShareObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __consumableShareObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const consumableShareObjectParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.consumableShareObject(consumableShareObjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.consumableShareObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.consumableShareObject();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('shareObject', () => {
    describe('positive tests', () => {
      function __shareObjectTest() {
        // Construct the params object for operation shareObject
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const ibm = true;
        const _public = true;
        const enabled = true;
        const shareObjectParams = {
          catalogIdentifier,
          objectIdentifier,
          ibm,
          _public,
          enabled,
        };

        const shareObjectResult = catalogManagementService.shareObject(shareObjectParams);

        // all methods should return a Promise
        expectToBePromise(shareObjectResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/share', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.ibm).toEqual(ibm);
        expect(mockRequestOptions.body.public).toEqual(_public);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __shareObjectTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __shareObjectTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __shareObjectTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const shareObjectParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.shareObject(shareObjectParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.shareObject({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.shareObject();
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
        const start = 'testString';
        const limit = 100;
        const getObjectAccessListParams = {
          catalogIdentifier,
          objectIdentifier,
          start,
          limit,
        };

        const getObjectAccessListResult = catalogManagementService.getObjectAccessList(getObjectAccessListParams);

        // all methods should return a Promise
        expectToBePromise(getObjectAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/accessv1', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
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
        const getObjectAccessListParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObjectAccessList(getObjectAccessListParams);
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

    describe('GetObjectAccessListPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/objects/testString/accessv1';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"catalog_id":"catalog_id","target_id":"target_id","target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"catalog_id":"catalog_id","target_id":"target_id","target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          objectIdentifier: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.GetObjectAccessListPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          objectIdentifier: 'testString',
          limit: 10,
        };
        const pager = new CatalogManagementV1.GetObjectAccessListPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getObjectAccess', () => {
    describe('positive tests', () => {
      function __getObjectAccessTest() {
        // Construct the params object for operation getObjectAccess
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accessIdentifier = 'testString';
        const getObjectAccessParams = {
          catalogIdentifier,
          objectIdentifier,
          accessIdentifier,
        };

        const getObjectAccessResult = catalogManagementService.getObjectAccess(getObjectAccessParams);

        // all methods should return a Promise
        expectToBePromise(getObjectAccessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{access_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
        expect(mockRequestOptions.path.access_identifier).toEqual(accessIdentifier);
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
        const accessIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getObjectAccessParams = {
          catalogIdentifier,
          objectIdentifier,
          accessIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObjectAccess(getObjectAccessParams);
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

  describe('createObjectAccess', () => {
    describe('positive tests', () => {
      function __createObjectAccessTest() {
        // Construct the params object for operation createObjectAccess
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accessIdentifier = 'testString';
        const createObjectAccessParams = {
          catalogIdentifier,
          objectIdentifier,
          accessIdentifier,
        };

        const createObjectAccessResult = catalogManagementService.createObjectAccess(createObjectAccessParams);

        // all methods should return a Promise
        expectToBePromise(createObjectAccessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{access_identifier}', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
        expect(mockRequestOptions.path.access_identifier).toEqual(accessIdentifier);
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
        const accessIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createObjectAccessParams = {
          catalogIdentifier,
          objectIdentifier,
          accessIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createObjectAccess(createObjectAccessParams);
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

  describe('deleteObjectAccess', () => {
    describe('positive tests', () => {
      function __deleteObjectAccessTest() {
        // Construct the params object for operation deleteObjectAccess
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accessIdentifier = 'testString';
        const deleteObjectAccessParams = {
          catalogIdentifier,
          objectIdentifier,
          accessIdentifier,
        };

        const deleteObjectAccessResult = catalogManagementService.deleteObjectAccess(deleteObjectAccessParams);

        // all methods should return a Promise
        expectToBePromise(deleteObjectAccessResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access/{access_identifier}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.catalog_identifier).toEqual(catalogIdentifier);
        expect(mockRequestOptions.path.object_identifier).toEqual(objectIdentifier);
        expect(mockRequestOptions.path.access_identifier).toEqual(accessIdentifier);
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
        const accessIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteObjectAccessParams = {
          catalogIdentifier,
          objectIdentifier,
          accessIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteObjectAccess(deleteObjectAccessParams);
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

  describe('getObjectAccessListDeprecated', () => {
    describe('positive tests', () => {
      function __getObjectAccessListDeprecatedTest() {
        // Construct the params object for operation getObjectAccessListDeprecated
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const limit = 100;
        const offset = 0;
        const getObjectAccessListDeprecatedParams = {
          catalogIdentifier,
          objectIdentifier,
          limit,
          offset,
        };

        const getObjectAccessListDeprecatedResult = catalogManagementService.getObjectAccessListDeprecated(getObjectAccessListDeprecatedParams);

        // all methods should return a Promise
        expectToBePromise(getObjectAccessListDeprecatedResult);

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
        __getObjectAccessListDeprecatedTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getObjectAccessListDeprecatedTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getObjectAccessListDeprecatedTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getObjectAccessListDeprecatedParams = {
          catalogIdentifier,
          objectIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getObjectAccessListDeprecated(getObjectAccessListDeprecatedParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAccessListDeprecated({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getObjectAccessListDeprecated();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('GetObjectAccessListDeprecatedPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/catalogs/testString/objects/testString/access';
      const mockPagerResponse1 =
        '{"next":"https://myhost.com/somePath?offset=1","total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"catalog_id":"catalog_id","target_id":"target_id","target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"id":"id","account":"account","account_type":12,"catalog_id":"catalog_id","target_id":"target_id","target_account":"target_account","target_kind":"target_kind","created":"2019-01-01T12:00:00.000Z","approval_state":"approval_state"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          objectIdentifier: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.GetObjectAccessListDeprecatedPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          catalogIdentifier: 'testString',
          objectIdentifier: 'testString',
          limit: 10,
        };
        const pager = new CatalogManagementV1.GetObjectAccessListDeprecatedPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('deleteObjectAccessList', () => {
    describe('positive tests', () => {
      function __deleteObjectAccessListTest() {
        // Construct the params object for operation deleteObjectAccessList
        const catalogIdentifier = 'testString';
        const objectIdentifier = 'testString';
        const accesses = ['testString'];
        const deleteObjectAccessListParams = {
          catalogIdentifier,
          objectIdentifier,
          accesses,
        };

        const deleteObjectAccessListResult = catalogManagementService.deleteObjectAccessList(deleteObjectAccessListParams);

        // all methods should return a Promise
        expectToBePromise(deleteObjectAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accesses);
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
        const accesses = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteObjectAccessListParams = {
          catalogIdentifier,
          objectIdentifier,
          accesses,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteObjectAccessList(deleteObjectAccessListParams);
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
        const accesses = ['testString'];
        const addObjectAccessListParams = {
          catalogIdentifier,
          objectIdentifier,
          accesses,
        };

        const addObjectAccessListResult = catalogManagementService.addObjectAccessList(addObjectAccessListParams);

        // all methods should return a Promise
        expectToBePromise(addObjectAccessListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/catalogs/{catalog_identifier}/objects/{object_identifier}/access', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(accesses);
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
        const accesses = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addObjectAccessListParams = {
          catalogIdentifier,
          objectIdentifier,
          accesses,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.addObjectAccessList(addObjectAccessListParams);
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
        updated: '2019-01-01T12:00:00.000Z',
        code: 'testString',
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
        const versionId = 'testString';
        const clusterId = 'testString';
        const clusterRegion = 'testString';
        const clusterNamespaces = ['testString'];
        const clusterAllNamespaces = true;
        const schematicsWorkspaceId = 'testString';
        const installPlan = 'testString';
        const channel = 'testString';
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const metadata = { anyKey: 'anyValue' };
        const resourceGroupId = 'testString';
        const location = 'testString';
        const disabled = true;
        const account = 'testString';
        const lastOperation = offeringInstanceLastOperationModel;
        const kindTarget = 'testString';
        const sha = 'testString';
        const createOfferingInstanceParams = {
          xAuthRefreshToken,
          id,
          rev,
          url,
          crn,
          label,
          catalogId,
          offeringId,
          kindFormat,
          version,
          versionId,
          clusterId,
          clusterRegion,
          clusterNamespaces,
          clusterAllNamespaces,
          schematicsWorkspaceId,
          installPlan,
          channel,
          created,
          updated,
          metadata,
          resourceGroupId,
          location,
          disabled,
          account,
          lastOperation,
          kindTarget,
          sha,
        };

        const createOfferingInstanceResult = catalogManagementService.createOfferingInstance(createOfferingInstanceParams);

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
        expect(mockRequestOptions.body.version_id).toEqual(versionId);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.cluster_region).toEqual(clusterRegion);
        expect(mockRequestOptions.body.cluster_namespaces).toEqual(clusterNamespaces);
        expect(mockRequestOptions.body.cluster_all_namespaces).toEqual(clusterAllNamespaces);
        expect(mockRequestOptions.body.schematics_workspace_id).toEqual(schematicsWorkspaceId);
        expect(mockRequestOptions.body.install_plan).toEqual(installPlan);
        expect(mockRequestOptions.body.channel).toEqual(channel);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.updated).toEqual(updated);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.location).toEqual(location);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.account).toEqual(account);
        expect(mockRequestOptions.body.last_operation).toEqual(lastOperation);
        expect(mockRequestOptions.body.kind_target).toEqual(kindTarget);
        expect(mockRequestOptions.body.sha).toEqual(sha);
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
        const createOfferingInstanceParams = {
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.createOfferingInstance(createOfferingInstanceParams);
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
        const getOfferingInstanceParams = {
          instanceIdentifier,
        };

        const getOfferingInstanceResult = catalogManagementService.getOfferingInstance(getOfferingInstanceParams);

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
        const getOfferingInstanceParams = {
          instanceIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingInstance(getOfferingInstanceParams);
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
        updated: '2019-01-01T12:00:00.000Z',
        code: 'testString',
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
        const versionId = 'testString';
        const clusterId = 'testString';
        const clusterRegion = 'testString';
        const clusterNamespaces = ['testString'];
        const clusterAllNamespaces = true;
        const schematicsWorkspaceId = 'testString';
        const installPlan = 'testString';
        const channel = 'testString';
        const created = '2019-01-01T12:00:00.000Z';
        const updated = '2019-01-01T12:00:00.000Z';
        const metadata = { anyKey: 'anyValue' };
        const resourceGroupId = 'testString';
        const location = 'testString';
        const disabled = true;
        const account = 'testString';
        const lastOperation = offeringInstanceLastOperationModel;
        const kindTarget = 'testString';
        const sha = 'testString';
        const putOfferingInstanceParams = {
          instanceIdentifier,
          xAuthRefreshToken,
          id,
          rev,
          url,
          crn,
          label,
          catalogId,
          offeringId,
          kindFormat,
          version,
          versionId,
          clusterId,
          clusterRegion,
          clusterNamespaces,
          clusterAllNamespaces,
          schematicsWorkspaceId,
          installPlan,
          channel,
          created,
          updated,
          metadata,
          resourceGroupId,
          location,
          disabled,
          account,
          lastOperation,
          kindTarget,
          sha,
        };

        const putOfferingInstanceResult = catalogManagementService.putOfferingInstance(putOfferingInstanceParams);

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
        expect(mockRequestOptions.body.version_id).toEqual(versionId);
        expect(mockRequestOptions.body.cluster_id).toEqual(clusterId);
        expect(mockRequestOptions.body.cluster_region).toEqual(clusterRegion);
        expect(mockRequestOptions.body.cluster_namespaces).toEqual(clusterNamespaces);
        expect(mockRequestOptions.body.cluster_all_namespaces).toEqual(clusterAllNamespaces);
        expect(mockRequestOptions.body.schematics_workspace_id).toEqual(schematicsWorkspaceId);
        expect(mockRequestOptions.body.install_plan).toEqual(installPlan);
        expect(mockRequestOptions.body.channel).toEqual(channel);
        expect(mockRequestOptions.body.created).toEqual(created);
        expect(mockRequestOptions.body.updated).toEqual(updated);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.body.resource_group_id).toEqual(resourceGroupId);
        expect(mockRequestOptions.body.location).toEqual(location);
        expect(mockRequestOptions.body.disabled).toEqual(disabled);
        expect(mockRequestOptions.body.account).toEqual(account);
        expect(mockRequestOptions.body.last_operation).toEqual(lastOperation);
        expect(mockRequestOptions.body.kind_target).toEqual(kindTarget);
        expect(mockRequestOptions.body.sha).toEqual(sha);
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
        const putOfferingInstanceParams = {
          instanceIdentifier,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.putOfferingInstance(putOfferingInstanceParams);
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
        const deleteOfferingInstanceParams = {
          instanceIdentifier,
          xAuthRefreshToken,
        };

        const deleteOfferingInstanceResult = catalogManagementService.deleteOfferingInstance(deleteOfferingInstanceParams);

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
        const deleteOfferingInstanceParams = {
          instanceIdentifier,
          xAuthRefreshToken,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.deleteOfferingInstance(deleteOfferingInstanceParams);
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

  describe('listOfferingInstanceAudits', () => {
    describe('positive tests', () => {
      function __listOfferingInstanceAuditsTest() {
        // Construct the params object for operation listOfferingInstanceAudits
        const instanceIdentifier = 'testString';
        const start = 'testString';
        const limit = 100;
        const lookupnames = true;
        const listOfferingInstanceAuditsParams = {
          instanceIdentifier,
          start,
          limit,
          lookupnames,
        };

        const listOfferingInstanceAuditsResult = catalogManagementService.listOfferingInstanceAudits(listOfferingInstanceAuditsParams);

        // all methods should return a Promise
        expectToBePromise(listOfferingInstanceAuditsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/offerings/{instance_identifier}/audits', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.start).toEqual(start);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.instance_identifier).toEqual(instanceIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listOfferingInstanceAuditsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __listOfferingInstanceAuditsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __listOfferingInstanceAuditsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listOfferingInstanceAuditsParams = {
          instanceIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.listOfferingInstanceAudits(listOfferingInstanceAuditsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.listOfferingInstanceAudits({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.listOfferingInstanceAudits();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('OfferingInstanceAuditsPager tests', () => {
      const serviceUrl = catalogManagementServiceOptions.url;
      const path = '/instances/offerings/testString/audits';
      const mockPagerResponse1 =
        '{"next":{"start":"1"},"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"audits":[{"id":"id","_rev":"_rev","created":"2019-01-01T12:00:00.000Z","change_type":"change_type","target_type":"target_type","target_id":"target_id","who_email":"who_email","who_delegate_email":"who_delegate_email","message":"message"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const allResults = [];
        const pager = new CatalogManagementV1.OfferingInstanceAuditsPager(catalogManagementService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceIdentifier: 'testString',
          limit: 10,
          lookupnames: true,
        };
        const pager = new CatalogManagementV1.OfferingInstanceAuditsPager(catalogManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getOfferingInstanceAudit', () => {
    describe('positive tests', () => {
      function __getOfferingInstanceAuditTest() {
        // Construct the params object for operation getOfferingInstanceAudit
        const instanceIdentifier = 'testString';
        const auditlogIdentifier = 'testString';
        const lookupnames = true;
        const getOfferingInstanceAuditParams = {
          instanceIdentifier,
          auditlogIdentifier,
          lookupnames,
        };

        const getOfferingInstanceAuditResult = catalogManagementService.getOfferingInstanceAudit(getOfferingInstanceAuditParams);

        // all methods should return a Promise
        expectToBePromise(getOfferingInstanceAuditResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/instances/offerings/{instance_identifier}/audits/{auditlog_identifier}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.lookupnames).toEqual(lookupnames);
        expect(mockRequestOptions.path.instance_identifier).toEqual(instanceIdentifier);
        expect(mockRequestOptions.path.auditlog_identifier).toEqual(auditlogIdentifier);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getOfferingInstanceAuditTest();

        // enable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.enableRetries();
        __getOfferingInstanceAuditTest();

        // disable retries and test again
        createRequestMock.mockClear();
        catalogManagementService.disableRetries();
        __getOfferingInstanceAuditTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceIdentifier = 'testString';
        const auditlogIdentifier = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getOfferingInstanceAuditParams = {
          instanceIdentifier,
          auditlogIdentifier,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        catalogManagementService.getOfferingInstanceAudit(getOfferingInstanceAuditParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingInstanceAudit({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await catalogManagementService.getOfferingInstanceAudit();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
