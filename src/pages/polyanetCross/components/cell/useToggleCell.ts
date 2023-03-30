import React from "react";
import { useMutation } from "react-query";
// Services
import { GridRepository } from "services/GridRepository";
// Types
import { Cell } from "types/cell";

interface UseToggleCellValueProps {
	gridRepository: GridRepository;
	candidateId: string;
	defaultValue: boolean;
	cell: Cell;
}

interface UseToggleCellValueResponse {
	value: boolean;
	toggleValue: () => void;
	isLoading: boolean;
}

/**
 * Contains the cell state and applies changes to the state using the API
 * @param input - UseToggleCellValueProps
 * @returns UseToggleCellValueResponse
 */
const useToggleCellValue = ({
	cell,
	gridRepository,
	candidateId,
	defaultValue,
}: UseToggleCellValueProps): UseToggleCellValueResponse => {
	const { row, column, apiEndpoint: type } = cell;

	// States
	const [value, setValue] = React.useState(defaultValue);

	// Mutations
	const { isLoading: isLoadinActivate, mutate: callActivate } = useMutation("activateCell", () => {
		if (type) {
			return gridRepository.postActiveCell({
				candidateId,
				row,
				column,
				type,
			});
		}

		return Promise.resolve();
	});

	const { isLoading: isLoadingDelete, mutate: callDelete } = useMutation("deleteCell", () =>
		gridRepository.deleteCell({
			candidateId,
			row,
			column,
		})
	);

	// Handlers
	const toggleValue = () => {
		setValue((prev) => !prev);
		if (value) {
			callDelete();
		} else {
			callActivate();
		}
	};

	return { value, toggleValue, isLoading: isLoadinActivate || isLoadingDelete };
};

export default useToggleCellValue;
