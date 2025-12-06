import { client } from "../sanity/lib/client"
import { urlFor } from "../sanity/lib/image"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

async function getMovie() {
  'use cache'
  const query = `*[_type == "movies"] | order(_createdAt desc)[0] {
    _id,
    title,
    titleOriginal,
    description,
    content,
    images[0],
  }`
  return await client.fetch(query)
}

export default async function MainMovie() {
  const movie = await getMovie()
  // console.log(movie)
  return (
    <div className="main_movie">
      <Image loading="eager" src={urlFor(movie.images).url()} alt={movie.images.alt} width={1950} height={820} />
      <div className="feature">
        <h1>Screenplay Now!</h1>
        {/* <Link href={`/movies/${movies[1].id}`}> */}
        <strong>{movie.title}</strong>
        <em>{movie.titleOriginal}</em>
        <div className="description">{movie.description}</div>
        {/* <div className="description"><PortableText value={movie.content} /></div> */}
        {/* </Link> */}
      </div>
    </div>
  )
}