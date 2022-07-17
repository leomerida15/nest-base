/** @format */

import { FuncJwtConfig } from './types';

const jwtConfig: FuncJwtConfig = () => ({
  key: process.env.JWT_KEY,
  options: { expiresIn: process.env.JWT_EXP },
  rtExp: process.env.JWT_RT_EXP,
});

export default jwtConfig;
