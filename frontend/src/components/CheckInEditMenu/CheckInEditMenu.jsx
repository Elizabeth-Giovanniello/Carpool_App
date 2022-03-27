import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useContext, useState } from 'react';
import DeleteModal from '../common/DeleteModal/DeleteModal';
import { editCheckInPath } from '../../constants/apiPaths';
import TripContext from '../../context/TripContext';
import EditModal from '../common/EditModal/EditModal';
import EditCheckInForm from '../EditCheckInForm/EditCheckInForm';
import DeleteIcon from '@mui/icons-material/Delete';

const CheckInEditMenu = (props) => {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { getCheckIns, selectedTrip } = useContext(TripContext);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    };
    const handleClose = () => {
      setAnchorEl(null);
      setOpen(false);
    };

    const afterCheckInChange = () => getCheckIns(selectedTrip.id);

    function getDeleteIcon(){
        return  <MenuItem><ListItemIcon><DeleteIcon  fontSize="small" /></ListItemIcon><ListItemText>Delete</ListItemText></MenuItem>;
    }


    return ( 
        <>
        <IconButton
        aria-label="options"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <DeleteModal id={props.checkIn.id} pathFunc={editCheckInPath} type="Check-In" afterDeleteFunc={afterCheckInChange} deleteIcon={getDeleteIcon()}/>
        <EditModal form={<EditCheckInForm checkIn={props.checkIn}/>} formID={"edit-check-in"} type={"Check-In"}/>
      </Menu>
    </Paper>
        </>
     );
}
 
export default CheckInEditMenu;