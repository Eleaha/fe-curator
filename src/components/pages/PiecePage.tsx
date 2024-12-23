import { useContext, useEffect, useState } from "react";
import { getPiece } from "../../utils/api-utils";
import { PageLoadingContextInterface, Piece } from "../../interfaces";

import { useSearchParams } from "react-router-dom";
import { AddPieceToExhibition } from "../AddPieceToExhibition";
import { PageLoadingContext } from "../../contexts/PageLoadingContext";
import { LoadingPage } from "./LoadingPage";

export const PiecePage = () => {
	const [searchParams] = useSearchParams();
	const [piece, setPiece] = useState<Piece | null>(null);

	const institutionId: string | null = searchParams.get("institution") || null;
	const pieceId: string | null = searchParams.get("piece") || null;

	const pageLoadingContext: PageLoadingContextInterface | undefined =
		useContext(PageLoadingContext);
	const { pageLoading, setPageLoading } = pageLoadingContext!;

	useEffect(() => {
		setPageLoading(false);
		getPiece(+institutionId!, pieceId!).then(({ piece }) => {
			setPiece(piece);
		});
	}, []);

	return pageLoading ? (
		<LoadingPage />
	) : (
		<main className="page" id="piece-page">
			{piece !== null ? (
				<div>
					<div className="page-info">
						<h1>{piece.title}</h1>
						<h2>
							{piece.maker} - {piece.date}
						</h2>
						<h3>{piece.material}</h3>
						<p>{piece.description}</p>
						<AddPieceToExhibition piece={piece} />
					</div>
					<div className="page-content">
						<img src={piece.img_url} />
					</div>
				</div>
			) : null}
		</main>
	);
};
