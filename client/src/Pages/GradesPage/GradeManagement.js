import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Table,
  Button,
  TextInput,
  Textarea,
  Toast,
} from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

const GradeManagement = () => {
  const [user, setUser] = useState(null);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    if (userData) {
      if (userData.role === "student") {
        fetchStudentGrades(userData._id);
      } else if (userData.role === "professor") {
        fetchAssignments();
      }
    }
  }, []);

  const fetchStudentGrades = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/grades/student/${studentId}`,
        {
          withCredentials: true,
        }
      );
      setGrades(response.data);
    } catch (error) {
      showToastMessage("Error fetching grades", "error");
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/grades/assignments",
        {
          withCredentials: true,
        }
      );
      setAssignments(response.data);
    } catch (error) {
      showToastMessage("Error fetching assignments", "error");
    }
  };

  const handleGradeSubmit = async (studentId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/grades",
        {
          studentId,
          assignmentId: selectedAssignment,
          score: parseFloat(gradeInput),
          feedback,
        },
        { withCredentials: true }
      );

      showToastMessage("Grade submitted successfully", "success");
      setGradeInput("");
      setFeedback("");
      setSelectedAssignment(null);
      fetchAssignments();
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || "Error submitting grade",
        "error"
      );
    }
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const calculateGPA = () => {
    if (grades.length === 0) return 0;
    const totalPoints = grades.reduce((sum, grade) => sum + grade.score, 0);
    return (totalPoints / grades.length).toFixed(2);
  };

  const StudentView = () => (
    <Card className="bg-gray-800 border-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">My Grades</h2>
        <div className="text-lg text-white">
          GPA: <span className="font-bold">{calculateGPA()}</span>
        </div>
      </div>

      <Table className="w-full">
        <Table.Head>
          <Table.HeadCell className="bg-gray-700 text-white">
            Assignment
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-700 text-white">
            Score
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-700 text-white">
            Feedback
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-700 text-white">
            Date
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-700">
          {grades.map((grade) => (
            <Table.Row key={grade._id} className="bg-gray-800">
              <Table.Cell className="text-white">
                {grade.assignment.title}
              </Table.Cell>
              <Table.Cell className="text-white">
                {grade.score}/{grade.assignment.totalPoints}
              </Table.Cell>
              <Table.Cell className="text-white">{grade.feedback}</Table.Cell>
              <Table.Cell className="text-white">
                {new Date(grade.gradedAt).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );

  const ProfessorView = () => (
    <Card className="bg-gray-800 border-0">
      <h2 className="text-2xl font-bold text-white mb-6">Grade Management</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Assignment
          </label>
          <select
            className="w-full bg-gray-700 text-white rounded-lg p-2.5"
            value={selectedAssignment || ""}
            onChange={(e) => setSelectedAssignment(e.target.value)}
          >
            <option value="">Choose an assignment</option>
            {assignments.map((assignment) => (
              <option key={assignment._id} value={assignment._id}>
                {assignment.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Grade
          </label>
          <TextInput
            type="number"
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
            placeholder="Enter grade"
            className="w-full bg-gray-700 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Feedback
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter feedback"
            rows={4}
            className="w-full bg-gray-700 text-white"
          />
        </div>

        <Button
          onClick={() => handleGradeSubmit()}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Submit Grade
        </Button>
      </div>
    </Card>
  );

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

        {user?.role === "student" ? <StudentView /> : <ProfessorView />}
      </div>
    </div>
  );
};

export default GradeManagement;
