import { createContext, useState } from "react";
import { UserContextInterface } from "../interfaces";

export const UserContext = createContext<UserContextInterface | undefined>(
	undefined
);

export const UserIdProvider = ({ children }: any) => {
	const [user, setUser] = useState({ user_id: 2, username: "eleaha2021" });
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
