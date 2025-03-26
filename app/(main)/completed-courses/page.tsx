"use client";

import { useState } from "react";

interface Course {
  courseNumber: string;
  courseName: string;
  grade: string;
  instructor: string;
  term: string;
}

export default function CompletedCourses() {
  const [courses] = useState<Course[]>([
    {
      courseNumber: "POLY 201",
      courseName: "Geopolitics Introduction",
      grade: "A",
      instructor: "Terry Terrif",
      term: "Winter 2025",
    },
    {
      courseNumber: "CPSC 413",
      courseName: "Computer Algorithms II",
      grade: "D+",
      instructor: "Peter (Him) Hoyer",
      term: "Winter 2025",
    },
    {
      courseNumber: "CPSC 329",
      courseName: "Introduction to Privacy & Security",
      grade: "A-",
      instructor: "Janet Leahy",
      term: "Winter 2025",
    },
    {
      courseNumber: "CPSC 457",
      courseName: "Operating Systems Class",
      grade: "B+",
      instructor: "Old Man",
      term: "Winter 2025",
    },
    {
      courseNumber: "MATH 211",
      courseName: "Linear Algebra I",
      grade: "B+",
      instructor: "Tin Lee",
      term: "Winter 2025",
    },
    {
      courseNumber: "CPSC 572",
      courseName: "Datamining & Network Analysis",
      grade: "B+",
      instructor: "Emma Towlson",
      term: "Fall 2024",
    },
  ]);

  // State for search, sorting, and pagination.
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter courses based on the search term.
  const filteredCourses = courses.filter((course) => {
    const combined = [
      course.courseNumber,
      course.courseName,
      course.grade,
      course.instructor,
      course.term,
    ]
      .join(" ")
      .toLowerCase();
    return combined.includes(searchTerm.toLowerCase());
  });

  // Sort the filtered courses by term (using the year extracted from the term string).
  const sortedCourses = filteredCourses.slice().sort((a, b) => {
    const yearA = parseInt(a.term.split(" ").pop() || "0", 10);
    const yearB = parseInt(b.term.split(" ").pop() || "0", 10);
    return sortAscending ? yearA - yearB : yearB - yearA;
  });

  // Pagination logic.
  const itemsPerPage = 4;
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle sort order when the button is clicked.
  const toggleSort = () => {
    setSortAscending((prev) => !prev);
  };

  return (
    <main className="p-6 md:p-8 w-full mx-auto">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-4 pr-10 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page on new search
            }}
          />
          <svg
            className="absolute right-3 top-2.5 w-4 h-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 111.414-1.414l3.386 3.386a1 1 0 01-1.414 1.414l-3.386-3.386zM8 14A6 6 0 108 2a6 6 0 000 12z" />
          </svg>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4">Completed Courses</h1>

      {/* Table with Consistent Header and Pill Rows */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate [border-spacing:0.75rem]">
          <thead>
            <tr className="grid grid-cols-[1fr_2fr_1fr_2fr_1fr]">
              <th className="px-6 py-2 text-left text-gray-500 text-sm font-semibold">
                Course #
              </th>
              <th className="px-6 py-2 text-left text-gray-500 text-sm font-semibold">
                Course Name
              </th>
              <th className="px-6 py-2 text-left text-gray-500 text-sm font-semibold pl-4">
                Grade
              </th>
              <th className="px-6 py-2 text-left text-gray-500 text-sm font-semibold">
                Instructor
              </th>
              <th className="px-6 py-2 text-left text-gray-500 text-sm font-semibold flex items-center gap-2">
                <span>Term</span>
                <button onClick={toggleSort} className="text-xs text-blue-500 hover:underline">
                  {sortAscending ? "↑" : "↓"}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course, index) => (
              <tr key={index} className="[&>*]:p-0 border-none">
                <td colSpan={5}>
                  <div className="bg-white shadow rounded-full px-6 py-4 grid grid-cols-[1fr_2fr_1fr_2fr_1fr] items-center gap-4">
                    <span>{course.courseNumber}</span>
                    <span>{course.courseName}</span>
                    <span className="pl-4">{course.grade}</span>
                    <span>{course.instructor}</span>
                    <span>{course.term}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clickable Pagination */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              style={currentPage === pageNum ? { backgroundColor: "#A31621" } : {}}
              className={`px-3 py-1 rounded-full transition ${
                currentPage === pageNum
                  ? "text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </main>
  );
}
