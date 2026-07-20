import { describe, it, expect, beforeEach } from 'vitest';
import { useWishlistStore } from './wishlistStore';

describe('wishlistStore', () => {
  beforeEach(() => {
    useWishlistStore.setState({
      items: [],
    });
  });

  it('should add an item to the wishlist if it does not exist', () => {
    const store = useWishlistStore.getState();
    store.toggleItem('prod-1');

    expect(useWishlistStore.getState().items).toHaveLength(1);
    expect(useWishlistStore.getState().items[0].id).toBe('prod-1');
  });

  it('should remove an item from the wishlist if it already exists', () => {
    const store = useWishlistStore.getState();

    // Add it first
    store.toggleItem('prod-1');
    expect(useWishlistStore.getState().items).toHaveLength(1);

    // Toggle again to remove
    useWishlistStore.getState().toggleItem('prod-1');
    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it('should correctly report if an item is in the wishlist', () => {
    const store = useWishlistStore.getState();

    expect(store.hasItem('prod-2')).toBe(false);

    store.toggleItem('prod-2');
    expect(useWishlistStore.getState().hasItem('prod-2')).toBe(true);
  });
});
