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

describe('CatalogManagementV1_integration', () => {
  jest.setTimeout(timeout);

  // Service instance
  let catalogManagementService;

  // Variables to hold link values
  let accountRevLink;
  let catalogIdLink;
  let catalogRevLink;
  let objectIdLink;
  let objectRevLink;
  let offeringIdLink;
  let offeringRevLink;
  let versionIdLink;
  let versionLocatorLink;
  let versionRevLink;

  test('Initialize service', async () => {
    catalogManagementService = CatalogManagementV1.newInstance();

    expect(catalogManagementService).not.toBeNull();

    const config = readExternalSources(CatalogManagementV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    catalogManagementService.enableRetries();
  });

  test('getCatalogAccount()', async () => {
    const res = await catalogManagementService.getCatalogAccount();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    accountRevLink = res.result._rev;
  });

  test('updateCatalogAccount()', async () => {
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
      rev: 'testString',
      hideIbmCloudCatalog: true,
      accountFilters: filtersModel,
    };

    const res = await catalogManagementService.updateCatalogAccount(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    accountRevLink = res.result._rev;
  });

  test('createCatalog()', async () => {
    // Request models needed by this operation.

    // Feature
    const featureModel = {
      title: 'testString',
      title_i18n: { 'key1': 'testString' },
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
    };

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

    // SyndicationCluster
    const syndicationClusterModel = {
      region: 'testString',
      id: 'testString',
      name: 'testString',
      resource_group_name: 'testString',
      type: 'testString',
      namespaces: ['testString'],
      all_namespaces: true,
    };

    // SyndicationHistory
    const syndicationHistoryModel = {
      namespaces: ['testString'],
      clusters: [syndicationClusterModel],
      last_run: '2019-01-01T12:00:00.000Z',
    };

    // SyndicationAuthorization
    const syndicationAuthorizationModel = {
      token: 'testString',
      last_run: '2019-01-01T12:00:00.000Z',
    };

    // SyndicationResource
    const syndicationResourceModel = {
      remove_related_components: true,
      clusters: [syndicationClusterModel],
      history: syndicationHistoryModel,
      authorization: syndicationAuthorizationModel,
    };

    // TrustedProfileInfo
    const trustedProfileInfoModel = {
      trusted_profile_id: 'testString',
      catalog_crn: 'testString',
      catalog_name: 'testString',
      target_service_id: 'testString',
    };

    // TargetAccountContext
    const targetAccountContextModel = {
      api_key: 'testString',
      trusted_profile: trustedProfileInfoModel,
      name: 'testString',
      label: 'testString',
      project_id: 'testString',
    };

    const params = {
      label: 'testString',
      labelI18n: { 'key1': 'testString' },
      shortDescription: 'testString',
      shortDescriptionI18n: { 'key1': 'testString' },
      catalogIconUrl: 'testString',
      catalogBannerUrl: 'testString',
      tags: ['testString'],
      features: [featureModel],
      disabled: true,
      resourceGroupId: 'testString',
      owningAccount: 'testString',
      catalogFilters: filtersModel,
      syndicationSettings: syndicationResourceModel,
      kind: 'testString',
      metadata: { anyKey: 'anyValue' },
      targetAccountContexts: [targetAccountContextModel],
    };

    const res = await catalogManagementService.createCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    catalogIdLink = res.result.id;
    catalogRevLink = res.result._rev;
  });

  test('getCatalog()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
    };

    const res = await catalogManagementService.getCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    catalogRevLink = res.result._rev;
  });

  test('replaceCatalog()', async () => {
    // Request models needed by this operation.

    // Feature
    const featureModel = {
      title: 'testString',
      title_i18n: { 'key1': 'testString' },
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
    };

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

    // SyndicationCluster
    const syndicationClusterModel = {
      region: 'testString',
      id: 'testString',
      name: 'testString',
      resource_group_name: 'testString',
      type: 'testString',
      namespaces: ['testString'],
      all_namespaces: true,
    };

    // SyndicationHistory
    const syndicationHistoryModel = {
      namespaces: ['testString'],
      clusters: [syndicationClusterModel],
      last_run: '2019-01-01T12:00:00.000Z',
    };

    // SyndicationAuthorization
    const syndicationAuthorizationModel = {
      token: 'testString',
      last_run: '2019-01-01T12:00:00.000Z',
    };

    // SyndicationResource
    const syndicationResourceModel = {
      remove_related_components: true,
      clusters: [syndicationClusterModel],
      history: syndicationHistoryModel,
      authorization: syndicationAuthorizationModel,
    };

    // TrustedProfileInfo
    const trustedProfileInfoModel = {
      trusted_profile_id: 'testString',
      catalog_crn: 'testString',
      catalog_name: 'testString',
      target_service_id: 'testString',
    };

    // TargetAccountContext
    const targetAccountContextModel = {
      api_key: 'testString',
      trusted_profile: trustedProfileInfoModel,
      name: 'testString',
      label: 'testString',
      project_id: 'testString',
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      id: 'testString',
      rev: 'testString',
      label: 'testString',
      labelI18n: { 'key1': 'testString' },
      shortDescription: 'testString',
      shortDescriptionI18n: { 'key1': 'testString' },
      catalogIconUrl: 'testString',
      catalogBannerUrl: 'testString',
      tags: ['testString'],
      features: [featureModel],
      disabled: true,
      resourceGroupId: 'testString',
      owningAccount: 'testString',
      catalogFilters: filtersModel,
      syndicationSettings: syndicationResourceModel,
      kind: 'testString',
      metadata: { anyKey: 'anyValue' },
      targetAccountContexts: [targetAccountContextModel],
    };

    const res = await catalogManagementService.replaceCatalog(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    catalogRevLink = res.result._rev;
  });

  test('replaceOffering()', async () => {
    // Request models needed by this operation.

    // Rating
    const ratingModel = {
      one_star_count: 38,
      two_star_count: 38,
      three_star_count: 38,
      four_star_count: 38,
    };

    // Feature
    const featureModel = {
      title: 'testString',
      title_i18n: { 'key1': 'testString' },
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
    };

    // Flavor
    const flavorModel = {
      name: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      index: 38,
    };

    // RenderTypeAssociationsParametersItem
    const renderTypeAssociationsParametersItemModel = {
      name: 'testString',
      optionsRefresh: true,
    };

    // RenderTypeAssociations
    const renderTypeAssociationsModel = {
      parameters: [renderTypeAssociationsParametersItemModel],
    };

    // RenderType
    const renderTypeModel = {
      type: 'testString',
      grouping: 'testString',
      original_grouping: 'testString',
      grouping_index: 38,
      config_constraints: { anyKey: 'anyValue' },
      associations: renderTypeAssociationsModel,
    };

    // Configuration
    const configurationModel = {
      key: 'testString',
      type: 'testString',
      default_value: 'testString',
      display_name: 'testString',
      value_constraint: 'testString',
      description: 'testString',
      required: true,
      options: ['testString'],
      hidden: true,
      custom_config: renderTypeModel,
      type_metadata: 'testString',
    };

    // Output
    const outputModel = {
      key: 'testString',
      description: 'testString',
    };

    // IAMResource
    const iamResourceModel = {
      name: 'testString',
      description: 'testString',
      role_crns: ['testString'],
    };

    // IAMPermission
    const iamPermissionModel = {
      service_name: 'testString',
      role_crns: ['testString'],
      resources: [iamResourceModel],
    };

    // Validation
    const validationModel = {
      validated: '2019-01-01T12:00:00.000Z',
      requested: '2019-01-01T12:00:00.000Z',
      state: 'testString',
      last_operation: 'testString',
      target: { anyKey: 'anyValue' },
      message: 'testString',
    };

    // Resource
    const resourceModel = {
      type: 'mem',
      value: 'testString',
    };

    // SchematicsEnvValues
    const schematicsEnvValuesModel = {
      value: '[{"name": "TF_LOG","value": "TRACE","secure": false,"hidden": false}]',
      sm_ref: 'cmsm_v1:{"name": "envVarSecret","id":"1234567890","service_id":"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::","service_name":"My SM Instance","group_id":"1234567890","group_name":"My SM Group","resource_group_id":"1234567890","region":"eu-gb","type":"arbitrary"}',
    };

    // Script
    const scriptModel = {
      instructions: 'testString',
      instructions_i18n: { 'key1': 'testString' },
      script: 'testString',
      script_permission: 'testString',
      delete_script: 'testString',
      scope: 'testString',
    };

    // ScriptRef
    const scriptRefModel = {
      short_description: 'testString',
      type: 'ansible',
      path: 'scripts/validate-post-ansible-playbook.yaml',
      stage: 'pre',
      action: 'validate',
    };

    // VersionEntitlement
    const versionEntitlementModel = {
      provider_name: 'testString',
      provider_id: 'testString',
      product_id: 'testString',
      part_numbers: ['testString'],
      image_repo_name: 'testString',
    };

    // License
    const licenseModel = {
      id: 'testString',
      name: 'testString',
      type: 'testString',
      url: 'testString',
      description: 'testString',
    };

    // State
    const stateModel = {
      current: 'testString',
      current_entered: '2019-01-01T12:00:00.000Z',
      pending: 'testString',
      pending_requested: '2019-01-01T12:00:00.000Z',
      previous: 'testString',
    };

    // DeprecatePending
    const deprecatePendingModel = {
      deprecate_date: '2019-01-01T12:00:00.000Z',
      deprecate_state: 'testString',
      description: 'testString',
    };

    // URLProxy
    const urlProxyModel = {
      url: 'testString',
      sha: 'testString',
    };

    // MediaItem
    const mediaItemModel = {
      url: 'testString',
      api_url: 'testString',
      url_proxy: urlProxyModel,
      caption: 'testString',
      caption_i18n: { 'key1': 'testString' },
      type: 'testString',
      thumbnail_url: 'testString',
    };

    // ArchitectureDiagram
    const architectureDiagramModel = {
      diagram: mediaItemModel,
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
    };

    // CostComponent
    const costComponentModel = {
      name: 'testString',
      unit: 'testString',
      hourlyQuantity: 'testString',
      monthlyQuantity: 'testString',
      price: 'testString',
      hourlyCost: 'testString',
      monthlyCost: 'testString',
    };

    // CostResource
    const costResourceModel = {
      name: 'testString',
      metadata: { anyKey: 'anyValue' },
      hourlyCost: 'testString',
      monthlyCost: 'testString',
      costComponents: [costComponentModel],
    };

    // CostBreakdown
    const costBreakdownModel = {
      totalHourlyCost: 'testString',
      totalMonthlyCost: 'testString',
      resources: [costResourceModel],
    };

    // CostSummary
    const costSummaryModel = {
      totalDetectedResources: 38,
      totalSupportedResources: 38,
      totalUnsupportedResources: 38,
      totalUsageBasedResources: 38,
      totalNoPriceResources: 38,
      unsupportedResourceCounts: { 'key1': 38 },
      noPriceResourceCounts: { 'key1': 38 },
    };

    // Project
    const projectModel = {
      name: 'testString',
      metadata: { anyKey: 'anyValue' },
      pastBreakdown: costBreakdownModel,
      breakdown: costBreakdownModel,
      diff: costBreakdownModel,
      summary: costSummaryModel,
    };

    // CostEstimate
    const costEstimateModel = {
      version: 'testString',
      currency: 'testString',
      projects: [projectModel],
      summary: costSummaryModel,
      totalHourlyCost: 'testString',
      totalMonthlyCost: 'testString',
      pastTotalHourlyCost: 'testString',
      pastTotalMonthlyCost: 'testString',
      diffTotalHourlyCost: 'testString',
      diffTotalMonthlyCost: 'testString',
      timeGenerated: '2019-01-01T12:00:00.000Z',
    };

    // OfferingReference
    const offeringReferenceModel = {
      catalog_id: 'testString',
      id: 'testString',
      name: 'testString',
      kind: 'testString',
      version: 'testString',
      flavors: ['testString'],
    };

    // SolutionInfo
    const solutionInfoModel = {
      architecture_diagrams: [architectureDiagramModel],
      features: [featureModel],
      cost_estimate: costEstimateModel,
      dependencies: [offeringReferenceModel],
      install_type: 'testString',
    };

    // SCCProfile
    const sccProfileModel = {
      id: 'testString',
      name: 'testString',
      version: 'testString',
      description: 'testString',
      type: 'testString',
      ui_href: 'testString',
    };

    // ClaimedControl
    const claimedControlModel = {
      profile: sccProfileModel,
      names: ['testString'],
    };

    // Claims
    const claimsModel = {
      profiles: [sccProfileModel],
      controls: [claimedControlModel],
    };

    // Result
    const resultModel = {
      failure_count: 38,
      scan_time: '2019-01-01T12:00:00.000Z',
      error_message: 'testString',
      complete_scan: true,
      unscanned_resources: ['testString'],
    };

    // SCCAssessment
    const sccAssessmentModel = {
      id: 'testString',
      description: 'testString',
      version: 'testString',
      type: 'testString',
      method: 'testString',
      ui_href: 'testString',
    };

    // SCCSpecification
    const sccSpecificationModel = {
      id: 'testString',
      description: 'testString',
      component_name: 'testString',
      assessments: [sccAssessmentModel],
      ui_href: 'testString',
    };

    // SCCControl
    const sccControlModel = {
      id: 'testString',
      name: 'testString',
      version: 'testString',
      description: 'testString',
      profile: sccProfileModel,
      parent_name: 'testString',
      specifications: [sccSpecificationModel],
      ui_href: 'testString',
    };

    // EvaluatedControl
    const evaluatedControlModel = {
      id: 'testString',
      name: 'testString',
      description: 'testString',
      specifications: [sccSpecificationModel],
      failure_count: 38,
      pass_count: 38,
      parent: sccControlModel,
      ui_href: 'testString',
    };

    // Evaluation
    const evaluationModel = {
      scan_id: 'testString',
      account_id: 'testString',
      profile: sccProfileModel,
      result: resultModel,
      controls: [evaluatedControlModel],
    };

    // Compliance
    const complianceModel = {
      authority: 'testString',
      claims: claimsModel,
      evaluations: [evaluationModel],
    };

    // Version
    const versionModel = {
      crn: 'testString',
      version: 'testString',
      flavor: flavorModel,
      sha: 'testString',
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      offering_id: offeringIdLink,
      catalog_id: catalogIdLink,
      kind_id: 'testString',
      tags: ['testString'],
      repo_url: 'testString',
      source_url: 'testString',
      tgz_url: 'testString',
      configuration: [configurationModel],
      outputs: [outputModel],
      iam_permissions: [iamPermissionModel],
      metadata: { anyKey: 'anyValue' },
      validation: validationModel,
      required_resources: [resourceModel],
      single_instance: true,
      schematics_env_values: schematicsEnvValuesModel,
      install: scriptModel,
      pre_install: [scriptModel],
      scripts: { 'key1': scriptRefModel },
      entitlement: versionEntitlementModel,
      licenses: [licenseModel],
      image_manifest_url: 'testString',
      deprecated: true,
      package_version: 'testString',
      state: stateModel,
      version_locator: versionIdLink,
      long_description: 'testString',
      long_description_i18n: { 'key1': 'testString' },
      whitelisted_accounts: ['testString'],
      image_pull_key_name: 'testString',
      deprecate_pending: deprecatePendingModel,
      solution_info: solutionInfoModel,
      is_consumable: true,
      compliance_v3: complianceModel,
    };

    // Kind
    const kindModel = {
      id: 'testString',
      format_kind: 'testString',
      install_kind: 'testString',
      target_kind: 'testString',
      metadata: { anyKey: 'anyValue' },
      tags: ['testString'],
      additional_features: [featureModel],
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      versions: [versionModel],
    };

    // PublishObject
    const publishObjectModel = {
      pc_managed: true,
      approval_type: 'testString',
      publish_approved: true,
      share_with_all: true,
      share_with_ibm: true,
      share_enabled: true,
      original_crn: 'testString',
      public_crn: 'testString',
      approval_record: { anyKey: 'anyValue' },
      permit_ibm_public_publish: true,
      ibm_approved: true,
      public_approved: true,
    };

    // ProviderInfo
    const providerInfoModel = {
      id: 'testString',
      name: 'testString',
    };

    // RepoInfo
    const repoInfoModel = {
      token: 'testString',
      type: 'testString',
    };

    // ImagePullKey
    const imagePullKeyModel = {
      name: 'testString',
      value: 'testString',
      description: 'testString',
    };

    // SupportWaitTime
    const supportWaitTimeModel = {
      value: 38,
      type: 'testString',
    };

    // SupportTime
    const supportTimeModel = {
      day: 38,
      start_time: 'testString',
      end_time: 'testString',
    };

    // SupportAvailability
    const supportAvailabilityModel = {
      times: [supportTimeModel],
      timezone: 'testString',
      always_available: true,
    };

    // SupportDetail
    const supportDetailModel = {
      type: 'testString',
      contact: 'testString',
      response_wait_time: supportWaitTimeModel,
      availability: supportAvailabilityModel,
    };

    // SupportEscalation
    const supportEscalationModel = {
      escalation_wait_time: supportWaitTimeModel,
      response_wait_time: supportWaitTimeModel,
      contact: 'testString',
    };

    // Support
    const supportModel = {
      url: 'testString',
      process: 'testString',
      process_i18n: { 'key1': 'testString' },
      locations: ['testString'],
      support_details: [supportDetailModel],
      support_escalation: supportEscalationModel,
      support_type: 'testString',
    };

    // LearnMoreLinks
    const learnMoreLinksModel = {
      first_party: 'testString',
      third_party: 'testString',
    };

    // Constraint
    const constraintModel = {
      type: 'testString',
      rule: 'testString',
    };

    // Badge
    const badgeModel = {
      id: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
      icon: 'testString',
      authority: 'testString',
      tag: 'testString',
      learn_more_links: learnMoreLinksModel,
      constraints: [constraintModel],
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      id: 'testString',
      rev: 'testString',
      url: 'testString',
      crn: 'testString',
      label: 'testString',
      labelI18n: { 'key1': 'testString' },
      name: 'testString',
      offeringIconUrl: 'testString',
      offeringDocsUrl: 'testString',
      offeringSupportUrl: 'testString',
      tags: ['testString'],
      keywords: ['testString'],
      rating: ratingModel,
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      shortDescription: 'testString',
      shortDescriptionI18n: { 'key1': 'testString' },
      longDescription: 'testString',
      longDescriptionI18n: { 'key1': 'testString' },
      features: [featureModel],
      kinds: [kindModel],
      publish: publishObjectModel,
      pcManaged: true,
      publishApproved: true,
      shareWithAll: true,
      shareWithIbm: true,
      shareEnabled: true,
      permitRequestIbmPublicPublish: true,
      ibmPublishApproved: true,
      publicPublishApproved: true,
      publicOriginalCrn: 'testString',
      publishPublicCrn: 'testString',
      portalApprovalRecord: 'testString',
      portalUiUrl: 'testString',
      catalogId: catalogIdLink,
      catalogName: 'testString',
      metadata: { anyKey: 'anyValue' },
      disclaimer: 'testString',
      hidden: true,
      provider: 'testString',
      providerInfo: providerInfoModel,
      repoInfo: repoInfoModel,
      imagePullKeys: [imagePullKeyModel],
      support: supportModel,
      media: [mediaItemModel],
      deprecatePending: deprecatePendingModel,
      productKind: 'testString',
      badges: [badgeModel],
    };

    const res = await catalogManagementService.replaceOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    offeringIdLink = res.result.id;
    offeringRevLink = res.result._rev;
    versionLocatorLink = res.result.kinds[0].versions[0].version_locator;
    versionIdLink = res.result.kinds[0].versions[0].id;
    versionRevLink = res.result.kinds[0].versions[0]._rev;
  });

  test('importOfferingVersion()', async () => {
    // Request models needed by this operation.

    // Flavor
    const flavorModel = {
      name: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      index: 38,
    };

    // ImportOfferingBodyMetadataOperatingSystem
    const importOfferingBodyMetadataOperatingSystemModel = {
      dedicated_host_only: true,
      vendor: 'testString',
      name: 'testString',
      href: 'testString',
      display_name: 'testString',
      family: 'testString',
      version: 'testString',
      architecture: 'testString',
    };

    // ImportOfferingBodyMetadataFile
    const importOfferingBodyMetadataFileModel = {
      size: 38,
    };

    // ImportOfferingBodyMetadataImagesItem
    const importOfferingBodyMetadataImagesItemModel = {
      id: 'testString',
      name: 'testString',
      region: 'testString',
    };

    // ImportOfferingBodyMetadata
    const importOfferingBodyMetadataModel = {
      operating_system: importOfferingBodyMetadataOperatingSystemModel,
      file: importOfferingBodyMetadataFileModel,
      minimum_provisioned_size: 38,
      images: [importOfferingBodyMetadataImagesItemModel],
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      tags: ['testString'],
      content: 'This is a mock byte array value.',
      name: 'testString',
      label: 'testString',
      installKind: 'testString',
      targetKinds: ['testString'],
      formatKind: 'testString',
      productKind: 'testString',
      sha: 'testString',
      version: 'testString',
      flavor: flavorModel,
      metadata: importOfferingBodyMetadataModel,
      workingDirectory: 'testString',
      zipurl: 'testString',
      targetVersion: 'testString',
      includeConfig: true,
      isVsi: true,
      repotype: 'testString',
      xAuthToken: 'testString',
    };

    const res = await catalogManagementService.importOfferingVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    offeringIdLink = res.result.id;
    offeringRevLink = res.result._rev;
    versionLocatorLink = res.result.kinds[0].versions[0].version_locator;
    versionIdLink = res.result.kinds[0].versions[0].version_locator;
    versionRevLink = res.result.kinds[0].versions[0]._rev;
  });

  test('importOffering()', async () => {
    // Request models needed by this operation.

    // Flavor
    const flavorModel = {
      name: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      index: 38,
    };

    // ImportOfferingBodyMetadataOperatingSystem
    const importOfferingBodyMetadataOperatingSystemModel = {
      dedicated_host_only: true,
      vendor: 'testString',
      name: 'testString',
      href: 'testString',
      display_name: 'testString',
      family: 'testString',
      version: 'testString',
      architecture: 'testString',
    };

    // ImportOfferingBodyMetadataFile
    const importOfferingBodyMetadataFileModel = {
      size: 38,
    };

    // ImportOfferingBodyMetadataImagesItem
    const importOfferingBodyMetadataImagesItemModel = {
      id: 'testString',
      name: 'testString',
      region: 'testString',
    };

    // ImportOfferingBodyMetadata
    const importOfferingBodyMetadataModel = {
      operating_system: importOfferingBodyMetadataOperatingSystemModel,
      file: importOfferingBodyMetadataFileModel,
      minimum_provisioned_size: 38,
      images: [importOfferingBodyMetadataImagesItemModel],
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      tags: ['testString'],
      content: 'This is a mock byte array value.',
      name: 'testString',
      label: 'testString',
      installKind: 'testString',
      targetKinds: ['testString'],
      formatKind: 'testString',
      productKind: 'testString',
      sha: 'testString',
      version: 'testString',
      flavor: flavorModel,
      metadata: importOfferingBodyMetadataModel,
      workingDirectory: 'testString',
      zipurl: 'testString',
      offeringId: offeringIdLink,
      targetVersion: 'testString',
      includeConfig: true,
      isVsi: true,
      repotype: 'testString',
      xAuthToken: 'testString',
    };

    const res = await catalogManagementService.importOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    offeringRevLink = res.result._rev;
    versionLocatorLink = res.result.kinds[0].versions[0].version_locator;
  });

  test('getOffering()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      type: 'testString',
      digest: true,
    };

    const res = await catalogManagementService.getOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    offeringRevLink = res.result._rev;
    versionLocatorLink = res.result.kinds[0].versions[0].version_locator;
    versionIdLink = res.result.kinds[0].versions[0].version_locator;
    versionRevLink = res.result.kinds[0].versions[0]._rev;
  });

  test('createOffering()', async () => {
    // Request models needed by this operation.

    // Rating
    const ratingModel = {
      one_star_count: 38,
      two_star_count: 38,
      three_star_count: 38,
      four_star_count: 38,
    };

    // Feature
    const featureModel = {
      title: 'testString',
      title_i18n: { 'key1': 'testString' },
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
    };

    // Flavor
    const flavorModel = {
      name: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      index: 38,
    };

    // RenderTypeAssociationsParametersItem
    const renderTypeAssociationsParametersItemModel = {
      name: 'testString',
      optionsRefresh: true,
    };

    // RenderTypeAssociations
    const renderTypeAssociationsModel = {
      parameters: [renderTypeAssociationsParametersItemModel],
    };

    // RenderType
    const renderTypeModel = {
      type: 'testString',
      grouping: 'testString',
      original_grouping: 'testString',
      grouping_index: 38,
      config_constraints: { anyKey: 'anyValue' },
      associations: renderTypeAssociationsModel,
    };

    // Configuration
    const configurationModel = {
      key: 'testString',
      type: 'testString',
      default_value: 'testString',
      display_name: 'testString',
      value_constraint: 'testString',
      description: 'testString',
      required: true,
      options: ['testString'],
      hidden: true,
      custom_config: renderTypeModel,
      type_metadata: 'testString',
    };

    // Output
    const outputModel = {
      key: 'testString',
      description: 'testString',
    };

    // IAMResource
    const iamResourceModel = {
      name: 'testString',
      description: 'testString',
      role_crns: ['testString'],
    };

    // IAMPermission
    const iamPermissionModel = {
      service_name: 'testString',
      role_crns: ['testString'],
      resources: [iamResourceModel],
    };

    // Validation
    const validationModel = {
      validated: '2019-01-01T12:00:00.000Z',
      requested: '2019-01-01T12:00:00.000Z',
      state: 'testString',
      last_operation: 'testString',
      target: { anyKey: 'anyValue' },
      message: 'testString',
    };

    // Resource
    const resourceModel = {
      type: 'mem',
      value: 'testString',
    };

    // SchematicsEnvValues
    const schematicsEnvValuesModel = {
      value: '[{"name": "TF_LOG","value": "TRACE","secure": false,"hidden": false}]',
      sm_ref: 'cmsm_v1:{"name": "envVarSecret","id":"1234567890","service_id":"crn:v1:bluemix:public:secrets-manager:eu-gb:a/1234567890:1234567890::","service_name":"My SM Instance","group_id":"1234567890","group_name":"My SM Group","resource_group_id":"1234567890","region":"eu-gb","type":"arbitrary"}',
    };

    // Script
    const scriptModel = {
      instructions: 'testString',
      instructions_i18n: { 'key1': 'testString' },
      script: 'testString',
      script_permission: 'testString',
      delete_script: 'testString',
      scope: 'testString',
    };

    // ScriptRef
    const scriptRefModel = {
      short_description: 'testString',
      type: 'ansible',
      path: 'scripts/validate-post-ansible-playbook.yaml',
      stage: 'pre',
      action: 'validate',
    };

    // VersionEntitlement
    const versionEntitlementModel = {
      provider_name: 'testString',
      provider_id: 'testString',
      product_id: 'testString',
      part_numbers: ['testString'],
      image_repo_name: 'testString',
    };

    // License
    const licenseModel = {
      id: 'testString',
      name: 'testString',
      type: 'testString',
      url: 'testString',
      description: 'testString',
    };

    // State
    const stateModel = {
      current: 'testString',
      current_entered: '2019-01-01T12:00:00.000Z',
      pending: 'testString',
      pending_requested: '2019-01-01T12:00:00.000Z',
      previous: 'testString',
    };

    // DeprecatePending
    const deprecatePendingModel = {
      deprecate_date: '2019-01-01T12:00:00.000Z',
      deprecate_state: 'testString',
      description: 'testString',
    };

    // URLProxy
    const urlProxyModel = {
      url: 'testString',
      sha: 'testString',
    };

    // MediaItem
    const mediaItemModel = {
      url: 'testString',
      api_url: 'testString',
      url_proxy: urlProxyModel,
      caption: 'testString',
      caption_i18n: { 'key1': 'testString' },
      type: 'testString',
      thumbnail_url: 'testString',
    };

    // ArchitectureDiagram
    const architectureDiagramModel = {
      diagram: mediaItemModel,
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
    };

    // CostComponent
    const costComponentModel = {
      name: 'testString',
      unit: 'testString',
      hourlyQuantity: 'testString',
      monthlyQuantity: 'testString',
      price: 'testString',
      hourlyCost: 'testString',
      monthlyCost: 'testString',
    };

    // CostResource
    const costResourceModel = {
      name: 'testString',
      metadata: { anyKey: 'anyValue' },
      hourlyCost: 'testString',
      monthlyCost: 'testString',
      costComponents: [costComponentModel],
    };

    // CostBreakdown
    const costBreakdownModel = {
      totalHourlyCost: 'testString',
      totalMonthlyCost: 'testString',
      resources: [costResourceModel],
    };

    // CostSummary
    const costSummaryModel = {
      totalDetectedResources: 38,
      totalSupportedResources: 38,
      totalUnsupportedResources: 38,
      totalUsageBasedResources: 38,
      totalNoPriceResources: 38,
      unsupportedResourceCounts: { 'key1': 38 },
      noPriceResourceCounts: { 'key1': 38 },
    };

    // Project
    const projectModel = {
      name: 'testString',
      metadata: { anyKey: 'anyValue' },
      pastBreakdown: costBreakdownModel,
      breakdown: costBreakdownModel,
      diff: costBreakdownModel,
      summary: costSummaryModel,
    };

    // CostEstimate
    const costEstimateModel = {
      version: 'testString',
      currency: 'testString',
      projects: [projectModel],
      summary: costSummaryModel,
      totalHourlyCost: 'testString',
      totalMonthlyCost: 'testString',
      pastTotalHourlyCost: 'testString',
      pastTotalMonthlyCost: 'testString',
      diffTotalHourlyCost: 'testString',
      diffTotalMonthlyCost: 'testString',
      timeGenerated: '2019-01-01T12:00:00.000Z',
    };

    // OfferingReference
    const offeringReferenceModel = {
      catalog_id: 'testString',
      id: 'testString',
      name: 'testString',
      kind: 'testString',
      version: 'testString',
      flavors: ['testString'],
    };

    // SolutionInfo
    const solutionInfoModel = {
      architecture_diagrams: [architectureDiagramModel],
      features: [featureModel],
      cost_estimate: costEstimateModel,
      dependencies: [offeringReferenceModel],
      install_type: 'testString',
    };

    // SCCProfile
    const sccProfileModel = {
      id: 'testString',
      name: 'testString',
      version: 'testString',
      description: 'testString',
      type: 'testString',
      ui_href: 'testString',
    };

    // ClaimedControl
    const claimedControlModel = {
      profile: sccProfileModel,
      names: ['testString'],
    };

    // Claims
    const claimsModel = {
      profiles: [sccProfileModel],
      controls: [claimedControlModel],
    };

    // Result
    const resultModel = {
      failure_count: 38,
      scan_time: '2019-01-01T12:00:00.000Z',
      error_message: 'testString',
      complete_scan: true,
      unscanned_resources: ['testString'],
    };

    // SCCAssessment
    const sccAssessmentModel = {
      id: 'testString',
      description: 'testString',
      version: 'testString',
      type: 'testString',
      method: 'testString',
      ui_href: 'testString',
    };

    // SCCSpecification
    const sccSpecificationModel = {
      id: 'testString',
      description: 'testString',
      component_name: 'testString',
      assessments: [sccAssessmentModel],
      ui_href: 'testString',
    };

    // SCCControl
    const sccControlModel = {
      id: 'testString',
      name: 'testString',
      version: 'testString',
      description: 'testString',
      profile: sccProfileModel,
      parent_name: 'testString',
      specifications: [sccSpecificationModel],
      ui_href: 'testString',
    };

    // EvaluatedControl
    const evaluatedControlModel = {
      id: 'testString',
      name: 'testString',
      description: 'testString',
      specifications: [sccSpecificationModel],
      failure_count: 38,
      pass_count: 38,
      parent: sccControlModel,
      ui_href: 'testString',
    };

    // Evaluation
    const evaluationModel = {
      scan_id: 'testString',
      account_id: 'testString',
      profile: sccProfileModel,
      result: resultModel,
      controls: [evaluatedControlModel],
    };

    // Compliance
    const complianceModel = {
      authority: 'testString',
      claims: claimsModel,
      evaluations: [evaluationModel],
    };

    // Version
    const versionModel = {
      crn: 'testString',
      version: 'testString',
      flavor: flavorModel,
      sha: 'testString',
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      offering_id: offeringIdLink,
      catalog_id: catalogIdLink,
      kind_id: 'testString',
      tags: ['testString'],
      repo_url: 'testString',
      source_url: 'testString',
      tgz_url: 'testString',
      configuration: [configurationModel],
      outputs: [outputModel],
      iam_permissions: [iamPermissionModel],
      metadata: { anyKey: 'anyValue' },
      validation: validationModel,
      required_resources: [resourceModel],
      single_instance: true,
      schematics_env_values: schematicsEnvValuesModel,
      install: scriptModel,
      pre_install: [scriptModel],
      scripts: { 'key1': scriptRefModel },
      entitlement: versionEntitlementModel,
      licenses: [licenseModel],
      image_manifest_url: 'testString',
      deprecated: true,
      package_version: 'testString',
      state: stateModel,
      version_locator: versionIdLink,
      long_description: 'testString',
      long_description_i18n: { 'key1': 'testString' },
      whitelisted_accounts: ['testString'],
      image_pull_key_name: 'testString',
      deprecate_pending: deprecatePendingModel,
      solution_info: solutionInfoModel,
      is_consumable: true,
      compliance_v3: complianceModel,
    };

    // Kind
    const kindModel = {
      id: 'testString',
      format_kind: 'testString',
      install_kind: 'testString',
      target_kind: 'testString',
      metadata: { anyKey: 'anyValue' },
      tags: ['testString'],
      additional_features: [featureModel],
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      versions: [versionModel],
    };

    // PublishObject
    const publishObjectModel = {
      pc_managed: true,
      approval_type: 'testString',
      publish_approved: true,
      share_with_all: true,
      share_with_ibm: true,
      share_enabled: true,
      original_crn: 'testString',
      public_crn: 'testString',
      approval_record: { anyKey: 'anyValue' },
      permit_ibm_public_publish: true,
      ibm_approved: true,
      public_approved: true,
    };

    // ProviderInfo
    const providerInfoModel = {
      id: 'testString',
      name: 'testString',
    };

    // RepoInfo
    const repoInfoModel = {
      token: 'testString',
      type: 'testString',
    };

    // ImagePullKey
    const imagePullKeyModel = {
      name: 'testString',
      value: 'testString',
      description: 'testString',
    };

    // SupportWaitTime
    const supportWaitTimeModel = {
      value: 38,
      type: 'testString',
    };

    // SupportTime
    const supportTimeModel = {
      day: 38,
      start_time: 'testString',
      end_time: 'testString',
    };

    // SupportAvailability
    const supportAvailabilityModel = {
      times: [supportTimeModel],
      timezone: 'testString',
      always_available: true,
    };

    // SupportDetail
    const supportDetailModel = {
      type: 'testString',
      contact: 'testString',
      response_wait_time: supportWaitTimeModel,
      availability: supportAvailabilityModel,
    };

    // SupportEscalation
    const supportEscalationModel = {
      escalation_wait_time: supportWaitTimeModel,
      response_wait_time: supportWaitTimeModel,
      contact: 'testString',
    };

    // Support
    const supportModel = {
      url: 'testString',
      process: 'testString',
      process_i18n: { 'key1': 'testString' },
      locations: ['testString'],
      support_details: [supportDetailModel],
      support_escalation: supportEscalationModel,
      support_type: 'testString',
    };

    // LearnMoreLinks
    const learnMoreLinksModel = {
      first_party: 'testString',
      third_party: 'testString',
    };

    // Constraint
    const constraintModel = {
      type: 'testString',
      rule: 'testString',
    };

    // Badge
    const badgeModel = {
      id: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      description: 'testString',
      description_i18n: { 'key1': 'testString' },
      icon: 'testString',
      authority: 'testString',
      tag: 'testString',
      learn_more_links: learnMoreLinksModel,
      constraints: [constraintModel],
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      url: 'testString',
      crn: 'testString',
      label: 'testString',
      labelI18n: { 'key1': 'testString' },
      name: 'testString',
      offeringIconUrl: 'testString',
      offeringDocsUrl: 'testString',
      offeringSupportUrl: 'testString',
      tags: ['testString'],
      keywords: ['testString'],
      rating: ratingModel,
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      shortDescription: 'testString',
      shortDescriptionI18n: { 'key1': 'testString' },
      longDescription: 'testString',
      longDescriptionI18n: { 'key1': 'testString' },
      features: [featureModel],
      kinds: [kindModel],
      publish: publishObjectModel,
      pcManaged: true,
      publishApproved: true,
      shareWithAll: true,
      shareWithIbm: true,
      shareEnabled: true,
      permitRequestIbmPublicPublish: true,
      ibmPublishApproved: true,
      publicPublishApproved: true,
      publicOriginalCrn: 'testString',
      publishPublicCrn: 'testString',
      portalApprovalRecord: 'testString',
      portalUiUrl: 'testString',
      catalogId: catalogIdLink,
      catalogName: 'testString',
      metadata: { anyKey: 'anyValue' },
      disclaimer: 'testString',
      hidden: true,
      provider: 'testString',
      providerInfo: providerInfoModel,
      repoInfo: repoInfoModel,
      imagePullKeys: [imagePullKeyModel],
      support: supportModel,
      media: [mediaItemModel],
      deprecatePending: deprecatePendingModel,
      productKind: 'testString',
      badges: [badgeModel],
    };

    const res = await catalogManagementService.createOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    offeringIdLink = res.result.id;
    offeringRevLink = res.result._rev;
    versionLocatorLink = res.result.kinds[0].versions[0].version_locator;
    versionIdLink = res.result.kinds[0].versions[0].version_locator;
    versionRevLink = res.result.kinds[0].versions[0]._rev;
  });

  test('reloadOffering()', async () => {
    // Request models needed by this operation.

    // Flavor
    const flavorModel = {
      name: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      index: 38,
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      targetVersion: 'testString',
      tags: ['testString'],
      content: 'This is a mock byte array value.',
      targetKinds: ['testString'],
      formatKind: 'testString',
      flavor: flavorModel,
      workingDirectory: 'testString',
      zipurl: 'testString',
      repoType: 'testString',
    };

    const res = await catalogManagementService.reloadOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    offeringRevLink = res.result._rev;
  });

  test('updateOffering()', async () => {
    // Request models needed by this operation.

    // JsonPatchOperation
    const jsonPatchOperationModel = {
      op: 'add',
      path: 'testString',
      value: 'testString',
      from: 'testString',
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      ifMatch: 'testString',
      updates: [jsonPatchOperationModel],
    };

    const res = await catalogManagementService.updateOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    offeringRevLink = res.result._rev;
  });

  test('createObject()', async () => {
    // Request models needed by this operation.

    // PublishObject
    const publishObjectModel = {
      pc_managed: true,
      approval_type: 'testString',
      publish_approved: true,
      share_with_all: true,
      share_with_ibm: true,
      share_enabled: true,
      original_crn: 'testString',
      public_crn: 'testString',
      approval_record: { anyKey: 'anyValue' },
      permit_ibm_public_publish: true,
      ibm_approved: true,
      public_approved: true,
    };

    // State
    const stateModel = {
      current: 'testString',
      current_entered: '2019-01-01T12:00:00.000Z',
      pending: 'testString',
      pending_requested: '2019-01-01T12:00:00.000Z',
      previous: 'testString',
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      name: 'testString',
      crn: 'testString',
      url: 'testString',
      parentId: 'testString',
      labelI18n: { 'key1': 'testString' },
      label: 'testString',
      tags: ['testString'],
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      shortDescription: 'testString',
      shortDescriptionI18n: { 'key1': 'testString' },
      kind: 'testString',
      publish: publishObjectModel,
      state: stateModel,
      catalogId: catalogIdLink,
      catalogName: 'testString',
      data: { anyKey: 'anyValue' },
    };

    const res = await catalogManagementService.createObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    objectIdLink = res.result.id;
    objectRevLink = res.result._rev;
  });

  test('getObject()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
    };

    const res = await catalogManagementService.getObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    objectRevLink = res.result._rev;
  });

  test('replaceObject()', async () => {
    // Request models needed by this operation.

    // PublishObject
    const publishObjectModel = {
      pc_managed: true,
      approval_type: 'testString',
      publish_approved: true,
      share_with_all: true,
      share_with_ibm: true,
      share_enabled: true,
      original_crn: 'testString',
      public_crn: 'testString',
      approval_record: { anyKey: 'anyValue' },
      permit_ibm_public_publish: true,
      ibm_approved: true,
      public_approved: true,
    };

    // State
    const stateModel = {
      current: 'testString',
      current_entered: '2019-01-01T12:00:00.000Z',
      pending: 'testString',
      pending_requested: '2019-01-01T12:00:00.000Z',
      previous: 'testString',
    };

    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      id: 'testString',
      rev: 'testString',
      name: 'testString',
      crn: 'testString',
      url: 'testString',
      parentId: 'testString',
      labelI18n: { 'key1': 'testString' },
      label: 'testString',
      tags: ['testString'],
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      shortDescription: 'testString',
      shortDescriptionI18n: { 'key1': 'testString' },
      kind: 'testString',
      publish: publishObjectModel,
      state: stateModel,
      catalogId: catalogIdLink,
      catalogName: 'testString',
      data: { anyKey: 'anyValue' },
    };

    const res = await catalogManagementService.replaceObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    objectRevLink = res.result._rev;
  });

  test('listCatalogAccountAudits()', async () => {
    const params = {
      start: 'testString',
      limit: 100,
      lookupnames: true,
    };

    const res = await catalogManagementService.listCatalogAccountAudits(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listCatalogAccountAudits() via CatalogAccountAuditsPager', async () => {
    const params = {
      limit: 10,
      lookupnames: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.CatalogAccountAuditsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.CatalogAccountAuditsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getCatalogAccountAudit()', async () => {
    const params = {
      auditlogIdentifier: 'testString',
      lookupnames: true,
    };

    const res = await catalogManagementService.getCatalogAccountAudit(params);
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
      start: 'testString',
      limit: 100,
    };

    const res = await catalogManagementService.getShareApprovalList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getShareApprovalList() via GetShareApprovalListPager', async () => {
    const params = {
      objectType: 'offering',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.GetShareApprovalListPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.GetShareApprovalListPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('addShareApprovalList()', async () => {
    const params = {
      objectType: 'offering',
      accesses: ['testString'],
    };

    const res = await catalogManagementService.addShareApprovalList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getShareApprovalListAsSource()', async () => {
    const params = {
      objectType: 'offering',
      approvalStateIdentifier: 'approved',
      start: 'testString',
      limit: 100,
      enterpriseId: 'testString',
    };

    const res = await catalogManagementService.getShareApprovalListAsSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getShareApprovalListAsSource() via GetShareApprovalListAsSourcePager', async () => {
    const params = {
      objectType: 'offering',
      approvalStateIdentifier: 'approved',
      limit: 10,
      enterpriseId: 'testString',
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.GetShareApprovalListAsSourcePager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.GetShareApprovalListAsSourcePager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('updateShareApprovalListAsSource()', async () => {
    const params = {
      objectType: 'offering',
      approvalStateIdentifier: 'approved',
      accesses: ['testString'],
      enterpriseId: 'testString',
    };

    const res = await catalogManagementService.updateShareApprovalListAsSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listCatalogs()', async () => {
    const res = await catalogManagementService.listCatalogs();
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listCatalogAudits()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      start: 'testString',
      limit: 100,
      lookupnames: true,
    };

    const res = await catalogManagementService.listCatalogAudits(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listCatalogAudits() via CatalogAuditsPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      limit: 10,
      lookupnames: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.CatalogAuditsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.CatalogAuditsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getCatalogAudit()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      auditlogIdentifier: 'testString',
      lookupnames: true,
    };

    const res = await catalogManagementService.getCatalogAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listEnterpriseAudits()', async () => {
    const params = {
      enterpriseIdentifier: 'testString',
      start: 'testString',
      limit: 100,
      lookupnames: true,
    };

    const res = await catalogManagementService.listEnterpriseAudits(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listEnterpriseAudits() via EnterpriseAuditsPager', async () => {
    const params = {
      enterpriseIdentifier: 'testString',
      limit: 10,
      lookupnames: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.EnterpriseAuditsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.EnterpriseAuditsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getEnterpriseAudit()', async () => {
    const params = {
      enterpriseIdentifier: 'testString',
      auditlogIdentifier: 'testString',
      lookupnames: true,
    };

    const res = await catalogManagementService.getEnterpriseAudit(params);
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
    let pager = new CatalogManagementV1.GetConsumptionOfferingsPager(catalogManagementService, params);
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
      sort: 'testString',
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
      sort: 'testString',
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

  test('listOfferingAudits()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      start: 'testString',
      limit: 100,
      lookupnames: true,
    };

    const res = await catalogManagementService.listOfferingAudits(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOfferingAudits() via OfferingAuditsPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      limit: 10,
      lookupnames: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.OfferingAuditsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.OfferingAuditsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getOfferingAudit()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      auditlogIdentifier: 'testString',
      lookupnames: true,
    };

    const res = await catalogManagementService.getOfferingAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('setOfferingPublish()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      approvalType: 'pc_managed',
      approved: 'true',
      portalRecord: 'testString',
      portalUrl: 'testString',
      xApproverToken: 'testString',
      xAuthToken: 'testString',
    };

    const res = await catalogManagementService.setOfferingPublish(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deprecateOffering()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      setting: 'true',
      description: 'testString',
      daysUntilDeprecate: 38,
    };

    const res = await catalogManagementService.deprecateOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('shareOffering()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      ibm: true,
      _public: true,
      enabled: true,
    };

    const res = await catalogManagementService.shareOffering(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingAccess()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      accessIdentifier: 'testString',
    };

    const res = await catalogManagementService.getOfferingAccess(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      start: 'testString',
      limit: 100,
    };

    const res = await catalogManagementService.getOfferingAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingAccessList() via GetOfferingAccessListPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.GetOfferingAccessListPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.GetOfferingAccessListPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('addOfferingAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      accesses: ['testString'],
    };

    const res = await catalogManagementService.addOfferingAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getOfferingUpdates()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      kind: 'testString',
      xAuthRefreshToken: 'testString',
      target: 'testString',
      version: 'testString',
      clusterId: 'testString',
      region: 'testString',
      resourceGroupId: 'testString',
      namespace: 'testString',
      sha: 'testString',
      channel: 'testString',
      namespaces: ['testString'],
      allNamespaces: true,
      flavor: 'testString',
      installType: 'testString',
    };

    const res = await catalogManagementService.getOfferingUpdates(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingSource()', async () => {
    const params = {
      version: 'testString',
      accept: 'application/yaml',
      catalogId: 'testString',
      name: 'testString',
      id: 'testString',
      kind: 'testString',
      channel: 'testString',
      flavor: 'testString',
      asIs: true,
      installType: 'testString',
    };

    const res = await catalogManagementService.getOfferingSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingSourceArchive()', async () => {
    const params = {
      version: 'testString',
      accept: 'application/yaml',
      catalogId: 'testString',
      name: 'testString',
      id: 'testString',
      kind: 'testString',
      channel: 'testString',
      flavor: 'testString',
      asIs: true,
      installType: 'testString',
    };

    const res = await catalogManagementService.getOfferingSourceArchive(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingSourceUrl()', async () => {
    const params = {
      keyIdentifier: 'testString',
      accept: 'application/yaml',
      catalogId: 'testString',
      name: 'testString',
      id: 'testString',
    };

    const res = await catalogManagementService.getOfferingSourceUrl(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingAbout()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.getOfferingAbout(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingLicense()', async () => {
    const params = {
      versionLocId: 'testString',
      licenseId: 'testString',
    };

    const res = await catalogManagementService.getOfferingLicense(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingContainerImages()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.getOfferingContainerImages(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('archiveVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.archiveVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('setDeprecateVersion()', async () => {
    const params = {
      versionLocId: 'testString',
      setting: 'true',
      description: 'testString',
      daysUntilDeprecate: 38,
    };

    const res = await catalogManagementService.setDeprecateVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('consumableVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.consumableVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('prereleaseVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.prereleaseVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('suspendVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.suspendVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('commitVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.commitVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('copyVersion()', async () => {
    // Request models needed by this operation.

    // Flavor
    const flavorModel = {
      name: 'testString',
      label: 'testString',
      label_i18n: { 'key1': 'testString' },
      index: 38,
    };

    const params = {
      versionLocId: 'testString',
      tags: ['testString'],
      content: 'This is a mock byte array value.',
      targetKinds: ['testString'],
      formatKind: 'testString',
      flavor: flavorModel,
      workingDirectory: 'testString',
    };

    const res = await catalogManagementService.copyVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getOfferingWorkingCopy()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.getOfferingWorkingCopy(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('copyFromPreviousVersion()', async () => {
    const params = {
      versionLocId: 'testString',
      type: 'testString',
      versionLocIdToCopyFrom: 'testString',
    };

    const res = await catalogManagementService.copyFromPreviousVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.getVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deprecateVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.deprecateVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getCluster()', async () => {
    const params = {
      clusterId: 'testString',
      region: 'testString',
      xAuthRefreshToken: 'testString',
    };

    const res = await catalogManagementService.getCluster(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getNamespaces()', async () => {
    const params = {
      clusterId: 'testString',
      region: 'testString',
      xAuthRefreshToken: 'testString',
      limit: 100,
      offset: 0,
    };

    const res = await catalogManagementService.getNamespaces(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getNamespaces() via GetNamespacesPager', async () => {
    const params = {
      clusterId: 'testString',
      region: 'testString',
      xAuthRefreshToken: 'testString',
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.GetNamespacesPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.GetNamespacesPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('deployOperators()', async () => {
    const params = {
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespaces: ['testString'],
      allNamespaces: true,
      versionLocatorId: 'testString',
      channel: 'testString',
      installPlan: 'testString',
    };

    const res = await catalogManagementService.deployOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOperators()', async () => {
    const params = {
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      versionLocatorId: 'testString',
    };

    const res = await catalogManagementService.listOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('replaceOperators()', async () => {
    const params = {
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespaces: ['testString'],
      allNamespaces: true,
      versionLocatorId: 'testString',
      channel: 'testString',
      installPlan: 'testString',
    };

    const res = await catalogManagementService.replaceOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('installVersion()', async () => {
    // Request models needed by this operation.

    // DeployRequestBodyOverrideValues
    const deployRequestBodyOverrideValuesModel = {
      vsi_instance_name: 'testString',
      vpc_profile: 'testString',
      subnet_id: 'testString',
      vpc_id: 'testString',
      subnet_zone: 'testString',
      ssh_key_id: 'testString',
      vpc_region: 'testString',
      foo: 'testString',
    };

    // DeployRequestBodyEnvironmentVariablesItem
    const deployRequestBodyEnvironmentVariablesItemModel = {
      name: 'testString',
      value: 'testString',
      secure: true,
      hidden: true,
    };

    // DeployRequestBodySchematics
    const deployRequestBodySchematicsModel = {
      name: 'testString',
      description: 'testString',
      tags: ['testString'],
      resource_group_id: 'testString',
      terraform_version: 'testString',
      region: 'testString',
    };

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespace: 'testString',
      overrideValues: deployRequestBodyOverrideValuesModel,
      environmentVariables: [deployRequestBodyEnvironmentVariablesItemModel],
      entitlementApikey: 'testString',
      schematics: deployRequestBodySchematicsModel,
      script: 'testString',
      scriptId: 'testString',
      versionLocatorId: 'testString',
      vcenterId: 'testString',
      vcenterLocation: 'testString',
      vcenterUser: 'testString',
      vcenterPassword: 'testString',
      vcenterDatastore: 'testString',
    };

    const res = await catalogManagementService.installVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('preinstallVersion()', async () => {
    // Request models needed by this operation.

    // DeployRequestBodyOverrideValues
    const deployRequestBodyOverrideValuesModel = {
      vsi_instance_name: 'testString',
      vpc_profile: 'testString',
      subnet_id: 'testString',
      vpc_id: 'testString',
      subnet_zone: 'testString',
      ssh_key_id: 'testString',
      vpc_region: 'testString',
      foo: 'testString',
    };

    // DeployRequestBodyEnvironmentVariablesItem
    const deployRequestBodyEnvironmentVariablesItemModel = {
      name: 'testString',
      value: 'testString',
      secure: true,
      hidden: true,
    };

    // DeployRequestBodySchematics
    const deployRequestBodySchematicsModel = {
      name: 'testString',
      description: 'testString',
      tags: ['testString'],
      resource_group_id: 'testString',
      terraform_version: 'testString',
      region: 'testString',
    };

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespace: 'testString',
      overrideValues: deployRequestBodyOverrideValuesModel,
      environmentVariables: [deployRequestBodyEnvironmentVariablesItemModel],
      entitlementApikey: 'testString',
      schematics: deployRequestBodySchematicsModel,
      script: 'testString',
      scriptId: 'testString',
      versionLocatorId: 'testString',
      vcenterId: 'testString',
      vcenterLocation: 'testString',
      vcenterUser: 'testString',
      vcenterPassword: 'testString',
      vcenterDatastore: 'testString',
    };

    const res = await catalogManagementService.preinstallVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getPreinstall()', async () => {
    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespace: 'testString',
    };

    const res = await catalogManagementService.getPreinstall(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('validateInstall()', async () => {
    // Request models needed by this operation.

    // DeployRequestBodyOverrideValues
    const deployRequestBodyOverrideValuesModel = {
      vsi_instance_name: 'testString',
      vpc_profile: 'testString',
      subnet_id: 'testString',
      vpc_id: 'testString',
      subnet_zone: 'testString',
      ssh_key_id: 'testString',
      vpc_region: 'testString',
      foo: 'testString',
    };

    // DeployRequestBodyEnvironmentVariablesItem
    const deployRequestBodyEnvironmentVariablesItemModel = {
      name: 'testString',
      value: 'testString',
      secure: true,
      hidden: true,
    };

    // DeployRequestBodySchematics
    const deployRequestBodySchematicsModel = {
      name: 'testString',
      description: 'testString',
      tags: ['testString'],
      resource_group_id: 'testString',
      terraform_version: 'testString',
      region: 'testString',
    };

    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      namespace: 'testString',
      overrideValues: deployRequestBodyOverrideValuesModel,
      environmentVariables: [deployRequestBodyEnvironmentVariablesItemModel],
      entitlementApikey: 'testString',
      schematics: deployRequestBodySchematicsModel,
      script: 'testString',
      scriptId: 'testString',
      versionLocatorId: 'testString',
      vcenterId: 'testString',
      vcenterLocation: 'testString',
      vcenterUser: 'testString',
      vcenterPassword: 'testString',
      vcenterDatastore: 'testString',
      targetContextName: 'testString',
    };

    const res = await catalogManagementService.validateInstall(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('getValidationStatus()', async () => {
    const params = {
      versionLocId: 'testString',
      xAuthRefreshToken: 'testString',
      targetContextName: 'testString',
    };

    const res = await catalogManagementService.getValidationStatus(params);
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
      collapse: true,
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
      collapse: true,
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
      sort: 'testString',
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
      sort: 'testString',
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

  test('listObjectAudits()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      start: 'testString',
      limit: 100,
      lookupnames: true,
    };

    const res = await catalogManagementService.listObjectAudits(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listObjectAudits() via ObjectAuditsPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      limit: 10,
      lookupnames: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.ObjectAuditsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.ObjectAuditsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getObjectAudit()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      auditlogIdentifier: 'testString',
      lookupnames: true,
    };

    const res = await catalogManagementService.getObjectAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('consumableShareObject()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
    };

    const res = await catalogManagementService.consumableShareObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();
  });

  test('shareObject()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      ibm: true,
      _public: true,
      enabled: true,
    };

    const res = await catalogManagementService.shareObject(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObjectAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      start: 'testString',
      limit: 100,
    };

    const res = await catalogManagementService.getObjectAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObjectAccessList() via GetObjectAccessListPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.GetObjectAccessListPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.GetObjectAccessListPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getObjectAccess()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      accessIdentifier: 'testString',
    };

    const res = await catalogManagementService.getObjectAccess(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createObjectAccess()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      accessIdentifier: 'testString',
    };

    const res = await catalogManagementService.createObjectAccess(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getObjectAccessListDeprecated()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      limit: 100,
      offset: 0,
    };

    const res = await catalogManagementService.getObjectAccessListDeprecated(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('getObjectAccessListDeprecated() via GetObjectAccessListDeprecatedPager', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      limit: 10,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.GetObjectAccessListDeprecatedPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.GetObjectAccessListDeprecatedPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('addObjectAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      accesses: ['testString'],
    };

    const res = await catalogManagementService.addObjectAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('createOfferingInstance()', async () => {
    // Request models needed by this operation.

    // OfferingInstanceLastOperation
    const offeringInstanceLastOperationModel = {
      operation: 'testString',
      state: 'testString',
      message: 'testString',
      transaction_id: 'testString',
      updated: '2019-01-01T12:00:00.000Z',
      code: 'testString',
    };

    const params = {
      xAuthRefreshToken: 'testString',
      id: 'testString',
      rev: 'testString',
      url: 'testString',
      crn: 'testString',
      label: 'testString',
      catalogId: 'testString',
      offeringId: 'testString',
      kindFormat: 'testString',
      version: 'testString',
      versionId: 'testString',
      clusterId: 'testString',
      clusterRegion: 'testString',
      clusterNamespaces: ['testString'],
      clusterAllNamespaces: true,
      schematicsWorkspaceId: 'testString',
      installPlan: 'testString',
      channel: 'testString',
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      metadata: { anyKey: 'anyValue' },
      resourceGroupId: 'testString',
      location: 'testString',
      disabled: true,
      account: 'testString',
      lastOperation: offeringInstanceLastOperationModel,
      kindTarget: 'testString',
      sha: 'testString',
    };

    const res = await catalogManagementService.createOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('getOfferingInstance()', async () => {
    const params = {
      instanceIdentifier: 'testString',
    };

    const res = await catalogManagementService.getOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('putOfferingInstance()', async () => {
    // Request models needed by this operation.

    // OfferingInstanceLastOperation
    const offeringInstanceLastOperationModel = {
      operation: 'testString',
      state: 'testString',
      message: 'testString',
      transaction_id: 'testString',
      updated: '2019-01-01T12:00:00.000Z',
      code: 'testString',
    };

    const params = {
      instanceIdentifier: 'testString',
      xAuthRefreshToken: 'testString',
      id: 'testString',
      rev: 'testString',
      url: 'testString',
      crn: 'testString',
      label: 'testString',
      catalogId: 'testString',
      offeringId: 'testString',
      kindFormat: 'testString',
      version: 'testString',
      versionId: 'testString',
      clusterId: 'testString',
      clusterRegion: 'testString',
      clusterNamespaces: ['testString'],
      clusterAllNamespaces: true,
      schematicsWorkspaceId: 'testString',
      installPlan: 'testString',
      channel: 'testString',
      created: '2019-01-01T12:00:00.000Z',
      updated: '2019-01-01T12:00:00.000Z',
      metadata: { anyKey: 'anyValue' },
      resourceGroupId: 'testString',
      location: 'testString',
      disabled: true,
      account: 'testString',
      lastOperation: offeringInstanceLastOperationModel,
      kindTarget: 'testString',
      sha: 'testString',
    };

    const res = await catalogManagementService.putOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOfferingInstanceAudits()', async () => {
    const params = {
      instanceIdentifier: 'testString',
      start: 'testString',
      limit: 100,
      lookupnames: true,
    };

    const res = await catalogManagementService.listOfferingInstanceAudits(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('listOfferingInstanceAudits() via OfferingInstanceAuditsPager', async () => {
    const params = {
      instanceIdentifier: 'testString',
      limit: 10,
      lookupnames: true,
    };

    const allResults = [];

    // Test getNext().
    let pager = new CatalogManagementV1.OfferingInstanceAuditsPager(catalogManagementService, params);
    while (pager.hasNext()) {
      const nextPage = await pager.getNext();
      expect(nextPage).not.toBeNull();
      allResults.push(...nextPage);
    }

    // Test getAll().
    pager = new CatalogManagementV1.OfferingInstanceAuditsPager(catalogManagementService, params);
    const allItems = await pager.getAll();
    expect(allItems).not.toBeNull();
    expect(allItems).toHaveLength(allResults.length);
    console.log(`Retrieved a total of ${allResults.length} items(s) with pagination.`);
  });

  test('getOfferingInstanceAudit()', async () => {
    const params = {
      instanceIdentifier: 'testString',
      auditlogIdentifier: 'testString',
      lookupnames: true,
    };

    const res = await catalogManagementService.getOfferingInstanceAudit(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteShareApprovalList()', async () => {
    const params = {
      objectType: 'offering',
      accesses: ['testString'],
    };

    const res = await catalogManagementService.deleteShareApprovalList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteOfferingAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      offeringId: offeringIdLink,
      accesses: ['testString'],
    };

    const res = await catalogManagementService.deleteOfferingAccessList(params);
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

  test('deleteObjectAccess()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      accessIdentifier: 'testString',
    };

    const res = await catalogManagementService.deleteObjectAccess(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteObjectAccessList()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
      objectIdentifier: objectIdLink,
      accesses: ['testString'],
    };

    const res = await catalogManagementService.deleteObjectAccessList(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteObject()', async () => {
    const params = {
      catalogIdentifier: catalogIdLink,
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

  test('deleteVersion()', async () => {
    const params = {
      versionLocId: 'testString',
    };

    const res = await catalogManagementService.deleteVersion(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteOperators()', async () => {
    const params = {
      xAuthRefreshToken: 'testString',
      clusterId: 'testString',
      region: 'testString',
      versionLocatorId: 'testString',
    };

    const res = await catalogManagementService.deleteOperators(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('deleteOfferingInstance()', async () => {
    const params = {
      instanceIdentifier: 'testString',
      xAuthRefreshToken: 'testString',
    };

    const res = await catalogManagementService.deleteOfferingInstance(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });
});
