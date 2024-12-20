import { useNavigate } from "react-router-dom";

export const PieceCard = (pieceObj: any) => {

	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/piece?institution=${piece.institution_id}&piece=${piece.piece_id}&page=1`)
	}

	const { piece } = pieceObj;
	return (
			<div key={piece.piece_id} onClick={handleClick}>
				<h2>{piece.title}</h2>
                <h3>{piece.maker} - {piece.date}</h3>
				<img src={piece.img_url} />
			</div>
	);
};
