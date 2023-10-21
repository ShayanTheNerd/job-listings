export const useDate = () => {
	const now = new Date();
	const currentMachineDate = now.toISOString().split('T')[0];
	const currentDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });

	return { currentMachineDate, currentDate };
};
