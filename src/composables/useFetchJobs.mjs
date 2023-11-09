export default async function useFetchJobs(requestURL) {
	let jobs = JSON.parse(localStorage.getItem('jobs'));

	if (jobs) return jobs;

	jobs = await fetch(requestURL).then(response => response.json());
	localStorage.setItem('jobs', JSON.stringify(jobs));
	return jobs;
}
