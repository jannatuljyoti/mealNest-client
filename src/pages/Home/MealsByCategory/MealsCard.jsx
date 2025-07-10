import React from 'react';
import { Link } from 'react-router';

const MealsCard = ({meal}) => {
    const {_id, title, image, rating, price}= meal;

    return (
        <div className='card w-80 bg-base-100 shadow-md '>
            <figure>
                <img src={image} alt={title} className='h-48 w-full object-cover'/>
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{title}</h2>
                <p><span>Rating:</span> {rating || 0}</p>
                <p><span>Price:</span> {price}</p>

                <div className='card-actions justify-end'>
                    <Link to={`/meal/${_id}`} className='btn btn-sm bg-[#ec644b]'>Details</Link>

                </div>

            </div>
            
        </div>
    );
};

export default MealsCard;