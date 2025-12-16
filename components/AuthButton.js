"use client";
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession()
  const [userOpen, setUserOpen] = useState(false)
  const pathname = usePathname()

  if (session) {
    return (
      <div className="login_area login_is" >
        <button className="btn_login" onClick={() => setUserOpen(!userOpen)}>
          <em>
            <img
              src={session.user?.image || ""}
              alt="Profile"
              className="profile"
            />
          </em>
        </button >
        {userOpen && (
          <div className={`user_layer ${userOpen ? 'active' : ''}`}>
            <div className="user_layer_in" onClick={() => setUserOpen(false)}></div>
            <p className="user_info">
              <img
                src={session.user?.image || ""}
                alt="Profile"
                className="profile"
              />
              <span className="name">{session.user?.name}님</span>
              <span className="email">{session.user?.email}</span>
            </p>
            <p className="btn_area">
              <button onClick={() => { signOut() }} className="btn_logout">
                <span className="icon"></span>Logout
              </button>
            </p>
          </div>
        )}
      </div >
    )
  }
  return (
    <div className="login_area">
      <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} className="btn_login">
        <em><span className="sr_only">Login</span></em>
      </Link>
    </div >
  )
}