import React, {Fragment} from 'react';

import styles from './materials-item.module.scss'

export  default function MaterialsItem({material}) {
    const {id, title, author} = material;


    return (
        <Fragment>
            <div key={id} className={styles.materialItem}>
                <h3>{title}</h3>
                <h4>{author}</h4>
                <button>
                    ZOBACZ
                </button>
            </div>
        </Fragment>

    )
}