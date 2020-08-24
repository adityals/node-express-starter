import { config } from 'dotenv';

// store in memory
const { parsed } = config();

/**
 * get env vale from .env file
 * @param key - key on .env
 */
export const getEnv = (key: string): Object => {
    try {
        if (parsed) {
            return parsed[key];
        }
        return {};
    } catch (err) {
        throw new Error('[env] error when get environmet key');
    }
};
