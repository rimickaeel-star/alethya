import { defineField, defineType } from 'sanity';

export const documentType = defineType({
  name: 'archiveDocument',
  title: 'Archive Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_ar',
      title: 'Title (Arabic)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          { title: 'Manuscript', value: 'manuscript' },
          { title: 'Academic Study', value: 'study' },
          { title: 'Official Document', value: 'document' },
          { title: 'Testimony', value: 'testimony' },
        ],
      },
    }),
    defineField({
      name: 'era',
      title: 'Historical Era',
      type: 'string',
      options: {
        list: [
          { title: 'Medieval', value: 'medieval' },
          { title: 'Ottoman', value: 'ottoman' },
          { title: 'Mandate', value: 'mandate' },
          { title: 'Modern', value: 'modern' },
        ],
      },
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
  ],
});
