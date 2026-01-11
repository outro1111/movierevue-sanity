import { defineField, defineType } from 'sanity'

export const reviewSchema = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Review Content', // 감상평 내용
      type: 'text', // 긴 글이므로 string 대신 text 사용
      rows: 4,
      validation: (Rule) => Rule.required().error('리뷰 내용을 입력해주세요.'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating', // 평점
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10).error('평점은 1에서 10 사이여야 합니다.'),
    }),
    defineField({
      name: 'movie',
      title: 'Movie', // 영화 참조 (Relation)
      type: 'reference',
      to: [{ type: 'movies' }], // 'movie'라는 스키마가 존재한다고 가정
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User', // 유저 참조 (Relation)
      type: 'reference',
      to: [{ type: 'user' }], // 아래에 정의할 'user' 스키마 참조
      // validation: (Rule) => Rule.required(),
    }),
  ],
  // Sanity Studio 리스트에서 어떻게 보일지 설정 (미리보기)
  preview: {
    select: {
      title: 'movie.title', // 영화 제목을 타이틀로
      subtitle: 'user.name', // 작성자를 서브타이틀로
      score: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, score } = selection
      return {
        title: `${title || '제목 없음'}`,
        subtitle: `${subtitle || '익명'} (★ ${score})`,
      }
    },
  },
})