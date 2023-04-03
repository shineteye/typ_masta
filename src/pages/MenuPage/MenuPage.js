import React from 'react'
import { Link } from 'react-router-dom'
import beginnerImg from '../../assets/img/photo.jpg'
import Card from '../../components/Card/Card'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import styles from './MenuPage.module.css'


function MenuPage() {

    return (
        <>
            <Navbar />
            <Header header="Select your level" />
            <div className={styles.container}>
                <Card
                    text="First is a card"
                    lvlText="Beginner"
                    imgSrc={beginnerImg}
                    linkTo='/videotutorials' />

                <Card
                    text="Second card"
                    lvlText="Advanced"
                    imgSrc={beginnerImg}
                    linkTo='/videotutorials'
                />

                <Card
                    text="Third card"
                    lvlText="Professional"
                    imgSrc={beginnerImg}
                    linkTo='/videotutorials'
                />
                <Link to='/'>
                    <button className={styles.btn}>Home</button>
                </Link>
            </div>
        </>
    )
};

export default MenuPage;