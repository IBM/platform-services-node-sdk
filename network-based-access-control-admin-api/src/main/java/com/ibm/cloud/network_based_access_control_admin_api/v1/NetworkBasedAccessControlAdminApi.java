/*
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

/*
 * IBM OpenAPI SDK Code Generator Version: 3.36.0-6f5b0381-20210716-180747
 */

package com.ibm.cloud.network_based_access_control_admin_api.v1;

import com.google.gson.JsonObject;
import com.ibm.cloud.common.SdkCommon;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.CreatePolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.CreateZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.DeletePolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.DeleteZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.GetAccountSettingsOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.GetPolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.GetZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ListPoliciesOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ListZonesOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutAccountSettings;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutPolicy;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutZone;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.PolicyPage;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.UpdatePolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.UpdateZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ZonePage;
import com.ibm.cloud.sdk.core.http.RequestBuilder;
import com.ibm.cloud.sdk.core.http.ResponseConverter;
import com.ibm.cloud.sdk.core.http.ServiceCall;
import com.ibm.cloud.sdk.core.security.Authenticator;
import com.ibm.cloud.sdk.core.security.ConfigBasedAuthenticatorFactory;
import com.ibm.cloud.sdk.core.service.BaseService;
import com.ibm.cloud.sdk.core.util.ResponseConverterUtils;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

/**
 * With the Network-based Access Control Admin API, you can:
 * * Create, list, get, update, and delete zones
 * * Create, list, get, update, and delete policies
 * * Get account settings
 * .
 *
 * @version v1
 */
public class NetworkBasedAccessControlAdminApi extends BaseService {

  public static final String DEFAULT_SERVICE_NAME = "network_based_access_control_admin_api";

  public static final String DEFAULT_SERVICE_URL = "https://network-based-access-control-admin-api.cloud.ibm.com";

 /**
   * Class method which constructs an instance of the `NetworkBasedAccessControlAdminApi` client.
   * The default service name is used to configure the client instance.
   *
   * @return an instance of the `NetworkBasedAccessControlAdminApi` client using external configuration
   */
  public static NetworkBasedAccessControlAdminApi newInstance() {
    return newInstance(DEFAULT_SERVICE_NAME);
  }

  /**
   * Class method which constructs an instance of the `NetworkBasedAccessControlAdminApi` client.
   * The specified service name is used to configure the client instance.
   *
   * @param serviceName the service name to be used when configuring the client instance
   * @return an instance of the `NetworkBasedAccessControlAdminApi` client using external configuration
   */
  public static NetworkBasedAccessControlAdminApi newInstance(String serviceName) {
    Authenticator authenticator = ConfigBasedAuthenticatorFactory.getAuthenticator(serviceName);
    NetworkBasedAccessControlAdminApi service = new NetworkBasedAccessControlAdminApi(serviceName, authenticator);
    service.configureService(serviceName);
    return service;
  }

  /**
   * Constructs an instance of the `NetworkBasedAccessControlAdminApi` client.
   * The specified service name and authenticator are used to configure the client instance.
   *
   * @param serviceName the service name to be used when configuring the client instance
   * @param authenticator the {@link Authenticator} instance to be configured for this client
   */
  public NetworkBasedAccessControlAdminApi(String serviceName, Authenticator authenticator) {
    super(serviceName, authenticator);
    setServiceUrl(DEFAULT_SERVICE_URL);
  }

