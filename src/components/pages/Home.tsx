import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SearchBar } from "../SearchBar";
import { UserContextInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const username = userContext!.user.username;

	const navigate = useNavigate();

	const handleCreateExhibitionClick = () => {
		navigate(`/exhibitions/create`);
	};

	const handleBrowseExhibitionsClick = () => {
		navigate(`/browse-exhibitions`);
	};

	return (
		<main className="page" id="home-page">
			<div className="home-welcome-container">
				<h1 className="home-welcome">Welcome!</h1>
				<h2>Welcome back to Curator {username}.</h2>
				<h3>
					Search, browse or curate using art, sculpture, ceramics, clothing and
					artifacts from the V&A and The Rijks Museum.
				</h3>
			</div>
			<div className="home-nav-container">
				<SearchBar />
				<div className="home-nav-squares">
					<div className="home-square" onClick={handleCreateExhibitionClick}>
						<h2 className="home-square-title">Create an Exhibition</h2>
						<h1 className="home-square-icon">+</h1>
					</div>
					<div className="home-square" onClick={handleBrowseExhibitionsClick}>
						<h2 className="home-square-title">Browse Exhibitions</h2>
						<h1 className="home-square-icon">🖼</h1>
					</div>
				</div>
			</div>
		</main>
	);
};
