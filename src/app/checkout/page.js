'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchCart } from '@/redux/slices/cartSlice';
import CheckoutPage from '@/components/checkout/CheckoutPage';

export default function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Redirect to cart if cart is empty
  if (!loading && cart && (!cart.items || cart.items.length === 0)) {
    router.push('/cart');
    return null;
  }

  return <CheckoutPage cart={cart} user={user} loading={loading} />;
}
