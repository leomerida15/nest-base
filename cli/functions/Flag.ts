/** @format */

export function getFlag(argv: string[], flag: string): string | string[] {
  const data = argv.slice(2);

  const item = data.find((item) => item.includes(`${flag}=`));

  if (!item) throw new Error(`${flag} is requier`);

  const resp = item.replace(`${flag}=`, '');

  if (resp === '') throw new Error(`${flag} is requier`);

  if (resp.includes(',')) return resp.split(',');

  return resp;
}

export function getFlagOptional(
  argv: string[],
  flag: string,
): string | string[] | null {
  try {
    return getFlag(argv, flag);
  } catch (error) {
    return null;
  }
}
