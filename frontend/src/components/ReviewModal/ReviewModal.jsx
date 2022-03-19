
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReviewForm from '../ReviewForm/ReviewForm';

const ReviewModal = (props) => {

    const [show, setShow] = useState(false);

    return ( 
        <>
        <Modal size="lg" centered show={show} onHide={() => setShow(false)}>
            <Modal.Header>
                <Modal.Title>
                How was your ride with Tony? Leave a review:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReviewForm/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)}>Maybe later</Button>
            </Modal.Footer>
        </Modal>

        <Button onClick={() => setShow(true)}>Review ride</Button>
        </>
     );
}
 
export default ReviewModal;