import React from 'react';
import beginnerImg from '../../assets/img/beginner.jpg';
import advanceImg from '../../assets/img/inter.jpg';
import proImg from '../../assets/img/pro.jpg';
import Card from '../../components/Card/Card';
import Sidebar from '../../components/sidebar/Sidebar';

function MenuPage() {

    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh'
    };

    const header = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    }

    const mainContentStyles = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxHeight: '100%',
    };


    return (
        <div style={styles}>
            <Sidebar />
            <div>
                <div style={header}>
                    <h1>Select your level</h1>                </div>
                <div style={mainContentStyles}>
                    <Card
                        lvlText="Beginner"
                        imgSrc={beginnerImg}
                        linkTo='/videotutorials'
                    />
                    <Card
                        lvlText="Advanced"
                        imgSrc={advanceImg}
                        linkTo='/videotutorials'
                    />
                    <Card
                        lvlText="Professional"
                        imgSrc={proImg}
                        linkTo='/videotutorials'
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuPage;