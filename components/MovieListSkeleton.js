// Tailwind CSS를 사용하여 스켈레톤 UI를 만듭니다.
const SkeletonCard = () => (
  <>
    <li>
      <div className="thumb"></div>
      <h2 className="title"></h2>
      <h2 className="titleOriginal"></h2>
      <div className="description"></div>
      <div className="info">
        <span className="genre"></span>
        <span className="openingDate"></span>
      </div>
    </li>
  </>
)

// 전체 스켈레톤 목록
export default function MovieListSkeleton({ limit }) {
  return (
    <div className="movie-skeleton">
      <h2 className="sub_title"></h2>
      <ul className="list">
        {/* limit 수만큼 스켈레톤 카드를 반복하여 표시 */}
        {Array(limit).fill(0).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </ul>
    </div>
  )
}