import * as fs from 'fs';
import * as path from 'path';

export const ValidEntity = (mo: string, entity: string | string[]) => {
  if (Array.isArray(entity)) {
    const errEnty = entity.filter((entity) => {
      console.log(
        path.join(path.resolve(), 'src', 'modules', mo, 'entitys', entity),
      );
      console.log(
        fs.existsSync(
          path.join(path.resolve(), 'src', 'modules', mo, 'entitys', entity),
        ),
      );

      const resp = !fs.existsSync(
        path.join(path.resolve(), 'src', 'modules', mo, 'entitys', entity),
      );

      console.log('resp', resp);

      return resp;
    });

    console.log('errEnty', errEnty);

    if (errEnty.length)
      throw new Error(
        `the ${errEnty.length > 1 ? 'entitys' : 'entity'} ${errEnty.join(
          ' ',
        )} no exists`,
      );

    return true;
  }

  const errEnty = fs.existsSync(
    path.join(path.resolve(), 'src', 'modules', mo, 'entitys', entity),
  );

  if (errEnty) throw new Error(`the entity ${errEnty} no existing`);

  return true;
};

export const formatEntity = (entity: string | string[]) => {
  if (Array.isArray(entity)) {
    return entity.map((entity) => `${entity}.entity.ts`);
  }

  return [`${entity}.entity.ts`];
};
