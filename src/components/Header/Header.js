import React from 'react'
import styles from './Header.module.css'


function Header({ header }) {
    return (
        <div className={styles.container}>
            <p className={styles.headerText}>{header}</p>
        </div>
    )
}

export default Header
