import React from "react";
import { GridRepository } from "services/GridRepository";

import useToggleCellValue from "./useToggleCell";

interface CellProps {
	defaultValue: boolean;
	gridRepository: GridRepository;
	candidateId: string;
	row: number;
	column: number;
}

const Cell: React.FC<CellProps> = ({
	defaultValue = false,
	gridRepository,
	candidateId,
	row,
	column,
}) => {
	const { value, toggleValue } = useToggleCellValue({
		defaultValue,
		gridRepository,
		candidateId,
		row,
		column,
	});

	return (
		<button className="cell" aria-label={`cell-${row}-${column}`} onClick={toggleValue}>
			{value ? 1 : 0}
		</button>
	);
};

export default Cell;
