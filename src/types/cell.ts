export enum Types {
	"SPACE" = "SPACE",
	"POLYANET" = "POLYANET",
	"COMETH" = "COMETH",
	"SOLOON" = "SOLOON",
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

export interface BaseCell {
	row: number;
	column: number;
	type: CellTypes;
	isValid: (adjacents: BaseCell[]) => boolean;
}

export interface SpaceCell extends BaseCell {
	type: Types.SPACE;
}

export interface PolyanetCell extends BaseCell {
	type: Types.POLYANET;
}

export interface ComethCell extends BaseCell {
	type: Types.COMETH;
	direction: string;
}

export interface SoloonCell extends BaseCell {
	type: Types.SOLOON;
	color: string;
}

export type Cell = SpaceCell | PolyanetCell | ComethCell | SoloonCell;
