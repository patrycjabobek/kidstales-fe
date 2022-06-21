import React from 'react';
import Popup from "reactjs-popup";


export default function Statistics() {

    return (
        <>
            <h3>TWOJE STATYSTYKI</h3>
            <div>
                <div>
                    <div>
                        <img src="" alt="user icon"/>
                        Użytkownicy
                        <h3>liczba</h3>
                    </div>
                    <div>
                        <img src="" alt="eye icon"/>
                        Wyświetlenia
                        <h3>liczba</h3>
                    </div>
                    <div>
                        <img src="" alt="buy icon"/>
                        Zakupione
                        <h3>liczba</h3>
                    </div>
                </div>
                <div>
                    <label htmlFor="views">Wyświetlenia</label>
                    <select id="views">
                        <option value="stories">Opowiadania</option>
                        <option value="cartoons">Bajki</option>
                        <option value="songs">Piosenki</option>
                        <option value="other" selected>Inne</option>
                    </select>
                </div>
                <div>
                    <div>
                        <h3>Rozliczenia</h3>
                        <button>Eksportuj</button>
                        <Popup trigger={<button>Rozlicz</button>} position="right center">
                            <div>
                                <div>
                                    <button>X</button>
                                    <h3>Rozliczenia</h3>
                                </div>
                                <div>
                                    <label htmlFor="settlement">Rozlicz mnie</label>
                                    <select id="settlement">
                                        <option value="month">z ostatniego Miesiąca</option>
                                        <option value="week">z ostatniego Tygodnia</option>
                                        <option value="all">od poczatku</option>
                                    </select>
                                    <h2>Total settlement</h2>
                                    <button>Rozlicz</button>
                                </div>

                            </div>
                        </Popup>

                    </div>
                    tabela z rozliczeniami
                </div>
            </div>
        </>
    )
}