import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateToDo = ({fetchData, handleCreateBtn}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://aqueous-earth-55401.herokuapp.com/api/todo/", formData);
      setFormData({
        title: "",
        description: "",
      });
      toast.success("Added Successfully");
      
    setLoading(true)
    setLoading(false)
      fetchData();
      navigate("/");
      // console.log(res.data.message)
    } catch (error) {
      toast.error("Try again");
      console.log(error);
    }
  };

  return (
    <div className="px-10 z-10">
      <span className="absolute sm:hidden top-0 -left-8 text-4xl" onClick={handleCreateBtn}>&times;</span>
      <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
        <label
          className="label text-left text-lg my-1 text-white"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input px-5 py-1 outline-none rounded-xl hover:shadow-lg focus:outline-2 focus:outline-blue-200"
          required
        />
        <label
          className="label text-left text-lg my-1 mt-2 text-white"
          htmlFor="description"
        >
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input px-5 py-1 outline-none  rounded-xl hover:shadow-lg focus:outline-2 focus:outline-blue-200"
          required
        />

        <button
          type="submit"
          className="outline hover:outline-none w-1/2 px-2 py-2 mx-auto mt-8 text-white bg-red-400 hover:scale-[115%] hover:bg-red-600 hover:shadow-xl transition-all duration-700"
        >
          Add
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default CreateToDo;
