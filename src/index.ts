import path from 'path'
import type { Plugin } from 'rollup'
import { ESLint } from 'eslint'
import { createFilter } from '@rollup/pluginutils'

export interface RollupEslintOptions extends ESLint.Options {
  /**
   * If true, will auto fix source code.
   * @default false
   */
  fix?: boolean

  /**
   * If true, will throw an error if any errors were found.
   * @default false
   */
  throwOnError?: boolean

  /**
   * If true, will throw an error if any warnings were found.
   * @default false
   */
  throwOnWarning?: boolean

  /**
   * A single file, or array of files, to include when linting.
   * @default []
   */
  include?: string[] | string

  /**
   * A single file, or array of files, to exclude when linting.
   * @default node_modules/**
   */
  exclude?: string[] | string

  /**
   * Custom error formatter or the name of a built-in formatter.
   * @default stylish
   */
  formatter?: ESLint.Formatter | string
}

function normalizePath(id: string) {
  return path.relative(process.cwd(), id).split(path.sep).join('/')
}
export default function eslintPlugin(
  options: RollupEslintOptions = {}
): Plugin {
  const defaultOptions: RollupEslintOptions = {
    cache: false,
    fix: false,
    throwOnWarning: true,
    throwOnError: true,
  }
  const opts = { ...defaultOptions, ...options }
  const eslint = new ESLint({
    cache: opts.cache,
    fix: opts.fix,
  })
  const filter = createFilter(opts.include, opts.exclude || /node_modules/)
  let formatter: ESLint.Formatter

  return {
    name: 'rollup-eslint-plugin',
    async transform(_, id) {
      const file = normalizePath(id)
      if (!filter(id) || (await eslint.isPathIgnored(file))) {
        return null
      }

      switch (typeof opts.formatter) {
        case 'string':
          formatter = await eslint.loadFormatter(opts.formatter)
          break
        case 'function':
          formatter = opts.formatter
          break
        default:
          formatter = await eslint.loadFormatter('stylish')
      }

      const report = await eslint.lintFiles(file)
      const hasWarnings =
        opts.throwOnWarning && report.some((item) => item.warningCount !== 0)
      const hasErrors =
        opts.throwOnError && report.some((item) => item.errorCount !== 0)
      const result = formatter.format(report)
      if (opts.fix && report) {
        void ESLint.outputFixes(report)
      }

      if (hasWarnings) {
        this.warn(result)
      }

      if (hasErrors) {
        this.error(result)
      }

      return null
    },
  }
}
