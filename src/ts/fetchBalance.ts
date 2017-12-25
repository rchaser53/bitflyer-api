import * as ArgParse from 'argparse'
import axios from 'axios'
import {
    createArgOptions,
    createBitFlyerUrl,
    createOption,
    ArgumentConfig
} from './utils'

export const getBalances = (payload, keys) => {
    return keys.reduce((stack, key) => {
        stack[key] = getBalance(payload, key)
        return stack
    }, {})
}

export const getBalance = (payload, key) => {
    return payload.find((balance) => {
        return balance.currency_code === key
    })
}

export const createFetchBalances = (request) => {
    return async (url, options, balances) => {
        try {
            const fetchObj = await request(url, options)
            return getBalances(fetchObj.data, balances)
        } catch (err) {
            throw new Error(err)
        }
    }
}

export const convertToCurrencyFormat = (currencies: string | string[]): string[] => {
    if (!Array.isArray(currencies)) {
        currencies = currencies.split(',')
        if (currencies.length < 1) throw new Error(ErrorMessage.SplitError)
    }
    return currencies
}

const argumentConfig: ArgumentConfig[] = [
    {
        commands: ['--currency', '-c'],
        defaultValue: [ 'JPY', 'BTC' ]
    }
]
const argOptions = createArgOptions(new ArgParse.ArgumentParser({}), argumentConfig)
enum ErrorMessage {
    SplitError = 'should use comma "," to split'
}

let currency = convertToCurrencyFormat(argOptions.currency || argOptions.c)

const targetPath = '/v1/me/getbalance'
const url = createBitFlyerUrl([targetPath])
const options = createOption('GET', targetPath, '')

export const fetchBalances = createFetchBalances(axios.get)
fetchBalances(url, options, currency)
    .then((balances) => {
        console.log(balances)
    })
    .catch((err) => {
        console.error(err)
    })