/* eslint-disable no-console */
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

const GlobalCatalogV1 = require('../../dist/global-catalog/v1');
const authHelper = require('../resources/auth-helper.js');

const timeout = 60000;
const configFile = 'global_catalog.env';
const describe = authHelper.prepareTests(configFile);

let fetchedEntry = {};
const artifactId = 'someArtifactId.json';

describe('GlobalCatalogV1_integration', () => {
  jest.setTimeout(timeout);

  let service;

  const timestamp = Math.floor(new Date() / 1000);

  const forceDelete = {
    'id': `someId${timestamp}`,
    'force': true,
  };

  const defaultEntry = {
    'name': `someName${timestamp}`,
    'id': `someId${timestamp}`,
    'active': false,
    'kind': 'service',
    'disabled': false,
    'tags': ['a', 'b', 'c', 'support_ibm'],
    'overviewUi': {
      'en': {
        'display_name': 'display',
        'long_description': 'longDesc',
        'description': 'desc',
      },
    },
    'images': {
      'image': 'image',
      'small_image': 'small',
      'medium_image': 'medium',
      'feature_image': 'feature',
    },
    'provider': {
      'email': 'bogus@us.ibm.com',
      'name': 'someName',
    },
    'metadata': {
      'pricing': {
        'origin': 'global_catalog',
      },
    },
  };

  const defaultChildEntry = {
    'name': `someChildName${timestamp}`,
    'id': `someChildId${timestamp}`,
    'parentId': defaultEntry.id,
    'active': false,
    'kind': 'service',
    'disabled': false,
    'tags': ['a', 'b', 'c', 'support_ibm'],
    'overviewUi': {
      'en': {
        'display_name': 'display',
        'long_description': 'longDesc',
        'description': 'desc',
      },
    },
    'images': {
      'image': 'image',
      'small_image': 'small',
      'medium_image': 'medium',
      'feature_image': 'feature',
    },
    'provider': {
      'email': 'bogus@us.ibm.com',
      'name': 'someName',
    },
  };

  const updatedEntry = {
    'name': `someNameUpdated${timestamp}`,
    'id': `someId${timestamp}`,
    'active': false,
    'kind': 'template',
    'disabled': false,
    'tags': ['x', 'y', 'z'], // tags are case-sensitive
    'overviewUi': {
      'en': {
        'display_name': 'displayUpdated',
        'long_description': 'longDescUpdated',
        'description': 'descUpdated',
      },
    },
    'images': {
      'image': 'imageUpdated',
      'small_image': 'smallUpdated',
      'medium_image': 'mediumUpdated',
      'feature_image': 'featureUpdated',
    },
    'provider': {
      'email': 'bogus@us.ibm.com',
      'name': 'someNameUpdated',
    },
  };

  beforeAll(() => {
    service = GlobalCatalogV1.newInstance();
  });

  beforeEach(async () => {
    await service.deleteCatalogEntry(forceDelete);
  });

  afterEach(async () => {
    await service.deleteCatalogEntry(forceDelete);
  });

  test('Create catalog entry', async () => {
    let response;

    try {
      response = await service.createCatalogEntry(defaultEntry);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(201);

    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.id).toEqual(defaultEntry.id);
    expect(result.name).toEqual(defaultEntry.name);
    expect(result.kind).toEqual(defaultEntry.kind);
    expect(result.images).toEqual(defaultEntry.images);
    expect(result.disabled).toEqual(defaultEntry.disabled);
    expect(result.tags).toEqual(defaultEntry.tags);
    expect(result.provider).toEqual(defaultEntry.provider);
  });

  test('Get catalog entry', async () => {
    let response;

    try {
      await service.createCatalogEntry(defaultEntry);
      response = await service.getCatalogEntry({ id: defaultEntry.id, complete: true });
      fetchedEntry = response.result;
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.id).toEqual(defaultEntry.id);
    expect(result.name).toEqual(defaultEntry.name);
    expect(result.overview_ui).toEqual(defaultEntry.overviewUi);
    expect(result.kind).toEqual(defaultEntry.kind);
    expect(result.images).toEqual(defaultEntry.images);
    expect(result.disabled).toEqual(defaultEntry.disabled);
    expect(result.tags).toEqual(defaultEntry.tags);
    expect(result.provider).toEqual(defaultEntry.provider);
  });

  test('Update catalog entry', async () => {
    let response;

    try {
      await service.createCatalogEntry(defaultEntry);
      response = await service.updateCatalogEntry({ ...updatedEntry, url: fetchedEntry.url });
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.id).toEqual(updatedEntry.id);
    expect(result.name).toEqual(updatedEntry.name);
    expect(result.overview_ui).toEqual(updatedEntry.overviewUi);
    expect(result.kind).toEqual(updatedEntry.kind);
    expect(result.images).toEqual(updatedEntry.images);
    expect(result.disabled).toEqual(updatedEntry.disabled);
    expect(result.tags).toEqual(updatedEntry.tags);
    expect(result.provider).toEqual(updatedEntry.provider);
  });

  test('Delete catalog entry', async () => {
    let response;

    try {
      await service.createCatalogEntry(defaultEntry);
      response = await service.deleteCatalogEntry(forceDelete);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
  });

  test('Fail to get catalog entry after deletion', async () => {
    expect.assertions(1);

    try {
      await service.createCatalogEntry(defaultEntry);
      await service.deleteCatalogEntry(forceDelete);
    } catch (err) {
      console.warn(err);
    }

    try {
      await service.getCatalogEntry({ id: defaultEntry.id, complete: true });
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Fail to get catalog entry that does not exist', async () => {
    expect.assertions(1);

    try {
      const args = { 'id': 'bogus' };
      await service.getCatalogEntry(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Fail to delete catalog entry that does not exist', async () => {
    let response;

    try {
      const args = { 'id': 'bogus' };
      response = await service.deleteCatalogEntry(args);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
  });

  test('Fail to update catalog entry that does not exist', async () => {
    expect.assertions(1);

    try {
      await service.getCatalogEntry({ id: updatedEntry.id, complete: true });
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Fail to create catalog entry that already exists', async () => {
    expect.assertions(1);

    try {
      await service.createCatalogEntry(defaultEntry);
    } catch (err) {
      console.warn(err);
    }

    try {
      await service.createCatalogEntry(defaultEntry);
    } catch (err) {
      expect(err.status).toEqual(409);
    }
  });

  test('List catalog entry', async () => {
    let response;

    try {
      response = await service.listCatalogEntries();
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();

    const { resources } = result || {};
    expect(resources).toBeDefined();
    expect(resources.length).toBeGreaterThan(0);
  });

  test('Get child catalog entry', async () => {
    let response;

    try {
      await service.createCatalogEntry(defaultEntry);
      await service.createCatalogEntry(defaultChildEntry);
      response = await service.getChildObjects({
        id: defaultEntry.id,
        kind: defaultChildEntry.kind,
      });
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.offset).toEqual(0);
    expect(result.count).toEqual(1);
    expect(result.resource_count).toEqual(1);

    const { resources } = result || {};
    expect(resources).toBeDefined();
    expect(resources).toHaveLength(1);
    expect(resources[0].id).toEqual(defaultChildEntry.id);
    expect(resources[0].name).toEqual(defaultChildEntry.name);
    expect(resources[0].active).toEqual(defaultChildEntry.active);
    expect(resources[0].disabled).toEqual(defaultChildEntry.disabled);
    expect(resources[0].kind).toEqual(defaultChildEntry.kind);
    expect(resources[0].images).toEqual(defaultChildEntry.images);
    expect(resources[0].disabled).toEqual(defaultChildEntry.disabled);
    expect(resources[0].tags).toEqual(defaultChildEntry.tags);
    expect(resources[0].provider).toEqual(defaultChildEntry.provider);
  });

  test('Fail to get child catalog entry that does not exist', async () => {
    expect.assertions(1);
    try {
      const args = { 'id': 'bogus', 'kind': 'bogus' };
      await service.getChildObjects({
        id: args.id,
        kind: args.kind,
      });
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Restore catalog entry', async () => {
    let response;

    try {
      await service.createCatalogEntry(defaultEntry);
      await service.deleteCatalogEntry({ id: defaultEntry });
      response = await service.restoreCatalogEntry({ id: defaultEntry.id });
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    try {
      response = await service.getCatalogEntry({ id: defaultEntry.id, complete: true });
    } catch (err) {
      console.log(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.id).toEqual(defaultEntry.id);
    expect(result.name).toEqual(defaultEntry.name);
    expect(result.overview_ui).toEqual(defaultEntry.overviewUi);
    expect(result.kind).toEqual(defaultEntry.kind);
    expect(result.images).toEqual(defaultEntry.images);
    expect(result.disabled).toEqual(defaultEntry.disabled);
    expect(result.tags).toEqual(defaultEntry.tags);
    expect(result.provider).toEqual(defaultEntry.provider);
  });

  test('Fail to restore catalog entry that does not exist', async () => {
    expect.assertions(1);

    try {
      const args = { 'id': 'bogus' };
      await service.getCatalogEntry(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Fail to get visibility for catalog entry that does not exist', async () => {
    expect.assertions(1);
    try {
      const args = { 'id': 'bogus' };
      await service.getVisibility(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Update catalog entry visibility', async () => {
    expect.assertions(1);

    let response;

    try {
      await service.createCatalogEntry(defaultEntry);
    } catch (err) {
      console.warn(err);
    }

    try {
      response = await service.updateVisibility({ id: defaultEntry.id, restrictions: 'private' });
    } catch (err) {
      expect(err.status).toEqual(403);
    }

    expect(response).toBeDefined();
  });

  test('Get catalog entry visibility', async () => {
    let response;

    try {
      await service.createCatalogEntry(defaultEntry);
      response = await service.getVisibility({ id: defaultEntry.id });
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.restrictions).toBeDefined();
  });

  test('Fail to update visibility for catalog entry that does not exist', async () => {
    expect.assertions(1);

    try {
      const args = { 'id': 'bogus' };
      await service.updateVisibility(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Fail to get catalog entry pricing', async () => {
    expect.assertions(1);

    try {
      await service.createCatalogEntry(defaultEntry);
    } catch (err) {
      console.warn(err);
    }

    try {
      await service.getPricing({ id: defaultEntry.id });
    } catch (err) {
      expect(err.status).toEqual(404);
    }

    try {
      const args = { 'id': 'bogus' };
      await service.getPricing(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('List catalog entry artifacts', async () => {
    let response;

    const args = {
      'objectId': defaultEntry.id,
      'artifactId': artifactId,
      'artifact': {
        'someKey': 'someValue',
      },
    };

    try {
      await service.createCatalogEntry(defaultEntry);
      await service.uploadArtifact(args);
      response = await service.listArtifacts({ objectId: args });
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
  });

  test('Fail to list catalog entry artifacts', async () => {
    let response;

    try {
      const args = { 'objectId': 'bogus' };
      response = await service.listArtifacts(args);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
    expect(result.count).toEqual(0);
  });

  test('Get catalog entry artifact', async () => {
    let response;

    const args = {
      'objectId': defaultEntry.id,
      'artifactId': artifactId,
      'artifact': {
        'someKey': 'someValue',
      },
    };

    try {
      await service.createCatalogEntry(defaultEntry);
      await service.uploadArtifact(args);
      response = await service.getArtifact({
        objectId: args.objectId,
        artifactId: args.artifactId,
      });
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
    // expect(JSON.parse(result.read().toString())).toEqual(defaultEntry.artifact);
  });

  test('Fail to get catalog entry artifact', async () => {
    expect.assertions(2);

    try {
      await service.createCatalogEntry(defaultEntry);
    } catch (err) {
      console.log(err);
    }

    try {
      const args = { 'objectId': defaultEntry.id, 'artifactId': 'bogus' };
      await service.getArtifact(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }

    try {
      const args = { 'objectId': 'bogus', 'artifactId': 'bogus' };
      await service.getArtifact(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Create catalog entry artifact', async () => {
    let response;

    const args = {
      'objectId': defaultEntry.id,
      'artifactId': artifactId,
      'artifact': {
        'someKey': 'someValue',
      },
    };

    try {
      await service.createCatalogEntry(defaultEntry);
      response = await service.uploadArtifact(args);
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
  });

  test('Fail to create catalog entry artifact', async () => {
    expect.assertions(1);

    const args = {
      'objectId': 'bogus',
      'artifactId': 'bogus',
      'artifact': {
        'someKey': 'someValue',
      },
    };

    try {
      await service.uploadArtifact(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('Delete catalog entry artifact', async () => {
    let response;

    const args = {
      'objectId': defaultEntry.id,
      'artifactId': artifactId,
      'artifact': {
        'someKey': 'someValue',
      },
    };

    try {
      await service.createCatalogEntry(defaultEntry);
      await service.uploadArtifact(args);
      response = await service.deleteArtifact({
        objectId: args.objectId,
        artifactId: args.artifactId,
      });
    } catch (err) {
      console.warn(err);
    }

    expect(response).toBeDefined();
    expect(response.status).toEqual(200);

    const { result } = response || {};
    expect(result).toBeDefined();
  });

  test('Fail to delete catalog entry artifact', async () => {
    expect.assertions(1);

    try {
      const args = { 'objectId': 'bogus', 'artifactId': 'bogus' };
      await service.deleteArtifact(args);
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });
});
