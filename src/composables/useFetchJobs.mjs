export default async function useFetchJobs() {
	let jobs = JSON.parse(localStorage.getItem('jobs'));

	if (jobs) return jobs;

	jobs = await fetch('/jobs.json').then(response => response.json());
	localStorage.setItem('jobs', JSON.stringify(jobs));
	return jobs;
}
