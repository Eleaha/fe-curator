import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/pages/Home";
import { Header } from "./components/Header";
import { BrowseExhibitions } from "./components/pages/BrowseExhibition";
import { MyExhibitions } from "./components/pages/MyExhibitions";
import { BrowsePieces } from "./components/pages/BrowsePieces";
import { ExhibitionPage } from "./components/pages/ExhibitionPage";
import { PiecePage } from "./components/pages/PiecePage";

function App() {
	return (
		<main>
			<Header></Header>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/browse-pieces" element={<BrowsePieces />}></Route>
				<Route path="/browse-exhibitions" element={<BrowseExhibitions />}></Route>
				<Route path="/exhibitions" element={<ExhibitionPage />}></Route>
				<Route path="/my-exhibitions" element={<MyExhibitions />}></Route>
				<Route path="/piece" element={<PiecePage />}></Route>
			</Routes>
		</main>
	);
}

export default App;
