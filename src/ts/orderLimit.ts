import axios from 'axios'
import * as ArgParse from 'argparse'
import {
  createOption,
  createArgOptions,
  createBitFlyerUrl,
  ArgumentConfig
} from './utils'

const argumentConfig: ArgumentConfig[] = [
  {
      commands: ['--code', '-c'],
      defaultValue: 'BTC_JPY'
  },
  { commands: ['--ammount', '-a'] },
  { commands: ['--side', '-s'] },
  { commands: ['--price', '-p'] }
]
const argOptions = createArgOptions(new ArgParse.ArgumentParser({}), argumentConfig)

const product_code = argOptions.code || argOptions.c
const size = parseFloat(argOptions.ammount || argOptions.a)
const side = argOptions.side || argOptions.s
const price = parseInt(argOptions.price || argOptions.p, 10)

const targetPath = '/v1/me/sendchildorder'
const url = createBitFlyerUrl([targetPath])
const body = {
  product_code,
  size,
  side,
  price,
  child_order_type: "LIMIT",
  minute_to_expire: 10000,
  time_in_force: "GTC"
}

const options = createOption('POST', targetPath, JSON.stringify(body))
axios.post(url, body, options)
    .then((ret) => {
      if (ret.status === 200) {
        console.log(ret.data.child_order_acceptance_id || ret.data.child_order_id)
      }
    })
    .catch((err) => {
      console.error(err.config.data)
    })