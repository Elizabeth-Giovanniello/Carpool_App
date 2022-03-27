import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';
import BookTripForm from '../BookTripForm/BookTripForm';

const BookTripModal = (props) => {

    const { user, setShowLogin } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleOpen = () => {
        user ? setShow(true) : setShowLogin(true)
    }

    return ( 
        <>
        <Modal size="lg" centered show={show} onHide={() => setShow(false)}>
            <Modal.Header>
                <Modal.Title>
                Reserve Ride
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BookTripForm trip={props.trip} seats={props.seats}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)}>Cancel</Button>
                <Button onClick={() => setShow(false)} type="submit" variant="contained" size="medium" form="reserve-trip">Reserve</Button>
            </Modal.Footer>
        </Modal>

        <Button variant="contained" size="medium" color="secondary" onClick={handleOpen}>Book</Button>
        </>
     );
}
 
export default BookTripModal;