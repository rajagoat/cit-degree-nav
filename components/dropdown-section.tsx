"use client"

import { type Course, courses as allCourses } from "@/data/mockData"
import { ChevronRight, ChevronDown, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

interface DropdownSectionProps {
    title: string
    courses: Course[]
    completedCourseCodes: string[] // list of course codes t    he student has completed
    creditInfo?: string // information about credits completed for this section
}

const ITEMS_PER_PAGE = 5

export default function DropdownSection({ title, courses, completedCourseCodes, creditInfo }: DropdownSectionProps) {
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    // State for modal display
    const [selectedCourse, setSelectedCourse] = useState(null as Course | null);

    const openModal = (course: Course) => {
        setSelectedCourse(course);
    };

    const closeModal = () => {
        setSelectedCourse(null);
    };

    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE)
    const paginatedCourses = courses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
    }

    // Reset pagination when dropdown is closed/opened (optional)
    const toggleDropdown = () => {
        setOpen((prev) => {
            if (prev) setCurrentPage(1)
            return !prev
        })
    }

    // Helper function to check if a prerequisite is completed
    const isPrerequisiteCompleted = (prerequisiteCode: string): boolean => {
        // Normalize both the prerequisite code and completed codes for accurate comparison
        const normalizedPrereq = prerequisiteCode.trim().toLowerCase()
        const normalizedCompletedCodes = completedCourseCodes.map((code) => code.trim().toLowerCase())

        // Check if the prerequisite is in the completed courses list
        return normalizedCompletedCodes.includes(normalizedPrereq)
    }

    const getCourseFromPrerequisite = (prerequisiteCode: string): Course | undefined => {
        // Find the course that matches the prerequisite code
        return allCourses.find((course) => course.code.trim().toLowerCase() === prerequisiteCode.trim().toLowerCase())
    }

    return (
        <div className={`${!open && "pb-6"}`}>
            <div className="flex items-center gap-5">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center font-semibold text-lg text-white focus:outline-none cursor-pointer"
                >
                    {open ? <ChevronDown size={28} className="mr-2" /> : <ChevronRight size={28} className="mr-2" />}
                    {title}
                </button>
                {creditInfo && (
                    <div className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full text-white">{creditInfo}</div>
                )}
            </div>
            {open && (
                <div className="mt-2 px-6 pb-6">
                    <div className="grid grid-cols-3 text-white font-medium py-3 px-4">
                        <div>Course #</div>
                        <div>Course Name</div>
                        <div className="text-right">Prerequisite(s)</div>
                    </div>
                    {courses.length > 0 ? (
                        <div className="space-y-3">
                            {paginatedCourses.map((course) => (
                                <div
                                    key={course.code}
                                    onClick={() => openModal(course)}
                                    className="group bg-white rounded-sm shadow-md py-4 px-6 grid grid-cols-3 items-center cursor-pointer"
                                >
                                    <div className="group-hover:font-semibold">{course.code}</div>
                                    <div className="group-hover:font-semibold">{course.name}</div>
                                    <div className="flex justify-end items-center gap-2 flex-wrap">
                                        {course.prerequisites && course.prerequisites.length > 0 ? (
                                            course.prerequisites.map((prereq) => {
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
                                            })
                                        ) : (
                                            <span
                                                className="bg-[#008000] text-white px-3 py-1 rounded-md text-sm cursor-default"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                N/A
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-green-100 text-green-800 rounded-sm shadow-md py-6 px-6 text-center">
                            <p className="font-medium">All courses in this section have been completed! 🎉</p>
                        </div>
                    )}
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-end items-center mt-4 gap-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-md text-sm bg-gray-200 text-gray-700 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-white">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-md text-sm bg-gray-200 text-gray-700 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
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
        </div>
    )
}
