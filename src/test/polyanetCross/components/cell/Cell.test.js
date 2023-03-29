import { render, screen } from "@testing-library/react";
import PolyanetCross from "pages/polyanetCross/PolyanetCross";
import { QueryClient, QueryClientProvider } from "react-query";
import { GridRepository } from "services/GridRepository";

const queryClient = new QueryClient();

jest.mock("../../../../services/GridRepository");

describe("Cell Component", () => {
	it("should show the board", async () => {
		const gridRepository = new GridRepository();
		gridRepository.getCurrentState.mockResolvedValue([
			["SPACE", "SPACE"],
			["SPACE", "SPACE"],
		]);

		render(
			<QueryClientProvider client={queryClient}>
				<PolyanetCross candidateId="1" column={0} row={0} gridRepository={gridRepository} />
			</QueryClientProvider>
		);

		const buttons = await screen.findAllByRole("button", { name: /cell/i });
		expect(buttons).toHaveLength(4);
	});
});
