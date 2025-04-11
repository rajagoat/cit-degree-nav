"use client"

import { type Course, courses as allCourses } from "@/data/mockData"
import { ChevronRight, ChevronDown, X, Filter, Info } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface DropdownSectionProps {
    title: string
    courses: Course[]
    completedCourseCodes: string[]
    creditInfo?: string
}

function getCourseType(code: string): string {
    if (code.startsWith("CS")) return "Computer Science"
    if (code.startsWith("SE")) return "Software Engineering"
    if (code.startsWith("DS")) return "Data Science"
    if (code.startsWith("MATH")) return "Mathematics"
    if (code.startsWith("ENG")) return "English"
    if (code.startsWith("ML")) return "Machine Learning"
    return "Other"
}

const ITEMS_PER_PAGE = 5

export default function DropdownSection({ title, courses, completedCourseCodes, creditInfo }: DropdownSectionProps) {
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCourse, setSelectedCourse] = useState(null as Course | null)

    // Filter modal state
    const [filterModalOpen, setFilterModalOpen] = useState(false)
    const allCourseTypes = useMemo(() => [...new Set(courses.map((c) => getCourseType(c.code)))], [courses])
    const [selectedTypes, setSelectedTypes] = useState<string[]>(allCourseTypes)
    useEffect(() => {
        setSelectedTypes(allCourseTypes)
    }, [allCourseTypes])

    const [tempSelectedTypes, setTempSelectedTypes] = useState<string[]>(selectedTypes)

    const toggleDropdown = () => {
        setOpen((prev) => {
            if (prev) setCurrentPage(1)
            return !prev
        })
    }

    const openModal = (course: Course) => setSelectedCourse(course)
    const closeModal = () => setSelectedCourse(null)

    const isPrerequisiteCompleted = (prereq: string) =>
        completedCourseCodes.map((c) => c.trim().toLowerCase()).includes(prereq.trim().toLowerCase())

    const getCourseFromPrerequisite = (code: string) =>
        allCourses.find((c) => c.code.trim().toLowerCase() === code.trim().toLowerCase())

    const filteredCourses = courses.filter((course) => selectedTypes.includes(getCourseType(course.code)))
    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE)
    const paginatedCourses = filteredCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
    const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))

    const handleFilterToggle = (type: string) => {
        setTempSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        )
    }

    const toggleAll = () => {
        if (tempSelectedTypes.length === allCourseTypes.length) {
            setTempSelectedTypes([])
        } else {
            setTempSelectedTypes(allCourseTypes)
        }
    }

    const applyFilters = () => {
        setSelectedTypes(tempSelectedTypes)
        setFilterModalOpen(false)
        setCurrentPage(1)
    }

    const cancelFilters = () => {
        setTempSelectedTypes(selectedTypes)
        setFilterModalOpen(false)
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
                {open && allCourseTypes.length > 0 && <Button variant="outline" size="sm" onClick={() => setFilterModalOpen(true)}>
                    <Filter className="mr-2" size={16} />
                    Filter
                </Button>}
                {selectedTypes.length < allCourseTypes.length && (
                    <span className="text-sm text-yellow-300 font-medium ml-2">
                        Filter applied
                    </span>
                )}
            </div>

            {open && (
                <div className="mt-2 px-6 pb-6">
                    <div className="grid grid-cols-3 text-white font-medium py-3 px-4">
                        <div>Course #</div>
                        <div className="flex ">
                        <div>Course Name</div>
                        <Tooltip>
                            <TooltipTrigger>
                            <Info size={20} className="ml-2 text-white cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Click on the course to learn more.</p>
                            </TooltipContent>
                        </Tooltip>
                        </div>
                        <div className="flex justify-end">
                        <div >Prerequisite(s)</div>
                        <Tooltip>
                            <TooltipTrigger>
                            <Info size={20} className="ml-2 text-white cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Click on the prerequisite to learn more.</p>
                            </TooltipContent>
                        </Tooltip>
                        </div>
                        </div>

                    {filteredCourses.length > 0 ? (
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
                                        {course.prerequisites?.length ? (
                                            course.prerequisites.map((prereq) => {
                                                const isCompleted = isPrerequisiteCompleted(prereq)
                                                return (
                                                    <Button
                                                        variant="outline"
                                                        key={prereq}
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            openModal(getCourseFromPrerequisite(prereq)!)
                                                        }}
                                                        className={`px-3 py-1 text-sm whitespace-nowrap ${isCompleted ? "bg-[#008000]" : "bg-[#A31621]"} text-white cursor-pointer`}
                                                    >
                                                        {prereq}
                                                    </Button>
                                                )
                                            })
                                        ) : (
                                            <span
                                                onClick={(e) => e.stopPropagation()}
                                                className="bg-[#008000] text-white px-3 py-1 rounded-md text-sm cursor-default"
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
                            {allCourseTypes.length > 0 ? (
                                <p className="font-medium">No courses match the selected filters.</p>
                            ) : (
                                <p className="font-medium">All courses in this section are complete! 🎉</p>
                            )}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-end items-center mt-4 gap-2">
                            <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-1 rounded-md text-sm bg-gray-200 text-gray-700 disabled:opacity-50">Previous</button>
                            <span className="text-sm text-white">Page {currentPage} of {totalPages}</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md text-sm bg-gray-200 text-gray-700 disabled:opacity-50">Next</button>
                        </div>
                    )}
                </div>
            )}

            {/* Course Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="bg-[#CED3DC] p-6 rounded shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                        <X className="float-right cursor-pointer" size={40} onClick={closeModal} />
                        <div className="text-center p-1 mb-4 w-[80%] mx-auto rounded-md">
                            <h2 className="text-2xl font-semibold">{selectedCourse.code}: {selectedCourse.name}</h2>
                        </div>
                        <div className="bg-white rounded-md p-2 mb-4">
                            <p className="font-bold">Description:</p>
                            <p>{selectedCourse.description}</p>
                        </div>
                        <div className="bg-white rounded-md p-2 flex gap-2 flex-wrap mb-4">
                            <p className="font-bold">Prerequisite(s):</p>
                            {selectedCourse.prerequisites?.length ? selectedCourse.prerequisites.map((prereq) => {
                                const isCompleted = isPrerequisiteCompleted(prereq)
                                return (
                                    <div key={prereq} className={`px-3 py-1 rounded-md text-sm text-white ${isCompleted ? "bg-[#008000]" : "bg-[#A31621]"}`}>
                                        {prereq}
                                    </div>
                                )
                            }) : <span className="bg-[#008000] text-white px-3 py-1 rounded-md text-sm">N/A</span>}
                        </div>

                         <div className="bg-white rounded-md p-2 ">
                            <span className="font-bold">Credits: </span>
                            <span>3</span>
                            </div>
                    </div>
                </div>
            )}

            {/* Filter Modal */}
            {filterModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={cancelFilters}>
                    <div className="bg-white p-6 rounded shadow-md max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-semibold mb-4">Filter Courses</h2>
                        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                            {allCourseTypes.map((type) => (
                                <label key={type} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={tempSelectedTypes.includes(type)}
                                        onChange={() => handleFilterToggle(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <Button variant="ghost" onClick={toggleAll}>
                                {tempSelectedTypes.length === allCourseTypes.length ? "Unselect All" : "Select All"}
                            </Button>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button onClick={cancelFilters}>Cancel</Button>
                            <Button variant="outline" onClick={applyFilters}>Apply</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
