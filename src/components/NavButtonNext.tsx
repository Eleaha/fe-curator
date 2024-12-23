import { useNavigate, useLocation } from "react-router-dom";

export const NavButtonNext = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const params = new URLSearchParams(location.search);
	const currentPage: string = params.get("page") || "1";

	const handleNextPage = () => {
		const nextPage: string = (+currentPage! + 1).toString();
		params.set("page", nextPage);
		navigate(`${location.pathname}?${params.toString()}`, { replace: true });
	};

	return <button className="nav-button next" onClick={handleNextPage}>Next Page</button>;
};
