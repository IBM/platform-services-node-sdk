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
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

// Location of our config file.
const configFile = 'case_management.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('CaseManagementV1', () => {

  // begin-common

  const caseManagementService = CaseManagementV1.newInstance({});

  // end-common

  const config = readExternalSources(CaseManagementV1.DEFAULT_SERVICE_NAME);

  test('createCase request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-createCase

    const params = {
      type: 'technical',
      subject: 'testString',
      description: 'testString',
    };

    caseManagementService.createCase(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-createCase
  });
  test('getCase request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-getCase

    const params = {
      caseNumber: 'testString',
    };

    caseManagementService.getCase(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-getCase
  });
  test('getCases request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-getCases

    caseManagementService.getCases({})
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-getCases
  });
  test('addComment request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-addComment

    const params = {
      caseNumber: 'testString',
      comment: 'This is a test comment',
    };

    caseManagementService.addComment(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-addComment
  });
  test('addWatchlist request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-addWatchlist

    const params = {
      caseNumber: 'testString',
    };

    caseManagementService.addWatchlist(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-addWatchlist
  });
  test('removeWatchlist request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-removeWatchlist

    const params = {
      caseNumber: 'testString',
    };

    caseManagementService.removeWatchlist(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-removeWatchlist
  });
  test('addResource request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-addResource

    const params = {
      caseNumber: 'testString',
    };

    caseManagementService.addResource(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-addResource
  });
  test('uploadFile request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-uploadFile

    const params = {
      caseNumber: 'testString',
      file: [Buffer.from('This is a mock file.')],
    };

    caseManagementService.uploadFile(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-uploadFile
  });
  test('downloadFile request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-downloadFile

    const params = {
      caseNumber: 'testString',
      fileId: 'testString',
    };

    caseManagementService.downloadFile(params)
      .then(res => {
        fs.writeFileSync('result.out', res.result);
      })
      .catch(err => {
        console.warn(err)
      });

    // end-downloadFile
  });
  test('deleteFile request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-deleteFile

    const params = {
      caseNumber: 'testString',
      fileId: 'testString',
    };

    caseManagementService.deleteFile(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-deleteFile
  });
  test('updateCaseStatus request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-updateCaseStatus

    const params = {
      caseNumber: 'testString',
      statusPayload: statusPayloadModel,
    };

    caseManagementService.updateCaseStatus(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-updateCaseStatus
  });
});
