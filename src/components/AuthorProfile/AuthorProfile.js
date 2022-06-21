import
    React from "react";
import Popup from "reactjs-popup";
import './author-profile.module.css';
import 'reactjs-popup/dist/index.css';



export default function AuthorProfile() {

    function handleIssueReport() {

    }

    function cancel() {

    }

    return (
        <>
            <div className="profile-info-container">
                <div>
                    <button>SAVE</button>
                    <Popup trigger={<button>Edytuj profil</button>} position="right center">
                        <div>
                            <form action="">
                                <div>
                                    <button>X</button>
                                    <h3>Edytuj profil</h3>
                                    <button>Zapisz</button>
                                </div>
                                <div>
                                    <input type="file"/>
                                    <input type="file"/>
                                    <input type="text" id="name"/>
                                </div>
                                <div>
                                    <input type="description"/>
                                </div>
                            </form>

                        </div>
                    </Popup>
                    <img src="" alt="profile image"/>
                </div>
                <div>
                    <h3>User name</h3>
                </div>
                <div>
                    <div>
                        <h4>O MNIE</h4>
                        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci asperiores assumenda
                            maxime nemo pariatur quae quis, quos recusandae sequi suscipit tempore totam ut. Aliquid
                            atque delectus ea eligendi, esse et ipsa nulla, numquam odio perferendis provident quas sed
                            suscipit!
                        </div>
                    </div>
                    <div>
                        OPINIE
                    </div>
                </div>
            </div>
            <div className="materials-container">
                <h3>TWOJE MATERIAŁY</h3>
                <Popup trigger={<button>Edytuj</button>} position="right center">
                    <div>
                        <div>
                            <button>X</button>
                            <h3>Edytuj utwór</h3>
                            <button>Zapisz</button>
                        </div>
                        <div>
                            line
                        </div>
                        <div>
                            <form action="">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="title">Tytuł</label>
                                        <input type="text"
                                               id="title"
                                               name="title" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Opis</label>
                                        <input type="text"
                                               id="description"
                                               name="description" required/>
                                    </div>
                                </div>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="title">Cena</label>
                                        <input type="number"
                                               min="0.00"
                                               max="10000.00"
                                               step="0.01"
                                               id="title"
                                               name="title" required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Kategoria</label>
                                        <select id="category">
                                            <option value="stories">Opowiadania</option>
                                            <option value="cartoons">Bajki</option>
                                            <option value="songs">Piosenki</option>
                                            <option value="other" selected>Inne</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <input type="file"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </Popup>
                <Popup trigger={<button>Usuń</button>} position="right center">
                    <div>
                        <button>X</button>
                        <h3>Usuń utwór</h3>
                        <div>
                            <p>Ta akcja spowoduje jego trwałe usunięcie </p>
                            <button>Anuluj</button>
                            <button>Usuń</button>
                        </div>
                    </div>
                </Popup>
            </div>
            <div className="reviews-container">
                <h3>OPINIE</h3>
            </div>
            <div>
                <Popup trigger={<button>Zgłoś</button>} position="right center">
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
        </>
    )
}