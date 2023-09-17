'use client'

import React, { useEffect, useState } from 'react'
import { fetchPosts } from './actions'
import Post from './Post'
import { useInView } from 'react-intersection-observer'

const InfiniteScrolling = ({ initialMovies, initialTotalCount = 0 }) => {
  const [posts, setPosts] = useState(initialMovies)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()

  async function loadMoreMovies () {
    const next = page + 1
    const { posts, totalCount } = await fetchPosts({ page: next })
    if (posts?.length) {
      setTotalCount(totalCount)
      setPage(next)
      setPosts(prev => [...(prev?.length ? prev : []), ...posts])
    }
  }
  // TODO: wrap loadMoreMovies in useCcallback
  useEffect(() => {
    if (inView) {
      loadMoreMovies()
    }
  }, [inView])

  return (
    <>
      {posts.map(post => (
        <Post post={post} key={post._id.toString()} />
      ))}
      {posts.length < totalCount && (
        <div className='w-full flex justify-center py-4'>
          <div ref={ref} className='spinner-dot-intermittent'></div>
        </div>
      )}
    </>
  )
}

export default InfiniteScrolling
