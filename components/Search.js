// Next.js에서 URL을 변경하고 페이지를 다시 로드하기 위해 redirect를 사용합니다.
import { redirect } from 'next/navigation';

// --- 1. Server Action: URL 쿼리 파라미터를 업데이트하고 리디렉션 ---
// 이 함수는 'use server'로 표시되어 서버 환경에서만 실행됩니다.
async function updateSearchParams(formData) {
  'use server';

  // 폼 데이터에서 name="title"인 입력 값(검색어)을 가져옵니다.
  const term = formData.get('title');

  // URLSearchParams 객체를 생성하여 파라미터를 관리합니다.
  const params = new URLSearchParams();

  // 검색 시에는 항상 페이지를 1로 리셋합니다.
  params.set('page', '1');

  if (term) {
    // 검색어가 있을 경우 'title' 파라미터를 설정합니다.
    params.set('title', term.toString());
  } else {
    // 검색어가 비어 있으면 'title' 파라미터를 삭제합니다.
    params.delete('title');
  }

  // 새로운 쿼리 파라미터가 적용된 URL로 리디렉션합니다.
  // Next.js는 이를 감지하여 클라이언트 측에서 라우팅하고 데이터를 다시 가져옵니다.
  // 현재 경로가 '/movies'라고 가정하고 리디렉션합니다.
  redirect(`/movies?${params.toString()}`);
}

// --- 2. 검색 폼 컴포넌트 ---
// 이 컴포넌트는 클라이언트 훅이 필요 없으므로 Server Component로 사용할 수 있습니다.
// (단, Client Component에서 사용해도 무방하며, 이 경우 props로 초기값을 받아야 합니다.)
export default function SearchForm({ initialSearchTerm }) {
  return (
    // action prop에 Server Action 함수를 직접 연결하여 폼 제출을 서버로 보냅니다.
    <form action={updateSearchParams} className="list_search">
      <input
        id="search-input"
        name="title" // 'name' 속성이 Server Action의 formData에 사용됩니다.
        type="text"
        placeholder="영화 제목 검색"
        // 초기값은 상위 Server Component로부터 props로 받습니다.
        defaultValue={initialSearchTerm || ''}
      />
      <button type="submit"><span>검색</span></button>
    </form>
  )
}