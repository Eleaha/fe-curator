import { useNavigate } from "react-router-dom";
import { Piece } from "../interfaces";

export const PieceCard = ({piece}: {piece: Piece}) => {

	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/piece?institution=${piece.institution_id}&piece=${piece.piece_id}&page=1`)
	}

	return (
		<div key={piece.piece_id} className="card piece-card" id="piece" onClick={handleClick}>
			<h1>{piece.title}</h1>
			<h3 className="maker-and-date">
				{piece.maker} - {piece.date}
			</h3>
			<img src={piece.img_url}/>
		</div>
	);
};
