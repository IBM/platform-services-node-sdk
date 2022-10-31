/**
 * (C) Copyright IBM Corp. 2022.
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

const IamAccessGroupsV2 = require('../../dist/iam-access-groups/v2');
const nock = require('nock');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
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
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
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
        const membershipType = 'static';
        const limit = 100;
        const offset = 38;
        const sort = 'name';
        const showFederated = false;
        const hidePublicAccess = false;
        const listAccessGroupsParams = {
          accountId,
          transactionId,
          iamId,
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
        const limit = 100;
        const offset = 38;
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
        const groups = ['access-group-id-1'];
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
});
