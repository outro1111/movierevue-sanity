import { defineField, defineType } from 'sanity'

export const userSchema = defineType({
  name: 'user',
  title: 'User',
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "emailVerified",
      type: "datetime",
    }),
  ],
});