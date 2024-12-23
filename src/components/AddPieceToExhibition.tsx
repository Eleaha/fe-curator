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

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const payload: ExhibitionPiecePayload = {
			institution_id: +piece.institution_id,
			piece_id: piece.piece_id,
			piece_index: userExhibitions!.length + 1,
			img_url: piece.img_url,
			note: piece.description,
		};
		postPieceToExhibition(exhibitionToAddTo!, payload);
	};

	return (
		<div className="add-to-exhibition">
			<button onClick={handleAddClick}>+</button>
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
						<button disabled={exhibitionToAddTo ? false : true}>✔</button>
					</form>
				</div>
			) : null}
		</div>
	);
};
