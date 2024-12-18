import { Link } from "react-router-dom";

export const PieceCard = (pieceObj: any) => {

	const { piece } = pieceObj;
	return (
		<Link to={`/piece?institution=${piece.institution_id}&piece=${piece.piece_id}&page=1`}>
			<div key={piece.piece_id}>
				<h2>{piece.title}</h2>
                <h3>{piece.maker} - {piece.date}</h3>
				<img src={piece.img_url} />
			</div>
		</Link>
	);
};
