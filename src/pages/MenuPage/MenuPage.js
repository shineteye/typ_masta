import React, { useContext } from 'react';
import beginnerImg from '../../assets/img/beginner.jpg';
import advanceImg from '../../assets/img/inter.jpg';
import proImg from '../../assets/img/pro.jpg';
import Card from '../../components/Card/Card';
import Sidebar from '../../components/sidebar/Sidebar';
import { ModeContext } from '../../contexts/modeContext';


function MenuPage() {
    const { mode, setMode } = useContext(ModeContext)

    const handleBeginnerClick = () => {
        setMode('begin')
    }
    const handleAdvanceClick = () => {
        setMode('adv')
    }
    const handleProClick = () => {
        setMode('pro')
    }
    const styles = {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
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
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'
            }}>
                <div style={header}>
                    <h1>Select your level</h1>
                </div>
                <div style={mainContentStyles}>
                    <Card
                        lvlText="Beginner"
                        imgSrc={beginnerImg}
                        linkTo='/videotutorials'
                        handler={handleBeginnerClick}
                    />
                    <Card
                        lvlText="Intermediate"
                        imgSrc={advanceImg}
                        linkTo='/videotutorials'
                        handler={handleAdvanceClick}
                    />
                    <Card
                        lvlText="Advanced"
                        imgSrc={proImg}
                        linkTo='/videotutorials'
                        handler={handleProClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuPage;