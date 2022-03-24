import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from "react";
import LogInForm from '../LogInForm/LogInForm';

const LogInModal = ({ formID, openBtnVariant, type, form, show, setShow }) => {


    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    //TODO: figure out how to make it so login modal only closes upon a successful submission, and stays open for validation otherwise

    return ( 
        <>
            <Button variant={openBtnVariant} onClick={handleOpen}>{type}</Button>

            <Dialog open={show}>
                <DialogTitle>{type}</DialogTitle>
                <DialogContent>
                    {form}
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" form={formID}>{type}</Button>
                </DialogActions>
            </Dialog>

        </>
     );
}
 
export default LogInModal;