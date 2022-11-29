import React from 'react'
import styles from './opinion-modal.module.scss';

//mui
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function OpinionModal(props) {
    const {value} = props;
    return (
        <div className={styles.modal}>
            <h1 className={styles.header}>Opinie</h1>
            <div className={styles.rating}>
                <Box
                    sx={{
                        width: '200px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Rating
                        name="text-feedback"
                        value={value}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </Box>
                <h3>{value}/5.0</h3>
            </div>
            <h3>{props.numberOReviews}</h3>
        </div>
    )
}
