import React, { useContext } from 'react';
import PersonContext from '../../context/PersonContext';
import useAuth from '../../hooks/useAuth';

const UserDetailsPage = () => {
    
    const { reviews, selectedPerson } = useContext(PersonContext);
    const [user, token] = useAuth()

    return ( 
        <>
        {console.log(selectedPerson)}
        {console.log(reviews)}
        {console.log(user)}
        </>
     );
}
 
export default UserDetailsPage;