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

import com.ibm.cloud.network_based_access_control_admin_api.v1.model.AddressIPAddress;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.UpdateZoneOptions;
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
 * Unit test class for the UpdateZoneOptions model.
 */
public class UpdateZoneOptionsTest {
  final HashMap<String, InputStream> mockStreamMap = TestUtilities.createMockStreamMap();
  final List<FileWithMetadata> mockListFileWithMetadata = TestUtilities.creatMockListFileWithMetadata();

  @Test
  public void testUpdateZoneOptions() throws Throwable {
    AddressIPAddress addressModel = new AddressIPAddress.Builder()
      .type("ipAddress")
      .value("testString")
      .build();
    assertEquals(addressModel.type(), "ipAddress");
    assertEquals(addressModel.value(), "testString");

    UpdateZoneOptions updateZoneOptionsModel = new UpdateZoneOptions.Builder()
      .zoneId("testString")
      .ifMatch("testString")
      .name("testString")
      .accountId("testString")
      .description("testString")
      .addresses(new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)))
      .excluded(new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)))
      .transactionId("testString")
      .build();
    assertEquals(updateZoneOptionsModel.zoneId(), "testString");
    assertEquals(updateZoneOptionsModel.ifMatch(), "testString");
    assertEquals(updateZoneOptionsModel.name(), "testString");
    assertEquals(updateZoneOptionsModel.accountId(), "testString");
    assertEquals(updateZoneOptionsModel.description(), "testString");
    assertEquals(updateZoneOptionsModel.addresses(), new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)));
    assertEquals(updateZoneOptionsModel.excluded(), new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)));
    assertEquals(updateZoneOptionsModel.transactionId(), "testString");
  }

  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testUpdateZoneOptionsError() throws Throwable {
    new UpdateZoneOptions.Builder().build();
  }

}