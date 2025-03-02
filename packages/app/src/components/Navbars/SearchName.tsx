import { useState } from "react";
import { Navbar, Button } from "react-bootstrap";

interface SearchNameBarProps {
  onSubmit: (searchTerm: string) => void;
}

const SearchNameBar: React.FC<SearchNameBarProps> = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");
    onSubmit(""); // Clear search in parent component
  };

  return (
    <Navbar expand="lg" className="search">
      <h5>Name</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
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
