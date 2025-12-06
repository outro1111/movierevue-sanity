import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import Image from "next/image"

async function getMovieDetail(id) {
  'use cache'
  const query = `*[_type == "movies" && _id == $id][0]{
    _id,
    title,
    titleOriginal,
    description,
    content,
    poster,
    images,
    cast,
    openingDay,
    genre,
  }`;
  return await client.fetch(query, { id });
}

export async function generateStaticParams() {
  const query = `*[_type == "movies"]{ _id }`;
  const movies = await client.fetch(query);

  return movies.map((movie) => ({
    id: movie._id,
  }));
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params
  const movie = await getMovieDetail(id)
  // console.log(movie)

  return (
    <>
      <div className="detail_movie">
        <div className="detail_top">
          <div className="top_bg">
            <Image loading="eager" src={urlFor(movie.images[1]).url()} alt={movie.images[1].alt} width={1523} height={692} />
          </div>
          <div className="top_con">
            <h2 className="title">{movie.title}</h2>
            <h2 className="titleOriginal">{movie.titleOriginal}</h2>
            <p className="genre">{movie.genre}</p>
            <p className="openingDate">{movie.openingDay}</p>
          </div>
        </div>

        <div className="detail_con">

          <div className="description">
            <h2 className="detail_title">Storyline</h2>
            <PortableText value={movie.content} />
          </div>
          <div className="poster">
            <Image loading="eager" src={urlFor(movie.poster).url()} alt={movie.poster.alt} width={311} height={466} />
          </div>

          <div className="cast">
            <h2 className="detail_title">Cast</h2>
            <ul>
              {movie.cast.map((cast) => (
                <li key={cast._key}>
                  <p className="photo">
                    {cast.photo?.asset && (
                      <Image loading="eager" src={urlFor(cast.photo).url()} alt={cast.photo.alt} width={150} height={150} />
                    )}
                  </p>
                  <p className="name">{cast.name}</p>
                  <p className="role">{cast.role}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="photos">
            <h2 className="detail_title">Photos</h2>
            <ul>
              {movie.images.map((image) => (
                <li key={image._key}>
                  <Image loading="eager" src={urlFor(image).url()} alt={image.alt} width={640} height={440} />
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const movieMeta = await getMovieDetail(id)
  let description = movieMeta.description
  if (description.length > 50) {
    description = description.substring(0, 50) + "...";
  }
  return {
    title: `${movieMeta.title} | MovieRevue`,
    description: description,
  }
}