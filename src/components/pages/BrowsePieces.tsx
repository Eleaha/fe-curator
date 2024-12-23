import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { getPieces } from "../../utils/api-utils";
import { useContext, useEffect, useState } from "react";
import { PieceCard } from "../PieceCard";
import { NavButtonNext } from "../NavButtonNext";
import { NavButtonBack } from "../NavButtonBack";
import {
	ContentLoadingContextInterface,
	PageLoadingContextInterface,
} from "../../interfaces";
import { PageLoadingContext } from "../../contexts/PageLoadingContext";
import { LoadingPage } from "./LoadingPage";
import { ContentLoadingContext } from "../../contexts/ContentLoadingContext";
import { LoadingIcon } from "../LoadingIcon";

export const BrowsePieces = () => {
	const [searchParams] = useSearchParams();
	const searchTerm: string | null = searchParams.get("search") || null;
	const page: string | null = searchParams.get("page") || "1";

	const [pieces, setPieces] = useState([]);

	const pageLoadingContext: PageLoadingContextInterface | undefined =
		useContext(PageLoadingContext);
	const { pageLoading, setPageLoading } = pageLoadingContext!;

	const contentLoadingContext: ContentLoadingContextInterface | undefined =
		useContext(ContentLoadingContext);
	const { contentLoading, setContentLoading } = contentLoadingContext!;

	useEffect(() => {
		setPageLoading(false);
		if (searchTerm !== null) {
			setContentLoading(true);
			getPieces(searchTerm, +page).then((response) => {
				const { pieces } = response;
				setPieces(pieces);
				setContentLoading(false);
			});
		}
	}, [searchTerm, searchParams]);

	return pageLoading ? (
		<LoadingPage />
	) : (
		<main className="page" id="browse-piece-page">
			<div className="page-info">
				<h1 className="page-title">Browse Pieces</h1>
				<SearchBar />
				{pieces.length ? (
					<div className="nav-button-container">
						<NavButtonBack />
						<NavButtonNext />
					</div>
				) : (
					<h2>Please use the search bar to find some interesting things...</h2>
				)}
			</div>
			{contentLoading ? (
				<LoadingIcon />
			) : (
				<div className="page-content pieces-container">
					{pieces.length
						? pieces.map((piece: any) => {
								return <PieceCard piece={piece} key={piece.piece_id} />;
						  })
						: null}
				</div>
			)}
		</main>
	);
};
