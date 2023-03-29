const keys = process.env;

const config = {
	api: {
		url: keys.REACT_APP_API_URL ?? "http://localhost/5000/api",
		candidateId: keys.REACT_APP_CANDIDATE_ID,
	},
};

export default config;
