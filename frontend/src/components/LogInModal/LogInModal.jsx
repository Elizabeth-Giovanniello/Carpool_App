import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from "react";
import LogInForm from '../LogInForm/LogInForm';

const LogInModal = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return ( 
        <>
            <Button variant="outlined" onClick={handleOpen}>Log in</Button>

            <Dialog open={show}>
                <DialogTitle>Log In</DialogTitle>
                <DialogContent>
                    <LogInForm/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" form="login-form" onClick={handleClose}>Log in</Button>
                </DialogActions>
            </Dialog>

        </>
     );
}
 
export default LogInModal;