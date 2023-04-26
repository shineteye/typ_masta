import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'



function Card({ text, lvlText, imgSrc, handler, linkTo }) {
    return (
        <div className={styles.container}>
            <img src={imgSrc} className={styles.image} alt='img' />
            {/* <p className={styles.cardText}>{text}</p> */}
            <Link to={linkTo}>
                <button className={styles.btn} onClick={handler}>{lvlText}</button>
            </Link>
        </div>
    )
}

export default Card
