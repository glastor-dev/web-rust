import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cartStore';

describe('cartStore', () => {
  // Configuración antes de cada prueba
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      isOpen: false,
    });
  });

  it('should add a new item to the cart', () => {
    const store = useCartStore.getState();
    store.addItem({ id: '1', name: 'Taladro M18', price: 150, image: 'url' });

    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(1);
    expect(updatedStore.items[0]).toEqual({
      id: '1',
      name: 'Taladro M18',
      price: 150,
      image: 'url',
      quantity: 1,
    });
    // Al añadir, el drawer se debería abrir
    expect(updatedStore.isOpen).toBe(true);
  });

  it('should increment quantity if item already exists', () => {
    const store = useCartStore.getState();
    store.addItem({ id: '1', name: 'Taladro M18', price: 150, image: 'url' });
    store.addItem({ id: '1', name: 'Taladro M18', price: 150, image: 'url' });

    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(1);
    expect(updatedStore.items[0].quantity).toBe(2);
  });

  it('should add specific quantity if provided', () => {
    const store = useCartStore.getState();
    store.addItem({ id: '2', name: 'Batería 5Ah', price: 90, image: 'url', quantity: 3 });

    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(1);
    expect(updatedStore.items[0].quantity).toBe(3);
  });

  it('should update quantity of an existing item', () => {
    const store = useCartStore.getState();
    store.addItem({ id: '1', name: 'Taladro M18', price: 150, image: 'url' });

    useCartStore.getState().updateQuantity('1', 5);

    const updatedStore = useCartStore.getState();
    expect(updatedStore.items[0].quantity).toBe(5);
  });

  it('should not allow quantity to drop below 1 via updateQuantity', () => {
    const store = useCartStore.getState();
    store.addItem({ id: '1', name: 'Taladro M18', price: 150, image: 'url' });

    useCartStore.getState().updateQuantity('1', 0);
    expect(useCartStore.getState().items[0].quantity).toBe(1);

    useCartStore.getState().updateQuantity('1', -5);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
  });

  it('should remove an item', () => {
    const store = useCartStore.getState();
    store.addItem({ id: '1', name: 'Taladro', price: 150, image: 'url' });
    store.addItem({ id: '2', name: 'Batería', price: 90, image: 'url' });

    useCartStore.getState().removeItem('1');

    const updatedStore = useCartStore.getState();
    expect(updatedStore.items).toHaveLength(1);
    expect(updatedStore.items[0].id).toBe('2');
  });

  it('should clear the cart', () => {
    const store = useCartStore.getState();
    store.addItem({ id: '1', name: 'Taladro', price: 150, image: 'url' });
    store.addItem({ id: '2', name: 'Batería', price: 90, image: 'url' });

    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
