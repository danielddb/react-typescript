import * as path from 'path'

const rootDir = path.resolve(__dirname, '..')

export function root(args?: any) {
  args = Array.prototype.slice.call(arguments, 0)

  return path.join.apply(path, [rootDir].concat(args))
}
