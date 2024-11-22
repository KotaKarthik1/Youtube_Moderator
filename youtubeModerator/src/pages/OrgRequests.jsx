import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import currentUser from "../store/user.store";
import orgApi from "../apis/org.api";

export default function OrgRequests() {
  const [requests, setRequests] = useState([]); // State for organizer data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [currentLoggedInUser] = useRecoilState(currentUser);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      orgApi.handleGetRequests({
        payload: { id: currentLoggedInUser?._id },
        success: (res) => {
          setRequests(res.data.requests || []);
        },
        error: (err) => {
          console.error("Error fetching requests:", err);
          toast.error("Error fetching requests");
          setRequests([]);
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong while fetching requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []); // Dependency array is empty to fetch data only on component mount

  const handleAcceptEditor = async (editorId) => {
    try {
      orgApi.handleAcceptRequest({
        payload: { id: currentLoggedInUser?._id, editorId },
        success: () => {
          toast.success("Editor accepted");
          fetchRequests(); // Refetch requests after accept
        },
        error: (err) => {
          console.error("Error accepting editor:", err);
          toast.error("Error accepting editor");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong while accepting the editor.");
    }
  };

  const handleRejectEditor = async (editorId) => {
    try {
      orgApi.handleRejectRequest({
        payload: { id: currentLoggedInUser?._id, editorId },
        success: () => {
          toast.success("Editor rejected");
          fetchRequests(); // Refetch requests after reject
        },
        error: (err) => {
          console.error("Error rejecting editor:", err);
          toast.error("Error rejecting editor");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong while rejecting the editor.");
    }
  };

  return (
    <>
      <div className="mt-28">
        {/* Organizers Section */}
        <section
          id="OrgRequests"
          className="container space-y-6 bg-slate-50 py-8 mx-auto md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              All Requests
            </h2>
          </div>

          {/* Content Based on Loading or Data */}
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : requests.length > 0 ? (
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              {requests.map((request) => (
                <div
                  key={request?.editorId}
                  className="relative overflow-hidden rounded-lg border bg-background p-2"
                >
                  <div className="flex flex-col items-center rounded-md p-4">
                    <i className="fas fa-user text-3xl"></i>
                    <div className="space-y-2 text-center">
                      <h3 className="font-bold">{request?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Email: {request?.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Description: {request?.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid justify-center gap-4 sm:grid-cols-2">
                    <button
                      className="mt-4 w-full rounded-lg px-4 py-2 transition-colors bg-green-500 text-white"
                      onClick={() => handleAcceptEditor(request.editorId)}
                    >
                      Accept
                    </button>
                    <button
                      className="mt-4 w-full rounded-lg px-4 py-2 transition-colors bg-red-400 text-white"
                      onClick={() => handleRejectEditor(request.editorId)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No Requests found</div>
          )}
        </section>
        
        <Footer />
      </div>
    </>
  );
}
