import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header className="header">
			<h1 className="header-title">
				<Link to="/">Curator</Link>
			</h1>
			<nav>
				<ul id="nav-list">
					<li className="nav-link">
						<Link to="/browse-pieces">Browse Pieces</Link>
					</li>
					<li className="nav-link">
						<Link to="/my-exhibitions/">My Exhibitions</Link>
					</li>
					<li className="nav-link">
						<Link to="/browse-exhibitions">Browse Exhibitions</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
