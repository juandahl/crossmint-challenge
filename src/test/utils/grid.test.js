import { getAdjacents } from "utils/grid";

describe("findAdjacents", () => {
	it("When it is in the middle it returns the 8 neighboards", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		const adjacents = getAdjacents(matrix, 1, 1);

		expect(adjacents).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
	});

	it("When it is in the corner it returns the 3 neighboards", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		const adjacents = getAdjacents(matrix, 0, 0);

		expect(adjacents).toEqual([2, 4, 5]);
	});

	it("When it is in the fisrt row it returns the 5 neighboards", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		const adjacents = getAdjacents(matrix, 0, 1);

		expect(adjacents).toEqual([1, 3, 4, 5, 6]);
	});

	it("When it is in the fisrt column it returns the 5 neighboards", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		const adjacents = getAdjacents(matrix, 1, 0);

		expect(adjacents).toEqual([1, 2, 5, 7, 8]);
	});

	it("When it is in the last column it returns the 5 neighboards", () => {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		const adjacents = getAdjacents(matrix, 1, 2);

		expect(adjacents).toEqual([2, 3, 5, 8, 9]);
	});
});
