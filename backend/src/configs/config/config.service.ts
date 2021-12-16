import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as clc from 'cli-color';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    private readonly envConfig: {[key: string]: string}

    constructor(filePath: string){
        try {
            this.envConfig = dotenv.parse(fs.readFileSync(filePath));
        } catch (error) {
            console.debug(`File (${filePath}) not found in environment: ${process.env.NODE_ENV}`)
        }
    }

    public get (key: string): string {
        const value: string = this.envConfig[key];
        console.debug(`Environmet variable ${clc.yellow(key)}: ${clc.blackBright(clc.bgWhiteBright(value))}`);
        return value;
    }
}
