import React from 'react';
import { Link } from 'react-router-dom';
import axiosAPI from '../../api/axios';

const NewsItem = ({ news , deletedNews }) => {

  let deleteNews = async() => {

    // http://localhost:3000/api/news/  _id

    // let res = await axios.delete('http://localhost:3000/api/news/'+news._id)

    let res = await axiosAPI.delete('/api/news/'+news._id)
     if ( res.status == 200 ) {
      deletedNews(news._id);
     }
  }
  
  return (
    <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden" >
              <div className="p-6">
                <h2 className='text-2xl font-semibold text-green-800' >{news.title}</h2>
                <p className='text-gray-600 mt-2' >{news.description}</p>
              </div>
              <div className="px-6 pb-6">
                <span className='text-sm text-gray-500' >Publish on : {news.createdAt}</span>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">Author : {news.author}</div>
                  <div className="">
                    <Link to={'/detailNews/'+news._id} className='bg-green-700 text-white p-1 shadow-sm rounded-md ms-1'>Details</Link>
                    <Link onClick={deleteNews} className='bg-red-700 text-white p-1 shadow-sm rounded-md ms-1' >Delete</Link>
                    <Link to={'/updateNews/'+news._id} className='bg-blue-700 text-white p-1 shadow-sm rounded-md ms-1 ' >Update</Link>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default NewsItem
