"use client"

import { useState } from "react"
import CircularProgress from "@/components/circular-progress"
import Tabs from "@/components/tabs"
import DropdownSection from "@/components/dropdown-section"
import { useAuth } from "@/context/AuthContext"
import { degreeRequirements, courses, type Course, Degree } from "@/data/mockData"
import { Separator } from "@/components/ui/separator"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

// Helper interface for section progress (each course counts as 3 credits)
interface SectionProgress {
  remainingCredits: number
  totalCredits: number
  remainingClasses: number
  totalClasses: number
  completedCredits: number
  completedClasses: number
}

// Helper function to get valid courses from the courses array, excluding completed courses
const getCoursesForCodes = (codes: string[], completedCourseCodes: string[]): Course[] => {
  const normalizedCompletedCodes = completedCourseCodes.map((code) => code.trim().toLowerCase())

  return codes
    .map((code) => {
      const found = courses.find((c) => c.code.trim().toLowerCase() === code.trim().toLowerCase())
      // Only include courses that haven't been completed
      if (found && !normalizedCompletedCodes.includes(found.code.trim().toLowerCase())) {
        return found
      }
      return null
    })
    .filter((course): course is Course => course !== null)
}

// Get all courses for codes (including completed ones) for credit calculation
const getAllCoursesForCodes = (codes: string[]): Course[] => {
  return codes
    .map((code) => {
      const found = courses.find((c) => c.code.trim().toLowerCase() === code.trim().toLowerCase())
      return found || null
    })
    .filter((course): course is Course => course !== null)
}

// Count completed courses in a section
const countCompletedCourses = (allCourses: Course[], completedCourseCodes: string[]): number => {
  const normalizedCompletedCodes = completedCourseCodes.map((code) => code.trim().toLowerCase())
  return allCourses.filter((course) => normalizedCompletedCodes.includes(course.code.trim().toLowerCase())).length
}

// Compute section progress for remaining courses in that section
const calculateSectionProgress = (
  sectionCourses: Course[],
  allSectionCourses: Course[],
  completedCourseCodes: string[],
): SectionProgress => {
  const totalCourses = allSectionCourses.length
  const remainingCourses = sectionCourses.length
  const completedCourses = countCompletedCourses(allSectionCourses, completedCourseCodes)

  return {
    remainingCredits: remainingCourses * 3,
    totalCredits: totalCourses * 3,
    remainingClasses: remainingCourses,
    totalClasses: totalCourses,
    completedCredits: completedCourses * 3,
    completedClasses: completedCourses,
  }
}

