import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from "react";
import TripForm from '../TripForm/TripForm';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const AddTripModal = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);


    return ( 
        <>
            <Fab size="medium" color="secondary" aria-label="add" onClick={handleOpen}>
                <AddIcon />
            </Fab>

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