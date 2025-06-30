# Add `queryOnce` method for one-shot storage queries

## Description
This PR adds a new `queryOnce` method to the `ApiPromise` interface that allows fetching storage values with a single RPC call. This is similar to `query.multi` but returns a Promise instead of an Observable, making it more convenient for one-time fetches where subscription is not needed.

## Changes
- Added `QueryableStorageOnce` type to storage types
- Implemented `_decorateOnce` method in the `Decorate` class
- Added `_queryOnce` property to `Init` class and initialized it in the constructor
- Exposed `queryOnce` in the public API via `Getters` class
- Added comprehensive JSDoc comments and TypeScript types

## Testing Challenges
While implementing tests for this feature, we encountered several challenges with the test environment:
1. Tests involving the API instance would hang indefinitely
2. Mocking the provider and storage responses proved difficult
3. We were unable to successfully run integration tests despite multiple approaches

### Testing Approaches Tried:
1. **Minimal Test**: Basic test that doesn't involve the API instance - ✅ Works
2. **Core Utilities Test**: Testing TypeRegistry and utility functions - ✅ Works
3. **Direct API Test**: Testing API instance creation - ❌ Hangs
4. **Integration Test**: Testing queryOnce with mocks - ❌ Hangs

## Manual Verification
Since we couldn't get the tests to run successfully, here are the manual verification steps:

```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';

async function testQueryOnce() {
  const provider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });
  
  try {
    // Single query
    const account = await api.queryOnce([
      api.query.system.account('14Ns6kKbCoka3VM4qb3uBdU7wuS4nU7bD1hDXGxPpnwBwXUe')
    ]);
    console.log('Account:', account[0].toHuman());

    // Multiple queries
    const [account, timestamp] = await api.queryOnce([
      api.query.system.account('14Ns6kKbCoka3VM4qb3uBdU7wuS4nU7bD1hDXGxPpnwBwXUe'),
      api.query.timestamp.now()
    ]);
    console.log('Account:', account.toHuman());
    console.log('Timestamp:', timestamp.toHuman());
  } finally {
    await api.disconnect();
  }
}

testQueryOnce().catch(console.error);
```

## Next Steps
We would appreciate guidance on:
1. The correct way to mock the provider and storage for testing
2. Any specific test patterns we should follow
3. Any potential issues with the implementation

## Related Issues
Closes #XXXX (Link to the original issue)
