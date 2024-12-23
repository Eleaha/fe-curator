import { useContext, useEffect, useState } from "react";
import { getExhibitionsByUser } from "../../utils/api-utils";
import { UserContext } from "../../contexts/UserContext";
import {
	ContentLoadingContextInterface,
	Exhibition,
	PageLoadingContextInterface,
	UserContextInterface,
} from "../../interfaces";
import { ExhibitionCard } from "../ExhibitionCard";
import { CreateExhibitionButton } from "../CreateExhibitionButton";
import { PageLoadingContext } from "../../contexts/PageLoadingContext";
import { LoadingPage } from "./LoadingPage";
import { ContentLoadingContext } from "../../contexts/ContentLoadingContext";
import { LoadingIcon } from "../LoadingIcon";

export const MyExhibitions = () => {
	const [myExhibitions, setMyExhibitions] = useState([]);

	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;

	const pageLoadingContext: PageLoadingContextInterface | undefined =
		useContext(PageLoadingContext);
	const { pageLoading, setPageLoading } = pageLoadingContext!;

	const contentLoadingContext: ContentLoadingContextInterface | undefined =
		useContext(ContentLoadingContext);
	const { contentLoading, setContentLoading } = contentLoadingContext!;

	useEffect(() => {
		setPageLoading(false);
		setContentLoading(true);
		getExhibitionsByUser(userId).then(({ exhibitions }) => {
			setMyExhibitions(exhibitions);
			setContentLoading(false);
		});
	}, []);

	return pageLoading ? (
		<LoadingPage />
	) : (
		<main className="page" id="my-exhibition-page">
			<div className="page-info">
				<h1 className="page-title">My Exhibitions</h1>
				<CreateExhibitionButton />
			</div>
			{contentLoading ? (
				<LoadingIcon />
			) : (
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
			)}
		</main>
	);
};
