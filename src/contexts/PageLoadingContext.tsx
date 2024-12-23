import { createContext, useState } from "react";
import { PageLoadingContextInterface as PageLoadingContextInterface } from "../interfaces";

export const PageLoadingContext = createContext<
	PageLoadingContextInterface | undefined
>(undefined);

export const PageLoadingProvider = ({ children }: any) => {
	const [pageLoading, setPageLoading] = useState(true);
	return (
		<PageLoadingContext.Provider
			value={{ pageLoading: pageLoading, setPageLoading: setPageLoading }}
		>
			{children}
		</PageLoadingContext.Provider>
	);
};
