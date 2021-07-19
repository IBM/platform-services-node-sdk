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

import com.ibm.cloud.network_based_access_control_admin_api.v1.model.EnvironmentAttribute;
import com.ibm.cloud.network_based_access_control_admin_api.v1.utils.TestUtilities;
import com.ibm.cloud.sdk.core.service.model.FileWithMetadata;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import org.testng.annotations.Test;
import static org.testng.Assert.*;

/**
 * Unit test class for the EnvironmentAttribute model.
 */
public class EnvironmentAttributeTest {
  final HashMap<String, InputStream> mockStreamMap = TestUtilities.createMockStreamMap();
  final List<FileWithMetadata> mockListFileWithMetadata = TestUtilities.creatMockListFileWithMetadata();

  @Test
  public void testEnvironmentAttribute() throws Throwable {
    EnvironmentAttribute environmentAttributeModel = new EnvironmentAttribute.Builder()
      .name("testString")
      .value("testString")
      .build();
    assertEquals(environmentAttributeModel.name(), "testString");
    assertEquals(environmentAttributeModel.value(), "testString");

    String json = TestUtilities.serialize(environmentAttributeModel);

    EnvironmentAttribute environmentAttributeModelNew = TestUtilities.deserialize(json, EnvironmentAttribute.class);
    assertTrue(environmentAttributeModelNew instanceof EnvironmentAttribute);
    assertEquals(environmentAttributeModelNew.name(), "testString");
    assertEquals(environmentAttributeModelNew.value(), "testString");
  }

  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testEnvironmentAttributeError() throws Throwable {
    new EnvironmentAttribute.Builder().build();
  }

}