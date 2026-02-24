import React, { useEffect , useState } from "react";
import { useLocation } from 'react-router-dom';
import NewsItem from "../components/NewsItem";
import Pagination from "../components/Pagination";
import axios from '../../api/axios';

const Home = () => {

  // To store data from useEffect to setNewsData
  let [ newsData , setNewsData ] = useState([])
  let [ dataLink , setDataLink ] = useState([])

  // To search page numbers in React
  let location = useLocation();
  let search = new URLSearchParams(location.search);
  let page = search.get('page');
  page = parseInt(page) ? parseInt(page) : 1 ;

  // To load data from APIs
  useEffect( ()=>{
    let fetchData = async ()=>{
      // let response = await fetch('http://localhost:3000/api/news?page='+page)
      let response = await axios('/api/news?page='+page)
      if( response.status == 200 ){
        let data = await response.data;
        setDataLink(data.dataLink)
        setNewsData(data.data)

        window.scroll({ top:0 , left:0 , behavior : 'smooth' })
      }
    }
    fetchData()
  }, [page])

  let deletedNews = (_id) => {
    if ( newsData.length == 1 && page > 1 ) {
      navigation.Navigate('/?page='+(page-1))
    } else {
      setNewsData( item => item.filter( remove => remove._id !== _id ) )
    }
  }

  // currentPage | nextPage | previousPage | loopLinks

  return (
    <>
      <div className="space-y-5">
        <div className="mx-auto p-8 max-w-2xl">
          <div className="space-y-6">

          {/* !! means 0 will not show up when the data is still extracted from API */}
          { !!newsData?.length && ( newsData.map( news =>(
            <NewsItem news={news} deletedNews={deletedNews}  key={news._id} />
          )) )}

          { !!dataLink && newsData.length !==0 && <Pagination links={dataLink} page={page || 1} /> } 

          { !!newsData?.length === 0 ? <h1 className="text-center text-2xl font-semibold text-green-800 mt-5" >There is no news...</h1> : "" }
            

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
