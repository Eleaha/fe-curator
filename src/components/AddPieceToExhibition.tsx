import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
	Exhibition,
	ExhibitionPiecePayload,
	Piece,
	UserContextInterface,
} from "../interfaces";
import {
	getExhibitionsByUser,
	postPieceToExhibition,
} from "../utils/api-utils";
import { UserContext } from "../contexts/UserContext";

export const AddPieceToExhibition = ({ piece }: { piece: Piece }) => {
	const [displayAddOptionBox, setDisplayOptionBox] = useState(false);
	const [userExhibitions, setUserExhibitions] = useState<Exhibition[] | null>(
		null
	);
	const [exhibitionToAddTo, setExhibitionToAddTo] = useState<number | null>(
		null
	);
	const [addingPiece, setAddingPiece] = useState(false);
	const [addedMessage, setAddedMessage] = useState("");

	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;

	useEffect(() => {
		getExhibitionsByUser(userId).then(({ exhibitions }) => {
			setUserExhibitions(exhibitions);
			setExhibitionToAddTo(exhibitions[0].exhibition_id);
		});
	}, [displayAddOptionBox]);

	const handleAddClick = () => {
		setDisplayOptionBox(true);
	};

	const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setExhibitionToAddTo(+e.target.value);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setAddingPiece(true);
		const payload: ExhibitionPiecePayload = {
			institution_id: +piece.institution_id,
			piece_id: piece.piece_id,
			piece_index: userExhibitions!.length + 1,
			img_url: piece.img_url,
			note: piece.description,
		};
		try {
			await postPieceToExhibition(exhibitionToAddTo!, payload);
			setAddedMessage("Added!");
			setAddingPiece(false);
		} catch {
			setAddedMessage("Something went wrong, please try again!");
			setAddingPiece(false);
		}
	};

	return (
		<div className="add-to-exhibition">
			<button
				onClick={handleAddClick}
				className="expand-add-to-exhibition-button"
				id="expand-add-to-exhibition-button"
			>
				+
			</button>
			{displayAddOptionBox ? (
				<div>
					<form onSubmit={handleSubmit} id="select-exhibition-to-add-to">
						<label htmlFor="exhibition-to-add-to"></label>
						<select
							name="exhibition"
							id="exhibition-to-add-to"
							required={true}
							form="select-exhibition-to-add-to"
							onChange={handleSelectionChange}
							className="exhibition-drop-down"
						>
							{userExhibitions!.map((exhibition: Exhibition) => {
								return (
									<option
										value={exhibition.exhibition_id}
										key={exhibition.exhibition_id}
									>
										{exhibition.title}
									</option>
								);
							})}
						</select>
						<button disabled={exhibitionToAddTo || !addingPiece ? false : true}>
							✔
						</button>
					</form>
					<p className="added-piece-to-exhibition-text">{addedMessage}</p>
				</div>
			) : null}
		</div>
	);
};
