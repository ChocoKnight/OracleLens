import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
// import logo from '../../assets/Oracle_Lens.png'
import '../../styles/Navbar.css';

const TopBar: React.FC<{}> = () => {
    return (
        <div>
            <Navbar expand="lg" fixed="top" className='title'>
                <Container>
                    <Navbar.Brand href='/'>
                        {/* <img src={logo}
                            className="logo"
                            alt="Oracle Lens" /> */}
                        <h1>
                            Oracle Lens
                        </h1>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Navbar expand="lg" className='navbar'>
                <Container>
                    <Nav className='nav'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/Tournaments'>Tournaments</Nav.Link>
                        <Nav.Link href='/Teams'>Teams</Nav.Link>
                        <Nav.Link href='/Players'>Players</Nav.Link>
                        <Nav.Link href='/Champions'>Champions</Nav.Link>
                        <Nav.Link href='/Rankings'>Rankings</Nav.Link>
                        <Nav.Link href='/Predictions'>Predictions</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default TopBar;