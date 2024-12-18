import { FormEvent, useContext, useState } from "react";
import { UserIdContext } from "../../contexts/UserContext";
import { ExhibitionPayload, UserContext } from "../../interfaces";
import { HexColorPicker } from "react-colorful";
import { postExhibition } from "../../utils/api-utils";
import { useNavigate } from "react-router-dom";

// user_id: 1,
// title: "Test Exhibition",
// description: "a test exhibition",
// bg_colour: "#000000",

export const CreateExhibitionPage = () => {
	const [colour, setColour] = useState("#aabbcc");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const userContext: UserContext | undefined = useContext(UserIdContext);
	const userId = userContext!.userId;

    const navigate = useNavigate()

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

        postExhibition(payload).then(({exhibition}) => {
            navigate(`/exhibitions?id=${exhibition.exhibition_id}`)
        })

	};

	return (
		<main style={{ backgroundColor: colour }}>
			<h1>Create Exhibition</h1>
			<form id="create-exhibition-form" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title:</label>
					<input type="text" id="title" onChange={handleTitleChange} value={title} />
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
		</main>
	);
};
