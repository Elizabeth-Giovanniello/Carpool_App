import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { Modal } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';

const EditModal = ({ form, submitBtn, title }) => {

    const [user, token] = useAuth()
    
    const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    async function editItem(itemID, formData, pathFunc) { //TODO: this might need a refactor due to how the form hooks work... also currently there's no submit button.
		let response = await axios.put(pathFunc(itemID), formData, {
			headers: {
				Authorization: 'Bearer' + token
			}
		})
			.then(response => {
				console.log(response);
				props.afterEditFunc(); //action to be done after successful edit
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
                Edit {props.type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.form}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        </>
     );
}
 
export default EditModal;