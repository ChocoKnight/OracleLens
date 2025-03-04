import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Team } from "../../types/Types";

interface SearchNameBarProps {
    teams: Team[]; 
    onTeamSelect: (teamId: string) => void;
}

const TeamSearch: React.FC<SearchNameBarProps> = ({ teams, onTeamSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedTeamId(selectedId);
        onTeamSelect(selectedId); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Team Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="buttons" type="submit">
                    Search
                </Button>
            </form>

            <Form.Select aria-label="Select Team" value={selectedTeamId} onChange={handleSelectChange}>
                <option value="">Select Team</option>
                {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name} {team.year}
                        </option>
                    ))
                ) : (
                    <option disabled>No teams found</option>
                )}
            </Form.Select>

            {/* {selectedTeamId && <p>Selected Team ID: {selectedTeamId}</p>} */}
        </div>
    );
};

export default TeamSearch;
