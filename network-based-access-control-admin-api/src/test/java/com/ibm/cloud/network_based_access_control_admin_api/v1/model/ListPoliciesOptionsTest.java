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

import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ListPoliciesOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.utils.TestUtilities;
import com.ibm.cloud.sdk.core.service.model.FileWithMetadata;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import org.testng.annotations.Test;
import static org.testng.Assert.*;

/**
 * Unit test class for the ListPoliciesOptions model.
 */
public class ListPoliciesOptionsTest {
  final HashMap<String, InputStream> mockStreamMap = TestUtilities.createMockStreamMap();
  final List<FileWithMetadata> mockListFileWithMetadata = TestUtilities.creatMockListFileWithMetadata();

  @Test
  public void testListPoliciesOptions() throws Throwable {
    ListPoliciesOptions listPoliciesOptionsModel = new ListPoliciesOptions.Builder()
      .accountId("testString")
      .transactionId("testString")
      .region("testString")
      .resource("testString")
      .resourceType("testString")
      .serviceInstance("testString")
      .serviceName("testString")
      .serviceType("testString")
      .zoneId("testString")
      .sort("testString")
      .build();
    assertEquals(listPoliciesOptionsModel.accountId(), "testString");
    assertEquals(listPoliciesOptionsModel.transactionId(), "testString");
    assertEquals(listPoliciesOptionsModel.region(), "testString");
    assertEquals(listPoliciesOptionsModel.resource(), "testString");
    assertEquals(listPoliciesOptionsModel.resourceType(), "testString");
    assertEquals(listPoliciesOptionsModel.serviceInstance(), "testString");
    assertEquals(listPoliciesOptionsModel.serviceName(), "testString");
    assertEquals(listPoliciesOptionsModel.serviceType(), "testString");
    assertEquals(listPoliciesOptionsModel.zoneId(), "testString");
    assertEquals(listPoliciesOptionsModel.sort(), "testString");
  }

  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testListPoliciesOptionsError() throws Throwable {
    new ListPoliciesOptions.Builder().build();
  }

}