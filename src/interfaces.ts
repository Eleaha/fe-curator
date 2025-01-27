export interface UserContextInterface {
	user: User;
	setUser: (value: User) => void;
}
export interface PageLoadingContextInterface {
	pageLoading: boolean;
	setPageLoading: (value: boolean) => void;
}
export interface ContentLoadingContextInterface {
	contentLoading: boolean;
	setContentLoading: (value: boolean) => void;
}

export interface ErrorProps {
	errorMessage: string;
	errorCode: number;
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
	from_date: string;
	to_date: string;
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
	from_date: string;
	to_date: string;
}

export interface ExhibitionUpdatePayload {
	title?: string;
	description?: string;
	bg_colour?: string;
	from_date?: string;
	to_date?: string;
}

export interface ExhibitionPiecePayload {
	institution_id: number;
	piece_id: string;
	piece_index?: number;
	img_url: string;
	note?: string;
}

export interface ExhibitionPieceUpdatePayload {
	note: string | undefined;
}
