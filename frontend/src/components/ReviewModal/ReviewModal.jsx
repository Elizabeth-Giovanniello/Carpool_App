
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReviewForm from '../ReviewForm/ReviewForm';

const ReviewModal = ({ props, trip }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleOpen = () => setShow(true);
    

    return ( 
        <>
        {/* <Modal size="lg" centered show={show} onHide={() => setShow(false)}>
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

        <Button onClick={() => setShow(true)}>Review ride</Button> */}

        <div>
      <Button variant="contained" onClick={handleOpen}>
        Review
      </Button>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>How was your ride with {trip.driver.first_name}? Leave a review:</DialogTitle>
        <DialogContent>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <ReviewForm trip={trip}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} form="review-form" type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
        </>
     );
}
 
export default ReviewModal;