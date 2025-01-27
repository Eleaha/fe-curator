import { Link } from "react-router-dom";
import { ErrorProps } from "../../interfaces";

export const ErrorPage = ({ errorMessage, errorCode }: ErrorProps) => {
	return (
		<main className="page" id="error-page">
			<h1>Uh oh! Something's gone wrong.</h1>
			<h2>{errorMessage}</h2>
			<h1>{errorCode}</h1>
			<Link to="/">
				<button>Home</button>
			</Link>
		</main>
	);
};
