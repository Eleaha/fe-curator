import { createContext, useState } from "react";
import { UserContext } from "../interfaces";

export const UserIdContext = createContext<UserContext | undefined>(undefined);

export const UserIdProvider = ({ children }: any) => {
	const [userId, setUserId] = useState(1);
	return (
		<UserIdContext.Provider value={{ userId, setUserId }}>
			{children}
		</UserIdContext.Provider>
	);
};
