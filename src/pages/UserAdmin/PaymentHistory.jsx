import React, { useContext } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const axiosSecure=useAxiosSecure();
     const { user, loading } = useContext(AuthContext);
     const email = user ?.email;

     const {data: payments = [], isLoading}=useQuery({
        enabled: !!email,
        queryKey: ['paymentHistory', email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/payments?email=${email}`);
            return res.data;
        },

     });

     if(isLoading) return <p className='text-center'>Loading...</p>

     if(payments.length === 0){
        return <p className='text-center text-gray-500 mt-10'>No payment history</p>
     }


    return (
        <div className='p-6'>
            <h2 className='text2xl font-bold mb-4'>My Payment History</h2>
            
            <div className='overflow-x-auto'>
                <table className='table table-zebra w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Package</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index)=>(
                            <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td>{payment.packageName}</td>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
};

export default PaymentHistory;