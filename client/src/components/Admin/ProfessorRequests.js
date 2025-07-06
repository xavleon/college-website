import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Table, Badge, Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

const ProfessorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/professor/requests",
        {
          withCredentials: true,
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleRequestAction = async (userId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/professor/request/${userId}`,
        {
          status,
        },
        { withCredentials: true }
      );

      setToastType("success");
      setToastMessage(`Request ${status} successfully`);
      setShowToast(true);

      // Refresh the requests list
      fetchRequests();

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setToastType("error");
      setToastMessage(
        error.response?.data?.message || "Error processing request"
      );
      setShowToast(true);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {showToast && (
          <div className="mb-4">
            <Toast>
              <div
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  toastType === "success"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {toastType === "success" ? (
                  <HiCheck className="h-5 w-5" />
                ) : (
                  <HiX className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3 text-sm font-normal">{toastMessage}</div>
              <Toast.Toggle onClick={() => setShowToast(false)} />
            </Toast>
          </div>
        )}

        <Card className="bg-gray-800 border-0">
          <h2 className="text-2xl font-bold text-white mb-6">
            Professor Access Requests
          </h2>

          {requests.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              No pending requests
            </p>
          ) : (
            <Table className="w-full">
              <Table.Head>
                <Table.HeadCell className="bg-gray-700 text-white">
                  Name
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-700 text-white">
                  Email
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-700 text-white">
                  Department
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-700 text-white">
                  Request Date
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-700 text-white">
                  Actions
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-gray-700">
                {requests.map((request) => (
                  <Table.Row key={request._id} className="bg-gray-800">
                    <Table.Cell className="text-white">
                      {request.firstName} {request.lastName}
                    </Table.Cell>
                    <Table.Cell className="text-white">
                      {request.email}
                    </Table.Cell>
                    <Table.Cell className="text-white">
                      {request.professorRequest.department}
                    </Table.Cell>
                    <Table.Cell className="text-white">
                      {formatDate(request.professorRequest.requestDate)}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          color="success"
                          onClick={() =>
                            handleRequestAction(request._id, "approved")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          color="failure"
                          onClick={() =>
                            handleRequestAction(request._id, "rejected")
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProfessorRequests;
