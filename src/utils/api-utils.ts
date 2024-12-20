import axios from "axios";
import {
	ExhibitionPayload,
	ExhibitionPiecePayload,
	ExhibitionUpdatePayload,
} from "../interfaces";

const client = axios.create({
	baseURL: "https://dev-curator.onrender.com/api/",
});

export const getUserById = (userId: number) => {
	return client.get(`users/${userId}`).then(({ data }) => {
		return data;
	});
};

export const getPieces = (searchTerm: string, page: number) => {
	return client.get(`pieces/${searchTerm}?page=${page}`).then(({ data }) => {
		return data;
	});
};

export const getPiece = (institutionId: number, pieceId: string) => {
	return client.get(`pieces/${institutionId}/${pieceId}`).then(({ data }) => {
		return data;
	});
};

export const getExhibitions = () => {
	return client.get("exhibitions").then(({ data }) => {
		return data;
	});
};

export const getExhibitionsByUser = (userId: number) => {
	return client.get(`exhibitions/user/${userId}`).then(({ data }) => {
		return data;
	});
};

export const getExhibition = (exhibitionId: number) => {
	return client.get(`exhibitions/${exhibitionId}`).then(({ data }) => {
		return data;
	});
};

export const postExhibition = (payload: ExhibitionPayload) => {
	return client.post(`exhibitions`, payload).then(({ data }) => {
		return data;
	});
};

export const patchExhibition = (
	exhibitionId: number,
	payload: ExhibitionUpdatePayload
) => {
	return client
		.patch(`exhibitions/${exhibitionId}`, payload)
		.then(({ data }) => {
			return data;
		});
};

export const deleteExhibition = (exhibitionId: number) => {
	return client.delete(`exhibitions/${exhibitionId}`).then(() => {
		return null;
	});
};

export const postPieceToExhibition = (
	exhibitionId: number,
	payload: ExhibitionPiecePayload
) => {
	return client.post(`exhibitions/${exhibitionId}`, payload).then(({ data }) => {
		return data;
	});
};
