import { Dialog, DialogActions, DialogContent, DialogTitle, FilledInput, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';



const LogInForm = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const { loginUser, isServerError } = useContext(AuthContext);
    const defaultValues = { username: "", password: "" };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        defaultValues,
        loginUser
        );
  
    useEffect(() => {
      if (isServerError) {
        reset();
      }
    }, [isServerError]);
 
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

    return ( 
    <>
        <form id="login-form" onSubmit={handleSubmit}>

            <TextField 
                variant="filled"
                name="username"
                label="Username"
                fullWidth
                value={formData.username}
                onChange={handleInputChange}
            />
            {/* <TextField 
                variant="filled" 
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
            /> */}

            <FilledInput
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                label="Password"
                fullWidth
                onChange={handleInputChange}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=> setShowPassword(!showPassword)}
                        // onMouseDown={handleMouseDownPassword} //TODO: decide whether to keep this or not
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link to="/register">Click to register!</Link>
    </form>
</>
     );
}
 
export default LogInForm;