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
package com.ibm.cloud.network_based_access_control_admin_api.v1.model;

import com.google.gson.annotations.SerializedName;
import com.ibm.cloud.sdk.core.service.model.GenericModel;

/**
 * A service reference value.
 */
public class ServiceRefValue extends GenericModel {

  @SerializedName("service_name")
  protected String serviceName;
  @SerializedName("account_id")
  protected String accountId;
  @SerializedName("service_instance")
  protected String serviceInstance;

  /**
   * Builder.
   */
  public static class Builder {
    private String serviceName;
    private String accountId;
    private String serviceInstance;

    private Builder(ServiceRefValue serviceRefValue) {
      this.serviceName = serviceRefValue.serviceName;
      this.accountId = serviceRefValue.accountId;
      this.serviceInstance = serviceRefValue.serviceInstance;
    }

    /**
     * Instantiates a new builder.
     */
    public Builder() {
    }

    /**
     * Instantiates a new builder with required properties.
     *
     * @param serviceName the serviceName
     */
    public Builder(String serviceName) {
      this.serviceName = serviceName;
    }

    /**
     * Builds a ServiceRefValue.
     *
     * @return the new ServiceRefValue instance
     */
    public ServiceRefValue build() {
      return new ServiceRefValue(this);
    }

    /**
     * Set the serviceName.
     *
     * @param serviceName the serviceName
     * @return the ServiceRefValue builder
     */
    public Builder serviceName(String serviceName) {
      this.serviceName = serviceName;
      return this;
    }

    /**
     * Set the accountId.
     *
     * @param accountId the accountId
     * @return the ServiceRefValue builder
     */
    public Builder accountId(String accountId) {
      this.accountId = accountId;
      return this;
    }

    /**
     * Set the serviceInstance.
     *
     * @param serviceInstance the serviceInstance
     * @return the ServiceRefValue builder
     */
    public Builder serviceInstance(String serviceInstance) {
      this.serviceInstance = serviceInstance;
      return this;
    }
  }

  protected ServiceRefValue(Builder builder) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(builder.serviceName,
      "serviceName cannot be null");
    serviceName = builder.serviceName;
    accountId = builder.accountId;
    serviceInstance = builder.serviceInstance;
  }

  /**
   * New builder.
   *
   * @return a ServiceRefValue builder
   */
  public Builder newBuilder() {
    return new Builder(this);
  }

  /**
   * Gets the serviceName.
   *
   * The service name.
   *
   * @return the serviceName
   */
  public String serviceName() {
    return serviceName;
  }

  /**
   * Gets the accountId.
   *
   * The id of the account owning the service.
   *
   * @return the accountId
   */
  public String accountId() {
    return accountId;
  }

  /**
   * Gets the serviceInstance.
   *
   * The service instance.
   *
   * @return the serviceInstance
   */
  public String serviceInstance() {
    return serviceInstance;
  }
}

