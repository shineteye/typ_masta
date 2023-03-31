import React from 'react'
import styles from './Button.module.css'

function Button({ text, handler }) {

    return (
        <div className={styles.container}>
            <button
                className={styles.btnText}
                onClick={handler}
            >
                {text}
            </button>
        </div>
    )
}

export default Button