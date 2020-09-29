/**
* @jest-environment node
*/
/**
 * (C) Copyright IBM Corp. 2020.
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

const GlobalTaggingV1 = require('../dist/global-tagging/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

// This file provides an example of how to use the Global Tagging service.
//
// The following configuration properties are assumed to be defined in the external configuration file:
// GLOBAL_TAGGING_URL=<service url>
// GLOBAL_TAGGING_AUTHTYPE=iam
// GLOBAL_TAGGING_APIKEY=<IAM api key>
// GLOBAL_TAGGING_AUTH_URL=<IAM token service URL - omit this if using the production environment>
// GLOBAL_TAGGING_RESOURCE_CRN=<the crn of the resource to be used in the examples>

// Location of our config file.
const configFile = 'global_tagging.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('GlobalTaggingV1', () => {

  // begin-common

  const globalTaggingService = GlobalTaggingV1.newInstance({});

  // end-common

  const config = readExternalSources(GlobalTaggingV1.DEFAULT_SERVICE_NAME);

  let resourceCrn = config.resourceCrn;

  test('listTags request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_tags

    const params = {
      attachedOnly: true,
    };

    globalTaggingService.listTags(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_tags
  });
  test('attachTag request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-attach_tag

    const resourceModel = {
      resource_id: resourceCrn,
    };

    const params = {
      resources: [resourceModel],
      tagNames: ["tag_test_1", "tag_test_2"],
    };

    globalTaggingService.attachTag(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-attach_tag
  });
  test('detachTag request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-detach_tag

    const resourceModel = {
      resource_id: resourceCrn,
    };

    const params = {
      resources: [resourceModel],
      tagNames: ["tag_test_1", "tag_test_2"],
    };

    globalTaggingService.detachTag(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-detach_tag
  });
  test('deleteTag request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_tag

    const params = {
      tagName: "tag_test_1",
    };

    globalTaggingService.deleteTag(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_tag
  });
  test('deleteTagAll request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_tag_all

    globalTaggingService.deleteTagAll({})
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_tag_all
  });
});
