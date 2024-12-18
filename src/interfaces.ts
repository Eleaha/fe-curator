export interface UserContext {
	userId: number;
	setUserId: (value: number) => void;
}
export interface User {
	user_id: number;
	username: string;
}
export interface Exhibition {
	exhibition_id: number;
	user_id: number;
	title: string;
	description: string;
	bg_colour: string;
	pieces?: ExhibitionPiece[];
}

export interface ExhibitionPiece {
	exhibition_id: number;
	id: number;
	img_url: string;
	institution_id: number;
	note: string;
	piece_id: string;
	piece_index: number;
}

export interface Piece {
	title: string;
	institution_id: string;
	piece_id: string;
	maker: string;
	img_url: string;
	date: string;
	material?: string | undefined;
	description?: string | undefined;
}

export interface ExhibitionPayload {
	user_id: number;
	title: string;
	description: string;
	bg_colour: string;
}

export interface ExhibitionUpdatePayload {
	title?: string;
	description?: string;
	bg_colour?: string;
}

export interface ExhibitionPiecePayload {
	institution_id: number;
	piece_id: string;
	piece_index?: number;
	img_url: string;
	note?: string;
}
