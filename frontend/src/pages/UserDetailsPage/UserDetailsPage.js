import { Container } from '@mui/material';
import React, { useContext } from 'react';
import Reviews from '../../components/Reviews/Reviews';
import UserRatings from '../../components/UserRatings/UserRatings';
import PersonContext from '../../context/PersonContext';
import useAuth from '../../hooks/useAuth';

const UserDetailsPage = () => {
    
    const { reviews, selectedPerson } = useContext(PersonContext);
    const [user, token] = useAuth()

    return ( 
        <>
        <Container maxWidth="md">
            <UserRatings/>

        </Container>
            {console.log(reviews)}
            {console.log(user)}
            {console.log(selectedPerson)}
            <Reviews/>
        </>
     );
}
 
export default UserDetailsPage;