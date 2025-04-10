"use client";

import { type Course, courses as allCourses } from "@/data/mockData"
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
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const recommendedCourses = useMemo(() => {
    return allCourses.filter((course) => {
      return user?.data.recommendedCourses?.includes(course.code);
    });
  }, [user]);

  const openModal = (course: Course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  const isPrerequisiteCompleted = (prerequisiteCode: string): boolean => {
    return user?.data.completedCourses?.some(
      (course) => course.code === prerequisiteCode
    ) || false;
  }

  const getCourseFromPrerequisite = (prerequisiteCode: string): Course | undefined => {
    // Find the course that matches the prerequisite code
    return allCourses.find((course) => course.code.trim().toLowerCase() === prerequisiteCode.trim().toLowerCase())
  }

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
              {recommendedCourses.map((course) => (
                <div
                  key={course.code}
                  onClick={() => openModal(course)}
                  className="group bg-[#FCF7F8] p-4 rounded shadow text-black flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between cursor-pointer"
                >
                  {/* Course Code & Name */}
                  <div>
                    <p className="group-hover:font-semibold font-medium text-lg">{course.code}</p>
                    <p className="group-hover:font-semibold text-sm text-gray-500">{course.name}</p>
                  </div>

                  {/* Prerequisites: multiple green pills */}
                  <div className="mt-2 sm:mt-0 flex flex-col gap-1 sm:gap-2 sm:flex-row sm:items-center">
                    <span className="text-sm font-semibold">Prerequisites:</span>
                    <div className="flex flex-wrap gap-2">
                      {course.prerequisites ? course.prerequisites.map((prereq) => {
                        const isCompleted = isPrerequisiteCompleted(prereq)

                        return (
                          <Button
                            variant="outline"
                            key={prereq}
                            onClick={(e) => {
                              e.stopPropagation()
                              openModal(getCourseFromPrerequisite(prereq) as Course)
                            }}
                            className={`px-3 py-1 cursor-pointer rounded-md text-sm whitespace-nowrap ${isCompleted ? "bg-[#008000] text-white" : "bg-[#A31621] text-white"
                              }`}
                          >
                            {prereq}
                          </Button>
                        )
                      }) : (
                        <span
                          className="bg-[#008000] text-white px-3 py-1 rounded-md text-sm cursor-default"
                          onClick={(e) => e.stopPropagation()}
                        >
                          N/A
                        </span>
                      )}
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#CED3DC] p-6 rounded shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <X className="float-right cursor-pointer" size={40} onClick={closeModal} />
            <div
              className="text-center p-1 mb-4 w-[80%] mx-auto rounded-md"
            >
              <h2 className="text-2xl font-semibold">
                {selectedCourse.code}: {selectedCourse.name}
              </h2>
            </div>

            <div className="bg-white rounded-md p-2 mb-4">
              <p className="font-bold">Description:</p>
              <p>{selectedCourse.description}</p>
            </div>

            <div className="bg-white rounded-md p-2 flex gap-2">
              <p className="font-bold">Prerequisite(s):</p>
              {selectedCourse.prerequisites ? selectedCourse.prerequisites.map((prereq) => {
                const isCompleted = isPrerequisiteCompleted(prereq)
                return (
                  <div
                    key={prereq}
                    className={`px-3 py-1 rounded-md text-sm whitespace-nowrap text-white ${isCompleted ? "bg-[#008000]" : "bg-[#A31621]"
                      }`}
                  >

                    {prereq}
                  </div>
                )
              }
              ) : (
                <span className="bg-[#008000] text-white px-3 py-1 rounded-md text-sm">N/A</span>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
