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

/* eslint-disable no-console */

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

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('CatalogManagementV1', () => {

  // begin-common

  const catalogManagementService = CatalogManagementV1.newInstance({});

  // end-common

  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(CatalogManagementV1.DEFAULT_SERVICE_NAME);

  test('createCatalog request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('createCatalog() result:');
    // begin-create_catalog

    catalogManagementService.createCatalog({})
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-create_catalog
  });

  test('getCatalog request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getCatalog() result:');
    // begin-get_catalog

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.getCatalog(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_catalog
  });

  test('replaceCatalog request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('replaceCatalog() result:');
    // begin-replace_catalog

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.replaceCatalog(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-replace_catalog
  });

  test('listCatalogs request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('listCatalogs() result:');
    // begin-list_catalogs

    catalogManagementService.listCatalogs({})
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-list_catalogs
  });

  test('createOffering request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('createOffering() result:');
    // begin-create_offering

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.createOffering(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-create_offering
  });

  test('getOffering request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOffering() result:');
    // begin-get_offering

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
    };

    catalogManagementService.getOffering(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_offering
  });

  test('replaceOffering request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('replaceOffering() result:');
    // begin-replace_offering

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
    };

    catalogManagementService.replaceOffering(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-replace_offering
  });

  test('listOfferings request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('listOfferings() result:');
    // begin-list_offerings

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.listOfferings(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-list_offerings
  });

  test('importOffering request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('importOffering() result:');
    // begin-import_offering

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.importOffering(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-import_offering
  });

  test('reloadOffering request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('reloadOffering() result:');
    // begin-reload_offering

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
      targetVersion: 'testString',
    };

    catalogManagementService.reloadOffering(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-reload_offering
  });

  test('createObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('createObject() result:');
    // begin-create_object

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.createObject(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-create_object
  });

  test('getOfferingAudit request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOfferingAudit() result:');
    // begin-get_offering_audit

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
    };

    catalogManagementService.getOfferingAudit(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_offering_audit
  });

  test('getCatalogAccount request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getCatalogAccount() result:');
    // begin-get_catalog_account

    catalogManagementService.getCatalogAccount({})
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_catalog_account
  });

  test('updateCatalogAccount request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_catalog_account

    catalogManagementService.updateCatalogAccount({})
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-update_catalog_account
  });

  test('getCatalogAccountAudit request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getCatalogAccountAudit() result:');
    // begin-get_catalog_account_audit

    catalogManagementService.getCatalogAccountAudit({})
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_catalog_account_audit
  });


  test('getCatalogAccountFilters request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getCatalogAccountFilters() result:');
    // begin-get_catalog_account_filters

    catalogManagementService.getCatalogAccountFilters({})
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_catalog_account_filters
  });

  test('getCatalogAudit request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getCatalogAudit() result:');
    // begin-get_catalog_audit

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.getCatalogAudit(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_catalog_audit
  });

  test('getConsumptionOfferings request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getConsumptionOfferings() result:');
    // begin-get_consumption_offerings

    catalogManagementService.getConsumptionOfferings({})
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_consumption_offerings
  });

  test('importOfferingVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('importOfferingVersion() result:');
    // begin-import_offering_version

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
    };

    catalogManagementService.importOfferingVersion(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-import_offering_version
  });

  test('replaceOfferingIcon request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('replaceOfferingIcon() result:');
    // begin-replace_offering_icon

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
      fileName: 'testString',
    };

    catalogManagementService.replaceOfferingIcon(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-replace_offering_icon
  });

  test('updateOfferingIbm request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('updateOfferingIbm() result:');
    // begin-update_offering_ibm

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
      approvalType: 'allow_request',
      approved: 'true',
    };

    catalogManagementService.updateOfferingIbm(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-update_offering_ibm
  });

  test('getOfferingUpdates request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOfferingUpdates() result:');
    // begin-get_offering_updates

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
      kind: 'testString',
    };

    catalogManagementService.getOfferingUpdates(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_offering_updates
  });

  test('getOfferingAbout request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOfferingAbout() result:');
    // begin-get_offering_about

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.getOfferingAbout(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_offering_about
  });

  test('getOfferingLicense request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOfferingLicense() result:');
    // begin-get_offering_license

    const params = {
      versionLocId: 'testString',
      licenseId: 'testString',
    };

    catalogManagementService.getOfferingLicense(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_offering_license
  });

  test('getOfferingContainerImages request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOfferingContainerImages() result:');
    // begin-get_offering_container_images

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.getOfferingContainerImages(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_offering_container_images
  });

  test('deprecateVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-deprecate_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.deprecateVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-deprecate_version
  });

  test('accountPublishVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-account_publish_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.accountPublishVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-account_publish_version
  });

  test('ibmPublishVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-ibm_publish_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.ibmPublishVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-ibm_publish_version
  });

  test('publicPublishVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-public_publish_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.publicPublishVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-public_publish_version
  });

  test('commitVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-commit_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.commitVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-commit_version
  });

  test('copyVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-copy_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.copyVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-copy_version
  });

  test('getOfferingWorkingCopy request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOfferingWorkingCopy() result:');
    // begin-get_offering_working_copy

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.getOfferingWorkingCopy(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_offering_working_copy
  });

  test('getVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getVersion() result:');
    // begin-get_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.getVersion(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_version
  });

  test('getCluster request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getCluster() result:');
    // begin-get_cluster

    const params = {
      clusterId: 'testString',
      region: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.getCluster(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_cluster
  });

  test('getNamespaces request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getNamespaces() result:');
    // begin-get_namespaces

    const params = {
      clusterId: 'testString',
      region: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.getNamespaces(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_namespaces
  });

  test('deployOperators request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('deployOperators() result:');
    // begin-deploy_operators

    const params = {
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.deployOperators(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-deploy_operators
  });

  test('listOperators request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('listOperators() result:');
    // begin-list_operators

    const params = {
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      versionLocatorId: 'testString',
    };

    catalogManagementService.listOperators(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-list_operators
  });

  test('replaceOperators request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('replaceOperators() result:');
    // begin-replace_operators

    const params = {
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.replaceOperators(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-replace_operators
  });

  test('installVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-install_version

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.installVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-install_version
  });

  test('preinstallVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-preinstall_version

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.preinstallVersion(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-preinstall_version
  });

  test('getPreinstall request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getPreinstall() result:');
    // begin-get_preinstall

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.getPreinstall(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_preinstall
  });

  test('validateInstall request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-validate_install

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.validateInstall(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-validate_install
  });

  test('getValidationStatus request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getValidationStatus() result:');
    // begin-get_validation_status

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.getValidationStatus(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_validation_status
  });

  test('getOverrideValues request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOverrideValues() result:');
    // begin-get_override_values

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.getOverrideValues(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_override_values
  });

  test('searchObjects request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('searchObjects() result:');
    // begin-search_objects

    const params = {
      query: 'testString',
    };

    catalogManagementService.searchObjects(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-search_objects
  });

  test('listObjects request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('listObjects() result:');
    // begin-list_objects

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.listObjects(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-list_objects
  });

  test('replaceObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('replaceObject() result:');
    // begin-replace_object

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.replaceObject(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-replace_object
  });

  test('getObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getObject() result:');
    // begin-get_object

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.getObject(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_object
  });

  test('getObjectAudit request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getObjectAudit() result:');
    // begin-get_object_audit

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.getObjectAudit(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-get_object_audit
  });

  test('accountPublishObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-account_publish_object

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.accountPublishObject(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-account_publish_object
  });

  test('sharedPublishObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-shared_publish_object

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.sharedPublishObject(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-shared_publish_object
  });

  test('ibmPublishObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-ibm_publish_object

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.ibmPublishObject(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-ibm_publish_object
  });

  test('publicPublishObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-public_publish_object

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.publicPublishObject(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-public_publish_object
  });

  test('createObjectAccess request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_object_access

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
      accountIdentifier: 'testString',
    };

    catalogManagementService.createObjectAccess(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_object_access
  });

  test('getObjectAccess request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getObjectAccess() result:');
    // begin-get_object_access

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
      accountIdentifier: 'testString',
    };

    catalogManagementService.getObjectAccess(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_object_access
  });

  test('addObjectAccessList request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('addObjectAccessList() result:');
    // begin-add_object_access_list

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
      accounts: ['testString'],
    };

    catalogManagementService.addObjectAccessList(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-add_object_access_list
  });

  test('getObjectAccessList request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getObjectAccessList() result:');
    // begin-get_object_access_list

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.getObjectAccessList(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_object_access_list
  });

  test('createOfferingInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('createOfferingInstance() result:');
    // begin-create_offering_instance

    const params = {
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.createOfferingInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_offering_instance
  });

  test('getOfferingInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('getOfferingInstance() result:');
    // begin-get_offering_instance

    const params = {
      instanceIdentifier: 'testString',
    };

    catalogManagementService.getOfferingInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_offering_instance
  });

  test('putOfferingInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('putOfferingInstance() result:');
    // begin-put_offering_instance

    const params = {
      instanceIdentifier: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.putOfferingInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-put_offering_instance
  });

  test('deleteVersion request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_version

    const params = {
      versionLocId: 'testString',
    };

    catalogManagementService.deleteVersion(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_version
  });

  test('deleteOperators request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_operators

    const params = {
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      versionLocatorId: 'testString',
    };

    catalogManagementService.deleteOperators(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_operators
  });

  test('deleteOfferingInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_offering_instance

    const params = {
      instanceIdentifier: 'testString',
      xAuthRefreshToken: 'testString',
    };

    catalogManagementService.deleteOfferingInstance(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_offering_instance
  });

  test('deleteObjectAccessList request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    originalLog('deleteObjectAccessList() result:');
    // begin-delete_object_access_list

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
      accounts: ['testString'],
    };

    catalogManagementService.deleteObjectAccessList(params)
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
    })
    .catch(err => {
      console.warn(err)
    });

    // end-delete_object_access_list
  });

  test('deleteObjectAccess request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_object_access

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
      accountIdentifier: 'testString',
    };

    catalogManagementService.deleteObjectAccess(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-delete_object_access
  });

  test('deleteObject request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_object

    const params = {
      catalogIdentifier: 'testString',
      objectIdentifier: 'testString',
    };

    catalogManagementService.deleteObject(params)
    .then(res => {
      done();
    })
    .catch(err => {
      console.warn(err)
    });

    // end-delete_object
  });

  test('deleteOffering request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_offering

    const params = {
      catalogIdentifier: 'testString',
      offeringId: 'testString',
    };

    catalogManagementService.deleteOffering(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_offering
  });

  test('deleteCatalog request example', done => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_catalog

    const params = {
      catalogIdentifier: 'testString',
    };

    catalogManagementService.deleteCatalog(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_catalog
  });

});
