import MovieList from "@/components/MovieList"
import Search from "@/components/Search"
import { Suspense } from "react"

export default function MoviesPage({ searchParams }) {
  return (
    <>
      <Search />
      <Suspense fallback={<div className="data-loader"></div>}>
        <MovieList searchParams={searchParams} limit={6} />
      </Suspense>
    </>
  )
}

export const metadata = {
  title: "영화 리스트 | MovieRevue",
  description: "MovieRevue 영화 리스트",
}