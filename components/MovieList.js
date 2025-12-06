import { client } from "../sanity/lib/client"
import { urlFor } from "../sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import Pagination from "./Pagination"

async function getMovies(page = 1, limit = 3) {
  'use cache'
  const start = (page - 1) * limit
  const end = start + limit
  const totalQuery = `count(*[_type == "movies"])`
  const movieQuery = `*[_type == "movies"] | order(_createdAt desc)[${start}...${end}] {
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
  const pageNumber = params.page || '1'
  const page = parseInt(pageNumber, 10)
  const { movies, totalCount, totalPages, currentPage } = await getMovies(page, limit)
  console.log(movies, 'page', page, 'totalCount', totalCount, 'totalPages', totalPages, 'currentPage', currentPage)
  return (
    <>
      <h2 className="sub_title">Movies</h2>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie._id}>
            <Link href={`/movies/${movie._id}`}>
              <div className="thumb">
                <Image loading="eager" src={urlFor(movie.images).url()} alt={movie.images.alt} width={640} height={427} />
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