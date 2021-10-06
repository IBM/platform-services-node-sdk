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
const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Catalog Management service.
//
// The following configuration properties are assumed to be defined:
// CATALOG_MANAGEMENT_URL=<service base url>
// CATALOG_MANAGEMENT_AUTH_TYPE=iam
// CATALOG_MANAGEMENT_APIKEY=<IAM apikey>
// CATALOG_MANAGEMENT_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
// CATALOG_MANAGEMENT_CLUSTER_ID=<ID of the cluster>
// CATALOG_MANAGEMENT_ACCOUNT_ID=<ID of the Account>
// CATALOG_MANAGEMENT_GIT_TOKEN=<Token used in communication with Git repository>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'catalog_mgmt.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('CatalogManagementV1', () => {

  // begin-common

  const catalogManagementService = CatalogManagementV1.newInstance({});

  // end-common

  let bearerToken;
  let catalogId;
  let offeringId;
  let versionLocatorId;
  let offeringInstanceId;
  let objectId;

  // To access additional configuration values, uncomment this line and extract the values from config
  const config = readExternalSources(CatalogManagementV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  const accountId = config.accountId;
  expect(accountId).not.toBeUndefined();

  const gitTokenForPublicRepo = config.gitToken;
  expect(gitTokenForPublicRepo).not.toBeUndefined();

  const clusterId = config.clusterId;
  expect(clusterId).not.toBeUndefined();

  test('Acquire bearer token', async () => {
    await catalogManagementService.getCatalogAccount();
    bearerToken = catalogManagementService.getAuthenticator().getRefreshToken()
    expect(bearerToken).not.toBeUndefined();
  })

  test('createCatalog request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createCatalog() result:');
    // begin-create_catalog

    const params = {
      label: 'Catalog Management Service',
      tags: ['node', 'sdk'],
      kind: 'vpe',
      owningAccount: accountId
    }

    try {
      const res = await catalogManagementService.createCatalog(params)
      catalogId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-create_catalog
  });

  test('getCatalog request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalog() result:');
    // begin-get_catalog

    const params = {
      catalogIdentifier: catalogId,
    };

    try {
      const res = await catalogManagementService.getCatalog(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog
  });

  test('replaceCatalog request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceCatalog() result:');
    // begin-replace_catalog

    const params = {
      catalogIdentifier: catalogId,
      id: catalogId,
      tags: ['node', 'sdk', 'updated'],
      owningAccount: accountId,
      kind: 'vpe',
    };

    try {
      const res = await catalogManagementService.replaceCatalog(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_catalog
  });

  test('listCatalogs request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listCatalogs() result:');
    // begin-list_catalogs

    try {
      const res = await catalogManagementService.listCatalogs({})
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_catalogs
  });

  test('createOffering request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createOffering() result:');
    // begin-create_offering

    const params = {
      catalogIdentifier: catalogId,
      name: 'offering-name'
    };

    try {
      const res = await catalogManagementService.createOffering(params);
      offeringId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_offering
  });

  test('getOffering request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOffering() result:');
    // begin-get_offering

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
    };

    try {
      const res = await catalogManagementService.getOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-get_offering
  });

  test.skip('replaceOffering request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceOffering() result:');
    // begin-replace_offering

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
      id: offeringId,
      name: 'updated-offering-name'
    };

    try {
      const res = await catalogManagementService.replaceOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_offering
  });

  test('listOfferings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listOfferings() result:');
    // begin-list_offerings

    const params = {
      catalogIdentifier: catalogId,
      limit: 100,
      offset: 0,
    };

    try {
      const res = await catalogManagementService.listOfferings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_offerings
  });

  test('importOffering request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('importOffering() result:');
    // begin-import_offering

    const params = {
      catalogIdentifier: catalogId,
      tags: ['node', 'sdk'],
      target_kinds: ['roks'],
      zipurl: 'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/node-red-operator.v0.0.2.clusterserviceversion.yaml',
      offeringId: offeringId,
      targetVersion: '0.0.2',
      repoType: 'git_public',
      xAuthToken: gitTokenForPublicRepo,
    };

    try {
      const res = await catalogManagementService.importOffering(params);
      versionLocatorId = res.result.kinds[0].versions[0].version_locator;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-import_offering
  });

  test.skip('reloadOffering request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('reloadOffering() result:');
    // begin-reload_offering

    const params = {
      catalogIdentifier: catalogId,
      tags: ['node', 'sdk'],
      target_kinds: ['roks'],
      zipurl: 'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/node-red-operator.v0.0.2.clusterserviceversion.yaml',
      offeringId: offeringId,
      targetVersion: '0.0.2',
      repoType: 'git_public',
    };

    try {
      const res = await catalogManagementService.reloadOffering(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-reload_offering
  });

  test('createObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createObject() result:');
    // begin-create_object

    const publishObjectModel = {
      permit_ibm_public_publish: true,
      ibm_approved: true,
      public_approved: true,
    };

    const stateModel = {
      current: 'new',
    };

    const params = {
      catalogIdentifier: catalogId,
      catalogId: catalogId,
      name: 'object_in_ibm_cloud',
      crn: 'crn:v1:bluemix:public:iam-global-endpoint:global:::endpoint:private.iam.cloud.ibm.com',
      parentId: 'us-south',
      kind: 'vpe',
      publish: publishObjectModel,
      state: stateModel,
    };

    try {
      const res = await catalogManagementService.createObject(params);
      objectId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_object
  });

  test('getOfferingAudit request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingAudit() result:');
    // begin-get_offering_audit

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
    };

    try {
      const res = await catalogManagementService.getOfferingAudit(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_audit
  });

  test('getCatalogAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalogAccount() result:');
    // begin-get_catalog_account

    try {
      const res = await catalogManagementService.getCatalogAccount({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog_account
  });

  test.skip('updateCatalogAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-update_catalog_account

    try {
      await catalogManagementService.updateCatalogAccount({});
    } catch (err) {
      console.warn(err);
    }

    // end-update_catalog_account
  });

  test('getCatalogAccountAudit request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalogAccountAudit() result:');
    // begin-get_catalog_account_audit

    try {
      const res = await catalogManagementService.getCatalogAccountAudit({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog_account_audit
  });


  test('getCatalogAccountFilters request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalogAccountFilters() result:');
    // begin-get_catalog_account_filters

    try {
      const res = await catalogManagementService.getCatalogAccountFilters({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog_account_filters
  });

  test('getCatalogAudit request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCatalogAudit() result:');
    // begin-get_catalog_audit

    const params = {
      catalogIdentifier: catalogId,
    };

    try {
      const res = await catalogManagementService.getCatalogAudit(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_catalog_audit
  });

  test('getConsumptionOfferings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getConsumptionOfferings() result:');
    // begin-get_consumption_offerings

    try {
      const res = await catalogManagementService.getConsumptionOfferings({});
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_consumption_offerings
  });

  test('importOfferingVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('importOfferingVersion() result:');
    // begin-import_offering_version

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
      targetKinds: ['roks'],
      zipurl: 'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/node-red-operator.v0.0.2.clusterserviceversion.yaml',
      targetVersion: '0.0.3',
      repoType: 'git_public',
    };

    try {
      const res = await catalogManagementService.importOfferingVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-import_offering_version
  });

  test.skip('replaceOfferingIcon request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceOfferingIcon() result:');
    // begin-replace_offering_icon

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
      fileName: 'offering_icon.png',
    };

    try {
      const res = await catalogManagementService.replaceOfferingIcon(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_offering_icon
  });

  test.skip('updateOfferingIbm request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateOfferingIbm() result:');
    // begin-update_offering_ibm

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
      approvalType: 'allow_request',
      approved: 'true',
    };

    try {
      const res = await catalogManagementService.updateOfferingIbm(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_offering_ibm
  });

  test.skip('getOfferingUpdates request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingUpdates() result:');
    // begin-get_offering_updates

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
      kind: 'roks',
      version: '0.0.2',
      clusterId: clusterId,
      region: 'us-south',
      namespace: 'application-development-namespace',
    };

    try {
      const res = await catalogManagementService.getOfferingUpdates(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_updates
  });

  test.skip('getOfferingAbout request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingAbout() result:');
    // begin-get_offering_about

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.getOfferingAbout(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_about
  });

  test.skip('getOfferingLicense request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingLicense() result:');
    // begin-get_offering_license

    const params = {
      versionLocId: versionLocatorId,
      licenseId: 'license-id',
    };

    try {
      const res = await catalogManagementService.getOfferingLicense(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_license
  });

  test('getOfferingContainerImages request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingContainerImages() result:');
    // begin-get_offering_container_images

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.getOfferingContainerImages(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_container_images
  });

  test.skip('deprecateVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-deprecate_version

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      await catalogManagementService.deprecateVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-deprecate_version
  });

  test.skip('accountPublishVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-account_publish_version

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      await catalogManagementService.accountPublishVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-account_publish_version
  });

  test.skip('ibmPublishVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-ibm_publish_version

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      await catalogManagementService.ibmPublishVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-ibm_publish_version
  });

  test.skip('publicPublishVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-public_publish_version

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      await catalogManagementService.publicPublishVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-public_publish_version
  });

  test.skip('commitVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-commit_version

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      await catalogManagementService.commitVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-commit_version
  });

  test.skip('copyVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-copy_version

    const params = {
      versionLocId: versionLocatorId,
      targetKinds: ['roks'],
    };

    try {
      await catalogManagementService.copyVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-copy_version
  });

  test.skip('getOfferingWorkingCopy request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingWorkingCopy() result:');
    // begin-get_offering_working_copy

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.getOfferingWorkingCopy(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_working_copy
  });

  test('getVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getVersion() result:');
    // begin-get_version

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.getVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_version
  });

  test.skip('getCluster request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getCluster() result:');
    // begin-get_cluster

    const params = {
      clusterId: clusterId,
      region: 'us-south',
      xAuthRefreshToken: bearerToken,
    };

    try {
      const res = await catalogManagementService.getCluster(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_cluster
  });

  test.skip('getNamespaces request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getNamespaces() result:');
    // begin-get_namespaces

    const params = {
      clusterId: clusterId,
      region: 'us-south',
      xAuthRefreshToken: bearerToken,
    };

    try {
      const res = await catalogManagementService.getNamespaces(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_namespaces
  });

  test.skip('deployOperators request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deployOperators() result:');
    // begin-deploy_operators

    const params = {
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
      allNamespaces: true,
      versionLocatorId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.deployOperators(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-deploy_operators
  });

  test.skip('listOperators request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listOperators() result:');
    // begin-list_operators

    const params = {
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
      versionLocatorId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.listOperators(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_operators
  });

  test.skip('replaceOperators request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceOperators() result:');
    // begin-replace_operators

    const params = {
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
      allNamespaces: true,
      versionLocatorId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.replaceOperators(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_operators
  });

  test.skip('installVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-install_version

    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
      versionLocatorId: versionLocatorId,
    };

    try {
      await catalogManagementService.installVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-install_version
  });

  test.skip('preinstallVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-preinstall_version

    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
      versionLocatorId: versionLocatorId,
    };

    try {
      await catalogManagementService.preinstallVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-preinstall_version
  });

  test.skip('getPreinstall request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPreinstall() result:');
    // begin-get_preinstall

    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
    };

    try {
      const res = await catalogManagementService.getPreinstall(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_preinstall
  });

  test.skip('validateInstall request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-validate_install

    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
      versionLocatorId: versionLocatorId,
    };

    try {
      await catalogManagementService.validateInstall(params);
    } catch (err) {
      console.warn(err);
    }

    // end-validate_install
  });

  test('getValidationStatus request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getValidationStatus() result:');
    // begin-get_validation_status

    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: bearerToken,
    };

    try {
      const res = await catalogManagementService.getValidationStatus(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_validation_status
  });

  test.skip('getOverrideValues request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOverrideValues() result:');
    // begin-get_override_values

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      const res = await catalogManagementService.getOverrideValues(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_override_values
  });

  test('searchObjects request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('searchObjects() result:');
    // begin-search_objects

    const params = {
      query: 'name: object*',
      collapse: true,
      digest: true,
      limit: 100,
      offset: 0,
    };

    try {
      const res = await catalogManagementService.searchObjects(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-search_objects
  });

  test('listObjects request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listObjects() result:');
    // begin-list_objects

    const params = {
      catalogIdentifier: catalogId,
      limit: 100,
      offset: 0,
    };

    try {
      const res = await catalogManagementService.listObjects(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_objects
  });

  test.skip('replaceObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceObject() result:');
    // begin-replace_object

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      id: objectId,
      name: 'updated-object-name',
      parentId: 'us-south',
      kind: 'vpe',
      catalogId: catalogId,
    };

    try {
      const res = await catalogManagementService.replaceObject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_object
  });

  test('getObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getObject() result:');
    // begin-get_object

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      const res = await catalogManagementService.getObject(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_object
  });

  test('getObjectAudit request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getObjectAudit() result:');
    // begin-get_object_audit

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      const res = await catalogManagementService.getObjectAudit(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_object_audit
  });

  test('accountPublishObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-account_publish_object

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      await catalogManagementService.accountPublishObject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-account_publish_object
  });

  test.skip('sharedPublishObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-shared_publish_object

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      await catalogManagementService.sharedPublishObject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-shared_publish_object
  });

  test.skip('ibmPublishObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-ibm_publish_object

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      await catalogManagementService.ibmPublishObject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-ibm_publish_object
  });

  test.skip('publicPublishObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-public_publish_object

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      await catalogManagementService.publicPublishObject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-public_publish_object
  });

  test('createObjectAccess request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-create_object_access

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accountIdentifier: accountId,
    };

    try {
      await catalogManagementService.createObjectAccess(params);
    } catch (err) {
      console.warn(err);
    }

    // end-create_object_access
  });

  test('getObjectAccess request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getObjectAccess() result:');
    // begin-get_object_access

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accountIdentifier: accountId,
    };

    try {
      const res = await catalogManagementService.getObjectAccess(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_object_access
  });

  test('addObjectAccessList request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('addObjectAccessList() result:');
    // begin-add_object_access_list

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accounts: [accountId],
    };

    try {
      const res = await catalogManagementService.addObjectAccessList(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-add_object_access_list
  });

  test('getObjectAccessList request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getObjectAccessList() result:');
    // begin-get_object_access_list

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      const res = await catalogManagementService.getObjectAccessList(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_object_access_list
  });

  test.skip('createOfferingInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createOfferingInstance() result:');
    // begin-create_offering_instance

    const params = {
      xAuthRefreshToken: bearerToken,
      id: offeringId,
      catalogId: catalogId,
      offeringId: offeringId,
      kindFormat: 'vpe',
      version: '0.0.2',
      clusterId: clusterId,
      clusterRegion: 'us-south',
      clusterAllNamespaces: true,
    };

    try {
      const res = await catalogManagementService.createOfferingInstance(params);
      offeringInstanceId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_offering_instance
  });

  test.skip('getOfferingInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getOfferingInstance() result:');
    // begin-get_offering_instance

    const params = {
      instanceIdentifier: offeringInstanceId,
    };

    try {
      const res = await catalogManagementService.getOfferingInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_offering_instance
  });

  test.skip('putOfferingInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('putOfferingInstance() result:');
    // begin-put_offering_instance

    const params = {
      instanceIdentifier: offeringInstanceId,
      xAuthRefreshToken: bearerToken,
      id: offeringId,
      catalogId: catalogId,
      offeringId: offeringId,
      kindFormat: 'vpe',
      version: '0.0.2',
      clusterId: clusterId,
      clusterRegion: 'us-south',
      clusterAllNamespaces: true,
    };

    try {
      const res = await catalogManagementService.putOfferingInstance(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-put_offering_instance
  });

  test('deleteVersion request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_version

    const params = {
      versionLocId: versionLocatorId,
    };

    try {
      await catalogManagementService.deleteVersion(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_version
  });

  test.skip('deleteOperators request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_operators

    const params = {
      xAuthRefreshToken: bearerToken,
      clusterId: clusterId,
      region: 'us-south',
      versionLocatorId: versionLocatorId,
    };

    try {
      await catalogManagementService.deleteOperators(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_operators
  });

  test.skip('deleteOfferingInstance request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_offering_instance

    const params = {
      instanceIdentifier: 'testString',
      xAuthRefreshToken: bearerToken,
    };

    try {
      await catalogManagementService.deleteOfferingInstance(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_offering_instance
  });

  test('deleteObjectAccessList request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteObjectAccessList() result:');
    // begin-delete_object_access_list

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accounts: [accountId],
    };

    try {
      const res = await catalogManagementService.deleteObjectAccessList(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_object_access_list
  });

  test('deleteObjectAccess request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_object_access

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accountIdentifier: accountId,
    };

    try {
      await catalogManagementService.deleteObjectAccess(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_object_access
  });

  test('deleteObject request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_object

    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    try {
      await catalogManagementService.deleteObject(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_object
  });

  test('deleteOffering request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_offering

    const params = {
      catalogIdentifier: catalogId,
      offeringId: offeringId,
    };

    try {
      await catalogManagementService.deleteOffering(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_offering
  });

  test('deleteCatalog request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);

    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_catalog

    const params = {
      catalogIdentifier: catalogId,
    };

    try {
      await catalogManagementService.deleteCatalog(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_catalog
  });

});
