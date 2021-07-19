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
 * An policy environment attribute.
 */
public class EnvironmentAttribute extends GenericModel {

  protected String name;
  protected String value;

  /**
   * Builder.
   */
  public static class Builder {
    private String name;
    private String value;

    private Builder(EnvironmentAttribute environmentAttribute) {
      this.name = environmentAttribute.name;
      this.value = environmentAttribute.value;
    }

    /**
     * Instantiates a new builder.
     */
    public Builder() {
    }

    /**
     * Instantiates a new builder with required properties.
     *
     * @param name the name
     * @param value the value
     */
    public Builder(String name, String value) {
      this.name = name;
      this.value = value;
    }

    /**
     * Builds a EnvironmentAttribute.
     *
     * @return the new EnvironmentAttribute instance
     */
    public EnvironmentAttribute build() {
      return new EnvironmentAttribute(this);
    }

    /**
     * Set the name.
     *
     * @param name the name
     * @return the EnvironmentAttribute builder
     */
    public Builder name(String name) {
      this.name = name;
      return this;
    }

    /**
     * Set the value.
     *
     * @param value the value
     * @return the EnvironmentAttribute builder
     */
    public Builder value(String value) {
      this.value = value;
      return this;
    }
  }

  protected EnvironmentAttribute(Builder builder) {
    com.ibm.cloud.sdk.core.util.Validator.notNull(builder.name,
      "name cannot be null");
    com.ibm.cloud.sdk.core.util.Validator.notNull(builder.value,
      "value cannot be null");
    name = builder.name;
    value = builder.value;
  }

  /**
   * New builder.
   *
   * @return a EnvironmentAttribute builder
   */
  public Builder newBuilder() {
    return new Builder(this);
  }

  /**
   * Gets the name.
   *
   * The attribute name.
   *
   * @return the name
   */
  public String name() {
    return name;
  }

  /**
   * Gets the value.
   *
   * The attribute value.
   *
   * @return the value
   */
  public String value() {
    return value;
  }
}

