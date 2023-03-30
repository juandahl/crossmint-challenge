/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GridRepository } from "services/GridRepository";
import {
	BaseCell,
	Cell,
	CellTypes,
	ComethCell,
	EndpointType,
	PolyanetCell,
	SoloonCell,
	SpaceCell,
	Types,
} from "types/cell";

interface CellParam extends Partial<BaseCell> {
	row: number;
	column: number;
}

const createSpace = (state: CellParam) => {
	const result: SpaceCell = {
		...state,
		type: Types.SPACE,
		isValid: () => true,
		activateCell: () => Promise.resolve(),
	};

	return result;
};

const createPolyanet = (state: CellParam) => {
	const result: PolyanetCell = {
		...state,
		type: Types.POLYANET,
		apiEndpoint: EndpointType.POLYANET,
		isValid: () => true,
		activateCell: (gridRepository: GridRepository, candidateId: string) => {
			return gridRepository.postActiveCell({
				row: state.row,
				column: state.column,
				type: EndpointType.POLYANET,
				candidateId,
			});
		},
	};

	return result;
};

const createCometh = (state: CellParam, direction: string) => {
	const result: ComethCell = {
		...state,
		type: Types.COMETH,
		apiEndpoint: EndpointType.COMETH,
		direction: direction.toLowerCase(),
		isValid: () => !!direction,
		activateCell: (gridRepository: GridRepository, candidateId) => {
			return gridRepository.postActiveCell({
				row: state.row,
				column: state.column,
				type: EndpointType.POLYANET,
				candidateId,
				direction,
			});
		},
	};

	return result;
};

const createSoloon = (state: CellParam, color: string) => {
	const result: SoloonCell = {
		...state,
		type: Types.SOLOON,
		apiEndpoint: EndpointType.SOLOON,
		color: color.toLowerCase(),
		isValid: (adjacents: BaseCell[]) =>
			adjacents.every((adjCell) => adjCell.type === Types.POLYANET) && !!color,
		activateCell: (gridRepository: GridRepository, candidateId: string) => {
			return gridRepository.postActiveCell({
				row: state.row,
				column: state.column,
				type: EndpointType.POLYANET,
				candidateId,
				color,
			});
		},
	};

	return result;
};

/**
 * // Factory function that creates a cell instance based on the provided type and parameters
 * @param state - current cell state
 * @param type - CellTypes
 * @param param optional parameter depending on the type
 * @returns Cell instance
 */
export const createCell = (state: CellParam, type: CellTypes, param?: string): Cell => {
	switch (type) {
		case Types.SPACE: {
			return createSpace(state);
		}
		case Types.POLYANET: {
			return createPolyanet(state);
		}
		case Types.COMETH: {
			return createCometh(state, param!);
		}
		case Types.SOLOON: {
			return createSoloon(state, param!);
		}
		default: {
			return createSpace(state);
		}
	}
};

export const cellFactory = {
	create: createCell,
};
