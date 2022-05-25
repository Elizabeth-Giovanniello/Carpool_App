import { Avatar, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import PersonContext from '../../context/PersonContext';
import { getDate } from '../../helpers/helpers';


const ProfileInfo = (props) => {

    const { loadPerson, selectedPerson, profileDetails } = useContext(PersonContext);

    return ( 
        <>
            <Grid item xs={12}>
                <Avatar sx={{ bgcolor: profileDetails.avatar_color, width: 250, height: 250 }}>
                    <Typography variant="h1">{profileDetails.first_name[0].toUpperCase()}</Typography>
                </Avatar>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">{profileDetails.first_name}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{color: 'gray'}}>Member since {getDate(profileDetails.date_joined)}</Typography>
            </Grid>
        </>
   
    );
}
 
export default ProfileInfo;