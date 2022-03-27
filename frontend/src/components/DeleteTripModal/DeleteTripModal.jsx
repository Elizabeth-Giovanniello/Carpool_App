import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { editRidePath } from '../../constants/apiPaths';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TripContext from '../../context/TripContext';
import useAuth from '../../hooks/useAuth';


const DeleteTripModal = (props) => {

    const [user, token] = useAuth()
    const { getSingleTrip, selectedTrip } = useContext(TripContext);
    
    const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleShow = () => {
        setShow(true);
        //TODO: fix issue where delete menu doesn't close when modal opens
    }

    const handleDeleteClick = () => {
        deleteTrip(props.id, editRidePath);
        setShow(false);
    }

    const afterDeleteFunc = () => getSingleTrip(selectedTrip.id);

    async function deleteTrip(tripID, editRidePath) {
		let response = await axios.delete(editRidePath(tripID), {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => {
				console.log(response);
				afterDeleteFunc(); //pass in the function for the action you want after the item has been deleted
			})
			.catch(error => {
				console.log(error.response);
			});
	}

    return ( 
        <>
         <SpeedDialAction key="delete" icon={<DeleteIcon />} tooltipTitle="Delete" onClick={handleShow}/>
        <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                    <DialogContentText>Delete this trip permanently? This action cannot be undone.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleDeleteClick}>
                    Delete
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>

        </>
     );
}
 
export default DeleteTripModal;