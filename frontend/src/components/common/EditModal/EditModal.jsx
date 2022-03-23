import { Button, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const EditModal = ({ form, submitBtn, title, type, afterEditFunc, pathFunc, itemID }) => {

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
				afterEditFunc(); //action to be done after successful edit
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
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                Edit {type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {form}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        </>
     );
}
 
export default EditModal;