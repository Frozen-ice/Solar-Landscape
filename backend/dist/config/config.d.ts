interface Config {
    port: number;
    database: {
        path: string;
    };
    cors: {
        origin: string;
    };
    censusApi: {
        baseUrl: string;
        benchmark: string;
    };
    utilities: {
        validUtilities: readonly string[];
        assistancePrograms: readonly string[];
    };
}
declare const config: Config;
export default config;
