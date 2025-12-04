'use client';

import { useState, useEffect } from 'react';

interface Note {
  _id: string;
  subject: string;
  driveLink: string;
  level: 'OL' | 'AL';
  category?: string;
}

interface OtherNote {
  _id: string;
  subject: string;
  driveLink: string;
}

interface NVQCourse {
  _id: string;
  subject: string;
  driveLink: string;
  category: string;
}

interface PsychologyCourse {
  _id: string;
  subject: string;
  driveLink: string;
}

interface BComCourse {
  _id: string;
  subject: string;
  driveLink: string;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium';
}

interface LanguageCourse {
  _id: string;
  subject: string;
  driveLink: string;
}

interface BAExternalCourse {
  _id: string;
  subject: string;
  medium: string;
  driveLink: string;
}

interface Grade5Course {
  _id: string;
  subject: string;
  driveLink: string;
}

interface HNDITCourse {
  _id: string;
  subject: string;
  driveLink: string;
  semester: '1st Year 1st Semester' | '1st Year 2nd Semester' | '2nd Year 1st Semester' | '2nd Year 2nd Semester';
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'notes' | 'otherNotes' | 'nvq' | 'psychology' | 'bcom' | 'languages' | 'baExternal' | 'grade5' | 'hndit'>('notes');
  const [notes, setNotes] = useState<Note[]>([]);
  const [otherNotes, setOtherNotes] = useState<OtherNote[]>([]);
  const [nvqCourses, setNvqCourses] = useState<NVQCourse[]>([]);
  const [psychologyCourses, setPsychologyCourses] = useState<PsychologyCourse[]>([]);
  const [bcomCourses, setBcomCourses] = useState<BComCourse[]>([]);
  const [languages, setLanguages] = useState<LanguageCourse[]>([]);
  const [baExternalCourses, setBaExternalCourses] = useState<BAExternalCourse[]>([]);
  const [grade5Courses, setGrade5Courses] = useState<Grade5Course[]>([]);
  const [hnditCourses, setHnditCourses] = useState<HNDITCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Note | OtherNote | NVQCourse | PsychologyCourse | BComCourse | LanguageCourse | BAExternalCourse | Grade5Course | HNDITCourse | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    driveLink: '',
    level: 'OL' as 'OL' | 'AL',
    category: '',
    noteCategory: '', // For AL notes category
    year: '1st Year' as '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium',
    medium: '',
    semester: '1st Year 1st Semester' as '1st Year 1st Semester' | '1st Year 2nd Semester' | '2nd Year 1st Semester' | '2nd Year 2nd Semester',
  });

  useEffect(() => {
    fetchNotes();
    fetchOtherNotes();
    fetchNVQ();
    fetchPsychology();
    fetchBCom();
    fetchLanguages();
    fetchBAExternal();
    fetchGrade5();
    fetchHNDIT();
  }, []);

  const fetchHNDIT = async () => {
    try {
      const response = await fetch('/api/hndit');
      const data = await response.json();
      setHnditCourses(data.hnditCourses || []);
    } catch (error) {
      console.error('Error fetching HND IT courses:', error);
    }
  };

  const fetchGrade5 = async () => {
    try {
      const response = await fetch('/api/grade5');
      const data = await response.json();
      setGrade5Courses(data.grade5Courses || []);
    } catch (error) {
      console.error('Error fetching Grade 5 courses:', error);
    }
  };

  const fetchBAExternal = async () => {
    try {
      const response = await fetch('/api/ba-external');
      const data = await response.json();
      setBaExternalCourses(data.baExternalCourses || []);
    } catch (error) {
      console.error('Error fetching BA External courses:', error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await fetch('/api/languages');
      const data = await response.json();
      setLanguages(data.languages || []);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const fetchBCom = async () => {
    try {
      const response = await fetch('/api/bcom');
      const data = await response.json();
      setBcomCourses(data.bcomCourses || []);
    } catch (error) {
      console.error('Error fetching B Com courses:', error);
    }
  };

  const fetchPsychology = async () => {
    try {
      const response = await fetch('/api/psychology');
      const data = await response.json();
      setPsychologyCourses(data.psychologyCourses || []);
    } catch (error) {
      console.error('Error fetching psychology courses:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data.notes || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchOtherNotes = async () => {
    try {
      const response = await fetch('/api/other-notes');
      const data = await response.json();
      setOtherNotes(data.otherNotes || []);
    } catch (error) {
      console.error('Error fetching other notes:', error);
    }
  };

  const fetchNVQ = async () => {
    try {
      const response = await fetch('/api/nvq');
      const data = await response.json();
      setNvqCourses(data.nvqCourses || []);
    } catch (error) {
      console.error('Error fetching NVQ courses:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'notes') {
        const url = editingItem ? `/api/notes/${editingItem._id}` : '/api/notes';
        const method = editingItem ? 'PUT' : 'POST';
        const body: any = {
          subject: formData.subject,
          driveLink: formData.driveLink,
          level: formData.level,
        };
        // Add category only for AL level notes
        if (formData.level === 'AL' && formData.noteCategory) {
          body.category = formData.noteCategory;
        }

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchNotes();
          resetForm();
        }
      } else if (activeTab === 'otherNotes') {
        const url = editingItem ? `/api/other-notes/${editingItem._id}` : '/api/other-notes';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchOtherNotes();
          resetForm();
        }
      } else if (activeTab === 'nvq') {
        const url = editingItem ? `/api/nvq/${editingItem._id}` : '/api/nvq';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
          category: formData.category,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchNVQ();
          resetForm();
        }
      } else if (activeTab === 'psychology') {
        const url = editingItem ? `/api/psychology/${editingItem._id}` : '/api/psychology';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchPsychology();
          resetForm();
        }
      } else if (activeTab === 'bcom') {
        const url = editingItem ? `/api/bcom/${editingItem._id}` : '/api/bcom';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
          year: formData.year,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchBCom();
          resetForm();
        }
      } else if (activeTab === 'languages') {
        const url = editingItem ? `/api/languages/${editingItem._id}` : '/api/languages';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchLanguages();
          resetForm();
        }
      } else if (activeTab === 'baExternal') {
        const url = editingItem ? `/api/ba-external/${editingItem._id}` : '/api/ba-external';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          medium: formData.medium,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchBAExternal();
          resetForm();
        }
      } else if (activeTab === 'hndit') {
        const url = editingItem ? `/api/hndit/${editingItem._id}` : '/api/hndit';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
          semester: formData.semester,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchHNDIT();
          resetForm();
        }
      } else {
        const url = editingItem ? `/api/grade5/${editingItem._id}` : '/api/grade5';
        const method = editingItem ? 'PUT' : 'POST';
        const body = {
          subject: formData.subject,
          driveLink: formData.driveLink,
        };

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          fetchGrade5();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      let url = '';
      if (activeTab === 'notes') {
        url = `/api/notes/${id}`;
      } else if (activeTab === 'otherNotes') {
        url = `/api/other-notes/${id}`;
      } else if (activeTab === 'nvq') {
        url = `/api/nvq/${id}`;
      } else if (activeTab === 'psychology') {
        url = `/api/psychology/${id}`;
      } else if (activeTab === 'bcom') {
        url = `/api/bcom/${id}`;
      } else if (activeTab === 'languages') {
        url = `/api/languages/${id}`;
      } else if (activeTab === 'baExternal') {
        url = `/api/ba-external/${id}`;
      } else if (activeTab === 'hndit') {
        url = `/api/hndit/${id}`;
      } else {
        url = `/api/grade5/${id}`;
      }
      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        if (activeTab === 'notes') {
          fetchNotes();
        } else if (activeTab === 'otherNotes') {
          fetchOtherNotes();
        } else if (activeTab === 'nvq') {
          fetchNVQ();
        } else if (activeTab === 'psychology') {
          fetchPsychology();
        } else if (activeTab === 'bcom') {
          fetchBCom();
        } else if (activeTab === 'languages') {
          fetchLanguages();
        } else if (activeTab === 'baExternal') {
          fetchBAExternal();
        } else if (activeTab === 'hndit') {
          fetchHNDIT();
        } else {
          fetchGrade5();
        }
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEdit = (item: Note | OtherNote | NVQCourse | PsychologyCourse | BComCourse | LanguageCourse | BAExternalCourse | Grade5Course | HNDITCourse) => {
    setEditingItem(item);
    if ('level' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: item.level,
        category: '',
        noteCategory: item.category || '',
        year: '1st Year',
        medium: '',
        semester: '1st Year 1st Semester',
      });
    } else if ('category' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: item.category,
        noteCategory: '',
        year: '1st Year',
        medium: '',
        semester: '1st Year 1st Semester',
      });
    } else if ('year' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: '',
        noteCategory: '',
        year: item.year,
        medium: '',
        semester: '1st Year 1st Semester',
      });
    } else if ('medium' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: '',
        noteCategory: '',
        year: '1st Year',
        medium: item.medium,
        semester: '1st Year 1st Semester',
      });
    } else if ('semester' in item) {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: '',
        noteCategory: '',
        year: '1st Year',
        medium: '',
        semester: item.semester,
      });
    } else {
      setFormData({
        subject: item.subject,
        driveLink: item.driveLink,
        level: 'OL',
        category: '',
        noteCategory: '',
        year: '1st Year',
        medium: '',
        semester: '1st Year 1st Semester',
      });
    }
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      subject: '',
      driveLink: '',
      level: 'OL',
      category: '',
      noteCategory: '',
      year: '1st Year',
      medium: '',
      semester: '1st Year 1st Semester',
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const getTabLabel = () => {
    if (activeTab === 'notes') return 'Note';
    if (activeTab === 'otherNotes') return 'Other Note';
    if (activeTab === 'nvq') return 'NVQ Course';
    if (activeTab === 'psychology') return 'Psychology Course';
    if (activeTab === 'bcom') return 'B Com Course';
    if (activeTab === 'languages') return 'Language';
    if (activeTab === 'baExternal') return 'BA External Course';
    if (activeTab === 'hndit') return 'HND IT Course';
    return 'Grade 5 Course';
  };

  const categories = ['ICT', 'Construction & Engineering Technology', 'Automotive Technology', 'Hospitality & Tourism', 'Healthcare & Social Care'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Help2Study - Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => {
                  setActiveTab('notes');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => {
                  setActiveTab('otherNotes');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'otherNotes'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Other Notes
              </button>
              <button
                onClick={() => {
                  setActiveTab('nvq');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'nvq'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                NVQ
              </button>
              <button
                onClick={() => {
                  setActiveTab('psychology');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'psychology'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Psychology
              </button>
              <button
                onClick={() => {
                  setActiveTab('bcom');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'bcom'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                B Com
              </button>
              <button
                onClick={() => {
                  setActiveTab('languages');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'languages'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Languages
              </button>
              <button
                onClick={() => {
                  setActiveTab('baExternal');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'baExternal'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                BA External
              </button>
              <button
                onClick={() => {
                  setActiveTab('grade5');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'grade5'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Grade 5
              </button>
              <button
                onClick={() => {
                  setActiveTab('hndit');
                  resetForm();
                }}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'hndit'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                HND IT
              </button>
            </nav>
          </div>

          <div className="p-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              {showForm ? 'Cancel' : `Add New ${getTabLabel()}`}
            </button>

            {showForm && (
              <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Mathematics, Science"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {activeTab === 'notes' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Level
                        </label>
                        <select
                          required
                          value={formData.level}
                          onChange={(e) => setFormData({ ...formData, level: e.target.value as 'OL' | 'AL', noteCategory: '' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="OL">OL</option>
                          <option value="AL">AL</option>
                        </select>
                      </div>
                      {formData.level === 'AL' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category (for AL)
                          </label>
                          <select
                            value={formData.noteCategory}
                            onChange={(e) => setFormData({ ...formData, noteCategory: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="">No Category</option>
                            <option value="වාණිජ විෂය ධාරාව (Commerce Stream)">වාණිජ විෂය ධාරාව (Commerce Stream)</option>
                            <option value="කලා විෂය ධාරාව (Arts Stream)">කලා විෂය ධාරාව (Arts Stream)</option>
                            <option value="කලා විෂය ධාරාව (Languages)">කලා විෂය ධාරාව (Languages)</option>
                            <option value="තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)">තාක්ෂණවේදය විෂය ධාරාව (Technology Stream)</option>
                            <option value="විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)">විද්‍යා/ගණිත විෂය ධාරාව (Science/Mathematics Stream)</option>
                          </select>
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'nvq' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {activeTab === 'bcom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <select
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value as '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'English Medium' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="English Medium">English Medium</option>
                      </select>
                    </div>
                  )}
                  {activeTab === 'baExternal' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medium
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.medium}
                        onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                        placeholder="e.g., English Medium, Sinhala Medium, More Resources"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                  {activeTab === 'hndit' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Semester
                      </label>
                      <select
                        required
                        value={formData.semester}
                        onChange={(e) => setFormData({ ...formData, semester: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="1st Year 1st Semester">1st Year 1st Semester</option>
                        <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
                        <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
                        <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
                      </select>
                    </div>
                  )}
                  <div className={activeTab === 'otherNotes' || activeTab === 'nvq' || activeTab === 'psychology' || activeTab === 'bcom' || activeTab === 'languages' || activeTab === 'baExternal' || activeTab === 'grade5' || activeTab === 'hndit' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Drive Link
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.driveLink}
                      onChange={(e) => setFormData({ ...formData, driveLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </button>
              </form>
            )}

            <div className="space-y-4">
              {activeTab === 'notes' ? (
                notes.length === 0 ? (
                  <p className="text-gray-500">No notes found. Add your first note!</p>
                ) : (
                  notes.map((note) => (
                    <div key={note._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900">{note.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {note.level}
                            </span>
                            {note.category && (
                              <span className="text-xs text-gray-600 bg-blue-100 px-2 py-1 rounded">
                                {note.category}
                              </span>
                            )}
                          </div>
                          <a
                            href={note.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(note)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(note._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'otherNotes' ? (
                otherNotes.length === 0 ? (
                  <p className="text-gray-500">No other notes found. Add your first other note!</p>
                ) : (
                  otherNotes.map((note) => (
                    <div key={note._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.subject}</h3>
                          <a
                            href={note.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(note)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(note._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'nvq' ? (
                nvqCourses.length === 0 ? (
                  <p className="text-gray-500">No NVQ courses found. Add your first NVQ course!</p>
                ) : (
                  nvqCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {course.category}
                            </span>
                          </div>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'psychology' ? (
                psychologyCourses.length === 0 ? (
                  <p className="text-gray-500">No psychology courses found. Add your first psychology course!</p>
                ) : (
                  psychologyCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.subject}</h3>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'bcom' ? (
                bcomCourses.length === 0 ? (
                  <p className="text-gray-500">No B Com courses found. Add your first B Com course!</p>
                ) : (
                  bcomCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {course.year}
                            </span>
                          </div>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'languages' ? (
                languages.length === 0 ? (
                  <p className="text-gray-500">No languages found. Add your first language!</p>
                ) : (
                  languages.map((language) => (
                    <div key={language._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{language.subject}</h3>
                          <a
                            href={language.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(language)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(language._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'baExternal' ? (
                baExternalCourses.length === 0 ? (
                  <p className="text-gray-500">No BA External courses found. Add your first BA External course!</p>
                ) : (
                  baExternalCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {course.medium}
                            </span>
                          </div>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : activeTab === 'hndit' ? (
                hnditCourses.length === 0 ? (
                  <p className="text-gray-500">No HND IT courses found. Add your first HND IT course!</p>
                ) : (
                  hnditCourses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-4 items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{course.subject}</h3>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                              {course.semester}
                            </span>
                          </div>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                grade5Courses.length === 0 ? (
                  <p className="text-gray-500">No Grade 5 courses found. Add your first Grade 5 course!</p>
                ) : (
                  grade5Courses.map((course) => (
                    <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.subject}</h3>
                          <a
                            href={course.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm inline-block"
                          >
                            View Drive Link {'>'}
                          </a>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(course)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
