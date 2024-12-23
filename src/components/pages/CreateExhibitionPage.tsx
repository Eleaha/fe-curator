import { FormEvent, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ExhibitionPayload, UserContextInterface } from "../../interfaces";
import { HexColorPicker } from "react-colorful";
import { postExhibition } from "../../utils/api-utils";
import { useNavigate } from "react-router-dom";

export const CreateExhibitionPage = () => {
	const [colour, setColour] = useState("#aabbcc");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;

	const navigate = useNavigate();

	const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

	const handleDescriptionChange = (e: FormEvent<HTMLInputElement>) => {
		setDescription(e.currentTarget.value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload: ExhibitionPayload = {
			user_id: userId,
			title,
			description,
			bg_colour: colour,
		};

		postExhibition(payload).then(({ exhibition }) => {
			navigate(`/exhibitions?id=${exhibition.exhibition_id}`);
		});
	};

	return (
		<main className="page" id="create-exhibition-page">
			<div
				className="exhibition-background"
				style={{ backgroundColor: colour }}
			></div>
			<div className="page-info">
				<h1 className="page-title">Create Exhibition</h1>
			</div>
			<div className="page-content">
				<form id="create-exhibition-form" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="title">Title:</label>
						<input
							type="text"
							id="title"
							onChange={handleTitleChange}
							value={title}
						/>
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							id="description"
							onChange={handleDescriptionChange}
							value={description}
						/>
					</div>
					<HexColorPicker color={colour} onChange={setColour} />
					<button>Create</button>
				</form>
			</div>
		</main>
	);
};
