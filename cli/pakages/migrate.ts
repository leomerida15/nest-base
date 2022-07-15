import { exec } from 'shelljs';
import prePk from './pre';
import newPk from './new';

const definePk = (prePk, newPk) => {
  const preKeys = Object.keys(prePk);
  const newKeys = Object.keys(newPk);

  const resp = preKeys.filter((pre) => !newKeys.includes(pre));

  return resp;
};

const dependencies = definePk(prePk.dependencies, newPk.dependencies).join(' ');
const devDependencies = definePk(
  prePk.devDependencies,
  newPk.devDependencies,
).join(' ');

console.log('dependencies', dependencies);
console.log('');
console.log('devDependencies', devDependencies);

exec(`pnpm add ${dependencies} && pnpm add ${devDependencies}`);
