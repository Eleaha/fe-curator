import { useEffect, useState } from "react";
import { getPiece } from "../../utils/api-utils";
import { Piece } from "../../interfaces";

import { useSearchParams } from "react-router-dom";

export const PiecePage = () => {
	const [searchParams] = useSearchParams();
	const institutionId: string | null =
		searchParams.get("institution") || null;
	const pieceId: string | null = searchParams.get("piece") || null;

	const [piece, setPiece] = useState<Piece | null>(null);

	useEffect(() => {
		getPiece(+institutionId!, pieceId!).then(({ piece }) => {
			setPiece(piece);
		});
	}, []);

	return (
		<div className="page">
			{piece !== null ? (
				<div>
					<h1>{piece.title}</h1>
                    <h2>{piece.maker} - {piece.date}</h2>
                    <h3>{piece.material}</h3>
					<p>{piece.description}</p>
					<img src={piece.img_url} />
				</div>
			) : null}
		</div>
	);
};
