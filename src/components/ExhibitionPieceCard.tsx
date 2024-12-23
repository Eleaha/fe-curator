import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
	ExhibitionPiece,
	ExhibitionPieceUpdatePayload,
	Piece,
} from "../interfaces";
import {
	deleteExhibitionPiece,
	getPiece,
	updateExhibitionPiece,
} from "../utils/api-utils";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "./DeleteButton";

interface ExhibitionPieceCardProps {
	exhibitionPiece: ExhibitionPiece;
	editing: boolean;
}

export const ExhibitionPieceCard = ({
	exhibitionPiece,
	editing,
}: ExhibitionPieceCardProps) => {
	const [piece, setPiece] = useState<Piece | undefined>(undefined);
	const [deleted, setDeleted] = useState(false);
	const [note, setNote] = useState(exhibitionPiece.note);
	const [checked, setChecked] = useState(false);

	const navigate = useNavigate();

	const institutionId: number = exhibitionPiece.institution_id;
	const pieceId: string = exhibitionPiece.piece_id;

	useEffect(() => {
		getPiece(+institutionId, pieceId).then(({ piece }) => {
			setPiece(piece);
		});
	}, []);

	const handleClick = () => {
		navigate(`/piece?institution=${institutionId}&piece=${pieceId}`);
	};

	const handleNoteChange = (e: FormEvent<HTMLInputElement>) => {
		setNote(e.currentTarget.value);
	};

	const handleUsePieceDescriptionCheckChange = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		setChecked(e.target.checked);
	};

	const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const payloadNote: string | undefined = checked ? piece!.description : note;

		const payload: ExhibitionPieceUpdatePayload = {
			note: payloadNote,
		};

		updateExhibitionPiece(exhibitionPiece.id, payload).then(
			({ exhibitionPiece }) => {
				console.log(exhibitionPiece);
			}
		);
	};

	return piece ? (
		<div className="card exhibition-piece-card" id="exhibition-piece">
			{deleted ? (
				<h1>Piece Deleted!</h1>
			) : (
				<div>
					<h1>{piece!.title}</h1>

					<h3>
						{piece!.maker} - {piece!.date}
					</h3>
					<img src={piece.img_url} onClick={handleClick} />

					{editing ? (
						<form onSubmit={handleUpdate}>
							<label htmlFor="update-note">Update note:</label>
							<input
								id="update-note"
								value={note}
								onChange={handleNoteChange}
								disabled={checked}
								className="text-input"
							></input>
							<br/>
							<label htmlFor="use-piece-description-check">
								Use piece description?
							</label>
							<input
								type="checkbox"
								id="use-piece-description-check"
								checked={checked}
								onChange={handleUsePieceDescriptionCheckChange}
							></input>
							<br/>
							<button>Update</button>
						</form>
					) : (
						<p>{note}</p>
					)}
					{editing ? (
						<DeleteButton
							deleteApiFunction={deleteExhibitionPiece}
							deleteId={exhibitionPiece.id}
							setDeleted={setDeleted}
						/>
					) : null}
				</div>
			)}
		</div>
	) : null;
};
