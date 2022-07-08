import React, {useState} from 'react'

import  './author-material-item.styles.css';
import OvalButton from "../Buttons/OvalButton";

import eyeIcon from '../../assets/icons/visibility_FILL0_wght400_GRAD0_opsz48.svg';
import userIcon from '../../assets/icons/account_circle_FILL1_wght400_GRAD200_opsz48.svg';
import Popup from "reactjs-popup";
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "../../utils/firebase/firebase.utils";

export default function AuthorMaterialItem(props) {
    const {id, title, author, price, createdAt, description, category} = props.material;
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // at least one file has been dropped so do something
            // handleFiles(e.dataTransfer.files);
        }
    };

    const handleMaterialDeletion = async (e) => {
        e.preventDefault();

        try {
            await deleteDoc(doc(db, "materials", id));
            console.log('Usunięto', id);
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // at least one file has been selected so do something
            // handleFiles(e.target.files);
        }
    };

    return (
        <tr key={id} className="material-item">
            <td className="material-item-details">
                <div className="material-title"
                >{title}</div>
            </td>
            <td className="action-box">
                <Popup trigger={<button>Edytuj</button>} className="editBtn" >
                        <div className="editBtn-header">
                            <button>X</button>
                            <h3>Edytuj utwór</h3>
                            <button>Zapisz</button>
                        </div>
                        <div className="line">
                            line
                        </div>
                        <div className="editBtn-editor">
                            <form action=""
                                  onDragEnter={handleDrag}
                                  className="form-editor">
                                <div className="r1">
                                    <div className="form-group">
                                        <label htmlFor="title">Tytuł</label>
                                        <input type="text"
                                               id="title"
                                               name="title"
                                               defaultValue={title}
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Opis</label>
                                        <textarea rows={17}
                                               id="description"
                                               name="description"
                                               className="description-area"
                                               defaultValue={description}
                                                  required/>
                                    </div>
                                </div>
                                <div className="r2">
                                    <div className="form-group">
                                        <label htmlFor="title">Cena</label>
                                        <input type="number"
                                               min="0.00"
                                               max="10000.00"
                                               step="0.01"
                                               id="title"
                                               defaultValue={price}
                                               name="title" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Kategoria</label>
                                        <select id="category" defaultValue={category}>
                                            <option value="stories">Opowiadania</option>
                                            <option value="cartoons">Bajki</option>
                                            <option value="songs">Piosenki</option>
                                            <option value="other" selected>Inne</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="r3" id="form-file-upload">
                                    <input type="file" id="input-file-upload"  onChange={handleChange}/>
                                    <label id="label-file-upload" htmlFor="input-file-upload">
                                        <div>
                                            <p>Drag and drop your file here or</p>
                                            <button className="upload-button">Upload a file</button>
                                        </div>
                                    </label>
                                </div>
                                { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                            </form>
                        </div>
                </Popup>
                <Popup trigger={<button>Usuń</button>} >
                    <div>
                        <h3>Usuń utwór</h3>
                        <div>
                            <p>Ta akcja spowoduje jego trwałe usunięcie </p>
                            <button>Anuluj</button>
                            <button onClick={handleMaterialDeletion}>Usuń</button>
                        </div>
                    </div>
                </Popup>
            </td>
        </tr>
    )
}

