import { useNavigate } from "react-router-dom";
import {
	Exhibition,
	ExhibitionUpdatePayload,
	UserContextInterface,
} from "../interfaces";
import { UserContext } from "../contexts/UserContext";
import { FormEvent, useContext, useState } from "react";
import { deleteExhibition, patchExhibition } from "../utils/api-utils";
import { HexColorPicker } from "react-colorful";

export const ExhibitionCard = ({ exhibition }: { exhibition: Exhibition }) => {
	const [currentExhibition, setCurrentExhibition] = useState(exhibition);
	const [colour, setColour] = useState("#aabbcc");
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [title, setTitle] = useState(exhibition.title);
	const [description, setDescription] = useState(exhibition.description);

	const navigate = useNavigate();

	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;
	const username = userContext!.user.username;

	const handleClick = () => {
		navigate(`/exhibitions?id=${currentExhibition.exhibition_id}`);
	};

	const handleEditButtonClick = () => {
		setEditing(!editing);
	};

	const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

	const handleDescriptionChange = (e: FormEvent<HTMLInputElement>) => {
		setDescription(e.currentTarget.value);
	};

	const handleDeleteButtonClick = () => {
		setDeleting(true);
	};

	const handleYesDeleteButtonClick = () => {
		deleteExhibition(+currentExhibition.exhibition_id).then(() => {
			setDeleted(true);
		});
	};

	const handleNoDeleteButtonClick = () => {
		setDeleting(false);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload: ExhibitionUpdatePayload = {
			title,
			description,
			bg_colour: colour,
		};

		patchExhibition(currentExhibition.exhibition_id, payload).then(
			({ exhibition }) => {
				setCurrentExhibition(exhibition);
				setEditing(false);
			}
		);
	};

	return !deleted ? (
		<div
			key={currentExhibition.exhibition_id}
			style={{ backgroundColor: currentExhibition!.bg_colour }}
		>
			{!editing ? (
				<div>
					<div onClick={handleClick}>
						<h2 className="exhibition-card-title">{currentExhibition.title}</h2>
						<p>{currentExhibition.description}</p>
						<h2>By {username}</h2>
					</div>
				</div>
			) : (
				<div>
					<form onSubmit={handleSubmit}>
						<label htmlFor="edit-title">Edit Title</label>
						<input
							type="text"
							id="edit-title"
							className="exhibition-card-title"
							value={title}
							onChange={handleTitleChange}
						></input>
						<label htmlFor="edit-description">Edit Description</label>
						<input
							type="text"
							id="edit-description"
							className="exhibition-card-description"
							value={description}
							onChange={handleDescriptionChange}
						></input>
						<HexColorPicker color={colour} onChange={setColour} />
						<button>Update</button>
					</form>
					<button id="delete-exhibition" onClick={handleDeleteButtonClick}>
						🚮
					</button>
					{deleting ? (
						<div>
							<p>Do you really want to delete your exhibition?</p>
							<button id="yes-delete" onClick={handleYesDeleteButtonClick}>
								Yes
							</button>
							<button id="no-delete" onClick={handleNoDeleteButtonClick}>
								No
							</button>
						</div>
					) : null}
				</div>
			)}
			{currentExhibition.user_id === userId ? (
				<button onClick={handleEditButtonClick}>✏</button>
			) : null}
		</div>
	) : (
		<h1>Exhibition Deleted!</h1>
	);
};
