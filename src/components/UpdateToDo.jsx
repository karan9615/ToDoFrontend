import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal"
import {LoadingOutlined} from "@ant-design/icons"

const UpdateToDo = ({ _id,open,handleClose,fetchData}) => {
  // console.log("this is the id of the card",_id)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://aqueous-earth-55401.herokuapp.com/api/todo/${_id}`, formData);
      toast.success("Updated Successfully");
      fetchData();
    } catch (error) {
      toast.error("Try Once Again");
      console.log(error);
    }
    setLoading(false)
    setFormData({
      title: "",
      description: "",
    });
    handleClose();
  };

  return (
    <div>
      {" "}
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        contentLabel="Update"
        className="absolute sm:w-1/3 top-[20%] left-[12%] sm:top-1/3 sm:left-1/3"
        ariaHideApp={false}
      >
      <button onClick={handleClose} className="float-right -mt-10 text-4xl hover:scale-75 transition-all duration-1000">
        &times;
      </button>
      <div className="flex flex-col items-center rounded-lg bg-gradient-to-tr from-blue-600 via-blue-400 to-blue-900 px-5 py-4">
        { loading ? <div className="absolute top-1/2 left-1/2 text-4xl"><LoadingOutlined /></div> :
        <div><div className="text-2xl text-center text-white uppercase py-2 font-semibold">Update Notes</div>
        <hr className="w-full" />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="px-4 py-1 w-full bg-gray-100 outline-none my-2 mt-8 rounded-2xl focus:outline-2 focus:outline-blue-400"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="px-2 py-1 w-full bg-gray-100 outline-none my-2  rounded-2xl focus:outline-2 focus:outline-blue-400"
          required
        />
        <button
          onClick={(e) => {
            handleUpdate(e);
            handleClose();
          }}
          className="border mb-5 text-white  hover:text-white border-red-500 hover:outline-none px-10 py-1 mt-5  text-lg hover:bg-red-500 hover:shadow-lg hover:shadow-blue-900 transition duration-500 "
        >
          Submit
        </button>
        <Toaster />
        </div>
}
      </div>
      </Modal>
    </div>
  );
};

export default UpdateToDo;
