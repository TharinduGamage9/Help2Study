'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to LMS Platform
          </h1>
          <p className="text-xl text-gray-600">
            Access your notes and study materials for OL and AL levels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-8">
          <Link href="/ol" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-blue-600">OL</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Ordinary Level
                </h2>
                <p className="text-gray-600 text-sm">
                  Access notes and drive links for Ordinary Level subjects
                </p>
              </div>
            </div>
          </Link>

          <Link href="/al" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-purple-600">AL</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Advanced Level
                </h2>
                <p className="text-gray-600 text-sm">
                  Access notes and drive links for Advanced Level subjects
                </p>
              </div>
            </div>
          </Link>

          <Link href="/notes" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-green-600">📚</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Notes
                </h2>
                <p className="text-gray-600 text-sm">
                  Access other notes and study materials
                </p>
              </div>
            </div>
          </Link>

          <Link href="/nvq" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-orange-600">NVQ</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  NVQ Courses
                </h2>
                <p className="text-gray-600 text-sm">
                  Access NVQ diploma and certificate courses
                </p>
              </div>
            </div>
          </Link>

          <Link href="/psychology" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-pink-600">🧠</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Psychology
                </h2>
                <p className="text-gray-600 text-sm">
                  Access psychology and therapy courses
                </p>
              </div>
            </div>
          </Link>

          <Link href="/bcom" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-teal-600">B.Com</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  B Com
                </h2>
                <p className="text-gray-600 text-sm">
                  Access Bachelor of Commerce courses
                </p>
              </div>
            </div>
          </Link>

          <Link href="/languages" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-indigo-600">🌍</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Languages
                </h2>
                <p className="text-gray-600 text-sm">
                  Learn 23+ languages for free
                </p>
              </div>
            </div>
          </Link>

          <Link href="/ba-external" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-amber-600">🎓</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  BA External
                </h2>
                <p className="text-gray-600 text-sm">
                  BA External Degree notes collection
                </p>
              </div>
            </div>
          </Link>

          <Link href="/grade5" className="h-full">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-yellow-600">📚</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Grade 5
                </h2>
                <p className="text-gray-600 text-sm">
                  Grade 5 student notes and materials
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
