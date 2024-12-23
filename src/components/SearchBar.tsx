import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
	const [currentSearch, setCurrentSearch] = useState("")
	const navigate = useNavigate()

	const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
		setCurrentSearch(e.currentTarget.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate(`/browse-pieces?search=${currentSearch}`)
	};
	return (
		<div className="piece-search-bar">
			<h2>Search collections</h2>
			<form className="search" onSubmit={handleSubmit}>
				<label htmlFor="search-bar"></label>
				<input className="search-bar" id="search-bar" type="text" value={currentSearch} onChange={handleInputChange}></input>
                <button type="submit" value="search" className="search-button" id="search-button">Search</button>
			</form>
		</div>
	);
};
