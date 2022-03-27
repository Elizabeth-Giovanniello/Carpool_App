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
import DeleteTripModal from '../DeleteTripModal/DeleteTripModal';
import { useNavigate } from 'react-router-dom';

const TripEditMenu = ({setIsInEditMode}) => {

    const { getSingleTrip, selectedTrip } = useContext(TripContext);
    const navigate = useNavigate()

    function getDeleteIcon(){
        return ;
    }

    const afterDeleteFunc = () => navigate('/');

    


    return ( 
        <>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
            >

            <SpeedDialAction
                key="edit"
                icon={<EditIcon />}
                tooltipTitle="Edit"
                onClick={()=>setIsInEditMode(true)}
            />
            <SpeedDialAction 
            key="delete" 
            icon={<DeleteModal 
                id={selectedTrip.id} 
                pathFunc={editRidePath} 
                type="Ride" 
                afterDeleteFunc={afterDeleteFunc} 
                deleteIcon={<DeleteIcon/>}/>} 
            tooltipTitle="Delete"/>
            {/* <DeleteTripModal id={selectedTrip.id} /> */}
            
                
            </SpeedDial>
        </Box>
        </>
     );
}
 
export default TripEditMenu;