import * as fs from 'fs';
import * as path from 'path';

export const ValidMo = (mo: string | string[]) => {
  if (Array.isArray(mo)) {
    const errMo = mo.filter((mo) => {
      const resp = !fs.existsSync(
        path.join(path.resolve(), 'src', 'modules', mo),
      );

      return resp;
    });

    if (errMo.length)
      throw new Error(
        `the ${errMo.length > 1 ? 'modules' : 'module'} ${errMo.join(
          ' ',
        )} no exists`,
      );

    return true;
  }

  const errMo = fs.existsSync(path.join(path.resolve(), 'src', 'modules', mo));

  if (errMo) throw new Error(`the module ${errMo} no existing`);

  return true;
};
