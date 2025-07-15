import React from 'react';
import { useNavigate } from 'react-router';

const MemberShip = () => {
    const navigate = useNavigate();

    const packages = [
        {
            name: 'Silver',
            price: '৳1,200/month',
            features: ['Basic meal access', '1 review per week', 'Bronze badge'],
        },
        {
            name: 'Gold',
            price: '৳2,400/month',
            features: ['Priority meals', 'Unlimited reviews', 'Silver badge'],
        },
        {
            name: 'Platinum',
            price: '৳3,600/month',
            features: ['All meals + chef specials', 'Premium support', 'Gold badge'],
        },
        
    ];

    const handleCheckout = (packageName, priceText) => {
   
    const price = parseFloat(priceText.replace(/[^\d]/g, ''));
    const priceInDollar = (price / 120).toFixed(2); // Example rate: 1 USD = ৳120

    navigate(`/checkout/${packageName}/${priceInDollar}`);
};


    return (
        <div className='my-10 p-6   bg-gray-100'>
            <h2 className='text-3xl font-bold text-center mb-7 text-[#ec644b]'>Upgrade Membership</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {packages.map((pkg)=>(
                    <div key={pkg.name} className='card bg-white shadow-lg p-5 border border-gray-200 rounded-lg text-center'>

                        <h3 className='text-2xl text-gray-600 font-bold mb-3'>{pkg.name} Package</h3>

                        <p className='text-lg font-semibold text-[#0c6c7c] mb-5'>{pkg.price}</p>

                        <ul className='text-sm text-gray-600 mb-5 space-y-1'>
                            {pkg.features.map((feature, i)=>(
                                <li key={i}>. {feature}</li>
                            ))}

                        </ul>

                        <button
  onClick={() => handleCheckout(pkg.name, pkg.price)}
  className='btn bg-[#ec644b] text-white w-full'
>
  Join Now
</button>

                    </div>
                ))}

            </div>
            
        </div>
    );
};

export default MemberShip;