"use client";

export default function CompletedCoursesEmpty() {
  return (
    <main className="p-6 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Completed Courses</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-center text-gray-700 text-lg">
          No Completed Courses.
        </p>
      </div>
    </main>
  );
}
