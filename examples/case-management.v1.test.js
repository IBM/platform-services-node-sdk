/**
 * @jest-environment node
 */
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

const CaseManagementV1 = require('../dist/case-management/v1');
const { readExternalSources, streamToPromise } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the Case Management service.
//
// The following configuration properties are assumed to be defined:
//
// CASE_MANAGEMENT_URL=<service url>
// CASE_MANAGEMENT_AUTH_TYPE=iam
// CASE_MANAGEMENT_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// CASE_MANAGEMENT_APIKEY=<IAM apikey>
// CASE_MANAGEMENT_RESOURCE_CRN=<CRN of resource to use in examples>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'case_management.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('CaseManagementV1', () => {
  jest.setTimeout(30000);

  // begin-common

  const caseManagementService = CaseManagementV1.newInstance({});

  // end-common

  const config = readExternalSources(CaseManagementV1.DEFAULT_SERVICE_NAME);

  let resourceCrn = config.resourceCrn;

  let caseNumber = null;
  let attachmentId = null;

  test('createCase request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createCase() result:');
    // begin-createCase

    const offeringType = {
      group: 'crn_service_name',
      key: 'cloud-object-storage',
    };

    const offeringPayload = {
      name: 'Cloud Object Storage',
      type: offeringType,
    };

    const params = {
      type: 'technical',
      subject: 'Example technical case',
      description: 'This is an example case description. This is where the problem would be described.',
      offering: offeringPayload,
      severity: 4,
    };

    try {
      const res = await caseManagementService.createCase(params);
      caseNumber = res.result.number
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-createCase
  });
  test('getCase request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();

    originalLog('getCase() result:');
    // begin-getCase

    const fieldsToReturn = [
      CaseManagementV1.GetCaseConstants.Fields.DESCRIPTION,
      CaseManagementV1.GetCaseConstants.Fields.STATUS,
      CaseManagementV1.GetCaseConstants.Fields.SEVERITY,
      CaseManagementV1.GetCaseConstants.Fields.CREATED_BY,
    ];

    const params = {
      caseNumber: caseNumber,
      fields: fieldsToReturn,
    };

    try {

      const res = await caseManagementService.getCase(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-getCase
  });
  test('getCases request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCases() result:');
    // begin-getCases

    const params = {
      search: 'Example',
    };

    const allResults = [];
    try {
      const pager = new CaseManagementV1.GetCasesPager(caseManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-getCases
  });

  test('addComment request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();

    originalLog('addComment() result:');
    // begin-addComment

    const params = {
      caseNumber: caseNumber,
      comment: 'This is an example comment,',
    };

    try {
      const res = await caseManagementService.addComment(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-addComment
  });
  test('addWatchlist request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();

    originalLog('addWatchlist() result:');
    // begin-addWatchlist

    const watchlistUsers = [
      { realm: 'IBMid', user_id: 'abc@ibm.com' }
    ]

    const params = {
      caseNumber: caseNumber,
      watchlist: watchlistUsers,
    };

    try {
      const res = await caseManagementService.addWatchlist(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-addWatchlist
  });
  test('removeWatchlist request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();

    originalLog('removeWatchlist() result:');
    // begin-removeWatchlist

    const watchlistUsers = [
      { realm: 'IBMid', user_id: 'abc@ibm.com' }
    ]

    const params = {
      caseNumber: caseNumber,
      watchlist: watchlistUsers,
    };

    try {
      const res = await caseManagementService.removeWatchlist(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-removeWatchlist
  });
  test('addResource request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();
    expect(resourceCrn).not.toBeNull();

    originalLog('addResource() result:');
    // begin-addResource

    const params = {
      caseNumber: caseNumber,
      crn: resourceCrn,
      note: 'This resource is the service that is having the problem.',
    };

    try {
      const res = await caseManagementService.addResource(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-addResource
  });
  test('uploadFile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();

    originalLog('uploadFile() result:');
    // begin-uploadFile

    const exampleFileContent = 'This is the content of the file to upload.';

    const fileWithMetadata = {
      data: Buffer.from(exampleFileContent),
      filename: 'example.log',
      content_type: 'application/octet-stream',
    };

    const filesToUpload = [fileWithMetadata]

    const params = {
      caseNumber: caseNumber,
      file: filesToUpload,
    };

    try {
      const res = await caseManagementService.uploadFile(params)
      attachmentId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-uploadFile
  });
  test('downloadFile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();
    expect(attachmentId).not.toBeNull();

    let responseContentType = null;

    originalLog('downloadFile() result:');
    // begin-downloadFile

    const params = {
      caseNumber: caseNumber,
      fileId: attachmentId,
    };

    try {
      const res = await caseManagementService.downloadFile(params);
      responseContentType = res.headers['content-type'];
      console.log(res.result);
    } catch (err) {
      console.warn(err)
    }

    // end-downloadFile
  });
  test('deleteFile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();
    expect(attachmentId).not.toBeNull();

    originalLog('deleteFile() result:');
    // begin-deleteFile

    const params = {
      caseNumber: caseNumber,
      fileId: attachmentId,
    };

    try {
      const res = await caseManagementService.deleteFile(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-deleteFile
  });
  test('updateCaseStatus request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(caseNumber).not.toBeNull();

    originalLog('updateCaseStatus() result:');
    // begin-updateCaseStatus

    const statusPayloadModel = {
      action: 'resolve',
      comment: 'The problem has been resolved.',
      resolution_code: 1,
    };

    const params = {
      caseNumber: caseNumber,
      statusPayload: statusPayloadModel,
    };

    try {
      const res = await caseManagementService.updateCaseStatus(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-updateCaseStatus
  });
});
