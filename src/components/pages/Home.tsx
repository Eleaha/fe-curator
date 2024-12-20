import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SearchBar } from "../SearchBar";
import { UserContextInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const username = userContext!.user.username;

	const navigate = useNavigate()

	const handleCreateExhibitionClick = () => {
		navigate(`/exhibitions/create`);
	}

	const handleBrowseExhibitionsClick = () => {
		navigate(`/browse-exhibitions`);
	}

	return (
		<main className="page" id="home-page">
			<h1>Welcome!</h1>
			<p>Welcome back to Curator {username}!</p>
			<SearchBar />
			<div onClick={handleCreateExhibitionClick}>
				<h2>Create an exhibition</h2>
				<h2>+</h2>
			</div>
			<div onClick={handleBrowseExhibitionsClick}>
				<h2>Browse exhibitions</h2>
				<h2>🖼</h2>
			</div>
		</main>
	);
};
