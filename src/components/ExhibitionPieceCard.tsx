import { useEffect, useState } from "react";
import { Piece } from "../interfaces";
import { getPiece } from "../utils/api-utils";
import { useNavigate } from "react-router-dom";

export const ExhibitionPieceCard = (exhibitionPieceData: any) => {
	const [piece, setPiece] = useState<Piece | undefined>(undefined);

	const navigate = useNavigate();

	const { exhibitionPiece } = exhibitionPieceData;
	const institutionId: number = exhibitionPiece.institution_id;
	const pieceId: string = exhibitionPiece.piece_id;

	const handleClick = () => {
		navigate(`/piece?institution=${institutionId}&piece=${pieceId}`);
	};

	useEffect(() => {
		getPiece(+institutionId, pieceId).then(({ piece }) => {
			setPiece(piece);
		});
	}, []);

	return piece ? (
		<div onClick={handleClick}>
			<h2>{piece!.title}</h2>
			<h3>
				{piece!.maker} - {piece!.date}
			</h3>
			<img src={piece.img_url} />
			<p>{exhibitionPiece.note}</p>
		</div>
	) : null;
};
