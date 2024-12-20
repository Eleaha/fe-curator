import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { SearchBar } from "../SearchBar";
import { UserContextInterface } from "../../interfaces";

export const Home = () => {
	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const username = userContext!.user.username;
	return (
		<main className="page" id="home-page">
			<h1>Welcome!</h1>
			<p>Welcome back to Curator {username}!</p>
			<SearchBar />
		</main>
	);
};
