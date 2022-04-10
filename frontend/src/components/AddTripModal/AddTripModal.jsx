import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from '@mui/material';
import React, { useContext, useState } from "react";
import TripForm from '../TripForm/TripForm';
import TripContext from '../../context/TripContext';

const AddTripModal = (props) => {

    const { showAddTripModal, setShowAddTripModal } = useContext(TripContext);

    const handleClose = () => setShowAddTripModal(false);

    return ( 
        <>
        <Dialog open={showAddTripModal}>
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