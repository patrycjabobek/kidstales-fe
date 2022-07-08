import React from 'react'

import styles from './listing-item.module.css';
import OvalButton from "../Buttons/OvalButton";

import eyeIcon from '../../assets/icons/visibility_FILL0_wght400_GRAD0_opsz48.svg';
import userIcon from '../../assets/icons/account_circle_FILL1_wght400_GRAD200_opsz48.svg';


export default function ListingItem(props) {
    const {id, title, author, price, createdAt, imgUrl} = props.material;


    return (
                    <tr key={id} className={styles.listingItem}>
                        <td className={styles.image}>
                            {imgUrl === null ? <img src={imgUrl} alt={`${title}`}/> :
                                <img src={userIcon} alt="not found"/>}
                        </td>
                        <td className={styles.mark}>
                            Ocena
                        </td>
                        <td className={styles.price}>
                            {
                                price === "0"
                                    ?
                                    <OvalButton url={""}
                                                          backgroundColor={'#FE9549'}
                                                          color={'#FFF'}
                                                          borderRadius={'5px'}
                                                          padding={'6px 15px'}
                                                          fontSize={'0.875rem'}
                                                          fontWeight={'500'}
                                                          content={'FREE'}
                                ></OvalButton>
                                    : <>{price}</>
                            }

                        </td>
                        <td className={styles.listingItemDetails}>
                            <div className={styles.title}
                            >{title}</div>
                            <div className={styles.more}>
                                <h3>{author}</h3>
                                <h3 className={styles.views}>
                                    <img className={styles.icon}
                                         src={eyeIcon} alt=""/>
                                    views
                                </h3>
                                <h3>{createdAt.toLocaleString()}</h3>
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

