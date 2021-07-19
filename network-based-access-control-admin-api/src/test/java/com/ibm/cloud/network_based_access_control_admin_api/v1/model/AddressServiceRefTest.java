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

import com.ibm.cloud.network_based_access_control_admin_api.v1.model.AddressServiceRef;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ServiceRefValue;
import com.ibm.cloud.network_based_access_control_admin_api.v1.utils.TestUtilities;
import com.ibm.cloud.sdk.core.service.model.FileWithMetadata;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import org.testng.annotations.Test;
import static org.testng.Assert.*;

/**
 * Unit test class for the AddressServiceRef model.
 */
public class AddressServiceRefTest {
  final HashMap<String, InputStream> mockStreamMap = TestUtilities.createMockStreamMap();
  final List<FileWithMetadata> mockListFileWithMetadata = TestUtilities.creatMockListFileWithMetadata();

  @Test
  public void testAddressServiceRef() throws Throwable {
    ServiceRefValue serviceRefValueModel = new ServiceRefValue.Builder()
      .serviceName("testString")
      .accountId("testString")
      .serviceInstance("testString")
      .build();
    assertEquals(serviceRefValueModel.serviceName(), "testString");
    assertEquals(serviceRefValueModel.accountId(), "testString");
    assertEquals(serviceRefValueModel.serviceInstance(), "testString");

    AddressServiceRef addressServiceRefModel = new AddressServiceRef.Builder()
      .type("serviceRef")
      .value(serviceRefValueModel)
      .build();
    assertEquals(addressServiceRefModel.type(), "serviceRef");
    assertEquals(addressServiceRefModel.value(), serviceRefValueModel);

    String json = TestUtilities.serialize(addressServiceRefModel);

    AddressServiceRef addressServiceRefModelNew = TestUtilities.deserialize(json, AddressServiceRef.class);
    assertTrue(addressServiceRefModelNew instanceof AddressServiceRef);
    assertEquals(addressServiceRefModelNew.type(), "serviceRef");
    assertEquals(addressServiceRefModelNew.value().toString(), serviceRefValueModel.toString());
  }

  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testAddressServiceRefError() throws Throwable {
    new AddressServiceRef.Builder().build();
  }

}