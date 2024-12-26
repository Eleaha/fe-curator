import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/pages/Home";
import { Header } from "./components/Header";
import { BrowseExhibitions } from "./components/pages/BrowseExhibition";
import { MyExhibitions } from "./components/pages/MyExhibitions";
import { BrowsePieces } from "./components/pages/BrowsePieces";
import { ExhibitionPage } from "./components/pages/ExhibitionPage";
import { PiecePage } from "./components/pages/PiecePage";
import { CreateExhibitionPage } from "./components/pages/CreateExhibitionPage";
import { ErrorPage } from "./components/pages/ErrorPage";

function App() {
	return (
		<main>
			<Header></Header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/browse-pieces" element={<BrowsePieces />} />
				<Route path="/browse-exhibitions" element={<BrowseExhibitions />} />
				<Route path="/exhibitions" element={<ExhibitionPage />} />
				<Route path="/my-exhibitions" element={<MyExhibitions />} />
				<Route path="/piece" element={<PiecePage />} />
				<Route path="/exhibitions/create" element={<CreateExhibitionPage />} />
				<Route
					path="*"
					element={<ErrorPage errorMessage={"Path not found"} errorCode={404} />}
				/>
			</Routes>
		</main>
	);
}

export default App;
