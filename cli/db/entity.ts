/** @format */

import { exec } from 'child_process';
import { getFlag } from '../functions/Flag';
import * as fs from 'fs';
import * as path from 'path';
import { getList } from '../functions/Name';

(() => {
  try {
    const names = getList(process.argv);

    const mo = getFlag(process.argv, 'mo');
    if (Array.isArray(mo)) throw new Error('mo must be a string');

    const validMo = fs.existsSync(
      path.join(path.resolve(), 'src', 'modules', mo),
    );

    if (!validMo) new Error('mo is requier');

    names.forEach((name) => {
      const dirEntity = path.join(
        path.resolve(),
        'src',
        'modules',
        mo,
        'entitys',
        name,
      );
      const dirDTO = path.join(
        path.resolve(),
        'src',
        'modules',
        mo,
        'dtos',
        name,
      );

      exec(`pnpm typeorm entity:create ${dirDB}DB`, () => {
        exec(`mv -f ${dirDB}Entiry.ts ${dirDB}.entiry.ts`);
      });

      exec(`pnpm typeorm entity:create ${dirDTO}DTO`, () => {
        exec(`mv -f ${dirDTO}DTO.ts ${dirDTO}.dto.ts`, () => {
          fs.unlinkSync(`${dirDTO}.dto.ts`);

          const doc = `export class ${name}DTO {}`;

          fs.writeFileSync(`${dirDTO}.dto.ts`, doc);
        });
      });
    });
  } catch (error) {
    console.log('error', error.message);
  }
})();
