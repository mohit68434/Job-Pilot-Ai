import { useRef, useState } from "react"
import { ArrowRight, Check, Search, Upload, FileText } from "lucide-react"

function App() {
  const [selectedJob, setSelectedJob] = useState("AI Engineer")
  const [searchTerm, setSearchTerm] = useState("")
  const [resumeName, setResumeName] = useState("")
  const fileInputRef = useRef(null)

  const jobs = [
    {
      title: "AI Engineer",
      location: "Bengaluru",
      type: "Full-time",
      match: "Strong match",
      skills: ["Python", "Machine Learning", "SQL"],
      reasons: [
        "Python matches your technical profile",
        "Machine Learning is a core requirement",
        "SQL is listed among the role skills",
      ],
    },
    {
      title: "Data Scientist",
      location: "Hyderabad",
      type: "Full-time",
      match: "Strong match",
      skills: ["Python", "SQL", "TensorFlow"],
      reasons: [
        "Python matches your technical profile",
        "SQL is relevant to the role",
        "TensorFlow aligns with the position requirements",
      ],
    },
    {
      title: "ML Engineer",
      location: "Pune",
      type: "Full-time",
      match: "Good match",
      skills: ["Python", "Deep Learning", "TensorFlow"],
      reasons: [
        "Python matches your technical profile",
        "Deep Learning is relevant to the role",
        "TensorFlow aligns with the position requirements",
      ],
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase().trim()

    if (!search) return true

    return (
      job.title.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search)
      )
    )
  })

  const activeJob =
    filteredJobs.find((job) => job.title === selectedJob) ||
    filteredJobs[0]

  const scrollToMatches = () => {
    document.getElementById("job-matches")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setResumeName(file.name)
  }

  const handleSearch = () => {
    scrollToMatches()
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-semibold tracking-tight">
          JobPilot AI
        </div>

        <button
          onClick={scrollToMatches}
          className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-200"
        >
          Get started
          <ArrowRight size={16} />
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-center">

        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-slate-400">
          Smarter job searching
        </p>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          Find the right job.
          <br />
          <span className="text-slate-400">
            Without the endless search.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          JobPilot AI helps you discover relevant opportunities and focus
          your application on jobs that actually fit your skills.
        </p>

        <button
          onClick={scrollToMatches}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-1 hover:bg-slate-200 hover:shadow-xl"
        >
          Start your job search
          <ArrowRight size={16} />
        </button>

      </section>

      {/* Search + Resume Demo */}
      <section className="mx-auto max-w-5xl px-6 pb-20">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl sm:p-7">

          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Try JobPilot
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Start with your resume or search for a role.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              This demo shows how JobPilot could help narrow down relevant
              opportunities.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            {/* Resume Upload */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2">
                  <Upload size={18} className="text-slate-300" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Upload your resume
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PDF or DOCX
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-900"
              >
                <FileText size={16} />
                {resumeName ? "Choose another resume" : "Choose resume"}
              </button>

              {resumeName && (
                <div className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-400">
                  Selected: {resumeName}
                </div>
              )}

            </div>

            {/* Job Search */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2">
                  <Search size={18} className="text-slate-300" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Search for a role
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try a role, skill, or location
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSearch()
                    }
                  }}
                  placeholder="AI Engineer, Python, Bengaluru..."
                  className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
                />

                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  <Search size={15} />
                  <span className="hidden sm:inline">
                    Search
                  </span>
                </button>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* Product Demo */}
      <section
        id="job-matches"
        className="mx-auto max-w-5xl scroll-mt-10 px-6 pb-32"
      >

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

          {/* Demo Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

            <div>
              <p className="text-sm font-semibold text-white">
                Example job matches
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Example results based on your search
              </p>
            </div>

            <div className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
              Product demo
            </div>

          </div>

          {/* Jobs */}
          <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => {

                const isSelected = activeJob?.title === job.title

                return (
                  <button
                    key={job.title}
                    onClick={() => setSelectedJob(job.title)}
                    className={`job-card text-left rounded-xl border bg-slate-950 p-5 ${
                      isSelected
                        ? "selected border-slate-500"
                        : "border-slate-800"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h3 className="font-medium text-white">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {job.location} · {job.type}
                        </p>
                      </div>

                      <span className="match-badge whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-950">
                        {job.match}
                      </span>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                      <span>
                        {isSelected
                          ? "Selected"
                          : "View match details"}
                      </span>

                      <ArrowRight
                        size={13}
                        className={`transition-transform duration-200 ${
                          isSelected ? "translate-x-1" : ""
                        }`}
                      />
                    </div>

                  </button>
                )
              })
            ) : (
              <div className="lg:col-span-2 rounded-xl border border-dashed border-slate-800 p-10 text-center">

                <Search
                  size={20}
                  className="mx-auto text-slate-600"
                />

                <p className="mt-4 text-sm font-medium text-slate-300">
                  No example jobs found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try searching for Python, AI, Data, or Bengaluru.
                </p>

              </div>
            )}

          </div>

          {/* Match Explanation */}
          {activeJob && (
            <div className="border-t border-slate-800 px-6 py-6">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                    Why this role fits
                  </p>

                  <h3 className="mt-2 text-lg font-medium text-white">
                    {activeJob.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Example explanation based on the role requirements.
                  </p>
                </div>

                <div className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  Skill comparison
                </div>

              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                {activeJob.reasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                  >
                    <Check
                      size={16}
                      className="mb-3 text-slate-300"
                    />

                    <p className="text-sm leading-6 text-slate-400">
                      {reason}
                    </p>
                  </div>
                ))}

              </div>

            </div>
          )}

        </div>

      </section>

    </main>
  )
}

export default App