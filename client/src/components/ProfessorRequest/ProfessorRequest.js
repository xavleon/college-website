import React, { useState } from "react";
import axios from "axios";
import { Card, Button, TextInput, Textarea, Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

const ProfessorRequest = () => {
  const [department, setDepartment] = useState("");
  const [credentials, setCredentials] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/professor/request",
        {
          department,
          credentials,
        },
        { withCredentials: true }
      );

      setToastType("success");
      setToastMessage("Professor access request submitted successfully!");
      setShowToast(true);

      // Clear form
      setDepartment("");
      setCredentials("");

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setToastType("error");
      setToastMessage(
        error.response?.data?.message || "Error submitting request"
      );
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4">
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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Request Professor Access
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Department
              </label>
              <TextInput
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                placeholder="e.g., Biology, Chemistry, etc."
                className="w-full bg-gray-700 text-white border-0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Credentials & Experience
              </label>
              <Textarea
                value={credentials}
                onChange={(e) => setCredentials(e.target.value)}
                required
                rows={6}
                placeholder="Please describe your teaching experience, qualifications, and credentials..."
                className="w-full bg-gray-700 text-white border-0"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Submit Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfessorRequest;
