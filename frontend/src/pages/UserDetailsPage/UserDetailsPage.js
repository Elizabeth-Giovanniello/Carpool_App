import { Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import Reviews from '../../components/Reviews/Reviews';
import UserRatings from '../../components/UserRatings/UserRatings';
import PersonContext from '../../context/PersonContext';
import useAuth from '../../hooks/useAuth';

const UserDetailsPage = () => {
    
    const { reviews, selectedPerson } = useContext(PersonContext);
    const [user, token] = useAuth()

    return ( 
        <>
        <Container maxWidth="md" sx={{mt: 6, mb: 5}}>
            <Grid container>
                <Grid item xs={6}>
                    <ProfileInfo/>
                </Grid>
                <Grid container item xs={6} justifyContent="center">
                    <UserRatings/>
                </Grid>

            </Grid>

        </Container>
            {console.log(reviews)}
            {console.log(user)}
            {console.log(selectedPerson)}
            <Reviews/>
        </>
     );
}
 
export default UserDetailsPage;