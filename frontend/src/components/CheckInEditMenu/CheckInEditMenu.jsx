import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useContext, useState } from 'react';
import DeleteModal from '../common/DeleteModal/DeleteModal';
import { editCheckInPath } from '../../constants/apiPaths';
import TripContext from '../../context/TripContext';

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

    const afterDeleteFunc = () => getCheckIns(selectedTrip.id);


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
        <DeleteModal id={props.checkIn.id} pathFunc={editCheckInPath} type="Check-In" afterDeleteFunc={afterDeleteFunc}/>
        {/* <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem> */}
      </Menu>
    </Paper>
        </>
     );
}
 
export default CheckInEditMenu;