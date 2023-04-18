import React from 'react'
import { Link } from 'react-router-dom'
import beginnerImg from '../../assets/img/beginner.jpg'
import advancedImg from '../../assets/img/inter.jpg'
import ProImg from '../../assets/img/pro.jpg'
import Card from '../../components/Card/Card'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './MenuPage.module.css'


function MenuPage() {

    return (
        <>
            <Link to='/'>
                <button className={styles.btn}>Home</button>
            </Link>
            <Sidebar />
            <div className={styles.container}>
                <Card
                    text="First is a card"
                    lvlText="Beginner"
                    imgSrc={beginnerImg}
                    linkTo='/videotutorials' />

                <Card
                    text="Second card"
                    lvlText="Advanced"
                    imgSrc={advancedImg}
                    linkTo='/videotutorials'
                />

                <Card
                    text="Third card"
                    lvlText="Professional"
                    imgSrc={ProImg}
                    linkTo='/videotutorials'
                />

            </div>
        </>
    )
};

export default MenuPage;