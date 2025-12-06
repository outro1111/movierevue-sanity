import { defineField, defineType } from 'sanity'

export const movieSchema = defineType({
  name: 'movies',
  title: 'Movies',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.min(1).required().error('영화 이름을 입력해주세요'),
    }),
    defineField({
      name: 'titleOriginal',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
      ],
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: '이미지 설명 대체 텍스트',
          validation: rule => rule.error('이미지 설명 대체 텍스트를 입력해주세요').required(),
        }
      ]
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'cast',
      title: 'Cast',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'castInfo',
          title: 'Cast Information',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: rule => rule.required().error('이름을 입력해주세요'),
            }),
            defineField({
              name: 'role',
              title: '역할',
              type: 'string',
              options: {
                list: [
                  { title: '선택하세요.', value: undefined },
                  { title: '감독', value: 'director' },
                  { title: '주연', value: 'main_actor' },
                  { title: '조연', value: 'supporting_actor' },
                ],
                layout: 'dropdown'
              }
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                }
              ]
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
            },
          },
        }
      ],
    }),
    defineField({
      name: 'openingDay',
      title: 'Opening Day',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      }
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Action', value: 'action' },
          { title: 'Comedy', value: 'comedy' },
          { title: 'Drama', value: 'drama' },
          { title: 'Art', value: 'art' },
          { title: 'Fantasy', value: 'fantasy' },
          { title: 'Horror', value: 'horror' },
          { title: 'Romance', value: 'romance' },
          { title: 'Thriller', value: 'thriller' },
        ],
      },
    }),
  ],
})