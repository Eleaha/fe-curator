import { useContext, useEffect, useState } from "react";
import { getExhibition } from "../../utils/api-utils";
import { Exhibition, UserContextInterface } from "../../interfaces";

import { useSearchParams } from "react-router-dom";
import { ExhibitionPieceCard } from "../ExhibitionPieceCard";
import { UserContext } from "../../contexts/UserContext";
import { EditButton } from "../EditButton";

export const ExhibitionPage = () => {
	const userContext: UserContextInterface | undefined = useContext(UserContext);
	const userId = userContext!.user.user_id;

	const [searchParams] = useSearchParams();
	const exhibitionId: string | null = searchParams.get("id") || null;

	const [exhibition, setExhibition] = useState<Exhibition | null>(null);
	const [editing, setEditing] = useState<boolean>(false);

	useEffect(() => {
		if (exhibitionId !== null) {
			getExhibition(+exhibitionId).then(({ exhibition }) => {
				setExhibition(exhibition);
			});
		}
	}, []);
	
	//add edit button
	//set state to editing
	//can delete pieces from exhibition page
	//state passed to exhibition piece cards
	//they then display individual edit buttons
	//can edit description or set it to the pieces description

	return (
		<main
			className="page"
			style={
				exhibition !== null ? { backgroundColor: exhibition!.bg_colour } : undefined
			}
		>
			{exhibition !== null ? (
				<div>
					<h1>{exhibition.title}</h1>
					{userId === exhibition.user_id ? (
						<EditButton editing={editing} setEditing={setEditing}/>
					) : null}

					<p>{exhibition.description}</p>
					{exhibition.pieces!.map((exhibitionPiece) => {
						return (
							<ExhibitionPieceCard
								exhibitionPiece={exhibitionPiece}
								key={exhibitionPiece.id}
								editing={editing}
							/>
						);
					})}
				</div>
			) : null}
		</main>
	);
};
