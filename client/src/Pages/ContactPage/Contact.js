import React, { useState, useEffect } from "react";
import Nav from "../../Navbar/Navbar";
import { Card, Button, TextInput, Textarea } from "flowbite-react";
import {
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineChat,
  HiOutlineCalendar,
  HiOutlinePencil,
} from "react-icons/hi";
import axios from "axios";

const Contact = () => {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState("email"); // 'email' or 'chat'

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactData = {
        from: user?.email || "anonymous",
        subject: subject,
        message: messageText,
      };

      const response = await axios.post(
        "http://localhost:5000/api/contact/send",
        contactData
      );

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setSubject("");
        setMessageText("");
      }
    } catch (error) {
      setStatus("Error sending message. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Nav />
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Contact Professor Leon
            </h1>
            <p className="text-xl text-gray-300">
              Have questions? I'm here to help.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 gap-8">
            {/* Contact Options Card */}
            <Card className="bg-gray-800 border-0">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-700">
                <button
                  className={`flex items-center px-6 py-3 ${
                    activeTab === "email"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("email")}
                >
                  <HiOutlineMail className="mr-2 h-5 w-5" />
                  Email
                </button>
                <button
                  className={`flex items-center px-6 py-3 ${
                    activeTab === "chat"
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("chat")}
                >
                  <HiOutlineChat className="mr-2 h-5 w-5" />
                  Office Hours
                </button>
              </div>

              {/* Email Form */}
              {activeTab === "email" && (
                <div className="py-8">
                  <div className="text-center mb-8">
                    <HiOutlinePencil className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Send a Message
                    </h3>
                    <p className="text-gray-400">
                      I'll get back to you within 24-48 hours during weekdays.
                    </p>
                  </div>

                  <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gray-700 px-6 py-4">
                      <div className="flex items-center">
                        <HiOutlineMail className="h-5 w-5 text-blue-500 mr-2" />
                        <h4 className="text-gray-300 font-medium">
                          New Message
                        </h4>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Subject
                          </label>
                          <TextInput
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            placeholder="Enter the subject of your message"
                            className="w-full bg-gray-600 text-white border-0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Message
                          </label>
                          <Textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            required
                            rows={8}
                            placeholder="Type your message here..."
                            className="w-full bg-gray-600 text-white border-0"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Send Message
                        </Button>
                        {status && (
                          <p
                            className={`mt-4 text-center ${
                              status.includes("Error")
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {status}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Office Hours Info */}
              {activeTab === "chat" && (
                <div className="py-6">
                  <div className="text-center mb-8">
                    <HiOutlineClock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Office Hours
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Drop by during office hours for quick questions and
                      guidance.
                    </p>
                    <div className="bg-gray-700 rounded-lg p-4 mb-6 mx-auto max-w-md">
                      <p className="text-gray-300 font-medium mb-2">
                        Available Times:
                      </p>
                      <p className="text-gray-400">
                        Monday - Thursday: 2:00 PM - 4:00 PM
                      </p>
                      <p className="text-gray-400">
                        Friday: By appointment only
                      </p>
                    </div>
                  </div>

                  {/* Scheduling Section */}
                  <div className="text-center border-t border-gray-700 pt-6">
                    <HiOutlineCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Schedule an Appointment
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Need to meet outside office hours? Schedule an appointment
                      below.
                    </p>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        (window.location.href =
                          "https://calendly.com/professor-leon")
                      }
                    >
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Additional Contact Info */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
                activeTab === "email" ? "mt-8" : ""
              }`}
            >
              <Card className="bg-gray-800 border-0">
                <div className="text-center">
                  <HiOutlineMail className="mx-auto h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Email
                  </h3>
                  <p className="text-gray-400">professor.leon@university.edu</p>
                </div>
              </Card>
              <Card className="bg-gray-800 border-0">
                <div className="text-center">
                  <HiOutlineClock className="mx-auto h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-400">Within 24-48 hours</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
