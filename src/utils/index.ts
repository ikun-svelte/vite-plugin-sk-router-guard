
export * from './constant'
export * from './config'
export * from './types'

export function parseSvelteRequest(id: string) {
  const [filePath] = id.split('?', 2)
  const url = new URL(id, 'http://domain.inspector')
  const query = Object.fromEntries(url.searchParams.entries()) as any
  if (query.svelte != null)
    query.svelte = true

  if (query.src != null)
    query.src = true

  if (query.index != null)
    query.index = Number(query.index)

  if (query.raw != null)
    query.raw = true

  if (query.hasOwnProperty('lang.tsx') || query.hasOwnProperty('lang.jsx'))
    query.isJsx = true

  return {
    filePath,
    query,
  }
}
