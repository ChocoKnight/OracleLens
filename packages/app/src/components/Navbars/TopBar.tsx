import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Navbar } from 'react-bootstrap';
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
        <Navbar fixed="top" className = 'navbar'>
            <Container>
                <Navbar.Brand href='/'>
                    Oracle Lens
                </Navbar.Brand>
                <Nav>

                </Nav>
            </Container>
        </Navbar>
    )
}

export default TopBar;