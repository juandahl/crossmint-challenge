import { GridRepository } from "services/GridRepository";

export const enum Types {
	"SPACE" = "SPACE",
	"POLYANET" = "POLYANET",
	"COMETH" = "COMETH",
	"SOLOON" = "SOLOON",
}

export const enum EndpointType {
	"SPACE" = "SPACE",
	"POLYANET" = "polyanets",
	"COMETH" = "comeths",
	"SOLOON" = "soloons",
}

export const enum ApiCellState {
	"SPACE" = "SPACE",
	"POLYANET" = "POLYANET",
	"RIGHT_COMETH" = "RIGHT_COMETH",
	"LEFT_COMETH" = "LEFT_COMETH",
	"UP_COMETH" = "UP_COMETH",
	"DOWN_COMETH" = "DOWN_COMETH",
	"BLUE_SOLOON" = "BLUE_SOLOON",
	"PURPLE_SOLOON" = "PURPLE_SOLOON",
	"RED_SOLOON" = "RED_SOLOON",
	"WHITE_SOLOON" = "WHITE_SOLOON",
}

export type CellTypes = keyof typeof Types;
type EndpointCellTypes = (typeof EndpointType)[keyof typeof EndpointType];

export interface BaseCell {
	row: number;
	column: number;
	type: CellTypes;
	apiEndpoint?: EndpointCellTypes;
	isValid: (adjacents: BaseCell[]) => boolean;
	activateCell: (gridRepository: GridRepository, candidateId: string) => Promise<void>;
}

export interface SpaceCell extends BaseCell {
	type: Types.SPACE;
}

export interface PolyanetCell extends BaseCell {
	type: Types.POLYANET;
	apiEndpoint: EndpointType.POLYANET;
}

export interface ComethCell extends BaseCell {
	type: Types.COMETH;
	apiEndpoint: EndpointType.COMETH;
	direction: string;
}

export interface SoloonCell extends BaseCell {
	type: Types.SOLOON;
	apiEndpoint: EndpointType.SOLOON;
	color: string;
}

export type Cell = SpaceCell | PolyanetCell | ComethCell | SoloonCell;
