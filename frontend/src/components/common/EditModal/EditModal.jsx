import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemIcon, ListItemText, MenuItem  } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const EditModal = ({ form, formID, title, type, afterEditFunc, pathFunc, itemID }) => {

    const [user, token] = useAuth()
    
    const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    async function editItem(itemID, formData, pathFunc) { //TODO: this might need a refactor due to how the form hooks work... also currently there's no submit button.
		let response = await axios.put(pathFunc(itemID), formData, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error.response);
			});
	}

    return ( 
        <>
        <MenuItem onClick={handleShow}>
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>

        <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Edit {type}</DialogTitle>
            <DialogContent>
                {form}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" form={formID} onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
     );
}
 
export default EditModal;