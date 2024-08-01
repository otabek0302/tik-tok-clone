import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'tik-tok-backend',

  projectId: '544nqitn',
  dataset: 'tik-tok-sanity',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
