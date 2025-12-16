"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Suspense } from "react"

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  // 로그인 핸들러
  const handleLogin = (provider) => {
    signIn(provider, {
      callbackUrl: callbackUrl,
      prompt: "select_account" // 구글 계정 선택창 강제
    });
  };

  return (
    <div className="login">
      <h2 className="sub_title">로그인</h2>
      <p className="btn_signup">계정 로그인으로 영화 리뷰 서비스를 이용해보세요.</p>
      {/* 1. 구글 로그인 버튼 */}
      <button
        onClick={() => handleLogin("google")}
        className="btn primary"
      >
        <Image
          src="/images/google.svg"
          alt="Google"
          width={26}
          height={26}
        />
        Google 계정으로 계속하기
      </button>
    </div>
  )
}

// 메인 페이지 컴포넌트
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}