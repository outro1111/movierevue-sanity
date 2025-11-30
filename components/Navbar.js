"use client"
import { usePathname } from 'next/navigation'
import Link from "next/link"
// import MovieSearch from "./MovieSearch"
// import LoginMenu from "./LoginMenu"
// import DarkMode from "./DarkMode"

export default function Navbar() {
  const pathname = usePathname()
  const isMainPage = () => pathname === "/"
  const isStudioPage = () => pathname.startsWith("/studio")

  if (isStudioPage()) return null;

  return (
    <header id="header" className={isMainPage() ? "main" : ""}>
      <h1>
        <Link href="/"><span className='logo'></span></Link>
      </h1>
      <nav>
        <ul>
          <li><Link href="/movies" className={pathname.startsWith("/movies") ? "active" : ""}>LIST</Link></li>
          {/* <li><Link href="/about" className={pathname === "/about" ? "active" : ""}>ABOUT</Link></li> */}
        </ul>
      </nav>
      <div className="util">
        {/* <MovieSearch /> 검색 버튼 */}
        {/* <DarkMode /> 다크 모드 버튼 */}
        {/* <langMenu /> 언어 설정 버튼 */}
        {/* <LoginMenu /> 로그인 버튼 */}
      </div>
    </header>
  );
}