import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LogInModal from "../LogInModal/LogInModal";
import LogInForm from '../LogInForm/LogInForm';
// import "./NavBar.css";
import UserMenu from "../UserMenu/UserMenu";
import { AppBar, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';
import AddTripModal from "../AddTripModal/AddTripModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import RegisterForm from "../RegisterForm/RegisterForm";

const Navbar = () => {

  const { logoutUser, user, showLogin, setShowLogin } = useContext(AuthContext);
  const navigate = useNavigate();




  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <AddTripModal/>
        <RegisterModal openBtnVariant="text" type="Register" formID="register-form" form={<RegisterForm/>}/>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            onClick={()=>navigate('/')}
          >
            RideAlong
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Ride history</Typography>
              </MenuItem>

            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            onClick={() => navigate('/')}
          >
            POOLparty
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            {/* <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Ride history
            </Button> */}

          </Box>
          {user ? (
            <UserMenu/>
          ) : (
            <LogInModal formID="login-form" type="Log in" openBtnVariant="outlined" form={<LogInForm/>} show={showLogin} setShow={setShowLogin}/>
          )}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{user.firstName[0].toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={anchorElUser}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>

            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
