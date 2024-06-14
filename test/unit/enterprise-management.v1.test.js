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

const { NoAuthAuthenticator } = sdkCorePackage;
const EnterpriseManagementV1 = require('../../dist/enterprise-management/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = require('@ibm-cloud/sdk-test-utilities');

const enterpriseManagementServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://enterprise.cloud.ibm.com/v1',
};

const enterpriseManagementService = new EnterpriseManagementV1(enterpriseManagementServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(enterpriseManagementService, 'createRequest');
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

describe('EnterpriseManagementV1', () => {
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
      const testInstance = EnterpriseManagementV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(EnterpriseManagementV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(EnterpriseManagementV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(EnterpriseManagementV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = EnterpriseManagementV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(EnterpriseManagementV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new EnterpriseManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new EnterpriseManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(EnterpriseManagementV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('createEnterprise', () => {
    describe('positive tests', () => {
      function __createEnterpriseTest() {
        // Construct the params object for operation createEnterprise
        const sourceAccountId = 'testString';
        const name = 'testString';
        const primaryContactIamId = 'testString';
        const domain = 'testString';
        const createEnterpriseParams = {
          sourceAccountId,
          name,
          primaryContactIamId,
          domain,
        };

        const createEnterpriseResult = enterpriseManagementService.createEnterprise(createEnterpriseParams);

        // all methods should return a Promise
        expectToBePromise(createEnterpriseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/enterprises', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.source_account_id).toEqual(sourceAccountId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.primary_contact_iam_id).toEqual(primaryContactIamId);
        expect(mockRequestOptions.body.domain).toEqual(domain);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createEnterpriseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __createEnterpriseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __createEnterpriseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const sourceAccountId = 'testString';
        const name = 'testString';
        const primaryContactIamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createEnterpriseParams = {
          sourceAccountId,
          name,
          primaryContactIamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.createEnterprise(createEnterpriseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.createEnterprise({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.createEnterprise();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listEnterprises', () => {
    describe('positive tests', () => {
      function __listEnterprisesTest() {
        // Construct the params object for operation listEnterprises
        const enterpriseAccountId = 'testString';
        const accountGroupId = 'testString';
        const accountId = 'testString';
        const nextDocid = 'testString';
        const limit = 100;
        const listEnterprisesParams = {
          enterpriseAccountId,
          accountGroupId,
          accountId,
          nextDocid,
          limit,
        };

        const listEnterprisesResult = enterpriseManagementService.listEnterprises(listEnterprisesParams);

        // all methods should return a Promise
        expectToBePromise(listEnterprisesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/enterprises', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.enterprise_account_id).toEqual(enterpriseAccountId);
        expect(mockRequestOptions.qs.account_group_id).toEqual(accountGroupId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.next_docid).toEqual(nextDocid);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listEnterprisesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __listEnterprisesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __listEnterprisesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listEnterprisesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.listEnterprises(listEnterprisesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        enterpriseManagementService.listEnterprises({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('EnterprisesPager tests', () => {
      const serviceUrl = enterpriseManagementServiceOptions.url;
      const path = '/enterprises';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?next_docid=1","resources":[{"url":"url","id":"id","enterprise_account_id":"enterprise_account_id","crn":"crn","name":"name","domain":"domain","state":"state","primary_contact_iam_id":"primary_contact_iam_id","primary_contact_email":"primary_contact_email","source_account_id":"source_account_id","created_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_at":"2019-01-01T12:00:00.000Z","updated_by":"updated_by"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"url":"url","id":"id","enterprise_account_id":"enterprise_account_id","crn":"crn","name":"name","domain":"domain","state":"state","primary_contact_iam_id":"primary_contact_iam_id","primary_contact_email":"primary_contact_email","source_account_id":"source_account_id","created_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_at":"2019-01-01T12:00:00.000Z","updated_by":"updated_by"}]}';

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
          enterpriseAccountId: 'testString',
          accountGroupId: 'testString',
          accountId: 'testString',
          limit: 10,
        };
        const allResults = [];
        const pager = new EnterpriseManagementV1.EnterprisesPager(enterpriseManagementService, params);
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
          enterpriseAccountId: 'testString',
          accountGroupId: 'testString',
          accountId: 'testString',
          limit: 10,
        };
        const pager = new EnterpriseManagementV1.EnterprisesPager(enterpriseManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getEnterprise', () => {
    describe('positive tests', () => {
      function __getEnterpriseTest() {
        // Construct the params object for operation getEnterprise
        const enterpriseId = 'testString';
        const getEnterpriseParams = {
          enterpriseId,
        };

        const getEnterpriseResult = enterpriseManagementService.getEnterprise(getEnterpriseParams);

        // all methods should return a Promise
        expectToBePromise(getEnterpriseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/enterprises/{enterprise_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.enterprise_id).toEqual(enterpriseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEnterpriseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __getEnterpriseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __getEnterpriseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const enterpriseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEnterpriseParams = {
          enterpriseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.getEnterprise(getEnterpriseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.getEnterprise({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.getEnterprise();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateEnterprise', () => {
    describe('positive tests', () => {
      function __updateEnterpriseTest() {
        // Construct the params object for operation updateEnterprise
        const enterpriseId = 'testString';
        const name = 'testString';
        const domain = 'testString';
        const primaryContactIamId = 'testString';
        const updateEnterpriseParams = {
          enterpriseId,
          name,
          domain,
          primaryContactIamId,
        };

        const updateEnterpriseResult = enterpriseManagementService.updateEnterprise(updateEnterpriseParams);

        // all methods should return a Promise
        expectToBePromise(updateEnterpriseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/enterprises/{enterprise_id}', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.domain).toEqual(domain);
        expect(mockRequestOptions.body.primary_contact_iam_id).toEqual(primaryContactIamId);
        expect(mockRequestOptions.path.enterprise_id).toEqual(enterpriseId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateEnterpriseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __updateEnterpriseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __updateEnterpriseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const enterpriseId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateEnterpriseParams = {
          enterpriseId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.updateEnterprise(updateEnterpriseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.updateEnterprise({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.updateEnterprise();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('importAccountToEnterprise', () => {
    describe('positive tests', () => {
      function __importAccountToEnterpriseTest() {
        // Construct the params object for operation importAccountToEnterprise
        const enterpriseId = 'testString';
        const accountId = 'testString';
        const parent = 'testString';
        const billingUnitId = 'testString';
        const importAccountToEnterpriseParams = {
          enterpriseId,
          accountId,
          parent,
          billingUnitId,
        };

        const importAccountToEnterpriseResult = enterpriseManagementService.importAccountToEnterprise(importAccountToEnterpriseParams);

        // all methods should return a Promise
        expectToBePromise(importAccountToEnterpriseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/enterprises/{enterprise_id}/import/accounts/{account_id}', 'PUT');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.parent).toEqual(parent);
        expect(mockRequestOptions.body.billing_unit_id).toEqual(billingUnitId);
        expect(mockRequestOptions.path.enterprise_id).toEqual(enterpriseId);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __importAccountToEnterpriseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __importAccountToEnterpriseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __importAccountToEnterpriseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const enterpriseId = 'testString';
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const importAccountToEnterpriseParams = {
          enterpriseId,
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.importAccountToEnterprise(importAccountToEnterpriseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.importAccountToEnterprise({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.importAccountToEnterprise();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAccount', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CreateAccountRequestTraits
      const createAccountRequestTraitsModel = {
        mfa: 'testString',
        enterprise_iam_managed: true,
      };

      // CreateAccountRequestOptions
      const createAccountRequestOptionsModel = {
        create_iam_service_id_with_apikey_and_owner_policies: true,
      };

      function __createAccountTest() {
        // Construct the params object for operation createAccount
        const parent = 'testString';
        const name = 'testString';
        const ownerIamId = 'testString';
        const traits = createAccountRequestTraitsModel;
        const options = createAccountRequestOptionsModel;
        const createAccountParams = {
          parent,
          name,
          ownerIamId,
          traits,
          options,
        };

        const createAccountResult = enterpriseManagementService.createAccount(createAccountParams);

        // all methods should return a Promise
        expectToBePromise(createAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/accounts', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.parent).toEqual(parent);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.owner_iam_id).toEqual(ownerIamId);
        expect(mockRequestOptions.body.traits).toEqual(traits);
        expect(mockRequestOptions.body.options).toEqual(options);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __createAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __createAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const parent = 'testString';
        const name = 'testString';
        const ownerIamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccountParams = {
          parent,
          name,
          ownerIamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.createAccount(createAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.createAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.createAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccounts', () => {
    describe('positive tests', () => {
      function __listAccountsTest() {
        // Construct the params object for operation listAccounts
        const enterpriseId = 'testString';
        const accountGroupId = 'testString';
        const nextDocid = 'testString';
        const parent = 'testString';
        const limit = 100;
        const includeDeleted = true;
        const listAccountsParams = {
          enterpriseId,
          accountGroupId,
          nextDocid,
          parent,
          limit,
          includeDeleted,
        };

        const listAccountsResult = enterpriseManagementService.listAccounts(listAccountsParams);

        // all methods should return a Promise
        expectToBePromise(listAccountsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/accounts', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.enterprise_id).toEqual(enterpriseId);
        expect(mockRequestOptions.qs.account_group_id).toEqual(accountGroupId);
        expect(mockRequestOptions.qs.next_docid).toEqual(nextDocid);
        expect(mockRequestOptions.qs.parent).toEqual(parent);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.include_deleted).toEqual(includeDeleted);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccountsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __listAccountsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __listAccountsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccountsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.listAccounts(listAccountsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        enterpriseManagementService.listAccounts({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('AccountsPager tests', () => {
      const serviceUrl = enterpriseManagementServiceOptions.url;
      const path = '/accounts';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?next_docid=1","resources":[{"url":"url","id":"id","crn":"crn","parent":"parent","enterprise_account_id":"enterprise_account_id","enterprise_id":"enterprise_id","enterprise_path":"enterprise_path","name":"name","state":"state","owner_iam_id":"owner_iam_id","paid":true,"owner_email":"owner_email","is_enterprise_account":false,"created_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_at":"2019-01-01T12:00:00.000Z","updated_by":"updated_by"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"url":"url","id":"id","crn":"crn","parent":"parent","enterprise_account_id":"enterprise_account_id","enterprise_id":"enterprise_id","enterprise_path":"enterprise_path","name":"name","state":"state","owner_iam_id":"owner_iam_id","paid":true,"owner_email":"owner_email","is_enterprise_account":false,"created_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_at":"2019-01-01T12:00:00.000Z","updated_by":"updated_by"}]}';

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
          enterpriseId: 'testString',
          accountGroupId: 'testString',
          parent: 'testString',
          limit: 10,
          includeDeleted: true,
        };
        const allResults = [];
        const pager = new EnterpriseManagementV1.AccountsPager(enterpriseManagementService, params);
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
          enterpriseId: 'testString',
          accountGroupId: 'testString',
          parent: 'testString',
          limit: 10,
          includeDeleted: true,
        };
        const pager = new EnterpriseManagementV1.AccountsPager(enterpriseManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getAccount', () => {
    describe('positive tests', () => {
      function __getAccountTest() {
        // Construct the params object for operation getAccount
        const accountId = 'testString';
        const getAccountParams = {
          accountId,
        };

        const getAccountResult = enterpriseManagementService.getAccount(getAccountParams);

        // all methods should return a Promise
        expectToBePromise(getAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/accounts/{account_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __getAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __getAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.getAccount(getAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.getAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.getAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccount', () => {
    describe('positive tests', () => {
      function __updateAccountTest() {
        // Construct the params object for operation updateAccount
        const accountId = 'testString';
        const parent = 'testString';
        const updateAccountParams = {
          accountId,
          parent,
        };

        const updateAccountResult = enterpriseManagementService.updateAccount(updateAccountParams);

        // all methods should return a Promise
        expectToBePromise(updateAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/accounts/{account_id}', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.parent).toEqual(parent);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __updateAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __updateAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const parent = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccountParams = {
          accountId,
          parent,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.updateAccount(updateAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.updateAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.updateAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccount', () => {
    describe('positive tests', () => {
      function __deleteAccountTest() {
        // Construct the params object for operation deleteAccount
        const accountId = 'testString';
        const deleteAccountParams = {
          accountId,
        };

        const deleteAccountResult = enterpriseManagementService.deleteAccount(deleteAccountParams);

        // all methods should return a Promise
        expectToBePromise(deleteAccountResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/accounts/{account_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccountTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __deleteAccountTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __deleteAccountTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccountParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.deleteAccount(deleteAccountParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.deleteAccount({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.deleteAccount();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAccountGroup', () => {
    describe('positive tests', () => {
      function __createAccountGroupTest() {
        // Construct the params object for operation createAccountGroup
        const parent = 'testString';
        const name = 'testString';
        const primaryContactIamId = 'testString';
        const createAccountGroupParams = {
          parent,
          name,
          primaryContactIamId,
        };

        const createAccountGroupResult = enterpriseManagementService.createAccountGroup(createAccountGroupParams);

        // all methods should return a Promise
        expectToBePromise(createAccountGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/account-groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.parent).toEqual(parent);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.primary_contact_iam_id).toEqual(primaryContactIamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccountGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __createAccountGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __createAccountGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const parent = 'testString';
        const name = 'testString';
        const primaryContactIamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccountGroupParams = {
          parent,
          name,
          primaryContactIamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.createAccountGroup(createAccountGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.createAccountGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.createAccountGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccountGroups', () => {
    describe('positive tests', () => {
      function __listAccountGroupsTest() {
        // Construct the params object for operation listAccountGroups
        const enterpriseId = 'testString';
        const parentAccountGroupId = 'testString';
        const nextDocid = 'testString';
        const parent = 'testString';
        const limit = 100;
        const includeDeleted = true;
        const listAccountGroupsParams = {
          enterpriseId,
          parentAccountGroupId,
          nextDocid,
          parent,
          limit,
          includeDeleted,
        };

        const listAccountGroupsResult = enterpriseManagementService.listAccountGroups(listAccountGroupsParams);

        // all methods should return a Promise
        expectToBePromise(listAccountGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/account-groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.enterprise_id).toEqual(enterpriseId);
        expect(mockRequestOptions.qs.parent_account_group_id).toEqual(parentAccountGroupId);
        expect(mockRequestOptions.qs.next_docid).toEqual(nextDocid);
        expect(mockRequestOptions.qs.parent).toEqual(parent);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.include_deleted).toEqual(includeDeleted);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccountGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __listAccountGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __listAccountGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccountGroupsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.listAccountGroups(listAccountGroupsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        enterpriseManagementService.listAccountGroups({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('AccountGroupsPager tests', () => {
      const serviceUrl = enterpriseManagementServiceOptions.url;
      const path = '/account-groups';
      const mockPagerResponse1 =
        '{"total_count":2,"limit":1,"next_url":"https://myhost.com/somePath?next_docid=1","resources":[{"url":"url","id":"id","crn":"crn","parent":"parent","enterprise_account_id":"enterprise_account_id","enterprise_id":"enterprise_id","enterprise_path":"enterprise_path","name":"name","state":"state","primary_contact_iam_id":"primary_contact_iam_id","primary_contact_email":"primary_contact_email","created_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_at":"2019-01-01T12:00:00.000Z","updated_by":"updated_by"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"resources":[{"url":"url","id":"id","crn":"crn","parent":"parent","enterprise_account_id":"enterprise_account_id","enterprise_id":"enterprise_id","enterprise_path":"enterprise_path","name":"name","state":"state","primary_contact_iam_id":"primary_contact_iam_id","primary_contact_email":"primary_contact_email","created_at":"2019-01-01T12:00:00.000Z","created_by":"created_by","updated_at":"2019-01-01T12:00:00.000Z","updated_by":"updated_by"}]}';

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
          enterpriseId: 'testString',
          parentAccountGroupId: 'testString',
          parent: 'testString',
          limit: 10,
          includeDeleted: true,
        };
        const allResults = [];
        const pager = new EnterpriseManagementV1.AccountGroupsPager(enterpriseManagementService, params);
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
          enterpriseId: 'testString',
          parentAccountGroupId: 'testString',
          parent: 'testString',
          limit: 10,
          includeDeleted: true,
        };
        const pager = new EnterpriseManagementV1.AccountGroupsPager(enterpriseManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getAccountGroup', () => {
    describe('positive tests', () => {
      function __getAccountGroupTest() {
        // Construct the params object for operation getAccountGroup
        const accountGroupId = 'testString';
        const getAccountGroupParams = {
          accountGroupId,
        };

        const getAccountGroupResult = enterpriseManagementService.getAccountGroup(getAccountGroupParams);

        // all methods should return a Promise
        expectToBePromise(getAccountGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/account-groups/{account_group_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_group_id).toEqual(accountGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __getAccountGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __getAccountGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountGroupParams = {
          accountGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.getAccountGroup(getAccountGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.getAccountGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.getAccountGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccountGroup', () => {
    describe('positive tests', () => {
      function __updateAccountGroupTest() {
        // Construct the params object for operation updateAccountGroup
        const accountGroupId = 'testString';
        const name = 'testString';
        const primaryContactIamId = 'testString';
        const updateAccountGroupParams = {
          accountGroupId,
          name,
          primaryContactIamId,
        };

        const updateAccountGroupResult = enterpriseManagementService.updateAccountGroup(updateAccountGroupParams);

        // all methods should return a Promise
        expectToBePromise(updateAccountGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/account-groups/{account_group_id}', 'PATCH');
        const expectedAccept = undefined;
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.primary_contact_iam_id).toEqual(primaryContactIamId);
        expect(mockRequestOptions.path.account_group_id).toEqual(accountGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccountGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __updateAccountGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __updateAccountGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccountGroupParams = {
          accountGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.updateAccountGroup(updateAccountGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.updateAccountGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.updateAccountGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccountGroup', () => {
    describe('positive tests', () => {
      function __deleteAccountGroupTest() {
        // Construct the params object for operation deleteAccountGroup
        const accountGroupId = 'testString';
        const deleteAccountGroupParams = {
          accountGroupId,
        };

        const deleteAccountGroupResult = enterpriseManagementService.deleteAccountGroup(deleteAccountGroupParams);

        // all methods should return a Promise
        expectToBePromise(deleteAccountGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/account-groups/{account_group_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.account_group_id).toEqual(accountGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccountGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.enableRetries();
        __deleteAccountGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        enterpriseManagementService.disableRetries();
        __deleteAccountGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccountGroupParams = {
          accountGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        enterpriseManagementService.deleteAccountGroup(deleteAccountGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await enterpriseManagementService.deleteAccountGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await enterpriseManagementService.deleteAccountGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
