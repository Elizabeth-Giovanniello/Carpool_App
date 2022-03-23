import React, { useContext, useState } from 'react';
import TripContext from '../../context/TripContext';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../common/DeleteModal/DeleteModal';
import { editRidePath } from '../../constants/apiPaths';

const TripEditMenu = (props) => {

    const { getSingleTrip, selectedTrip } = useContext(TripContext);

    function getDeleteIcon(){
        return <SpeedDialAction key="delete" icon={<DeleteIcon />} tooltipTitle="Delete"/>;
    }

    const afterDeleteFunc = () => getSingleTrip(selectedTrip.id);


    return ( 
        <>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            >

            <SpeedDialAction
                key="edit"
                icon={<EditIcon />}
                tooltipTitle="Edit"
            />
            <DeleteModal deleteIcon={getDeleteIcon()} pathFunc={editRidePath} id={selectedTrip.id} type={"Ride"} afterDeleteFunc={afterDeleteFunc}/>
                
            </SpeedDial>
        </Box>
        </>
     );
}
 
export default TripEditMenu;