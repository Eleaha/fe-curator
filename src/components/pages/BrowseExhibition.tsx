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
		<main className="page" id="browse-exhibition-page">
			<div className="page-info">

			<h1 className="page-title">Browse Exhibitions</h1>
			</div>
			<div className="page-content">

			{exhibitions.map((exhibition: Exhibition) => {
				return <ExhibitionCard exhibition={exhibition} key={exhibition.exhibition_id}/>;
			})}
			</div>
		</main>
	);
};
