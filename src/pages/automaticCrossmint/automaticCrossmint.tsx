/* eslint-disable @typescript-eslint/no-misused-promises */
import "./AutomaticCrossmint.css";

import React from "react";
import { GridRepository } from "services/GridRepository";
import { completeGrid, validateGrid } from "utils/grid";

import useGetGoal from "./useGetGoal";

interface AutomaticCrossmintProps {
	gridRepository: GridRepository;
	candidateId: string;
}

const AutomaticCrossmint: React.FC<AutomaticCrossmintProps> = ({ gridRepository, candidateId }) => {
	const { grid } = useGetGoal(gridRepository, candidateId);
	const [cellError, setCellError] = React.useState<string | undefined>();
	const [successMessage, setSuccessMessage] = React.useState<string | undefined>();

	const handleValidate = () => {
		if (!grid) {
			setCellError("No grid found");

			return;
		}

		const [isValid, cell] = validateGrid(grid);
		if (!isValid) {
			const message = `There is an error in the row ${cell.row} and ${cell.column}`;
			setCellError(message);
		} else {
			setSuccessMessage("The goal board is valid to be completed");
		}
	};

	const handleComplete = async (): Promise<void> => {
		if (!grid) {
			setCellError("No grid found");

			return Promise.resolve();
		}
		try {
			await completeGrid(grid, gridRepository, candidateId);
			setSuccessMessage("The goal board was successfully completed");
		} catch (err: any) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			setCellError(err.message as string);
		}
	};

	return (
		<div className="root">
			<p>{cellError}</p>
			<p>{successMessage}</p>

			<div className="button-container">
				<button className="btn-primary" onClick={handleValidate}>
					Validate
				</button>
				<button className="btn-secondary" onClick={handleComplete}>
					Complete
				</button>
			</div>
		</div>
	);
};

export default AutomaticCrossmint;
