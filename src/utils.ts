export function parseRequest(id: string) {
  const [filename] = id.split('?', 2)

  return filename
}
