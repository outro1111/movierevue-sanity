import MovieList from "@/components/MovieList"
import Search from "@/components/Search"
import MovieListSkeleton from "@/components/MovieListSkeleton"
import { Suspense } from "react"

export default function MoviesPage({ searchParams }) {
  return (
    <>
      <Search />
      <Suspense fallback={<MovieListSkeleton limit={3} />}>
        <MovieList searchParams={searchParams} limit={6} />
      </Suspense>
    </>
  )
}

export const metadata = {
  title: "영화 리스트 | MovieRevue",
  description: "MovieRevue 영화 리스트",
}