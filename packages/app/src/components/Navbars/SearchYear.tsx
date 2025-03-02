import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import '../../styles/Navbar.css';

interface SearchYearProps {
    onYearSelect: (year: number | null) => void;
}

const SearchYearBar: React.FC<SearchYearProps> = ({ onYearSelect }) => {
    const years = Array.from({ length: 12 }, (_, index) => 2014 + index);
    return (
        <Navbar expand='lg' className='search'>
            <h5>Year</h5>
            <Nav className="ml-auto">
                {years.map(year => (
                    <Button key={year} className='buttons' variant="outline-light" onClick={() => onYearSelect(year)}>
                        {year}
                    </Button>
                ))}
                <Button className='buttons' variant="outline-light" onClick={() => onYearSelect(null)}>
                    All
                </Button>
            </Nav>
        </Navbar>
    );
}

export default SearchYearBar;