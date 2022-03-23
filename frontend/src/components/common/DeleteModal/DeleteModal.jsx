import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

const DeleteModal = (props) => {

    const [user, token] = useAuth()
    
    const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleShow = () => {
        setShow(true);
        //TODO: fix issue where delete menu doesn't close when modal opens
    }

    const handleDeleteClick = () => {
        deleteItem(props.id, props.pathFunc);
        setShow(false);
    }


    async function deleteItem(itemID, pathFunc) {
		let response = await axios.delete(pathFunc(itemID), {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => {
				console.log(response);
                console.log(itemID)
				props.afterDeleteFunc(); //pass in the function for the action you want after the item has been deleted
			})
			.catch(error => {
				console.log(error.response);
			});
	}

    return ( 
        <>
        <MenuItem onClick={handleShow}>
            <ListItemIcon>
                <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
        </MenuItem>

        <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                    <DialogContentText>Delete your {props.type} permanently? This action cannot be undone.</DialogContentText>
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
 
export default DeleteModal;