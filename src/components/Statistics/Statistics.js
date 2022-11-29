import React, {useEffect, useState} from 'react';
import Popup from "reactjs-popup";
import Paper from '@mui/material/Paper';
// import {
//     Chart,
//     LineSeries,
//     SplineSeries,
//     Legend,
//     Title,
// } from '@devexpress/dx-react-chart-material-ui';
import Button from '@mui/material/Button';

import styles from './statistics.module.scss';


const generateData = (start, end, step) => {
    const data = [];
    for (let i = start; i < end; i += step) {
        data.push({ splineValue: Math.sin(i) / i, lineValue: ((i / 15) ** 2.718) - 0.2, argument: i });
    }

    return data;
};

export default function Statistics() {
    const [data, setData] = useState([]);
    useEffect(()=> {
        setData(generateData(2.5, 12, 0.5));
    },[])


    return (
        <div className={styles.statisticsContainer}>
            <div className={styles.headerContainer}>
                <h3 className={styles.headerContainerTitle}>TWOJE STATYSTYKI</h3>
            </div>
            <div>
                <div className={styles.summary}>
                    <div  className={styles.modalBox}>
                        <img src="" alt="user icon"/>
                        <div>
                            <h3>Użytkownicy</h3>
                            <h1>liczba</h1>
                        </div>
                    </div>
                    <div  className={styles.modalBox}>
                        <img src="" alt="eye icon"/>
                        <div>
                            <h3>Użytkownicy</h3>
                            <h1>liczba</h1>
                        </div>
                    </div>
                    <div  className={styles.modalBox}>
                        <img src="" alt="buy icon"/>
                        <div>
                            <h3>Użytkownicy</h3>
                            <h1>liczba</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.chartContainer}>
                    <label htmlFor="views">Wyświetlenia</label>
                    <select id="views">
                        <option value="stories">Opowiadania</option>
                        <option value="cartoons">Bajki</option>
                        <option value="songs">Piosenki</option>
                        <option value="other">Inne</option>
                    </select>
                </div>
                <div className={styles.settlementContainer}>
                    <div className={styles.settlementHeader}>
                        <h3>Rozliczenia</h3>
                        <Button
                            variant="contained"
                            sx={{
                                backroundColor: 'rgba(12,44,128,0.4)',
                                color: '#fffff',
                            }}>
                            Eksportuj</Button>
                        <Popup trigger={<Button
                            variant="contained"
                            sx={{
                                backroundColor: 'rgb(12,44,128)',
                                color: '#fffff',
                            }}>
                            Rozlicz</Button>} position="right center">
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
                    <div className={styles.settlementTableContainer}>
                        <table className={styles.settlementTable}>
                            <thead>
                            <tr>
                                <th>Imię</th>
                                <th>Nazwa</th>
                                <th>Cena</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>imię</td>
                                <td>nazwa</td>
                                <td>cena</td>
                                <td>data</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}