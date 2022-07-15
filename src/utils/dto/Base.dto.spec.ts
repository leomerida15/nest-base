/** @format */

import { validate } from 'class-validator';
import { BaseDTO } from './Base.dto';

describe('BaseDTO test', () => {
  const data = {
    ok: {
      id: 'a987420c-f7c1-4944-b3a8-21cc3769d8ac',
      createdDate: new Date(),
      updatedDate: new Date(),
    },
    err: {
      id: '',
      createdDate: '',
      updatedDate: '',
    },
  };

  it('BaseDTO valid  types ok', async () => {
    const base = new BaseDTO();

    base.id = data.ok.id;
    base.updatedDate = data.ok.updatedDate;
    base.createdDate = data.ok.createdDate;

    const errors = await validate(base);

    expect(errors.length).toBe(0);
  });

  it('BaseDTO valid types err', async () => {
    const base = new BaseDTO();

    base.id = data.err.id;
    base.updatedDate = data.err.updatedDate as any;
    base.createdDate = data.err.createdDate as any;

    const errors = await validate(base);

    expect(errors.length).toBe(3);
  });
});
