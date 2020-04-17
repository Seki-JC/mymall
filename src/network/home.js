import {request} from "network/request"

export function getHomeMultidata() {
    return request({
        url: 'data/home.json',
        method: 'get'
      })
}