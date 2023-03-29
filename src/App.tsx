import config from "config/environmentKeys";
import AutomaticCrossmint from "pages/automaticCrossmint/automaticCrossmint";
import PolyanetCross from "pages/polyanetCross";
import { GridRepository } from "services/GridRepository";

const gridRepository = new GridRepository();

const PHASE: 1 | 2 = 2;

function App() {
	const candidateId = config.api.candidateId;

	if (!candidateId) {
		return <div>Loading...</div>;
	}

	return (
		<>
			{PHASE === 1 && <PolyanetCross gridRepository={gridRepository} candidateId={candidateId} />}
			{PHASE === 2 && (
				<AutomaticCrossmint gridRepository={gridRepository} candidateId={candidateId} />
			)}
		</>
	);
}

export default App;
