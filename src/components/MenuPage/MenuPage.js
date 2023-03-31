import React from 'react'
import Card from '../Card/Card'
import Header from '../Header/Header'
import styles from './MenuPage.module.css'

function MenuPage() {
    return (
        <div className={styles.container}>
            <Header />
            <Card text="First is a card" />
            <Card text="Second card" />
            <Card text="Third card" />
        </div>
    )
}

export default MenuPage;