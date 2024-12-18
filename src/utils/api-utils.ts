import axios from "axios";

const client = axios.create({
	baseURL: "https://dev-curator.onrender.com/api/",
});

export const getPieces = (searchTerm: string) => {
	return client.get(`pieces/${searchTerm}`).then((response) => {
		return response.data;
	});
};

export const getPiece = (institutionId: number, pieceId: string) => {
	return client.get(`pieces/${institutionId}/${pieceId}`).then((response) => {
		return response.data
	});
};

export const getExhibitions = () => {
	return client.get("exhibitions").then((response) => {
		return response.data;
	});
};

export const getExhibitionsByUser = (userId: number) => {
	return client.get(`exhibitions/user/${userId}`).then((response) => {
		return response.data;
	});
};

export const getExhibition = (exhibitionId: number) => {
	return client.get(`exhibitions/${exhibitionId}`).then((response) => {
		return response.data;
	});
};
