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

const CaseManagementV1 = require('../../dist/case-management/v1');
const nock = require('nock');

/* eslint-disable no-await-in-loop */

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const caseManagementServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://support-center.cloud.ibm.com/case-management/v1',
};

const caseManagementService = new CaseManagementV1(caseManagementServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(caseManagementService, 'createRequest');
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

describe('CaseManagementV1', () => {

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
      const testInstance = CaseManagementV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(CaseManagementV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(CaseManagementV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(CaseManagementV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = CaseManagementV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(CaseManagementV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new CaseManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new CaseManagementV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(CaseManagementV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getCases', () => {
    describe('positive tests', () => {
      function __getCasesTest() {
        // Construct the params object for operation getCases
        const offset = 38;
        const limit = 38;
        const search = 'testString';
        const sort = 'number';
        const status = ['new'];
        const fields = ['number'];
        const getCasesParams = {
          offset,
          limit,
          search,
          sort,
          status,
          fields,
        };

        const getCasesResult = caseManagementService.getCases(getCasesParams);

        // all methods should return a Promise
        expectToBePromise(getCasesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.qs.sort).toEqual(sort);
        expect(mockRequestOptions.qs.status).toEqual(status);
        expect(mockRequestOptions.qs.fields).toEqual(fields);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCasesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __getCasesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __getCasesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCasesParams = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.getCases(getCasesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        caseManagementService.getCases({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });

    describe('GetCasesPager tests', () => {
      const serviceUrl = caseManagementServiceOptions.url;
      const path = '/cases';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"cases":[{"number":"number","short_description":"short_description","description":"description","created_at":"created_at","created_by":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"},"updated_at":"updated_at","updated_by":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"},"contact_type":"Cloud Support Center","contact":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"},"status":"status","severity":8,"support_tier":"Free","resolution":"resolution","close_notes":"close_notes","eu":{"support":false,"data_center":"data_center"},"watchlist":[{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"}],"attachments":[{"id":"id","filename":"filename","size_in_bytes":13,"created_at":"created_at","url":"url"}],"offering":{"name":"name","type":{"group":"crn_service_name","key":"key","kind":"kind","id":"id"}},"resources":[{"crn":"crn","name":"name","type":"type","url":"url","note":"note"}],"comments":[{"value":"value","added_at":"added_at","added_by":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"}}]}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"cases":[{"number":"number","short_description":"short_description","description":"description","created_at":"created_at","created_by":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"},"updated_at":"updated_at","updated_by":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"},"contact_type":"Cloud Support Center","contact":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"},"status":"status","severity":8,"support_tier":"Free","resolution":"resolution","close_notes":"close_notes","eu":{"support":false,"data_center":"data_center"},"watchlist":[{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"}],"attachments":[{"id":"id","filename":"filename","size_in_bytes":13,"created_at":"created_at","url":"url"}],"offering":{"name":"name","type":{"group":"crn_service_name","key":"key","kind":"kind","id":"id"}},"resources":[{"crn":"crn","name":"name","type":"type","url":"url","note":"note"}],"comments":[{"value":"value","added_at":"added_at","added_by":{"name":"name","realm":"IBMid","user_id":"abc@ibm.com"}}]}],"total_count":2,"limit":1}';

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
          limit: 10,
          search: 'testString',
          sort: 'number',
          status: ['new'],
          fields: ['number'],
        };
        const allResults = [];
        const pager = new CaseManagementV1.GetCasesPager(caseManagementService, params);
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
          search: 'testString',
          sort: 'number',
          status: ['new'],
          fields: ['number'],
        };
        const pager = new CaseManagementV1.GetCasesPager(caseManagementService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createCase', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // CasePayloadEu
      const casePayloadEuModel = {
        supported: true,
        data_center: 38,
      };

      // OfferingType
      const offeringTypeModel = {
        group: 'crn_service_name',
        key: 'testString',
        kind: 'testString',
        id: 'testString',
      };

      // Offering
      const offeringModel = {
        name: 'testString',
        type: offeringTypeModel,
      };

      // ResourcePayload
      const resourcePayloadModel = {
        crn: 'testString',
        type: 'testString',
        id: 72.5,
        note: 'testString',
      };

      // User
      const userModel = {
        realm: 'IBMid',
        user_id: 'abc@ibm.com',
      };

      function __createCaseTest() {
        // Construct the params object for operation createCase
        const type = 'technical';
        const subject = 'testString';
        const description = 'testString';
        const severity = 1;
        const eu = casePayloadEuModel;
        const offering = offeringModel;
        const resources = [resourcePayloadModel];
        const watchlist = [userModel];
        const invoiceNumber = 'testString';
        const slaCreditRequest = false;
        const createCaseParams = {
          type,
          subject,
          description,
          severity,
          eu,
          offering,
          resources,
          watchlist,
          invoiceNumber,
          slaCreditRequest,
        };

        const createCaseResult = caseManagementService.createCase(createCaseParams);

        // all methods should return a Promise
        expectToBePromise(createCaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.subject).toEqual(subject);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.severity).toEqual(severity);
        expect(mockRequestOptions.body.eu).toEqual(eu);
        expect(mockRequestOptions.body.offering).toEqual(offering);
        expect(mockRequestOptions.body.resources).toEqual(resources);
        expect(mockRequestOptions.body.watchlist).toEqual(watchlist);
        expect(mockRequestOptions.body.invoice_number).toEqual(invoiceNumber);
        expect(mockRequestOptions.body.sla_credit_request).toEqual(slaCreditRequest);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createCaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __createCaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __createCaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const type = 'technical';
        const subject = 'testString';
        const description = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createCaseParams = {
          type,
          subject,
          description,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.createCase(createCaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.createCase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.createCase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getCase', () => {
    describe('positive tests', () => {
      function __getCaseTest() {
        // Construct the params object for operation getCase
        const caseNumber = 'testString';
        const fields = ['number'];
        const getCaseParams = {
          caseNumber,
          fields,
        };

        const getCaseResult = caseManagementService.getCase(getCaseParams);

        // all methods should return a Promise
        expectToBePromise(getCaseResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.fields).toEqual(fields);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getCaseTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __getCaseTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __getCaseTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getCaseParams = {
          caseNumber,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.getCase(getCaseParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.getCase({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.getCase();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateCaseStatus', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // ResolvePayload
      const statusPayloadModel = {
        action: 'resolve',
        comment: 'It was actually a mistake',
        resolution_code: 1,
      };

      function __updateCaseStatusTest() {
        // Construct the params object for operation updateCaseStatus
        const caseNumber = 'testString';
        const statusPayload = statusPayloadModel;
        const updateCaseStatusParams = {
          caseNumber,
          statusPayload,
        };

        const updateCaseStatusResult = caseManagementService.updateCaseStatus(updateCaseStatusParams);

        // all methods should return a Promise
        expectToBePromise(updateCaseStatusResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/status', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(statusPayload);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateCaseStatusTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __updateCaseStatusTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __updateCaseStatusTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const statusPayload = statusPayloadModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateCaseStatusParams = {
          caseNumber,
          statusPayload,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.updateCaseStatus(updateCaseStatusParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.updateCaseStatus({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.updateCaseStatus();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addComment', () => {
    describe('positive tests', () => {
      function __addCommentTest() {
        // Construct the params object for operation addComment
        const caseNumber = 'testString';
        const comment = 'This is a test comment';
        const addCommentParams = {
          caseNumber,
          comment,
        };

        const addCommentResult = caseManagementService.addComment(addCommentParams);

        // all methods should return a Promise
        expectToBePromise(addCommentResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/comments', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.comment).toEqual(comment);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addCommentTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __addCommentTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __addCommentTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const comment = 'This is a test comment';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addCommentParams = {
          caseNumber,
          comment,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.addComment(addCommentParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.addComment({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.addComment();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addWatchlist', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // User
      const userModel = {
        realm: 'IBMid',
        user_id: 'abc@ibm.com',
      };

      function __addWatchlistTest() {
        // Construct the params object for operation addWatchlist
        const caseNumber = 'testString';
        const watchlist = [userModel];
        const addWatchlistParams = {
          caseNumber,
          watchlist,
        };

        const addWatchlistResult = caseManagementService.addWatchlist(addWatchlistParams);

        // all methods should return a Promise
        expectToBePromise(addWatchlistResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/watchlist', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.watchlist).toEqual(watchlist);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addWatchlistTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __addWatchlistTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __addWatchlistTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addWatchlistParams = {
          caseNumber,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.addWatchlist(addWatchlistParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.addWatchlist({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.addWatchlist();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('removeWatchlist', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // User
      const userModel = {
        realm: 'IBMid',
        user_id: 'abc@ibm.com',
      };

      function __removeWatchlistTest() {
        // Construct the params object for operation removeWatchlist
        const caseNumber = 'testString';
        const watchlist = [userModel];
        const removeWatchlistParams = {
          caseNumber,
          watchlist,
        };

        const removeWatchlistResult = caseManagementService.removeWatchlist(removeWatchlistParams);

        // all methods should return a Promise
        expectToBePromise(removeWatchlistResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/watchlist', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.watchlist).toEqual(watchlist);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __removeWatchlistTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __removeWatchlistTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __removeWatchlistTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const removeWatchlistParams = {
          caseNumber,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.removeWatchlist(removeWatchlistParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.removeWatchlist({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.removeWatchlist();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('addResource', () => {
    describe('positive tests', () => {
      function __addResourceTest() {
        // Construct the params object for operation addResource
        const caseNumber = 'testString';
        const crn = 'testString';
        const type = 'testString';
        const id = 72.5;
        const note = 'testString';
        const addResourceParams = {
          caseNumber,
          crn,
          type,
          id,
          note,
        };

        const addResourceResult = caseManagementService.addResource(addResourceParams);

        // all methods should return a Promise
        expectToBePromise(addResourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/resources', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.crn).toEqual(crn);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.id).toEqual(id);
        expect(mockRequestOptions.body.note).toEqual(note);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __addResourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __addResourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __addResourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const addResourceParams = {
          caseNumber,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.addResource(addResourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.addResource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.addResource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('uploadFile', () => {
    describe('positive tests', () => {
      function __uploadFileTest() {
        // Construct the params object for operation uploadFile
        const caseNumber = 'testString';
        const file = [Buffer.from('This is a mock file.')];
        const uploadFileParams = {
          caseNumber,
          file,
        };

        const uploadFileResult = caseManagementService.uploadFile(uploadFileParams);

        // all methods should return a Promise
        expectToBePromise(uploadFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/attachments', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.file).toEqual(file);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __uploadFileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __uploadFileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __uploadFileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const file = [Buffer.from('This is a mock file.')];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const uploadFileParams = {
          caseNumber,
          file,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.uploadFile(uploadFileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.uploadFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.uploadFile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('downloadFile', () => {
    describe('positive tests', () => {
      function __downloadFileTest() {
        // Construct the params object for operation downloadFile
        const caseNumber = 'testString';
        const fileId = 'testString';
        const downloadFileParams = {
          caseNumber,
          fileId,
        };

        const downloadFileResult = caseManagementService.downloadFile(downloadFileParams);

        // all methods should return a Promise
        expectToBePromise(downloadFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/attachments/{file_id}', 'GET');
        const expectedAccept = 'application/octet-stream';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
        expect(mockRequestOptions.path.file_id).toEqual(fileId);
        expect(mockRequestOptions.responseType).toBe('stream');
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __downloadFileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __downloadFileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __downloadFileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const fileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const downloadFileParams = {
          caseNumber,
          fileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.downloadFile(downloadFileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.downloadFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.downloadFile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteFile', () => {
    describe('positive tests', () => {
      function __deleteFileTest() {
        // Construct the params object for operation deleteFile
        const caseNumber = 'testString';
        const fileId = 'testString';
        const deleteFileParams = {
          caseNumber,
          fileId,
        };

        const deleteFileResult = caseManagementService.deleteFile(deleteFileParams);

        // all methods should return a Promise
        expectToBePromise(deleteFileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/cases/{case_number}/attachments/{file_id}', 'DELETE');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.case_number).toEqual(caseNumber);
        expect(mockRequestOptions.path.file_id).toEqual(fileId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteFileTest();

        // enable retries and test again
        createRequestMock.mockClear();
        caseManagementService.enableRetries();
        __deleteFileTest();

        // disable retries and test again
        createRequestMock.mockClear();
        caseManagementService.disableRetries();
        __deleteFileTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const caseNumber = 'testString';
        const fileId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteFileParams = {
          caseNumber,
          fileId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        caseManagementService.deleteFile(deleteFileParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await caseManagementService.deleteFile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await caseManagementService.deleteFile();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
