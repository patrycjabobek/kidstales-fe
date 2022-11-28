import React, {Fragment} from 'react'
import ListingItem from './ListingItem'


import styles from './listing-table.module.scss';


export default function ListingTable(props) {
    // const { categoriesMap } = useContext(CategoriesContext);
    const materials = props.materials;


    function handleSearch(e) {
        // categoriesList = categoriesMap;
        // categoriesList = categoriesList.filter((item) {
        //     return item.toLowerCase().search(
        //         e.target.value.toLowerCase()) !== -1;
        //     )
        // });
        // setCategoriesList()
    }

    return (
        <Fragment>
            <div className={styles.listingTableContainer}>
                    <input type="text"
                           className={styles.input}
                           placeholder={"Szukaj"}
                            onChange={handleSearch}/>
                    <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                            <tr>
                                <th>
                                    Autor
                                </th>
                                <th>
                                    Ocena
                                </th>
                                <th>
                                    Cena (zł)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                    <Fragment key={materials.id}>
                                        {materials.map((material) => (
                                            <ListingItem key={material.id} material={material}/>
                                        ))}
                                    </Fragment>
                        </tbody>
                    </table>
            </div>
        </Fragment>
    )
}

