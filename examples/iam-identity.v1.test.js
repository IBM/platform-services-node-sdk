/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2020, 2021.
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
const { expectToBePromise } = require('ibm-cloud-sdk-core/lib/sdk-test-helpers');

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
//
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
  jest.setTimeout(30000);

  // begin-common

  const iamIdentityService = IamIdentityV1.newInstance({});

  // end-common

  const config = readExternalSources(IamIdentityV1.DEFAULT_SERVICE_NAME);
  const apikeyName = 'Example-ApiKey';
  const serviceIdName = 'Example-ServiceId';

  let accountId = config.accountId;
  let iamId = config.iamId;
  let iamIdMember = config.iamIdMember;
  let iamApikey = config.apikey;

  let apikeyId = null;
  let apikeyEtag = null;

  let svcId = null;
  let svcIdEtag = null;

  let profileId = null;
  let profileEtag = null;

  let claimRuleId = null;
  let claimRuleEtag = null;

  let linkId = null;

  let accountSettingsEtag = null;

  let reportReference = null;
  let reportReferenceMfa=null;

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

    try {
      const res = await iamIdentityService.createProfile(params);
      profileId = res.result.id
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_profile
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
      realmName: 'https://w3id.sso.ibm.com/auth/sps/samlidp2/saml20',
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
      realmName: 'https://w3id.sso.ibm.com/auth/sps/samlidp2/saml20',
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
      crn: 'crn:v1:staging:public:iam-identity::a/18e3020749ce4744b0b472466d61fdb4::computeresource:Fake-Compute-Resource',
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
      iam_id: iamIdMember,
      mfa: 'NONE',
    };

    const userMfa = [accountSettingsUserMFA];

    const params = {
      ifMatch: accountSettingsEtag,
      accountId: accountId,
      restrictCreateServiceId: "NOT_RESTRICTED",
      restrictCreatePlatformApikey: "NOT_RESTRICTED",
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
});
