'use client'

import React, { useEffect, useState } from 'react'
import Post from './Post'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'

const ListPosts = () => {
  const [posts, setPosts] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: undefined
  })

  const fetchData = async () => {
    try {
      const searchParams = new URLSearchParams()

      searchParams.set('page', pagination.page)
      searchParams.set('limit', pagination.limit)
      const res = await fetch(
        `/api/posts?page=${pagination.page}&limit=${pagination.limit}`,
        {
          method: 'GET'
        }
      )
      debugger
      const response = await res.json()
      if (res.ok) {
        setPosts([...posts, ...response?.data?.posts])
        setPagination(prev => ({ ...prev, totalCount: response?.data?.count }))
      } else {
        toast.error()
      }
    } catch (error) {
      toast.error(error?.response?.message)
    } finally {
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log('pagination ==>', pagination)
  return (
    <div style={{ height: '400' }}>
      <InfiniteScroll
        dataLength={pagination.totalCount || 100}
        next={fetchData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default ListPosts
