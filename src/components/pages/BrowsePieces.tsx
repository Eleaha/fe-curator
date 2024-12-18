import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../SearchBar";
import { getPieces } from "../../utils/api-utils";
import { useEffect, useState } from "react";
import { PieceCard } from "../PieceCard";

export const BrowsePieces = () => {
	const [searchParams] = useSearchParams();
	const searchTerm: (string | null) = searchParams.get("search") || null;

	const [pieces, setPieces] = useState([]);

	useEffect(() => {
		if (searchTerm !== null) {
			getPieces(searchTerm);
			getPieces(searchTerm).then((response) => {
				const { pieces } = response;
				setPieces(pieces);
			});
		}
	}, [searchTerm]);

	return (
		<div className="page" id="home-page">
			<h1>Browse Pieces</h1>
			<SearchBar />
			{pieces.length ? (
				pieces.map((piece: any) => {
					return <PieceCard piece={piece} />;
				})
			) : (
				<h2>Please use the search bar to find some interesting things...</h2>
			)}
		</div>
	);
};
