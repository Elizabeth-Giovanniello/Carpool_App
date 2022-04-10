import { Tooltip, Typography } from '@mui/material';
import React, { useContext } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../../context/AuthContext';
import { Box } from '@mui/system';
import TripContext from '../../context/TripContext';

const AddTripModalBtn = (props) => {

    const { user, setShowLogin } = useContext(AuthContext);
    const { setShowAddTripModal } = useContext(TripContext);

    const handleOpen = () => {
        user ? setShowAddTripModal(true) : setShowLogin(true)
    }

    return ( 
        <Box
        sx={{
           display: 'flex',
           justifyContent: 'center',
           lineHeight: 'normal',
           mb: 3,
           mt: 1,
           // p: 1,
           // m: 1,
           // bgcolor: 'info',
           // borderRadius: 1,
           // flexWrap: 'wrap'
           }}>
       <Typography align="center" variant='h6' sx={{p:1}}>Or List Your Own</Typography>
       <Tooltip title='List a ride'>
           <Fab size="medium" color="secondary" aria-label="add" onClick={handleOpen}>
               <AddIcon />
           </Fab>
       </Tooltip>
   </Box>
     );
}
 
export default AddTripModalBtn;