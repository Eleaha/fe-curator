import { useNavigate } from "react-router-dom";
import {
	Exhibition,
	ExhibitionUpdatePayload,
	UserContextInterface,
} from "../interfaces";
import { UserContext } from "../contexts/UserContext";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
	deleteExhibition,
	getUserById,
	patchExhibition,
} from "../utils/api-utils";
import { HexColorPicker } from "react-colorful";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";

export const ExhibitionCard = ({ exhibition }: { exhibition: Exhibition }) => {
	const [currentExhibition, setCurrentExhibition] = useState(exhibition);
	const [colour, setColour] = useState("#aabbcc");
	const [editing, setEditing] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [title, setTitle] = useState(exhibition.title);
	const [description, setDescription] = useState(exhibition.description);
	const [username, setUsername] = useState<string | undefined>(undefined);

	const navigate = useNavigate();

	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;

	useEffect(() => {
		getUserById(exhibition.user_id).then(({ user }) => {
			setUsername(user.username);
		});
	});

	const handleClick = () => {
		navigate(`/exhibitions?id=${currentExhibition.exhibition_id}`);
	};

	const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

	const handleDescriptionChange = (e: FormEvent<HTMLInputElement>) => {
		setDescription(e.currentTarget.value);
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
			className="card exhibition-card"
			id="exhibition"
		>
			{!editing ? (
				<div onClick={handleClick}>
					<h1 className="exhibition-card-title">{currentExhibition.title}</h1>
					<p>{currentExhibition.description}</p>
					{userId !== exhibition.user_id ? <h2>By {username}</h2> : null}
				</div>
			) : (
				<div>
					<form onSubmit={handleSubmit}>
						<label htmlFor="edit-title">Edit Title</label>
						<input
							type="text"
							id="edit-title"
							className="exhibition-card-title text-input"
							value={title}
							onChange={handleTitleChange}
						></input>
						<br/>
						<label htmlFor="edit-description">Edit Description:</label>
						<input
							type="text"
							id="edit-description"
							className="exhibition-card-description text-input"
							value={description}
							onChange={handleDescriptionChange}
						></input>
						<HexColorPicker color={colour} onChange={setColour} />
						<button>Update</button>
					</form>
					<DeleteButton
						deleteApiFunction={deleteExhibition}
						deleteId={+exhibition.exhibition_id}
						setDeleted={setDeleted}
					/>
				</div>
			)}
			{currentExhibition.user_id === userId ? (
				<EditButton editing={editing} setEditing={setEditing} />
			) : null}
		</div>
	) : (
		<h1>Exhibition Deleted!</h1>
	);
};
