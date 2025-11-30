import { client } from "../sanity/lib/client"
import { urlFor } from "../sanity/lib/image"
import Image from "next/image"
import Link from "next/link"

async function getMovies() {
  'use cache'
  const query = `*[_type == "movies"] | order(_createdAt desc) {
    _id,
    title,
    titleOriginal,
    description,
    genre,
    openingDay,
    images[0],
  }`
  return await client.fetch(query)
}

export default async function MovieList() {
  const movies = await getMovies()
  // console.log(movies)
  return (
    <>
      <h2 className="sub_title">Movies</h2>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie._id}>
            <Link href={`/movies/${movie._id}`}>
              <div className="thumb">
                <Image src={urlFor(movie.images).url()} alt={movie.images.alt} width={500} height={300} />
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
    </>
  )
}