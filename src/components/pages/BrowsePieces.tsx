import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { getPieces } from "../../utils/api-utils";
import { useEffect, useState } from "react";
import { PieceCard } from "../PieceCard";
import { NavButtonNext } from "../NavButtonNext";
import { NavButtonBack } from "../NavButtonBack";

export const BrowsePieces = () => {
	const [searchParams] = useSearchParams();
	const searchTerm: string | null = searchParams.get("search") || null;
	const page: string | null = searchParams.get("page") || "1";

	const [pieces, setPieces] = useState([]);

	useEffect(() => {
		if (searchTerm !== null) {
			getPieces(searchTerm, +page).then((response) => {
				const { pieces } = response;
				setPieces(pieces);
			});
		}
	}, [searchTerm, searchParams]);

	return (
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
			<div className="page-content pieces-container">
				{pieces.length
					? pieces.map((piece: any) => {
							return <PieceCard piece={piece} key={piece.piece_id} />;
					  })
					: null}
			</div>
		</main>
	);
};
