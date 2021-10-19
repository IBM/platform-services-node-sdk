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
const { v4: uuidv4 } = require('uuid');
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
const unexistingZoneId = '648961210dab8fdffac52cc2f28e200f';
const unexistingRuleId = '648961210dab8fdffac52cc2f28e200f';
const invalidID = 'this_is_an_invalid_id';

describe('ContextBasedRestrictionsV1_integration', () => {
  let contextBasedRestrictionsService;
  let config;
  let apiKey;
  let url;
  let authUrl;
  let authType;
  let accountId;
  let serviceName;

  test('Init', async () => {
    contextBasedRestrictionsService = ContextBasedRestrictionsV1.newInstance({});

    expect(contextBasedRestrictionsService).not.toBeNull();

    config = readExternalSources(ContextBasedRestrictionsV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    apiKey = config.apikey;
    expect(apiKey).not.toBeNull();
    expect(apiKey).toBeDefined();

    url = config.url;
    expect(url).not.toBeNull();
    expect(url).toBeDefined();

    authUrl = config.authUrl;
    expect(authUrl).not.toBeNull();
    expect(authUrl).toBeDefined();

    authType = config.authType;
    expect(authType).not.toBeNull();
    expect(authType).toBeDefined();

    accountId = config.accountId;
    expect(accountId).not.toBeNull();
    expect(accountId).toBeDefined();

    serviceName = config.serviceName;
    expect(serviceName).not.toBeNull();
    expect(serviceName).toBeDefined();

    jest.setTimeout(timeout);

    contextBasedRestrictionsService.enableRetries();
  });

  test('createZone() - 201', async () => {
    const addressModel = {
      type: 'ipAddress',
      value: '169.23.56.234',
    };

    const params = {
      name: 'SDK TEST - an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of zone',
      transactionId: uuidv4(),
    };

    let res;
    try {
      res = await contextBasedRestrictionsService.createZone(params);
    } catch (err) {
      console.log(`An error occurred: `, JSON.stringify(err));
    }

    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();

    zoneId = res.result.id;
    zoneEtag = res.headers.etag;
  });

  test('createZone() - 400 -  Create a zone with "invalid ip address format" error', async () => {
    // The zone could not be created due to an invalid ip address format.

    const addressModel = {
      type: 'invalideType',
      value: '169.23.56.234.',
    };

    const params = {
      name: 'SDK TEST - another example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is another example of zone',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.createZone(params)).rejects.toMatchObject({
      status: 400,
    });
  });

  test('createZone() - 409 - Create a zone with "duplicated name" error', async () => {
    // The zone could not be created due to an already existing zone with the same name.

    const addressModel = {
      type: 'ipAddress',
      value: '169.23.57.235',
    };

    const params = {
      name: 'SDK TEST - an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of zone',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.createZone(params)).rejects.toMatchObject({
      status: 409,
    });
  });

  test('listZones() - 200', async () => {
    const params = {
      accountId,
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.listZones(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listZones() - 400 - List zones with "invalid AccountID parameter" error', async () => {
    // The zones could not be retrieved due to an invalid accountId.

    const params = {
      accountId: invalidID,
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.listZones(params)).rejects.toMatchObject({
      status: 400,
    });
  });

  test('listZones() - 400 - List zones with "missing AccountID parameter" error', async () => {
    // The zones could not be retrieved due to missing accountId.

    const params = {
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.listZones(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: accountId',
    });
  });

  test('getZone() - 200 - Get the specified zone', async () => {
    const params = {
      zoneId,
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.getZone(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getZone() - 400 - Get zone with "missing required ZoneID parameter" error', async () => {
    // The zone could not be found due to missing zone ID.

    const params = {
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.getZone(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: zoneId',
    });
  });

  test('getZone() - 404 - Get zone with "zone not found" error', async () => {
    // The zone could not be found due to unexisting zone ID.

    const params = {
      zoneId: unexistingZoneId,
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.getZone(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('replaceZone() - 200 - Update the specified zone', async () => {
    const addressModel = {
      type: 'ipAddress',
      value: '169.24.57.235',
    };

    const params = {
      zoneId,
      ifMatch: zoneEtag,
      name: 'SDK TEST - an example of updated zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of updated zone',
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.replaceZone(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceZone() - 400 - invalid type: Address', async () => {
    // The zone could not be updated due to invalid type 'Address'.

    const addressModel = {
      type: 'Address',
      value: '169.24.57.235',
    };

    const params = {
      zoneId,
      ifMatch: zoneEtag,
      name: 'SDK TEST - an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of zone',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.replaceZone(params)).rejects.toMatchObject({
      status: 400,
    });
  });

  test('replaceZone() - 400 - Update zone with "Missing required parameters: ifMatch" error', async () => {
    // The zone could not be updated due to missing required parameter: ifMatch'.

    const addressModel = {
      type: 'ipAddress',
      value: '169.24.57.235',
    };

    const params = {
      zoneId,
      name: 'SDK TEST - an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of zone',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.replaceZone(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: ifMatch',
    });
  });

  test('replaceZone() - 404 - Update zone with "zone not found" error', async () => {
    // The zone could not be updated due to zone is not found.

    const addressModel = {
      type: 'ipAddress',
      value: '169.24.57.235',
    };

    const params = {
      zoneId: unexistingZoneId,
      ifMatch: zoneEtag,
      name: 'SDK TEST - an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of zone',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.replaceZone(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('replaceZone() - 412 - Update zone with "invalid IfMath parameter" error', async () => {
    // The zone could not be updated due to invalid IfMath parameter.

    const addressModel = {
      type: 'ipAddress',
      value: '169.24.57.235',
    };

    const params = {
      zoneId,
      ifMatch: 'abc',
      name: 'SDK TEST - an example of zone',
      accountId,
      addresses: [addressModel],
      description: 'SDK TEST - this is an example of zone',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.replaceZone(params)).rejects.toMatchObject({
      status: 412,
    });
  });

  test('listAvailableServicerefTargets() - 200 - List available service reference targets', async () => {
    const params = {
      type: 'all',
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.listAvailableServicerefTargets(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listAvailableServicerefTargets() - 400 - List available service reference targets with "invalid type parameter" error', async () => {
    // type value is not supported
    const params = {
      type: 'invalid-type',
      transactionId: uuidv4(),
    };

    await expect(
      contextBasedRestrictionsService.listAvailableServicerefTargets(params)
    ).rejects.toMatchObject({
      status: 400,
    });
  });

  test('createRule() - 201 - Create a rule', async () => {
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

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

    const resourceTagAttributeModel = {
      name: 'aTagName',
      value: 'aTagValue',
      operator: 'stringEquals',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of rule',
      transactionId: uuidv4(),
    };

    let res;
    try {
      res = await contextBasedRestrictionsService.createRule(params);
    } catch (err) {
      console.warn(err);
    }

    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();

    ruleId = res.result.id;
    ruleEtag = res.headers.etag;
  });

  test('createRule() - 400 - Create a rule with "service not cbr enabled" error', async () => {
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

    const resourceAttributeAccountIdModel = {
      name: 'accountId',
      value: accountId,
      operator: 'stringEquals',
    };

    const resourceAttributeServiceNameModel = {
      name: 'serviceName',
      value: 'cbr-not-enabled',
      operator: 'stringEquals',
    };

    const resourceTagAttributeModel = {
      name: 'aTagName',
      value: 'aTagValue',
      operator: 'stringEquals',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of rule',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.createRule(params)).rejects.toMatchObject({
      status: 400,
    });
  });

  test('listRules() - 200 - List rules', async () => {
    const params = {
      accountId,
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.listRules(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listRules() - 400 - List rules with "invalid AccountID parameter" error', async () => {
    // The rules could not be retrieved due to invalid accountId.

    const params = {
      accountId: invalidID,
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.listRules(params)).rejects.toMatchObject({
      status: 400,
    });
  });

  test('listRules() - 400 - List rules with "missing required AccountID parameter" error', async () => {
    // The rules could not be retrieved due to missing accountId.

    const params = {
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.listRules(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: accountId',
    });
  });

  test('getRule() - 200 - Get the specified rule', async () => {
    const params = {
      ruleId,
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.getRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getRule() - 404 - Get rule with "rule not found" error', async () => {
    // The rule could not be found due to unexisting rule ID .

    const params = {
      ruleId: unexistingRuleId,
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.getRule(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('getRule() - 400 - Get rule with "Missing required parameters: ruleId" error', async () => {
    // The rule could not be found due to missing ruleId .

    const params = {
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.getRule(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: ruleId',
    });
  });

  test('replaceRule() - 200 - Update the specified rule', async () => {
    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

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

    const resourceTagAttributeModel = {
      name: 'TagName-2',
      value: 'aTagValue-2',
      operator: 'stringEquals',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      ruleId,
      ifMatch: ruleEtag,
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of updated rule',
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.replaceRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceRule() - 400 - Update rule with "Missing required parameters: ifMatch" error', async () => {
    // The rule could not be found due to missing ifMatch.

    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

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

    const resourceTagAttributeModel = {
      name: 'TagName-2',
      value: 'aTagValue-2',
      operator: 'stringEquals',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      ruleId: unexistingRuleId,
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of rule',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.replaceRule(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: ifMatch',
    });
  });

  test('replaceRule() - 404 - Update rule with "rule not found" error', async () => {
    // The rule could not be found due to unexisting rule ID.

    const ruleContextAttributeModel = {
      name: 'networkZoneId',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

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

    const resourceTagAttributeModel = {
      name: 'TagName-2',
      value: 'aTagValue-2',
      operator: 'stringEquals',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      ruleId: unexistingRuleId,
      ifMatch: ruleEtag,
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of rule',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.replaceRule(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('replaceRule() - 412 - unsupported attribute name: networkZoneID', async () => {
    // The rule could not be updated due to unsupported attribute name 'networkZoneID'.

    const ruleContextAttributeModel = {
      name: 'networkZoneID',
      value: zoneId,
    };

    const ruleContextModel = {
      attributes: [ruleContextAttributeModel],
    };

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

    const resourceTagAttributeModel = {
      name: 'TagName-2',
      value: 'aTagValue-2',
      operator: 'stringEquals',
    };

    const resourceModel = {
      attributes: [resourceAttributeAccountIdModel, resourceAttributeServiceNameModel],
      tags: [resourceTagAttributeModel],
    };

    const params = {
      ruleId,
      ifMatch: ruleEtag,
      contexts: [ruleContextModel],
      resources: [resourceModel],
      description: 'SDK TEST - this is an example of rule',
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.replaceRule(params)).rejects.toMatchObject({
      status: 412,
    });
  });

  test('getAccountSettings() - 200 - Get the specified account settings', async () => {
    const params = {
      accountId,
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.getAccountSettings(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getAccountSettings() - 400 - Get account settings with "Missing required parameters: accountId" error', async () => {
    const params = {
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.getAccountSettings(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: accountId',
    });
  });

  test('getAccountSettings() - 400 - Get account settings with "invalid AccountID parameter" error', async () => {
    const params = {
      accountId: invalidID,
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.getAccountSettings(params)).rejects.toMatchObject({
      'message': 'The parameter "account_id" in path has an error.',
    });
  });

  test('deleteRule() - 400 - Delete rule with "Missing required parameters: ruleId" error', async () => {
    // The rule could not be deleted due to unexisting ruleId.
    const params = {
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.deleteRule(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: ruleId',
    });
  });

  test('deleteRule() - 404 - Delete rule with "rule not found" error', async () => {
    // The rule could not be deleted due to unexisting rule ID.
    const params = {
      ruleId: unexistingRuleId,
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.deleteRule(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('deleteRule() - 204 - Delete the specified zone', async () => {
    const params = {
      ruleId,
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.deleteRule(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });

  test('deleteZone() - 404 - Delete zone with "zone not found" error', async () => {
    // The zone could not be deleted due to unexisting zone ID.
    const params = {
      zoneId: unexistingZoneId,
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.deleteZone(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('deleteZone() - 404 - Delete zone with "Missing required parameters: zoneId" error', async () => {
    // The zone could not be deleted due to missing zone ID.
    const params = {
      transactionId: uuidv4(),
    };

    await expect(contextBasedRestrictionsService.deleteZone(params)).rejects.toMatchObject({
      'message': 'Missing required parameters: zoneId',
    });
  });

  test('deleteZone() - 204 - Delete the specified zone', async () => {
    const params = {
      zoneId,
      transactionId: uuidv4(),
    };

    const res = await contextBasedRestrictionsService.deleteZone(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();
  });
});
