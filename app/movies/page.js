import MovieList from "@/components/MovieList"
import { Suspense } from "react"

export default function MoviesPage({ searchParams }) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MovieList searchParams={searchParams} limit={6} />
      </Suspense>
    </>
  )
}

export const metadata = {
  title: "영화 리스트 | MovieRevue",
  description: "MovieRevue 영화 리스트",
}