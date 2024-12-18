import { useContext, useEffect, useState } from "react";
import { getExhibitionsByUser } from "../../utils/api-utils";
import { UserIdContext } from "../../contexts/UserContext";
import { Exhibition, UserContext } from "../../interfaces";
import { ExhibitionCard } from "../ExhibitionCard";

export const MyExhibitions = () => {
	//use the most recently added image as a cover photo or just the colour bs if nothing else
	const userContext: UserContext | undefined = useContext(UserIdContext);
	const userId = userContext!.userId;
	const [myExhibitions, setMyExhibitions] = useState([]);

	useEffect(() => {
		getExhibitionsByUser(userId).then(({ exhibitions }) => {
			setMyExhibitions(exhibitions);
		});
	}, []);

	return (
		<div className="page" id="home-page">
			<h1>My Exhibitions</h1>
			{myExhibitions
				? myExhibitions.map((singleExhibition: Exhibition) => {
						return <ExhibitionCard exhibition={singleExhibition} />;
				  })
				: null}
		</div>
	);
};
