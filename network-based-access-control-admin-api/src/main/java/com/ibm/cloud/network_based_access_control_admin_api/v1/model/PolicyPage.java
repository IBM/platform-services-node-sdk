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

import java.util.List;

import com.ibm.cloud.sdk.core.service.model.GenericModel;

/**
 * The response object of the ListPolicies operation.
 */
public class PolicyPage extends GenericModel {

  protected Long count;
  protected List<OutPolicy> policies;

  /**
   * Gets the count.
   *
   * The number of returned results.
   *
   * @return the count
   */
  public Long getCount() {
    return count;
  }

  /**
   * Gets the policies.
   *
   * The returned policies.
   *
   * @return the policies
   */
  public List<OutPolicy> getPolicies() {
    return policies;
  }
}

