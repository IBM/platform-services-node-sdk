/* eslint-disable no-console */
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
const { readExternalSources } = require('ibm-cloud-sdk-core');
const CatalogManagementV1 = require('../../dist/catalog-management/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'catalog_mgmt.env';

const describe = authHelper.prepareTests(configFile);

describe('CatalogManagementV1_integration', () => {
  const catalogManagementService = CatalogManagementV1.newInstance({});
  const catalogManagementServiceNotAuthorized = CatalogManagementV1.newInstance({
    serviceName: 'NOT_AUTHORIZED',
  });

  expect(catalogManagementService).not.toBeNull();
  expect(catalogManagementServiceNotAuthorized).not.toBeNull();

  const config = readExternalSources(CatalogManagementV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  const kindVpe = 'vpe';
  const kindRoks = 'roks';
  const kindHelm = 'helm';
  const kindOperator = 'operator';

  const regionUsSouth = 'us-south';
  const namespace = 'node-sdk';

  const bogusVersionLocatorId = 'bogus-version-locator-id';
  const bogusCatalogId = 'bogus-catalog-id';
  const bogusRevision = 'bogus-revision';
  const bogusOfferingId = 'bogus-offering-id';
  const bogusCatalogAccountId = 'bogus-catalog-account-id';
  const bogusLicenseId = 'bogus-licence-id';

  const labelNodeSdk = 'node-sdk';
  const repoTypeGitPublic = 'git_public';

  const objectName = 'nodeSdk4';

  let catalogId;
  let offeringId;
  let objectId;
  let versionLocatorId;
  let refreshTokenAuthorized;
  let refreshTokenNotAuthorized;

  const { accountId } = config;
  expect(accountId).not.toBeNull();

  const { clusterId } = config;
  expect(clusterId).not.toBeNull();

  const { gitAuthToken } = config;
  expect(gitAuthToken).not.toBeNull();

  beforeAll(async () => {
    // these two calls are needed to have token for both service instance
    try {
      const params = {
        catalogIdentifier: 'bogus-catalog-id',
      };

      await catalogManagementService.getCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }

    const iamAuthenticator = catalogManagementService.getAuthenticator();
    refreshTokenAuthorized = iamAuthenticator.getRefreshToken();
    expect(refreshTokenAuthorized).not.toBeUndefined();

    try {
      const params = {
        catalogIdentifier: 'bogus-catalog-id',
      };

      await catalogManagementServiceNotAuthorized.getCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }

    const iamAuthenticatorNotAuthorized = catalogManagementServiceNotAuthorized.getAuthenticator();
    refreshTokenNotAuthorized = iamAuthenticatorNotAuthorized.getRefreshToken();
    expect(refreshTokenNotAuthorized).not.toBeUndefined();
  });

  test('createCatalog() returns 400 when user is not authorized', async () => {
    try {
      const params = {
        rev: bogusRevision,
        label: labelNodeSdk,
        tags: ['node', 'sdk'],
        owningAccount: accountId,
        kind: kindVpe,
      };

      await catalogManagementServiceNotAuthorized.createCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('createCatalog() returns 400 when backend validation fails', async () => {
    try {
      const params = {
        rev: bogusRevision,
        label: labelNodeSdk,
        tags: ['node', 'sdk'],
        owningAccount: accountId,
        kind: kindVpe,
      };

      await catalogManagementService.createCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('createCatalog()', async () => {
    const params = {
      label: labelNodeSdk,
      tags: ['node', 'sdk'],
      owningAccount: accountId,
      kind: kindVpe,
    };

    const res = await catalogManagementService.createCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    expect(res.result.id).not.toBeNull();
    catalogId = res.result.id;
  });

  test('getCatalog() returns 404 when no such catalog', async () => {
    try {
      const params = {
        catalogIdentifier: bogusCatalogId,
      };

      await catalogManagementService.getCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getCatalog() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
      };

      await catalogManagementServiceNotAuthorized.getCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getCatalog()', async () => {
    const params = {
      catalogIdentifier: catalogId,
    };

    const res = await catalogManagementService.getCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.id).toBe(catalogId);
  });

  test('replaceCatalog() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        id: catalogId,
        tags: ['node', 'sdk', 'catalog'],
        owningAccount: accountId,
        kind: kindVpe,
      };

      await catalogManagementServiceNotAuthorized.replaceCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('replaceCatalog() returns 400 when backend validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        id: catalogId,
        tags: ['node', 'sdk', 'catalog'],
        owningAccount: accountId,
        kind: 'bogus-kind',
      };

      await catalogManagementService.replaceCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('replaceCatalog() returns 404 when no such catalog', async () => {
    try {
      const params = {
        catalogIdentifier: bogusCatalogId,
        id: bogusCatalogId,
        tags: ['node', 'sdk', 'catalog'],
        owningAccount: accountId,
        kind: kindVpe,
      };

      await catalogManagementService.replaceCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('replaceCatalog()', async () => {
    const tags = ['node', 'sdk', 'catalog', 'tags'];
    const params = {
      catalogIdentifier: catalogId,
      id: catalogId,
      tags,
      owningAccount: accountId,
      kind: kindVpe,
    };

    const res = await catalogManagementService.replaceCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.tags).toStrictEqual(tags);
  });

  test('listCatalogs()', async () => {
    const res = await catalogManagementService.listCatalogs();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    const result = res.result.resources.find(({ id }) => id === catalogId);
    expect(result).toBeDefined();
  });

  test('createOffering() returns 404 when no such catalog', async () => {
    try {
      const params = {
        catalogIdentifier: bogusCatalogId,
      };

      await catalogManagementService.createOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('createOffering() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        catalogId,
        name: 'Offering created by node sdk',
      };

      await catalogManagementService.createOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('createOffering() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        label: labelNodeSdk,
        name: 'offering-created-by-node-sdk',
      };

      await catalogManagementServiceNotAuthorized.createOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('createOffering()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      label: labelNodeSdk,
      name: 'offering-created-by-node-sdk',
    };

    const res = await catalogManagementService.createOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    expect(res.result.id).toBeDefined();
    offeringId = res.result.id;
  });

  test('getOffering() returns 404 when no such offering', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId: bogusOfferingId,
      };

      await catalogManagementService.getOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getOffering() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
      };

      await catalogManagementServiceNotAuthorized.getOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getOffering()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
    };

    const res = await catalogManagementService.getOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceOffering() returns 404 when no such offering', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId: bogusOfferingId,
        id: bogusOfferingId,
        name: 'updated-offering-name-created-by-node-sdk',
        catalogId,
      };

      await catalogManagementService.replaceOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('replaceOffering() returns 400 backend input validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        id: bogusOfferingId,
        name: 'updated-offering-name-created-by-node-sdk',
        catalogId,
      };

      await catalogManagementService.replaceOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('replaceOffering() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        id: offeringId,
        name: 'updated-offering-name-created-by-node-sdk',
        catalogId,
      };

      await catalogManagementServiceNotAuthorized.replaceOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  // once the version related conflict is resolved this test requires a conflict case
  test('replaceOffering() returns 409 when there is a version conflict', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        id: offeringId,
        name: 'updated-offering-name-created-by-node-sdk',
        catalogId,
      };

      await catalogManagementService.replaceOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(409);
    }
  });

  // it has a version related conflict which I don't know how to resolve
  test.skip('replaceOffering()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
      id: offeringId,
      name: 'updated-offering-name-created-by-node-sdk',
      catalogId,
    };

    const res = await catalogManagementService.replaceOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOfferings() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        digest: true,
        sort: 'bogus-sort-value',
      };

      await catalogManagementService.listOfferings(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('listOfferings() returns 404 when no such catalog', async () => {
    try {
      const params = {
        catalogIdentifier: bogusCatalogId,
      };

      await catalogManagementService.listOfferings(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('listOfferings() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
      };

      await catalogManagementServiceNotAuthorized.listOfferings(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('listOfferings()', async () => {
    const params = {
      catalogIdentifier: catalogId,
    };

    const res = await catalogManagementService.listOfferings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    const result = res.result.resources.find(({ id }) => id === offeringId);
    expect(result).not.toBeNull();
  });

  test('importOffering() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        tags: ['sdk', 'node'],
        targetKinds: [kindRoks],
        zipurl:
          'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2' +
          '/node-red-operator.v0.0.2.clusterserviceversion.yaml',
        offeringId,
        targetVersion: '0.0.2',
        includeConfig: true,
        isVsi: true,
        repoType: repoTypeGitPublic,
        xAuthToken: gitAuthToken,
      };

      await catalogManagementServiceNotAuthorized.importOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('importOffering() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        tags: ['sdk', 'node'],
        targetKinds: ['rocks'],
        zipurl:
          'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/' +
          'node-red-operator.v0.0.2.clusterserviceversion.yaml',
        offeringId,
        targetVersion: '0.0.2-patch',
        includeConfig: true,
        isVsi: true,
        repoType: repoTypeGitPublic,
        xAuthToken: gitAuthToken,
      };

      await catalogManagementService.importOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('importOffering() returns 404 when no such catalog', async () => {
    try {
      const params = {
        catalogIdentifier: bogusCatalogId,
        catalogId: bogusCatalogId,
        tags: ['sdk', 'node'],
        targetKinds: [kindRoks],
        zipurl:
          'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/' +
          'node-red-operator.v0.0.2.clusterserviceversion.yaml',
        offeringId,
        targetVersion: '0.0.2-patch',
        includeConfig: true,
        isVsi: true,
        repoType: repoTypeGitPublic,
        xAuthToken: gitAuthToken,
      };

      await catalogManagementService.importOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('importOffering()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      name: 'imported-offering-by-node-sdk',
      tags: ['sdk', 'node'],
      targetKinds: [kindRoks],
      zipurl:
        'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/' +
        'node-red-operator.v0.0.2.clusterserviceversion.yaml',
      offeringId,
      targetVersion: '0.0.2',
      includeConfig: true,
      isVsi: true,
      repoType: repoTypeGitPublic,
      xAuthToken: gitAuthToken,
    };

    const res = await catalogManagementService.importOffering(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
    expect(res.status).toBe(201);
    versionLocatorId = res.result.kinds[0].versions[0].version_locator;
    expect(versionLocatorId).not.toBeNull();
  });

  test('reloadOffering() returns 404 when no such offering', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId: bogusOfferingId,
        targetVersion: '0.0.2',
      };

      await catalogManagementService.reloadOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('reloadOffering() returns 403 when the user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        targetVersion: '0.0.2',
        targetKinds: [kindRoks],
        zipurl:
          'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/' +
          'node-red-operator.v0.0.2.clusterserviceversion.yaml',
        repoType: repoTypeGitPublic,
      };

      await catalogManagementServiceNotAuthorized.reloadOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  // don't have the proper data for executing this operation
  test.skip('reloadOffering()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
      targetVersion: '0.0.2',
      targetKinds: [kindRoks],
      zipurl:
        'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0.2/' +
        'node-red-operator.v0.0.2.clusterserviceversion.yaml',
      repoType: repoTypeGitPublic,
    };

    const res = await catalogManagementService.reloadOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createObject() returns 400 when backend validation fails', async () => {
    try {
      const publishObjectModel = {
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
      };

      // State
      const stateModel = {
        current: 'new',
      };

      const params = {
        catalogIdentifier: catalogId,
        name: objectName,
        crn: 'crn:v1:bluemix:public:iam-global-endpoint:global:::endpoint:private.iam.cloud.ibm.com',
        parentId: 'bogus region name',
        kind: kindVpe,
        publish: publishObjectModel,
        state: stateModel,
        catalogId,
      };

      await catalogManagementService.createObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('createObject() returns 403 when user is not authorized', async () => {
    try {
      const publishObjectModel = {
        permit_ibm_public_publish: true,
        ibm_approved: true,
        public_approved: true,
      };

      // State
      const stateModel = {
        current: 'new',
      };

      const params = {
        catalogIdentifier: catalogId,
        name: objectName,
        crn: 'crn:v1:bluemix:public:iam-global-endpoint:global:::endpoint:private.iam.cloud.ibm.com',
        parentId: regionUsSouth,
        kind: kindVpe,
        publish: publishObjectModel,
        state: stateModel,
        catalogId,
      };

      await catalogManagementServiceNotAuthorized.createObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('createObject()', async () => {
    const publishObjectModel = {
      permit_ibm_public_publish: true,
      ibm_approved: true,
      public_approved: true,
    };

    // State
    const stateModel = {
      current: 'new',
    };

    const params = {
      catalogIdentifier: catalogId,
      name: objectName,
      crn: 'crn:v1:bluemix:public:iam-global-endpoint:global:::endpoint:private.iam.cloud.ibm.com',
      parentId: regionUsSouth,
      kind: kindVpe,
      publish: publishObjectModel,
      state: stateModel,
      catalogId,
    };

    const res = await catalogManagementService.createObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    objectId = res.result.id;
    expect(objectId).not.toBeUndefined();
  });

  test('getOfferingAudit() returns 200 when no such offering', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
    };

    const res = await catalogManagementService.getOfferingAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingAudit() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
      };

      await catalogManagementServiceNotAuthorized.getOfferingAudit(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getOfferingAudit()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
    };

    const res = await catalogManagementService.getOfferingAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCatalogAccount() returns 200 when user is not authorized', async () => {
    const params = {
      catalogIdentifier: catalogId,
    };
    const res = await catalogManagementServiceNotAuthorized.getCatalogAccount(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
  });

  test('getCatalogAccount()', async () => {
    const params = {
      catalogIdentifier: catalogId,
    };
    const res = await catalogManagementService.getCatalogAccount(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
  });

  test('updateCatalogAccount() returns 400 when no such catalog account', async () => {
    try {
      const params = {
        id: bogusCatalogAccountId,
      };

      await catalogManagementService.updateCatalogAccount(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('updateCatalogAccount() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        id: accountId,
      };

      await catalogManagementServiceNotAuthorized.updateCatalogAccount(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('updateCatalogAccount()', async () => {
    // Request models needed by this operation.

    // FilterTerms
    const filterTermsModel = {
      filter_terms: ['testString'],
    };

    // CategoryFilter
    const categoryFilterModel = {
      include: true,
      filter: filterTermsModel,
    };

    // IDFilter
    const idFilterModel = {
      include: filterTermsModel,
      exclude: filterTermsModel,
    };

    // Filters
    const filtersModel = {
      include_all: true,
      category_filters: { 'key1': categoryFilterModel },
      id_filters: idFilterModel,
    };

    const params = {
      id: 'testString',
      hideIbmCloudCatalog: true,
      accountFilters: filtersModel,
    };

    const res = await catalogManagementService.updateCatalogAccount(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('getCatalogAccountAudit() returns 403 when user is not authorized', async () => {
    try {
      await catalogManagementServiceNotAuthorized.getCatalogAccountAudit();
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getCatalogAccountAudit()', async () => {
    const res = await catalogManagementService.getCatalogAccountAudit();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCatalogAccountFilters() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalog: catalogId,
      };

      await catalogManagementServiceNotAuthorized.getCatalogAccountFilters(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getCatalogAccountFilters() returns 404 when no such catalog', async () => {
    try {
      const params = {
        catalog: 'bogus-catalog-id',
      };

      await catalogManagementService.getCatalogAccountFilters(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getCatalogAccountFilters()', async () => {
    const params = {
      catalog: catalogId,
    };

    const res = await catalogManagementService.getCatalogAccountFilters(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCatalogAudit() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
      };

      await catalogManagementServiceNotAuthorized.getCatalogAudit(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getCatalogAudit() returns 404 when no such catalog', async () => {
    try {
      const params = {
        catalogIdentifier: bogusCatalogId,
      };

      await catalogManagementService.getCatalogAudit(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getCatalogAudit()', async () => {
    const params = {
      catalogIdentifier: catalogId,
    };

    const res = await catalogManagementService.getCatalogAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getConsumptionOfferings() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalog: catalogId,
        select: 'all',
      };

      await catalogManagementServiceNotAuthorized.getConsumptionOfferings(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getConsumptionOfferings() returns 404 when no such catalog', async () => {
    try {
      const params = {
        digest: true,
        catalog: bogusCatalogId,
        select: 'all',
        includeHidden: true,
      };

      await catalogManagementService.getConsumptionOfferings(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test.skip('getConsumptionOfferings()', async () => {
    const params = {
      digest: true,
      catalog: catalogId,
      select: 'all',
      includeHidden: true,
    };

    const res = await catalogManagementService.getConsumptionOfferings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('importOfferingVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        targetKinds: ['rocks'],
        zipurl:
          'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0' +
          '.2/node-red-operator.v0.0.2.clusterserviceversion.yaml',
        targetVersion: '0.0.2-patch',
        repoType: repoTypeGitPublic,
      };

      await catalogManagementService.importOfferingVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('importOfferingVersion() returns 404 when no such offering', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId: bogusOfferingId,
      };

      await catalogManagementService.importOfferingVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('importOfferingVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        targetKinds: [kindRoks],
        zipurl:
          'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0' +
          '.2/node-red-operator.v0.0.2.clusterserviceversion.yaml',
        targetVersion: '0.0.3',
        includeConfig: true,
        repoType: repoTypeGitPublic,
      };

      await catalogManagementServiceNotAuthorized.importOfferingVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('importOfferingVersion()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
      targetKinds: [kindRoks],
      zipurl:
        'https://github.com/rhm-samples/node-red-operator/blob/master/node-red-operator/bundle/0.0' +
        '.2/node-red-operator.v0.0.2.clusterserviceversion.yaml',
      targetVersion: '0.0.3',
      includeConfig: true,
      repoType: repoTypeGitPublic,
    };

    const res = await catalogManagementService.importOfferingVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  // this functionality is disabled
  test.skip('replaceOfferingIcon()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
      fileName: 'filename',
    };

    const res = await catalogManagementService.replaceOfferingIcon(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test.skip('updateOfferingIbm() returns 404 when no such offering', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId: bogusOfferingId,
      };

      await catalogManagementService.updateOfferingIbm(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('updateOfferingIbm() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        approvalType: 'allow_request',
        approved: true,
      };

      await catalogManagementServiceNotAuthorized.updateOfferingIbm(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('updateOfferingIbm()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
      approvalType: 'allow_request',
      approved: true,
    };

    const res = await catalogManagementService.updateOfferingIbm(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingUpdates() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
        kind: 'rocks',
        version: '0.0.2',
        clusterId,
        region: 'us-south-32',
        namespace,
      };

      await catalogManagementService.getOfferingUpdates(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test.skip('getOfferingUpdates()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
      kind: kindRoks,
      version: '0.0.2',
      clusterId,
      region: regionUsSouth,
      namespace,
    };

    const res = await catalogManagementService.getOfferingUpdates(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingAbout() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.getOfferingAbout(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOfferingAbout() returns 404 when no such offering', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
      };

      await catalogManagementService.getOfferingAbout(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOfferingAbout() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.getOfferingAbout(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getOfferingAbout()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.getOfferingAbout(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingLicense() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
        licenseId: bogusLicenseId,
      };

      await catalogManagementService.getOfferingLicense(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOfferingLicense() returns 400 when no such license', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        licenseId: bogusLicenseId,
      };

      await catalogManagementService.getOfferingLicense(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test.skip('getOfferingLicense() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        licenseId: 'license-id-is-needed',
      };

      await catalogManagementServiceNotAuthorized.getOfferingLicense(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('getOfferingLicense()', async () => {
    const params = {
      versionLocId: versionLocatorId,
      licenseId: 'license-id-is-needed',
    };

    const res = await catalogManagementService.getOfferingLicense(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingContainerImages() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.getOfferingContainerImages(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOfferingContainerImages() returns 400 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
      };

      await catalogManagementService.getOfferingContainerImages(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOfferingContainerImages() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.getOfferingContainerImages(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getOfferingContainerImages()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.getOfferingContainerImages(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deprecateVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.deprecateVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('deprecateVersion() returns 404 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}d`,
      };

      await catalogManagementService.deprecateVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('deprecateVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.deprecateVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('deprecateVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.deprecateVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('accountPublishVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.accountPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('accountPublishVersion() returns 400 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}sd`,
      };

      await catalogManagementService.accountPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('accountPublishVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.accountPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('accountPublishVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.accountPublishVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('ibmPublishVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.ibmPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('ibmPublishVersion() returns 400 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}ac`,
      };

      await catalogManagementService.ibmPublishVersion(params);
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('ibmPublishVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.ibmPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('ibmPublishVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.ibmPublishVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('publicPublishVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.publicPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('publicPublishVersion() returns 400 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}cc`,
      };

      await catalogManagementService.publicPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('publicPublishVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.publicPublishVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('publicPublishVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.publicPublishVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('commitVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.commitVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('commitVersion() returns 404 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
      };

      await catalogManagementService.commitVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('commitVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.commitVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('commitVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.commitVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('copyVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        targetKinds: [kindRoks],
      };

      await catalogManagementServiceNotAuthorized.copyVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('copyVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
        targetKinds: [kindRoks],
      };

      await catalogManagementService.copyVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('copyVersion() returns 404 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
        targetKinds: [kindRoks],
      };

      await catalogManagementService.copyVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test.skip('copyVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
      targetKinds: [kindHelm],
    };

    const res = await catalogManagementService.copyVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingWorkingCopy() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.getOfferingWorkingCopy(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOfferingWorkingCopy() returns 404 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
      };

      await catalogManagementService.getOfferingWorkingCopy(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getOfferingWorkingCopy() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.getOfferingWorkingCopy(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('getOfferingWorkingCopy()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.getOfferingWorkingCopy(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getVersion() returns 403 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.getVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getVersion() returns 404 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
      };

      await catalogManagementService.getVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.getVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.getVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCluster() returns 401 when user is not authorized', async () => {
    try {
      const params = {
        clusterId,
        region: regionUsSouth,
        xAuthRefreshToken: refreshTokenNotAuthorized,
      };

      await catalogManagementServiceNotAuthorized.getCluster(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  test('getCluster() returns 404 when no such cluster', async () => {
    try {
      const params = {
        clusterId: `${clusterId}c`,
        region: regionUsSouth,
        xAuthRefreshToken: refreshTokenAuthorized,
      };

      await catalogManagementService.getCluster(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getCluster()', async () => {
    const params = {
      clusterId,
      region: regionUsSouth,
      xAuthRefreshToken: refreshTokenAuthorized,
    };

    const res = await catalogManagementService.getCluster(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getNamespaces() returns 404 when no such cluster', async () => {
    try {
      const params = {
        clusterId: `${clusterId}c`,
        region: regionUsSouth,
        xAuthRefreshToken: refreshTokenAuthorized,
      };

      await catalogManagementService.getNamespaces(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getNamespaces() returns 401 when user is not authorized', async () => {
    try {
      const params = {
        clusterId,
        region: regionUsSouth,
        xAuthRefreshToken: refreshTokenNotAuthorized,
      };

      await catalogManagementServiceNotAuthorized.getNamespaces(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(401);
    }
  });

  // TLS handshake timeout
  test.skip('getNamespaces()', async () => {
    const params = {
      clusterId,
      region: regionUsSouth,
      xAuthRefreshToken: refreshTokenAuthorized,
    };

    const res = await catalogManagementService.getNamespaces(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deployOperators() returns 404 when no such cluster', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId: `${clusterId}c`,
        region: regionUsSouth,
        namespaces: ['node-sdk'],
        versionLocatorId,
      };

      await catalogManagementService.deployOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('deployOperators() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
        namespaces: ['node-sdk'],
        versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.deployOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  // TLS handshake timeout
  test.skip('deployOperators()', async () => {
    const params = {
      xAuthRefreshToken: refreshTokenAuthorized,
      clusterId,
      region: regionUsSouth,
      namespaces: ['node-sdk'],
      versionLocatorId,
    };

    const res = await catalogManagementService.deployOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOperators() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId: bogusVersionLocatorId,
      };

      await catalogManagementService.listOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('listOperators() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.listOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('listOperators()', async () => {
    const params = {
      xAuthRefreshToken: refreshTokenAuthorized,
      clusterId,
      region: regionUsSouth,
      versionLocatorId,
    };

    const res = await catalogManagementService.listOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceOperators() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId: bogusVersionLocatorId,
      };

      await catalogManagementService.replaceOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('replaceOperators() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId,
        allNamespaces: true,
      };

      await catalogManagementServiceNotAuthorized.replaceOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('replaceOperators()', async () => {
    const params = {
      xAuthRefreshToken: refreshTokenAuthorized,
      clusterId,
      region: regionUsSouth,
      versionLocatorId,
      namespace,
    };

    const res = await catalogManagementService.replaceOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('installVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId: bogusVersionLocatorId,
      };

      await catalogManagementService.installVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('installVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.installVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('installVersion()', async () => {
    // Request models needed by this operation.

    // DeployRequestBodySchematics
    const deployRequestBodySchematicsModel = {
      name: 'testString',
      description: 'testString',
      tags: ['testString'],
      resource_group_id: 'testString',
    };

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespace: 'testString',
      overrideValues: { 'key1': 'testString' },
      entitlementApikey: 'testString',
      schematics: deployRequestBodySchematicsModel,
      script: 'testString',
      scriptId: 'testString',
      versionLocatorId: 'testString',
      vcenterId: 'testString',
      vcenterUser: 'testString',
      vcenterPassword: 'testString',
      vcenterLocation: 'testString',
      vcenterDatastore: 'testString',
    };

    const res = await catalogManagementService.installVersion(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('preinstallVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.preinstallVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('preinstallVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId: bogusVersionLocatorId,
      };

      await catalogManagementService.preinstallVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test.skip('preinstallVersion()', async () => {
    // Request models needed by this operation.

    // DeployRequestBodySchematics
    const deployRequestBodySchematicsModel = {
      name: 'testString',
      description: 'testString',
      tags: ['testString'],
      resource_group_id: 'testString',
    };

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespace: 'testString',
      overrideValues: { 'key1': 'testString' },
      entitlementApikey: 'testString',
      schematics: deployRequestBodySchematicsModel,
      script: 'testString',
      scriptId: 'testString',
      versionLocatorId: 'testString',
      vcenterId: 'testString',
      vcenterUser: 'testString',
      vcenterPassword: 'testString',
      vcenterLocation: 'testString',
      vcenterDatastore: 'testString',
    };

    const res = await catalogManagementService.preinstallVersion(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('getPreinstall() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
      };

      await catalogManagementService.getPreinstall(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getPreinstall() returns 400 when no such preinstall', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
      };

      await catalogManagementService.getPreinstall(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getPreinstall() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
      };

      await catalogManagementServiceNotAuthorized.getPreinstall(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  // requires special data
  test.skip('getPreinstall()', async () => {
    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: refreshTokenAuthorized,
      clusterId,
      region: regionUsSouth,
    };

    const res = await catalogManagementService.getPreinstall(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('validateInstall() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId: bogusVersionLocatorId,
      };

      await catalogManagementService.validateInstall(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('validateInstall() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        xAuthRefreshToken: refreshTokenNotAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.validateInstall(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  // TLS handshake timeout
  test.skip('validateInstall() returns 404 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
      };

      await catalogManagementService.validateInstall(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  // TLS handshake timeout
  test.skip('validateInstall()', async () => {
    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: refreshTokenAuthorized,
      clusterId,
      region: regionUsSouth,
      versionLocatorId,
    };

    const res = await catalogManagementService.validateInstall(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getValidationStatus() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
        xAuthRefreshToken: refreshTokenAuthorized,
      };

      await catalogManagementService.getValidationStatus(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getValidationStatus() returns 400 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
        xAuthRefreshToken: refreshTokenAuthorized,
      };

      await catalogManagementService.getValidationStatus(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getValidationStatus() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
        xAuthRefreshToken: refreshTokenNotAuthorized,
      };

      await catalogManagementServiceNotAuthorized.getValidationStatus(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getValidationStatus()', async () => {
    const params = {
      versionLocId: versionLocatorId,
      xAuthRefreshToken: refreshTokenAuthorized,
    };

    const res = await catalogManagementService.getValidationStatus(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOverrideValues() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.getOverrideValues(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOverrideValues() returns 400 when no such version', async () => {
    try {
      const params = {
        versionLocId: `${versionLocatorId}c`,
      };

      await catalogManagementService.getOverrideValues(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('getOverrideValues() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.getOverrideValues(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('getOverrideValues()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.getOverrideValues(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('searchObjects() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        query: ' ',
        collapse: true,
        digest: true,
      };

      await catalogManagementService.searchObjects(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('searchObjects() returns 200 when user is not authorized', async () => {
    const params = {
      query: `name: ${objectName}`,
      collapse: true,
      digest: true,
    };

    const res = await catalogManagementServiceNotAuthorized.searchObjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('searchObjects()', async () => {
    const params = {
      query: `name: ${objectName}`,
      collapse: true,
      digest: true,
    };

    const res = await catalogManagementService.searchObjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listObjects() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        sort: ' ',
        name: ' ',
      };

      await catalogManagementService.listObjects(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('listObjects()', async () => {
    const params = {
      catalogIdentifier: catalogId,
    };

    const res = await catalogManagementService.listObjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    const result = res.result.resources.find(({ id }) => id === objectId);
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });

  test('replaceObject() returns 400 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
        id: objectId,
        name: objectName,
        parentId: regionUsSouth,
        kind: kindVpe,
        catalogId,
      };

      await catalogManagementService.replaceObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('replaceObject() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
        id: objectId,
        name: objectName,
        parentId: regionUsSouth,
        kind: kindVpe,
        catalogId,
      };

      await catalogManagementServiceNotAuthorized.replaceObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  // revision conflict
  test.skip('replaceObject()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      id: objectId,
      name: objectName,
      parentId: regionUsSouth,
      kind: kindVpe,
      catalogId,
    };

    const res = await catalogManagementService.replaceObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObject() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
      };

      await catalogManagementService.getObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getObject() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.getObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getObject()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.getObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObjectAudit() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.getObjectAudit(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getObjectAudit() returns 200 when no such object', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: `${objectId}cc`,
    };

    const res = await catalogManagementService.getObjectAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObjectAudit()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.getObjectAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('accountPublishObject() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.accountPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('accountPublishObject() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
      };

      await catalogManagementService.accountPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('accountPublishObject()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.accountPublishObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('sharedPublishObject() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
      };

      await catalogManagementService.sharedPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('sharedPublishObject() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.sharedPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('sharedPublishObject()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.sharedPublishObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('ibmPublishObject() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
      };

      await catalogManagementService.ibmPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('ibmPublishObject() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.ibmPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('ibmPublishObject()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.ibmPublishObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('publicPublishObject() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
      };

      await catalogManagementService.publicPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('publicPublishObject() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.publicPublishObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('publicPublishObject()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.publicPublishObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('createObjectAccess() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
        accountIdentifier: accountId,
      };

      await catalogManagementService.createObjectAccess(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('createObjectAccess() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
        accountIdentifier: accountId,
      };

      await catalogManagementServiceNotAuthorized.createObjectAccess(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('createObjectAccess()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accountIdentifier: accountId,
    };

    const res = await catalogManagementService.createObjectAccess(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getObjectAccessList() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.getObjectAccessList(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('getObjectAccessList() returns 200 when no such object', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: `${objectId}cc`,
    };

    const res = await catalogManagementService.getObjectAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObjectAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.getObjectAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObjectAccess() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
        accountIdentifier: accountId,
      };

      await catalogManagementService.getObjectAccess(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('getObjectAccess() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
        accountIdentifier: accountId,
      };

      await catalogManagementServiceNotAuthorized.getObjectAccess(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('getObjectAccess()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accountIdentifier: accountId,
    };

    const res = await catalogManagementService.getObjectAccess(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('addObjectAccessList() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
        accounts: [accountId],
      };

      await catalogManagementService.addObjectAccessList(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('addObjectAccessList() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
        accounts: [accountId],
      };

      await catalogManagementServiceNotAuthorized.addObjectAccessList(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('addObjectAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accounts: [accountId],
    };

    const res = await catalogManagementService.addObjectAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createOfferingInstance() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenAuthorized,
        id: 'offering-created-by-node-sdk',
        catalogId,
        offeringId,
        kindFormat: 'bogus-kind',
        version: '0.0.3',
        clusterId,
        clusterRegion: regionUsSouth,
        clusterNamespaces: ['node-sdk'],
      };

      await catalogManagementService.createOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('createOfferingInstance() returns 404 when no such resource', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenAuthorized,
        id: 'offering-created-by-node-sdk',
        catalogId: `${catalogId}cc`,
        offeringId,
        kindFormat: kindOperator,
        version: '0.0.3',
        clusterId,
        clusterRegion: regionUsSouth,
        clusterNamespaces: ['node-sdk'],
      };

      await catalogManagementService.createOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('createOfferingInstance() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenNotAuthorized,
        id: 'offering-created-by-node-sdk',
        catalogId,
        offeringId,
        kindFormat: kindOperator,
        version: '0.0.3',
        clusterId,
        clusterRegion: regionUsSouth,
        clusterNamespaces: ['node-sdk'],
      };

      await catalogManagementServiceNotAuthorized.createOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('createOfferingInstance()', async () => {
    const params = {
      xAuthRefreshToken: refreshTokenAuthorized,
      id: 'offering-created-by-node-sdk',
      catalogId,
      offeringId,
      kindFormat: kindOperator,
      version: '0.0.3',
      clusterId,
      clusterRegion: regionUsSouth,
      clusterNamespaces: ['node-sdk'],
    };

    const res = await catalogManagementService.createOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getOfferingInstance() returns 404 when no such offering instance', async () => {
    try {
      const params = {
        instanceIdentifier: 'offering-instance-id',
      };

      await catalogManagementService.getOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test.skip('getOfferingInstance()', async () => {
    const params = {
      instanceIdentifier: 'offering-instance-id',
    };

    const res = await catalogManagementService.getOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('putOfferingInstance() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        instanceIdentifier: 'offering-instance-id',
        xAuthRefreshToken: refreshTokenAuthorized,
        id: 'offering-instance-id',
        catalogId,
        offeringId,
        kindFormat: 'bogus-kind',
        version: '0.0.4',
        clusterId,
        clusterRegion: regionUsSouth,
      };

      await catalogManagementService.putOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('putOfferingInstance() returns 404 when no such resource', async () => {
    try {
      const params = {
        instanceIdentifier: 'offering-instance-id',
        xAuthRefreshToken: refreshTokenAuthorized,
        id: 'offering-instance-id',
        catalogId,
        offeringId,
        kindFormat: kindOperator,
        version: '0.0.4',
        clusterId,
        clusterRegion: regionUsSouth,
      };

      await catalogManagementService.putOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test.skip('putOfferingInstance() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        instanceIdentifier: 'offering-instance-id',
        xAuthRefreshToken: refreshTokenNotAuthorized,
        id: 'offering-instance-id',
        catalogId,
        offeringId,
        kindFormat: kindOperator,
        version: '0.0.4',
        clusterId,
        clusterRegion: regionUsSouth,
      };

      await catalogManagementServiceNotAuthorized.putOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('putOfferingInstance()', async () => {
    const params = {
      instanceIdentifier: 'offering-instance-id',
      xAuthRefreshToken: refreshTokenAuthorized,
      id: 'offering-instance-id',
      catalogId,
      offeringId,
      kindFormat: 'bogus-kind',
      version: '0.0.4',
      clusterId,
      clusterRegion: regionUsSouth,
    };

    const res = await catalogManagementService.putOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteVersion() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        versionLocId: bogusVersionLocatorId,
      };

      await catalogManagementService.deleteVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('deleteVersion() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        versionLocId: versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.deleteVersion(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('deleteVersion()', async () => {
    const params = {
      versionLocId: versionLocatorId,
    };

    const res = await catalogManagementService.deleteVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteOperators() returns 400 when backend input validation fails', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId: bogusVersionLocatorId,
      };

      await catalogManagementService.deleteOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('deleteOperators() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        xAuthRefreshToken: refreshTokenAuthorized,
        clusterId,
        region: regionUsSouth,
        versionLocatorId,
      };

      await catalogManagementServiceNotAuthorized.deleteOperators(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('deleteOperators()', async () => {
    const params = {
      xAuthRefreshToken: refreshTokenAuthorized,
      clusterId,
      region: regionUsSouth,
      versionLocatorId,
    };

    const res = await catalogManagementService.deleteOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteOfferingInstance() returns 404 when no such offering instance', async () => {
    try {
      const params = {
        instanceIdentifier: 'offering-instance-id',
        xAuthRefreshToken: refreshTokenAuthorized,
      };

      await catalogManagementService.deleteOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test.skip('deleteOfferingInstance() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        instanceIdentifier: 'offering-instance-id',
        xAuthRefreshToken: refreshTokenNotAuthorized,
      };

      await catalogManagementServiceNotAuthorized.deleteOfferingInstance(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('deleteOfferingInstance()', async () => {
    const params = {
      instanceIdentifier: 'offering-instance-id',
      xAuthRefreshToken: refreshTokenAuthorized,
    };

    const res = await catalogManagementService.deleteOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteObjectAccessList() returns 404 when no such resource', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
        accounts: [accountId],
      };

      await catalogManagementService.deleteObjectAccessList(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('deleteObjectAccessList() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
        accounts: [accountId],
      };

      await catalogManagementServiceNotAuthorized.deleteObjectAccessList(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('deleteObjectAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accounts: [accountId],
    };

    const res = await catalogManagementService.deleteObjectAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteObjectAccess() returns 404 when no such object', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: `${objectId}cc`,
        accountIdentifier: accountId,
      };

      await catalogManagementService.deleteObjectAccess(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(404);
    }
  });

  test('deleteObjectAccess() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
        accountIdentifier: accountId,
      };

      await catalogManagementServiceNotAuthorized.deleteObjectAccess(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('deleteObjectAccess()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
      accountIdentifier: accountId,
    };

    const res = await catalogManagementService.deleteObjectAccess(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteObject() returns 200 when no such object', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: `${objectId}a`,
    };

    const res = await catalogManagementService.deleteObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
  });

  test('deleteObject() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementServiceNotAuthorized.deleteObject(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('deleteObject()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      objectIdentifier: objectId,
    };

    const res = await catalogManagementService.deleteObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteOffering() returns 403 when user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
      };

      await catalogManagementServiceNotAuthorized.deleteOffering(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test('deleteOffering() returns 200 when no such offering', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId: 'bogus-offering-id',
    };

    await catalogManagementService.deleteOffering(params);
  });

  test('deleteOffering()', async () => {
    const params = {
      catalogIdentifier: catalogId,
      offeringId,
    };

    await catalogManagementService.deleteOffering(params);
  });

  test('deleteCatalog() returns 403 when the user is not authorized', async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
      };

      await catalogManagementServiceNotAuthorized.deleteCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(403);
    }
  });

  test.skip('deleteCatalog() returns 400 when no such catalog', async () => {
    try {
      const params = {
        catalogIdentifier: `${catalogId}cc`,
      };

      await catalogManagementService.deleteCatalog(params);
      expect(true).toBeFalsy();
    } catch (e) {
      expect(e.status).toBe(400);
    }
  });

  test('deleteCatalog()', async () => {
    const params = {
      catalogIdentifier: catalogId,
    };

    const res = await catalogManagementService.deleteCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    try {
      const params = {
        catalogIdentifier: catalogId,
        objectIdentifier: objectId,
      };

      await catalogManagementService.deleteObject(params);
    } catch (e) {
      console.log('Cleanup: Object is already deleted.');
    }

    try {
      const params = {
        catalogIdentifier: catalogId,
        offeringId,
      };

      await catalogManagementService.deleteOffering(params);
    } catch (e) {
      console.log('Cleanup: Offering is already deleted.');
    }

    try {
      const params = {
        catalogIdentifier: catalogId,
      };

      await catalogManagementService.deleteCatalog(params);
    } catch (e) {
      console.log('Cleanup: Catalog is already deleted.');
    }
  });
});
