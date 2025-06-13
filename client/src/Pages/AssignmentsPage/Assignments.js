import React, { useState } from "react";
import Nav from "../../Navbar/Navbar";
import { Card, Select } from "flowbite-react";

const assignmentsData = [
  {
    id: 1,
    course: "Chemistry and Biochemistry - LS197",
    section: "Section A (Mon/Wed 9:00 AM)",
    title: "Lab Report: Chemical Reactions",
    dueDate: "2024-04-15",
    status: "Open",
    description:
      "Write a detailed lab report on the chemical reactions observed during this week's laboratory session.",
  },
  {
    id: 2,
    course: "Chemistry and Biochemistry - LS197",
    section: "Section B (Tue/Thu 2:00 PM)",
    title: "Lab Report: Chemical Reactions",
    dueDate: "2024-04-17",
    status: "Open",
    description:
      "Write a detailed lab report on the chemical reactions observed during this week's laboratory session.",
  },
  {
    id: 3,
    course: "Anatomy & Physiology I - LS198",
    section: "Section A (Mon/Wed 11:00 AM)",
    title: "Muscle System Diagram",
    dueDate: "2024-04-20",
    status: "Open",
    description:
      "Create and label a comprehensive diagram of the human muscular system.",
  },
  {
    id: 4,
    course: "Anatomy & Physiology I - LS198",
    section: "Section B (Tue/Thu 3:30 PM)",
    title: "Muscle System Diagram",
    dueDate: "2024-04-22",
    status: "Open",
    description:
      "Create and label a comprehensive diagram of the human muscular system.",
  },
  {
    id: 5,
    course: "Microbiology - LS196",
    section: "Section A (Mon/Wed 2:00 PM)",
    title: "Bacterial Growth Study",
    dueDate: "2024-04-25",
    status: "Open",
    description:
      "Document and analyze bacterial growth patterns under different conditions.",
  },
  {
    id: 6,
    course: "Microbiology - LS196",
    section: "Section B (Tue/Thu 9:00 AM)",
    title: "Bacterial Growth Study",
    dueDate: "2024-04-27",
    status: "Open",
    description:
      "Document and analyze bacterial growth patterns under different conditions.",
  },
];

const Assignments = () => {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");

  // Get unique courses for the dropdown
  const courses = ["all", ...new Set(assignmentsData.map((a) => a.course))];

  // Get sections for the selected course
  const sections = [
    "all",
    ...new Set(
      assignmentsData
        .filter((a) => selectedCourse === "all" || a.course === selectedCourse)
        .map((a) => a.section)
    ),
  ];

  // Filter assignments based on selections
  const filteredAssignments = assignmentsData.filter((assignment) => {
    const courseMatch =
      selectedCourse === "all" || assignment.course === selectedCourse;
    const sectionMatch =
      selectedSection === "all" || assignment.section === selectedSection;
    return courseMatch && sectionMatch;
  });

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
              View and manage your assignments for all courses
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
              <div className="w-full sm:w-64">
                <Select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="all">All Sections</option>
                  {sections
                    .filter((s) => s !== "all")
                    .map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="max-w-sm">
                <div className="flex justify-between items-start">
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {assignment.title}
                  </h5>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    {assignment.status}
                  </span>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-sm mb-1">
                  {assignment.course}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-sm mb-2">
                  {assignment.section}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                  {assignment.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </span>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    View Details
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
