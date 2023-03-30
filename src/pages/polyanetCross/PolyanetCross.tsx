import "./PolyanetCross.css";

import React from "react";
// Services
import { GridRepository } from "services/GridRepository";

// Components
import Cell from "./components/cell";
// Hooks
import useGrid from "./useGrid";

interface PolyanetCrossProps {
	gridRepository: GridRepository;
	candidateId: string;
}

const PolyanetCross: React.FC<PolyanetCrossProps> = ({ gridRepository, candidateId }) => {
	// Hooks
	const { grid, isLoading } = useGrid(gridRepository, candidateId);

	if (isLoading || !grid) {
		// TODO: implement a component
		return <div>loading...</div>;
	}

	return (
		<div className="polyanet-board">
			{grid.map((row, rowIndex) => (
				<div className="row" key={rowIndex}>
					{row.map((cellValue, colIndex) => (
						<Cell
							key={`cell-${rowIndex}-${colIndex}`}
							defaultValue={!!cellValue}
							gridRepository={gridRepository}
							candidateId={candidateId}
							cell={cellValue}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default PolyanetCross;
