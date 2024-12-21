import { useNavigate } from "react-router-dom";
import { Piece } from "../interfaces";

export const PieceCard = ({piece}: {piece: Piece}) => {

	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/piece?institution=${piece.institution_id}&piece=${piece.piece_id}&page=1`)
	}

	return (
		<div key={piece.piece_id}>
			<h2>{piece.title}</h2>
			<h3>
				{piece.maker} - {piece.date}
			</h3>
			<img src={piece.img_url} onClick={handleClick}/>
		</div>
	);
};
