// Copyright 2017-2025 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TypeRegistry } from '@polkadot/types';
import { hexToU8a } from '@polkadot/util';
import { createTestKeyring } from '@polkadot/keyring/testing';
import { createPair } from '@polkadot/keyring/pair';

describe('queryOnce direct test', (): void => {
  const registry = new TypeRegistry();
  const keyring = createTestKeyring({ type: 'ed25519' });
  
  keyring.addPair(
    createPair({ toSS58: keyring.encodeAddress, type: 'ed25519' }, {
      publicKey: hexToU8a('0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee'),
      secretKey: hexToU8a('0xabf8e5bdbe30c65656c0a3cbd181ff8a56294a69dfedd27982aace4a7690911588dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee')
    })
  );

  it('should have keyring with test account', (): void => {
    expect(keyring.getPairs()).toHaveLength(1);
  });
});
