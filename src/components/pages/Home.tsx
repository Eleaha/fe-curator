import { SearchBar } from "../SearchBar";

export const Home = () => {
	return (
		<div className="page" id="home-page">
			<h1>Welcome!</h1>
			<p>Welcome back to Curator.</p>
			<SearchBar></SearchBar>
		</div>
	);
};
