"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CircularProgress from "@/components/circular-progress";
import { useAuth } from "@/context/AuthContext";

interface Course {
  courseCode: string;
  courseName: string;
  prerequisites: string[];
  info: string;
}

export default function Home() {
  const { user } = useAuth();

  const totalCredits = useMemo(() => {
      const primary = user?.data.primaryDegree?.creditsRequired || 0
      const secondary = user?.data.additionalDegree?.creditsRequired || 0
      return primary + secondary
    }, [user])
  
    const completedCredits = useMemo(() => {
      const primary = user?.data.primaryDegree?.creditsCompleted || 0
      const secondary = user?.data.additionalDegree?.creditsCompleted || 0
      return primary + secondary
    }, [user])
  
    const completedClasses = Math.floor(completedCredits / 3)
    const requiredClasses = Math.floor(totalCredits / 3)

  // State for modal display
  const [selectedCourse, setSelectedCourse] = useState(null as Course | null);

  // Sample recommended courses data with multiple prerequisites
  const recommendedCourses = [
    {
      courseCode: "CPSC 457",
      courseName: "Principles of Operating Systems",
      prerequisites: ["CPSC 331", "CPSC 335"],
      info: "Explore OS concepts: concurrency, memory management, scheduling, etc.",
    },
    {
      courseCode: "CPSC 522",
      courseName: "Computer Algorithm Engineering II",
      prerequisites: ["CPSC 313", "CPSC 427"],
      info: "Advanced algorithm design and analysis, focusing on performance and engineering principles.",
    },
    {
      courseCode: "Math 471",
      courseName: "Imaginary Numbers and solving Things II",
      prerequisites: ["MATH 331"],
      info: "Dive deeper into complex analysis and advanced problem-solving techniques.",
    },
  ];

  const openModal = (course: Course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <main>
      {/* Main Header Section */}
      <div className="bg-[url(/mountain-range.jpg)] rounded-2xl mt-5 p-4">
        <div className="grid grid-cols-2 gap-4 xl:max-w-[80%]">
          {/* Student Info Card */}
          <Card className="col-span-full">
            <CardHeader className="flex flex-col sm:flex-row">
              <div className="flex-1">
                <CardDescription>Name</CardDescription>
                <CardTitle className="text-md pt-1 text-[var(--primary)]">
                  {user?.name}
                </CardTitle>
              </div>
              <div className="flex-1">
                <CardDescription>UID</CardDescription>
                <CardTitle className="text-md pt-1 text-[var(--primary)]">
                  {user?.id}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row">
              <div className="flex-1">
                <CardDescription>Degree Major</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)] mb-2 sm:mb-0">
                  {user?.data.primaryDegree.name}
                </p>
              </div>
              {user?.data.additionalDegree && (
                <div className="flex-1">
                  <CardDescription>Degree {user?.data.additionalDegree.type}</CardDescription>
                  <p className="text-md pt-1 text-[var(--secondary)] mb-2 sm:mb-0">
                    {user?.data.additionalDegree.name}
                  </p>
                </div>
              )}
              <div className="flex-1">
                <CardDescription>Current GPA</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)] mb-2 sm:mb-0">
                  {user?.cgpa ? user.cgpa.toFixed(2) : "N/A"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Credits Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[var(--primary)]">
                Credits Status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row">
              <div className="flex-1">
                <CardDescription>Credits Completed</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)] mb-2 sm:mb-0">
                  {completedCredits}
                </p>
              </div>
              <div className="flex-1">
                <CardDescription>Credits Remaining</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)] mb-2 sm:mb-0">
                  {totalCredits - completedCredits}
                </p>
              </div>
            </CardContent>
          </Card>

          {totalCredits !== 0 && <CircularProgress
            currentValue={completedCredits}
            totalValue={totalCredits}
            additionalInfo={[
              { label: "Credits", current: completedCredits, total: totalCredits },
              { label: "Classes", current: completedClasses, total: requiredClasses },
            ]}
          />}
        </div>
      </div>

      {/* Recommended Courses Section */}
      <div className="my-6">
        {/* Big bubble background color */}
        <Card style={{ backgroundColor: "#4E8098" }} className="text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Recommended Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-[#FCF7F8] p-4 rounded shadow text-black flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Course Code & Name */}
                  <div>
                    <p className="font-medium text-lg">{course.courseCode}</p>
                    <p className="text-sm text-gray-500">{course.courseName}</p>
                  </div>

                  {/* Prerequisites: multiple green pills */}
                  <div className="mt-2 sm:mt-0 flex flex-col gap-1 sm:gap-2 sm:flex-row sm:items-center">
                    <span className="text-sm font-semibold">Prerequisites:</span>
                    <div className="flex flex-wrap gap-2">
                      {course.prerequisites.map((prereq) => (
                        <div
                          key={prereq}
                          // Clickable pill that opens the modal for this course
                          onClick={() => openModal(course)}
                          className="bg-[#008000] text-white px-3 py-1 rounded-full cursor-pointer"
                        >
                          {prereq}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Overlay for Course Info */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">
              {selectedCourse.courseCode}: {selectedCourse.courseName}
            </h2>
            <p className="text-gray-700 mb-4">{selectedCourse.info}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
