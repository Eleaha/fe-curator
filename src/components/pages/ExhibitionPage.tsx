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

	return (
		<main className="page" id="exhibition-page">
			<div
				className="exhibition-background"
				style={
					exhibition !== null
						? { backgroundColor: exhibition!.bg_colour }
						: undefined
				}
			></div>
			{exhibition !== null ? (
				<div>
					<div className="page-info">
						<h1 className="page-title">{exhibition.title}</h1>
						<p>{exhibition.description}</p>
						{userId === exhibition.user_id ? (
							<EditButton editing={editing} setEditing={setEditing} />
						) : null}
					</div>
					<div className="page-content">
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
				</div>
			) : null}
		</main>
	);
};
