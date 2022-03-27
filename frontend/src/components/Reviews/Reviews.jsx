import React, { useContext } from 'react';
import PersonContext from '../../context/PersonContext';
import SingleReview from '../SingleReview/SingleReview';

const Reviews = (props) => {

    const { reviews, selectedPerson } = useContext(PersonContext);

    return ( 
        reviews.map((review) => <SingleReview review={review}/>)
     );
}
 
export default Reviews;