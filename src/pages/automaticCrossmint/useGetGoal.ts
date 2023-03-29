import { useQuery } from "react-query";
// Services
import { GridRepository } from "services/GridRepository";
// Types
import { GridState } from "types/grid";

interface UseGetGoalResponse {
	grid: GridState | null | undefined;
	isLoading: boolean;
}

/**
 * Retrieves the grid state from the API
 * @param gridRepository
 * @param candidateId
 * @returns UseGetGoalResponse
 */
const useGetGoal = (gridRepository: GridRepository, candidateId: string): UseGetGoalResponse => {
	const { data, isLoading } = useQuery("getGoal", () =>
		gridRepository.getGoalState({
			candidateId,
		})
	);

	return { grid: data, isLoading };
};

export default useGetGoal;
