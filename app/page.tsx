'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Help2Study Logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Help2Study
          </h1>
          <p className="text-xl text-gray-600">
            All study materials in one place. Don't give up, keep going on your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-8">
          <Link href="/hndit" className="h-full">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-slate-200">
              <div className="text-center">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">💻</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-700 mb-2">
                  HND IT
                </h2>
                <p className="text-slate-600 text-sm">
                  HND IT notes and study materials by semester
                </p>
              </div>
            </div>
          </Link>

          <Link href="/al" className="h-full">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-purple-200">
              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">🎓</span>
                </div>
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  Advanced Level
                </h2>
                <p className="text-purple-600 text-sm">
                  Access notes and drive links for Advanced Level subjects
                </p>
              </div>
            </div>
          </Link>

          <Link href="/ol" className="h-full">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-blue-200">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">📝</span>
                </div>
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  Ordinary Level
                </h2>
                <p className="text-blue-600 text-sm">
                  Access notes and drive links for Ordinary Level subjects
                </p>
              </div>
            </div>
          </Link>

          <Link href="/notes" className="h-full">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-green-200">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">📚</span>
                </div>
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  Notes
                </h2>
                <p className="text-green-600 text-sm">
                  Access other notes and study materials
                </p>
              </div>
            </div>
          </Link>

          <Link href="/nvq" className="h-full">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-orange-200">
              <div className="text-center">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">🏆</span>
                </div>
                <h2 className="text-xl font-semibold text-orange-700 mb-2">
                  NVQ Courses
                </h2>
                <p className="text-orange-600 text-sm">
                  Access NVQ diploma and certificate courses
                </p>
              </div>
            </div>
          </Link>

          <Link href="/psychology" className="h-full">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-pink-200">
              <div className="text-center">
                <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">🧠</span>
                </div>
                <h2 className="text-xl font-semibold text-pink-700 mb-2">
                  Psychology
                </h2>
                <p className="text-pink-600 text-sm">
                  Access psychology and therapy courses
                </p>
              </div>
            </div>
          </Link>

          <Link href="/bcom" className="h-full">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-teal-200">
              <div className="text-center">
                <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">💼</span>
                </div>
                <h2 className="text-xl font-semibold text-teal-700 mb-2">
                  B Com
                </h2>
                <p className="text-teal-600 text-sm">
                  Access Bachelor of Commerce courses
                </p>
              </div>
            </div>
          </Link>

          <Link href="/languages" className="h-full">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-indigo-200">
              <div className="text-center">
                <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">🌍</span>
                </div>
                <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                  Languages
                </h2>
                <p className="text-indigo-600 text-sm">
                  Learn 23+ languages for free
                </p>
              </div>
            </div>
          </Link>

          <Link href="/ba-external" className="h-full">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-amber-200">
              <div className="text-center">
                <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">🎓</span>
                </div>
                <h2 className="text-xl font-semibold text-amber-700 mb-2">
                  BA External
                </h2>
                <p className="text-amber-600 text-sm">
                  BA External Degree notes collection
                </p>
              </div>
            </div>
          </Link>

          <Link href="/grade5" className="h-full">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-md p-8 hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-center border border-yellow-200">
              <div className="text-center">
                <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-4xl">📚</span>
                </div>
                <h2 className="text-xl font-semibold text-yellow-700 mb-2">
                  Grade 5
                </h2>
                <p className="text-yellow-600 text-sm">
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
