import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
	ExhibitionPayload,
	PageLoadingContextInterface,
	UserContextInterface,
} from "../../interfaces";
import { HexColorPicker } from "react-colorful";
import { postExhibition } from "../../utils/api-utils";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "./LoadingPage";
import { PageLoadingContext } from "../../contexts/PageLoadingContext";

export const CreateExhibitionPage = () => {
	const [colour, setColour] = useState("#aabbcc");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;

	const pageLoadingContext: PageLoadingContextInterface | undefined =
		useContext(PageLoadingContext);
	const { pageLoading, setPageLoading } = pageLoadingContext!;

	const navigate = useNavigate();

	useEffect(() => {
		setPageLoading(false);
	});

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

	return pageLoading ? (
		<LoadingPage />
	) : (
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
							required
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
