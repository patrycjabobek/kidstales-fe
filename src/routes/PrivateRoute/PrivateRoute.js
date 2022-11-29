import React from 'react'
import { Navigate} from 'react-router-dom'

export default function PrivateRoute(props, {children}) {
    const currentUser = props.currentUser;
    const identity = props.identity;

    // useEffect(() => {
    //     const getUserData = async () => {
    //
    //         const usersRef = doc(db, "users", currentUser.uid);
    //         const docSnap = await getDoc(usersRef);
    //
    //         const data = docSnap.exists() ? docSnap.data() : null
    //
    //         setIdentity(data.identity);
    //     }
    //     getUserData();
    // }, [currentUser])
    //
    // console.log(currentUser)

    return currentUser && identity ? (children)
 : <Navigate to="/not-found"/>


}
