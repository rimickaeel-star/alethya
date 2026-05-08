import { defineField, defineType } from 'sanity';

export const incidentType = defineType({
  name: 'incident',
  title: 'Hate Speech Incident',
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
      name: 'date',
      title: 'Date of Incident',
      type: 'date',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Media Distortion', value: 'media' },
          { title: 'Political Rhetoric', value: 'political' },
          { title: 'Cyber Bullying', value: 'cyber' },
          { title: 'Religious Incitement', value: 'religious' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Resolution Status',
      type: 'string',
      options: {
        list: [
          { title: 'Under Review', value: 'Under Review' },
          { title: 'Legal Notice Sent', value: 'Legal Notice Sent' },
          { title: 'Resolved', value: 'Resolved' },
        ],
      },
    }),
    defineField({
      name: 'sourceLink',
      title: 'Source Link / Evidence',
      type: 'url',
    }),
  ],
});
