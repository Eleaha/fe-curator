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
		console.log(currentSearch);
		navigate(`/browse-pieces?search=${currentSearch}`)
	};
	return (
		<div>
			<h2>Search</h2>
			<form className="search-bar" onSubmit={handleSubmit}>
				<label htmlFor="search-bar"></label>
				<input className="search-bar" id="search-bar" type="text" value={currentSearch} onChange={handleInputChange}></input>
                <input type="submit" value="search"></input>
			</form>
		</div>
	);
};
