import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';

const MealDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const [meal, setMeal] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [isLiked, setIsLiked] = useState(false);

    useEffect(()=>{
        const fetchMeal = async()=>{
            const res = await axiosSecure.get(`/api/meals/${id}`);
            setMeal(res.data);
        };
        fetchMeal();
    },[id, axiosSecure]);


    const handleLike = async()=>{
        try{
            const res =await axiosSecure.patch(`/api/meals/like/${id}`);
            if(res.data.modifiedCount > 0){
                setMeal((prev)=> ({...prev, likes:prev.likes + 1}));
                setIsLiked(true);
            }
        }catch(err){
            console.error(err);
        }
    };

  const  handleRequest=async()=>{
        try{
            const res = await axiosSecure.post('/api/requests',{
                mealId: id,
                userEmail: user.email,
                status: 'pending',
            });
            Swal.fire('Meal Requested!', '', 'success');

        }catch(err){
            Swal.fire('Error requesting meal', err.message, 'error');
        }
    };


    const handleReviewSubmit= async()=>{
        try{
            const res = await axiosSecure.post(`/api/reviews`,{
                mealId: id,
                userEmail:user.email,
                userName: user.displayName,
                review:reviewText,
                createdAt: new Date().toISOString(),
            });
            if(res.data.insertedId){
                setMeal((prev)=>({
                    ...prev,
                    reviews_count:prev.reviews_count +1,

                }));
                setReviewText('');
                Swal.fire('Review added', '', 'success');
            }
        }catch(err){
            Swal.fire('Failed to add review', err.message, 'error');
        }
    };

    if(!meal) return <p>Loading...</p>


    return (
       <section className='bg-base-100'>
        <Navbar></Navbar>

         <div className='max-w-4xl mx-auto my-10 p-5 rounded-md bg-base-100 shadow-md'>

            <div className='items-center justify-center'>
             <h2 className='text-3xl font-bold text-[#ec644b] p-4 text-center'>Meal Details</h2>
            </div>

            <img src={meal.image} alt={meal.title} className='w-full h-full object-cover rounded' />
            <h2 className='text-3xl font-bold mt-4 text-[#ec644b]'>{meal.title}</h2>
            <p className=' mt-2'>{meal.description}</p>

            <p className='mt-2'><strong>Distributor:</strong> {meal.distributorName} </p>

            <p className='mt-1'><strong>Ingredients:</strong> {meal.ingredients} ({meal.distributorEmail})</p>

            <p><strong>Posted:</strong> {new Date(meal.postTime).toLocaleString()}</p>

            <p><strong>Rating:</strong> {meal.rating}</p>

            <p><strong>Likes:</strong> {meal.likes}</p>

            <p><strong>Reviews:</strong> {meal.reviews_count}</p>

            {/* Buttons */}
            {user && (
                <div className='mt-4 flex gap-3'>
                    <button onClick={handleLike} disabled={isLiked} className='btn bg-[#0c6c7c] text-white'>
                        {isLiked ? 'Liked' : 'Like'}
                    </button>

                    <button onClick={handleRequest} className='btn bg-[#ec644b] text-white'>
                        Request Meal
                    </button>

                </div>
            )}

            {/* Review Input */}
            {user && (
                <div className='mt-5'>
                    <textarea
                    className='textarea textarea-bordered w-full'
                    rows={3}
                    value={reviewText}
                    onChange={(e)=> setReviewText(e.target.value)}
                    placeholder='Write your review...'/>

                    <button onClick={handleReviewSubmit} className='btn bg-green-600 text-white mt-2'>Submit Review</button>

                </div>
            )}
            
        </div>

        <Footer></Footer>
       </section>
    );
};

export default MealDetails;