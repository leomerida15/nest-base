import jwt from "jsonwebtoken";
declare type RespJwtConfig = () => {
    key: jwt.Secret;
    options: jwt.SignOptions;
};
declare const jwtConfig: RespJwtConfig;
export default jwtConfig;
