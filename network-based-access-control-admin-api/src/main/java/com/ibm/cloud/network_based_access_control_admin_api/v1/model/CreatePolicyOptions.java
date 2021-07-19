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

import java.util.ArrayList;
import java.util.List;

import com.ibm.cloud.sdk.core.service.model.GenericModel;

/**
 * The createPolicy options.
 */
public class CreatePolicyOptions extends GenericModel {

  protected String description;
  protected List<Environment> environments;
  protected List<Resource> resources;
  protected String transactionId;

  /**
   * Builder.
   */
  public static class Builder {
    private String description;
    private List<Environment> environments;
    private List<Resource> resources;
    private String transactionId;

    private Builder(CreatePolicyOptions createPolicyOptions) {
      this.description = createPolicyOptions.description;
      this.environments = createPolicyOptions.environments;
      this.resources = createPolicyOptions.resources;
      this.transactionId = createPolicyOptions.transactionId;
    }

    /**
     * Instantiates a new builder.
     */
    public Builder() {
    }

    /**
     * Builds a CreatePolicyOptions.
     *
     * @return the new CreatePolicyOptions instance
     */
    public CreatePolicyOptions build() {
      return new CreatePolicyOptions(this);
    }

    /**
     * Adds an environments to environments.
     *
     * @param environments the new environments
     * @return the CreatePolicyOptions builder
     */
    public Builder addEnvironments(Environment environments) {
      com.ibm.cloud.sdk.core.util.Validator.notNull(environments,
        "environments cannot be null");
      if (this.environments == null) {
        this.environments = new ArrayList<Environment>();
      }
      this.environments.add(environments);
      return this;
    }

    /**
     * Adds an resources to resources.
     *
     * @param resources the new resources
     * @return the CreatePolicyOptions builder
     */
    public Builder addResources(Resource resources) {
      com.ibm.cloud.sdk.core.util.Validator.notNull(resources,
        "resources cannot be null");
      if (this.resources == null) {
        this.resources = new ArrayList<Resource>();
      }
      this.resources.add(resources);
      return this;
    }

    /**
     * Set the description.
     *
     * @param description the description
     * @return the CreatePolicyOptions builder
     */
    public Builder description(String description) {
      this.description = description;
      return this;
    }

    /**
     * Set the environments.
     * Existing environments will be replaced.
     *
     * @param environments the environments
     * @return the CreatePolicyOptions builder
     */
    public Builder environments(List<Environment> environments) {
      this.environments = environments;
      return this;
    }

    /**
     * Set the resources.
     * Existing resources will be replaced.
     *
     * @param resources the resources
     * @return the CreatePolicyOptions builder
     */
    public Builder resources(List<Resource> resources) {
      this.resources = resources;
      return this;
    }

    /**
     * Set the transactionId.
     *
     * @param transactionId the transactionId
     * @return the CreatePolicyOptions builder
     */
    public Builder transactionId(String transactionId) {
      this.transactionId = transactionId;
      return this;
    }
  }

  protected CreatePolicyOptions(Builder builder) {
    description = builder.description;
    environments = builder.environments;
    resources = builder.resources;
    transactionId = builder.transactionId;
  }

  /**
   * New builder.
   *
   * @return a CreatePolicyOptions builder
   */
  public Builder newBuilder() {
    return new Builder(this);
  }

  /**
   * Gets the description.
   *
   * The description of the policy.
   *
   * @return the description
   */
  public String description() {
    return description;
  }

  /**
   * Gets the environments.
   *
   * The environments this policy applies to.
   *
   * @return the environments
   */
  public List<Environment> environments() {
    return environments;
  }

  /**
   * Gets the resources.
   *
   * The resources this policy apply to.
   *
   * @return the resources
   */
  public List<Resource> resources() {
    return resources;
  }

  /**
   * Gets the transactionId.
   *
   * The UUID that is used to correlate and track transactions. If you omit this field, the service generates and sends
   * a transaction ID in the response.
   * **Note:** To help with debugging, we strongly recommend that you generate and supply a `Transaction-Id` with each
   * request.
   *
   * @return the transactionId
   */
  public String transactionId() {
    return transactionId;
  }
}

