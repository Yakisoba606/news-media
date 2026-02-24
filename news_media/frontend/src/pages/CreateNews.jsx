import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axiosAPI from '../../api/axios'

const CreateNews = () => {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [author, setAuthor] = useState("");
  let [types, setTypes] = useState("");
  let [errors, setErrors] = useState("");

  useEffect(() => {
    let fetchData = async () => {
      if (id) {
        // let news = await axios.get("http://localhost:3000/api/news/" + id);

        let news = await axiosAPI("/api/news/" + id);

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

  let submitNews = async (e) => {
   
    try {
       e.preventDefault(); //to prevent loading

    let news = { title, description, author, types };

    let res;

      if(id){
        res = await axiosAPI.patch("/api/news/" + id, news) //patch
      } else {
        res = await axiosAPI.post("/api/news" ,news) //post
      }

      if ( res.status == 200 ){
        navigation.navigate('/')
      }
    } catch (e){
      setErrors(Object.keys(e.response.data.errors))
    }

  };

  return (
    <>
      <div className="mx-auto p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl ">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {id ? "Edit" : "Create"} News
          </h1>

          <ul className="list-disc px-6">
            {!!errors.length &&
              errors.map((err, i) => (
                <li className="text-red-700 text-sm mmb-2" key={i}>
                  {err} field is required!{" "}
                </li>
              ))}
          </ul>

          <form action="" onSubmit={ submitNews }>
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title..."
                className="mt-1 w-full block border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                row="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description..."
                className="mt-1 w-full block border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter Author..."
                className="mt-1 w-full block border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Types
              </label>
              <div className="flex space-x-2 items-center">
                <input
                  type="text"
                  value={types}
                  onChange={(e) => setTypes(e.target.value)}
                  placeholder="Enter Types..."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {/* <button className='bg-green-600 mt-1 py-2 px-4 text-white rounded-md hover:bg-green-800 transition' >+</button> */}
              </div>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full bg-green-600 mt-1 py-2 px-4 text-white rounded-md hover:bg-green-800 transition"
              >
                {id ? "Update" : "Create"} News
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNews;
