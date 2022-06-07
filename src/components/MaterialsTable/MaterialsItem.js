import React, {Fragment} from 'react';

import './materials-item.style.css'

export  default function MaterialsItem({material}) {
    const {id, title, author} = material;


    return (
        <Fragment>
            <div key={id} className={'material-item'}>
                <h3>{title}</h3>
                <h4>{author}</h4>
                <button>
                    ZOBACZ
                </button>
            </div>
        </Fragment>

    )
}