import { Link } from "react-router-dom";
import { Exhibition } from "../interfaces";
// import { UserIdContext } from "../contexts/UserContext";
// import { useContext } from "react";

//display the username if the user id of the - will need to add the username to context
export const ExhibitionCard = ({ exhibition }: { exhibition: Exhibition }) => {
	// const userContext: UserContext | undefined = useContext(UserIdContext);
	// const userId = userContext!.userId;
	return (
		<Link to={`/exhibitions?id=${exhibition.exhibition_id}`}>
			<div
				key={exhibition.exhibition_id}
				style={{ backgroundColor: exhibition!.bg_colour }}
			>
				<h2>{exhibition.title}</h2>
				<p>{exhibition.description}</p>
			</div>
		</Link>
	);
};
