import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../../assets/Oracle_Lens.png'
import '../../styles/Navbar.css';

// import * as data from './links.json'

// const linksString = JSON.stringify(data)
// const links = JSON.parse(linksString).links;

// type Link = {
//     label: string;
//     href: string
// }

// const Links: React.FC<{ links: Link[] }> = ({ links }) => {
//     return (
//         <div className={styles['links-container']}>
//             {links.map((link: Link) => {
//                 return (
//                     <div className={styles['links']}>
//                         <Nav.Item>
//                             <Nav.Link href={link.href}>
//                                 {link.label}
//                             </Nav.Link>
//                         </Nav.Item>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

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
                        <Nav.Link href='/Rankings'>Rankings</Nav.Link>
                        <Nav.Link href='/Predictions'>Predictions</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>

    )
}

export default TopBar;