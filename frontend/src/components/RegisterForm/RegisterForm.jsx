import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FilledInput, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import MuiPhoneNumber from 'material-ui-phone-number';

const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { registerUser } = useContext(AuthContext);

    const defaultValues = {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    };

    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        defaultValues,
        registerUser
    );

    //TODO: figure out logic of confirm password and then un-comment it out

    return (
        <form id="register-form" onSubmit={handleSubmit}>
            <TextField 
                    variant="filled"
                    name="firstName"
                    label="First name"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
            <TextField 
                    variant="filled"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            <TextField 
                    variant="filled"
                    name="username"
                    label="Username"
                    fullWidth
                    value={formData.username}
                    onChange={handleInputChange}
                />
            <FilledInput
                    type="email" 
                    name="email"
                    label="Email"
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                />

            <MuiPhoneNumber 
                variant="filled"
                defaultCountry="us" 
                value={formData.phoneNumber} 
                onChange={(number) => handleInputChange( { target: { name: 'phoneNumber', value: number } } )}
                fullWidth
                name="phoneNumber"
                label="Phone number"
            />
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
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            />
            {/* <FilledInput
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.password}
                label="Password"
                fullWidth
                onChange={handleInputChange}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
            /> */}
            <p style={{ fontSize: "12px" }}>
            NOTE: Make this an uncommon password with characters, numbers, and
            special characters!
            </p>
        </form>
    );
};

export default RegisterForm;
