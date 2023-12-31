'use client'
import { ExternalLink, Globe, LinkedinIcon, PersonStanding, WholeWord, WholeWordIcon } from 'lucide-react'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from './layouts/theme-toggle'

const Navbar = () => {
  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link className='text-2xl font-semibold' href="/"> Scribble </Link>
        </div>
        {/* <nav className="flex gap-4">
            <Link href="/">Generate Art</Link>
            <Link href="/collection">My Collection</Link>
          </nav> */}
        <div className='flex justify-center items-center gap-2'>
          <Link href="https://github.com/asmraihan" >   <Github size={20} /></Link>
          <Link href="https://www.linkedin.com/in/asmraihan/" >   <Linkedin size={20} /></Link>
          <Link href="https://asmraihan.web.app" >   <ExternalLink size={20} /></Link>

        <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar