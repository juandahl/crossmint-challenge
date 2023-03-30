// Services
import { GridRepository } from "services/GridRepository";
// Types
import { Cell, Types } from "types/cell";
import { GridState } from "types/grid";

type IsValidGrid = [false, Cell] | [true];

/**
 * Given a grid and a cell, return an array with all adjacent cells to the input cell
 * @param {GridState} grid - The grid to get the adjacent cells from
 * @param {Cell} cell - The cell to get the adjacent cells from
 * @returns {Array<Cell>} An array containing all adjacent cells to the input cell
 */
export const getAdjacents = <T = Cell>(matrix: T[][], row: number, column: number): T[] => {
	const rows = matrix.length;
	const cols = matrix[0].length;

	const adjacents = [];

	for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
		for (let j = Math.max(0, column - 1); j <= Math.min(cols - 1, column + 1); j++) {
			if (i !== row || j !== column) {
				adjacents.push(matrix[i][j]);
			}
		}
	}

	return adjacents;
};

/**
 * Given a grid, validate all its cells and return either a boolean indicating if the grid is valid or an array with the first invalid cell found
 * @param {GridState} grid - The grid to validate
 * @returns {IsValidGrid} An array representing either a valid grid or the first invalid cell found
 */
export const validateGrid = (grid: GridState): IsValidGrid => {
	for (const rows of grid) {
		for (const cell of rows) {
			const adjacents = getAdjacents(grid, cell.row, cell.column);
			if (!cell.isValid(adjacents)) {
				return [false, cell];
			}
		}
	}

	return [true];
};

/**
 * Given a grid, validate all its cells and return either a boolean indicating if the grid is valid or an array with the first invalid cell found
 * @param {GridState} grid - The grid to validate
 * @returns {IsValidGrid} An array representing either a valid grid or the first invalid cell found
 */
export const completeGrid = async (
	goal: GridState,
	gridRepository: GridRepository,
	candidateId: string
): Promise<void> => {
	try {
		let n = 0;
		await Promise.all(
			goal.map((rows: Cell[]) =>
				rows.map(async (cell: Cell) => {
					n++;

					// That is to avoid extra call to the API. The best practice should be to call delete endpoint
					// I considered like the map started all completed with spaces
					if (cell.type === Types.SPACE) {
						return Promise.resolve();
					}

					const promise = new Promise((resolve) => {
						setTimeout(() => {
							resolve(cell.activateCell(gridRepository, candidateId));
						}, 350 * n);
					});

					return await promise;
				})
			)
		);
	} catch (error) {
		return Promise.reject(error);
	}
};
