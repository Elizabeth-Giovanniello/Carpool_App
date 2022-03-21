import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { ListItemIcon, ListItemText } from '@mui/material';

const DeleteModal = (props) => {

    const [user, token] = useAuth()
    
    const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


    async function deleteItem(itemID, pathFunc) {
		let response = await axios.delete(pathFunc(itemID), {
			headers: {
				Authorization: 'Bearer' + token
			}
		})
			.then(response => {
				console.log(response);
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
        <Modal size='xs' centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {props.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Delete your {props.type} permanently? This action cannot be undone.</Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        deleteItem(props.id, props.pathFunc);
                    }}>
                    Delete
                </Button>
                <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
		</Modal>
        </>
     );
}
 
export default DeleteModal;