// Config
import config from "config/environmentKeys";
// Entities
import { createGrid } from "entities/grid";
// Types
import { ApiGridState, GridState } from "types/grid";

interface GetCurrentStateInput {
	candidateId: string;
}

interface PostActiveCellInput {
	candidateId: string;
	row: number;
	column: number;
}

interface DeleteCellInput {
	candidateId: string;
	row: number;
	column: number;
}

interface GridStateApi {
	map: {
		id: string;
		content: ApiGridState;
	};
}

export class GridRepository {
	private readonly baseUrl: string;
	constructor(url = config.api.url) {
		this.baseUrl = url;
	}

	/**
	 * Retrieves the current state of the grid
	 * @param input - candidate id
	 * @returns GridState
	 */
	async getCurrentState(input: GetCurrentStateInput): Promise<GridState | null> {
		try {
			const url = `${this.baseUrl}/map/${input.candidateId}`;
			const data = await fetch(url);
			const { map: grid } = (await data.json()) as GridStateApi;

			return createGrid(grid.content);
		} catch (err) {
			return null;
		}
	}

	/**
	 * Retrieves the goal state of the grid
	 * @param input - candidate id
	 * @returns GridState
	 */
	async getGoalState(input: GetCurrentStateInput): Promise<GridState | null> {
		try {
			const url = `${this.baseUrl}/map/${input.candidateId}/goal`;
			const data = await fetch(url);
			const { map: grid } = (await data.json()) as GridStateApi;

			return createGrid(grid.content);
		} catch (err) {
			return null;
		}
	}

	/**
	 * Change the state of the cell to active
	 * @param input - candidate id, row and column
	 * @returns void
	 */
	async postActiveCell(input: PostActiveCellInput): Promise<void> {
		try {
			const url = `${this.baseUrl}/polyanets`;
			await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(input),
			});
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}

	/**
	 * Change the state of the cell to inactive
	 * @param input - candidate id, row and column
	 * @returns void
	 */
	async deleteCell(input: DeleteCellInput): Promise<void> {
		try {
			const url = `${this.baseUrl}/polyanets`;
			await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(input),
			});
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}
}
