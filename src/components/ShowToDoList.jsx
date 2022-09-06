import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import UpdateToDo from "./UpdateToDo";
import toast, { Toaster } from "react-hot-toast";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";

import CreateToDo from "./CreateToDo";

const TodoCard = ({ data, handleEdit, handleDelete }) => {
  const { _id, title, description } = data;

  return (
    <div
      key={_id}
      className="w-full sm:w-3/12 sm:mx-5 my-5 bg-gray-500 text-white  rounded-lg hover:scale-110 hover:shadow-2xl transition duration-500"
    >
      <div
        className={`flex justify-between bg-yellow-500  px-2 py-3 sm:py-2 rounded-t-lg items-center text-xl`}
      >
        <div className=" uppercase text-white text-sm">{title}</div>
        <div className="flex justify-around items-center space-x-2">
          <button
            name={_id}
            onClick={handleEdit}
            className=" p-2 text-xs text-gray-100 hover:rounded-full hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-700 hover:text-white transition-all duration-500"
          >
            Edit
          </button>
          <button
            name={_id}
            onClick={handleDelete}
            className=" p-2 text-xs text-gray-100 hover:rounded-full hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-700 hover:text-white transition-all duration-500"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="px-3 py-2 text-left h-28">{description}</div>
    </div>
  );
};

const ShowToDoList = () => {
  const [toDo, setToDo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [filter, setFilter] = useState([]);
  let [createBtn, setCreateBtn] = useState(100);
  const [loading, setLoading] = useState(false);

  const handleEdit = (e) => {
    setId(e.target.name);
    setOpen(true);
  };

  const handleClose = () => {
    setId("");
    setOpen(false);
  };

  const handleDelete = async (e) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://aqueous-earth-55401.herokuapp.com/api/todo/${e.target.name}`
      );
      toast.success("Deleted Successfully");
      // setToDo(toDo.filter((val) => val._id !== e.target.name));
      fetchData();
    } catch (err) {
      toast.error("Try once again");
      console.log(err);
    }
    setLoading(false);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://aqueous-earth-55401.herokuapp.com/api/todo/"
      );
      setToDo(res.data);
      setFilter(res.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    setFilter(
      toDo.filter(
        (val) =>
          val.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.description.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleCreateBtn = () => {
    if (createBtn === 100) setCreateBtn(0);
    else setCreateBtn(100);
  };

  return (
    <div className="pt-28">
      {createBtn ? (
        <button
          className="fixed sm:hidden text-gray-100 text-sm right-0 py-2 bg-gradient-to-br from-red-500 to-red-700 px-3 rounded-l-xl z-10"
          onClick={handleCreateBtn}
        >
          Create
        </button>
      ) : (
        ""
      )}
      <div className="fixed right-2 top-5 sm:right-14 sm:top-5 flex items-center shadow-lg">
        <span className="px-2 text-white flex items-center bg-blue-400 py-2 text-2xl rounded-l-lg">
          <SearchOutlined />
        </span>
        <input
          className="outline-0  text-black py-2 px-2 rounded-r-lg"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>
      { loading ? <div className="absolute top-1/2 left-1/2 text-4xl"><LoadingOutlined /></div>:
      <div className="w-full sm:w-11/12 px-5 flex flex-wrap-reverse">
        {filter.length > 0 ? (
          filter?.map((data) => (
            <TodoCard
              data={data}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <div className="outline outline-1 animate-bounce absolute top-[30%] left-[14%] sm:top-1/2 sm:left-1/3 bg-gray-200 px-10 py-10 text-2xl text-red-500 font-semibold rounded-lg shadow-xl">
            Nothing Found !!
          </div>
        )}
      </div>
}
      <div className="fixed hidden sm:block sm:right-0 sm:top-20 sm:min-h-screen sm:pt-10 bg-red-500  shadow-lg">
        <CreateToDo fetchData={fetchData} />
      </div>
      <div
        className={`fixed sm:hidden ${
          createBtn === 100 ? "-right-[100%]" : "-right-[0%]"
        } top-20 min-h-screen pt-10 bg-red-500  shadow-lg transition-all duration-1000`}
      >
        <CreateToDo fetchData={fetchData} handleCreateBtn={handleCreateBtn} />
      </div>
      <UpdateToDo
        _id={id}
        open={open}
        handleClose={handleClose}
        fetchData={fetchData}
      />
      <Toaster />
    </div>
  );
};

export default ShowToDoList;
