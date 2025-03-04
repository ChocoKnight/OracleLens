import { useState } from "react";
import { Navbar, Button } from "react-bootstrap";

interface SearchNameBarProps {
  onSubmit: (searchTerm: string) => void;
  searchLabel: string;
}

const SearchNameBar: React.FC<SearchNameBarProps> = ({ onSubmit, searchLabel }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");
    onSubmit("");
  };

  return (
    <Navbar expand="lg" className="search">
      <h5>{searchLabel}</h5> 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`${searchLabel}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="buttons" type="submit">
          Search
        </Button>
        <Button className="buttons" variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </form>
    </Navbar>
  );
};

export default SearchNameBar;
