import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const CheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {user}=useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const { packageName, price: priceParam } = useParams();
const price = parseFloat(priceParam); 

    useEffect(()=>{
        axiosSecure.post('/api/create-payment-intent',{ price: Number(price) })
        .then(res=> setClientSecret(res.data.clientSecret));
    },[price, axiosSecure]);


    const handleSubmit=async e =>{
        e.preventDefault();
        if(!stripe || !elements) return;

        setProcessing(true);
        const card = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if(error){
            setProcessing(false);
            return Swal.fire('Error', error.message, 'error');
        }

        const {paymentIntent} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: paymentMethod.id,
        });

        if(paymentIntent.status === 'succeeded'){
            const payment={
                email:user.email,
               transactionId: paymentIntent.id,
               price,
               packageName,
               date: new Date(),
            };

            await axiosSecure.post('/api/save-payment', payment);
            Swal.fire('Success', 'Payment complete! Badge Assigned', 'success');
          navigate(`/checkout/${packageName}/${price}`);
        }
        setProcessing(false);
    };


    return (
        <div className='p-7 max-w-md mx-auto bg-white rounded shadow'>
            <h2 className='text-xl font-bold mb-5'><strong>Package:</strong> {packageName}</h2>
            <h3 className='mb-5'><strong>Price:</strong> ${price}</h3>
            

            <form onSubmit={handleSubmit}>
                <CardElement className='p-4 border rounded text-black'/>
                <button
                type='submit'
                disabled={!stripe || !clientSecret || processing}
                className='btn btn-primary mt-5 w-full'>
                    {processing? 'Processing...' : 'Pay Now'}
                </button>

            </form>
        </div>
    );
};

export default CheckOut;