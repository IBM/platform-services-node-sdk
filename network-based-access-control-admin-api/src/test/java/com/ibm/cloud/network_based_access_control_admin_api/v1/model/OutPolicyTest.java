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
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutPolicy;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.Resource;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ResourceAttribute;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ResourceTagAttribute;
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
 * Unit test class for the OutPolicy model.
 */
public class OutPolicyTest {
  final HashMap<String, InputStream> mockStreamMap = TestUtilities.createMockStreamMap();
  final List<FileWithMetadata> mockListFileWithMetadata = TestUtilities.creatMockListFileWithMetadata();

  @Test
  public void testOutPolicy() throws Throwable {
    OutPolicy outPolicyModel = new OutPolicy();
    assertNull(outPolicyModel.getId());
    assertNull(outPolicyModel.getCrn());
    assertNull(outPolicyModel.getDescription());
    assertNull(outPolicyModel.getEnvironments());
    assertNull(outPolicyModel.getResources());
    assertNull(outPolicyModel.getHref());
    assertNull(outPolicyModel.getCreatedAt());
    assertNull(outPolicyModel.getCreatedById());
    assertNull(outPolicyModel.getLastModifiedAt());
    assertNull(outPolicyModel.getLastModifiedById());
  }
}