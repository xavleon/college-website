import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
  Select,
} from "flowbite-react";
import axios from "axios";
import { HiPlus, HiPencil, HiTrash, HiUsers } from "react-icons/hi";

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseSection: "",
    dueDate: "",
    totalPoints: 0,
    category: "homework",
    weight: 0,
  });

  // Get auth token
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Configure axios with auth header
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/assignments",
          axiosConfig
        );
        setAssignments(response.data);
      } catch (error) {
        console.error(
          "Error fetching assignments:",
          error.response?.data?.message || error.message
        );
        alert(
          "Failed to fetch assignments. Please check your connection and try again."
        );
      }
    };
    if (token) {
      fetchAssignments();
    }
  }, [token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAssignment) {
        // Update existing assignment
        await axios.put(
          `http://localhost:5000/api/assignments/${selectedAssignment._id}`,
          formData,
          axiosConfig
        );
      } else {
        // Create new assignment
        const response = await axios.post(
          "http://localhost:5000/api/assignments",
          formData,
          axiosConfig
        );
        console.log("Assignment created:", response.data);
      }
      // Refresh assignments
      const response = await axios.get(
        "http://localhost:5000/api/assignments",
        axiosConfig
      );
      setAssignments(response.data);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error(
        "Error saving assignment:",
        error.response?.data?.message || error.message
      );
      alert(
        "Failed to save assignment. Please check all fields and try again."
      );
    }
  };

  // Handle assignment deletion
  const handleDelete = async (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/assignments/${assignmentId}`,
          axiosConfig
        );
        setAssignments(assignments.filter((a) => a._id !== assignmentId));
      } catch (error) {
        console.error(
          "Error deleting assignment:",
          error.response?.data?.message || error.message
        );
        alert("Failed to delete assignment. Please try again.");
      }
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      courseSection: "",
      dueDate: "",
      totalPoints: 0,
      category: "homework",
      weight: 0,
    });
    setSelectedAssignment(null);
  };

  // Handle edit assignment
  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      courseSection: assignment.courseSection,
      dueDate: new Date(assignment.dueDate).toISOString().split("T")[0],
      totalPoints: assignment.totalPoints,
      category: assignment.category,
      weight: assignment.weight,
    });
    setShowModal(true);
  };

  // View student submissions
  const handleViewSubmissions = async (assignment) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/assignments/${assignment._id}/submissions`,
        axiosConfig
      );
      setStudents(response.data);
      setSelectedAssignment(assignment);
      setShowStudentModal(true);
    } catch (error) {
      console.error(
        "Error fetching submissions:",
        error.response?.data?.message || error.message
      );
      alert("Failed to fetch student submissions. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Assignment Management
        </h2>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <HiPlus className="mr-2 h-5 w-5" />
          Create Assignment
        </Button>
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => (
          <Card key={assignment._id}>
            <div className="flex justify-between items-start">
              <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                {assignment.title}
              </h5>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {assignment.category}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-400">
              {assignment.description}
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              <p>Points: {assignment.totalPoints}</p>
              <p>Weight: {assignment.weight}%</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                onClick={() => handleViewSubmissions(assignment)}
              >
                <HiUsers className="mr-2 h-4 w-4" />
                Submissions
              </Button>
              <Button
                size="sm"
                color="warning"
                onClick={() => handleEdit(assignment)}
              >
                <HiPencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                size="sm"
                color="failure"
                onClick={() => handleDelete(assignment._id)}
              >
                <HiTrash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Assignment Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          {selectedAssignment ? "Edit Assignment" : "Create New Assignment"}
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <TextInput
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="courseSection">Course Section</Label>
              <TextInput
                id="courseSection"
                value={formData.courseSection}
                onChange={(e) =>
                  setFormData({ ...formData, courseSection: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <TextInput
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="homework">Homework</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="project">Project</option>
                <option value="lab">Lab</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="totalPoints">Total Points</Label>
              <TextInput
                id="totalPoints"
                type="number"
                value={formData.totalPoints}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalPoints: parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (%)</Label>
              <TextInput
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: parseInt(e.target.value) })
                }
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit" color="success">
                {selectedAssignment ? "Update" : "Create"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Student Submissions Modal */}
      <Modal
        show={showStudentModal}
        onClose={() => setShowStudentModal(false)}
        size="xl"
      >
        <Modal.Header>
          Student Submissions - {selectedAssignment?.title}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            {students.map((submission) => (
              <Card key={submission._id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h6 className="font-medium">{submission.student.name}</h6>
                    <p className="text-sm text-gray-600">
                      Status: {submission.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Submitted:{" "}
                      {new Date(submission.submissionDate).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <input
                      type="number"
                      className="w-20 px-2 py-1 border rounded"
                      placeholder="Grade"
                      value={submission.grade || ""}
                      onChange={async (e) => {
                        try {
                          await axios.put(
                            `http://localhost:5000/api/submissions/${submission._id}`,
                            {
                              grade: parseInt(e.target.value),
                            },
                            axiosConfig
                          );
                        } catch (error) {
                          console.error(
                            "Error updating grade:",
                            error.response?.data?.message || error.message
                          );
                          alert("Failed to update grade. Please try again.");
                        }
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssignmentManagement;