export default function RemainingCourses() {
  const { user } = useAuth()

  // Build dynamic tabs from user's degrees. For dual degrees, add both.
  const degreeTabs: { title: string; type: "Major" | "Minor" | "Concentration"; degreeData: Degree }[] = []
  if (user) {
    if (user.data.primaryDegree) {
      degreeTabs.push({
        title: user.data.primaryDegree.name,
        type: "Major",
        degreeData: user.data.primaryDegree,
      })
    }
    if (user.data.additionalDegree) {
      degreeTabs.push({
        title: user.data.additionalDegree.name,
        type: user.data.additionalDegree.type || "Major",
        degreeData: user.data.additionalDegree,
      })
    }
  }

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const selectedTab = degreeTabs[selectedTabIndex]?.title || ""

  // Get completed course codes from user data.
  const completedCourseCodes = user?.data.completedCourses ? user.data.completedCourses.map((cc) => cc.code) : []

  // Get the degree requirements for the selected degree stream.
  const mainReq = degreeRequirements[selectedTab] || { required: [], electives: [] }

  // If there's a concentration on the additional degree, get its requirements.
  // Only show concentration if it belongs to the currently selected degree
  const shouldShowConcentration =
    user?.data.additionalDegree?.concentration && selectedTab === user.data.additionalDegree.name

  const concentrationReq =
    shouldShowConcentration && user?.data.additionalDegree?.concentration
      ? degreeRequirements[user.data.additionalDegree.concentration]
      : null

  // Get all courses (including completed ones) for credit calculation
  const allMandatoryMainCourses = getAllCoursesForCodes(mainReq.required)
  const allElectiveMainCourses = getAllCoursesForCodes(mainReq.electives)
  const allMandatoryConcentrationCourses = concentrationReq ? getAllCoursesForCodes(concentrationReq.required) : []
  const allElectiveConcentrationCourses = concentrationReq ? getAllCoursesForCodes(concentrationReq.electives) : []

  // Build arrays for remaining Mandatory and Elective courses.
  const mandatoryMainCourses = getCoursesForCodes(mainReq.required, completedCourseCodes)
  const electiveMainCourses = getCoursesForCodes(mainReq.electives, completedCourseCodes)

  const mandatoryConcentrationCourses = concentrationReq
    ? getCoursesForCodes(concentrationReq.required, completedCourseCodes)
    : []
  const electiveConcentrationCourses = concentrationReq
    ? getCoursesForCodes(concentrationReq.electives, completedCourseCodes)
    : []

  // Calculate progress for each section.
  const progressMandatoryMain = calculateSectionProgress(
    mandatoryMainCourses,
    allMandatoryMainCourses,
    completedCourseCodes,
  )
  const progressElectiveMain = calculateSectionProgress(
    electiveMainCourses,
    allElectiveMainCourses,
    completedCourseCodes,
  )
  const progressMandatoryConcentration = concentrationReq
    ? calculateSectionProgress(mandatoryConcentrationCourses, allMandatoryConcentrationCourses, completedCourseCodes)
    : null
  const progressElectiveConcentration = concentrationReq
    ? calculateSectionProgress(electiveConcentrationCourses, allElectiveConcentrationCourses, completedCourseCodes)
    : null

  // Create credit info strings for each section
  const mandatoryMainCreditInfo = `${progressMandatoryMain.completedCredits}/${progressMandatoryMain.totalCredits} credits`
  const electiveMainCreditInfo = `${progressElectiveMain.completedCredits}/${progressElectiveMain.totalCredits} credits`

  const mandatoryConcentrationCreditInfo = progressMandatoryConcentration
    ? `${progressMandatoryConcentration.completedCredits}/${progressMandatoryConcentration.totalCredits} credits`
    : ""

  const electiveConcentrationCreditInfo = progressElectiveConcentration
    ? `${progressElectiveConcentration.completedCredits}/${progressElectiveConcentration.totalCredits} credits`
    : ""

  return (
    <TooltipProvider>
      <div className="mt-5 mb-3">
        {/* Dynamic Tabs */}
        <Tabs
          tabs={degreeTabs.map((dt) => dt.title)}
          selected={degreeTabs[selectedTabIndex]?.title || ""}
          onSelect={(tab) => {
            const idx = degreeTabs.findIndex((d) => d.title === tab)
            setSelectedTabIndex(idx)
          }}
        />

        {/* Mandatory Courses Section */}
        <div className="rounded-xl rounded-tl-none bg-[#4E8098]">
          <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center text-white">
              <h2 className="text-2xl font-bold">Mandatory Courses</h2>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={20} className="ml-2 text-white cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>These courses are required for the program(s) you are enrolled in.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="mt-6 md:mt-0">
              <CircularProgress
                currentValue={
                  progressMandatoryMain.completedClasses + (progressMandatoryConcentration?.completedClasses || 0)
                }
                totalValue={progressMandatoryMain.totalClasses + (progressMandatoryConcentration?.totalClasses || 0)}
                size={150}
                strokeWidth={10}
                label="Completed"
                additionalInfo={[
                  {
                    label: "Credits",
                    current:
                      progressMandatoryMain.completedCredits + (progressMandatoryConcentration?.completedCredits || 0),
                    total: progressMandatoryMain.totalCredits + (progressMandatoryConcentration?.totalCredits || 0),
                  },
                  {
                    label: "Classes",
                    current:
                      progressMandatoryMain.completedClasses + (progressMandatoryConcentration?.completedClasses || 0),
                    total: progressMandatoryMain.totalClasses + (progressMandatoryConcentration?.totalClasses || 0),
                  },
                ]}
                className="md:w-[25vw]"
              />
            </div>
          </div>
          <div className="px-6">
            <DropdownSection
              title={`${selectedTab} (${degreeTabs[selectedTabIndex]?.type || "Unknown"})`}
              courses={mandatoryMainCourses}
              completedCourseCodes={completedCourseCodes}
              creditInfo={mandatoryMainCreditInfo}
            />
            {progressMandatoryConcentration && shouldShowConcentration && (
              <DropdownSection
                title={`${user?.data.additionalDegree?.concentration} (Concentration)`}
                courses={mandatoryConcentrationCourses}
                completedCourseCodes={completedCourseCodes}
                creditInfo={mandatoryConcentrationCreditInfo}
              />
            )}
          </div>

          <Separator className="my-5" />

          {/* Elective Courses Section */}

          <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center text-white">
              <h2 className="text-2xl font-bold">Elective Courses</h2>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={20} className="ml-2 text-white cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>These courses are options available to fulfill your elective credit requirements.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="mt-6 md:mt-0">
              <CircularProgress
                currentValue={
                  progressElectiveMain.completedClasses + (progressElectiveConcentration?.completedClasses || 0)
                }
                totalValue={progressElectiveMain.totalClasses + (progressElectiveConcentration?.totalClasses || 0)}
                size={150}
                strokeWidth={10}
                label="Completed"
                additionalInfo={[
                  {
                    label: "Credits",
                    current:
                      progressElectiveMain.completedCredits + (progressElectiveConcentration?.completedCredits || 0),
                    total: progressElectiveMain.totalCredits + (progressElectiveConcentration?.totalCredits || 0),
                  },
                  {
                    label: "Classes",
                    current:
                      progressElectiveMain.completedClasses + (progressElectiveConcentration?.completedClasses || 0),
                    total: progressElectiveMain.totalClasses + (progressElectiveConcentration?.totalClasses || 0),
                  },
                ]}
                className="md:w-[25vw]"
              />
            </div>
          </div>
          <div className="px-6 pb-6">
            <DropdownSection
              title={`${selectedTab} (${degreeTabs[selectedTabIndex]?.type || "Unknown"})`}
              courses={electiveMainCourses}
              completedCourseCodes={completedCourseCodes}
              creditInfo={electiveMainCreditInfo}
            />
            {progressElectiveConcentration && shouldShowConcentration && (
              <DropdownSection
                title={`${user?.data.additionalDegree?.concentration} (Concentration)`}
                courses={electiveConcentrationCourses}
                completedCourseCodes={completedCourseCodes}
                creditInfo={electiveConcentrationCreditInfo}
              />
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}