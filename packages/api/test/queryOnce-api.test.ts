// Copyright 2017-2025 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { ApiPromise } from '@polkadot/api';
import { MockProvider } from '@polkadot/rpc-provider/mock';
import { TypeRegistry } from '@polkadot/types';

describe('queryOnce API test', (): void => {
  const registry = new TypeRegistry();
  let provider: MockProvider;
  let api: ApiPromise;

  beforeAll(async (): Promise<void> => {
    provider = new MockProvider(registry);
    
    // Mock the minimal required RPC methods
    (provider as any).send = {
      state_getMetadata: jest.fn().mockResolvedValue('0x6d6574610a'),
      state_getRuntimeVersion: jest.fn().mockResolvedValue({ specVersion: 100 }),
      state_queryStorageAt: jest.fn().mockResolvedValue([])
    };

    api = await ApiPromise.create({ 
      provider, 
      registry, 
      throwOnConnect: true,
      noInitWarn: true
    });
  });

  afterAll(async (): Promise<void> => {
    if (api) {
      await api.disconnect();
    }
  });

  it('creates API instance', (): void => {
    expect(api).toBeDefined();
  });

  it('has queryOnce method', (): void => {
    expect(typeof api.queryOnce).toBe('function');
  });
});
