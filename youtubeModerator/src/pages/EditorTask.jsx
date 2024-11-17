import { React, useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HeaderEditor from "../Components/HeaderEditor";

export default function EditorTask() {
  const searchParams = new URLSearchParams(window.location.search);
  const taskId = searchParams.get("taskId");
  const data = {
    Active: [
      { id: 12, name: "Active Task 1", orgname: "org3" },
      { id: 1, name: "Active Task 2", orgname: "org2" },
      { id: 4, name: "Active Task 3", orgname: "org1" },
    ],
    Pending: [
      { id: 11, name: "Pending Task 1", orgname: "org1" },
      { id: 2, name: "Pending Task 2", orgname: "org2" },
    ],
    Completed: [{ id: 9, name: "Completed Task 1", orgname: "org3" }],
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  useEffect(() => {
    const fetchTaskDetails = () => {
      if (taskId) {
        const taskInActive = data.Active.find(
          (task) => task.id === parseInt(taskId)
        );
        if (taskInActive) {
          setTaskDetails(taskInActive);
          return;
        }
        const taskInPending = data.Pending.find(
          (task) => task.id === parseInt(taskId)
        );
        if (taskInPending) {
          setTaskDetails(taskInPending);
          return;
        }
        const taskInCompleted = data.Pending.find(
          (task) => task.id === parseInt(taskId)
        );
        if (taskInCompleted) {
          setTaskDetails(taskInCompleted);
          return;
        }
      }
    };
    fetchTaskDetails();
  }, []);

  const handleShowChat = () => {
    setShowChat(!showChat);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <HeaderEditor isScrolled={60}/>
      <div className="bg-slate-800 mb-5">
        <div className="p-20 sm:p-16 md:p-20 lg:p-24 xl:p-20 w-auto px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative">
          <div className="items-center p-20 sm:p-14 md:p-14 lg:p-24 xl:p-20 w-auto px-2 sm:px-4 md:px-14 lg:px-24 xl:px-24 relative text-gray-300">
            <p className="text-6xl py-4 flex">
              {taskDetails?.name}
            </p>
            <button
              className="flex justify-center bg-slate-50 text-black hover:bg-transparent border-4 border-white rounded-full px-6 py-3 hover:text-white transition-all duration-500"
              onClick={handleShowChat}
            >
              show chat
            </button>

            <div className="flex-1">
              {/* Chat Header */}
              {showChat && (
                <>
                  <header className="bg-white mt-8 rounded-lg p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">Editor1 </h1>
                  </header>

                  {/* Chat Messages */}
                  <div className="overflow-y-auto p-4">
                    {/* Incoming Message */}
                    <div className="flex mb-4 cursor-pointer">
                      <div className="w-9  rounded-full flex items-center justify-center mr-2">
                        <img
                          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                        <p className="text-gray-700">
                          Hey Bob, how's it going?
                        </p>
                      </div>
                    </div>

                    {/* Outgoing Message */}
                    <div className="flex justify-end mb-4 cursor-pointer">
                      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                        <p>
                          Hi Alice! I'm good, just finished a great book. How
                          about you?
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <img
                          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                          alt="My Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>

                    {/* More Messages */}
                    <div className="flex mb-4 cursor-pointer">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <img
                          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                        <p className="text-gray-700">
                          That book sounds interesting! What's it about?
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end mb-4 cursor-pointer">
                      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                        <p>
                          It's about an astronaut stranded on Mars, trying to
                          survive. Gripping stuff!
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <img
                          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                          alt="My Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center ">
                      <div className="flex-row bg-white border-t border-gray-300 p-4 absolute lg:w-6/12 sm:w-10/12">
                        <div className="flex items-center">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                          />
                          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      

      
        {/* Sidebar */}
        {/* <div className="w-1/4 bg-white border-r border-gray-300"> */}
        {/* Sidebar Header */}
        {/* <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
          <div className="relative">
            <button id="menuButton" className="focus:outline-none" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            //  Menu Dropdown 
            {menuOpen && (
              <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="py-2 px-3">
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                </ul>
              </div>
            )}
          </div>
        </header> */}

        {/* Contact List */}
        {/* <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {[
            { name: 'Alice', message: 'Hoorayy!!', color: 'ffa8e4' },
            { name: 'Martin', message: 'That pizza place was amazing! 🍕', color: 'ad922e' },
            { name: 'Charlie', message: 'Do you have any movie recommendations?', color: '2e83ad' },
            { name: 'David', message: 'Just finished a great book!', color: 'c2ebff' },
            { name: 'Ella', message: 'What\'s the plan for this weekend?', color: 'e7c2ff' },
            { name: 'Fiona', message: 'New exhibit at the art museum?', color: 'ffc2e2' },
            { name: 'George', message: 'Tried a new cafe. Coffee was fantastic!', color: 'f83f3f' },
            { name: 'Hannah', message: 'Planning a hiking trip. Want to join?', color: 'dddddd' },
            { name: 'Ian', message: 'Let\'s catch up soon!', color: '70ff33' },
            { name: 'Jack', message: 'Can\'t stop laughing at your joke!', color: '30916c' },
          ].map((contact, index) => (
            <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src={`https://placehold.co/200x/${contact.color}/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`} alt="User Avatar" className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{contact.name}</h2>
                <p className="text-gray-600">{contact.message}</p>
              </div>
            </div>
          ))}
        </div> */}
        {/* </div> */}

        <Footer/>

      </>

    
  );
}
