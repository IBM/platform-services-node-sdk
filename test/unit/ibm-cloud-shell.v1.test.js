/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const IbmCloudShellV1 = require('../../dist/ibm-cloud-shell/v1');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
} = unitTestUtils;

const ibmCloudShellServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://api.shell.test.cloud.ibm.com',
};

const ibmCloudShellService = new IbmCloudShellV1(ibmCloudShellServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(ibmCloudShellService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('IbmCloudShellV1', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = IbmCloudShellV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(IbmCloudShellV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(IbmCloudShellV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(IbmCloudShellV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = IbmCloudShellV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(IbmCloudShellV1);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new IbmCloudShellV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new IbmCloudShellV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(IbmCloudShellV1.DEFAULT_SERVICE_URL);
    });
  });
  describe('getAccountSettingsById', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getAccountSettingsById
        const accountId = '12345678-abcd-1a2b-a1b2-1234567890ab';
        const params = {
          accountId: accountId,
        };

        const getAccountSettingsByIdResult = ibmCloudShellService.getAccountSettingsById(params);

        // all methods should return a Promise
        expectToBePromise(getAccountSettingsByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/user/accounts/{account_id}/settings', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.path['account_id']).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = '12345678-abcd-1a2b-a1b2-1234567890ab';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        ibmCloudShellService.getAccountSettingsById(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudShellService.getAccountSettingsById({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const getAccountSettingsByIdPromise = ibmCloudShellService.getAccountSettingsById();
        expectToBePromise(getAccountSettingsByIdPromise);

        getAccountSettingsByIdPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateAccountSettingsById', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Feature
      const featureModel = [
        {
          enabled: true,
          key: 'server.file_manager',
        },
        {
          enabled: true,
          key: 'server.web_preview',
        },
      ];

      // RegionSetting
      const regionSettingModel = [
        {
          enabled: true,
          key: 'eu-de',
        },
        {
          enabled: true,
          key: 'jp-tok',
        },
        {
          enabled: true,
          key: 'us-south',
        },
      ];

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation updateAccountSettingsById
        const accountId = '12345678-abcd-1a2b-a1b2-1234567890ab';
        const newId = 'ac-12345678-abcd-1a2b-a1b2-1234567890ab';
        const newRev = '130-12345678-abcd-1a2b-a1b2-1234567890ab';
        const newAccountId = '12345678-abcd-1a2b-a1b2-1234567890ab';
        const newCreatedAt = 1600079615;
        const newCreatedBy = 'IBMid-1000000000';
        const newDefaultEnableNewFeatures = true;
        const newDefaultEnableNewRegions = true;
        const newEnabled = true;
        const newFeatures = featureModel;
        const newRegions = regionSettingModel;
        const newType = 'account_settings';
        const newUpdatedAt = 1624359948;
        const newUpdatedBy = 'IBMid-1000000000';
        const params = {
          accountId: accountId,
          newId: newId,
          newRev: newRev,
          newAccountId: newAccountId,
          newCreatedAt: newCreatedAt,
          newCreatedBy: newCreatedBy,
          newDefaultEnableNewFeatures: newDefaultEnableNewFeatures,
          newDefaultEnableNewRegions: newDefaultEnableNewRegions,
          newEnabled: newEnabled,
          newFeatures: newFeatures,
          newRegions: newRegions,
          newType: newType,
          newUpdatedAt: newUpdatedAt,
          newUpdatedBy: newUpdatedBy,
        };

        const updateAccountSettingsByIdResult = ibmCloudShellService.updateAccountSettingsById(params);

        // all methods should return a Promise
        expectToBePromise(updateAccountSettingsByIdResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/api/v1/user/accounts/{account_id}/settings', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['_id']).toEqual(newId);
        expect(options.body['_rev']).toEqual(newRev);
        expect(options.body['account_id']).toEqual(newAccountId);
        expect(options.body['created_at']).toEqual(newCreatedAt);
        expect(options.body['created_by']).toEqual(newCreatedBy);
        expect(options.body['default_enable_new_features']).toEqual(newDefaultEnableNewFeatures);
        expect(options.body['default_enable_new_regions']).toEqual(newDefaultEnableNewRegions);
        expect(options.body['enabled']).toEqual(newEnabled);
        expect(options.body['features']).toEqual(newFeatures);
        expect(options.body['regions']).toEqual(newRegions);
        expect(options.body['type']).toEqual(newType);
        expect(options.body['updated_at']).toEqual(newUpdatedAt);
        expect(options.body['updated_by']).toEqual(newUpdatedBy);
        expect(options.path['account_id']).toEqual(accountId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const accountId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          accountId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        ibmCloudShellService.updateAccountSettingsById(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async done => {
        let err;
        try {
          await ibmCloudShellService.updateAccountSettingsById({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', done => {
        const updateAccountSettingsByIdPromise = ibmCloudShellService.updateAccountSettingsById();
        expectToBePromise(updateAccountSettingsByIdPromise);

        updateAccountSettingsByIdPromise.catch(err => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
