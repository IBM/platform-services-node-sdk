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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;

const IamAccessGroupsV2 = require('../../dist/iam-access-groups/v2');
const nock = require('nock');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const iamAccessGroupsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://iam.cloud.ibm.com',
};

const iamAccessGroupsService = new IamAccessGroupsV2(iamAccessGroupsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(iamAccessGroupsService, 'createRequest');
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

describe('IamAccessGroupsV2', () => {

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
      const testInstance = IamAccessGroupsV2.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(IamAccessGroupsV2.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(IamAccessGroupsV2.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(IamAccessGroupsV2);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = IamAccessGroupsV2.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(IamAccessGroupsV2);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new IamAccessGroupsV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new IamAccessGroupsV2(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(IamAccessGroupsV2.DEFAULT_SERVICE_URL);
    });
  });

  describe('createAccessGroup', () => {
    describe('positive tests', () => {
      function __createAccessGroupTest() {
        // Construct the params object for operation createAccessGroup
        const accountId = 'testString';
        const name = 'Managers';
        const description = 'Group for managers';
        const transactionId = 'testString';
        const createAccessGroupParams = {
          accountId,
          name,
          description,
          transactionId,
        };

        const createAccessGroupResult = iamAccessGroupsService.createAccessGroup(createAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(createAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __createAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __createAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const name = 'Managers';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAccessGroupParams = {
          accountId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.createAccessGroup(createAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.createAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.createAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccessGroups', () => {
    describe('positive tests', () => {
      function __listAccessGroupsTest() {
        // Construct the params object for operation listAccessGroups
        const accountId = 'testString';
        const transactionId = 'testString';
        const iamId = 'testString';
        const search = 'testString';
        const membershipType = 'static';
        const limit = 50;
        const offset = 0;
        const sort = 'name';
        const showFederated = false;
        const hidePublicAccess = false;
        const listAccessGroupsParams = {
          accountId,
          transactionId,
          iamId,
          search,
          membershipType,
          limit,
          offset,
          sort,
          showFederated,
          hidePublicAccess,
        };

        const listAccessGroupsResult = iamAccessGroupsService.listAccessGroups(listAccessGroupsParams);

        // all methods should return a Promise
        expectToBePromise(listAccessGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.iam_id).toEqual(iamId);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.qs.membership_type).toEqual(membershipType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.show_federated).toEqual(showFederated);
        expect(mockRequestOptions.qs.hide_public_access).toEqual(hidePublicAccess);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccessGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __listAccessGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __listAccessGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccessGroupsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.listAccessGroups(listAccessGroupsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.listAccessGroups({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.listAccessGroups();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('AccessGroupsPager tests', () => {
      const serviceUrl = iamAccessGroupsServiceOptions.url;
      const path = '/v2/groups';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"groups":[{"id":"id","name":"name","description":"description","account_id":"account_id","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","href":"href","is_federated":true}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"groups":[{"id":"id","name":"name","description":"description","account_id":"account_id","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id","last_modified_at":"2019-01-01T12:00:00.000Z","last_modified_by_id":"last_modified_by_id","href":"href","is_federated":true}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'testString',
          transactionId: 'testString',
          iamId: 'testString',
          search: 'testString',
          membershipType: 'static',
          limit: 10,
          sort: 'name',
          showFederated: false,
          hidePublicAccess: false,
        };
        const allResults = [];
        const pager = new IamAccessGroupsV2.AccessGroupsPager(iamAccessGroupsService, params);
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
          accountId: 'testString',
          transactionId: 'testString',
          iamId: 'testString',
          search: 'testString',
          membershipType: 'static',
          limit: 10,
          sort: 'name',
          showFederated: false,
          hidePublicAccess: false,
        };
        const pager = new IamAccessGroupsV2.AccessGroupsPager(iamAccessGroupsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getAccessGroup', () => {
    describe('positive tests', () => {
      function __getAccessGroupTest() {
        // Construct the params object for operation getAccessGroup
        const accessGroupId = 'testString';
        const transactionId = 'testString';
        const showFederated = false;
        const getAccessGroupParams = {
          accessGroupId,
          transactionId,
          showFederated,
        };

        const getAccessGroupResult = iamAccessGroupsService.getAccessGroup(getAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(getAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.show_federated).toEqual(showFederated);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __getAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __getAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccessGroupParams = {
          accessGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.getAccessGroup(getAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccessGroup', () => {
    describe('positive tests', () => {
      function __updateAccessGroupTest() {
        // Construct the params object for operation updateAccessGroup
        const accessGroupId = 'testString';
        const ifMatch = 'testString';
        const name = 'Awesome Managers';
        const description = 'Group for awesome managers.';
        const transactionId = 'testString';
        const updateAccessGroupParams = {
          accessGroupId,
          ifMatch,
          name,
          description,
          transactionId,
        };

        const updateAccessGroupResult = iamAccessGroupsService.updateAccessGroup(updateAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(updateAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __updateAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __updateAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccessGroupParams = {
          accessGroupId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.updateAccessGroup(updateAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAccessGroup', () => {
    describe('positive tests', () => {
      function __deleteAccessGroupTest() {
        // Construct the params object for operation deleteAccessGroup
        const accessGroupId = 'testString';
        const transactionId = 'testString';
        const force = false;
        const deleteAccessGroupParams = {
          accessGroupId,
          transactionId,
          force,
        };

        const deleteAccessGroupResult = iamAccessGroupsService.deleteAccessGroup(deleteAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(deleteAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.force).toEqual(force);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __deleteAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __deleteAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAccessGroupParams = {
          accessGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.deleteAccessGroup(deleteAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('isMemberOfAccessGroup', () => {
    describe('positive tests', () => {
      function __isMemberOfAccessGroupTest() {
        // Construct the params object for operation isMemberOfAccessGroup
        const accessGroupId = 'testString';
        const iamId = 'testString';
        const transactionId = 'testString';
        const isMemberOfAccessGroupParams = {
          accessGroupId,
          iamId,
          transactionId,
        };

        const isMemberOfAccessGroupResult = iamAccessGroupsService.isMemberOfAccessGroup(isMemberOfAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(isMemberOfAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/members/{iam_id}', 'HEAD');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __isMemberOfAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __isMemberOfAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __isMemberOfAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const isMemberOfAccessGroupParams = {
          accessGroupId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.isMemberOfAccessGroup(isMemberOfAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.isMemberOfAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.isMemberOfAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addMembersToAccessGroup', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // AddGroupMembersRequestMembersItem
      const addGroupMembersRequestMembersItemModel = {
        iam_id: 'IBMid-user1',
        type: 'user',
      };

      function __addMembersToAccessGroupTest() {
        // Construct the params object for operation addMembersToAccessGroup
        const accessGroupId = 'testString';
        const members = [addGroupMembersRequestMembersItemModel];
        const transactionId = 'testString';
        const addMembersToAccessGroupParams = {
          accessGroupId,
          members,
          transactionId,
        };

        const addMembersToAccessGroupResult = iamAccessGroupsService.addMembersToAccessGroup(addMembersToAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(addMembersToAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/members', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.members).toEqual(members);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addMembersToAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __addMembersToAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __addMembersToAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addMembersToAccessGroupParams = {
          accessGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.addMembersToAccessGroup(addMembersToAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.addMembersToAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.addMembersToAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccessGroupMembers', () => {
    describe('positive tests', () => {
      function __listAccessGroupMembersTest() {
        // Construct the params object for operation listAccessGroupMembers
        const accessGroupId = 'testString';
        const transactionId = 'testString';
        const membershipType = 'static';
        const limit = 50;
        const offset = 0;
        const type = 'testString';
        const verbose = false;
        const sort = 'testString';
        const listAccessGroupMembersParams = {
          accessGroupId,
          transactionId,
          membershipType,
          limit,
          offset,
          type,
          verbose,
          sort,
        };

        const listAccessGroupMembersResult = iamAccessGroupsService.listAccessGroupMembers(listAccessGroupMembersParams);

        // all methods should return a Promise
        expectToBePromise(listAccessGroupMembersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/members', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.membership_type).toEqual(membershipType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.qs.verbose).toEqual(verbose);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccessGroupMembersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __listAccessGroupMembersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __listAccessGroupMembersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccessGroupMembersParams = {
          accessGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.listAccessGroupMembers(listAccessGroupMembersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.listAccessGroupMembers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.listAccessGroupMembers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('AccessGroupMembersPager tests', () => {
      const serviceUrl = iamAccessGroupsServiceOptions.url;
      const path = '/v2/groups/testString/members';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"members":[{"iam_id":"iam_id","type":"type","membership_type":"membership_type","name":"name","email":"email","description":"description","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id"}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"members":[{"iam_id":"iam_id","type":"type","membership_type":"membership_type","name":"name","email":"email","description":"description","href":"href","created_at":"2019-01-01T12:00:00.000Z","created_by_id":"created_by_id"}],"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accessGroupId: 'testString',
          transactionId: 'testString',
          membershipType: 'static',
          limit: 10,
          type: 'testString',
          verbose: false,
          sort: 'testString',
        };
        const allResults = [];
        const pager = new IamAccessGroupsV2.AccessGroupMembersPager(iamAccessGroupsService, params);
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
          accessGroupId: 'testString',
          transactionId: 'testString',
          membershipType: 'static',
          limit: 10,
          type: 'testString',
          verbose: false,
          sort: 'testString',
        };
        const pager = new IamAccessGroupsV2.AccessGroupMembersPager(iamAccessGroupsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('removeMemberFromAccessGroup', () => {
    describe('positive tests', () => {
      function __removeMemberFromAccessGroupTest() {
        // Construct the params object for operation removeMemberFromAccessGroup
        const accessGroupId = 'testString';
        const iamId = 'testString';
        const transactionId = 'testString';
        const removeMemberFromAccessGroupParams = {
          accessGroupId,
          iamId,
          transactionId,
        };

        const removeMemberFromAccessGroupResult = iamAccessGroupsService.removeMemberFromAccessGroup(removeMemberFromAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(removeMemberFromAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/members/{iam_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeMemberFromAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __removeMemberFromAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __removeMemberFromAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeMemberFromAccessGroupParams = {
          accessGroupId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.removeMemberFromAccessGroup(removeMemberFromAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeMemberFromAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeMemberFromAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('removeMembersFromAccessGroup', () => {
    describe('positive tests', () => {
      function __removeMembersFromAccessGroupTest() {
        // Construct the params object for operation removeMembersFromAccessGroup
        const accessGroupId = 'testString';
        const members = ['IBMId-user1', 'iam-ServiceId-123', 'iam-Profile-123'];
        const transactionId = 'testString';
        const removeMembersFromAccessGroupParams = {
          accessGroupId,
          members,
          transactionId,
        };

        const removeMembersFromAccessGroupResult = iamAccessGroupsService.removeMembersFromAccessGroup(removeMembersFromAccessGroupParams);

        // all methods should return a Promise
        expectToBePromise(removeMembersFromAccessGroupResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/members/delete', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.members).toEqual(members);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeMembersFromAccessGroupTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __removeMembersFromAccessGroupTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __removeMembersFromAccessGroupTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeMembersFromAccessGroupParams = {
          accessGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.removeMembersFromAccessGroup(removeMembersFromAccessGroupParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeMembersFromAccessGroup({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeMembersFromAccessGroup();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('removeMemberFromAllAccessGroups', () => {
    describe('positive tests', () => {
      function __removeMemberFromAllAccessGroupsTest() {
        // Construct the params object for operation removeMemberFromAllAccessGroups
        const accountId = 'testString';
        const iamId = 'testString';
        const transactionId = 'testString';
        const removeMemberFromAllAccessGroupsParams = {
          accountId,
          iamId,
          transactionId,
        };

        const removeMemberFromAllAccessGroupsResult = iamAccessGroupsService.removeMemberFromAllAccessGroups(removeMemberFromAllAccessGroupsParams);

        // all methods should return a Promise
        expectToBePromise(removeMemberFromAllAccessGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/_allgroups/members/{iam_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeMemberFromAllAccessGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __removeMemberFromAllAccessGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __removeMemberFromAllAccessGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeMemberFromAllAccessGroupsParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.removeMemberFromAllAccessGroups(removeMemberFromAllAccessGroupsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeMemberFromAllAccessGroups({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeMemberFromAllAccessGroups();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addMemberToMultipleAccessGroups', () => {
    describe('positive tests', () => {
      function __addMemberToMultipleAccessGroupsTest() {
        // Construct the params object for operation addMemberToMultipleAccessGroups
        const accountId = 'testString';
        const iamId = 'testString';
        const type = 'user';
        const groups = ['AccessGroupId-b0d32f56-f85c-4bf1-af37-7bbd92b1b2b3'];
        const transactionId = 'testString';
        const addMemberToMultipleAccessGroupsParams = {
          accountId,
          iamId,
          type,
          groups,
          transactionId,
        };

        const addMemberToMultipleAccessGroupsResult = iamAccessGroupsService.addMemberToMultipleAccessGroups(addMemberToMultipleAccessGroupsParams);

        // all methods should return a Promise
        expectToBePromise(addMemberToMultipleAccessGroupsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/_allgroups/members/{iam_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.groups).toEqual(groups);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.path.iam_id).toEqual(iamId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addMemberToMultipleAccessGroupsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __addMemberToMultipleAccessGroupsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __addMemberToMultipleAccessGroupsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const iamId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addMemberToMultipleAccessGroupsParams = {
          accountId,
          iamId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.addMemberToMultipleAccessGroups(addMemberToMultipleAccessGroupsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.addMemberToMultipleAccessGroups({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.addMemberToMultipleAccessGroups();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addAccessGroupRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuleConditions
      const ruleConditionsModel = {
        claim: 'isManager',
        operator: 'EQUALS',
        value: 'true',
      };

      function __addAccessGroupRuleTest() {
        // Construct the params object for operation addAccessGroupRule
        const accessGroupId = 'testString';
        const expiration = 12;
        const realmName = 'https://idp.example.org/SAML2';
        const conditions = [ruleConditionsModel];
        const name = 'Manager group rule';
        const transactionId = 'testString';
        const addAccessGroupRuleParams = {
          accessGroupId,
          expiration,
          realmName,
          conditions,
          name,
          transactionId,
        };

        const addAccessGroupRuleResult = iamAccessGroupsService.addAccessGroupRule(addAccessGroupRuleParams);

        // all methods should return a Promise
        expectToBePromise(addAccessGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/rules', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.expiration).toEqual(expiration);
        expect(mockRequestOptions.body.realm_name).toEqual(realmName);
        expect(mockRequestOptions.body.conditions).toEqual(conditions);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addAccessGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __addAccessGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __addAccessGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const expiration = 12;
        const realmName = 'https://idp.example.org/SAML2';
        const conditions = [ruleConditionsModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addAccessGroupRuleParams = {
          accessGroupId,
          expiration,
          realmName,
          conditions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.addAccessGroupRule(addAccessGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.addAccessGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.addAccessGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAccessGroupRules', () => {
    describe('positive tests', () => {
      function __listAccessGroupRulesTest() {
        // Construct the params object for operation listAccessGroupRules
        const accessGroupId = 'testString';
        const transactionId = 'testString';
        const listAccessGroupRulesParams = {
          accessGroupId,
          transactionId,
        };

        const listAccessGroupRulesResult = iamAccessGroupsService.listAccessGroupRules(listAccessGroupRulesParams);

        // all methods should return a Promise
        expectToBePromise(listAccessGroupRulesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/rules', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAccessGroupRulesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __listAccessGroupRulesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __listAccessGroupRulesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAccessGroupRulesParams = {
          accessGroupId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.listAccessGroupRules(listAccessGroupRulesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.listAccessGroupRules({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.listAccessGroupRules();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccessGroupRule', () => {
    describe('positive tests', () => {
      function __getAccessGroupRuleTest() {
        // Construct the params object for operation getAccessGroupRule
        const accessGroupId = 'testString';
        const ruleId = 'testString';
        const transactionId = 'testString';
        const getAccessGroupRuleParams = {
          accessGroupId,
          ruleId,
          transactionId,
        };

        const getAccessGroupRuleResult = iamAccessGroupsService.getAccessGroupRule(getAccessGroupRuleParams);

        // all methods should return a Promise
        expectToBePromise(getAccessGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/rules/{rule_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccessGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __getAccessGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __getAccessGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccessGroupRuleParams = {
          accessGroupId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.getAccessGroupRule(getAccessGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAccessGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAccessGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceAccessGroupRule', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // RuleConditions
      const ruleConditionsModel = {
        claim: 'isManager',
        operator: 'EQUALS',
        value: 'true',
      };

      function __replaceAccessGroupRuleTest() {
        // Construct the params object for operation replaceAccessGroupRule
        const accessGroupId = 'testString';
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const expiration = 12;
        const realmName = 'https://idp.example.org/SAML2';
        const conditions = [ruleConditionsModel];
        const name = 'Manager group rule';
        const transactionId = 'testString';
        const replaceAccessGroupRuleParams = {
          accessGroupId,
          ruleId,
          ifMatch,
          expiration,
          realmName,
          conditions,
          name,
          transactionId,
        };

        const replaceAccessGroupRuleResult = iamAccessGroupsService.replaceAccessGroupRule(replaceAccessGroupRuleParams);

        // all methods should return a Promise
        expectToBePromise(replaceAccessGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/rules/{rule_id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.expiration).toEqual(expiration);
        expect(mockRequestOptions.body.realm_name).toEqual(realmName);
        expect(mockRequestOptions.body.conditions).toEqual(conditions);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceAccessGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __replaceAccessGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __replaceAccessGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const ruleId = 'testString';
        const ifMatch = 'testString';
        const expiration = 12;
        const realmName = 'https://idp.example.org/SAML2';
        const conditions = [ruleConditionsModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceAccessGroupRuleParams = {
          accessGroupId,
          ruleId,
          ifMatch,
          expiration,
          realmName,
          conditions,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.replaceAccessGroupRule(replaceAccessGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.replaceAccessGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.replaceAccessGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('removeAccessGroupRule', () => {
    describe('positive tests', () => {
      function __removeAccessGroupRuleTest() {
        // Construct the params object for operation removeAccessGroupRule
        const accessGroupId = 'testString';
        const ruleId = 'testString';
        const transactionId = 'testString';
        const removeAccessGroupRuleParams = {
          accessGroupId,
          ruleId,
          transactionId,
        };

        const removeAccessGroupRuleResult = iamAccessGroupsService.removeAccessGroupRule(removeAccessGroupRuleParams);

        // all methods should return a Promise
        expectToBePromise(removeAccessGroupRuleResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/{access_group_id}/rules/{rule_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.access_group_id).toEqual(accessGroupId);
        expect(mockRequestOptions.path.rule_id).toEqual(ruleId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeAccessGroupRuleTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __removeAccessGroupRuleTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __removeAccessGroupRuleTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accessGroupId = 'testString';
        const ruleId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeAccessGroupRuleParams = {
          accessGroupId,
          ruleId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.removeAccessGroupRule(removeAccessGroupRuleParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeAccessGroupRule({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.removeAccessGroupRule();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getAccountSettings', () => {
    describe('positive tests', () => {
      function __getAccountSettingsTest() {
        // Construct the params object for operation getAccountSettings
        const accountId = 'testString';
        const transactionId = 'testString';
        const getAccountSettingsParams = {
          accountId,
          transactionId,
        };

        const getAccountSettingsResult = iamAccessGroupsService.getAccountSettings(getAccountSettingsParams);

        // all methods should return a Promise
        expectToBePromise(getAccountSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAccountSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __getAccountSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __getAccountSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAccountSettingsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.getAccountSettings(getAccountSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAccountSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAccountSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAccountSettings', () => {
    describe('positive tests', () => {
      function __updateAccountSettingsTest() {
        // Construct the params object for operation updateAccountSettings
        const accountId = 'testString';
        const publicAccessEnabled = true;
        const transactionId = 'testString';
        const updateAccountSettingsParams = {
          accountId,
          publicAccessEnabled,
          transactionId,
        };

        const updateAccountSettingsResult = iamAccessGroupsService.updateAccountSettings(updateAccountSettingsParams);

        // all methods should return a Promise
        expectToBePromise(updateAccountSettingsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v2/groups/settings', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.public_access_enabled).toEqual(publicAccessEnabled);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAccountSettingsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __updateAccountSettingsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __updateAccountSettingsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAccountSettingsParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.updateAccountSettings(updateAccountSettingsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateAccountSettings({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateAccountSettings();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MembersActionControls
      const membersActionControlsModel = {
        add: true,
        remove: false,
      };

      // MembersInput
      const membersInputModel = {
        users: ['IBMid-50PJGPKYJJ', 'IBMid-665000T8WY'],
        service_ids: ['testString'],
        action_controls: membersActionControlsModel,
      };

      // ConditionInput
      const conditionInputModel = {
        claim: 'blueGroup',
        operator: 'CONTAINS',
        value: '"test-bluegroup-saml"',
      };

      // RulesActionControls
      const rulesActionControlsModel = {
        remove: false,
        update: false,
      };

      // RuleInput
      const ruleInputModel = {
        name: 'Manager group rule',
        expiration: 12,
        realm_name: 'https://idp.example.org/SAML2',
        conditions: [conditionInputModel],
        action_controls: rulesActionControlsModel,
      };

      // AssertionsActionControls
      const assertionsActionControlsModel = {
        add: false,
        remove: true,
        update: true,
      };

      // AssertionsInput
      const assertionsInputModel = {
        rules: [ruleInputModel],
        action_controls: assertionsActionControlsModel,
      };

      // AccessActionControls
      const accessActionControlsModel = {
        add: false,
      };

      // GroupActionControls
      const groupActionControlsModel = {
        access: accessActionControlsModel,
      };

      // AccessGroupInput
      const accessGroupInputModel = {
        name: 'IAM Admin Group',
        description: 'This access group template allows admin access to all IAM platform services in the account.',
        members: membersInputModel,
        assertions: assertionsInputModel,
        action_controls: groupActionControlsModel,
      };

      // PolicyTemplatesInput
      const policyTemplatesInputModel = {
        id: 'policyTemplateId-123',
        version: '1',
      };

      function __createTemplateTest() {
        // Construct the params object for operation createTemplate
        const name = 'IAM Admin Group template';
        const accountId = 'accountID-123';
        const description = 'This access group template allows admin access to all IAM platform services in the account.';
        const group = accessGroupInputModel;
        const policyTemplateReferences = [policyTemplatesInputModel];
        const transactionId = 'testString';
        const createTemplateParams = {
          name,
          accountId,
          description,
          group,
          policyTemplateReferences,
          transactionId,
        };

        const createTemplateResult = iamAccessGroupsService.createTemplate(createTemplateParams);

        // all methods should return a Promise
        expectToBePromise(createTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.policy_template_references).toEqual(policyTemplateReferences);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __createTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __createTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const name = 'IAM Admin Group template';
        const accountId = 'accountID-123';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTemplateParams = {
          name,
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.createTemplate(createTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.createTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.createTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTemplates', () => {
    describe('positive tests', () => {
      function __listTemplatesTest() {
        // Construct the params object for operation listTemplates
        const accountId = 'accountID-123';
        const transactionId = 'testString';
        const limit = 50;
        const offset = 0;
        const verbose = true;
        const listTemplatesParams = {
          accountId,
          transactionId,
          limit,
          offset,
          verbose,
        };

        const listTemplatesResult = iamAccessGroupsService.listTemplates(listTemplatesParams);

        // all methods should return a Promise
        expectToBePromise(listTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.verbose).toEqual(verbose);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __listTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __listTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'accountID-123';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTemplatesParams = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.listTemplates(listTemplatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.listTemplates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.listTemplates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('TemplatesPager tests', () => {
      const serviceUrl = iamAccessGroupsServiceOptions.url;
      const path = '/v1/group_templates';
      const mockPagerResponse1 =
        '{"group_templates":[{"id":"id","name":"name","description":"description","version":"version","created_at":"created_at","created_by_id":"created_by_id","last_modified_at":"last_modified_at","last_modified_by_id":"last_modified_by_id","href":"href"}],"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"group_templates":[{"id":"id","name":"name","description":"description","version":"version","created_at":"created_at","created_by_id":"created_by_id","last_modified_at":"last_modified_at","last_modified_by_id":"last_modified_by_id","href":"href"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          accountId: 'accountID-123',
          transactionId: 'testString',
          limit: 50,
          verbose: true,
        };
        const allResults = [];
        const pager = new IamAccessGroupsV2.TemplatesPager(iamAccessGroupsService, params);
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
          accountId: 'accountID-123',
          transactionId: 'testString',
          limit: 50,
          verbose: true,
        };
        const pager = new IamAccessGroupsV2.TemplatesPager(iamAccessGroupsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MembersActionControls
      const membersActionControlsModel = {
        add: true,
        remove: false,
      };

      // MembersInput
      const membersInputModel = {
        users: ['IBMid-50PJGPKYJJ', 'IBMid-665000T8WY'],
        service_ids: ['testString'],
        action_controls: membersActionControlsModel,
      };

      // ConditionInput
      const conditionInputModel = {
        claim: 'blueGroup',
        operator: 'CONTAINS',
        value: '"test-bluegroup-saml"',
      };

      // RulesActionControls
      const rulesActionControlsModel = {
        remove: true,
        update: true,
      };

      // RuleInput
      const ruleInputModel = {
        name: 'Manager group rule',
        expiration: 12,
        realm_name: 'https://idp.example.org/SAML2',
        conditions: [conditionInputModel],
        action_controls: rulesActionControlsModel,
      };

      // AssertionsActionControls
      const assertionsActionControlsModel = {
        add: false,
        remove: true,
        update: true,
      };

      // AssertionsInput
      const assertionsInputModel = {
        rules: [ruleInputModel],
        action_controls: assertionsActionControlsModel,
      };

      // AccessActionControls
      const accessActionControlsModel = {
        add: false,
      };

      // GroupActionControls
      const groupActionControlsModel = {
        access: accessActionControlsModel,
      };

      // AccessGroupInput
      const accessGroupInputModel = {
        name: 'IAM Admin Group 8',
        description: 'This access group template allows admin access to all IAM platform services in the account.',
        members: membersInputModel,
        assertions: assertionsInputModel,
        action_controls: groupActionControlsModel,
      };

      // PolicyTemplatesInput
      const policyTemplatesInputModel = {
        id: 'policyTemplateId-123',
        version: '1',
      };

      function __createTemplateVersionTest() {
        // Construct the params object for operation createTemplateVersion
        const templateId = 'testString';
        const name = 'IAM Admin Group template 2';
        const description = 'This access group template allows admin access to all IAM platform services in the account.';
        const group = accessGroupInputModel;
        const policyTemplateReferences = [policyTemplatesInputModel];
        const transactionId = 'testString';
        const createTemplateVersionParams = {
          templateId,
          name,
          description,
          group,
          policyTemplateReferences,
          transactionId,
        };

        const createTemplateVersionResult = iamAccessGroupsService.createTemplateVersion(createTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(createTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}/versions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.policy_template_references).toEqual(policyTemplateReferences);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __createTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __createTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTemplateVersionParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.createTemplateVersion(createTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.createTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.createTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTemplateVersions', () => {
    describe('positive tests', () => {
      function __listTemplateVersionsTest() {
        // Construct the params object for operation listTemplateVersions
        const templateId = 'testString';
        const limit = 100;
        const offset = 0;
        const listTemplateVersionsParams = {
          templateId,
          limit,
          offset,
        };

        const listTemplateVersionsResult = iamAccessGroupsService.listTemplateVersions(listTemplateVersionsParams);

        // all methods should return a Promise
        expectToBePromise(listTemplateVersionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}/versions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTemplateVersionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __listTemplateVersionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __listTemplateVersionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTemplateVersionsParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.listTemplateVersions(listTemplateVersionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.listTemplateVersions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.listTemplateVersions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('TemplateVersionsPager tests', () => {
      const serviceUrl = iamAccessGroupsServiceOptions.url;
      const path = '/v1/group_templates/testString/versions';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"group_template_versions":[{"name":"name","description":"description","account_id":"account_id","version":"version","committed":false,"group":{"name":"name","description":"description","members":{"users":["users"],"service_ids":["service_ids"],"action_controls":{"add":false,"remove":true}},"assertions":{"rules":[{"name":"name","expiration":10,"realm_name":"realm_name","conditions":[{"claim":"claim","operator":"operator","value":"value"}],"action_controls":{"remove":true,"update":true}}],"action_controls":{"add":false,"remove":true,"update":true}},"action_controls":{"access":{"add":false}}},"policy_template_references":[{"id":"id","version":"version"}],"href":"href","created_at":"created_at","created_by_id":"created_by_id","last_modified_at":"last_modified_at","last_modified_by_id":"last_modified_by_id"}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"group_template_versions":[{"name":"name","description":"description","account_id":"account_id","version":"version","committed":false,"group":{"name":"name","description":"description","members":{"users":["users"],"service_ids":["service_ids"],"action_controls":{"add":false,"remove":true}},"assertions":{"rules":[{"name":"name","expiration":10,"realm_name":"realm_name","conditions":[{"claim":"claim","operator":"operator","value":"value"}],"action_controls":{"remove":true,"update":true}}],"action_controls":{"add":false,"remove":true,"update":true}},"action_controls":{"access":{"add":false}}},"policy_template_references":[{"id":"id","version":"version"}],"href":"href","created_at":"created_at","created_by_id":"created_by_id","last_modified_at":"last_modified_at","last_modified_by_id":"last_modified_by_id"}],"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get(uri => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          templateId: 'testString',
          limit: 100,
        };
        const allResults = [];
        const pager = new IamAccessGroupsV2.TemplateVersionsPager(iamAccessGroupsService, params);
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
          templateId: 'testString',
          limit: 100,
        };
        const pager = new IamAccessGroupsV2.TemplateVersionsPager(iamAccessGroupsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getTemplateVersion', () => {
    describe('positive tests', () => {
      function __getTemplateVersionTest() {
        // Construct the params object for operation getTemplateVersion
        const templateId = 'testString';
        const versionNum = 'testString';
        const transactionId = 'testString';
        const getTemplateVersionParams = {
          templateId,
          versionNum,
          transactionId,
        };

        const getTemplateVersionResult = iamAccessGroupsService.getTemplateVersion(getTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}/versions/{version_num}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version_num).toEqual(versionNum);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __getTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __getTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const versionNum = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTemplateVersionParams = {
          templateId,
          versionNum,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.getTemplateVersion(getTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.getTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.getTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateTemplateVersion', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // MembersActionControls
      const membersActionControlsModel = {
        add: true,
        remove: false,
      };

      // MembersInput
      const membersInputModel = {
        users: ['IBMid-665000T8WY'],
        service_ids: ['testString'],
        action_controls: membersActionControlsModel,
      };

      // ConditionInput
      const conditionInputModel = {
        claim: 'blueGroup',
        operator: 'CONTAINS',
        value: '"test-bluegroup-saml"',
      };

      // RulesActionControls
      const rulesActionControlsModel = {
        remove: false,
        update: false,
      };

      // RuleInput
      const ruleInputModel = {
        name: 'Manager group rule',
        expiration: 12,
        realm_name: 'https://idp.example.org/SAML2',
        conditions: [conditionInputModel],
        action_controls: rulesActionControlsModel,
      };

      // AssertionsActionControls
      const assertionsActionControlsModel = {
        add: false,
        remove: true,
        update: true,
      };

      // AssertionsInput
      const assertionsInputModel = {
        rules: [ruleInputModel],
        action_controls: assertionsActionControlsModel,
      };

      // AccessActionControls
      const accessActionControlsModel = {
        add: false,
      };

      // GroupActionControls
      const groupActionControlsModel = {
        access: accessActionControlsModel,
      };

      // AccessGroupInput
      const accessGroupInputModel = {
        name: 'IAM Admin Group 8',
        description: 'This access group template allows admin access to all IAM platform services in the account.',
        members: membersInputModel,
        assertions: assertionsInputModel,
        action_controls: groupActionControlsModel,
      };

      // PolicyTemplatesInput
      const policyTemplatesInputModel = {
        id: 'policyTemplateId-123',
        version: '1',
      };

      function __updateTemplateVersionTest() {
        // Construct the params object for operation updateTemplateVersion
        const templateId = 'testString';
        const versionNum = 'testString';
        const ifMatch = 'testString';
        const id = 'testString';
        const name = 'IAM Admin Group template 2';
        const description = 'This access group template allows admin access to all IAM platform services in the account.';
        const accountId = 'testString';
        const version = 'testString';
        const committed = true;
        const group = accessGroupInputModel;
        const policyTemplateReferences = [policyTemplatesInputModel];
        const href = 'testString';
        const createdAt = '2019-01-01T12:00:00.000Z';
        const createdById = 'testString';
        const lastModifiedAt = '2019-01-01T12:00:00.000Z';
        const lastModifiedById = 'testString';
        const transactionId = '83adf5bd-de790caa3';
        const updateTemplateVersionParams = {
          templateId,
          versionNum,
          ifMatch,
          id,
          name,
          description,
          accountId,
          version,
          committed,
          group,
          policyTemplateReferences,
          href,
          createdAt,
          createdById,
          lastModifiedAt,
          lastModifiedById,
          transactionId,
        };

        const updateTemplateVersionResult = iamAccessGroupsService.updateTemplateVersion(updateTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(updateTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}/versions/{version_num}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.account_id).toEqual(accountId);
        expect(mockRequestOptions.body.version).toEqual(version);
        expect(mockRequestOptions.body.committed).toEqual(committed);
        expect(mockRequestOptions.body.group).toEqual(group);
        expect(mockRequestOptions.body.policy_template_references).toEqual(policyTemplateReferences);
        expect(mockRequestOptions.body.href).toEqual(href);
        expect(mockRequestOptions.body.created_at).toEqual(createdAt);
        expect(mockRequestOptions.body.created_by_id).toEqual(createdById);
        expect(mockRequestOptions.body.last_modified_at).toEqual(lastModifiedAt);
        expect(mockRequestOptions.body.last_modified_by_id).toEqual(lastModifiedById);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version_num).toEqual(versionNum);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __updateTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __updateTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const versionNum = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateTemplateVersionParams = {
          templateId,
          versionNum,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.updateTemplateVersion(updateTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTemplateVersion', () => {
    describe('positive tests', () => {
      function __deleteTemplateVersionTest() {
        // Construct the params object for operation deleteTemplateVersion
        const templateId = 'testString';
        const versionNum = 'testString';
        const transactionId = 'testString';
        const deleteTemplateVersionParams = {
          templateId,
          versionNum,
          transactionId,
        };

        const deleteTemplateVersionResult = iamAccessGroupsService.deleteTemplateVersion(deleteTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(deleteTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}/versions/{version_num}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version_num).toEqual(versionNum);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __deleteTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __deleteTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const versionNum = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTemplateVersionParams = {
          templateId,
          versionNum,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.deleteTemplateVersion(deleteTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('commitTemplate', () => {
    describe('positive tests', () => {
      function __commitTemplateTest() {
        // Construct the params object for operation commitTemplate
        const templateId = 'testString';
        const versionNum = 'testString';
        const ifMatch = 'testString';
        const transactionId = 'testString';
        const commitTemplateParams = {
          templateId,
          versionNum,
          ifMatch,
          transactionId,
        };

        const commitTemplateResult = iamAccessGroupsService.commitTemplate(commitTemplateParams);

        // all methods should return a Promise
        expectToBePromise(commitTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}/versions/{version_num}/commit', 'POST');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
        expect(mockRequestOptions.path.version_num).toEqual(versionNum);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __commitTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __commitTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __commitTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const versionNum = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const commitTemplateParams = {
          templateId,
          versionNum,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.commitTemplate(commitTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.commitTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.commitTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getLatestTemplateVersion', () => {
    describe('positive tests', () => {
      function __getLatestTemplateVersionTest() {
        // Construct the params object for operation getLatestTemplateVersion
        const templateId = 'testString';
        const transactionId = 'testString';
        const getLatestTemplateVersionParams = {
          templateId,
          transactionId,
        };

        const getLatestTemplateVersionResult = iamAccessGroupsService.getLatestTemplateVersion(getLatestTemplateVersionParams);

        // all methods should return a Promise
        expectToBePromise(getLatestTemplateVersionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getLatestTemplateVersionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __getLatestTemplateVersionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __getLatestTemplateVersionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getLatestTemplateVersionParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.getLatestTemplateVersion(getLatestTemplateVersionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.getLatestTemplateVersion({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.getLatestTemplateVersion();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTemplate', () => {
    describe('positive tests', () => {
      function __deleteTemplateTest() {
        // Construct the params object for operation deleteTemplate
        const templateId = 'testString';
        const transactionId = 'testString';
        const deleteTemplateParams = {
          templateId,
          transactionId,
        };

        const deleteTemplateResult = iamAccessGroupsService.deleteTemplate(deleteTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deleteTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_templates/{template_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.template_id).toEqual(templateId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __deleteTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __deleteTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTemplateParams = {
          templateId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.deleteTemplate(deleteTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createAssignment', () => {
    describe('positive tests', () => {
      function __createAssignmentTest() {
        // Construct the params object for operation createAssignment
        const templateId = 'AccessGroupTemplateId-4be4';
        const templateVersion = '1';
        const targetType = 'AccountGroup';
        const target = '0a45594d0f-123';
        const transactionId = 'testString';
        const createAssignmentParams = {
          templateId,
          templateVersion,
          targetType,
          target,
          transactionId,
        };

        const createAssignmentResult = iamAccessGroupsService.createAssignment(createAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(createAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_assignments', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.body.template_id).toEqual(templateId);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.body.target_type).toEqual(targetType);
        expect(mockRequestOptions.body.target).toEqual(target);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __createAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __createAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const templateId = 'AccessGroupTemplateId-4be4';
        const templateVersion = '1';
        const targetType = 'AccountGroup';
        const target = '0a45594d0f-123';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createAssignmentParams = {
          templateId,
          templateVersion,
          targetType,
          target,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.createAssignment(createAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.createAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.createAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listAssignments', () => {
    describe('positive tests', () => {
      function __listAssignmentsTest() {
        // Construct the params object for operation listAssignments
        const accountId = 'accountID-123';
        const listAssignmentsParams = {
          accountId,
        };

        const listAssignmentsResult = iamAccessGroupsService.listAssignments(listAssignmentsParams);

        // all methods should return a Promise
        expectToBePromise(listAssignmentsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_assignments', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.account_id).toEqual(accountId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listAssignmentsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __listAssignmentsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __listAssignmentsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listAssignmentsParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.listAssignments(listAssignmentsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        iamAccessGroupsService.listAssignments({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });

  describe('getAssignment', () => {
    describe('positive tests', () => {
      function __getAssignmentTest() {
        // Construct the params object for operation getAssignment
        const assignmentId = 'testString';
        const transactionId = 'testString';
        const verbose = false;
        const getAssignmentParams = {
          assignmentId,
          transactionId,
          verbose,
        };

        const getAssignmentResult = iamAccessGroupsService.getAssignment(getAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(getAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_assignments/{assignment_id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.qs.verbose).toEqual(verbose);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __getAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __getAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.getAssignment(getAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.getAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateAssignment', () => {
    describe('positive tests', () => {
      function __updateAssignmentTest() {
        // Construct the params object for operation updateAssignment
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const templateVersion = 1;
        const updateAssignmentParams = {
          assignmentId,
          ifMatch,
          templateVersion,
        };

        const updateAssignmentResult = iamAccessGroupsService.updateAssignment(updateAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(updateAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_assignments/{assignment_id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'If-Match', ifMatch);
        expect(mockRequestOptions.body.template_version).toEqual(templateVersion);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __updateAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __updateAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const ifMatch = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateAssignmentParams = {
          assignmentId,
          ifMatch,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.updateAssignment(updateAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.updateAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteAssignment', () => {
    describe('positive tests', () => {
      function __deleteAssignmentTest() {
        // Construct the params object for operation deleteAssignment
        const assignmentId = 'testString';
        const transactionId = 'testString';
        const deleteAssignmentParams = {
          assignmentId,
          transactionId,
        };

        const deleteAssignmentResult = iamAccessGroupsService.deleteAssignment(deleteAssignmentParams);

        // all methods should return a Promise
        expectToBePromise(deleteAssignmentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/group_assignments/{assignment_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'Transaction-Id', transactionId);
        expect(mockRequestOptions.path.assignment_id).toEqual(assignmentId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteAssignmentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.enableRetries();
        __deleteAssignmentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        iamAccessGroupsService.disableRetries();
        __deleteAssignmentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const assignmentId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteAssignmentParams = {
          assignmentId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        iamAccessGroupsService.deleteAssignment(deleteAssignmentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteAssignment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await iamAccessGroupsService.deleteAssignment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
