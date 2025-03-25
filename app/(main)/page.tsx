import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <main>
      <div className="bg-[url(/mountain-range.jpg)] rounded-2xl mt-10">
        <div className="grid grid-cols-2 gap-4 max-w-3/5 p-4">
          <Card className="col-span-2">
            <CardHeader className="flex">
              <div className="flex-1">
                <CardDescription>Name</CardDescription>
                <CardTitle className="text-md pt-1 text-[var(--primary)]">John Smith</CardTitle>
              </div>
              <div className="flex-1">
                <CardDescription>UUID</CardDescription>
                <CardTitle className="text-md pt-1 text-[var(--primary)]">12345678</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="flex">
              <div className="flex-1">
                <CardDescription>Degree Major</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)]">Computer Science</p>
              </div>
              <div className="flex-1">
                <CardDescription>Degree Minor</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)]">Mathematics</p>
              </div>
              <div className="flex-1">
                <CardDescription>Current GPA</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)]">3.8</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[var(--primary)]">Credits Status</CardTitle>
            </CardHeader>
            <CardContent className="flex">
              <div className="flex-1">
                <CardDescription>Credits Completed</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)]">75</p>
              </div>
              <div className="flex-1">
                <CardDescription>Credits Remaining</CardDescription>
                <p className="text-md pt-1 text-[var(--secondary)]">45</p>
              </div>
            </CardContent>
          </Card>
          {/* progress tracker component */}
        </div>

      </div>
      <div>
        {/* Course Recommender */}
      </div>
    </main>
  );
}
