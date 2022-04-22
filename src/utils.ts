export function parseRequest(id: string) {
  return id.split('?', 2)[0]
}
