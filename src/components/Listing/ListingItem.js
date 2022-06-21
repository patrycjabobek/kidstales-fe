import React, {useContext} from 'react'

import styles from './listing-item.module.css';
import {Link} from "react-router-dom";
import {MaterialsContext} from "../../contexts/CategoriesContext";
import OvalButton from "../Buttons/OvalButton";


export default function ListingItem(props) {
    const {id, title, author, price, imgUrl} = props.material;
    // console.log(props.material)

    if (price === 0) {
        return  <tr key={id} className={styles.listingItem}>
            <td className={styles.image}>
                {imgUrl ? <img src={imgUrl} alt={`${title}`}/> : <img src="../../assets/images/user.png" alt="not found"/>}
            </td>
            <td className={styles.mark}>
                Ocena
            </td>
            <td className={styles.price}>
                <OvalButton url={""}
                    backgroundColor={'#FE9549'}
                            color={'#FFF'}
                            borderRadius={'5px'}
                            padding={'6px 15px'}
                            fontSize={'0.875rem'}
                            fontWeight={'500'}
                            content={'FREE'}
                ></OvalButton>
            </td>
            <td className={styles.listingItemDetails}>
                <div className={styles.title}
                >{title}</div>
                <div className={styles.more}>
                    <h3>{author}</h3>
                    <h3>eye icon - views</h3>
                    <h3>createdAt</h3>
                </div>
            </td>
            <td className={styles.button}>
                <OvalButton url={`/listing/${id}`}
                            backgroundColor={'#FE9549'}
                            color={'#FFF'}
                            borderRadius={'20px'}
                            padding={'6px 32px'}
                            fontSize={'1rem'}
                            fontWeight={'500'}
                            content={'ZOBACZ'}

                ></OvalButton>
            </td>
        </tr>
    }

    return (
                    <tr key={id} className={styles.listingItem}>
                        <td className={styles.image}>
                            <img src={imgUrl} alt={`${title}`}/>
                        </td>
                        <td className={styles.mark}>
                            Ocena
                        </td>
                        <td className={styles.price}>
                                {price}
                        </td>
                        <td className={styles.listingItemDetails}>
                            <div className={styles.title}
                            >{title}</div>
                            <div className={styles.more}>
                                <h3>{author}</h3>
                                <h3>eye icon - views</h3>
                                <h3>createdAt</h3>
                                </div>
                        </td>
                        <td className={styles.button}>
                            <OvalButton url={`/listing/${id}`}
                                        backgroundColor={'#FE9549'}
                                        color={'#FFF'}
                                        borderRadius={'20px'}
                                        padding={'6px 32px'}
                                        fontSize={'1rem'}
                                        fontWeight={'500'}
                                        content={'ZOBACZ'}

                            ></OvalButton>
                        </td>
                    </tr>
    )
}

