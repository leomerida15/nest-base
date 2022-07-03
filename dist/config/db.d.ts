declare const dbConfig: () => {
    user: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    type: string;
    synchronize: boolean;
    entities: any[];
    cli: {
        entitiesDir: string;
    };
};
export default dbConfig;
