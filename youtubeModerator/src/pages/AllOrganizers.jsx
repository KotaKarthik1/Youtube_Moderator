import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrganizers = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [organizers, setOrganizers] = useState([]); // State for organizer data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [message, setMessage] = useState("");

  // Fetch organizers
  const fetchOrganizers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/AllOrganizers`, {
        params: { search: searchQuery },
        withCredentials: true,
      });
      if (response.data.message === "Working with another Organizer") {
        setMessage("working");
      } else {
        setOrganizers(response.data.organizers);
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching organizers:", error);
      setOrganizers([]);
    } finally {
      setLoading(false);
    }
  };

  // Request organizer
  const handleRequest = async (organizerId) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/editor/requestOrganizer",
        { organizerId },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Request Sent", {
          position: "top-center",
          autoClose: 2000,
        });
        await fetchOrganizers(); // Refresh organizers after request
      }
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        console.error("Error sending request:", err);
        alert("Failed to send request. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, [searchQuery]);

  return (
    <div>
      {/* Search Input */}
      <div className="max-w-md mx-auto py-4 mt-28">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search organizers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Organizers Section */}
      <section
        id="AllOrganizers"
        className="container space-y-6 bg-slate-50 py-8 mx-auto md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            All Organizers
          </h2>
        </div>

        {/* Content Based on Loading or Data */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : message === "working" ? (
          <div className="text-center">
            You are already working under another organizer.
          </div>
        ) : organizers?.length > 0 ? (
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {organizers.map((organizer) => (
              <div
                key={organizer._id}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-[90px] flex-col justify-between items-center rounded-md p-6">
                  <i className="fas fa-user text-3xl"></i>
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">{organizer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Youtube Account Name: {organizer.youtubeChannelName}
                    </p>
                  </div>
                </div>
                <button
                  className={`mt-4 w-full rounded-lg px-4 py-2 transition-colors ${
                    organizer.orgStatus
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={organizer.orgStatus} // Disable button if already requested
                  onClick={() => handleRequest(organizer._id)}
                >
                  {organizer.orgStatus ? "Requested" : "Request"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No organizers found</div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default AllOrganizers;
