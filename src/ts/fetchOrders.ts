import axios from 'axios'
import {
  createOption,
  createBitFlyerUrl
} from './utils'

const targetPath = '/v1/me/getchildorders'
const url = createBitFlyerUrl([targetPath])

const options = createOption('GET', targetPath, '')
axios.get(url, options)
    .then((ret) => {
      const orders = ret.data.filter((data) => {
        return data.child_order_state === 'ACTIVE'
      })
      console.log(orders)
    })
    .catch((err) => {
      console.error(err.config.data)
    })