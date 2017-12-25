import axios from 'axios'
import * as ArgParse from 'argparse'
import {
  createOption,
  createBitFlyerUrl,
  createArgOptions,
  ArgumentConfig
} from './utils'

const argumentConfig: ArgumentConfig[] = [
  {
      commands: ['--code', '-c'],
      defaultValue: 'BTC_JPY'
  },
  { commands: ['--id', '-i'] }
]
const argOptions = createArgOptions(new ArgParse.ArgumentParser({}), argumentConfig)

const product_code = argOptions.code || argOptions.c
const id = argOptions.id || argOptions.i

const targetPath = '/v1/me/cancelchildorder'
const url = createBitFlyerUrl([targetPath])

const body = {
  product_code,
  child_order_acceptance_id: id
}

const options = createOption('POST', targetPath, JSON.stringify(body))
axios.post(url, body, options)
    .then((ret) => {
      console.log(`order: "${id}" cancel succeed`)
    })
    .catch((err) => {
      console.error(err.config.data)
    })