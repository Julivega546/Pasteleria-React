import React from 'react'
import First from '../organisms/First'
import Second from '../organisms/Second'
import Third from '../organisms/Third'
import Fourth from '../organisms/Fourth'
import BlogsPage from './BlogsPage'


export default function Home() {
  return (
    <>
    
        <First/>
        <Second/>
        <Third/>
        <Fourth/>
        <section id="blogs">
        <BlogsPage />
      </section>
        
    </>
    
  )
}
