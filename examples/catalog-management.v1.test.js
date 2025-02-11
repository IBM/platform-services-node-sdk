/**
 * @jest-environment node
 */
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

/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */

const CatalogManagementV1 = require('../dist/catalog-management/v1');
// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Catalog Management service.
//
// The following configuration properties are assumed to be defined:
// CATALOG_MANAGEMENT_URL=<service base url>
// CATALOG_MANAGEMENT_AUTH_TYPE=iam
// CATALOG_MANAGEMENT_APIKEY=<IAM apikey>
// CATALOG_MANAGEMENT_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'catalog_management_v1.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

function genRandonString(length) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charLength = chars.length;
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

describe('CatalogManagementV1', () => {
  // Service instance
  let catalogManagementService;
  let catalogManagementAdminService;
  let approverToken;
  let token;

  // Variables to hold link values
  let accountRevLink;
  let objectCatalogIdLink;
  let catalogIdLink;
  let catalogRevLink;
  let objectIdLink;
  let objectRevLink;
  let offeringIdLink;
  let offeringRevLink;
  let versionIdLink;
  let versionLocatorLink;
  let versionRevLink;
  let kindIdLink;
  let planID;
  let offeringVersion;

  let zipurl = 'https://github.com/IBM-Cloud/terraform-sample/archive/refs/tags/v1.1.0.tar.gz';
  let zipurlSolution =
    'https://github.com/IBM-Cloud/terraform-sample/archive/refs/tags/v1.0.0.tar.gz';
  let objectName = genRandonString(15);

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(CatalogManagementV1.DEFAULT_SERVICE_NAME);

  test('Initialize service', async () => {
    // begin-common

    catalogManagementService = CatalogManagementV1.newInstance();
    catalogManagementAdminService = CatalogManagementV1.newInstance({
      serviceName: 'CATALOG_MANAGEMENT_APPROVER',
    });

    let auth = catalogManagementService.getAuthenticator();
    let tokenManager = auth.tokenManager;
    let requestToken = await tokenManager.requestToken();
    token = requestToken.result.access_token;

    let adminAuth = catalogManagementAdminService.getAuthenticator();
    let adminTokenManager = adminAuth.tokenManager;
    let adminRequestToken = await adminTokenManager.requestToken();
    approverToken = adminRequestToken.result.access_token;

    // end-common
  });

  test('getCatalogAccount request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalogAccount() result:');
    // begin-get_catalog_account

    let res;
    try {
      res = await catalogManagementService.getCatalogAccount({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog_account
    const responseBody = res.result;
    accountRevLink = responseBody._rev;
  });

  test('updateCatalogAccount request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateCatalogAccount() result:');
    // begin-update_catalog_account

    const params = {
      rev: accountRevLink,
      accountFilters: {
        include_all: true,
        id_filters: {},
      },
      regionFilter: 'geo:na',
    };

    let res;
    try {
      res = await catalogManagementService.updateCatalogAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_catalog_account
    const responseBody = res.result;
    accountRevLink = responseBody._rev;
  });

  test('createCatalog request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createCatalog() result:');
    // begin-create_catalog

    let res;
    try {
      res = await catalogManagementService.createCatalog({ label: 'testString' });
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_catalog
    const responseBody = res.result;
    catalogIdLink = responseBody.id;
    catalogRevLink = responseBody._rev;
  });

  test('getCatalog request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalog() result:');
    // begin-get_catalog

    const params = {
      catalogIdentifier: catalogIdLink,
    };

    let res;
    try {
      res = await catalogManagementService.getCatalog(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog
    const responseBody = res.result;
    catalogRevLink = responseBody._rev;
  });

  test('replaceCatalog request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceCatalog() result:');
    // begin-replace_catalog

    const params = {
      catalogIdentifier: catalogIdLink,
      id: catalogIdLink,
    };

    let res;
    try {
      res = await catalogManagementService.replaceCatalog(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_catalog
    const responseBody = res.result;
    catalogRevLink = responseBody._rev;
  });

  test('importOffering request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('importOffering() result:');
    // begin-import_offering

    const params = {
      catalogIdentifier: catalogIdLink,
      zipurl: zipurl,
    };

    let res;
    try {
      res = await catalogManagementService.importOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-import_offering
    const responseBody = res.result;
    offeringRevLink = responseBody._rev;
    offeringIdLink = responseBody.id;
    versionLocatorLink = responseBody.kinds[0].versions[0].version_locator;
    kindIdLink = responseBody.kinds[0].id;
  });

  test('importOfferingVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('importOfferingVersion() result:');
    // begin-import_offering_version

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      zipurl: zipurl,
      targetVersion: '1.0.1',
    };

    let res;
    try {
      res = await catalogManagementService.importOfferingVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-import_offering_version
    const responseBody = res.result;
    offeringIdLink = responseBody.id;
    offeringRevLink = responseBody._rev;
    versionLocatorLink = responseBody.kinds[0].versions[0].version_locator;
    versionIdLink = responseBody.kinds[0].versions[0].version_locator;
    versionRevLink = responseBody.kinds[0].versions[0]._rev;
  });

  test('getVersions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getVersions() result:');
    // begin-get_versions

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      kindId: kindIdLink,
    };

    let res;
    try {
      res = await catalogManagementService.getVersions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_versions
  });

  test('getVersionDependencies request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getVersionDependencies() result:');
    // begin-get_version_dependencies

    const params = {
      versionLocId: versionLocatorLink,
    };

    let res;
    try {
      res = await catalogManagementService.getVersionDependencies(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_version_dependencies
  });

  test('validateInputs request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('validateInputs() result:');
    // begin-validate_inputs

    const params = {
      versionLocId: versionLocatorLink,
      input1: 'name',
      input2: '',
    };

    let res;
    try {
      res = await catalogManagementService.validateInputs(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-validate_inputs
  });

  // Set allow publish offering
  test('setAllowPublishOffering request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('setAllowPublishOffering() result:');
    // begin-set_allow_publish_offering

    const headers = {
      'X-Approver-Token': approverToken,
    };

    try {
      const response = await fetch(
        `https://cm.globalcatalog.test.cloud.ibm.com/api/v1-beta/catalogs/${catalogIdLink}/offerings/${offeringIdLink}/publish/publish_approved/true`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `bearer ${token}`,
          },
        }
      );
      const resp = await response.json();
      console.log(JSON.stringify(resp, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-set_allow_publish_offering
  });

  // add plan
  test('addPlan 1 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addPlan() result:');
    // begin-add_plan

    const planBody = {
      label: 'testString',
      name: 'testString',
      short_description: 'testString',
      pricing_tags: ['free'],
      version_range: {
        kinds: ['terraform'],
        version: '>=0.0.1',
      },
      features: [
        {
          title: 'testString',
          description: 'testString',
        },
      ],
      metadata: { 'anyKey': 'anyValue' },
    };

    const headers = {
      'X-Approver-Token': approverToken,
    };

    let plan;
    try {
      const response = await fetch(
        `https://cm.globalcatalog.test.cloud.ibm.com/api/v1-beta/catalogs/${catalogIdLink}/offerings/${offeringIdLink}/plans`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `bearer ${token}`,
          },
          body: JSON.stringify(planBody),
        }
      );
      plan = await response.json();
      console.log(JSON.stringify(plan, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-add_plan

    planID = plan.id;
  });

  // delete plan
  test('deletePlan request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deletePlan() result:');
    // begin-delete_plan

    const params = {
      planLocId: planID,
    };

    let res;
    try {
      res = await catalogManagementService.deletePlan(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-delete_plan
  });

  // add plan
  test('addPlan 2 request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addPlan() result:');
    // begin-add_plan_2

    const planBody = {
      label: 'testString',
      name: 'testString',
      short_description: 'testString',
      pricing_tags: ['free'],
      version_range: {
        kinds: ['terraform'],
        version: '>=0.0.1',
      },
      features: [
        {
          title: 'testString',
          description: 'testString',
        },
      ],
      metadata: { 'anyKey': 'anyValue' },
    };

    const headers = {
      'X-Approver-Token': approverToken,
    };

    let plan;
    try {
      const response = await fetch(
        `https://cm.globalcatalog.test.cloud.ibm.com/api/v1-beta/catalogs/${catalogIdLink}/offerings/${offeringIdLink}/plans`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `bearer ${token}`,
          },
          body: JSON.stringify(planBody),
        }
      );
      plan = await response.json();
      console.log(JSON.stringify(plan, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-add_plan_2

    planID = plan.id;
  });

  // set validate plan
  test('setValidatePlan request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('setValidatePlan() result:');
    // begin-set_validate_plan

    const headers = {
      'X-Approver-Token': approverToken,
    };

    try {
      const response = await fetch(
        `https://cm.globalcatalog.test.cloud.ibm.com/api/v1-beta/plans/${planID}/validate/true`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `bearer ${token}`,
          },
        }
      );
      const resp = await response.json();
      console.log(JSON.stringify(resp, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-set_validate_plan
  });

  // set allow publish plan
  test('setAllowPublishPlan request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('setAllowPublishPlan() result:');
    // begin-set_allow_publish_plan

    const headers = {
      'X-Approver-Token': approverToken,
    };

    try {
      const response = await fetch(
        `https://cm.globalcatalog.test.cloud.ibm.com/api/v1-beta/plans/${planID}/publish/publish_approved/true`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'Authorization': `bearer ${token}`,
          },
        }
      );
      const resp = await response.json();
      console.log(JSON.stringify(resp, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-set_allow_publish_plan
  });

  // get plan
  test('getPlan request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPlan() result:');
    // begin-get_plan

    const params = {
      planLocId: planID,
    };

    try {
      plan = await catalogManagementService.getPlan(params);
      console.log(JSON.stringify(plan.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_plan
  });

  // consumable plan
  test('consumablePlan request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('consumablePlan() result:');
    // begin-consumable_plan

    const params = {
      planLocId: planID,
    };

    let res;
    try {
      res = await catalogManagementService.consumablePlan(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-consumable_plan
  });

  // set deprecate plan
  test('setDeprecatePlan request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('setDeprecatePlan() result:');
    // begin-set_deprecate_plan

    const params = {
      planLocId: planID,
      setting: true,
    };

    let res;
    try {
      res = await catalogManagementService.setDeprecatePlan(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-set_deprecate_plan
  });

  test('importOffering solution request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('importOffering() result:');
    // begin-import_offering

    const params = {
      catalogIdentifier: catalogIdLink,
      zipurl: zipurlSolution,
      productKind: 'solution',
      installType: 'fullstack',
      flavor: {
        label: 'Quickstart',
        name: 'quickstart',
      },
    };

    let res;
    try {
      res = await catalogManagementService.importOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
  });

  test('getOfferingStats request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingStats() result:');
    // begin-get_offering_stats

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
    };

    let res;
    try {
      res = await catalogManagementService.getOfferingStats(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_stats
  });

  test('getOfferingChangeNotices request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingChangeNotices() result:');
    // begin-get_offering_change_notices

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      kind: 'terraform',
      target: 'terraform',
      version: '1.0.0',
      versions: 'latest',
    };

    let res;
    try {
      res = await catalogManagementService.getOfferingChangeNotices(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_change_notices
  });

  test('getOffering request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOffering() result:');
    // begin-get_offering

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
    };

    let res;
    try {
      res = await catalogManagementService.getOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering
    const responseBody = res.result;
    offeringRevLink = responseBody._rev;
    versionLocatorLink = responseBody.kinds[0].versions[0].version_locator;
    versionIdLink = responseBody.kinds[0].versions[0].version_locator;
    versionRevLink = responseBody.kinds[0].versions[0]._rev;
  });

  test('createOffering request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createOffering() result:');
    // begin-create_offering

    const params = {
      catalogIdentifier: catalogIdLink,
    };

    let res;
    try {
      res = await catalogManagementService.createOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
  });

  test('reloadOffering request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('reloadOffering() result:');
    // begin-reload_offering

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      targetVersion: '1.0.0',
      zipurl: zipurl,
    };

    let res;
    try {
      res = await catalogManagementService.reloadOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-reload_offering
    const responseBody = res.result;
    offeringRevLink = responseBody._rev;
  });

  test('updateOffering request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateOffering() result:');
    // begin-update_offering

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      ifMatch: `"${offeringRevLink}"`,
      updates: [
        {
          'op': 'replace',
          'path': '/label',
          'value': 'testString',
        },
      ],
    };

    let res;
    try {
      res = await catalogManagementService.updateOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_offering
    const responseBody = res.result;
    offeringRevLink = responseBody._rev;
  });

  test('createCatalog request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createCatalog() result:');
    // begin-create_catalog

    let res;
    try {
      res = await catalogManagementService.createCatalog({ label: 'testString', kind: 'vpe' });
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_catalog
    const responseBody = res.result;
    objectCatalogIdLink = responseBody.id;
  });

  test('createObject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createObject() result:');
    // begin-create_object

    const params = {
      catalogIdentifier: objectCatalogIdLink,
      name: objectName,
      kind: 'vpe',
      parentId: 'us-south',
    };

    let res;
    try {
      res = await catalogManagementService.createObject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_object
    const responseBody = res.result;
    objectIdLink = responseBody.id;
    objectRevLink = responseBody._rev;
  });

  test('getObject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getObject() result:');
    // begin-get_object

    const params = {
      catalogIdentifier: objectCatalogIdLink,
      objectIdentifier: objectIdLink,
    };

    let res;
    try {
      res = await catalogManagementService.getObject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_object
    const responseBody = res.result;
    objectRevLink = responseBody._rev;
  });

  test('getCatalogAccountFilters request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalogAccountFilters() result:');
    // begin-get_catalog_account_filters

    let res;
    try {
      res = await catalogManagementService.getCatalogAccountFilters({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog_account_filters
  });

  test('getShareApprovalList request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getShareApprovalList() result:');
    // begin-get_share_approval_list

    const params = {
      objectType: 'offering',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new CatalogManagementV1.GetShareApprovalListPager(
        catalogManagementService,
        params
      );
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_share_approval_list
  });

  test('addShareApprovalList request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addShareApprovalList() result:');
    // begin-add_share_approval_list

    const params = {
      objectType: 'offering',
      accesses: ['-acct-testString'],
    };

    let res;
    try {
      res = await catalogManagementService.addShareApprovalList(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_share_approval_list
  });

  test('deleteShareApprovalList request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteShareApprovalList() result:');
    // begin-add_share_approval_list

    const params = {
      objectType: 'offering',
      accesses: ['-acct-testString'],
    };

    let res;
    try {
      res = await catalogManagementService.deleteShareApprovalList(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_share_approval_list
  });

  test('getShareApprovalListAsSource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getShareApprovalListAsSource() result:');
    // begin-get_share_approval_list_as_source

    const params = {
      objectType: 'offering',
      approvalStateIdentifier: 'approved',
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new CatalogManagementV1.GetShareApprovalListAsSourcePager(
        catalogManagementService,
        params
      );
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_share_approval_list_as_source
  });

  test('updateShareApprovalListAsSource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateShareApprovalListAsSource() result:');
    // begin-update_share_approval_list_as_source

    const params = {
      objectType: 'offering',
      approvalStateIdentifier: 'approved',
      accesses: ['-acct-testString'],
    };

    let res;
    try {
      res = await catalogManagementService.updateShareApprovalListAsSource(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_share_approval_list_as_source
  });

  test('getOfferingSourceArchive request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingSourceArchive() result:');
    // begin-update_share_approval_list_as_source

    const params = {
      catalogId: catalogIdLink,
      id: offeringIdLink,
      version: '1.0.0',
    };

    let res;
    try {
      res = await catalogManagementService.getOfferingSourceArchive(params);
      console.log(res.result);
    } catch (err) {
      console.warn(err);
    }

    // end-update_share_approval_list_as_source
  });

  test('listCatalogs request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listCatalogs() result:');
    // begin-list_catalogs

    let res;
    try {
      res = await catalogManagementService.listCatalogs({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_catalogs
  });

  test('getConsumptionOfferings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getConsumptionOfferings() result:');
    // begin-get_consumption_offerings

    const params = {
      digest: true,
      catalog: catalogIdLink,
      select: 'all',
      includeHidden: true,
      limit: 10,
    };

    const allResults = [];
    try {
      const pager = new CatalogManagementV1.GetConsumptionOfferingsPager(
        catalogManagementService,
        params
      );
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_consumption_offerings
  });

  test('listOfferings request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listOfferings() result:');
    // begin-list_offerings

    const params = {
      catalogIdentifier: catalogIdLink,
      digest: true,
      limit: 10,
      name: 'testString',
      includeHidden: true,
    };

    const allResults = [];
    try {
      const pager = new CatalogManagementV1.OfferingsPager(catalogManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_offerings
  });

  test('getVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getVersion() result:');
    // begin-get_version

    const params = {
      versionLocId: versionLocatorLink,
    };

    let res;
    try {
      res = await catalogManagementService.getVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_version
    const responseBody = res.result;
    offeringVersion = responseBody;
  });

  test('updateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateVersion() result:');
    // begin-update_version

    const params = {
      versionLocId: versionLocatorLink,
      id: offeringVersion.id,
      catalogId: offeringVersion.catalog_id,
      kinds: offeringVersion.kinds,
    };

    let res;
    try {
      res = await catalogManagementService.updateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_version
    const responseBody = res.result;
    offeringVersion = responseBody;
  });

  test('patchUpdateVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('patchUpdateVersion() result:');
    // begin-patch_update_version

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/kinds/0/versions/0/long_description',
      value: 'testString',
    };

    const params = {
      versionLocId: versionLocatorLink,
      ifMatch: `"${offeringVersion._rev}"`,
      updates: [jsonPatchOperationModel],
    };

    let res;
    try {
      res = await catalogManagementService.patchUpdateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-patch_update_version
  });

  test('getIamPermissions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getIamPermissions() result:');
    // begin-get_iam_permissions

    const params = {
      versionLocId: versionLocatorLink,
    };

    let res;
    try {
      res = await catalogManagementService.getIamPermissions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_iam_permissions
  });

  test('searchObjects request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('searchObjects() result:');
    // begin-search_objects

    const params = {
      query: 'testString',
      kind: 'vpe',
      limit: 10,
      digest: true,
    };

    const allResults = [];
    try {
      const pager = new CatalogManagementV1.SearchObjectsPager(catalogManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-search_objects
  });

  test('listObjects request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listObjects() result:');
    // begin-list_objects

    const params = {
      catalogIdentifier: catalogIdLink,
      limit: 10,
      name: 'testString',
    };

    const allResults = [];
    try {
      const pager = new CatalogManagementV1.ObjectsPager(catalogManagementService, params);
      while (pager.hasNext()) {
        const nextPage = await pager.getNext();
        expect(nextPage).not.toBeNull();
        allResults.push(...nextPage);
      }
      console.log(JSON.stringify(allResults, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_objects
  });

  test('listRegions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listRegions() result:');
    // begin-list_regions

    const params = {
      filter: '',
    };

    let res;
    try {
      res = await catalogManagementService.listRegions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_regions
  });

  test('previewRegions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('previewRegions() result:');
    // begin-preview_regions

    const params = {
      filter: '',
    };

    let res;
    try {
      res = await catalogManagementService.previewRegions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-preview_regions
  });

  test('deleteObject request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_object

    const params = {
      catalogIdentifier: objectCatalogIdLink,
      objectIdentifier: objectIdLink,
    };

    try {
      await catalogManagementService.deleteObject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_object
  });

  test('deleteVersion request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_version

    const params = {
      versionLocId: versionLocatorLink,
    };

    try {
      await catalogManagementService.deleteVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_version
  });

  test('deleteCatalog request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_catalog

    const params = {
      catalogIdentifier: catalogIdLink,
    };

    try {
      await catalogManagementService.deleteCatalog(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_catalog
  });

  test('deleteObjectCatalog object catalog request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_catalog

    const params = {
      catalogIdentifier: objectCatalogIdLink,
    };

    try {
      await catalogManagementService.deleteCatalog(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_catalog
  });
});
