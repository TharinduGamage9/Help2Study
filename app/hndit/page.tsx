'use client';

import { useState, useEffect } from 'react';

interface HNDITCourse {
  _id: string;
  subject: string;
  driveLink: string;
  semester: string;
}

export default function HNDITPage() {
  const [hnditCourses, setHnditCourses] = useState<HNDITCourse[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHNDIT();
  }, [selectedSemester, selectedSubject]);

  const fetchHNDIT = async () => {
    setLoading(true);
    try {
      let url = '/api/hndit';
      const params = new URLSearchParams();
      if (selectedSemester !== 'all') params.append('semester', selectedSemester);
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      if (params.toString()) url += '?' + params.toString();

      const response = await fetch(url);
      const data = await response.json();
      setHnditCourses(data.hnditCourses || []);
    } catch (error) {
      console.error('Error fetching HND IT courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const semesters = ['1st Year 1st Semester', '1st Year 2nd Semester', '2nd Year 1st Semester', '2nd Year 2nd Semester'];
  const subjects = Array.from(new Set(hnditCourses.map((c) => c.subject)));

  const coursesBySemester = hnditCourses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<string, HNDITCourse[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          HND IT (Higher National Diploma in Information Technology)
        </h1>

        {/* Semester Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {semesters.map((semester) => {
            const courseCount = coursesBySemester[semester]?.length || 0;
            return (
              <div
                key={semester}
                onClick={() => setSelectedSemester(selectedSemester === semester ? 'all' : semester)}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                  selectedSemester === semester ? 'ring-4 ring-indigo-500' : ''
                }`}
              >
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">
                      {semester.includes('1st Year 1st') ? '1' : 
                       semester.includes('1st Year 2nd') ? '2' :
                       semester.includes('2nd Year 1st') ? '3' : '4'}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {semester}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {courseCount} {courseCount === 1 ? 'course' : 'courses'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Semester:
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                setSelectedSubject('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Semesters</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Subject:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Display */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : hnditCourses.length === 0 ? (
          <p className="text-gray-600 bg-white p-6 rounded-lg shadow text-center">
            No HND IT courses available.
          </p>
        ) : selectedSemester === 'all' ? (
          <div className="space-y-8">
            {semesters.map((semester) => {
              const courses = coursesBySemester[semester] || [];
              if (courses.length === 0) return null;
              return (
                <section key={semester} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">{semester}</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {courses.map((course) => (
                      <div
                        key={course._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {course.subject}
                        </h3>
                        <a
                          href={course.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition inline-block"
                        >
                          View Drive Link {'>'}
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {hnditCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {course.subject}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{course.semester}</p>
                <a
                  href={course.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition inline-block"
                >
                  View Drive Link {'>'}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

