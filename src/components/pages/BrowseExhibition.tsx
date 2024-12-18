import { useEffect, useState } from "react";
import { getExhibitions } from "../../utils/api-utils";
import { Exhibition } from "../../interfaces";
import { ExhibitionCard } from "../ExhibitionCard";

export const BrowseExhibitions = () => {
	const [exhibitions, setExhibitions] = useState([]);

	useEffect(() => {
		getExhibitions().then(({ exhibitions }) => {
			setExhibitions(exhibitions);
		});
	}, []);

	return (
		<div className="page" id="home-page">
			<h1>Browse Exhibitions</h1>
			{exhibitions.map((singleExhibition: Exhibition) => {
				return <ExhibitionCard exhibition={singleExhibition} />;
			})}
		</div>
	);
};
