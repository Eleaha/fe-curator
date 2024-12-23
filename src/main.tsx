import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserIdProvider } from "./contexts/UserContext.tsx";
import { PageLoadingProvider } from "./contexts/PageLoadingContext.tsx";
import { ContentLoadingProvider } from "./contexts/ContentLoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PageLoadingProvider>
			<ContentLoadingProvider>
				<UserIdProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</UserIdProvider>
			</ContentLoadingProvider>
		</PageLoadingProvider>
	</StrictMode>
);
