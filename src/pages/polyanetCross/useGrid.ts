import { useQuery } from "react-query";
// Services
import { GridRepository } from "services/GridRepository";
// Types
import { GridState } from "types/grid";

interface UseGridResponse {
	grid: GridState | null | undefined;
	isLoading: boolean;
}

/**
 * Retrieves the grid state from the API
 * @param gridRepository
 * @param candidateId
 * @returns UseGridResponse
 */
const useGrid = (gridRepository: GridRepository, candidateId: string): UseGridResponse => {
	const { data, isLoading } = useQuery("getGrid", () =>
		gridRepository.getCurrentState({
			candidateId,
		})
	);

	return { grid: data, isLoading };
};

export default useGrid;
