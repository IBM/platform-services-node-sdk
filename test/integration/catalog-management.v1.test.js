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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const CatalogManagementV1 = require('../../dist/catalog-management/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'catalog_management_v1.env';

const describe = authHelper.prepareTests(configFile);

function genRandonString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charLength = chars.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

describe('CatalogManagementV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let catalogManagementService;
  let catalogManagementAdminService;
  let approverToken;
  let token;

  // Variables to hold link values
  let catalogIdLink;
  let objectCatalogIdLink;
  let objectIdLink;
  let offeringIdLink;
  let offeringRevLink;
  let versionLocatorLink;
  let planID;

  const zipurl = 'https://github.com/IBM-Cloud/terraform-sample/archive/refs/tags/v1.1.0.tar.gz';
  const zipurlSolution =
    'https://github.com/IBM-Cloud/terraform-sample/archive/refs/tags/v1.0.0.tar.gz';
  const objectName = genRandonString(15);

  test('Initialize service', async () => {
    catalogManagementService = CatalogManagementV1.newInstance();
    catalogManagementAdminService = CatalogManagementV1.newInstance({
      serviceName: 'CATALOG_MANAGEMENT_APPROVER',
    });

    const auth = catalogManagementService.getAuthenticator();
    const { tokenManager } = auth;
    const requestToken = await tokenManager.requestToken();
    token = requestToken.result.access_token;

    const adminAuth = catalogManagementAdminService.getAuthenticator();
    const adminTokenManager = adminAuth.tokenManager;
    const adminRequestToken = await adminTokenManager.requestToken();
    approverToken = adminRequestToken.result.access_token;

    expect(catalogManagementService).not.toBeNull();
    expect(catalogManagementAdminService).not.toBeNull();
    expect(token).not.toBeNull();
    expect(approverToken).not.toBeNull();

    const config = readExternalSources(CatalogManagementV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    catalogManagementService.enableRetries();
  });

  test('getCatalogAccount()', async () => {
    const res = await catalogManagementService.getCatalogAccount();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createCatalog()', async () => {
    // Request models needed by this operation.

    const params = {
      label: 'testString',
      kind: 'offering',
    };

    const res = await catalogManagementService.createCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    catalogIdLink = res.result.id;
  });

  test('getCatalog()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
    };

    const res = await catalogManagementService.getCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('importOffering()', async () => {
    // Request models needed by this operation.

    const params = {
      catalogIdentifier: catalogIdLink,
      zipurl,
      targetVersion: '1.0.0',
    };

    const res = await catalogManagementService.importOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    offeringIdLink = res.result.id;
    versionLocatorLink = res.result.kinds[0].versions[0].version_locator;
  });

  test('importOfferingVersion()', async () => {
    // Request models needed by this operation.

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      zipurl,
      targetVersion: '1.0.1',
    };

    const res = await catalogManagementService.importOfferingVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    offeringIdLink = res.result.id;
    offeringRevLink = res.result._rev;
  });

  // Set allow publish offering
  test('setAllowPublishOffering request example', async () => {
    const headers = {
      'X-Approver-Token': approverToken,
    };

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
    const res = await response.json();
    expect(res).toBeDefined();
    expect(response.status).toBe(200);
  });

  // add plan
  test('addPlan 1 request example', async () => {
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
    const res = await response.json();
    expect(res).toBeDefined();
    expect(response.status).toBe(201);

    planID = res.id;
  });

  // delete plan
  test('deletePlan request example', async () => {
    const params = {
      planLocId: planID,
    };

    const res = await catalogManagementService.deletePlan(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  // add plan 2
  test('addPlan 2 request example', async () => {
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
    const res = await response.json();
    expect(res).toBeDefined();
    expect(response.status).toBe(201);

    planID = res.id;
  });

  // set validate plan
  test('setValidatePlan request example', async () => {
    const headers = {
      'X-Approver-Token': approverToken,
    };

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
    const res = await response.json();
    expect(res).toBeDefined();
    expect(response.status).toBe(202);
  });

  // set allow publish plan
  test('setAllowPublishPlan request example', async () => {
    const headers = {
      'X-Approver-Token': approverToken,
    };

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
    const res = await response.json();
    expect(res).toBeDefined();
    expect(response.status).toBe(200);
  });

  // get plan
  test('getPlan request example', async () => {
    const params = {
      planLocId: planID,
    };

    const res = await catalogManagementService.getPlan(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  // consumable plan
  test('consumablePlan request example', async () => {
    const params = {
      planLocId: planID,
    };

    const res = await catalogManagementService.consumablePlan(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  // set deprecate plan
  test('setDeprecatePlan request example', async () => {
    const params = {
      planLocId: planID,
      setting: true,
    };

    const res = await catalogManagementService.setDeprecatePlan(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('importOfferingAsSolution()', async () => {
    // Request models needed by this operation.

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

    const res = await catalogManagementService.importOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getOffering()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
    };

    const res = await catalogManagementService.getOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    offeringIdLink = res.result.id;
    offeringRevLink = res.result._rev;
  });

  test('updateOffering()', async () => {
    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'replace',
      path: '/label',
      value: 'testString',
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      ifMatch: `"${offeringRevLink}"`,
      updates: [jsonPatchOperationModel],
    };

    console.log('params: ', JSON.stringify(params));

    const res = await catalogManagementService.updateOffering(params);

    console.log('res: ', JSON.stringify(res.result));
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('reloadOffering()', async () => {
    // Request models needed by this operation.

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      targetVersion: '1.0.0',
      zipurl,
    };

    const res = await catalogManagementService.reloadOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createOffering()', async () => {
    // Request models needed by this operation.

    const params = {
      catalogIdentifier: catalogIdLink,
    };

    const res = await catalogManagementService.createOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createObjectCatalog()', async () => {
    // Request models needed by this operation.

    const params = {
      label: 'testString',
      kind: 'vpe',
    };

    const res = await catalogManagementService.createCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    objectCatalogIdLink = res.result.id;
  });

  test('createObject()', async () => {
    // Request models needed by this operation.

    const params = {
      catalogIdentifier: objectCatalogIdLink,
      name: objectName,
      parentId: 'us-south',
      kind: 'vpe',
      catalogId: objectCatalogIdLink,
    };

    const res = await catalogManagementService.createObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    objectIdLink = res.result.id;
  });

  test('getObject()', async () => {
    const params = {
      catalogIdentifier: objectCatalogIdLink,
      objectIdentifier: objectIdLink,
    };

    const res = await catalogManagementService.getObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getCatalogAccountFilters()', async () => {
    const params = {
      catalog: catalogIdLink,
    };

    const res = await catalogManagementService.getCatalogAccountFilters(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getShareApprovalList()', async () => {
    const params = {
      objectType: 'offering',
    };

    const res = await catalogManagementService.getShareApprovalList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('addShareApprovalList()', async () => {
    const params = {
      objectType: 'offering',
      accesses: ['-acct-testString'],
    };

    const res = await catalogManagementService.addShareApprovalList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('deleteShareApprovalList()', async () => {
    const params = {
      objectType: 'offering',
      accesses: ['-acct-testString'],
    };

    const res = await catalogManagementService.deleteShareApprovalList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getShareApprovalListAsSource()', async () => {
    const params = {
      objectType: 'offering',
      approvalStateIdentifier: 'approved',
      limit: 100,
    };

    const res = await catalogManagementService.getShareApprovalListAsSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateShareApprovalListAsSource()', async () => {
    const params = {
      objectType: 'offering',
      approvalStateIdentifier: 'approved',
      accesses: ['-acct-testString'],
    };

    const res = await catalogManagementService.updateShareApprovalListAsSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingSourceArchive()', async () => {
    const params = {
      catalogId: catalogIdLink,
      id: offeringIdLink,
      version: '1.0.0',
    };

    const res = await catalogManagementService.getOfferingSourceArchive(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listCatalogs()', async () => {
    const res = await catalogManagementService.listCatalogs();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getConsumptionOfferings()', async () => {
    const params = {
      digest: true,
      catalog: catalogIdLink,
      select: 'all',
      includeHidden: true,
      limit: 100,
      offset: 0,
    };

    const res = await catalogManagementService.getConsumptionOfferings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getConsumptionOfferings() via GetConsumptionOfferingsPager', async () => {
    const params = {
      digest: true,
      catalog: catalogIdLink,
      select: 'all',
      includeHidden: true,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.GetConsumptionOfferingsPager(
      catalogManagementService,
      params
    );
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.GetConsumptionOfferingsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('listOfferings()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      digest: true,
      limit: 100,
      offset: 0,
      name: 'testString',
      includeHidden: true,
    };

    const res = await catalogManagementService.listOfferings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOfferings() via OfferingsPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      digest: true,
      limit: 10,
      name: 'testString',
      includeHidden: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.OfferingsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.OfferingsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getVersion()', async () => {
    const params = {
      versionLocId: versionLocatorLink,
    };

    const res = await catalogManagementService.getVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('searchObjects()', async () => {
    const params = {
      query: 'testString',
      kind: 'vpe',
      limit: 100,
      offset: 0,
      digest: true,
    };

    const res = await catalogManagementService.searchObjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('searchObjects() via SearchObjectsPager', async () => {
    const params = {
      query: 'testString',
      kind: 'vpe',
      limit: 10,
      digest: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.SearchObjectsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.SearchObjectsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('listObjects()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      limit: 100,
      offset: 0,
      name: 'testString',
    };

    const res = await catalogManagementService.listObjects(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listObjects() via ObjectsPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      limit: 10,
      name: 'testString',
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.ObjectsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.ObjectsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('deleteVersion()', async () => {
    const params = {
      versionLocId: versionLocatorLink,
    };

    const res = await catalogManagementService.deleteVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteOffering()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
    };

    const res = await catalogManagementService.deleteOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteObject()', async () => {
    const params = {
      catalogIdentifier: objectCatalogIdLink,
      objectIdentifier: objectIdLink,
    };

    const res = await catalogManagementService.deleteObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteCatalog()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
    };

    const res = await catalogManagementService.deleteCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteObjectCatalog()', async () => {
    const params = {
      catalogIdentifier: objectCatalogIdLink,
    };

    const res = await catalogManagementService.deleteCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
