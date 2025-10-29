/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2020, 2024.
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

const IamIdentityV1 = require('../dist/iam-identity/v1');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the IAM Identity service.
//
// The following configuration properties are assumed to be defined:
//
// IAM_IDENTITY_URL=<service url>
// IAM_IDENTITY_AUTHTYPE=iam
// IAM_IDENTITY_AUTH_URL=<IAM Token Service url>
// IAM_IDENTITY_APIKEY=<IAM APIKEY for the User>
// IAM_IDENTITY_ACCOUNT_ID=<AccountID which is unique to the User>
// IAM_IDENTITY_IAM_ID=<IAM ID which is unique to the User account>
// IAM_IDENTITY_IAM_ID_MEMBER=<IAM ID of a user belonging to the account but different to the one above>
// IAM_IDENTITY_ENTERPISE_ACCOUNT_ID=<AccountID of the enterprise account>
// IAM_IDENTITY_ENTERPISE_SUBACCOUNT_ID=<AccountID of an account in the enterprise>
// IAM_IDENTITY_IAM_ID_FOR_PREFERENCES=IAM id of the profile to set preferences
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'iam_identity.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('IamIdentityV1', () => {
  jest.setTimeout(600000);

  // begin-common

  const iamIdentityService = IamIdentityV1.newInstance({});

  // end-common
  const now = Date.now();

  const config = readExternalSources(IamIdentityV1.DEFAULT_SERVICE_NAME);
  const apikeyName = 'Node-SDK-IT-Example-ApiKey-' + now;
  const serviceIdName = 'Node-SDK-IT-Example-ServiceId-' + now;
  const serviceIdGroupName = 'Node-SDK-IT-Example-ServiceId-Group-' + now
  const realmName = 'https://sdk.test.realm/1234';
  const service = 'console'
  const valueString = '/billing'
  const preferenceID1 = 'landing_page'

  let accountId = config.accountId;
  let iamId = config.iamId;
  let iamApikey = config.apikey;
  let enterpriseAccountId = config.enterpriseAccountId;
  let enterpriseSubAccountId = config.enterpriseSubaccountId;
  let iamIDForPreferences = config.iamIDForPreferences;
  
  let apikeyId = null;
  let apikeyEtag = null;

  let svcId = null;
  let svcIdEtag = null;

  let serviceIdGroupId = null;
  let serviceIdGroupEtag = null;

  let profileId = null;
  let profileEtag = null;
  let profileIdentitiesEtag = null;

  let claimRuleId = null;
  let claimRuleEtag = null;

  let linkId = null;

  let accountSettingsEtag = null;

  let reportReference = null;
  let reportReferenceMfa=null;

  let profileTemplateId;
  let profileTemplateVersion;
  let profileTemplateEtag;
  let profileTemplateAssignmentId;
  let profileTemplateAssignmentEtag;
  let profileTemplateName = 'Node-SDK-IT-Example-Profile-Template-' + now
  let profileTemplateProfileName = 'Node-SDK-IT-Example-Profile-From-Template-' + now

  let accountSettingsTemplateId;
  let accountSettingsTemplateVersion;
  let accountSettingsTemplateEtag;
  let accountSettingsTemplateAssignmentId;
  let accountSettingsTemplateAssignmentEtag;
  let accountSettingsTemplateName = 'Node-SDK-IT-Example-AccountSettings-Template-' + now

