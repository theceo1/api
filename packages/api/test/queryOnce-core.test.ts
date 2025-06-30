// Copyright 2017-2025 @polkadot/api authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TypeRegistry } from '@polkadot/types';
import { hexToU8a } from '@polkadot/util';

describe('queryOnce core test', (): void => {
  const registry = new TypeRegistry();

  it('should create a registry instance', (): void => {
    expect(registry).toBeDefined();
  });

  it('should convert hex to Uint8Array', (): void => {
    const result = hexToU8a('0x1234');
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toHaveLength(2);
  });
});
