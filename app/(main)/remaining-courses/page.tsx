"use client"

import type React from "react"
import CircularProgress from "@/components/circular-progress"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { ChevronRight, ChevronDown, AlertCircle } from "lucide-react"

interface TabsProps {
  tabs: Array<"Computer Science" | "Mathematics">
  selected: "Computer Science" | "Mathematics"
  onSelect: (tab: "Computer Science" | "Mathematics") => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, selected, onSelect }) => {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => onSelect(tab)}
          className={`px-4 py-2 cursor-pointer rounded-t-lg font-semibold text-sm ${tab === selected
            ? "bg-[#A31621] text-[#fff] border-[#a51c30]"
            : "bg-[#fff] border-1 text-[#808080]"
            }`}
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

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

  const calculateTotalCreditsRequired = () => {
    const primaryCreditsRequired = user?.data.primaryDegree.creditsRequired || 0
    const secondaryCreditsRequired = user?.data.additionalDegree?.creditsRequired || 0
    return primaryCreditsRequired + secondaryCreditsRequired
  }

  const calculateTotalCreditsCompleted = () => {
    const primaryCreditsCompleted = user?.data.primaryDegree.creditsCompleted || 0
    const secondaryCreditsCompleted = user?.data.additionalDegree?.creditsCompleted || 0
    return primaryCreditsCompleted + secondaryCreditsCompleted
  }

  const [credits, setCredits] = useState(0)
  const [totalCredits, setTotalCredits] = useState(0)
  const [classes, setClasses] = useState(0)
  const [totalClasses, setTotalClasses] = useState(0)

  useEffect(() => {
    const completed = calculateTotalCreditsCompleted()
    const required = calculateTotalCreditsRequired()
    const calculatedClasses = Math.floor(completed / 3)
    const totalCls = Math.floor(required / 3)

    setCredits(completed)
    setTotalCredits(required)
    setClasses(calculatedClasses)
    setTotalClasses(totalCls)
  }, [user])

  const [selectedTab, setSelectedTab] = useState<"Computer Science" | "Mathematics">("Computer Science")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const courses = coursesData[selectedTab] || []

  return (
    <div className="mt-5">
      {/* Tabs rendered outside the main container */}
      <Tabs
        tabs={["Computer Science", "Mathematics"]}
        selected={selectedTab}
        onSelect={(tab) => {
          setSelectedTab(tab)
          setDropdownOpen(false)
        }}
      />

      {/* Main container with header and dropdown */}
      <div className="rounded-xl rounded-tl-none bg-[#4a768a]">
        {/* Header Section - layout with flex */}
        <div className="p-6 flex justify-between items-center">
          {/* Left Section: Heading and Degree Selector */}
          <div className="text-white flex flex-col justify-center">
            <h2 className="text-5xl font-semibold mb-2">Mandatory Courses</h2>
          </div>

          {/* Right Section: Progress */}
          {totalCredits !== 0 && (
            <CircularProgress
              currentValue={credits}
              totalValue={totalCredits}
              size={120}
              strokeWidth={10}
              label="Complete"
              additionalInfo={[
                { label: "Credits", current: credits, total: totalCredits },
                { label: "Classes", current: classes, total: totalClasses },
              ]}
              className="p-3"
            />
          )}
        </div>

        <div className={`text-white pl-10 ${!dropdownOpen && "pb-6"}`}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="text-3xl font-semibold focus:outline-none flex items-center cursor-pointer"
          >
            {dropdownOpen ? (
              <ChevronDown className="mr-2" size={28} />
            ) : (
              <ChevronRight className="mr-2" size={28} />
            )}
            <span>{selectedTab} (Major)</span>
          </button>
        </div>

        {/* Dropdown content aligned under the heading only */}
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
                  className="bg-white rounded-full shadow-md py-4 px-6 grid grid-cols-3 items-center"
                >
                  <div>{course.code}</div>
                  <div>{course.name}</div>
                  <div className="flex justify-end items-center gap-2">
                    {course.prerequisites.length === 0 ? (
                      <span className="bg-[#008000] text-white px-3 py-1 rounded-md text-sm">N/A</span>
                    ) : (
                      <>
                        <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 px-3 py-1 rounded flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-yellow-800" />
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