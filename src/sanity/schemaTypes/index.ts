import { type SchemaTypeDefinition } from 'sanity';
import { documentType } from './documentType';
import { incidentType } from './incidentType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [documentType, incidentType],
};
