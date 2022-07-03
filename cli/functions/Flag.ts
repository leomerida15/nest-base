/** @format */

export function getFlag(argv: string[], flag: string): string {
	const data = argv.slice(2);

	const item = data.find((item) => item.includes(`${flag}=`));

	if (!item) return "";

	const resp = item.replace(`${flag}=`, "");

	return resp;
}
