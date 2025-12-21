import { client } from "../sanity/lib/client"
import { urlFor } from "../sanity/lib/image"
import { cacheLife, cacheTag } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import Pagination from "./Pagination"

async function getMovies(page = 1, limit = 3, searchTerm = '') {
  'use cache'
  cacheLife('hours')
  cacheTag('movies')
  const start = (page - 1) * limit
  const end = start + limit
  // 1. 검색어에 따라 필터 문자열을 동적으로 생성합니다.
  // title match "searchTerm*" : 검색어 포함 및 대소문자 무시 검색 (Sanity의 기본적인 FTS)
  const filter = searchTerm
    ? `_type == "movies" && (title match "${searchTerm}*" || titleOriginal match "${searchTerm}*")`
    : `_type == "movies"`
  // 2. 전체 항목 개수 쿼리 (검색 결과만 카운트)
  const totalQuery = `count(*[${filter}])`
  const movieQuery = `*[${filter}] | order(_createdAt desc)[${start}...${end}] {
    _id,
    title,
    titleOriginal,
    description,
    genre,
    openingDay,
    images[0],
  }`

  const [movies, total] = await Promise.all([
    client.fetch(movieQuery),
    client.fetch(totalQuery),
  ])

  return {
    movies,
    totalCount: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  }
}

export default async function MovieList({ searchParams, limit, showPagination = true }) {
  const params = await searchParams || {}
  const page = parseInt(params.page || '1', 10)
  const searchTerm = params.title || ''
  const { movies, totalCount, totalPages, currentPage } = await getMovies(page, limit, searchTerm)
  // console.log(movies, 'page', page, 'totalCount', totalCount, 'totalPages', totalPages, 'currentPage', currentPage)
  return (
    <>
      <h2 className="sub_title">Movies</h2>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie._id}>
            <Link href={`/movies/${movie._id}`}>
              <div className="thumb">
                <Image src={urlFor(movie.images).url()} alt={movie.images.alt} width={640} height={427} />
              </div>
              <h2 className="title">{movie.title}</h2>
              <h2 className="titleOriginal">{movie.titleOriginal}</h2>
              <div className="description">{movie.description}</div>
              <div className="info">
                <span className="genre">{movie.genre}</span>
                <span className="openingDate">{movie.openingDay}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {showPagination && (
        <Pagination page={page} totalPages={totalPages} />
      )}
    </>
  )
}