  /**
   * Create a zone.
   *
   * Creates a zone for the specified account.
   *
   * @param createZoneOptions the {@link CreateZoneOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link OutZone}
   */
  public ServiceCall<OutZone> createZone(CreateZoneOptions createZoneOptions) {
    boolean skipBody = false;
    if (createZoneOptions == null) {
      createZoneOptions = new CreateZoneOptions.Builder().build();
      skipBody = true;
    }
    RequestBuilder builder = RequestBuilder.post(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/zones"));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "createZone");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    if (createZoneOptions.transactionId() != null) {
      builder.header("Transaction-Id", createZoneOptions.transactionId());
    }
    if (!skipBody) {
      final JsonObject contentJson = new JsonObject();
      if (createZoneOptions.name() != null) {
        contentJson.addProperty("name", createZoneOptions.name());
      }
      if (createZoneOptions.accountId() != null) {
        contentJson.addProperty("account_id", createZoneOptions.accountId());
      }
      if (createZoneOptions.description() != null) {
        contentJson.addProperty("description", createZoneOptions.description());
      }
      if (createZoneOptions.addresses() != null) {
        contentJson.add("addresses", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(createZoneOptions.addresses()));
      }
      if (createZoneOptions.excluded() != null) {
        contentJson.add("excluded", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(createZoneOptions.excluded()));
      }
      builder.bodyJson(contentJson);
    }
    ResponseConverter<OutZone> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<OutZone>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Create a zone.
   *
   * Creates a zone for the specified account.
   *
   * @return a {@link ServiceCall} with a result of type {@link OutZone}
   */
  public ServiceCall<OutZone> createZone() {
    return createZone(null);
  }

  /**
   * List zones.
   *
   * Lists zones for the specified account.
   *
   * @param listZonesOptions the {@link ListZonesOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link ZonePage}
   */
  public ServiceCall<ZonePage> listZones(ListZonesOptions listZonesOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(listZonesOptions,
      "listZonesOptions cannot be null");
    RequestBuilder builder = RequestBuilder.get(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/zones"));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "listZones");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    if (listZonesOptions.transactionId() != null) {
      builder.header("Transaction-Id", listZonesOptions.transactionId());
    }
    builder.query("account_id", String.valueOf(listZonesOptions.accountId()));
    if (listZonesOptions.name() != null) {
      builder.query("name", String.valueOf(listZonesOptions.name()));
    }
    if (listZonesOptions.sort() != null) {
      builder.query("sort", String.valueOf(listZonesOptions.sort()));
    }
    ResponseConverter<ZonePage> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<ZonePage>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Get the specified zone.
   *
   * Gets the zone for the specified ID.
   *
   * @param getZoneOptions the {@link GetZoneOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link OutZone}
   */
  public ServiceCall<OutZone> getZone(GetZoneOptions getZoneOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(getZoneOptions,
      "getZoneOptions cannot be null");
    Map<String, String> pathParamsMap = new HashMap<String, String>();
    pathParamsMap.put("zone_id", getZoneOptions.zoneId());
    RequestBuilder builder = RequestBuilder.get(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/zones/{zone_id}", pathParamsMap));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "getZone");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    if (getZoneOptions.transactionId() != null) {
      builder.header("Transaction-Id", getZoneOptions.transactionId());
    }
    ResponseConverter<OutZone> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<OutZone>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Update the specified zone.
   *
   * Updates the zone for the specified ID.
   *
   * @param updateZoneOptions the {@link UpdateZoneOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link OutZone}
   */
  public ServiceCall<OutZone> updateZone(UpdateZoneOptions updateZoneOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(updateZoneOptions,
      "updateZoneOptions cannot be null");
    Map<String, String> pathParamsMap = new HashMap<String, String>();
    pathParamsMap.put("zone_id", updateZoneOptions.zoneId());
    RequestBuilder builder = RequestBuilder.put(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/zones/{zone_id}", pathParamsMap));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "updateZone");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    builder.header("If-Match", updateZoneOptions.ifMatch());
    if (updateZoneOptions.transactionId() != null) {
      builder.header("Transaction-Id", updateZoneOptions.transactionId());
    }
    final JsonObject contentJson = new JsonObject();
    if (updateZoneOptions.name() != null) {
      contentJson.addProperty("name", updateZoneOptions.name());
    }
    if (updateZoneOptions.accountId() != null) {
      contentJson.addProperty("account_id", updateZoneOptions.accountId());
    }
    if (updateZoneOptions.description() != null) {
      contentJson.addProperty("description", updateZoneOptions.description());
    }
    if (updateZoneOptions.addresses() != null) {
      contentJson.add("addresses", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(updateZoneOptions.addresses()));
    }
    if (updateZoneOptions.excluded() != null) {
      contentJson.add("excluded", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(updateZoneOptions.excluded()));
    }
    builder.bodyJson(contentJson);
    ResponseConverter<OutZone> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<OutZone>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Delete the specified zone.
   *
   * Deletes the zone for the specified home ID.
   *
   * @param deleteZoneOptions the {@link DeleteZoneOptions} containing the options for the call
   * @return a {@link ServiceCall} with a void result
   */
  public ServiceCall<Void> deleteZone(DeleteZoneOptions deleteZoneOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(deleteZoneOptions,
      "deleteZoneOptions cannot be null");
    Map<String, String> pathParamsMap = new HashMap<String, String>();
    pathParamsMap.put("zone_id", deleteZoneOptions.zoneId());
    RequestBuilder builder = RequestBuilder.delete(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/zones/{zone_id}", pathParamsMap));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "deleteZone");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    if (deleteZoneOptions.transactionId() != null) {
      builder.header("Transaction-Id", deleteZoneOptions.transactionId());
    }
    ResponseConverter<Void> responseConverter = ResponseConverterUtils.getVoid();
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Create a policy.
   *
   * Creates a policy for the specified account.
   *
   * @param createPolicyOptions the {@link CreatePolicyOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link OutPolicy}
   */
  public ServiceCall<OutPolicy> createPolicy(CreatePolicyOptions createPolicyOptions) {
    boolean skipBody = false;
    if (createPolicyOptions == null) {
      createPolicyOptions = new CreatePolicyOptions.Builder().build();
      skipBody = true;
    }
    RequestBuilder builder = RequestBuilder.post(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/policies"));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "createPolicy");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    if (createPolicyOptions.transactionId() != null) {
      builder.header("Transaction-Id", createPolicyOptions.transactionId());
    }
    if (!skipBody) {
      final JsonObject contentJson = new JsonObject();
      if (createPolicyOptions.description() != null) {
        contentJson.addProperty("description", createPolicyOptions.description());
      }
      if (createPolicyOptions.environments() != null) {
        contentJson.add("environments", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(createPolicyOptions.environments()));
      }
      if (createPolicyOptions.resources() != null) {
        contentJson.add("resources", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(createPolicyOptions.resources()));
      }
      builder.bodyJson(contentJson);
    }
    ResponseConverter<OutPolicy> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<OutPolicy>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Create a policy.
   *
   * Creates a policy for the specified account.
   *
   * @return a {@link ServiceCall} with a result of type {@link OutPolicy}
   */
  public ServiceCall<OutPolicy> createPolicy() {
    return createPolicy(null);
  }

  /**
   * List policies.
   *
   * Lists policies for the specified account.
   *
   * @param listPoliciesOptions the {@link ListPoliciesOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link PolicyPage}
   */
  public ServiceCall<PolicyPage> listPolicies(ListPoliciesOptions listPoliciesOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(listPoliciesOptions,
      "listPoliciesOptions cannot be null");
    RequestBuilder builder = RequestBuilder.get(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/policies"));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "listPolicies");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    if (listPoliciesOptions.transactionId() != null) {
      builder.header("Transaction-Id", listPoliciesOptions.transactionId());
    }
    builder.query("account_id", String.valueOf(listPoliciesOptions.accountId()));
    if (listPoliciesOptions.region() != null) {
      builder.query("region", String.valueOf(listPoliciesOptions.region()));
    }
    if (listPoliciesOptions.resource() != null) {
      builder.query("resource", String.valueOf(listPoliciesOptions.resource()));
    }
    if (listPoliciesOptions.resourceType() != null) {
      builder.query("resource_type", String.valueOf(listPoliciesOptions.resourceType()));
    }
    if (listPoliciesOptions.serviceInstance() != null) {
      builder.query("service_instance", String.valueOf(listPoliciesOptions.serviceInstance()));
    }
    if (listPoliciesOptions.serviceName() != null) {
      builder.query("service_name", String.valueOf(listPoliciesOptions.serviceName()));
    }
    if (listPoliciesOptions.serviceType() != null) {
      builder.query("service_type", String.valueOf(listPoliciesOptions.serviceType()));
    }
    if (listPoliciesOptions.zoneId() != null) {
      builder.query("zone_id", String.valueOf(listPoliciesOptions.zoneId()));
    }
    if (listPoliciesOptions.sort() != null) {
      builder.query("sort", String.valueOf(listPoliciesOptions.sort()));
    }
    ResponseConverter<PolicyPage> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<PolicyPage>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Get the specified policy.
   *
   * Gets the policy for the specified ID.
   *
   * @param getPolicyOptions the {@link GetPolicyOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link OutPolicy}
   */
  public ServiceCall<OutPolicy> getPolicy(GetPolicyOptions getPolicyOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(getPolicyOptions,
      "getPolicyOptions cannot be null");
    Map<String, String> pathParamsMap = new HashMap<String, String>();
    pathParamsMap.put("policy_id", getPolicyOptions.policyId());
    RequestBuilder builder = RequestBuilder.get(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/policies/{policy_id}", pathParamsMap));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "getPolicy");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    if (getPolicyOptions.transactionId() != null) {
      builder.header("Transaction-Id", getPolicyOptions.transactionId());
    }
    ResponseConverter<OutPolicy> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<OutPolicy>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Update the specified policy.
   *
   * Updates the policy for the specified ID.
   *
   * @param updatePolicyOptions the {@link UpdatePolicyOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link OutPolicy}
   */
  public ServiceCall<OutPolicy> updatePolicy(UpdatePolicyOptions updatePolicyOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(updatePolicyOptions,
      "updatePolicyOptions cannot be null");
    Map<String, String> pathParamsMap = new HashMap<String, String>();
    pathParamsMap.put("policy_id", updatePolicyOptions.policyId());
    RequestBuilder builder = RequestBuilder.put(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/policies/{policy_id}", pathParamsMap));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "updatePolicy");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    builder.header("If-Match", updatePolicyOptions.ifMatch());
    if (updatePolicyOptions.transactionId() != null) {
      builder.header("Transaction-Id", updatePolicyOptions.transactionId());
    }
    final JsonObject contentJson = new JsonObject();
    if (updatePolicyOptions.description() != null) {
      contentJson.addProperty("description", updatePolicyOptions.description());
    }
    if (updatePolicyOptions.environments() != null) {
      contentJson.add("environments", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(updatePolicyOptions.environments()));
    }
    if (updatePolicyOptions.resources() != null) {
      contentJson.add("resources", com.ibm.cloud.sdk.core.util.GsonSingleton.getGson().toJsonTree(updatePolicyOptions.resources()));
    }
    builder.bodyJson(contentJson);
    ResponseConverter<OutPolicy> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<OutPolicy>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Delete the specified policy.
   *
   * Deletes the policy for the specified home ID.
   *
   * @param deletePolicyOptions the {@link DeletePolicyOptions} containing the options for the call
   * @return a {@link ServiceCall} with a void result
   */
  public ServiceCall<Void> deletePolicy(DeletePolicyOptions deletePolicyOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(deletePolicyOptions,
      "deletePolicyOptions cannot be null");
    Map<String, String> pathParamsMap = new HashMap<String, String>();
    pathParamsMap.put("policy_id", deletePolicyOptions.policyId());
    RequestBuilder builder = RequestBuilder.delete(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/policies/{policy_id}", pathParamsMap));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "deletePolicy");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    if (deletePolicyOptions.transactionId() != null) {
      builder.header("Transaction-Id", deletePolicyOptions.transactionId());
    }
    ResponseConverter<Void> responseConverter = ResponseConverterUtils.getVoid();
    return createServiceCall(builder.build(), responseConverter);
  }

  /**
   * Get the specified account settings.
   *
   * Gets the settings for the specified account ID.
   *
   * @param getAccountSettingsOptions the {@link GetAccountSettingsOptions} containing the options for the call
   * @return a {@link ServiceCall} with a result of type {@link OutAccountSettings}
   */
  public ServiceCall<OutAccountSettings> getAccountSettings(GetAccountSettingsOptions getAccountSettingsOptions) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(getAccountSettingsOptions,
      "getAccountSettingsOptions cannot be null");
    Map<String, String> pathParamsMap = new HashMap<String, String>();
    pathParamsMap.put("account_id", getAccountSettingsOptions.accountId());
    RequestBuilder builder = RequestBuilder.get(RequestBuilder.resolveRequestUrl(getServiceUrl(), "/v1/account_settings/{account_id}", pathParamsMap));
    Map<String, String> sdkHeaders = SdkCommon.getSdkHeaders("network_based_access_control_admin_api", "v1", "getAccountSettings");
    for (Entry<String, String> header : sdkHeaders.entrySet()) {
      builder.header(header.getKey(), header.getValue());
    }
    builder.header("Accept", "application/json");
    if (getAccountSettingsOptions.transactionId() != null) {
      builder.header("Transaction-Id", getAccountSettingsOptions.transactionId());
    }
    ResponseConverter<OutAccountSettings> responseConverter =
      ResponseConverterUtils.getValue(new com.google.gson.reflect.TypeToken<OutAccountSettings>() { }.getType());
    return createServiceCall(builder.build(), responseConverter);
  }

}
