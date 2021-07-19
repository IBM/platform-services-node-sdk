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
package com.ibm.cloud.network_based_access_control_admin_api.v1;

import com.ibm.cloud.network_based_access_control_admin_api.v1.NetworkBasedAccessControlAdminApi;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.Address;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.AddressIPAddress;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.AddressIPAddressRange;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.AddressServiceRef;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.AddressSubnet;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.AddressVPC;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.CreatePolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.CreateZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.DeletePolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.DeleteZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.Environment;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.EnvironmentAttribute;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.GetAccountSettingsOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.GetPolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.GetZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ListPoliciesOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ListZonesOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutAccountSettings;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutPolicy;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutZone;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.OutZoneSummary;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.PolicyPage;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.Resource;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ResourceAttribute;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ResourceTagAttribute;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ServiceRefValue;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.UpdatePolicyOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.UpdateZoneOptions;
import com.ibm.cloud.network_based_access_control_admin_api.v1.model.ZonePage;
import com.ibm.cloud.network_based_access_control_admin_api.v1.utils.TestUtilities;
import com.ibm.cloud.sdk.core.http.Response;
import com.ibm.cloud.sdk.core.security.Authenticator;
import com.ibm.cloud.sdk.core.security.NoAuthAuthenticator;
import com.ibm.cloud.sdk.core.service.model.FileWithMetadata;
import com.ibm.cloud.sdk.core.util.DateUtils;
import com.ibm.cloud.sdk.core.util.EnvironmentUtils;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import okhttp3.mockwebserver.RecordedRequest;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.testng.PowerMockTestCase;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import static org.testng.Assert.*;

/**
 * Unit test class for the NetworkBasedAccessControlAdminApi service.
 */
@PrepareForTest({ EnvironmentUtils.class })
@PowerMockIgnore({"javax.net.ssl.*", "org.mockito.*"})
public class NetworkBasedAccessControlAdminApiTest extends PowerMockTestCase {

  final HashMap<String, InputStream> mockStreamMap = TestUtilities.createMockStreamMap();
  final List<FileWithMetadata> mockListFileWithMetadata = TestUtilities.creatMockListFileWithMetadata();

  protected MockWebServer server;
  protected NetworkBasedAccessControlAdminApi networkBasedAccessControlAdminApiService;

  // Creates a mock set of environment variables that are returned by EnvironmentUtils.getenv().
  private Map<String, String> getTestProcessEnvironment() {
    Map<String, String> env = new HashMap<>();
    env.put("TESTSERVICE_AUTH_TYPE", "noAuth");
    return env;
  }

  public void constructClientService() throws Throwable {
    PowerMockito.spy(EnvironmentUtils.class);
    PowerMockito.when(EnvironmentUtils.getenv()).thenReturn(getTestProcessEnvironment());
    final String serviceName = "testService";

    networkBasedAccessControlAdminApiService = NetworkBasedAccessControlAdminApi.newInstance(serviceName);
    String url = server.url("/").toString();
    networkBasedAccessControlAdminApiService.setServiceUrl(url);
  }

  /**
  * Negative Test - construct the service with a null authenticator.
  */
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testConstructorWithNullAuthenticator() throws Throwable {
    final String serviceName = "testService";

    new NetworkBasedAccessControlAdminApi(serviceName, null);
  }

  @Test
  public void testCreateZoneWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"id\": \"id\", \"crn\": \"crn\", \"name\": \"name\", \"account_id\": \"accountId\", \"description\": \"description\", \"addresses\": [{\"type\": \"ipAddress\", \"value\": \"value\"}], \"excluded\": [{\"type\": \"ipAddress\", \"value\": \"value\"}], \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}";
    String createZonePath = "/v1/zones";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(201)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the AddressIPAddress model
    AddressIPAddress addressModel = new AddressIPAddress.Builder()
    .type("ipAddress")
    .value("169.23.56.234")
    .build();

