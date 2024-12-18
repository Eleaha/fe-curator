import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserIdProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserIdProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserIdProvider>
	</StrictMode>
);
