import { Avatar, Grid } from '@mui/material';
import React, { useContext } from 'react';


const ProfileInfo = (props) => {

    const { loadPerson, selectedPerson, profileDetails } = useContext(PersonContext);

    return ( 
        <Grid container>
            <Grid item>
                <Avatar>{selectedPerson.first_name[0].toUpperCase()}</Avatar>
            </Grid>
        </Grid>
    );
}
 
export default ProfileInfo;