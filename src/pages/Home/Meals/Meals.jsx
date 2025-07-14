import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';




const fetchMeals = async ({pageParam = 1, queryKey})=>{
  const [_key, {search, category, minPrice, maxPrice}] = queryKey;

  const params= {
    page:pageParam,
    limit:6,
  };

  if(search) params.search = search;
  if(category && category !== 'All') params.category = category;
  if(minPrice !== '')params.minPrice = minPrice;
  if(maxPrice !== '')params.maxPrice = maxPrice;

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/meals`, {params});
  return res.data;
};



const Meals = () => {
  const [search,setSearch]=useState('');
  const [category,setCategory]=useState('All');
  const [minPrice, setMinPrice]=useState('');
  const [maxPrice, setMaxPrice]=useState('');

  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isError,
    error,
  }= useInfiniteQuery({
    queryKey: ['meals', {search, category, minPrice, maxPrice}],
    queryFn: fetchMeals,
    getNextPageParam: (lastPage, allPages)=>{
      const totalLoaded = allPages.flatMap(page=>page.meals || []).length;
      return totalLoaded < lastPage.total? allPages.length + 1 :undefined;
    },
    keepPreviousData: true,
  });

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      queryClient.removeQueries({
        queryKey: ['meals']});
      refetch();
    },600);
    return ()=> clearTimeout(timeout);
  },[search, category,minPrice, maxPrice,queryClient,refetch]);

  const meals = data?.pages.flatMap(page=>page.meals || []) || [];

  return (
    <div className='p-5 max-w-6xl mx-auto min-h-screen '>
      <h2 className='text-2xl font-bold text-center text-gray-600 mb-7 '>Explore Meals</h2>

      <div className='flex flex-wrap gap-3 mb-5 justify-center'>

        <input type="text" 
        placeholder='Search meals'
        value={search}
        onChange={e=> setSearch(e.target.value)} 
        className='input input-bordered w-60'/>

        <select 
        value={category}
        onChange={e=> setCategory(e.target.value)}
        className='select select-bordered w-40'>
          <option >All</option>
          <option >Breakfast</option>
          <option >Lunch</option>
          <option >Dinner</option>
        </select>

        <input type="number" 
        placeholder='Min Price'
        value={minPrice}
        onChange={e=> setMinPrice(e.target.value)} 
        className='input input-bordered w-28'/>

        <input type="number" 
        placeholder='Max Price'
        value={maxPrice}
        onChange={e=> setMaxPrice(e.target.value)} 
        className='input input-bordered w-28'/>

      </div>

      {isLoading ? (
        <p className='text-center'>Loading meals....</p>
      ) : isError ? (
        <p className='text-center text-red-500'>Error: {error.message}</p>
      ):(
        <> 
        <InfiniteScroll
        dataLength={meals.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className='text-center text-gray-500 my-5'>Loading more meals...</p>}
        endMessage={<p className='text-center text-gray-500 mt-5'>No more meals</p>}>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
          {meals.map(meal=>(
            <div key={meal._id} className='bg-gray-100 rounded shadow-sm p-5 pb-5'>
              <img src={meal.image} alt={meal.title}
              className='w-full h-40 object-cover rounded' />

              <h3 className='text-xl font-semibold
              mt-3'>{meal.title}</h3>
              <p className='text-sm text-gray-600'><strong>Category:</strong> {meal.category}</p>
              <p className='text-sm '><strong>Price:</strong> ৳{meal.price}</p>
              <p className='text-sm '><strong>Likes:</strong> {meal.likes}</p>
              <p className='text-sm '><strong>Reviews:</strong> {meal.reviews_count || 0}</p>

            </div>
          ))}

        </div>
        </InfiniteScroll>
        {isFetchingNextPage && <p className='text-center my-5'>Loading more...</p>}
        </>
      )}
      
    </div>
  );
};

export default Meals;