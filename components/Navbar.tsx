'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className="border-b py-4">
        <div className="container mx-auto flex justify-between">
          <div>Scribble</div>
          <nav className="flex gap-4">
            <Link href="/">Generate Art</Link>
            <Link href="/collection">My Collection</Link>
          </nav>
          <div>Sign In</div>
        </div>
      </div>
    )
}

export default Navbar