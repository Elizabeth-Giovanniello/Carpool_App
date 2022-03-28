import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useState } from "react";
import AuthContext from '../../context/AuthContext';
import LogInForm from '../LogInForm/LogInForm';
import LogInModal from '../LogInModal/LogInModal';

const RegisterModal = ({ formID, openBtnVariant, type, form }) => {

    const { showRegistration, setShowRegistration, showLogin, setShowLogin } = useContext(AuthContext);


    const handleClose = () => setShowRegistration(false);
    

    //TODO: figure out how to make it so login modal only closes upon a successful submission, and stays open for validation otherwise

    return ( 
        <>

            <Dialog open={showRegistration}>
                <DialogTitle>{type}<LogInModal formID="login-form" type="Log in" openBtnVariant="text" form={<LogInForm/>}/></DialogTitle>
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
 
export default RegisterModal;