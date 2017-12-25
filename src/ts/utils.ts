import * as crypto from 'crypto-browserify'

import { createUrl } from './url'
import { apiKeys } from './apiKey'
const { key, secret } = apiKeys.productionKeys

export type HttpMethod = 'GET' | 'POST'
export interface BFOption {
    method: HttpMethod,
    headers: {
        'ACCESS-KEY': string,
        'ACCESS-TIMESTAMP': string,
        'ACCESS-SIGN': string,
        'Content-Type': 'application/json'
    }
}

export const createOption = (method: HttpMethod, path: string, bodyStr: string ): BFOption => {
    const timestamp = Date.now().toString()
    const text = `${timestamp}${method}${path}${bodyStr}`
    const sign = crypto.createHmac('sha256', secret).update(text).digest('hex')

    return {
        method,
        headers: {
            'ACCESS-KEY': key,
            'ACCESS-TIMESTAMP': timestamp,
            'ACCESS-SIGN': sign,
            'Content-Type': 'application/json'
        }
    }
}

export interface ArgumentConfig {
    commands: string[],
    help?: string,
    defaultValue?: any
}

export const addArgument = (parser, argumentConfigs: ArgumentConfig[]): void => {
    argumentConfigs.forEach(({commands, help, defaultValue}) => {
      parser.addArgument(commands, { help, defaultValue})
    })
}

export const createArgOptions = (argParser, argConfigs: ArgumentConfig[]) => {
    addArgument(argParser, argConfigs)
    return argParser.parseArgs()
}

export const createBitFlyerUrl = (targetPath: string[]): string => {
    const base = 'https://api.bitflyer.jp/'
    return createUrl(base, targetPath)
}