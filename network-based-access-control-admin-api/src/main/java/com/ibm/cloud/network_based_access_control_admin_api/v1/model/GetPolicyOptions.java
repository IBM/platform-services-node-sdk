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

import com.ibm.cloud.sdk.core.service.model.GenericModel;

/**
 * The getPolicy options.
 */
public class GetPolicyOptions extends GenericModel {

  protected String policyId;
  protected String transactionId;

  /**
   * Builder.
   */
  public static class Builder {
    private String policyId;
    private String transactionId;

    private Builder(GetPolicyOptions getPolicyOptions) {
      this.policyId = getPolicyOptions.policyId;
      this.transactionId = getPolicyOptions.transactionId;
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
     */
    public Builder(String policyId) {
      this.policyId = policyId;
    }

    /**
     * Builds a GetPolicyOptions.
     *
     * @return the new GetPolicyOptions instance
     */
    public GetPolicyOptions build() {
      return new GetPolicyOptions(this);
    }

    /**
     * Set the policyId.
     *
     * @param policyId the policyId
     * @return the GetPolicyOptions builder
     */
    public Builder policyId(String policyId) {
      this.policyId = policyId;
      return this;
    }

    /**
     * Set the transactionId.
     *
     * @param transactionId the transactionId
     * @return the GetPolicyOptions builder
     */
    public Builder transactionId(String transactionId) {
      this.transactionId = transactionId;
      return this;
    }
  }

  protected GetPolicyOptions(Builder builder) {
    com.ibm.cloud.sdk.core.util.Validator.notEmpty(builder.policyId,
      "policyId cannot be empty");
    policyId = builder.policyId;
    transactionId = builder.transactionId;
  }

  /**
   * New builder.
   *
   * @return a GetPolicyOptions builder
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