test('createApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createApiKey() result:');
    // begin-create_api_key

    const params = {
      name: apikeyName,
      iamId: iamId,
      description: 'Example ApiKey',
    };

    try {
      const res = await iamIdentityService.createApiKey(params);
      apikeyId = res.result.id
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_api_key
  });
  test('listApiKeys request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listApiKeys() result:');
    // begin-list_api_keys

    const params = {
      accountId: accountId,
      iamId: iamId,
      includeHistory: true,
    };

    try {
      const res = await iamIdentityService.listApiKeys(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_api_keys
  });
  test('getApiKeysDetails request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getApiKeysDetails() result:');
    // begin-get_api_keys_details

    const params = {
      iamApiKey: iamApikey,
      includeHistory: false,
    };

    try {
      const res = await iamIdentityService.getApiKeysDetails(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_api_keys_details
  });
  test('getApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();

    originalLog('getApiKey() result:');
    // begin-get_api_key

    const params = {
      id: apikeyId,
      includeActivity: true,
    };

    try {
      const res = await iamIdentityService.getApiKey(params);
      apikeyEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_api_key
  });
  test('updateApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();
    expect(apikeyEtag).not.toBeNull();

    originalLog('updateApiKey() result:');
    // begin-update_api_key

    const params = {
      id: apikeyId,
      ifMatch: apikeyEtag,
      description: 'This is an updated description',
    };

    try {
      const res = await iamIdentityService.updateApiKey(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_api_key
  });
  test('lockApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();

    // begin-lock_api_key

    const params = {
      id: apikeyId,
    };

    try {
      await iamIdentityService.lockApiKey(params);
    } catch (err) {
      console.warn(err);
    }

    // end-lock_api_key
  });
  test('unlockApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();

    // begin-unlock_api_key

    const params = {
      id: apikeyId,
    };

    try {
      await iamIdentityService.unlockApiKey(params);
    } catch (err) {
      console.warn(err);
    }

    // end-unlock_api_key
  });
  test('disableApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();

    // begin-disable_api_key

    const params = {
      id: apikeyId,
    };

    try {
      await iamIdentityService.disableApiKey(params);
    } catch (err) {
      console.warn(err);
    }

    // end-disable_api_key
  });
  test('enableApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();

    // begin-enable_api_key

    const params = {
      id: apikeyId,
    };

    try {
      await iamIdentityService.enableApiKey(params);
    } catch (err) {
      console.warn(err);
    }

    // end-enable_api_key
  });
  test('deleteApiKey request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();

    // begin-delete_api_key

    const params = {
      id: apikeyId,
    };

    try {
      await iamIdentityService.deleteApiKey(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_api_key
  });
  test('createServiceId request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createServiceId() result:');
    // begin-create_service_id

    const params = {
      accountId: accountId,
      name: serviceIdName,
      description: 'Example ServiceId',
    };

    try {
      const res = await iamIdentityService.createServiceId(params);
      svcId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_service_id
  });
  test('getServiceId request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(svcId).not.toBeNull();

    originalLog('getServiceId() result:');
    // begin-get_service_id

    const params = {
      id: svcId,
      includeActivity: true,
    };

    try {
      const res = await iamIdentityService.getServiceId(params)
      svcIdEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_service_id
  });
  test('listServiceIds request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listServiceIds() result:');
    // begin-list_service_ids

    const params = {
      accountId: accountId,
      name: serviceIdName,
    };

    try {
      const res = await iamIdentityService.listServiceIds(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_service_ids
  });
  test('updateServiceId request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(svcId).not.toBeNull();
    expect(svcIdEtag).not.toBeNull();

    originalLog('updateServiceId() result:');
    // begin-update_service_id

    const params = {
      id: svcId,
      ifMatch: svcIdEtag,
      description: 'This is an updated description',
    };

    try {
      const res = await iamIdentityService.updateServiceId(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_service_id
  });
  test('lockServiceId request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(svcId).not.toBeNull();

    // begin-lock_service_id

    const params = {
      id: svcId,
    };

    try {
      await iamIdentityService.lockServiceId(params);
    } catch (err) {
      console.warn(err);
    }

    // end-lock_service_id
  });
  test('unlockServiceId request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(svcId).not.toBeNull();

    // begin-unlock_service_id

    const params = {
      id: svcId,
    };

    try {
      await iamIdentityService.unlockServiceId(params);
    } catch (err) {
      console.warn(err);
    }

    // end-unlock_service_id
  });
  test('deleteServiceId request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(svcId).not.toBeNull();

    // begin-delete_service_id

    const params = {
      id: svcId,
    };

    try {
      await iamIdentityService.deleteServiceId(params)
    } catch (err) {
      console.warn(err);
    }

    // end-delete_service_id
  });
  test('createServiceIdGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createServiceIdGroup() result:');
    // begin-create_service_id_group

    const params = {
      accountId: accountId,
      name: serviceIdGroupName,
      description: 'Example ServiceIdGroup',
    };

    try {
      const res = await iamIdentityService.createServiceIdGroup(params);
      serviceIdGroupId = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_service_id_group
  });
  test('getServiceIdGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getServiceIdGroup() result:');
    // begin-get_service_id_group

    const params = {
      id: serviceIdGroupId,
    };

    try {
      const res = await iamIdentityService.getServiceIdGroup(params);
      serviceIdGroupEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_service_id_group
  });
  test('listServiceIdGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listServiceIdGroup() result:');
    // begin-list_service_id_group

    const params = {
      accountId: accountId,
    };

    try {
      const res = await iamIdentityService.listServiceIdGroup(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_service_id_group
  });
  test('updateServiceIdGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(serviceIdGroupId).not.toBeNull();
    expect(serviceIdGroupEtag).not.toBeNull();

    originalLog('updateServiceIdGroup() result:');
    // begin-update_service_id_group

    const params = {
      id: serviceIdGroupId,
      ifMatch: serviceIdGroupEtag,
      name: serviceIdGroupName,
      description: 'This is an updated description',
    };

    try {
      const res = await iamIdentityService.updateServiceIdGroup(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_service_id_group
  });
  test('deleteServiceIdGroup request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(svcId).not.toBeNull();

    // begin-delete_service_id_group

    const params = {
      id: serviceIdGroupId,
    };

    try {
      await iamIdentityService.deleteServiceIdGroup(params)
    } catch (err) {
      console.warn(err);
    }

    // end-delete_service_id_group
  });
  test('createProfile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createProfile() result:');
    // begin-create_profile

    const params = {
      name: 'profileName',
      description: 'Example Profile',
      accountId,
    };

    let profile;
    try {
      const res = await iamIdentityService.createProfile(params);
      profile = res.result;
      profileId = profile.id
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_profile

    iamIDForPreferences = profile.iam_id

  });
  test('getProfile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getProfile() result:');
    // begin-get_profile

    const params = {
      profileId,
      includeActivity: true,
    };

    try {
      const res = await iamIdentityService.getProfile(params)
      profileEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_profile
  });
  test('listProfiles request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listProfiles() result:');
    // begin-list_profiles

    const params = {
      accountId: accountId,
      includeHistory: false,
    };

    try {
      const res = await iamIdentityService.listProfiles(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_profiles
  });
  test('updateProfile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();
    expect(apikeyEtag).not.toBeNull();

    originalLog('updateProfile() result:');
    // begin-update_profile

    const params = {
      profileId: profileId,
      ifMatch: profileEtag,
      description: 'This is an updated description',
    };

    try {
      const res = await iamIdentityService.updateProfile(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_profile
  });
  test('createClaimRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createClaimRule() result:');
    // begin-create_claim_rule

    const val = "{'Europe_Group'}";
    const profileClaimRuleConditionsModel = {
      claim: 'blueGroups',
      operator: 'EQUALS',
      value: JSON.stringify(val),
    };

    const conditions = [profileClaimRuleConditionsModel];

    const params = {
      profileId: profileId,
      type: 'Profile-SAML',
      realmName: realmName,
      expiration: 43200,
      conditions,
    };

    try {
      const res = await iamIdentityService.createClaimRule(params);
      claimRuleId = res.result.id
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_claim_rule
  });
  test('getClaimRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getClaimRule() result:');
    // begin-get_claim_rule

    const params = {
      profileId,
      ruleId: claimRuleId,
    };

    try {
      const res = await iamIdentityService.getClaimRule(params);
      claimRuleEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_claim_rule
  });
  test('listClaimRules request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listClaimRules() result:');
    // begin-list_claim_rules

    const params = {
      profileId,
    };

    try {
      const res = await iamIdentityService.listClaimRules(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_claim_rules
  });
  test('updateClaimRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(apikeyId).not.toBeNull();
    expect(apikeyEtag).not.toBeNull();

    originalLog('updateClaimRule() result:');
    // begin-update_claim_rule

    const val = "{'Europe_Group'}";
    const profileClaimRuleConditionsModel = {
      claim: 'blueGroups',
      operator: 'EQUALS',
      value: JSON.stringify(val),
    };

    const conditions = [profileClaimRuleConditionsModel];

    const params = {
      profileId,
      ruleId: claimRuleId,
      ifMatch: claimRuleEtag,
      type: 'Profile-SAML',
      realmName: realmName,
      expiration: 33200,
      conditions,
    };

    try {
      const res = await iamIdentityService.updateClaimRule(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_claim_rule
  });
  test('deleteClaimRule request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(profileId).not.toBeNull();
    expect(claimRuleId).not.toBeNull();

    // begin-delete_claim_rule

    const params = {
      profileId,
      ruleId: claimRuleId,
    };

    try {
      await iamIdentityService.deleteClaimRule(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_claim_rule
  });
  test('createLink request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('createLink() result:');
    // begin-create_link

    const CreateProfileLinkRequestLink = {
      crn: `crn:v1:staging:public:iam-identity::a/${accountId}::computeresource:Fake-Compute-Resource`,
      namespace: 'default',
      name: 'nice name',
    };

    const params = {
      profileId: profileId,
      name: 'nice link',
      crType: 'ROKS_SA',
      link: CreateProfileLinkRequestLink,
    };

    try {
      const res = await iamIdentityService.createLink(params)
      linkId = res.result.id
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_link
  });
  test('getLink request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getLink() result:');
    // begin-get_link

    const params = {
      profileId: profileId,
      linkId,
    };

    try {
      const res = await iamIdentityService.getLink(params)
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_link
  });
  test('listLinks request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('listLinks() result:');
    // begin-list_links

    const params = {
      profileId,
    };

    try {
      const res = await iamIdentityService.listLinks(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_links
  });
  test('deleteLink request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(profileId).not.toBeNull();
    expect(linkId).not.toBeNull();

    // begin-delete_link

    const params = {
      profileId,
      linkId,
    };

    try {
      await iamIdentityService.deleteLink(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_link
  });
  test('deleteLinkByParameters request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(profileId).not.toBeNull();
    const CreateProfileLinkRequestLink = {
      crn: `crn:v1:staging:public:iam-identity::a/${accountId}::computeresource:Fake-Compute-Resource`,
      component_name: 'test_component_name',
      component_type: 'test_component_type',
    };

    const paramsCreateLink = {
      profileId: profileId,
      name: 'Great link',
      crType: 'CE',
      link: CreateProfileLinkRequestLink,
    };

    try {
      const res = await iamIdentityService.createLink(paramsCreateLink)
      linkId = res.result.id
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // begin-delete_link_by_parameters

    const params = {
      profileId: profileId,
      type: 'CE',
      crn: `crn:v1:staging:public:iam-identity::a/${accountId}::computeresource:Fake-Compute-Resource`,
      componentName: 'test_component_name',
      componentType: 'test_component_type',
    };

    try {
      await iamIdentityService.deleteLinkByParameters(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_link_by_parameters
  });
  test('getProfileIdentities request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getProfileIdentities() result:');
    // begin-get_profile_identities

    const params = {
      profileId,
    };

    try {
      const res = await iamIdentityService.getProfileIdentities(params);
      const { result } = res;
      profileIdentitiesEtag = result.entity_tag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_profile_identities
   
  });
  test('setProfileIdentities request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('setProfileIdentities() result:');
    // begin-set_profile_identities
    const profileaccounts=[accountId];
    const ProfileIdentity= {
      identifier: iamId,
      type: 'user',
      accounts: profileaccounts,
      description: 'identity description'
    }
    const profileIdentities= [ProfileIdentity]
    const params = {
      profileId: profileId,
      identities: profileIdentities,
      ifMatch: profileIdentitiesEtag
    };

    try {
      const res = await iamIdentityService.setProfileIdentities(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-set_profile_identities

  });
  test('getProfileIdentity request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('getProfileIdentity() result:');
    // begin-get_profile_identity

    const params = {
      profileId: profileId,
      identityType: 'user',
      identifierId: iamId
    };

    try {
      const res = await iamIdentityService.getProfileIdentity(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_profile_identity

    // delete so it can be set again later
    try {
      const params = {
        profileId: profileId,
        identityType: 'user',
        identifierId: iamId
      };

      const res = await iamIdentityService.deleteProfileIdentity(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

  });
  test('setProfileIdentity request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('setProfileIdentity() result:');
    // begin-set_profile_identity

    const profileaccounts=[accountId];
    const params = {
      profileId: profileId,
      identityType: 'user',
      identifier: iamId,
      type: 'user',
      accounts: profileaccounts,
      description: 'identity description'
    };

    try {
      const res = await iamIdentityService.setProfileIdentity(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-set_profile_identity
   
  });
  test('deleteProfileIdentity request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    originalLog('deleteProfileIdentity() result:');
    // begin-delete_profile_identity

    const params = {
      profileId: profileId,
      identityType: 'user',
      identifierId: iamId
    };

    try {
      const res = await iamIdentityService.deleteProfileIdentity(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-delete_profile_identity
   
  });
  test('getAccountSettings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountSettingsEtag).toBeNull();

    originalLog('getAccountSettings() result:');
    // begin-getAccountSettings

    const params = {
      accountId: accountId,
    };

    try {
      const res = await iamIdentityService.getAccountSettings(params);
      accountSettingsEtag = res.headers['etag'];
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-getAccountSettings
  });
  test('updateAccountSettings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(accountSettingsEtag).not.toBeNull();

    originalLog('updateAccountSettings() result:');
    // begin-updateAccountSettings
    
    const accountSettingsUserMFA = {
      iam_id: iamId,
      mfa: 'NONE',
    };

    const accountSettingsUserDomainRestriction = {
      realm_id: 'IBMid',
      invitation_email_allow_patterns: [ '*.*@ibm.com' ],
      restrict_invitation: false,
    };

    const userMfa = [accountSettingsUserMFA];
    const restrictUserDomains = [accountSettingsUserDomainRestriction];

    const params = {
      ifMatch: accountSettingsEtag,
      accountId: accountId,
      restrictCreateServiceId: "NOT_RESTRICTED",
      restrictCreatePlatformApikey: "NOT_RESTRICTED",
      restrictUserListVisibility: 'NOT_RESTRICTED',
      restrictUserDomains,
      mfa: "NONE",
      userMfa,
      sessionExpirationInSeconds: "86400",
      sessionInvalidationInSeconds: "7200",
      systemAccessTokenExpirationInSeconds: '3600',
      systemRefreshTokenExpirationInSeconds: '259200',
    };

    try {
      const res = await iamIdentityService.updateAccountSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-updateAccountSettings
  });
  test('getEffectiveAccountSettings request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });


    originalLog('getEffectiveAccountSettings() result:');
    // begin-get_effective_account_settings

    const params = {
      accountId: accountId,
    };

    try {
      const res = await iamIdentityService.getEffectiveAccountSettings(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err)
    }

    // end-get_effective_account_settings
  });
  test('createReport request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createReport() result:');
    // begin-create_report

    const params = {
      accountId: accountId,
      type: 'inactive',
      duration: '120',
    };

    try {
      const res = await iamIdentityService.createReport(params);
      reportReference = res.reference;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_report
  });
  test('getReport request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getReport() result:');
    // begin-get_report

    const params = {
      accountId: accountId,
      reference: 'latest',
    };

    try {
      const res = await iamIdentityService.getReport(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_report
  });
  test('createMfaReport request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createMfaReport() result:');
    // begin-create_mfa_report

    const params = {
      accountId: accountId,
      type: 'mfa_status',
    };

    try {
      const res = await iamIdentityService.createMfaReport(params);
      reportReferenceMfa = res.result.reference;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_mfa_report
  });
  test('getMfaReport request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getMfaReport() result:');
    // begin-get_mfa_report

    const params = {
      accountId: accountId,
      reference: 'latest',
    };

    try {
      const res = await iamIdentityService.getMfaReport(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_mfa_report
  });
  test('getMfaStatus request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getMfaStatus() result:');
    // begin-get_mfa_status

    const params = {
      accountId: accountId,
      iamId: iamId,
    };

    try {
      const res = await iamIdentityService.getMfaStatus(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_mfa_status
  });

  test('scenarioProfileTemplateEx()', async () => {
    await createProfileTemplateEx();
  });
    
  async function createProfileTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createProfileTemplate() result:');
    // begin-create_profile_template
    const condition = {
      claim: "blueGroups",
      operator: "EQUALS",
      value: "\"cloud-docs-dev\"",
    }
    const claimRule = {
       name: "My Rule",
       realm_name: realmName,
       type: 'Profile-SAML',
       expiration: 43200,
       conditions: [condition],
    }
    const profile = {
      rules: [claimRule],
      name: profileTemplateProfileName,
      description: "Trusted profile created from a template",
    }
    const templateParams = {
      name: profileTemplateName,
      description: "IAM enterprise trusted profile template example",
      accountId: enterpriseAccountId,
      profile: profile,
    }

    try {
      const res = await iamIdentityService.createProfileTemplate(templateParams);
      profileTemplateEtag = res.headers.etag;
      const { result } = res;
      profileTemplateId = result.id;
      profileTemplateVersion = result.version;
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_profile_template

    await getProfileTemplateEx();
  }

  async function getProfileTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProfileTemplate() result:');
    // begin-get_profile_template_version
    const params = {
      templateId: profileTemplateId,
      version: profileTemplateVersion,
    }
    try {
      const res = await iamIdentityService.getProfileTemplateVersion(params);
      profileTemplateEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_profile_template_version

    await listProfileTemplatesEx();
  }

  async function listProfileTemplatesEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProfileTemplates() result:');
    // begin-list_profile_templates
    const params = {
      accountId: enterpriseAccountId,
    }
    try {
      const res = await iamIdentityService.listProfileTemplates(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_profile_templates

    await updateProfileTemplateEx();
  }

  async function updateProfileTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateProfileTemplate() result:');
    // begin-update_profile_template_version
    const params = {
      accountId: enterpriseAccountId,
      templateId: profileTemplateId,
      version: profileTemplateVersion,
      ifMatch: profileTemplateEtag,
      name: profileTemplateName,
      description: "IAM enterprise trusted profile template example - updated",
    }
    try {
      const res = await iamIdentityService.updateProfileTemplateVersion(params);
      profileTemplateEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_profile_template_version

    await assignProfileTemplateEx();
  }

  async function assignProfileTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('commitProfileTemplate() result:');
    // begin-commit_profile_template
    const commitParams = {
      templateId: profileTemplateId,
      version: profileTemplateVersion,
    }
    try {
      const res = await iamIdentityService.commitProfileTemplate(commitParams);
    } catch (err) {
      console.warn(err);
    }
    // end-commit_profile_template

    originalLog('createProfileTemplateAssignment() result:');
    // begin-create_trusted_profile_assignment
    const assignParams = {
      templateId: profileTemplateId,
      templateVersion: profileTemplateVersion,
      targetType: "Account",
      target: enterpriseSubAccountId,
    }

    try {
      const assRes = await iamIdentityService.createTrustedProfileAssignment(assignParams);
      const { result } = assRes;
      profileTemplateAssignmentId = result.id;
      profileTemplateAssignmentEtag= assRes.headers.etag;
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_trusted_profile_assignment

    await getProfileTemplateAssignmentsEx();
  }

  async function getProfileTemplateAssignmentsEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getProfileTemplateAssignments() result:');
    // begin-get_trusted_profile_assignment
    const params = {
      assignmentId: profileTemplateAssignmentId,
    }
    try {
      const res = await iamIdentityService.getTrustedProfileAssignment(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_trusted_profile_assignment

    await listProfileTemplateAssignmentsEx();
  }

  async function listProfileTemplateAssignmentsEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProfileTemplateAssignments() result:');
    // begin-list_trusted_profile_assignments
    const params = {
      accountId: enterpriseAccountId,
      templateId: profileTemplateId,
    }
    try {
      const res = await iamIdentityService.listTrustedProfileAssignments(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_trusted_profile_assignments

    await createNewProfileTemplateVersionEx();
  }

  async function createNewProfileTemplateVersionEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createNewProfileTemplateVersion() result:');
    // begin-create_profile_template_version
    const condition = {
      claim: "blueGroups",
      operator: "EQUALS",
      value: "\"cloud-docs-dev\"",
    }
    const claimRule = {
       name: "My Rule",
       realm_name: realmName,
       type: 'Profile-SAML',
       expiration: 43200,
       conditions: [condition],
    }
    const identity = {
      identifier: iamId,
      accounts: [enterpriseAccountId],
      type: "user",
      description: "Identity description",
   }
   const profile = {
      rules: [claimRule],
      name: profileTemplateProfileName,
      description: "Trusted profile created from a template - new version",
      identities: [identity],
    }
    const templateParams = {
      templateId: profileTemplateId,
      name: profileTemplateName,
      description: "IAM enterprise trusted profile template example - new version",
      accountId: enterpriseAccountId,
      profile: profile,
    }
  
    try {
      const res = await iamIdentityService.createProfileTemplateVersion(templateParams);
      const { result } = res;
      profileTemplateVersion = result.version;
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_profile_template_version

    await getLatestProfileTemplateVersionEx();
  }

  async function getLatestProfileTemplateVersionEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getLatestProfileTemplateVersion() result:');
    // begin-get_latest_profile_template_version
    const params = {
      templateId: profileTemplateId,
    }
    try {
      const res = await iamIdentityService.getLatestProfileTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_latest_profile_template_version

    await listProfileTemplateVersionsEx();
  }

  async function listProfileTemplateVersionsEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listProfileTemplateVersions() result:');
    // begin-list_versions_of_profile_template
    const params = {
      templateId: profileTemplateId,
    }
    try {
      const res = await iamIdentityService.listVersionsOfProfileTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_list_versions_of_profile_template

    await updateProfileTemplateAssignmentEx();
  }

  async function updateProfileTemplateAssignmentEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateProfileTemplateAssignment() result:');

    const commitParams = {
      templateId: profileTemplateId,
      version: profileTemplateVersion,
    }

    const res = await iamIdentityService.commitProfileTemplate(commitParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);
    
    await waitUntilTrustedProfileAssignmentFinishedEx(profileTemplateAssignmentId);

    // begin-update_trusted_profile_assignment
    const assignParams = {
      assignmentId: profileTemplateAssignmentId,
      templateVersion: profileTemplateVersion,
      ifMatch: profileTemplateAssignmentEtag,
    }

    try {
      const assRes = await iamIdentityService.updateTrustedProfileAssignment(assignParams);
      console.log(JSON.stringify(assRes.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_trusted_profile_assignment
    await waitUntilTrustedProfileAssignmentFinishedEx(profileTemplateAssignmentId);
    await deleteProfileTemplateVersionEx();
  }

  async function deleteProfileTemplateVersionEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteProfileTemplateVersion() result:');
    // begin-delete_profile_template_version
    const params = {
      templateId: profileTemplateId,
      version: 1,
    }
    try {
      const res = await iamIdentityService.deleteProfileTemplateVersion(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_profile_template_version

    await deleteProfileTemplateAssignmentEx();
  }

  async function deleteProfileTemplateAssignmentEx() {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteProfileTemplateAssignment() result:');

    await waitUntilTrustedProfileAssignmentFinishedEx(profileTemplateAssignmentId);

    // begin-delete_trusted_profile_assignment
    const params = {
      assignmentId: profileTemplateAssignmentId,
    }
    try {
      const res = await iamIdentityService.deleteTrustedProfileAssignment(params);
    } catch (err) {
      console.warn(err);
    }
  // end-delete_trusted_profile_assignment

    await testDeleteProfileTemplateEx();
  }

  async function testDeleteProfileTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteProfileTemplateVersion() result:');

    await waitUntilTrustedProfileAssignmentFinishedEx(profileTemplateAssignmentId);

    // begin-delete_all_versions_of_profile_template
    const params = {
      templateId: profileTemplateId,
    }
    try {
      const res = await iamIdentityService.deleteAllVersionsOfProfileTemplate(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_all_versions_of_profile_template
  }

  test('scenarioAccountSettingsTemplateEx()', async () => {
    await createAccountSettingsTemplateEx();
  });
    
  async function createAccountSettingsTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createAccountSettingsTemplate() result:');

    // begin-create_account_settings_template
    // UserMfa
    const userMfaModel = {
      iam_id: iamId,
      mfa: 'LEVEL1',
    };

    // AccountSettingsUserDomainRestriction
    const accountSettingsUserDomainRestrictionModel = {
      realm_id: 'IBMid',
      invitation_email_allow_patterns: ["*.*@sap.com"],
      restrict_invitation: false,
    };

    // TemplateAccountSettingsRestrictUserDomains
    const templateAccountSettingsRestrictUserDomainsModel = {
      account_sufficient: false,
      restrictions: [accountSettingsUserDomainRestrictionModel],
    };

    // TemplateAccountSettings
    const templateAccountSettingsModel = {
      restrict_create_service_id: 'RESTRICTED',
      restrict_create_platform_apikey: 'RESTRICTED',
      mfa: 'LEVEL1',
      user_mfa: [userMfaModel],
      session_expiration_in_seconds: '86400',
      session_invalidation_in_seconds: '7200',
      max_sessions_per_identity: '10',
      system_access_token_expiration_in_seconds: '3600',
      system_refresh_token_expiration_in_seconds: '259200',
      restrict_user_list_visibility: 'NOT_RESTRICTED',
      restrict_user_domains: templateAccountSettingsRestrictUserDomainsModel,
    };

    const templateParams = {
      name: accountSettingsTemplateName,
      description: "IAM enterprise account settings template example",
      accountId: enterpriseAccountId,
      accountSettings: templateAccountSettingsModel,
    }

    try {
      const res = await iamIdentityService.createAccountSettingsTemplate(templateParams);
      accountSettingsTemplateEtag = res.headers.etag;
      const { result } = res;
      accountSettingsTemplateId = result.id;
      accountSettingsTemplateVersion = result.version;
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_account_settings_template

    await getAccountSettingsTemplateEx();
  }

  async function getAccountSettingsTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getAccountSettingsTemplate() result:');

    // begin-get_account_settings_template_version
    const params = {
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
    }
    try {
      const res = await iamIdentityService.getAccountSettingsTemplateVersion(params);
      accountSettingsTemplateEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_account_settings_template_version

    await listAccountSettingsTemplatesEx();
  }

  async function listAccountSettingsTemplatesEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccountSettingsTemplates() result:');

    // begin-list_account_settings_templates
    const params = {
      accountId: enterpriseAccountId,
    }
    try {
      const res = await iamIdentityService.listAccountSettingsTemplates(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_account_settings_templates

    await updateAccountSettingsTemplateEx();
  }

  async function updateAccountSettingsTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateAccountSettingsTemplate() result:');

    // begin-update_account_settings_template_version
    // UserMfa
    const userMfaModel = {
      iam_id: iamId,
      mfa: 'LEVEL1',
    };

    // AccountSettingsUserDomainRestriction
    const accountSettingsUserDomainRestrictionModel = {
      realm_id: 'IBMid',
      invitation_email_allow_patterns: ["*.*@sap.com"],
      restrict_invitation: false,
    };

    // TemplateAccountSettingsRestrictUserDomains
    const templateAccountSettingsRestrictUserDomainsModel = {
      account_sufficient: false,
      restrictions: [accountSettingsUserDomainRestrictionModel],
    };

    // TemplateAccountSettings
    const templateAccountSettingsModel = {
      restrict_create_service_id: 'NOT_SET',
      restrict_create_platform_apikey: 'NOT_SET',
      mfa: 'LEVEL1',
      user_mfa: [userMfaModel],
      session_expiration_in_seconds: '72400',
      session_invalidation_in_seconds: '6000',
      max_sessions_per_identity: '5',
      system_access_token_expiration_in_seconds: '3000',
      system_refresh_token_expiration_in_seconds: '59200',
      restrict_user_list_visibility: 'RESTRICTED',
      restrict_user_domains: templateAccountSettingsRestrictUserDomainsModel,
    };

    const params = {
      accountId: enterpriseAccountId,
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
      ifMatch: accountSettingsTemplateEtag,
      name: accountSettingsTemplateName,
      description: "IAM enterprise account settings template example - updated",
      accountSettings: templateAccountSettingsModel,
    }
    try {
      const res = await iamIdentityService.updateAccountSettingsTemplateVersion(params);
      accountSettingsTemplateEtag = res.headers.etag;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_account_settings_template_version

    await assignAccountSettingsTemplateEx();
  }

  async function assignAccountSettingsTemplateEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('commitAccountSettingsTemplate() result:');

    // begin-commit_account_settings_template
    const commitParams = {
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
    }
    try {
      const res = await iamIdentityService.commitAccountSettingsTemplate(commitParams);
    } catch (err) {
      console.warn(err);
    }
    // end-commit_account_settings_template

    originalLog('createAccountSettingsAssignment() result:');

    // begin-create_account_settings_assignment
    const assignParams = {
      templateId: accountSettingsTemplateId,
      templateVersion: accountSettingsTemplateVersion,
      targetType: "Account",
      target: enterpriseSubAccountId,
    }

    try {
      const assRes = await iamIdentityService.createAccountSettingsAssignment(assignParams);
      const { result } = assRes;
      accountSettingsTemplateAssignmentId = result.id;
      accountSettingsTemplateAssignmentEtag= assRes.headers.etag;
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_account_settings_assignment

    await listAccountSettingsTemplateAssignmentsEx();
  }

  async function listAccountSettingsTemplateAssignmentsEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccountSettingsTemplateAssignments() result:');

    // begin-list_account_settings_assignments
    const params = {
      accountId: enterpriseAccountId,
      templateId: accountSettingsTemplateId,
    }
    try {
      const res = await iamIdentityService.listAccountSettingsAssignments(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_account_settings_assignments

    await createNewAccountSettingsTemplateVersionEx();
  }

  async function createNewAccountSettingsTemplateVersionEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createNewAccountSettingsTemplateVersion() result:');

    // begin-create_account_settings_template_version
     // UserMfa
    const userMfaModel = {
      iam_id: iamId,
      mfa: 'LEVEL1',
    };

    // AccountSettingsUserDomainRestriction
    const accountSettingsUserDomainRestrictionModel = {
      realm_id: 'IBMid',
      invitation_email_allow_patterns: ["*.*@sap.com"],
      restrict_invitation: false,
    };

    // TemplateAccountSettingsRestrictUserDomains
    const templateAccountSettingsRestrictUserDomainsModel = {
      account_sufficient: false,
      restrictions: [accountSettingsUserDomainRestrictionModel],
    };

    // TemplateAccountSettings
    const templateAccountSettingsModel = {
      restrict_create_service_id: 'NOT_SET',
      restrict_create_platform_apikey: 'NOT_SET',
      mfa: 'LEVEL1',
      user_mfa: [userMfaModel],
      session_expiration_in_seconds: '72400',
      session_invalidation_in_seconds: '6000',
      max_sessions_per_identity: '5',
      system_access_token_expiration_in_seconds: '3000',
      system_refresh_token_expiration_in_seconds: '59200',
      restrict_user_list_visibility: 'RESTRICTED',
      restrict_user_domains: templateAccountSettingsRestrictUserDomainsModel,
    };

    const templateParams = {
      templateId: accountSettingsTemplateId,
      name: accountSettingsTemplateName,
      description: "IAM enterprise account settings template example - new version",
      accountId: enterpriseAccountId,
      accountSettings: templateAccountSettingsModel,
    }
  
    try {
      const res = await iamIdentityService.createAccountSettingsTemplateVersion(templateParams);
      const { result } = res;
      accountSettingsTemplateVersion = result.version;
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_account_settings_template_version

    await getLatestAccountSettingsTemplateVersionEx();
  }

  async function getLatestAccountSettingsTemplateVersionEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getLatestAccountSettingsTemplateVersion() result:');

    // begin-get_latest_account_settings_template_version
    const params = {
      templateId: accountSettingsTemplateId,
    }
    try {
      const res = await iamIdentityService.getLatestAccountSettingsTemplateVersion(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_latest_account_settings_template_version

    await listAccountSettingsTemplateVersionsEx();
  }

  async function listAccountSettingsTemplateVersionsEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listAccountSettingsTemplateVersions() result:');

    // begin-list_versions_of_account_settings_template
    const params = {
      templateId: accountSettingsTemplateId,
    }
    try {
      const res = await iamIdentityService.listVersionsOfAccountSettingsTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_versions_of_account_settings_template

    await updateAccountSettingsTemplateAssignmentEx();
  }

  async function updateAccountSettingsTemplateAssignmentEx() {
    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateAccountSettingsTemplateAssignment() result:');

    const commitParams = {
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
    }

    const res = await iamIdentityService.commitAccountSettingsTemplate(commitParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);
    
    await waitUntilAccountSettingsAssignmentFinishedEx(accountSettingsTemplateAssignmentId);

    // begin-update_account_settings_assignment
    const assignParams = {
      assignmentId: accountSettingsTemplateAssignmentId,
      templateVersion: accountSettingsTemplateVersion,
      ifMatch: accountSettingsTemplateAssignmentEtag,
    }

    try {
      const assRes = await iamIdentityService.updateAccountSettingsAssignment(assignParams);
      console.log(JSON.stringify(assRes.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_account_settings_assignment
    await waitUntilAccountSettingsAssignmentFinishedEx(accountSettingsTemplateAssignmentId);
    await deleteAccountSettingsTemplateVersionEx();
  }

  async function deleteAccountSettingsTemplateVersionEx() {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteAccountSettingsTemplateVersion() result:');
    // begin-delete_account_settings_template_version
    const params = {
      templateId: accountSettingsTemplateId,
      version: 1,
    }
    try {
      const res = await iamIdentityService.deleteAccountSettingsTemplateVersion(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_account_settings_template_version

    await deleteAccountSettingsTemplateAssignmentEx();
  }

  async function deleteAccountSettingsTemplateAssignmentEx() {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteAccountSettingsTemplateAssignment() result:');

    await waitUntilAccountSettingsAssignmentFinishedEx(accountSettingsTemplateAssignmentId);

    // begin-delete_account_settings_assignment
    const params = {
      assignmentId: accountSettingsTemplateAssignmentId,
    }
    try {
      const res = await iamIdentityService.deleteAccountSettingsAssignment(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_account_settings_assignment
    await waitUntilAccountSettingsAssignmentFinishedEx(accountSettingsTemplateAssignmentId);

    await testDeleteAccountSettingsTemplateEx();
  }

  async function testDeleteAccountSettingsTemplateEx() {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('testDeleteAccountSettingsTemplate() result:');
    
    // begin-delete_all_versions_of_account_settings_template
    const params = {
      templateId: accountSettingsTemplateId,
    }
    try {
      const res = await iamIdentityService.deleteAllVersionsOfAccountSettingsTemplate(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_all_versions_of_account_settings_template
  }
  test('updatePreferenceOnScopeAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(iamIDForPreferences).not.toBeNull();

    originalLog('updatePreferenceOnScopeAccount() result:');
    // begin-update_preference_on_scope_account

    const params = {
      accountId:    accountId,
			iamId:        iamIDForPreferences,
			service:      service,
			preferenceId: preferenceID1,
			valueString:  valueString,
    };

    try {
      const res = await iamIdentityService.updatePreferenceOnScopeAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_preference_on_scope_account
  });
  test('getPreferencesOnScopeAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(iamIDForPreferences).not.toBeNull();

    originalLog('getPreferencesOnScopeAccount() result:');
    // begin-get_preferences_on_scope_account

    const params = {
      accountId:    accountId,
			iamId:        iamIDForPreferences,
			service:      service,
			preferenceId: preferenceID1,
    };

    try {
      const res = await iamIdentityService.getPreferencesOnScopeAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_preferences_on_scope_account
  });
  test('getAllPreferencesOnScopeAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(iamIDForPreferences).not.toBeNull();

    originalLog('getAllPreferencesOnScopeAccount() result:');
    // begin-get_all_preferences_on_scope_account

    const params = {
      accountId:    accountId,
			iamId:        iamIDForPreferences,
    };

    try {
      const res = await iamIdentityService.getAllPreferencesOnScopeAccount(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_all_preferences_on_scope_account
  });
  test('deletePreferencesOnScopeAccount request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(iamIDForPreferences).not.toBeNull();

    originalLog('deletePreferencesOnScopeAccount() result:');
    // begin-delete_preferences_on_scope_account

    const params = {
      accountId:    accountId,
			iamId:        iamIDForPreferences,
			service:      service,
			preferenceId: preferenceID1,
    };

    try {
      await iamIdentityService.deletePreferencesOnScopeAccount(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_preferences_on_scope_account
  });
  test('deleteProfile request example', async () => {

    consoleLogMock.mockImplementation(output => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation(output => {
      originalWarn(output);
      // when the test fails we need to print out the error message and stop execution right after it
      expect(true).toBeFalsy();
    });

    expect(profileId).not.toBeNull();

    // begin-delete_profile

    const params = {
      profileId
    };

    try {
      await iamIdentityService.deleteProfile(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_profile
  });

  function isFinishedEx(status) {
    return ("succeeded" === status.toLowerCase() || "failed" === status.toLowerCase());
  }

  async function waitUntilTrustedProfileAssignmentFinishedEx(assignmentId) {
    let finished = false;
    const params = {
      assignmentId: assignmentId,
    }

    for (let i = 0; i < 60; i++) {
      try {
        const response = await iamIdentityService.getTrustedProfileAssignment(params);
        const { result } = response;
        finished = isFinishedEx(result.status);
        if (finished) {
          profileTemplateAssignmentEtag= response.headers.etag;
          finished = true;
          break;
        }
        await sleepEx(10000);
      } catch (e) {
        if (e.status === 404) {
          finished = true;
          break;
        }
      }
    }
    expect(finished).toBe(true);
  }

  async function waitUntilAccountSettingsAssignmentFinishedEx(assignmentId) {
    let finished = false;
    const params = {
      assignmentId: assignmentId,
    }

    for (let i = 0; i < 60; i++) {
      try {
        const response = await iamIdentityService.getAccountSettingsAssignment(params);
        const { result } = response;
        finished = isFinishedEx(result.status);
        if (finished) {
          accountSettingsTemplateAssignmentEtag= response.headers.etag;
          finished = true;
          break;
        }
        await sleepEx(10000);
      } catch (e) {
        if (e.status === 404) {
          finished = true;
          break;
        }
      }
    }
    expect(finished).toBe(true);
  }

  function sleepEx(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

});
