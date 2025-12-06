import Link from "next/link";

export default function Pagination({ page, totalPages }) {
  const currentPage = parseInt(page, 10);

  // 이전 페이지 -1에러 일 시 pageSize를 삭제하고 모두 1로 변경해봐

  // 이전 및 다음 페이지 계산
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;

  // 페이지 번호의 범위 설정
  const pageCount = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageCount / 2));
  const endPage = Math.min(totalPages, startPage + pageCount - 1);

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="pagination">
      <ul>
        <li className="page-util">
          <Link href={`?page=1`} className={currentPage === 1 ? 'disabled' : ''}>
            <span>&lt;&lt;</span>
          </Link>
        </li>
        <li className="page-util">
          <Link href={`?page=${prevPage}`} className={currentPage === 1 ? 'disabled' : ''}>
            <span>&lt;</span>
          </Link>
        </li>
        {/* 페이지 번호 표시 */}
        {pageNumbers.map(pageNumber => (
          <li key={pageNumber}>
            <Link href={`?page=${pageNumber}`}>
              <span className={currentPage === pageNumber ? 'active' : ''}>{pageNumber}</span>
            </Link>
          </li>
        ))}
        <li className="page-util">
          <Link href={`?page=${nextPage}`} className={currentPage >= totalPages ? 'disabled' : ''}>
            <span>&gt;</span>
          </Link>
        </li>
        <li className="page-util">
          <Link href={`?page=${totalPages}`} className={currentPage >= totalPages ? 'disabled' : ''}>
            <span>&gt;&gt;</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}