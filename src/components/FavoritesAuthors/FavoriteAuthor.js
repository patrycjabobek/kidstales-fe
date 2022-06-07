import React, {Fragment} from "react";

export default function FavoriteAuthor({favoriteAuthor}) {
    const {author, mark, quantity} = favoriteAuthor;

    <Fragment>
        <tr>
            <td>
                <img src="" alt=""/>
            </td>
            <td>{author}</td>
            <td>{mark}</td>
            <td>{quantity}</td>
        </tr>
    </Fragment>

}
