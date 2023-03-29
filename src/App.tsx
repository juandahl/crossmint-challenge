import config from "config/environmentKeys";
import PolyanetCross from "pages/polyanetCross";
import { Suspense } from "react";
import { GridRepository } from "services/GridRepository";

const gridRepository = new GridRepository();

function App() {
	const candidateId = config.api.candidateId;

	if (!candidateId) {
		return <div>Loading...</div>;
	}

	return (
		<Suspense fallback={<div>loading...</div>}>
			<PolyanetCross gridRepository={gridRepository} candidateId={candidateId} />
		</Suspense>
	);
}

export default App;
