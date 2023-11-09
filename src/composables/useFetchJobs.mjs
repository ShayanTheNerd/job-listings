export default async function useFetchJobs(requestURL) {
	let jobs = JSON.parse(localStorage.getItem('jobs'));

	if (jobs) return jobs;

	const response = await fetch(requestURL);
	jobs = await response.json();
	localStorage.setItem('jobs', JSON.stringify(jobs));

	return jobs;
}
