import
    React, {useContext, useEffect, useState, Fragment} from "react";
import Popup from "reactjs-popup";
import './author-profile.styles.css';
import 'reactjs-popup/dist/index.css';
import {UserContext} from "../../contexts/UserContext";
import {db} from "../../utils/firebase/firebase.utils";
import {collection, doc, getDoc, getDocs, query, updateDoc, where} from 'firebase/firestore';
import ListingItem from "../Listing/ListingItem";
import AuthorMaterialsList from "./AuthorMaterialsList";
import camera from '../../assets/icons/photo_camera_FILL0_wght400_GRAD0_opsz48.svg';
import userIcon from "../../assets/icons/account_circle_FILL1_wght400_GRAD200_opsz48.svg";



const defaultFormFields = {
    imgUrl: '',
    bgUrl: '',
    userDescription: '',
}



export default function AuthorProfile() {
    const {currentUser} = useContext(UserContext);
    const [userData, setUserData] = useState({});
    const [changeDetails, setChangeDetails] = useState(false);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { imgUrl, bgUrl, userDescription} = formFields;


    useEffect(() => {
        const getUserData = async () => {

            try {
                const usersRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(usersRef);

                const data = docSnap.exists() ? docSnap.data() : null

                setUserData( data);
                console.log("DANE",data)
            } catch (e) {
                console.log(e)
            }
        }
        getUserData();
    }, [currentUser])
    function handleIssueReport() {

    }

    function cancel() {

    }

    async function onSubmit(e)  {
        e.preventDefault();


        try {

            const userRef = doc(db, "users", currentUser.uid);

            await updateDoc(userRef, {
                imgUrl: imgUrl,
                backgroundImg: bgUrl,
                userDescription: userDescription
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = (ev) => {
        const { name,value } = ev.target;
        setFormFields({...formFields, [name]: value});
    }


    return (
        <div className="main">
                <div className="profile-info-container">
                    <div className="gray-container">
                        <button className="saveBtn">
                            <span className="bookmark material-symbols-outlined"></span>
                        </button>
                        <div className="img-box">
                            {imgUrl === null ? <img src={imgUrl}/> :
                                <img src={userIcon}  className="img"/>}
                            {/*<img src="" alt="profile image" className="img"/>*/}
                        </div>
                        <Popup trigger={<button className="editBtn">{changeDetails ? 'Zapisz' : 'Edytuj profil'}</button>} className="profileEdit">
                            <div>
                                    <div className="profileEdit-header">
                                        <button>X</button>
                                        <h3>Edytuj profil</h3>
                                        <button onClick={() => {
                                            changeDetails && onSubmit()
                                            setChangeDetails((prevState) => !prevState)
                                        }}>Zapisz</button>
                                    </div>
                                <form action=""
                                    className="form-editor">
                                    <div className="image-area">
                                        <input id="bg-file-upload"
                                               type="file"
                                               className="backgroundImg"
                                                onChange={handleChange}
                                               value={bgUrl}
                                        />
                                        <label className="label-file-upload" htmlFor="bg-file-upload">
                                            <div className="hidden-content">
                                                <img src={camera} alt=""/>
                                                <button className="upload-button"></button>
                                            </div>
                                        </label>
                                        <div className="circle">
                                            <input type="file"
                                                   className="avatar"
                                                   id="avatar-file-upload"
                                                    onChange={handleChange}
                                                    value={imgUrl}/>
                                            <label className="label-avatar-file-upload" htmlFor="avatar-file-upload">
                                                <div className="hidden-content">
                                                    <img src={camera} alt=""/>
                                                    <button className="upload-button"></button>
                                                </div>
                                            </label>
                                        </div>
                                        <h3>{currentUser && currentUser.displayName}</h3>
                                    </div>
                                    <div >
                                        <textarea
                                            rows={15}
                                            cols={115}
                                            id="description"
                                            name="description"
                                            className="user-description"
                                            onChange={handleChange}
                                            value={userDescription}
                                            />
                                    </div>
                                </form>

                            </div>
                        </Popup>
                    </div>
                    <div className="user-name">
                        <h3>
                            { currentUser && currentUser.displayName}
                        </h3>
                    </div>
                    <div className="content">
                        <div className="about">
                            <h4>O MNIE</h4>
                            <p>

                            </p>
                        </div>
                        {/*<div className="opinions">*/}
                        {/*    OPINIE*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="materials-container">
                    <h3>TWOJE MATERIAŁY</h3>
                    <AuthorMaterialsList/>
                </div>
                {/*<div className="reviews-container">*/}
                {/*    <h3>OPINIE</h3>*/}
                {/*</div>*/}
                <div className="reportBtn">
                    <Popup trigger={<button>Zgłoś</button>} >
                        <div className="pop-up-container">
                            <h3>Zgloś użytkownika</h3>
                            <legend>Pomóż nam  zrozumieć problem.Co jest nie tak z profilem tego użytkownika?</legend>
                            <fieldset>
                                <div>
                                    <input type="checkbox" id="hatred" name="issue"
                                    />
                                    <label htmlFor="hatred">Propagowanie nienawiści</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="violence" name="issue"
                                    />
                                    <label htmlFor="violence">Przemoc</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="terms-violation" name="tissue"
                                    />
                                    <label htmlFor="terms-violation">Publikowanie materiałów niezgodnych z regulaminem</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="offensive" name="issue"
                                    />
                                    <label htmlFor="offensive">Jest obraźliwe</label>
                                </div>
                            </fieldset>
                            <div>
                                <input type="checkbox" id="offensive" name="blocking"
                                />
                                <label htmlFor="offensive">Zablokuj użytkownika</label>
                            </div>

                            <button onClick={cancel}>Anuluj</button>
                            <button onClick={handleIssueReport}>Zgłoś</button>
                        </div>
                    </Popup>
            </div>
        </div>

    )
}