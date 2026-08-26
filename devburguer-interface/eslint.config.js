import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import importHelpers from 'eslint-plugin-import-helpers'

export default [
  // Ignora a pasta dist (igual ao .eslintignore antigo)
  { ignores: ['dist'] },
  
  // Extends recomendados globais
  js.configs.recommended,
  prettierPluginRecommended, // Já inclui o eslint-config-prettier e o plugin:prettier/recommended

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021, // Traduzido do seu "es2021: true"
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: { 
        ecmaFeatures: { jsx: true } 
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import-helpers': importHelpers,
    },
    rules: {
      // O eslint-plugin-react foi removido: a última versão (7.37.5) só declara
      // suporte até eslint ^9.7 e quebra no eslint 10 ao chamar a API removida
      // `context.getFilename()`. As regras que importam aqui estão no
      // react-hooks; o resto do plugin cobre padrões legados (prop-types,
      // react-in-jsx-scope) que não se aplicam a React 19 com JSX automático.
      ...reactHooks.configs.recommended.rules,
      
      // Regra do Vite
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      
      // SUAS REGRAS DO JSON AQUI 👇
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            '/^@shared/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true,
          },
        },
      ],
    },
  },
]