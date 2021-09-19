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
const ContextBasedRestrictionsV1 = require('../../dist/context-based-restrictions/v1');

const authHelper = require('../resources/auth-helper.js');
// const { doesNotReject } = require('assert');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'context_based_restrictions_v1.env';

const describe = authHelper.prepareTests(configFile);

let zoneId;
let zoneEtag;
let ruleId;
let ruleEtag;

describe('ContextBasedRestrictionsV1_integration', () => {
  const contextBasedRestrictionsService = ContextBasedRestrictionsV1.newInstance({});

  expect(contextBasedRestrictionsService).not.toBeNull();

  const config = readExternalSources(ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME);
  const { apikey: apiKey, url: URL, authUrl, authType, accountid: accountId, serviceName } = config;

  expect(config).not.toBeNull();
  expect(accountId).not.toBeNull();
  expect(accountId).toBeDefined();
  expect(apiKey).not.toBeNull();
  expect(apiKey).toBeDefined();
  expect(URL).not.toBeNull();
  expect(URL).toBeDefined();
  expect(authUrl).not.toBeNull();
  expect(authUrl).toBeDefined();
  expect(authType).not.toBeNull();
  expect(authType).toBeDefined();
  expect(serviceName).not.toBeNull();
  expect(serviceName).toBeDefined();

  jest.setTimeout(timeout);

  contextBasedRestrictionsService.enableRetries();

  test('createZone() - 201', async (done) => {
    // Request models needed by this operation.

    // AddressIPAddress
    const addressModel = {
      type: 'ipAddress',
      value: '169.23.56.234',
    };

    const params = {
      name: 'an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'this is an example of zone',
      // excluded: [addressModel],
      transactionId: 'testString',
    };

    let res;
    try {
      res = await contextBasedRestrictionsService.createZone(params);
    } catch (err) {
      done(err);
    }

    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();

    zoneId = res.result.id;
    zoneEtag = res.headers.etag;

    done();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 403
    // 409
    // 429
    // 503
    //
  });

  test('createZone() - 400', async () => {
    // Request models needed by this operation.

    // AddressIPAddress
    const addressModel = {
      type: 'invalideType',
      value: '169.23.56.234',
    };

    const params = {
      name: 'an zone with invalid type',
      accountId,
      addresses: [addressModel],
      description: 'this is an example of zone with invalid type',
      transactionId: 'testString',
    };

    await expect(contextBasedRestrictionsService.createZone(params)).rejects.toMatchObject({
      status: 400,
    });
  });

  test('listZones() - 200', async () => {
    const params = {
      accountId,
      // transactionId: 'testString',
      // name: 'testString',
      // sort: 'testString',
    };

    const res = await contextBasedRestrictionsService.listZones(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 403
    // 429
    // 503
    //
  });

  test('getZone() - 200', async () => {
    const params = {
      zoneId,
      // transactionId: 'testString',
    };

    const res = await contextBasedRestrictionsService.getZone(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 403
    // 404
    // 429
    // 503
    //
  });

  test('replaceZone() - 200', async () => {
    // Request models needed by this operation.

    // AddressIPAddress
    const addressModel = {
      type: 'ipAddress',
      value: '169.24.57.235',
    };

    const params = {
      zoneId,
      ifMatch: zoneEtag,
      name: 'an example of updated zone',
      accountId,
      addresses: [addressModel],
      description: 'this is an example of updated zone',
      // excluded: [addressModel],
      // transactionId: 'testString',
    };

    const res = await contextBasedRestrictionsService.replaceZone(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 403
    // 404
    // 429
    // 503
    //
  });

  test('listAvailableServicerefTargets() - 200', async () => {
    const params = {
      type: 'all',
    };

    const res = await contextBasedRestrictionsService.listAvailableServicerefTargets(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 429
    // 503
    //
  });

  test('createRule() - 201', async (done) => {
    // Request models needed by this operation.

    // RuleContextAttribute
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    // RuleContext
    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    // ResourceAttribute
    const resourceAttributeAccountIdModel = {
      name: 'accountId',
      value: accountId,
      operator: 'stringEquals',
    };

    const resourceAttributeServiceNameModel = {
      name: 'serviceName',
      value: serviceName,
      operator: 'stringEquals',
    };

    // ResourceTagAttribute
    const resourceTagAttributeModel = {
      name: 'aTagName',
      value: 'aTagValue',
      operator: 'stringEquals',
    };

    // Resource
    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'this is an example of rule',
      // transactionId: 'testString',
    };

    let res;
    try {
      res = await contextBasedRestrictionsService.createRule(params);
    } catch (err) {
      done(err);
    }

    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();

    ruleId = res.result.id;
    ruleEtag = res.headers.etag;

    done();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 403
    // 429
    // 503
    //
  });

  test('listRules() - 200', async () => {
    const params = {
      accountId,
      // transactionId: 'testString',
      // region: 'testString',
      // resource: 'testString',
      // resourceType: 'testString',
      // serviceInstance: 'testString',
      // serviceName: 'testString',
      // serviceType: 'testString',
      // zoneId: 'testString',
      // sort: 'testString',
    };

    const res = await contextBasedRestrictionsService.listRules(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 403
    // 429
    // 503
    //
  });

  test('getRule() - 200', async () => {
    const params = {
      ruleId,
      // transactionId: 'testString',
    };

    const res = await contextBasedRestrictionsService.getRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 403
    // 404
    // 429
    // 503
    //
  });

  test('replaceRule() - 200', async () => {
    // Request models needed by this operation.

    // RuleContextAttribute
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    // RuleContext
    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    // ResourceAttribute
    const resourceAttributeAccountIdModel = {
      name: 'accountId',
      value: accountId,
      operator: 'stringEquals',
    };

    const resourceAttributeServiceNameModel = {
      name: 'serviceName',
      value: serviceName,
      operator: 'stringEquals',
    };

    // ResourceTagAttribute
    const resourceTagAttributeModel = {
      name: 'TagName-2',
      value: 'aTagValue-2',
      operator: 'stringEquals',
    };

    // Resource
    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      ruleId,
      ifMatch: ruleEtag,
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'this is an example of updated rule',
      // transactionId: 'testString',
    };

    const res = await contextBasedRestrictionsService.replaceRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 403
    // 404
    // 429
    // 503
    //
  });

  test('getAccountSettings()', async () => {
    const params = {
      accountId,
      // transactionId: 'testString',
    };

    const res = await contextBasedRestrictionsService.getAccountSettings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 403
    // 429
    // 503
    //
  });

  test('deleteRule() - 204', async () => {
    const params = {
      ruleId,
      // transactionId: 'testString',
    };

    const res = await contextBasedRestrictionsService.deleteRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 403
    // 404
    // 429
    // 503
    //
  });

  test('deleteZone() - 204', async () => {
    const params = {
      zoneId,
      // transactionId: 'testString',
    };

    const res = await contextBasedRestrictionsService.deleteZone(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 403
    // 404
    // 429
    // 503
    //
  });
});
