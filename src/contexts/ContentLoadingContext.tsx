import { createContext, useState } from "react";
import { ContentLoadingContextInterface } from "../interfaces";

export const ContentLoadingContext = createContext<
	ContentLoadingContextInterface | undefined
>(undefined);

export const ContentLoadingProvider = ({ children }: any) => {
	const [contentLoading, setContentLoading] = useState(false);
	return (
		<ContentLoadingContext.Provider
			value={{
				contentLoading: contentLoading,
				setContentLoading: setContentLoading,
			}}
		>
			{children}
		</ContentLoadingContext.Provider>
	);
};
