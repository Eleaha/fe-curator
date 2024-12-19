import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header>
			<Link to="/">
				<h1>Curator</h1>
			</Link>
			<nav>
				<ul>
					<Link to="/browse-pieces">
						<li>Browse Pieces</li>
					</Link>
					<Link to="/my-exhibitions/">
						<li>My Exhibitions</li>
					</Link>
					<Link to="/browse-exhibitions">
						<li>Browse Exhibitions</li>
					</Link>
				</ul>
			</nav>
		</header>
	);
};
