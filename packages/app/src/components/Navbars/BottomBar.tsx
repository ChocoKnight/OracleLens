import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
// import logo from '../../assets/Oracle_Lens.png'
import '../../styles/Navbar.css';

const BottomBar: React.FC<{}> = () => {
    return (
        <div>
            <Navbar expand='lg' className='bottom_bar'>
                <Container>
                    <p>
                        Oracle Lens is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games 
                        or anyone officially involved in producing or managing League of Legends. League of Legends and Riot 
                        Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
                    </p>
                </Container>
            </Navbar>
        </div>
    )
}

export default BottomBar;