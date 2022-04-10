import React, { useContext } from 'react';
import PersonContext from '../../context/PersonContext';
import SingleReview from '../SingleReview/SingleReview';

const Reviews = (props) => {

    const { reviews, selectedPerson } = useContext(PersonContext);

    if(reviews){
        return ( 
            reviews.map((review) => <SingleReview review={review}/>)
         );
        }
        else{return null}    
}
 
export default Reviews;