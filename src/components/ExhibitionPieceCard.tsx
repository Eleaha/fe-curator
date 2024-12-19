import { useEffect, useState } from "react";
import { Piece } from "../interfaces";
import { getPiece } from "../utils/api-utils";
import { Link } from "react-router-dom";

export const ExhibitionPieceCard = (exhibitionPieceData: any) => {
	const [piece, setPiece] = useState<Piece | undefined>(undefined);
	const { exhibitionPiece } = exhibitionPieceData;
	const institutionId: number = exhibitionPiece.institution_id;
	const pieceId: string = exhibitionPiece.piece_id;

	useEffect(() => {
		console.log(piece?.piece_id)
		getPiece(+institutionId, pieceId).then(({ piece }) => {
			setPiece(piece);
		});
	}, []);

	return piece ? (
		<Link to={`/piece?institution=${institutionId}&piece=${pieceId}`}>
		<div>
			<h2>{piece!.title}</h2>
			<h3>
				{piece!.maker} - {piece!.date}
			</h3>
			<img src={piece.img_url} />
			<p>{exhibitionPiece.note}</p>
		</div>
			</Link>
	) : null;
};
