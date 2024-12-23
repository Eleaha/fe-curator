import { useLocation, useNavigate } from "react-router-dom";

export const NavButtonBack = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const params = new URLSearchParams(location.search);
	const currentPage: string = params.get("page") || "1";

	const handlePreviousPage = () => {
		const previousPage: string = (+currentPage! - 1).toString();
		params.set("page", previousPage);
		navigate(`${location.pathname}?${params.toString()}`, { replace: true });
	};

	return <button className="nav-button" disabled={+currentPage <= 1 ? true : false} onClick={handlePreviousPage}>Previous Page</button>;
};
