import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import styles from './PracticePage.module.css'

const PracticePage = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <p>Practice text</p>
            <p>Elapsed Time</p>
            <p>Correct Keystrokes</p>
            <p>Typing Speed</p>




            <textarea style={{ width: 500, height: 400 }} />
        </div>
    )
}

export default PracticePage
