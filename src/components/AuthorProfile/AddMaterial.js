import React from 'react';


export default function AddMaterial() {

    function handleSubmit() {

    }

    return (
        <>
            <div>
                <h3>Dodaj utwór</h3>
                <p>Prześlij swoje materiały, wprowadź tytuł oraz opis, wstaw miniaturę , wyceń i kliknij DODAJ </p>
            </div>
            <div>
                <div>
                    <button>WRÓĆ</button>
                    <button onSubmit={handleSubmit}>DODAJ</button>
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
        </>

    )
}