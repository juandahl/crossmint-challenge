import React from "react";
// Services
import { GridRepository } from "services/GridRepository";
// Types
import { Cell as TCell } from "types/cell";

import useToggleCellValue from "./useToggleCell";

interface CellProps {
	defaultValue: boolean;
	gridRepository: GridRepository;
	candidateId: string;
	cell: TCell;
}

const Cell: React.FC<CellProps> = ({ defaultValue = false, gridRepository, candidateId, cell }) => {
	const { value, toggleValue } = useToggleCellValue({
		defaultValue,
		gridRepository,
		candidateId,
		cell,
	});

	return (
		<button className="cell" aria-label={`cell-${cell.row}-${cell.column}`} onClick={toggleValue}>
			{value ? 1 : 0}
		</button>
	);
};

export default Cell;
