import MovieList from "@/components/MovieList"

export default function MoviesPage() {
  return (
    <>
      <MovieList />
    </>
  )
}

export const metadata = {
  title: "영화 리스트 | MovieRevue",
  description: "MovieRevue 영화 리스트",
}