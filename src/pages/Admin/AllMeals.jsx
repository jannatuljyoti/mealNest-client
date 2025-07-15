import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllMeals = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [sortBy, setSortBy] = useState('likes');
    const [order, setOrder] = useState('desc');
    const [editingMealId, setEditingMealId]=useState(null);
    const [editedMeal, setEditedMeal]=useState({});

    const {data:allMeals = [], refetch} = useQuery({
        queryKey: ['allMeals', sortBy,order],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/api/all-meals?sortBy=${sortBy}&order=${order}`);
            return res.data;
        }
    });

    const handleSortChange =(e)=>setSortBy(e.target.value);
    const handleOrderChange =(e)=>setOrder(e.target.value);
    

    const handleEdit = (meal)=>{
        setEditingMealId(meal._id);
        setEditedMeal({title: meal.title, price:meal.price});
    };

    const handleSave= async(id)=>{
        try{
            await axiosSecure.patch(`/api/meals/${id}`, editedMeal);
            Swal.fire('Updated!', 'Meal info has been updated.', 'success');
            setEditingMealId(null);
            refetch();
        }catch(err){
            console.error(err);
            Swal.fire('Error', 'Something went wrong','error');
        }
    };

    const handleDelete = async(id)=>{
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This meal will be deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if(confirm.isConfirmed){
            try{
                await axiosSecure.delete(`/api/meals/${id}`);
                Swal.fire('Deleted!', 'Meal has been deleted.', 'success');
                refetch();
            }catch(err){
                console.error(err);
                Swal.fire('Error', 'Failed to delete meal', 'error');
            }
        }
    };


    return (
        <div className='p-5 md:p-7'>
            <h2 className='text-2xl font-bold mb-5 text-center md:text-left'>All Meals</h2>

            <div className='flex flex-col sm:flex-row gap-4 mb-4'>
                <select value={sortBy} onChange={handleSortChange} className='border px-3 py-2 rounded'>
                    <option value="likes">Sort By Likes</option>
                    <option value="reviews_count">Sort by Reviews Count</option>
                </select>

                <select value={order} onChange={handleOrderChange} className='border px-3 py-2 rounded'>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>

            </div>

            <div className="overflow-x-auto">
    <table className="table-auto min-w-[768px] border border-gray-300 rounded   w-full">



          <thead className="bg-gray-100">
            <tr>
              <th className='p-2 text-left'>Title</th>
              <th className='p-2 text-left'>Price</th>
              <th className='p-2 text-left'>Likes</th>
              <th className='p-2 text-left'>Reviews</th>
              <th className='p-2 text-left'>Rating</th>
              <th className='p-2 text-left'>Distributor</th>
              <th className='p-2 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allMeals.map((meal) => (
              <tr key={meal._id} className='border-t'>
               
               <td className='p-2 break-words max-w-[150px]'>
                  {editingMealId === meal._id ? (
                  <input type="text" 
                  value={editedMeal.title}
                  onChange={(e)=>
                    setEditedMeal({...editedMeal, title: e.target.value})
                  }
                  className='border px-2 py-1 w-full rounded'/>
                  ) : (
                    meal.title
                  )}
                </td>
                <td className='p-2'>
                    {editingMealId === meal._id ?(
                        <input type="number"
                        value={editedMeal.price}
                        onChange={(e)=>
                            setEditedMeal({
                                ...editedMeal,
                                price: parseFloat(e.target.value),
                            })
                        } 
                        className='border px-2 py-1 w-20 rounded'/>
                    ):(
                        `$${meal.price}`
                    )}

                </td>

                <td className='p-2'>{meal.likes}</td>
                <td className='p-2'>{meal.reviews_count}</td>
                <td className='p-2'>{meal.rating || 0}</td>
                <td className='p-2 break-words max-w-[120px]'>{meal.distributorName}</td>
                <td className='p-2 space-x-1 flex flex-wrap gap-2'>
                    <button
                    className='btn btn-sm btn-info'
                    onClick={()=> navigate(`/meal/${meal._id}`)}>
                        View
                    </button>
                    {editingMealId === meal._id ? (
                        <button
                        className='btn btn-sm btn-success'
                        onClick={()=>handleSave(meal._id)}>
                            Save
                        </button>
                    ):(
                        <button className='btn btn-sm btn-warning'
                        onClick={()=> handleEdit(meal)}>
                           Edit
                        </button>
                    )}

                    <button className='btn btn-sm btn-error'
                    onClick={()=> handleDelete(meal._id)}>
                        Delete
                    </button>

                </td>
              </tr>
            ))}
            {allMeals.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No meals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
            
        </div>
    );
};

export default AllMeals;