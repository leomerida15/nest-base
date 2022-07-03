/** @format */

export function getList(argv: string[]): string[] {
	const data = argv.slice(2);
	const item = data.filter((item) => !item.includes(`=`));

	if (item) return item;

	return [];
}
