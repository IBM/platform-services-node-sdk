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
 * A policy environment.
 */
public class Environment extends GenericModel {

  protected List<EnvironmentAttribute> attributes;

  /**
   * Builder.
   */
  public static class Builder {
    private List<EnvironmentAttribute> attributes;

    private Builder(Environment environment) {
      this.attributes = environment.attributes;
    }

    /**
     * Instantiates a new builder.
     */
    public Builder() {
    }

    /**
     * Instantiates a new builder with required properties.
     *
     * @param attributes the attributes
     */
    public Builder(List<EnvironmentAttribute> attributes) {
      this.attributes = attributes;
    }

    /**
     * Builds a Environment.
     *
     * @return the new Environment instance
     */
    public Environment build() {
      return new Environment(this);
    }

    /**
     * Adds an attributes to attributes.
     *
     * @param attributes the new attributes
     * @return the Environment builder
     */
    public Builder addAttributes(EnvironmentAttribute attributes) {
      com.ibm.cloud.sdk.core.util.Validator.notNull(attributes,
        "attributes cannot be null");
      if (this.attributes == null) {
        this.attributes = new ArrayList<EnvironmentAttribute>();
      }
      this.attributes.add(attributes);
      return this;
    }

    /**
     * Set the attributes.
     * Existing attributes will be replaced.
     *
     * @param attributes the attributes
     * @return the Environment builder
     */
    public Builder attributes(List<EnvironmentAttribute> attributes) {
      this.attributes = attributes;
      return this;
    }
  }

  protected Environment(Builder builder) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(builder.attributes,
      "attributes cannot be null");
    attributes = builder.attributes;
  }

  /**
   * New builder.
   *
   * @return a Environment builder
   */
  public Builder newBuilder() {
    return new Builder(this);
  }

  /**
   * Gets the attributes.
   *
   * The attributes.
   *
   * @return the attributes
   */
  public List<EnvironmentAttribute> attributes() {
    return attributes;
  }
}

