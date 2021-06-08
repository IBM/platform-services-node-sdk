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
'use strict';

const { NoAuthAuthenticator, unitTestUtils } = require('ibm-cloud-sdk-core');
const GlobalTaggingV1 = require('../../dist/global-tagging/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://tags.global-search-tagging.cloud.ibm.com',
};

const globalTagging = new GlobalTaggingV1(service);
const createRequestMock = jest.spyOn(globalTagging, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('GlobalTaggingV1', () => {
  describe('listTags', () => {
    describe('positive tests', () => {

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listTags
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const fullData = true;
        const providers = ['ghost'];
        const attachedTo = 'testString';
        const offset = 38;
        const limit = 38;
        const timeout = 38;
        const orderByName = 'asc';
        const attachedOnly = true;
        const params = {
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
          fullData: fullData,
          providers: providers,
          attachedTo: attachedTo,
          offset: offset,
          limit: limit,
          timeout: timeout,
          orderByName: orderByName,
          attachedOnly: attachedOnly,
        };

        const listTagsResult = globalTagging.listTags(params);

        // all methods should return a Promise
        expectToBePromise(listTagsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
        expect(options.qs['full_data']).toEqual(fullData);
        expect(options.qs['providers']).toEqual(providers);
        expect(options.qs['attached_to']).toEqual(attachedTo);
        expect(options.qs['offset']).toEqual(offset);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['timeout']).toEqual(timeout);
        expect(options.qs['order_by_name']).toEqual(orderByName);
        expect(options.qs['attached_only']).toEqual(attachedOnly);
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

        globalTagging.listTags(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalTagging.listTags({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createTag', () => {
    describe('positive tests', () => {

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createTag
        const tagNames = ['testString'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'access';
        const params = {
          tagNames: tagNames,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const createTagResult = globalTagging.createTag(params);

        // all methods should return a Promise
        expectToBePromise(createTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['tag_names']).toEqual(tagNames);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const tagNames = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          tagNames,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTagging.createTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalTagging.createTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const createTagPromise = globalTagging.createTag();
        expectToBePromise(createTagPromise);

        createTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteTagAll', () => {
    describe('positive tests', () => {

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTagAll
        const providers = 'ghost';
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          providers: providers,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const deleteTagAllResult = globalTagging.deleteTagAll(params);

        // all methods should return a Promise
        expectToBePromise(deleteTagAllResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['providers']).toEqual(providers);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
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

        globalTagging.deleteTagAll(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalTagging.deleteTagAll({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('deleteTag', () => {
    describe('positive tests', () => {

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteTag
        const tagName = 'testString';
        const providers = ['ghost'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          tagName: tagName,
          providers: providers,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const deleteTagResult = globalTagging.deleteTag(params);

        // all methods should return a Promise
        expectToBePromise(deleteTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags/{tag_name}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['providers']).toEqual(providers);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
        expect(options.path['tag_name']).toEqual(tagName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const tagName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          tagName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTagging.deleteTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalTagging.deleteTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const deleteTagPromise = globalTagging.deleteTag();
        expectToBePromise(deleteTagPromise);

        deleteTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('attachTag', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Resource
      const resourceModel = {
	resource_id: 'testString',
	resource_type: 'testString',
      }

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation attachTag
        const resources = [resourceModel];
        const tagName = 'testString';
        const tagNames = ['testString'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          resources: resources,
          tagName: tagName,
          tagNames: tagNames,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const attachTagResult = globalTagging.attachTag(params);

        // all methods should return a Promise
        expectToBePromise(attachTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags/attach', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['tag_name']).toEqual(tagName);
        expect(options.body['tag_names']).toEqual(tagNames);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resources = [resourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTagging.attachTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalTagging.attachTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const attachTagPromise = globalTagging.attachTag();
        expectToBePromise(attachTagPromise);

        attachTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('detachTag', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Resource
      const resourceModel = {
	resource_id: 'testString',
	resource_type: 'testString',
      }

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation detachTag
        const resources = [resourceModel];
        const tagName = 'testString';
        const tagNames = ['testString'];
        const impersonateUser = 'testString';
        const accountId = 'testString';
        const tagType = 'user';
        const params = {
          resources: resources,
          tagName: tagName,
          tagNames: tagNames,
          impersonateUser: impersonateUser,
          accountId: accountId,
          tagType: tagType,
        };

        const detachTagResult = globalTagging.detachTag(params);

        // all methods should return a Promise
        expectToBePromise(detachTagResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/tags/detach', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['resources']).toEqual(resources);
        expect(options.body['tag_name']).toEqual(tagName);
        expect(options.body['tag_names']).toEqual(tagNames);
        expect(options.qs['impersonate_user']).toEqual(impersonateUser);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['tag_type']).toEqual(tagType);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const resources = [resourceModel];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          resources,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        globalTagging.detachTag(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await globalTagging.detachTag({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const detachTagPromise = globalTagging.detachTag();
        expectToBePromise(detachTagPromise);

        detachTagPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
