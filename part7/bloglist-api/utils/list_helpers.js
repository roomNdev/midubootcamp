const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
  return blogs.length === 0 ? 0 : blogs.map(blog=>blog.likes).reduce( (a, b)=> a + b)
}

const favoriteBlogs = (blogs) =>{
  const favorite = blogs.reduce((a, b)=> {return a.likes > b.likes ? a : b}, blogs[0])
  return{
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) =>{

  const postAmount = {}
  blogs.forEach(blog=>{
    if(postAmount[blog.author]){
      postAmount[blog.author] += 1
    } else{
      postAmount[blog.author] = 1
    }
  })
  const authorWithMostBlogs = Object.keys(postAmount).sort((a, b)=> postAmount[b] - postAmount[a])[0]
  return {
    author: authorWithMostBlogs,
    blogs: postAmount[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) =>{
  const likesAmount = {}
  blogs.forEach(blog=>{
    if(likesAmount[blog.author]){
      likesAmount[blog.author] += blog.likes
    } else{
      likesAmount[blog.author] = blog.likes
    }
  })
  const authorWithMostLikes = Object.keys(likesAmount).sort((a, b)=> likesAmount[b] - likesAmount[a])[0]
  return {
    author: authorWithMostLikes,
    likes: likesAmount[authorWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
}

