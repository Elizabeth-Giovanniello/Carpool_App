import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useState } from "react";
import AuthContext from '../../context/AuthContext';
import LogInForm from '../LogInForm/LogInForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import RegisterModal from '../RegisterModal/RegisterModal';

const LogInModal = ({ formID, openBtnVariant, type, form }) => {

    const { showLogin, setShowLogin, showRegistration, setShowRegistration } = useContext(AuthContext);

    const handleClose = () => setShowLogin(false);
    const handleOpen = () => {
        setShowLogin(true);
        setShowRegistration(false);
    }

    const handleOpenRegisterModal = () => {
        setShowRegistration(true);
        setShowLogin(false);
    }

    //TODO: figure out how to make it so login modal only closes upon a successful submission, and stays open for validation otherwise

    return ( 
        <>
            <Button variant={openBtnVariant} onClick={handleOpen}>Log in</Button>

            <Dialog open={showLogin}>
                <DialogTitle>{type} <Button variant="text" onClick={handleOpenRegisterModal}>register</Button></DialogTitle>
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