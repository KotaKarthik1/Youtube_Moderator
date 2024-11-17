import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Components/Footer";

const AllOrganizers = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [organizers, setOrganizers] = useState([]); // State for organizer data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [message, setMessage] = useState("");
  const [requestedOrganizers, setRequestedOrganizers] = useState([]);

  // Fetch organizers when the `searchQuery` changes
  const handleRequest = async (organizerId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/request-organizer", {
        organizerId,
      });
      if (response.status === 200) {
        alert("Request sent successfully!");
        // Update the state to include the requested organizer ID
        setRequestedOrganizers((prev) => [...prev, organizerId]);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        setLoading(true);

        console.log("searchquery",searchQuery);
        const response = await axios.get(
          `http://localhost:4000/AllOrganizers`,
          {
            params: { search: searchQuery }, // Send search query as a parameter
            withCredentials: true,
          }
        );
        if (response.data.message == "Working with other Organizer") {
          setMessage("working");
        } else {
          console.log(response);
          setOrganizers(response.data.organizers); // Update state with API response
        }
      } catch (error) {
        console.error("Error fetching organizers:", error);
        setOrganizers([]); // Clear organizers if there's an error
      } finally {
        setLoading(false);
      }
    };
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
            onChange={(e) => setSearchQuery(e.target.value)} // Update `searchQuery` state
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
        ) : message == "working" ? (
          <>
            <div className="text-center">
              You are already working under another organizer.
            </div>
          </>
        ) : organizers.length > 0 ? (
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {organizers.map((organizer) => (
              <div
                key={organizer.id}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-[90px] flex-col justify-between items-center rounded-md p-6">
                  <i className="fas fa-user text-3xl"></i>
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">{organizer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Youtube Account Name: {organizer.youtubeAccountName}
                    </p>
                  </div>
                </div>
                <button
            className={`mt-4 w-full rounded-lg px-4 py-2 transition-colors ${
              requestedOrganizers.includes(organizer.id)
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() =>
              !requestedOrganizers.includes(organizer.id) &&
              handleRequest(organizer.id)
            }
            disabled={requestedOrganizers.includes(organizer.id)}
          >
            {requestedOrganizers.includes(organizer.id) ? "Requested" : "Request"}
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
