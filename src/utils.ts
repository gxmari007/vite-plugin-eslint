import * as qs from 'querystring';
import * as path from 'path';

export function normalizePath(id: string): string {
  return path.relative(process.cwd(), id).split(path.sep).join('/');
}

export function checkVueFile(id: string): boolean {
  if (!id.includes('?')) return false;

  const rawQuery = id.split('?', 2)[1];

  return qs.parse(rawQuery).vue !== null ? true : false;
}
