const STORAGE_KEY = 'jobs';
const REQUEST_URL = '/jobs.json';

export default async function useGetJobs() {
	const localStorageJobs = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (localStorageJobs) return localStorageJobs;

	const response = await fetch(REQUEST_URL);
	const fetchedJobs = await response.json();
	localStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedJobs));
	return fetchedJobs;
}
