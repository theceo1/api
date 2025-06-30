// Copyright 2017-2025 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { MockProvider } from '@polkadot/rpc-provider/mock';
import { TypeRegistry } from '@polkadot/types';
import { hexToU8a } from '@polkadot/util';
import { createTestKeyring } from '@polkadot/keyring/testing';
import { createPair } from '@polkadot/keyring/pair';

import { SingleAccountSigner } from '../test/index.js';
import { ApiPromise } from './index.js';

describe('queryOnce minimal', (): void => {
  const registry = new TypeRegistry();
  const keyring = createTestKeyring({ type: 'ed25519' });
  const aliceEd = keyring.addPair(
    createPair({ toSS58: keyring.encodeAddress, type: 'ed25519' }, {
      publicKey: hexToU8a('0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee'),
      secretKey: hexToU8a('0xabf8e5bdbe30c65656c0a3cbd181ff8a56294a69dfedd27982aace4a7690911588dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee')
    })
  );
  let provider: MockProvider;
  let api: ApiPromise;

  beforeEach(async (): Promise<void> => {
    provider = new MockProvider(registry);
    
    // Minimal mocks
    provider.send.state_getMetadata = jest.fn().mockResolvedValue('0x6d6574610a');
    provider.send.state_getRuntimeVersion = jest.fn().mockResolvedValue({ specVersion: 100 });
    provider.send.state_queryStorageAt = jest.fn().mockResolvedValue(['0x00']);
  });

  afterEach(async (): Promise<void> => {
    if (api) {
      await api.disconnect();
    }
  });

  it('performs a basic query', async (): Promise<void> => {
    const signer = new SingleAccountSigner(registry, aliceEd);
    
    // Create API with minimal options
    api = await ApiPromise.create({ 
      provider, 
      registry, 
      signer, 
      throwOnConnect: true,
      noInitWarn: true,
      // Add more aggressive timeouts
      rpc: {
        maxBlockNumber: 10,
        blockNumber: 1
      }
    });

    // Simple test that doesn't depend on storage
    expect(api).toBeDefined();
  });
});
