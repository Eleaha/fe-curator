import { useEffect, useState } from "react";
import { getExhibition } from "../../utils/api-utils";
import { Exhibition } from "../../interfaces";

import { useSearchParams } from "react-router-dom";
import { ExhibitionPieceCard } from "../ExhibitionPieceCard";

export const ExhibitionPage = () => {
	const [searchParams] = useSearchParams();
	const exhibitionId: string | null = searchParams.get("id") || null;

	const [exhibition, setExhibition] = useState<Exhibition | null>(null);

	useEffect(() => {
		if (exhibitionId !== null) {
			getExhibition(+exhibitionId).then(({ exhibition }) => {
				setExhibition(exhibition);
			});
		}
	}, []);

	return (
		<div
			className="page"
			style={
				exhibition !== null ? { backgroundColor: exhibition!.bg_colour } : undefined
			}
		>
			{exhibition !== null ? (
				<div>
					<h1>{exhibition.title}</h1>
					<p>{exhibition.description}</p>
					{exhibition.pieces!.map((exhibitionPiece) => {
						return <ExhibitionPieceCard exhibitionPiece={exhibitionPiece}/>;
					})}
				</div>
			) : null}
		</div>
	);
};
