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
 * The updatePolicy options.
 */
public class UpdatePolicyOptions extends GenericModel {

  protected String policyId;
  protected String ifMatch;
  protected String description;
  protected List<Environment> environments;
  protected List<Resource> resources;
  protected String transactionId;

  /**
   * Builder.
   */
  public static class Builder {
    private String policyId;
    private String ifMatch;
    private String description;
    private List<Environment> environments;
    private List<Resource> resources;
    private String transactionId;

    private Builder(UpdatePolicyOptions updatePolicyOptions) {
      this.policyId = updatePolicyOptions.policyId;
      this.ifMatch = updatePolicyOptions.ifMatch;
      this.description = updatePolicyOptions.description;
      this.environments = updatePolicyOptions.environments;
      this.resources = updatePolicyOptions.resources;
      this.transactionId = updatePolicyOptions.transactionId;
    }

    /**
     * Instantiates a new builder.
     */
    public Builder() {
    }

    /**
     * Instantiates a new builder with required properties.
     *
     * @param policyId the policyId
     * @param ifMatch the ifMatch
     */
    public Builder(String policyId, String ifMatch) {
      this.policyId = policyId;
      this.ifMatch = ifMatch;
    }

    /**
     * Builds a UpdatePolicyOptions.
     *
     * @return the new UpdatePolicyOptions instance
     */
    public UpdatePolicyOptions build() {
      return new UpdatePolicyOptions(this);
    }

    /**
     * Adds an environments to environments.
     *
     * @param environments the new environments
     * @return the UpdatePolicyOptions builder
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
     * @return the UpdatePolicyOptions builder
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
     * Set the policyId.
     *
     * @param policyId the policyId
     * @return the UpdatePolicyOptions builder
     */
    public Builder policyId(String policyId) {
      this.policyId = policyId;
      return this;
    }

    /**
     * Set the ifMatch.
     *
     * @param ifMatch the ifMatch
     * @return the UpdatePolicyOptions builder
     */
    public Builder ifMatch(String ifMatch) {
      this.ifMatch = ifMatch;
      return this;
    }

    /**
     * Set the description.
     *
     * @param description the description
     * @return the UpdatePolicyOptions builder
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
     * @return the UpdatePolicyOptions builder
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
     * @return the UpdatePolicyOptions builder
     */
    public Builder resources(List<Resource> resources) {
      this.resources = resources;
      return this;
    }

    /**
     * Set the transactionId.
     *
     * @param transactionId the transactionId
     * @return the UpdatePolicyOptions builder
     */
    public Builder transactionId(String transactionId) {
      this.transactionId = transactionId;
      return this;
    }
  }

  protected UpdatePolicyOptions(Builder builder) {
    com.ibm.cloud.sdk.core.util.Validator.notEmpty(builder.policyId,
      "policyId cannot be empty");
    com.ibm.cloud.sdk.core.util.Validator.notNull(builder.ifMatch,
      "ifMatch cannot be null");
    policyId = builder.policyId;
    ifMatch = builder.ifMatch;
    description = builder.description;
    environments = builder.environments;
    resources = builder.resources;
    transactionId = builder.transactionId;
  }

  /**
   * New builder.
   *
   * @return a UpdatePolicyOptions builder
   */
  public Builder newBuilder() {
    return new Builder(this);
  }

  /**
   * Gets the policyId.
   *
   * The ID of a policy.
   *
   * @return the policyId
   */
  public String policyId() {
    return policyId;
  }

  /**
   * Gets the ifMatch.
   *
   * The current revision of the resource being updated. This can be found in the Create/Get/Update resource response
   * ETag header.
   *
   * @return the ifMatch
   */
  public String ifMatch() {
    return ifMatch;
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

