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

const GlobalCatalogV1 = require('../dist/global-catalog/v1');
const { readExternalSources, streamToPromise } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');
const {
  CreateCatalogEntryConstants,
  UpdateCatalogEntryConstants,
} = require('../dist/global-catalog/v1');
const { v4: uuidv4 } = require('uuid');

//
// This file provides an example of how to use the Global Catalog service.
//
// The following configuration properties are assumed to be defined:
//
// GLOBAL_CATALOG_URL=<service url>
// GLOBAL_CATALOG_AUTH_TYPE=iam
// GLOBAL_CATALOG_APIKEY=<IAM apikey>
// GLOBAL_CATALOG_AUTH_URL=<IAM token service URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'global_catalog.env';

const describe = authHelper.prepareTests(configFile);
const timeout = 60000;

// Save original console.log and console.warn
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

let catalogObject = {};

describe('GlobalCatalogV1', () => {
  jest.setTimeout(timeout);

  // begin-common

  const globalCatalogService = GlobalCatalogV1.newInstance({});

  // end-common

  const config = readExternalSources(GlobalCatalogV1.DEFAULT_SERVICE_NAME);

  // Global variables to hold values shared between testcases.
  let catalogEntryId;

  test('createCatalogEntry request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createCatalogEntry() result:');
    // begin-create_catalog_entry
    const overviewModelEN = {
      display_name: 'Example Web Starter',
      description: 'Use the Example service in your applications',
      long_description:
        'This is a starter that helps you use the Example service within your applications.',
    };
    const overviewUIModel = {
      en: overviewModelEN,
    };
    const imageModel = {
      image: 'https://somehost.com/examplewebstarter/cachedIcon/large/0',
      small_image: 'https://somehost.com/examplewebstarter/cachedIcon/small/0',
      medium_image: 'https://somehost.com/examplewebstarter/cachedIcon/medium/0',
      feature_image: 'https://somehost.com/examplewebstarter/cachedIcon/large/0',
    };
    const providerModel = {
      email: 'info@examplestarter.com',
      name: 'Example Starter Co., Inc.',
      contact: 'Example Starter Developer Relations',
      support_email: 'support@examplestarter.com',
      phone: '800-555-1234',
    };
    const metadataModel = {
      version: '1.0.0',
    };

    catalogEntryId = uuidv4();

    const params = {
      name: 'exampleWebStarter123',
      kind: CreateCatalogEntryConstants.Kind.TEMPLATE,
      overviewUi: overviewUIModel,
      images: imageModel,
      disabled: false,
      tags: ['example-tag-1', 'example-tag-2'],
      provider: providerModel,
      id: catalogEntryId,
      active: true,
      metadata: metadataModel,
    };

    try {
      const res = await globalCatalogService.createCatalogEntry(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_catalog_entry
  });
  test('getCatalogEntry request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    originalLog('getCatalogEntry() result:');
    // begin-get_catalog_entry

    const params = {
      id: catalogEntryId,
      complete: true,
    };

    try {
      const res = await globalCatalogService.getCatalogEntry(params);
      catalogObject = res.result;

      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog_entry
  });
  test('updateCatalogEntry request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    originalLog('updateCatalogEntry() result:');
    // begin-update_catalog_entry
    const overviewModelEN = {
      display_name: 'Example Web Starter V2',
      description: 'Use the Example V2 service in your applications',
      long_description:
        'This is a starter that helps you use the Example V2 service within your applications.',
    };
    const overviewUIModel = {
      en: overviewModelEN,
    };
    const imageModel = {
      image: 'https://somehost.com/examplewebstarter/cachedIcon/large/0',
      small_image: 'https://somehost.com/examplewebstarter/cachedIcon/small/0',
      medium_image: 'https://somehost.com/examplewebstarter/cachedIcon/medium/0',
      feature_image: 'https://somehost.com/examplewebstarter/cachedIcon/large/0',
    };
    const providerModel = {
      email: 'info@examplestarter.com',
      name: 'Example Starter Co., Inc.',
      contact: 'Example Starter Developer Relations',
      support_email: 'support@examplestarter.com',
      phone: '800-555-1234',
    };
    const metadataModel = {
      version: '2.0.0',
    };

    const params = {
      id: catalogEntryId,
      name: 'exampleWebStarter123',
      kind: UpdateCatalogEntryConstants.Kind.TEMPLATE,
      overviewUi: overviewUIModel,
      images: imageModel,
      disabled: false,
      tags: ['example-tag-1', 'example-tag-2', 'new-example-tag-3'],
      provider: providerModel,
      active: true,
      metadata: metadataModel,
      url: catalogObject.url,
    };

    try {
      const res = await globalCatalogService.updateCatalogEntry(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_catalog_entry
  });
  test('listCatalogEntries request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listCatalogEntries() result:');
    // begin-list_catalog_entries
    const params = {
      offset: 0,
      limit: 10,
      q: 'kind:template tag:example-tag-1',
      complete: true,
    };
    try {
      const res = await globalCatalogService.listCatalogEntries(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_catalog_entries
  });
  test('getChildObjects request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    originalLog('getChildObjects() result:');
    // begin-get_child_objects

    const params = {
      id: catalogEntryId,
      kind: '*',
      offset: 0,
      limit: 10,
      complete: true,
    };

    try {
      const res = await globalCatalogService.getChildObjects(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_child_objects
  });
  test('restoreCatalogEntry request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    // begin-restore_catalog_entry

    const params = {
      id: catalogEntryId,
    };

    try {
      await globalCatalogService.restoreCatalogEntry(params);
    } catch (err) {
      console.warn(err);
    }

    // end-restore_catalog_entry
  });
  test('getVisibility request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    originalLog('getVisibility() result:');
    // begin-get_visibility

    const params = {
      id: catalogEntryId,
    };

    try {
      const res = await globalCatalogService.getVisibility(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_visibility
  });
  test('updateVisibility request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    // begin-update_visibility

    const params = {
      id: catalogEntryId,
      restrictions: 'private',
      extendable: false,
    };

    try {
      await globalCatalogService.updateVisibility(params);
    } catch (err) {
      console.warn(err);
    }

    // end-update_visibility
  });
  test('getPricing request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    originalLog('getPricing() result:');
    // begin-get_pricing

    const params = {
      id: catalogEntryId,
    };

    try {
      const res = await globalCatalogService.getPricing(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_pricing
  });
  test('getAuditLogs request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    originalLog('getAuditLogs() result:');
    // begin-get_audit_logs

    const params = {
      id: catalogEntryId,
      offset: 0,
      limit: 10,
    };

    try {
      const res = await globalCatalogService.getAuditLogs(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_audit_logs
  });
  test('uploadArtifact request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    // begin-upload_artifact
    const params = {
      objectId: catalogEntryId,
      artifactId: 'artifact.txt',
      artifact: Buffer.from('This is an example artifact associated with a catalog entry.', 'utf8'),
      contentType: 'text/plain',
    };

    try {
      await globalCatalogService.uploadArtifact(params);
    } catch (err) {
      console.warn(err);
    }

    // end-upload_artifact
  });
  test('getArtifact request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    let responseContentType = null;

    originalLog('getArtifact() result:');
    // begin-get_artifact

    const params = {
      objectId: catalogEntryId,
      artifactId: 'artifact.txt',
    };

    try {
      const res = await globalCatalogService.getArtifact(params);
      responseContentType = res.headers['content-type'];
      const result = res.result;
      console.log(result);
    } catch (err) {
      console.warn(err);
    }

    // end-get_artifact
  });
  test('listArtifacts request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    originalLog('listArtifacts() result:');
    // begin-list_artifacts

    const params = {
      objectId: catalogEntryId,
    };

    try {
      const res = await globalCatalogService.listArtifacts(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_artifacts
  });
  test('deleteArtifact request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    // begin-delete_artifact

    const params = {
      objectId: catalogEntryId,
      artifactId: 'artifact.txt',
    };

    try {
      await globalCatalogService.deleteArtifact(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_artifact
  });
  test('deleteCatalogEntry request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(catalogEntryId).not.toBeNull();

    // begin-delete_catalog_entry

    const params = {
      id: catalogEntryId,
    };

    try {
      await globalCatalogService.deleteCatalogEntry(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_catalog_entry
  });
});
