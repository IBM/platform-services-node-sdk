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

import com.ibm.cloud.network_based_access_control_admin_api.v1.model.Environment;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.EnvironmentAttribute;
import com.ibm.cloud.network_based_access_control_admin_api.v1.utils.TestUtilities;
import com.ibm.cloud.sdk.core.service.model.FileWithMetadata;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import org.testng.annotations.Test;
import static org.testng.Assert.*;

/**
 * Unit test class for the Environment model.
 */
public class EnvironmentTest {
  final HashMap<String, InputStream> mockStreamMap = TestUtilities.createMockStreamMap();
  final List<FileWithMetadata> mockListFileWithMetadata = TestUtilities.creatMockListFileWithMetadata();

  @Test
  public void testEnvironment() throws Throwable {
    EnvironmentAttribute environmentAttributeModel = new EnvironmentAttribute.Builder()
      .name("testString")
      .value("testString")
      .build();
    assertEquals(environmentAttributeModel.name(), "testString");
    assertEquals(environmentAttributeModel.value(), "testString");

    Environment environmentModel = new Environment.Builder()
      .attributes(new java.util.ArrayList<EnvironmentAttribute>(java.util.Arrays.asList(environmentAttributeModel)))
      .build();
    assertEquals(environmentModel.attributes(), new java.util.ArrayList<EnvironmentAttribute>(java.util.Arrays.asList(environmentAttributeModel)));

    String json = TestUtilities.serialize(environmentModel);

    Environment environmentModelNew = TestUtilities.deserialize(json, Environment.class);
    assertTrue(environmentModelNew instanceof Environment);
  }

  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testEnvironmentError() throws Throwable {
    new Environment.Builder().build();
  }

}