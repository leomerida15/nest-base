declare const mailConfig: () => {
    key: string;
    sender: {
        name: string;
        email: string;
    };
};
export default mailConfig;
