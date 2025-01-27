import { useContext, useEffect, useState } from "react";
import { getExhibitions } from "../../utils/api-utils";
import {
	ContentLoadingContextInterface,
	Exhibition,
	PageLoadingContextInterface,
} from "../../interfaces";
import { ExhibitionCard } from "../ExhibitionCard";
import { PageLoadingContext } from "../../contexts/PageLoadingContext";
import { LoadingIcon } from "../LoadingIcon";
import { LoadingPage } from "./LoadingPage";
import { ContentLoadingContext } from "../../contexts/ContentLoadingContext";
import { checkLiveStatus } from "../../utils/date-utils";

export const BrowseExhibitions = () => {
	const [exhibitions, setExhibitions] = useState([]);

	const pageLoadingContext: PageLoadingContextInterface | undefined =
		useContext(PageLoadingContext);
	const { pageLoading, setPageLoading } = pageLoadingContext!;

	const contentLoadingContext: ContentLoadingContextInterface | undefined =
		useContext(ContentLoadingContext);
	const { contentLoading, setContentLoading } = contentLoadingContext!;

	useEffect(() => {
		setPageLoading(false);
		setContentLoading(true);
		getExhibitions().then(({ exhibitions }) => {
			setExhibitions(exhibitions);
			setContentLoading(false);
		});
	}, []);

	return pageLoading ? (
		<LoadingPage />
	) : (
		<main className="page" id="browse-exhibition-page">
			<div className="page-info">
				<h1 className="page-title">Browse Exhibitions</h1>
			</div>
			{contentLoading ? (
				<LoadingIcon />
			) : (
				<div className="page-content">
					{exhibitions.map((exhibition: Exhibition) => {
						if (
							checkLiveStatus(exhibition.from_date, exhibition.to_date) ===
							"Exhibiting"
						) {
							return (
								<ExhibitionCard
									exhibition={exhibition}
									key={exhibition.exhibition_id}
								/>
							);
						}
					})}
				</div>
			)}
		</main>
	);
};
