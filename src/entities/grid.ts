import { ApiCellState, Cell, CellTypes } from "types/cell";

import { cellFactory } from "./cell";

/**
 * Create a grid Domain
 * @param grid format from API
 */
export const createGrid = (grid: ApiCellState[][]): Cell[][] => {
	const result: Cell[][] = grid.map((row: ApiCellState[], rowIndex: number) =>
		row.map((cell: ApiCellState, columnIndex: number) => {
			let type: string = cell;
			let param = undefined;

			if (cell.includes("_")) {
				[param, type] = cell.split("_");
			}

			return cellFactory.create(
				{
					row: rowIndex,
					column: columnIndex,
				},
				type as CellTypes,
				param
			);
		})
	);

	return result;
};
