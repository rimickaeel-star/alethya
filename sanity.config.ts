import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  basePath: '/studio',
  projectId: 'msg4lyvb',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schema.types,
  },
});
