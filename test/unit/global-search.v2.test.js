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
const GlobalSearchV2 = require('../../dist/global-search/v2');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkUserHeader,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.global-search-tagging.cloud.ibm.com',
};

const globalSearch = new GlobalSearchV2(service);
const createRequestMock = jest.spyOn(globalSearch, 'createRequest');

// dont actually create a request
createRequestMock.mockImplementation(() => Promise.resolve());

afterEach(() => {
  createRequestMock.mockClear();
});

describe('GlobalSearchV2', () => {
  describe('search', () => {
    describe('positive tests', () => {

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation search
        const query = 'testString';
        const fields = ['testString'];
        const searchCursor = 'testString';
        const transactionId = 'testString';
        const accountId = 'testString';
        const limit = 38;
        const timeout = 38;
        const sort = ['testString'];
        const params = {
          query: query,
          fields: fields,
          searchCursor: searchCursor,
          transactionId: transactionId,
          accountId: accountId,
          limit: limit,
          timeout: timeout,
          sort: sort,
        };

        const searchResult = globalSearch.search(params);

        // all methods should return a Promise
        expectToBePromise(searchResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/resources/search', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        checkUserHeader(createRequestMock, 'transaction-id', transactionId);
        expect(options.body['query']).toEqual(query);
        expect(options.body['fields']).toEqual(fields);
        expect(options.body['search_cursor']).toEqual(searchCursor);
        expect(options.qs['account_id']).toEqual(accountId);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['timeout']).toEqual(timeout);
        expect(options.qs['sort']).toEqual(sort);
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

        globalSearch.search(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalSearch.search({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('getSupportedTypes', () => {
    describe('positive tests', () => {

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getSupportedTypes
        const params = {};

        const getSupportedTypesResult = globalSearch.getSupportedTypes(params);

        // all methods should return a Promise
        expectToBePromise(getSupportedTypesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v2/resources/supported_types', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
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

        globalSearch.getSupportedTypes(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        globalSearch.getSupportedTypes({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
});
