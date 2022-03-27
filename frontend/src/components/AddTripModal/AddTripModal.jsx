import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from '@mui/material';
import React, { useContext, useState } from "react";
import TripForm from '../TripForm/TripForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../../context/AuthContext';
import { Box } from '@mui/system';

const AddTripModal = (props) => {

    const { user, setShowLogin } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => {
        user ? setShow(true) : setShowLogin(true)
    }


    return ( 
        <>
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

            <Dialog open={show}>
                <DialogTitle>List a ride</DialogTitle>
                <DialogContent>
                    <TripForm/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" form="add-trip">Create</Button>
                </DialogActions>
            </Dialog>

        </>
     );
}
 
export default AddTripModal;