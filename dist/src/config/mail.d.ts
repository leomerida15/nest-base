declare const mailConfig: () => {
    key: string;
    sender: {
        name: string;
        email: string;
    };
    jwtRecover: {
        secret: string;
        expiresIn: string;
    };
};
export default mailConfig;
