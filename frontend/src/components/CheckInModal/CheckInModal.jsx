import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import TripContext from '../../context/TripContext';
import CheckInForm from '../CheckInForm/CheckInForm';

const CheckInModal = (props) => {

    const [open, setOpen] = useState(false);
    const { selectedTrip } = useContext(TripContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //TODO: fix styling for this modal
    return ( 
        <div>
            <p>Arrived at the meeting point? Let others know you're here!</p>
            <Button variant="contained" onClick={handleOpen}>
                Check in
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Check in</DialogTitle>
                <DialogContent>
                <CheckInForm trip={selectedTrip.id}/>
                <DialogContentText>
                  <Typography>
                    If location services are enabled, we will add a pin on the map showing others where you are.
                  </Typography>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" form="check-in" onClick={handleClose}>Check in</Button>
                </DialogActions>
            </Dialog>
    </div>
     );
}
 
export default CheckInModal;