import { useContext, useEffect, useState } from "react";
import { getExhibitionsByUser } from "../../utils/api-utils";
import { UserContext } from "../../contexts/UserContext";
import { Exhibition, UserContextInterface } from "../../interfaces";
import { ExhibitionCard } from "../ExhibitionCard";
import { CreateExhibitionButton } from "../CreateExhibitionButton";

export const MyExhibitions = () => {
	//use the most recently added image as a cover photo or just the colour bs if nothing else
	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;
	const [myExhibitions, setMyExhibitions] = useState([]);

	useEffect(() => {
		getExhibitionsByUser(userId).then(({ exhibitions }) => {
			setMyExhibitions(exhibitions);
		});
	}, []);

	return (
		<main className="page" id="my-exhibition-page">
			<div className="page-info">
				<h1 className="page-title">My Exhibitions</h1>
				<CreateExhibitionButton />
			</div>
			<div className="page-content">
				{myExhibitions
					? myExhibitions.map((singleExhibition: Exhibition) => {
							return (
								<ExhibitionCard
									exhibition={singleExhibition}
									key={singleExhibition.exhibition_id}
								/>
							);
					  })
					: null}
			</div>
		</main>
	);
};
