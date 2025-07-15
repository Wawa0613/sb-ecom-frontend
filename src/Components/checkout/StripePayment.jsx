import { Alert, AlertTitle, Skeleton } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentForm from './PaymentForm';
import { createStripePaymentSecret } from '../../store/actions';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    console.log("StripePayment - totalPrice:", totalPrice);
    if (!clientSecret && totalPrice > 0) {
      dispatch(createStripePaymentSecret(totalPrice));
    } else if (totalPrice <= 0) {
      console.error("Cannot create payment secret: totalPrice is 0 or invalid");
    }
  }, [clientSecret, totalPrice, dispatch]);

  if (isLoading) {
    return (
      <div className='max-w-lg mx-auto'>
        <Skeleton />
      </div>
    )
  }


  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  )
}

export default StripePayment