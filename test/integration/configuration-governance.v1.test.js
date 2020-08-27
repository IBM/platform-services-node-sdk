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
const ConfigurationGovernanceV1 = require('../../dist/configuration-governance/v1');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'configuration_governance_v1.env';

const describe = authHelper.prepareTests(configFile);

describe('ConfigurationGovernanceV1_integration', () => {
  const configurationGovernanceService = ConfigurationGovernanceV1.newInstance({});

  jest.setTimeout(timeout);

  test('createRules()', done => {
    // Request models needed by this operation.

    // UISupport
    const uiSupportModel = {
      display_name: 'testString',
      description: 'testString',
    };

    // RuleImport
    const ruleImportModel = {
      name: 'testString',
      ui_support: uiSupportModel,
    };

    // RuleTargetAttribute
    const ruleTargetAttributeModel = {
      name: 'resource_id',
      operator: 'string_equals',
      value: 'f0f8f7994e754ff38f9d370201966561',
    };

    // TargetResource
    const targetResourceModel = {
      service_name: 'iam-groups',
      resource_kind: 'zone',
      additional_target_attributes: [{ name: 'resource_id', operator: 'string_equals', value: 'f0f8f7994e754ff38f9d370201966561' }],
    };

    // RuleRequiredConfigSingleProperty
    const ruleRequiredConfigModel = {
      description: 'testString',
      property: 'public_access_enabled',
      operator: 'is_true',
      value: 'testString',
    };

    // EnforcementAction
    const enforcementActionModel = {
      action: 'disallow',
    };

    // RuleRequest
    const ruleRequestModel = {
      account_id: 'testString',
      name: 'testString',
      description: 'testString',
      version: '1.0.0',
      rule_type: 'user_defined',
      imports: [ruleImportModel],
      target: targetResourceModel,
      required_config: ruleRequiredConfigModel,
      enforcement_actions: [{ action: 'disallow' }, { action: 'audit_log' }],
      labels: ['SOC2', 'ITCS300'],
    };

    // CreateRuleRequest
    const createRuleRequestModel = {
      request_id: '3cebc877-58e7-44a5-a292-32114fa73558',
      rule: ruleRequestModel,
    };

    const params = {
      rules: [createRuleRequestModel],
      transactionId: 'testString',
    };

    configurationGovernanceService
      .createRules(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('listRules()', done => {
    const params = {
      accountId: 'testString',
      transactionId: 'testString',
      attached: true,
      labels: 'SOC2,ITCS300',
      scopes: 'scope_id',
      limit: 1000,
      offset: 38,
    };

    configurationGovernanceService
      .listRules(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('getRule()', done => {
    const params = {
      ruleId: 'testString',
      transactionId: 'testString',
    };

    configurationGovernanceService
      .getRule(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('updateRule()', done => {
    // Request models needed by this operation.

    // RuleTargetAttribute
    const ruleTargetAttributeModel = {
      name: 'resource_id',
      operator: 'string_equals',
      value: 'f0f8f7994e754ff38f9d370201966561',
    };

    // TargetResource
    const targetResourceModel = {
      service_name: 'iam-groups',
      resource_kind: 'zone',
      additional_target_attributes: [{ name: 'resource_id', operator: 'string_equals', value: 'f0f8f7994e754ff38f9d370201966561' }],
    };

    // RuleRequiredConfigSingleProperty
    const ruleRequiredConfigModel = {
      description: 'testString',
      property: 'public_access_enabled',
      operator: 'is_true',
      value: 'testString',
    };

    // EnforcementAction
    const enforcementActionModel = {
      action: 'audit_log',
    };

    // UISupport
    const uiSupportModel = {
      display_name: 'testString',
      description: 'testString',
    };

    // RuleImport
    const ruleImportModel = {
      name: 'testString',
      ui_support: uiSupportModel,
    };

    const params = {
      ruleId: 'testString',
      ifMatch: 'testString',
      name: 'Disable public access',
      description: 'Ensure that public access to account resources is disabled.',
      target: { 'service_name': 'iam-groups', 'resource_kind': 'service', 'additional_target_attributes': [] },
      requiredConfig: { property: 'public_access_enabled', operator: 'is_false' },
      enforcementActions: [{ action: 'audit_log' }, { action: 'disallow' }],
      accountId: '531fc3e28bfc43c5a2cea07786d93f5c',
      version: '1.0.0',
      ruleType: 'user_defined',
      imports: [ruleImportModel],
      labels: ['SOC2', 'ITCS300'],
      transactionId: 'testString',
    };

    configurationGovernanceService
      .updateRule(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('createAttachments()', done => {
    // Request models needed by this operation.

    // RuleScope
    const ruleScopeModel = {
      note: 'testString',
      scope_id: 'testString',
      scope_type: 'enterprise',
    };

    // AttachmentRequest
    const attachmentRequestModel = {
      account_id: 'testString',
      included_scope: ruleScopeModel,
      excluded_scopes: [
        { note: 'test account group', scope_id: '82f60bdb-250a-49a5-9af0-d925f0a88e32', scope_type: 'enterprise.account_group' },
        { note: 'test account', scope_id: '3a34e60a-46b8-47c9-9192-9d4fe3665217', scope_type: 'enterprise.account' },
      ],
    };

    const params = {
      ruleId: 'testString',
      attachments: [
        {
          attachment_id: 'attachment-4301178a-8028-4220-9cb6-dfb86f09da99',
          account_id: '531fc3e28bfc43c5a2cea07786d93f5c',
          rule_id: 'rule-702d1db7-ca4a-414b-8464-2b517a065c14',
          included_scope: { note: 'My enterprise', scope_id: '282cf433ac91493ba860480d92519990', scope_type: 'enterprise' },
          excluded_scopes: [{ note: 'Development account group', scope_id: '0142f84c2d7e4987b63fe8f98543d59f', scope_type: 'enterprise.account_group' }],
        },
      ],
      transactionId: 'testString',
    };

    configurationGovernanceService
      .createAttachments(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('listAttachments()', done => {
    const params = {
      ruleId: 'testString',
      transactionId: 'testString',
      limit: 1000,
      offset: 38,
    };

    configurationGovernanceService
      .listAttachments(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('getAttachment()', done => {
    const params = {
      ruleId: 'testString',
      attachmentId: 'testString',
      transactionId: 'testString',
    };

    configurationGovernanceService
      .getAttachment(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('updateAttachment()', done => {
    // Request models needed by this operation.

    // RuleScope
    const ruleScopeModel = {
      note: 'testString',
      scope_id: 'testString',
      scope_type: 'enterprise',
    };

    const params = {
      ruleId: 'testString',
      attachmentId: 'testString',
      ifMatch: 'testString',
      accountId: 'testString',
      includedScope: ruleScopeModel,
      excludedScopes: [
        { note: 'test account group', scope_id: '82f60bdb-250a-49a5-9af0-d925f0a88e32', scope_type: 'enterprise.account_group' },
        { note: 'test account', scope_id: '3a34e60a-46b8-47c9-9192-9d4fe3665217', scope_type: 'enterprise.account' },
      ],
      transactionId: 'testString',
    };

    configurationGovernanceService
      .updateAttachment(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteRule()', done => {
    const params = {
      ruleId: 'testString',
      transactionId: 'testString',
    };

    configurationGovernanceService
      .deleteRule(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
  test('deleteAttachment()', done => {
    const params = {
      ruleId: 'testString',
      attachmentId: 'testString',
      transactionId: 'testString',
    };

    configurationGovernanceService
      .deleteAttachment(params)
      .then(res => {
        done();
      })
      .catch(err => {
        console.warn(err);
        done(err);
      });
  });
});
