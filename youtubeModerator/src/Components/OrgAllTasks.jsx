import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import orgApi from "../apis/org.api";
import currentUser from "../store/user.store";
import { useRecoilState } from "recoil";

export default function OrgAllTasks() {
    const [selectedTab, setSelectedTab] = useState("Active");
    const [data,setData]=useState([]);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useRecoilState(currentUser);

    // Dummy data for each tab
    // const data = {
    //     Active: [{id:12,name:"Active Task 1",orgname:'org3'}, {id:1,name:"Active Task 2",orgname:'org2'}, {id:4,name:"Active Task 3",orgname:'org1'}],
    //     Pending: [{id:11,name:"Pending Task 1",orgname:'org1'}, {id:2,name:"Pending Task 2",orgname:'org2'}],
    //     Completed: [{id:9,name:"Completed Task 1",orgname:'org3'}],
    // };
    const fetchdata = ()=>{
        orgApi.handleGetAllTasks({
            payload:{id:currentLoggedInUser?._id},
            success:(res)=>{
                console.log(res.data);
                setData(res.data);
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }
    useEffect(()=>{
        fetchdata();
        console.log("data is ",data);
    },[])


    return (
        <div>
            {/* Mobile dropdown */}
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select Tab
                </label>
                <select
                    id="tabs"
                    value={selectedTab}
                    onChange={(e) => setSelectedTab(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Desktop tabs */}
            <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                {["Active", "Pending", "Completed"].map((tab) => (
                    <li key={tab} className="w-full">
                        <button
                            onClick={() => setSelectedTab(tab)}
                            className={`inline-block w-full p-4 ${selectedTab === tab
                                    ? "text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white"
                                    : "bg-white  hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                } border-r border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none hover:text-white`}
                            aria-current={selectedTab === tab ? "page" : undefined}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Tab content */}
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
    {selectedTab} Tasks
  </h2>
  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
    {data[selectedTab]?.map((item, id) => (
      <li key={id} className="py-3 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2">
        <Link 
          to={`/OrgTaskView?taskId=${item.id}`} 
          className="text-base text-gray-800 dark:text-gray-200 font-medium hover:text-blue-500 dark:hover:text-blue-400"
        >
          {item.name}
        </Link>
        <span className="text-sm text-gray-500 dark:text-gray-400 italic">
          {item.editor}
        </span>
      </li>
    ))}
  </ul>
</div>

        </div>
    );
}
