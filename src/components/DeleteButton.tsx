import { Dispatch, SetStateAction, useState } from "react";

interface DeleteButtonProps {
	deleteApiFunction: Function;
	deleteId: number;
	setDeleted: Dispatch<SetStateAction<boolean>>;
}

export const DeleteButton = ({
	deleteApiFunction,
	deleteId,
	setDeleted,
}: DeleteButtonProps) => {
	const [deleting, setDeleting] = useState(false);

	const handleDeleteClick = () => {
		setDeleting(!deleting);
	};

	const handleYesDeleteButtonClick = () => {
		deleteApiFunction(+deleteId).then(() => {
			setDeleted(true);
		});
	};

	const handleNoDeleteButtonClick = () => {
		setDeleting(false);
	};

	return (
		<div>
			<button onClick={handleDeleteClick}>🚮</button>
			{deleting ? (
				<div>
					<p>Do you really want to delete?</p>
					<button id="yes-delete" onClick={handleYesDeleteButtonClick}>
						Yes
					</button>
					<button id="no-delete" onClick={handleNoDeleteButtonClick}>
						No
					</button>
				</div>
			) : null}
		</div>
	);
};
