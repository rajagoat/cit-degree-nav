"use client";

import { useState, useMemo } from "react";
import CircularProgress from "@/components/circular-progress";
import Tabs from "@/components/tabs";
import DropdownSection from "@/components/dropdown-section";
import { useAuth } from "@/context/AuthContext";
import { degreeRequirements, courses, Course } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";

const RemainingCourses: React.FC = () => {
  const { user } = useAuth();

  // Compute credits and classes overall
  const totalCredits = useMemo(() => {
    const primary = user?.data.primaryDegree?.creditsRequired || 0;
    const secondary = user?.data.additionalDegree?.creditsRequired || 0;
    return primary + secondary;
  }, [user]);

  const completedCredits = useMemo(() => {
    const primary = user?.data.primaryDegree?.creditsCompleted || 0;
    const secondary = user?.data.additionalDegree?.creditsCompleted || 0;
    return primary + secondary;
  }, [user]);

  const completedClasses = Math.floor(completedCredits / 3);
  const requiredClasses = Math.floor(totalCredits / 3);

  // Build dynamic tabs based on the user's degrees. For dual degrees, each degree has its own tab.
  const degreeTabs: { title: string; type: "Major" | "Minor" | "Concentration"; degreeData: any }[] = [];
  if (user) {
    if (user.data.primaryDegree) {
      degreeTabs.push({
        title: user.data.primaryDegree.name,
        type: "Major",
        degreeData: user.data.primaryDegree,
      });
    }
    if (user.data.additionalDegree) {
      degreeTabs.push({
        title: user.data.additionalDegree.name,
        type: user.data.additionalDegree.type || "Major",
        degreeData: user.data.additionalDegree,
      });
    }
  }

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const selectedTab = degreeTabs[selectedTabIndex]?.title || "";

  // Get completed course codes for the current degree (if available)
  const completedCourseCodes = user?.data.completedCourses
    ? user.data.completedCourses.map((cc) => cc.code)
    : [];

  // Get the degree requirements for the selected degree stream.
  // For majors, the requirements are stored by the degree name.
  const mainReq = degreeRequirements[selectedTab] || { required: [], electives: [] };

  // Also, if the user's additionalDegree contains a concentration, grab its requirements.
  // We assume that if the concentration exists, the degreeRequirements are keyed by the concentration name.
  const concentrationReq =
    user?.data.additionalDegree && user.data.additionalDegree.concentration
      ? degreeRequirements[user.data.additionalDegree.concentration]
      : null;

  // Helper function to get full course objects based on codes.
  const getCoursesForCodes = (codes: string[]): Course[] =>
    codes.map((code) => {
      const found = courses.find((c) => c.code.trim().toLowerCase() === code.trim().toLowerCase());
      return found || { code, name: code, description: "No description", prerequisites: [] };
    });

  // Build course arrays for the current selected tab.
  const mandatoryMainCourses = getCoursesForCodes(mainReq.required);
  const electiveMainCourses = getCoursesForCodes(mainReq.electives);

  // For concentration, if applicable (only applies if the currently selected degree is an additional degree and has a concentration)
  const mandatoryConcentrationCourses =
    concentrationReq && degreeTabs[selectedTabIndex].type === "Major"
      ? getCoursesForCodes(concentrationReq.required)
      : [];
  const electiveConcentrationCourses =
    concentrationReq && degreeTabs[selectedTabIndex].type === "Major"
      ? getCoursesForCodes(concentrationReq.electives)
      : [];

  return (
    <div className="mt-5 mb-3">
      {/* Dynamic Tabs */}
      <Tabs
        tabs={degreeTabs.map((dt) => dt.title)}
        selected={selectedTab}
        onSelect={(tab) => {
          const idx = degreeTabs.findIndex((d) => d.title === tab);
          setSelectedTabIndex(idx);
        }}
      />

      {/* Main Container for Mandatory Courses */}
      <div className="rounded-xl rounded-tl-none bg-[#4E8098]">
        <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Mandatory Courses</h2>
            {/* Removed extraneous "Degree Stream" text */}
          </div>
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
        <div className="px-6">
          <DropdownSection
            title={`${selectedTab} (${degreeTabs[selectedTabIndex]?.type || "Unknown"})`}
            courses={mandatoryMainCourses}
            completedCourseCodes={completedCourseCodes}
          />
          {concentrationReq && degreeTabs[selectedTabIndex].type === "Major" && (
            <DropdownSection
              title={`${user?.data.additionalDegree?.concentration} (Concentration)`}
              courses={mandatoryConcentrationCourses}
              completedCourseCodes={completedCourseCodes}
            />
          )}
        </div>

        <Separator />

        <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Elective Courses</h2>
          </div>
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
        <div className="px-6">
          <DropdownSection
            title={`${selectedTab} (${degreeTabs[selectedTabIndex]?.type || "Unknown"})`}
            courses={electiveMainCourses}
            completedCourseCodes={completedCourseCodes}
          />
          {concentrationReq && degreeTabs[selectedTabIndex].type === "Major" && (
            <DropdownSection
              title={`${user?.data.additionalDegree?.concentration} (Concentration)`}
              courses={electiveConcentrationCourses}
              completedCourseCodes={completedCourseCodes}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RemainingCourses;