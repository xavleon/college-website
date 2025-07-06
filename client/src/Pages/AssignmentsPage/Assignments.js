import React, { useState, useEffect } from "react";
import Nav from "../../Navbar/Navbar";
import {
  Card,
  Select,
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import axios from "axios";
import AssignmentManagement from "./AssignmentManagement";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submission, setSubmission] = useState({
    attachments: [],
    comments: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const isProfessor = user?.role === "professor";

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/assignments");
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  // Get unique courses for the dropdown
  const courses = ["all", ...new Set(assignments.map((a) => a.courseSection))];

  // Get sections for the selected course
  const sections = [
    "all",
    ...new Set(
      assignments
        .filter(
          (a) => selectedCourse === "all" || a.courseSection === selectedCourse
        )
        .map((a) => a.section)
    ),
  ];

  // Filter assignments based on selections
  const filteredAssignments = assignments.filter((assignment) => {
    const courseMatch =
      selectedCourse === "all" || assignment.courseSection === selectedCourse;
    const sectionMatch =
      selectedSection === "all" || assignment.section === selectedSection;
    return courseMatch && sectionMatch;
  });

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/assignments/${selectedAssignment._id}/submit`,
        submission
      );
      setShowSubmitModal(false);
      fetchAssignments(); // Refresh assignments
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  const handleViewSubmission = async (assignment) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/assignments/${assignment._id}/my-submission`
      );
      setSelectedAssignment(assignment);
      setSubmission(response.data);
      setShowSubmitModal(true);
    } catch (error) {
      console.error("Error fetching submission:", error);
      // If no submission exists, open modal with empty submission
      setSelectedAssignment(assignment);
      setSubmission({ attachments: [], comments: "" });
      setShowSubmitModal(true);
    }
  };

  if (isProfessor) {
    return <AssignmentManagement />;
  }

  return (
    <div>
      <Nav />
      <div className="bg-white dark:bg-gray-900 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Course Assignments
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              View and submit your assignments
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <div className="w-full sm:w-64">
                <Select
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedSection("all");
                  }}
                >
                  <option value="all">All Courses</option>
                  {courses
                    .filter((c) => c !== "all")
                    .map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment._id} className="max-w-sm">
                <div className="flex justify-between items-start">
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {assignment.title}
                  </h5>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {assignment.category}
                  </span>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-sm mb-1">
                  {assignment.courseSection}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                  {assignment.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                  <Button onClick={() => handleViewSubmission(assignment)}>
                    Submit Assignment
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Submit Assignment Modal */}
          <Modal
            show={showSubmitModal}
            onClose={() => setShowSubmitModal(false)}
          >
            <Modal.Header>Submit Assignment</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmitAssignment} className="space-y-4">
                <div>
                  <Label htmlFor="attachments">Attachments</Label>
                  <TextInput
                    id="attachments"
                    type="file"
                    multiple
                    onChange={(e) => {
                      // Handle file uploads
                      const files = Array.from(e.target.files);
                      // You'll need to implement file upload logic here
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Textarea
                    id="comments"
                    value={submission.comments}
                    onChange={(e) =>
                      setSubmission({ ...submission, comments: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="submit" color="success">
                    Submit
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setShowSubmitModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
