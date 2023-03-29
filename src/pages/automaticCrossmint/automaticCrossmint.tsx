import React from "react";
import { GridRepository } from "services/GridRepository";

import useGetGoal from "./useGetGoal";

interface AutomaticCrossmintProps {
	gridRepository: GridRepository;
	candidateId: string;
}

const AutomaticCrossmint: React.FC<AutomaticCrossmintProps> = ({ gridRepository, candidateId }) => {
	const { grid } = useGetGoal(gridRepository, candidateId);

	return (
		<>
			<button onClick={() => alert("anda")}>Validate</button>
			<button>Validate</button>
		</>
	);
};

export default AutomaticCrossmint;
