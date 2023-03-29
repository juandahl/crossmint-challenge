import { Cell } from "types/cell";
import { GridState } from "types/grid";

type IsValidGrid = [false, Cell] | [true];

/**
 * Given a grid and a cell, return an array with all adjacent cells to the input cell
 * @param {GridState} grid - The grid to get the adjacent cells from
 * @param {Cell} cell - The cell to get the adjacent cells from
 * @returns {Array<Cell>} An array containing all adjacent cells to the input cell
 */
const getAdjacents = (grid: GridState, cell: Cell) => {
	const numRows = grid.length;
	const numCols = grid[0].length;
	const result = [];
	const { row, column } = cell;

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			const newRow = row + i;
			const newCol = column + j;
			if (
				newRow >= 0 &&
				newRow < numRows &&
				newCol >= 0 &&
				newCol < numCols &&
				!(i === 0 && j === 0)
			) {
				result.push(grid[newRow][newCol]);
			}
		}
	}

	return result;
};

/**
 * Given a grid, validate all its cells and return either a boolean indicating if the grid is valid or an array with the first invalid cell found
 * @param {GridState} grid - The grid to validate
 * @returns {IsValidGrid} An array representing either a valid grid or the first invalid cell found
 */
export const validateGrid = (grid: GridState): IsValidGrid => {
	for (const rows of grid) {
		for (const cell of rows) {
			const adjacents = getAdjacents(grid, cell);
			if (!cell.isValid(adjacents)) {
				return [false, cell];
			}
		}
	}

	return [true];
};
