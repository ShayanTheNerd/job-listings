const defaultOptions = {
	currency: 'USD',
	style: 'currency',
	maximumFractionDigits: 0,
};

export const useFormatNumber = options => {
	const formatNumber = value => {
		const number = options?.style === 'percent' ? value / 100 : value; // 25 == 2500% => 0.25 == 25%

		return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(number);
	};

	return { formatNumber };
};
