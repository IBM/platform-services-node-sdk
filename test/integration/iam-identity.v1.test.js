/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const IamIdentityV1 = require('../../dist/iam-identity/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 600000;

// Location of our config file.
const configFile = 'iam_identity.env';

const describe = authHelper.prepareTests(configFile);

const now = Date.now();

const apikeyName = `Node-SDK-IT-ApiKey-${  now}`;
const serviceIdName = `Node-SDK-IT-ServiceId-${  now}`;
const serviceIdGroupName = `Node-SDK-IT-ServiceIdGroup Name-${  now}`;
const profileName1 = `Node-SDK-IT-Profile1-${  now}`;
const profileName2 = `Node-SDK-IT-Profile2-${  now}`;
const newDescription = 'This is an updated description';
const claimRuleType = 'Profile-SAML';
const realmName = 'https://sdk.test.realm/1234';
const invalidAccountId = 'invalid';
const profileTemplateName = `Node-SDK-IT-ProfileTemplate-${  now}`;
const profileTemplateProfileName = `Node-SDK-IT-Profile-FromTemplate-${  now}`;
const accountSettingsTemplateName = `Node-SDK-IT-AccountSettingsTemplate-${  now}`;
const service = 'console';
const valueString = '/billing';
const preferenceID1 = 'landing_page';

let iamIdentityService;
let accountId;
let iamId;
let iamApikey;
let enterpriseAccountId;
let enterpriseSubAccountId;
let iamIDForPreferences;

let apikeyId1;
let apikeyEtag1;
let apikeyId2;

let serviceId1;
let serviceIdEtag1;
let serviceIdGroupId;
let serviceIdGroupEtag;

let profileId1;
let profileId2;
let profileIamId;
let profileEtag;
let profileIdentitiesEtag;

let claimRuleId1;
let claimRuleId2;
let claimRuleEtag;

let linkId;

let accountSettingsEtag;

let reportReference;
let reportReferenceMfa;

let profileTemplateId;
let profileTemplateVersion;
let profileTemplateEtag;
let profileTemplateAssignmentId;
let profileTemplateAssignmentEtag;
let profileTemplateScenarioComplete = false;

let accountSettingsTemplateId;
let accountSettingsTemplateVersion;
let accountSettingsTemplateEtag;
let accountSettingsTemplateAssignmentId;
let accountSettingsTemplateAssignmentEtag;
let accountSettingsTemplateScenarioComplete = false;


describe('IamIdentityV1_integration', () => {
  jest.setTimeout(timeout);

  beforeAll(async () => {
    console.log('Starting setup...');
    iamIdentityService = IamIdentityV1.newInstance({});
    const config = readExternalSources(IamIdentityV1.DEFAULT_SERVICE_NAME);

    expect(iamIdentityService).not.toBeNull();
    expect(config).not.toBeNull();

    accountId = config.accountId;
    iamId = config.iamId;
    iamId = config.iamId;
    iamApikey = config.apikey;
    enterpriseAccountId = config.enterpriseAccountId;
    enterpriseSubAccountId = config.enterpriseSubaccountId
    iamIDForPreferences =config.iamIdForPreferences
    expect(accountId).not.toBeNull();
    expect(accountId).toBeDefined();
    expect(enterpriseAccountId).not.toBeNull();
    expect(enterpriseAccountId).toBeDefined();
    expect(enterpriseSubAccountId).not.toBeNull();
    expect(enterpriseSubAccountId).toBeDefined();
    expect(iamId).not.toBeNull();
    expect(iamId).toBeDefined();
    expect(iamApikey).not.toBeNull();
    expect(iamApikey).toBeDefined();

    await cleanupResources();

    console.log('Finished setup.');
  });

  afterAll(async () => {
    console.log('Starting teardown...');
    await cleanupResources();
    console.log('Finished teardown!');
  });

  test('createApiKey1()', (done) => {
    const params = {
      name: apikeyName,
      iamId,
      description: 'NodeSDK test apikey #1',
    };

    iamIdentityService
      .createApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        // console.log('createApiKey() #1 result: ', result);
        apikeyId1 = result.id;
        expect(apikeyId1).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createApiKey2()', (done) => {
    const params = {
      name: apikeyName,
      iamId,
      description: 'NodeSDK test apikey #2',
    };

    iamIdentityService
      .createApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        // console.log('createApiKey() #2 result: ', result);

        apikeyId2 = result.id;
        expect(apikeyId2).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getApiKey()', (done) => {
    expect(apikeyId1).toBeDefined();
    expect(apikeyId1).not.toBeNull();
    const params = {
      id: apikeyId1,
      includeHistory: true,
      includeActivity: true,
    };

    iamIdentityService
      .getApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).toBeDefined();

        // console.log('getApiKey() result: ', result);
        expect(result.id).toEqual(apikeyId1);
        expect(result.name).toEqual(apikeyName);
        expect(result.iam_id).toEqual(iamId);
        expect(result.account_id).toEqual(accountId);
        expect(result.created_by).toEqual(iamId);
        expect(result.created_at).not.toBeNull();
        expect(result.locked).toEqual(false);
        expect(result.disabled).toEqual(false);
        expect(result.crn).not.toBeNull();
        expect(result.support_sessions).toEqual(false);
        expect(result.action_when_leaked).not.toBeNull();

        apikeyEtag1 = result.entity_tag;
        expect(apikeyEtag1).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getApiKeysDetails()', (done) => {
    const params = {
      iamApiKey: iamApikey,
      includeHistory: true,
    };

    iamIdentityService
      .getApiKeysDetails(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        // console.log('getApikeysDetails() result: ', result);

        expect(result.iam_id).toEqual(iamId);
        expect(result.account_id).toEqual(accountId);
        expect(result.created_by).toEqual(iamId);
        expect(result.created_at).not.toBeNull();
        expect(result.locked).toEqual(false);

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('listApiKeys()', async () => {
    const pageSize = 100;
    let pageToken = null;
    const apikeys = [];

    try {
      // Retrieve 1 apikey at a time to test the pagination.
      do {
        const params = {
          accountId,
          iamId,
          pagesize: pageSize,
          includeHistory: true,
          ...(pageToken !== null && { pagetoken: pageToken }),
        };

        const res = await iamIdentityService.listApiKeys(params);
        expect(res.status).toEqual(200);

        const { result } = res;
        // console.log('listApiKeys() result: ', result);
        expect(result.limit).toEqual(pageSize);
        expect(result.apikeys).toBeDefined();
        for (const elem of result.apikeys) {
          if (elem.name === apikeyName) {
            apikeys.push(elem);
          }
        }
        pageToken = getPageTokenFromURL(result.next);
      } while (pageToken != null);
    } catch (err) {
      console.log(err);
    }

    // Make sure we found the two apikeys that we created previously.
    expect(apikeys).toHaveLength(2);
  });

  test('updateApiKey()', (done) => {
    expect(apikeyId1).toBeDefined();
    expect(apikeyId1).not.toBeNull();
    expect(apikeyEtag1).toBeDefined();
    expect(apikeyEtag1).not.toBeNull();

    const params = {
      id: apikeyId1,
      ifMatch: apikeyEtag1,
      description: newDescription,
    };

    iamIdentityService
      .updateApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        // console.log('updateApiKey() result: ', result);
        expect(result).not.toBeNull();
        expect(result.description).toEqual(newDescription);

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('lockApiKey()', (done) => {
    expect(apikeyId2).toBeDefined();
    expect(apikeyId2).not.toBeNull();
    const params = {
      id: apikeyId2,
    };

    iamIdentityService
      .lockApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getApiKeyById(apikeyId2).then((apikey) => {
          expect(apikey.locked).toBe(true);
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('unlockApiKey()', (done) => {
    expect(apikeyId2).toBeDefined();
    expect(apikeyId2).not.toBeNull();
    const params = {
      id: apikeyId2,
    };

    iamIdentityService
      .unlockApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getApiKeyById(apikeyId2).then((apikey) => {
          expect(apikey.locked).toBe(false);
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('disableApiKey()', (done) => {
    expect(apikeyId2).toBeDefined();
    expect(apikeyId2).not.toBeNull();
    const params = {
      id: apikeyId2,
    };

    iamIdentityService
      .disableApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getApiKeyById(apikeyId2).then((apikey) => {
          expect(apikey.disabled).toBe(true);
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('enableApiKey()', (done) => {
    expect(apikeyId2).toBeDefined();
    expect(apikeyId2).not.toBeNull();
    const params = {
      id: apikeyId2,
    };

    iamIdentityService
      .enableApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getApiKeyById(apikeyId2).then((apikey) => {
          expect(apikey.disabled).toBe(false);
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteApiKey1()', (done) => {
    expect(apikeyId1).toBeDefined();
    expect(apikeyId1).not.toBeNull();
    const params = {
      id: apikeyId1,
    };

    iamIdentityService
      .deleteApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        // console.log('deleteApiKey() #1 response: ', res);
        expect(res.status).toEqual(204);

        getApiKeyById(apikeyId1).then((apikey) => {
          expect(apikey).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteApiKey2()', (done) => {
    expect(apikeyId2).toBeDefined();
    expect(apikeyId2).not.toBeNull();
    const params = {
      id: apikeyId2,
    };

    iamIdentityService
      .deleteApiKey(params)
      .then((res) => {
        expect(res).not.toBeNull();
        // console.log('deleteApiKey() #2 response: ', res);
        expect(res.status).toEqual(204);

        getApiKeyById(apikeyId1).then((apikey) => {
          expect(apikey).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createServiceId()', (done) => {
    const params = {
      accountId,
      name: serviceIdName,
      description: 'NodeSDK ServiceId desc',
    };

    iamIdentityService
      .createServiceId(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        // console.log('createServiceId() result: ', result);
        expect(result.id).not.toBeNull();
        serviceId1 = result.id;
        expect(serviceId1).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getServiceId()', (done) => {
    expect(serviceId1).toBeDefined();
    expect(serviceId1).not.toBeNull();
    const params = {
      id: serviceId1,
      includeHistory: true,
      includeActivity: true,
    };

    iamIdentityService
      .getServiceId(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        // console.log('getServiceId() result: ', result);
        expect(result).not.toBeNull();
        expect(result.id).toEqual(serviceId1);
        expect(result.name).toEqual(serviceIdName);
        expect(result.description).toEqual('NodeSDK ServiceId desc');

        serviceIdEtag1 = result.entity_tag;
        expect(serviceIdEtag1).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('listServiceIds()', (done) => {
    const params = {
      accountId,
      name: serviceIdName,
      pagesize: 100,
    };

    iamIdentityService
      .listServiceIds(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();
        // console.log('listServiceIds() result: ', result);

        expect(result.serviceids).toHaveLength(1);
        expect(result.offset).not.toBeNull();
        expect(result.offset).toEqual(0);
        expect(result.next).toBeUndefined();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('updateServiceId()', (done) => {
    expect(serviceId1).toBeDefined();
    expect(serviceId1).not.toBeNull();
    const params = {
      id: serviceId1,
      ifMatch: serviceIdEtag1,
      description: newDescription,
    };

    iamIdentityService
      .updateServiceId(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();
        // console.log('updateServiceId() result: ', result);

        expect(result.description).toEqual(newDescription);
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('lockServiceId()', (done) => {
    expect(serviceId1).toBeDefined();
    expect(serviceId1).not.toBeNull();
    const params = {
      id: serviceId1,
    };

    iamIdentityService
      .lockServiceId(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getServiceId(serviceId1).then((serviceId) => {
          expect(serviceId.locked).toBe(true);
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('unlockServiceId()', (done) => {
    expect(serviceId1).toBeDefined();
    expect(serviceId1).not.toBeNull();
    const params = {
      id: serviceId1,
    };

    iamIdentityService
      .unlockServiceId(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getServiceId(serviceId1).then((serviceId) => {
          expect(serviceId.locked).toBe(false);
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteServiceId()', (done) => {
    expect(serviceId1).toBeDefined();
    expect(serviceId1).not.toBeNull();
    const params = {
      id: serviceId1,
    };

    iamIdentityService
      .deleteServiceId(params)
      .then((res) => {
        expect(res).not.toBeNull();
        // console.log('deleteServiceId() response: ', res);
        expect(res.status).toEqual(204);

        getServiceId(serviceId1).then((serviceId) => {
          expect(serviceId).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createServiceIdGroup()', (done) => {
    const params = {
      accountId,
      name: serviceIdGroupName,
      description: 'NodeSDK ServiceIdGroup desc',
    };

    iamIdentityService
      .createServiceIdGroup(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        serviceIdGroupId = result.id;
        expect(serviceIdGroupId).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getServiceIdGroup()', (done) => {
    expect(serviceIdGroupId).toBeDefined();
    expect(serviceIdGroupId).not.toBeNull();
    const params = {
      id: serviceIdGroupId,
    };

    iamIdentityService
      .getServiceIdGroup(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();
        expect(result.id).toEqual(serviceIdGroupId);
        expect(result.name).toEqual(serviceIdGroupName);

        serviceIdGroupEtag = result.entity_tag;
        expect(serviceIdGroupEtag).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('listServiceIdGroup()', (done) => {
    const params = {
      accountId,
    };

    iamIdentityService
      .listServiceIdGroup(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('updateServiceIdGroup()', (done) => {
    expect(serviceIdGroupId).toBeDefined();
    expect(serviceIdGroupId).not.toBeNull();
    const params = {
      id: serviceIdGroupId,
      ifMatch: serviceIdGroupEtag,
      name: serviceIdGroupName,
      description: newDescription,
    };

    iamIdentityService
      .updateServiceIdGroup(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();

        expect(result.description).toEqual(newDescription);
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteServiceIdGroup()', (done) => {
    expect(serviceIdGroupId).toBeDefined();
    expect(serviceIdGroupId).not.toBeNull();
    const params = {
      id: serviceIdGroupId,
    };

    iamIdentityService
      .deleteServiceIdGroup(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getServiceId(serviceIdGroupId).then((serviceIdGroup) => {
          expect(serviceIdGroup).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createProfile1()', (done) => {
    const params = {
      name: profileName1,
      description: 'NodeSDK test profile #1',
      accountId,
    };

    iamIdentityService
      .createProfile(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        profileId1 = result.id;
        profileIamId = result.iam_id;
        expect(profileId1).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createProfile2()', (done) => {
    const params = {
      name: profileName2,
      description: 'NodeSDK test profile #2',
      accountId,
    };

    iamIdentityService
      .createProfile(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        profileId2 = result.id;
        iamIDForPreferences = result.iam_id;
        expect(profileId2).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getProfile()', (done) => {
    expect(profileId1).toBeDefined();
    expect(profileId1).not.toBeNull();
    const params = {
      profileId: profileId1,
      includeActivity: true,
    };

    iamIdentityService
      .getProfile(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).toBeDefined();

        expect(result.id).toEqual(profileId1);
        expect(result.name).toEqual(profileName1);
        expect(result.iam_id).toEqual(profileIamId);
        expect(result.account_id).toEqual(accountId);
        expect(result.crn).not.toBeNull();

        profileEtag = result.entity_tag;
        expect(profileEtag).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('listProfiles()', async () => {
    const pageSize = 100;
    let pageToken = null;
    const profiles = [];

    try {
      do {
        const params = {
          accountId,
          pagesize: pageSize,
          includeHistory: false,
          ...(pageToken !== null && { pagetoken: pageToken }),
        };

        const res = await iamIdentityService.listProfiles(params);
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result.limit).toEqual(pageSize);
        expect(result.profiles).toBeDefined();
        for (const elem of result.profiles) {
          if (elem.name === profileName1 || elem.name === profileName2) {
            profiles.push(elem);
          }
        }
        pageToken = getPageTokenFromURL(result.next);
      } while (pageToken != null);
    } catch (err) {
      console.log(err);
    }

    expect(profiles).toHaveLength(2);
  });

  test('updateProfile()', (done) => {
    expect(profileId1).toBeDefined();
    expect(profileId1).not.toBeNull();
    expect(profileEtag).toBeDefined();
    expect(profileEtag).not.toBeNull();

    const params = {
      profileId: profileId1,
      ifMatch: profileEtag,
      description: newDescription,
    };

    iamIdentityService
      .updateProfile(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();
        expect(result.description).toEqual(newDescription);

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteProfile1()', (done) => {
    expect(profileId1).toBeDefined();
    expect(profileId1).not.toBeNull();
    const params = {
      profileId: profileId1,
    };

    iamIdentityService
      .deleteProfile(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getProfileById(profileId1).then((profile) => {
          expect(profile).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createClaimRule1()', (done) => {
    const val = "{'cloud-docs-dev'}";
    const profileClaimRuleConditionsModel = {
      claim: 'blueGroups',
      operator: 'EQUALS',
      value: JSON.stringify(val),
    };

    const conditions = [profileClaimRuleConditionsModel];

    const params = {
      profileId: profileId2,
      type: claimRuleType,
      realmName,
      expiration: 43200,
      conditions,
    };

    iamIdentityService
      .createClaimRule(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        claimRuleId1 = result.id;
        expect(claimRuleId1).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createClaimRule2()', (done) => {
    const val = "{'Europe_Group'}";
    const profileClaimRuleConditionsModel = {
      claim: 'blueGroups',
      operator: 'EQUALS',
      value: JSON.stringify(val),
    };

    const conditions = [profileClaimRuleConditionsModel];

    const params = {
      profileId: profileId2,
      type: claimRuleType,
      realmName,
      expiration: 43200,
      conditions,
    };

    iamIdentityService
      .createClaimRule(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        claimRuleId2 = result.id;
        expect(claimRuleId2).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getClaimRule()', (done) => {
    expect(claimRuleId1).toBeDefined();
    expect(claimRuleId1).not.toBeNull();
    const params = {
      profileId: profileId2,
      ruleId: claimRuleId1,
    };

    iamIdentityService
      .getClaimRule(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).toBeDefined();

        expect(result.id).toEqual(claimRuleId1);
        expect(result.type).toEqual(claimRuleType);
        expect(result.realm_name).toEqual(realmName);
        expect(result.conditions).not.toBeNull();

        claimRuleEtag = result.entity_tag;
        expect(claimRuleEtag).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('listClaimRules()', async () => {
    const claimRules = [];
    const params = {
      profileId: profileId2,
    };

    const res = await iamIdentityService.listClaimRules(params);
    expect(res.status).toEqual(200);

    const { result } = res;
    expect(result.rules).toBeDefined();
    for (const elem of result.rules) {
      if (elem.id === claimRuleId1 || elem.id === claimRuleId2) {
        claimRules.push(elem);
      }
    }
    expect(claimRules).toHaveLength(2);
  });

  test('updateClaimRule()', (done) => {
    expect(claimRuleId1).toBeDefined();
    expect(claimRuleId1).not.toBeNull();
    expect(claimRuleEtag).toBeDefined();
    expect(claimRuleEtag).not.toBeNull();

    const val = "{'Europe_Group'}";
    const profileClaimRuleConditionsModel = {
      claim: 'blueGroups',
      operator: 'EQUALS',
      value: JSON.stringify(val),
    };

    const conditions = [profileClaimRuleConditionsModel];

    const params = {
      profileId: profileId2,
      ruleId: claimRuleId1,
      ifMatch: claimRuleEtag,
      type: claimRuleType,
      realmName,
      expiration: 33200,
      conditions,
    };

    iamIdentityService
      .updateClaimRule(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteClaimRule1()', (done) => {
    expect(claimRuleId1).toBeDefined();
    expect(claimRuleId1).not.toBeNull();
    const params = {
      profileId: profileId2,
      ruleId: claimRuleId1,
    };

    iamIdentityService
      .deleteClaimRule(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getClaimRuleById(profileId2, claimRuleId1).then((claimRule) => {
          expect(claimRule).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('createLink()', (done) => {
    const CreateProfileLinkRequestLink = {
      crn: `crn:v1:staging:public:iam-identity::a/${accountId}::computeresource:Fake-Compute-Resource`,
      namespace: 'default',
      name: 'nice name',
    };

    const params = {
      profileId: profileId2,
      name: 'nice link',
      crType: 'ROKS_SA',
      link: CreateProfileLinkRequestLink,
    };

    iamIdentityService
      .createLink(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        linkId = result.id;
        expect(linkId).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getLink()', (done) => {
    expect(linkId).toBeDefined();
    expect(linkId).not.toBeNull();
    const params = {
      profileId: profileId2,
      linkId,
    };

    iamIdentityService
      .getLink(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).toBeDefined();

        expect(result.id).toEqual(linkId);
        expect(result.name).toEqual('nice link');
        expect(result.cr_type).toEqual('ROKS_SA');
        expect(result.link).not.toBeNull();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('listLinks()', async () => {
    const links = [];
    const params = {
      profileId: profileId2,
    };

    const res = await iamIdentityService.listLinks(params);
    expect(res.status).toEqual(200);

    const { result } = res;
    expect(result.links).toBeDefined();
    for (const elem of result.links) {
      if (elem.id === linkId) {
        links.push(elem);
      }
    }
    expect(links).toHaveLength(1);
  });

  test('deleteLink()', (done) => {
    expect(linkId).toBeDefined();
    expect(linkId).not.toBeNull();
    const params = {
      profileId: profileId2,
      linkId,
    };

    iamIdentityService
      .deleteLink(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getLinkById(profileId2, linkId).then((link) => {
          expect(link).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteLinkByParameters()', (done) => {
    const CreateProfileLinkRequestLink = {
      crn: `crn:v1:staging:public:iam-identity::a/${accountId}::computeresource:Fake-Compute-Resource`,
      component_name: 'test_component_name',
      component_type: 'test_component_type',
    };

    const paramsCreateLink = {
      profileId: profileId2,
      name: 'Great link',
      crType: 'CE',
      link: CreateProfileLinkRequestLink,
    };

    iamIdentityService
      .createLink(paramsCreateLink)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(201);

        const { result } = res;
        expect(result).not.toBeNull();
        linkId = result.id;
        expect(linkId).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
    const params = {
      profileId: profileId2,
      type: 'CE',
      crn: `crn:v1:staging:public:iam-identity::a/${accountId}::computeresource:Fake-Compute-Resource`,
      componentName: 'test_component_name',
      componentType: 'test_component_type',
    };

    iamIdentityService
      .deleteLinkByParameters(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getLinkById(profileId2, linkId).then((link) => {
          expect(link).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteClaimRule2()', (done) => {
    expect(claimRuleId2).toBeDefined();
    expect(claimRuleId2).not.toBeNull();
    const params = {
      profileId: profileId2,
      ruleId: claimRuleId2,
    };

    iamIdentityService
      .deleteClaimRule(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getClaimRuleById(profileId2, claimRuleId2).then((claimRule) => {
          expect(claimRule).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getProfileIdentities()', async () => {
    const profileIdentities = [];
    const params = {
      profileId: profileId2,
    };

    const res = await iamIdentityService.getProfileIdentities(params);
    expect(res.status).toEqual(200);

    const { result } = res;
    expect(result.identities).toBeDefined();
    profileIdentitiesEtag = result.entity_tag;
    for (const elem of result.identities) {
      if (elem.identifier === iamId) {
        profileIdentities.push(elem);
      }
    }
    expect(profileIdentities).toHaveLength(0);
  });

  test('setProfileIdentities()', async () => {
    const identifiers = [];
    const profileaccounts=[accountId];
    const ProfileIdentity= {
      identifier: iamId,
      type: 'user',
      accounts: profileaccounts,
      description: 'identity description'
    }
    const profileIdentities= [ProfileIdentity]
    const params = {
      profileId: profileId2,
      identities: profileIdentities,
      ifMatch: profileIdentitiesEtag
    };

    const res = await iamIdentityService.setProfileIdentities(params);
    expect(res.status).toEqual(200);

    const { result } = res;
    expect(result.identities).toBeDefined();
    profileIdentitiesEtag = result.entity_tag;
    for (const elem of result.identities) {
      if (elem.identifier === iamId) {
        identifiers.push(elem);
      }
    }
    expect(identifiers).toHaveLength(1);
  });

  test('getProfileIdentity()', async () => {
    const params = {
      profileId: profileId2,
      identityType: 'user',
      identifierId: iamId
    };

    const res = await iamIdentityService.getProfileIdentity(params);
    expect(res.status).toEqual(200);

    const { result } = res;
    expect(result.identifier).toBeDefined();

    // delete again as need to set in future test
    const delResp = await iamIdentityService.deleteProfileIdentity(params);
    expect(delResp.status).toEqual(204);
  });

  test('setProfileIdentity()', async () => {
    const profileaccounts=[accountId];
    const params = {
      profileId: profileId2,
      identityType: 'user',
      identifier: iamId,
      type: 'user',
      accounts: profileaccounts,
      description: 'identity description'
    };

    const res = await iamIdentityService.setProfileIdentity(params);
    expect(res.status).toEqual(200);

    const { result } = res;
    expect(result.identifier).toBeDefined();
  });

  test('deleteProfileIdentity()', async () => {
    const params = {
      profileId: profileId2,
      identityType: 'user',
      identifierId: iamId
    };

    const res = await iamIdentityService.deleteProfileIdentity(params);
    expect(res.status).toEqual(204);

  });

  test('createProfileBadRequest()', async () => {
    const params = {
      name: profileName1,
      description: 'NodeSDK test profile #1',
      accountId: invalidAccountId,
    };

    await expect(iamIdentityService.createProfile(params)).rejects.toMatchObject({
      status: 400,
    });
  });

  test('getProfileNotFound()', async () => {
    const params = {
      profileId: 'invalid',
    };

    await expect(iamIdentityService.getProfile(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('updateProfileNotFound()', async () => {
    const params = {
      profileId: 'invalid',
      ifMatch: 'invalid',
      description: 'invalid',
    };

    await expect(iamIdentityService.updateProfile(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('deleteProfileNotFound()', async () => {
    const params = {
      profileId: 'invalid',
    };

    await expect(iamIdentityService.deleteProfile(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('createClaimRuleNotFound()', async () => {
    const val = "{'cloud-docs-dev'}";
    const profileClaimRuleConditionsModel = {
      claim: 'blueGroups',
      operator: 'EQUALS',
      value: JSON.stringify(val),
    };

    const conditions = [profileClaimRuleConditionsModel];

    const params = {
      profileId: 'invalid',
      type: claimRuleType,
      realmName,
      expiration: 43200,
      conditions,
    };

    await expect(iamIdentityService.createClaimRule(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('getClaimRuleNotFound()', async () => {
    const params = {
      profileId: 'invalid',
      ruleId: 'invalid',
    };

    await expect(iamIdentityService.getClaimRule(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('updateClaimRuleNotFound()', async () => {
    const val = "{'Europe_Group'}";
    const profileClaimRuleConditionsModel = {
      claim: 'blueGroups',
      operator: 'EQUALS',
      value: JSON.stringify(val),
    };

    const conditions = [profileClaimRuleConditionsModel];

    const params = {
      profileId: 'invalid',
      ruleId: 'invalid',
      ifMatch: 'invalid',
      type: claimRuleType,
      realmName,
      expiration: 33200,
      conditions,
    };

    await expect(iamIdentityService.updateClaimRule(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('deleteClaimRuleNotFound()', async () => {
    const params = {
      profileId: 'invalid',
      ruleId: 'invalid',
    };

    await expect(iamIdentityService.deleteClaimRule(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('createLinkNotFound()', async () => {
    const CreateProfileLinkRequestLink = {
      crn: `crn:v1:staging:public:iam-identity::a/${accountId}::computeresource:Fake-Compute-Resource`,
      namespace: 'default',
      name: 'nice name',
    };

    const params = {
      profileId: 'invalid',
      name: 'nice link',
      crType: 'ROKS_SA',
      link: CreateProfileLinkRequestLink,
    };

    await expect(iamIdentityService.createLink(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('getLinkNotFound()', async () => {
    const params = {
      profileId: 'invalid',
      linkId: 'invalid',
    };

    await expect(iamIdentityService.getLink(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('deleteLinkNotFound()', async () => {
    const params = {
      profileId: 'invalid',
      linkId: 'invalid',
    };

    await expect(iamIdentityService.deleteLink(params)).rejects.toMatchObject({
      status: 404,
    });
  });

  test('getAccountSettings()', (done) => {
    expect(accountSettingsEtag).toBeUndefined();
    const params = {
      accountId,
      includeHistory: false,
    };

    iamIdentityService
      .getAccountSettings(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        expect(res).toBeDefined();

        const { result } = res;
        expect(result).toBeDefined();

        // console.log('getAccountSettings() result: ', result);
        expect(result.account_id).toEqual(accountId);
        expect(result.restrict_create_service_id).toBeDefined();
        expect(result.restrict_create_platform_apikey).toBeDefined();
        expect(result.entity_tag).toBeDefined();
        expect(result.mfa).toBeDefined();
        expect(result.user_mfa).toBeDefined();
        expect(result.history).toBeDefined();
        expect(result.session_expiration_in_seconds).toBeDefined();
        expect(result.session_invalidation_in_seconds).toBeDefined();
        expect(result.system_access_token_expiration_in_seconds).toBeDefined();
        expect(result.system_refresh_token_expiration_in_seconds).toBeDefined();

        accountSettingsEtag = result.entity_tag;
        expect(accountSettingsEtag).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('updateAccountSettings()', (done) => {
    expect(accountSettingsEtag).toBeDefined();

    const accountSettingsUserDomainRestriction = {
      realm_id: 'IBMid',
      invitation_email_allow_patterns: [ '*.*@ibm.com' ],
      restrict_invitation: false,
    };

    const accountSettingsUserMFA = {
      iam_id: iamId,
      mfa: 'NONE',
    };

    const userMfa = [accountSettingsUserMFA];
    const restrictUserDomains = [accountSettingsUserDomainRestriction];

    const params = {
      ifMatch: accountSettingsEtag,
      accountId,
      restrictCreateServiceId: 'NOT_RESTRICTED',
      restrictCreatePlatformApikey: 'NOT_RESTRICTED',
      restrictUserListVisibility: 'NOT_RESTRICTED',
      restrictUserDomains,
      // allowedIpAddresses: 'testString',
      mfa: 'NONE',
      userMfa,
      sessionExpirationInSeconds: '86400',
      sessionInvalidationInSeconds: '7200',
      maxSessionsPerIdentity: '10',
      systemAccessTokenExpirationInSeconds: '3600',
      systemRefreshTokenExpirationInSeconds: '259200',
    };

    iamIdentityService
      .updateAccountSettings(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(res).toBeDefined();
        expect(res.result).toBeDefined();

        // console.log('updateAccountSettings() result: ', result);
        expect(result.account_id).toEqual(accountId);
        expect(result.entity_tag).toEqual(res.headers.etag);
        expect(result.restrict_create_service_id).toEqual(params.restrictCreateServiceId);
        expect(result.restrict_create_platform_apikey).toEqual(params.restrictCreatePlatformApikey);
        expect(result.restrict_user_list_visibility).toEqual(params.restrictUserListVisibility);
        expect(result.restrict_user_domains).toEqual(params.restrictUserDomains);
        expect(result.mfa).toEqual(params.mfa);
        expect(result.session_expiration_in_seconds).toEqual(params.sessionExpirationInSeconds);
        expect(result.session_invalidation_in_seconds).toEqual(params.sessionInvalidationInSeconds);
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getEffectiveAccountSettings()', (done) => {
    const params = {
      accountId,
      includeHistory: false,
    };

    iamIdentityService
      .getEffectiveAccountSettings(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);
        expect(res).toBeDefined();

        const { result } = res;
        expect(result).toBeDefined();

        // console.log('getEffectiveAccountSettings() result: ', result);
        expect(result.account_id).toEqual(accountId);
        expect(result.effective).toBeDefined();
        expect(result.account).toBeDefined();
        
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('createReport()', (done) => {
    const params = {
      accountId,
      type: 'inactive',
      duration: '120',
    };

    iamIdentityService
      .createReport(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(202);

        const { result } = res;
        expect(result).not.toBeNull();
        reportReference = result.reference;
        expect(reportReference).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getReportIncomplete()', (done) => {
    const params = {
      accountId,
      reference: reportReference,
    };

    iamIdentityService
      .getReport(params)
      .then((res) => {
        expect(res.status).toEqual(204);
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getReportComplete()', async () => {
    const params = {
      accountId,
      reference: reportReference,
    };

    for (let i = 0; i < 30; i++) {
      const response = await iamIdentityService.getReport(params);
      if (response.status !== 204) {
        expect(response).not.toBeNull();
        expect(response.created_by).not.toBeNull();
        expect(response.reference).not.toBeNull();
        expect(response.report_duration).not.toBeNull();
        expect(response.report_start_time).not.toBeNull();
        expect(response.report_end_time).not.toBeNull();
        break;
      }
      await sleep(1000);
    }
  });
  test('getReportNotFound()', async () => {
    const params = {
      accountId,
      reference: 'test123',
    };

    await expect(iamIdentityService.getReport(params)).rejects.toMatchObject({
      status: 404,
    });
  });
  test('createMfaReport()', (done) => {
    const params = {
      accountId,
      type: 'mfa_status',
    };

    iamIdentityService
      .createMfaReport(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(202);

        const { result } = res;
        expect(result).not.toBeNull();
        reportReferenceMfa = result.reference;
        expect(reportReferenceMfa).not.toBeNull();
        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });
  test('getMfaReportComplete()', async () => {
    const params = {
      accountId,
      reference: reportReferenceMfa,
    };

    for (let i = 0; i < 30; i++) {
      const response = await iamIdentityService.getMfaReport(params);
      if (response.status !== 204) {
        expect(response).not.toBeNull();
        expect(response.created_by).not.toBeNull();
        expect(response.reference).not.toBeNull();
        expect(response.report_duration).not.toBeNull();
        break;
      }
      await sleep(1000);
    }
  });
  test('getMfaReportNotFound()', async () => {
    const params = {
      accountId,
      reference: 'test123',
    };

    await expect(iamIdentityService.getMfaReport(params)).rejects.toMatchObject({
      status: 404,
    });
  });
  test('getMfaStatus()', async () => {
    const params = {
      accountId,
      iamId,
    };
    const response = await iamIdentityService.getMfaStatus(params);
    expect(response).not.toBeNull();
    expect(response.iam_id).not.toBeNull();
  });

  test('updatePreferenceOnScopeAccount()', (done) => {
    expect(accountId).not.toBeNull();
    expect(iamIDForPreferences).not.toBeNull();
    expect(service).not.toBeNull();
    expect(preferenceID1).not.toBeNull();
    expect(valueString).not.toBeNull();

    const params = {
      accountId,
			iamId:        iamIDForPreferences,
			service,
			preferenceId: preferenceID1,
			valueString,
    };

    iamIdentityService
      .updatePreferenceOnScopeAccount(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getPreferencesOnScopeAccount()', (done) => {
    expect(accountId).not.toBeNull();
    expect(iamIDForPreferences).not.toBeNull();
    expect(service).not.toBeNull();
    expect(preferenceID1).not.toBeNull();
    expect(valueString).not.toBeNull();

    const params = {
      accountId,
			iamId:        iamIDForPreferences,
			service,
			preferenceId: preferenceID1,
    };

    iamIdentityService
      .getPreferencesOnScopeAccount(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('getAllPreferencesOnScopeAccount()', (done) => {
    expect(accountId).not.toBeNull();
    expect(iamIDForPreferences).not.toBeNull();
    expect(service).not.toBeNull();
    expect(preferenceID1).not.toBeNull();
    expect(valueString).not.toBeNull();

    const params = {
      accountId,
			iamId:        iamIDForPreferences,
    };

    iamIdentityService
      .getAllPreferencesOnScopeAccount(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(200);

        const { result } = res;
        expect(result).not.toBeNull();

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deletePreferencesOnScopeAccount()', (done) => {
    expect(accountId).not.toBeNull();
    expect(iamIDForPreferences).not.toBeNull();
    expect(service).not.toBeNull();
    expect(preferenceID1).not.toBeNull();
    expect(valueString).not.toBeNull();

    const params = {
      accountId,
			iamId:        iamIDForPreferences,
			service,
			preferenceId: preferenceID1,
    };

    iamIdentityService
      .deletePreferencesOnScopeAccount(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        done();
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('deleteProfile2()', (done) => {
    expect(profileId2).toBeDefined();
    expect(profileId2).not.toBeNull();
    const params = {
      profileId: profileId2,
    };

    iamIdentityService
      .deleteProfile(params)
      .then((res) => {
        expect(res).not.toBeNull();
        expect(res.status).toEqual(204);

        getProfileById(profileId2).then((profile) => {
          expect(profile).toBeNull();
          done();
        });
      })
      .catch((err) => {
        console.warn(err);
        done(err);
      });
  });

  test('scenarioProfileTemplate()', async () => {
    await createProfileTemplate();
    expect(profileTemplateScenarioComplete).toBe(true);
  });
    
  async function createProfileTemplate() {
    const condition = {
      claim: "blueGroups",
      operator: "EQUALS",
      value: "\"cloud-docs-dev\"",
    }
    const claimRule = {
       name: "My Rule",
       realm_name: realmName,
       type: claimRuleType,
       expiration: 43200,
       conditions: [condition],
    }
    const profile = {
      rules: [claimRule],
      name: profileTemplateProfileName,
      description: "node SDK test Profile created from Profile Template #1",
    }
    const templateParams = {
      name: profileTemplateName,
      description: "node SDK test Profile Template ",
      accountId: enterpriseAccountId,
      profile,
    }

    const res = await iamIdentityService.createProfileTemplate(templateParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(201);
    expect(res.headers.etag).not.toBeNull();
    profileTemplateEtag = res.headers.etag;
    expect(profileTemplateEtag).not.toBeNull();
    const { result } = res;
    expect(result).not.toBeNull();
    profileTemplateId = result.id;
    expect(profileTemplateId).not.toBeNull();
    profileTemplateVersion = result.version;
    expect(profileTemplateVersion).not.toBeNull();

    await getProfileTemplate();
  }

  async function getProfileTemplate() {
    const params = {
      templateId: profileTemplateId,
      version: profileTemplateVersion,
    }
    const res = await iamIdentityService.getProfileTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    profileTemplateEtag = res.headers.etag;
    expect(profileTemplateEtag).not.toBeNull();

    await listProfileTemplates();
  }

  async function listProfileTemplates() {
    const params = {
      accountId: enterpriseAccountId,
    }
    const res = await iamIdentityService.listProfileTemplates(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();

    await updateProfileTemplate();
  }

  async function updateProfileTemplate() {
    const params = {
      accountId: enterpriseAccountId,
      templateId: profileTemplateId,
      version: profileTemplateVersion,
      ifMatch: profileTemplateEtag,
      name: profileTemplateName,
      description: "node SDK test Profile Template - updated",
    }
    const res = await iamIdentityService.updateProfileTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    profileTemplateEtag = res.headers.etag;
    expect(profileTemplateEtag).not.toBeNull();
    const { result } = res;
    expect(result).not.toBeNull();

    await assignProfileTemplate();
  }

  async function assignProfileTemplate() {
    const commitParams = {
      templateId: profileTemplateId,
      version: profileTemplateVersion,
    }
    const res = await iamIdentityService.commitProfileTemplate(commitParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);
    const assignParams = {
      templateId: profileTemplateId,
      templateVersion: profileTemplateVersion,
      targetType: "Account",
      target: enterpriseSubAccountId,
    }

    const assRes = await iamIdentityService.createTrustedProfileAssignment(assignParams);
    expect(assRes).not.toBeNull();
    expect(assRes.status).toEqual(202);
    const { result } = assRes;
    profileTemplateAssignmentId = result.id;
    expect(profileTemplateAssignmentId).not.toBeNull();
    expect(assRes.headers).not.toBeNull();
    profileTemplateAssignmentEtag= assRes.headers.etag;
    expect(profileTemplateAssignmentEtag).not.toBeNull();

    await listProfileTemplateAssignments();
  }

  async function listProfileTemplateAssignments() {
    const params = {
      accountId: enterpriseAccountId,
      templateId: profileTemplateId,
    }
    const res = await iamIdentityService.listTrustedProfileAssignments(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();
    expect(result.assignments).not.toBeNull();

    await createNewProfileTemplateVersion();
  }

  async function createNewProfileTemplateVersion() {
    const condition = {
      claim: "blueGroups",
      operator: "EQUALS",
      value: "\"cloud-docs-dev\"",
    }
    const claimRule = {
       name: "My Rule",
       realm_name: realmName,
       type: claimRuleType,
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
      description: "node SDK test Profile created from Profile Template - new version",
      identities: [identity],
    }
    const templateParams = {
      templateId: profileTemplateId,
      name: profileTemplateName,
      description: "node SDK test Profile Template - new version",
      accountId: enterpriseAccountId,
      profile,
    }
  
    const res = await iamIdentityService.createProfileTemplateVersion(templateParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(201);
    const { result } = res;
    expect(result).not.toBeNull();
    profileTemplateVersion = result.version;
    expect(profileTemplateVersion).not.toBeNull();

    await getLatestProfileTemplateVersion();
  }

  async function getLatestProfileTemplateVersion() {
    const params = {
      templateId: profileTemplateId,
    }
    const res = await iamIdentityService.getLatestProfileTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();

    await listProfileTemplateVersions();
  }

  async function listProfileTemplateVersions() {
    const params = {
      templateId: profileTemplateId,
    }
    const res = await iamIdentityService.listVersionsOfProfileTemplate(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();
    expect(result.profile_templates).not.toBeNull();

    await updateProfileTemplateAssignment();
  }

  async function updateProfileTemplateAssignment() {
    const commitParams = {
      templateId: profileTemplateId,
      version: profileTemplateVersion,
    }

    const res = await iamIdentityService.commitProfileTemplate(commitParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);
    
    await waitUntilTrustedProfileAssignmentFinished(profileTemplateAssignmentId);

    const assignParams = {
      assignmentId: profileTemplateAssignmentId,
      templateVersion: profileTemplateVersion,
      ifMatch: profileTemplateAssignmentEtag,
    }

    const assRes = await iamIdentityService.updateTrustedProfileAssignment(assignParams);
    expect(assRes).not.toBeNull();
    expect(assRes.status).toEqual(202);

    await deleteProfileTemplateAssignment();
  }

  async function deleteProfileTemplateAssignment() {

    await waitUntilTrustedProfileAssignmentFinished(profileTemplateAssignmentId);

    const params = {
      assignmentId: profileTemplateAssignmentId,
    }
    const res = await iamIdentityService.deleteTrustedProfileAssignment(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(202);

    await deleteProfileTemplateVersion();
  }

  async function deleteProfileTemplateVersion() {

    await waitUntilTrustedProfileAssignmentFinished(profileTemplateAssignmentId);

    const params = {
      templateId: profileTemplateId,
      version: 1,
    }
    const res = await iamIdentityService.deleteProfileTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);

    await testDeleteProfileTemplate();
  }

  async function testDeleteProfileTemplate() {

    await waitUntilTrustedProfileAssignmentFinished(profileTemplateAssignmentId);

    const params = {
      templateId: profileTemplateId,
    }
    const res = await iamIdentityService.deleteAllVersionsOfProfileTemplate(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);

    profileTemplateScenarioComplete = true;
  }

  test('scenarioAccountSettingsTemplate()', async () => {
    await createAccountSettingsTemplate();
    expect(accountSettingsTemplateScenarioComplete).toBe(true);
  });
    
  async function createAccountSettingsTemplate() {
    const settings = {
      mfa: "LEVEL1",
      system_access_token_expiration_in_seconds: "3000",
    }
    const templateParams = {
      name: accountSettingsTemplateName,
      description: "node SDK test Account Settings Template",
      accountId: enterpriseAccountId,
      accountSettings: settings,
    }

    const res = await iamIdentityService.createAccountSettingsTemplate(templateParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(201);
    expect(res.headers.etag).not.toBeNull();
    accountSettingsTemplateEtag = res.headers.etag;
    expect(accountSettingsTemplateEtag).not.toBeNull();
    const { result } = res;
    expect(result).not.toBeNull();
    accountSettingsTemplateId = result.id;
    expect(accountSettingsTemplateId).not.toBeNull();
    accountSettingsTemplateVersion = result.version;
    expect(accountSettingsTemplateVersion).not.toBeNull();

    await getAccountSettingsTemplate();
  }

  async function getAccountSettingsTemplate() {
    const params = {
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
    }
    const res = await iamIdentityService.getAccountSettingsTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    accountSettingsTemplateEtag = res.headers.etag;
    expect(accountSettingsTemplateEtag).not.toBeNull();

    await listAccountSettingsTemplates();
  }

  async function listAccountSettingsTemplates() {
    const params = {
      accountId: enterpriseAccountId,
    }
    const res = await iamIdentityService.listAccountSettingsTemplates(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();

    await updateAccountSettingsTemplate();
  }

  async function updateAccountSettingsTemplate() {
    const settings = {
      mfa: "LEVEL1",
      system_access_token_expiration_in_seconds: "3000",
    }
    const params = {
      accountId: enterpriseAccountId,
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
      ifMatch: accountSettingsTemplateEtag,
      name: accountSettingsTemplateName,
      description: "node SDK test Account Settings Template - updated",
      accountSettings: settings,
    }
    const res = await iamIdentityService.updateAccountSettingsTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    accountSettingsTemplateEtag = res.headers.etag;
    expect(accountSettingsTemplateEtag).not.toBeNull();
    const { result } = res;
    expect(result).not.toBeNull();

    await assignAccountSettingsTemplate();
  }

  async function assignAccountSettingsTemplate() {
    const commitParams = {
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
    }
    const res = await iamIdentityService.commitAccountSettingsTemplate(commitParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);
    const assignParams = {
      templateId: accountSettingsTemplateId,
      templateVersion: accountSettingsTemplateVersion,
      targetType: "Account",
      target: enterpriseSubAccountId,
    }

    const assRes = await iamIdentityService.createAccountSettingsAssignment(assignParams);
    expect(assRes).not.toBeNull();
    expect(assRes.status).toEqual(202);
    const { result } = assRes;
    accountSettingsTemplateAssignmentId = result.id;
    expect(accountSettingsTemplateAssignmentId).not.toBeNull();
    expect(assRes.headers).not.toBeNull();
    accountSettingsTemplateAssignmentEtag= assRes.headers.etag;
    expect(accountSettingsTemplateAssignmentEtag).not.toBeNull();

    await listAccountSettingsTemplateAssignments();
  }

  async function listAccountSettingsTemplateAssignments() {
    const params = {
      accountId: enterpriseAccountId,
      templateId: accountSettingsTemplateId,
    }
    const res = await iamIdentityService.listAccountSettingsAssignments(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();
    expect(result.assignments).not.toBeNull();

    await createNewAccountSettingsTemplateVersion();
  }

  async function createNewAccountSettingsTemplateVersion() {
    const settings = {
      mfa: "LEVEL1",
      system_access_token_expiration_in_seconds: "2600",
      restrict_create_platform_apikey: "RESTRICTED",
      restrict_create_service_id: "RESTRICTED",
    }
    const templateParams = {
      templateId: accountSettingsTemplateId,
      name: accountSettingsTemplateName,
      description: "node SDK test Account Settings Template - new version",
      accountId: enterpriseAccountId,
      accountSettings: settings,
    }
  
    const res = await iamIdentityService.createAccountSettingsTemplateVersion(templateParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(201);
    const { result } = res;
    expect(result).not.toBeNull();
    accountSettingsTemplateVersion = result.version;
    expect(accountSettingsTemplateVersion).not.toBeNull();

    await getLatestAccountSettingsTemplateVersion();
  }

  async function getLatestAccountSettingsTemplateVersion() {
    const params = {
      templateId: accountSettingsTemplateId,
    }
    const res = await iamIdentityService.getLatestAccountSettingsTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();

    await listAccountSettingsTemplateVersions();
  }

  async function listAccountSettingsTemplateVersions() {
    const params = {
      templateId: accountSettingsTemplateId,
    }
    const res = await iamIdentityService.listVersionsOfAccountSettingsTemplate(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(200);
    const { result } = res;
    expect(result).not.toBeNull();
    expect(result.profile_templates).not.toBeNull();

    await updateAccountSettingsTemplateAssignment();
  }

  async function updateAccountSettingsTemplateAssignment() {
    const commitParams = {
      templateId: accountSettingsTemplateId,
      version: accountSettingsTemplateVersion,
    }

    const res = await iamIdentityService.commitAccountSettingsTemplate(commitParams);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);
    
    await waitUntilAccountSettingsAssignmentFinished(accountSettingsTemplateAssignmentId);

    const assignParams = {
      assignmentId: accountSettingsTemplateAssignmentId,
      templateVersion: accountSettingsTemplateVersion,
      ifMatch: accountSettingsTemplateAssignmentEtag,
    }

    const assRes = await iamIdentityService.updateAccountSettingsAssignment(assignParams);
    expect(assRes).not.toBeNull();
    expect(assRes.status).toEqual(202);

    await deleteAccountSettingsTemplateAssignment();
  }

  async function deleteAccountSettingsTemplateAssignment() {

    await waitUntilAccountSettingsAssignmentFinished(accountSettingsTemplateAssignmentId);

    const params = {
      assignmentId: accountSettingsTemplateAssignmentId,
    }
    const res = await iamIdentityService.deleteAccountSettingsAssignment(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(202);

    await deleteAccountSettingsTemplateVersion();
  }

  async function deleteAccountSettingsTemplateVersion() {
    await waitUntilAccountSettingsAssignmentFinished(accountSettingsTemplateAssignmentId);
    const params = {
      templateId: accountSettingsTemplateId,
      version: 1,
    }
    const res = await iamIdentityService.deleteAccountSettingsTemplateVersion(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);

    await testDeleteAccountSettingsTemplate();
  }

  async function testDeleteAccountSettingsTemplate() {

    await waitUntilAccountSettingsAssignmentFinished(accountSettingsTemplateAssignmentId);

    const params = {
      templateId: accountSettingsTemplateId,
    }
    const res = await iamIdentityService.deleteAllVersionsOfAccountSettingsTemplate(params);
    expect(res).not.toBeNull();
    expect(res.status).toEqual(204);

    accountSettingsTemplateScenarioComplete = true;
  }

  function getPageTokenFromURL(urlstring) {
    let pageToken = null;
    if (urlstring) {
      // We use a bogus "baseurl" in case "urlstring" is a relative url.
      // This is fine since we're only trying to retrieve the "offset" query parameter.
      const url = new URL(urlstring, 'https://fakehost.com');
      pageToken = url.searchParams.get('pagetoken');
    }
    return pageToken;
  }

  function isFinished(status) {
    return (status.toLowerCase() === "succeeded" || status.toLowerCase() === "failed");
  }

  async function waitUntilTrustedProfileAssignmentFinished(assignmentId) {
    let finished = false;
    const params = {
      assignmentId,
    }

    for (let i = 0; i < 60; i++) {
      try {
        const response = await iamIdentityService.getTrustedProfileAssignment(params);
        const { result } = response;
        finished = isFinished(result.status);
        if (finished) {
          profileTemplateAssignmentEtag= response.headers.etag;
          finished = true;
          break;
        }
        await sleep(10000);
      } catch (e) {
        if (e.status === 404) {
          finished = true;
          break;
        }
      }
    }
    expect(finished).toBe(true);
  }

  async function waitUntilAccountSettingsAssignmentFinished(assignmentId) {
    let finished = false;
    const params = {
      assignmentId,
    }

    for (let i = 0; i < 60; i++) {
      try {
        const response = await iamIdentityService.getAccountSettingsAssignment(params);
        const { result } = response;
        finished = isFinished(result.status);
        if (finished) {
          accountSettingsTemplateAssignmentEtag= response.headers.etag;
          finished = true;
          break;
        }
        await sleep(10000);
      } catch (e) {
        if (e.status === 404) {
          finished = true;
          break;
        }
      }
    }
    expect(finished).toBe(true);
  }

  async function getApiKeyById(apikeyId) {
    let result = null;
    try {
      const params = {
        id: apikeyId,
      };

      const res = await iamIdentityService.getApiKey(params);
      if (res != null) {
        result = res.result;
      }
      return result;
    } catch (err) {
      return result;
    }
  }

  async function getServiceId(serviceId) {
    let result = null;
    try {
      const params = {
        id: serviceId,
      };

      const res = await iamIdentityService.getServiceId(params);
      if (res != null) {
        result = res.result;
      }
      return result;
    } catch (err) {
      return result;
    }
  }

  async function getProfileById(profileId) {
    let result = null;
    try {
      const params = {
        profileId,
      };

      const res = await iamIdentityService.getProfile(params);
      if (res != null) {
        result = res.result;
      }
      return result;
    } catch (err) {
      return result;
    }
  }

  async function getClaimRuleById(profileId, claimRuleId) {
    let result = null;
    try {
      const params = {
        profileId,
        ruleId: claimRuleId,
      };

      const res = await iamIdentityService.getClaimRule(params);
      if (res != null) {
        result = res.result;
      }
      return result;
    } catch (err) {
      return result;
    }
  }

  async function getLinkById(profileId, linkId) {
    let result = null;
    try {
      const params = {
        profileId,
        linkId,
      };

      const res = await iamIdentityService.getLink(params);
      if (res != null) {
        result = res.result;
      }
      return result;
    } catch (err) {
      return result;
    }
  }
  async function cleanupResources() {
    console.log('Cleaning resources...');

    try {
      // list apikeys
      const apikeyParams = {
        accountId,
        iamId,
        pagesize: 100,
      };

      const apikeyResponse = await iamIdentityService.listApiKeys(apikeyParams);
      const apikeyResult = apikeyResponse.result;
      if (apikeyResult.apikeys) {
        for (const elem of apikeyResult.apikeys) {
          if (elem.name === apikeyName) {
            console.log('>>> Cleaning apikey: ', elem.id);
            const params = {
              id: elem.id,
            };
            const response = await iamIdentityService.deleteApiKey(params);
            expect(response).not.toBeNull();
            expect(response.status).toEqual(204);
          }
        }
      }

      // list serviceIds
      const serviceidParams = {
        accountId,
        name: serviceIdName,
        pagesize: 100,
      };

      const serviceidResponse = await iamIdentityService.listServiceIds(serviceidParams);
      const serviceidResult = serviceidResponse.result;
      if (serviceidResult.serviceids) {
        for (const elem of serviceidResult.serviceids) {
          console.log('Cleaning serviceId: ', elem.id);
          const params = {
            id: elem.id,
          };
          const response = await iamIdentityService.deleteServiceId(params);
          expect(response).not.toBeNull();
          expect(response.status).toEqual(204);
        }
      }

      // list profiles
      const profileParams = {
        accountId,
      };

      const profilesResponse = await iamIdentityService.listProfiles(profileParams);
      const profilesResult = profilesResponse.result;
      if (profilesResult.profiles) {
        for (const elem of profilesResult.profiles) {
          if (elem.name === 'Node-SDK-IT-Profile1' || elem.name === 'Node-SDK-IT-Profile2') {
          console.log('Cleaning profile: ', elem.id);
          const params = {
            profileId: elem.id,
          };
          const response = await iamIdentityService.deleteProfile(params);
          expect(response).not.toBeNull();
          expect(response.status).toEqual(204);
          }         
        }
      }

      // list profile templates
      const profileTemplateParams = {
        accountId: enterpriseAccountId,
      };
      const profileTemplatesResponse = await iamIdentityService.listProfileTemplates(profileTemplateParams);

      const profilesTemplatesResult = profileTemplatesResponse.result;
      if (profilesTemplatesResult.profile_templates) {
        for (const elem of profilesTemplatesResult.profile_templates) {
          if (elem.name === profileTemplateName) {
            console.log('Cleaning profile template: ', elem.id);
            // list profile template assignments
            const assignmentParams = {
              accountId: enterpriseAccountId,
              templateId: elem.id,
            }
            const assResponse = await iamIdentityService.listTrustedProfileAssignments(assignmentParams);
            expect(assResponse).not.toBeNull();
            expect(assResponse.status).toEqual(200);
            const assignmentsResult = assResponse.result;
            for (const assElem of assignmentsResult.assignments) {
              if (!isFinished(assElem.status)) {
                await waitUntilTrustedProfileAssignmentFinished(assElem.id);
              }
              const delAssParams = {
                assignmentId: assElem.id,
              }
              const assDelResponse = await iamIdentityService.deleteTrustedProfileAssignment(delAssParams);
              expect(assDelResponse).not.toBeNull();
              expect(assDelResponse.status).toEqual(202);
              await waitUntilTrustedProfileAssignmentFinished(assElem.id);
            }
            const deleteParams = {
              templateId: elem.id,
            };
            const response = await iamIdentityService.deleteAllVersionsOfProfileTemplate(deleteParams);
            expect(response).not.toBeNull();
            expect(response.status).toEqual(204);
          }
        }
      }

      // list account settings templates
      const accountSettingsTemplateParams = {
        accountId: enterpriseAccountId,
      };
      const accountSettingsTemplatesResponse = await iamIdentityService.listAccountSettingsTemplates(accountSettingsTemplateParams);

      const accountSettingsTemplatesResult = accountSettingsTemplatesResponse.result;
      if (accountSettingsTemplatesResult.account_settings_templates) {
        for (const elem of accountSettingsTemplatesResult.account_settings_templates) {
          if (elem.name === accountSettingsTemplateName) {
            console.log('Cleaning account settings template: ', elem.id);
            // list account settings template assignments
            const assignmentParams = {
              accountId: enterpriseAccountId,
              templateId: elem.id,
            }
            const assResponse = await iamIdentityService.listAccountSettingsAssignments(assignmentParams);
            expect(assResponse).not.toBeNull();
            expect(assResponse.status).toEqual(200);
            const assignmentsResult = assResponse.result;
            for (const assElem of assignmentsResult.assignments) {
              if (!isFinished(assElem.status)) {
                await waitUntilAccountSettingsAssignmentFinished(assElem.id);
              }
              const delAssParams = {
                assignmentId: assElem.id,
              }
              const assDelResponse = await iamIdentityService.deleteAccountSettingsAssignment(delAssParams);
              expect(assDelResponse).not.toBeNull();
              expect(assDelResponse.status).toEqual(202);
              await waitUntilAccountSettingsAssignmentFinished(assElem.id);
            }
            const deleteParams = {
              templateId: elem.id,
            };
            const response = await iamIdentityService.deleteAllVersionsOfAccountSettingsTemplate(deleteParams);
            expect(response).not.toBeNull();
            expect(response.status).toEqual(204);
          }
        }
      }

      console.log('Finished cleaning resources!');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
});
