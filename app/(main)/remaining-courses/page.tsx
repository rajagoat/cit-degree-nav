"use client"

import type React from "react"
import { useEffect, useState, useMemo } from "react"
import { ChevronRight, ChevronDown, AlertCircle } from "lucide-react"
import CircularProgress from "@/components/circular-progress"
import { useAuth } from "@/context/AuthContext"

interface TabsProps {
  tabs: Array<"Computer Science" | "Mathematics">
  selected: "Computer Science" | "Mathematics"
  onSelect: (tab: "Computer Science" | "Mathematics") => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, selected, onSelect }) => (
  <div className="flex">
    {tabs.map((tab) => (
      <div
        key={tab}
        onClick={() => onSelect(tab)}
        className={`px-4 py-2 cursor-pointer rounded-t-lg font-semibold text-sm ${tab === selected
          ? "bg-[#A31621] text-white border-[#a51c30]"
          : "bg-white border-1 text-[#808080]"
          }`}
      >
        {tab}
      </div>
    ))}
  </div>
)

const coursesData = {
  "Computer Science": [
    { code: "CS 101", name: "Introduction to Programming", prerequisites: [] },
    { code: "CS 201", name: "Data Structures", prerequisites: ["CS 101"] },
    { code: "CS 301", name: "Algorithms", prerequisites: ["CS 201"] },
    { code: "CS 401", name: "Machine Learning", prerequisites: ["CS 301", "MATH 301"] },
  ],
  Mathematics: [
    { code: "MATH 322", name: "Advanced Math Techniques I", prerequisites: [] },
    { code: "MATH 389", name: "Aerospace Mathematics I", prerequisites: [] },
    { code: "MATH 489", name: "Advanced Aerospace Mathematics II", prerequisites: ["MATH 389"] },
    { code: "MATH 512", name: "Machine Learning in Math", prerequisites: ["MATH 389", "MATH 479"] },
  ],
}

export default function RemainingCourses() {
  const { user } = useAuth()

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

  const [selectedTab, setSelectedTab] = useState<"Computer Science" | "Mathematics">("Computer Science")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const courses = coursesData[selectedTab]

  return (
    <div className="mt-5">
      {/* Tabs */}
      <Tabs
        tabs={["Computer Science", "Mathematics"]}
        selected={selectedTab}
        onSelect={(tab) => {
          setSelectedTab(tab)
          setDropdownOpen(false)
        }}
      />

      {/* Main Container */}
      <div className="rounded-xl rounded-tl-none bg-[#4a768a]">
        {/* Header Section */}
        <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Left Section: Mandatory Courses heading */}
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5 xl font-semibold">Mandatory Courses</h2>
          </div>
          {/* Right Section: Progress Bar */}
          {totalCredits > 0 && (
            <div className="mt-6 md:mt-0">
              <CircularProgress
                currentValue={completedCredits}
                totalValue={totalCredits}
                size={150}
                strokeWidth={10}
                label="Complete"
                additionalInfo={[
                  { label: "Credits", current: completedCredits, total: totalCredits },
                  { label: "Classes", current: completedClasses, total: requiredClasses },
                ]}
                className="md:w-[25vw]"
              />
            </div>
          )}
        </div>
        {/* Dropdown Toggle (placed separately above the content) */}
        <div className={`text-white pl-5 ${!dropdownOpen && 'pb-6'}`}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-lg md:text-2xl lg:text-3xl font-semibold focus:outline-none flex items-center cursor-pointer"
          >
            {dropdownOpen ? (
              <ChevronDown className="mr-2" size={28} />
            ) : (
              <ChevronRight className="mr-2" size={28} />
            )}
            <span>{selectedTab} (Major)</span>
          </button>
        </div>
        {/* Dropdown Content */}
        {dropdownOpen && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 text-white font-medium py-3 px-4">
              <div>Course #</div>
              <div>Course Name</div>
              <div className="text-right">Prerequisite(s)</div>
            </div>
            <div className="space-y-3">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-sm shadow-md py-4 px-6 grid grid-cols-3 items-center"
                >
                  <div>{course.code}</div>
                  <div>{course.name}</div>
                  <div className="flex justify-end items-center gap-2 flex-wrap">
                    {course.prerequisites.length === 0 ? (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-md text-sm">N/A</span>
                    ) : (
                      <>
                        <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 px-3 py-1 rounded flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        {course.prerequisites.map((prereq) => (
                          <span
                            key={prereq}
                            className="bg-[#A31621] text-white px-3 py-1 rounded-md text-sm whitespace-nowrap"
                          >
                            {prereq}
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}