    // Construct an instance of the CreateZoneOptions model
    CreateZoneOptions createZoneOptionsModel = new CreateZoneOptions.Builder()
    .name("an example of zone")
    .accountId("12ab34cd56ef78ab90cd12ef34ab56cd")
    .description("this is an example of zone")
    .addresses(new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)))
    .excluded(new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)))
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<OutZone> response = networkBasedAccessControlAdminApiService.createZone(createZoneOptionsModel).execute();
    assertNotNull(response);
    OutZone responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "POST");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, createZonePath);
  }

  @Test
  public void testListZonesWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"count\": 5, \"zones\": [{\"id\": \"id\", \"crn\": \"crn\", \"name\": \"name\", \"description\": \"description\", \"addresses_preview\": [{\"type\": \"ipAddress\", \"value\": \"value\"}], \"address_count\": 12, \"excluded_count\": 13, \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}]}";
    String listZonesPath = "/v1/zones";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(200)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the ListZonesOptions model
    ListZonesOptions listZonesOptionsModel = new ListZonesOptions.Builder()
    .accountId("testString")
    .transactionId("testString")
    .name("testString")
    .sort("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<ZonePage> response = networkBasedAccessControlAdminApiService.listZones(listZonesOptionsModel).execute();
    assertNotNull(response);
    ZonePage responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "GET");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNotNull(query);
    // Get query params
    assertEquals(query.get("account_id"), "testString");
    assertEquals(query.get("name"), "testString");
    assertEquals(query.get("sort"), "testString");
    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, listZonesPath);
  }

  // Test the listZones operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testListZonesNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.listZones(null).execute();
  }

  @Test
  public void testGetZoneWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"id\": \"id\", \"crn\": \"crn\", \"name\": \"name\", \"account_id\": \"accountId\", \"description\": \"description\", \"addresses\": [{\"type\": \"ipAddress\", \"value\": \"value\"}], \"excluded\": [{\"type\": \"ipAddress\", \"value\": \"value\"}], \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}";
    String getZonePath = "/v1/zones/testString";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(200)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the GetZoneOptions model
    GetZoneOptions getZoneOptionsModel = new GetZoneOptions.Builder()
    .zoneId("testString")
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<OutZone> response = networkBasedAccessControlAdminApiService.getZone(getZoneOptionsModel).execute();
    assertNotNull(response);
    OutZone responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "GET");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, getZonePath);
  }

  // Test the getZone operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testGetZoneNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.getZone(null).execute();
  }

  @Test
  public void testUpdateZoneWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"id\": \"id\", \"crn\": \"crn\", \"name\": \"name\", \"account_id\": \"accountId\", \"description\": \"description\", \"addresses\": [{\"type\": \"ipAddress\", \"value\": \"value\"}], \"excluded\": [{\"type\": \"ipAddress\", \"value\": \"value\"}], \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}";
    String updateZonePath = "/v1/zones/testString";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(200)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the AddressIPAddress model
    AddressIPAddress addressModel = new AddressIPAddress.Builder()
    .type("ipAddress")
    .value("169.23.56.234")
    .build();

    // Construct an instance of the UpdateZoneOptions model
    UpdateZoneOptions updateZoneOptionsModel = new UpdateZoneOptions.Builder()
    .zoneId("testString")
    .ifMatch("testString")
    .name("an example of zone")
    .accountId("12ab34cd56ef78ab90cd12ef34ab56cd")
    .description("this is an example of zone")
    .addresses(new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)))
    .excluded(new java.util.ArrayList<Address>(java.util.Arrays.asList(addressModel)))
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<OutZone> response = networkBasedAccessControlAdminApiService.updateZone(updateZoneOptionsModel).execute();
    assertNotNull(response);
    OutZone responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "PUT");
    assertEquals(request.getHeader("If-Match"), "testString");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, updateZonePath);
  }

  // Test the updateZone operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testUpdateZoneNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.updateZone(null).execute();
  }

  @Test
  public void testDeleteZoneWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "";
    String deleteZonePath = "/v1/zones/testString";

    server.enqueue(new MockResponse()
    .setResponseCode(204)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the DeleteZoneOptions model
    DeleteZoneOptions deleteZoneOptionsModel = new DeleteZoneOptions.Builder()
    .zoneId("testString")
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<Void> response = networkBasedAccessControlAdminApiService.deleteZone(deleteZoneOptionsModel).execute();
    assertNotNull(response);
    Void responseObj = response.getResult();
    // Response does not have a return type. Check that the result is null.
    assertNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "DELETE");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, deleteZonePath);
  }

  // Test the deleteZone operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testDeleteZoneNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.deleteZone(null).execute();
  }

  @Test
  public void testCreatePolicyWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"id\": \"id\", \"crn\": \"crn\", \"description\": \"description\", \"environments\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\"}]}], \"resources\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}], \"tags\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}]}], \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}";
    String createPolicyPath = "/v1/policies";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(201)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the EnvironmentAttribute model
    EnvironmentAttribute environmentAttributeModel = new EnvironmentAttribute.Builder()
    .name("networkZoneId")
    .value("65810ac7-6200-4f22-ac19-f8f8edf70a34")
    .build();

    // Construct an instance of the Environment model
    Environment environmentModel = new Environment.Builder()
    .attributes(new java.util.ArrayList<EnvironmentAttribute>(java.util.Arrays.asList(environmentAttributeModel)))
    .build();

    // Construct an instance of the ResourceAttribute model
    ResourceAttribute resourceAttributeModel = new ResourceAttribute.Builder()
    .name("accountId")
    .value("12ab34cd56ef78ab90cd12ef34ab56cd")
    .operator("testString")
    .build();

    // Construct an instance of the ResourceTagAttribute model
    ResourceTagAttribute resourceTagAttributeModel = new ResourceTagAttribute.Builder()
    .name("testString")
    .value("testString")
    .operator("testString")
    .build();

    // Construct an instance of the Resource model
    Resource resourceModel = new Resource.Builder()
    .attributes(new java.util.ArrayList<ResourceAttribute>(java.util.Arrays.asList(resourceAttributeModel)))
    .tags(new java.util.ArrayList<ResourceTagAttribute>(java.util.Arrays.asList(resourceTagAttributeModel)))
    .build();

    // Construct an instance of the CreatePolicyOptions model
    CreatePolicyOptions createPolicyOptionsModel = new CreatePolicyOptions.Builder()
    .description("this is an example of policy")
    .environments(new java.util.ArrayList<Environment>(java.util.Arrays.asList(environmentModel)))
    .resources(new java.util.ArrayList<Resource>(java.util.Arrays.asList(resourceModel)))
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<OutPolicy> response = networkBasedAccessControlAdminApiService.createPolicy(createPolicyOptionsModel).execute();
    assertNotNull(response);
    OutPolicy responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "POST");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, createPolicyPath);
  }

  @Test
  public void testListPoliciesWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"count\": 5, \"policies\": [{\"id\": \"id\", \"crn\": \"crn\", \"description\": \"description\", \"environments\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\"}]}], \"resources\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}], \"tags\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}]}], \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}]}";
    String listPoliciesPath = "/v1/policies";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(200)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the ListPoliciesOptions model
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

    // Invoke operation with valid options model (positive test)
    Response<PolicyPage> response = networkBasedAccessControlAdminApiService.listPolicies(listPoliciesOptionsModel).execute();
    assertNotNull(response);
    PolicyPage responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "GET");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNotNull(query);
    // Get query params
    assertEquals(query.get("account_id"), "testString");
    assertEquals(query.get("region"), "testString");
    assertEquals(query.get("resource"), "testString");
    assertEquals(query.get("resource_type"), "testString");
    assertEquals(query.get("service_instance"), "testString");
    assertEquals(query.get("service_name"), "testString");
    assertEquals(query.get("service_type"), "testString");
    assertEquals(query.get("zone_id"), "testString");
    assertEquals(query.get("sort"), "testString");
    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, listPoliciesPath);
  }

  // Test the listPolicies operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testListPoliciesNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.listPolicies(null).execute();
  }

  @Test
  public void testGetPolicyWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"id\": \"id\", \"crn\": \"crn\", \"description\": \"description\", \"environments\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\"}]}], \"resources\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}], \"tags\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}]}], \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}";
    String getPolicyPath = "/v1/policies/testString";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(200)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the GetPolicyOptions model
    GetPolicyOptions getPolicyOptionsModel = new GetPolicyOptions.Builder()
    .policyId("testString")
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<OutPolicy> response = networkBasedAccessControlAdminApiService.getPolicy(getPolicyOptionsModel).execute();
    assertNotNull(response);
    OutPolicy responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "GET");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, getPolicyPath);
  }

  // Test the getPolicy operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testGetPolicyNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.getPolicy(null).execute();
  }

  @Test
  public void testUpdatePolicyWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"id\": \"id\", \"crn\": \"crn\", \"description\": \"description\", \"environments\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\"}]}], \"resources\": [{\"attributes\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}], \"tags\": [{\"name\": \"name\", \"value\": \"value\", \"operator\": \"operator\"}]}], \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}";
    String updatePolicyPath = "/v1/policies/testString";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(200)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the EnvironmentAttribute model
    EnvironmentAttribute environmentAttributeModel = new EnvironmentAttribute.Builder()
    .name("networkZoneId")
    .value("65810ac7-6200-4f22-ac19-f8f8edf70a34")
    .build();

    // Construct an instance of the Environment model
    Environment environmentModel = new Environment.Builder()
    .attributes(new java.util.ArrayList<EnvironmentAttribute>(java.util.Arrays.asList(environmentAttributeModel)))
    .build();

    // Construct an instance of the ResourceAttribute model
    ResourceAttribute resourceAttributeModel = new ResourceAttribute.Builder()
    .name("accountId")
    .value("12ab34cd56ef78ab90cd12ef34ab56cd")
    .operator("testString")
    .build();

    // Construct an instance of the ResourceTagAttribute model
    ResourceTagAttribute resourceTagAttributeModel = new ResourceTagAttribute.Builder()
    .name("testString")
    .value("testString")
    .operator("testString")
    .build();

    // Construct an instance of the Resource model
    Resource resourceModel = new Resource.Builder()
    .attributes(new java.util.ArrayList<ResourceAttribute>(java.util.Arrays.asList(resourceAttributeModel)))
    .tags(new java.util.ArrayList<ResourceTagAttribute>(java.util.Arrays.asList(resourceTagAttributeModel)))
    .build();

    // Construct an instance of the UpdatePolicyOptions model
    UpdatePolicyOptions updatePolicyOptionsModel = new UpdatePolicyOptions.Builder()
    .policyId("testString")
    .ifMatch("testString")
    .description("this is an example of policy")
    .environments(new java.util.ArrayList<Environment>(java.util.Arrays.asList(environmentModel)))
    .resources(new java.util.ArrayList<Resource>(java.util.Arrays.asList(resourceModel)))
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<OutPolicy> response = networkBasedAccessControlAdminApiService.updatePolicy(updatePolicyOptionsModel).execute();
    assertNotNull(response);
    OutPolicy responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "PUT");
    assertEquals(request.getHeader("If-Match"), "testString");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, updatePolicyPath);
  }

  // Test the updatePolicy operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testUpdatePolicyNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.updatePolicy(null).execute();
  }

  @Test
  public void testDeletePolicyWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "";
    String deletePolicyPath = "/v1/policies/testString";

    server.enqueue(new MockResponse()
    .setResponseCode(204)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the DeletePolicyOptions model
    DeletePolicyOptions deletePolicyOptionsModel = new DeletePolicyOptions.Builder()
    .policyId("testString")
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<Void> response = networkBasedAccessControlAdminApiService.deletePolicy(deletePolicyOptionsModel).execute();
    assertNotNull(response);
    Void responseObj = response.getResult();
    // Response does not have a return type. Check that the result is null.
    assertNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "DELETE");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, deletePolicyPath);
  }

  // Test the deletePolicy operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testDeletePolicyNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.deletePolicy(null).execute();
  }

  @Test
  public void testGetAccountSettingsWOptions() throws Throwable {
    // Schedule some responses.
    String mockResponseBody = "{\"id\": \"id\", \"crn\": \"crn\", \"policy_count_limit\": 16, \"zone_count_limit\": 14, \"current_policy_count\": 18, \"current_zone_count\": 16, \"href\": \"href\", \"created_at\": \"2019-01-01T12:00:00.000Z\", \"created_by_id\": \"createdById\", \"last_modified_at\": \"2019-01-01T12:00:00.000Z\", \"last_modified_by_id\": \"lastModifiedById\"}";
    String getAccountSettingsPath = "/v1/account_settings/testString";

    server.enqueue(new MockResponse()
    .setHeader("Content-type", "application/json")
    .setResponseCode(200)
    .setBody(mockResponseBody));

    constructClientService();

    // Construct an instance of the GetAccountSettingsOptions model
    GetAccountSettingsOptions getAccountSettingsOptionsModel = new GetAccountSettingsOptions.Builder()
    .accountId("testString")
    .transactionId("testString")
    .build();

    // Invoke operation with valid options model (positive test)
    Response<OutAccountSettings> response = networkBasedAccessControlAdminApiService.getAccountSettings(getAccountSettingsOptionsModel).execute();
    assertNotNull(response);
    OutAccountSettings responseObj = response.getResult();
    assertNotNull(responseObj);

    // Verify the contents of the request
    RecordedRequest request = server.takeRequest();
    assertNotNull(request);
    assertEquals(request.getMethod(), "GET");

    // Check query
    Map<String, String> query = TestUtilities.parseQueryString(request);
    assertNull(query);

    // Check request path
    String parsedPath = TestUtilities.parseReqPath(request);
    assertEquals(parsedPath, getAccountSettingsPath);
  }

  // Test the getAccountSettings operation with null options model parameter
  @Test(expectedExceptions = IllegalArgumentException.class)
  public void testGetAccountSettingsNoOptions() throws Throwable {
    // construct the service
    constructClientService();

    server.enqueue(new MockResponse());

    // Invoke operation with null options model (negative test)
    networkBasedAccessControlAdminApiService.getAccountSettings(null).execute();
  }

  /** Initialize the server */
  @BeforeMethod
  public void setUpMockServer() {
    try {
        server = new MockWebServer();
        // register handler
        server.start();
        }
    catch (IOException err) {
        fail("Failed to instantiate mock web server");
    }
  }

  @AfterMethod
  public void tearDownMockServer() throws IOException {
    server.shutdown();
    networkBasedAccessControlAdminApiService = null;
  }
}