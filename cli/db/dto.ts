/** @format */

import { exec } from 'child_process';
import { formatEntity, ValidEntity } from '../functions/entity';
import { getFlag, getFlagOptional } from '../functions/Flag';
import { ValidMo } from '../functions/Modules';
import * as fs from 'fs';
import * as path from 'path';

(() => {
  try {
    const moOrigin = getFlag(process.argv, 'moOrigin');
    if (Array.isArray(moOrigin)) throw new Error('moOrigin must be a string');

    const moDestinys = getFlagOptional(process.argv, 'moDestinys') ?? moOrigin;

    const entitys = formatEntity(getFlag(process.argv, 'entitys'));

    const mos = (() => {
      if (Array.isArray(moDestinys)) return [moOrigin, ...moDestinys];
      return [moOrigin, moDestinys];
    })();

    ValidMo(mos);

    ValidEntity(moOrigin, entitys);

    entitys.map((fileName) => {
      const entity = fs.readFileSync(
        path.join(
          path.resolve(),
          'src',
          'modules',
          moOrigin,
          'entitys',
          fileName,
        ),
      );
      const obj = entity.toString();
      const resp = obj
        .split(`import`)
        .find((item) => item.includes('typeorm'))
        .split('')
        .filter(
          (item) =>
            !['{', '}', 'from', 'typeorm', `'`, '\n', ',', ';'].includes(item),
        )
        .join('')
        .split(' ')
        .filter((item) => !['from', 'typeorm', ' ', ''].includes(item))
        .reduce((pre, item) => {
          const re = new RegExp(item, 'i');
          return pre.replace(re, '');
        }, obj);
      // .join();

      console.log('resp', resp);
      // console.log('obj', obj);
    });

    // await Promise.all(stop);
    //
  } catch (error) {
    console.log('error', error.message);
  }
})();
