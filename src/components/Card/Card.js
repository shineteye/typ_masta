import React from 'react'
import styles from './Card.module.css'

function Card({ text }) {
    return (
        <div className={styles.container}>
            <p className={styles.cardText}>{text}</p>
        </div>
    )
}

export default Card
