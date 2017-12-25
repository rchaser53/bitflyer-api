export const urlHandler = (targetPath: string): string => {
  return targetPath.replace(/^\/?/, '/').replace(/\/?$/, '')
}

export const hostHandler = (targetHost: string): string => {
  return targetHost.replace(/\/?$/, '')
}

export const createUrl = (host: string, paths: string[]) => {
  const formatedHost = hostHandler(host)
  return paths.reduce<string>((accumulatedPath, targetPath) => {
    return `${accumulatedPath}${urlHandler(targetPath)}`
  }, formatedHost)
}

export const addQueryAttacher = (url: string): string => {
  return url.replace(/\??$/, '?')
}

export const addQuery = (url: string, queryObj: {[key: string]: any}): string => {
  const baseUrl = addQueryAttacher(url)
  const queryStringArray = Object.keys(queryObj).map((key) => {
    return `${key}=${queryObj[key]}`
  })

  return `${baseUrl}${queryStringArray.join('&')}`
}
