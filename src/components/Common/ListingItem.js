import React, {useContext} from 'react'

import {Link} from "react-router-dom";
import {MaterialsContext} from "../../contexts/MaterialsContext";

export default function ListingItem(props) {
    const {id, title, author, price, imgUrl} = props.material;
    // console.log(props.material)

    return (
                    <tr key={id} >
                        <td>
                            <img src={imgUrl} alt={`${title}`}/>
                        </td>
                        <td>
                            Ocena
                        </td>
                        <td>
                            {price}
                        </td>
                        <td>
                            {title} {author} - eye icon - views - createdAt
                        </td>
                        <td>
                            <Link to={`/listing/${id}`} >Zobacz</Link>
                        </td>
                    </tr>
    )
}

