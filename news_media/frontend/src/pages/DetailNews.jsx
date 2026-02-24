import React, { useEffect, useState } from "react";
import axiosAPI from '../../api/axios'
import { Link, useParams } from "react-router-dom";

const DetailNews = () => {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [author, setAuthor] = useState("");
  let [types, setTypes] = useState("");

  useEffect(() => {
    let fetchData = async () => {
      if (id) {
        let news = await axiosAPI("/api/news/" + id); //get

        if (news.status == 200) {
          setTitle(news.data.title);
          setDescription(news.data.description);
          setAuthor(news.data.author);
          setTypes(news.data.types);
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="mx-auto p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl ">
          <button><Link to={'/'} >Back</Link></button>
          <h1 className="text-2xl font-bold mb-6 text-white bg-green-800 p-4">Detail News</h1>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <label className="block text-l font-medium text-black-700">
                {title}
              </label>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <label className="block text-l font-medium text-black-700">
                
                {description}
              </label>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <label className="block text-l font-medium text-black-700">
                {author}
              </label>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Types
              </label>
              
                <label className="block text-l font-medium text-black-700">
                  {types}
                </label>
                {/* <button className='bg-green-600 mt-1 py-2 px-4 text-white rounded-md hover:bg-green-800 transition' >+</button> */}
              
            </div>
         
        </div>
      </div>
    </>
  );
};

export default DetailNews;
