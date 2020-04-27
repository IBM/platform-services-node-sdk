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

'use strict';

const EnterpriseManagementV1 = require('../../dist/enterprise-management/v1');
const authHelper = require('../resources/auth-helper.js');
const am_coe_v2_account_apis_helper = require('../integration/am_coe_v2_account_apis.js');
const async = require('async');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'enterprise-management.env';

const describe = authHelper.prepareTests(configFile);
const config = authHelper.loadConfig();

let parent = 'crn:v1:bluemix:public:enterprise::a/f0c4bd1370d547c1a7d7418380c3fe1d::enterprise:26afe35c608e42f398fb200606f87f21';
const primaryContactIamId = 'IBMid-550006M6HE';
const limit = 100;
const enterpriseId = '26afe35c608e42f398fb200606f87f21';
let parentAccountGroupId;
let am_service_iam_token;
let owner_iam_id;
const retry_params = { times: 12, interval: 10000 };
let activation_token;
let account_id;
let subscription_id;

describe('EnterpriseManagementV1_integration', () => {
  jest.setTimeout(timeout);
  const account_info = am_coe_v2_account_apis_helper.get_default_account_info();
  let service;

  it('should successfully complete initialization', done => {
    service = EnterpriseManagementV1.newInstance({});
    expect(service).not.toBeNull();
    done();
  });

  it('should create an account group', done => {
    const params = {
      parent: parent,
      name: `IBM-${new Date().getTime()}`,
      primaryContactIamId: primaryContactIamId,
    };
    return service
      .createAccountGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(201);

        parentAccountGroupId = response.result.account_group_id;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get account groups by query parameter', done => {
    const params = {
      enterpriseId: enterpriseId,
      parentAccountGroupId: parentAccountGroupId,
      parent: parent,
      limit: limit,
    };
    service
      .listAccountGroups(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get account group by id', done => {
    const params = {
      accountGroupId: parentAccountGroupId,
    };
    return service
      .getAccountGroupById(params)
      .then(response => {
        parent = response.result.crn;
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should update an account group', done => {
    const params = {
      name: `IBM-${new Date().getTime()}`,
      accountGroupId: parentAccountGroupId,
    };
    return service
      .updateAccountGroup(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(204);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get permissible actions for an account group.', done => {
    const params = {
      actions: ['testString'],
      accountGroupId: parentAccountGroupId,
    };
    return service
      .getAccountGroupPermissibleActions(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Create a Standard Account - should generate IAM service token', done => {
    am_coe_v2_account_apis_helper.generate_iam_service_token(config.IAM_HOST, config.IAM_BASIC_AUTH, config.IAM_API_KEY, (e, token) => {
      am_service_iam_token = `bearer ${token}`;
      done();
    });
  });

  account_info.email = `aminttest+${new Date().getTime()}_${Math.floor(Math.random() * 10000)}@mail.test.ibm.com`;

  it('Create a Standard Account - calls POST /coe/v2/accounts with BSS token', done => {
    const payload = am_coe_v2_account_apis_helper.get_account_payload(account_info.email, 'STANDARD', 'ACTIVE');
    am_coe_v2_account_apis_helper.post_am_coe_v2_accounts(config.AM_HOST, payload, am_service_iam_token, (e, r, b) => {
      account_info.account_id = r.id;
      done();
    });
  });

  it('Create a Standard Account - waits until activation token is generated', done => {
    const db_activation_token = am_coe_v2_account_apis_helper.fetch_db_activation_token(config.DB_URL, config.ACTIVATION_DB_NAME, config.DB_USER, config.DB_PASS, account_info.email);
    async.retry(retry_params, db_activation_token, (e, token) => {
      activation_token = token;
      done();
    });
  });

  it('Create a Standard Account - waits until create process is done', done => {
    const db_activation_token = am_coe_v2_account_apis_helper.fetch_db_activation_token(config.DB_URL, config.ACTIVATION_DB_NAME, config.DB_USER, config.DB_PASS, account_info.email);
    async.retry(retry_params, db_activation_token, (e, end_record) => {
      done();
    });
  });

  it('Create a Standard Account - calls GET /coe/v2/accounts/:account_id with BSS token', done => {
    am_coe_v2_account_apis_helper.get_am_coe_v2_account_by_id(config.AM_HOST, account_info.account_id, am_service_iam_token, (e, r, b) => {
      done();
    });
  });

  it('Create a Standard Account - calls GET /coe/v2/accounts/verify?email=******&token=****** to activate the account', done => {
    am_coe_v2_account_apis_helper.get_am_coe_v2_accounts_verify(config.AM_HOST, account_info.email, activation_token, (e, r, b) => {
      done();
    });
  });

  it('Create a Standard Account - calls GET /coe/v2/accounts/:account_id with BSS token', done => {
    am_coe_v2_account_apis_helper.get_am_coe_v2_account_by_id(config.AM_HOST, account_info.account_id, am_service_iam_token, (e, r, b) => {
      owner_iam_id = b.entity.owner_iam_id;
      subscription_id = b.entity.subscription_id;
      done();
    });
  });

  it('should import this Standard account into an enterprise', done => {
    const params = {
      enterpriseId: enterpriseId,
      accountId: account_info.account_id,
    };
    return service
      .importAccountToEnterprise(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(202);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get account by id', done => {
    const params = {
      accountId: account_info.account_id,
    };
    return service
      .getAccountById(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  account_info.email = `aminttest+${new Date().getTime()}_${Math.floor(Math.random() * 10000)}@mail.test.ibm.com`;

  it('Create a Subscription Account - calls POST /coe/v2/accounts with BSS token', done => {
    const payload = am_coe_v2_account_apis_helper.get_account_payload(account_info.email, 'STANDARD', 'ACTIVE');
    am_coe_v2_account_apis_helper.post_am_coe_v2_accounts(config.AM_HOST, payload, am_service_iam_token, (e, r, b) => {
      account_info.account_id = r.id;
      done();
    });
  });

  it('Create a Subscription Account - waits until activation token is generated', done => {
    const db_activation_token = am_coe_v2_account_apis_helper.fetch_db_activation_token(config.DB_URL, config.ACTIVATION_DB_NAME, config.DB_USER, config.DB_PASS, account_info.email);
    async.retry(retry_params, db_activation_token, (e, token) => {
      activation_token = token;
      done();
    });
  });

  it('Create a Subscription Account - waits until create process is done', done => {
    const db_activation_token = am_coe_v2_account_apis_helper.fetch_db_activation_token(config.DB_URL, config.ACTIVATION_DB_NAME, config.DB_USER, config.DB_PASS, account_info.email);
    async.retry(retry_params, db_activation_token, (e, end_record) => {
      done();
    });
  });

  it('Create a Subscription Account - calls GET /coe/v2/accounts/:account_id with BSS token', done => {
    am_coe_v2_account_apis_helper.get_am_coe_v2_account_by_id(config.AM_HOST, account_info.account_id, am_service_iam_token, (e, r, b) => {
      done();
    });
  });

  it('Create a Subscription Account - calls GET /coe/v2/accounts/verify?email=******&token=****** to activate the account', done => {
    am_coe_v2_account_apis_helper.get_am_coe_v2_accounts_verify(config.AM_HOST, account_info.email, activation_token, (e, r, b) => {
      done();
    });
  });

  it('Create a Subscription Account - calls GET /coe/v2/accounts/:account_id with BSS token', done => {
    am_coe_v2_account_apis_helper.get_am_coe_v2_account_by_id(config.AM_HOST, account_info.account_id, am_service_iam_token, (e, r, b) => {
      owner_iam_id = b.entity.owner_iam_id;
      subscription_id = b.entity.subscription_id;
      done();
    });
  });

  it('Create a Subscription Account - convert account to subscription', done => {
    const payload_to_convert = am_coe_v2_account_apis_helper.get_activate_subscription_payload('2020-03-01T07:00:00.000Z', '2020-11-30T08:00:00.000', 10);
    delete payload_to_convert['softlayer_account_id'];
    am_coe_v2_account_apis_helper.patch_am_coe_v2_account_subscription(config.AM_HOST, account_info.account_id, subscription_id, payload_to_convert, am_service_iam_token, null, (e, r, b) => {
      done();
    });
  });

  it('Create a Subscription Account - calls GET /coe/v2/accounts/:account_id with BSS token', done => {
    am_coe_v2_account_apis_helper.get_am_coe_v2_account_by_id(config.AM_HOST, account_info.account_id, am_service_iam_token, (e, r, b) => {
      owner_iam_id = b.entity.owner_iam_id;
      subscription_id = b.entity.subscription_id;
      done();
    });
  });

  it('should create an enterprise using this Subscription Account', done => {
    const params = {
      name: `IBM-${new Date().getTime()}`,
      domain: `IBM-${new Date().getTime()}.com`,
      primaryContactIamId: owner_iam_id,
      sourceAccountId: account_info.account_id,
    };
    return service
      .createEnterprise(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(202);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should create a new account in an enterprise', done => {
    const params = {
      parent: parent,
      name: `IBM-${new Date().getTime()}`,
      ownerIamId: 'IBMid-550006JKXX',
    };
    return service
      .createAccount(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        account_id = response.result.account_id;
        expect(response.status).toBe(202);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get account by id', done => {
    const params = {
      accountId: account_id,
    };
    return service
      .getAccountById(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get accounts by query parameter', done => {
    const params = {
      enterpriseId: enterpriseId,
      accountGroupId: parentAccountGroupId,
      parent: parent,
      limit: limit,
    };
    return service
      .listAccounts(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should move an account with the enterprise', done => {
    const params = {
      parent: 'crn:v1:bluemix:public:enterprise::a/f0c4bd1370d547c1a7d7418380c3fe1d::account-group:cb8d8788f902402aacb81065fd53fde8',
      accountId: account_id,
    };
    return service
      .updateAccount(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(202);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('should get permissible actions for an account', done => {
    const params = {
      actions: ['testString'],
      accountId: account_info.account_id,
    };
    return service
      .getAccountPermissibleActions(params)
      .then(response => {
        expect(response.hasOwnProperty('status')).toBe(true);
        expect(response.status).toBe(200);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
